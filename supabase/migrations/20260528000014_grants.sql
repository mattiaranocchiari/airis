-- Step 4.2 migration 0014: role-level grants
-- RLS gates which rows a role can see; role-level GRANTs gate which
-- statements the role can run at all. Supabase normally installs default
-- privileges on the public schema; if those defaults are missing (or fire
-- only for later-created tables), we set the grants explicitly.

-- patients: clinicians SELECT/INSERT/UPDATE (no DELETE; soft delete via UPDATE).
GRANT SELECT, INSERT, UPDATE ON patients TO authenticated;
GRANT ALL ON patients TO service_role;

-- audit_events: clinicians SELECT only; writes go through audit_events_append.
GRANT SELECT ON audit_events TO authenticated;
GRANT ALL ON audit_events TO service_role;

-- event_queue: producer-side INSERT + SELECT (consumer arrives Step 4.5).
GRANT SELECT, INSERT ON event_queue TO authenticated;
GRANT ALL ON event_queue TO service_role;

-- clinician_profiles: SELECT for the clinician's own row (RLS enforces).
GRANT SELECT ON clinician_profiles TO authenticated;
GRANT ALL ON clinician_profiles TO service_role;

-- tenants: SELECT for the clinician's own tenant (RLS enforces).
GRANT SELECT ON tenants TO authenticated;
GRANT ALL ON tenants TO service_role;

-- Functions called from the API: clinicians need EXECUTE.
GRANT EXECUTE ON FUNCTION current_tenant_id() TO authenticated;
GRANT EXECUTE ON FUNCTION patient_create(uuid, text, text, text, date, text, text, text, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION patient_update(uuid, text, text, text, date, text, text, text, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION patient_delete(uuid, text, text, jsonb) TO authenticated;
-- audit_events_append is called from inside patient_* (SECURITY INVOKER side);
-- the caller's EXECUTE privilege is still checked, then it elevates via DEFINER.
GRANT EXECUTE ON FUNCTION audit_events_append(uuid, text, jsonb, text, text, text, jsonb, jsonb, jsonb, jsonb, timestamptz) TO authenticated;
