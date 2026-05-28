-- Step 4.2 migration 0008: custom_access_token_hook (Italian-claim stub)
-- Per D.18 + §17.13. Phase 0 STUB form: copies Italian-identity claims from
-- clinician_profiles into JWT app_metadata on every token issuance. No
-- FNOMCeO verification (manual at onboarding); no SAML federation (Phase B);
-- no ABAC can_access() function (Step 4.5+); no break-glass enforcement
-- (gated by Garante Provv. 604/2024 — mechanism only Phase 0).
--
-- Supabase hook contract:
-- https://supabase.com/docs/guides/auth/auth-hooks/custom-access-token-hook
CREATE OR REPLACE FUNCTION custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid := (event ->> 'user_id')::uuid;
  v_profile record;
  v_claims jsonb := event -> 'claims';
  v_app_metadata jsonb;
BEGIN
  SELECT
    tenant_id, codice_fiscale, fnomceo_iscrizione, albo, specializzazione,
    current_assignment, scope_version, consent_version,
    break_glass_active, break_glass_expires_at
  INTO v_profile
  FROM clinician_profiles
  WHERE id = v_user_id;

  IF NOT FOUND THEN
    -- Not a registered clinician; pass through unchanged.
    RETURN event;
  END IF;

  v_app_metadata := coalesce(v_claims -> 'app_metadata', '{}'::jsonb)
    || jsonb_build_object(
      'tenant_id',              v_profile.tenant_id,
      'codice_fiscale',         v_profile.codice_fiscale,
      'fnomceo_iscrizione',     v_profile.fnomceo_iscrizione,
      'albo',                   v_profile.albo,
      'specializzazione',       v_profile.specializzazione,
      'current_assignment',     v_profile.current_assignment,
      'scope_version',          v_profile.scope_version,
      'consent_version',        v_profile.consent_version,
      'break_glass_active',     v_profile.break_glass_active,
      'break_glass_expires_at', v_profile.break_glass_expires_at
    );

  v_claims := jsonb_set(v_claims, '{app_metadata}', v_app_metadata);
  RETURN jsonb_set(event, '{claims}', v_claims);
END;
$$;

GRANT EXECUTE ON FUNCTION custom_access_token_hook(jsonb) TO supabase_auth_admin;
REVOKE EXECUTE ON FUNCTION custom_access_token_hook(jsonb) FROM authenticated, anon, public;
GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT SELECT ON clinician_profiles TO supabase_auth_admin;
