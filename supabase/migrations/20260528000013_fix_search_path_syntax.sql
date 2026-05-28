-- Step 4.2 migration 0013: fix search_path syntax on all functions
-- Earlier migration 0010 (and patient_create in 0012) used the form
-- SET search_path = 'public, extensions, pg_catalog' which Postgres stores
-- as a single quoted identifier (one schema literally named
-- "public, extensions, pg_catalog") — so name resolution still failed.
-- Correct form is comma-separated identifiers without outer quoting.
ALTER FUNCTION current_tenant_id()
  SET search_path = public, extensions, pg_catalog;

ALTER FUNCTION audit_events_append(uuid, text, jsonb, text, text, text, jsonb, jsonb, jsonb, jsonb, timestamptz)
  SET search_path = public, extensions, pg_catalog;

ALTER FUNCTION custom_access_token_hook(jsonb)
  SET search_path = public, extensions, pg_catalog;

ALTER FUNCTION patient_create(uuid, text, text, text, date, text, text, text, jsonb)
  SET search_path = public, extensions, pg_catalog;

ALTER FUNCTION patient_update(uuid, text, text, text, date, text, text, text, jsonb)
  SET search_path = public, extensions, pg_catalog;

ALTER FUNCTION patient_delete(uuid, text, text, jsonb)
  SET search_path = public, extensions, pg_catalog;
