-- Step 4.2 migration 0011: revoke Supabase helper grants
-- Supabase ships rls_auto_enable() as an event trigger; PostgREST exposes
-- it via /rest/v1/rpc by default. The function only does useful work in a
-- DDL event-trigger context, but the advisor flags the public grant. Revoke
-- so signed-in users and anon cannot invoke it through the API.
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon, authenticated, public;
