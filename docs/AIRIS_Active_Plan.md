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

**Active step:** Step 4.1 — Day 1: Minimal infrastructure setup + dev environment + paradigm prototype sketch refinement

**Step 4.1 status:**
- ✓ CT scheduling paradigm prototype scope drafted (V27/V28 absorbed into V28 framing)
- ✓ Patient Registry endpoint scope drafted (V27/V28 absorbed into V28 framing)
- ✓ Supabase MCP + GitHub MCP connectors configured in Claude Desktop App (founder confirmed)
- ⧖ GitHub account + AIRIS private repo creation (founder action)
- ⧖ Supabase managed EU free tier project creation (founder action)
- ⧖ Vercel free tier account + linked to GitHub (founder action)
- ⧖ Claude Code Pro subscription ($20/mo) (founder action)
- ⧖ Claude Desktop App for Windows installed (founder action)
- ⧖ Repository scaffold: Next.js App Router + TypeScript + CLAUDE.md pointing to Master Doc V28 + Active Plan + Project Core (claude + founder collaborative)
- ⧖ Existing Ollama VPS on Hostinger confirmed accessible (founder confirmed)

**What's NOT in Step 4.1 procurement** (per D.20 Real UX Minimal Infrastructure):
- Hetzner GPU server, Hetzner GEX44, Hetzner CX23 — deferred to Phase D pre-deployment per Part VII Section 7.3.1
- Cloud Run europe-west8 — deferred to Phase A core systems if Python services tier work needs hosted environment beyond Ollama VPS
- Inngest Pro Frankfurt EU — deferred to Phase A when first cross-Builder workflow needs durable execution at scale; Phase 0 can use inline event emission or Inngest free tier
- Backblaze B2 EU — deferred to Phase A when cold storage / audit archive backup matters operationally
- Better Stack + Sentry EU + Grafana Cloud EU — deferred to Phase A when production traffic exists
- Infisical self-hosted — deferred to Phase A when secrets management beyond Vercel env vars matters
- Full Hostinger production topology — Phase D pre-deployment per Part VII Section 7.3.1

**Total Phase 0 cost:** ~$20/mo Claude Code Pro + voice API usage when Step 4.3 begins (~$30-80/mo). Setup time: roughly one afternoon.

**Next action to take:** Step 4.1 execution. Founder completes minimal procurement (~1 afternoon). When complete, Step 4.2 (Patient Registry endpoint with Claude Code) becomes active.

**Critical commitment carried forward:** Three-backend LLM abstraction (V28 D.21, Section 17.5) gets built from Step 4.5 onward (Phase A core systems), NOT deferred. Protects UX in minimal-infrastructure approach.

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

**Operational philosophy per V28 D.20**: Real UX uncompromised on Phase 0 / early Phase A; backing infrastructure minimal (managed Supabase EU + Vercel free tier + Ollama VPS + Claude Code). Production-grade self-hosted topology activates Phase D pre-deployment.

**Critical discipline per V28 D.21**: Three-backend LLM abstraction built from Step 4.5 onward.

#### Phase 0 software thread (Steps 4.1-4.4)

##### Step 4.1 — Day 1: Minimal infrastructure setup + dev environment [ACTIVE]

Procurement: GitHub free + Supabase managed EU free tier + Vercel free tier + Claude Code Pro ($20/mo) + Claude Desktop App for Windows + existing Ollama VPS. ElevenLabs subscription added when Step 4.3 begins (~$22/mo + per-character usage).

Dev environment: Code on Windows PC; `npm run dev` runs locally; deploys via git push to Vercel; Supabase MCP + GitHub MCP connectors in Claude Desktop App; CLAUDE.md at repo root pointing to V28 Master Doc + Active Plan + Project Core.

##### Step 4.2 — Patient Registry endpoint build with Claude Code

**Status:** Not started — waiting on Step 4.1 completion.

**Scope:** Build the Patient Registry endpoint with Claude Code. Auth-gated, emits CloudEvents-envelope events + hash-chained L6 audit ledger rows, basic CRUD on Next.js + Supabase EU + TypeScript, tenant scoping by construction, Italian-claim Custom Access Token Hook (stubbed per V28 D.18 + Section 17.13). Endpoint-level design details worked out during the step's execution from V28 architectural commitments.

**Output:** Working Patient Registry endpoint on the committed V28 stack; observations on Claude Code experience captured in repo-level `notes.md`; foundation patterns established for Phase A core systems (Step 4.5).

**Tool:** Claude Code primary per V28 D.12. Cursor evaluation sequential and conditional (triggered when Claude Code experience surfaces specific gaps OR when founder decides comparison meaningful).

##### Step 4.3 — Paradigm prototype build (CT scheduling)

**Status:** Not started — waiting on Step 4.2 completion.

**Scope:** CT scheduling paradigm prototype demonstrating dual-surface real-time sync per V28 D.8 + Section 17.4. Italian intent parsing via local LLM active backend (Ollama VPS); voice surface (ElevenLabs Italian default voices — custom-cloned voice is Stage 5 work); patient context inference via consciousness substrate (six-layer architecture bound by four AIRIS-native contracts per V28 Section 17.4). Paradigm-prototype design details worked out during the step's execution from V28 architectural commitments.

**LLM backend:** Local self-hosted (Ollama on existing Hostinger VPS) per V28 D.22 — active backend through the three-backend abstraction. Bedrock EU + Mistral La Plateforme EU configured but not active.

**Output:** Either confirmation that V28 stack commitment + minimal infrastructure approach holds for paradigm validation, OR Master Doc revision if iteration doesn't converge.

##### Step 4.4 — Phase 0 → Phase A transition

**Status:** Not started.

**Scope:** Synthesize Phase 0 learnings (paradigm validation outcomes, Claude Code experience, any V28 → V29 commit-worthy content). Update Master Doc if needed. Confirm Phase A core systems work is unblocked.

#### Phase A SW execution (Steps 4.5-4.17)

##### Step 4.5 — Core systems build

Production discipline foundation: Italian clinician identity composition (per D.18 + §17.13) + tenant scoping by construction + secrets management (Infisical per §17.15 when activated) + audit ledger emitter library (per D.17) + observability stacks (per §17.16-17.17 when production traffic exists) + backup 3-2-1 (per §17.18 when scale matters) + CI/CD pre-merge gates (per §17.19) + MDR Class IIb change control scaffolding (per §17.20) + **three-backend LLM abstraction with local self-hosted as active backend** (per V28 D.21 + Section 17.5 — built starting THIS step, NOT deferred).

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

---

## REFERENCED DOCUMENTS

The only docs that compose the canonical persistent structure (per V28 Part 0 + Project Core):

- `AIRIS_Master_Document.md` — foundational reference (V28 atomic commit; current)
- `Project_Core.md` — top-level navigation across project tree
- `Viva_Mode_Master_Document.md` — parent branch (Viva mode)
- `VIVA_Master_Document.md` — grandparent branch (VIVA)

Everything else (subsystem analyses, design sketches, working specs, intermediate commit-planning, historical Master Doc versions) is VOLATILE — exists during the work that uses it, not part of the canonical structure. With only these canonical docs loaded, AIRIS work can resume in any environment / chat / AI tool seamlessly.

*Historical archives (V26, V27, Stage 1-3 outputs, V21 module audit, etc.) are not Moving Structure and are not referenced for operational purposes. Substantive content from those archives is absorbed into V28 where load-bearing for ongoing operation.*
