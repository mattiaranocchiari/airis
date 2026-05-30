# AIRIS Step 4.5 — Core systems build: plan stub

*Strategic scope + sequencing sketch for the Step 4.5 execution turn.
Operational scaffolding (planning artifact); not a canonical document.
Refined into the full execution-turn plan when Step 4.5 opens.*

*Authored: 2026-05-30, during the Step 4.4 Phase 0 → Phase A transition turn.
Per V28 D.25 (single-session integrated operator), this is the next
execution turn's reference point.*

---

## What Step 4.5 is for

Per Active Plan + V28 D.10 + D.11 + D.20: **lift Phase 0's production-discipline
patterns into production-grade Phase A foundations**, and activate the
infrastructure Phase A subsystems will build on. The output is the substrate
Steps 4.6 → 4.17 then build on without re-litigating Phase 0 trade-offs.

This is not a customer-facing milestone. It's the first Phase A step and the
heaviest infrastructure-activation turn in the SW Build stage.

---

## Scope (per V28 D.20 + V28 D.21 + V28 D.22 + Active Plan Step 4.5 description)

Eight sub-deliverables. Some are "lift Phase 0 pattern to production form"
(cheap); some are "new infrastructure" (heavier). Sequencing reflects what
blocks what.

### Sub-deliverable A — Engine-agnostic LLM substrate abstraction lift (D.21 + D.22 + §17.5)

The `lib/llm/anthropic.ts` Phase 0 call site moves behind a stable
AIRIS-internal interface. The interface commits to three deployment modes
(client-local self-hosted, online API, AIRIS-hosted non-HQ); the concrete
backend stays Claude API direct (Mode 2) unless the deployment overrides via
env. The intent parse + future agentic calls go through the abstraction;
prompt assets, structured-outputs schemas, evaluation harnesses, and
observability stay identical across modes (engine swaps are configuration,
not rewrite).

Lift category: **medium**. The call-site shape is already there; the abstraction
is shaping + interface naming + env-driven backend selection.

### Sub-deliverable B — Audit ledger emitter library (D.17)

The `airis_internal.audit_events_append` DB function stays where it is. The
Node-side caller pattern (currently duplicated across `lib/db/patients.ts` +
`lib/db/appointments.ts`) generalises into `lib/audit/emitter.ts` with a
unified `emitAuditEvent(eventType, opts)` API. Subsequent subsystems
(Patient Flow Layer, Regulatory Layer, Agent Builder) all call it instead of
re-rolling per-RPC.

Lift category: **light**. DB side unchanged; Node side is consolidation.

### Sub-deliverable C — Italian clinician identity composition production form (D.18 + §17.13)

Phase 0 baked the Italian claim set into `raw_app_meta_data` directly. Step 4.5
lifts this to the production form: register the Custom Access Token Hook in
the Supabase dashboard; CATH reads `clinician_profiles` and projects into
JWT `app_metadata` on every token issuance. The `clinician_profiles` rows
already exist (Phase 0 mirror); the lift is just turning on the hook and
verifying the JWT claim shape matches.

Lift category: **light**. One Supabase dashboard step + verification.

### Sub-deliverable D — Inngest cross-Builder durable execution (D.16 + §17.3)

Activate Inngest Cloud (EU; free tier acceptable through early Phase A). The
first concrete use case is the CloudEvents `event_queue` outbox — Inngest
consumes events, fans out to subscribers, handles retries with backoff.
Subsequent uses (Agent Builder durable agent steps + Regulatory Layer
ESITO waits + Patient Flow Layer PDTA state-machine actor durability) land
in their respective step turns.

Lift category: **medium-heavy**. New infrastructure account + env vars +
producer-SDK + first consumer + observability hookup.

### Sub-deliverable E — L3 cache lift to Upstash Redis (§17.4)

The Phase 0 in-process L3 Map gets swapped for Upstash Redis (managed EU).
The `lib/consciousness/cache.ts` read/write API stays — only the
implementation changes. This unblocks the cross-process L3 access pattern
that Inngest workers + Patient Flow Layer will need.

Lift category: **light** (if done alongside Inngest activation; the cost is
shared) — **medium** otherwise.

### Sub-deliverable F — Observability stacks (§17.16 + §17.17)

Activate Grafana Cloud EU (free tier) + Sentry EU (free tier). Wire Sentry
into Next.js error boundaries + server actions. Wire OpenTelemetry to
Grafana for the dual-surface latency SLO (already captured client-side as
TimingTrace; lift to OTLP exporter). Audit observability stays Postgres L6 +
cold storage — explicitly disjoint from SRE observability per D.17 +
§17.16's commitment.

Lift category: **medium**. Two new SaaS accounts + Next.js wiring +
TimingTrace OTLP exporter.

### Sub-deliverable G — CI/CD pre-merge gates (§17.19)

The Phase 0 GitHub Actions workflow runs build + lint + typecheck + test +
eval:intents. Step 4.5 adds:
- Required-check enforcement (branch protection on `main`).
- CHANGELOG.md generation from PR titles per §17.20.
- Migration-level check (`supabase/migrations/` must monotonically increase;
  no skipped numbers) to enforce MDR Class IIb change control.

Lift category: **light**. Workflow extensions + GitHub branch protection
config (Mattia's repo settings, not code).

### Sub-deliverable H — Secrets management activation (§17.15)

Phase 0 uses Vercel env vars + Supabase dashboard for secret storage. Step
4.5 evaluates Infisical (per §17.15 commitment) for centralised secret
management. **Decision deferred to Step 4.5 execution** — the founder may
prefer to defer Infisical activation until production traffic exists
(consistent with V28 D.20 minimal-infrastructure philosophy). Working answer:
defer; revisit when secret sprawl is real.

Lift category: **deferred** or **medium** if activated.

---

## Sequencing within Step 4.5

```
Sub-deliverable      Depends on        Critical path?
─────────────────    ──────────────    ──────────────
A — LLM abstraction   none              no (parallel)
B — Audit emitter     none              no (parallel)
C — CATH register     none              no (parallel)
G — CI gates          none              no (parallel)
D — Inngest           A (substrate)     yes — gates F + later subsystems
E — Upstash Redis     D (or parallel)   yes — alongside D
F — Observability     D (consumer)      no (parallel with E)
H — Infisical         (deferred)        no
```

A + B + C + G are independent Phase 0-pattern lifts and can land in the first
execution turn. D + E are the heavy lift and probably warrant their own
execution turn. F can land alongside D + E or after. H is deferred unless
Mattia steers otherwise.

**Operational shape: probably two execution turns.** Turn 1 lands A + B + C + G
(lifts). Turn 2 lands D + E + F (new infrastructure activation). Both close
under self-merge per the V28 D.25 branch model if no architectural calls
surface.

---

## Architectural commitments (no new `D.x` expected)

Step 4.5 should not require any new `D.x` entries. Every sub-deliverable
operationalises a pre-existing V28 commitment:

- A operationalises D.21 + D.22 + §17.5.
- B operationalises D.17 + §17.9.
- C operationalises D.18 + §17.13.
- D operationalises D.16 + §17.3 + §17.9.
- E operationalises §17.4 L3.
- F operationalises §17.16 + §17.17.
- G operationalises §17.19 + §17.20.
- H operationalises §17.15 (or defers).

If a sub-deliverable surfaces an architectural call (e.g. an interface shape
for the engine-agnostic abstraction that doesn't fit §17.5's framing; an
Inngest activation mode different from what D.16 commits to), surface inline
to Mattia per the D.25 mid-session ritual, record a new `D.x` if warranted,
proceed.

---

## Failure-mode triggers (set before execution begins)

Concrete revision triggers — if any fire, Step 4.5 surfaces a Master Doc
revision before continuing:

- **Engine-agnostic abstraction can't preserve the structured-outputs +
  prompt-caching SLO budget the Phase 0 prototype hit.** Reconsider §17.5's
  "interface commits to three modes; engines may vary on details" framing
  vs. a tighter interface that mandates a subset of engine capabilities.
- **Inngest free tier insufficient for Phase 0 → early Phase A event
  throughput.** Reconsider §17.3's Inngest commitment vs. self-hosted Inngest
  earlier than D.20's "production-grade activates Phase D" framing implies.
- **CATH registration introduces latency on the auth-token path** that
  breaks the sub-500ms perceived-latency budget for cold-start operations.
  Reconsider §17.13's CATH-as-default vs. precomputed-claim-cache pattern.
- **Audit emitter library generalisation breaks the per-tenant
  `chain_sequence` ordering guarantee.** Reconsider D.17's "one shared
  emitter across subsystems" vs. per-subsystem emitters with shared
  chain-validation discipline.

---

## Acceptance criteria

Step 4.5 is complete when:

- All eight sub-deliverables landed (or H explicitly deferred with rationale).
- `npm run build`, `npm run lint`, `npm run typecheck`, `npm run test` all
  green; `npm run eval:intents` still passes against the abstraction-lifted
  L5 call site (regression check that the abstraction doesn't degrade intent
  quality).
- New end-to-end smoke test: Inngest consumer reads an `event_queue` event,
  fans it to a Realtime Broadcast subscriber, the L3 cache reflects the
  update, the audit chain has the corresponding row.
- `infra/manifest.md` updated with Inngest + Upstash + Grafana + Sentry
  pointers, migration level, new secret names, observability dashboard URLs.
- Step 4.5 notes file (`docs/Step_4.5_notes.md`) written, mirroring the Step
  4.2 + 4.3 notes pattern.
- `docs/Step_4.6_plan.md` stub written so Step 4.6 (Patient Flow Layer) has
  a strategic scope sketch to refine when it opens.

---

## Open questions for Mattia (surface during Step 4.5 execution)

These are the "needs Mattia" rows from the Phase A unblocked check in
`docs/Step_4.4_notes.md`:

- **Inngest activation timing.** Activate at Step 4.5 (as planned) or defer
  to first subsystem that needs durable execution?
- **Observability activation timing.** Activate Grafana + Sentry at Step 4.5
  (as planned) or defer to first production-traffic moment?
- **Upstash Redis activation timing.** Activate alongside Inngest (recommended)
  or continue with in-process L3 cache until cross-process need surfaces?
- **MDR Class IIb scaffolding scope.** CHANGELOG.md + PR-template enforcement
  starts at Step 4.5 per §17.20 — what's the minimum scaffolding shape
  Mattia's MDR audit will accept?
- **Infisical (sub-deliverable H).** Activate at Step 4.5 or defer until
  secret sprawl is real?

Working answers in the relevant sub-deliverable sections above. Silence-
as-assent applies; Mattia steers when he wants different defaults.

---

## Cross-references

- **V28 D.16** — Inngest as cross-Builder durable execution layer.
- **V28 D.17** — Hash-chained L6 audit ledger.
- **V28 D.18** — Italian clinician identity composition.
- **V28 D.20** — Real UX, Minimal Infrastructure operational philosophy.
- **V28 D.21** — Engine-agnostic LLM substrate abstraction.
- **V28 D.22** — Current concrete backend: Claude API direct.
- **V28 D.25** — Single-session integrated operator.
- **§17.3** — Inngest stack.
- **§17.4** — Substrate layers (L1 through L6 + four contracts).
- **§17.5** — LLM substrate.
- **§17.9** — Event System stack.
- **§17.13** — Italian clinician identity composition.
- **§17.15** — Secrets management.
- **§17.16-§17.17** — Observability (SRE + audit, disjoint).
- **§17.19** — CI/CD pre-merge gates.
- **§17.20** — MDR Class IIb change control.
- **`docs/Step_4.4_notes.md`** — Phase 0 synthesis + Phase A unblocked check.
- **`docs/Step_4.3_notes.md`** — Phase 0 paradigm-prototype operational deltas
  (the L5 call-site shape, the L2 broadcast contract, the L3 cache fit, the
  audit emitter pattern — all carry forward).
