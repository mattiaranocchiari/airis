import { randomUUID } from "node:crypto";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import { buildEvent, type Actor } from "@/lib/cloudevents";
import type { Finalita } from "@/lib/finalita";
import type { Database } from "@/lib/supabase/types";

type DB = SupabaseClient<Database>;

const rpcResult = z.object({
  appointment_id: z.string().uuid(),
  audit_event_id: z.string().uuid(),
  event_id: z.string(),
});

export type AppointmentCreateInput = {
  room_id: string;
  patient_id: string;
  kind: string;
  subtype: string | null;
  with_contrast: boolean;
  slot_start_at: string;
  slot_end_at: string;
  notes: string | null;
};

export type AppointmentUpdateInput = {
  subtype?: string | null;
  with_contrast?: boolean | null;
  slot_start_at?: string | null;
  slot_end_at?: string | null;
  notes?: string | null;
};

export type MutationContext = {
  actor: Actor;
  finalita: Finalita;
  tenantId: string;
};

export type AppointmentRow = Database["public"]["Tables"]["appointments"]["Row"];

export type MutationResult = z.infer<typeof rpcResult>;

export async function createAppointment(
  db: DB,
  input: AppointmentCreateInput,
  ctx: MutationContext,
): Promise<MutationResult> {
  const appointmentId = randomUUID();
  const event = buildEvent("core.appointment.created.v1", {
    subject: appointmentId,
    tenantId: ctx.tenantId,
    actor: ctx.actor,
    source: "airis://core/scheduler",
    data: {
      appointment_id: appointmentId,
      room_id: input.room_id,
      patient_id: input.patient_id,
      kind: input.kind,
      subtype: input.subtype,
      with_contrast: input.with_contrast,
      slot_start_at: input.slot_start_at,
      slot_end_at: input.slot_end_at,
      notes: input.notes,
    },
  });

  const { data, error } = await db.rpc("appointment_create", {
    p_appointment_id: appointmentId,
    p_room_id: input.room_id,
    p_patient_id: input.patient_id,
    p_kind: input.kind,
    p_subtype: input.subtype,
    p_with_contrast: input.with_contrast,
    p_slot_start_at: input.slot_start_at,
    p_slot_end_at: input.slot_end_at,
    p_notes: input.notes,
    p_finalita: ctx.finalita,
    p_cloudevent_id: event.id,
    p_cloudevent: event as unknown as Database["public"]["Tables"]["event_queue"]["Insert"]["cloudevent"],
  });
  if (error) throw error;
  return rpcResult.parse(data);
}

const updatableFields = [
  "subtype",
  "with_contrast",
  "slot_start_at",
  "slot_end_at",
  "notes",
] as const;
type UpdatableField = (typeof updatableFields)[number];

export async function updateAppointment(
  db: DB,
  appointmentId: string,
  input: AppointmentUpdateInput,
  ctx: MutationContext,
): Promise<MutationResult> {
  const changed: UpdatableField[] = updatableFields.filter(
    (k) => input[k] !== undefined,
  );
  if (changed.length === 0) {
    throw new Error("no fields to update");
  }

  const event = buildEvent("core.appointment.updated.v1", {
    subject: appointmentId,
    tenantId: ctx.tenantId,
    actor: ctx.actor,
    source: "airis://core/scheduler",
    data: { appointment_id: appointmentId, changed_fields: changed },
  });

  const { data, error } = await db.rpc("appointment_update", {
    p_appointment_id: appointmentId,
    p_subtype: input.subtype ?? null,
    p_with_contrast: input.with_contrast ?? null,
    p_slot_start_at: input.slot_start_at ?? null,
    p_slot_end_at: input.slot_end_at ?? null,
    p_notes: input.notes ?? null,
    p_finalita: ctx.finalita,
    p_cloudevent_id: event.id,
    p_cloudevent: event as unknown as Database["public"]["Tables"]["event_queue"]["Insert"]["cloudevent"],
  });
  if (error) throw error;
  return rpcResult.parse(data);
}

export async function cancelAppointment(
  db: DB,
  appointmentId: string,
  ctx: MutationContext,
): Promise<MutationResult> {
  const event = buildEvent("core.appointment.cancelled.v1", {
    subject: appointmentId,
    tenantId: ctx.tenantId,
    actor: ctx.actor,
    source: "airis://core/scheduler",
    data: { appointment_id: appointmentId },
  });

  const { data, error } = await db.rpc("appointment_cancel", {
    p_appointment_id: appointmentId,
    p_finalita: ctx.finalita,
    p_cloudevent_id: event.id,
    p_cloudevent: event as unknown as Database["public"]["Tables"]["event_queue"]["Insert"]["cloudevent"],
  });
  if (error) throw error;
  return rpcResult.parse(data);
}

export type ListAppointmentsFilter = {
  roomId?: string;
  range?: { from: string; to: string };
};

export async function listAppointments(
  db: DB,
  filter: ListAppointmentsFilter = {},
): Promise<AppointmentRow[]> {
  // RLS scopes to tenant; soft-delete filter is application-side (see
  // migration 0015 + notes.md for why the SELECT policy can't carry it).
  let q = db
    .from("appointments")
    .select("*")
    .is("deleted_at", null)
    .order("slot_start_at", { ascending: true });
  if (filter.roomId) {
    q = q.eq("room_id", filter.roomId);
  }
  if (filter.range) {
    q = q.gte("slot_start_at", filter.range.from).lt("slot_start_at", filter.range.to);
  }
  const { data, error } = await q;
  if (error) throw error;
  return data ?? [];
}

export async function getAppointment(
  db: DB,
  appointmentId: string,
): Promise<AppointmentRow | null> {
  const { data, error } = await db
    .from("appointments")
    .select("*")
    .eq("id", appointmentId)
    .is("deleted_at", null)
    .maybeSingle();
  if (error) throw error;
  return data;
}
