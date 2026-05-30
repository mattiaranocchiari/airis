# AIRIS Step 4.4 — Phase 0 → Phase A transition: notes

Captured during the execution turn that landed Step 4.4 (Active Plan deliverable:
"Synthesize Phase 0 learnings; update Master Doc if needed; confirm Phase A core
systems work is unblocked"). Operational scratchpad; not a canonical document.
Companion to the Step 4.2 + Step 4.3 notes files.

---

## What Phase 0 actually proved

Phase 0 (Steps 4.1 + 4.2 + 4.3) was committed in V28 D.9 as **paradigm validation
without production-grade infrastructure** — confirm that the V28 stack commitment
(managed Supabase EU + Vercel + Next.js + Claude API direct per D.22) holds for
the dual-surface paradigm + consciousness substrate, before Phase A locks in much
heavier infrastructure (Inngest, observability stacks, Patient Flow Layer
scaffolding, Regulatory Layer pipeline, etc.).

What landed across the three steps:

- **Step 4.1** (Next.js + Tailwind + Supabase + Vercel scaffold; minimal Phase 0
  procurement per V28 D.20). Confirmed: the chosen stack instantiates without
  surprises.
- **Step 4.2** (Patient Registry endpoint: CloudEvents v1.0.2 envelope per §17.9
  + hash-chained L6 audit ledger per D.17 + tenant RLS by construction +
  Italian-claim CATH stub per D.18). Confirmed: the atomic-RPC + CloudEvents +
  hash-chain audit pattern is implementable in the V28 stack and survives
  RLS-policy edge cases (the soft-delete trap; the audit-chain timestamp
  collision; the PostgREST function exposure on `SECURITY DEFINER`).
- **Step 4.3** (Paradigm prototype CT scheduling: dual-surface sync + English
  intent parsing on Claude API direct + consciousness substrate L1+L2+L3+L5+L6 +
  first sketches of the four AIRIS-native contracts). Confirmed by founder
  validation 2026-05-30: **paradigm validation held**; no failure-mode trigger
  fired; no Master Doc revision required. The drag-to-move + disambiguation
  auto-retry paths are both load-bearing for "feels like one event."

**What Phase 0 did not prove** (intentionally out of scope — Phase A territory):

- Engine-agnostic LLM substrate abstraction lift (the `lib/llm/anthropic.ts`
  call site is shaped for it but the abstraction itself hasn't been wired —
  Step 4.5).
- Inngest cross-Builder durable execution (V28 D.16).
- Observability stacks (Grafana Cloud EU + Sentry EU + OpenTelemetry per
  §17.16–§17.17).
- Patient Flow Layer scaffolding (Splink-Postgres MPI + PDTA state machines
  per §17.8).
- Three Builders (Agent Builder + Automation Builder + Integration Builder per
  §17.10–§17.12).
- Regulatory Layer pipeline (per §17.7; one Italian artifact at Step 4.13).
- Pgvector L4 semantic memory (per §17.4 deferred).
- Voice stack production form (Pipecat + Silero VAD + Smart Turn v3 + MedWhisper
  + Deepgram/AssemblyAI + ElevenLabs — Step 4.14).
- Production-grade self-hosted topology (Phase D pre-deployment).

---

## Three findings worth carrying forward (Phase A unblockers)

These are operational realisations from Phase 0 that should shape early Phase A
work without rising to `D.x` architectural commitments.

### 1. The audit-chain emitter pattern generalises cleanly

The `airis_internal.audit_events_append` SECURITY DEFINER function + per-tenant
`chain_sequence` ordering pattern that landed in Step 4.2 + got re-used in Step
4.3 for the appointment_* RPCs is exactly the shape D.17 commits to as "a
shared emitter library generalized across all 8 subsystems." Step 4.5 lifts
this from "two callers cut-and-paste" to "one Node-side emitter wrapping the
DB-side function" without changing the DB-side semantics. The audit chain
itself stays where it is; only the call-site surface generalises.

### 2. The `realtime.messages` per-tenant policy is the §17.4 L2 contract

Step 4.3 introduced the per-tenant RLS policy on `realtime.messages` that
authorises authenticated clinicians on topics matching
`tenant:{current_tenant_id}:%`. This is exactly the L2 broadcast authorisation
contract §17.4 commits to (private channels + RLS on `realtime.messages`).
Phase A subsystems (Patient Flow Layer pathway updates, Regulatory Layer
ESITO transitions, Agent Builder agent-action events, etc.) can reuse this
policy verbatim — they just need to publish on topics matching the existing
prefix. No additional RLS work per subsystem.

### 3. The L3 in-process map is sufficient through Step 4.10

The `lib/consciousness/cache.ts` Phase 0 in-process Node Map carrying
`pendingDisambiguation` + `recentActions` + `conversationHistory` is
sufficient until the L3 contract starts crossing process boundaries — which
happens when Inngest workers (Step 4.5+) need to read context written by a
Next.js server action, or when the Patient Flow Layer's PDTA state machines
(Step 4.6) need consciousness context for resolve() calls. Upstash Redis lift
should land alongside Inngest activation, not before. Phase 0's in-process
map can continue to serve through the first half of Phase A; replacing it
under the same read/write API contract is a Step 4.5 wiring change.

---

## Claude Code experience (Phase 0 cumulative)

Mirroring the Step 4.2 `notes.md` "Claude Code experience" pattern:

- **Plan-then-build flow continued to work.** Every step's plan-mode pass
  (`docs/Step_4.x_plan.md`) surfaced real architectural choices before
  execution started, not after. Step 4.3's plan in particular surfaced the
  four-pillars structure that the execution turn then implemented one pillar
  at a time without surprises.
- **Single-session operating model (D.25) lands cleanly.** The reframe from
  two-channel baton to single-session operator happened mid-Step-4.3 and
  didn't disrupt the in-flight work — the docs structure was already rich
  enough to carry all the state the strategy channel previously held. This
  was Mattia's observation made architectural ("we will work ONLY HERE so you
  are in charge of the whole project"); the implementation was straightforward
  CLAUDE.md + STATE.md + D.25 in the Master Doc + decision-log format update.
- **Supabase MCP let validation setup run programmatically.** Step 4.3
  validation needed two demo clinicians + seeded patients + eGFR mocks + a
  realistic grid. Bake-claim-into-`raw_app_meta_data` (vs. waiting on CATH
  dashboard registration) + a single SQL block via `execute_sql` handled
  everything without Mattia touching the Supabase dashboard.
- **TZ confounds are real.** The UTC-consistency fix landed during the
  validation setup (commit `142f0b2`) caught a real bug — local-tz hour
  bucketing on the grid + UTC-hour confirmations on the server would have
  desynced "book at 9" → "booked at 09:00" → "block renders at 11:00" for any
  non-UTC viewer. Worth keeping the UTC-as-default discipline through Phase A
  until per-clinic timezone handling lands.
- **Browser-native Web Speech as zero-key voice transport was a good Phase 0
  choice.** Made the validation walk possible without ElevenLabs / Deepgram
  spend; the `onTranscript` callback contract is stable across the Phase D
  upgrade. Voice-quality reads aren't paradigm-load-bearing at Phase 0 — they
  are at Step 4.14.

---

## V28 → V29 timing call

**Working answer: stay on V28. Promote to V29 at Step 4.5's cross-cutting
infrastructure lift.**

Rationale:

- V28's atomic commits since the original V28 cut (D.20 Real UX Minimal
  Infrastructure; D.21 reframed engine-agnostic abstraction; D.22 reframed
  Claude API direct as current backend; D.23 SW-first sequencing; D.24
  international platform; D.25 single-session operator) are all architectural
  but most are *scoping reframes* of existing commitments rather than
  cross-cutting structural changes. They live cleanly in V28's `D.x` log.
- The change that would warrant V29 is Step 4.5's cross-cutting infrastructure
  lift: engine-agnostic LLM abstraction concretised + Inngest cross-Builder
  durable execution wired + observability stacks activated + audit emitter
  library lifted + Patient Flow Layer scaffolding seeded. That's a substantial
  Section 17 update, multiple subsystem cross-references, and a real shift in
  what the project's "current production infrastructure" looks like — V29
  worthy.
- Promoting V28 → V29 now would be cosmetic (no underlying architectural shift
  warrants it) and would cost an atomic-commit pass without proportionate
  gain.

Surface to Mattia if a different call.

---

## Phase A core systems work — unblocked?

Step 4.5 (Core systems build) needs the following to be in place before
execution opens:

| Item | Status | Notes |
|---|---|---|
| Production-discipline patterns from Phase 0 | ✓ | atomic RPCs + CloudEvents outbox + hash-chained audit + tenant RLS all proven |
| Engine-agnostic LLM call-site shape | ✓ | `lib/llm/anthropic.ts` is shaped for the abstraction lift |
| §17.4 L2 broadcast contract proven | ✓ | `realtime.messages` per-tenant policy works |
| Inngest activation decision | needs Mattia | activate Inngest Cloud (free tier) at Step 4.5 vs. defer to first subsystem that needs durable execution |
| Observability activation decision | needs Mattia | activate Grafana Cloud EU + Sentry EU at Step 4.5 vs. defer to first production-traffic moment |
| Upstash Redis activation decision | needs Mattia | activate at Step 4.5 alongside Inngest (recommended) vs. continue with in-process L3 cache until cross-process need surfaces |
| MDR Class IIb change-control scaffolding | needs Mattia | CHANGELOG.md + PR-template enforcement starts at Step 4.5 per §17.20 |
| Three Builders sequencing | already committed in V28 D.10 + D.11 + Active Plan | Agent / Automation / Integration Builder land at Steps 4.8 / 4.9 / 4.10 respectively |

The decisions in the "needs Mattia" column are sequencing choices, not
architectural — they don't require D.x entries, just steering. They're surfaced
in STATE.md "Open questions for Mattia (founder steering)" + the Step 4.5 plan
stub.

**Conclusion: Phase A core systems work (Step 4.5) is unblocked** modulo the
sequencing-choice surfaces in the Step 4.5 plan stub. Architectural foundation
is in place; the open questions are operational.

---

## Open carry-forwards

- **CATH registration** still deferred (Phase 0 baked claims into
  `raw_app_meta_data`; clinician_profiles mirror = the hook is faithfully
  non-breaking when later enabled).
- **Synthetic test data** seeded for Step 4.3 validation stays in the dev
  Supabase project; should not contaminate Step 4.5 work but a periodic clean
  is worth flagging — let's wipe demo data when Step 4.5 begins to keep the
  dev project clean.
- **`docs/Step_4.3_notes.md`** captures the per-step operational deltas that
  belong with the step, not the Phase 0 synthesis. Both files survive.
- **`infra/manifest.md`** carries the production-deploy artifacts (migration
  level, Vercel env vars, Supabase pointers, secret names). Step 4.5 will
  extend it with Inngest / Upstash / Grafana / Sentry pointers as those land.
