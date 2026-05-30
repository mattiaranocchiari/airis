-- Step 4.3 migration 0020: RLS for appointments + egfr_results
-- Tenant scoping by construction. Mirrors the patients pattern from
-- migrations 0007 + 0015 (no deleted_at filter in SELECT USING; that's
-- application-side; the UPDATE policy still gates on deleted_at IS NULL so
-- a cancelled row cannot be un-cancelled via user RLS).
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY appointments_select ON appointments
  FOR SELECT TO authenticated
  USING (tenant_id = current_tenant_id());

CREATE POLICY appointments_insert ON appointments
  FOR INSERT TO authenticated
  WITH CHECK (tenant_id = current_tenant_id());

CREATE POLICY appointments_update ON appointments
  FOR UPDATE TO authenticated
  USING (tenant_id = current_tenant_id() AND deleted_at IS NULL)
  WITH CHECK (tenant_id = current_tenant_id());
-- No DELETE policy — soft-delete only.

ALTER TABLE egfr_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY egfr_results_select ON egfr_results
  FOR SELECT TO authenticated
  USING (tenant_id = current_tenant_id());
-- No INSERT/UPDATE for authenticated Phase 0; only service_role seeds mocks.
