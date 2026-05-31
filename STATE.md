**Active stage / step:** 4 / 4.5 (Core systems build) — Turn 2 in progress (infra activation).
**Operating model:** single Claude Code session per V28 D.25 — the canonical docs are the entire memory; see `/CLAUDE.md`.
**Active branch:** `claude/step-4.5-turn2-e-upstash` → pushed; PR pending (GitHub MCP was disconnected at commit time — open the PR when it reconnects).
**Status:** On `main`: Turn 1 (A #6, B+G-partial #7) + Turn 2 kickoff (#8). This branch lands **Turn 2 sub-deliverable E** (L3 cache → async `CacheBackend`; `memory` default + `upstash` backend). CATH (C) toggled by Mattia 2026-05-30 — verification pending one post-toggle sign-in. D (Inngest) + F (observability) still to build. Self-merge on greens per V28 D.25 once the PR exists.
**Updated:** 2026-05-30 by Claude Code @ this commit.

---

## Just done

This branch, from `main` HEAD `86c1255`:

- **Sub-deliverable E — L3 cache → Upstash (§17.4).** `lib/consciousness/cache.ts` is now an **async `CacheBackend` contract** (the read/write API went async — option 1 from the Turn 2 plan — so a network backend fits without changing call semantics):
  - `memory` backend (default; the Phase 0 in-process Map) keeps every existing path green without any account.
  - `upstash` backend (`lib/consciousness/cache.upstash.ts`, **lazily imported** so the default path never loads the Redis client) selected by `AIRIS_CACHE_BACKEND=upstash`; namespaced keys (`airis:l3:`) + 24h TTL; dependency-injectable client.
  - Consumers updated to `await`: `app/scheduler/actions.ts` (9 call sites), `lib/consciousness/resolve.ts` (2). The two consciousness tests made async.
  - New `tests/consciousness.cache.upstash.test.ts` (3 cases) validates prefixing + serialization round-trip + prefix-scoped `clearAll` via a fake Redis (no live instance). Merge/trim logic stays covered by the memory-backend tests.
  - Dep added: `@upstash/redis` (^1.38.0).
- **`infra/manifest.md`**: Upstash bullet → "code landed; pending live validation" + runtime-deps line updated.
- **Greens:** build, lint, typecheck, test (23 passed / 7 env-gated skipped), `check:migrations` (23/level 23) all clean. Upstash live path not yet exercised (no account/secrets/connector) — flagged pending.

## In flight / uncommitted

- This commit lands E. **PR not yet opened** — GitHub MCP was disconnected when this was committed; open a draft PR for `claude/step-4.5-turn2-e-upstash` → `main` when it reconnects, then self-merge on greens (routine; E operationalises §17.4; the sync→async L3 decision was pre-surfaced in the Turn 2 plan and approved under "activate all", so no new architectural commitment).

## Next concrete step

1. **Open the PR for this branch** (GitHub MCP) + self-merge on greens.
2. **CATH (C) verification** — pending one post-toggle sign-in by Mattia as `clinician-a@airis.demo`. Then confirm via the auth logs (clean `/token` issuance, no hook error) + token-issuance latency (failure-mode trigger). Hook output already proven by simulation; GoTrue config reload observed at 14:58:51Z. On confirmation, record C done in manifest/STATE/decision-log.
3. **D — Inngest** then **F — Sentry + Grafana**: next code branches (one at a time per V28 D.25), abstraction-first with default no-op so tests stay green without the accounts, per `docs/Step_4.5_Turn2_plan.md`. Can be built ahead of secrets; live-validate when keys land.
4. **Activate E live**: once `UPSTASH_*` secrets land, flip `AIRIS_CACHE_BACKEND=upstash` on a preview and confirm cross-process round-trip.
5. On Turn 2 close: `docs/Step_4.5_notes.md` + `docs/Step_4.6_plan.md` stub (Step 4.5 acceptance).

## Open questions for Mattia (founder steering)

- **Secrets** — drop any of `UPSTASH_*` / `INNGEST_*` / `SENTRY_*` / `GRAFANA_OTLP_*` (Vercel + `.env.local`) whenever ready; each unblocks its backend's live validation. Onboarding checklist in `docs/Step_4.5_Turn2_plan.md`.
- **Branch protection (G heavy)** — enable the required `build-lint-typecheck-test` check on `main` when ready (PR template already in repo).
- **Infisical (H)** — defer until secret sprawl is real (Turn 2 adds ~8 secret names — revisit if that crosses your threshold).

Carry-forwards from Step 4.3 still open:

- **Voice stack (Step 4.14)** — browser-native Web Speech held for Phase 0; paid voice surfaces at 4.14 or earlier if wanted.
- **eGFR threshold + real-lab integration (Step 4.10)** — Phase 0 mock used 60 mL/min/1.73m².
- **Synthetic Step 4.3 demo data in dev Supabase** — wipe when convenient.
