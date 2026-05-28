-- Step 4.2 migration 0002: tenants
-- Real tenants table seeded with a single Phase 0 dev tenant. RLS reads
-- tenant_id from the JWT app_metadata; never a hardcoded constant.
CREATE TABLE tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO tenants (id, name)
VALUES ('00000000-0000-0000-0000-000000000001', 'AIRIS Dev Tenant')
ON CONFLICT (id) DO NOTHING;
