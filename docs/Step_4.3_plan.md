# AIRIS Step 4.3 — Paradigm prototype (CT scheduling): plan

*Strategy-channel plan for the Step 4.3 execution turn. Operational scaffolding (planning artifact for the upcoming execution turn) — not a canonical document. Absorbed back into the Master Doc once Step 4.3 surfaces what should be load-bearing; otherwise this file becomes historical when Step 4.3 closes.*

*Authored: 2026-05-28 strategy turn. Same atomic commit reframes D.21 + D.22 and adds D.24 (international platform; Italy as first deployment market). STATE.md links here.*

---

## What Step 4.3 is for

Per V28 D.9 + Active Plan: **paradigm validation, not Radiology subsystem build**. The output is either confirmation that the V28 stack + minimal-infrastructure approach holds for paradigm validation, or a Master Doc revision if the prototype doesn't converge. Radiology depth lives at Step 4.10; the prototype here is the smallest CT-scheduling slice that exercises all four pillars below.

## The four pillars

**1. Dual-surface sync** (D.8 + §17.4 substrate L2 broadcast + §17.1 React 19 + §17.4 four contracts). The perceived end-to-end budget — voice end-of-utterance → content-surface update + audio confirmation start — has to land **sub-500 ms** to feel like one event. This is the empirical SLO Step 4.3 either confirms or breaks. With Italian-intent risk retired (per pillar 2 below), this becomes the **primary validation target** of the step.

**2. English intent parsing on Claude API direct** (per D.22 + D.24). The prototype runs in English platform default per D.24. Italian intent parsing is a separate downstream milestone aligned with Italian-market readiness (likely Step 4.10 Radiology deep + Italian voice talent Stage 5.2). The earlier risk "does Italian medical intent work on a quantized 7B local model" is retired entirely — replaced by validating the dual-surface sync itself.

**3. Consciousness substrate** (§17.4 — six layers, four contracts). Phase 0 scope: **L1 + L2 + L3 + L5 + L6**; L4 (pgvector + embeddings) deferred.

- L1 already exists (Step 4.2 `patients` + `audit_events`).
- L2 = Supabase Realtime Broadcast on private channels with RLS — real, load-bearing.
- L3 = in-process Node cache acceptable Phase 0 (Upstash Redis at Step 4.5).
- L5 = Claude API direct.
- L6 = audit emitter pattern from Step 4.2 (`lib/db/patients.ts`-style).

Four contracts (`consciousness.read / write / subscribe / resolve`) get their first real sketch here — especially `resolve("the 9 a.m.", context) → appointment_id`, which is the hardest one.

**4. Engine call on current concrete backend** (D.22). Step 4.3 calls **Claude API directly**. At Step 4.5 the call site moves behind the engine-agnostic abstraction (D.21) without semantics change. No three-backend / Ollama / Bedrock framing — those were retired by the 2026-05-28 strategy session reframe.

## Minimum-viable paradigm slice

One scheduler view (single CT room "CT1" day-grid), one conversation channel, ~5 intents + 1 disambiguation path + 1 high-stakes read-back. **Two-browser configuration** logged in as two clinicians sharing the CT1 channel — the second browser proves L2 broadcast + RLS work under live multi-client. If two-browser is non-trivial to wire up against the existing auth-hook + RLS pattern, single-user first and add the second browser later in the same step.

**Intents in scope (English platform default):**

- *Tier 1 view*: "Show me tomorrow's schedule for CT1." (read, no confirm)
- *Tier 2 schedule*: "Book a CT abdomen for Marco Rossi tomorrow at 9." (create appointment; brief confirm; emits CloudEvents envelope + L6 audit append, same atomic-RPC pattern as Step 4.2)
- *Tier 2 + anaphora*: "Move the 9 a.m. to 11." (resolves `the 9 a.m.` → just-created appointment via L3 / L5 working together; modify appointment)
- *Disambiguation → brief materialized surface*: "Book a CT for Rossi tomorrow at 9." → conversation surface materializes "Which Rossi? 1) Marco 2) Anna" → "Marco." Materialized surface appears on the conversation surface and dismisses on resolution.
- *Tier 3 high-stakes*: "Book a CT abdomen **with contrast** for Marco Rossi tomorrow 9." → read-back includes mocked eGFR check ("eGFR last value 32 — confirm contrast?"). eGFR is **mocked Phase 0** (real implementation at Step 4.10 Radiology deep).
- *Direct manipulation reflects back*: drag the 9:00 block to 11:00 → conversation surface confirms "moved to 11" without a question being asked.

This minimum set exercises sync, anaphora resolution, materialization, Tier-3 safety, and content→conversation reflection.

## Architectural commitments

- **Voice transport (Phase 0):** Node-native, no Pipecat. Browser WebRTC mic → English streaming STT WebSocket → Next.js server action → Claude API → ElevenLabs default English TTS WebSocket → browser audio. §17.6 Pipecat commitment lands at Step 4.14 with the full voice stack; the intent contract is stable across the transport change.
- **Voice stack Phase 0 minimum:** one English streaming STT (Deepgram English or AssemblyAI English; founder picks once execution starts based on quick latency check), Silero VAD, ElevenLabs default English TTS, push-to-talk (no wake-word, no Smart Turn v3, no MedWhisper, no STT A/B). MedWhisper / Soniox / AssemblyAI medical / Cartesia / Azure all wait for Step 4.14.
- **Substrate L2:** Supabase Realtime **Broadcast** (not Postgres Changes — §17.4 L2 commitment) on private channel naming `tenant:{tenant_id}:scheduler:ct1`, RLS-authorized via `realtime.messages` policy. Scheduler grid subscribes; on-air clinician 2's browser sees updates from clinician 1.
- **Substrate L3 Phase 0:** in-process Node cache for the current-session context object (`current_patient`, `current_appointment`, `recent_actions`, `conversation_history`). Upstash Redis at Step 4.5.
- **Substrate L5:** Claude API direct call. Structured-outputs (JSON schema) for intent + entity extraction. Prompt-caching enabled per §17.5. SLO budget: TTFT <600 ms; total interpret time <1 s.
- **Substrate L6:** reuse `lib/db/patients.ts`-style emitter pattern from Step 4.2. Each appointment mutation emits a CloudEvents envelope into `event_queue` and appends an audit row to the hash-chained ledger.
- **Tenant scoping:** same construction as Step 4.2 — tenant by RLS on every table; soft-delete filter in application layer (per Step 4.2 PG-RLS soft-delete trap learning); `X-AIRIS-Finalita` header required on every mutation.
- **CT-contrast eGFR check:** mocked Phase 0 (constant or random per patient). Real lab values + reactive Automation Builder node at Step 4.10 Radiology deep build.
- **Optimistic UI primitives:** React 19 `useOptimistic` + `useTransition` + Zustand intent atoms per §17.1. The optimistic update lands on the scheduler grid the moment Claude API returns structured intent; the broadcast confirms the truth a few hundred ms later.
- **`lang="en"` cleanup:** `app/layout.tsx` was set to `lang="it"` during the Next.js scaffold (decision-log.md 2026-05-28); change to `lang="en"` as part of the Step 4.3 execution turn per D.24 platform default.

## Schema additions

New table `appointments` (or `ct_schedule_slots` — name TBD during execution) with the same RLS + soft-delete + tenant-scoping shape as `patients`. Composite indexes on `(tenant_id, room_id, slot_start_at)` for grid reads. Atomic RPC pattern from Step 4.2 (`appointment_create / appointment_update / appointment_cancel`) combining the row mutation, CloudEvents envelope insert into `event_queue`, and audit-chain append in one transaction, mirroring `patient_create / patient_update / patient_delete`.

No FHIR Appointment shape committed Phase 0; the table is AIRIS-native per the smart-and-open principle (§17.0). FHIR Appointment mapping is a Step 4.10 + §17.7 Regulatory Layer concern.

## Failure-mode triggers (set before execution)

Concrete revision triggers — if any fire, Step 4.3 surfaces a Master Doc revision before continuing:

- **End-to-end perceived latency >800 ms** (mic close → grid update visible) sustained across the test corpus → reconsider §17.4 L2 broadcast pattern. Acceptable: 400–800 ms. Target: <500 ms.
- **Intent-parse correctness <90%** on the English corpus → reconsider §17.5 prompt engineering / structured-outputs schema / model selection within Claude API. Acceptable ≥90%; target ≥95%.
- **Materialisation mechanic feels jarring** in founder + listener-panel subjective test → reconsider §8.4 + §8.5 confirmation flow + materialisation timing.
- **L2 broadcast jitter or RLS authorisation fails** in the two-browser case → reconsider §17.4 L2 implementation (Phoenix WebSocket channel naming, RLS policy on `realtime.messages`).
- **Voice quality (ElevenLabs default English) feels demo-inadequate** to founder + listener panel → pull Stage 5.2 voice talent forward, or move to a different default English voice asset.

## Corpus

Founder drafts the **English intent corpus**: ~50–100 utterances across the 5 intent classes + the disambiguation path + the Tier 3 read-back. Hard cases to include:

- Anaphora: "Move the 9 to 11" / "Cancel that" / "Make it with contrast"
- Abbreviations: "Book a CT abd" / "CT chest w/ contrast"
- Latin anatomy + English procedure terms: "CT thorax with contrast IV non-urgent"
- Disambiguation triggers (multiple Rossi-equivalent patients)
- High-stakes utterances with eGFR warning paths

Claude (execution) drafts ~10 examples per intent class as starting input; founder reviews + adds the hard cases founder knows from clinical context.

## Acceptance criteria

Step 4.3 is complete when:

- All six+ intents in the minimum-viable slice work end-to-end in the two-browser configuration (or in single-user first if two-browser is deferred to a later sub-turn of the same step).
- Failure-mode triggers all evaluated — either none fire (paradigm holds), or fires are documented and Master Doc revisions surfaced.
- A short observations document (`notes.md`-equivalent for Step 4.3) captures what landed, what didn't, and what the next milestone (Step 4.4 transition or revision) should pick up.
- `npm run build`, `npm run lint`, `npx tsc --noEmit`, `npm run test` all green on the prototype branch.
- A short demo recording (founder + Claude review) qualitatively demonstrates the "feels like one event" property.

## Open questions for the strategy channel (raise if they bind before / during execution)

- Whether to provision a dedicated Phase 0 Supabase project (or Pro-tier branch) for prototype isolation, vs. reusing the existing `airis` dev project. The G2 trigger from Step 4.2 is still active: "before any real or sensitive data exists in the project." If Step 4.3 adds nothing sensitive (synthetic English patients only), reusing the dev project is fine.
- Whether the disambiguation path needs to handle voice-only resolution ("Marco") vs. requiring a click on the materialised brief surface. Founder lean: voice resolution is the test; click is the fallback path.
- Whether two-browser proves enough or single-user is acceptable Phase 0. Founder lean from the strategy turn: two-browser if cheap, single-user first if not.

## Steers from this strategy session (the four)

1. **LLM backend:** Claude API directly. At Step 4.5 the call site moves behind the engine-agnostic abstraction (D.21). Drop Ollama / VPS / local-viability-probe framing entirely.
2. **Corpus / language:** Fully English. Founder drafts; Claude reviews + augments. Italian intent parsing is a downstream milestone aligned with Italian-market readiness.
3. **Voice transport:** Node-native Phase 0, no Pipecat. §17.6 Pipecat commitment lands at Step 4.14.
4. **Two-browser:** lean two-browser if genuinely cheap to wire up the second session against the same Realtime channel + RLS policy; single-user first if not. Two-browser proves L2 broadcast + RLS authorization in a way single-user can't.

Sub-decisions accepted from the strategy turn: voice scope per §17.6 Phase 0 minimum above; eGFR mocked Phase 0; failure-mode triggers set above before execution begins.

## Cross-references

- **Master Doc V28 atomic commit (this turn):** D.21 reframe (engine-agnostic abstraction; three deployment modes); D.22 reframe (Claude API direct as current concrete backend); D.24 new (international platform; Italy as first deployment market); Part 0.2 Stance, Part 0.3.1 + 0.4, Part I Scope, §17.5, Section 17 reframe note all updated.
- **Active Plan:** Step 4.3 description updated to drop Ollama framing + reframe Italian-intent-parsing to English platform default + Italian-localisation follow-on; session-log entry appended; CURRENT STATE updated to mark Step 4.3 active.
- **STATE.md:** this doc is the linked plan; baton flipped to execution.
- **Step 4.2 patterns reused:** tenant scoping by RLS, soft-delete in application code, atomic RPCs with CloudEvents envelope + audit-chain append, finalità header. All carry forward.
- **`infra/manifest.md`:** LLM backend section updated to "current concrete backend: Claude API direct" (an instance of Mode 2 under the engine-agnostic abstraction).
