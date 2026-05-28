-- Step 4.2 migration 0012: patient_create accepts caller-supplied id
-- The route handler generates the patient UUID client-side so the same id
-- can be used in (a) the patients row, (b) the CloudEvents envelope subject,
-- (c) the audit event subject — all wired together from creation.
DROP FUNCTION patient_create(text, text, text, date, text, text, text, jsonb);

CREATE OR REPLACE FUNCTION patient_create(
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
SET search_path = 'public, extensions, pg_catalog'
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

  INSERT INTO patients (
    id, tenant_id, codice_fiscale, given_name, family_name,
    date_of_birth, sex, created_by
  ) VALUES (
    p_patient_id, v_tenant_id, p_codice_fiscale, p_given_name, p_family_name,
    p_date_of_birth, p_sex, v_user_id
  );

  INSERT INTO event_queue (id, tenant_id, cloudevent)
  VALUES (p_cloudevent_id, v_tenant_id, p_cloudevent);

  v_audit_event_id := audit_events_append(
    p_tenant_id        := v_tenant_id,
    p_event_type       := 'core.patient.created.v1',
    p_actor            := jsonb_build_object('type', 'clinician', 'id', v_user_id),
    p_subject          := p_patient_id::text,
    p_finalita         := p_finalita,
    p_source_subsystem := 'core.patient_registry',
    p_context          := jsonb_build_object('operation', 'create', 'cloudevent_id', p_cloudevent_id)
  );

  RETURN jsonb_build_object(
    'patient_id',     p_patient_id,
    'audit_event_id', v_audit_event_id,
    'event_id',       p_cloudevent_id
  );
END;
$$;
