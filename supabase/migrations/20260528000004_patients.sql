-- Step 4.2 migration 0004: patients
-- Phase 0 minimal Patient Registry per Master Doc §1.
-- codice_fiscale is nullable and NOT unique: foreign / unidentified patients
-- may lack a standard CF, and dedup is Step 4.6 (Patient Flow Layer / MPI)
-- design space, not a DB constraint here.
-- Soft delete via deleted_at — Italian statutory perpetual retention
-- (Circolare 900/1986) precludes hard delete of clinical records.
CREATE TABLE patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  codice_fiscale text,
  given_name text NOT NULL,
  family_name text NOT NULL,
  date_of_birth date,
  sex text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  created_by uuid
);

CREATE INDEX patients_tenant_alive_idx ON patients(tenant_id) WHERE deleted_at IS NULL;
CREATE INDEX patients_tenant_cf_idx ON patients(tenant_id, codice_fiscale)
  WHERE codice_fiscale IS NOT NULL AND deleted_at IS NULL;
