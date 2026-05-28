# AIRIS Step 4.2 — Patient Registry endpoint: notes

Captured during the execution turn that landed Step 4.2 (Active Plan deliverable:
"observations on Claude Code experience captured in repo-level `notes.md`").
Operational scratchpad; not a canonical document.

---

## What landed vs. what was deferred

The four founder-named foundational patterns (CloudEvents envelope, hash-chained
audit ledger, tenant scoping, Italian-claim auth hook) all landed in their
minimal-infrastructure Phase 0 form. Inngest durable execution, Supabase Realtime
broadcast, the AsyncAPI catalog, B2 daily hash-anchor of the audit chain, three-
backend LLM abstraction, MPI / Italian identity edges, and the full ABAC
`can_access` projection are all deferred to Step 4.5+ exactly as the plan said.

The shape of every Phase 0 building block matches the Master Doc §17 commitments,
so swap-in at Step 4.5 is a wiring change, not a redesign.

## Operational deltas from the original plan

The plan accepted G1 ("test against an `airis_test` schema with per-test cleanup").
In execution I tried the literal separate-schema path and hit a real coupling
problem: the Supabase Custom Access Token Hook is a single project-level function
registered against one schema, and it reads `public.clinician_profiles`. Mirroring
the schema to `airis_test` would require either duplicating the hook (Supabase
allows only one) or routing through `public` anyway. I fell back to the simpler
form of G1: tests use the `public` schema with **tenant-id isolation** (random
test tenants per run, full per-tenant cleanup in teardown). Strictly speaking
that's not literal Postgres-schema isolation — it's logical isolation by tenant —
but the cleanup story is reliable (a tenant id is a single key to wipe behind),
and Phase 0 has no real data to pollute. The G2 trigger (move to Supabase local
CLI or Pro-tier branching) stays the same: **before any real or sensitive data
exists in the project**.

## Things I learned while building (Postgres / Supabase)

- **PG RLS soft-delete trap.** A SELECT policy with `deleted_at IS NULL` in
  `USING` causes UPDATEs that set `deleted_at` to fail with "new row violates
  row-level security policy" — PG applies SELECT `USING` to UPDATE-generated new
  rows to prevent "moving rows out of view." Fix: keep the SELECT policy
  tenant-only and filter `deleted_at IS NULL` in application code (lib/db/patients.ts).
- **`now()` in audit chains.** All calls to `now()` in one transaction return the
  transaction start time. Ordering the chain by `(timestamp_utc DESC, event_id
  DESC)` with `event_id` random made the tie-break non-deterministic, causing
  chain forks under same-transaction batch appends. Fix: a per-tenant monotonic
  `chain_sequence` column assigned under the same row lock that computes
  `prev_hash`. The chain is now well-defined regardless of timestamp ties.
- **`SET search_path = 'a, b, c'` is a foot-gun.** The string-literal form is
  parsed as ONE quoted identifier named `"a, b, c"`, not three schemas. Use the
  identifier-list form: `SET search_path = a, b, c`.
- **No automatic Supabase grants for tables created via MCP `apply_migration`.**
  On this project, none of the standard `SELECT/INSERT/UPDATE/DELETE` grants for
  `authenticated` / `anon` / `service_role` were inherited; explicit `GRANT`
  statements (migration 0014) were required.
- **SECURITY DEFINER + PostgREST exposure.** Any `SECURITY DEFINER` function in
  `public` is reachable as a `/rest/v1/rpc/<name>` endpoint by any role with
  `EXECUTE`. For `audit_events_append` that would let a signed-in clinician inject
  arbitrary audit entries. Solution: a private `airis_internal` schema (not in
  Supabase's PostgREST exposed-schema list); functions in `public` reference it
  schema-qualified.

## Claude Code experience (Step 4.2-specific)

- **Plan-then-build flow worked well.** The strategy-channel plan review in the
  same turn surfaced four real architectural choices (the four "steers" in the
  acceptance message: explicit RPC over triggers, `codice_fiscale` nullable +
  non-unique, FSE 2.0 reconciliation flagged for Step 4.13, G1 conditions). All
  four made the implementation better.
- **MCP friction.** Supabase MCP `apply_migration` is one-statement-at-a-time
  flow; each migration is a separate call. Fine, but it nudges you toward many
  small migrations (which I think is actually the right discipline anyway). The
  Supabase TypeScript types regeneration via `generate_typescript_types` is
  imperfect — it renders SQL DEFAULT NULL args as plain `string`, no `| null`.
  Patched locally in `lib/supabase/types.ts` with a clearly marked `// PATCH:`
  comment for re-apply after every regen.
- **Cursor / Codex / others not yet evaluated.** Per the Active Plan, Cursor
  evaluation is sequential and conditional — surfaces only if Claude Code shows
  a specific gap. No gap surfaced this turn that I'd attribute to Claude Code
  specifically; the friction was all on the Supabase / Postgres side.

## Open follow-ups (not blockers; flagged for Step 4.3+ or strategy)

- The `custom_access_token_hook` function exists in the DB but **is not yet
  registered** in the Supabase Dashboard. Tests don't exercise the hook (they
  build sessions via `signInWithPassword` which goes through the hook only if
  registered). The next time someone wants Italian claims to land in JWTs
  automatically, register it: Dashboard → Authentication → Hooks → "Customize
  Access Token (JWT) Claims" → `public.custom_access_token_hook`.
- The `finalità` enum values (`cura_diretta`, `assistenza`, `amministrativo`,
  `verifica_qualita`, `urgenza_break_glass`) are reasonable but not yet
  reconciled with the formal FSE 2.0 purpose-of-access categories. Step 4.13.
- `lib/audit.ts` doesn't exist as a Node-side audit emitter wrapper. Phase 0
  doesn't need it (audit is composed inside `patient_*` RPCs). When other
  subsystems start emitting audit events not through a domain-specific RPC, lift
  it then.
- Three-backend LLM abstraction unchanged Phase 0 active backend (Anthropic API
  per `infra/manifest.md`). Step 4.3 flips active to local Ollama VPS per D.22.
