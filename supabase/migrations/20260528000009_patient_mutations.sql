-- Step 4.2 migration 0009: patient_create / patient_update / patient_delete
-- Atomic mutation entrypoints for the Patient Registry. Each combines:
--   1. the patient row mutation,
--   2. the CloudEvents v1.0.2 outbox insert,
--   3. the L6 hash-chain audit append,
-- in one transaction so the chain is unbypassable by design (D.17). The
-- Node data-access layer (lib/db/patients.ts) calls these via Supabase RPC.
--
-- The Node side constructs the CloudEvents envelope (Zod-typed against the
-- registry under events/core/), assigns the ULID id, and passes the envelope
-- as jsonb. The DB function records it in the outbox and references its id
-- as the audit context for cross-correlation.

-- --- create ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION patient_create(
  p_codice_fiscale text,
  p_given_name text,
  p_family_name text,
  p_date_of_birth date,
  p_sex text,
  p_finalita text,
  p_cloudevent_id text,
  p_cloudevent jsonb
) RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  v_tenant_id uuid := current_tenant_id();
  v_user_id uuid := (SELECT auth.uid());
  v_patient_id uuid;
  v_audit_event_id uuid;
BEGIN
  IF v_tenant_id IS NULL THEN
    RAISE EXCEPTION 'no tenant in JWT' USING ERRCODE = '28000';
  END IF;
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'no authenticated user' USING ERRCODE = '28000';
  END IF;

  INSERT INTO patients (
    tenant_id, codice_fiscale, given_name, family_name,
    date_of_birth, sex, created_by
  ) VALUES (
    v_tenant_id, p_codice_fiscale, p_given_name, p_family_name,
    p_date_of_birth, p_sex, v_user_id
  ) RETURNING id INTO v_patient_id;

  INSERT INTO event_queue (id, tenant_id, cloudevent)
  VALUES (p_cloudevent_id, v_tenant_id, p_cloudevent);

  v_audit_event_id := audit_events_append(
    p_tenant_id        := v_tenant_id,
    p_event_type       := 'core.patient.created.v1',
    p_actor            := jsonb_build_object('type', 'clinician', 'id', v_user_id),
    p_subject          := v_patient_id::text,
    p_finalita         := p_finalita,
    p_source_subsystem := 'core.patient_registry',
    p_context          := jsonb_build_object('operation', 'create', 'cloudevent_id', p_cloudevent_id)
  );

  RETURN jsonb_build_object(
    'patient_id',     v_patient_id,
    'audit_event_id', v_audit_event_id,
    'event_id',       p_cloudevent_id
  );
END;
$$;

-- --- update ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION patient_update(
  p_patient_id uuid,
  p_codice_fiscale text,
  p_given_name text,
  p_family_name text,
  p_date_of_birth date,
  p_sex text,
  p_finalita text,
  p_cloudevent_id text,
  p_cloudevent jsonb
) RETURNS jsonb
LANGUAGE plpgsql
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

  -- COALESCE keeps any field NULL means "no change" — caller decides.
  UPDATE patients SET
    codice_fiscale = COALESCE(p_codice_fiscale, codice_fiscale),
    given_name     = COALESCE(p_given_name, given_name),
    family_name    = COALESCE(p_family_name, family_name),
    date_of_birth  = COALESCE(p_date_of_birth, date_of_birth),
    sex            = COALESCE(p_sex, sex),
    updated_at     = now()
  WHERE id = p_patient_id;
  GET DIAGNOSTICS v_updated_count = ROW_COUNT;

  IF v_updated_count = 0 THEN
    RAISE EXCEPTION 'patient not found or not in tenant scope' USING ERRCODE = 'P0002';
  END IF;

  INSERT INTO event_queue (id, tenant_id, cloudevent)
  VALUES (p_cloudevent_id, v_tenant_id, p_cloudevent);

  v_audit_event_id := audit_events_append(
    p_tenant_id        := v_tenant_id,
    p_event_type       := 'core.patient.updated.v1',
    p_actor            := jsonb_build_object('type', 'clinician', 'id', v_user_id),
    p_subject          := p_patient_id::text,
    p_finalita         := p_finalita,
    p_source_subsystem := 'core.patient_registry',
    p_context          := jsonb_build_object('operation', 'update', 'cloudevent_id', p_cloudevent_id)
  );

  RETURN jsonb_build_object(
    'patient_id',     p_patient_id,
    'audit_event_id', v_audit_event_id,
    'event_id',       p_cloudevent_id
  );
END;
$$;

-- --- delete (soft) ---------------------------------------------------------
CREATE OR REPLACE FUNCTION patient_delete(
  p_patient_id uuid,
  p_finalita text,
  p_cloudevent_id text,
  p_cloudevent jsonb
) RETURNS jsonb
LANGUAGE plpgsql
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

  UPDATE patients SET deleted_at = now(), updated_at = now()
  WHERE id = p_patient_id;
  GET DIAGNOSTICS v_updated_count = ROW_COUNT;

  IF v_updated_count = 0 THEN
    RAISE EXCEPTION 'patient not found or not in tenant scope' USING ERRCODE = 'P0002';
  END IF;

  INSERT INTO event_queue (id, tenant_id, cloudevent)
  VALUES (p_cloudevent_id, v_tenant_id, p_cloudevent);

  v_audit_event_id := audit_events_append(
    p_tenant_id        := v_tenant_id,
    p_event_type       := 'core.patient.deleted.v1',
    p_actor            := jsonb_build_object('type', 'clinician', 'id', v_user_id),
    p_subject          := p_patient_id::text,
    p_finalita         := p_finalita,
    p_source_subsystem := 'core.patient_registry',
    p_context          := jsonb_build_object('operation', 'delete', 'cloudevent_id', p_cloudevent_id)
  );

  RETURN jsonb_build_object(
    'patient_id',     p_patient_id,
    'audit_event_id', v_audit_event_id,
    'event_id',       p_cloudevent_id
  );
END;
$$;
