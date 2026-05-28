-- Step 4.2 migration 0005: audit_events + audit_events_append
-- L6 hash-chained audit ledger per D.17.
--
-- Genesis event per tenant: prev_hash = NULL.
-- content_hash covers prev_hash (hex'd, or '' for genesis) + every meaningful
-- event field — chain is tamper-evident from genesis forward.
CREATE TABLE audit_events (
  event_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prev_hash bytea,
  content_hash bytea NOT NULL,
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  event_type text NOT NULL,
  actor jsonb NOT NULL,
  subject text NOT NULL,
  finalita text NOT NULL,
  consent_state_snapshot jsonb,
  scope_snapshot jsonb,
  context jsonb,
  timestamp_utc timestamptz NOT NULL DEFAULT now(),
  source_subsystem text NOT NULL,
  model_provenance jsonb
);

CREATE INDEX audit_events_tenant_subject_time_idx
  ON audit_events (tenant_id, subject, timestamp_utc);
CREATE INDEX audit_events_tenant_time_idx
  ON audit_events (tenant_id, timestamp_utc DESC, event_id DESC);

-- Atomic chain append. Row-locks the tenant chain head to serialize concurrent
-- appends; computes content_hash over canonical JSON of all meaningful fields
-- (prev_hash, tenant, type, actor, subject, finalita, snapshots, context,
-- timestamp, source_subsystem, model_provenance).
--
-- SECURITY DEFINER so callers under RLS can append without write access to
-- audit_events directly. Phase 0 stance: deferred hardening of explicit
-- search_path to Step 4.5 when the cross-subsystem emitter library lands.
CREATE OR REPLACE FUNCTION audit_events_append(
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
  p_timestamp timestamptz DEFAULT now()
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_prev_hash bytea;
  v_content text;
  v_content_hash bytea;
  v_event_id uuid;
BEGIN
  SELECT content_hash INTO v_prev_hash
  FROM audit_events
  WHERE tenant_id = p_tenant_id
  ORDER BY timestamp_utc DESC, event_id DESC
  LIMIT 1
  FOR UPDATE;

  v_content := jsonb_build_object(
    'prev_hash',              CASE WHEN v_prev_hash IS NULL THEN '' ELSE encode(v_prev_hash, 'hex') END,
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
    source_subsystem, model_provenance
  ) VALUES (
    v_prev_hash, v_content_hash, p_tenant_id, p_event_type, p_actor, p_subject, p_finalita,
    p_consent_state_snapshot, p_scope_snapshot, p_context, p_timestamp,
    p_source_subsystem, p_model_provenance
  ) RETURNING event_id INTO v_event_id;

  RETURN v_event_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION audit_events_append(uuid, text, jsonb, text, text, text, jsonb, jsonb, jsonb, jsonb, timestamptz) FROM public, anon;
