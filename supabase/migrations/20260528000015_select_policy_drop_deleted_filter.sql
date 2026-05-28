-- Step 4.2 migration 0015: relax patients_select to tenant scope only
-- Postgres applies a SELECT policy's USING to UPDATE-generated new rows
-- (to prevent moving rows out of view). With `deleted_at IS NULL` on the
-- SELECT policy, patient_delete's soft-delete UPDATE produced a row that
-- failed the SELECT visibility check and got rejected.
--
-- Per founder steer: RLS does tenant scoping by construction; the
-- soft-delete filter is application-side (lib/db/patients.ts default).
-- patients_update keeps `deleted_at IS NULL` in USING so already-deleted
-- rows cannot be updated again from the API surface.
DROP POLICY patients_select ON patients;

CREATE POLICY patients_select ON patients
  FOR SELECT TO authenticated
  USING (tenant_id = current_tenant_id());
