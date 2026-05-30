# AIRIS Active Plan

*This plan is the operational counterpart to the AIRIS Master Document V28. It tracks what's being worked on right now, what's blocking next action, and the structured backlog of stages. Active Plan is a living document — it updates as sessions surface real improvements (per V28 Part 0 Working Principle 0.3.6 Plan Evolves With Consciousness).*

*Master Doc V28 is the foundational reference. When this plan and the Master Doc appear to conflict, Master Doc wins; if the plan reflects a real improvement over Master Doc framing, the Master Doc is updated in next atomic commit (per V28 Working Principle 0.3.7 Audit Discipline).*

---

## OPERATING PHILOSOPHY ANCHOR

This plan operates under V28 Part 0 Working Principles:

- **0.3.1 Real UX, Minimal Infrastructure** — user-facing reality uncompromised; backing infrastructure is simplest that delivers uncompromised UX; production-grade self-hosted topology moves to Phase D pre-deployment.
- **0.3.2 SW-First Sequencing** — Working Software (Stage 4) completes before non-SW pack workstreams (Stage 5).
- **0.3.3 Code Stays the Same Across Phases** — what differs between phases is what wraps the code (infrastructure, deployment context), not the code itself.
- **0.3.4 The Pack Is the Phase A Deliverable** — Working Software + six non-SW workstreams assembled in Stage 6.
- **0.3.5 Production Discipline Within Scope, Honest Absence Outside** — single quality bar; better honestly partial than performatively complete.
- **0.3.6 Plan Evolves With Consciousness** — real improvements update the plan; no static obedience.
- **0.3.7 Audit Discipline** — sessions ending with strategic/architectural decisions audit affected docs for coherence.
- **0.3.8 Architecture Through Abstractions, Not Infrastructure Identity** — Section 17 abstractions enable infrastructure swap without code change.

---

## CURRENT STATE

**Active stage:** Stage 4 — SW Build (Phase 0 + Phase A SW completion)

**Active step:** Step 4.4 — Phase 0 → Phase A transition (synthesis pass; Step 4.5 plan stub).

**Step 4.1 status:** ✓ complete (Next.js scaffold + minimal Phase 0 procurement landed across two execution turns, 2026-05-28).

**Step 4.2 status:** ✓ complete (Patient Registry endpoint with auth-gating + tenant scoping by construction + CloudEvents envelope + hash-chained L6 audit ledger per D.17 + Italian-claim Custom Access Token Hook stub per D.18; foundation patterns set for Phase A core systems — see STATE.md "Just done" for the full surface).

**Step 4.3 status:** ✓ complete (2026-05-30). Paradigm prototype (CT scheduling) landed across two execution turns under the **single-session operating model** (V28 D.25): dual-surface sync (Supabase Realtime Broadcast on private channels with RLS authorization on `realtime.messages` — new RLS territory); English intent parsing on Claude API direct with structured outputs + prompt caching (`lib/llm/anthropic.ts`); consciousness substrate L1+L2+L3+L5+L6 + first sketches of the four AIRIS-native contracts (`read / write / subscribe / resolve` in `lib/consciousness/`); appointment_create / appointment_update / appointment_cancel atomic RPCs (mirror the `patient_*` pattern — row mutation + CloudEvents outbox + L6 audit-chain append in one transaction); UI dual-surface with drag-to-move on the grid + auto-retry on patient-disambiguation (the "feels like one event" property held across both directions); voice transport Phase 0 via browser-native SpeechRecognition + speechSynthesis (Deepgram / ElevenLabs land in Phase D follow-up behind the same callback contract); `lang="en"` per D.24. Failure-mode triggers all wired as measurable checks (latency `TimingTrace`, `npm run eval:intents` corpus harness, live-DB realtime policy test, qualitative voice/materialisation reads). Founder validation 2026-05-30: paradigm confirmed; no triggers fired; no Master Doc revision required. Architectural additions this step: **D.25 (single-session integrated operator)** + the four-contracts implementation sketch. See `docs/Step_4.3_plan.md` (execution-turn plan) + `docs/Step_4.3_notes.md` (companion to the Step 4.2 `notes.md`) for what landed, what's deferred, and the operational deltas absorbed during the build.

**Step 4.4 status:** active (opens immediately on Step 4.3 close, 2026-05-30). Synthesis pass: confirm paradigm validation outcome (held); record Phase 0 learnings worth carrying into Phase A (substrate L2 RLS on `realtime.messages` works as the channel-private contract; L3 in-process map sufficient for Phase 0; L5 Claude API direct with structured outputs is the right call-site shape; drag-to-move + auto-retry are both load-bearing for the dual-surface paradigm); decide V28 → V29 atomic-commit timing (working answer: continue accumulating in V28 — V29 lands when Step 4.5 core systems work delivers the engine-agnostic LLM abstraction lift + Inngest + observability + Patient Flow Layer scaffolding, which is a much larger cross-cutting shift worth versioning around); confirm Phase A core systems work (Step 4.5) is unblocked. Output: `docs/Step_4.4_notes.md` + `docs/Step_4.5_plan.md` stub.

**Total Phase 0 cost (revised post-2026-05-28):** ~$20/mo Claude Code Pro + Claude API usage (load-bearing for Phase 0 paradigm prototype + ongoing development; usage-based, no fixed monthly commitment). Voice API spend (English STT + ElevenLabs default English TTS) deferred — Phase 0 used browser-native Web Speech / speechSynthesis (zero external keys); paid voice activates at Step 4.14 Voice Stack Integration.

**Critical commitments carried forward:**
- **Engine-agnostic LLM substrate abstraction** (V28 D.21, Section 17.5) — three deployment modes (client-local self-hosted, online API, AIRIS-hosted non-HQ); built from Step 4.5 onward (Phase A core systems), NOT deferred. Step 4.3 prototype ran on the current concrete backend (Claude API direct per D.22) through `lib/llm/anthropic.ts`; at Step 4.5 the call site moves behind the engine-agnostic abstraction without semantics change.
- **International platform; Italy as first deployment market** (V28 D.24) — platform architecture locale-agnostic by construction; Italian content in the Master Doc is Italy's localization layer at first-market depth. Step 4.3 paradigm prototype built in English (platform default); Italian-localized paradigm validation is a follow-on milestone aligned with Italian-market readiness.
- **Single-session integrated operator** (V28 D.25) — one Claude Code session is the project's complete operator; canonical docs are the entire memory across sessions; flush-before-end is existential; context-agnostic-machine property holds by construction.

---

## STAGE STRUCTURE

### Stage 1 — Engineering Scope Pass (DONE)

10 subsystem analyses + Step 1.10 cross-subsystem synthesis. Outputs absorbed into V27 Part II Section 17.

### Stage 2 — Tech Stack Revisit (DONE)

V26 D.12 strategic commitment confirmed; substantial operational expansion via 21 subsystem-specific commitments. Absorbed into V27 D.12 + D.14-D.19 + Section 17.

### Stage 3 — V26 → V27 Atomic Commit (DONE)

Net +569 lines V26 → V27. D.14-D.19 added; R.11 added; Part II Section 17 Engineering Architecture (24 sub-sections); Open Questions rewritten; 24 new risks; consciousness terminology framing notes; persona reframing; doppio audit reconciliation. V27 produced.

### Stage 4 — SW Build (Phase 0 + Phase A SW completion) [ACTIVE]

**Scope per V28 D.10 + D.11**: All eleven modules at varying depth; Radiology + one cross-module flow second module deep; all three Builders working at production discipline; Regulatory Layer real with at least one Italian artifact; interaction layer + consciousness substrate working on deep parts.

**Operational philosophy per V28 D.20**: Real UX uncompromised on Phase 0 / early Phase A; backing infrastructure minimal (managed Supabase EU + Vercel free tier + Claude API direct per V28 D.22). Production-grade self-hosted topology activates Phase D pre-deployment.

**Critical discipline per V28 D.21**: Three-backend LLM abstraction built from Step 4.5 onward.

#### Phase 0 software thread (Steps 4.1-4.4)

##### Step 4.1 — Day 1: Minimal infrastructure setup + dev environment [ACTIVE]

Procurement: GitHub free + Supabase managed EU free tier + Vercel free tier + Claude Code Pro ($20/mo) + Claude Desktop App for Windows + Claude API direct (per V28 D.22; usage-based; powers the L5 intent parse path in Step 4.3). ElevenLabs subscription deferred — Phase 0 voice transport uses browser-native Web Speech / speechSynthesis (zero external keys); paid voice activates at Step 4.14 Voice Stack Integration.

Dev environment: Code on Windows PC; `npm run dev` runs locally; deploys via git push to Vercel; Supabase MCP + GitHub MCP connectors in Claude Desktop App; CLAUDE.md at repo root pointing to V28 Master Doc + Active Plan + Project Core.

##### Step 4.2 — Patient Registry endpoint build with Claude Code

**Status:** Not started — waiting on Step 4.1 completion.

**Scope:** Build the Patient Registry endpoint with Claude Code. Auth-gated, emits CloudEvents-envelope events + hash-chained L6 audit ledger rows, basic CRUD on Next.js + Supabase EU + TypeScript, tenant scoping by construction, Italian-claim Custom Access Token Hook (stubbed per V28 D.18 + Section 17.13). Endpoint-level design details worked out during the step's execution from V28 architectural commitments.

**Output:** Working Patient Registry endpoint on the committed V28 stack; observations on Claude Code experience captured in repo-level `notes.md`; foundation patterns established for Phase A core systems (Step 4.5).

**Tool:** Claude Code primary per V28 D.12. Cursor evaluation sequential and conditional (triggered when Claude Code experience surfaces specific gaps OR when founder decides comparison meaningful).

##### Step 4.3 — Paradigm prototype build (CT scheduling)

**Status:** ✓ complete (2026-05-30; landed under the single-session operating model per V28 D.25). See CURRENT STATE block above for what landed; see `docs/Step_4.3_plan.md` (execution-turn plan) + `docs/Step_4.3_notes.md` (companion to Step 4.2 `notes.md`) for what's deferred and the operational deltas.

**Scope (post-2026-05-28 strategy reframe, executed under D.25):** Smallest CT-scheduling slice that exercises all four pillars — dual-surface real-time sync per V28 D.8 + §17.4 (Supabase Realtime Broadcast on private channels with RLS authorization on `realtime.messages` — new RLS territory for this project); locale-aware intent parsing in **English** (platform default per V28 D.24); voice surface (Phase 0 zero-key path via browser-native SpeechRecognition + speechSynthesis; Deepgram English / AssemblyAI English / ElevenLabs default English are Phase D follow-up behind the same `onTranscript` callback contract); patient context inference via consciousness substrate (L1 + L2 + L3 + L5 + L6 in Phase 0 scope; L4 embeddings deferred; four AIRIS-native contracts sketched as `read / write / subscribe / resolve` in `lib/consciousness/`). Paradigm-prototype design details worked out from V28 architectural commitments — see `docs/Step_4.3_plan.md`.

**LLM backend:** **Claude API direct** per V28 D.22 (current concrete backend; an instance of deployment Mode 2 under the engine-agnostic abstraction). Step 4.3 called the API directly through `lib/llm/anthropic.ts`; at Step 4.5 the call site moves behind the engine-agnostic abstraction (per V28 D.21) without semantics change. Earlier framings naming Ollama / Bedrock / Mistral were retired in the 2026-05-28 strategy session reframe of D.21 + D.22.

**Voice transport:** Phase 0 used browser-native SpeechRecognition + speechSynthesis (zero external keys; Chrome / Edge English). §17.6 commitments (Pipecat / Silero / Smart Turn v3 / MedWhisper / Deepgram / AssemblyAI / ElevenLabs / Cartesia / Azure) land at Step 4.14 with the full voice stack; the `onTranscript` callback contract is stable across the transport change.

**Language:** **English** (platform default per D.24). Italian-localized paradigm validation is a follow-on milestone aligned with Italian-market readiness (likely Step 4.10 Radiology deep + Italian voice talent Stage 5.2).

**Outcome:** Paradigm validation **held** (founder validation 2026-05-30). No failure-mode trigger fired; no Master Doc revision required. Architectural additions this step: **D.25 (single-session integrated operator)** + the four-contracts implementation sketch + the `realtime.messages` per-tenant RLS policy as the §17.4 L2 contract.

##### Step 4.4 — Phase 0 → Phase A transition

**Status:** Active (opens 2026-05-30 on Step 4.3 close).

**Scope:** Synthesize Phase 0 learnings (paradigm validation outcome — held; Claude Code experience; any V28 → V29 commit-worthy content). Decide V28 → V29 atomic-commit timing (working answer: continue accumulating in V28; V29 lands when Step 4.5 delivers the engine-agnostic LLM abstraction lift + Inngest + observability + Patient Flow Layer scaffolding — a much larger cross-cutting shift worth versioning around). Confirm Phase A core systems work (Step 4.5) is unblocked. Output: `docs/Step_4.4_notes.md` + `docs/Step_4.5_plan.md` stub.

#### Phase A SW execution (Steps 4.5-4.17)

##### Step 4.5 — Core systems build

Production discipline foundation: Italian clinician identity composition (per D.18 + §17.13) + tenant scoping by construction + secrets management (Infisical per §17.15 when activated) + audit ledger emitter library (per D.17) + observability stacks (per §17.16-17.17 when production traffic exists) + backup 3-2-1 (per §17.18 when scale matters) + CI/CD pre-merge gates (per §17.19) + MDR Class IIb change control scaffolding (per §17.20) + **engine-agnostic LLM substrate abstraction lift** (per V28 D.21 + D.22 + Section 17.5 — built starting THIS step, NOT deferred; the `lib/llm/anthropic.ts` call site from Step 4.3 moves behind the abstraction without semantics change; concrete backend remains Claude API direct per D.22 unless the deployment overrides).

Infrastructure activation per scope demand: Cloud Run europe-west8 / Hostinger KVM 4 activated when Python services tier work begins; Inngest activated when first cross-Builder workflow needs durable execution; observability stack activated when production traffic exists. All abstraction-clean swaps later per V28 D.20.

##### Step 4.6 — Patient Flow Layer build

Per V27 Section 17.8: Splink-Postgres MPI + XState v5 PDTAs + longitudinal materialization + I-PASS handoff patterns.

##### Step 4.7 — Cross-module Event System build

Per V27 Section 17.9: CloudEvents v1.0.2 envelope + Inngest durable execution (managed or self-hosted per D.20/D.23 sequencing) + AsyncAPI catalog + EventCatalog naming taxonomy.

##### Step 4.8 — Automation Builder build (one of three Builders)

Per V27 Section 17.11: React Flow canvas + AI nodes per persona reframing (V27 §17.21).

##### Step 4.9 — Agent Builder build (one of three Builders)

Per V27 Section 17.11: LangGraph + Pydantic validation.

##### Step 4.10 — Integration Builder build (one of three Builders) + Radiology deep module

Per V27 Section 17.10 + Section 17 Radiology depth: hl7apy + fhir.resources + DICOM worklist + Radiology deep workflow (CT/MR/X-ray scheduling, request management, report generation, billing handoff).

##### Step 4.11 — Second deep module (Emergency or Cardiology)

Cross-module flow demonstration per V27 D.10. Specific module choice TBD based on Phase 0 learnings.

##### Step 4.12 — Other nine modules at honest depth

Per V27 D.10: present and architecturally real but workflow depth limited to "this is the shape of this module" rather than "this module is complete."

##### Step 4.13 — Regulatory Layer scaffolding (one Italian artifact)

Per V27 D.10 + Section 17.7: CDA R2 generation via Saxon-C HE + Schematron validation via SchXslt + one production-discipline Italian artifact (e.g., FSE 2.0 CDA R2 LDO or RAD).

##### Step 4.14 — Voice stack integration

Per V27 Section 17.6: Pipecat + STT A/B (Deepgram Flux / AssemblyAI U3 Pro IT) + Silero v5 VAD + Smart Turn v3 + ElevenLabs Italian + Cartesia Sonic-3 fallback + Azure Italian backup.

ElevenLabs default Italian voices through Step 4.14; custom-cloned voice character is Stage 5 Pack Workstream 1.

##### Step 4.15 — Phase A SW Build polish + production-discipline validation

Cross-cutting quality validation: all V27 R.1-R.11 risks addressed; tenant scoping by construction verified; audit trail discipline verified; MDR Class IIb change control scaffolding in place.

##### Step 4.16 — Phase A SW Build complete + handoff to Stage 5

Phase A Working Software workstream complete per D.10 + D.11 + D.13 scope. Stage 5 (Non-SW Work) begins.

##### Step 4.17 — V28 → V29 atomic commit (if accumulated content justifies)

V28 → V29 if Stage 4 surfaced substantial Master Doc-worthy content. Plan-evolution discipline (Working Principle 0.3.6): real improvements only.

### Stage 5 — Non-SW Work (Pack Workstreams)

Per V28 D.23 SW-First Sequencing: non-SW pack workstreams complete in Stage 5 after Stage 4 SW completes.

**Substructure per workstream:** strategic alignment conversation (founder + claude) THEN operational execution. No parallel execution that proceeds in confusion.

##### Step 5.1 — Regulatory Roadmap workstream

Italian regulatory pathway (MDR Class IIb + NIS2 + HDS certification consideration + Garante DPIA + AI Act + IEC 62304). What certifications, in what sequence, at what cost. Strategic conversation first.

##### Step 5.2 — Italian Voice Talent workstream (Pack Workstream 1)

Custom voice talent recording + ElevenLabs custom-cloned voice character + voice identity selection. Replaces default ElevenLabs Italian voices used in Phase 0/A SW.

##### Step 5.3 — Business Model articulation workstream

Per V28 Part VII Section 7.1.1: per-project AIRIS tailoring as business model shape. Pricing model + per-project economics + capacity planning + scaling path. Strategic conversation first.

##### Step 5.4 — Vision Document workstream

What AIRIS becomes when fully realized. Multi-year horizon. Strategic positioning. Strategic conversation first.

##### Step 5.5 — Pilot Hospital Story workstream

Concrete first deployment path. Which hospital, what scope, what timeline, what regulatory + operational + economic structure. Strategic conversation first.

##### Step 5.6 — AGFA-Specific Narrative workstream

Why this partnership specifically. What AGFA gets, what AIRIS gets, what makes the fit. Strategic conversation first.

##### Step 5.7 — Stage 5 complete + handoff to Stage 6

All six pack workstreams complete per V28 D.13. Stage 6 (Pack Assembly + Meeting Preparation) begins.

### Stage 6 — Pack Assembly + Meeting Preparation

Integrate Stage 4 SW + Stage 5 non-SW into unified pack. Final pass on AGFA-Specific Narrative. Prepare for AGFA conversation (or other partner conversation that becomes target).

##### Step 6.1 — Pack integration

Assemble Working Software demo + six non-SW workstream artifacts into coherent pack. Cross-reference all components.

##### Step 6.2 — Pack rehearsal + iteration

Run through the pack as if presenting it. Identify gaps, inconsistencies, weak points. Iterate.

##### Step 6.3 — Meeting preparation + scheduling

Confirm meeting time (July 7 or whenever rescheduled). Logistics. Final pre-meeting alignment.

##### Step 6.4 — Meeting

The AGFA conversation happens. Pack delivered.

##### Step 6.5 — Post-meeting work

Whatever Phase B (Sovereign Migration if Schrems-II triggers fire) / Phase C (Clinical Co-Design) / Phase D (Hospital Deployment) work flows from the meeting outcome.

---

## CROSS-CUTTING WORKSTREAM STATUS

| Workstream | Stage | Status |
|---|---|---|
| Working Software (Pack Workstream 0) | Stage 4 | Active (Step 4.1) |
| Italian Voice Talent (Pack Workstream 1) | Stage 5 | Not started |
| Regulatory Roadmap (Pack Workstream 2) | Stage 5 | Not started |
| Business Model (Pack Workstream 3) | Stage 5 | Not started |
| Vision Document (Pack Workstream 4) | Stage 5 | Not started |
| Pilot Hospital Story (Pack Workstream 5) | Stage 5 | Not started |
| AGFA-Specific Narrative (Pack Workstream 6) | Stage 5 | Not started |
| Pack Assembly + Meeting Prep | Stage 6 | Not started |

---

## SESSION LOG

*Chronological record of session-level decisions. Items that have become foundational get promoted to V28 Decision Log (D.x entries) and Part 0 Working Principles. Items that remain operational session context stay here.*

### Session: This session (May 2026) — Real UX Minimal Infrastructure approach + V27 → V28 atomic commit

**Founder direction this session sequence:**

1. **LLM substrate priority flip** (becomes V28 D.22): local self-hosted LLM is active backend through three-backend abstraction; Bedrock EU + Mistral La Plateforme EU configured but not active — selectable per case. Architecture unchanged (three-backend abstraction was already committed since V21); active default flipped from API-primary to local-primary.

2. **Single-tool Claude Code decision** (V27 D.12 preserved, operational sequencing confirmed): Claude Code primary; Cursor evaluation sequential and conditional, not parallel. Antigravity / Codex CLI / OpenCode / Cline only if both Claude Code AND Cursor surface gaps.

3. **Claude Desktop App + minimum MCP setup**: Claude Desktop App on Windows PC as primary Claude Code surface; Supabase MCP + GitHub MCP connectors configured (founder confirmed). Pattern: code on Windows PC, `npm run dev` local, deploys via git push to Vercel.

4. **Hostinger production-topology deep research** (May 2026): comprehensive evaluation of Hostinger's May 2026 product portfolio against AIRIS V27 Section 17 stack. Findings absorbed into V28 Part VII Section 7.3.1. Five concrete V27 → V28 stack changes proposed (app layer to Hostinger KVM 4; LLM to Hetzner GEX44/OVHcloud L40S; Python services to Hostinger; workflow to Inngest OSS self-hosted; object storage Backblaze B2 acceptable with Hetzner Object Storage fallback note). All target Phase D pre-deployment.

5. **Real UX Minimal Infrastructure philosophy** (becomes V28 D.20 + Part 0 Working Principle 0.3.1): user-facing reality uncompromised; backing infrastructure minimal Phase 0 / early Phase A; production-grade self-hosted topology Phase D pre-deployment. Discipline that protects this: V28 Section 17 abstractions enable infrastructure swap without code change.

6. **Three-backend abstraction explicit commitment** (becomes V28 D.21): built from Step 4.5 onward (Phase A core systems), NOT deferred. Protects UX in minimal-infrastructure approach.

7. **SW-first sequencing of pack workstreams** (becomes V28 D.23): Working Software (Stage 4) before non-SW workstreams (Stage 5). Pack Assembly + Meeting Preparation Stage 6. Founder explicitly accepts AGFA-readiness timing tradeoff.

8. **V27 → V28 atomic commit triggered**: founder direction to rewrite Master Doc + Active Plan + Project Core with current consciousness. V28 produced this session. Active Plan rewritten. Project Core rewritten.

9. **Future-concern note captured (Stage 5 work)**: per-project AIRIS tailoring as business model shape + voice agent / per-project AI runtime cost economics. Both belong to Stage 5 Step 5.3 Business Model + Step 5.6 AGFA-Specific Narrative. Captured in V28 Part VII Section 7.1.

### Session: 2026-05-28 strategy — Step 4.3 framing + D.21 / D.22 reframe + D.24 new (international platform)

**Founder direction this session:**

1. **LLM substrate engine-agnostic reframe** (becomes V28 D.21 + D.22 reframe). D.21 framed engine-agnostic: AIRIS calls an LLM through a stable internal interface; three deployment modes (client-local self-hosted, online API, AIRIS-hosted non-HQ); concrete engine chosen per deployment. D.22 reframed: current concrete backend is **Claude API direct** (an instance of Mode 2); earlier "Ollama as active backend" / "Bedrock EU primary" framings retired as platform commitments. The platform commits to the interface and the three modes, not to any specific engine.

2. **International platform reframe** (becomes V28 D.24). AIRIS is an international platform with Italy as first deployment market. Platform architecture is locale-agnostic by construction; Italian content in Section 17 + D.18 + D.19 is Italy's localization layer at first-market depth. Sister abstraction to D.21 (engine-agnostic substrate). Phase 0 paradigm prototype demo language is **English** (platform default); Italian-localized paradigm validation is a follow-on milestone.

3. **Step 4.3 paradigm prototype scope framed.** Four pillars: dual-surface sync (sub-500 ms perceived budget); English intent parsing on Claude API direct (replaces the obsolete "does local Italian work" risk); consciousness substrate L1 + L2 + L3 + L5 + L6 in scope (L4 deferred); engine call on current concrete backend (Claude API). Minimum-viable slice: one CT room day-grid, ~5 intents + disambiguation path + Tier 3 read-back, two-browser configuration for L2 broadcast + RLS proof. Voice transport: Node-native Phase 0, no Pipecat. eGFR check mocked Phase 0. Founder drafts the English intent corpus; Claude reviews + augments. Failure-mode triggers set in the plan before execution.

4. **Step 4.3 execution plan committed** at `docs/Step_4.3_plan.md` (same shape as the Step 4.2 plan that worked). STATE.md links to it; baton flips to execution at strategy-turn close.

5. **Cross-doc updates this commit:** AIRIS Master Doc Part 0.2 + 0.3.1 + 0.4 + Part I Scope + Section 17 reframe note + §17.5 + D.21 + D.22 + new D.24; this Active Plan (CURRENT STATE + Step 4.3 description + this session-log entry); CLAUDE.md (header + Phase 0 stack + Hard invariants); Project_Core.md (AIRIS one-liner); infra/manifest.md (LLM backend section). Italian-specific content in §17.6 / §17.7 / §17.8 / §17.13 / §17.21–§17.23 / D.18 / D.19 preserved verbatim — only the framing changes, per founder direction "localisation-layer reframe, not a genericising-away of the Italian specificity."

---

## REFERENCED DOCUMENTS

The only docs that compose the canonical persistent structure (per V28 Part 0 + Project Core):

- `AIRIS_Master_Document.md` — foundational reference (V28 atomic commit; current)
- `Project_Core.md` — top-level navigation across project tree
- `Viva_Mode_Master_Document.md` — parent branch (Viva mode)
- `VIVA_Master_Document.md` — grandparent branch (VIVA)

Everything else (subsystem analyses, design sketches, working specs, intermediate commit-planning, historical Master Doc versions) is VOLATILE — exists during the work that uses it, not part of the canonical structure. With only these canonical docs loaded, AIRIS work can resume in any environment / chat / AI tool seamlessly.

*Historical archives (V26, V27, Stage 1-3 outputs, V21 module audit, etc.) are not Moving Structure and are not referenced for operational purposes. Substantive content from those archives is absorbed into V28 where load-bearing for ongoing operation.*
