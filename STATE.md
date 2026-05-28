**BATON:** execution (held; awaiting founder preview-deploy validation)
**Stage / Step:** 4 / 4.3
**Updated:** 2026-05-28 by execution (Claude Code) @ this commit

---

## Just done

Execution turn (branch `claude/zen-johnson-B7Pyc` → draft PR — open until founder preview-deploy validation passes per founder steer received mid-build):

- **Step 4.3 paradigm-prototype code drop** landed against `docs/Step_4.3_plan.md`. Four pillars (dual-surface sync, English intent parsing on Claude API direct, substrate L1+L2+L3+L5+L6, engine call on current concrete backend) all wired end-to-end.
- **Schema additions (migrations 0018–0023):** `appointments` + `egfr_results` (mock) tables + RLS + grants; atomic `appointment_create / appointment_update / appointment_cancel` RPCs mirroring `patient_*` (row mutation + CloudEvents outbox + L6 audit-chain append in one transaction); RLS policies on `realtime.messages` for `tenant:{tenant_id}:%` private topics (new RLS territory; substrate L2 contract per §17.4).
- **Substrate sketches** (Phase 0 forms; Step 4.5 lifts behind the engine-agnostic abstraction without rewrite): L1 via `lib/db/appointments.ts`; L2 via `lib/realtime/channel.ts` + Supabase Realtime Broadcast on private channels; L3 via in-process Node `Map` in `lib/consciousness/cache.ts`; L5 via `lib/llm/anthropic.ts` Claude API direct call site (structured outputs + prompt caching + env-configurable model / thinking / effort); L6 via reuse of `airis_internal.audit_events_append`. First sketches of the four contracts (`read / write / subscribe / resolve`) live in `lib/consciousness/`; anaphora resolution (`"the 9 a.m." → appointment_id`) implements L3-first / L1-fallback grammar.
- **L5 intent parsing** — Zod discriminated-union over five intent classes + injectable `LlmProvider` for tests + seed corpus (`lib/intents/corpus.json`, ~20 utterances incl. abbreviations, Latin anatomy, disambiguation triggers, Tier-3 eGFR contrast read-back paths).
- **UI dual-surface** — `app/scheduler/page.tsx` server-rendered CT1 day-grid + conversation panel; React 19 `useTransition` for optimistic UX; client-side subscribe to `tenant:{tenant_id}:scheduler:CT1`; materialised disambiguation brief; Tier-3 eGFR contrast read-back with explicit confirm step.
- **Voice transport Phase 0** — browser-native `SpeechRecognition` (Chrome/Edge English) + `speechSynthesis`; zero external STT/TTS keys needed for the first preview-deploy pass. Deepgram English / AssemblyAI English / ElevenLabs default English documented as Phase D follow-up landing behind the same `onTranscript` callback (scaffolds in `lib/voice/stt.ts` + `lib/voice/tts.ts`).
- **`lang="en"`** per V28 D.24 (`app/layout.tsx`); description reframed to "international hospital information system; Italy as first deployment market."
- **Failure-mode triggers wired as measurable checks:** `TimingTrace` returned from `interpretUtterance` captures mic-close → broadcast-sent delta; `npm run eval:intents` corpus harness exits non-zero on <90% pass-rate against live Claude API (skips cleanly when `ANTHROPIC_API_KEY` is absent); live-DB `tests/realtime.policy.test.ts` exercises the broadcast round-trip in budget; qualitative materialisation + voice-quality triggers documented for founder evaluation.
- **Tests:** new unit suites (`tests/intents.parse.test.ts`, `tests/consciousness.resolve.test.ts`) run unconditionally; new live-DB suites (`tests/appointments.roundtrip.test.ts`, `tests/realtime.policy.test.ts`) skip cleanly when Supabase secrets are absent; `tests/setup.ts` switched from throw-on-missing to warn-and-skip env gating. `npm run build`, `npm run lint`, `npm run typecheck`, `npm run test` all clean.
- **CI:** `.github/workflows/ci.yml` runs build + lint + typecheck + test + eval:intents on PR, with secrets-driven activation of live-DB tests and the intent eval (founder sets the secrets as GitHub repo secrets to enable).
- **Docs:** `infra/manifest.md` updated (migration level 23; new tables + functions + realtime policy + Anthropic / STT / TTS secret names + CI workflow note); `docs/Step_4.3_notes.md` written (companion to Step 4.2 `notes.md`); `docs/decision-log.md` entry appended.

## In flight / uncommitted

- Draft PR is open against `main` from `claude/zen-johnson-B7Pyc`. **Do not self-merge per founder steer received mid-build** — the PR stays open until founder validates the paradigm against the Vercel preview deploy (run the intent corpus, measure end-to-end latency, test voice + two-browser RLS, evaluate the qualitative materialisation/voice triggers). One merge = "this slice is validated end-to-end."
- Synthetic eGFR values not yet seeded into `egfr_results` — founder seeds during preview-deploy validation to demo the Tier-3 contrast read-back path.

## Next concrete step (founder validation)

Founder validation against the Vercel preview deploy of this PR:

1. Set GitHub repo secrets — `ANTHROPIC_API_KEY` (+ optional `ANTHROPIC_BASE_URL` / `ANTHROPIC_MODEL` / `ANTHROPIC_THINKING` / `ANTHROPIC_EFFORT`); Supabase URL / publishable key / service-role key. CI will then exercise the env-gated suites and the corpus harness automatically.
2. Set Vercel env vars for the preview deploy.
3. Seed synthetic eGFR values for at least one patient (the Tier-3 demo path).
4. Open the preview URL in two browsers, log in as two clinicians in the same tenant. Walk the corpus through the conversation surface — both browsers should see the grid sync via L2 broadcast.
5. Measure end-to-end perceived latency on the timing trace surfaced in the conversation panel. Trigger fires at >800 ms; target <500 ms.
6. Listen to the spoken read-back; evaluate materialisation feel.
7. If any failure-mode trigger fires (latency >800 ms sustained, intent-parse <90% on the live corpus, L2 jitter / RLS failure, voice quality demo-inadequate, materialisation jarring): surface a Master Doc revision via the strategy channel instead of merging.
8. Otherwise: merge the PR — that closes Step 4.3.

## Open questions for the other channel (strategy)

- **Deepgram vs AssemblyAI choice and ElevenLabs voice asset** — surface to strategy if browser Web Speech Phase 0 turns out adequate for paradigm validation (delay the upgrade) vs inadequate (pull forward to validate the SLO).
- **eGFR threshold** — Phase 0 mock uses 60 mL/min/1.73m² as the trigger; real clinical guidance lands at Step 4.10 Radiology deep. If founder validation surfaces a different default during the preview-deploy walk, that becomes a Master Doc revision discussion.
- **CATH registration carry-forward** — Step 4.2's Custom Access Token Hook is still defined but not registered. Step 4.3 didn't surface a need (synthetic English patients don't need Italian claims projected). Register when the localised Italian milestone arrives, or earlier if the preview-deploy walk requires.
