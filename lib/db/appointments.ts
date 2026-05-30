import { randomUUID } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  emitAuditEvent,
  type AuditEmitResult,
  type MutationContext,
} from "@/lib/audit/emitter";
import type { Database } from "@/lib/supabase/types";

type DB = SupabaseClient<Database>;

export type { MutationContext };

// Scheduler mutations carry their own CloudEvents source so the audit row's
// source_subsystem reads `core.scheduler` (vs. the patient-registry default).
const SCHEDULER_SOURCE = "airis://core/scheduler";

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

export type AppointmentRow = Database["public"]["Tables"]["appointments"]["Row"];

export type MutationResult = AuditEmitResult & { appointment_id: string };

export async function createAppointment(
  db: DB,
  input: AppointmentCreateInput,
  ctx: MutationContext,
): Promise<MutationResult> {
  const appointmentId = randomUUID();
  const result = await emitAuditEvent(db, {
    type: "core.appointment.created.v1",
    rpc: "appointment_create",
    ctx,
    subject: appointmentId,
    source: SCHEDULER_SOURCE,
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
    args: {
      p_appointment_id: appointmentId,
      p_room_id: input.room_id,
      p_patient_id: input.patient_id,
      p_kind: input.kind,
      p_subtype: input.subtype,
      p_with_contrast: input.with_contrast,
      p_slot_start_at: input.slot_start_at,
      p_slot_end_at: input.slot_end_at,
      p_notes: input.notes,
    },
  });
  return { appointment_id: appointmentId, ...result };
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

  const result = await emitAuditEvent(db, {
    type: "core.appointment.updated.v1",
    rpc: "appointment_update",
    ctx,
    subject: appointmentId,
    source: SCHEDULER_SOURCE,
    data: { appointment_id: appointmentId, changed_fields: changed },
    args: {
      p_appointment_id: appointmentId,
      p_subtype: input.subtype ?? null,
      p_with_contrast: input.with_contrast ?? null,
      p_slot_start_at: input.slot_start_at ?? null,
      p_slot_end_at: input.slot_end_at ?? null,
      p_notes: input.notes ?? null,
    },
  });
  return { appointment_id: appointmentId, ...result };
}

export async function cancelAppointment(
  db: DB,
  appointmentId: string,
  ctx: MutationContext,
): Promise<MutationResult> {
  const result = await emitAuditEvent(db, {
    type: "core.appointment.cancelled.v1",
    rpc: "appointment_cancel",
    ctx,
    subject: appointmentId,
    source: SCHEDULER_SOURCE,
    data: { appointment_id: appointmentId },
    args: { p_appointment_id: appointmentId },
  });
  return { appointment_id: appointmentId, ...result };
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
