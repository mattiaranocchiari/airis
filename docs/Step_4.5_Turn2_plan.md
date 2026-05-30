# AIRIS Step 4.5 — Turn 2 execution plan (infra activation)

*Execution-turn plan for Step 4.5 Turn 2. Operational scaffolding (planning
artifact); not a canonical document. Refines the Turn 2 portion of the
`docs/Step_4.5_plan.md` stub.*

*Authored 2026-05-30 after founder steer: **activate all now** (Inngest +
Upstash + observability), **remote-guide CATH now**, **draft the PR template**.
Turn 1 (A LLM substrate lift #6; B audit emitter + G-partial change control #7)
is merged to `main`.*

---

## The critical path is account creation

Every Turn 2 sub-deliverable activates a managed service behind a §17
abstraction. **Mattia creates the (free-tier, EU) accounts and provides the
secrets; Claude wires the code.** Code is written abstraction-first with
graceful degradation (works with the Phase 0 in-process/same-transaction path
when secrets are absent, exactly like the env-gated live-DB tests and the LLM
backend selection from Turn 1A) — so activation is configuration, not rewrite
(V28 D.20 + Working Principle 0.3.3 + 0.3.8).

### Onboarding checklist (Mattia)

Create each as a **free tier, EU region**, then add the secret(s) to **Vercel
project env** (production + preview) and to a local `.env.local` for dev. Names
only ever live in `infra/manifest.md`; never commit values.

| # | Service | Account | Secrets to provide |
|---|---|---|---|
| D | **Inngest Cloud** (EU) | inngest.com → new app `airis` | `INNGEST_EVENT_KEY`, `INNGEST_SIGNING_KEY` |
| E | **Upstash Redis** (EU) | upstash.com → new Redis DB, EU region | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` |
| F | **Sentry** (EU) | sentry.io (EU data region) → new Next.js project | `SENTRY_DSN` (or `NEXT_PUBLIC_SENTRY_DSN`), `SENTRY_AUTH_TOKEN` (source maps) |
| F | **Grafana Cloud** (EU) | grafana.com → stack, EU region; OTLP endpoint | `GRAFANA_OTLP_ENDPOINT`, `GRAFANA_OTLP_TOKEN` (or instance id + token) |

Selector env vars (default = Phase 0 behaviour when unset): `AIRIS_CACHE_BACKEND`
(`memory` | `upstash`), `AIRIS_EVENTS_BACKEND` (`outbox` | `inngest`). Exact
names finalised when each backend lands; pre-registered in `infra/manifest.md`.

---

## Sub-deliverable C — CATH registration (D.18 + §17.13) — do now, remote-guided

One-time dashboard enablement; no account needed. The function
`public.custom_access_token_hook(event jsonb)` (migration 0008) is already
defined + granted to `supabase_auth_admin`; demo clinicians' `clinician_profiles`
rows already mirror the baked `raw_app_meta_data`, so turning the hook on is
**non-breaking** (it projects the same claims from the profile = source of truth).

**Steps (Mattia):**
1. Supabase Dashboard → project `airis` → **Authentication → Hooks**.
2. **Customize Access Token (JWT) Claims** → enable → select Postgres function
   `public.custom_access_token_hook` → Save.
3. Sign out / sign in as a demo clinician (`clinician-a@airis.demo`).

**Verification (together):** decode the issued JWT (jwt.io, or
`supabase.auth.getSession()` in the app) and confirm `app_metadata` now carries
the profile-projected claims — `scope_version`, `consent_version`,
`specializzazione`, `current_assignment`, `break_glass_active` — not just the
baked `tenant_id`. Those extra fields appearing prove the hook fired.

**Failure-mode trigger (from the Step 4.5 plan):** if CATH adds latency that
breaks the cold-start auth-token budget, reconsider §17.13 CATH-as-default vs. a
precomputed-claim cache. Capture token-issuance timing during verification.

---

## Sub-deliverable D — Inngest durable execution (D.16 + §17.3)

Activate Inngest Cloud (EU). First concrete use: the CloudEvents `event_queue`
outbox — Inngest consumes events and fans out to subscribers with retry/backoff
(today the same-transaction outbox row is the only sink; nothing drains it).

**Shape:**
- `lib/events/inngest.ts` — Inngest client (`new Inngest({ id: "airis" })`).
- `app/api/inngest/route.ts` — the serve endpoint (Next.js App Router handler).
- First function: `event_queue` drain → re-broadcast on the §17.4 L2 Realtime
  channel + mark `processed_at`. Keep the emitter's same-transaction outbox
  write as the durable source; Inngest is the fan-out/retry layer over it
  (the emitter call signature from Turn 1B does **not** change — D.17 invariant).
- Env-gated: when `INNGEST_*` absent, the app runs exactly as Phase 0 (outbox
  written, no external consumer). `AIRIS_EVENTS_BACKEND` documents intent.

**Failure-mode trigger:** Inngest free tier insufficient for early-Phase-A
throughput → reconsider §17.3 managed-vs-self-hosted timing (vs. D.20's "Phase D"
framing).

---

## Sub-deliverable E — L3 cache → Upstash Redis (§17.4)

Swap the in-process `Map` in `lib/consciousness/cache.ts` for Upstash Redis so
the L3 hot-context cache is cross-process (Inngest workers + future Patient Flow
Layer need it).

**Design decision to make at execution (flagged now):** the current L3 API is
**synchronous** (`readContext`, `recordUtterance`, `setPendingDisambiguation`…),
called without `await` from `app/scheduler/actions.ts`. Upstash REST is async.
Two options:
1. **Make the L3 API async** + `await` at call sites (cleanest; small ripple in
   `actions.ts`).
2. **Write-through**: keep the in-process Map as the synchronous fast path and
   mirror writes to Upstash async for cross-process reads (preserves the sync
   read API; more moving parts; staleness window).

Working answer: **option 1** (async API) — honest cross-process semantics, and
the abstraction stays a single backend selected by `AIRIS_CACHE_BACKEND`
(`memory` default → `upstash`). Confirm at execution. `_clearAllForTest` /
`clearForTest` map to key-scan deletes on the Upstash path.

Adds dep `@upstash/redis`. Default `memory` backend keeps every existing test
green without an Upstash account.

---

## Sub-deliverable F — observability (§17.16 + §17.17)

Activate **Sentry** (EU) + **Grafana Cloud** (EU). Wire Sentry into Next.js
(client + server + edge configs) for error capture; export the existing
client-side `TimingTrace` (dual-surface latency SLO) to Grafana via an OTLP
exporter. **Audit observability stays disjoint** from SRE observability — the L6
Postgres audit chain + cold storage is never routed through Sentry/Grafana
(D.17 + §17.16 hard line).

Env-gated: no DSN / no OTLP token → no-op (Phase 0 behaviour). Sentry source-map
upload runs only when `SENTRY_AUTH_TOKEN` is present (CI/build).

**Failure-mode trigger:** if OTLP export adds perceptible latency to the
dual-surface path, move export off the hot path (batch/async) before continuing.

---

## G heavy — MDR Class IIb scaffolding (§17.20)

- **PR template** — landed this turn (`.github/pull_request_template.md`):
  change-control fields (summary, step ref, migration-level delta, D.x impact,
  verification greens, self-merge eligibility).
- **Branch protection (Mattia, repo settings):** GitHub → repo → Settings →
  Branches → add rule for `main`: require the `build-lint-typecheck-test` status
  check to pass before merge; require branches up to date. (Leave self-merge
  possible — the V28 D.25 model is self-merge-on-green, not mandatory review.)
- **Changelog post-merge auto-commit:** deferred — pairs with branch protection
  + needs CI write-back (`contents: write`); `npm run changelog` stays the
  manual regen until then.

---

## Sequencing

```
C  (CATH register)      Mattia dashboard, no dep        — do first (no account)
G  (PR template)        landed this turn                — done
D  (Inngest)            needs INNGEST_* secrets         — code branch when keys land
E  (Upstash)            needs UPSTASH_* secrets         — code branch (async decision)
F  (Sentry + Grafana)   needs DSN + OTLP secrets        — code branch
```

Each of D / E / F is its own focused branch → PR → self-merge on greens (V28
D.25). Order once secrets land: **E then D** (Inngest workers consume the L3
cache) then **F**. One open branch at a time.

## Acceptance (Turn 2 complete)

- C verified (JWT carries profile-projected claims; token-issuance latency ok).
- D + E + F landed, each with default-backend tests green and env-gated live
  paths.
- End-to-end smoke (per the Step 4.5 plan): Inngest consumer reads an
  `event_queue` event → fans to a Realtime subscriber → L3 (Upstash) reflects it
  → audit chain has the row.
- `infra/manifest.md` updated with live URLs/dashboards + migration level.
- `docs/Step_4.5_notes.md` written (mirrors 4.2/4.3/4.4 notes) +
  `docs/Step_4.6_plan.md` stub.

## Cross-references

V28 D.16 (Inngest) · D.17 (audit ledger — emitter from Turn 1B) · D.18 + §17.13
(CATH) · D.20 (minimal infra) · D.25 (single-session operator / branch model) ·
§17.3 (Inngest) · §17.4 (substrate L2/L3) · §17.9 (event system) · §17.16–§17.17
(observability) · §17.19 (CI gates) · §17.20 (MDR change control) ·
`docs/Step_4.5_plan.md` (the eight-sub-deliverable stub).
