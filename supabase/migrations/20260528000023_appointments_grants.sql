-- Step 4.3 migration 0023: grants for appointments + egfr_results + RPCs
-- Same pattern as migration 0014 — Supabase default grants on tables created
-- via MCP apply_migration don't reach `authenticated` / `service_role`, so
-- explicit GRANTs are required.

-- appointments: SELECT/INSERT/UPDATE for clinicians (UPDATE covers soft-delete via cancel).
GRANT SELECT, INSERT, UPDATE ON appointments TO authenticated;
GRANT ALL ON appointments TO service_role;

-- egfr_results: clinicians SELECT only (Phase 0 mock; service_role seeds).
GRANT SELECT ON egfr_results TO authenticated;
GRANT ALL ON egfr_results TO service_role;

-- RPC EXECUTE.
GRANT EXECUTE ON FUNCTION appointment_create(uuid, text, uuid, text, text, boolean, timestamptz, timestamptz, text, text, text, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION appointment_update(uuid, text, boolean, timestamptz, timestamptz, text, text, text, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION appointment_cancel(uuid, text, text, jsonb) TO authenticated;
