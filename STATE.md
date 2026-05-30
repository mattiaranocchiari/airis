**Active stage / step:** 4 / 4.5 (Core systems build) — Turn 2 opened (infra activation).
**Operating model:** single Claude Code session per V28 D.25 — the canonical docs are the entire memory; see `/CLAUDE.md`.
**Active branch:** `claude/step-4.5-turn2-kickoff` → PR pending after this commit.
**Status:** Turn 1 complete on `main` (`0b095cf`): A LLM substrate lift (#6) + B audit emitter library + G-partial change control (#7). Founder steer 2026-05-30: **activate all of Turn 2** (Inngest + Upstash + observability), **remote-guide CATH now**, **draft the PR template**. This branch lands the Turn 2 kickoff scaffolding (PR template + Turn 2 execution plan + pre-registered secret names). The D/E/F code branches are gated on Mattia creating the (free-tier, EU) accounts + providing secrets. Self-merge on greens per V28 D.25.
**Updated:** 2026-05-30 by Claude Code @ this commit.

---

## Just done

This branch, from `main` HEAD `0b095cf`:

- **G heavy (code half) — PR template.** `.github/pull_request_template.md`: MDR Class IIb change-control fields (summary, step ref, migration-level delta, D.x impact, verification greens, self-merge eligibility per the V28 D.25 branch model).
- **Turn 2 execution plan.** `docs/Step_4.5_Turn2_plan.md`: the onboarding checklist (which accounts Mattia creates + which secrets to provide), C/D/E/F sub-steps with design nuances (esp. the E sync→async cache-API decision), sequencing (E→D→F once secrets land), failure-mode triggers, acceptance criteria, and the CATH + branch-protection operator steps.
- **`infra/manifest.md`.** Pre-registered the Turn 2 managed-infra accounts + secret names (names only): `INNGEST_EVENT_KEY` / `INNGEST_SIGNING_KEY`, `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`, `SENTRY_DSN` / `SENTRY_AUTH_TOKEN`, `GRAFANA_OTLP_ENDPOINT` / `GRAFANA_OTLP_TOKEN`, plus selectors `AIRIS_EVENTS_BACKEND` / `AIRIS_CACHE_BACKEND`. CATH-pending + branch-protection notes added.

Greens unaffected (docs + template + manifest only; no runtime code). CI runs build/lint/typecheck/check:migrations/test/eval:intents.

## In flight / uncommitted

- This commit lands the kickoff scaffolding. Routine (no runtime code, no new architectural commitment) → self-merges per V28 D.25 on greens.

## Next concrete step

**Mattia (in parallel, the critical path):**
1. **CATH (C)** — Supabase Dashboard → Authentication → Hooks → "Customize Access Token (JWT) Claims" → select `public.custom_access_token_hook` → Save; sign in as a demo clinician; we verify the JWT `app_metadata` carries profile-projected claims (`scope_version`, `consent_version`, `specializzazione`, …). Non-breaking (claims mirror the baked values).
2. **Create accounts** per `docs/Step_4.5_Turn2_plan.md` onboarding checklist (Inngest Cloud EU, Upstash Redis EU, Sentry EU, Grafana Cloud EU) and add the secrets to Vercel (prod + preview) + local `.env.local`.

**Claude (once secrets land):** open the D/E/F code branches — one at a time per V28 D.25 — in order **E (Upstash L3) → D (Inngest fan-out) → F (Sentry + Grafana)**, each abstraction-first with a default backend that keeps tests green without the live account. Then the Turn 2 end-to-end smoke + `docs/Step_4.5_notes.md` + `docs/Step_4.6_plan.md` stub (Step 4.5 close per the plan acceptance).

Code can also be written *ahead* of secrets with graceful degradation (Phase 0 path when env absent), so the branches don't strictly block on the accounts — but landing each against its live service is the cleaner validation.

## Open questions for Mattia (founder steering)

Mostly resolved this session (Turn 2 = activate all; CATH = remote-guide now; G-heavy PR template = drafted). Remaining:

- **E (Upstash) API shape** — working answer: make the L3 cache API async (option 1 in the Turn 2 plan) vs. write-through sync mirror (option 2). Confirm at execution.
- **Branch protection (G heavy, repo settings)** — Mattia enables the required `build-lint-typecheck-test` check on `main` when ready (PR template already in repo).
- **Infisical (H)** — working answer: defer until secret sprawl is real (Turn 2 adds ~8 secret names — revisit if that crosses Mattia's threshold).

Carry-forwards from Step 4.3 still open:

- **Voice stack (Step 4.14).** Browser-native Web Speech held for Phase 0; paid voice (Deepgram / AssemblyAI / ElevenLabs) surfaces at Step 4.14 or earlier if Mattia wants it sooner.
- **eGFR threshold + real-lab integration (Step 4.10).** Phase 0 mock used 60 mL/min/1.73m²; real clinical guidance lands at Step 4.10 Radiology deep.
- **Synthetic Step 4.3 demo data in dev Supabase.** Wipe when convenient.
