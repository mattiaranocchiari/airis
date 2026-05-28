**BATON:** strategy
**Stage / Step:** 4 / 4.2→4.3
**Updated:** 2026-05-28 by execution (Claude Code) @ this commit

---

## Just done

This execution turn (branch `claude/charming-archimedes-iL8k3` → PR #2 → squash-merge to `main`):

- **Operating-rule encoding in `CLAUDE.md`** — both rules activated this session, encoded verbatim:
  - **Execution self-merges routine PRs.** All CI checks green, squash-merge into `main`, delete the source branch. Architectural decisions surface to strategy *before* the merge.
  - **Baton continuation.** Consecutive routine execution work keeps the baton at execution; flip to strategy only for architectural decisions, blocking questions, or plan milestones.
- **Step 4.2 — Patient Registry endpoint** complete. Strategy-channel plan review accepted in this turn; built without architectural deltas. Surface:
  - 17 Supabase migrations under `supabase/migrations/` (applied via Supabase MCP); dev project schema now: `tenants`, `clinician_profiles`, `patients`, `audit_events` (hash-chained per D.17, ordered by per-tenant `chain_sequence`), `event_queue` (CloudEvents v1.0.2 outbox per §17.9). RLS enforces tenant scoping on every table; soft-delete filter is application-side (PG RLS soft-delete trap — see migration 0015 + `notes.md`). `audit_events_append` lives in a private `airis_internal` schema (not exposed via PostgREST).
  - Italian-claim Custom Access Token Hook stub per D.18 + §17.13 (`public.custom_access_token_hook`); projects 9 Italian-identity fields from `clinician_profiles` into JWT `app_metadata` on every token issuance. Manual one-time registration in Supabase Dashboard required (see `infra/manifest.md`).
  - Atomic `patient_create / patient_update / patient_delete` RPCs combining the patients-row mutation, CloudEvents envelope insert into `event_queue`, and audit-chain append in one transaction.
  - Node code: `lib/cloudevents.ts` envelope builder + Zod-validated event registry under `events/core/`, `lib/finalita.ts` (closed enum + `X-AIRIS-Finalita` header parser), `lib/db/patients.ts` data-access layer (single audited path per founder steer — no triggers), `lib/supabase/server.ts` Next.js server client.
  - App Router routes: `app/api/patients` (GET list + POST) and `app/api/patients/[id]` (GET + PATCH + DELETE). Auth-gated, tenant-scoped via JWT app_metadata, finalità required on every mutation.
  - Vitest installed; `tests/patients.roundtrip.test.ts` exercises create→update→delete + chain linkage + RLS isolation across tenants + soft-delete default filter. End-to-end SQL smoke test (via Supabase MCP) verified chain integrity (3 appends in one transaction, no chain fork). Vitest runs locally when `.env.local` carries the project URL, publishable key, and service-role key (see `infra/manifest.md`).
  - Build + lint + typecheck all clean (`npm run build`, `npm run lint`, `npx tsc --noEmit`).
- **`infra/manifest.md` updated**: migration level 0 → 17; schema state listed; new deps (`@supabase/supabase-js`, `@supabase/ssr`, `zod`, `ulid`, `vitest`, `dotenv`); new secret name `SUPABASE_SERVICE_ROLE_KEY`; Custom Access Token Hook registration step recorded.
- **`docs/decision-log.md` entry** appended for this turn.
- **`notes.md` created** at repo root — Step 4.2 Claude Code experience observations + operational notes (Active Plan deliverable).

## In flight / uncommitted
- None on the branch after the PR squash-merge.

## Next concrete step (strategy turn)

**Step 4.3 — Paradigm prototype (CT scheduling)** per `docs/AIRIS_Active_Plan.md`. Architecturally substantive: voice stack (Pipecat + Italian STT/TTS per §17.6), dual-surface real-time sync per §17.4, **local self-hosted LLM as active backend** per D.22 (Ollama VPS), and the consciousness substrate six-layer composition per §17.4. Strategy turn frames the prototype scope + LLM backend wiring + Italian intent corpus before execution kicks off.

Phase 0 active LLM backend remains **Anthropic API** per `infra/manifest.md` until D.22's local-active flip is operationally wired in Step 4.3 (Ollama VPS).

## Open questions for the other channel

- **CATH registration timing.** The Custom Access Token Hook function is defined in the DB but must be registered in the Supabase Dashboard for it to fire on auth events. Phase 0 dev: register now (manual click) so tests covering the Italian claims work end-to-end? Or defer to Step 4.5 when the hook composes real ABAC state? Lean: register now — the stub is well-bounded, and the round-trip test in this PR doesn't depend on the hook (test JWTs are constructed by Supabase Auth without exercising the hook unless registered). Founder call.
- **`finalità` enum reconciliation with FSE 2.0.** Recorded as a Step 4.13 task; no Phase 0 action.
- **G2 trigger.** When should we move tests off the live `airis` Supabase project (G1) to Supabase local CLI or a Pro-tier preview branch (G2)? Active trigger from the plan: "before any real or sensitive data exists in the project." Phase 0 has none; revisit at Step 4.4 transition.
