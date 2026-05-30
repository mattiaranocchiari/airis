**Active stage / step:** 4 / 4.5 (Core systems build) — Turn 1 code-side lifts complete.
**Operating model:** single Claude Code session per V28 D.25 — the canonical docs are the entire memory; see `/CLAUDE.md`.
**Active branch:** `claude/sweet-euler-E6CxR` → PR pending after this commit.
**Status:** Step 4.5 Turn 1 sub-deliverables **B** (audit ledger emitter library, D.17 + §17.9) + **G partial** (migration-level change-control gate + CHANGELOG generation, §17.19 + §17.20) landed on top of A (LLM substrate lift, merged as PR #6). The Turn 1 pure-code lifts (A + B + G-partial) are now done. Remainder of Step 4.5 is founder-steering-gated (C dashboard op; Turn 2 D+E+F SaaS activation; G-heavy branch protection). Self-merge on greens per V28 D.25 branch model.
**Updated:** 2026-05-30 by Claude Code @ this commit.

---

## Just done

This session, on `claude/sweet-euler-E6CxR` from `main` HEAD `d777b98` (post Step 4.5 Turn 1A merge):

- **Sub-deliverable B — audit ledger emitter library (D.17 + §17.9).** New `lib/audit/emitter.ts`:
  - `emitAuditEvent(db, opts)` — the single Node-side audited path: build the CloudEvents v1.0.2 envelope → dispatch the atomic RPC → DB function writes row + `event_queue` outbox + hash-chained L6 audit row in one transaction.
  - Canonical home for `MutationContext` (`actor` + `finalita` + `tenantId`); `AuditedRpc` type derives the audited mutation RPCs from the Supabase Functions types (read-only `current_tenant_id` + `custom_access_token_hook` excluded by construction); `DomainArgs<R>` = the RPC args minus the audit tail.
  - `lib/db/patients.ts` + `lib/db/appointments.ts` refactored to delegate (public signatures + return shapes unchanged — `createPatient`/`createAppointment` still generate the entity id locally, so the emitter only returns the universal `{ audit_event_id, event_id }`). Duplicated build-event/dispatch/parse blocks removed; chain ordering stays in `airis_internal.audit_events_append`.
- **Sub-deliverable G partial — change-control scaffolding (§17.19 + §17.20).**
  - `scripts/lib/migrations.ts` (pure `checkMigrationSequence`) + `scripts/check-migrations.ts` (CI/dev runner) — verifies `supabase/migrations` is a gap-free, duplicate-free, well-formed sequence (one global 6-digit counter under the `YYYYMMDD` prefix; level == count). `npm run check:migrations`; added as a CI gate.
  - `scripts/gen-changelog.ts` (`npm run changelog`) — regenerates `CHANGELOG.md` from squash-merged PR titles on `main` (`Title (#N)`). `CHANGELOG.md` seeded with the 6 merged PRs. Derived artifact, not hand-edited; not a pre-merge gate by design (a PR's own entry only exists post-merge).
  - `tests/migrations.check.test.ts` — 8 unit cases incl. a regression check against the repo's real 23-migration set.
- **All five greens hold:** `npm run build`, `npm run lint`, `npm run typecheck`, `npm run test` (20 passed / 7 env-gated skipped), `INTENT_EVAL_MOCK=1 npm run eval:intents` (harness wiring verified). `npm run check:migrations` → 23 migrations, level 23.
- **`infra/manifest.md` updated:** audited-mutations bullet (emitter); migration-level enforcement note; change-control bullet (check:migrations + changelog + deferred G-heavy); scripts + CI lines.

## In flight / uncommitted

- This commit closes Step 4.5 Turn 1's code-side lifts. After it lands, PR self-merges per V28 D.25 branch model (greens green; no failure-mode trigger fired; B operationalises D.17 + §17.9, G-partial operationalises §17.19 + §17.20 — all pre-existing V28 commitments, no new architectural call).

## Next concrete step

The Step 4.5 pure-code lifts (A + B + G-partial) are done. Everything remaining is founder-steering-gated — surface to Mattia before opening (see Open questions):

1. **C — Italian clinician identity CATH registration (D.18 + §17.13).** Needs the Supabase dashboard (Auth → Hooks → "Customize Access Token (JWT) Claims") or the Supabase Management API. Code + `clinician_profiles` rows already in place (Phase 0 mirror); the lift is turning the hook on + verifying the JWT claim shape. Remote-guided when Mattia is around.
2. **Turn 2 — D Inngest + E Upstash Redis + F observability (Grafana/Sentry).** Each activates a new SaaS account with ongoing cost; needs explicit Mattia direction before opening. Plan + sequencing in `docs/Step_4.5_plan.md`.
3. **G heavy — branch protection + PR-template enforcement + changelog post-merge auto-commit.** Repo-settings + CI-write-back; needs Mattia's MDR-scaffolding-shape direction.

When Step 4.5 fully closes, write `docs/Step_4.5_notes.md` (mirrors the 4.2/4.3/4.4 notes pattern) + `docs/Step_4.6_plan.md` stub, per the Step 4.5 plan acceptance criteria.

## Open questions for Mattia (founder steering)

Step 4.5 sequencing choices (working answers in `docs/Step_4.5_plan.md`); these gate the remaining sub-deliverables:

- **Inngest activation (D)** — activate Inngest Cloud EU (free tier) now vs. defer to first subsystem needing durable execution.
- **Upstash Redis activation (E)** — activate alongside Inngest (cost shared) vs. continue in-process L3 until cross-process need surfaces.
- **Observability activation (F)** — activate Grafana Cloud EU + Sentry EU now vs. defer to first production-traffic moment.
- **CATH registration (C)** — remote-guided via the Supabase dashboard when Mattia is around, or via the Supabase Management API if preferable.
- **MDR Class IIb scaffolding scope (G heavy)** — minimum branch-protection + PR-template shape Mattia's MDR audit will accept; whether to wire changelog post-merge auto-commit (pairs with branch protection).
- **Infisical activation (H)** — working answer: defer until secret sprawl is real; surface if Mattia wants it now.

Carry-forwards from Step 4.3 still open:

- **Voice stack (Step 4.14).** Browser-native Web Speech held for Phase 0; Deepgram / AssemblyAI / ElevenLabs choice surfaces at Step 4.14 or earlier if Mattia wants paid voice sooner.
- **eGFR threshold + real-lab integration (Step 4.10).** Phase 0 mock used 60 mL/min/1.73m²; real clinical guidance lands at Step 4.10 Radiology deep.
- **Synthetic Step 4.3 demo data in dev Supabase.** Wipe when convenient to keep the dev project clean.
