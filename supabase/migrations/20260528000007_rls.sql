-- Step 4.2 migration 0007: RLS — tenant scoping by construction
-- Every PHI-bearing table reads tenant_id from the JWT app_metadata.
-- No application-layer WHERE tenant_id = ... — the DB enforces.

CREATE OR REPLACE FUNCTION current_tenant_id() RETURNS uuid
LANGUAGE sql
STABLE
AS $$
  SELECT NULLIF(
    (auth.jwt() -> 'app_metadata' ->> 'tenant_id'),
    ''
  )::uuid
$$;

-- patients
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

CREATE POLICY patients_select ON patients
  FOR SELECT TO authenticated
  USING (tenant_id = current_tenant_id() AND deleted_at IS NULL);

CREATE POLICY patients_insert ON patients
  FOR INSERT TO authenticated
  WITH CHECK (tenant_id = current_tenant_id());

CREATE POLICY patients_update ON patients
  FOR UPDATE TO authenticated
  USING (tenant_id = current_tenant_id() AND deleted_at IS NULL)
  WITH CHECK (tenant_id = current_tenant_id());
-- No DELETE policy — statutory perpetual retention; soft delete via UPDATE.

-- audit_events: tenant-scoped read; writes only via audit_events_append (SECURITY DEFINER).
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY audit_events_select ON audit_events
  FOR SELECT TO authenticated
  USING (tenant_id = current_tenant_id());

-- event_queue: tenant-scoped on both sides (consumer lands Step 4.5).
ALTER TABLE event_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY event_queue_select ON event_queue
  FOR SELECT TO authenticated
  USING (tenant_id = current_tenant_id());

CREATE POLICY event_queue_insert ON event_queue
  FOR INSERT TO authenticated
  WITH CHECK (tenant_id = current_tenant_id());

-- clinician_profiles: a clinician reads only their own row Phase 0.
ALTER TABLE clinician_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY clinician_profiles_select_own ON clinician_profiles
  FOR SELECT TO authenticated
  USING (id = (SELECT auth.uid()));

-- tenants: a clinician reads only their own tenant row.
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenants_select ON tenants
  FOR SELECT TO authenticated
  USING (id = current_tenant_id());
