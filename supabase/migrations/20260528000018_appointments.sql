-- Step 4.3 migration 0018: appointments
-- Paradigm prototype CT scheduler (Step 4.3 plan). One CT room "CT1" Phase 0;
-- the table is general (room_id is free text) so subsequent rooms / modalities
-- need no schema change.
--
-- Same shape as patients per Step 4.2 (tenant by RLS; soft-delete via deleted_at
-- filtered application-side per the PG-RLS soft-delete trap in notes.md).
-- status separate from soft-delete: cancellation sets status='cancelled' AND
-- deleted_at=now() so a cancelled row leaves the active grid but stays in the
-- audit chain and event_queue.
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  room_id text NOT NULL,
  patient_id uuid NOT NULL REFERENCES patients(id),
  kind text NOT NULL,
  subtype text,
  with_contrast boolean NOT NULL DEFAULT false,
  slot_start_at timestamptz NOT NULL,
  slot_end_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'scheduled',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  created_by uuid,
  CONSTRAINT appointments_status_chk CHECK (status IN ('scheduled', 'cancelled', 'moved')),
  CONSTRAINT appointments_slot_chk CHECK (slot_end_at > slot_start_at)
);

CREATE INDEX appointments_tenant_room_slot_idx
  ON appointments(tenant_id, room_id, slot_start_at)
  WHERE deleted_at IS NULL;

CREATE INDEX appointments_tenant_patient_slot_idx
  ON appointments(tenant_id, patient_id, slot_start_at)
  WHERE deleted_at IS NULL;
