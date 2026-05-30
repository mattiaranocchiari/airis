"use server";

import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import {
  cancelAppointment,
  createAppointment,
  getAppointment,
  listAppointments,
  updateAppointment,
} from "@/lib/db/appointments";
import { parseIntent } from "@/lib/intents/parse";
import { getLlmProvider } from "@/lib/llm";
import {
  clearPendingDisambiguation,
  readContext,
  recordAction,
  recordUtterance,
  resolveReference,
  setPendingDisambiguation,
  type PendingDisambiguation,
} from "@/lib/consciousness";
import {
  SCHEDULER_BROADCAST_EVENT,
  schedulerChannelTopic,
  type SchedulerBroadcastV1,
} from "@/lib/realtime/channel";

type DB = SupabaseClient<Database>;

const finalitaSchema = z.enum([
  "cura_diretta",
  "assistenza",
  "amministrativo",
  "verifica_qualita",
  "urgenza_break_glass",
]);

export type SchedulerActionResult =
  | { kind: "ok"; message: string; appointmentId?: string; timing: TimingTrace }
  | {
      kind: "needs_disambiguation";
      reason: string;
      candidates: { id: string; label: string }[];
    }
  | { kind: "needs_egfr_confirmation"; appointment: PendingContrast; timing: TimingTrace }
  | { kind: "error"; reason: string };

export type TimingTrace = {
  micCloseTs: number | null;
  intentParsedTs: number;
  rpcDoneTs: number;
  broadcastSentTs: number;
  modelLatencyMs: number;
};

export type PendingContrast = {
  patient_id: string;
  patient_label: string;
  room_id: string;
  slot_start_at: string;
  slot_end_at: string;
  subtype: string | null;
  egfr_value: number;
};

const DEFAULT_DURATION_MIN = 30;
const CHANNEL_FOR_ROOM = (roomId: string) => `scheduler:${roomId}` as const;

export async function interpretUtterance(
  utterance: string,
  micCloseTs: number | null,
): Promise<SchedulerActionResult> {
  const db = await createSupabaseServerClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) return { kind: "error", reason: "unauthenticated" };
  const tenantId = (user.app_metadata as { tenant_id?: string }).tenant_id;
  if (!tenantId) return { kind: "error", reason: "no tenant on session" };
  const finalita = finalitaSchema.parse("cura_diretta");

  const channelId = CHANNEL_FOR_ROOM("CT1");
  recordUtterance(tenantId, channelId, utterance);

  const provider = getLlmProvider();
  const todayLocal = new Date().toISOString().slice(0, 10);
  const parsed = await parseIntent(
    { utterance, context: { todayLocalDate: todayLocal, currentRoomId: "CT1" } },
    provider,
  );
  const intent = parsed.intent;
  const intentParsedTs = Date.now();

  const ctx = { actor: { type: "clinician" as const, id: user.id }, finalita, tenantId };

  if (intent.intent === "view_schedule") {
    return ok(`view ${intent.room_id} ${intent.when}`, undefined, {
      micCloseTs,
      intentParsedTs,
      rpcDoneTs: intentParsedTs,
      broadcastSentTs: intentParsedTs,
      modelLatencyMs: parsed.modelLatencyMs,
    });
  }

  if (intent.intent === "book_appointment") {
    const slotStart = new Date(intent.slot_start_local);
    const slotEnd = new Date(slotStart.getTime() + intent.duration_minutes * 60_000);
    const patientId = await lookupSinglePatient(db, intent.patient_query);
    if (!patientId) {
      const candidates = await lookupCandidates(db, intent.patient_query);
      // Stash the pending booking in L3 so the next disambiguate_patient
      // intent can resume it with the chosen patient. This is the
      // consciousness.write contract from §17.4 — the substrate is the
      // continuity across turns.
      setPendingDisambiguation(tenantId, channelId, {
        room_id: intent.room_id,
        kind: intent.kind,
        subtype: intent.subtype,
        with_contrast: intent.with_contrast,
        slot_start_at: slotStart.toISOString(),
        slot_end_at: slotEnd.toISOString(),
        notes: null,
        candidates,
        patient_query: intent.patient_query,
      });
      return {
        kind: "needs_disambiguation",
        reason: `multiple patients match "${intent.patient_query}"`,
        candidates,
      };
    }

    return attemptBooking(db, ctx, {
      room_id: intent.room_id,
      kind: intent.kind,
      subtype: intent.subtype,
      with_contrast: intent.with_contrast,
      slot_start_at: slotStart.toISOString(),
      slot_end_at: slotEnd.toISOString(),
      notes: null,
      patient_id: patientId,
      patient_label: intent.patient_query,
      micCloseTs,
      intentParsedTs,
      modelLatencyMs: parsed.modelLatencyMs,
    });
  }

  if (intent.intent === "move_appointment") {
    return await handleMove(db, ctx, channelId, todayLocal, intent.reference, intent.new_slot_start_local, {
      micCloseTs,
      intentParsedTs,
      modelLatencyMs: parsed.modelLatencyMs,
    });
  }

  if (intent.intent === "cancel_appointment") {
    return await handleCancel(db, ctx, channelId, todayLocal, intent.reference, {
      micCloseTs,
      intentParsedTs,
      modelLatencyMs: parsed.modelLatencyMs,
    });
  }

  // disambiguate_patient — read L3 pending booking, match the selection
  // against candidates, and auto-complete the original booking. This is the
  // "feels like one event" property in the disambiguation case: the user
  // doesn't re-issue the booking utterance.
  const state = readContext(tenantId, channelId);
  const pending = state.pendingDisambiguation;
  if (!pending) {
    return ok(`noted: ${intent.selection}`, undefined, {
      micCloseTs,
      intentParsedTs,
      rpcDoneTs: intentParsedTs,
      broadcastSentTs: intentParsedTs,
      modelLatencyMs: parsed.modelLatencyMs,
    });
  }
  const match = matchCandidate(intent.selection, pending.candidates);
  if (match.kind === "none") {
    return {
      kind: "needs_disambiguation",
      reason: `"${intent.selection}" did not match any candidate — pick one`,
      candidates: pending.candidates,
    };
  }
  if (match.kind === "ambiguous") {
    return {
      kind: "needs_disambiguation",
      reason: `"${intent.selection}" still matches more than one`,
      candidates: match.matches,
    };
  }
  clearPendingDisambiguation(tenantId, channelId);
  return attemptBooking(db, ctx, {
    room_id: pending.room_id,
    kind: pending.kind,
    subtype: pending.subtype,
    with_contrast: pending.with_contrast,
    slot_start_at: pending.slot_start_at,
    slot_end_at: pending.slot_end_at,
    notes: pending.notes,
    patient_id: match.chosen.id,
    patient_label: match.chosen.label,
    micCloseTs,
    intentParsedTs,
    modelLatencyMs: parsed.modelLatencyMs,
  });
}

export async function confirmContrastBooking(
  pending: PendingContrast,
): Promise<SchedulerActionResult> {
  const db = await createSupabaseServerClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) return { kind: "error", reason: "unauthenticated" };
  const tenantId = (user.app_metadata as { tenant_id?: string }).tenant_id;
  if (!tenantId) return { kind: "error", reason: "no tenant on session" };
  const finalita = finalitaSchema.parse("cura_diretta");
  const ctx = { actor: { type: "clinician" as const, id: user.id }, finalita, tenantId };

  const created = await createAppointment(
    db,
    {
      room_id: pending.room_id,
      patient_id: pending.patient_id,
      kind: "CT",
      subtype: pending.subtype,
      with_contrast: true,
      slot_start_at: pending.slot_start_at,
      slot_end_at: pending.slot_end_at,
      notes: `confirmed contrast despite eGFR ${pending.egfr_value}`,
    },
    ctx,
  );
  const channelId = CHANNEL_FOR_ROOM(pending.room_id);
  recordAction(tenantId, channelId, {
    kind: "create",
    appointmentId: created.appointment_id,
    when: new Date().toISOString(),
    slotStartLocal: pending.slot_start_at,
  });
  await broadcastScheduler(db, tenantId, pending.room_id, {
    v: 1,
    type: "appointment.created",
    appointment_id: created.appointment_id,
    room_id: pending.room_id,
    slot_start_at: pending.slot_start_at,
    slot_end_at: pending.slot_end_at,
    kind: "CT",
    subtype: pending.subtype,
    with_contrast: true,
    patient_id: pending.patient_id,
    occurred_at: new Date().toISOString(),
  });
  return {
    kind: "ok",
    message: `booked with contrast (eGFR ${pending.egfr_value} acknowledged)`,
    appointmentId: created.appointment_id,
    timing: {
      micCloseTs: null,
      intentParsedTs: Date.now(),
      rpcDoneTs: Date.now(),
      broadcastSentTs: Date.now(),
      modelLatencyMs: 0,
    },
  };
}

// Direct manipulation reflects back to the conversation surface per §17.4 +
// the Step 4.3 plan's minimum-viable slice. The drag drop on the grid is the
// content-surface intent; it resolves through the same appointment_update
// RPC + L2 broadcast as voice-driven moves, and emits a "moved to N:00"
// system message into the conversation panel without asking the clinician
// any question.
export async function moveAppointmentByDrag(
  appointmentId: string,
  newHour: number,
  dragDropTs: number,
): Promise<SchedulerActionResult> {
  if (!Number.isInteger(newHour) || newHour < 0 || newHour > 23) {
    return { kind: "error", reason: `invalid target hour ${newHour}` };
  }
  const db = await createSupabaseServerClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) return { kind: "error", reason: "unauthenticated" };
  const tenantId = (user.app_metadata as { tenant_id?: string }).tenant_id;
  if (!tenantId) return { kind: "error", reason: "no tenant on session" };
  const finalita = finalitaSchema.parse("cura_diretta");
  const ctx = { actor: { type: "clinician" as const, id: user.id }, finalita, tenantId };

  const existing = await getAppointment(db, appointmentId);
  if (!existing) return { kind: "error", reason: "appointment not found" };

  const oldStart = new Date(existing.slot_start_at);
  const oldEnd = new Date(existing.slot_end_at);
  const durationMs = oldEnd.getTime() - oldStart.getTime();
  const newStart = new Date(oldStart);
  newStart.setUTCHours(newHour, 0, 0, 0);
  const newEnd = new Date(newStart.getTime() + durationMs);

  await updateAppointment(
    db,
    appointmentId,
    {
      slot_start_at: newStart.toISOString(),
      slot_end_at: newEnd.toISOString(),
    },
    ctx,
  );
  const rpcDoneTs = Date.now();

  const channelId = CHANNEL_FOR_ROOM(existing.room_id);
  recordAction(tenantId, channelId, {
    kind: "update",
    appointmentId,
    when: new Date().toISOString(),
    slotStartLocal: newStart.toISOString(),
  });

  await broadcastScheduler(db, tenantId, existing.room_id, {
    v: 1,
    type: "appointment.updated",
    appointment_id: appointmentId,
    room_id: existing.room_id,
    slot_start_at: newStart.toISOString(),
    slot_end_at: newEnd.toISOString(),
    changed_fields: ["slot_start_at", "slot_end_at"],
    occurred_at: new Date().toISOString(),
  });
  const broadcastSentTs = Date.now();

  return {
    kind: "ok",
    message: `moved to ${pad(newHour)}:00`,
    appointmentId,
    timing: {
      micCloseTs: dragDropTs,
      intentParsedTs: dragDropTs,
      rpcDoneTs,
      broadcastSentTs,
      modelLatencyMs: 0,
    },
  };
}

export async function loadGridForCT1(): Promise<{
  appointments: {
    id: string;
    slot_start_at: string;
    slot_end_at: string;
    kind: string;
    subtype: string | null;
    with_contrast: boolean;
    patient_id: string;
  }[];
}> {
  const db = await createSupabaseServerClient();
  const today = new Date();
  const from = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
  const to = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2).toISOString();
  const rows = await listAppointments(db, { roomId: "CT1", range: { from, to } });
  return {
    appointments: rows.map((r) => ({
      id: r.id,
      slot_start_at: r.slot_start_at,
      slot_end_at: r.slot_end_at,
      kind: r.kind,
      subtype: r.subtype,
      with_contrast: r.with_contrast,
      patient_id: r.patient_id,
    })),
  };
}

type BookingAttempt = {
  room_id: string;
  kind: string;
  subtype: string | null;
  with_contrast: boolean;
  slot_start_at: string;
  slot_end_at: string;
  notes: string | null;
  patient_id: string;
  patient_label: string;
  micCloseTs: number | null;
  intentParsedTs: number;
  modelLatencyMs: number;
};

async function attemptBooking(
  db: DB,
  ctx: {
    actor: { type: "clinician"; id: string };
    finalita: z.infer<typeof finalitaSchema>;
    tenantId: string;
  },
  b: BookingAttempt,
): Promise<SchedulerActionResult> {
  if (b.with_contrast) {
    const egfr = await latestEgfr(db, b.patient_id);
    if (egfr !== null && egfr < 60) {
      return {
        kind: "needs_egfr_confirmation",
        appointment: {
          patient_id: b.patient_id,
          patient_label: b.patient_label,
          room_id: b.room_id,
          slot_start_at: b.slot_start_at,
          slot_end_at: b.slot_end_at,
          subtype: b.subtype,
          egfr_value: egfr,
        },
        timing: {
          micCloseTs: b.micCloseTs,
          intentParsedTs: b.intentParsedTs,
          rpcDoneTs: b.intentParsedTs,
          broadcastSentTs: b.intentParsedTs,
          modelLatencyMs: b.modelLatencyMs,
        },
      };
    }
  }

  const created = await createAppointment(
    db,
    {
      room_id: b.room_id,
      patient_id: b.patient_id,
      kind: b.kind,
      subtype: b.subtype,
      with_contrast: b.with_contrast,
      slot_start_at: b.slot_start_at,
      slot_end_at: b.slot_end_at,
      notes: b.notes,
    },
    ctx,
  );
  const rpcDoneTs = Date.now();
  const channelId = CHANNEL_FOR_ROOM(b.room_id);
  recordAction(ctx.tenantId, channelId, {
    kind: "create",
    appointmentId: created.appointment_id,
    when: new Date().toISOString(),
    slotStartLocal: b.slot_start_at,
  });
  await broadcastScheduler(db, ctx.tenantId, b.room_id, {
    v: 1,
    type: "appointment.created",
    appointment_id: created.appointment_id,
    room_id: b.room_id,
    slot_start_at: b.slot_start_at,
    slot_end_at: b.slot_end_at,
    kind: b.kind,
    subtype: b.subtype,
    with_contrast: b.with_contrast,
    patient_id: b.patient_id,
    occurred_at: new Date().toISOString(),
  });
  const broadcastSentTs = Date.now();
  const subtypeTxt = b.subtype ? ` ${b.subtype}` : "";
  const message = `booked ${b.kind}${subtypeTxt} for ${b.patient_label} at ${prettySlot(b.slot_start_at)}`;
  return ok(message, created.appointment_id, {
    micCloseTs: b.micCloseTs,
    intentParsedTs: b.intentParsedTs,
    rpcDoneTs,
    broadcastSentTs,
    modelLatencyMs: b.modelLatencyMs,
  });
}

async function handleMove(
  db: DB,
  ctx: {
    actor: { type: "clinician"; id: string };
    finalita: z.infer<typeof finalitaSchema>;
    tenantId: string;
  },
  channelId: string,
  todayLocal: string,
  reference: string,
  newSlotStartLocal: string,
  trace: { micCloseTs: number | null; intentParsedTs: number; modelLatencyMs: number },
): Promise<SchedulerActionResult> {
  const dayStart = new Date(todayLocal + "T00:00:00").toISOString();
  const dayEnd = new Date(new Date(todayLocal).getTime() + 2 * 24 * 3600_000).toISOString();
  const resolved = await resolveReference(db, {
    reference,
    tenantId: ctx.tenantId,
    channelId,
    roomId: "CT1",
    dayStart,
    dayEnd,
  });
  if (resolved.kind === "ambiguous") {
    return {
      kind: "needs_disambiguation",
      reason: `multiple appointments match "${reference}"`,
      candidates: resolved.candidates.map((id) => ({ id, label: id })),
    };
  }
  if (resolved.kind === "not_found") {
    return { kind: "error", reason: `no appointment matches "${reference}"` };
  }
  const slotStart = new Date(newSlotStartLocal);
  const slotEnd = new Date(slotStart.getTime() + DEFAULT_DURATION_MIN * 60_000);
  await updateAppointment(
    db,
    resolved.appointmentId,
    { slot_start_at: slotStart.toISOString(), slot_end_at: slotEnd.toISOString() },
    ctx,
  );
  const rpcDoneTs = Date.now();
  recordAction(ctx.tenantId, channelId, {
    kind: "update",
    appointmentId: resolved.appointmentId,
    when: new Date().toISOString(),
    slotStartLocal: slotStart.toISOString(),
  });
  await broadcastScheduler(db, ctx.tenantId, "CT1", {
    v: 1,
    type: "appointment.updated",
    appointment_id: resolved.appointmentId,
    room_id: "CT1",
    slot_start_at: slotStart.toISOString(),
    slot_end_at: slotEnd.toISOString(),
    changed_fields: ["slot_start_at", "slot_end_at"],
    occurred_at: new Date().toISOString(),
  });
  const broadcastSentTs = Date.now();
  return ok(`moved to ${prettySlot(slotStart.toISOString())}`, resolved.appointmentId, {
    micCloseTs: trace.micCloseTs,
    intentParsedTs: trace.intentParsedTs,
    rpcDoneTs,
    broadcastSentTs,
    modelLatencyMs: trace.modelLatencyMs,
  });
}

async function handleCancel(
  db: DB,
  ctx: {
    actor: { type: "clinician"; id: string };
    finalita: z.infer<typeof finalitaSchema>;
    tenantId: string;
  },
  channelId: string,
  todayLocal: string,
  reference: string,
  trace: { micCloseTs: number | null; intentParsedTs: number; modelLatencyMs: number },
): Promise<SchedulerActionResult> {
  const dayStart = new Date(todayLocal + "T00:00:00").toISOString();
  const dayEnd = new Date(new Date(todayLocal).getTime() + 2 * 24 * 3600_000).toISOString();
  const resolved = await resolveReference(db, {
    reference,
    tenantId: ctx.tenantId,
    channelId,
    roomId: "CT1",
    dayStart,
    dayEnd,
  });
  if (resolved.kind === "ambiguous") {
    return {
      kind: "needs_disambiguation",
      reason: `multiple appointments match "${reference}"`,
      candidates: resolved.candidates.map((id) => ({ id, label: id })),
    };
  }
  if (resolved.kind === "not_found") {
    return { kind: "error", reason: `no appointment matches "${reference}"` };
  }
  await cancelAppointment(db, resolved.appointmentId, ctx);
  const rpcDoneTs = Date.now();
  recordAction(ctx.tenantId, channelId, {
    kind: "cancel",
    appointmentId: resolved.appointmentId,
    when: new Date().toISOString(),
    slotStartLocal: new Date().toISOString(),
  });
  await broadcastScheduler(db, ctx.tenantId, "CT1", {
    v: 1,
    type: "appointment.cancelled",
    appointment_id: resolved.appointmentId,
    room_id: "CT1",
    occurred_at: new Date().toISOString(),
  });
  const broadcastSentTs = Date.now();
  return ok("cancelled", resolved.appointmentId, {
    micCloseTs: trace.micCloseTs,
    intentParsedTs: trace.intentParsedTs,
    rpcDoneTs,
    broadcastSentTs,
    modelLatencyMs: trace.modelLatencyMs,
  });
}

function ok(
  message: string,
  appointmentId: string | undefined,
  timing: TimingTrace,
): SchedulerActionResult {
  return { kind: "ok", message, appointmentId, timing };
}

const ORDINAL_INDEX: Record<string, number> = {
  first: 0,
  "1": 0,
  "1st": 0,
  one: 0,
  second: 1,
  "2": 1,
  "2nd": 1,
  two: 1,
  third: 2,
  "3": 2,
  "3rd": 2,
  three: 2,
  fourth: 3,
  "4": 3,
  "4th": 3,
  four: 3,
  fifth: 4,
  "5": 4,
  "5th": 4,
  five: 4,
};

function matchCandidate(
  selection: string,
  candidates: PendingDisambiguation["candidates"],
):
  | { kind: "unique"; chosen: { id: string; label: string } }
  | { kind: "ambiguous"; matches: { id: string; label: string }[] }
  | { kind: "none" } {
  const s = selection.toLowerCase().trim().replace(/[.,!?]$/g, "");
  if (candidates.length === 0) return { kind: "none" };

  const ordMatch = s.match(/\b(?:the\s+)?(first|second|third|fourth|fifth|1|2|3|4|5|1st|2nd|3rd|4th|5th|one|two|three|four|five)\b/);
  if (ordMatch) {
    const idx = ORDINAL_INDEX[ordMatch[1]!];
    if (idx !== undefined && idx < candidates.length) {
      return { kind: "unique", chosen: candidates[idx]! };
    }
  }

  const matches = candidates.filter((c) => {
    const label = c.label.toLowerCase();
    if (label === s) return true;
    return s.split(/\s+/).every((tok) => label.includes(tok));
  });
  if (matches.length === 1) return { kind: "unique", chosen: matches[0]! };
  if (matches.length > 1) return { kind: "ambiguous", matches };
  return { kind: "none" };
}

async function lookupSinglePatient(db: DB, patientQuery: string): Promise<string | null> {
  const trimmed = patientQuery.trim();
  const parts = trimmed.split(/\s+/);
  let query = db.from("patients").select("id, given_name, family_name").is("deleted_at", null);
  if (parts.length >= 2) {
    query = query
      .ilike("family_name", `%${parts[parts.length - 1]!}%`)
      .ilike("given_name", `%${parts[0]!}%`);
  } else {
    query = query.ilike("family_name", `%${trimmed}%`);
  }
  const { data, error } = await query.limit(2);
  if (error) throw error;
  if (!data || data.length === 0) return null;
  if (data.length > 1) return null;
  return data[0]!.id;
}

async function lookupCandidates(
  db: DB,
  patientQuery: string,
): Promise<{ id: string; label: string }[]> {
  const trimmed = patientQuery.trim();
  const parts = trimmed.split(/\s+/);
  const lastName = parts[parts.length - 1]!;
  const { data } = await db
    .from("patients")
    .select("id, given_name, family_name")
    .is("deleted_at", null)
    .ilike("family_name", `%${lastName}%`)
    .limit(5);
  return (data ?? []).map((p) => ({ id: p.id, label: `${p.given_name} ${p.family_name}` }));
}

async function latestEgfr(db: DB, patientId: string): Promise<number | null> {
  const { data } = await db
    .from("egfr_results")
    .select("value")
    .eq("patient_id", patientId)
    .order("taken_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data ? Number(data.value) : null;
}

async function broadcastScheduler(
  db: DB,
  tenantId: string,
  roomId: string,
  payload: SchedulerBroadcastV1,
): Promise<void> {
  const topic = schedulerChannelTopic(tenantId, roomId);
  const channel = db.channel(topic, { config: { private: true } });
  await channel.send({ type: "broadcast", event: SCHEDULER_BROADCAST_EVENT, payload });
  await db.removeChannel(channel);
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function prettySlot(iso: string): string {
  // UTC to match grid bucketing (SchedulerGrid renders by UTC hour). See the
  // note there on Phase 0 timezone handling.
  const d = new Date(iso);
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
}
