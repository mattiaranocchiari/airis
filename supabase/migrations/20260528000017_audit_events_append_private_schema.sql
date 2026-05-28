-- Step 4.2 migration 0017: move audit_events_append to airis_internal schema
-- The function must be SECURITY DEFINER so RLS-scoped callers can append to
-- audit_events. Exposing it via PostgREST /rest/v1/rpc gives signed-in users
-- the ability to inject arbitrary audit entries. Hiding it in a non-exposed
-- schema (Supabase exposes `public` only by default) closes that surface.
-- Patient mutation functions stay in public and call it schema-qualified.

CREATE SCHEMA IF NOT EXISTS airis_internal;
GRANT USAGE ON SCHEMA airis_internal TO authenticated, service_role;

CREATE OR REPLACE FUNCTION airis_internal.audit_events_append(
  p_tenant_id uuid,
  p_event_type text,
  p_actor jsonb,
  p_subject text,
  p_finalita text,
  p_source_subsystem text,
  p_consent_state_snapshot jsonb DEFAULT NULL,
  p_scope_snapshot jsonb DEFAULT NULL,
  p_context jsonb DEFAULT NULL,
  p_model_provenance jsonb DEFAULT NULL,
  p_timestamp timestamptz DEFAULT clock_timestamp()
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_catalog
AS $$
DECLARE
  v_prev_hash bytea;
  v_prev_sequence bigint;
  v_chain_sequence bigint;
  v_content text;
  v_content_hash bytea;
  v_event_id uuid;
BEGIN
  SELECT content_hash, chain_sequence INTO v_prev_hash, v_prev_sequence
  FROM audit_events
  WHERE tenant_id = p_tenant_id
  ORDER BY chain_sequence DESC
  LIMIT 1
  FOR UPDATE;

  v_chain_sequence := COALESCE(v_prev_sequence, 0) + 1;

  v_content := jsonb_build_object(
    'prev_hash',              CASE WHEN v_prev_hash IS NULL THEN '' ELSE encode(v_prev_hash, 'hex') END,
    'chain_sequence',         v_chain_sequence,
    'tenant_id',              p_tenant_id::text,
    'event_type',             p_event_type,
    'actor',                  p_actor,
    'subject',                p_subject,
    'finalita',               p_finalita,
    'consent_state_snapshot', p_consent_state_snapshot,
    'scope_snapshot',         p_scope_snapshot,
    'context',                p_context,
    'timestamp_utc',          to_char(p_timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'),
    'source_subsystem',       p_source_subsystem,
    'model_provenance',       p_model_provenance
  )::text;

  v_content_hash := digest(v_content, 'sha256');

  INSERT INTO audit_events (
    prev_hash, content_hash, tenant_id, event_type, actor, subject, finalita,
    consent_state_snapshot, scope_snapshot, context, timestamp_utc,
    source_subsystem, model_provenance, chain_sequence
  ) VALUES (
    v_prev_hash, v_content_hash, p_tenant_id, p_event_type, p_actor, p_subject, p_finalita,
    p_consent_state_snapshot, p_scope_snapshot, p_context, p_timestamp,
    p_source_subsystem, p_model_provenance, v_chain_sequence
  ) RETURNING event_id INTO v_event_id;

  RETURN v_event_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION airis_internal.audit_events_append(uuid, text, jsonb, text, text, text, jsonb, jsonb, jsonb, jsonb, timestamptz) FROM public, anon;
GRANT EXECUTE ON FUNCTION airis_internal.audit_events_append(uuid, text, jsonb, text, text, text, jsonb, jsonb, jsonb, jsonb, timestamptz) TO authenticated, service_role;

-- Drop the public-schema version: patient_* will call airis_internal.audit_events_append.
DROP FUNCTION public.audit_events_append(uuid, text, jsonb, text, text, text, jsonb, jsonb, jsonb, jsonb, timestamptz);

-- Rewire patient_create / patient_update / patient_delete to the new location.
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

  INSERT INTO patients (
    id, tenant_id, codice_fiscale, given_name, family_name,
    date_of_birth, sex, created_by
  ) VALUES (
    p_patient_id, v_tenant_id, p_codice_fiscale, p_given_name, p_family_name,
    p_date_of_birth, p_sex, v_user_id
  );

  INSERT INTO event_queue (id, tenant_id, cloudevent)
  VALUES (p_cloudevent_id, v_tenant_id, p_cloudevent);

  v_audit_event_id := airis_internal.audit_events_append(
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

  v_audit_event_id := airis_internal.audit_events_append(
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

CREATE OR REPLACE FUNCTION patient_delete(
  p_patient_id uuid,
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

  UPDATE patients SET deleted_at = now(), updated_at = now()
  WHERE id = p_patient_id;
  GET DIAGNOSTICS v_updated_count = ROW_COUNT;

  IF v_updated_count = 0 THEN
    RAISE EXCEPTION 'patient not found or not in tenant scope' USING ERRCODE = 'P0002';
  END IF;

  INSERT INTO event_queue (id, tenant_id, cloudevent)
  VALUES (p_cloudevent_id, v_tenant_id, p_cloudevent);

  v_audit_event_id := airis_internal.audit_events_append(
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
