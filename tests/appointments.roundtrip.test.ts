import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  cancelAppointment,
  createAppointment,
  updateAppointment,
} from "@/lib/db/appointments";
import { createPatient } from "@/lib/db/patients";
import { adminClient, userClient } from "./lib/clients";
import {
  createTestClinician,
  deleteTestClinician,
  type TestClinician,
} from "./lib/test-clinician";
import type { CloudEvent } from "@/lib/cloudevents";
import { hasLiveDbEnv } from "./setup";

const describeIfLiveDb = hasLiveDbEnv ? describe : describe.skip;

// End-to-end round trip against the real Supabase project, mirroring the
// Step 4.2 patients round-trip exactly (D.17 hash chain + CloudEvents outbox +
// tenant RLS isolation) — proves the appointment_* RPCs share the same
// guarantees as patient_*.

describeIfLiveDb("Scheduler Appointment round trip", () => {
  let clinician: TestClinician;

  beforeEach(async () => {
    clinician = await createTestClinician({});
  });

  afterEach(async () => {
    await deleteTestClinician(clinician);
  });

  it("creates, moves, cancels — chain links and envelopes land", async () => {
    const db = userClient(clinician.accessToken);
    const admin = adminClient();
    const actor = { type: "clinician" as const, id: clinician.authUserId };
    const ctx = { actor, finalita: "cura_diretta" as const, tenantId: clinician.tenantId };

    // Seed a patient under the same clinician (patient_* RPC writes its own
    // audit row, which becomes chain_sequence=1 for this tenant).
    const patient = await createPatient(
      db,
      {
        codice_fiscale: null,
        given_name: "Marco",
        family_name: "Rossi",
        date_of_birth: "1980-01-01",
        sex: "M",
      },
      { ...ctx, finalita: "amministrativo" },
    );

    const start = new Date("2026-05-29T09:00:00Z").toISOString();
    const end = new Date("2026-05-29T09:30:00Z").toISOString();
    const created = await createAppointment(
      db,
      {
        room_id: "CT1",
        patient_id: patient.patient_id,
        kind: "CT",
        subtype: "abdomen",
        with_contrast: false,
        slot_start_at: start,
        slot_end_at: end,
        notes: null,
      },
      ctx,
    );

    const movedStart = new Date("2026-05-29T11:00:00Z").toISOString();
    const movedEnd = new Date("2026-05-29T11:30:00Z").toISOString();
    const moved = await updateAppointment(
      db,
      created.appointment_id,
      { slot_start_at: movedStart, slot_end_at: movedEnd },
      ctx,
    );

    const cancelled = await cancelAppointment(db, created.appointment_id, ctx);

    // Appointment row
    const { data: row } = await admin
      .from("appointments")
      .select("*")
      .eq("id", created.appointment_id)
      .single();
    expect(row).toMatchObject({
      room_id: "CT1",
      patient_id: patient.patient_id,
      kind: "CT",
      subtype: "abdomen",
      with_contrast: false,
      status: "cancelled",
      tenant_id: clinician.tenantId,
    });
    expect(row!.slot_start_at).toBe(movedStart);
    expect(row!.deleted_at).not.toBeNull();

    // Outbox: patient.created + appointment.created + .updated + .cancelled = 4
    const { data: events } = await admin
      .from("event_queue")
      .select("*")
      .eq("tenant_id", clinician.tenantId)
      .order("created_at", { ascending: true });
    const types = (events ?? []).map((e) => (e.cloudevent as unknown as CloudEvent).type);
    expect(types).toEqual([
      "core.patient.created.v1",
      "core.appointment.created.v1",
      "core.appointment.updated.v1",
      "core.appointment.cancelled.v1",
    ]);
    for (const row of (events ?? []).filter((e) =>
      ((e.cloudevent as unknown as CloudEvent).type as string).startsWith("core.appointment"),
    )) {
      const ev = row.cloudevent as unknown as CloudEvent;
      expect(ev.specversion).toBe("1.0");
      expect(ev.tenantid).toBe(clinician.tenantId);
      expect(ev.source).toBe("airis://core/scheduler");
      expect(ev.subject).toBe(created.appointment_id);
      expect(ev.actor.id).toBe(clinician.authUserId);
    }

    // Audit chain: patient.create (seq=1) + 3 appointment rows (seq=2..4)
    const { data: audits } = await admin
      .from("audit_events")
      .select("*")
      .eq("tenant_id", clinician.tenantId)
      .order("chain_sequence", { ascending: true });
    expect(audits).toHaveLength(4);
    expect(audits![0].chain_sequence).toBe(1);
    expect(audits![1].chain_sequence).toBe(2);
    expect(audits![2].chain_sequence).toBe(3);
    expect(audits![3].chain_sequence).toBe(4);
    expect(audits![0].prev_hash).toBeNull();
    expect(audits![1].prev_hash).toBe(audits![0].content_hash);
    expect(audits![2].prev_hash).toBe(audits![1].content_hash);
    expect(audits![3].prev_hash).toBe(audits![2].content_hash);
    expect(audits!.slice(1).map((a) => a.source_subsystem)).toEqual([
      "core.scheduler",
      "core.scheduler",
      "core.scheduler",
    ]);
    expect(audits![1].event_type).toBe("core.appointment.created.v1");
    expect(audits![2].event_type).toBe("core.appointment.updated.v1");
    expect(audits![3].event_type).toBe("core.appointment.cancelled.v1");

    // RPC return shape consistency
    expect(moved.appointment_id).toBe(created.appointment_id);
    expect(cancelled.appointment_id).toBe(created.appointment_id);
  });

  it("RLS isolates appointments across tenants", async () => {
    const other = await createTestClinician({});
    try {
      const dbA = userClient(clinician.accessToken);
      const ctxA = {
        actor: { type: "clinician" as const, id: clinician.authUserId },
        finalita: "cura_diretta" as const,
        tenantId: clinician.tenantId,
      };

      const patientA = await createPatient(
        dbA,
        {
          codice_fiscale: null,
          given_name: "A",
          family_name: "Test",
          date_of_birth: null,
          sex: null,
        },
        { ...ctxA, finalita: "amministrativo" },
      );

      const apt = await createAppointment(
        dbA,
        {
          room_id: "CT1",
          patient_id: patientA.patient_id,
          kind: "CT",
          subtype: "abdomen",
          with_contrast: false,
          slot_start_at: new Date("2026-05-30T09:00:00Z").toISOString(),
          slot_end_at: new Date("2026-05-30T09:30:00Z").toISOString(),
          notes: null,
        },
        ctxA,
      );

      const dbB = userClient(other.accessToken);
      const { data: visible } = await dbB.from("appointments").select("*").eq("id", apt.appointment_id);
      expect(visible ?? []).toHaveLength(0);
    } finally {
      await deleteTestClinician(other);
    }
  });
});
