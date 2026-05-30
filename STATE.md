**Active stage / step:** 4 / 4.5 (Core systems build) — opens next.
**Operating model:** single Claude Code session per V28 D.25 — the canonical docs are the entire memory; see `/CLAUDE.md`.
**Active branch:** `claude/step-4.4-phase-0-close` → PR pending after this commit (squash-merges to `main` per V28 D.25 branch model; no architectural call surfaced in 4.4).
**Status:** Step 4.4 closed in this commit (Phase 0 synthesis + Step 4.5 plan stub landed); Step 4.5 opens immediately on merge.
**Updated:** 2026-05-30 by Claude Code @ this commit.

---

## Just done

This session's work since the Step 4.3 close (`main` HEAD `5ba13a6`):

- **Step 4.4 (Phase 0 → Phase A transition) landed** as two docs on the
  `claude/step-4.4-phase-0-close` branch:
  - `docs/Step_4.4_notes.md` — Phase 0 synthesis (what landed across Steps
    4.1 + 4.2 + 4.3; three operational findings worth carrying forward; the
    Claude Code experience cumulative across Phase 0; the V28 → V29 timing
    call; the Phase A unblocked check).
  - `docs/Step_4.5_plan.md` (stub) — eight sub-deliverables sketched
    (A: engine-agnostic LLM abstraction lift; B: audit emitter library; C:
    CATH register; D: Inngest activation; E: Upstash Redis L3 lift; F:
    observability stacks; G: CI/CD pre-merge gates; H: Infisical or defer)
    + sequencing diagram + working answers on the "needs Mattia" rows +
    failure-mode triggers set before execution + acceptance criteria + open
    questions for Mattia + cross-references to relevant V28 `D.x` entries
    and §17 sections.
- **V28 → V29 timing call**: stay on V28; promote at Step 4.5's cross-cutting
  infrastructure lift. Working answer surfaced for steer-or-silence.
- **Phase A unblocked check**: architectural foundation is in place; the
  five "needs Mattia" rows in the unblocked table (Inngest activation
  timing; observability activation timing; Upstash Redis activation timing;
  MDR Class IIb scaffolding scope; Infisical activation) are sequencing
  choices, not architectural — they get surfaced during Step 4.5 execution.

## In flight / uncommitted

- This commit closes Step 4.4. After this commit lands, a PR opens for the
  branch + self-merges per V28 D.25 branch model (greens green; no
  architectural call surfaced; light operational turn).
- Step 4.5 execution hasn't started — opens immediately on the next branch
  from `main` after this merge.

## Next concrete step (Step 4.5)

1. PR + self-merge the Step 4.4 docs to `main` (this branch).
2. Open a fresh branch from `main` for Step 4.5 execution (e.g.
   `claude/step-4.5-core-systems-lift`).
3. Execute Step 4.5 per `docs/Step_4.5_plan.md`. Probable two-turn shape:
   - **Turn 1** lifts (A + B + C + G): engine-agnostic abstraction; audit
     emitter library; CATH registration; CI/CD pre-merge gates. All
     operationalise pre-existing V28 commitments; no new `D.x` expected.
   - **Turn 2** new infrastructure activation (D + E + F): Inngest Cloud
     EU + Upstash Redis EU + Grafana Cloud EU + Sentry EU. Surface inline
     to Mattia at the start of each activation to confirm sequencing.
4. Each turn closes with its own PR + self-merge if greens hold and no
   architectural call surfaces; surface inline + record `D.x` if either.
5. Step 4.5 closes with `docs/Step_4.5_notes.md` + `docs/Step_4.6_plan.md`
   stub written.

## Open questions for Mattia (founder steering)

Sequencing choices for Step 4.5 — working answers in `docs/Step_4.5_plan.md`;
silence-as-assent applies; steer if different defaults preferred:

- **Inngest activation timing.** Activate at Step 4.5 (working answer) vs.
  defer to first subsystem that needs durable execution.
- **Observability activation timing.** Activate Grafana + Sentry at Step 4.5
  (working answer) vs. defer to first production-traffic moment.
- **Upstash Redis activation timing.** Activate alongside Inngest at Step 4.5
  (working answer; cost is shared) vs. continue with in-process L3 until
  cross-process need surfaces.
- **MDR Class IIb scaffolding scope.** CHANGELOG.md + PR-template
  enforcement starts at Step 4.5 per §17.20 — what's the minimum
  scaffolding shape Mattia's MDR audit will accept?
- **Infisical (sub-deliverable H).** Activate at Step 4.5 vs. defer (working
  answer) until secret sprawl is real.

Carry-forwards from Step 4.3 still open:

- **Voice stack (Step 4.14).** Browser-native Web Speech held for Phase 0;
  Deepgram / AssemblyAI / ElevenLabs choice still surfaces at Step 4.14
  or earlier if Mattia wants paid voice during Step 4.5 / 4.10.
- **eGFR threshold + real-lab integration (Step 4.10).** Phase 0 mock used
  60 mL/min/1.73m²; real clinical guidance lands at Step 4.10 Radiology
  deep.
- **Synthetic Step 4.3 demo data in dev Supabase.** Wipe when Step 4.5
  begins to keep the dev project clean (or whenever Mattia prefers).