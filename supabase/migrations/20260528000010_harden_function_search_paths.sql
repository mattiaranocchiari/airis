-- Step 4.2 migration 0010: harden function search_paths
-- Closes the Supabase security advisor `function_search_path_mutable` warns
-- across all functions created in earlier migrations. With pinned search_path
-- there is no opportunity for a caller to redirect name resolution toward a
-- malicious table or function in their own schema.
--
-- pgcrypto is installed into the `extensions` schema by Supabase; auth
-- helpers (auth.jwt / auth.uid) are already schema-qualified at call sites.
ALTER FUNCTION current_tenant_id()
  SET search_path = 'public, extensions, pg_catalog';

ALTER FUNCTION audit_events_append(uuid, text, jsonb, text, text, text, jsonb, jsonb, jsonb, jsonb, timestamptz)
  SET search_path = 'public, extensions, pg_catalog';

ALTER FUNCTION custom_access_token_hook(jsonb)
  SET search_path = 'public, extensions, pg_catalog';

ALTER FUNCTION patient_create(text, text, text, date, text, text, text, jsonb)
  SET search_path = 'public, extensions, pg_catalog';

ALTER FUNCTION patient_update(uuid, text, text, text, date, text, text, text, jsonb)
  SET search_path = 'public, extensions, pg_catalog';

ALTER FUNCTION patient_delete(uuid, text, text, jsonb)
  SET search_path = 'public, extensions, pg_catalog';
