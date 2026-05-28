"use server";

import { randomUUID } from "node:crypto";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  cancelAppointment,
  createAppointment,
  listAppointments,
  updateAppointment,
} from "@/lib/db/appointments";
import { parseIntent } from "@/lib/intents/parse";
import { Intent } from "@/lib/intents/schema";
import { createAnthropicProvider } from "@/lib/llm/anthropic";
import {
  channelTopicFor,
  recordAction,
  recordUtterance,
  resolveReference,
} from "@/lib/consciousness";
import {
  SCHEDULER_BROADCAST_EVENT,
  schedulerChannelTopic,
  type SchedulerBroadcastV1,
} from "@/lib/realtime/channel";

const finalitaSchema = z.enum([
  "cura_diretta",
  "assistenza",
  "amministrativo",
  "verifica_qualita",
  "urgenza_break_glass",
]);

export type SchedulerActionResult =
  | { kind: "ok"; message: string; appointmentId?: string; timing: TimingTrace }
  | { kind: "needs_disambiguation"; reason: string; candidates: { id: string; label: string }[] }
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

  const channelId = `scheduler:CT1`;
  recordUtterance(tenantId, channelId, utterance);

  const provider = createAnthropicProvider();
  const todayLocal = new Date().toISOString().slice(0, 10);
  const parsed = await parseIntent(
    { utterance, context: { todayLocalDate: todayLocal, currentRoomId: "CT1" } },
    provider,
  );
  const intent: Intent = parsed.intent;
  const intentParsedTs = Date.now();

  const ctx = { actor: { type: "clinician" as const, id: user.id }, finalita, tenantId };

  if (intent.intent === "view_schedule") {
    return {
      kind: "ok",
      message: `view ${intent.room_id} ${intent.when}`,
      timing: {
        micCloseTs,
        intentParsedTs,
        rpcDoneTs: intentParsedTs,
        broadcastSentTs: intentParsedTs,
        modelLatencyMs: parsed.modelLatencyMs,
      },
    };
  }

  if (intent.intent === "book_appointment") {
    const slotStart = new Date(intent.slot_start_local);
    const slotEnd = new Date(slotStart.getTime() + intent.duration_minutes * 60_000);
    const patientId = await lookupSinglePatient(db, intent.patient_query);
    if (!patientId) {
      return {
        kind: "needs_disambiguation",
        reason: `multiple patients match "${intent.patient_query}"`,
        candidates: await lookupCandidates(db, intent.patient_query),
      };
    }

    if (intent.with_contrast) {
      const egfr = await latestEgfr(db, patientId);
      if (egfr !== null && egfr < 60) {
        return {
          kind: "needs_egfr_confirmation",
          appointment: {
            patient_id: patientId,
            patient_label: intent.patient_query,
            room_id: intent.room_id,
            slot_start_at: slotStart.toISOString(),
            slot_end_at: slotEnd.toISOString(),
            subtype: intent.subtype,
            egfr_value: egfr,
          },
          timing: {
            micCloseTs,
            intentParsedTs,
            rpcDoneTs: intentParsedTs,
            broadcastSentTs: intentParsedTs,
            modelLatencyMs: parsed.modelLatencyMs,
          },
        };
      }
    }

    const created = await createAppointment(
      db,
      {
        room_id: intent.room_id,
        patient_id: patientId,
        kind: intent.kind,
        subtype: intent.subtype,
        with_contrast: intent.with_contrast,
        slot_start_at: slotStart.toISOString(),
        slot_end_at: slotEnd.toISOString(),
        notes: null,
      },
      ctx,
    );
    const rpcDoneTs = Date.now();
    recordAction(tenantId, channelId, {
      kind: "create",
      appointmentId: created.appointment_id,
      when: new Date().toISOString(),
      slotStartLocal: slotStart.toISOString(),
    });
    await broadcastScheduler(db, tenantId, intent.room_id, {
      v: 1,
      type: "appointment.created",
      appointment_id: created.appointment_id,
      room_id: intent.room_id,
      slot_start_at: slotStart.toISOString(),
      slot_end_at: slotEnd.toISOString(),
      kind: intent.kind,
      subtype: intent.subtype,
      with_contrast: intent.with_contrast,
      patient_id: patientId,
      occurred_at: new Date().toISOString(),
    });
    const broadcastSentTs = Date.now();
    return {
      kind: "ok",
      message: `booked ${intent.kind} ${intent.subtype ?? ""} at ${slotStart.toISOString()}`.trim(),
      appointmentId: created.appointment_id,
      timing: { micCloseTs, intentParsedTs, rpcDoneTs, broadcastSentTs, modelLatencyMs: parsed.modelLatencyMs },
    };
  }

  if (intent.intent === "move_appointment") {
    const todayStart = new Date(todayLocal + "T00:00:00").toISOString();
    const dayAfter = new Date(new Date(todayLocal).getTime() + 2 * 24 * 3600_000).toISOString();
    const resolved = await resolveReference(db, {
      reference: intent.reference,
      tenantId,
      channelId,
      roomId: "CT1",
      dayStart: todayStart,
      dayEnd: dayAfter,
    });
    if (resolved.kind === "ambiguous") {
      return {
        kind: "needs_disambiguation",
        reason: `multiple appointments match "${intent.reference}"`,
        candidates: resolved.candidates.map((id) => ({ id, label: id })),
      };
    }
    if (resolved.kind === "not_found") {
      return { kind: "error", reason: `no appointment matches "${intent.reference}"` };
    }
    const slotStart = new Date(intent.new_slot_start_local);
    const slotEnd = new Date(slotStart.getTime() + DEFAULT_DURATION_MIN * 60_000);
    await updateAppointment(
      db,
      resolved.appointmentId,
      { slot_start_at: slotStart.toISOString(), slot_end_at: slotEnd.toISOString() },
      ctx,
    );
    const rpcDoneTs = Date.now();
    recordAction(tenantId, channelId, {
      kind: "update",
      appointmentId: resolved.appointmentId,
      when: new Date().toISOString(),
      slotStartLocal: slotStart.toISOString(),
    });
    await broadcastScheduler(db, tenantId, "CT1", {
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
    return {
      kind: "ok",
      message: `moved to ${slotStart.toISOString()}`,
      appointmentId: resolved.appointmentId,
      timing: { micCloseTs, intentParsedTs, rpcDoneTs, broadcastSentTs, modelLatencyMs: parsed.modelLatencyMs },
    };
  }

  if (intent.intent === "cancel_appointment") {
    const todayStart = new Date(todayLocal + "T00:00:00").toISOString();
    const dayAfter = new Date(new Date(todayLocal).getTime() + 2 * 24 * 3600_000).toISOString();
    const resolved = await resolveReference(db, {
      reference: intent.reference,
      tenantId,
      channelId,
      roomId: "CT1",
      dayStart: todayStart,
      dayEnd: dayAfter,
    });
    if (resolved.kind === "ambiguous") {
      return {
        kind: "needs_disambiguation",
        reason: `multiple appointments match "${intent.reference}"`,
        candidates: resolved.candidates.map((id) => ({ id, label: id })),
      };
    }
    if (resolved.kind === "not_found") {
      return { kind: "error", reason: `no appointment matches "${intent.reference}"` };
    }
    await cancelAppointment(db, resolved.appointmentId, ctx);
    const rpcDoneTs = Date.now();
    recordAction(tenantId, channelId, {
      kind: "cancel",
      appointmentId: resolved.appointmentId,
      when: new Date().toISOString(),
      slotStartLocal: new Date().toISOString(),
    });
    await broadcastScheduler(db, tenantId, "CT1", {
      v: 1,
      type: "appointment.cancelled",
      appointment_id: resolved.appointmentId,
      room_id: "CT1",
      occurred_at: new Date().toISOString(),
    });
    const broadcastSentTs = Date.now();
    return {
      kind: "ok",
      message: `cancelled`,
      appointmentId: resolved.appointmentId,
      timing: { micCloseTs, intentParsedTs, rpcDoneTs, broadcastSentTs, modelLatencyMs: parsed.modelLatencyMs },
    };
  }

  // disambiguate_patient — handled by the caller against the in-flight prompt;
  // here we simply ack so the L3 cache records the utterance.
  return {
    kind: "ok",
    message: `noted: ${intent.selection}`,
    timing: {
      micCloseTs,
      intentParsedTs,
      rpcDoneTs: intentParsedTs,
      broadcastSentTs: intentParsedTs,
      modelLatencyMs: parsed.modelLatencyMs,
    },
  };
  // void to satisfy unused-import warnings if a path doesn't use them
  void Intent;
  void channelTopicFor;
  void randomUUID;
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
  const channelId = `scheduler:${pending.room_id}`;
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

async function lookupSinglePatient(
  db: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  patientQuery: string,
): Promise<string | null> {
  const trimmed = patientQuery.trim();
  const parts = trimmed.split(/\s+/);
  let query = db.from("patients").select("id, given_name, family_name").is("deleted_at", null);
  if (parts.length >= 2) {
    query = query.ilike("family_name", `%${parts[parts.length - 1]!}%`).ilike("given_name", `%${parts[0]!}%`);
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
  db: Awaited<ReturnType<typeof createSupabaseServerClient>>,
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

async function latestEgfr(
  db: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  patientId: string,
): Promise<number | null> {
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
  db: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  tenantId: string,
  roomId: string,
  payload: SchedulerBroadcastV1,
): Promise<void> {
  const topic = schedulerChannelTopic(tenantId, roomId);
  const channel = db.channel(topic, { config: { private: true } });
  await channel.send({ type: "broadcast", event: SCHEDULER_BROADCAST_EVENT, payload });
  await db.removeChannel(channel);
}
