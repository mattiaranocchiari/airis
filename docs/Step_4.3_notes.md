# AIRIS Step 4.3 — Paradigm prototype (CT scheduling): notes

Captured during the execution turn that landed the Step 4.3 code drop against
`docs/Step_4.3_plan.md`. Operational scratchpad; not a canonical document.
Companion to the Step 4.2 `notes.md` — together they're the "things we learned
while building" trail for Phase 0.

The plan's acceptance criteria split into **automated** (this code drop's CI
suite) and **qualitative** (founder-side validation on the preview deploy).
This file documents both, and notes what each pillar measures.

---

## What landed

### Schema + atomic-RPC layer

- New tables `appointments` (room_id, patient_id, kind, subtype, with_contrast,
  slot_start_at/end_at, status enum, soft-delete) and `egfr_results` (Phase 0
  mock; real lab feed at Step 4.10). Migrations 0018 + 0019.
- RLS for both tables in 0020, mirroring the patients pattern from Step 4.2
  (tenant SELECT/INSERT/UPDATE; no DELETE; `deleted_at IS NULL` only in the
  UPDATE policy `USING` to avoid the soft-delete trap from `notes.md`).
- **Substrate L2 contract — `realtime.messages` per-tenant policy** in 0021.
  Authorises authenticated clinicians on topics matching
  `tenant:{current_tenant_id}:%`. New territory for this project; existing
  Supabase Realtime broadcasts had no RLS policies, so everything was implicit-
  denied before this lands.
- Atomic mutation RPCs `appointment_create`, `appointment_update`,
  `appointment_cancel` in 0022. Same shape as `patient_*` from Step 4.2:
  row mutation + `event_queue` outbox insert + `airis_internal.audit_events_append`
  chain insert in one transaction. Cancel sets both `status='cancelled'` and
  `deleted_at=now()` so the active grid filter hides cancelled rows while the
  audit ledger preserves the lineage.
- Grants in 0023 — Supabase MCP-applied migrations don't inherit default
  grants on this project (per Step 4.2 `notes.md`), so explicit `GRANT
  SELECT/INSERT/UPDATE` + `EXECUTE` for `authenticated` is required.

### Substrate contracts (L1 + L2 + L3 + L5 + L6)

- **L1** — `lib/db/appointments.ts` follows the `lib/db/patients.ts` shape:
  Node-side data access calls Supabase RPCs; the Node side builds the
  CloudEvents v1.0.2 envelope (Zod-validated against `events/registry.ts`),
  the RPC inserts it into `event_queue` and appends to the audit chain.
- **L2** — `lib/realtime/channel.ts` defines `tenant:{tenant_id}:scheduler:{room_id}`
  and the versioned broadcast payload (`scheduler.v1`). Both the scheduler grid
  (client component) and the server actions publish/subscribe to this channel
  using the user's authenticated Supabase client; the RLS policy from
  migration 0021 is the gate.
- **L3** — `lib/consciousness/cache.ts` is the in-process Node `Map` keyed by
  `tenant::channel`. Stores `current_patient`, `current_appointment`,
  `recent_actions`, `conversation_history`. Phase 0 form; Step 4.5 swaps the
  implementation to Upstash Redis without changing the read/write API. Step
  4.5 is also where the cache becomes multi-process safe — Phase 0 single-Node
  acceptable per plan.
- **L5** — `lib/llm/anthropic.ts` is the single Claude API call site. Reads
  `ANTHROPIC_MODEL` / `ANTHROPIC_THINKING` / `ANTHROPIC_EFFORT` from env;
  source default is the most capable model with adaptive thinking + `low`
  effort to keep TTFT inside the SLO budget. Prompt-cached system block per
  the `claude-api` skill. The function's signature (`parseStructured`) is the
  contract that survives the Step 4.5 engine-agnostic abstraction lift —
  swapping engines is a wiring change, not a rewrite.
- **L6** — every appointment_* RPC calls `airis_internal.audit_events_append`,
  reusing the hash-chained ledger built in Step 4.2 migration 0017. The chain
  is per-tenant; appointment + patient events interleave on the same chain in
  the order they're written under the same row lock.

### Four contracts (`consciousness.read / write / subscribe / resolve`)

First sketches in `lib/consciousness/` and `lib/realtime/channel.ts`:

- `read(scope, query)` → `readContext(tenantId, channelId)` returns the L3
  context object. Phase 0 in-process Map; Step 4.5 reaches L1 fallback +
  Upstash Redis L3.
- `write(event)` → server actions update L3 via `recordAction` /
  `recordUtterance`, then route clinical mutations through the appointment_*
  atomic RPCs, then publish on the L2 channel.
- `subscribe(channel, filters)` → browser Supabase client opens a private
  channel matching `schedulerChannelTopic(tenantId, roomId)` and listens for
  the `scheduler.v1` broadcast event.
- `resolve(reference, context)` → `lib/consciousness/resolve.ts` is the
  hardest contract. L3-first ("the 9 a.m." → recent action whose
  `slotStartLocal` matches hour 9); L1 fallback (directed grid query for the
  current day). Phase 0 grammar handles `the 9` / `the 9 a.m.` / `that` /
  `it`; complex anaphora reserved for Step 4.5 when L5 is in the resolve
  loop.

### L5 intent parsing path

- `lib/intents/schema.ts` — Zod discriminated union over the five intent
  classes (view_schedule / book_appointment / move_appointment /
  cancel_appointment / disambiguate_patient) + a JSON-schema export that
  Claude's structured-outputs (`output_config.format`) consumes.
- `lib/intents/parse.ts` — server-side `parseIntent(input, provider)` with an
  injectable `LlmProvider` so tests can mock without a key. System prompt
  pins the contract (English platform default per D.24; CT1 default; do NOT
  resolve `patient_query` here; pass anaphoric `reference` through verbatim;
  prefer higher-tier intents on ambiguity).
- `lib/intents/corpus.json` — Claude-drafted seed (~20 utterances across the
  five classes incl. abbreviations, Latin anatomy + English procedure terms,
  disambiguation triggers, and the Tier-3 contrast read-back path). Founder
  reviews + extends with clinical-context hard cases.

### Disambiguation auto-retry (L3 substrate carries the pending intent)

When a `book_appointment` intent resolves to multiple matching patients,
the server action stashes the booking inputs (room, kind, subtype, slot,
contrast flag, notes, candidates) in the L3 cache as
`pendingDisambiguation`. The next `disambiguate_patient` intent reads that
pending entry, matches the user's selection against the candidate list
(label substring + ordinal fallback like "the second one"), and **resumes
the original booking automatically** — including the Tier-3 eGFR check if
the original intent carried `with_contrast: true`. The clinician never
re-issues the booking utterance. The "feels like one event" property
survives the disambiguation case. L3 is cleared on success; if the
selection is itself ambiguous or matches nothing, the pending stays
parked and the conversation surface re-prompts.

### UI dual-surface

- `app/scheduler/page.tsx` — server-rendered CT1 day-grid + conversation
  panel. Force-dynamic; reads `tenant_id` from the JWT app_metadata.
- `app/scheduler/SchedulerWorkbench.tsx` — client wrapper that lifts the
  conversation entries above both surfaces so a content-surface drag-to-move
  can emit a system message into the conversation panel without asking a
  question. This is the content→conversation direction of the dual-surface
  paradigm.
- `SchedulerGrid` (client) — subscribes to `tenant:{tenant_id}:scheduler:CT1`
  on mount, refetches the grid via the `loadGridForCT1` server action when a
  broadcast arrives. `useTransition` for the optimistic-pending UX.
  **Drag-to-move**: appointment cards are HTML5-draggable; hour rows accept
  drops; optimistic local move + `moveAppointmentByDrag` server action +
  audit-chain RPC + L2 broadcast + system message ("moved to 11:00") in the
  conversation panel — no question asked. On error, the optimistic move
  reverts and the conversation surface explains.
- `Conversation` (client) — push-to-talk + text-input fallback. Shows
  disambiguation candidate lists as **clickable buttons** (each click sends
  the candidate label as the next utterance) and the Tier-3 eGFR contrast
  read-back with a "Confirm with contrast" button.
- `PushToTalk` (client) — browser-native `SpeechRecognition` (Chrome/Edge
  English). Zero external STT keys for the first preview deploy; Deepgram
  English or AssemblyAI English lands behind the same `onTranscript`
  callback in Phase D follow-up (founder picks based on latency check).
- `app/layout.tsx` — `lang="en"` per V28 D.24; description reframed to
  "international hospital information system; Italy as first deployment
  market."

### Failure-mode triggers wired as measurable checks

- **End-to-end perceived latency (mic-close → grid update visible) > 800 ms.**
  Captured by the `TimingTrace` returned from `interpretUtterance` —
  `micCloseTs → broadcastSentTs` delta is rendered in the conversation panel
  (`"booked at 9 (412 ms end-to-end)"`). Founder-machine reading on real
  voice is the trigger evaluation. Target <500 ms.
- **Intent-parse correctness < 90% on the English corpus.** `npm run eval:intents`
  reads `lib/intents/corpus.json`, runs each line through the live Claude
  API, exits non-zero if pass-rate <90%. Skips cleanly when
  `ANTHROPIC_API_KEY` is unset (CI without the secret won't fail); mock mode
  via `INTENT_EVAL_MOCK=1` verifies harness wiring without consuming model
  tokens. CI runs this when the secret is set as a repo secret.
- **L2 broadcast jitter or RLS authorisation fails (two-browser).**
  `tests/realtime.policy.test.ts` (live-DB-gated) opens a private channel as
  a test clinician, publishes a broadcast, and asserts the round-trip
  completes in budget. Cross-tenant denial is asserted at the policy layer
  (the supabase-js channel state machine swallows auth rejections silently;
  the SQL policy is the contract). Two-browser human validation against the
  preview deploy is the founder's qualitative read.
- **Materialisation feel + voice quality.** Qualitative; founder + listener
  panel evaluate against the preview deploy. The pre-defined trigger
  language (per plan) is the bar: "jarring" / "demo-inadequate" → surface a
  Master Doc revision.

### Tests

- New unit tests run unconditionally:
  - `tests/intents.parse.test.ts` — Zod discriminated-union validation +
    happy-path shape coverage for the five intent classes (mock LLM
    provider).
  - `tests/consciousness.resolve.test.ts` — L3-cache hit path for the
    anaphoric reference grammar.
- New live-DB integration tests (env-gated, skip if Supabase secrets absent):
  - `tests/appointments.roundtrip.test.ts` — create / move / cancel +
    chain-link verification + cross-tenant RLS isolation. Same shape as
    `tests/patients.roundtrip.test.ts`.
  - `tests/realtime.policy.test.ts` — Realtime broadcast round-trip + policy
    sanity. See above.
- `tests/setup.ts` now warns-and-marks-skip on missing env rather than
  throwing, so `npm run test` is green in env-less environments and
  exhaustive when env is present.

### CI

- `.github/workflows/ci.yml` runs build + lint + typecheck + test +
  eval:intents on PR. Each env-dependent step is conditional on its repo
  secret: live-DB tests activate when Supabase secrets are present; intent
  eval activates when `ANTHROPIC_API_KEY` is present. Founder sets these as
  GitHub repo secrets to enable.

---

## What is deferred (per plan)

- Deepgram / AssemblyAI streaming STT — Phase D follow-up; current
  PushToTalk uses browser Web Speech API (Chrome/Edge English). Adapter
  contract is stable.
- ElevenLabs default English TTS — Phase D follow-up; current TTS uses
  browser `speechSynthesis`. Voice-quality trigger evaluates against
  ElevenLabs once landed.
- Pipecat voice pipeline — Step 4.14 per §17.6.
- L4 pgvector / semantic memory — Step 4.5+ per plan.
- Upstash Redis L3 — Step 4.5; in-process Node Map Phase 0.
- Real CT-contrast eGFR feed — Step 4.10 Radiology deep; mocked Phase 0 in
  `egfr_results` (no seeding done yet — founder populates synthetic values
  per patient on the preview deploy).
- Engine-agnostic LLM abstraction lift — Step 4.5; current call site direct
  Claude API per D.22, shaped so the lift is wiring only.
- Italian intent corpus + Italian voice talent — downstream milestone
  aligned with Italian-market readiness (likely Step 4.10 Radiology deep +
  Stage 5.2 voice talent).

---

## Operational deltas from the original plan

- **Self-merge gate changed mid-build** at founder's request: instead of
  self-merging after CI greens, the PR stays open until the paradigm is
  validated against the Vercel preview deploy. One merge = "this slice is
  validated end-to-end." The plan's failure-mode-trigger gate is unchanged
  (any trigger fires → Master Doc revision, no merge).
- **CI workflow added** at founder's request — `.github/workflows/ci.yml`
  runs build + lint + typecheck + test + eval:intents on every PR, reading
  Anthropic + Supabase + STT/TTS keys from repo secrets.
- **Browser Web Speech API as Phase 0 voice transport** rather than going
  straight to Deepgram. Rationale: zero external keys to validate the
  paradigm end-to-end on the first preview-deploy pass; Deepgram lands once
  the founder confirms (a) the paradigm holds, and (b) Web Speech latency
  is or isn't acceptable. The `lib/voice/stt.ts` and `lib/voice/tts.ts`
  scaffolds document the upgrade path.
- **Synthetic eGFR not yet seeded.** Mocked table exists; values need to be
  inserted before the Tier-3 contrast read-back path can be demoed. Founder
  seeds during preview-deploy validation (synthetic patients + a few rows
  per).
- **L5 effort defaulted to `low`** to keep total-interpret-time inside the
  <1 s plan budget. Founder can raise via `ANTHROPIC_EFFORT` env var if
  intent quality drops; documented in `infra/manifest.md`.

---

## Things learned while building

- **Supabase `realtime.messages` RLS is the contract.** Before this step,
  there were no policies on that table — Realtime Broadcast was effectively
  off because every subscribe was implicit-denied. Migration 0021 adds the
  per-tenant policy using `realtime.topic()` and `current_tenant_id()` — the
  two functions need to be in scope of the policy (cross-schema reference
  via `public.current_tenant_id()` is fine; Supabase exposes
  `realtime.topic()` natively).
- **`output_config.format` (structured outputs) is the right API surface**
  for the L5 intent parse. The older top-level `output_format` is deprecated
  per `claude-api` skill guidance; `JSONOutputFormat` accepts `schema` only
  (no `name` field at the format level; that's a TS error if you try).
- **Supabase TypeScript types regen still needs the `// PATCH:` re-apply**
  after every migration — the typegen renders `DEFAULT NULL` plpgsql args as
  plain `string` instead of `string | null`. `lib/supabase/types.ts` lists
  every patched arg with a `PATCH:` comment.
- **React 19 lint rules** flag `setState` inside `useEffect` for pure
  feature-detection — use `useSyncExternalStore` with a no-op subscribe for
  browser-API capability checks. Also flag `Date.now()` during render;
  capture timestamps in event handlers and pass through.

---

## Open questions surfaced for the strategy channel during execution

None this turn — the paradigm-validation gate (founder validates against
preview deploy) means the architectural questions surface there, not here.
Once validation runs, if any failure-mode trigger fires, the resulting
revision discussion is what flows back to strategy.
