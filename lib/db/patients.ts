import { randomUUID } from "node:crypto";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import { buildEvent, type Actor } from "@/lib/cloudevents";
import type { Finalita } from "@/lib/finalita";
import type { Database } from "@/lib/supabase/types";

type DB = SupabaseClient<Database>;

const rpcResult = z.object({
  patient_id: z.string().uuid(),
  audit_event_id: z.string().uuid(),
  event_id: z.string(),
});

export type PatientCreateInput = {
  codice_fiscale: string | null;
  given_name: string;
  family_name: string;
  date_of_birth: string | null;
  sex: string | null;
};

export type PatientUpdateInput = Partial<PatientCreateInput>;

export type MutationContext = {
  actor: Actor;
  finalita: Finalita;
  tenantId: string;
};

export type PatientRow = Database["public"]["Tables"]["patients"]["Row"];

export type MutationResult = z.infer<typeof rpcResult>;

export async function createPatient(
  db: DB,
  input: PatientCreateInput,
  ctx: MutationContext,
): Promise<MutationResult> {
  const patientId = randomUUID();
  const event = buildEvent("core.patient.created.v1", {
    subject: patientId,
    tenantId: ctx.tenantId,
    actor: ctx.actor,
    data: {
      patient_id: patientId,
      codice_fiscale: input.codice_fiscale,
      given_name: input.given_name,
      family_name: input.family_name,
      date_of_birth: input.date_of_birth,
      sex: input.sex,
    },
  });

  const { data, error } = await db.rpc("patient_create", {
    p_patient_id: patientId,
    p_codice_fiscale: input.codice_fiscale,
    p_given_name: input.given_name,
    p_family_name: input.family_name,
    p_date_of_birth: input.date_of_birth,
    p_sex: input.sex,
    p_finalita: ctx.finalita,
    p_cloudevent_id: event.id,
    p_cloudevent: event as unknown as Database["public"]["Tables"]["event_queue"]["Insert"]["cloudevent"],
  });
  if (error) throw error;
  return rpcResult.parse(data);
}

export async function updatePatient(
  db: DB,
  patientId: string,
  input: PatientUpdateInput,
  ctx: MutationContext,
): Promise<MutationResult> {
  const changed = Object.entries(input)
    .filter(([, v]) => v !== undefined)
    .map(([k]) => k) as Array<
    "codice_fiscale" | "given_name" | "family_name" | "date_of_birth" | "sex"
  >;
  if (changed.length === 0) {
    throw new Error("no fields to update");
  }

  const event = buildEvent("core.patient.updated.v1", {
    subject: patientId,
    tenantId: ctx.tenantId,
    actor: ctx.actor,
    data: { patient_id: patientId, changed_fields: changed },
  });

  const { data, error } = await db.rpc("patient_update", {
    p_patient_id: patientId,
    p_codice_fiscale: input.codice_fiscale ?? null,
    p_given_name: input.given_name ?? null,
    p_family_name: input.family_name ?? null,
    p_date_of_birth: input.date_of_birth ?? null,
    p_sex: input.sex ?? null,
    p_finalita: ctx.finalita,
    p_cloudevent_id: event.id,
    p_cloudevent: event as unknown as Database["public"]["Tables"]["event_queue"]["Insert"]["cloudevent"],
  });
  if (error) throw error;
  return rpcResult.parse(data);
}

export async function deletePatient(
  db: DB,
  patientId: string,
  ctx: MutationContext,
): Promise<MutationResult> {
  const event = buildEvent("core.patient.deleted.v1", {
    subject: patientId,
    tenantId: ctx.tenantId,
    actor: ctx.actor,
    data: { patient_id: patientId },
  });

  const { data, error } = await db.rpc("patient_delete", {
    p_patient_id: patientId,
    p_finalita: ctx.finalita,
    p_cloudevent_id: event.id,
    p_cloudevent: event as unknown as Database["public"]["Tables"]["event_queue"]["Insert"]["cloudevent"],
  });
  if (error) throw error;
  return rpcResult.parse(data);
}

export async function listPatients(db: DB): Promise<PatientRow[]> {
  // RLS enforces tenant scope; the soft-delete filter is application-side
  // (see migration 0015 for why — PG's RLS rejects UPDATEs that move a row
  // out of SELECT visibility, which collides with soft-delete-via-UPDATE).
  const { data, error } = await db
    .from("patients")
    .select("*")
    .is("deleted_at", null)
    .order("family_name", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getPatient(db: DB, patientId: string): Promise<PatientRow | null> {
  const { data, error } = await db
    .from("patients")
    .select("*")
    .eq("id", patientId)
    .is("deleted_at", null)
    .maybeSingle();
  if (error) throw error;
  return data;
}
