**Active stage / step:** 4 / 4.4 (Phase 0 → Phase A transition synthesis).
**Operating model:** single Claude Code session per V28 D.25 — the canonical docs are the entire memory; see `/CLAUDE.md`.
**Active branch:** *new branch opens immediately after PR #4 squash-merges to `main`* — name TBD; will land Step 4.4 synthesis + `docs/Step_4.5_plan.md` stub.
**Status:** Step 4.3 just closed (paradigm validation held; founder direction 2026-05-30); PR #4 ready for squash-merge.
**Updated:** 2026-05-30 by Claude Code @ this commit.

---

## Just done

This session's work (branch `claude/zen-johnson-B7Pyc` → PR #4 → ready for squash-merge to `main`):

- **Step 4.3 paradigm-prototype code drop landed** against `docs/Step_4.3_plan.md`. Schema additions (migrations 0018–0023) — `appointments` + `egfr_results` tables + RLS + grants; atomic `appointment_create / appointment_update / appointment_cancel` RPCs mirroring `patient_*`; RLS policies on `realtime.messages` for `tenant:{tenant_id}:%` private topics (new RLS territory; substrate L2 contract per §17.4). Substrate sketches — L1 via `lib/db/appointments.ts`; L2 via `lib/realtime/channel.ts` + Supabase Realtime Broadcast on private channels; L3 via in-process Node `Map` in `lib/consciousness/cache.ts` (plus `pendingDisambiguation` field carrying the booking inputs across the disambiguation turn); L5 via `lib/llm/anthropic.ts` Claude API direct call site with structured outputs (`output_config.format`) + prompt caching + env-configurable model/thinking/effort; L6 via reuse of `airis_internal.audit_events_append`. First sketches of the four contracts (`read / write / subscribe / resolve`) in `lib/consciousness/`. Anaphora resolution (`"the 9 a.m." → appointment_id`) implements L3-first / L1-fallback grammar.
- **L5 intent parsing** — Zod discriminated-union over five intent classes + injectable `LlmProvider` for tests + seed corpus (`lib/intents/corpus.json`).
- **UI dual-surface** — `app/scheduler/page.tsx` server-rendered CT1 day-grid + conversation panel; `SchedulerWorkbench` client wrapper lifting conversation entries above both surfaces; **drag-to-move** on the grid (HTML5 drag-and-drop → `moveAppointmentByDrag` server action → same atomic RPC + L2 broadcast path; emits a `"moved to N:00"` system message into the conversation panel without asking a question — the content→conversation direction of the dual-surface paradigm); **disambiguation auto-retry** (the L3 cache stashes the pending booking inputs; the next `disambiguate_patient` intent matches the selection and resumes the original booking automatically, including the Tier-3 eGFR contrast check if `with_contrast` was true); materialised disambiguation brief with **clickable candidate buttons** alongside voice/text.
- **Voice transport Phase 0** — browser-native `SpeechRecognition` (Chrome/Edge English) + `speechSynthesis`. Zero external STT/TTS keys needed for the first preview-deploy pass. Deepgram / AssemblyAI / ElevenLabs land in Phase D follow-up behind the same `onTranscript` callback (scaffolds in `lib/voice/`).
- **UTC consistency** — scheduler grid renders hours in UTC (matching how slots are stored + how server confirmations are phrased); resolves the local-timezone drift that would have confounded the validation readings.
- **`lang="en"`** per V28 D.24 (`app/layout.tsx`).
- **Login page** added (`app/login`) so cloud-only validation via the Vercel preview deploy works without a separate auth flow.
- **Failure-mode triggers wired as measurable checks** — `TimingTrace` captures mic-close → broadcast-sent delta; `npm run eval:intents` corpus harness exits non-zero on <90% pass-rate against the live Claude API (skips cleanly when `ANTHROPIC_API_KEY` is absent); live-DB `tests/realtime.policy.test.ts` exercises the broadcast round-trip in budget; qualitative materialisation + voice-quality triggers documented for founder evaluation.
- **Tests** — new unit suites (`tests/intents.parse.test.ts`, `tests/consciousness.resolve.test.ts`, `tests/consciousness.disambiguation.test.ts`) run unconditionally; new live-DB suites (`tests/appointments.roundtrip.test.ts`, `tests/realtime.policy.test.ts`) skip cleanly when Supabase secrets are absent; `tests/setup.ts` switched from throw-on-missing to warn-and-skip env gating.
- **CI** — `.github/workflows/ci.yml` runs build + lint + typecheck + test + eval:intents on PR, with secrets-driven activation of live-DB tests and the intent eval.
- **Step 4.3 validation setup** ran programmatically via Supabase MCP — two demo clinicians (`clinician-a@airis.demo`, `clinician-b@airis.demo`) created with the full Italian-claim set baked into `raw_app_meta_data` (faithful: matching `clinician_profiles` rows mirror the same values, so enabling the CATH later is non-breaking); 4 synthetic patients (two Rossi to exercise disambiguation; Bianchi + Verdi for multi-class corpus); 4 mocked eGFR rows (Marco Rossi=32 → triggers Tier-3 contrast read-back; others 78); 2 pre-existing CT1 appointments so "view today" returns rows.
- **V28 D.25 added (single-session integrated operator).** Founder direction in-session 2026-05-30 ("from now on we will work ONLY HERE so you are in charge of the whole project") retired the two-channel strategy/execution baton model. `CLAUDE.md` reframed ("Channels and baton" → "Operating model"; Rituals rewritten for session-start = reading, mid-session = architectural-call discipline, session-end flush as existential; Branch model reframed; Hard invariants adds D.25 entry; "verbatim relay" → "verbatim grounding" self-applied within the session; Compact instructions updated). `STATE.md` reframed (BATON header → Active-stage/step + Operating-model + Active-branch + Status). `AIRIS_Master_Document.md` got D.25 in the `D.x` log (full strengthened format). `decision-log.md` entry format updated (D.25-and-after drops the "Channel" field; pre-D.25 entries preserve it). `Project_Core.md` already aligned. `AIRIS_Active_Plan.md` historical session-log entries left verbatim (audit trail of the V28-baseline strategy session that happened under the prior model).
- **Founder validation 2026-05-30: paradigm confirmed; no failure-mode trigger fired; no Master Doc revision required.** Step 4.3 closed.
- **Active Plan CURRENT STATE + Step 4.3 + Step 4.4 + Step 4.5 description updates** in this commit. Drift cleanup: retired stale "Ollama VPS" / "three-backend with local self-hosted as active backend" framings in the operational-philosophy + Step 4.1 procurement + Step 4.5 description blocks (the V28 D.21/D.22 reframe 2026-05-28 superseded them but the Active Plan hadn't been swept).

## In flight / uncommitted

- This commit closes Step 4.3 + opens Step 4.4 in the docs. After this commit lands, PR #4 self-merges (greens green; no trigger fired; D.25 was surfaced inline + founder-confirmed in the same session, so no unsurfaced architectural commitment).
- Step 4.4 execution work hasn't started — opens immediately on PR #4 merge.

## Next concrete step (Step 4.4)

1. Squash-merge PR #4 to `main` (closes Step 4.3 atomically with the docs that mark Phase 0 complete-ish — synthesis pass remains).
2. Open a fresh branch from `main` for Step 4.4 execution (e.g. `claude/step-4.4-phase-0-close`).
3. Land on that branch:
   - `docs/Step_4.4_notes.md` — Phase 0 synthesis (paradigm validation outcome + what landed across Step 4.1 → 4.3 + Claude Code experience + V28→V29 timing decision).
   - `docs/Step_4.5_plan.md` stub — Core systems build scope; engine-agnostic LLM abstraction lift; Inngest cross-Builder durable execution; observability seeds; identity composition production form; etc. Per Active Plan Step 4.5 description.
   - STATE.md refresh to reflect Step 4.4 active + Step 4.5 plan stub written + the new branch.
4. PR + self-merge if 4.4 is purely operational (likely yes — synthesis + planning, no new architectural decisions). Surface inline to Mattia if synthesis surfaces any architectural call (e.g. promoting V28→V29 now, or revising a `D.x`).

## Open questions for Mattia (founder steering)

- **V28 → V29 timing.** Working answer: stay on V28; promote at the Step 4.5 cross-cutting infrastructure lift. Surface if you'd rather promote now to take stock of the Phase 0 close as its own milestone.
- **Step 4.4 scope ceiling.** Working answer: light synthesis + Step 4.5 plan stub; close fast. Surface if you'd rather treat 4.4 as the moment to revisit Stage 4 sequencing as a whole (e.g. reorder Steps 4.10 + 4.11 + 4.14 against what Step 4.3 surfaced; revisit Phase A scope per current learnings).
- **Deepgram vs AssemblyAI choice + ElevenLabs voice asset.** Phase 0 browser-native Web Speech held for paradigm validation. The Step 4.14 (Voice Stack Integration) decision still needs founder direction — surface when Step 4.14 approaches, or earlier if you want to land paid voice during Step 4.5 / 4.10 instead.
- **eGFR threshold + real-lab integration.** Step 4.10 Radiology deep is the planned home; surface if a different threshold should be the Phase 0 mock or if the integration should pull forward.
- **CATH registration carry-forward.** Bake-into-`raw_app_meta_data` is the current path; native CATH registration can land at the Italian-localisation milestone or earlier. Surface if production-flow auth needs claim projection from `clinician_profiles` at sign-in before that.