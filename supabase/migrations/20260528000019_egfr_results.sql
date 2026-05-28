-- Step 4.3 migration 0019: egfr_results (Phase 0 MOCK)
-- Tier-3 "with contrast" read-back checks the most recent eGFR for the patient
-- ("eGFR last value 32 — confirm contrast?"). Real lab values + reactive
-- Automation Builder eGFR-watch node lands at Step 4.10 Radiology deep build.
-- Phase 0 seeds deterministic-pseudo-random values per synthetic patient so
-- the demo corpus can include high-stakes utterances reliably.
CREATE TABLE egfr_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  patient_id uuid NOT NULL REFERENCES patients(id),
  value numeric NOT NULL,
  taken_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX egfr_results_tenant_patient_taken_idx
  ON egfr_results(tenant_id, patient_id, taken_at DESC);
