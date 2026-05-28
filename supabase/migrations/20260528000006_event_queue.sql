-- Step 4.2 migration 0006: event_queue
-- CloudEvents v1.0.2 outbox per §17.9 — minimal Phase 0 transport.
-- Step 4.5 wires Inngest as durable consumer + Supabase Realtime broadcast.
CREATE TABLE event_queue (
  id text PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  cloudevent jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz
);

CREATE INDEX event_queue_unprocessed_idx
  ON event_queue (created_at)
  WHERE processed_at IS NULL;
CREATE INDEX event_queue_tenant_idx
  ON event_queue (tenant_id, created_at);
