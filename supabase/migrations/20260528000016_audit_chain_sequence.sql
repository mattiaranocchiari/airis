-- Step 4.2 migration 0016: deterministic audit chain ordering via chain_sequence
-- Original design ordered the chain by (timestamp_utc DESC, event_id DESC).
-- Within a single transaction, now() returns the transaction start time, so
-- multiple appends share a timestamp; event_id is a random UUID, so the
-- tie-break is non-deterministic and the chain can fork. Solved by per-tenant
-- monotonic chain_sequence assigned under the same row lock that hashes the
-- prev_hash, so the linkage is always well-defined.

ALTER TABLE audit_events
  ADD COLUMN chain_sequence bigint NOT NULL DEFAULT 0;

-- Backfill any pre-existing rows (Phase 0 there are none, but keep migration safe).
WITH numbered AS (
  SELECT event_id,
         row_number() OVER (PARTITION BY tenant_id ORDER BY timestamp_utc, event_id) AS rn
  FROM audit_events
)
UPDATE audit_events ae
   SET chain_sequence = n.rn
  FROM numbered n
 WHERE ae.event_id = n.event_id;

-- One chain per tenant; per-tenant monotonic sequence.
CREATE UNIQUE INDEX audit_events_tenant_seq_uniq_idx
  ON audit_events (tenant_id, chain_sequence);

-- Drop the timestamp-based ordering index since chain_sequence is canonical.
DROP INDEX IF EXISTS audit_events_tenant_time_idx;

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
  -- Lock the latest chain head for this tenant. chain_sequence makes the
  -- order deterministic across same-transaction or same-microsecond appends.
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
