**Active stage / step:** 4 / 4.5 (Core systems build) — Turn 1 partial in flight.
**Operating model:** single Claude Code session per V28 D.25 — the canonical docs are the entire memory; see `/CLAUDE.md`.
**Active branch:** `claude/step-4.5-core-systems-lift` → PR pending after this commit.
**Status:** Step 4.5 Turn 1 sub-deliverable A (engine-agnostic LLM substrate abstraction lift per V28 D.21 + §17.5) landed. B + G partial pending for the next turn; C + Turn 2 (D + E + F) deferred for explicit Mattia direction. Self-merge on greens per V28 D.25 branch model.
**Updated:** 2026-05-30 by Claude Code @ this commit.

---

## Just done

This session's work since the Step 4.4 close (`main` HEAD `fa02eff`):

- **Step 4.5 Turn 1 sub-deliverable A landed**: engine-agnostic LLM substrate abstraction lift per V28 D.21 + §17.5.
  - `lib/llm/types.ts` (new) — the contract: `LlmProvider` interface + `ParseStructuredOptions` / `ParseStructuredResult` / `LlmUsage` types + `DeploymentMode` enum (documentary). This is the "stable AIRIS-internal LLM-call interface" §17.5 commits to.
  - `lib/llm/index.ts` (new) — `getLlmProvider()` env-driven lookup (`AIRIS_LLM_BACKEND`, defaults to `anthropic` per D.22); switch raises `unsupported AIRIS_LLM_BACKEND='X'` with a helpful message for unknown backends; re-exports the types so consumers do `import { getLlmProvider, type LlmProvider } from "@/lib/llm"`.
  - `lib/llm/anthropic.ts` (refactored) — the concrete Mode-2 implementation; imports the interface from `@/lib/llm/types`; back-compat re-exports preserve any direct importers during the lift.
  - **Consumer migration**: `app/scheduler/actions.ts` and `scripts/eval-intents.ts` now use `getLlmProvider()`. Concrete provider files no longer referenced from application code — the invariant the abstraction enforces.
  - **Unit test**: `tests/llm.provider.test.ts` covers the four contract surfaces (default backend selection; explicit `AIRIS_LLM_BACKEND=anthropic`; case-insensitive backend name; unknown-backend rejection). All four green.
  - **`infra/manifest.md` updated**: LLM backend section reframed for Phase A — abstraction layer + current concrete backend + future concrete backends + how to add one; new env var `AIRIS_LLM_BACKEND` documented.
- **All four greens hold**: `npm run build`, `npm run lint`, `npm run typecheck`, `npm run test` (12 passed / 7 env-gated skipped). `INTENT_EVAL_MOCK=1 npm run eval:intents` confirms the corpus harness still wires.

## In flight / uncommitted

- This commit closes Turn 1 sub-deliverable A. After this commit lands, PR self-merges per V28 D.25 branch model (greens green; no failure-mode trigger fired; no unsurfaced architectural commitment — D.21 + D.22 + §17.5 are pre-existing V28 commitments this turn operationalises).
- Turn 1 remaining work (B audit emitter library; G partial workflow extensions for CHANGELOG + migration-level check) deferred to the next session — keeps this PR a clean single-concern lift.

## Next concrete step

Two paths, both self-mergeable per V28 D.25:

1. **Continue Turn 1 (next session)**: land B (audit emitter library — pure consolidation of the patient_* / appointment_* CloudEvents + RPC dispatch pattern into `lib/audit/emitter.ts`) + G partial workflow extensions (CHANGELOG.md auto-generation from PR titles per §17.20; migration-level monotonic-increase check). Both operationalise pre-existing V28 commitments (D.17 + §17.9 + §17.19 + §17.20).
2. **Move directly to Turn 2 (needs Mattia direction)**: D Inngest activation + E Upstash Redis activation + F observability stacks. Each activates a new SaaS account with ongoing cost; surface explicitly before opening.

Working answer: do path 1 first (light, low-risk consolidation completes Turn 1 cleanly), then path 2 once Mattia has steered the activation decisions.

## Open questions for Mattia (founder steering)

Sequencing choices for the rest of Step 4.5 — surface explicitly before opening Turn 2:

- **Inngest activation (D)**: activate Inngest Cloud EU (free tier) at Step 4.5 (working answer per `docs/Step_4.5_plan.md`) vs. defer to first subsystem that needs durable execution.
- **Observability activation (F)**: activate Grafana Cloud EU + Sentry EU (free tiers) at Step 4.5 (working answer) vs. defer to first production-traffic moment.
- **Upstash Redis activation (E)**: activate alongside Inngest at Step 4.5 (working answer; cost is shared) vs. continue with in-process L3 until cross-process need surfaces.
- **CATH registration (C)**: needs Supabase dashboard. Remote-guided when Mattia is around, or via Supabase Management API if that's preferable.
- **MDR Class IIb scaffolding scope (G heavy)**: CHANGELOG.md auto-generation + PR-template enforcement starts at Step 4.5 per §17.20 — what's the minimum scaffolding shape Mattia's MDR audit will accept? Partial G (CHANGELOG + migration check) lands in Turn 1 path 1 above; the heavier PR-template + branch protection lands when Mattia surfaces direction.
- **Infisical activation (H)**: working answer is defer until secret sprawl is real; surface if Mattia wants to activate now anyway.

Carry-forwards from Step 4.3 still open:

- **Voice stack (Step 4.14).** Browser-native Web Speech held for Phase 0; Deepgram / AssemblyAI / ElevenLabs choice still surfaces at Step 4.14 or earlier if Mattia wants paid voice during Step 4.5 / 4.10.
- **eGFR threshold + real-lab integration (Step 4.10).** Phase 0 mock used 60 mL/min/1.73m²; real clinical guidance lands at Step 4.10 Radiology deep.
- **Synthetic Step 4.3 demo data in dev Supabase.** Wipe when Step 4.5 begins to keep the dev project clean (or whenever Mattia prefers).
