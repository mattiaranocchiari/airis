-- Step 4.2 migration 0003: clinician_profiles
-- Italian-claim composition per D.18 + §17.13. Phase 0 stub: claim values
-- live in this table; manual entry at onboarding (FNOMCeO has no public REST
-- API and forbids programmatic harvesting per D.18). The Custom Access Token
-- Hook reads these and projects them into JWT app_metadata.
--
-- id is intended to match auth.users.id; no FK Phase 0 to keep dev/test
-- seeding decoupled from auth.users lifecycle.
CREATE TABLE clinician_profiles (
  id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  codice_fiscale text,
  fnomceo_iscrizione text,
  albo text,
  specializzazione text,
  current_assignment jsonb,
  scope_version integer NOT NULL DEFAULT 1,
  consent_version integer NOT NULL DEFAULT 1,
  break_glass_active boolean NOT NULL DEFAULT false,
  break_glass_expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX clinician_profiles_tenant_idx ON clinician_profiles(tenant_id);
