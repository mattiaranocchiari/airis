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

export type PatientCreateInput = {
  codice_fiscale: string | null;
  given_name: string;
  family_name: string;
  date_of_birth: string | null;
  sex: string | null;
};

export type PatientUpdateInput = Partial<PatientCreateInput>;

export type PatientRow = Database["public"]["Tables"]["patients"]["Row"];

export type MutationResult = AuditEmitResult & { patient_id: string };

export async function createPatient(
  db: DB,
  input: PatientCreateInput,
  ctx: MutationContext,
): Promise<MutationResult> {
  const patientId = randomUUID();
  const result = await emitAuditEvent(db, {
    type: "core.patient.created.v1",
    rpc: "patient_create",
    ctx,
    subject: patientId,
    data: {
      patient_id: patientId,
      codice_fiscale: input.codice_fiscale,
      given_name: input.given_name,
      family_name: input.family_name,
      date_of_birth: input.date_of_birth,
      sex: input.sex,
    },
    args: {
      p_patient_id: patientId,
      p_codice_fiscale: input.codice_fiscale,
      p_given_name: input.given_name,
      p_family_name: input.family_name,
      p_date_of_birth: input.date_of_birth,
      p_sex: input.sex,
    },
  });
  return { patient_id: patientId, ...result };
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

  const result = await emitAuditEvent(db, {
    type: "core.patient.updated.v1",
    rpc: "patient_update",
    ctx,
    subject: patientId,
    data: { patient_id: patientId, changed_fields: changed },
    args: {
      p_patient_id: patientId,
      p_codice_fiscale: input.codice_fiscale ?? null,
      p_given_name: input.given_name ?? null,
      p_family_name: input.family_name ?? null,
      p_date_of_birth: input.date_of_birth ?? null,
      p_sex: input.sex ?? null,
    },
  });
  return { patient_id: patientId, ...result };
}

export async function deletePatient(
  db: DB,
  patientId: string,
  ctx: MutationContext,
): Promise<MutationResult> {
  const result = await emitAuditEvent(db, {
    type: "core.patient.deleted.v1",
    rpc: "patient_delete",
    ctx,
    subject: patientId,
    data: { patient_id: patientId },
    args: { p_patient_id: patientId },
  });
  return { patient_id: patientId, ...result };
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
