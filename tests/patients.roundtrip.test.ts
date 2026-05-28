import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createPatient, deletePatient, updatePatient } from "@/lib/db/patients";
import { adminClient, userClient } from "./lib/clients";
import {
  createTestClinician,
  deleteTestClinician,
  type TestClinician,
} from "./lib/test-clinician";
import type { CloudEvent } from "@/lib/cloudevents";
import { hasLiveDbEnv } from "./setup";

const describeIfLiveDb = hasLiveDbEnv ? describe : describe.skip;

// End-to-end round trip against the real Supabase project: create + update +
// delete a patient as an RLS-scoped clinician, then verify (with the admin
// client, bypassing RLS) that:
//   1. the patients row landed,
//   2. each mutation emitted a CloudEvents envelope into event_queue,
//   3. the L6 audit chain grew by one row per mutation, with prev_hash on
//      row N equal to content_hash on row N-1.
// Tenant isolation enforced via test-only tenant ids per run; teardown
// removes every row belonging to those tenants.

describeIfLiveDb("Patient Registry round trip", () => {
  let clinician: TestClinician;

  beforeEach(async () => {
    clinician = await createTestClinician({});
  });

  afterEach(async () => {
    await deleteTestClinician(clinician);
  });

  it("creates, updates, soft-deletes — chain links and envelopes land", async () => {
    const db = userClient(clinician.accessToken);
    const admin = adminClient();
    const actor = { type: "clinician" as const, id: clinician.authUserId };
    const ctx = { actor, finalita: "amministrativo" as const, tenantId: clinician.tenantId };

    const created = await createPatient(
      db,
      {
        codice_fiscale: "RSSMRA80A01H501U",
        given_name: "Mario",
        family_name: "Rossi",
        date_of_birth: "1980-01-01",
        sex: "M",
      },
      ctx,
    );

    const updated = await updatePatient(db, created.patient_id, { given_name: "Marco" }, ctx);
    const deleted = await deletePatient(db, created.patient_id, ctx);

    // Patient row.
    const { data: patient } = await admin
      .from("patients")
      .select("*")
      .eq("id", created.patient_id)
      .single();
    expect(patient).toMatchObject({
      given_name: "Marco",
      family_name: "Rossi",
      codice_fiscale: "RSSMRA80A01H501U",
      tenant_id: clinician.tenantId,
      created_by: clinician.authUserId,
    });
    expect(patient!.deleted_at).not.toBeNull();

    // Outbox: three CloudEvents envelopes.
    const { data: events } = await admin
      .from("event_queue")
      .select("*")
      .eq("tenant_id", clinician.tenantId)
      .order("created_at", { ascending: true });
    expect(events).toHaveLength(3);
    const types = events!.map((e) => (e.cloudevent as unknown as CloudEvent).type);
    expect(types).toEqual([
      "core.patient.created.v1",
      "core.patient.updated.v1",
      "core.patient.deleted.v1",
    ]);
    for (const row of events!) {
      const ev = row.cloudevent as unknown as CloudEvent;
      expect(ev.specversion).toBe("1.0");
      expect(ev.tenantid).toBe(clinician.tenantId);
      expect(ev.subject).toBe(created.patient_id);
      expect(ev.actor.id).toBe(clinician.authUserId);
    }

    // Audit chain: three rows, prev_hash on row N == content_hash on row N-1.
    // Order by chain_sequence (deterministic per-tenant), not timestamp.
    const { data: audits } = await admin
      .from("audit_events")
      .select("*")
      .eq("tenant_id", clinician.tenantId)
      .order("chain_sequence", { ascending: true });
    expect(audits).toHaveLength(3);
    expect(audits![0].prev_hash).toBeNull(); // genesis
    expect(audits![0].chain_sequence).toBe(1);
    expect(audits![1].chain_sequence).toBe(2);
    expect(audits![2].chain_sequence).toBe(3);
    expect(audits![1].prev_hash).toBe(audits![0].content_hash);
    expect(audits![2].prev_hash).toBe(audits![1].content_hash);
    expect(audits!.map((a) => a.event_type)).toEqual([
      "core.patient.created.v1",
      "core.patient.updated.v1",
      "core.patient.deleted.v1",
    ]);
    for (const a of audits!) {
      expect(a.finalita).toBe("amministrativo");
      expect(a.subject).toBe(created.patient_id);
      expect(a.source_subsystem).toBe("core.patient_registry");
      expect((a.actor as { id: string }).id).toBe(clinician.authUserId);
    }

    // Mutation results return ids that match what landed.
    expect(updated.event_id).toBe(events![1].id);
    expect(deleted.event_id).toBe(events![2].id);
    expect(audits!.map((a) => a.event_id)).toContain(updated.audit_event_id);
    expect(audits!.map((a) => a.event_id)).toContain(deleted.audit_event_id);
  });

  it("RLS isolates patients across tenants", async () => {
    const other = await createTestClinician({});
    try {
      const dbA = userClient(clinician.accessToken);
      const ctxA = {
        actor: { type: "clinician" as const, id: clinician.authUserId },
        finalita: "amministrativo" as const,
        tenantId: clinician.tenantId,
      };
      const created = await createPatient(
        dbA,
        { codice_fiscale: null, given_name: "A", family_name: "Test", date_of_birth: null, sex: null },
        ctxA,
      );

      const dbB = userClient(other.accessToken);
      const { data: visible } = await dbB.from("patients").select("*").eq("id", created.patient_id);
      expect(visible ?? []).toHaveLength(0);
    } finally {
      await deleteTestClinician(other);
    }
  });

  it("create on default soft-delete-filter: list excludes deleted rows", async () => {
    const db = userClient(clinician.accessToken);
    const ctx = {
      actor: { type: "clinician" as const, id: clinician.authUserId },
      finalita: "amministrativo" as const,
      tenantId: clinician.tenantId,
    };
    const alive = await createPatient(
      db,
      { codice_fiscale: null, given_name: "Alive", family_name: "P", date_of_birth: null, sex: null },
      ctx,
    );
    const gone = await createPatient(
      db,
      { codice_fiscale: null, given_name: "Gone", family_name: "P", date_of_birth: null, sex: null },
      ctx,
    );
    await deletePatient(db, gone.patient_id, ctx);

    const { data: list } = await db.from("patients").select("id");
    const ids = (list ?? []).map((r) => r.id);
    expect(ids).toContain(alive.patient_id);
    expect(ids).not.toContain(gone.patient_id);
  });
});
