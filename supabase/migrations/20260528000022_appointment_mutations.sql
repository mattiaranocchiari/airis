-- Step 4.3 migration 0022: appointment_create / appointment_update / appointment_cancel
-- Atomic mutation entrypoints for the CT scheduler. Same shape as patient_*
-- from Step 4.2 migration 0017: row mutation + CloudEvents v1.0.2 outbox
-- insert + L6 hash-chain audit append in one transaction (D.17), so the chain
-- is unbypassable by design and the dual-surface broadcast has the audit
-- ledger as its sync barrier.
--
-- Caller (lib/db/appointments.ts) constructs the CloudEvents envelope and
-- passes the id + jsonb body. source_subsystem is 'core.scheduler' (vs.
-- 'core.patient_registry' for patient_*).

-- --- create ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION appointment_create(
  p_appointment_id uuid,
  p_room_id text,
  p_patient_id uuid,
  p_kind text,
  p_subtype text,
  p_with_contrast boolean,
  p_slot_start_at timestamptz,
  p_slot_end_at timestamptz,
  p_notes text,
  p_finalita text,
  p_cloudevent_id text,
  p_cloudevent jsonb
) RETURNS jsonb
LANGUAGE plpgsql
SET search_path = public, extensions, pg_catalog
AS $$
DECLARE
  v_tenant_id uuid := current_tenant_id();
  v_user_id uuid := (SELECT auth.uid());
  v_audit_event_id uuid;
BEGIN
  IF v_tenant_id IS NULL THEN
    RAISE EXCEPTION 'no tenant in JWT' USING ERRCODE = '28000';
  END IF;
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'no authenticated user' USING ERRCODE = '28000';
  END IF;

  INSERT INTO appointments (
    id, tenant_id, room_id, patient_id, kind, subtype, with_contrast,
    slot_start_at, slot_end_at, notes, created_by
  ) VALUES (
    p_appointment_id, v_tenant_id, p_room_id, p_patient_id, p_kind, p_subtype, p_with_contrast,
    p_slot_start_at, p_slot_end_at, p_notes, v_user_id
  );

  INSERT INTO event_queue (id, tenant_id, cloudevent)
  VALUES (p_cloudevent_id, v_tenant_id, p_cloudevent);

  v_audit_event_id := airis_internal.audit_events_append(
    p_tenant_id        := v_tenant_id,
    p_event_type       := 'core.appointment.created.v1',
    p_actor            := jsonb_build_object('type', 'clinician', 'id', v_user_id),
    p_subject          := p_appointment_id::text,
    p_finalita         := p_finalita,
    p_source_subsystem := 'core.scheduler',
    p_context          := jsonb_build_object('operation', 'create', 'cloudevent_id', p_cloudevent_id)
  );

  RETURN jsonb_build_object(
    'appointment_id', p_appointment_id,
    'audit_event_id', v_audit_event_id,
    'event_id',       p_cloudevent_id
  );
END;
$$;

-- --- update ----------------------------------------------------------------
-- Reslot / mutate subtype / contrast / notes. NULL means "no change".
-- status stays 'scheduled'; the move-events are captured by the audit chain
-- and the CloudEvent body (which carries changed_fields).
CREATE OR REPLACE FUNCTION appointment_update(
  p_appointment_id uuid,
  p_subtype text,
  p_with_contrast boolean,
  p_slot_start_at timestamptz,
  p_slot_end_at timestamptz,
  p_notes text,
  p_finalita text,
  p_cloudevent_id text,
  p_cloudevent jsonb
) RETURNS jsonb
LANGUAGE plpgsql
SET search_path = public, extensions, pg_catalog
AS $$
DECLARE
  v_tenant_id uuid := current_tenant_id();
  v_user_id uuid := (SELECT auth.uid());
  v_updated_count int;
  v_audit_event_id uuid;
BEGIN
  IF v_tenant_id IS NULL THEN
    RAISE EXCEPTION 'no tenant in JWT' USING ERRCODE = '28000';
  END IF;
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'no authenticated user' USING ERRCODE = '28000';
  END IF;

  UPDATE appointments SET
    subtype       = COALESCE(p_subtype, subtype),
    with_contrast = COALESCE(p_with_contrast, with_contrast),
    slot_start_at = COALESCE(p_slot_start_at, slot_start_at),
    slot_end_at   = COALESCE(p_slot_end_at, slot_end_at),
    notes         = COALESCE(p_notes, notes),
    updated_at    = now()
  WHERE id = p_appointment_id;
  GET DIAGNOSTICS v_updated_count = ROW_COUNT;

  IF v_updated_count = 0 THEN
    RAISE EXCEPTION 'appointment not found or not in tenant scope' USING ERRCODE = 'P0002';
  END IF;

  INSERT INTO event_queue (id, tenant_id, cloudevent)
  VALUES (p_cloudevent_id, v_tenant_id, p_cloudevent);

  v_audit_event_id := airis_internal.audit_events_append(
    p_tenant_id        := v_tenant_id,
    p_event_type       := 'core.appointment.updated.v1',
    p_actor            := jsonb_build_object('type', 'clinician', 'id', v_user_id),
    p_subject          := p_appointment_id::text,
    p_finalita         := p_finalita,
    p_source_subsystem := 'core.scheduler',
    p_context          := jsonb_build_object('operation', 'update', 'cloudevent_id', p_cloudevent_id)
  );

  RETURN jsonb_build_object(
    'appointment_id', p_appointment_id,
    'audit_event_id', v_audit_event_id,
    'event_id',       p_cloudevent_id
  );
END;
$$;

-- --- cancel (soft) ---------------------------------------------------------
-- status='cancelled' AND deleted_at=now() — removes from active grid; row +
-- audit + outbox persist.
CREATE OR REPLACE FUNCTION appointment_cancel(
  p_appointment_id uuid,
  p_finalita text,
  p_cloudevent_id text,
  p_cloudevent jsonb
) RETURNS jsonb
LANGUAGE plpgsql
SET search_path = public, extensions, pg_catalog
AS $$
DECLARE
  v_tenant_id uuid := current_tenant_id();
  v_user_id uuid := (SELECT auth.uid());
  v_updated_count int;
  v_audit_event_id uuid;
BEGIN
  IF v_tenant_id IS NULL THEN
    RAISE EXCEPTION 'no tenant in JWT' USING ERRCODE = '28000';
  END IF;
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'no authenticated user' USING ERRCODE = '28000';
  END IF;

  UPDATE appointments
    SET status = 'cancelled', deleted_at = now(), updated_at = now()
    WHERE id = p_appointment_id;
  GET DIAGNOSTICS v_updated_count = ROW_COUNT;

  IF v_updated_count = 0 THEN
    RAISE EXCEPTION 'appointment not found or not in tenant scope' USING ERRCODE = 'P0002';
  END IF;

  INSERT INTO event_queue (id, tenant_id, cloudevent)
  VALUES (p_cloudevent_id, v_tenant_id, p_cloudevent);

  v_audit_event_id := airis_internal.audit_events_append(
    p_tenant_id        := v_tenant_id,
    p_event_type       := 'core.appointment.cancelled.v1',
    p_actor            := jsonb_build_object('type', 'clinician', 'id', v_user_id),
    p_subject          := p_appointment_id::text,
    p_finalita         := p_finalita,
    p_source_subsystem := 'core.scheduler',
    p_context          := jsonb_build_object('operation', 'cancel', 'cloudevent_id', p_cloudevent_id)
  );

  RETURN jsonb_build_object(
    'appointment_id', p_appointment_id,
    'audit_event_id', v_audit_event_id,
    'event_id',       p_cloudevent_id
  );
END;
$$;
