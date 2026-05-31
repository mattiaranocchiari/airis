**Active stage / step:** 4 / 4.5 (Core systems build) — Turn 2 in progress (infra activation).
**Operating model:** single Claude Code session per V28 D.25 — the canonical docs are the entire memory; see `/CLAUDE.md`.
**Active branch:** `claude/step-4.5-turn2-d-inngest` → PR pending after this commit.
**Status:** On `main`: Turn 1 (A #6, B+G-partial #7) + Turn 2 kickoff (#8) + Turn 2 E (#9). This branch lands **Turn 2 sub-deliverable D** (Inngest durable execution — client + serve route + outbox-drain function). Built abstraction-first, dormant until Inngest Cloud connected; greens hold. Remaining: F (observability); CATH (C) verification; live validation of E + D when secrets land. Self-merge on greens per V28 D.25.
**Updated:** 2026-05-31 by Claude Code @ this commit.

---

## Just done

This branch, from `main` HEAD `c2bc9a9`:

- **Sub-deliverable D — Inngest durable execution (D.16 + §17.3).**
  - `lib/inngest/client.ts` — Inngest client (app id `airis`).
  - `app/api/inngest/route.ts` — serve endpoint (GET/POST/PUT; `nodejs` runtime). Builds clean under Next 16.
  - `lib/inngest/functions.ts` — first function `drainOutbox` (cron `*/1 * * * *`): drains the `event_queue` outbox + relays each CloudEvent onto the per-tenant `tenant:{id}:events` bus. Foundation for the Step 4.7 Event System; distinct from the scheduler's direct L2 broadcast (no double-fire).
  - `lib/events/drain.ts` — pure `drainEventQueue(db, broadcast)`: select unprocessed → broadcast → mark `processed_at`; failed broadcast leaves the row for retry (at-least-once). Unit-tested (`tests/events.drain.test.ts`, 3 cases) with a fake Supabase chain + broadcaster.
  - `lib/supabase/admin.ts` — service-role client for the no-session function context (bypasses RLS; server-only).
  - Dep `inngest@^4.5.0`. **Dormant** until `INNGEST_*` keys + Inngest Cloud registration — Phase 0 behaviour preserved (outbox still written by the audited emitter; nothing external drains it yet).
- **`infra/manifest.md`** updated (Inngest bullet → code landed; runtime-deps + API-routes + admin-client lines).
- **Greens:** build, lint, typecheck, test (26 passed / 7 env-gated skipped), `check:migrations` (23/level 23). Inngest live path not exercised (no account/keys) — flagged pending.

## In flight / uncommitted

- This commit lands D. Routine (operationalises D.16 + §17.3; the cron-drain keeps the audited emitter untouched; no new architectural commitment) → self-merges per V28 D.25 on greens.

## Next concrete step

1. **Open + self-merge this PR** on greens.
2. **F — observability (Sentry + Grafana/OTel)**: next and final Turn 2 code branch (one at a time per V28 D.25), abstraction-first / no-op without DSN, per `docs/Step_4.5_Turn2_plan.md`. Note: Sentry's Next 16 setup is version-sensitive — build carefully.
3. **CATH (C) verification** — pending one post-toggle sign-in by Mattia as `clinician-a@airis.demo`; then confirm via the auth logs + token-issuance latency. Hook output already proven by simulation; GoTrue config reload observed 14:58:51Z (2026-05-30).
4. **Live validations** once secrets land: E (`AIRIS_CACHE_BACKEND=upstash` + `UPSTASH_*`), D (`INNGEST_*` + register the serve endpoint with Inngest Cloud → confirm the drain runs + relays).
5. On Turn 2 close: `docs/Step_4.5_notes.md` + `docs/Step_4.6_plan.md` stub (Step 4.5 acceptance).

## Open questions for Mattia (founder steering)

- **Secrets** — drop any of `INNGEST_*` / `UPSTASH_*` / `SENTRY_*` / `GRAFANA_OTLP_*` (Vercel + `.env.local`) whenever ready; each unblocks its backend's live validation. Onboarding checklist in `docs/Step_4.5_Turn2_plan.md`.
- **CATH sign-in** — one `clinician-a@airis.demo` login closes sub-deliverable C verification.
- **Branch protection (G heavy)** — enable the required `build-lint-typecheck-test` check on `main` when ready (PR template already in repo).
- **Infisical (H)** — defer until secret sprawl is real (Turn 2 adds ~8 secret names).

Carry-forwards from Step 4.3 still open:

- **Voice stack (Step 4.14)** — browser-native Web Speech held for Phase 0.
- **eGFR threshold + real-lab integration (Step 4.10)** — Phase 0 mock used 60 mL/min/1.73m².
- **Synthetic Step 4.3 demo data in dev Supabase** — wipe when convenient.
