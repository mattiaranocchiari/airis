<!--
AIRIS change-control record (MDR Class IIb, §17.20). The PR is the audit unit
per the V28 D.25 branch model — fill each section so the merged history is
self-describing. Delete the guidance comments before submitting if you like.
-->

## Summary

<!-- One line: what this PR does and why. -->

## Stage / step / sub-deliverable

<!-- e.g. Stage 4 / Step 4.5 / Turn 2 sub-deliverable D (Inngest). Link the step plan if one exists. -->

## What changed

<!-- Code / schema / docs. Note new runtime deps or new env-var contracts. -->

-

## Migration-level delta (§17.20)

<!-- Did supabase/migrations/ change? Paste `npm run check:migrations` output and the new level, or "no schema change". -->

- [ ] No schema change, **or** migration level: `___` (`npm run check:migrations` green)

## Architectural impact (D.x / V28)

<!-- Any D.x touched? New architectural commitment? Per V28 D.25, a NEW commitment must be surfaced to Mattia inline BEFORE merge. -->

- [ ] No new architectural commitment, **or** surfaced to Mattia inline (link/quote the decision) and recorded as `D.x` + decision-log

## Verification

<!-- The green set per CLAUDE.md. Check what actually ran. -->

- [ ] `npm run build`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run test` (note env-gated suites skipped vs. run)
- [ ] `npm run check:migrations`
- [ ] `npm run eval:intents` (or `INTENT_EVAL_MOCK=1` wiring) — if the L5 path is touched

## Self-merge eligibility (V28 D.25 branch model)

- [ ] All CI checks green (no failing/pending blockers)
- [ ] No failure-mode trigger fired
- [ ] No unsurfaced architectural commitment

<!-- If all three hold and this is routine, squash-merge into main and (optionally) delete the source branch. Otherwise surface to Mattia first. -->
