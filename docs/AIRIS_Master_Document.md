# AIRIS — Master Document

**Version:** V28 &nbsp;|&nbsp; **Date:** May 2026 &nbsp;|&nbsp; **Filename:** `AIRIS_Master_Document.md` (stable — version tracked here in-header + in git history, not in filename)

**Atomic commit V27 → V28** absorbs the structural reframe per founder direction this session (May 2026): Operating Philosophy elevated to foundational structure (new Part 0); Future Concerns + Deferred Work consolidated to structural backlog (new Part VII); Stance relocated from Part I to Part 0 (foundational placement); **Boundless Independent Structure (Working Principle 0.3.9) committed** — REAL DOCS list defined, volatile artifacts identified; Section 17 Engineering Architecture reframed for Real UX minimal infrastructure approach + Hostinger production-topology deep research findings; Part III Decision Log extended with new architectural decisions from recent sessions (D.20-D.23); Part IV Production Plan reframed for SW-first sequencing + Real UX minimal infrastructure operational philosophy. V27 substantive content preserved per "valid content stays right" discipline — eleven module specifications (~11,400 lines), Foundational Principles, Module Independence, architectural commitments D.1-D.19, risks R.1-R.11 all preserved. Reframing is surgical: where current philosophy adds structural context, notes added; substantive valid content unchanged. **V28 is self-contained**: substantive content from intermediate analyses (Stage 1, Stage 2, V27 Commit Plan) and historical Master Doc versions (V26, V27) absorbed where load-bearing; source artifacts are volatile per 0.3.9.

---

## TABLE OF CONTENTS

- **PART 0 — OPERATING PHILOSOPHY** *(new in V28)*
- **PART I — FRAME** *(Stance relocated to Part 0; rest preserved)*
- **PART II — SYSTEM SPECIFICATION** *(preserved; Section 17 reframe note added)*
- **PART III — DECISIONS AND REASONING** *(D.1-D.19 preserved; D.20-D.23 added; Decision Log strengthened)*
- **PART IV — PRODUCTION PLAN** *(reframed for SW-first + Real UX minimal infrastructure)*
- **PART V — LIVE EDGES** *(audited)*
- **PART VI — ORIENTATION** *(refreshed with Part 0 + Part VII references)*
- **PART VII — FUTURE CONCERNS + DEFERRED WORK** *(new in V28)*

# PART 0 — OPERATING PHILOSOPHY

*This Part is foundational. Every commitment elsewhere in this Master Doc is downstream of the principles here. When section bodies make commitments (e.g., "Phase 0 uses Supabase managed EU free tier"), they reference principles in this Part. When the Master Doc evolves, Part 0 evolves first; everything else follows.*

## 0.1 The Founder's Position

AIRIS is built by a solo founder (Mattia) with AI partnership (Claude). The founder holds strategic + product + clinical positioning + business decisions; Claude holds architectural reasoning, technical decisions, and execution support. Decisions made in conversation between founder and Claude are committed to this Master Document when they reach the threshold of being substantively load-bearing. Decisions that aren't yet load-bearing live in session logs of the Active Plan until they're ready.

The founder is not a software engineer by training but holds the vision and makes the strategic calls. Claude must engage with founder questions seriously, challenge biases (including its own), and surface honest tradeoffs rather than provide comfortable answers. Founder explicitly authorizes Claude to push back, restructure plans, and adapt approach when reasoning surfaces real improvement.

## 0.2 The Stance

*(Relocated from V27 Part I — same content, foundational placement)*

AIRIS is positioned not as a product but as a new paradigm for hospital information systems. The paradigm is the dual-surface unified-event approach: every clinician interaction creates both a conversation surface event (voice/text in dialogue with the AI) and a content surface event (visual representation in the structured UI), synchronized to feel like one event. This is not "a chatbot bolted onto a HIS"; it is "a HIS where every interaction has voice and visual together as the medium."

The Stance shapes what AIRIS is and isn't:

- AIRIS is **not** a chatbot. It is not a voice assistant. It is not a conversational layer wrapping a traditional HIS.
- AIRIS **is** a hospital information system whose primary interaction model is the dual-surface paradigm. The traditional HIS functions (orders, scheduling, results, charting, integration with existing hospital systems) all exist; they are mediated through the paradigm.
- AIRIS is an **international platform with Italy as the first deployment market**. The platform architecture (the dual-surface paradigm, the consciousness substrate, the eleven-module structure, the engineering architecture in Part II Section 17) is language- and locale-agnostic by construction; market-specific content lives in a localization layer produced per market. Italy is the first deployment market: Italian medical terminology, Italian regulatory context (FSE 2.0, codice fiscale, FNOMCeO, NIS2 / HDS), Italian clinical workflows, and Italian voice quality are produced at first-market depth — not bolted on, but living in Italy's localization layer rather than as platform-wide commitments. Subsequent markets carry their own localization layer; the platform underneath is the same. See Decision Log D.24.
- AIRIS is **module-independent** (per Section 0.6 working principle below) — each clinical module (Radiology, Cardiology, Emergency, etc.) is internally coherent and can be deployed/used independently while sharing the substrate.

## 0.3 Working Principles

These principles drive how AIRIS is designed, built, deployed, and evolved. Commitments in Part II Section 17 Engineering Architecture, Part III Decisions, and Part IV Production Plan all reference these principles.

### 0.3.1 Real UX, Minimal Infrastructure

User-facing reality is uncompromised. The dual-surface paradigm, locale-aware intent parsing (English platform default; per-market localization per D.24), consciousness substrate behavior, voice quality, patient flows, scheduling, ordering, regulatory artifact generation — all real, production-discipline code per Working Principle 0.3.3 below.

Backing infrastructure is the simplest that delivers uncompromised UX. Managed SaaS free tiers (Supabase managed EU, Vercel free tier) are acceptable Phase 0 / early Phase A; self-hosted production topology moves to Phase D pre-deployment work where it actually matters (hospital sovereignty, NIS2, HDS certification, GPU at scale).

What protects this principle from UX compromise: the architectural abstractions committed in Section 17 (Supabase SDK identical managed vs OSS; three-backend LLM abstraction; CloudEvents envelope; AIRIS-native contracts read/write/subscribe/resolve). These ensure infrastructure migration is config-swap not rewrite. Managed-now → self-hosted-later happens without code change.

**Critical discipline**: The engine-agnostic LLM substrate abstraction (Section 17.5; three deployment modes — client-local self-hosted, online APIs, AIRIS-hosted non-HQ — per D.21) gets built from Phase A core systems onward, not deferred to Phase D. Without this discipline, the current concrete backend choice (Claude API in Phase 0; see D.22) becomes a load-bearing commitment rather than a per-deployment selection. With it, the active engine is a deployment-time decision; the application code is identical across modes.

### 0.3.2 SW-First Sequencing

Pack (the Phase A deliverable per Working Principle 0.3.4 below) consists of seven workstreams: Working Software + six non-SW workstreams (Regulatory Roadmap, Italian Voice Talent, Business Model, Vision Document, Pilot Hospital Story, AGFA-Specific Narrative). Active Plan sequences Working Software (Stage 4) before Non-SW Work (Stage 5); Pack Assembly + Meeting Preparation is Stage 6.

Why this sequencing: solo + AI work executes cleanest with focused tracks. SW work has clear next steps and minimal external dependencies. Strategic conversations on non-SW workstreams require founder thinking that hasn't been surfaced yet; running them in parallel to SW execution would either starve them of attention OR muddle SW work with strategic confusion. The honest tradeoff: AGFA-readiness timing extends if SW takes substantial time; this tradeoff is explicitly accepted.

This supersedes earlier V27 framing about pack workstreams initiating during Phase 0 / "alongside software work." V27 strategic frame holds (Decision Log D.13 pack-as-Phase-A-deliverable); operational sequencing follows this principle.

### 0.3.3 Code Stays the Same Across Phases (formerly V27 R.10)

What differs between Phase 0, Phase A, Phase B, Phase D is what *wraps* the code — infrastructure, deployment context, regulatory wrapper, hospital integration depth — not the code itself. Production discipline within scope per Working Principle 0.3.5 below means code written Phase 0 may survive into Phase A core systems; code written Phase A may survive into Phase D production deployment. No throwaway.

This principle is what makes Working Principle 0.3.1 (Real UX, Minimal Infrastructure) coherent. If the code patterns are right (CloudEvents envelope, hash-chained audit ledger, tenant scoping by construction, Italian-claim Custom Access Token Hook, three-backend LLM abstraction, etc.), the infrastructure underneath can be minimal Phase 0 and production-grade Phase D without rewriting the code.

### 0.3.4 The Pack Is the Phase A Deliverable

What AGFA / other partner conversations evaluate is not "AIRIS software demo" but the seven-workstream pack: Working Software demonstrating the paradigm + Regulatory Roadmap (Italian/EU regulatory pathway) + Italian Voice Talent (custom voice character demonstrating Italian clinical authenticity) + Business Model (per-project tailoring shape + economics) + Vision Document + Pilot Hospital Story (concrete first deployment path) + AGFA-Specific Narrative (why this partnership specifically).

Working Software alone is insufficient; the pack as a whole is the deliverable. SW-first sequencing (Working Principle 0.3.2) means SW completes first, then non-SW workstreams complete, then pack assembles.

### 0.3.5 Production Discipline Within Scope, Honest Absence Outside

Single quality bar across what's in scope: production-grade code, proper patterns, real architectural commitments. No "demo-level" or "prototype-level" compromise within what's being built.

What's out of scope (per V27 D.10 module depth — Radiology + one cross-module flow second module deep in Phase A; other 9 modules at varying depth Phase A/B/D) is honestly absent, not faked. Better to be honestly partial than performatively complete.

### 0.3.6 Plan Evolves With Consciousness

The Active Plan is a living document, not a contract to obey. As founder and Claude work together, consciousness improves — about what AIRIS needs, about what infrastructure fits, about what sequencing serves. When consciousness improves, plan updates. When plan updates, related docs (this Master Doc, Project Core, specs) audit for coherence.

Plan-evolution discipline: real improvement justifies updates, not manufactured ones. When in doubt about whether something is a real improvement, surface it explicitly rather than silently adjusting.

### 0.3.7 Audit Discipline — Line 1 to Last for Every Change

Documents must be coherent end-to-end, not just locally consistent. When a session decision affects load-bearing content, the affected docs are audited from line 1 to last line for coherence — not just the section that changed.

Drift accumulates silently if audit isn't disciplined. V27 development accumulated drift across versions because session decisions sometimes superseded prior framing without that framing being updated. V28 commits to: every session that touches strategic/architectural decisions ends with audit pass on affected docs.

Audit pass format: What did we decide? Where does it land in the docs? What gets superseded? What goes in Decision Log? What goes in Future Concerns (Part VII)? What changes immediately vs accumulates for next atomic commit?

### 0.3.8 Architecture Through Abstractions, Not Infrastructure Identity

Production-fidelity does NOT mean "Phase A infrastructure = Phase D infrastructure." It means "code uses abstractions that allow infrastructure to swap underneath without rewrite."

The abstractions in Section 17 (three-backend LLM, Supabase SDK across managed/OSS, CloudEvents envelope across event systems, AIRIS-native contracts) carry this discipline. Code written against these abstractions doesn't care whether the underlying infrastructure is managed Supabase EU free tier or self-hosted Supabase OSS on Hostinger VPS. It doesn't care whether LLM serving is Ollama local or vLLM on Hetzner GPU. Same code; config layer routes.

This principle is what makes managed-now → self-hosted-later actually work. Without abstractions, "production fidelity" forces infrastructure provisioning before development. With abstractions, infrastructure provisioning is config decoupled from code.

### 0.3.9 Boundless Independent Structure

The AIRIS work structure must be operable in any environment, any AI tool, any new chat session, starting from zero context — by loading only the persistent foundational docs (the "REAL DOCS"). All other context is volatile and not load-bearing.

**REAL DOCS** (persistent, foundational, load-bearing — the structure):
- VIVA Master Document (VIVA branch — values, philosophy, vision)
- Viva Mode Master Document (Viva mode branch — solution / pattern for creating solutions)
- AIRIS Master Document (AIRIS branch; current version V28)
- AIRIS Active Plan (operational counterpart to current Master Doc)
- Project Core (top-level navigation across project tree)

**VOLATILE** (chat-only, intermediate, not load-bearing):
- Conversation history within any specific session
- Temporary files, scratchpads, planning notes, design sketches, working specs generated during sessions
- Intermediate analyses whose content has been absorbed into REAL DOCS via atomic commit
- Historical Master Doc versions whose substantive content has been absorbed into the current version
- Any document or file paths specific to a particular chat session's environment

**The discipline that protects this principle:**

- When working sessions produce content that's load-bearing, that content gets absorbed into REAL DOCS via atomic commit. Once absorbed, the original session artifact is volatile.
- Every atomic commit (V27 → V28, V28 → V29, etc.) includes verification that the REAL DOCS remain self-sufficient — that a fresh AI session in a new tool with only the REAL DOCS loaded can fully operate AIRIS work.
- The REAL DOCS reference each other for cross-context but do NOT reference volatile artifacts as if they were load-bearing. If a REAL DOC needs to cite content originally from a volatile artifact, that content gets absorbed into the REAL DOC, not referenced externally.
- Periodic self-sufficiency audit: can a fresh AI tool, loading only the REAL DOCS, answer any question about current AIRIS state, ongoing work, architectural commitments, future plans? If yes, structure is self-sufficient. If no, identify what's missing and absorb into REAL DOCS or accept that information is lost.

**Why this principle matters:**

The founder works across environments — different AI tools, different chats, different machines, different time periods. Without boundless-independence, AIRIS work depends on continuity of a specific chat session or a specific AI tool's memory. That continuity will break. When it breaks, work is lost.

With boundless-independence, the REAL DOCS travel with the founder. New session in any tool: load REAL DOCS, full context. No dependency on conversation continuity, no dependency on session-specific scratchpads, no dependency on a particular AI's memory of previous sessions.

This principle pairs with Working Principle 0.3.7 (Audit Discipline) — coherence audit (0.3.7) checks that REAL DOCS are coherent with each other; self-sufficiency audit (0.3.9) checks that REAL DOCS are sufficient on their own.

## 0.4 How These Principles Drive Commitments

Specific commitments downstream of Part 0 principles:

- **Phase 0 procurement** (Active Plan Stage 4 Step 4.1) — Supabase managed EU free tier + Vercel free tier + Claude API as current concrete LLM backend (per D.22) + Claude Code Pro subscription. ~$20/mo plus LLM usage. Driven by Working Principle 0.3.1 (Real UX, Minimal Infrastructure).
- **Engine-agnostic LLM substrate abstraction built from Step 4.5** (per D.21) — not deferred. Three deployment modes (client-local self-hosted, online APIs, AIRIS-hosted non-HQ); concrete engine chosen per deployment. Driven by Working Principle 0.3.1 (UX protection) + Working Principle 0.3.8 (Architecture Through Abstractions).
- **International platform; Italy as first deployment market** (per D.24) — platform architecture locale-agnostic by construction; Italian content in Section 17 + D.18 + D.19 is Italy's localization layer at first-market depth, not a platform-wide commitment. Sister abstraction to the engine-agnostic substrate. Driven by Working Principle 0.3.8 (Architecture Through Abstractions).
- **Pack workstreams Stage 5 (not parallel Phase 0)** — driven by Working Principle 0.3.2 (SW-First Sequencing).
- **Phase D pre-deployment infrastructure work** — full Hostinger production topology per deep research (Part VII Section 7.3) provisioned when hospital deployment context matters. Driven by Working Principle 0.3.1 (Minimal Infrastructure) + Working Principle 0.3.3 (Code Stays Same).
- **Modules at varying depth Phase A** (per V27 D.10 / V28 Decision Log D.10) — Radiology + one cross-module flow deep; other 9 honest-partial. Driven by Working Principle 0.3.5 (Production Discipline Within Scope, Honest Absence Outside).
- **Session-end audit ritual** — every strategic/architectural session ends with audit pass per Working Principle 0.3.7 (Audit Discipline).
- **REAL DOCS = boundless-independent structure** — VIVA Master + Viva Mode Master + AIRIS Master Doc (current) + Active Plan + Project Core (five canonical docs only). All other artifacts (design sketches, working specs, intermediate analyses) volatile. Driven by Working Principle 0.3.9 (Boundless Independent Structure).
- **Atomic commit discipline includes self-sufficiency audit** — every Master Doc version commit verifies REAL DOCS remain self-sufficient. Driven by Working Principle 0.3.9 + 0.3.7 together.

These commitments live in their respective Parts (II, III, IV) with detailed rationale; Part 0 holds the principles that drove them.


---
## PART I — FRAME

This Part holds AIRIS's philosophical and architectural commitments — the application of VIVA's worldview to healthcare, AIRIS's two hard lines, what AIRIS specifically promises, the Central Design Test as it applies to clinical work, the Stance (AIRIS's architectural commitment expressed three ways), and the Foundational Principles that govern how AIRIS is built.

AIRIS inherits VIVA's umbrella worldview, criterion, and method (see VIVA Master Document). Part I articulates the AIRIS-specific application of all of that.

The other Parts: II — System Specification; III — Decisions and Reasoning; IV — Production Plan; V — Live Edges; VI — Orientation.

---

## EXECUTIVE VISION

AIRIS is the first VIVA application. The umbrella's worldview and criterion — that software should serve human craft rather than asking humans to bend to it; that the test for any VIVA application is whether it stands between a person and their work or extends them further into it — are articulated in VIVA Master Document. This document holds the AIRIS-specific application of those principles, the system specification, the production plan, and the live edges of work in progress.

AIRIS exists because hospitals are the place where the inversion VIVA opposes is most visible, most painful, and most consequential. A clinician spends a quarter of her shift, sometimes more, typing into administrative systems that someone — usually not a clinician — designed for compliance, billing, or audit purposes. Every minute spent there is a minute not spent with the patient. The cost is paid twice: once by the clinician, who spends her day doing something other than what she is good at, and once by the patient, who receives a diminished version of what should have been theirs. In healthcare, the second party paying that cost is a sick person. The stakes of getting this right are not abstract.

The existing market has spent two decades trying to fix the symptoms. Better dashboards, faster forms, integrations between fragmented systems, "AI-powered" assistants bolted onto interfaces that were built for clicking. None of it has touched the underlying compromise. The clinician still serves the software. AIRIS is the proposal that this can stop.

What AIRIS is, concretely, is the entire information layer of a hospital, designed under one principle: every minute a clinician spends operating the system is a minute the system has failed. The system absorbs the work of moving information between departments, of keeping records aligned, of generating the documents that institutions and regulators require, of remembering what was said and decided. The clinician describes what they are doing, in the language they would use to a colleague, and the system handles the translation into whatever schemas the institution and the law require. The clinician's relationship with the patient is uninterrupted. The clinician's craft expands, because the system can extend their reach across the hospital and across time in ways their unaided attention could not. The administration disappears into the machine. The medicine returns to the human.

### The Central Design Test

Every feature, workflow, and architectural decision in AIRIS is evaluated against a single question: does this stand between the clinician and their craft, or extend the clinician further into it? The first kind is removed. The second kind is built. This is not a slogan. It is the working test that distinguishes AIRIS from every other system in this market, and it is applied uncompromisingly throughout.

This test draws a clear distinction that most healthcare software refuses to draw. Some of what looks like clinical administration is genuine craft — a clinician documenting an observation that the next clinician will need is not doing paperwork, they are practicing medicine. AIRIS preserves and protects this work. What AIRIS removes is the bureaucratic translation layer that exists for institutional and billing reasons: the form-filling, the code-hunting, the screen-navigating that has accumulated on top of the actual clinical thinking and is now mistaken for it. Drawing this line accurately, in every workflow, is the central design discipline of AIRIS.

### What AIRIS Will Not Become

There are two things AIRIS will not become, because crossing either line would make it no longer a VIVA application, regardless of what the product was still called.

The first is that AIRIS will not make clinical decisions in place of the clinician. The system can surface information the clinician might otherwise miss, flag patterns across a hospital that no individual could see, prepare a recommendation with reasoning for the clinician to consider. It will not choose, on the clinician's behalf, what diagnosis to record, what treatment to order, what risk to accept on behalf of a patient. Clinical judgment is the thing AIRIS exists to extend, and a tool that extends a craft cannot also replace it.

The second is that AIRIS will not, in any release, ask more administrative work of the clinician than the previous release did. The product exists to remove that work. Adding it back, even in small increments, even to satisfy a customer request, is the way every system in this market has slowly become what it now is. Features that would cross this line either get redesigned to not cross it, or do not ship.

These lines protect the philosophy against drift under accumulated pressure. Everything else AIRIS does — how it grows, what it integrates with, how it is sold, how it is priced, what modules it adds — is a matter of judgment, not of rule.

### What AIRIS Promises

AIRIS succeeds when the following are observably true in real hospitals, for real people, day after day. It fails when these are only true in marketing copy.

The clinician spends their time in the room with the patient, not in the room with the screen. Forms are not waiting at the end of the encounter; the system has already absorbed what the encounter required, and what remains is clinical thinking, not data entry. The clinician's day does not end with an extra hour and a half of administrative work that her old system extracted from her.

The patient receives a clinician who is present. They cannot articulate why their visit feels different from visits at other hospitals, but they feel it. The clinician's eyes are on them. The clinician remembers what they said earlier in the conversation. The clinician's mind is in the room.

The hospital, as an institution, finds that documentation, regulatory submissions, billing codes, audit trails, and inter-department coordination happen with less friction than before, because they happen as a byproduct of clinical work rather than as a tax on top of it. The institution gets what it needs, more reliably, without extracting it from the clinicians one keystroke at a time.

The bed managers, schedulers, and dispatchers find that information they used to hunt now arrives, and decisions that used to require five tools now require one conversation. Their craft is also coordination, and AIRIS extends it.

The IT department finds, over time, that the integrations and workarounds and custom reports they used to maintain across many systems have collapsed into one. Their work shifts from glue work to actual engineering.

### Scope

AIRIS is the entire information and workflow layer of a hospital — patient information and registration, order management, scheduling and resource allocation, clinical documentation and reporting, workflow management, inter-department communication, and administrative functions that support clinical work. AIRIS is not a PACS, does not replace specialized clinical tools (DICOM modalities, ECG viewers, lab analyzers), does not handle medication dispensing or external insurance claims processing. These remain external systems that AIRIS connects to through its integration layer, designed to minimize what needs to be external.

AIRIS is designed as an **international platform**. The platform architecture (the dual-surface paradigm, the consciousness substrate, the eleven-module structure, the engineering architecture in Part II Section 17) is language- and locale-agnostic by construction; market-specific content — medical terminology, regulatory regimes, clinical workflows, voice quality — lives in a localization layer produced per market.

The **first deployment market is Italy**. The choice is not arbitrary. Italian medicine has a strong tradition of clinical craft that the current generation of hospital software has been particularly hard on. The bureaucratic burden on Italian clinicians is visible, measurable, and universally complained about. The regulatory environment is well-defined enough to be designed for. Starting in Italy is starting where the philosophy has both the clearest stakes and the clearest fit. Italy's localization — Italian medical terminology, Italian voice character, Italian regulatory artifacts (FSE 2.0 / SDO / NSIS), Italian identity composition (codice fiscale / FNOMCeO / albo), Italian-specific MPI handling, Italian incumbent-landscape positioning — is committed at first-market depth in Section 17 and elsewhere; this is the moat for the first market and the basis of the AGFA-Italy beachhead. The platform underneath generalizes to subsequent markets without architectural change. See Decision Log D.24 for the architectural commitment.

**Note on Phase A demonstration scope (since V26):** AIRIS-the-product is eventually all eleven modules at full clinical depth. Phase A's job is to make the philosophy and the breadth-of-coverage value proposition real and demonstrable to AGFA, not to deliver all eleven modules at full depth — that happens in Phase C (with clinical partners) and Phase D (with hospital deployment). Phase A delivers: Radiology built deep; one additional module (Emergency or Cardiology) built deep enough for cross-module flow; the other nine present at honest-partial depth (architecturally real, conveying the module's shape, with workflow depth deferred visibly to Phase C). See Part IV Section 3 for the full scope; Part III D.10 for the reasoning.

---


## THE STANCE

*The Stance content has been relocated to Part 0 — Operating Philosophy (Section 0.2). It now lives there as foundational structural placement; this Part I reference preserves cross-link continuity. See Part 0.2 for the full content.*

## FOUNDATIONAL PRINCIPLES

The Stance describes what AIRIS is at its core. Several principles flow from the Stance and shape how AIRIS is built. These are not three additional good ideas stacked on top of the philosophy. They are how the philosophy expresses itself when it meets the practical work of designing a hospital information system. Each one exists because the Stance, applied honestly, requires it.

These principles are: that any single module of AIRIS, alongside the Core, must be a complete product on its own (the Module Independence Principle); that no module is ever a templated copy of another, regardless of shared patterns (Every Module Is Unique); and that specification and development happen together as a single ongoing activity, not as sequential phases (Specification and Development Are Simultaneous).

Each is described in detail in its own section below. A brief framing of why each matters under the Stance:

**Module Independence** exists because the Stance commits to serving each clinician's craft completely. A radiologist running AIRIS for radiology only should not feel they are using a crippled fragment of a larger system; they should feel they have a complete radiology information system that happens to be capable of more. This is what serving a craft fully means in practice. It is also a refusal of the common software-industry shortcut where a module is a partial product designed to upsell the customer to the full suite. AIRIS does not work that way because the Stance does not allow it to.

**Every Module Is Unique** exists because the Stance commits to taking each specialty's clinical reality seriously on its own terms. Templating one module from another — even when patterns appear to be shared — is the design shortcut that produces shallow modules in the existing market, where Cardiology is "Radiology with different labels" and Endoscopy is "Cardiology with different labels," and none of them serve their clinicians well because none of them was actually designed for the people who use it. The Stance refuses this. Every module is built from its own clinical reality, whatever architectural patterns it may share with others.

**Specification and Development Are Simultaneous** exists because the Stance is an active commitment, not a frozen design. The Master Document is a living artifact that improves because real software is being built against it, and the software improves because the document is comprehensive. Real clinicians, in real hospitals, will reveal things that no paper specification could anticipate — and those revelations have to flow back into the spec, not be discarded as edge cases. The Stance requires a documentation discipline that learns. Specification-then-development, the traditional waterfall pattern, would produce a document that was right at the moment it was finished and increasingly wrong thereafter. AIRIS cannot afford that.

Each of the three is detailed in the sections that follow, with the operational rules that make it real.

---

## MODULE INDEPENDENCE PRINCIPLE

This principle is what serving each specialty's craft *fully* requires under the Stance — a clinician using AIRIS for one specialty should not feel they have a fragment of something larger; they should feel they have a complete product that happens to be capable of more. It is also a refusal of the common software-industry shortcut of selling partial products designed to upsell to a fuller suite.

### The Rule

**Core + any single module = a complete, fully functional product for that department.**

A hospital can install AIRIS with only the Radiology module and have a complete, working Radiology Information System. Nothing is missing, nothing is broken, nothing feels incomplete. The same applies to any module: Core + Laboratory = a complete LIS. Core + Emergency = a complete ED system. Core + Dialysis = a complete dialysis information system.

Adding more modules unlocks new capabilities (cross-module ordering, richer automations, hospital-wide patient flow). Removing a module never breaks another module.

### The Three-Way Check

When a feature involves interaction with another module (for example, Emergency ordering a lab test), the system performs a three-way check:

1. **Does the target module exist internally?** If Laboratory module is installed, the order flows internally through the shared database. This is the ideal path — instant, no integration needed, full visibility.

2. **Is an integration configured for this type of order?** If Laboratory module is NOT installed but an integration to an external LIS is configured through the Integration Builder, the order routes externally. AIRIS handles the ordering experience; the external system handles the lab work.

3. **Neither exists?** The option does not appear in the user interface. No broken buttons, no error messages, no dead ends.

This three-way check applies differently to every specific situation. "Order a lab test" checks for Lab module or Lab integration. "View patient history" simply shows what exists — if only Radiology data exists, only Radiology history appears. "Schedule a follow-up" depends on whether the follow-up is within the same module (always available) or to another department (three-way check applies). Every case has its own logic; the principle is consistent but the implementation is case-by-case.

### Module Independence Verification

Every module must pass three checks:

1. **Standalone check:** Does this module work completely if it's the only module installed? Can every workflow be completed, every screen be used, every feature function?

2. **Removal check:** If this module is removed from a multi-module installation, does any other module break? Do any screens crash, any workflows fail, any data become inaccessible?

3. **Addition check:** If this module is added to an existing installation, does it require any changes to existing modules? Or does it simply activate new capabilities?

### No Hard Dependencies

No module may have a hard dependency on another module. Soft dependencies are expected and encouraged:
- "If Lab exists, show lab results in the ED patient chart" — soft dependency, gracefully absent if Lab doesn't exist
- "Lab module is required for Emergency to function" — hard dependency, NOT ALLOWED

The Event System, Cross-Module Order Flow, and all shared infrastructure are designed to work with any combination of modules. Events get emitted regardless of who is listening. Orders check for target module existence before offering the option. Patient data from any module is visible to any other module that has access — but no module requires another module's data to function.

### Specific Implications

The following details how module independence affects each major system component. Additional specific implications per module will be documented as they are discovered during development.

**Patient Page:** Displays history from whatever modules are installed. With one module, shows one section. With five modules, shows five sections. The layout adapts dynamically to what exists. No empty sections, no placeholder text for missing modules.

**Cross-Module Order Flow:** Only offers ordering targets that exist (internal module or configured integration). If neither exists, the ordering option is not presented.

**Interaction Layer:** Domain vocabulary and routing exist only for installed modules. The interaction layer gateway routes commands to available modules. Commands directed at non-installed modules receive a clear response ("Laboratory module is not installed in this system").

**Event System:** Events are emitted regardless of consumers. If no automation or agent is subscribed to a particular event, it still gets emitted and recorded in the audit trail. Adding a new module adds new event types to the catalog; existing events are unaffected.

**Automation Builder:** Shows available event types based on installed modules. Automations that reference events from uninstalled modules are automatically disabled with a clear indication of why.

**Agent Builder:** Agents can only be configured with permissions for installed modules. An agent's capabilities are naturally scoped to what exists.

**Integration Builder:** Becomes MORE important in single-module installations, not less. A hospital with only AIRIS Radiology still needs to connect to their external Lab, Pharmacy, ADT system. The Integration Builder handles all external connections regardless of how many AIRIS modules are installed.

**DICOM Worklist Manager:** Only relevant for modules that use DICOM equipment. In a Lab-only installation, the DICOM Worklist Manager has nothing to manage and is not visible.

---

## EVERY MODULE IS UNIQUE

Even when modules share architectural patterns, workflow similarities, or data structure approaches, every module is designed and built as itself. No module is a "copy" of another module with different labels. No module is a "variant" or "type" of another module.

The fact that Cardiology and Radiology both use order-based workflows does not make Cardiology "a Radiology variant." Cardiology has its own clinical reality, its own unique requirements, its own workflows, its own terminology, its own screens. It is Cardiology, designed for cardiologists, built to serve cardiology departments.

This principle exists to prevent a dangerous mental shortcut: if modules are categorized into "types" (order-based, specimen-based, episode-driven, longitudinal), there is a risk of designing new modules by copying an existing one from the same "type" and changing labels. This produces shallow, generic modules that don't serve their clinical users well.

Architectural patterns exist and are valuable for understanding coverage and identifying shared infrastructure needs. But they must never become templates that constrain how a module is designed. Every module starts from its own clinical reality and is built to serve that reality completely.

The refusal to template is what taking each specialty's clinical reality seriously requires under the Stance. Templating produces modules that look complete but serve no one well; designing each module from its own clinical ground produces modules that feel, to the clinicians who use them, as if AIRIS was built for their specialty alone — which is the only acceptable outcome.

---

## SPECIFICATION AND DEVELOPMENT ARE SIMULTANEOUS

The Master Doc is a living document. It does not have a "final" state that gets handed off to development. Specification and development are parallel, mutually reinforcing activities that happen throughout the life of the project.

When development reveals that a workflow doesn't make sense in practice, the spec is updated. When development encounters an edge case not covered by the spec, it is discussed, decided, and added to the Master Doc. When a new architectural principle emerges from building real software, it is documented here.

The Master Doc improves BECAUSE development is happening, and development improves BECAUSE the Master Doc is comprehensive. This is a cycle, not a sequence. Every development session can produce both working software and improved specification.

**Nothing about AIRIS that is decided or discovered exists only in code or only in conversation. If it matters, it goes in the Master Doc.** The Master Doc is the single source of truth for what AIRIS is, how it works, and why decisions were made.

---

## PART II — SYSTEM SPECIFICATION

This Part holds AIRIS's system specification — what AIRIS *is* structurally. Architectural decisions, the CORE / module split, the System Tools, the sixteen CORE System Components (including the Regulatory Layer), all eleven module specifications, the Critical Implementation Notes, and the Architectural Patterns Confirmed.

The Part is large by volume because the system itself is large. Each subsection within Part II addresses one part of the spec; together they describe the whole.

What is *not* here: the philosophical commitments (Part I), the reasoning behind specific decisions (Part III), the production plan and timeline (Part IV — note: Development Strategy currently sits within this Part and will move to Part IV when Part IV is populated in a subsequent session), the live edges of work in progress (Part V), or the orientation guide (Part VI).

---

## FUNDAMENTAL ARCHITECTURE DECISIONS

### 1. Module Structure: Department-Based

**Decision:** Build separate modules for each department (Radiology, Cardiology, Laboratory, Emergency, etc.)

**Why This Approach:**
- Each department gets a tailored experience (radiologists see a radiology system, cardiologists see a cardiology system)
- Department-specific workflows, terminology, and interfaces
- Seamless integration because all modules share the same database
- Scalable (start with radiology, add departments progressively)

**Critical Distinction:**
- Modules are NOT separate systems requiring integration
- Modules are different USER INTERFACES accessing the SAME DATABASE
- When cardiology creates an order for radiology, it's just writing to the shared database
- Radiology module reads from that same database - no APIs, no messages, no integration layer

**User Experience:**
- Each user sees ONLY their department's interface
- Radiologist logs in -> sees "AIRIS" as their radiology system (not "Radiology Module within AIRIS")
- Cardiologist logs in -> sees "AIRIS" as their cardiology system
- Hospital IT -> sees one unified system managing everything
- Each department feels AIRIS was built exclusively for them

### 2. Department vs Module - Important Distinction

**Module:** Type of functionality (e.g., "Radiology Module", "Cardiology Module")
- Defines the workflows and features
- Built once, can be used by multiple departments

**Department:** Organizational unit in the hospital (e.g., "Radiology North Wing", "Radiology South Wing")
- Instance that uses a specific module
- Configured with specific settings (rooms, staff, schedules)
- Multiple departments can use the same module type

**Example:** Hospital has two radiology departments (different locations/teams) - both use the Radiology Module but are separate departments with separate configurations.

**Key Rule:** When a department is created, its module type is selected and PERMANENT (cannot be changed).

### 3. Database Architecture: Single Unified Database

**Structure:**
- ONE database for entire hospital
- Core patient registry (universal patient record)
- Universal data structure with module-specific interpretations

**Key Principle:**
- "Patient" is THE patient everywhere
- Changes reflect instantly across all departments
- No data synchronization needed
- No duplicate patient records
- Same underlying data structure, module-specific vocabulary and workflows

**Philosophy: "Same Language, Different Vocabulary"**
- **Language (Universal):** Concepts, data structure, consistency
  - Orders exist, have statuses, progress through workflows
  - Patients exist with unified records
  - Resources can be scheduled
  
- **Vocabulary (Module-Specific):** Terminology, workflows, UI
  - Radiology: "Exam" with status "Completed"
  - Lab: "Test" with status "Resulted"
  - Different words, same underlying structure

**No requirement for similar UI** - each module can have completely different interface as long as data structure remains consistent.

### 4. Container System: Shared Resources

**NEW in V4:** Some resources can be shared across departments via **Container System**

**What Gets Containerized:**
- **Medications/Sedation Lists** - Hospital formulary, standardized drugs
- **Device Inventory** (V5) - Holter monitors, loaner equipment tracked across uses

**What Stays Module-Specific:**
- Exam Catalogs (Nomenclatore) - Each department's service menu
- Execution Form Templates - Department-specific workflows
- Report Templates - Department-specific documentation
- Modalities - Physical equipment at locations
- Folders - Organizational structures

**Why This Architecture:**
- Medications are truly shared hospital resources (pharmacy manages formulary)
- Everything else is department-specific workflow or physical assets
- Avoids unnecessary duplication while preserving department autonomy

**Container Management:**
- Location: System Settings > Container Management
- Who manages: System Admins only (centralized control)
- Assignment: System Admin assigns containers to departments
- Flexibility: Department can have multiple containers per type

**Example:**
```
"Gastro Standard Medications" Container:
  - Midazolam, Fentanyl, Propofol...
  - Assigned to: Gastro Dept A, Gastro Dept B
  
Both departments see same medication list
Changes by System Admin reflect instantly in both departments
```

### 5. Deployment Flexibility: Cloud or On-Premise

**Requirement:** System must run identically whether deployed:
- In the cloud (hosted by us or cloud provider)
- On hospital's local servers/infrastructure
- Hybrid (some components cloud, some local)

**Implications:**
- Architecture must not assume cloud-only features
- Data privacy and security for local deployments
- AI can run on cloud LLMs OR local LLMs (hospital choice)
- Everything must work the same regardless of deployment location

### 6. Platform Flexibility: Mobile and Desktop

**Requirement:** Same functionality on:
- Desktop (Windows, Mac, Linux)
- Mobile (iOS, Android tablets/phones)
- Web browsers

**Not just responsive design** - truly optimized for each platform while maintaining feature parity.

---

## WHAT LIVES IN CORE VS INSIDE MODULES

### CORE (Universal - Outside Modules):
1. Login/Authentication
2. Patient Registry (universal patient page)
3. User Management (user creation, module assignment, system admin designation)
4. **Container Management** (Medications/Sedation Lists - shareable)
5. Interaction Layer (foundation/infrastructure — Central Gateway, context management, LLM service layer)
6. Event System (foundation for automations/agents)
7. Database (backend infrastructure)
8. Module Selector (interface after login)
9. The Three System-Wide Builders (Automation, Agent, Integration)

### INSIDE Each Module (Department-Specific):
1. Modality Management (equipment specific to that department)
2. Folders (optional organization of modalities)
3. Scheduling (department's calendar and appointments)
4. Order Management (department-specific workflows)
5. Reporting/Results (department-specific documentation)
6. **Exam Catalog** (Nomenclatore - department's service menu)
7. **Execution Form Templates** (department-specific documentation forms)
8. **Report Templates** (department-specific report structures)
9. Module-Specific Permissions (who can do what in this department)
10. Module-Specific Interaction Vocabulary
11. Worklists and Views
12. Analytics/Dashboards (department-specific)
13. DICOM Worklist Manager (if department uses DICOM equipment - optional)

**Key Decision:** Medications are containerized at system level. Everything else stays in modules for department autonomy and customization.

### 7. AIRIS 5-Level Urgency System (NEW in V6)

**Universal across all modules** (standardized from Italian Emergency triage requirements):

| Level | Color | Label | Description |
|---|---|---|---|
| 1 | Red | Emergenza | Immediate - life threatening |
| 2 | Orange | Urgenza | High priority - 15 min response |
| 3 | Blue | Urgenza Differibile | Moderate - 60 min response |
| 4 | Green | Urgenza Minore | Low priority - 120 min response |
| 5 | White | Non Urgenza | Not urgent - 240 min response |

**Why 5 Levels:**
- Italian Emergency (Pronto Soccorso) regulations require 5-level triage
- Standardizing across all modules ensures consistency
- Modules can use levels 1-4 if 5 not needed (backward compatible)
- Color coding is consistent hospital-wide

**Module-Specific Field Names:**
- Radiology: `radiology_urgency`
- Cardiology: `cardiology_urgency`
- Gastro: `gastro_urgency`
- Emergency: `triage_code` (maps directly to 5-level system)

---

## SYSTEM TOOLS OVERVIEW

AIRIS has three system-level builder tools and one device management tool, all accessible from the System Tools section (outside of department modules):

1. **Automation Builder** — Create deterministic, rule-based workflows (no-code visual builder)
2. **Agent Builder** — Create AI employees that operate AIRIS autonomously
3. **Integration Builder** — Manage all external system connections (HL7, FHIR, APIs)
4. **DICOM Worklist Manager** — Hospital-wide management of all DICOM modalities and worklists

The **Interaction Layer** is NOT a system tool — it is the primary interaction paradigm for the entire system. See CORE SYSTEM COMPONENTS Section 8 for the complete specification.

Full specifications for all builders and the DICOM Worklist Manager are in CORE SYSTEM COMPONENTS Sections 9-12.

---

## CORE SYSTEM COMPONENTS

### 1. Patient Registry (Universal)

**Purpose:** Single source of truth for all patient information

**Key Feature:** ONE patient record across entire hospital
- All departments see the same patient
- Updates reflect instantly everywhere
- No duplicate records
- No data synchronization between modules

**Patient Page Structure:**

One universal patient page showing:
- Basic patient information
- Complete exam/procedure/test history across ALL modules

**History Organization:**
Orders grouped by department/module with module-specific vocabulary:

```
 RADIOLOGY 
  CT Chest (Dec 15, 2024) 
 Status: Report Signed 
  X-Ray Ankle (Nov 3, 2024) 
 Status: Report Signed 

 CARDIOLOGY 
  Echocardiogram (Dec 10) 
 Status: Procedure Complete 

```

**Viewing Options:**
- By module (filter to show only one department's exams)
- Chronologically (everything in date order)
- Dynamic filtering system (user chooses how to view)

**Additional Features:**
- Future appointments section (showing upcoming scheduled exams)
- Each exam links to its report

### 2. User Management & Security

**Two-Level Permission System:**

**Level 1: System Settings (Core - Outside Modules)**

What Happens Here:
- Create user account (name, username, password, email, job title)
- Designate as System Admin (yes/no)
  - System Admins can access System Settings and manage users
  - Regular Users can only access assigned modules
- Assign user to modules (e.g., Radiology, Cardiology)
- For each module assignment, designate as Module Admin (yes/no)
  - Module Admins can manage users and settings within that specific module
  - Regular module users cannot access module settings

**User Data Structure:**
```
Users Table:
  - User ID (unique)
  - Full Name
  - Username (for login)
  - Password (authentication)
  - Email
  - Job Title (optional, informational)
  - Is System Admin (yes/no)

User Module Assignments Table:
  - User ID
  - Module (Radiology, Cardiology, etc.)
  - Is Module Admin (yes/no)

Module Permissions Table:
  - User ID
  - Module
  - Permission (can_schedule, can_sign_reports, etc.)
```

**Level 2: Inside Each Module (Detailed Permissions)**

What Happens Here:
- Module shows list of users assigned to it
- Module Admin (or System Admin) configures specific permissions for each user
- Permissions are module-specific (each module defines its own permission set)

**Example - Radiology Module User Management:**
```
Dr. Bianchi (assigned to Radiology):
 Can schedule exams
 Can write reports
 Can sign reports
 Can modify completed exams
 Can view all patients

Tech Mario (assigned to Radiology):
 Can schedule exams
 Can check in patients
 Can complete exams
 Can write reports
 Can sign reports
```

**User Assignment Flow:**
1. System Admin creates user in System Settings
2. System Admin assigns user to module(s) and designates Module Admin status
3. User can now log in and access assigned modules
4. Module Admin (or System Admin) configures specific permissions inside each module

**Multi-Module Access:**
- Users can be assigned to multiple modules
- Different permissions in each module
- Example: Dr. Rossi can write/sign reports in Radiology but only view results in Cardiology

**Who Configures What:**
- **System Admin:** Creates users, assigns modules, designates admins, can configure permissions in any module
- **Module Admin:** Configures permissions for users within their specific module only
- **Regular User:** No administrative capabilities

### 3. Container Management (NEW)

**Purpose:** Manage shared resources across departments

**Location:** System Settings > Container Management

**Who Manages:** System Admins only

#### Medication/Sedation Containers

**Structure:**
```
Container Management > Medications

[+ Create Container] [Import] [AI Import]

"Gastro Standard Medications"
  - Midazolam (5mg)
  - Fentanyl (100mcg)
  - Propofol (10mg)
  - (45 items total)
  Assigned to: Gastro Dept A, Gastro Dept B
  [Edit Container] [Manage Assignments]
  
"Radiology Contrast Agents"
  - Iodinated Contrast (various)
  - Gadolinium agents
  - (22 items total)
  Assigned to: Radiology Dept
  [Edit Container] [Manage Assignments]
```

**Creating Container:**
1. Click [+ Create Container]
2. Name container ("Gastro Standard Medications")
3. Add medications (manual or import)
4. Save container
5. Assign to departments

**Import Options:**
- **Simple Import:** Upload file (CSV, Excel), bulk import all
- **AI-Assisted Import:** Conversational interface
  - "Import only sedation drugs"
  - "Skip duplicates"
  - "Merge with existing"
  - AI handles complex filtering and decisions

**Assignment:**
```
Container: "Gastro Standard Medications"

Assign to departments:
 Gastro Dept A
 Gastro Dept B
 Radiology Dept
  
[Save Assignments]
```

**Department can have multiple containers:**
```
Gastro Dept A assigned to:
  - "Gastro Standard Medications" (45 items)
  - "Experimental Drugs" (8 items)
  - "Sedation Protocols" (12 items)
  
Total available: 65 medications
```

**User Experience in Module:**
When physician in Gastro Dept A fills execution form:
- Sees combined list from all assigned containers
- No indication of which container (just flat list of available medications)
- System Admin controls which containers department has access to

**Module View (Read-Only):**
Inside module Administration:
```
Administration > Assigned Containers

This department has access to:

Medication Containers:
  - Gastro Standard Medications (45 items)
  - Experimental Drugs (8 items)
  
(Managed in System Settings - contact System Admin to modify)
```

Module Admins cannot edit containers - only System Admins can.

### 4. The Interaction Layer (Natural Language Interaction)

See **Section 8. The Interaction Layer** for complete design. The interaction layer is AIRIS's primary input system — a fundamentally new interface model where the screen is minimal and the right interface element materializes when the user speaks, types, or otherwise expresses intent. Architecture: Central Gateway → Domain-Specific Agents → Action Execution Layer, driven by session context. One paradigm with multiple input methods (voice, text, touch, click), plus a GUI fallback always available for situations that call for direct manipulation.

### 5. Event System — Complete Design

---

#### 5.1 What It Is

The Event System is the internal nervous system of AIRIS. Every significant action anywhere in the system emits an event. Events are the mechanism by which different parts of AIRIS communicate — Automations react to them, Agents monitor them, Notifications are triggered by them, Audit Trail records them, and UI updates in real-time because of them.

The Event System is NOT an integration tool. It operates entirely within AIRIS's single database. External communication (HL7, FHIR) is handled by the Integration Builder, which may consume internal events to generate outbound messages and may create internal events from inbound external messages.

---

#### 5.2 Event Structure (Universal)

Every event in AIRIS follows one structure, regardless of which module emitted it:

**event_id**
- Unique identifier for this specific event occurrence
- Auto-generated, never reused
- Used for deduplication, reference, replay

**event_type**
- String identifier using dot notation: `{module}.{entity}.{action}`
- Examples: `radiology.exam.checked_in`, `patient_flow.encounter.admitted`, `lab.test.validated`, `core.patient.merged`
- The event catalog defines all valid event types

**priority**
- CRITICAL, STANDARD, or BACKGROUND
- Determines processing queue and delivery guarantees
- Set by the event definition in the catalog, not by the emitter

**timestamp**
- When the event occurred (the action that caused it, not when it was processed)
- Date + time + timezone
- Precision: milliseconds

**module**
- Which module emitted this event
- Values: CORE, RADIOLOGY, LABORATORY, EMERGENCY, CARDIOLOGY, GASTRO, NUCLEAR_MEDICINE, PATHOLOGY, OPERATING_ROOM, DIALYSIS, CARE_UNIT
- CORE for system-wide events (patient registry, user management)

**department_id**
- Which department instance emitted this event
- Allows filtering events by department (e.g., "only Radiology North Wing")
- NULL for CORE events that aren't department-specific

**user_id**
- Which user triggered the action that caused this event
- NULL for system-generated events (automated transitions, scheduled tasks, integration-created events)

**entity_type**
- What kind of entity this event is about
- Values: PATIENT, ORDER, EXAM, REPORT, APPOINTMENT, ENCOUNTER, TEST, SPECIMEN, CASE, EPISODE, etc.
- Module-specific vocabulary but universal field

**entity_id**
- Which specific entity (the primary key of the entity)

**patient_id**
- Which patient this event relates to
- Present on virtually all clinical events
- Enables patient-centric event filtering ("all events for patient X")
- NULL only for purely administrative events (user created, settings changed)

**correlation_id**
- Links related events together
- When one action triggers multiple events, they share a correlation_id
- Example: Signing a report creates `exam.reported` for each exam + `report.signed` + `order.completed` — all share one correlation_id
- Hierarchical: `{workflow_id}/{step_id}` allows tracking multi-step workflows

**previous_state**
- For state-transition events: what the state was BEFORE this event
- Example: For `exam.checked_in`, previous_state = "SCHEDULED"
- NULL for creation events (no previous state)
- This enables state-transition detection — events fire on transitions, not just changes

**new_state**
- For state-transition events: what the state is AFTER this event
- Example: For `exam.checked_in`, new_state = "CHECKED_IN"
- NULL for events that aren't state transitions

**payload**
- Event-specific additional data (structured)
- Defined per event type in the event catalog
- Must contain only necessary data (GDPR data minimization)
- Examples: For `exam.checked_in`, payload includes mobility, cooperation, special_considerations. For `report.signed`, payload includes report_version, signing_physician_id.

---

#### 5.3 Priority Tiers

**CRITICAL**
- Processing: Dedicated queue, processed immediately, never delayed by other events
- Delivery: Sub-minute target, real-time push to all subscribers
- Failure handling: Immediate retry (3 attempts, 10-second intervals), then escalation to alternative channel, then DLQ with on-call alerting
- Acknowledgment: REQUIRED — consumer must acknowledge receipt. Unacknowledged after 5 minutes triggers escalation
- Examples: Lab critical/panic values, critical findings in radiology reports, STAT order creation, patient deterioration alerts, code/emergency alerts, blood transfusion reactions, medication allergy alerts, frozen section requests, OR count discrepancies, dialysis access complications

**STANDARD**
- Processing: Main queue, processed in order, target delivery within seconds
- Delivery: Real-time push to subscribers, no escalation on delay
- Failure handling: Retry (5 attempts, exponential backoff: 1s, 5s, 30s, 2min, 10min), then DLQ for manual review
- Acknowledgment: NOT required (fire and forget for most consumers)
- Examples: All status transitions, order created/modified/cancelled, patient admitted/transferred/discharged, report signed/amended, appointment changes, user assignment changes

**BACKGROUND**
- Processing: Separate queue, can be batched, lower priority
- Delivery: Within minutes to hours, no real-time requirement
- Failure handling: Retry with long backoff, DLQ for review, no alerting
- Acknowledgment: NOT required
- Examples: Analytics/metrics updates, billing events, settings changes, audit log entries for non-clinical actions, search index updates

---

#### 5.4 Event Catalog

The event catalog is the master list of all events AIRIS can emit. Organized by module. Each module registers its events when built.

**Naming Convention:** `{module}.{entity}.{action}`

**Standard Action Vocabulary (used across all modules):**

Status transitions: `{status_name}` (e.g., `scheduled`, `checked_in`, `executed`, `reported`)
CRUD: `created`, `updated`, `deleted`, `cancelled`
Assignment: `assigned`, `unassigned`, `reassigned`
Clinical: `signed`, `cosigned`, `amended`, `verified`, `acknowledged`

---

##### 5.4.1 CORE Events

```
core.patient.created          (STANDARD)
core.patient.updated          (STANDARD)
core.patient.merged           (STANDARD) — payload: surviving_id, merged_id
core.patient.deceased         (STANDARD)

core.user.created             (BACKGROUND)
core.user.updated             (BACKGROUND)
core.user.deactivated         (BACKGROUND)
core.user.module_assigned     (BACKGROUND)
core.user.module_unassigned   (BACKGROUND)
core.user.login               (BACKGROUND)
core.user.logout              (BACKGROUND)

core.department.created       (BACKGROUND)
core.department.updated       (BACKGROUND)

core.container.created        (BACKGROUND)
core.container.updated        (BACKGROUND)
core.container.assigned       (BACKGROUND)
core.container.unassigned     (BACKGROUND)
```

##### 5.4.2 RADIOLOGY Events

```
radiology.order.created           (STANDARD) — payload: order_type (A/B/C), source_module, source_department
radiology.order.completed         (STANDARD)
radiology.order.cancelled         (STANDARD) — payload: cancellation_reason

radiology.exam.created            (STANDARD)
radiology.exam.scheduled          (STANDARD) — payload: agenda_id, scheduled_datetime
radiology.exam.unscheduled        (STANDARD)
radiology.exam.checked_in         (STANDARD) — payload: mobility, cooperation, special_considerations
radiology.exam.checkin_undone     (STANDARD)
radiology.exam.executed           (STANDARD) — payload: radiologist_assigned, execution_data_summary
radiology.exam.execution_undone   (STANDARD)
radiology.exam.reported           (STANDARD) — payload: report_id, report_version
radiology.exam.cancelled          (STANDARD) — payload: cancellation_reason, previous_status
radiology.exam.urgency_changed    (STANDARD) — payload: old_urgency, new_urgency
radiology.exam.reassigned         (STANDARD) — payload: old_assignee, new_assignee

radiology.report.created          (STANDARD) — draft created
radiology.report.signed           (STANDARD) — payload: signing_physician, report_version, exam_ids
radiology.report.amended          (STANDARD) — payload: amendment_reason, new_version
radiology.report.critical_finding (CRITICAL) — payload: finding_description, severity

radiology.dicom.worklist_created  (STANDARD) — payload: modality_id, exam_details
radiology.dicom.worklist_deleted  (STANDARD)
radiology.dicom.study_received    (STANDARD) — payload: study_uid, modality_id
```

##### 5.4.3 LABORATORY Events

```
lab.order.created                 (STANDARD) — payload: source_module, source_department, test_count
lab.order.completed               (STANDARD)
lab.order.cancelled               (STANDARD)

lab.specimen.accessioned          (STANDARD) — payload: specimen_type, container_type
lab.specimen.received             (STANDARD)
lab.specimen.rejected             (STANDARD) — payload: rejection_reason

lab.test.pending                  (STANDARD)
lab.test.in_progress              (STANDARD)
lab.test.resulted                 (STANDARD) — payload: result_value, reference_range, flag
lab.test.auto_validated           (STANDARD) — payload: validation_rules_applied
lab.test.manually_validated       (STANDARD) — payload: validating_user
lab.test.physician_validated      (STANDARD) — payload: validating_physician
lab.test.cancelled                (STANDARD)

lab.result.critical               (CRITICAL) — payload: test_name, result_value, critical_range, patient_location
lab.result.panic                  (CRITICAL) — payload: same as critical
lab.result.amended                (STANDARD) — payload: old_value, new_value, amendment_reason

lab.batch.completed               (BACKGROUND) — payload: batch_id, test_count
```

##### 5.4.4 EMERGENCY Events

```
emergency.episode.created         (STANDARD) — payload: arrival_mode, chief_complaint
emergency.episode.triage_completed (STANDARD) — payload: triage_level (1-5), VPS
emergency.episode.area_assigned   (STANDARD) — payload: area, bed
emergency.episode.physician_assigned (STANDARD)
emergency.episode.treatment_started (STANDARD)
emergency.episode.obi_admitted    (STANDARD)
emergency.episode.discharged      (STANDARD) — payload: discharge_disposition, diagnosis
emergency.episode.transferred     (STANDARD) — payload: destination_ward
emergency.episode.cancelled       (STANDARD)

emergency.episode.triage_escalated (CRITICAL) — payload: old_level, new_level, reason
emergency.episode.code_activated  (CRITICAL) — payload: code_type (blue, red, stroke, STEMI)
emergency.episode.lwbs            (STANDARD) — left without being seen

emergency.nedocs.updated          (STANDARD) — payload: score, overcrowding_level
emergency.order.created           (STANDARD) — ED creating order for another module
```

##### 5.4.5 CARDIOLOGY Events

```
cardiology.order.created          (STANDARD)
cardiology.order.completed        (STANDARD)
cardiology.order.cancelled        (STANDARD)

cardiology.exam.created           (STANDARD)
cardiology.exam.scheduled         (STANDARD)
cardiology.exam.checked_in        (STANDARD) — payload: track (echo, stress, holter, cath, EP)
cardiology.exam.executed          (STANDARD) — payload: measurements_summary
cardiology.exam.reported          (STANDARD)
cardiology.exam.cancelled         (STANDARD)

cardiology.report.signed          (STANDARD)
cardiology.report.critical_finding (CRITICAL) — payload: finding (e.g., EF < 30%, critical stenosis)

cardiology.holter.started         (STANDARD) — device placed
cardiology.holter.completed       (STANDARD) — device returned, data downloaded
cardiology.holter.analyzed        (STANDARD) — analysis complete
```

##### 5.4.6 GASTRO/ENDOSCOPY Events

```
gastro.order.created              (STANDARD)
gastro.order.completed            (STANDARD)
gastro.exam.created               (STANDARD)
gastro.exam.scheduled             (STANDARD)
gastro.exam.checked_in            (STANDARD)
gastro.exam.executed              (STANDARD) — payload: sedation_given, specimens_collected
gastro.exam.reported              (STANDARD)
gastro.exam.cancelled             (STANDARD)
gastro.report.signed              (STANDARD)
gastro.report.critical_finding    (CRITICAL)
gastro.specimen.collected         (STANDARD) — payload: specimen_type, destination (pathology)
```

##### 5.4.7 NUCLEAR MEDICINE Events

```
nuclear_med.order.created         (STANDARD)
nuclear_med.exam.created          (STANDARD)
nuclear_med.exam.scheduled        (STANDARD) — payload: isotope, dose_ordered, decay_constraints
nuclear_med.exam.checked_in       (STANDARD) — payload: weight, glucose, clinical_data
nuclear_med.exam.injected         (STANDARD) — payload: radiopharmaceutical, actual_dose, injection_time
nuclear_med.exam.uptake_started   (STANDARD) — payload: expected_duration
nuclear_med.exam.uptake_completed (STANDARD)
nuclear_med.exam.imaged           (STANDARD)
nuclear_med.exam.executed         (STANDARD)
nuclear_med.exam.reported         (STANDARD)
nuclear_med.exam.cancelled        (STANDARD)
nuclear_med.report.signed         (STANDARD)
nuclear_med.therapy.cycle_started (STANDARD)
nuclear_med.therapy.cycle_completed (STANDARD)
```

##### 5.4.8 PATHOLOGY Events

```
pathology.case.created            (STANDARD) — payload: case_type (surgical, cytology, autopsy)
pathology.case.assigned           (STANDARD) — payload: assigned_pathologist
pathology.specimen.received       (STANDARD)
pathology.specimen.grossed        (STANDARD)
pathology.block.created           (STANDARD)
pathology.slide.created           (STANDARD)
pathology.slide.stained           (STANDARD)
pathology.case.reported           (STANDARD)
pathology.report.signed           (STANDARD)
pathology.report.amended          (STANDARD)
pathology.frozen_section.requested (CRITICAL) — payload: requesting_surgeon, OR_room
pathology.frozen_section.resulted (CRITICAL) — payload: result, turnaround_time
```

##### 5.4.9 OPERATING ROOM Events

```
or.case.created                   (STANDARD)
or.case.scheduled                 (STANDARD) — payload: OR_room, surgeon, procedure, block
or.case.preop_cleared             (STANDARD) — payload: clearance_milestones
or.case.patient_in_holding        (STANDARD)
or.case.consent_signed            (STANDARD) — payload: consent_id, provider
or.case.signin_complete           (STANDARD) — WHO phase 1
or.case.signin_overridden         (STANDARD) — payload: override_reason, override_by
or.case.anesthesia_started        (STANDARD)
or.case.timeout_complete          (STANDARD) — WHO phase 2 (hard gate)
or.case.incision                  (STANDARD) — payload: incision_time
or.case.signout_complete          (STANDARD) — WHO phase 3
or.case.signout_overridden        (STANDARD) — payload: override_reason, override_by
or.case.surgery_ended             (STANDARD)
or.case.patient_to_pacu_phase1    (STANDARD)
or.case.patient_to_pacu_phase2    (STANDARD) — outpatients
or.case.patient_fast_tracked      (STANDARD) — payload: white_song_score
or.case.patient_direct_icu        (STANDARD) — bypasses PACU
or.case.pacu_phase1_discharged    (STANDARD) — payload: aldrete_score, destination
or.case.pacu_phase2_discharged    (STANDARD) — payload: padss_score
or.case.cancelled                 (STANDARD) — payload: cancellation_point, reason, preventable
or.case.emergency_added           (CRITICAL) — payload: priority, displacing_case
or.case.closed                    (STANDARD) — all documentation complete

or.room.status_changed            (STANDARD) — payload: room_id, new_status (DIRTY/CLEANING/READY/IN_USE)
or.room.turnover_complete         (STANDARD) — payload: turnover_minutes

or.staff.assigned                 (STANDARD) — payload: user_id, role, case_id
or.staff.relieved                 (STANDARD) — payload: user_id, relieved_by, case_id

or.implant.registered             (STANDARD) — payload: UDI, implant_type
or.count.discrepancy              (CRITICAL) — payload: item_type, expected, actual

or.report.signed                  (STANDARD) — Verbale Operatorio signed
or.report.fse_transmitted         (STANDARD) — payload: fse_document_id
```

##### 5.4.10 DIALYSIS Events

```
dialysis.session.scheduled        (STANDARD) — payload: shift (MWF/TuThSa), machine
dialysis.session.started          (STANDARD) — payload: pre_weight, access_type, target_UF
dialysis.session.vitals_recorded  (STANDARD) — payload: hourly vitals during session
dialysis.session.completed        (STANDARD) — payload: post_weight, actual_UF, Kt/V
dialysis.session.interrupted      (STANDARD) — payload: reason
dialysis.session.cancelled        (STANDARD)

dialysis.access.created           (STANDARD) — new vascular access documented
dialysis.access.complication      (CRITICAL) — payload: complication_type
dialysis.adequacy.below_target    (STANDARD) — payload: Kt/V_value, target
```

##### 5.4.11 PATIENT FLOW Events (Hospital-Wide — see CORE Section 15 for full catalog)

```
patient_flow.encounter.pre_admitted       (STANDARD) — payload: patient, expected_date, source
patient_flow.encounter.admitted           (CRITICAL) — payload: patient, ward, bed, admission_type, attending, source
patient_flow.encounter.transferred        (CRITICAL) — payload: from_ward, from_bed, to_ward, to_bed, reason
patient_flow.encounter.discharge_pending  (STANDARD) — payload: expected_discharge_date, discharge_type
patient_flow.encounter.discharge_ready    (STANDARD) — payload: patient, ward, bed
patient_flow.encounter.discharged         (CRITICAL) — payload: discharge_type, destination, diagnosis, los_days
patient_flow.encounter.cancelled          (STANDARD) — payload: reason
patient_flow.encounter.updated            (STANDARD) — payload: changed_fields
patient_flow.encounter.off_ward           (STANDARD) — payload: destination_department, reason
patient_flow.encounter.returned_to_ward   (STANDARD) — payload: from_department

patient_flow.bed.requested               (STANDARD) — payload: source, level_of_care, priority
patient_flow.bed.assigned                (STANDARD) — payload: bed, patient, assigned_by
patient_flow.bed.reserved                (STANDARD) — payload: bed, patient, expires_at
patient_flow.bed.reservation_expired     (STANDARD) — payload: bed
patient_flow.bed.vacated                 (STANDARD) — payload: bed, previous_patient, cleaning_priority
patient_flow.bed.cleaning_requested      (BACKGROUND) — payload: bed, priority
patient_flow.bed.cleaning_started        (BACKGROUND) — payload: bed
patient_flow.bed.cleaning_completed      (STANDARD) — payload: bed, turnaround_minutes
patient_flow.bed.available               (STANDARD) — payload: bed, ward
patient_flow.bed.blocked                 (STANDARD) — payload: bed, reason
patient_flow.bed.unblocked               (STANDARD) — payload: bed

patient_flow.transport.requested         (STANDARD) — payload: patient, origin, destination, priority
patient_flow.transport.dispatched        (STANDARD) — payload: transporter, eta
patient_flow.transport.picked_up         (STANDARD) — payload: patient, origin
patient_flow.transport.delivered         (STANDARD) — payload: patient, destination
patient_flow.transport.cancelled         (STANDARD) — payload: reason

patient_flow.capacity.threshold_warning  (CRITICAL) — payload: occupancy_percent, level, ward_or_hospital
patient_flow.capacity.surge_activated    (CRITICAL) — payload: surge_level, activated_beds
patient_flow.capacity.surge_deactivated  (STANDARD) — payload: surge_level

patient_flow.handoff.generated           (STANDARD) — payload: handoff_type, patient, from, to
patient_flow.handoff.acknowledged        (STANDARD) — payload: handoff_id, acknowledged_by
patient_flow.handoff.overdue             (CRITICAL) — payload: handoff_id, minutes_overdue
```

##### 5.4.12 CARE UNIT Events (Clinical — module-specific)

```
care_unit.order.created           (STANDARD) — Care Unit ordering from another module
care_unit.order.result_received   (STANDARD) — Result arrived from service module

care_unit.note.created            (STANDARD) — payload: note_type (progress, nursing, consult)
care_unit.note.signed             (STANDARD)
care_unit.note.cosigned           (STANDARD)

care_unit.vitals.recorded         (STANDARD) — payload: temperature, HR, BP, SpO2, RR
care_unit.vitals.abnormal         (CRITICAL) — payload: which_vital, value, threshold

care_unit.medication.administered (STANDARD)
care_unit.medication.held         (STANDARD) — payload: reason
care_unit.medication.refused      (STANDARD)

care_unit.sdo.completed           (STANDARD)
care_unit.ldo.signed              (STANDARD)

care_unit.handoff.created         (STANDARD) — shift handoff (intra-ward nursing)
care_unit.handoff.acknowledged    (STANDARD)
```

##### 5.4.13 ICU Events (Critical Care — module-specific)

```
icu.device.associated              (STANDARD) — payload: device_type, device_identifier, bed, patient
icu.device.disassociated           (STANDARD) — payload: device_type, bed, reason
icu.device.data_received           (BACKGROUND) — payload: parameter_code, value, source_device
icu.device.data_validated          (STANDARD) — payload: batch_size, validated_by
icu.device.data_rejected           (STANDARD) — payload: parameter_code, value, rejection_reason
icu.device.connection_lost         (CRITICAL) — payload: device_type, bed, last_data_received_at
icu.device.alarm_received          (CRITICAL) — payload: alarm_type, parameter, value, device_type

icu.ventilator.intubated           (CRITICAL) — payload: ett_size, method, by_whom
icu.ventilator.settings_changed    (STANDARD) — payload: mode, key_settings_changed
icu.ventilator.weaning_trial_started  (STANDARD) — payload: trial_type (SAT/SBT), method
icu.ventilator.weaning_trial_passed   (STANDARD) — payload: trial_type, duration_minutes
icu.ventilator.weaning_trial_failed   (STANDARD) — payload: trial_type, failure_reason
icu.ventilator.extubated           (CRITICAL) — payload: planned_vs_unplanned, post_support
icu.ventilator.reintubated         (CRITICAL) — payload: hours_since_extubation, reason

icu.infusion.started               (STANDARD) — payload: medication, dose, dose_unit, clinical_goal
icu.infusion.titrated              (STANDARD) — payload: medication, previous_dose, new_dose, reason
icu.infusion.held                  (STANDARD) — payload: medication, reason
icu.infusion.restarted             (STANDARD) — payload: medication, dose
icu.infusion.discontinued          (STANDARD) — payload: medication, reason, total_duration

icu.score.calculated               (STANDARD) — payload: score_type, total_score, components_complete
icu.score.sofa_worsening           (CRITICAL) — payload: previous_sofa, current_sofa, delta, worst_organ
icu.score.manual_components_overdue (STANDARD) — payload: score_type, overdue_components

icu.invasive_device.inserted       (STANDARD) — payload: device_category, site, inserted_by
icu.invasive_device.removed        (STANDARD) — payload: device_category, site, reason, line_days
icu.invasive_device.daily_review_overdue (STANDARD) — payload: device_category, line_days
icu.bundle.assessed                (STANDARD) — payload: bundle_type, compliant (boolean)
icu.bundle.non_compliant           (STANDARD) — payload: bundle_type, non_compliant_elements

icu.phase.changed                  (STANDARD) — payload: previous_phase, new_phase
icu.phase.step_down_ready          (STANDARD) — payload: criteria_met

icu.rounds.started                 (STANDARD) — payload: rounds_type, led_by
icu.rounds.goals_set               (STANDARD) — payload: patient, goal_count
icu.rounds.completed               (STANDARD) — payload: patients_rounded, duration_minutes

icu.note.created                   (STANDARD) — payload: note_type
icu.note.signed                    (STANDARD)
icu.note.cosigned                  (STANDARD)

icu.vitals.abnormal                (CRITICAL) — payload: which_vital, value, threshold
icu.vitals.critical                (CRITICAL) — payload: which_vital, value, critical_threshold

icu.medication.administered        (STANDARD)
icu.medication.held                (STANDARD) — payload: reason
icu.medication.refused             (STANDARD)

icu.io.hourly_recorded             (STANDARD) — payload: net_balance_ml
icu.io.negative_balance_alert      (STANDARD) — payload: cumulative_net_ml, threshold

icu.sdo.completed                  (STANDARD)
icu.ldo.signed                     (STANDARD)

icu.handoff.created                (STANDARD) — shift handoff (intra-ICU nursing)
icu.handoff.acknowledged           (STANDARD)

icu.order.created_for              (STANDARD) — payload: target_module, target_department, order_details
icu.result.received_from           (STANDARD) — payload: source_module, result_summary
```

---

#### 5.5 Cross-Module Events

Some events represent interaction between modules. These use the originating module's namespace but include cross-module context:

```
{module}.order.created_for        (STANDARD)
```
- Emitted when one module creates an order FOR another module
- payload: target_module, target_department, order_details
- Example: `care_unit.order.created_for` with target_module = LABORATORY
- The receiving module also emits its own `order.created` event when it processes the inbound order

```
{module}.result.received_from     (STANDARD)
```
- Emitted when a module receives results from another module
- payload: source_module, source_department, result_summary
- Example: `care_unit.result.received_from` with source_module = RADIOLOGY

This two-event pattern (sender emits `created_for`, receiver emits `created`) ensures both modules have events in their own namespace while maintaining full traceability via correlation_id.

---

#### 5.6 Consumer Model

Four primary consumers, each subscribing differently:

**Automation Builder**
- Subscribes to specific event types with conditions
- Example: "radiology.exam.reported WHERE urgency = 1" → action: send notification to referring physician
- Automations are created by users via the Automation Builder interface
- Each automation stored as: trigger (event type + conditions) → actions (list of things to do)
- Automations can chain: one automation's action can emit events that trigger other automations (with loop detection)

**Agent Builder**
- Agents subscribe to streams of events, not individual events
- Agents monitor patterns over time rather than reacting to single events
- Example: Agent monitors `emergency.nedocs.updated` events over time to predict overcrowding and proactively reschedule non-urgent appointments
- Agents have broader subscriptions than automations (they "watch" categories of events)

**Notification System**
- Subscribes to events that need human notification
- Applies user preferences (notification channel, quiet hours, delegation)
- Handles acknowledgment tracking and escalation for CRITICAL events
- The Notification System is a consumer of events, not a source — it receives events and translates them into user-facing notifications

**Audit Trail**
- Subscribes to ALL events (no filtering)
- Stores every event permanently
- Provides search, replay, and compliance reporting
- The audit trail IS the event log — not a separate copy

**Real-time UI Updates**
- The frontend subscribes to events relevant to the current user's view
- When a user is in the Scheduling environment, their browser subscribes to scheduling-related events for their assigned modalities
- Events update the UI without page refresh (new exam appears, status changes, etc.)
- Uses Server-Sent Events (SSE) for delivery — simpler than WebSockets, works through hospital firewalls, built-in reconnection

---

#### 5.7 Subscription Rules

Consumers subscribe using a filter pattern.

**Filterable fields:**
- event_type (exact match or wildcard: `radiology.exam.*` matches all exam events)
- module (filter by module)
- department_id (filter by specific department)
- priority (filter by tier)
- patient_id (filter for specific patient — used by UI when viewing a patient)
- entity_type (filter by entity kind)
- previous_state / new_state (filter by specific transition)
- payload fields (filter by values inside the payload — e.g., urgency = 1)

**Subscription examples:**

Automation: "When `radiology.report.critical_finding` fires → send page to referring physician AND ordering physician"

Agent: "Monitor all `emergency.episode.*` events for patterns of increasing volume"

Notification: "When `lab.result.critical` fires → notify ordering physician via push notification, require acknowledgment within 30 minutes, escalate to department head if unacknowledged"

UI: "While user is viewing Check-in environment for CT modalities → stream all `radiology.exam.checked_in` and `radiology.exam.scheduled` events for CT modalities"

Audit: "Subscribe to `*` (everything)"

---

#### 5.8 Error Handling and Escalation

**Retry Strategy by Priority:**

CRITICAL: 3 retries at 10-second intervals → alternative channel (page, SMS, phone) → DLQ with immediate on-call alert → NEVER silently dropped

STANDARD: 5 retries with exponential backoff (1s, 5s, 30s, 2min, 10min) → DLQ for manual review

BACKGROUND: 3 retries with long backoff (1min, 10min, 1hour) → DLQ, no alerting

**Dead Letter Queue (DLQ):**

Separate DLQs per priority tier. Each DLQ entry contains: original event, first attempt timestamp, retry count, failure reason, consumer that failed.

- CRITICAL DLQ: Monitored in real-time, alerts on-call staff, entries never expire
- STANDARD DLQ: Reviewed daily, entries retained 30 days
- BACKGROUND DLQ: Reviewed weekly, entries retained 7 days

**Critical Event Escalation:**

For events requiring acknowledgment (CRITICAL tier):
1. Deliver to primary recipient (0 min)
2. If unacknowledged after 5 min → re-deliver with escalation flag
3. If unacknowledged after 15 min → deliver to supervisor/department head
4. If unacknowledged after 30 min → deliver to on-call administrator
5. All escalation steps logged as events themselves

**Loop Detection:**

Automations can trigger events that trigger other automations. The system detects loops by tracking correlation_id depth. Maximum chain depth: 10. If exceeded, the chain stops and an error event is emitted.

---

#### 5.9 Persistence and Retention

**Storage:**

All events stored permanently (Italian regulatory requirement for clinical records). Storage tiered by age:

- HOT (0-90 days): Fast storage, indexed for real-time queries
- WARM (90 days - 2 years): Standard storage, indexed for search
- COLD (2-10 years): Archive storage, queryable but slower
- ARCHIVE (10+ years): Long-term archive, retrievable on request

**What's Stored:**

Every field of the event structure is stored. Payloads stored in full. No event data is ever discarded.

**GDPR Compliance:**

Patient data in event payloads is encrypted with per-patient keys. If GDPR erasure is legally required (rare in healthcare due to Italian retention laws, but possible for non-clinical data), the patient's encryption key is destroyed, making all their event data unreadable while preserving event stream integrity.

**Replay Capability:**

Events can be replayed from any point in time. This enables:
- Rebuilding system state after failure
- Debugging automation behavior ("what events fired when this happened?")
- Compliance auditing ("show me everything that happened to this patient on this date")
- Training new automations on historical event patterns

---

#### 5.10 Relationship to Other Systems

**Event System → Automation Builder:** Events are the triggers. Every automation starts with "When event X happens..." The Automation Builder UI shows available events from the catalog.

**Event System → Agent Builder:** Events are the agent's senses. Agents continuously monitor event streams to understand what's happening and make decisions.

**Event System → Notification System:** Events that need human attention get routed to the Notification System, which handles delivery channels, preferences, and acknowledgment.

**Event System → Integration Builder:** The Integration Builder can subscribe to internal events and translate them to outbound messages (HL7, FHIR). It can also create internal events from inbound external messages — acting as the "translator" that converts external data into AIRIS-native events.

**Event System → Audit Trail:** The event log IS the audit trail. No separate audit infrastructure needed.

**Event System → UI:** Real-time updates via SSE. The UI subscribes to relevant events based on the user's current context (module, department, environment, assigned modalities).

---

### 6. Cross-Module Order Flow

#### 6.1 Core Principle

Cross-module ordering in AIRIS is simple by design. Because all modules share one database, ordering from one module to another is just a database write and a database read. No messages, no integration, no translation.

This simplicity is the fundamental advantage of AIRIS over traditional multi-system hospital IT, where cross-department ordering requires HL7 messaging, code mapping, acknowledgment protocols, and error handling.

#### 6.2 How It Works

**Step 1 — Order Creation:**
A user in Module A (e.g., Care Unit) creates an order targeting Module B (e.g., Laboratory). The system writes an Order record to the database with:
- source_module (CARE_UNIT)
- source_department_id (Medicina 1)
- target_module (LABORATORY)
- target_department_id (optional — if hospital has multiple lab departments, user selects which; if only one, auto-assigned)
- patient_id
- what's being ordered (reference to target module's catalog/nomenclatore)
- clinical_indication
- urgency
- ordering_user_id

**Step 2 — Order Appears in Target Module:**
Lab staff open their worklist. The worklist queries orders where target_module = LABORATORY. The new order appears automatically. No notification required for the order to be visible — it's the same database. Notifications are a courtesy, not a dependency.

**Step 3 — Target Module Processes the Order:**
Lab processes the order using their normal workflow (their environments, their status progressions, their rules). From Lab's perspective, this order is identical to any other order — they don't need to know or care that it came from Care Unit.

**Step 4 — Results Written:**
Lab completes their work and writes results to the database (test results, validation, etc.).

**Step 5 — Results Visible in Source Module:**
Care Unit physician opens the patient chart. The chart queries results for this patient across all modules. Lab results appear. No integration needed — same database.

#### 6.3 Events Fired

Each step emits events (from the Event System):

- Step 1: `care_unit.order.created_for` (payload: target_module = LABORATORY) → triggers notification to Lab staff
- Step 2: `lab.order.created` (Lab's own event when order enters their workflow)
- Step 4: `lab.test.resulted` / `lab.result.critical` (normal Lab events)
- Step 5: `care_unit.result.received_from` (payload: source_module = LABORATORY) → triggers notification to ordering physician

The correlation_id links all these events together for traceability.

#### 6.4 Order Status Visibility

The ordering module can always see the current status of orders it created. Because it's the same database:

- Care Unit physician orders a lab test → sees status: PENDING
- Lab accessions the specimen → status updates to: IN_PROGRESS (physician sees this in real-time via SSE)
- Lab validates results → status updates to: COMPLETED (physician gets notification)

No polling, no status query APIs — the UI subscribes to events for orders the user cares about.

#### 6.5 Catalog Access

When Module A creates an order for Module B, Module A needs to show Module B's available items (tests, exams, procedures). Because it's one database, Module A reads Module B's catalog directly:

- Care Unit ordering from Lab → shows Lab's test catalog
- ED ordering from Radiology → shows Radiology's exam catalog (nomenclatore)
- Care Unit ordering from Pathology → shows Pathology's available case types

The ordering interface in Module A presents these items using Module B's vocabulary. The user selects what they want, and the order references the exact catalog entry.

#### 6.6 Valid Ordering Paths

Not every module orders from every other module. Valid ordering paths are configured in System Settings:

**Modules that CREATE orders for others (order originators):**
- Care Unit → orders from: Laboratory, Radiology, Cardiology, Gastro, Nuclear Medicine, Pathology, Operating Room
- Emergency → orders from: Laboratory, Radiology, Cardiology, Gastro, Nuclear Medicine
- Operating Room → orders from: Laboratory, Pathology (frozen sections), Radiology

**Modules that RECEIVE orders from others (order receivers/service modules):**
- Laboratory ← receives from: Care Unit, Emergency, Operating Room, Radiology, Gastro, Cardiology, Nuclear Medicine
- Radiology ← receives from: Care Unit, Emergency, Cardiology
- Pathology ← receives from: Gastro (specimens), Operating Room (frozen sections, surgical specimens), Care Unit
- Cardiology ← receives from: Care Unit, Emergency

**Modules that both originate AND receive:**
- Most modules can do both depending on context. Radiology can receive orders AND send orders to Pathology (biopsy specimens from interventional procedures).

**Configuration:**
These paths are configurable per hospital in System Settings. The defaults above represent typical Italian hospital workflows. Hospitals can enable/disable paths based on their organizational structure.

**Enforcement:**
When a user tries to create a cross-module order, the system only shows target modules that are valid for the current module. Invalid paths are not displayed as options.

#### 6.7 What This Replaces

In traditional hospital IT, cross-module ordering requires:
- HL7 ORM messages between systems
- Code mapping tables (Lab system's test codes ≠ EMR's test codes)
- Acknowledgment messages (Lab system confirms receipt)
- Result messages (HL7 ORU back to ordering system)
- Error handling for failed messages
- Integration engine configuration (Mirth channels)
- Monitoring for message failures

In AIRIS, all of this is replaced by: **database writes and database reads.** The Event System provides the notification layer. The single database provides the data consistency.

---

### 7. Notification System — Framework

#### 7.1 What It Is

A consumer of the Event System that translates events into human-facing alerts. It decides who to tell, how, and when.

**What it is NOT:**
- NOT Agent communications — Agents built with the Agent Builder have their own communication capabilities (calling patients, messaging staff). That is a separate system.
- NOT user-to-user messaging — Direct messaging between staff is a future communication tool, not part of the Notification System.
- NOT the Event System — Events exist whether or not anyone is notified. The Notification System subscribes to events and creates notifications from them.

#### 7.2 Notification Channels

- **In-app** — Badge/alert inside AIRIS (user must be logged in to see it)
- **Push notification** — Mobile/desktop push (reaches user even when not in AIRIS)
- **Sound alert** — Audible alert within AIRIS (for Tracking Boards, critical results)
- **Email** — For non-urgent, documentation-style notifications
- **SMS** — For critical escalation fallback when user isn't responding to other channels

Future considerations (not first version): paging system integration, phone call integration. These are complex and hospital-specific.

#### 7.3 Behavior Tiers

Notification behavior maps directly to the Event System's three priority tiers:

**CRITICAL Notifications:**
- ALL channels fire simultaneously (in-app + push + sound + SMS)
- User preferences CANNOT suppress these — patient safety overrides personal settings
- Acknowledgment REQUIRED — user must explicitly confirm they received and read the notification
- Escalation if unacknowledged (follows Event System escalation timeline: 5 min → re-deliver, 15 min → supervisor, 30 min → administrator)
- Examples: Critical lab values, critical radiology findings, code activations, OR count discrepancies, frozen section requests, dialysis access complications, abnormal vitals, triage escalation

**STANDARD Notifications:**
- Channels determined by user preferences
- User CAN suppress, redirect, or change channels for these
- No acknowledgment required
- No escalation
- Examples: Results ready, assignment changes, report signed, order status updates, new orders received, appointment changes

**BACKGROUND Notifications:**
- In-app only (badge/counter)
- Batched (not real-time — grouped and delivered periodically)
- User can completely disable
- Examples: Settings changes, analytics summaries, non-clinical administrative updates

#### 7.4 User Preferences (STANDARD and BACKGROUND Only)

Users configure their notification preferences in My Preferences (available in every module):

- **Per notification type:** Enable/disable each channel (in-app, push, email) for each category of notification
- **Quiet hours:** Suppress non-critical notifications during set time windows (CRITICAL always gets through regardless)
- **Delegation:** "While I'm on leave, send my notifications to Dr. X" — redirects STANDARD notifications to a designated colleague
- **Bundling:** "Group multiple results into one notification instead of one per result" — reduces notification volume for high-frequency events

**CRITICAL notifications are NEVER affected by user preferences.** They always fire on all channels, always require acknowledgment, always escalate. This is a patient safety requirement.

#### 7.5 Alert Fatigue Mitigation

Alert fatigue — where users ignore notifications because there are too many — is a known and serious problem in healthcare IT. This area is explicitly marked for refinement with hands-on experience.

**Initial approach:**
- Conservative defaults: fewer notifications, not more. Users opt IN to additional notifications rather than opting OUT
- System tracks notification volume per user — if a user receives an unusually high volume in a short period, STANDARD notifications are automatically bundled
- CRITICAL notifications are NEVER bundled, suppressed, or affected by volume management
- Notification analytics: the system tracks which notifications are opened, ignored, and dismissed to inform future refinement

**This section will evolve significantly based on real-world usage patterns.**

#### 7.6 Notification Routing

When an event fires, the Notification System determines:

1. **WHO should be notified?** — Based on the event type and context:
   - Order status change → notify the ordering physician
   - Report signed → notify the referring physician
   - Critical lab result → notify the ordering physician (escalate to supervisor if unacknowledged)
   - New order received → notify staff in the target department
   - Assignment change → notify the newly assigned user

2. **HOW should they be notified?** — Based on priority tier and user preferences:
   - CRITICAL → all channels, no preference override
   - STANDARD → user's preferred channels
   - BACKGROUND → in-app badge only

3. **WHEN should they be notified?** — Based on priority tier:
   - CRITICAL → immediately, always
   - STANDARD → immediately unless quiet hours apply, then queued until quiet hours end
   - BACKGROUND → batched, delivered periodically

---

### 8. The Interaction Layer

The AIRIS interaction layer is how the clinician's intent reaches the system. It is the AIRIS implementation of the **dual-surface paradigm** (articulated at VIVA Master Document Section 6) operating on a **consciousness substrate** (VIVA Master Document Section 7). It is the second face of the AIRIS stance: the system absorbs the work of translating between human language and institutional schemas, rather than asking the clinician to perform that translation in form fields.

**The dual-surface paradigm in AIRIS.** Two surfaces work together at all times:

- A **conversation surface** through which the clinician acts on the system using natural language — voice or text, in clinical Italian and the slang of their specialty. The conversation surface shows brief feedback (what was said, what was understood, what the system is doing), focused materialized confirmations when ambiguity or stakes require them, and the active exchange. It does not show content; content lives elsewhere.

- A **content surface** where the system's state and data are visible and manipulable. Patient lists, schedules, charts, worklists, reports, results, agent configurations, regulatory dashboards — everything visible from here, every action invokable by direct manipulation (click, drag, type into field, select from list, scan a barcode).

The two surfaces are perfectly synchronized through a single underlying state. Actions on the conversation surface cause the content surface to update; direct manipulation on the content surface is reflected back. **Every action is available on both surfaces.** No action is locked to one. Neither is "primary" with the other as "fallback"; they are equal-status paths to the same actions. The clinician picks whichever surface fits the moment — speaking when speaking is fastest, clicking when clicking is fastest — without penalty.

**The consciousness substrate.** Underneath both surfaces, AIRIS maintains continuous awareness of the clinical context: who the clinician is, where they are, which patient they are with, what they were just doing, what is pending, what is happening on their ward, what was just said. Without this substrate, neither surface can do its job — the conversation surface cannot infer context (which patient? which order? which view?), the content surface cannot update meaningfully (which view should change?). With it, the clinician speaks once and the system has the full context to interpret meaningfully; they click once and the system has already done the supporting work. The substrate is the largest part of what AIRIS does at runtime, and it is invisible.

> *(See Part I terminology note: "consciousness" / "consciousness substrate" is internal paradigm framing for the unified-event property across surfaces. The technical substance is shared context and state — a six-layer architecture bound by four AIRIS-native contracts, per Part II Section 17 §17.4. Not a claim about machine consciousness.)*

**The operational test.** Every interaction in AIRIS is evaluated by one question: *does this take less time and effort for the clinician than the alternative?* This is the daily form of the displace-vs-extend criterion (VIVA Master Document Section 2). The form of any specific interaction — voice, materialized surface, direct click, silent system action — is whatever serves the principle for that specific moment. The form is not the goal. **No form is sacred.** Materialized surfaces happen when ambiguity-resolution or high-stakes confirmation requires them. Voice happens when the clinician's hands are occupied or speaking is faster. Direct manipulation happens when the content surface is in front of them and clicking is faster. Silent system action happens when context is unambiguous and no decision is required. All of these are part of the interaction layer, and which one applies in any moment is decided by the principle.

**What this is not.** Not a chatbot bolted onto a traditional system. Not a voice assistant. Not a command bar added to an existing GUI. Not a parallel-mode system where the clinician chooses between "AI mode" and "Traditional mode." The dual-surface paradigm is one paradigm with two synchronized surfaces, both first-class, both equally capable.

#### 8.1 Overview

The interaction layer is the primary way clinicians and other users interact with AIRIS. It accepts input through every method that fits the moment — voice, text, touch, click — and routes all of it through the same underlying understanding and state. Both surfaces (conversation and content) are always available; the clinician chooses freely between them, never penalized.

**What the interaction layer is:**
- The implementation of the VIVA dual-surface paradigm (conversation surface + content surface) for AIRIS's clinical domain
- The runtime that maintains the consciousness substrate (continuous awareness of clinical context)
- Context-aware at all times: knows who you are, which module, which patient, what you just did, what's pending, where you are physically
- Universal across all modules: the conversation surface understands every domain's language; the content surface presents every module's state coherently
- Synchronizes actions across both surfaces so neither can drift from the other

**What it is not:**
- NOT a chatbot — the conversation surface is the intent channel, not a Q&A interface
- NOT a voice assistant — brings the clinician INTO the action with synchronized content, not just spoken reports
- NOT a command line — understands natural language, handles ambiguity, infers context
- NOT a clinical decision-making system — executes what the clinician tells it to do
- NOT dictation — speech-to-text for free-form clinical narrative is a separate text input mode handled by the same gateway, not the interaction paradigm itself
- NOT "voice with GUI as fallback" — both surfaces are first-class and equal-status

#### 8.2 Architecture — Three Layers

The interaction layer is structured as three architectural layers, each with a distinct responsibility. These layers together implement both the conversation surface and the content surface, plus the underlying consciousness substrate.

**Layer 1 — The Gateway**

All input — voice, text, touch, click on the conversation surface OR direct manipulation on the content surface — enters through one gateway. The gateway:
- Handles speech-to-text conversion for voice input (ASR)
- Classifies the broad intent (what domain is this about?)
- Manages session context — the live state of the consciousness substrate (see 8.3)
- Routes to the appropriate domain agent based on intent + context
- For content-surface direct manipulation, routes the action directly to action execution without needing language parsing

The gateway is a CORE component. It exists once and serves all modules. There is no per-module gateway, because the clinician should never need to know which module they are addressing — they describe what they are doing, and the gateway figures out which domain handles it.

**Layer 2 — Domain-Specific Agents**

One agent exists per module area. Each agent:
- Understands its department's vocabulary, workflows, and available actions
- Knows what actions it can execute and what parameters those actions need
- Resolves department-specific ambiguity using its vocabulary and the session context

When a radiologist says "schedule this for tomorrow on CT1," the Radiology agent knows:
- "this" = the current exam (from session context: current_patient + current_order)
- "tomorrow" = next calendar day mapped to available schedule slots
- "CT1" = a specific room/modality in this department's configuration

Domain agents exist for each module: Radiology, Laboratory, Emergency, Cardiology, Gastro/Endoscopy, Nuclear Medicine, Pathology, Operating Room, Dialysis, Care Unit, ICU. A Core agent handles cross-module and system-wide actions (patient search, navigation, user preferences, administrative tasks).

**Layer 3 — Action Execution**

Receives structured intent from domain agents — not raw language. The action execution layer:
- Validates permissions (does this user have the right to perform this action?)
- Validates clinical rules (same CDSS checks that GUI actions go through)
- Validates business logic (same rules that GUI actions follow)
- Executes the action against the database
- Returns confirmation to user
- Emits events (same Event System events that GUI actions emit)

**Critical principle: Actions originating from the absorbing interface go through the EXACT same validation path as actions originating from the GUI fallback.** There is no separate execution path. The interaction layer produces structured intent (equivalent to what a button click would produce), and the same application logic handles it from there. This means:
- Same permission checks
- Same business rules
- Same clinical validation
- Same events emitted
- Same audit trail

**The LLM understands language and produces structured intent. Application code validates and executes. The LLM never directly writes to the database.**

#### 8.3 Context — The Disambiguation Engine

The reason natural language works across a complex multi-department system is context. Every interaction layer request carries a session context object:

**user_id** — Who is speaking. Determines permissions, role, language preferences, module access.

**module** — Which module the user is currently in. When a radiologist says "report," the module context resolves this to imaging report. When a pathologist says "report," it resolves to pathology case report. Same word, different meaning, resolved by context.

**department_id** — Which department instance (e.g., "Radiology North Wing" vs. "Radiology South Wing"). Determines which rooms, staff, schedules, and configurations are relevant.

**current_patient** — Which patient is currently selected or active. Enables "schedule him for tomorrow" without saying the patient name.

**current_screen** — What environment or view the user is looking at. If viewing the Scheduling environment, "show me tomorrow" means show tomorrow's schedule. If viewing Archive, "show me tomorrow" might not make sense — the system asks for clarification.

**recent_actions** — What the user just did. Enables "undo that," "change it to Thursday," "actually make it urgent."

**conversation_history** — Recent exchange for multi-turn context. Enables follow-up commands that reference previous ones.

**active_workflow** — If the user is mid-process (e.g., halfway through a check-in flow). The interaction layer understands they're in a specific step and interprets commands accordingly.

The interaction layer engine is universal — one engine for the whole system. The context object is what makes it department-specific at any given moment. This is the architectural implementation of "same language, different vocabulary."

#### 8.4 Safety Tiers

Every action the interaction layer can execute is classified into a risk tier that determines confirmation behavior:

**Tier 1 — View Only (execute immediately, no confirmation)**
- Searching for patients
- Viewing records, results, images, schedules
- Navigation ("take me to scheduling," "open patient Rossi")
- Querying information ("what's the next available CT slot?")
- No confirmation needed — just show the result

**Tier 2 — Routine Actions (brief confirmation)**
- Scheduling and rescheduling appointments
- Routine lab orders, routine imaging orders
- Assignment changes (assign report to Dr. Bianchi)
- Status updates (mark as checked in, mark as completed)
- Brief confirmation: "Scheduling CT abdomen for Rossi, tomorrow 9:00 — confirm?"
- User says "yes" / "confirm" → executed

**Tier 3 — High-Risk Actions (full read-back confirmation)**
- Medication-related orders
- Signing reports (making them legally final)
- Cancelling existing orders
- Procedure scheduling (Operating Room cases)
- Discharge actions
- Full read-back with patient identity: "Confirming: signing radiology report for CT Abdomen, Patient Marco Rossi, date of birth 15 March 1960. Report contains critical finding flagged. Confirm?"
- Critical details stated explicitly (drug names spelled out, doses stated two ways: "fifty milligrams, that's five-zero milligrams")

**Tier 4 — GUI Only (intentionally outside the absorbing interface)**

Some actions are deliberately not available through voice, text, or other absorbing-interface input methods, because the action's risk or sensitivity makes the GUI's explicit, deliberate interaction the right place for it. These actions require the clinician to use the GUI directly. This is not a limitation; it is a design choice. Some decisions should require the clinician to slow down and operate a deliberate interface, and the interaction layer respects that.

**Confidence also gates execution:**
- High confidence (≥85%) → proceed with tier-appropriate confirmation
- Medium confidence (60-85%) → present interpretation for verification before any action
- Low confidence (<60%) → ask for clarification or suggest using the GUI
- These thresholds are starting points and will be refined with real usage data

#### 8.5 The GUI Fallback

The interaction layer accepts voice, text, touch, and click as input methods, all routed through the same understanding. In addition to these, a full traditional graphical user interface — environments, tabs, worklists, buttons, forms — is always available. This is the GUI fallback.

The GUI fallback is not a parallel paradigm to the absorbing interface. It is a part of the same paradigm, used where it serves the clinician better than other input methods. It exists for several specific reasons:

**Regulatory and safety requirements.** Some actions, by classification (Tier 4 above), require deliberate GUI interaction. Some regulatory frameworks (EU AI Act high-risk classification, MDR requirements for clinical decision support) require an explicit human-readable interface for certain decisions.

**Failure recovery.** If the absorbing interface fails to understand a request, or the system's confidence is low, or the network connection to the language model is degraded, the GUI is always there. The clinician is never stranded.

**Precision moments.** Some actions are faster or clearer through direct manipulation than through language — adjusting a complex schedule, comparing several patients in a list, reviewing a long document. The GUI handles these more naturally than voice would.

**Clinician preference in a moment.** Some clinicians, in some moments, prefer to operate the system directly. The system does not penalize this. The GUI is a first-class part of AIRIS, just not the primary paradigm.

The GUI fallback shares the same data, the same actions, the same permissions, the same validation, the same audit trail as everything else in AIRIS. An action performed through the GUI goes through the same path as the same action expressed through any other input method. The system does not distinguish. The outcome is identical; only the means of expression differs.

What makes AIRIS's approach different from existing healthcare IT: the existing market built button-and-click systems, then added "AI features" on top — a chatbot here, a voice assistant there. AIRIS is designed from the ground up where the absorbing interface is the primary paradigm and the GUI is a respected, intentional fallback. That is not a feature difference; it is a generational difference.

#### 8.6 Italian Medical Language

No commercial Italian medical natural-language processing or speech recognition exists at the quality level the AIRIS interaction layer requires. This is a known gap that AIRIS must address as part of building the product:

- **Speech recognition:** Fine-tuned ASR for Italian medical speech, trained on collected Italian clinical dictation data
- **Trilingual vocabulary:** Italian physicians mix Italian (narrative), Latin (anatomy), and English (medical technology, procedures) constantly. The interaction layer must handle this code-switching natively.
- **Module-specific terminology:** Each domain agent maintains its department's vocabulary — RadLex terms for Radiology, LOINC for Laboratory, ICD codes for Emergency, SNOMED for Pathology, etc.
- **This is a build-as-we-go challenge.** Initial versions will have limited vocabulary coverage that expands progressively as real clinical usage data is collected and the system is fine-tuned.

#### 8.7 Relationship to Other Systems

**Interaction Layer → Event System:** Actions originating from the interaction layer emit the same events as actions originating from the GUI fallback. The Event System doesn't know or care which input method produced an action.

**Interaction Layer → Notification System:** The interaction layer can be a delivery channel for notifications (the system surfaces an alert to the user). It can also be used to acknowledge notifications ("acknowledge the critical lab result for Rossi").

**Interaction Layer → Automation Builder / Agent Builder:** Users can create and manage automations and agents through the interaction layer ("create an automation that notifies me when any STAT order comes in for my patients").

**Interaction Layer → Cross-Module Order Flow:** Cross-module orders can be created entirely through the interaction layer ("order a CBC and CMP for patient Rossi" while in the Care Unit module creates Lab orders through the same cross-module flow).

**Interaction Layer → Dictation:** These are separate systems. Dictation (speech-to-text for free-form clinical narrative) is a text input method for composing clinical content. The interaction layer is an intelligent system for executing actions and surfacing interfaces. They coexist — a user can dictate a report (dictation) and then say "sign the report and send to referring physician" (interaction layer command) — but they are architecturally independent.

**Interaction Layer → GUI Fallback:** Seamless switching. A user can be using voice or text input and say "show me the full schedule" — the GUI schedule view appears. They can interact with it directly, then return to voice or text input. Context is preserved across switches.

#### 8.8 What Gets Refined With Experience

Some aspects of the interaction layer cannot be fully specified on paper and will evolve with real-world usage:

- Exact confidence thresholds (85%/60% are starting points)
- Which actions belong in which safety tier (starts conservative, relaxes with data)
- Which actions are Tier 4 / GUI-only initially
- Optimal confirmation flow wording and length
- How much context history to maintain per session
- Voice vs. text performance differences by department
- Department-specific vocabulary coverage depth
- Multi-turn conversation limits before context degrades
- Handling of noisy hospital environments (alarms, background conversations)
- User training and adoption patterns

These are explicitly held as evolution points, not as design failures. A system built to absorb the clinician's work has to learn what that work actually looks like in real hospitals — and that learning is part of the product, not a bug to be fixed before launch.

#### 8.9 Regulatory Considerations

Under the EU AI Act, an interaction layer that drives medication orders and clinical actions falls within high-risk classification. This means:
- Continuous risk management required
- Comprehensive technical documentation
- Human oversight design (the GUI fallback is part of this — and the Tier 4 actions are part of this — and the read-back confirmations for Tier 3 are part of this)
- Post-market monitoring with incident reporting
- Full lifecycle compliance under IEC 62304

Under the EU MDR, depending on the specific clinical decisions the system supports, modules may fall within Class IIa or Class IIb medical device classifications, with the corresponding conformity assessment requirements.

These requirements shape the architecture; they are not afterthoughts. The safety tier system, the GUI fallback, the audit trail through the Event System, the separation of language understanding from action execution — these are all designed with regulatory compliance in mind. They are also philosophy-aligned: regulations exist to protect patients, and the AIRIS stance includes taking the regulatory burden onto the system rather than asking the clinician to carry it. The two pressures point the same direction.

The Regulatory Layer (Section 16) is what handles the externally-facing regulatory plumbing — FSE 2.0 document generation, SDO compilation, NSIS flow submissions, code mapping, audit trail externalization. The interaction layer interfaces with the Regulatory Layer the same way every other part of AIRIS does: it produces events, the Regulatory Layer consumes them, the clinician sees none of the translation work.

### 9. Automation Builder

#### 9.1 What It Is

A tool for creating deterministic, rule-based workflows. No-code visual builder. Automations are hospital-specific custom rules — things that aren't universal enough to build into AIRIS core but that a specific hospital or department needs.

**Key principle:** If every hospital needs the same rule, it's built-in system logic — not an automation. Automations exist for hospital-specific behavior.

**Examples of built-in logic (NOT automations):**
- When all exams on an order reach REPORTED → mark order COMPLETED (universal behavior)
- When patient checks in → create DICOM worklist entry (universal behavior)

**Examples of automations (hospital-specific):**
- "In OUR hospital, when a patient is scheduled for MRI, send preparation SMS 48 hours before"
- "In OUR department, when a report is amended, also notify the department head"
- "When STAT order is pending longer than 30 minutes, escalate visibility on worklist" (threshold is hospital-specific)
- "When echo shows ejection fraction < 30%, auto-schedule cardiology follow-up in 3 months" (follow-up policy is hospital-specific)

#### 9.2 Structure

Every automation has: **Trigger → Conditions (optional) → Actions**

**Trigger:** One event from the Event System catalog. The user picks it from a categorized list — not typing code. Example: `radiology.report.signed`

**Conditions:** Optional filters on the event. "Only when urgency = STAT." "Only when patient age > 65." Multiple conditions combine with AND/OR logic. Without conditions, the automation fires on every occurrence of the trigger event. If someone wants it to only apply to one department, they add a department condition — no artificial scope boundaries.

**Actions:** What happens when the trigger fires and conditions are met. Can be one action or a chain:
- Send notification (to specific user, role, or a contextual recipient like "ordering physician")
- Update a field on the entity (change status, set flag, update priority)
- Create a record (create an order, create a note, create a task)
- Emit another event (which can trigger other automations — with loop detection from Event System, max depth 10)
- Wait (delay before next action — "wait 30 minutes, then check if still unacknowledged")
- Branch (if/else based on a condition — "if critical finding → path A, else → path B")

**AI-powered nodes:** Any action node can optionally use AI for its content:
- "Send notification" where the message body is AI-generated: "Summarize this report in plain language for the referring physician"
- "Branch" where the decision is AI-evaluated: "Read the report text and determine if it contains urgent findings"
- The flow structure remains defined by the user — always trigger → step → step. Individual steps within the flow can be intelligent, but the structure is fixed and designed by the creator.

#### 9.3 Interface

Visual flowchart builder — similar to Make.com or Zapier. Drag-and-drop, no coding required. Designed for **hospital IT staff, clinical informaticists, department administrators, or AIRIS implementers as authors of the workflow canvas** (per V27 persona reframing from Stage 1 Step 1.3: bedside clinicians do not author flowchart automations across every named hospital workflow-automation case in public literature; they consume parameterized hospital templates). See Part II Section 17 §17.11 for stack detail.

Additionally, automations can be created and modified through the interaction layer: "Create an automation that notifies the department head whenever a report is amended in Radiology." The interaction layer creates a draft automation that the author reviews and activates.

#### 9.4 Management

- List of all automations with enable/disable toggle
- Execution history log (when it fired, what it did, what the outcome was)
- Test mode: run against a real event but don't execute actions — show what WOULD happen
- Error log for failed executions

#### 9.5 Key Characteristics

- Instant execution when triggered
- Zero additional cost per run (no LLM inference unless AI-powered nodes are used)
- Fully testable and predictable (same input → same output, except for AI-powered node content)
- All automation actions emit events and are recorded in the audit trail

#### 9.6 This Will Keep Evolving

Automations are explicitly designed to evolve significantly over time. The available action types, condition capabilities, and AI-powered node intelligence will expand as AIRIS matures and real hospital usage reveals new needs. The framework above captures the architectural foundation — not a final feature list.

---

### 10. Agent Builder

#### 10.1 What It Is

A tool for creating AI employees — autonomous virtual workers that operate AIRIS like a human user would. The Agent Builder is where hospitals create workers that handle delegatable tasks: calling patients, managing schedules, following up on pending actions, coordinating workflows.

**The deep integration advantage:** Because AIRIS owns the entire system, agents don't need predefined "skills" or "connectors" like external tools (Lindy, Zapier). The agent accesses AIRIS through the same interaction layer that humans use. Creating orders, checking schedules, sending notifications — these aren't skills to configure. They're just things AIRIS does. The agent's capabilities ARE AIRIS itself, constrained only by the permissions it's granted.

#### 10.2 How Agents Work

An agent is essentially: **a virtual user account + an LLM brain + a goal + permissions + guardrails.**

- The agent uses the interaction layer to operate AIRIS — the same interface human users use
- It monitors events through the Event System to understand what's happening
- It reads data, makes decisions based on its goal and current situation, and takes actions
- Every action goes through the same permission checks, business rules, and clinical validation as human actions
- Every action emits events — the agent's work is fully visible in the Event System and audit trail

#### 10.3 Configuration

**Identity:** Name and description. "Appointment Confirmation Agent — Radiology Department"

**Goal:** Natural language instructions describing the agent's job — its "job description." As detailed or brief as the creator wants.

Example: "Your job is to confirm all radiology appointments 24 hours in advance. Call each patient. If they confirm, mark confirmed in the system. If they want to reschedule, check available slots and offer alternatives. If they cancel, cancel the appointment and notify the department. If you can't reach them after 2 attempts, flag the appointment for manual follow-up."

**Permissions:** Same permission system as human users:
- Module access (which modules it can operate in)
- Department assignment (which departments)
- Role/actions (what it can do — same role definitions human users get)
- The agent CANNOT do anything a human with the same permissions couldn't do

**Communication permissions:** Separate from system permissions:
- Can it contact patients? Via which channels? (Phone, SMS, email)
- Can it message staff? Via which channels?
- Language and tone guidelines
- What information can it share externally

**Guardrails:**
- Action rate limits: "Max 20 reschedules per day"
- Human approval checkpoints: "Require physician approval before cancelling any procedure"
- Scope limits: "Only patients scheduled in Radiology"
- Kill switch: any agent can be stopped instantly by authorized users

**Schedule:** When is the agent active?
- Always on (monitors continuously)
- Scheduled (runs daily at 6am, runs every Monday, etc.)
- Event-activated (starts working when a specific event occurs, stops when goal is met)
- Working hours (active 8am-6pm weekdays only)

**Escalation:** When does the agent hand off to a human? Who does it escalate to? Every agent must have a defined escalation path — required configuration.

#### 10.4 Automation vs Agent — The Distinction

They share the same underlying infrastructure — same Event System, same permissions, same interaction layer, same database. The difference is the degree of autonomy:

**Automation:** You define the exact flow. Step by step. The structure is fixed, designed by the creator. Some steps can use AI for smart content or decisions, but the user designed the chain.

**Agent:** You give broader instructions — a goal. The AI determines how to accomplish it based on the situation. More autonomy, more flexibility, more AI involvement throughout. You don't design the chain — you describe the job.

This is a spectrum of autonomy, not two alien species. They are separated into two tools because the experience of building them is fundamentally different (designing a flowchart vs. writing a job description) and the safety/cost/regulatory profile is different.

#### 10.5 What Makes Agents Hard

- **LLM reliability:** Agents might act on wrong interpretations confidently
- **Cost:** Every decision requires LLM inference — agents consume resources continuously
- **Non-determinism:** Same situation might be handled differently each time
- **Safety:** Permissions alone may not be enough — guardrails (rate limits, approval checkpoints) are essential

**Mitigation:** Start with low-risk agents (appointment confirmations, not medication management). Mandatory guardrails. Full audit trail. Gradual trust expansion as agents prove reliability through usage data.

#### 10.6 Monitoring

Dashboard for each active agent showing:
- Agent status (active, paused, stopped, error)
- Actions taken (log with timestamps)
- Decisions made (reasoning visible for review)
- Escalations triggered
- Errors and failures
- Cost tracking (LLM inference cost)

#### 10.7 This Will Keep Evolving

The Agent Builder will evolve more than any other part of AIRIS. Agent capabilities, guardrail patterns, monitoring depth, and the boundary of what can safely be delegated to an AI employee will all expand over time based on real hospital usage, advancing LLM capabilities, and growing trust. The framework above captures the architectural foundation and principles — not a final feature list.

---

### 11. Integration Builder

#### 11.1 What It Is

The translator between AIRIS and the external world. Manages all external system connections. 100% AIRIS — built from scratch, not wrapping or depending on any external integration engine.

The vision: a fully built-in integration tool inside AIRIS that solves the hospital integration nightmare. Every protocol, every language, every external system — configured and monitored from one place. The Integration Builder is AIRIS's own creation, with the potential to become an industry standard for healthcare integrations — possibly even beyond AIRIS itself.

**Why 100% AIRIS and not wrapping an external engine (like Mirth Connect):**

Wrapping an external engine creates a dependency. AIRIS becomes "AIRIS + Mirth" rather than just AIRIS. The Integration Builder's behavior would be constrained by what the external engine can do. Debugging goes through two layers. Updates to the external engine could break things. The Integration Builder would not truly be AIRIS — it would be a UI wrapper around someone else's tool.

Instead, AIRIS builds its own integration engine from scratch. The core logic — event-driven translation, field mapping, connection management, monitoring — is designed and built as part of AIRIS. For protocol-level implementation (parsing HL7 messages at the byte level, handling FHIR resource structures), AIRIS can use open-source libraries and tools as building blocks. The distinction: using a library to parse an HL7 message is like using a dictionary to translate a word — the translation is yours, the dictionary is a reference tool. Wrapping an entire engine is like hiring a translator and putting your logo on their work.

The approach to specific protocol implementations remains open to exploration. For some protocols, building from scratch may be the right choice. For others, existing open-source libraries may provide solid foundations to build on. The decision is made per protocol based on what produces the best result. What is NOT open to exploration: the architecture, the user experience, the event-driven model, and the configuration interface are 100% AIRIS.

#### 11.2 How It Works

**What users see:** An AIRIS configuration screen where they set up, manage, and monitor external connections.

**What they never see:** The underlying integration engine. All configuration happens through AIRIS.

**Setup flow:**
1. "Add new integration"
2. Select type: HL7 v2.x inbound, HL7 v2.x outbound, FHIR endpoint, custom API, lab analyzer connection, file-based interface
3. Configure connection details (address, port, protocol, authentication)
4. Map data fields visually: external field → AIRIS field. Drag and drop, not code.
5. Define which events trigger outbound messages (subscribes to Event System)
6. Define what happens with inbound messages (creates AIRIS records/events)
7. Test with sample messages
8. Activate

#### 11.3 Relationship to Event System

The Integration Builder is both a consumer and producer of events:

**Outbound:** Subscribes to internal events and translates them to external messages. Example: `radiology.exam.checked_in` → generates HL7 ORM message → sends to PACS.

**Inbound:** Receives external messages → translates to AIRIS-native data → writes to database → emits internal events. Example: Lab analyzer sends results → Integration Builder creates `lab.test.resulted` event.

#### 11.4 Supported Protocols

- HL7 v2.x (most common in Italian hospitals today)
- FHIR R4/R5 (emerging standard)
- DICOM (network level communication)
- Custom REST/SOAP APIs
- File-based interfaces (CSV/XML drop folder — some older lab equipment still works this way)
- Any protocol supported by the underlying integration engine

#### 11.5 Italian-Specific Integrations

- FSE 2.0 (Fascicolo Sanitario Elettronico — Italian national electronic health record)
- Regional health information exchanges
- SIED standards (gastroenterology)
- Italian billing/administrative systems (SDO flows)
- NSIS (Nuovo Sistema Informativo Sanitario)

#### 11.6 PACS Integration

PACS is the primary external system for imaging departments:

- **DICOM Worklist:** When patient checked in → AIRIS sends worklist entry → modality pulls patient info (managed by DICOM Worklist Manager, see Section 12)
- **Image Availability:** AIRIS queries PACS for images, launches PACS viewer (external to AIRIS)
- **Prior Exam Retrieval:** AIRIS requests prior studies from PACS for comparison
- **Study Received:** PACS notifies AIRIS when images are stored after acquisition

#### 11.7 Monitoring

Dashboard per integration showing:
- Message flow (volume, direction, timing)
- Success/failure rates
- Latency
- Last message timestamp
- Error queue with failed messages for review
- Connection status (up/down/degraded)

---

### 12. DICOM Worklist Manager

#### 12.1 What It Is

A hospital-wide management and configuration tool for all DICOM modalities and their worklists. Not a builder — a device management system. Lives in System Tools alongside the Builders, providing a single view of every DICOM-connected device across the entire hospital.

#### 12.2 What It Manages

**Modality Registration:** All DICOM devices across all departments:
- Device identity (name, AE title, IP address, port)
- Device type (CT, MRI, X-ray, Ultrasound, Echo, Gamma Camera, Endoscopy recorder, etc.)
- Which department(s) the device serves (supports shared modalities — a CT used by both Radiology and Emergency)
- Connection status and health monitoring

**Worklist Configuration:** Per modality:
- When worklist entries are created (on check-in, on scheduling, configurable per modality)
- What data gets sent to the modality (patient name, ID, procedure description, accession number, etc.)
- Worklist entry lifecycle (creation, update when exam details change, deletion when exam cancelled)

**Study Received:** Detection and routing when images arrive back from a modality after acquisition.

#### 12.3 Hospital-Wide View

The key advantage of placing DICOM Worklist Manager in System Tools: one screen shows every imaging device in the hospital. This enables:
- Seeing all modalities across all departments
- Managing shared modalities (a CT scanner used by Radiology and Emergency)
- Monitoring connectivity status hospital-wide
- Centralized troubleshooting when devices go offline

Individual departments still see and interact with their own modalities through their module interface — but the DICOM Worklist Manager provides the administrative overview.

#### 12.4 Relationship to Integration Builder

DICOM Worklist Manager handles the specific modality-to-AIRIS relationship (worklist generation, study reception). Integration Builder handles broader system-to-system connections (PACS communication, HL7 flows). They are complementary — the Worklist Manager may use Integration Builder infrastructure for the underlying DICOM network communication, but presents a modality-specific management interface rather than a generic integration configuration screen.

---

### 13. Audit Trail

#### 13.1 What It Is

A permanent, immutable record of every significant action in AIRIS. Exists for legal compliance, regulatory requirements, and accountability. The answer to "who did what, when, and to what."

#### 13.2 How It Works

The Audit Trail is a consumer of the Event System. When events occur, the Audit Trail captures and stores them permanently. Not every event — BACKGROUND events like UI interactions or batch processing progress don't need permanent legal records. The Audit Trail stores CRITICAL and STANDARD events as immutable records.

#### 13.3 What Gets Recorded

- Every clinical action (orders created, modified, cancelled)
- Every report action (created, signed, amended, addended)
- Every patient record access (who viewed which patient — required by Italian privacy law and GDPR)
- Every status change on clinical entities
- Every user login/logout
- Every permission change
- Every agent action (full accountability for AI employees)
- Every automation execution
- Every interaction layer command (voice or text) that resulted in an action

#### 13.4 What Each Record Contains

- Timestamp
- User (or agent) who performed the action
- Action type
- Entity affected (which patient, which order, which report)
- Before/after values for modifications
- Source (GUI, INTERACTION_LAYER, automation, agent)
- Module and department context

#### 13.5 Immutability

Audit records cannot be modified or deleted. Ever. Not by administrators, not by system settings, not by anyone. This is a regulatory and legal requirement.

#### 13.6 Retention

Permanent. Unlike Event System events which have tiered retention (CRITICAL 7 years, STANDARD 1 year, BACKGROUND 90 days), audit records are kept for the life of the system. Italian healthcare law requires minimum 10 years for clinical records, but practically there's no reason to ever delete them.

#### 13.7 Query Interface

Users with appropriate permissions can search the audit trail by patient, by user, by action type, by date range, by module. Example: "Show me every access to patient Rossi's record in the last 30 days" or "Show me every report signed by Dr. Bianchi this week."

#### 13.8 Access Control

Only users with specific audit permissions can access the Audit Trail. Typically hospital administrators, compliance officers, and privacy officers. Regular clinical staff cannot browse the audit trail.

---

### 14. Database (Backend Infrastructure)

**Critical Understanding:**
- Database is BACKEND infrastructure
- Users NEVER see or interact with database directly
- Users only see AIRIS interfaces (modules, screens, natural language)
- Database works invisibly behind everything

**Design Approach:**
- Design complete database structure BEFORE building (blueprint)
- Ensures modules can share data smoothly
- Prevents having to rebuild later
- Makes "one patient" really mean one patient everywhere

**Universal Structure with Module-Specific Interpretation:**
- Same tables and relationships
- Modules interpret data using their own vocabulary
- Example: Order table used by all modules, but Radiology sees "Exam", Lab sees "Test"

### 15. Patient Flow Layer — Hospital-Wide Infrastructure

**Purpose:** Manage the complete lifecycle of patient movement through the hospital — from pre-admission through discharge — providing every department with real-time awareness of where patients are, which beds are available, and how to coordinate transitions between care settings.

**Why this is CORE infrastructure, not a module:**
Beds, patient location, and movement coordination are consumed by EVERY department. Emergency needs bed availability for admissions. OR needs post-op bed assignments. Radiology needs to know if an inpatient is being transported for their scan. Wards need to know when their patient returns from a procedure. No single module owns patient flow — the hospital does.

**Five Components:**

1. **ADT Service** — Encounter lifecycle, admission/discharge/transfer workflows, HL7 ADT event journal
2. **Bed Management Engine** — Bed state machine, assignment optimization, turnaround cascade, capacity tracking
3. **Transport Dispatch** — Request, assign, track patient movement between departments
4. **Patient Location Service** — Single authoritative real-time patient position
5. **Transition Handoff Generator** — Auto-compiled clinical summaries at every handoff point

**Scalability:**
All five components exist in every AIRIS installation. Complexity scales with hospital size:
- Small hospital (< 100 beds): Manual bed assignment, no dedicated transport team, basic capacity dashboard
- Medium hospital (100-500 beds): Assisted bed assignment with recommendations, transport dispatch, capacity forecasting
- Large hospital (500+ beds): Full optimization engine, centralized transport, predictive AI, command center dashboard

---

#### Core Data Structures

##### Encounter (Ricovero) — Primary Entity

The encounter is the central tracking entity for every inpatient episode. Lives here because encounters are hospital-wide — Emergency creates them, OR references them, every ward consumes them.

```
encounter_id (unique, auto-generated)
encounter_number (visible identifier, e.g., "RIC-2026-001234")
patient_id (FK -> Patients)
parent_encounter_id (FK -> Encounter, nullable — for child encounters during transfers)

// Pre-Admission (nullable — populated for scheduled admissions)
pre_admission_date (date, when scheduled)
pre_admission_source (ELECTIVE_SURGERY | DIRECT_ADMIT | PLANNED_TRANSFER)
expected_admission_date
expected_los_days (estimated)

// Admission
admission_datetime (timestamp)
admission_type (URGENTE | PROGRAMMATO | TSO | TRASFERIMENTO)
admission_source (PS | ALTRO_OSPEDALE | DOMICILIO | AMBULATORIO | ALTRA_STRUTTURA)
admission_ward_id (FK -> Ward)
admission_bed_id (FK -> Bed)
admission_diagnosis_text (free text)
admission_diagnosis_icd (ICD code, optional at admission)
admission_physician_id (FK -> Users)

// Current State
status (EncounterStatus enum)
sub_status (EncounterSubStatus enum, nullable)
current_ward_id (FK -> Ward)
current_bed_id (FK -> Bed)
current_attending_id (FK -> Users)
current_primary_nurse_id (FK -> Users)
temporary_location_id (FK -> Location, nullable — when off-ward)

// Clinical Flags (quick-reference, maintained by clinical modules)
code_status (FULL_CODE | DNR | DNI | COMFORT_ONLY)
isolation_type (NONE | CONTACT | DROPLET | AIRBORNE | PROTECTIVE)
isolation_reason (free text, nullable)
fall_risk_level (LOW | MODERATE | HIGH)
vte_risk_score (integer, Caprini or Padua)
allergy_status (NONE | KNOWN | UNKNOWN)

// Discharge
discharge_datetime (timestamp)
discharge_type (ORDINARIA | VOLONTARIA | TRASFERIMENTO | DECESSO | TSO_REVOCA)
discharge_destination (DOMICILIO | ALTRA_STRUTTURA | RSA | RIABILITAZIONE | DECEDUTO)
discharge_diagnosis_principal_icd (ICD code — derived by Regulatory Layer code-mapping subsystem from clinical discharge diagnosis; CIPI from January 2027)
discharge_diagnosis_secondary_icd (array, up to 5 — same derivation)
discharge_procedure_principal_icd (ICD code — derived by Regulatory Layer from clinical procedure documentation)
discharge_procedure_secondary_icd (array, up to 5 — same derivation)
esito_code (Italian outcome code — derived by Regulatory Layer from discharge_type and clinical content)
drg_code (calculated by Regulatory Layer DRG grouper from diagnosis and procedure codes)
los_days (calculated: discharge - admission)

// SDO/LDO
sdo_id (FK -> SDO, when generated)
ldo_id (FK -> LDO, when generated)
sdo_transmitted (boolean)
ldo_transmitted_fse (boolean)

// Discharge Prediction (populated by system when enabled)
predicted_discharge_date (date, nullable)
predicted_discharge_confidence (float, nullable)
discharge_readiness_score (float, nullable)

created_at, updated_at, created_by_user_id
```

##### EncounterStatus

```
PRE_ADMITTED       // Scheduled admission, not yet arrived
ADMITTED           // Initial state after ADT admission
ACTIVE             // Normal inpatient care
DISCHARGE_PENDING  // Discharge order entered, awaiting completion
DISCHARGE_READY    // All discharge criteria met, awaiting physical departure
DISCHARGED         // Episode complete, patient left
TRANSFERRED_OUT    // Transferred to another facility (encounter ends)
DECEASED           // Patient died during encounter
CANCELLED          // Pre-admission cancelled before arrival
```

##### EncounterSubStatus

```
IN_ROOM            // Patient is in their assigned bed (default when no sub_status)
OFF_WARD_PROCEDURE // Patient is at a service department (Radiology, OR, etc.)
OFF_WARD_TRANSIT   // Patient is being transported between locations
ON_LEAVE           // Authorized temporary leave (permesso)
```

##### Location Hierarchy

Physical hospital structure. Separate from organizational structure (departments). A ward is a physical place; a department is an organizational unit. One department can operate across multiple wards.

```
Facility {
  facility_id, name, code
  address, city, region
  facility_type (OSPEDALE_BASE | DEA_I | DEA_II)
  ministry_code (codice struttura)
}

Building {
  building_id, facility_id, name, code
}

Floor {
  floor_id, building_id, floor_number, name
}

Ward {
  ward_id, floor_id, name, code
  ward_type (MEDICAL | SURGICAL | PEDIATRIC | PSYCHIATRIC | REHABILITATION | MATERNITY | ICU | STEP_DOWN | OBSERVATION)
  department_id (FK -> Department — organizational owner)
  total_beds, active_beds (calculated)
  is_active (boolean)
  accepting_admissions (boolean — can be turned off during surge/closure)
  gender_policy (MIXED | MALE_ONLY | FEMALE_ONLY | ROOM_SEPARATED)
}

Room {
  room_id, ward_id, room_number
  room_type (STANDARD | ISOLATION_NEGATIVE_PRESSURE | ISOLATION_POSITIVE_PRESSURE | PRIVATE | SEMI_PRIVATE)
  max_beds (integer)
  has_bathroom (boolean)
  has_telemetry (boolean)
}

Bed {
  bed_id, room_id, bed_identifier
  full_identifier (computed: "Med1-101-A" — ward-room-bed)
  status (BedStatus enum)
  status_changed_at (timestamp)
  current_encounter_id (FK -> Encounter, nullable)
  reserved_for_encounter_id (FK -> Encounter, nullable — for pending admissions)
  reservation_expires_at (timestamp, nullable)
  features (array: TELEMETRY, BARIATRIC, CARDIAC_MONITOR, VENTILATOR_READY, NEGATIVE_PRESSURE, etc.)
  is_active (boolean — false for permanently decommissioned beds)
  is_surge (boolean — true for temporary/hallway beds activated during surge)
  version (integer — for optimistic locking on concurrent assignment)
}
```

##### BedStatus — Full State Machine

```
States:
  AVAILABLE          // Clean, ready for patient
  RESERVED           // Claimed for incoming patient (soft lock with timeout)
  OCCUPIED           // Patient in bed
  OCCUPIED_PENDING_DISCHARGE  // Patient in bed, discharge order entered
  OCCUPIED_OFF_WARD  // Patient temporarily away (procedure, transport)
  VACATED            // Patient left, bed needs cleaning
  CLEANING_REQUESTED // EVS notified, awaiting pickup
  CLEANING_IN_PROGRESS // EVS actively cleaning
  BLOCKED            // Unavailable (maintenance, isolation prep, administrative)
  SURGE_INACTIVE     // Surge bed, not currently activated

Transitions:
  AVAILABLE -> RESERVED (bed claimed for admission, timeout set)
  AVAILABLE -> BLOCKED (maintenance, administrative hold)
  RESERVED -> OCCUPIED (patient physically arrives)
  RESERVED -> AVAILABLE (reservation timeout expired or cancelled)
  OCCUPIED -> OCCUPIED_PENDING_DISCHARGE (discharge order placed)
  OCCUPIED -> OCCUPIED_OFF_WARD (patient leaves for procedure/transport)
  OCCUPIED_OFF_WARD -> OCCUPIED (patient returns)
  OCCUPIED_PENDING_DISCHARGE -> OCCUPIED (discharge cancelled)
  OCCUPIED -> VACATED (patient physically departs — discharge or transfer)
  OCCUPIED_PENDING_DISCHARGE -> VACATED (patient physically departs)
  VACATED -> CLEANING_REQUESTED (auto-triggered on vacate)
  CLEANING_REQUESTED -> CLEANING_IN_PROGRESS (EVS starts)
  CLEANING_IN_PROGRESS -> AVAILABLE (cleaning complete)
  CLEANING_IN_PROGRESS -> BLOCKED (contamination detected)
  BLOCKED -> AVAILABLE (block removed)
  SURGE_INACTIVE -> AVAILABLE (surge activated)
  AVAILABLE -> SURGE_INACTIVE (surge deactivated)

Cleaning Priority (set when VACATED):
  STAT     // 45 min target — incoming critical patient identified
  NEXT     // 60 min target — admission pending in queue
  NORMAL   // 120 min target — routine turnover
  TERMINAL // Deep clean required (isolation, extended stay, death)
```

##### BedRequest

The entity between "admit decision" and "bed assignment." Created when any source requests an inpatient bed.

```
bed_request_id, patient_id, encounter_id (nullable — created after assignment for new admissions)
requesting_source (ED | OR_PACU | DIRECT_ADMIT | EXTERNAL_TRANSFER | INTER_WARD_TRANSFER | ELECTIVE_SCHEDULING)
requesting_user_id, requesting_department_id
request_datetime

// What's needed
required_level_of_care (ICU | STEP_DOWN | TELEMETRY | MED_SURG | OBSERVATION | PSYCHIATRIC | REHABILITATION | MATERNITY | PEDIATRIC)
required_specialty (nullable — e.g., Cardiology, Neurology, Oncology)
required_isolation (NONE | CONTACT | DROPLET | AIRBORNE | PROTECTIVE)
required_features (array: TELEMETRY, BARIATRIC, VENTILATOR_READY, etc.)
patient_gender (for gender-separation rules)
patient_age (for pediatric/adult assignment)

// Priority
priority (1_EMERGENCY | 2_URGENT | 3_ROUTINE | 4_SCHEDULED)
clinical_notes (free text — reason for admission, relevant clinical context)

// Assignment
status (PENDING | ASSIGNED | ACCEPTED | PATIENT_EN_ROUTE | PATIENT_ARRIVED | CANCELLED | EXPIRED)
assigned_ward_id (FK -> Ward, nullable)
assigned_bed_id (FK -> Bed, nullable)
assigned_by_user_id (nullable)
assigned_datetime (nullable)
accepted_by_user_id (nullable — ward charge nurse acceptance)
accepted_datetime (nullable)

// Timing
target_placement_minutes (calculated from priority: emergency=30, urgent=60, routine=120, scheduled=pre-assigned)
actual_placement_minutes (calculated: assigned_datetime - request_datetime)

cancelled_reason, cancelled_by_user_id, cancelled_datetime
```

##### TransportRequest

```
transport_request_id, patient_id, encounter_id
requesting_user_id, request_datetime

// Journey
origin_location_id (FK -> Location — ward, room, or bed level)
destination_location_id (FK -> Location)
return_transport_needed (boolean)
return_request_id (FK -> TransportRequest, nullable — linked return trip)

// Requirements
priority (EMERGENCY | URGENT | ROUTINE | SCHEDULED)
scheduled_datetime (nullable — for scheduled transports)
transport_mode (WHEELCHAIR | STRETCHER | BED | AMBULATORY | ISOLETTE)
equipment_needed (array: IV_POLE, O2_TANK, CARDIAC_MONITOR, VENTILATOR, ISOLATION_KIT, etc.)
isolation_precautions (NONE | CONTACT | DROPLET | AIRBORNE)
patient_weight_category (STANDARD | BARIATRIC — affects staffing)
clinical_notes (free text — NPO status, fall risk, oxygen requirement, code status)

// Assignment
status (REQUESTED | DISPATCHED | EN_ROUTE_TO_PICKUP | AT_PICKUP | IN_TRANSIT | DELIVERED | RETURN_REQUESTED | CANCELLED)
assigned_transporter_id (FK -> Users, nullable)
dispatched_datetime
pickup_datetime
in_transit_datetime
delivered_datetime

// Timing
target_response_minutes (from priority: emergency=immediate, urgent=15, routine=30-60, scheduled=at_time)
actual_response_minutes (calculated)

cancelled_reason, cancelled_by_user_id
```

##### TransitionHandoff

Auto-generated clinical summary at every transition point. Distinct from Care Unit's shift handoff — this is inter-department/inter-ward clinical handoff.

```
handoff_id, patient_id, encounter_id
handoff_type (ED_TO_WARD | WARD_TO_WARD | WARD_TO_PROCEDURE | PROCEDURE_TO_WARD | WARD_TO_OR | OR_TO_WARD_PACU | WARD_TO_ICU | ICU_TO_WARD | ADMISSION | DISCHARGE)

// Who
from_department_id, from_location_id, from_user_id
to_department_id, to_location_id, to_user_id (nullable — assigned at acceptance)

// When
generated_datetime (auto-generated)
sent_datetime
acknowledged_datetime, acknowledged_by_user_id

// Auto-compiled Content (SBAR/I-PASS structure)
illness_severity (STABLE | WATCHER | CRITICAL)

// Situation
chief_complaint, current_diagnosis, reason_for_transfer

// Background (auto-populated from chart)
relevant_history (auto-compiled: active problems, surgical history, allergies)
current_medications (auto-snapshot from active med list)
recent_vitals (auto-snapshot: last set of vital signs)
recent_labs (auto-snapshot: last 24h abnormal results)
recent_imaging (auto-snapshot: last 24h results)

// Assessment
current_status_summary (auto-generated or manually entered)
active_issues (array: problem, current_treatment, trend)

// Recommendation / Action Items
pending_orders (auto-snapshot: orders awaiting completion)
pending_results (auto-snapshot: tests ordered but not resulted)
action_items (array: what needs to happen next)
contingency_plans (if X happens, do Y)

// Administrative
code_status, isolation_precautions, fall_risk, allergy_alerts
equipment_accompanying (IV, O2, monitors)
family_contact_info, family_notified (boolean)

// Annotations
sender_notes (free text additions by sending clinician)
receiver_notes (free text by receiving clinician)
```

##### ADTEvent — Immutable Event Journal

Separate from the general Event System. This is the HL7-standard ADT audit record for regulatory compliance, billing, and external system interoperability.

```
adt_event_id (auto-generated, sequential)
event_type (ADTEventType enum — mapped to HL7 A01-A62)
event_datetime (timestamp, immutable)

patient_id, encounter_id
patient_class (INPATIENT | OUTPATIENT | EMERGENCY | OBSERVATION | DAY_HOSPITAL)

// Location at time of event
from_location (facility, building, floor, ward, room, bed — denormalized snapshot)
to_location (facility, building, floor, ward, room, bed — denormalized snapshot)

// People involved
attending_physician_id
admitting_physician_id (nullable)
referring_physician_id (nullable)
performed_by_user_id

// Clinical context at time of event
diagnosis_codes (array of ICD codes, snapshot)
admission_type, admission_source (for A01)
discharge_type, discharge_destination (for A03)

// Metadata
source (GUI | INTERACTION_LAYER | AUTOMATION | AGENT | EXTERNAL_SYSTEM)
hl7_message_id (nullable — if generated/received as HL7 message)
fhir_encounter_version (nullable — FHIR version tracking)
notes

// Immutability
record_hash (SHA-256 hash including previous record — chain integrity)
```

##### ADTEventType (mapped to HL7v2)

```
ADMIT                  // A01 — Patient admitted to bed
TRANSFER               // A02 — Patient transferred between wards
DISCHARGE              // A03 — Patient discharged
REGISTER               // A04 — Outpatient/ED registration
PRE_ADMIT              // A05 — Scheduled admission created
UPDATE_PATIENT_INFO    // A08 — Demographics or clinical info updated
PATIENT_DEPARTING      // A09 — Patient temporarily leaving assigned location
PATIENT_ARRIVING       // A10 — Patient arriving at temporary location
CANCEL_ADMIT           // A11 — Admission reversed
CANCEL_DISCHARGE       // A13 — Discharge reversed
CANCEL_TRANSFER        // A12 — Transfer reversed
PENDING_ADMIT          // A14 — Admission expected (bed requested)
PENDING_TRANSFER       // A15 — Transfer expected
PENDING_DISCHARGE      // A16 — Discharge expected
SWAP_PATIENTS          // A17 — Two patients swap beds
BED_STATUS_UPDATE      // A20 — Bed state change
PATIENT_ON_LEAVE       // A21 — Authorized temporary leave
PATIENT_RETURN_LEAVE   // A22 — Return from leave
MERGE_PATIENT          // A40 — Patient records merged
```

---

#### ADT Service

**Purpose:** Manage the complete encounter lifecycle and coordinate admission workflows from all sources.

##### Admission Workflows

Every admission follows: Admission Decision → Bed Request → Bed Assignment → Patient Movement → Bed Arrival → ADT Admit Event. The source determines how the workflow starts:

**From Emergency Department:**
1. ED physician selects disposition "Admit" with target level of care and specialty
2. System auto-creates BedRequest (source: ED, priority based on patient acuity)
3. Bed Management Engine processes request
4. Bed assigned → ED notified with destination
5. TransitionHandoff auto-generated (ED_TO_WARD type, compiled from ED clinical data)
6. Transport auto-requested (if patient cannot walk)
7. Patient physically moved → status updates at each milestone
8. Patient arrives at ward → encounter created (or updated from pre-admit), ADT A01 emitted
9. Receiving nurse acknowledges handoff
10. ED episode closed, encounter active

**From Operating Room / PACU:**
1. Surgical case nearing completion → PACU or floor bed needed
2. System auto-creates BedRequest (source: OR_PACU) — ideally pre-created when surgery scheduled
3. Bed assigned → OR/PACU notified
4. TransitionHandoff auto-generated (OR_TO_WARD_PACU type, compiled from surgical/anesthesia data)
5. Transport arranged → patient moved → bed arrival → ADT A01 or A09/A10

**Elective/Scheduled Admission:**
1. Admission scheduled days/weeks ahead → encounter created with PRE_ADMITTED status, ADT A05
2. Bed pre-assigned or request queued for day of admission
3. Patient arrives at admissions → registration completed
4. Bed confirmed → patient directed to ward
5. Patient arrives → encounter status → ADMITTED → ADT A01

**Direct Physician Admission:**
1. Physician (e.g., from ambulatory clinic) places admission order
2. BedRequest created (source: DIRECT_ADMIT)
3. Standard bed assignment and movement flow

**External Transfer (from another hospital):**
1. Transfer center receives request with clinical summary
2. BedRequest created (source: EXTERNAL_TRANSFER, priority based on clinical urgency)
3. Bed assigned → accepting physician confirmed
4. Patient arrives → registration + encounter creation → ADT A01
5. External clinical data imported/attached to encounter

##### Transfer Workflow (Between Wards)

1. Transfer order placed (by physician or bed management) with reason (clinical step-up/step-down, bed management, isolation)
2. BedRequest created (source: INTER_WARD_TRANSFER) for destination
3. Destination bed assigned
4. TransitionHandoff auto-generated (WARD_TO_WARD type)
5. Transport requested
6. Patient moved → LocationHistory entry closed for origin, new entry opened for destination
7. ADT A02 emitted
8. Receiving nurse acknowledges handoff

##### Discharge Workflow (Hospital-Wide Perspective)

1. Discharge order entered → encounter status → DISCHARGE_PENDING, ADT A16 emitted
2. Bed status → OCCUPIED_PENDING_DISCHARGE (visible to bed management as "bed coming available")
3. Clinical discharge tasks completed in Care Unit (medication reconciliation, LDO, SDO, instructions)
4. All criteria met → encounter status → DISCHARGE_READY
5. Patient physically leaves → encounter status → DISCHARGED, ADT A03 emitted
6. Bed status → VACATED → auto-triggers cleaning cascade
7. SDO auto-compiled and queued for regional transmission
8. LDO auto-generated in CDA R2, transmitted to FSE 2.0

##### Concurrent Access Control

Bed assignment uses optimistic locking:
- Each bed record has a `version` field
- Assignment attempts include version check: `UPDATE beds SET status='RESERVED', version=version+1 WHERE bed_id=? AND version=? AND status='AVAILABLE'`
- If zero rows affected → conflict detected → user prompted to refresh
- Reservation pattern: bed claimed with 15-minute timeout, visible to other users as RESERVED

---

#### Bed Management Engine

**Purpose:** Track every bed in the hospital, optimize assignment, manage turnaround, and provide capacity intelligence.

##### Hospital-Wide Bed Board

Central dashboard showing ALL beds across ALL wards. Not a replacement for each ward's Census environment — an addition for bed management staff and administrators.

**Views:**
- **Grid view:** Ward x Bed matrix, color-coded by status, patient preview on hover
- **Floor plan view:** Physical layout with bed positions (configurable per hospital)
- **Summary view:** Occupancy by ward, level of care, specialty — with drill-down
- **Pending view:** All active BedRequests awaiting assignment, sorted by priority and wait time

**Key Metrics (real-time):**
- Total beds, occupied, available, in cleaning, blocked
- Occupancy % by ward, by level of care, by specialty
- Pending admissions count and average wait time
- Pending discharges count and expected availability time
- ED boarding count (patients waiting for inpatient beds)
- Bed turnaround time (rolling average)

##### Bed Assignment Logic

Two-tier constraint model:

**Hard constraints (must satisfy — violating these blocks assignment):**
- Correct level of care (ICU patient cannot go to med/surg bed)
- Isolation match (airborne isolation needs negative pressure room)
- Gender separation (per room in wards with gender_policy = ROOM_SEPARATED)
- Age-appropriate (pediatric vs adult)
- Bed features match requirements (ventilator-ready, telemetry, bariatric)
- Ward accepting admissions (accepting_admissions = true)

**Soft constraints (scored, optimized when possible):**
- Specialty affinity (cardiology patient near cardiology-staffed ward) — weight: HIGH
- Minimize subsequent transfers (avoid overflow if appropriate bed expected soon) — weight: HIGH
- Acuity-based proximity (higher acuity closer to nurses station) — weight: MEDIUM
- Room type preference (private vs semi-private, when clinically equivalent) — weight: LOW
- Geographic clustering (keep same-nurse patients nearby) — weight: LOW
- Historical discharge pattern (prefer beds in wards with earlier expected discharges if capacity tight) — weight: LOW

**Assignment modes:**
- **Manual:** Bed manager picks bed, system validates hard constraints only
- **Assisted:** System recommends top 3 beds with scores, human picks (default)
- **Auto-assign:** System assigns best available bed, human confirms (large hospitals)

##### Bed Turnaround Cascade

Automatic sequence triggered on every patient departure:

```
Patient departs (discharge or transfer out)
  -> Bed status: VACATED
  -> Cleaning priority calculated:
      - If BedRequest pending with this bed's ward/features -> STAT or NEXT
      - If no pending request -> NORMAL
      - If isolation or terminal -> TERMINAL
  -> Bed status: CLEANING_REQUESTED
  -> Notification sent to EVS team (with priority, location, type)
  -> EVS accepts task -> Bed status: CLEANING_IN_PROGRESS
  -> EVS completes -> Bed status: AVAILABLE
  -> If BedRequest pending -> auto-assigns to highest priority request
```

**Target turnaround times:**
- STAT: 45 minutes (bed needed for incoming critical)
- NEXT: 60 minutes (admission pending)
- NORMAL: 120 minutes (routine)
- TERMINAL: variable (deep clean)

**EVS tracking is lightweight in AIRIS.** AIRIS is not an EVS management system. It tracks: cleaning requested, cleaning started, cleaning completed. Hospitals with dedicated EVS systems can integrate via Integration Builder.

##### Capacity Management

**Real-time capacity dashboard:**
- Hospital-wide occupancy with 85% threshold warning, 90% critical alert
- Per-ward and per-level-of-care breakdown
- ED boarding count with time-in-ED tracker
- Predicted beds available in next 4/8/12/24 hours (based on pending discharges and scheduled admissions)

**Predictive capacity (when enabled):**
- Discharge prediction: probability of discharge within 24/48/72 hours per patient, based on diagnosis, LOS, clinical signals, historical patterns
- Admission forecast: expected admissions by source (ED trend, scheduled surgeries, historical day-of-week pattern)
- Net capacity forecast: predicted available beds by hour for next 24-72 hours
- Alerts when predicted demand exceeds predicted supply

**Surge protocols (configurable per hospital):**
- Level 1 (occupancy > 85%): Alert bed management, accelerate discharge review
- Level 2 (occupancy > 90%): Activate surge beds, expedite discharges, hold elective admissions
- Level 3 (occupancy > 95%): Full capacity protocol — distribute ED boarders to wards, activate all flex spaces
- Level 4 (at capacity): Ambulance diversion consideration, cancel elective surgeries

Each level triggers automated notifications to relevant stakeholders. Thresholds configurable per hospital.

---

#### Transport Dispatch

**Purpose:** Coordinate patient movement between departments. Eliminates phone calls and manual coordination.

##### How It Works

**Request generation:**
- **Automatic:** When an inpatient has a scheduled appointment at a service department (Radiology, OR, Lab draw station, etc.), transport request auto-generated based on appointment time minus transport lead time (configurable, default 15 minutes before)
- **Automatic:** When bed assigned for admission, transport from origin (ED, PACU, etc.) auto-generated
- **Manual:** Any clinical staff can request transport via voice/text or GUI ("Transport patient Rossi to Radiology for CT")

**Dispatch logic:**
- Requests queued by priority (emergency > urgent > routine > scheduled)
- Assignment considers: transporter proximity, availability, skill/certification (some transports require RN escort), equipment capability
- Small hospitals: Request goes to ward staff or general pool
- Large hospitals: Centralized dispatch team with dedicated transporters

**Status tracking (visible to both origin and destination):**
```
REQUESTED -> DISPATCHED -> EN_ROUTE_TO_PICKUP -> AT_PICKUP -> IN_TRANSIT -> DELIVERED
```

Each status change:
- Updates patient's sub_status (OFF_WARD_TRANSIT)
- Updates patient's temporary_location
- Visible on origin ward dashboard ("Patient Rossi — In Transit to Radiology")
- Visible on destination worklist ("Patient Rossi — En Route, ETA 5 min")

**Return transport:**
- Auto-generated when procedure completes (destination department marks patient ready for return)
- Or manually requested by destination department
- Linked to original transport via return_request_id

##### Integration with Service Modules

When inpatient has appointment:
1. Appointment scheduled in service module (e.g., Radiology)
2. If patient is inpatient → transport auto-requested (timed to appointment)
3. Transporter picks up patient → ward dashboard shows "Off Ward — In Transit to Radiology"
4. Patient arrives at Radiology → checked in → ward dashboard shows "Off Ward — In Radiology"
5. Procedure complete → return transport requested
6. Patient returns → ward dashboard shows "In Room"

At no point does anyone make a phone call.

---

#### Patient Location Service

**Purpose:** Maintain a single authoritative real-time position for every patient in the hospital.

##### How It Works

**Workflow-based tracking (default, always active):**
Patient location updates automatically from clinical system events:
- Admission: location = assigned bed
- Transport pickup: location = "In Transit from [origin] to [destination]"
- Check-in at department: location = that department
- Transport delivery back: location = "In Transit from [department] to [ward]"
- Return to ward: location = assigned bed
- Transfer: location = new bed
- Discharge: location = cleared

Every module that checks in or checks out a patient feeds the location service. Because AIRIS owns all modules, this happens natively with no integration work.

**RTLS integration (optional, for hospitals with hardware):**
- AIRIS exposes a standard API endpoint that accepts location pings from any RTLS vendor
- Supported technologies: active RFID, BLE beacons, Wi-Fi, infrared, UWB
- RTLS updates supplement workflow-based tracking, providing continuous position between system events
- Conflict resolution: if RTLS says patient is in Radiology but no check-in event, system flags discrepancy

##### What the Location Service Provides

**For any patient, at any time:**
- Current location (ward/room/bed or department or "in transit")
- Time at current location
- Expected next location (if transport scheduled or appointment pending)

**For any location:**
- Who is there right now
- Who is expected (incoming transports, pending admissions)

**Privacy controls (Italian GDPR compliance):**
- Patient location is health data (ward name can reveal condition — confirmed by Garante rulings)
- Access restricted to: treating clinicians, nursing staff on assigned ward, bed management, transport, security
- Family members see location ONLY if patient has explicitly authorized location sharing
- System stores current location only (no movement history in location service — movement history is in LocationHistory and ADTEvent, with appropriate retention)
- DPIA required for RTLS deployment

---

#### Transition Handoff Generator

**Purpose:** Automatically compile structured clinical summaries at every point where care responsibility transfers between departments or providers.

##### When Handoffs Are Generated

| Transition | Type | Trigger |
|-----------|------|---------|
| ED → Ward | ED_TO_WARD | ED disposition "Admit" + bed assigned |
| Ward → Ward | WARD_TO_WARD | Transfer order placed |
| Ward → Service Dept | WARD_TO_PROCEDURE | Transport dispatched for procedure |
| Service Dept → Ward | PROCEDURE_TO_WARD | Procedure complete, return transport |
| Ward → OR | WARD_TO_OR | Surgical case called |
| OR/PACU → Ward | OR_TO_WARD_PACU | PACU discharge criteria met |
| Ward → ICU | WARD_TO_ICU | Step-up transfer ordered |
| ICU → Ward | ICU_TO_WARD | Step-down transfer ordered |

##### How It Works

1. Transition trigger fires
2. System auto-compiles handoff from current patient data:
   - Pulls active diagnoses, allergies, code status, isolation from encounter
   - Pulls last vital signs from most recent recording
   - Pulls active medication list
   - Pulls pending orders and results
   - Pulls last 24h critical/abnormal lab and imaging results
   - Sets illness_severity based on clinical indicators
3. Handoff presented to sending clinician for review and annotation
4. Sending clinician adds notes, confirms, sends
5. Receiving clinician notified
6. Receiving clinician reviews, acknowledges
7. Handoff becomes part of permanent record (audit trail)

**Key principle:** The handoff is 90% auto-generated, 10% human annotation. The system does the compilation work; clinicians review and add context that only humans know.

##### Handoff vs Care Unit Shift Handoff

These are different things:
- **Transition Handoff (this section):** Inter-department clinical summary when patient moves between settings. Auto-generated, follows SBAR/I-PASS structure.
- **Shift Handoff (Care Unit Module):** Intra-ward nursing communication at shift change. Also auto-populated but focused on nursing-specific care continuity (meds due, pending tasks, patient preferences).

Both exist. They serve different purposes at different moments.

---

#### LocationHistory (Transfer Tracking)

Tracks every location assignment for an encounter. One record per bed stay within an encounter.

```
location_history_id, encounter_id, ward_id, room_id, bed_id
start_datetime, end_datetime (null if current)
transfer_reason (ADMISSION | CLINICAL | BED_MANAGEMENT | ISOLATION | STEP_DOWN | STEP_UP | PROCEDURE_TEMPORARY)
transferred_by_user_id, notes
```

---

#### Event Catalog — Patient Flow

Events emitted by the Patient Flow Layer. These replace the former `care_unit.encounter.*` and `care_unit.bed.*` events, which are now hospital-wide.

```
// Encounter Events
patient_flow.encounter.pre_admitted       (STANDARD) — payload: patient, expected_date, source
patient_flow.encounter.admitted           (CRITICAL) — payload: patient, ward, bed, admission_type, attending, source
patient_flow.encounter.transferred        (CRITICAL) — payload: from_ward, from_bed, to_ward, to_bed, reason
patient_flow.encounter.discharge_pending  (STANDARD) — payload: expected_discharge_date, discharge_type
patient_flow.encounter.discharge_ready    (STANDARD) — payload: patient, ward, bed
patient_flow.encounter.discharged         (CRITICAL) — payload: discharge_type, destination, diagnosis, los_days
patient_flow.encounter.cancelled          (STANDARD) — payload: reason
patient_flow.encounter.updated            (STANDARD) — payload: changed_fields
patient_flow.encounter.off_ward           (STANDARD) — payload: destination_department, reason
patient_flow.encounter.returned_to_ward   (STANDARD) — payload: from_department

// Bed Events
patient_flow.bed.requested               (STANDARD) — payload: source, level_of_care, priority
patient_flow.bed.assigned                (STANDARD) — payload: bed, patient, assigned_by
patient_flow.bed.reserved                (STANDARD) — payload: bed, patient, expires_at
patient_flow.bed.reservation_expired     (STANDARD) — payload: bed
patient_flow.bed.vacated                 (STANDARD) — payload: bed, previous_patient, cleaning_priority
patient_flow.bed.cleaning_requested      (BACKGROUND) — payload: bed, priority
patient_flow.bed.cleaning_started        (BACKGROUND) — payload: bed
patient_flow.bed.cleaning_completed      (STANDARD) — payload: bed, turnaround_minutes
patient_flow.bed.available               (STANDARD) — payload: bed, ward
patient_flow.bed.blocked                 (STANDARD) — payload: bed, reason
patient_flow.bed.unblocked               (STANDARD) — payload: bed

// Transport Events
patient_flow.transport.requested         (STANDARD) — payload: patient, origin, destination, priority
patient_flow.transport.dispatched        (STANDARD) — payload: transporter, eta
patient_flow.transport.picked_up         (STANDARD) — payload: patient, origin
patient_flow.transport.delivered         (STANDARD) — payload: patient, destination
patient_flow.transport.cancelled         (STANDARD) — payload: reason

// Capacity Events
patient_flow.capacity.threshold_warning  (CRITICAL) — payload: occupancy_percent, level, ward_or_hospital
patient_flow.capacity.surge_activated    (CRITICAL) — payload: surge_level, activated_beds
patient_flow.capacity.surge_deactivated  (STANDARD) — payload: surge_level

// Handoff Events
patient_flow.handoff.generated           (STANDARD) — payload: handoff_type, patient, from, to
patient_flow.handoff.acknowledged        (STANDARD) — payload: handoff_id, acknowledged_by
patient_flow.handoff.overdue             (CRITICAL) — payload: handoff_id, minutes_overdue
```

**Subscribers (examples):**
- Pharmacy: subscribes to encounter.admitted, encounter.transferred, encounter.discharged → medication management
- Dietary: subscribes to encounter.admitted, encounter.transferred, encounter.discharged → meal planning
- Billing: subscribes to encounter.admitted, encounter.discharged → charge capture
- Lab: subscribes to encounter.admitted → activate standing orders
- All Service Modules: subscribe to transport events → know when patients are coming
- Care Unit: subscribes to bed events → ward Census display updates
- Notification System: subscribes to capacity.threshold_warning → alert administrators

---

#### Italian Regulatory Integration

Patient Flow Layer is one of the primary event sources that the Regulatory Layer (Section 16) consumes. The mechanics of regulatory translation — template generation, transmission scheduling, retry logic, code mapping, audit responses — live in Section 16. What Patient Flow Layer contributes is the events and the data behind them.

##### SDO Compilation — what Patient Flow contributes

The Regulatory Layer's SDO Adapter compiles SDO records from Patient Flow Layer events plus clinical data from modules. Patient Flow Layer produces:
- Section A inputs: patient demographics from Patient Registry, hospital and ward codes from Location hierarchy.
- Section B inputs: admission/discharge dates from Encounter, transfer records from LocationHistory, ward codes from Location hierarchy. Diagnoses and procedures come from clinical documentation in modules.
- Triggering events: `patient_flow.encounter.admitted` (begins the SDO record), `patient_flow.encounter.discharged` (initiates compilation and finalization).

DRG grouping, validation against DM 380/2000 required-field rules, monthly XML batch transmission to the regional system — these are Section 16 concerns. The clinician and even the bed manager see none of this.

##### FSE 2.0 Document Generation — what Patient Flow contributes

The Regulatory Layer's FSE 2.0 Adapter generates and transmits CDA R2 documents on relevant events. Patient Flow Layer's contribution is the discharge event:
- Triggering event: `patient_flow.encounter.discharged` produces an LDO transmission.
- Content sourced from encounter data plus clinical documentation in modules.

PAdES signature application, transmission to regional FSE gateway within the five-day requirement, acceptance/rejection tracking — Section 16.

##### NSIS Flows — what Patient Flow contributes

Patient Flow Layer is the primary data source for several mandatory national flows, all transmitted by the Regulatory Layer:
- SDO flow (inpatient discharges) — fed from Patient Flow's encounter and discharge events.
- HSP.22bis (hospital activity) — aggregated from Patient Flow data on a periodic basis.
- EMUR-PS flow is fed from Emergency Module rather than Patient Flow Layer; Patient Flow only contributes to the SDO and HSP flows.

##### Patient Identification — Patient Flow's responsibility

All encounters in Patient Flow Layer are linked to a patient record in Patient Registry, which the Regulatory Layer's Codice Fiscale and Patient Identifier Adapter validates and manages:
- Codice fiscale (primary identifier for Italian residents)
- STP code (Straniero Temporaneamente Presente — irregular foreign nationals)
- ENI code (Europeo Non Iscritto — EU citizens without SSN enrollment)
- Mutually exclusive in SDO: the `onere_degenza` field determines cost bearer based on identifier in use.

The validation logic (codice fiscale checksum, STP/ENI format rules, newborn temporary identifiers, identity reconciliation across encounters) lives in Section 16. Patient Flow Layer just produces encounters with whatever identifier the patient carries.

---

#### Interaction Layer Examples

```
Bed Management:
"Show available ICU beds"
"Assign bed Med1-205-B to patient Rossi"
"Block bed 3A in Chirurgia for maintenance"
"What's hospital occupancy right now?"
"How many pending admissions from ED?"

Admission:
"Admit patient Rossi from ED to Medicine, telemetry bed, attending Dr. Bianchi"
"Schedule admission for Verdi, January 15, Surgical ward, cholecystectomy"
"Accept transfer from San Giovanni hospital, ICU bed needed, ARDS patient"

Transport:
"Transport patient in bed 4B to Radiology for CT"
"Urgent transport needed for Rossi to OR"
"Where is patient Verdi right now?"

Discharge:
"Expected discharges today?"
"How many beds opening up in the next 4 hours?"
"Start discharge for bed Med2-101-A"

Capacity:
"Show me capacity forecast for tomorrow"
"Which wards have available beds for a cardiac telemetry patient?"
"Activate surge protocol level 2"
```

---

#### What Care Unit Module Now References

With Patient Flow Layer as the authoritative source, the Care Unit Module:

**REFERENCES (from Patient Flow Layer):**
- Encounter data structure and lifecycle
- Location hierarchy (Ward, Room, Bed)
- Bed status and state machine
- LocationHistory
- ADT events (patient_flow.encounter.*, patient_flow.bed.*)

**RETAINS (module-specific clinical content):**
- All clinical data structures: ClinicalNote, VitalSigns, IntakeOutput, MAR, NursingAssessment, CarePlan
- Shift Handoff (intra-ward nursing handoff — distinct from Transition Handoff)
- SDO and LDO data structures and compliance requirements (clinical content, generated within Care Unit workflow)
- All environments: Patient List, Census (ward-filtered view of hospital-wide bed data), Clinical, Handoff, Discharge, Archive, Administration
- All ward type feature activations (Surgical, Pediatric, Psychiatric, Rehabilitation, Maternity)
- Order structure (outbound orders to service modules)
- Permissions structure
- Interaction layer examples for clinical workflow
- Integration patterns for external clinical systems (Pharmacy, ADC, Vital Signs Monitors)

**CENSUS environment becomes:** A ward-filtered view of the hospital-wide Bed Management Engine. Same visual, same functionality for charge nurses, but data comes from the shared layer. The hospital-wide Bed Board is the full unfiltered view used by bed management staff.

---

**This section will keep evolving.** The Patient Flow Layer is infrastructure that grows with every new module and every hospital deployment. Predictive capacity models, transport optimization, and handoff templates will continuously improve. The framework and data structures are the foundation; the intelligence built on top will expand indefinitely.

---

### 16. Regulatory Layer — Institutional and Legal Translation

**Purpose:** Translate between AIRIS's internal data and events on one side, and the institutional and legal world on the other. The Regulatory Layer is what makes it possible for a clinician to describe clinical reality in clinical language and have the institutional and legal world satisfied as a consequence — without the clinician needing to know what FSE 2.0 is, what an SDO field looks like, what the CIPI transition timeline is, or what an Esito code maps to.

**Why this is CORE infrastructure, not a module:**
Regulatory translation is consumed by every department in some form. Discharge documents, FSE 2.0 transmissions, NSIS flow submissions, ICD/CIPI code mappings, audit responses to regulators — all of these arise from clinical events across many modules and have to be produced uniformly. No single module owns regulatory translation; the institution does, and the institution serves regulators that exist outside any module's scope.

This layer's existence is a direct expression of the AIRIS Stance: regulatory and institutional translation work is exactly the kind of bureaucratic burden the system absorbs so the clinician does not carry it.

#### What the Regulatory Layer Is Not

Equally important: what this layer does not own.

It is not a complete legal compliance solution for the hospital. The hospital has compliance officers, legal counsel, and institutional governance for that. The Regulatory Layer handles mechanical translation, not adjudication.

It is not where regulatory questions get answered. If a regulation is ambiguous, the answer comes from the regulator or the institution's compliance team, and is implemented in the layer. The layer does not interpret; it implements interpretations.

It is not a place where every conceivable future regulation pre-exists as a feature. The layer is an architecture, a pattern, a set of interfaces. New regulations get implemented as adapters within the layer when they become relevant.

It is not an audit substitute. AIRIS has its own Audit Trail (Section 13). The Regulatory Layer interacts with the Audit Trail when regulators need to query it, but it does not replace it.

It is not a clinical content layer. Clinical content (the actual diagnosis, the actual procedure, the actual observation) lives in the modules and in the Event System. The Regulatory Layer translates that content; it does not generate clinical content of its own.

---

#### Architectural Pattern

The Regulatory Layer is an event-consumer architecture. It subscribes to events from the Event System (Section 5), processes them according to the regulations it implements, and produces outputs (documents, transmissions, code mappings, audit responses) without ever asking the clinician to participate.

##### Input

The layer's input is events from the AIRIS Event System. It does not receive direct API calls from modules. This is intentional: the layer is a consumer, not a service provider in the traditional sense. The Event System is the contract. Any module that emits events can have those events processed by the Regulatory Layer; no module needs to know the Regulatory Layer exists.

Events that the Regulatory Layer subscribes to include (but are not limited to):

- `patient_flow.encounter.admitted` — triggers eventual SDO compilation, regional reporting
- `patient_flow.encounter.discharged` — triggers SDO finalization, LDO generation, FSE 2.0 transmission
- `radiology.report.signed` — triggers FSE 2.0 CDA R2 document generation for imaging report
- `pathology.report.signed` — triggers FSE 2.0 CDA R2 for pathology report
- `cardiology.report.signed` — triggers FSE 2.0 CDA R2 for cardiology report, optional GISE/AIAC registry submission
- `emergency.accesso.discharged` — triggers VPS finalization, EMUR-PS submission
- `laboratory.result.released` — triggers FSE 2.0 lab document, LOINC code mapping verification
- `operating_room.case.completed` — triggers Verbale Operatorio generation, SDO procedure section update
- `surgical_consent.signed` — triggers Legge 219/2017 compliance recording
- All `*.diagnosis.*` events — triggers ICD-9-CM (and CIPI from January 2027) code mapping
- `audit.*` events — for audit trail externalization when regulators query

This is a partial list. The full event subscription list will grow as new regulatory adapters are added.

##### Output

The layer's output is whatever each regulation requires. This includes:

- **Documents.** CDA R2 XML for FSE 2.0 transmission. SDO XML for regional submission. PDF rendering of LDO with PAdES digital signatures. Verbale Operatorio (when a CDA2 template becomes available — currently a flagged gap). VPS for ED episodes.

- **Transmissions.** Outbound HTTPS calls to regional FSE 2.0 gateways. SFTP or equivalent transmissions for SDO monthly batches. NSIS submissions for SDO, EMUR-PS, HSP.22bis. Where transmissions fail, retry logic and incident reporting are part of the layer.

- **Code mappings.** ICD-9-CM codes and (from January 2027) CIPI codes derived from clinical descriptions. LOINC codes for lab orders. SNOMED CT for pathology where applicable. RadLex for radiology terminology. Esito codes (01–14) for ED outcomes. DRG calculations for SDO. The clinician sees these codes only if they explicitly ask; otherwise they are computed silently and stored alongside the clinical content they map.

- **Audit responses.** When a regulator requests audit information (a specific patient encounter, a specific date range, a specific user's actions), the layer produces the response in the format the regulator requires.

##### Interface with the rest of AIRIS

The layer's interactions with other AIRIS components are minimal and well-defined:

**With the Event System (Section 5):** as a subscriber. The layer consumes events; it does not emit clinical events. It may emit `regulatory.*` events (e.g., `regulatory.fse.transmitted`, `regulatory.sdo.validation_failed`) for audit and observability purposes, and modules or notifications can consume those.

**With the Audit Trail (Section 13):** read-only. When a regulatory adapter needs audit information for a transmission or a regulator query, it reads from the Audit Trail. It does not write to the Audit Trail directly; instead, its own activity is recorded through the events it emits, which the Audit Trail consumes through its normal subscription.

**With the Patient Registry and module data:** read-only. The layer reads patient identifiers, encounter data, clinical content, and other module-owned data through whatever read interfaces those modules already provide. It does not have its own copy of clinical data.

**With the Notification System (Section 7):** as a producer of notifications when regulatory events require human attention (e.g., a transmission failure that needs IT intervention, a validation error that needs clinical review).

**With the Interaction Layer (Section 8):** none directly. The clinician never interacts with the Regulatory Layer through voice, text, or click. If the clinician asks "what's the ICD code for this?", the Interaction Layer queries the Regulatory Layer's code-mapping subsystem and returns the answer — but this is the Interaction Layer mediating, not the clinician operating the regulatory layer.

##### Internal structure

Within the layer, regulations are implemented as **adapters**. Each adapter handles one specific regulatory or institutional translation responsibility. Adapters are independent of each other and can be added, modified, or removed without affecting other adapters. Each adapter has:

- A clear scope (what regulation or institutional output it produces)
- A defined event subscription (what triggers it)
- A defined output (what it produces, in what format, transmitted where)
- A version (so changes over time are traceable)
- Configuration (institutional settings: FSE gateway URLs, regional submission endpoints, etc.)

Adapters share a common framework: connection management, retry logic, transmission scheduling, error handling, logging. The framework is the layer; the adapters are what the layer does.

---

#### First-Deployment Italian Regulatory Adapters

The following adapters must exist before AIRIS can be deployed in a real Italian hospital. This list is bounded — it is "what's required for first deployment" — not "every regulation that might apply." Additional adapters get added as deployment scope expands (new regions, new module activations, new regulatory requirements).

##### FSE 2.0 (Fascicolo Sanitario Elettronico) Adapter

**Purpose:** Transmit clinical documents to the Italian national electronic health record.

**Triggers:**
- `*.report.signed` (Radiology, Cardiology, Pathology, Nuclear Medicine, Laboratory)
- `patient_flow.encounter.discharged` (LDO transmission)
- `emergency.accesso.discharged` (VPS transmission)

**Inputs from AIRIS:** Signed clinical document content, patient identifiers (codice fiscale, STP, ENI as applicable), encounter context, ordering and reporting clinician identifiers.

**Output:** CDA R2 XML document per HL7 Italia Implementation Guide v1.2 (verify current version — v1.2 is what V21 references but the current published version should be confirmed at implementation time).

**Transmission:** HTTPS to regional FSE gateway. Five-day transmission requirement after document signing. Acceptance/rejection status tracked. Failures retried with backoff; persistent failures escalated through the Notification System.

**Known gap (carried over from V21):** No FSE 2.0 CDA2 template currently exists for Verbale Operatorio (Operating Room). The adapter generates VO content but cannot transmit until a template exists. This is a regulatory gap, not an AIRIS gap; it should be tracked.

##### SDO (Scheda di Dimissione Ospedaliera) Adapter

**Purpose:** Compile and transmit hospital discharge summaries to regional health systems for statistical and reimbursement purposes.

**Triggers:**
- `patient_flow.encounter.discharged` (initiates compilation)
- `patient_flow.encounter.admitted` (begins SDO record)
- Various clinical events during the encounter (populates content)

**Inputs from AIRIS:**
- Section A: Patient demographics from Patient Registry, hospital and ward codes from Location hierarchy.
- Section B: Admission/discharge dates from Encounter, diagnoses from clinical documentation, procedures from service module results, transfer records from LocationHistory, ward codes from Location hierarchy.

**Output:** SDO XML per DM 380/2000 format (verify current ministerial version). 31 required fields validated automatically before marking complete. DRG auto-grouped using DRG v24 grouper (verify current grouper version is v24).

**Transmission:** Monthly XML batch export to regional system. Onere_degenza field handled per Italian rules (codice fiscale for Italian residents, STP for irregular foreign nationals, ENI for EU citizens without SSN — mutually exclusive determinants of cost bearer).

**Validation:** Automatic check of all required fields before submission. Validation failures produce specific errors that name the missing or inconsistent field, routed through the Notification System to administrative staff. The clinician is not asked to fix SDO field problems — administrative staff or, in many cases, automatic re-extraction from clinical content resolves them.

##### NSIS Flows Adapter

**Purpose:** Submit data to mandatory Italian national health information system flows.

**Triggers and Outputs:**
- **SDO flow** — fed from completed SDO records (above).
- **EMUR-PS flow** — fed from Emergency Module on accesso closure. Includes triage code, arrival mode, disposition, time intervals, NEDOCS parameters where applicable.
- **HSP.22bis** — hospital activity flow, aggregated from Patient Flow Layer data on a periodic basis.

**Transmission:** Per current NSIS specifications. Schedules per flow type. Verify current ministerial schedules and formats at implementation time.

##### Code-Mapping Subsystem

This is the audit-flagged subsystem (Audit Document Section 1.2) that addresses the displacement pattern of clinicians selecting codes from dropdowns.

**Purpose:** Map between clinical descriptions (in clinician language) and the various code systems that institutions and regulators require. The clinician describes what happened in clinical terms; the subsystem produces the codes.

**Code systems supported at first deployment:**
- ICD-9-CM (current Italian standard for inpatient diagnosis and procedure coding)
- CIPI (Italian replacement for ICD-9-CM, transitioning January 2027 — dual coding period required)
- Esito codes (01–14) for Emergency Department outcomes
- LOINC for laboratory orders and results
- RadLex for radiology terminology
- SNOMED CT for pathology and clinical observations where applicable
- ATC for medications
- DRG codes (output of grouper, not input to it)

**How it works:** The subsystem accepts clinical content (from a report, a discharge diagnosis, a procedure description) and produces a mapping with a confidence score. High-confidence mappings are stored as the official code with a flag indicating system-derived. Medium-confidence mappings are stored with a "needs review" flag, optionally surfaced to the clinician through the Interaction Layer ("the discharge diagnosis you described maps to ICD-9-CM 410.71 with 78% confidence — confirm?"). Low-confidence mappings produce a notification to administrative coding staff, who do the mapping and whose mapping is then stored.

**Critical principle:** the clinician's original clinical description is the authoritative content. The codes are *derived*, not primary. If the codes turn out to be wrong, the clinical content is what gets re-mapped; the clinical content does not change to fit the codes. This is a clean inversion of the current state of healthcare software, where clinicians tailor their language to fit codes.

**Implementation note:** The first version of the subsystem should be conservative. High-confidence threshold should be set deliberately to avoid silent wrong codings. As real-world data accumulates, the threshold can be tuned. Initial accuracy will be limited; the subsystem will improve as it sees more clinical content from the same institution.

**CIPI transition:** Through January 2027, dual coding is required (both ICD-9-CM and CIPI for the same content). The subsystem produces both. After the transition completes, ICD-9-CM is retained for historical lookup but CIPI becomes primary for new content.

##### Codice Fiscale and Patient Identifier Adapter

**Purpose:** Validate and manage Italian patient identifiers correctly per regulatory requirements.

**Identifiers handled:**
- **Codice fiscale** — primary identifier for Italian residents. Validated by checksum algorithm; format verified.
- **STP code** (Straniero Temporaneamente Presente) — for irregular foreign nationals receiving care.
- **ENI code** (Europeo Non Iscritto) — for EU citizens without Italian SSN enrollment.
- **TEAM** (Tessera Europea di Assicurazione Malattia) — European Health Insurance Card data, where presented.

**Rules:**
- Codice fiscale, STP, and ENI are mutually exclusive in SDO records. The `onere_degenza` field determines cost bearer based on which identifier is in use.
- Newborns may temporarily lack a codice fiscale (assigned within first 30 days). The adapter handles temporary identifiers and the transition to permanent codice fiscale.
- Identity reconciliation across encounters: the adapter ensures that the same physical person across multiple encounters is correctly linked, even when identifier changes occur (e.g., STP → codice fiscale upon regularization).

##### Regulatory Document Generation Templates

The adapter responsible for producing each major regulatory document. These are not separate adapters per document type but rather a shared template-rendering subsystem used by the FSE 2.0 and SDO adapters above.

Templates supported at first deployment:
- LDO (Lettera di Dimissione Ospedaliera) — CDA R2 with PAdES signature
- VPS (Verbale di Pronto Soccorso) — CDA R2
- Radiology, Cardiology, Pathology, Nuclear Medicine, Laboratory reports — CDA R2 per modality
- Surgical consent (Legge 219/2017) — institutional template, signed and stored

Templates not yet supported at first deployment (gaps):
- Verbale Operatorio — no FSE 2.0 CDA2 template currently exists from HL7 Italia. The system generates VO content but cannot transmit it via FSE 2.0 until a template is published. This is tracked as a known gap.

---

#### EU AI Act Considerations

AIRIS is high-risk software under the EU AI Act because the Interaction Layer drives clinical actions including medication orders. This produces requirements that the Regulatory Layer must support, even though the AI Act compliance is broader than just this layer.

The Regulatory Layer's specific responsibilities for AI Act compliance:

- **Documentation generation.** When regulators request the technical documentation required by the Act, the layer produces it from system metadata (component versions, training data lineage where applicable, validation test results, risk management records).
- **Incident reporting.** When an AI Act-reportable incident occurs (a specific class of system error or harm), the layer produces the regulator submission per the Act's incident reporting requirements.
- **Human oversight evidence.** The layer can produce audit reports demonstrating that human oversight was in place — Tier 3 actions read back, Tier 4 actions GUI-only, all clinical decisions made by humans not by the AI.

The broader AI Act requirements (continuous risk management, post-market monitoring) are organizational responsibilities of whoever operates AIRIS, supported by the layer's reporting capabilities but not produced by the layer alone.

#### EU MDR Considerations

Several AIRIS modules likely fall within MDR Class IIa or IIb medical device software classifications, depending on their specific clinical decision support features. The Regulatory Layer supports MDR compliance through:

- **Conformity assessment evidence.** Producing the technical documentation, risk analyses, and validation records required for the conformity assessment of each module classified as a medical device.
- **Vigilance and post-market surveillance.** Reporting incidents through the EUDAMED system per MDR requirements.
- **UDI tracking.** Ensuring Unique Device Identification data captured at the module level (e.g., implants in Operating Room) is correctly recorded and queryable for regulatory and recall purposes.

The MDR classification of each module is determined separately as part of the certification work; the Regulatory Layer supports the resulting compliance requirements but does not perform the classification.

#### IEC 62304 Considerations

IEC 62304 (medical device software lifecycle) compliance is an organizational requirement for AIRIS development as a whole, not specifically a Regulatory Layer feature. The layer supports IEC 62304 compliance by:

- Recording its own lifecycle events (versions deployed, configurations changed, incidents observed) in the Audit Trail.
- Producing the lifecycle documentation that auditors require, drawn from this audit data.

#### GDPR Considerations

Clinical data is special category personal data under GDPR, with specific requirements for processing, storage, transfer, and erasure. The Regulatory Layer's GDPR responsibilities:

- **Data subject access requests.** When a patient requests their data per GDPR Article 15, the layer produces the response in a portable format (typically structured data plus rendered documents).
- **Right to rectification (Article 16).** Mechanisms for correcting inaccurate data while preserving the audit trail of what was originally recorded.
- **Right to erasure (Article 17).** Where applicable — clinical records typically have retention requirements that override erasure for the retention period, but where erasure is required, the layer handles the process while preserving regulatory-required minimum data.
- **Data processing records (Article 30).** Producing the records of processing activities that controllers are required to maintain.

Cross-border data transfer (e.g., for second-opinion consultations across EU member states) requires standard contractual clauses or other GDPR-permitted mechanisms; the layer supports this where applicable.

#### Audit and Observability

The Regulatory Layer is itself audited. Every transmission, every code mapping above the high-confidence threshold, every document generation, every incident report — all produce events that are recorded in the Audit Trail. This serves three purposes:

- **Regulator queries.** When a regulator asks "show me the transmission log for patient X" or "show me all FSE 2.0 transmissions for week W," the layer produces the response from its audit data.
- **Incident investigation.** When something goes wrong (a transmission failed silently, a code mapping was wrong, a document was malformed), the audit data shows what happened, when, and what the inputs were.
- **Compliance demonstration.** When regulators request evidence that the layer has been functioning correctly over time, the audit data supports that demonstration.

The Audit Trail is the existing AIRIS Audit Trail (Section 13). The Regulatory Layer does not maintain a separate audit; it uses the Master Audit Trail like every other component.

---

#### What This Specification Does Not Yet Cover

Honest acknowledgment of scope limits:

**Regional variations.** Italian healthcare is operated regionally (Lombardy, Emilia-Romagna, Lazio, Sicily, etc.) and each region has implementation-specific requirements within the national framework. This specification handles the national-level architecture; regional variations are implemented as adapter configurations and require region-specific knowledge that should be gathered at first-deployment time. The architecture supports this; the specific configurations are deployment work.

**Future regulations.** Regulations not yet published cannot be specified. The architecture is designed to absorb new regulations as adapters; the specific adapters are written when the regulations exist.

**Non-Italian markets.** AIRIS's first market is Italy. Other EU member states have different regulatory frameworks (different health record systems, different mandatory submissions, different code systems in some cases). When AIRIS expands to other markets, additional adapters are required. The architecture supports this; the specific adapters are not in scope here.

**Pediatric-specific regulations.** NICU and PICU modules are deferred from current AIRIS scope. Pediatric-specific regulatory requirements (newborn screening, immunization registries, child protection reporting) are deferred with them.

**Legacy system migration.** When AIRIS replaces an existing HIS at a hospital, there is regulatory continuity work (existing FSE 2.0 records continue, existing SDO records remain valid, etc.). This is implementation work for each deployment, not a regulatory layer feature.

---

#### Verification Points (Do Before Implementation)

The following specific details in this specification were drawn from V21 content or general knowledge and should be verified against current authoritative sources before implementation:

- HL7 Italia Implementation Guide for FSE 2.0 CDA R2 — current published version (V21 references v1.2; verify).
- DM 380/2000 SDO format — current ministerial version, including any updates.
- DRG grouper version — current Italian DRG version (V21 references v24; verify).
- NSIS flow specifications — current ministerial schedules and formats for each flow.
- CIPI transition timeline — January 2027 is current best information; verify and check for any pre-transition guidance.
- AI Act implementation timeline for high-risk software — verify current applicability dates and specific compliance schedules.
- EUDAMED requirements — current system status and specific reporting endpoints.
- Regional FSE 2.0 gateway endpoints and authentication mechanisms — these are region-specific and acquired at deployment time.

This verification can be done as part of the Regulatory Layer implementation work; it does not need to precede the architectural specification, but it must precede actual deployment.

---

**This section will keep evolving.** The Regulatory Layer is the part of AIRIS most exposed to external change — every regulatory update, every new flow, every code system transition lands here. The architecture is designed for this: adapters are independent, addable, modifiable. The specification is a current snapshot; the layer's actual content changes with the regulatory world it interfaces with.

---

## RADIOLOGY MODULE - COMPLETE DESIGN

### Module Overview

**Purpose:** Manage complete radiology workflow from order receipt through report delivery

**Core Principle:** Clinician-native design — the absorbing interface (voice/text) is the primary input method, with the GUI fallback always available for viewing, complex data, and any situation where direct manipulation is more appropriate

**Three Navigation Areas (with sub-views):**
1. **Scheduling** - Schedule pending exams on modality agendas
2. **Worklist** - Active daily work with shared filter:
   - **Check-in** - Confirm patient arrival and capture check-in context (mobility, cooperation, special considerations)
   - **Execution** - Confirm and complete the technical record after acquisition (status advances automatically when DICOM and modality events permit)
   - **Reporting** - Write and sign radiology reports
3. **Archive/Clinical Consultation** - Search and view any exam at any time

**Plus (accessible from settings icon):**
- **Administration** - Configure modalities, folders, exams, users, settings
- **My Preferences** - Personal customization (accessible to all users)

---

### Radiology Module Navigation Structure

**Three Navigation Areas (following Module Navigation Structure Pattern):**

```
 [SCHEDULING]     [WORKLIST]     [ARCHIVE]
```

**Scheduling:** Full scheduling page — pending exams list + agenda calendar. No working filter. Broad view across modalities for planning.

**Worklist:** The user's active daily workspace. Contains three sub-views:
```
 WORKLIST:
   [Filter Bar: modality chips + presets + secondary filters]
   [Check-In | Execution | Reporting]    (sub-view tabs with filtered counts)
   [content]
```
The Worklist Filter applies here (see Worklist Filter Pattern in Architectural Patterns). Filter set once, persists across all three sub-views.

**Archive:** Full search/lookup page. No working filter. Unrestricted access to all exam history.

**Settings Icon (⚙) Dropdown:**
```
 My Preferences (all users)
 Administration (Module Admins only)
```

**Visual Hierarchy:**
- Three main areas = Large, prominent (where users do their work)
- Settings icon = Small, in corner (configuration access)
- Within Worklist: filter bar above sub-view tabs, sub-view tabs above content
- Clear separation between the three areas

---

### Core Data Structures

#### Orders
```
order_id (unique, auto-generated)
patient_id (FK -> Patients)
requesting_doctor_id (FK -> Users)
requesting_department (which AIRIS module created this)
clinical_indication (text - why is this exam needed)
requested_urgency (text - as received from source)
created_at (timestamp)
created_by_user_id (FK -> Users)
request_group_id (optional - links orders created together)
```

**Order Characteristics:**
- Can contain one or multiple exams
- Can contain exams of different modality types (CT + X-ray in same order)
- Created by requesting department or Radiology itself
- Progresses through statuses based on contained exams

**Order Types:**
- **Type A (Pre-booked):** Arrives WITH schedule (Emergency, ICU) - Status: SCHEDULED
- **Type B (Request):** Arrives WITHOUT schedule (Most departments) - Status: PENDING
- **Type C (Self-created):** Radiology creates for their own patients

#### Exams
```
exam_id (unique, auto-generated)
accession_number (unique identifier visible to users - e.g., "AIRIS_87.41.1")
order_id (FK -> Orders)
exam_type (CT Chest, RX Ankle, MR Brain - from Nomenclatore)
modality_type (CT, X-ray, MR, US, PET - determines which agenda can schedule)
status (PENDING, SCHEDULED, CHECKED IN, EXECUTED, REPORTED)
protocol_notes (text - e.g., "with contrast", "non-contrast first")
technical_notes (text - added during execution)
requested_urgency (text - original from requester, preserved)
radiology_urgency (1-4 - Radiology's internal priority)
radiologist_executed (FK -> Users, optional)
radiologist_assigned (FK -> Users - for report writing)
created_at
updated_at
```

**Exam Characteristics:**
- Individual study within an order
- Has its own lifecycle/status progression
- Accession number = the ID users see and reference
- Two urgency fields: requested (preserved) + radiology (working priority)

**Status Progression:**
```
PENDING -> SCHEDULED -> CHECKED IN -> EXECUTED -> REPORTED
```

#### Urgency System (Two Fields)

**Field 1: Requested Urgency**
- Original urgency from requester
- Preserved exactly as received
- Never modified by Radiology
- For audit trail and requester visibility

**Field 2: Radiology Urgency (1-4 scale)**
- Radiology's internal priority for workflow
- Standard 4-level scale:
  - 1 = STAT (immediate)
  - 2 = Urgent (high priority)
  - 3 = Routine (normal priority)
  - 4 = Non-Urgent (low priority)
- Default: Mapped from Requested Urgency
- Can be modified by Radiology during scheduling/vetting
- Drives color coding and scheduling priority

**Color Coding (Configurable in Settings):**
- Level 1: Red (default)
- Level 2: Orange (default)
- Level 3: Blue (default)
- Level 4: Gray (default)
- Hospital can customize colors and labels
- Universal across all environments

**Integration Mapping:**
- Integration Builder maps external urgency codes to 1-4 scale
- Handles different urgency systems from different sources

#### Modalities
```
modality_id (unique, auto-generated)
name (e.g., "CT1", "Hybrid Scanner Room 3")
modality_types (array: CT, X-ray, MR, US, PET - can have multiple)
ip_address
dicom_ae_title
port
status (Operational, Maintenance, Out of Service)
folder_id (FK -> Folders, optional)
assigned_exams (array: exam types this modality can perform)
```

**Modality Characteristics:**
- Physical equipment in radiology department
- Can have multiple types (e.g., PET/CT hybrid scanner)
- Assigned specific exam types (not all CTs can do cardiac CT)
- User-modality assignment filters throughout all environments

**User-Modality Assignment:**
- Users assigned to specific modalities in Administration
- Throughout all environments, users only see their assigned modalities in filters
- Filtering happens at modality level (exams follow as consequence)
- Example: Tech assigned to CT1, CT2 -> only sees CT1/CT2 in all environment filters

#### Folders
```
folder_id (unique, auto-generated)
name (e.g., "Ground Floor", "Mobile Equipment")
```

**Folder Characteristics:**
- Pure visual organization tool for modalities
- NO logic attached (no permissions, no scheduling rules)
- Optional (system works fine without folders)
- One modality can belong to one folder (or no folder)
- User sees folder only if they have at least one modality in it

**Purpose:** Help organize modality lists when department has many scanners

#### Agendas
```
agenda_id (unique, auto-generated)
name (e.g., "CT1 Calendar", "X-ray Room 2 Schedule")
modality_type (CT, X-ray, MR - determines which exams can be scheduled)
```

**Plus junction table:**
```
Agenda_Modalities:
  agenda_id (FK)
  modality_id (FK)
```

**Agenda Characteristics:**
- Calendar/schedule for booking exams
- Tied to modality_type (CT agenda shows CT exams)
- First version: 1 agenda = 1 modality (simple)
- Future: 1 agenda can link to multiple modalities (via junction table)
- Architecture already supports future flexibility

**Filtering Logic:**
- Agenda modality_type must match exam modality_type
- Exam can only be scheduled on compatible agendas
- Additionally: modality must have that specific exam assigned

#### Appointments
```
appointment_id (unique, auto-generated)
exam_id (FK -> Exams)
agenda_id (FK -> Agendas)
scheduled_date
scheduled_time
duration (minutes - default from exam catalog, adjustable)
created_at
created_by_user_id (FK -> Users)
```

**Appointment Characteristics:**
- Scheduled slot on an agenda
- Links exam to specific date/time/modality
- Created during scheduling workflow
- Duration from Nomenclatore, can be adjusted per appointment

#### Nomenclatore (Exam Catalog)
```
exam_catalog_id (unique, auto-generated)
airis_code (e.g., "AIRIS_87.41.1" - internal identifier)
external_code (e.g., "87.41.1" - national catalog code, optional)
exam_name (e.g., "CT Chest with contrast")
modality_type (CT, X-ray, MR, US, PET)
default_duration (minutes)
execution_form_template (FK -> Execution Form Templates)
report_templates (array: available report templates, one marked default)
```

**Nomenclatore Characteristics:**
- Master list of all exam types Radiology can perform
- AIRIS code = always present (internal reference)
- External code = optional (for integration with national catalogs)
- Default duration used when scheduling
- Links to execution form and report templates

**Catalog Management:**
- Import via AI-powered tool (upload file, AI analyzes and maps)
- Simple import: bulk upload all
- AI-assisted import: complex filtering, duplicate detection, selective import
- For Italy: typically import national catalog and keep synchronized

**Integration:** External orders map via external_code to AIRIS exam types

---

### ENVIRONMENT 1: SCHEDULING

**Purpose:** Schedule pending exams onto modality agendas

**Who Uses:** Schedulers, admin staff, radiologists (permission-based)

**Main Workflow (voice/text primary, GUI fallback equivalent):**

The scheduler describes the scheduling intent in clinical language. The system handles slot identification, duration, and creation. Examples:
- "Schedule Rossi's CT chest for tomorrow morning on CT1"
- "Schedule the next available STAT CT slot for Bianchi"
- "Move Verdi's MR brain from Thursday to next Monday afternoon"

The system identifies the exam, finds compatible slots on the named modality (or, if no modality is named, on any compatible modality), checks for conflicts, and creates the appointment. If the request is ambiguous (multiple matching exams, conflicting time, urgency mismatch), the system asks one focused clarifying question rather than guessing.

**GUI fallback (equivalent path through direct manipulation):**
1. View pending exams (PENDING status) in the Pending Exams List
2. Select agenda (filtered by modality assignment)
3. View calendar
4. Drag exam to time slot
5. Appointment created, exam status: PENDING -> SCHEDULED

The drag-to-slot path is fully supported and remains the right answer when the scheduler wants to see the calendar visually, compare multiple options, or explore the day's distribution. Voice/text and drag are two paths to the same paradigm; neither is the "real" workflow with the other as a backup.

#### Interface Structure

**Two-section layout:**
- **Pending Exams List** - Patient entries with their PENDING exams
- **Agenda Calendar** - Day/Week/Month views (like Google Calendar)

**Pending Exams View:**
```
Mario Rossi
 CT Chest - PENDING -  STAT
 RX Ankle - PENDING -  Routine
  
Anna Verdi  
 MR Brain - PENDING -  Urgent
```

**Default Grouping/Sorting:**
- Grouped by patient
- Sorted by urgency (STAT first)
- Filtered to PENDING status
- User can adjust filters

**Agenda Selection & Compatibility Filtering:**

**When no exam selected:**
- All agendas visible (normal state)

**When exam selected:**
- Compatible agendas remain normal brightness (selectable)
- Incompatible agendas dimmed (50% opacity, not clickable)
- System checks: modality_type match + modality has exam assigned
- Clear visual feedback without clutter

**Calendar View:**
- Day/Week/Month views (user choice)
- Configurable time slots (hospital sets: 15min, 30min, 1hr)
- Shows existing appointments (color-coded by urgency)
- Empty slots available for scheduling

**Scheduling Action:**
- User selects exam(s) from popup (one at a time for first version)
- Drags to calendar slot
- Duration auto-filled from exam catalog (adjustable)
- Cannot drop on occupied slot (blocked)
- Appointment created, exam disappears from pending list

**Urgency Modification:**
- User can view Requested Urgency (from requester, read-only)
- User can modify Radiology Urgency (1-4 dropdown)
- Changes color coding and scheduling priority
- Original request preserved

**Rescheduling:**
- User can drag scheduled exam to different slot
- User can click exam and edit date/time
- Permission controlled in settings
- Can unschedule (move back to pending) if needed

**AI Scheduling Assistant:**
- AI analyzes urgency, patterns, workload, and modality availability to surface the slot that best fits a given exam
- Scheduler asks ("schedule Rossi's CT for the earliest STAT slot on CT1") or accepts a suggested slot, modifies it, or ignores it entirely
- "AI suggests, humans decide" — the schedule is always the human's call
- Initial sophistication is limited; the assistant improves as it accumulates institution-specific patterns over time

---

### ENVIRONMENT 2: CHECK-IN

**Purpose:** Mark patient as arrived and entering modality room

**Who Uses:** Reception staff, admin, technicians (permission-based)

**Workflow Trigger:** Patient physically arrives, called from waiting room to modality

**Actions:**
1. Exam status: SCHEDULED -> CHECKED IN
2. Timestamp recorded
3. User who checked in recorded
4. Optional check-in notes captured
5. Event sent to PACS (triggers DICOM worklist creation)

#### Interface Structure

**Two-section layout:**

**Section 1: TO CHECK IN (Main - 90% focus)**
- Shows SCHEDULED exams for today (default)
- Patient list with quick [Check In] buttons
- Filtered to user's assigned modalities

**Section 2: CURRENTLY CHECKED IN (Secondary - supporting)**
- Shows CHECKED IN exams (patients currently in department)
- Purpose: Monitor who's here, undo check-in if needed
- Access via separate button/link (visually less prominent)
- Not equal tabs - clear visual hierarchy

**Patient List View:**
```
TO CHECK IN:

Mario Rossi - 10:00 - CT1
  [Check In]

Anna Verdi - 10:30 - X-ray1  
  [Check In]
```

**Click patient -> Popup shows exams:**
```
 CHECK IN: Mario Rossi 
 
  Exams: 
 
 CT Chest - 10:00 - CT1 - SCHEDULED 
 STAT 
 Requested by: Dr. Bianchi (Cardiology) 
 
 RX Ankle - 11:00 - X-ray1 - SCHEDULED 
 Routine 
 Requested by: Dr. Rossi (Orthopedics) 
 
  [Check In Selected] 

```

**User selects exam(s) to check in (can be one or multiple)**

**Check-in Data Capture:**

The reception staff or technician describes the patient's state in their own words — the system structures the description into the underlying fields. Examples:

- "Mr. Rossi just arrived in a wheelchair, anxious, contrast allergy confirmed"
- "Verdi walking in on her own, cooperative, no special concerns"
- "Bianchi on a stretcher from cardiology, claustrophobic, ask the tech to talk him through it"

The system parses and structures into Mobility (Autonomous / Wheelchair / Bed / Stretcher), Cooperation (Cooperative / Anxious / Confused), Special considerations (contrast allergy confirmed, claustrophobia, etc.), and any free-text remarks. Structured fields are surfaced back for confirmation when the parsing has lower confidence.

**GUI fallback (the same fields as direct-manipulation form):**

```
Mobility: [Autonomous / Wheelchair / Bed / Stretcher]

Cooperation: [Cooperative / Anxious / Confused]

[ ] Contrast allergy confirmed
[ ] Claustrophobia

Additional notes: [_______________________________]
```

The form is the right answer when staff prefer to confirm field-by-field, when the patient's situation is unusual enough that explicit selection is clearer than description, or when local convention favors structured entry.

**Data captured (regardless of entry path):**
- Mobility status
- Patient cooperation level
- Special considerations
- Free text notes
- All visible to technician during execution

**After Check-in:**
- Selected exams: SCHEDULED -> CHECKED IN
- Timestamp recorded
- Patient disappears from "To Check In" list
- Appears in "Currently Checked In" view

**Undo Check-in:**
- Access via "Currently Checked In" section
- [Undo Check In] button available
- Status: CHECKED IN -> SCHEDULED
- Permission required
- Reverses PACS event

---

### ENVIRONMENT 3: EXECUTION

**Purpose:** Capture the technical record of the scan and advance the exam to EXECUTED status.

**Who Uses:** Technicians, radiologists (for procedures they perform)

**Workflow Trigger:** Tech finishes acquiring images, ready to document. In most cases the system already knows the exam is complete — DICOM images have arrived in PACS, the modality has emitted its end-of-study event, the technician's session at the modality has closed. The system surfaces these exams in the "TO EXECUTE" list automatically; the technician's job is to confirm the technical record (personnel, contrast, dose, image quality) rather than to mark completion.

**Actions:**
1. System surfaces exams that have completed acquisition (inferred from DICOM events, modality signals, or — as a fallback — manual selection by the technician)
2. Dynamic execution form appears (configured per exam type) prepopulated from the modality where possible (contrast volume, radiation dose, imaging parameters)
3. User reviews and corrects required personnel and technical fields
4. Exam status advances: CHECKED IN -> EXECUTED
5. Assigns exam to radiologist for reporting
6. Exam appears in Reporting worklist

#### Interface Structure

**Two-section layout:**

**Section 1: TO EXECUTE (Main - 90% focus)**
- Shows CHECKED IN exams (patients ready to scan)
- Patient list with [Execute] buttons
- Filtered to user's assigned modalities

**Section 2: EXECUTED TODAY (Secondary - supporting)**
- Shows EXECUTED exams (completed today)
- Purpose: Monitor productivity, undo if needed
- Access via separate button/link (visually secondary)

**Patient List View:**
```
TO EXECUTE:

Mario Rossi - CT Chest - Checked in 10:05 - CT1
  [Execute]

Anna Verdi - X-ray Ankle - Checked in 10:32 - X-ray1
  [Execute]
```

**Click patient -> Popup shows exams:**
```
 EXECUTE: Mario Rossi 
 
 CT Chest - 10:00 - CT1 - CHECKED IN 
 STAT 
 Check-in notes: 
 Mobility: Wheelchair 
 Contrast allergy confirmed 
 
  [Execute Selected] 

```

**Check-in notes visible to tech (mobility, allergies, special considerations)**

#### Dynamic Execution Forms

**Where the form's content comes from**

The execution form is the surface for the technician's review of an already-mostly-populated technical record, not a blank form to be filled. The system prepopulates from authoritative sources:

- **Personnel:** Technician is the logged-in user. If a radiologist performed the procedure (interventional or fluoroscopy-guided), they are identified by who controlled the modality session. Radiologist-to-assign is defaulted from the modality's on-duty assignment for the relevant subspecialty, configurable in My Preferences and overridable for the specific exam.
- **Modality data (contrast type and volume, radiation dose, exposure parameters):** Read from the modality itself via DICOM Modality Performed Procedure Step (MPPS) or equivalent integration. The technician confirms; they do not retype values that the CT or X-ray system already knows.
- **Images sent to PACS:** Verified by the system from PACS itself (did the study arrive?). The "Confirmed" indicator reflects the actual state, not the technician's assertion. A warning appears only if the system can't verify arrival.

**What the technician actually does:**

The technician confirms the prepopulated record, corrects anything wrong, and adds judgment that the system can't infer — most often image quality (Diagnostic / Suboptimal / Non-diagnostic) and any technical notes worth preserving. Voice/text is the natural primary path for these: "image quality good, patient cooperative" structures into the right fields. The form is available for direct manipulation.

**If multiple exams selected:**
- Each exam's form appears sequentially with its own prepopulated data
- Common fields (technician, radiologist assignment) carry forward from the first to subsequent forms
- One submission completes all exams (status advances per exam: CHECKED IN -> EXECUTED)

**Form Structure (Configured per Exam Type) — what fields exist when shown:**

**Personnel fields** (defaults from system context, editable):
- Technician who executed
- Radiologist who executed (optional, only if applicable)
- Radiologist to assign report to
- Nurse who assisted (optional)
- Second technician (optional)

**Technical data fields** (defaults from modality where available):
- Modality-specific: contrast for CT (type, amount), no contrast for X-ray
- Radiation dose (read from modality)
- Image quality — technician's judgment
- Technical notes (free text)
- Images sent to PACS (verified by system)

**Example: CT Chest Execution Form (showing prepopulated state ready for review):**
```
Technician who executed: * [Tech Mario]   (from session)
Radiologist who executed: [None]          (no radiologist controlled the session)
Radiologist to assign report to: * [Dr. Bianchi]  (on-duty default; editable)

Contrast used: * [Yes]                    (from modality)
  Type: [Iodinated]                        (from modality)
  Amount: [100] ml                         (from modality)

Radiation dose (DLP): [450] mGy            (from modality)

Image quality: * [ ] Diagnostic [ ] Suboptimal [ ] Non-diagnostic
                                           (technician's judgment — ask)

Technical notes:
  [_______________________________]

Images sent to PACS: [Confirmed by system]
  (warning appears only if PACS verification fails)

[Cancel] [Complete Execution]
```

**Different exam types have different forms:**
- Ultrasound: No tech field, no contrast, no radiation
- X-ray: No contrast field
- CT: Full technical data
- Configuration in Exam Catalog advanced settings

#### Execution Form Template System

**Management:** Administration > Settings > Execution Form Templates

**Structure:**
- Create reusable templates (e.g., "CT Standard", "X-ray Standard")
- Define which fields appear and which are mandatory
- Assign templates to exam types
- Templates provide consistency across similar exams

**Two-way Assignment:**
- From template: Assign to multiple exam types at once
- From exam catalog: Assign template to individual exam (or access template manager)

**Fields from Predefined List:**
- System controls which fields exist (database structure)
- Admin configures which fields appear per exam type
- Admin sets mandatory vs optional per field
- No custom field creation (keeps DB consistent)

**After Execution:**
- Exam status: CHECKED IN -> EXECUTED
- Radiologist assignment recorded
- All technical data saved
- Exam disappears from "To Execute"
- Appears in "Executed Today" section
- Appears in Reporting worklist (for assigned radiologist or unassigned pool)

**Undo Execute:**
- Access via "Executed Today" section
- [Undo Execute] button available
- Status: EXECUTED -> CHECKED IN
- Execution data preserved but exam returns to "To Execute"
- Permission required

---

### ENVIRONMENT 4: REPORTING

**Purpose:** Write and sign radiology reports

**Who Uses:** Radiologists (permission-based)

**Core Workflow:** Review images in PACS, write findings in AIRIS, sign report

**Critical Feature:** Smart report compilation system (Italian legal compliance)

#### Smart Report Compilation System

**Core Principle:**
- Surface flexibility: Radiologist can write separate reports per exam
- Structural compliance: System generates ONE official signed report per order
- Italian legal requirement: 1 order = 1 signed report

**How It Works:**

**Scenario: Order has CT Chest + CT Head**

**Radiologist Experience:**
- Opens reporting page
- Sees two sections: CT Chest section, CT Head section
- Writes report in each section (separate content)
- Clicks [Sign All]

**System Actions:**
- Generates ONE official report for the order
- Contains both exam sections (CT Chest findings, CT Head findings)
- Single signature applied
- Single timestamp
- Both exams marked REPORTED

**Report Structure:**
```

OFFICIAL RADIOLOGY REPORT - Order #1234

Patient: Mario Rossi
Requesting Physician: Dr. Bianchi (Cardiology)
Clinical Indication: Chest pain, rule out PE

EXAM 1: CT CHEST WITH CONTRAST (AN100)

[Radiologist's findings for CT Chest]

EXAM 2: CT HEAD (AN101)

[Radiologist's findings for CT Head]

Electronically signed by: Dr. Bianchi
Date/Time: Dec 20, 2024 3:15pm

```

#### Interface Structure

**Two-section layout:**

**Section 1: TO REPORT (Main - 90% focus)**
- Shows EXECUTED exams (ready for reporting)
- Patient entries (not individual exams)
- Main filter: Assignment status

**Section 2: REPORTED (Secondary - supporting)**
- Shows recently signed reports
- Purpose: View reports, add addenda
- Access via separate button/link (visually secondary)

**Assignment Filters (Main worklist control):**

User can filter by exam assignment:
- **Assigned to Me + Unassigned** (default - most common)
- **Assigned to Me Only**
- **Unassigned Only**
- **All Exams** (including assigned to others)

**Additional Filters:**
- Modality type
- Date range  
- Urgency (1-4)
- Source (internal, external, emergency)
- Saved presets

**Patient List View:**
```
TO REPORT:

Mario Rossi - CT Chest -  STAT - Assigned to: Me
  [Report]

Anna Verdi - X-ray Ankle -  Routine - Assigned to: No one
  [Report]

Giuseppe Bianchi - CT Abdomen -  Urgent - Assigned to: Dr. Rossi
  [Report] ( Warning: assigned to someone else)
```

**Click patient -> Popup shows exams:**
```
 REPORT: Mario Rossi 
 
  Order #1234 - Cardiology - Dr. Bianchi 
  Clinical indication: Chest pain, rule out PE 
 
 CT Chest - 10:15 - CT1 - EXECUTED 
 STAT - Assigned to: Me 
 Tech: Tech Mario | Contrast: Yes, 100ml 
 Tech notes: "Patient cooperative" 
 [Open PACS] 
 
 CT Head - 10:45 - CT1 - EXECUTED 
 STAT - Assigned to: Me 
 Tech: Tech Mario | No contrast 
 [Open PACS] 
 
  [Report Selected] 

```

**Maximum Flexibility:**
- User can select any exams (from same order or different orders)
- User can select exams from multiple orders at once
- System handles compilation intelligently behind the scenes

#### Reporting Page Structure

**User selects exam(s), clicks [Report Selected]**

**Reporting page shows:**
- Patient profile sidebar (optional, collapsible)
- Report section per selected exam
- Smart signing interface

**Patient Profile Sidebar:**
```
 PATIENT: Mario Rossi 
 
  DOB: 01/15/1975 
  MRN: 12345 
 
  Prior Imaging: 
 
 CT Chest (6 mo ago) 
 [View Report] 
 [Open in PACS] 
 
 X-ray Chest (1 yr ago) 
 [View Report] 
 [Open in PACS] 
 

```

**Clicking [Open in PACS] triggers PACS to open that prior study for comparison**

**Main Reporting Area:**
```
 REPORTING: Mario Rossi (2 exams) 
 
 CT CHEST (AN100) 
  Template: [Chest CT Standard  [Dictate] [PACS] 
 
  [Report content section___________________] 
 
 
 CT HEAD (AN101) 
  Template: [Head CT Standard  [Dictate] [PACS]  
 
  [Report content section___________________] 
 
 
  [Save Drafts] [Sign Available] 
 

```

**Each exam gets:**
- Own section with header
- Template selector (multiple templates available per exam type)
- Dictation option
- PACS launch button
- Report content area

#### Report Creation Methods

**1. Template-Based:**
- Select from available templates (configured per exam type in Nomenclatore)
- One template marked as default (appears first)
- User can choose different template from dropdown
- Template generates structured sections with prompts
- Pre-fills available data (technique, comparison, contrast info)

**2. Voice Dictation:**
- Speak the report directly; the system transcribes in real time, applies medical-language-aware formatting and punctuation, and structures the output into the active template if one is in use
- Voice and templates are not either-or: most radiologists dictate *into* a template, with the system inserting spoken content into the appropriate section (Findings, Impression, etc.)
- The radiologist can edit the transcribed text directly in the report before signing
- Voice control extends beyond dictation to navigation: "go to impression," "insert chest CT premade phrase 14," "compare to prior exam"

**3. Free Text:**
- Type directly in the report section without template constraints
- Always available as a fallback; useful for unstructured notes or for cases that don't fit any template

**Report Template System:**

**Management:** Administration > Settings > Report Templates

**Structure:**
- Templates define section structure (Technique, Comparison, Findings, Impression)
- Templates define subsections (Lungs, Pleura, Mediastinum for chest CT)
- Templates provide standard phrasing and prompts
- Hospital can create custom templates

**Multiple Templates Per Exam:**
- CT Chest exam might have:
  - "Chest CT Standard" (default)
  - "Chest CT Trauma Protocol"
  - "Chest CT Oncology Follow-up"
- Radiologist chooses based on clinical context

**Template Assignment:**
- Two-way: From template manager (assign to multiple exams) or from exam catalog (select template)
- Same pattern as Execution Form Templates

**Premade Phrases System:**

**What They Are:**
- Standard text snippets for common findings
- Quick insertion during report writing
- Speed up reporting without copy-paste

**Examples:**
- "Lungs are clear. No focal consolidation, mass, or nodule."
- "Small left pleural effusion."
- "No evidence of pulmonary embolism."

**Management:** My Preferences > My Premade Phrases

**Structure:**
- Global library (admin-created, all radiologists can use)
- Personal library (each radiologist creates their own)
- Organized by category (anatomy, modality, finding type)
- Autocomplete or dropdown insertion during typing

**Usage:**
- Template provides structure (sections)
- Premade phrases provide content (quick text insertion)
- Radiologist can mix phrases + custom text

**Report Templates vs Premade Phrases:**
- Template = structure/skeleton (sections, order, prompts)
- Phrases = content/text snippets (findings, descriptions)
- Both complement each other

#### Smart Signing Logic

**When radiologist writes reports and clicks signing button:**

**System Analyzes:**
1. Which exams were selected
2. Which orders those exams belong to
3. For each order: Are ALL exams reported? Are ALL exams at least EXECUTED?
4. Categorizes orders: Ready to sign vs. Incomplete vs. Blocked

**Signing Dialog Appears:**

**Example: All orders complete**
```
 SIGN REPORTS 
 
  You are about to sign: 
 
 Order #1234 (2 exams) 
 CT Chest (AN100) 
 CT Head (AN101) 
 
 Order #1235 (1 exam) 
 MR Brain (AN102) 
 
  This will generate 2 official reports. 
 
  [Cancel] [Sign All Reports] 

```

**One click, multiple reports generated (one per order)**

**Example: Some orders incomplete**
```
 SIGN REPORTS 
 
  Ready to sign: 
 
 Order #1235 (1 exam) 
 MR Brain (AN102) 
 
  
 
 Cannot sign yet: 
 
 Order #1234 (incomplete) 
 CT Chest (AN100) - Report written 
 CT Head (AN101) - NO REPORT YET 
 
  You can sign Order #1235 now. 
  Return later to complete Order #1234. 
 
  [Cancel] [Sign Order #1235 Only] 

```

**Clear visibility into what can/cannot be signed and why**

**Smart Button Labels:**
- All complete: [Sign All]
- Some complete: [Sign Available]
- Nothing complete: [Save Drafts] (only option)

**Rules:**
- Cannot sign order until ALL exams in that order have reports
- Cannot sign order if any exam in that order is not yet EXECUTED
- Can sign multiple orders in one action
- Single digital signature action generates multiple official reports

**Assignment Warning:**
If radiologist tries to report exam assigned to someone else:
```
 WARNING

This exam is assigned to Dr. Rossi.
Are you sure you want to write this report?

[Cancel] [Continue Anyway]
```

**Doesn't block, but confirms intention**

#### Report Drafts

**Saving Progress:**
- [Save Drafts] button always available
- Reports saved as drafts (not visible to requesting doctor)
- Can return anytime to continue
- Draft status visible in worklist

**Worklist shows draft progress:**
```
Mario Rossi - Order #1234 - 2 exams
  CT Chest  (draft saved)
  CT Abdomen  (no report)
  [Continue Reporting]
```

#### Report Versioning & Addenda

**After Report Signed:**
- Report locked (immutable)
- Any changes require new version
- All versions saved permanently

**Adding Addendum:**

**Access:** Reported section > [Addendum] button next to order

**Behavior:**
- Clicking addendum on ANY exam from an order opens ALL exams from that order
- Cannot select exams from different orders
- Maintains order integrity (addendum applies to entire order/report)

**Addendum Interface:**
```
 ADD ADDENDUM: Order #1234 
 
  Current Report (Version 1 - read-only): 
  [Original report displayed for reference] 
 
  
 
 CT CHEST (AN100) 
  [Can modify/edit entire report section________] 
 
 CT HEAD (AN101) 
  [Can modify/edit entire report section________] 
 
  [Cancel] [Sign New Version] 

```

**Full Editing Capability:**
- Radiologist can modify, delete, rewrite anything
- Not just adding text - can fix typos, remove sections, change wording
- More flexible than traditional addendum (which only adds)

**After Signing:**
- Version 2 becomes current report
- Version 1 archived (still accessible)
- Complete version history maintained
- Each version immutable once signed

**Report History:**
```
Order #1234 Report Versions:

Version 2 (CURRENT) - Dec 20, 2:45pm - Dr. Bianchi
  [View]
  
Version 1 (archived) - Dec 20, 10:30am - Dr. Bianchi
  [View] [Compare to Current]
```

#### Peer Review Features (Coming Soon)

**Three features planned:**

**1. Request Consultation** (advisory, non-blocking)
- Request second opinion from colleague
- Consultant reviews and adds comments
- Original radiologist maintains ownership and signs

**2. Transfer Case** (full handoff)
- Transfer exam to specialist
- New radiologist takes full responsibility
- New radiologist writes and signs report

**3. Request Co-signature** (shared responsibility)
- Request colleague to co-sign report
- Both review and approve
- Both signatures on final report

**For first version:** Show buttons with "Coming Soon" label

---

### ENVIRONMENT 5: ARCHIVE / CLINICAL CONSULTATION

**Purpose:** Non-workflow lookup - search and view any exam at any time

**Who Uses:** Anyone with appropriate permissions (radiologists, referring doctors, clinical staff)

**Core Concept:** Pure information retrieval, not workflow processing

#### Two Search Modes

**Mode 1: Search Patient (Primary)**

**Search by:**
- Patient name
- Patient ID/MRN
- Date of birth
- Accession number
- Date range
- Exam type
- Any captured data

**Results Always Show:** Patient entries (never individual exams alone)

**Philosophy:** Everything routes through patient

**Example:**
- Search: "Accession ACC12345"
- Result: "Mario Rossi" (patient entry)
- Click patient -> Patient detail with exam list
- ACC12345 highlighted in list

**Interface:**
```
 SEARCH PATIENT 
 
  Search: [Patient name, ID, accession, DOB____] 
 
  Advanced Filters: 
 Date Range: [Last 30 days 
 Exam Type: [All 
 Status: [All 
 
  Results: 
 
  Mario Rossi - DOB: 01/15/1975 - MRN: 12345 
 3 exams found 
 [View Patient Details] 
 

```

**Mode 2: Search by Criteria (Bulk Search)**

**Search by:** Complex multiple filters
- Date range + modality + status + urgency
- "All CT exams in December with STAT urgency that were reported"

**Results Show:** List of exams (not patients)

**Use Cases:**
- Bulk operations
- Quality audits
- Statistics gathering
- Pattern finding

**Interface:**
```
 SEARCH BY CRITERIA 
 
  Build your search: 
 
  Date Range: [Dec 1] to [Dec 31] 
  Modality:  CT X-ray MR 
  Status:  REPORTED 
  Urgency:  STAT 
 
  [Search] 
 
  Results: 45 exams found  Count provides stats 
 
  CT Chest (AN100) - Mario Rossi - Dec 20 
  CT Head (AN101) - Mario Rossi - Dec 20 
  ... 
 
  [Export Results to CSV] 

```

#### Patient Detail View

**Accessed from Mode 1 search results:**

```
 PATIENT: Mario Rossi 
 
  DOB: 01/15/1975 | MRN: 12345 
 
  [Filter: All  [Date: All time 
 
  EXAM HISTORY: 
 
  Order #1234 - Dec 20, 2024 - Cardiology 
 CT Chest (AN100) - REPORTED 
 [View Details] [View Report] 
 
 CT Head (AN101) - REPORTED 
 [View Details] [View Report] 
 
  Order #1189 - Nov 15, 2024 - Orthopedics 
 X-ray Ankle (AN085) - REPORTED 
 [View Details] [View Report] 
 

```

**Complete patient exam history:**
- Organized by order
- Color-coded by urgency
- Shows status
- Links to details and reports

#### Exam Detail View

**Accessed by clicking [View Details] on any exam:**

```
 EXAM DETAILS: CT Chest (AN100) 
 
  Patient: Mario Rossi 
  Order: #1234 | Accession: AN100 
  Status: REPORTED 
  Urgency:  STAT (Req: STAT, Rad: 1) 
 
 ORDER INFORMATION 
  Requesting Doctor: Dr. Bianchi (Cardiology) 
  Clinical Indication: Chest pain, rule out PE 
  Ordered: Dec 20, 10:00am 
 
 SCHEDULING 
  Scheduled: Dec 20, 2:00pm - CT1 
  Scheduled by: Scheduler Giulia 
 
 CHECK-IN 
  Checked in: Dec 20, 2:05pm 
  By: Receptionist Anna 
  Mobility: Wheelchair 
  Notes: Contrast allergy confirmed 
 
 EXECUTION 
  Executed: Dec 20, 2:25pm - CT1 
  Technician: Tech Mario 
  Radiologist present: None 
  Contrast: Yes, 100ml iodinated 
  Radiation dose: 450 mGy 
  Image quality: Diagnostic 
  Tech notes: "Patient cooperative" 
  Images to PACS: Confirmed 
 
 REPORTING 
  Reported: Dec 20, 3:15pm 
  Radiologist: Dr. Bianchi 
  Report versions: 2 
 Version 1 - Dec 20, 3:15pm [View] 
 Version 2 - Dec 20, 5:30pm (current) [View] 
 
  [View Current Report] 
  [View All Versions] 
  [Open in PACS] 
  [Export to PDF] 
 

```

**Complete workflow timeline:**
- Every step documented
- All captured data visible
- Who did what, when
- Complete audit trail

#### Export & Print

**Supported:**
-  Export report to PDF (formatted, text only)

**Coming Soon:**
-  DICOM export
-  Physical CD burning

**Images stay in PACS** (no image export from AIRIS)

#### Permissions

**Archive Environment Permissions:**

Configured in User Management > Archive tab:
-  Activate Archive Environment (enable access)
- When activated, advanced permissions:
  - Can view all exam details
  - Can view reports
  - Can view execution data
  - Can export reports to PDF
  - Can access PACS from Archive

**Same permission pattern as all other environments**

---

### ENVIRONMENT 6: ADMINISTRATION

**Purpose:** Configure Radiology Module (modalities, folders, exams, users, settings)

**Who Uses:** Module Admins, System Admins

**Access:** Via settings icon ( > Administration

#### Six Configuration Sections

**1. Modalities**

**Manage physical equipment:**
- Create/edit/delete modalities
- Configure: Name, type(s), DICOM settings, status
- Assign to folder (optional)
- Assign which exam types this modality can perform (from Nomenclatore)

**Modality Fields:**
- Name (e.g., "CT1", "Hybrid Scanner")
- Modality types (CT, X-ray, MR, US, PET - can select multiple)
- IP address, DICOM AE Title, Port
- Status (Operational, Maintenance, Out of Service)
- Folder assignment
- Exam assignments (which exams this modality can perform)

**DICOM Testing:**
- [Test Connection] button (optional, nice-to-have)
- Ping test + C-ECHO test
- Validates configuration
- Not blocking - just validation tool

**DICOM Worklist Manager:**
- See CORE SYSTEM COMPONENTS Section 12 for full design
- Hospital-wide tool in System Tools (not module-specific)
- Manages worklist generation and modality registration across all departments
- For first version: PACS manages worklist (standard approach)

**2. Folders**

**Organize modalities visually:**
- Create/edit/delete folders
- Simple name + description
- Pure organizational tool (no logic, no permissions)
- Optional (system works without folders)

**Purpose:** Help organize when department has many modalities

**3. Exam Catalog (Nomenclatore)**

**Master list of exam types:**
- View all exam types
- Add/edit/delete individual exams
- Configure AIRIS code + External code (for integration)
- Set default duration
- Advanced settings per exam

**Import Options:**

**Simple Import:**
- Upload file (CSV, Excel, any format)
- AI analyzes structure
- Basic mapping
- Import all

**AI-Assisted Import:**
- Upload file
- Conversational AI interaction
- "Import only CT exams"
- "Skip duplicates"
- "Merge with existing catalog"
- Complex filtering and decisions
- AI handles edge cases

**For Italy:**
- Import national catalog as starting point
- Keep synchronized with updates
- Hospital can add custom exams

**Exam Catalog Fields:**
- AIRIS Code (always present, e.g., "AIRIS_87.41.1")
- External Code (optional, e.g., "87.41.1" from national catalog)
- Exam Name (e.g., "CT Chest with contrast")
- Modality Type (CT, X-ray, MR, US, PET)
- Default Duration (minutes)
- Execution Form Template (linked)
- Report Templates (array, one marked default)

**Advanced Settings Per Exam:**

**Execution Form Configuration:**
- Assign Execution Form Template
- Or customize fields for this specific exam
- Define which fields appear (from predefined list)
- Set mandatory vs optional per field

**Report Template Configuration:**
- Assign multiple report templates
- Mark one as default
- Radiologist can choose at report time

**Integration Mapping:**
- External code enables integration with referring systems
- Orders arrive with external code -> AIRIS maps to internal exam type

**4. Users**

**Manage user access and permissions:**

**User List:**
- Shows all users assigned to Radiology Module
- Cannot create new users here (done in System Settings)
- Can only configure users already assigned

**Per User Configuration:**

**User Type:** (Metadata only, informational)
- Radiologist, Technician, Scheduler, etc.

**Modality Assignment:**
- Select which modalities this user can operate
- User only sees assigned modalities throughout all environments
- Filtering at modality level (exams follow)

**Environment Permissions (Tab-based):**
- Separate tab for each environment
- Activate/deactivate environment access
- When activated: Advanced permissions appear
- Granular permissions per environment

**Example - User Configuration:**
```
 CONFIGURE USER: Tech Mario 
 
  User Type: [Technician 
 
  Assigned Modalities: 
 CT1 
 CT2 
 X-ray1 
 
  [General] [Scheduling] [Check-in] [Execution] 
  [Reporting] [Archive] [Administration] 
 
 EXECUTION ENVIRONMENT 
 
 Activate Execution Environment 
 
 Permissions: 
 Can mark exams executed 
 Can fill execution forms 
 Can modify completed exams 
 Can undo execution (own exams) 
 
 
 
  [Save] 

```

**Permission Inheritance:**
- General tab: Module-wide permissions
- Environment tabs: Environment-specific permissions
- If environment not activated: User cannot access it

**5. Execution Form Templates**

**Manage execution form templates:**

**Template Management:**
- Create reusable templates
- Define which fields appear (from predefined list)
- Set mandatory vs optional per field
- Assign to multiple exam types

**Predefined Field List:**
- Technician who executed
- Radiologist who executed
- Radiologist to assign report to
- Nurse who assisted
- Second technician
- Contrast information
- Radiation dose
- Image quality
- Technical notes
- Images sent to PACS

**Fields controlled by system** (no custom field creation)

**Template Structure:**
```
Template: "CT Standard"

Fields:
 Technician who executed (mandatory)
 Radiologist executed (optional)
 Radiologist to assign report to (mandatory)
 Contrast (mandatory)
 Radiation dose (optional)
 Image quality (mandatory)
 Technical notes (optional)
 Images to PACS (optional, warning if unchecked)

Applied to:
 CT Chest with contrast
 CT Chest without contrast
 CT Abdomen
  (45 exams total)
```

**Template Assignment:**
- From template: [Manage] button shows assigned exams, bulk assign/unassign
- From exam catalog: Advanced settings assigns template or accesses template manager
- Two-way assignment for flexibility

**6. Report Templates**

**Manage report templates:**

**Template Management:**
- Create templates defining report structure
- Define sections (Technique, Comparison, Findings, Impression)
- Define subsections (Lungs, Pleura, Mediastinum for chest)
- Standard phrasing and prompts
- Assign to exam types

**Multiple Templates Per Exam:**
- Each exam type can have multiple templates
- One marked as default
- Radiologist chooses at report time
- Example: CT Chest has "Standard", "Trauma", "Oncology" templates

**Template Structure:**
```
Template: "Chest CT Standard"

Sections:
 Technique
 Comparison
 Findings
 - Lungs
 - Pleura
 - Mediastinum
 - Heart
 - Bones
 Impression

Assigned as DEFAULT to:
 CT Chest
 CT Chest with contrast

Also available for:
 CT Thorax
```

**Template vs Premade Phrases:**
- Templates = structure (sections, organization)
- Premade Phrases = content (text snippets)
- Both complement each other
- Premade Phrases managed in My Preferences (not here)

#### Module Settings

**Module-wide configuration:**

**Urgency Configuration:**
- Fixed 4 levels (cannot add/remove)
- Customize colors per level
- Customize labels per level
- Default configuration:
  - Level 1: Red, "STAT"
  - Level 2: Orange, "Urgent"
  - Level 3: Blue, "Routine"
  - Level 4: Gray, "Non-Urgent"

**Default Filters:**
- Default date ranges per environment
- Default status filters
- System-wide preferences

**Notification Preferences (Coming Soon):**
- When to notify radiologists (exam completed)
- When to notify referring doctors (report signed)
- Delivery methods

**Accession Number Format:**
- Prefix configuration
- Starting number
- Format pattern

**Assigned Containers (Read-Only View):**
```
Administration > Assigned Containers

Medication Containers assigned to this department:
  - Radiology Contrast Agents (22 items)
  
Contact System Admin to request changes
```

---

### MY PREFERENCES (Personal Customization)

**Purpose:** Personal settings for individual users (not admin functions)

**Who Uses:** All Radiology Module users

**Access:** Via settings icon ( > My Preferences

**Visual Hierarchy:** Settings icon in corner, separate from main navigation

#### Four Sections

**1. Reporting Preferences**

**My Premade Phrases:**
- [Manage Phrases] button
- Opens personal phrase library
- Create/edit/delete personal phrases
- Organized by category

**Default Report Template Preferences:**
- Override system default per exam type
- "When I report CT Chest, use [Chest CT Trauma] instead of [Chest CT Standard]"
- Dropdown per exam type
- Moves only default selection from Admin to personal
- Admin still manages template creation/assignment

**2. Worklist & Filter Preferences**

**Default Worklist Filter:**
- Choose which modalities are selected by default on login
- Options: "All assigned" (default) or a saved preset
- If a default preset is set, the filter activates with that preset every time the user enters the Worklist

**Saved Filter Presets:**
- Create named combinations of primary filter (modalities) + secondary filters (urgency, exam type, time range)
- Name them (e.g., "My CT Shift", "STAT Morning", "CT1 + CT2 Afternoons")
- Presets appear in the Worklist filter bar as quick-select options
- [+ Create Preset] option in the filter bar creates a new preset from current filter state
- Manage presets here: rename, edit, delete
- "All" preset is built-in and cannot be deleted

**Default Sort Order:**
- Per Worklist sub-view (Check-In, Execution, Reporting)
- By urgency / by time / by patient name

**Reporting-Specific Defaults:**
- Default assignment filter: [Assigned to Me + Unassigned] (default)

**3. Appearance**

**Urgency Color Coding:**
- Customize colors for levels 1-4
- Personal preference (overrides module default)
- Affects all environments

**4. Coming Soon**

**Voice Dictation Settings** 
- Language, speed, punctuation
- When native dictation available

**Notification Preferences** 
- When notification system exists
- May be system-wide (not just Radiology)

**Color Theme** 
- Light/dark mode
- After design established

**Multi-language Support** 
- Far future

---

## GASTROENTEROLOGY/ENDOSCOPY MODULE - COMPLETE DESIGN

### Module Overview

**Purpose:** Manage complete gastroenterology/endoscopy workflow from order receipt through report delivery

**Core Principle:** Same structure as Radiology Module with procedure-specific adaptations

**Six Environments:**
1. **Scheduling** - Schedule pending procedures on endoscopy room agendas
2. **Check-in** - Mark patient arrived and entering endoscopy suite
3. **Execution** - Mark procedure completed with medication tracking
4. **Reporting** - Write and sign reports with image selection
5. **Archive/Clinical Consultation** - Search and view any procedure at any time
6. **Administration** - Configure rooms, scopes, procedures, users, settings

**Plus:**
- **My Preferences** - Personal customization

---

### Module Navigation Structure

**Main Navigation (Environments - Primary):**
```
 [SCHEDULING] [CHECK-IN] [EXECUTION] [REPORTING] [ARCHIVE]
```

**Settings Icon ( Dropdown:**
```
 My Preferences (all users)
 Administration (Module Admins only)
```

**Visual Hierarchy:**
- Environments = Large, prominent (where users do their work)
- Settings icon = Small, in corner (configuration access)

---

### Core Data Structures

**Same as Radiology with terminology adapted:**

#### Orders
```
order_id
patient_id
requesting_doctor_id
requesting_department
clinical_indication (why procedure needed)
requested_urgency (text - as received)
created_at
created_by_user_id
request_group_id (optional)
```

**Order Types (same three as Radiology):**
- **Type A (Pre-booked):** Arrives WITH schedule - Status: SCHEDULED
- **Type B (Request):** Arrives WITHOUT schedule - Status: PENDING
- **Type C (Self-created):** Gastro creates for their own patients

#### Exams (Procedures)
```
exam_id
accession_number (e.g., "AIRIS_ENDO_123")
order_id
exam_type (EGD, Colonoscopy, ERCP - from Nomenclatore)
modality_type (Gastroscope, Colonoscope, etc.)
status (PENDING -> SCHEDULED -> CHECKED IN -> EXECUTED -> REPORTED)
protocol_notes
technical_notes
requested_urgency (text - preserved)
gastro_urgency (1-4 - Gastro's internal priority)
physician_executed
physician_assigned
created_at
updated_at
```

**Status Progression:**
```
PENDING -> SCHEDULED -> CHECKED IN -> EXECUTED -> REPORTED
```

**Urgency System:**
- Two fields (requested + gastro_urgency 1-4)
- Color coding (Red/Orange/Blue/Gray)
- Configurable in settings

#### Modalities
```
modality_id
name (e.g., "Endo Suite 1", "Procedure Room 2")
modality_types (Gastroscope, Colonoscope, etc.)
ip_address
dicom_ae_title (if applicable)
port
status (Operational, Maintenance, Out of Service)
folder_id (optional)
assigned_exams (which procedures this room/scope can perform)
```

**Same structure as Radiology - rooms/equipment specific to location**

#### Other Structures
- **Folders** - Optional visual organization
- **Agendas** - Procedure room schedules
- **Appointments** - Scheduled slots
- **Nomenclatore** - Procedure catalog (EGD, Colonoscopy, ERCP, etc.)

---

### ENVIRONMENT 1: SCHEDULING

**Same structure and workflow as Radiology:**

**Two-section layout:**
- **Pending Procedures List** - Patient entries with PENDING procedures
- **Agenda Calendar** - Day/Week/Month views

**Workflow (same as Radiology — voice/text primary, GUI fallback):**

The scheduler describes the intent: "schedule Rossi's gastroscopy for tomorrow afternoon," "find the next routine colonoscopy slot for Bianchi." The system identifies the procedure, finds compatible endoscopy rooms, and creates the appointment. GUI equivalent path:

1. View pending procedures
2. Select procedure
3. Select compatible agenda (endoscopy room)
4. Drag to time slot
5. Appointment created, status: PENDING -> SCHEDULED

**Features:**
- Agenda compatibility filtering (compatible agendas bright, incompatible dimmed)
- Urgency modification (view requested, adjust gastro_urgency 1-4)
- Rescheduling, unscheduling (permission-based)

---

### ENVIRONMENT 2: CHECK-IN

**Same structure as Radiology with procedure-specific data:**

**Two-section layout:**
- **To Check In** (main) - SCHEDULED procedures for today
- **Currently Checked In** (secondary) - Procedures in progress

**Workflow:**
1. Patient arrives, called to endoscopy suite
2. Select patient, see scheduled procedures
3. Select procedure(s) to check in
4. Optional data capture

**Check-in Data:**
```
Mobility: [Autonomous / Wheelchair / Bed / Stretcher 
Cooperation: [Cooperative / Anxious / Confused 
 Allergies confirmed
 Fasting confirmed
 Consent signed
Additional notes: [_______________________________]
```

**After check-in:**
- Status: SCHEDULED -> CHECKED IN
- Timestamp recorded
- Can undo if needed (permission-based)

---

### ENVIRONMENT 3: EXECUTION

**Same structure as Radiology with KEY ADDITIONS for Gastro/Endo:**

**Two-section layout:**
- **To Execute** (main) - CHECKED IN procedures ready to perform
- **Executed Today** (secondary) - Completed procedures

**Workflow:**
1. Click patient -> popup shows procedures
2. Select procedure(s), click [Execute Selected]
3. **Dynamic execution form appears**

#### Execution Form - Gastro/Endo Specific

**Example: Colonoscopy Execution Form**

```
 EXECUTE: Colonoscopy 
 
  PERSONNEL: 
  Physician who performed: * [Dr. Rossi 
  Nurse who assisted: [Nurse Anna 
  Anesthesiologist: [Dr. Bianchi  (optional) 
 
  EQUIPMENT USED: 
  Scope: [Select scope  Coming Soon 
  (Scope tracking and washing verification) 
 
  MEDICATIONS/SEDATION ADMINISTERED: 
 Midazolam - [___] mg 
 Fentanyl - [___] mcg 
 Propofol - [___] mg 
 Other: [____________] - [___] 
 
  PROCEDURE QUALITY: 
 Complete Incomplete 
 
  FINDINGS SUMMARY: 
 Normal 
 Polyps found (number: [__]) 
 Biopsies taken (number: [__]) 
 
  TECHNICAL NOTES: 
  [_______________________________________] 
 
  IMAGES: 
  Images captured: *  Yes (12 images) 
 
  [Cancel] [Complete Execution] 

```

**Key Difference from Radiology:**

**Medications/Sedation Section:**
- Checkboxes come from **System Settings > Container Management**
- Department assigned to medication containers
- Select medications used + enter dosages
- Tracked for compliance and documentation

**Coming Soon:**
- Scope selection (from Scope Inventory)
- Washing verification (integration with automated washers)
- Legal compliance tracking

**After Execution:**
- Status: CHECKED IN -> EXECUTED
- Physician assignment recorded
- All data saved (personnel, medications, findings, images)
- Procedure appears in Reporting worklist

---

### ENVIRONMENT 4: REPORTING

**Same structure as Radiology with KEY ADDITION: Images displayed in AIRIS**

**Two-section layout:**
- **To Report** (main) - EXECUTED procedures ready for reporting
- **Reported** (secondary) - Recently signed reports

**Assignment Filters (same as Radiology):**
- Assigned to Me + Unassigned (default)
- Assigned to Me Only
- Unassigned Only
- All Procedures

**Additional Filters:**
- Modality type, date range, urgency, source, saved presets

#### Reporting Page Structure

**Patient Profile Sidebar (collapsible):**
```
 PATIENT: Mario Rossi 
 
  DOB: 01/15/1975 
  MRN: 12345 
 
  Prior Procedures: 
 
 Colonoscopy (6 mo ago) 
 [View Report] 
 [View Images] 
 

```

**Main Reporting Area with Image Selection:**

```
 REPORTING: Colonoscopy (AN200) 
 
 IMAGES FROM PROCEDURE 
 
 12 images available: 
 
 [[[[[[[[[[[[Click images to select for report 
 (Click to enlarge, click again to select) 
 
 Selected (3): [[[[Clear All] 
 
 
 
  Template: [Colonoscopy Standard  [Dictate] 
 
 FINDINGS 
 
  [Report text content_______________________] 
 
 SELECTED IMAGES 
  (Selected images will appear here in final report) 
 
  [Save Draft] [Sign Report] 
 

```

**Image Handling:**

**Image Source (V1):**
- USB/File import via [Import Images] button
- Upload from local storage
- Images stored in AIRIS

**Image Source (Future):**
- PACS integration (automatic retrieval)
- Direct scope integration
- USB remains as fallback

**Image Display:**
- Thumbnail grid
- Click to enlarge (preview modal)
- Click to select for report
- Multiple selection possible

**Image Placement in Report:**
- All selected images appear **at end of report**
- Consistent formatting
- Avoids layout issues in PDF generation

**Report Creation (same as Radiology):**
- Template-based (multiple templates, one default)
- Voice dictation (primary input method — speech transcribed into the active template, with medical-language-aware formatting)
- Free text (always available as fallback)

**Smart Signing Logic (same as Radiology):**
- 1 order = 1 signed report
- Cannot sign until ALL procedures in order have reports
- Can sign multiple orders in one action
- Clear feedback dialog

**Report Versioning:**
- Addendum = full edit + resign new version
- All versions preserved
- Version history accessible

**Peer Review Features:** Coming Soon (same 3 types as Radiology)

---

### ENVIRONMENT 5: ARCHIVE

**Same structure as Radiology with image viewing in AIRIS:**

**Two Search Modes:**
- **Search Patient** (primary) - always returns patients
- **Search by Criteria** (bulk) - complex filters, returns procedure list

**Patient Detail View:**
- Complete procedure history
- Organized by order
- View details, view reports, view images

**Procedure Detail View:**

```
 PROCEDURE DETAILS: Colonoscopy (AN200) 
 
  [Complete workflow timeline] 
 
 PERSONNEL 
  Physician: Dr. Rossi 
  Nurse: Nurse Anna 
 
 MEDICATIONS ADMINISTERED 
 Midazolam - 5mg 
 Fentanyl - 100mcg 
 
 FINDINGS 
  Complete to cecum, 2 polyps removed 
 
 IMAGES 
  12 images captured 
  [View Images] 
 
 REPORTING 
  [View Current Report] [View All Versions] 
  [Export to PDF] 
 

```

**Click [View Images]:**
- Opens image viewer IN AIRIS (not external PACS)
- Same thumbnail grid as Reporting
- View-only (no selection, report already finalized)
- Same technical backend as Reporting

**Export Options:**
- PDF report (text + selected images at end)
- DICOM export (Coming Soon)
- CD burning (Coming Soon)

---

### ENVIRONMENT 6: ADMINISTRATION

**Five Core Configuration Sections:**

**1. Modalities**
- Endoscopy rooms/suites and scopes
- Configure: Name, type(s), status, folder assignment
- Assign which procedures this modality can perform

**2. Folders**
- Optional visual organization
- Pure organizational tool (no logic)

**3. Exam Catalog (Nomenclatore)**
- Master list of procedure types (EGD, Colonoscopy, ERCP, etc.)
- AIRIS code + External code (for integration)
- Default duration
- Advanced settings: Execution form, report templates

**Import Options:**
- **Simple Import:** Bulk upload
- **AI-Assisted Import:** Conversational, smart filtering
  - "Import only colonoscopy procedures"
  - "Skip duplicates"
  - AI handles complex decisions

**4. Users**
- Manage user permissions
- Assign to modalities (filters what user sees)
- Tab-based environment permissions

**5. Execution Form Templates**
- Create reusable templates
- Define fields (from predefined list)
- Set mandatory vs optional
- Assign to multiple procedure types

**6. Report Templates**
- Define report structure (sections, subsections)
- Multiple templates per procedure type
- One marked as default
- Physician chooses at report time

**Module Settings:**
- Urgency configuration (1-4 scale, colors/labels)
- Default filters
- Accession number format

**Assigned Containers (Read-Only):**
```
Administration > Assigned Containers

Medication Containers assigned to this department:
  - Gastro Standard Medications (45 items)
  - Experimental Drugs (8 items)
  
Total: 53 medications available
Contact System Admin to request changes
```

**Coming Soon:**
- Scope Inventory management
- Scope washing verification
- Hardware integration with washers

---

### MY PREFERENCES (Personal Customization)

**Same structure as Radiology:**

**Three Sections:**

1. **Reporting Preferences**
 - **My Premade Phrases** (personal library only)
 - Default Report Template Preferences (per procedure type)

2. **Worklist & Filter Preferences**
 - Default filters per environment
 - Saved filter presets
 - Default sort order

3. **Appearance**
 - Urgency color coding (1-4 levels)

4. **Coming Soon**
 - Voice dictation
 - Notifications
 - Color theme

---

## KEY DIFFERENCES: GASTRO/ENDO VS RADIOLOGY

### Similarities (Leveraging Radiology Design):
- Six environment structure
- Order -> Schedule -> Check-in -> Execute -> Report workflow
- Smart report compilation (1 order = 1 signed report)
- Two-field urgency system
- User-modality assignment filtering
- Template management systems
- Permission architecture
- My Preferences structure

### Differences:

**1. Execution Environment:**
- **Medications/Sedation tracking** (from containers)
- Scope selection (Coming Soon)
- Procedure-specific documentation

**2. Reporting Environment:**
- **Images displayed IN AIRIS** (not external PACS)
- Image selection for embedding in report
- Images at end of report

**3. Archive Environment:**
- [View Images] opens viewer in AIRIS
- Same technical backend as Reporting

**4. Data Sources:**
- Medications from System Settings containers
- Images from USB/file import (V1)
- PACS integration (Coming Soon)

---

## CARDIOLOGY MODULE - COMPLETE DESIGN

### Module Overview

**Purpose:** Manage complete cardiology workflow from order receipt through report delivery across all cardiology sub-specialties: diagnostic imaging (echocardiography, stress testing, ECG), interventional procedures (cardiac catheterization, PCI), ambulatory monitoring (Holter), and device management (pacemaker/ICD follow-up).

**Core Principle:** Single unified module with multiple workflow tracks. Same AIRIS architecture patterns as Radiology and Gastroenterology, adapted for cardiology-specific requirements including structured measurements, time-critical pathways, and device tracking.

### Five Workflow Tracks

| Track | Procedures | Status Flow |
|---|---|---|
| **DIAGNOSTIC** | Echo, ECG, Stress Test | PENDING  SCHEDULED  CHECKED IN  EXECUTED  REPORTED |
| **HOLTER** | Holter monitoring, Event recorders | PENDING  SCHEDULED  DEVICE ISSUED  DEVICE RETURNED  REPORTED |
| **CATH_LAB** | Diagnostic cath, PCI, structural | PENDING  SCHEDULED  CHECKED IN  IN PROCEDURE  RECOVERY  REPORTED |
| **DEVICE_CLINIC** | PM/ICD follow-up | SCHEDULED  CHECKED IN  INTERROGATION COMPLETE  REPORTED |
| **STEMI** | Emergency primary PCI | ALERT RECEIVED  EN ROUTE  ARRIVED  IN PROCEDURE  RECOVERY  REPORTED |

### Six Environments (Standard AIRIS Pattern)
1. **Scheduling** - Schedule pending procedures on room/equipment agendas
2. **Check-in** - Mark patient arrived and entering procedure area
3. **Execution** - Mark procedure completed with track-specific documentation
4. **Reporting** - Write and sign reports with structured data support
5. **Archive/Clinical Consultation** - Search and view any procedure at any time
6. **Administration** - Configure rooms, equipment, procedures, users, settings

**Plus:**
- **My Preferences** - Personal customization

---

### Module Navigation Structure

**Main Navigation:**
```
 [SCHEDULING] [CHECK-IN] [EXECUTION] [REPORTING] [ARCHIVE]
```

**Track Indicator:** When in workflow environments, current track context shown:
```
EXECUTION > Track: DIAGNOSTIC (Echo)
```

User can filter by track or view all tracks combined.

---

### Core Data Structures

#### Orders
```
order_id (unique, auto-generated)
patient_id (FK  Patients)
requesting_doctor_id (FK  Users)
requesting_department (which AIRIS module created this)
clinical_indication (text)
requested_urgency (text - as received)
track (DIAGNOSTIC | HOLTER | CATH_LAB | DEVICE_CLINIC | STEMI)
created_at (timestamp)
created_by_user_id (FK  Users)
request_group_id (optional)
```

**Track determines workflow and status progression.**

#### Exams (Procedures/Studies)
```
exam_id (unique, auto-generated)
accession_number (e.g., "AIRIS_CARD_001")
order_id (FK  Orders)
exam_type (from Nomenclatore - Echo TTE, Stress Echo, Cath Diagnostic, etc.)
modality_type (Echo, ECG, StressTest, Cath, EP, DeviceCheck, Holter)
track (DIAGNOSTIC | HOLTER | CATH_LAB | DEVICE_CLINIC | STEMI)
status (track-dependent)
protocol_notes
technical_notes
requested_urgency (text - preserved)
cardiology_urgency (1-4)
performer_id (FK  Users)
assigned_to_id (FK  Users - for reporting)
created_at
updated_at
```

#### Status Progressions by Track

**DIAGNOSTIC:** PENDING  SCHEDULED  CHECKED IN  EXECUTED  REPORTED

**HOLTER:** PENDING  SCHEDULED  DEVICE ISSUED  DEVICE RETURNED  REPORTED

**CATH_LAB:** PENDING  SCHEDULED  CHECKED IN  IN PROCEDURE  RECOVERY  REPORTED

**DEVICE_CLINIC:** SCHEDULED  CHECKED IN  INTERROGATION COMPLETE  REPORTED

**STEMI:** ALERT RECEIVED  EN ROUTE  ARRIVED  IN PROCEDURE  RECOVERY  REPORTED

---

### New Data Structures (Cardiology-Specific)

#### Echo Measurements
```
measurement_id (unique)
exam_id (FK  Exams)
measurement_type (LVEF, LVEDD, LVESD, TAPSE, etc.)
value (numeric)
unit (%, mm, cm/s, ml)
normal_range_min, normal_range_max
abnormal_flag (boolean - auto-calculated)
method (e.g., "Simpson biplane")
measured_by_user_id
measured_at
source (MANUAL | IMPORTED)
```

**Measurement Categories:** LV (LVEF, LVEDD, LVESD, GLS), RV (TAPSE, FAC), Atria (LA volume), Aorta, Valves (gradients, areas, regurgitation), Pressures (PASP, RAP)

**Key Feature:** Measurements are trendable over time (patient EF history charts in Archive)

#### STEMI Time Points
```
stemi_times_id (unique)
exam_id (FK  Exams)
symptom_onset (timestamp)
first_medical_contact (timestamp)
ecg_acquisition_time (timestamp)
hospital_arrival (timestamp)
cath_lab_arrival (timestamp)
arterial_access_time (timestamp)
wire_crossing_time (timestamp - defines reperfusion)
-- Auto-calculated --
fmc_to_reperfusion_minutes (target <120 min)
door_to_balloon_minutes (target <60 min)
fmc_target_met (boolean)
dtb_target_met (boolean)
```

#### Holter Device Inventory
```
device_id (unique)
device_type (Holter24, Holter48, Holter7Day, EventRecorder)
serial_number
manufacturer, model
status (Available, Issued, InAnalysis, Maintenance, Retired)
current_exam_id (nullable)
current_patient_id (nullable)
issued_at, expected_return
```

#### Cath Lab Procedure Details
```
cath_details_id (unique)
exam_id (FK  Exams)
access_site (Radial | Femoral | Brachial)
access_side (Left | Right)
sheath_size (French)
fluoroscopy_time_minutes
dap_gy_cm2 (Dose Area Product)
drl_exceeded (boolean - auto)
contrast_type, contrast_volume_ml
pre_procedure_creatinine, pre_procedure_egfr
closure_method
procedure_success (boolean)
complications (None | list)
```

#### Coronary Findings
```
finding_id (unique)
exam_id (FK  Exams)
vessel (TCS | IVA_PROX | IVA_MID | CX_PROX | CDX_PROX | etc.)
stenosis_percent (0-100)
stenosis_significance
timi_flow_pre, timi_flow_post
ffr_value, ifr_value (if measured)
```

**Italian Terminology Required:** TCS (Left Main), IVA (LAD), Cx (Circumflex), CDx (RCA)

#### Implanted Devices Registry
```
implant_id (unique)
exam_id (FK  Exams)
device_category (Stent | Balloon | ClosureDevice)
device_type (DES | BMS | DCB)
manufacturer, model, dimensions
lot_number (mandatory for traceability)
implant_location
deployment_pressure_atm
implanted_by_user_id
```

#### CIED Registry (Pacemakers/ICDs)
```
cied_id (unique)
patient_id (FK  Patients)
device_type (Pacemaker | ICD | CRT_P | CRT_D)
manufacturer (Medtronic | Abbott | Boston | Biotronik)
model, serial_number
implant_date
lead_configuration
status (Active | Explanted | ERI | EOL)
last_interrogation_date
```

#### Device Interrogation Data
```
interrogation_id (unique)
exam_id (FK  Exams)
cied_id (FK  CIED Registry)
battery_voltage, battery_status, estimated_longevity
ra_impedance, ra_sensing, ra_threshold (repeat for RV, LV)
af_burden_percent, at_af_episodes
vt_episodes, vf_episodes
atp_delivered, shocks_delivered
inappropriate_therapy (boolean)
mode, base_rate, max_tracking_rate
programming_changes_made
data_source (InPerson | RemoteMonitoring)
```

---

### ENVIRONMENT 1: SCHEDULING

**Same structure as Radiology with track filtering:**

**Track Filter Bar:**
```
Track: [All  [DIAGNOSTIC] [HOLTER] [CATH_LAB] [DEVICE_CLINIC]
```

Note: STEMI does not appear in Scheduling (emergency pathway bypasses scheduling)

**Two-section layout:**
- Pending Procedures List (by patient, sorted by urgency)
- Agenda Calendar (Day/Week/Month views)

**Features:**
- Agenda compatibility filtering (track match + modality type match)
- Urgency modification (view requested, adjust cardiology_urgency 1-4)

**Holter Special:** Two-appointment scheduling (device issue + return), system prompts for return appointment

**Cath Lab Special:** Session-based view (AM/PM blocks) common

---

### ENVIRONMENT 2: CHECK-IN

**Same structure as Radiology with track-specific data:**

**Track Tabs:**
```
[ALL] [DIAGNOSTIC] [HOLTER] [CATH_LAB] [DEVICE_CLINIC]
```

**Check-in Data by Track:**

**DIAGNOSTIC (Echo, ECG):** Standard fields only

**DIAGNOSTIC (Stress Test):** + Fasting, current medications (beta-blockers)

**CATH_LAB:** + Fasting (mandatory), Consent (mandatory), Creatinine/eGFR (mandatory), IV access, contrast allergy flag

**DEVICE_CLINIC:** + Symptoms since last visit, device alerts received

---

### ENVIRONMENT 3: EXECUTION

**Track-specific execution forms:**

#### DIAGNOSTIC: Echo Execution Form
- Personnel: Performed by (TFCPC or Cardiologist), Cardiologist to report
- Technical: Equipment, image quality, contrast used, study completeness
- Urgent findings flag (triggers notification)
- Measurements entry (optional at execution, editable at reporting)

**Measurement entry — DICOM SR ingestion primary, structured form as review surface:**

Modern echo machines export structured measurement data via DICOM Structured Report (DICOM SR). AIRIS ingests the SR alongside the images: LV (LVEF, LVEDD, LVESD, GLS), RV (TAPSE, FAC), atria, aorta, valves, pressures — all populated from the source. The cardiologist reviews the ingested measurements, with abnormal values auto-highlighted, edits any that need correction (the system records the edit alongside the originally-imported value for audit), and approves.

A structured manual-entry form is available as fallback for legacy machines that don't export SR or for measurements taken outside the recorded study. It's not the default surface.

#### DIAGNOSTIC: Stress Test Execution Form
- Personnel: Technician, Supervising Cardiologist (must be present)
- Protocol: Exercise (Bruce, etc.) or Pharmacologic (Dobutamine from Medication Container)
- Hemodynamics: Resting/Max HR, BP, Target achieved
- Reason for stopping, Symptoms, ECG findings
- If Stress Echo: Wall motion findings
- Test adequacy

#### HOLTER: Device Issue Form
- Device selection (from Device Inventory - shows available devices)
- Applied by, Application time, Expected return
- Patient instructions checklist

#### HOLTER: Device Return Form
- Return processing: Received by, Return time
- Wear compliance (Good/Partial/Poor)
- Device condition, Diary received, Data downloaded
- Cardiologist to analyze/report

#### CATH_LAB: Procedure Execution Record

The cath lab procedure produces a substantial technical record. Most of it should not be retyped into a form.

**System-sourced (no manual entry required):**
- Radiation: Fluoroscopy time and DAP read directly from the cath lab system; DRL alerts computed automatically against configured thresholds
- Contrast: Type and volume tracked through the contrast injector system or — failing that — computed from the medication container draws made during the case
- Devices used (stents, balloons, wires): UDI, lot number, manufacturer, model captured by barcode or RFID scan during the case (EU MDR 2017/745)
- Procedure timestamps: Sheath in, first injection, balloon up, last injection, sheath out — captured automatically from the cath lab system events

**Captured by ambient/voice during the case (team communication is already happening):**
- Coronary findings per vessel (Italian terminology), dominance, SYNTAX score — the operator narrates findings vessel by vessel as they're identified; the system structures the narration. SYNTAX score is computed from the structured findings.
- Access details, closure method, complications, outcome — narrated and structured

**Confirmed/edited at end of case in a single review surface:**
- Team composition (First/Second Operator, Scrub/Monitor/Circulating Nurses, TSRM, Anesthesiologist) — defaults from the room's case assignment, surfaced for confirmation
- TIMI flow pre/post for PCI cases — operator's clinical judgment, narrated at the time
- LV Angiography findings (if performed) — narrated

**Status transition:** Once the cath lab system signals end-of-case and the operator confirms the record, status moves to RECOVERY.

#### CATH_LAB: Recovery Completion

Post-procedure checks (access site, vitals, ECG) flow in from monitoring; recovery duration computes automatically; disposition (discharge / ward / ICU) is the clinician's call. Status: EXECUTED.

#### DEVICE_CLINIC: Interrogation — Programmer Ingestion Primary

Device interrogation produces a structured report from the device programmer. AIRIS ingests the programmer's structured output (PDF + structured data when available, or just PDF parsed for structured fields) and populates:

- Battery: voltage, status, longevity
- Leads: impedance, sensing, threshold per lead
- Arrhythmia log: AF burden, VT/VF episodes
- Therapy delivered: ATP, shocks, inappropriate therapy
- Programming changes: mode, rates, what was changed

The cardiologist reviews the ingested record, confirms patient status and pocket-site assessment (clinical observation, not in the programmer file), and signs. The programmer PDF remains attached to the encounter for inspection.

**Manual entry path** (when programmer ingestion is unavailable for a device or institution): the same fields can be entered directly. This is the fallback, not the default.

#### STEMI: Emergency Execution
- **Mandatory timestamps at each step** (system enforces)
- Calculated intervals displayed in real-time
- Target alerts if approaching/exceeding limits
- Standard cath lab fields + STEMI-specific (culprit vessel, thrombectomy, blush grade)

---

### ENVIRONMENT 4: REPORTING

**Same structure as Radiology with structured data support:**

**Worklist filters:** Assignment + Track + Procedure type + Date + Urgency

#### Echo Report
- Template with structured sections (LV, RV, Atria, Aorta, Valves, Pericardium, Impression)
- Measurements displayed in sidebar (from Execution, editable)
- Measurement table auto-generated in final report
- Prior comparison easy access
- Premade phrases per section

#### Stress Test Report
- Protocol, hemodynamics, ECG findings, imaging findings
- Conclusion: Negative/Positive/Equivocal/Non-diagnostic

#### Cath Lab Report
- GISE-compliant structure
- Hemodynamics, coronary angiography (Italian terminology), intervention details
- Radiation summary with DRL comparison
- Device registry data auto-populated

#### Holter Report
- Recording data, HR summary
- Rhythm analysis (SVE, VE, conduction)
- ST segment analysis
- Patient diary correlation

#### Device Clinic Report
- Device info, patient status
- Battery and lead parameters (table auto-generated)
- Arrhythmia and therapy summary
- Programming summary
- Next follow-up recommendation

**Smart Signing:** Same as Radiology (1 order = 1 signed report)

---

### ENVIRONMENT 5: ARCHIVE

**Same structure as Radiology with cardiology-specific features:**

**Two Search Modes:** Patient search (primary), Criteria search (bulk)

**Patient Detail View:**
- Implanted devices section (if any)
- Procedure history by track
- **Measurement Trending:** EF over time charts, any measurement trendable

**Procedure Detail View:** Complete audit trail + track-specific data

**Export:** PDF for direct user export. GISE and AIAC registry submissions are handled by the Regulatory Layer (Section 16) — Cardiology emits the events on report signing; the layer formats and transmits per registry specifications.

---

### ENVIRONMENT 6: ADMINISTRATION

**Seven Configuration Sections:**

1. **Modalities** - Rooms/equipment (Echo Room, Cath Lab, Device Clinic Station, Holter Station)
2. **Folders** - Optional visual organization
3. **Procedure Catalog** - Nomenclatore with track assignment
4. **Users** - Track permissions + modality assignments + environment permissions
5. **Execution Form Templates** - Per track/procedure type
6. **Report Templates** - Multiple per procedure, one default
7. **Module Settings:**
 - Urgency configuration
 - DRL thresholds (Cath Lab)
 - Registry export configuration (GISE, AIAC — submission handled by Regulatory Layer Section 16; this is where institution-specific registry credentials and submission rules are configured)
 - Holter Device Inventory management

**Assigned Containers (Read-Only):**
- Medication Containers (contrast, stress agents, sedation)
- Device Inventory Containers (Holter monitors)

---

### MY PREFERENCES

**Same structure as other modules:**

1. **Reporting Preferences** - Premade phrases, default templates, measurement display
2. **Worklist & Filter Preferences** - Default track filter, saved presets
3. **Appearance** - Urgency colors, abnormal value highlighting

---

### External Systems Integration

| System | What It Does | AIRIS Relationship |
|---|---|---|
| **Cardiology PACS** | Stores echo/cath images | Integrate (like Radiology) |
| **ECG Management** | Stores ECG waveforms | Integrate - display in AIRIS |
| **Holter Analysis Software** | Analyzes rhythm data | Integrate - receive results |
| **Device Manufacturer Portals** | Remote monitoring (4+ vendors) | Integrate - unified view |

---

### Italian Compliance

**FSE 2.0:** All reports generate HL7 CDA2, PAdES signature, submit within 5 days

**GISE Registry:** Cath lab data export (standardized format)

**AIAC Registry:** Device implant/follow-up data export

**Radiation Documentation:** D.Lgs. 101/2020 compliance, DAP tracking, DRL alerts

**Professional Roles:** TFCPC can perform echo but cannot sign diagnostic report (cardiologist signature required)

---

### KEY DIFFERENCES: CARDIOLOGY VS RADIOLOGY/GASTRO

**Similarities:**
- Six environment structure
- Two-field urgency system
- User-modality assignment filtering
- Template management systems
- Smart report compilation (1 order = 1 signed report)

**Differences:**

1. **5 Workflow Tracks** (vs 1) - Different status progressions per track
2. **Structured Measurements** - 700+ possible echo values, trendable over time
3. **Device Tracking** - Holter inventory, implant registry with lot numbers
4. **Time-Critical Pathway** - STEMI with mandatory timestamps, target alerts
5. **Multi-Vendor Integration** - 4+ device manufacturer portals
6. **Recovery Phase** - Cath lab has distinct post-procedure status
7. **Italian Coronary Terminology** - TCS, IVA, Cx, CDx (not LAD, LCX, RCA)

---

## ITEMS EXPLICITLY DEFERRED OR OUT OF SCOPE

### Coming Soon (Planned, Not First Version):

**Radiology Module:**
- Peer review features (consultation, transfer, co-signature)
- Voice dictation
- Advanced notification system
- DICOM Worklist Manager (AIRIS managing worklists directly)
- DICOM export, CD burning
- Agenda customization tools
- Advanced scheduling rules
- Shared equipment between departments
- Consent forms management
- Internal messaging system

**Gastroenterology Module:**
- Scope Inventory management
- Scope washing verification
- Hardware integration with washers

**Cardiology Module:**
- PACS integration (echo/cath images)
- ECG system integration (waveform display)
- Device portal integration (CareLink, Merlin, LATITUDE, Home Monitoring)
- DICOM import for echo measurements
- Registry auto-submission (GISE, AIAC)
- Electrophysiology procedures (future separate module consideration)

**System-Wide:**
- Complete Automation Builder
- Complete Agent Builder
- Integration Builder (full version)
- Statistics/Analytics dedicated module
- Multi-language support
- Color themes
- Keyboard shortcuts

### Out of Scope Entirely:

- Medication orders/prescription management (outside hospital)
- External insurance claims processing
- Pharmacy systems (external integration only)
- PACS functionality (image viewing, manipulation, storage)

### Parked for Future Consideration:

- Waiting room queue management
- Staff shift scheduling
- Bed management (hospital-wide)
- Quality metrics (hospital-wide analytics)

---

## ARCHITECTURAL PATTERNS CONFIRMED

### Universal Structure + Module-Specific Implementation

**This pattern applies to:**
1. **Orders** - Universal concept (orders progress through statuses), module-specific details (terminology, workflow steps)
2. **Patient History** - Universal page, module-specific sections
3. **Natural Language** - Universal engine, module-specific vocabulary
4. **Database** - Universal tables, module-specific interpretation
5. **User Permissions** - Universal roles (System Admin, Module Admin), module-specific detailed permissions
6. **Urgency System** - Universal 1-4 scale, customizable colors/labels

**Pattern:**
- **Language (Universal):** Concepts, data structure, consistency
- **Vocabulary (Module-Specific):** Terminology, workflows, UI (can be completely different)

**No requirement for similar UI across modules** - only data structure consistency required.

### User-Resource Assignment Pattern

**Universal pattern, module-specific vocabulary:**

Users are assigned to specific resources within their module. This assignment defines what the user CAN access — it is a permission boundary. The specific term for "resource" varies by module:

| Module | Resource Term | Examples |
|---|---|---|
| Radiology | Modality | CT1, CT2, MR1, XR1 |
| Gastro/Endo | Room/Suite | Endo Suite 1, Endo Suite 2 |
| Cardiology | Modality | Echo Room 1, Cath Lab, Holter Station |
| Nuclear Medicine | Modality | Gamma Camera 1, PET/CT |
| Laboratory | Section | Chemistry, Hematology, Microbiology |
| Emergency | Area | Triage, Treatment Area A, OBI |
| Dialysis | Machine/Chair Group | Shift A Chairs, Shift B Chairs |

**Filtering Logic:**
1. User assigned to specific resources (in Administration)
2. Those resources define the boundary of what the user can see
3. Within that boundary, the user can further narrow their view using the Worklist Filter (see below)

**This is a permission boundary, not a daily context selector.** A tech assigned to CT1, CT2, and XR1 can potentially work any of those. Which ones they are ACTUALLY working right now is controlled by the Worklist Filter.

### Module Navigation Structure Pattern

**Universal pattern, module-specific adaptation:**

Every module's navigation is organized into up to three top-level areas based on the nature of the work:

**1. Planning Area** — Forward-looking, broad context. Organizing future work, potentially across multiple resources. No working filter applied — the user needs the big picture.
- Radiology: Scheduling
- Emergency: Does not apply (patients arrive, not scheduled)
- Dialysis: Schedule Board
- Laboratory: Collection Management
- Not every module has a planning area

**2. Worklist Area** — Active daily work. Processing a queue of items that flow through the user's hands. This is where the working filter applies. Contains multiple sub-views representing stages of the workflow.
- Radiology: Worklist → Check-In | Execution | Reporting
- Laboratory: Worklist → Specimen Receipt | Analysis | Validation
- Emergency: Worklist → Triage | Tracking Board | Clinical | Discharge
- Dialysis: Worklist → Check-In | Treatment Monitor | Post-Treatment
- Cardiology: Worklist → Check-In | Execution | Reporting (with track filtering)

**3. Archive/Lookup Area** — Retrospective, unrestricted search. No working filter — the user might need to find anything. Pure information retrieval.
- Same concept in every module, module-specific search criteria and detail views.

**Plus: Administration and My Preferences** — accessible from settings icon, not part of the main navigation flow.

**Modules adapt this structure to their reality.** Emergency has no planning area because patients aren't scheduled. Care Unit and ICU organize around patient lists rather than queues. The pattern is a framework, not a rigid template — every module is unique.

### Worklist Filter Pattern

**Applies to: the Worklist area of every module that has one.**

The Worklist Filter sits above the sub-view tabs within the Worklist area. It is NOT visible in the Planning area or Archive.

**Filter Structure:**

**Primary Filter (always visible):**
- Multi-select from the user's assigned resources
- Shows as selectable chips or toggles — the user sees their options at a glance
- Multiple selection allowed (e.g., CT1 + CT2 for a tech covering both today)
- Default on login: all assigned resources selected (nothing hidden by default)

**Secondary Filters (collapsed by default, expandable):**
- Module-specific additional filters
- Accessible via "More filters" or filter icon
- When active, a subtle indicator shows that secondary filters are applied
- Radiology: urgency, exam type, time range
- Laboratory: test type, priority (STAT/ASAP/ROUTINE), panel
- Emergency: triage level, time in department
- Dialysis: shift (MWF/TuThSa), treatment type

**Presets:**
- Saved named combinations of primary + secondary filters
- Created and managed in My Preferences
- Accessible as quick-select in the filter bar
- Examples: "My CT Shift" = CT1 only; "STAT Morning" = CT1 + CT2, urgency STAT only
- "All" is always available as a built-in preset (resets to all assigned resources)

**Filter Behavior:**
- Set once, persists across all sub-views within the Worklist area
- Switching between Check-In, Execution, and Reporting (or equivalent sub-views) does NOT reset the filter
- Navigating to Planning or Archive and back does NOT reset the filter
- Filter resets on logout (fresh login starts with "all assigned")
- Users can set a default preset in My Preferences that activates on login instead of "all"

**Tab Counts:**
- Each sub-view tab within the Worklist area shows a count badge
- Counts reflect the currently active filter — not the whole department
- When the filter changes, counts update immediately
- Example: Filter set to CT1 → Check-In shows "2" (two CT1 exams scheduled today), Execution shows "1" (one CT1 exam checked in), Reporting shows "0"
- These counts are meaningful because they represent the user's actual current workload

**Visual Layout (Radiology example):**
```
 SCHEDULING          WORKLIST          ARCHIVE
                        |
          [CT1 ✓] [CT2 ✓] [MR1] [XR1] [US1]     [Preset ▼] [Filters ▼]
                        |
                Check-In 2 | Execution 1 | Reporting 0
                        |
                    [content]
```

### Popup Pattern

**Used in:** Scheduling, Check-in, Execution, Reporting

**Structure:**
1. Main view shows patient entries (not individual exams)
2. Click patient -> Popup shows their exams
3. Filters available in popup (status, date, presets)
4. Select exam(s) via checkboxes
5. Action button ([Schedule], [Check In], [Execute], [Report])

**Consistency:** Same interaction pattern across all workflow environments

### Two-Section Sub-View Pattern

**Used in:** Worklist sub-views (Check-In, Execution, Reporting and their equivalents in other modules)

**Structure:**
- Section 1: Main workflow (90% focus) - "To Do" list
- Section 2: Supporting function (secondary) - "Recently Done" or special views

**Visual hierarchy:**
- Section 1: Large, prominent
- Section 2: Smaller, accessible but not equal prominence
- Not tabs - clear primary/secondary relationship

**Examples:**
- Check-in: "To Check In" (main) + "Currently Checked In" (secondary)
- Execution: "To Execute" (main) + "Executed Today" (secondary)
- Reporting: "To Report" (main) + "Reported" (secondary)

**Interaction with Worklist Filter:** Both sections respect the active filter. "Executed Today" shows only exams executed today on the filtered modalities, not all executed exams in the department.

### Template Management Pattern

**Used for:** Execution Forms, Report Templates

**Structure:**
- Central template management (Administration)
- Templates assigned to multiple items (exams)
- Two-way assignment (from template or from item)
- Templates provide consistency and efficiency

**Report Templates have additional feature:**
- Multiple templates per exam type
- One marked as default
- User chooses at usage time

### Smart Pre-fill Pattern

**Used in:** Execution (sequential forms), Reporting (drafts)

**Logic:**
- User fills first form with common data
- System automatically fills same data in subsequent forms
- User can review/adjust
- Reduces repetitive data entry

**Example:** Tech executes 3 X-rays for same patient
- Form 1: Fills tech name, image quality, notes
- Form 2: Tech name, image quality, notes pre-filled
- Form 3: Same pre-fill
- Tech just confirms or adjusts

---

## EMERGENCY MODULE - COMPLETE DESIGN

### Module Overview

**Purpose:** Manage complete emergency department workflow from patient arrival through discharge, including triage, clinical care, observation (OBI), and regulatory compliance with Italian Pronto Soccorso requirements.

**Core Principle:** Episode-driven workflow (patient arrives  episode opens  care delivered  episode closes) rather than order-fulfillment pattern of other modules. ED is an order ORIGINATOR to other departments, not an order receiver.

**Italian Terminology:** 
- Pronto Soccorso (PS) = Emergency Department
- Accesso = ED Visit/Episode
- Verbale di Pronto Soccorso (VPS) = Official ED discharge document
- OBI = Osservazione Breve Intensiva (Short-stay observation)

### What Makes Emergency Different

| Aspect | Other Modules | Emergency Module |
|---|---|---|
| Primary entity | Order (received from others) | Accesso (created when patient arrives) |
| Workflow driver | Order status progression | Patient location + clinical status |
| Main interface | Worklists | Tracking Board |
| Output | Report (exam results) | VPS (visit summary + disposition) |
| Time pressure | Varies by urgency | Always time-critical (regulatory) |
| Relationship to other modules | Receives orders | Creates orders for others |

### Six Environments

| Environment | Purpose | Primary Users |
|---|---|---|
| **TRIAGE** | Patient intake and acuity assessment | Triage nurses |
| **TRACKING BOARD** | Real-time patient management | All ED staff |
| **CLINICAL** | Patient care and documentation | Physicians, nurses |
| **DISCHARGE** | Episode closure and VPS generation | Physicians |
| **ARCHIVE** | Historical access | All authorized users |
| **ADMINISTRATION** | Configuration and settings | Module admins |

**Plus:** My Preferences (personal customization)

---

### Core Data Structures

#### Accesso (ED Visit/Episode)

```
accesso_id (unique, auto-generated)
accesso_number (visible identifier, e.g., "PS-2026-00001")
patient_id (FK  Patients)
arrival_mode (AMBULANCE_118 | AMBULANCE_PRIVATE | WALK_IN | POLICE | OTHER)
arrival_timestamp
chief_complaint (free text)
triage_code (1-5, Italian standard)
triage_timestamp (T0)
triage_nurse_id (FK  Users)
current_status (see Status Progression below)
current_area_id (FK  Areas)
current_bed (text, e.g., "Bed 3", "Chair 2")
assigned_physician_id (FK  Users)
assigned_nurse_id (FK  Users)
first_physician_contact_timestamp (T2)
disposition_decision_timestamp (T3)
disposition_type (DISCHARGE | ADMIT | TRANSFER | LWBS | DEATH | REFUSED | OBI)
discharge_timestamp
obi_admission_timestamp (T4, if applicable)
obi_discharge_timestamp (T5, if applicable)
discharge_diagnosis_primary (ICD-9-CM code — derived by Regulatory Layer code-mapping subsystem from the clinical discharge diagnosis text; CIPI from January 2027)
discharge_diagnosis_secondary (array of ICD-9-CM codes — same derivation as primary)
esito_code (Italian outcome code 01-14 — derived from disposition_type and clinical discharge diagnosis by Regulatory Layer; physician sees this only if they explicitly query)
vps_id (FK  VPS, when generated)
created_at
updated_at
```

#### Status Progression

```
TRIAGE  IN_ATTESA  IN_VISITA  IN_TRATTAMENTO  [OBI]  DIMESSO/RICOVERATO
```

| Status | Italian | Description | Timestamp |
|---|---|---|---|
| TRIAGE | Triage | Being triaged | arrival_timestamp |
| IN_ATTESA | In Attesa | Waiting for physician | triage_timestamp (T0) |
| IN_VISITA | In Visita | Being seen by physician | first_physician_contact_timestamp (T2) |
| IN_TRATTAMENTO | In Trattamento | Receiving treatment/workup | (during visit) |
| OBI | OBI | In observation unit | obi_admission_timestamp (T4) |
| DIMESSO | Dimesso | Discharged home | discharge_timestamp |
| RICOVERATO | Ricoverato | Admitted to hospital | discharge_timestamp |
| TRASFERITO | Trasferito | Transferred to other facility | discharge_timestamp |
| LWBS | Allontanato | Left without being seen | discharge_timestamp |
| DECEDUTO | Deceduto | Died in ED | discharge_timestamp |
| RIFIUTA | Rifiuta Ricovero | Refused admission | discharge_timestamp |

#### Italian 5-Level Triage System

| Code | Color | Italian Term | Max Wait | Compliance Target |
|---|---|---|---|---|
| 1 | Rosso (Red) | Emergenza | Immediate | 99% |
| 2 | Arancione (Orange) | Urgenza | 15 min | 85% |
| 3 | Azzurro (Blue) | Urgenza Differibile | 60 min | 80% |
| 4 | Verde (Green) | Urgenza Minore | 120 min | 75% |
| 5 | Bianco (White) | Non Urgenza | 240 min | 75% |

**Regulatory Source:** Accordo Stato-Regioni 1 agosto 2019

**Key Requirements:**
- Triage initiation within 5 minutes of arrival
- Reassessment required: Code 3 at 60min, Code 4 at 120min
- Appropriateness indicators: >95% Code 1 admission/death/transfer, <1% Code 5 admission

#### Triage Assessment

```
triage_id (unique)
accesso_id (FK  Accesso)
chief_complaint_structured (from complaint catalog)
chief_complaint_free_text
symptom_onset (timestamp or duration)
pain_scale (0-10, if applicable)
vital_signs_id (FK  Vital Signs)
allergy_status (NONE | KNOWN | UNKNOWN)
allergies (array, if known)
current_medications (text)
medical_history_pertinent (text)
triage_code_assigned (1-5)
triage_rationale (text)
reassessment_required_at (calculated from triage code)
triage_nurse_id (FK  Users)
triage_timestamp
```

#### Vital Signs

```
vitals_id (unique)
accesso_id (FK  Accesso)
recorded_at (timestamp)
recorded_by_user_id (FK  Users)
heart_rate (bpm)
blood_pressure_systolic (mmHg)
blood_pressure_diastolic (mmHg)
respiratory_rate (breaths/min)
temperature (C)
oxygen_saturation (%)
oxygen_supplementation (NONE | NASAL_CANNULA | MASK | etc.)
consciousness_level (ALERT | VERBAL | PAIN | UNRESPONSIVE - AVPU)
gcs_total (3-15, if applicable)
gcs_eye, gcs_verbal, gcs_motor (components)
pain_score (0-10)
blood_glucose (mg/dL, if measured)
source (TRIAGE | NURSING | MONITOR | MANUAL)
```

#### Areas

```
area_id (unique)
name (e.g., "Sala Rossa", "Area Trattamento", "OBI")
area_type (TRIAGE | WAITING | TREATMENT | RESUSCITATION | OBI | FAST_TRACK | PEDIATRIC | PSYCHIATRIC)
capacity (number of patient positions)
beds (array of bed/position identifiers)
status (OPERATIONAL | REDUCED | CLOSED)
folder_id (FK  Folders, optional visual grouping)
```

**Note:** Areas replace Modalities in Emergency. Areas have capacity and occupancy tracking, critical for NEDOCS calculation.

#### Clinical Notes

```
note_id (unique)
accesso_id (FK  Accesso)
note_type (TRIAGE | PHYSICIAN_INITIAL | PHYSICIAN_PROGRESS | NURSING | PROCEDURE | REASSESSMENT | CONSULTATION | HANDOFF)
content (text, can be structured or free)
author_id (FK  Users)
author_role (PHYSICIAN | NURSE | CONSULTANT)
created_at
signed_at (if requires signature)
signed_by_id (FK  Users)
addendum_to_note_id (FK  Clinical Notes, if addendum)
```

#### ED Procedures

```
procedure_id (unique)
accesso_id (FK  Accesso)
procedure_type_id (FK  Procedure Catalog)
procedure_name (e.g., "Sutura", "Incisione e Drenaggio", "Riduzione Frattura")
performed_by_id (FK  Users)
assisted_by_id (FK  Users, optional)
performed_at (timestamp)
body_site (text)
laterality (LEFT | RIGHT | BILATERAL | NA)
local_anesthesia_used (boolean)
anesthesia_type (text, if used)
materials_used (text)
findings (text)
complications (text)
icd9_procedure_code
status (PLANNED | IN_PROGRESS | COMPLETED | CANCELLED)
```

#### Orders to Other Departments

```
ed_order_id (unique)
accesso_id (FK  Accesso)
target_module (LABORATORY | RADIOLOGY | CARDIOLOGY | CONSULTATION)
order_id (FK  target module's Orders table)
ordered_by_id (FK  Users)
ordered_at (timestamp)
urgency (1-5)
clinical_indication (text)
status (ORDERED | ACKNOWLEDGED | IN_PROGRESS | RESULTED | CANCELLED)
result_available_at (timestamp)
result_reviewed_by_id (FK  Users)
result_reviewed_at (timestamp)
```

**Note:** ED creates orders in other modules via shared database. Same pattern as other departments creating radiology orders - just writes to shared database, target module sees it in their worklist.

#### Consultation Requests

```
consult_id (unique)
accesso_id (FK  Accesso)
specialty_requested (CARDIOLOGY | SURGERY | ORTHOPEDICS | NEUROLOGY | etc.)
urgency (1-5)
clinical_question (text)
requested_by_id (FK  Users)
requested_at (timestamp)
consultant_id (FK  Users, when assigned)
consultant_arrived_at (timestamp)
consultation_note (text)
recommendations (text)
completed_at (timestamp)
status (REQUESTED | ACKNOWLEDGED | IN_PROGRESS | COMPLETED | CANCELLED)
```

#### OBI Documentation

```
obi_entry_id (unique)
accesso_id (FK  Accesso)
entry_type (ADMISSION | ASSESSMENT | PROGRESS | VITAL_SIGNS | INTERVENTION | DECISION | DISCHARGE)
entry_timestamp
content (text)
vital_signs_id (FK  Vital Signs, if vital signs entry)
author_id (FK  Users)
```

**OBI Rules (Italian Regulatory):**
- Minimum stay: 6 hours
- Maximum stay: 44 hours from initial triage (36 hours recommended)
- NOT a separate admission - still part of ED episode
- Billing: Separate procedure code (89.09), NOT inpatient DRG

#### Time-Critical Pathways

```
pathway_id (unique)
accesso_id (FK  Accesso)
pathway_type (STEMI | STROKE | SEPSIS | TRAUMA | CHEST_PAIN)
activated_at (timestamp)
activated_by_id (FK  Users)
activation_criteria (JSON - what triggered activation)
status (ACTIVE | COMPLETED | CANCELLED)
timestamps (JSON containing pathway-specific milestones)
targets_met (JSON - boolean flags for each target)
deactivated_at (timestamp)
deactivation_reason (text)
```

**Pathway Types and Key Targets:**

| Pathway | Key Timestamps | Primary Target |
|---|---|---|
| STEMI | door, ecg, cath_lab_activation, reperfusion | Door-to-ECG 10min, Door-to-balloon 90min |
| STROKE | door, ct_start, ct_read, tpa_decision, tpa_start | Door-to-needle 60min |
| SEPSIS | recognition, lactate, cultures, antibiotics, fluid | Antibiotics 1hr |
| TRAUMA | arrival, primary_survey, ct, or_decision | Team activation time |
| CHEST_PAIN | door, ecg, troponin_ordered, troponin_resulted | ECG 10min |

#### VPS (Verbale di Pronto Soccorso)

```
vps_id (unique)
accesso_id (FK  Accesso)
version (integer, starts at 1)
status (DRAFT | PENDING_SIGNATURE | SIGNED | AMENDED)

-- Content sections (auto-populated, editable)
motivo_visita (chief complaint narrative)
anamnesi (relevant history)
esame_obiettivo (physical examination)
accertamenti (tests performed - auto-populated from orders)
consulenze (consultations - auto-populated)
diagnosi_differenziale (differential diagnosis)
terapia_somministrata (treatments given - auto-populated)
decorso_clinico (clinical course narrative)
diagnosi_dimissione (discharge diagnosis text — authoritative clinical content written by physician)
diagnosi_icd9_primary (ICD-9-CM code — derived from diagnosi_dimissione by Regulatory Layer code-mapping subsystem; CIPI from January 2027)
diagnosi_icd9_secondary (array — same derivation as primary)
esito (outcome code 01-14 — derived by Regulatory Layer from disposition_type and clinical discharge diagnosis)
prognosi (prognosis days)
istruzioni_paziente (discharge instructions)
terapia_domiciliare (discharge medications)
follow_up (follow-up instructions)

-- Metadata
generated_at (timestamp)
generated_by_id (FK  Users)
signed_at (timestamp)
signed_by_id (FK  Users)
signature_certificate (digital signature data)
fse_transmitted (boolean)
fse_transmission_timestamp
fse_document_id (FSE reference)
```

**Italian Esito Codes:**
- 01 = Dimissione a domicilio (Discharge home)
- 02 = Ricovero in reparto (Admit to ward)
- 03 = Trasferimento (Transfer)
- 04 = Decesso in PS (Death in ED)
- 05 = Rifiuta ricovero (Refused admission)
- 06-11 = Other specific dispositions
- 12 = OBI
- 13-14 = Other

#### NEDOCS Calculation

```
nedocs_snapshot_id (unique)
calculated_at (timestamp)
-- Input values
total_ed_beds (integer)
total_hospital_beds (integer)
ed_patients_count (integer)
ed_ventilator_patients (integer)
longest_admit_wait_hours (decimal)
longest_waiting_room_hours (decimal)
-- Calculated
nedocs_score (integer 0-200+)
nedocs_level (NOT_BUSY | BUSY | VERY_BUSY | OVERCROWDED | SEVERELY_OVERCROWDED | DANGEROUSLY_OVERCROWDED)
```

**NEDOCS Levels:**
- 0-20: Not Busy (Green)
- 21-60: Busy (Yellow)
- 61-100: Very Busy (Light Orange)
- 101-140: Overcrowded (Orange) - activate additional resources
- 141-180: Severely Overcrowded (Red) - block elective admissions
- >180: Dangerously Overcrowded (Dark Red) - crisis protocols

---

### ENVIRONMENT 1: TRIAGE

**Purpose:** Rapid patient assessment and acuity assignment

**Primary Users:** Triage nurses (specialized certification required)

**Workflow:**
1. Patient arrives at triage desk
2. Nurse identifies patient (Codice Fiscale or demographics)
3. Records arrival mode and time
4. Documents chief complaint (structured + free text)
5. Records vital signs
6. Brief assessment (allergies, meds, history)
7. **Assigns triage code (1-5)** with rationale
8. Completes triage  Patient moves to IN_ATTESA status

**Key Features:**
- Large, color-coded buttons for triage code selection
- Mandatory rationale field
- System calculates reassessment time based on code
- 118 pre-arrival notification integration (if available)
- Time-to-first-physician target display

**Quick Triage (Code 1):**
- Minimal required fields for immediate cases
- Full documentation completed after stabilization

---

### ENVIRONMENT 2: TRACKING BOARD

**Purpose:** Real-time visibility of all ED patients (PRIMARY operational interface)

**Primary Users:** All ED staff

**Layout Sections:**
- Resuscitation Area (Code 1 patients)
- Treatment Area (main beds)
- Waiting Room (IN_ATTESA patients)
- OBI (observation patients)
- Boarding (admitted, awaiting bed)

**Displayed Per Patient:**
- Bed/Location
- Patient name, age, sex
- Triage code (color-coded)
- Time in ED
- Chief complaint
- Assigned MD/RN
- Status icons (lab pending, imaging pending, consult pending, results ready)
- Time alerts (approaching/exceeded targets)

**NEDOCS Display:**
- Real-time overcrowding score
- Visual indicator (Green/Yellow/Orange/Red)
- Trend indicator

**Interactive Features:**
- Drag-drop patient assignment (MD/RN)
- Drag-drop bed assignment
- Click patient  Opens Clinical environment
- Right-click  Quick actions menu

**Filters:**
- By area
- By physician assignment
- By triage code
- "My Patients" view

---

### ENVIRONMENT 3: CLINICAL

**Purpose:** Patient care documentation and order management

**Primary Users:** Physicians, nurses

**Tabbed Interface:**

**Tab: Summary**
- Triage info at glance
- Active orders with status
- Latest vitals
- Key results (abnormal highlighted)
- Active pathways

**Tab: Notes**
- Physician notes (initial, progress)
- Nursing notes
- Reassessment notes
- Add new note buttons

**Tab: Orders**
- Create lab/imaging/medication/consult orders
- Quick panels by chief complaint (Chest Pain panel, Sepsis panel, etc.)
- Order status tracking
- Results notification

**Tab: Results**
- Laboratory results (with abnormal flagging)
- Imaging reports (with link to images)
- Consultation notes
- ECG results

**Tab: Vitals**
- Vital signs table
- Trend graphs
- Add new vitals

**Tab: Procedures**
- Document ED procedures
- IV placement, suturing, splinting, etc.

**Tab: Pathways**
- Activate time-critical pathways
- View milestone tracking
- Target compliance display

**Order Creation:**
- Orders create records in target module via shared database
- Lab orders  Laboratory Module sees in worklist
- Imaging orders  Radiology Module sees in worklist
- Same pattern as other departments ordering from each other

---

### ENVIRONMENT 4: DISCHARGE

**Purpose:** Episode closure, disposition decision, VPS generation

**Primary Users:** Physicians

**Workflow:**
1. Select disposition type (Discharge, Admit, Transfer, OBI, etc.)
2. Enter discharge diagnosis in clinical language ("acute uncomplicated appendicitis", "viral upper respiratory infection") — the Regulatory Layer maps to ICD-9-CM (and CIPI from January 2027) silently. If the mapping is medium-confidence, the system surfaces it for confirmation; if low-confidence, administrative coding staff handle it. Physician's clinical description is the authoritative content.
3. Review auto-populated VPS sections
4. Edit narrative sections as needed
5. Add discharge instructions (from templates or free text)
6. Add follow-up instructions
7. Sign VPS (digital signature)
8. Regulatory Layer generates CDA R2, transmits to FSE 2.0 (Section 16)

**VPS Generation:**
- Auto-populates from visit data:
  - Triage info from triage assessment
  - History/exam from physician notes
  - Tests from orders/results
  - Medications from medication orders
- Physician reviews and edits
- Single signature finalizes

**OBI Admission Flow:**
- Eligibility criteria check
- OBI care plan documentation
- Expected duration entry
- Status changes to OBI
- Time tracking begins (36h/44h limits)

---

### ENVIRONMENT 5: ARCHIVE

**Purpose:** Historical access to past ED visits

**Primary Users:** All authorized ED staff

**Features:**
- Search by patient, date range, diagnosis, disposition
- Special reports: 48-hour returns, LWBS, admission rates by triage code
- Full visit detail view (read-only Clinical environment)
- VPS viewing and printing

---

### ENVIRONMENT 6: ADMINISTRATION

**Purpose:** Module configuration

**Primary Users:** Module admins

**Sections:**
1. **Areas** - Configure ED areas, capacity, beds
2. **Folders** - Optional visual grouping
3. **Service Catalog** - ED procedures, chief complaint categories
4. **Users** - Permissions, area assignments
5. **Templates** - Triage, note, discharge instruction templates
6. **Pathways** - Time-critical pathway configuration
7. **Settings** - NEDOCS parameters, time thresholds, EMUR settings
8. **Assigned Containers** - View medication containers (read-only)

---

### Permissions Structure

**Triage Permissions:**
- can_triage
- can_reassess_triage

**Clinical Permissions:**
- can_view_patients
- can_write_notes
- can_order_labs
- can_order_imaging
- can_order_medications
- can_request_consults
- can_document_procedures
- can_activate_pathways

**Discharge Permissions:**
- can_discharge
- can_sign_vps
- can_admit
- can_transfer

**OBI Permissions:**
- can_admit_obi
- can_discharge_obi

**Administrative Permissions:**
- can_manage_areas
- can_manage_templates
- can_manage_users
- can_view_reports
- can_export_data

---

### Interaction Layer Examples for Emergency Module

**Triage:**
- "Triage Mario Rossi, chest pain, code 2"
- "New patient walk-in, abdominal pain"

**Tracking Board:**
- "Assign bed T5 to Rossi"
- "Move Bianchi to OBI"
- "Show me all code 2 patients"
- "What's our NEDOCS score?"

**Clinical:**
- "Order chest pain panel for Rossi"
- "Order CT chest with contrast"
- "Request cardiology consult"
- "Activate chest pain pathway"

**Discharge:**
- "Discharge Rossi, diagnosis chest pain NOS"
- "Admit Bianchi to cardiology"

---

### Integration Patterns

**Orders to Other AIRIS Modules:**
ED creates orders via shared database (same as other modules):
- Lab orders  Laboratory Module worklist
- Imaging orders  Radiology Module worklist (source = EMERGENCY)
- Consults  Target module notification

**External Integrations (via Integration Builder):**
- LIS: HL7 ORM/ORU for labs
- PACS/RIS: HL7 ORM/ORU for imaging
- 118 EMS: Pre-arrival notifications
- Vital signs monitors: Device integration
- FSE Gateway: CDA R2 VPS transmission
- EMUR: XML data export to NSIS

---

### Key Differences: Emergency vs Other Modules

| Aspect | Radiology/Gastro/Cardiology | Emergency |
|---|---|---|
| Primary entity | Order (received) | Accesso (created on arrival) |
| Status driver | Order status | Patient location + status |
| Main interface | Worklists | Tracking Board |
| Output document | Report | VPS |
| Time tracking | Per exam | Entire episode + milestones |
| Capacity concern | Modality slots | ED beds + overcrowding |
| To other depts | Receives orders | Creates orders |
| Regulatory | FSE report | EMUR + FSE VPS |

---

## CRITICAL IMPLEMENTATION NOTES

### Report Compilation System

**Most Complex Logic in AIRIS:**

**Rules:**
1. 1 Order = 1 Official Report (Italian legal requirement)
2. Cannot sign order until ALL exams in order have reports
3. Cannot sign order if ANY exam not yet EXECUTED
4. Radiologist can select any exams from any orders
5. System determines what's signable based on order completeness
6. Single signing action can generate multiple reports (one per signable order)

**Implementation Requirements:**
- Smart order analysis before signing
- Clear user feedback (what can/cannot sign, why)
- Dialog showing exactly what will be signed
- Proper version control
- Audit trail

### Natural Language Integration

**The interaction layer must work across:**
- All six environments (Scheduling, Check-in, Execution, Reporting, Archive, Administration)
- My Preferences section
- NOT System Settings (first version)

**Interaction Layer Examples Per Environment:**
- Scheduling: "Schedule Mario Rossi CT Chest tomorrow 10am CT1"
- Check-in: "Check in Mario Rossi for CT Chest"
- Execution: "Execute CT Chest for Mario Rossi, tech was Mario, assign to Dr. Bianchi"
- Reporting: "Create report for exam AN100 using chest CT template"
- Archive: "Find all STAT CT exams from last week"
- Administration: "Create modality CT3, type CT, assign to Ground Floor folder"

**Voice/text and GUI are two paths to the same paradigm.** Voice/text is the primary path; the GUI is the explicit and respected fallback for situations where direct manipulation, dense data review, or visual exploration is more appropriate. They are not parallel modes; they are facets of one interaction.

### Urgency System Implementation

**Two Fields Required:**
- `requested_urgency` (text, preserved from source)
- `radiology_urgency` (integer 1-4, working priority)

**Color Coding:**
- Based on `radiology_urgency` only
- Universal across all environments
- Configurable in Administration > Settings

**Integration Mapping:**
- Integration Builder maps external codes to 1-4 scale
- Handles diverse source systems

### User-Modality Filtering

**Implementation:**
- User permissions include modality assignments
- Every environment checks user modality assignments
- Filters available modalities first
- Exams/patients visible only if on assigned modalities
- Applies to: Scheduling, Check-in, Execution, Reporting, Archive

**Performance Consideration:**
- Filter at database level (not UI)
- Efficient queries based on user permissions
- Pre-filter before displaying lists

### Event System

See **CORE SYSTEM COMPONENTS > 5. Event System** for complete design. Radiology-specific events are cataloged in Section 5.4.2.

---

## NUCLEAR MEDICINE MODULE - COMPLETE DESIGN

### Module Overview

**Purpose:** Manage complete nuclear medicine workflow from order receipt through final signed report, including diagnostic imaging and radionuclide therapy.

**Why Separate from Radiology:**
Nuclear Medicine differs fundamentally from diagnostic radiology:
1. **Scheduling driven by isotope decay**, not equipment availability
2. **Execution has multiple phases** (injection -> uptake -> imaging) requiring patient tracking
3. **Mandatory clinical data** at check-in (weight, glucose) for dose calculation
4. **Radiopharmaceutical documentation** is a regulatory requirement (D.Lgs. 101/2020)
5. **Multi-day protocols** are common (thyroid, MIBG, gallium studies)
6. **Therapy workflows** exist (I-131, Lu-177) with cycle tracking
7. **External integration** with Radiopharmacy Information System (RPIS)

**Six Environments:**
1. **Scheduling** - NM-aware scheduling with isotope coordination
2. **Check-in** - Extended clinical verification (weight, glucose, prep compliance)
3. **Execution** - Multi-phase: injection tracking, uptake monitoring, imaging
4. **Reporting** - NM-specific templates with radiopharmaceutical documentation
5. **Archive** - Standard with NM-specific filters
6. **Administration** - Cameras, radiopharmaceuticals, study catalog

**Plus:**
- **My Preferences** - Personal customization

---

### Core Data Structures

#### Study (Primary Entity)

```
study_id (unique, auto-generated)
accession_number (unique identifier visible to users)
order_id (FK -> Orders)
patient_id (FK -> Patients)

study_type (FK -> StudyCatalog)
status (StudyStatus enum)
urgency_requested (text - as received)
nuclear_medicine_urgency (1-5 scale)

// Scheduling
scheduled_date
scheduled_time
scheduled_camera (FK -> Camera)
scheduled_duration

// Multi-phase/Multi-day
is_multi_phase (boolean)
is_multi_day (boolean)
phase_number (integer)
day_number (integer)
parent_study_id (FK - for linked studies)

// Check-in (NM-specific mandatory fields)
actual_weight_kg (decimal) [MANDATORY]
blood_glucose_mgdl (decimal) [if applicable]
pregnancy_status (enum)
fasting_confirmed (boolean)
preparation_compliant (boolean)
consent_signed (boolean)

// Radiopharmaceutical (received from RPIS)
radiopharmaceutical (FK -> Radiopharmaceutical)
aic_code (string - Italian regulatory)
lot_number (string)
activity_prescribed_mbq (decimal)
activity_administered_mbq (decimal)
activity_residual_mbq (decimal)
activity_net_mbq (decimal) [calculated]
injection_time (datetime)
injection_site (string)
administered_by (FK -> Users)

// Uptake tracking
uptake_start_time (datetime)
uptake_target_minutes (integer)
uptake_end_time (datetime)
uptake_location (string)

// Imaging
imaging_start_time (datetime)
imaging_end_time (datetime)
camera_used (FK -> Camera)
technologist (FK -> Users)

// Hybrid imaging (CT component)
ct_performed (boolean)
ct_type (enum: ATTENUATION_ONLY, DIAGNOSTIC_NO_CONTRAST, DIAGNOSTIC_CONTRAST)
ct_ctdi_vol (decimal)
ct_dlp (decimal)

// Therapy specific
is_therapy (boolean)
therapy_cycle_number (integer)
therapy_total_cycles (integer)
therapy_cumulative_activity_mbq (decimal)
linked_diagnostic_study (FK -> Study)

// Timestamps
created_at, updated_at, completed_at
```

#### StudyStatus (Status Progression)

```
PENDING // Order received, awaiting validation
VALIDATED // NM physician approved
SCHEDULED // Appointment set
ARRIVED // Patient in department
CHECKED_IN // Clinical verification complete
DOSE_READY // Radiopharmacy has dose prepared
INJECTED // Radiopharmaceutical administered
IN_UPTAKE // Waiting for uptake period
READY_FOR_IMAGING // Uptake complete
IMAGING // On camera
EXECUTED // Imaging complete
PHASE_COMPLETE // One phase done, more to come
DAY_COMPLETE // Day's portion done
REPORTING // Being reported
PRELIMINARY // Preliminary report available
SIGNED // Final report signed
AMENDED // Report amended
CANCELLED // Cancelled before execution
NO_SHOW // Patient didn't arrive
ABORTED // Started but not completed
```

#### Camera (Equipment)

```
camera_id (unique)
name (e.g., "Gamma Camera 1", "PET/CT Siemens")
code (e.g., "GC1", "PET1")
type (GAMMA_CAMERA, SPECT, SPECT_CT, PET_CT, PET_MR)
manufacturer, model, location
dicom_ae_title
is_hybrid (boolean)
ct_type (NONE, LOW_DOSE, DIAGNOSTIC)
is_active (boolean)
```

#### Radiopharmaceutical

```
radiopharmaceutical_id (unique)
name (e.g., "Tc-99m MDP")
generic_name
isotope (e.g., "Tc-99m", "F-18")
aic_code (Italian AIFA code)
half_life_minutes (decimal)
typical_activity_mbq (decimal)
activity_per_kg (decimal)
max_activity_mbq (decimal)
preparation_type (COMMERCIAL_UNIT_DOSE, GENERATOR_KIT, CYCLOTRON)

// Patient preparation requirements
fasting_required (boolean)
fasting_hours (integer)
glucose_check_required (boolean)
glucose_max_mgdl (decimal)
medication_holds (array of strings)
iodine_restriction_days (integer)

uptake_time_minutes (integer)
uptake_tolerance_minutes (integer)

is_therapy (boolean)
requires_isolation (boolean)
is_active (boolean)
```

#### StudyCatalog

```
catalog_id (unique)
code (e.g., "NM_PET_FDG_WB")
name (e.g., "PET/CT Total Body FDG")
description
radiopharmaceutical (FK)
camera_type_required
default_duration_minutes
uptake_time_minutes

// Multi-phase/day
is_multi_phase (boolean)
phase_count, phase_descriptions
is_multi_day (boolean)
day_count, day_descriptions

// Preparation
preparation_instructions
fasting_required

// Billing & therapy
billing_code
is_therapy (boolean)
typical_cycles (integer)
is_active (boolean)
```

#### TherapyCourse (For Radionuclide Therapy)

```
course_id (unique)
patient_id (FK)
therapy_type (FK -> StudyCatalog)
planned_cycles (integer)
cycle_interval_weeks (integer)
diagnostic_study (FK -> Study - theranostics linkage)
target_confirmed (boolean)
current_cycle (integer)
cumulative_activity_mbq (decimal)
studies (array of FK -> Study)
status (PLANNED, IN_PROGRESS, COMPLETED, DISCONTINUED)
```

---

### Status Progression

**Standard Diagnostic:**
```
PENDING -> VALIDATED -> SCHEDULED -> ARRIVED -> CHECKED_IN -> 
DOSE_READY -> INJECTED -> IN_UPTAKE -> READY_FOR_IMAGING -> 
IMAGING -> EXECUTED -> REPORTING -> SIGNED
```

**Multi-Phase (e.g., Cardiac Rest/Stress):**
```
... -> INJECTED (Phase 1) -> IN_UPTAKE -> IMAGING -> PHASE_COMPLETE -> 
INJECTED (Phase 2) -> IN_UPTAKE -> IMAGING -> EXECUTED -> REPORTING -> SIGNED
```

**Multi-Day (e.g., Thyroid I-123):**
```
Day 1: ... -> INJECTED -> [IMAGING optional] -> DAY_COMPLETE
Day 2: ARRIVED -> IMAGING -> EXECUTED -> REPORTING -> SIGNED
```

---

### Environment 1: Scheduling

**Key Difference from Radiology:** Scheduling is driven by isotope availability and decay, not just equipment.

**Features:**
- Camera agendas with uptake time buffers displayed
- Radiopharmacy coordination panel (24hr advance notice for dose ordering)
- Multi-day study scheduling (linked appointments across days)
- Isotope-specific constraints (F-18 delivery cutoff, Tc-99m same-day use)

**Scheduling Constraints:**
- Cannot schedule PET after F-18 delivery cutoff
- Warns if scheduling thyroid scan with recent contrast in patient history
- Respects uptake time requirements (blocks appropriate time after injection slot)

---

### Environment 2: Check-in

**Extended from Radiology with mandatory NM fields:**

**Mandatory Data:**
- Actual weight (kg) - REQUIRED for dose calculation
- Blood glucose (if applicable, e.g., FDG-PET must be <200 mg/dL)
- Pregnancy status verification
- Fasting compliance confirmation
- Medication hold verification
- Consent signed

**Check-in triggers:**
- Dose preparation workflow activation in RPIS
- Camera worklist update (DICOM MWL)

---

### Environment 3: Execution (with Uptake Tracking)

**Unique Feature: Uptake Tracking Board**

Real-time display of all patients in uptake period:
```
 BIANCHI, L. Bone Scan Injected 08:15
 Uptake: 2:00:00 target 1:15 remain
 Location: Uptake Room 1 Ready at: 10:15

 FERRARI, A. Thyroid Injected 07:30
 Uptake: 4:00:00 target 0:08 remain
 Location: Uptake Room 1 Ready at: 11:30 SOON

 VERDI, G. Cardiac REST Injected 08:00
 Uptake: 0:45:00 target READY
 Location: Uptake Room 3 READY

Legend:  In Progress <10min Ready Imaging
```

**Uptake Tracking Features:**
- Countdown timers per patient
- Configurable alerts (10 min warning, ready alert, overdue)
- Patient location tracking
- Status board for staff visibility

**Sub-workflows:**
1. **Record Injection** - Capture radiopharmaceutical data (from RPIS or manual)
2. **Uptake Monitoring** - Track patients during uptake period
3. **Start Imaging** - Move patient to camera when uptake complete
4. **Complete Imaging** - End acquisition, handle multi-phase if applicable

---

### Environment 4: Reporting

**NM-Specific Report Structure:**

**Mandatory Sections:**
1. **Radiopharmaceutical Data** (auto-populated from execution)
 - Radiopharmaceutical name
 - Administered activity (MBq)
 - AIC code
 - Injection time, site
 - Uptake time
 - Blood glucose (if applicable)

2. **Technique** - Protocol description, CT parameters if hybrid

3. **Quantitative Data** (imported from analysis workstations)
 - PET: SUVmax, SUVmean, MTV, TLG
 - Cardiac: LVEF, EDV, ESV, perfusion scores
 - Renal: GFR, differential function
 - Thyroid: Uptake percentage

4. **Findings** - Structured by anatomical region

5. **Impression** - Numbered conclusions

6. **Dose Documentation** (D.Lgs. 101/2020)
 - Administered activity (MBq)
 - CT dose (CTDI, DLP) if hybrid
 - Dose class indicator

---

### Environment 5: Archive

Standard AIRIS Archive with NM-specific filters:
- Filter by study type (PET, SPECT, Planar, Therapy)
- Filter by radiopharmaceutical
- Filter by camera
- Therapy course view (group therapy cycles together)

---

### Environment 6: Administration

**Sections:**

1. **Camera Management**
 - Create/edit cameras (gamma cameras, PET/CT, SPECT/CT)
 - DICOM AE title configuration
 - Hybrid imaging settings

2. **Radiopharmaceutical Management**
 - Maintain radiopharmaceutical catalog
 - Half-life, typical activity, AIC codes
 - Patient preparation requirements per radiopharmaceutical

3. **Study Catalog**
 - Define study types with linked radiopharmaceutical
 - Uptake times, duration
 - Multi-phase/multi-day configuration
 - Therapy study types

4. **Users**
 - Camera assignments
 - Role-based permissions (Admin, TSRM, Physician, Trainee)

5. **Report Templates**
 - NM-specific templates with mandatory sections
 - Quantitative data fields configuration

6. **Uptake Room Configuration**
 - Define uptake waiting areas
 - Capacity settings

7. **Integration Settings**
 - RPIS connection configuration
 - Analysis workstation import settings
 - FSE 2.0 gateway configuration

---

### Integration Architecture

**AIRIS Handles:**
- Order management and validation tracking
- NM-aware scheduling
- Patient tracking and uptake timers
- Check-in with NM-specific fields
- Workflow status
- Report writing with NM templates
- FSE 2.0 CDA2 generation

**External Integration:**

| System | Interface | Data Exchange |
|---|---|---|
| **PACS** | DICOM | Images storage/retrieval |
| **RPIS** | HL7/API | Receive: dose data, activity, lot numbers |
| **Analysis Workstations** | DICOM SR | Receive: SUV, LVEF, quantitative results |
| **Cameras (PET/CT, SPECT)** | DICOM MWL | Send: worklist |
| **STRIMS (ISIN)** | Export | Regulatory compliance data |
| **EMR/HIS** | HL7 | Reports, status updates |
| **FSE 2.0 Gateway** | CDA2 | Signed reports |

**Not AIRIS's Business:**
- Radiopharmaceutical production/preparation (RPIS)
- Generator elution and QC
- Dose calibrator operation
- Image acquisition and reconstruction
- Quantitative analysis algorithms
- Complex dosimetry calculations

---

### Terminology Mapping

| Universal (AIRIS) | Nuclear Medicine Term |
|---|---|
| Order | Order / Request |
| Exam | Study / Scan |
| Modality | Camera / Scanner |
| Report | Report |
| Technician | Nuclear Medicine Technologist / TSRM |
| Physician | Nuclear Medicine Physician |

**NM-Specific Terms:**
- **Activity:** Amount of radioactivity (MBq)
- **Radiopharmaceutical:** Radioactive tracer administered
- **Uptake period:** Time between injection and imaging
- **Hot lab:** Radiopharmacy preparation area
- **Theranostics:** Combined diagnostic-therapeutic approach

---

### Compliance Requirements (Italian)

**D.Lgs. 101/2020:**
- Activity recording in MBq (mandatory)
- Dose class indicator in reports
- 15% ECM credits in radiation protection for NM specialists

**FSE 2.0:**
- HL7 CDA2 format with LOINC coding
- AIC codes for radiopharmaceuticals
- RSA template for NM reports

**ISIN/STRIMS:**
- Mandatory registration of radioactive sources
- Export capability for regulatory submission

**Professional Standards:**
- AIMN (Associazione Italiana di Medicina Nucleare) guidelines
- EANM procedural recommendations

---

### Urgency System

Uses standard AIRIS 5-level system:
- Module-specific field: `nuclear_medicine_urgency`
- Same color coding as other modules
- Level 1-5 mapping consistent with Emergency module

---

### Permissions Structure

| Permission | Admin | TSRM | NM Physician | Trainee |
|---|---|---|---|---|
| View schedule | [OK] | [OK] | [OK] | [OK] |
| Create/modify schedule | [OK] | [OK] | [OK] | - |
| Check-in patients | [OK] | [OK] | [OK] | [OK] |
| Record injection | - | [OK] | [OK] | [OK] |
| Manage uptake tracking | - | [OK] | [OK] | [OK] |
| Complete imaging | - | [OK] | [OK] | [OK] |
| Write reports | - | - | [OK] | [OK] |
| Sign reports | - | - | [OK] | - |
| Co-sign trainee reports | - | - | [OK] | - |
| Validate orders | - | - | [OK] | - |
| Administration access | [OK] | - | [OK] | - |

---

### Interaction Layer Examples

```
Scheduling:
"Schedule a PET scan for patient Rossi tomorrow morning"
-> System checks F-18 availability, schedules injection slot, calculates imaging time

Check-in:
"Check in patient Bianchi for bone scan, weight 65 kilos"
-> Records mandatory weight, prompts for fasting/consent verification

Uptake Tracking:
"Who's ready for imaging?"
-> Lists patients with completed uptake periods

Reporting:
"Open report for Bruno's PET scan"
-> Opens report with radiopharmaceutical data auto-populated

Therapy:
"Show therapy course for patient Marino"
-> Displays Lu-177 PSMA course with cycle history and cumulative dose
```

---

### Detailed Specification Reference

For complete data structures, UI mockups, integration specifications, and report templates, see:
**AIRIS_Nuclear_Medicine_Module_Specification.md**

---

---

---

## LABORATORY MODULE

### Module Overview

The Laboratory Module manages clinical laboratory workflow from order receipt through validated result release. It is **fundamentally different** from all imaging-based modules:

| Aspect | Imaging Modules | Laboratory Module |
|---|---|---|
| Order structure | 1 order = 1 report | 1 order = N results (panels) |
| Subject | Patient present throughout | Specimen separate from patient |
| Scheduling | Appointment-based | Queue-based, on-demand |
| Validation | 100% physician interpretation | 75-85% auto-validated |
| Result type | Images + narrative | Discrete numeric/coded values |
| Equipment interface | DICOM MWL direct | Via Middleware |
| External storage | PACS (images) | None (database values) |

### Why Separate from Other Modules

Laboratory cannot be adapted from imaging module patterns because:
- **Specimen lifecycle management**  physical specimens move through lab independently of patient
- **1:N result structure**  a CBC panel produces 10+ discrete values, not a narrative report
- **Auto-validation engine**  75-85% of results release without human review
- **Dual validation workflow**  Italian regulations require technical (TSLB) + clinical (physician) validation
- **No appointments**  work is queue-based by priority, not scheduled time slots
- **Middleware layer**  AIRIS connects to middleware, not directly to analyzers

### Laboratory Sections

The module contains specialized sections with distinct workflows:

| Section | Primary Functions | Unique Aspects |
|---|---|---|
| **Chemistry** | Metabolic panels, electrolytes, enzymes | Highest volume, most automated |
| **Hematology** | CBC, differentials, smear review | Manual review for abnormals |
| **Coagulation** | PT/INR, aPTT, D-dimer, factors | Time-sensitive specimens |
| **Urinalysis** | Dipstick, microscopy, drug screens | Often manual microscopy |
| **Immunology/Serology** | Autoantibodies, infectious markers | Longer TAT |
| **Microbiology** | Cultures, organism ID, susceptibilities | Multi-day workflow, hierarchical results |
| **Blood Bank** | Type & screen, crossmatch, products | Life-critical, special validation |
| **Molecular** | PCR, viral loads, genetics | Batch processing |

---

### Core Data Structures

#### TestOrder (Primary Entity)

```
TestOrder {
 order_id: UUID
 accession_number: String // Unique visible identifier
 patient_id: Reference -> Patient
 
 ordering_physician_id: Reference -> User
 ordering_department: String
 clinical_indication: Text
 diagnosis_codes: [String] // ICD-10
 
 priority: Enum (STAT, ASAP, ROUTINE, TIMED)
 tests: [Reference -> Test]
 panels: [Reference -> Panel]
 
 status: OrderStatus
 
 ordered_at: DateTime
 received_at: DateTime
 completed_at: DateTime
}
```

#### Specimen

```
Specimen {
 specimen_id: UUID
 accession_number: String
 order_id: Reference -> TestOrder
 patient_id: Reference -> Patient
 
 specimen_type: Enum (BLOOD, URINE, CSF, STOOL, SWAB, TISSUE, OTHER)
 container_type: String // Tube color/type
 
 collection_time: DateTime
 collected_by: Reference -> User
 
 status: SpecimenStatus
 current_location: String
 condition: Enum (ACCEPTABLE, HEMOLYZED, LIPEMIC, ICTERIC, CLOTTED, QNS)
 
 storage_location: String
 expiration_time: DateTime
 
 parent_specimen_id: Reference -> Specimen  // If aliquot
}
```

#### Result

```
Result {
 result_id: UUID
 test_id: Reference -> Test
 
 value_type: Enum (NUMERIC, TEXT, CODED)
 value_numeric: Decimal
 value_text: String
 
 units: String // UCUM standard
 reference_range_low: Decimal
 reference_range_high: Decimal
 
 abnormal_flag: Enum (NORMAL, LOW, HIGH, CRITICAL_LOW, CRITICAL_HIGH)
 is_critical: Boolean
 
 delta_check_status: Enum (PASS, FAIL, NOT_APPLICABLE)
 previous_value: Decimal
 delta_percent: Decimal
 
 auto_validation_status: Enum (PASSED, FAILED, OVERRIDE)
 
 tech_validated_by: Reference -> User
 tech_validated_at: DateTime
 clinically_validated_by: Reference -> User
 clinically_validated_at: DateTime
 
 released_at: DateTime
 
 is_amended: Boolean
 amendment_reason: Text
 original_value: String
}
```

---

### Status Progression

#### Standard Test Order Flow

```
ORDERED
 | [Labels generated]
PENDING_COLLECTION
 | [Phlebotomy]
COLLECTED
 | [Transport]
IN_TRANSIT
 | [Arrives at lab]
RECEIVED
 | [Logged, condition checked]
ACCESSIONED
 | [Routed to analyzers]
IN_PROCESS
 | [Results from middleware]
RESULTED
 |
 +--> AUTO_VERIFIED (75-85%) --> TECH_VALIDATED --> CLINICALLY_VALIDATED --> RELEASED -> FINAL
 |
 +--> NEEDS_REVIEW (15-25%) --> MANUAL_REVIEW --> TECH_VALIDATED --> CLINICALLY_VALIDATED --> RELEASED -> FINAL
```

#### Microbiology Culture Flow

```
COLLECTED -> RECEIVED -> PLATED -> INCUBATING -> 
ORGANISM_IDENTIFIED -> PRELIMINARY (organism reported) -> 
SUSCEPTIBILITY_TESTING -> FINAL (full report)
```

#### Blood Bank Type & Screen Flow

```
ORDERED -> SPECIMEN_RECEIVED -> ABO_TYPING -> RH_TYPING -> ANTIBODY_SCREEN ->
[If positive: ANTIBODY_IDENTIFICATION] -> VALIDATED -> RELEASED
```

---

### Environments

Laboratory adapts the 6-environment pattern:

| Environment | Laboratory Adaptation |
|---|---|
| **Collection Management** | Pending collections queue (replaces Scheduling  no appointments) |
| **Specimen Receipt** | Accessioning with condition assessment |
| **Worklist / Analysis** | Section-based worklists, analyzer monitoring, QC status |
| **Validation & Reporting** | Review queues, dual validation, critical values, release |
| **Results Archive** | Patient history, cumulative reports, trending |
| **Administration** | Test catalog, reference ranges, rules, analyzers |

**Additional View: Specimen Tracking**  Real-time status board showing specimens by location and status.

---

### Unique Features

#### Auto-Validation Engine

75-85% of results release automatically when all criteria pass:
- Result within reference range
- QC passed for current run
- No instrument flags
- Serum indices acceptable (hemolysis/icterus/lipemia)
- No critical values
- Delta check passed (comparison with prior results)

Failed criteria route results to manual review queue.

#### Dual Validation Workflow (Italian Compliance)

1. **Technical Validation**  TSLB confirms analytical correctness
2. **Clinical Validation**  Physician confirms clinical appropriateness, signs report

Both timestamps recorded. Required before result release.

#### Critical Value Notification

Life-threatening results trigger mandatory workflow:
- Automatic detection based on configured thresholds
- Notification workflow with escalation
- Documentation: who called, who received, when, read-back confirmation
- Integration with alerting systems

#### Delta Checking

Compares current results against patient's prior values to detect:
- Specimen misidentification
- IV fluid contamination
- Significant clinical changes

Configurable thresholds per analyte (e.g., potassium 1.0 mmol/L within 96 hours).

#### Add-on Testing

Order additional tests on stored specimens:
- System checks specimen age and volume eligibility
- No new collection required
- Transparent workflow addition

#### Reflex Testing

Automatic follow-up orders based on results:
- Configurable rules (e.g., if TSH abnormal -> free T4)
- Transparent to ordering physician

---

### Microbiology Specialized Workflow

Microbiology uses hierarchical result structure:

```
Specimen
  +-- Culture
 +-- Organism (can be multiple)
 +-- Susceptibilities
```

**Cascade Reporting** (Antibiotic Stewardship):
- Group A antibiotics always report
- Group B antibiotics report selectively
- Group C (reserve) antibiotics suppress unless specifically needed

**Turnaround Times:**
- Blood culture positive: 12-36 hours to detection
- Blood culture negative: 5 days incubation
- Urine culture: 48-72 hours final
- Organism ID via MALDI-TOF: 6 minutes

---

### Blood Bank Specialized Workflow

**Type & Screen:**
- ABO typing (forward + reverse)
- Rh typing (with weak D if negative)
- Antibody screen (2-3 cell panel)
- Positive screen triggers antibody identification

**Crossmatch Methods:**
- **Electronic crossmatch**  No physical testing when: two concordant ABO/Rh on file, negative antibody screen, no historical antibodies, validated computer system
- **Serologic crossmatch**  Physical testing when antibodies present or electronic criteria not met

**Product Management:**
- ISBT 128 labeling (international standard)
- Unit assignment, issue, and return tracking
- Transfusion documentation
- Lookback/traceback support (10+ year records)

**Critical Safety:**
- Hard stops preventing ABO-incompatible releases
- Two-person bedside verification
- Complete vein-to-vein traceability

---

### Integration Architecture

```
+---+
| AIRIS Laboratory |
| Module |
+---+---+
 | HL7 v2.x
 +---+---+
 | | |
 +---+ +---+ +---+
 | EMR/HIS  | | FSE 2.0 | | Billing  |
 | Orders/  | | Gateway | | |
 | Results  | | | | |
 +---+ +---+ +---+

+---+
| MIDDLEWARE |
| (Data Innovations, Instrument Manager) |
| Auto-verification rules, QC monitoring, routing |
+---+---+
 | ASTM/HL7
 +---+---+---+---+
 | | | | |
+---+ +---+ +---+ +---+ +---+
|Chem.  | |Hemat. | |Coag.  | |Immuno | |Micro  |
|Analyz.| |Analyz.| |Analyz.| |Platf. | |Systems|
+---+ +---+ +---+ +---+ +---+
```

**Key Integration Points:**
- **EMR/HIS:** HL7 ORM (orders in), ORU (results out)
- **Middleware:** Analyzer connectivity, auto-verification, QC
- **FSE 2.0:** CDA2 documents with LOINC codes
- **Analyzers:** Via middleware (ASTM/LIS2-A2 protocol)

---

### Compliance Requirements (Italian)

| Requirement | Implementation |
|---|---|
| Dual validation | Technical (TSLB) + Clinical (Physician) workflow with timestamps |
| FSE 2.0 | CDA2 with LOINC codes, embedded in PAdES-signed PDF |
| LOINC mandate | LOINC code required on every result (OBX-3) |
| 10-year retention | Full audit trail and result archive |
| ALCOA+ audit trail | User, timestamp, workstation for all actions |
| Critical value documentation | Structured notification with read-back confirmation |
| Regional nomenclatore | Three-level mapping: internal -> regional -> LOINC |

---

### Permissions Structure

| Permission | Admin | Phlebotomist | TSLB | Physician |
|---|---|---|---|---|
| View pending collections | [OK] | [OK] | [OK] | [OK] |
| Print labels | [OK] | [OK] | [OK] | [OK] |
| Document collection | [OK] | [OK] | [OK] | [OK] |
| Accession specimens | [OK] | - | [OK] | [OK] |
| Enter manual results | - | - | [OK] | [OK] |
| Technical validation | - | - | [OK] | [OK] |
| Clinical validation | - | - | - | [OK] |
| Release results | - | - | - | [OK] |
| Document critical values | - | - | [OK] | [OK] |
| Amend results | - | - | [OK]* | [OK] |
| Configure test catalog | [OK] | - | - | [OK] |

*TSLB can initiate; physician must approve

---

### Interaction Layer Examples

```
Collection Management:
"Print labels for ICU STAT orders"
-> Lists STAT orders, sends labels to printer

"Mark Rossi collected, fasting, left arm"
-> Records collection with site and fasting status

Validation:
"Show critical values pending notification"
-> Lists critical results awaiting notification

"Notify potassium 6.8 to Dr. Bianchi ext 4521, read back confirmed"
-> Documents critical value notification

Results:
"Show Rossi's potassium trend last 30 days"
-> Displays trend with graph option

Add-on:
"Add HbA1c to Rossi's specimen from this morning"
-> Checks eligibility, adds test to existing specimen
```

---

### Detailed Specification Reference

For complete data structures, UI mockups, integration specifications, and specialized workflows (Microbiology, Blood Bank), see:
**AIRIS_Laboratory_Module_Specification.md**

---

---

## PATHOLOGY MODULE (Anatomic Pathology)

### Module Overview

The Pathology Module manages anatomic pathology workflow from specimen receipt through signed diagnosis. It handles surgical pathology, cytopathology, and consultation cases.

**AIRIS Position:** RIS-equivalent for pathology
- **Owns:** Orders, case management, specimen hierarchy tracking, reporting, sign-out
- **Integrates with:** IMS (digital slides), middleware (stainers, scanners)
- **Does not own:** Real-time processing station tracking, instrument control

**Fundamental Difference from Other Modules:**

| Aspect | Imaging Modules | Laboratory | Pathology |
|---|---|---|---|
| Subject | Patient present | Specimen only | Specimen + multi-level hierarchy |
| Entity depth | 1 level (Exam) | 2 levels (Order -> Results) | **4 levels (Case -> Specimen -> Block -> Slide)** |
| Processing time | Minutes-hours | Hours | **Days** |
| Physical tracking | None | Short-term | **10+ years (blocks, slides)** |
| Result type | Images + narrative | Discrete values | **Narrative + synoptic** |
| Scheduling | Appointment-based | Queue-based | **Queue-based** |

### The Specimen-Block-Slide Hierarchy

This hierarchical data model is fundamental to pathology:

```
CASE (S24-00893)
|
+-- SPECIMEN Part A ("Right breast, mastectomy")
| +-- BLOCK A1 ("Tumor, center")
| | +-- SLIDE A1-1 (H&E)
| | +-- SLIDE A1-2 (ER IHC)
| | +-- SLIDE A1-3 (PR IHC)
| +-- BLOCK A2 ("Tumor, margin")
| +-- SLIDE A2-1 (H&E)
|
+-- SPECIMEN Part B ("Sentinel lymph node")
 +-- BLOCK B1
 +-- SLIDE B1-1 (H&E)
```

**Full label format:** `S24-00893-A1-1 H&E` = Accession -> Specimen -> Block -> Slide -> Stain

---

### Core Data Structures

#### Case (Primary Entity)

```
Case {
 case_id: UUID
 accession_number: String // S24-00893 format
 
 patient_id: Reference -> Patient
 ordering_physician_id: Reference -> User
 
 case_type: Enum (SURGICAL, CYTOLOGY_GYN, CYTOLOGY_NONGYN, CONSULTATION)
 subspecialty: Enum (BREAST, GI_HEPATIC, GU_RENAL, DERMATOPATHOLOGY, ...)
 priority: Enum (STAT, URGENT, ROUTINE)
 
 clinical_history: Text
 specimens: [Reference -> Specimen]
 
 status: CaseStatus
 assigned_pathologist_id: Reference -> User
 
 // Report content
 gross_description: Text
 microscopic_description: Text
 final_diagnosis: Text
 synoptic_data: JSON // CAP protocol structured data
 tnm_staging: TNMStaging
 
 // Sign-out
 signed_by: Reference -> User
 signed_at: DateTime
 
 // Amendment
 is_amended: Boolean
 amendments: [Reference -> Amendment]
}
```

#### Specimen, Block, Slide

Each level tracks its parent and children:
- **Specimen:** Part designator, anatomic site, laterality, collection info, blocks
- **Block:** Block designator (A1, A2), tissue description, storage location (10+ year retention), slides
- **Slide:** Slide designator (A1-1), stain type (H&E, IHC), scan status, WSI link to IMS

---

### Status Progression

#### Standard Surgical Case Flow

```
ORDERED
 | [Specimen collected]
RECEIVED
 | [Accessioned]
IN_GROSSING
 | [PA/Pathologist dissects, documents]
GROSSING_COMPLETE
 | [Cassettes to processing]
PROCESSING
 | [Overnight - status from middleware]
SLIDES_READY
 | [H&E distributed]
ASSIGNED
 | [Pathologist picks up]
IN_REVIEW
 |
 +--> [Simple] -> READY_FOR_SIGNOUT -> SIGNED_OUT -> RELEASED
 |
 +--> [Needs IHC] -> PENDING_ADDITIONAL_STUDIES -> [Complete] -> SIGNED_OUT -> RELEASED
```

#### Frozen Section Flow (Parallel, Time-Critical)

```
FROZEN_REQUESTED -> SPECIMEN_RECEIVED -> IN_PROGRESS -> COMMUNICATED -> CONCORDANCE_PENDING -> COMPLETE
```
- **Target:** <=20 minutes from receipt to communication
- **Requires:** Verbal communication to surgeon with read-back confirmation
- **Tracked:** Concordance with permanent sections (>97% target)

---

### Environments

| Standard Environment | Pathology Adaptation |
|---|---|
| **Scheduling** | **Accessioning**  Receive specimens, create cases, assign accession numbers |
| **Check-in** | **Grossing**  Specimen examination, gross description, block creation |
| **Execution** | **Review**  Pathologist examines slides, orders additional studies |
| **Reporting** | **Sign-out**  Write diagnosis, complete synoptic, sign report |
| **Archive** | **Case Archive**  Search cases, retrieve blocks for additional studies |
| **Administration** | **Administration**  Templates, synoptic protocols, storage management |

**Additional view:** Frozen Section  Time-critical intraoperative workflow with timer

---

### Unique Features

#### Synoptic Reporting (CAP Cancer Protocols)

For cancer cases, structured reporting following College of American Pathologists protocols:
- 100+ tumor-specific templates
- Required elements (Core), conditional elements, optional elements
- TNM staging with all components (pT, pN, margins, grade, biomarkers)
- Required for CAP accreditation and Commission on Cancer

#### Internal Sub-Ordering

Within a case, pathologist can order additional studies:
- Immunohistochemistry (IHC)  ER, PR, HER2, Ki-67, etc.
- Special stains  PAS, trichrome, iron, etc.
- Molecular tests  sent to molecular lab
- Deeper levels/recuts from blocks

Orders go to middleware, results come back and update case.

#### Block/Slide Long-Term Storage

Physical assets tracked for 10+ years:
- Storage location (Archive Room, Shelf, Position)
- Retrieval workflow for additional studies
- Audit trail for chain of custody

---

### Integration Architecture

```
+---+
| AIRIS PATHOLOGY |
| |
|  Accessioning -> Grossing -> Review -> Sign-out -> Archive |
| |
+---+---+
 |
 +---+---+
 | | |
 +---+ +---+ +---+
 | IMS | | Middleware| |  EMR |
 | (Digital | | (Stainers,| | Orders/  |
 |  Slides) | | Scanners) | | Results  |
 +---+ +---+ +---+
```

**Integration Points:**
- **EMR:** HL7 ORM (orders in), ORU (results out)
- **IMS:** Case context to viewer, WSI links back
- **Middleware:** IHC/stain orders out, completion status in
- **FSE 2.0:** CDA-RAP documents per HL7 Italia specification

---

### Compliance Requirements (Italian)

| Requirement | Implementation |
|---|---|
| FSE 2.0 | CDA-RAP v1.1 (Referto di Anatomia Patologica) |
| Firma digitale | Qualified electronic signature for sign-out |
| SNOMED CT | Diagnosis coding |
| ICD-O-3 | Cancer registry (morphology + topography) |
| 10-year retention | Reports, blocks, slides with audit trail |
| SIAPEC-IAP | Quality standards compliance |

---

### Permissions Structure

| Permission | Admin | Accessioning | Histotech | PA | Cytotech | Pathologist |
|---|---|---|---|---|---:|---|
| Accession cases | [OK] | [OK] | - | - | - | [OK] |
| Gross specimens | - | - | - | [OK] | - | [OK] |
| Create blocks | - | - | [OK] | [OK] | - | [OK] |
| Screen cytology | - | - | - | - | [OK] | [OK] |
| Order studies | - | - | - | - | - | [OK] |
| Sign reports | - | - | - | - | - | [OK] |
| Frozen section | - | - | - | - | - | [OK] |

---

### Interaction Layer Examples

```
Accessioning:
"Accession the mastectomy, routine, breast subspecialty"
-> Creates case S24-00893, assigns to breast

Grossing:
"Add blocks A1 through A10, tumor and margins"
-> Creates 10 blocks with designators

"Submit for processing"
-> Marks grossing complete

Review:
"Order ER, PR, HER2, and Ki-67 on block A1"
-> Creates IHC order, sends to middleware

"View slides in IMS"
-> Launches viewer with case context

Sign-out:
"Use breast resection template"
-> Loads CAP synoptic protocol

"Stage is pT1c N1a"
-> Populates TNM fields

"Sign out and release"
-> Applies signature, releases to EMR

Frozen Section:
"Frozen is negative for carcinoma"
-> Enters diagnosis

"Called to Dr. Bianchi, confirmed negative margins"
-> Documents communication with readback
```

---

### Detailed Specification Reference

For complete data structures, UI mockups, integration specifications, and specialized workflows, see:
**AIRIS_Pathology_Module_Specification.md**

---

## OPERATING ROOM MODULE (MODULO SALA OPERATORIA) - COMPLETE DESIGN

### Module Overview

The Operating Room Module manages surgical workflow from case scheduling through PACU discharge, covering the complete perioperative journey. It serves as the Surgical Information System (SIS) component of the perioperative ecosystem.

**AIRIS Position:** SIS-equivalent for surgery
- **Owns:** Scheduling with block management, case tracking, perioperative nursing documentation, WHO Safety Checklist enforcement, surgical counts, specimen/implant tracking, PACU documentation and scoring (Aldrete, PADSS, White-Song), Verbale Operatorio generation, surgical consent tracking, OR utilization analytics
- **Integrates with:** AIMS (anesthesia information system), Pathology, Radiology, Laboratory, Pharmacy, CSSD (sterilization), Materials Management
- **Does not own:** Anesthesia record (continuous vitals, drug timing — AIMS territory), medical device data capture in OR, instrument sterilization workflow, robotic surgery control, detailed anesthesia billing

**The SIS/AIMS Parallel:**

| Radiology | Operating Room |
|---|---|
| RIS | SIS (AIRIS) |
| PACS | AIMS |
| Modality (CT, MRI) | Surgical suite + equipment |
| DICOM images | Anesthesia record + device data |
| Radiology report | Verbale Operatorio |

**What Makes Operating Room Different:**

| Aspect | Service Modules | Operating Room |
|---|---|---|
| Workflow type | Order-driven (receive, process, report) | Phase-based (pre-op → intra-op → post-op) |
| Time granularity | Minutes to hours | Minute-by-minute mandatory timestamps |
| Scheduling | Single resource (modality + slot) | Combinatorial: room + surgeon + anesthesia + equipment + staff + implants |
| Safety enforcement | Standard quality checks | Mandatory checkpoints (WHO checklist — Time Out is hard gate, others soft with override) |
| Documentation | Sequential (one user at a time) | Simultaneous multi-user (surgeon, nurse, anesthesiologist) |
| Team composition | 1-3 staff per procedure | 5-10+ team members with distinct roles and individual timestamps |
| Physical tracking | Patient present briefly | Sponges, needles, instruments, specimens, implants all tracked |
| Revenue impact | Per-exam billing | Highest hospital revenue driver |

---

### Core Data Structures

#### SurgicalCase (Primary Entity)

```
SurgicalCase {
    case_id: UUID
    case_number: String                   // ORG-2026-00123 format

    // Patient & Encounter
    patient_id: Reference → Patient
    encounter_id: Reference → Encounter   // Hospital admission if inpatient
    case_class: Enum (INPATIENT, OUTPATIENT, EMERGENCY)

    // Scheduling
    scheduled_date: Date
    scheduled_start_time: Time
    estimated_duration_minutes: Integer
    actual_duration_minutes: Integer       // Calculated

    // Resources
    or_room_id: Reference → ORRoom
    primary_surgeon_id: Reference → User
    additional_surgeons: [Reference → User]
    anesthesia_provider_id: Reference → User
    anesthesia_type: Enum (GENERAL, REGIONAL, LOCAL, MAC, SEDATION)
    circulating_nurse_id: Reference → User
    scrub_nurse_id: Reference → User

    // Staff (detailed per-person tracking with timestamps)
    staff_assignments: [Reference → CaseStaffAssignment]

    // Procedures
    procedures: [Reference → Procedure]
    primary_procedure_code: String        // ICD-9-CM (→ CIPI from Jan 2027) — derived by Regulatory Layer code-mapping subsystem from procedure description; surgeon's clinical description (post_op_diagnosis + procedure narrative) is authoritative
    pre_op_diagnosis: Text
    post_op_diagnosis: Text

    // Priority
    priority: Enum (ELECTIVE, ADD_ON, EXPEDITED, URGENT, EMERGENT)

    // Status
    status: CaseStatus
    current_phase: Enum (PRE_OPERATIVE, INTRA_OPERATIVE, POST_OPERATIVE)

    // Consent
    surgical_consent: Reference → SurgicalConsent

    // Pre-anesthesia clearance (from AIMS, stored as readiness flag)
    anesthesia_clearance_status: Boolean
    asa_classification: Enum (ASA_1, ASA_2, ASA_3, ASA_4, ASA_5, ASA_6)
    asa_emergency_modifier: Boolean       // "E" suffix for emergency

    // WHO Checklist
    sign_in: Reference → ChecklistSignIn
    time_out: Reference → ChecklistTimeOut
    sign_out: Reference → ChecklistSignOut

    // Critical Timestamps
    patient_in_holding_at: DateTime
    patient_in_room_at: DateTime
    anesthesia_start_at: DateTime
    anesthesia_ready_at: DateTime
    positioned_at: DateTime
    time_out_completed_at: DateTime
    incision_at: DateTime
    closure_start_at: DateTime
    closure_complete_at: DateTime
    sign_out_completed_at: DateTime
    patient_out_room_at: DateTime
    pacu_arrival_at: DateTime
    pacu_phase1_discharge_at: DateTime
    pacu_phase2_discharge_at: DateTime    // Outpatients only

    // Tracking
    counts: [Reference → SurgicalCount]
    specimens: [Reference → SurgicalSpecimen]
    implants: [Reference → Implant]

    // Classification
    wound_classification: Enum (CLEAN_I, CLEAN_CONTAMINATED_II, CONTAMINATED_III, DIRTY_IV)
    estimated_blood_loss_ml: Integer

    // Documentation
    operative_report: Reference → OperativeReport
    pacu_record: Reference → PACURecord

    // Preference Card Used
    preference_card_id: Reference → PreferenceCard

    // Cancellation (if applicable)
    cancellation: CaseCancellation         // Null if not cancelled
}
```

#### CaseCancellation

```
CaseCancellation {
    cancelled_at: DateTime
    cancelled_by: Reference → User
    cancellation_point: Enum (PRE_DAY, PRE_OP_DAY_OF, IN_OR_PRE_ANESTHESIA, POST_ANESTHESIA)
    reason_category: Enum (MEDICAL, SURGICAL, PATIENT_DECISION, ADMINISTRATIVE, EQUIPMENT, NO_BED_AVAILABLE)
    reason_detail: Text
    was_preventable: Boolean
    rescheduled: Boolean
    rescheduled_case_id: Reference → SurgicalCase  // If rescheduled
}
```

#### CaseStaffAssignment

```
CaseStaffAssignment {
    assignment_id: UUID
    case_id: Reference → SurgicalCase
    user_id: Reference → User
    role: Enum (PRIMARY_SURGEON, ASSISTANT_SURGEON, ANESTHESIOLOGIST,
               CRNA, CIRCULATING_NURSE, SCRUB_NURSE, SCRUB_TECH,
               PERFUSIONIST, FIRST_ASSISTANT, OTHER)
    role_detail: String                   // Free text if OTHER
    in_room_at: DateTime                  // Individual entry time
    out_room_at: DateTime                 // Individual exit time
    is_relief: Boolean                    // Replaced another staff member
    relieved_user_id: Reference → User    // Who they replaced
}
```

**Why this entity matters:** The Verbale Operatorio legally requires all team member names. CaseStaffAssignment provides the source data with individual timestamps, enabling auto-population of the operative report personnel section, billing/quality reporting, and fatigue/hours tracking.

#### SurgicalConsent

```
SurgicalConsent {
    consent_id: UUID
    case_id: Reference → SurgicalCase
    patient_id: Reference → Patient

    // Legge 219/2017 requirements
    procedure_consented: Text             // Specific procedure(s)
    diagnosis: Text
    prognosis: Text
    benefits_explained: Text
    risks_explained: Text
    alternatives_explained: Text
    consequences_of_refusal: Text

    // Signatories
    consenting_provider: Reference → User // Surgeon who obtained consent
    patient_signature: Boolean
    legal_representative: String          // If patient unable to consent
    witness: Reference → User

    // Document
    consent_document_ref: String          // Scanned/digital document reference
    signature_type: Enum (WET_INK_SCANNED, FEA, FIRMA_DIGITALE)
    signed_at: DateTime

    // Status
    status: Enum (PENDING, SIGNED, WITHDRAWN)
    withdrawn_at: DateTime                // If patient withdraws consent

    // NOTE: Consent for treatment and consent for data processing (GDPR)
    // must remain legally separate per Italian law
}
```

#### ORRoom

```
ORRoom {
    room_id: UUID
    name: String                          // "OR-1", "OR-5 Cardiac"
    code: String
    capabilities: [Enum]                  // GENERAL, CARDIAC, NEURO, ORTHO, ROBOTIC, HYBRID, ENDO
    equipment_available: [String]
    is_active: Boolean

    // Room state (independent state machine, parallel to case status)
    room_status: Enum (DIRTY, CLEANING, CLEAN, SETTING_UP, ROOM_READY, IN_USE, MAINTENANCE, OUT_OF_SERVICE)
}
```

**Room state machine** runs independently from case status. When a case reaches PROCEDURE_COMPLETE and patient leaves, the room transitions to DIRTY → CLEANING → CLEAN → SETTING_UP → ROOM_READY for the next case. This drives the OR Tracking Board's turnover visibility and turnover time metrics.

#### RoomTurnover

```
RoomTurnover {
    turnover_id: UUID
    or_room_id: Reference → ORRoom
    previous_case_id: Reference → SurgicalCase
    next_case_id: Reference → SurgicalCase

    patient_out_at: DateTime              // Previous case wheels out
    cleaning_start_at: DateTime
    cleaning_end_at: DateTime
    cleaning_staff: [Reference → User]
    cleaning_type: Enum (STANDARD, TERMINAL)
    setup_start_at: DateTime
    setup_end_at: DateTime
    next_patient_in_at: DateTime          // Next case wheels in

    total_turnover_minutes: Integer       // Calculated: patient_out → next_patient_in
}
```

#### PreferenceCard

```
PreferenceCard {
    card_id: UUID
    surgeon_id: Reference → User
    procedure_type: String
    card_name: String                     // "Dr. Bianchi - Colecistectomia Lap"

    equipment_required: [EquipmentItem]
    instrument_sets: [String]             // Set names from CSSD
    supplies: [SupplyItem]
    typical_implants: [ImplantItem]

    patient_position: String
    positioning_aids: [String]
    prep_solution: String
    drape_type: String
    preferred_anesthesia: AnesthesiaType
    special_instructions: Text

    version: Integer
    last_updated: DateTime
    updated_by: Reference → User
}
```

#### WHO Surgical Safety Checklist Structures

```
ChecklistSignIn {
    checklist_id: UUID
    case_id: Reference → SurgicalCase

    // Before induction of anesthesia
    patient_confirmed_identity: Boolean
    site_marked: Boolean
    consent_signed: Boolean
    anesthesia_machine_checked: Boolean
    pulse_oximeter_functioning: Boolean
    known_allergy: Enum (NO, YES, NOT_APPLICABLE)
    allergy_details: String
    difficult_airway_risk: Boolean
    airway_equipment_available: Boolean
    blood_loss_risk: Boolean              // >500ml adult, >7ml/kg peds
    blood_products_available: Boolean
    iv_access_adequate: Boolean

    // Configurable additional items (institution-specific)
    additional_items: [ChecklistItem]

    completed_by: Reference → User
    completed_at: DateTime
    is_complete: Boolean

    // Override (soft gate — can proceed without, with documented reason)
    was_overridden: Boolean
    override_reason: Text
    override_by: Reference → User
}

ChecklistTimeOut {
    checklist_id: UUID
    case_id: Reference → SurgicalCase

    // Immediately before incision - ALL TEAM PRESENT
    all_team_introduced: Boolean          // Name and role
    patient_name_confirmed: Boolean
    procedure_confirmed: Boolean
    site_confirmed: Boolean
    anticipated_critical_events_reviewed: Boolean
    surgeon_critical_steps: Text
    anesthesia_concerns: Text
    nursing_concerns: Text
    antibiotic_prophylaxis_given: Boolean
    antibiotic_within_60_minutes: Boolean
    essential_imaging_displayed: Boolean
    dvt_prophylaxis_addressed: Boolean
    fire_risk_assessed: Boolean           // Silverstein scale (0-3)
    fire_risk_score: Integer

    // Configurable additional items
    additional_items: [ChecklistItem]

    completed_by: Reference → User
    completed_at: DateTime
    is_complete: Boolean

    // NO override — Time Out is a HARD GATE
    // System blocks IN_PROCEDURE status without Time Out completion
}

ChecklistSignOut {
    checklist_id: UUID
    case_id: Reference → SurgicalCase

    // Before patient leaves OR
    procedure_name_recorded: Boolean
    instrument_count_correct: Boolean
    sponge_count_correct: Boolean
    needle_count_correct: Boolean
    specimen_labeling_confirmed: Boolean
    equipment_problems_documented: Boolean
    equipment_problems_text: Text
    key_recovery_concerns: Text

    // Configurable additional items
    additional_items: [ChecklistItem]

    completed_by: Reference → User
    completed_at: DateTime
    is_complete: Boolean

    // Override (soft gate — can proceed without, with documented reason)
    was_overridden: Boolean
    override_reason: Text
    override_by: Reference → User
}

ChecklistItem {
    // For institution-specific additions beyond WHO 19 items
    item_id: UUID
    label: String
    is_completed: Boolean
    value: String                         // Free text if needed
}
```

**WHO Checklist gate policy:**
- **Sign In:** Soft gate. Strongly prompted before ANESTHESIA_START. If incomplete, system flags and requires override reason. Emergency cases may bypass with mandatory post-hoc documentation.
- **Time Out:** HARD GATE. System blocks IN_PROCEDURE (incision) status until Time Out is complete. No override. This aligns with Joint Commission Universal Protocol.
- **Sign Out:** Soft gate. Strongly prompted before PROCEDURE_COMPLETE. If incomplete, system flags and requires override reason. Override generates compliance alert.

All checklist items support configurable extensions — hospitals can add items (fire risk, normothermia, antibiotic redosing for long cases) without modifying the base structure.

#### SurgicalCount

The count itself is patient-safety craft — two people physically counting items together is the work. AIRIS does not replace this. What AIRIS does is capture the count without making the team operate a form during the procedure: the circulating nurse and scrub nurse count out loud as they always have ("sponges, ten counted, ten visible, correct"), and AIRIS structures the spoken count into the record. A discrepancy in the spoken count triggers the same mandatory X-ray workflow as before.

```
SurgicalCount {
    count_id: UUID
    case_id: Reference → SurgicalCase
    count_type: Enum (SPONGE, NEEDLE, INSTRUMENT, MISCELLANEOUS)
    count_timing: Enum (INITIAL, ADDITIONAL, PRE_CLOSURE, SKIN_CLOSURE)
    expected_count: Integer
    actual_count: Integer
    is_correct: Boolean                    // Computed
    counted_by: Reference → User           // Circulating nurse
    verified_by: Reference → User          // Scrub nurse
    counted_at: DateTime
    capture_method: Enum (VOICE, MANUAL)   // Voice is primary; manual entry is the fallback
    discrepancy_action: Text               // If count incorrect — triggers mandatory X-ray workflow
}
```

#### SurgicalSpecimen

```
SurgicalSpecimen {
    specimen_id: UUID
    case_id: Reference → SurgicalCase
    specimen_type: String                  // "Gallbladder", "Appendix"
    specimen_description: Text
    laterality: Enum (LEFT, RIGHT, BILATERAL, NA)
    is_frozen_section: Boolean
    pathology_order_id: Reference → Order  // Link to Pathology Module
    labeled_by: Reference → User
    verified_by: Reference → User          // Two-person verification
    sent_at: DateTime
    frozen_result: Text                    // If frozen section
    frozen_result_at: DateTime
    frozen_communicated_to: Reference → User
}
```

#### Implant

```
Implant {
    implant_id: UUID
    case_id: Reference → SurgicalCase
    device_category: String               // "Hip prosthesis", "Mesh", "Plate"
    manufacturer: String                  // Decoded from UDI (primary path)
    model: String                         // Decoded from UDI
    udi: String                           // Unique Device Identification (EU MDR 2017/745) — captured by barcode/RFID scan; this is the primary entry path
    lot_number: String                    // Decoded from UDI
    serial_number: String                 // Decoded from UDI
    expiration_date: Date                 // Decoded from UDI
    size: String                          // From UDI or device specification
    implant_site: String                  // Operator's narration ("right hip", "L3-L4")
    implanted_by: Reference → User
    scanned_at: DateTime                  // Barcode/RFID capture time
    entry_method: Enum (BARCODE, RFID, MANUAL)  // MANUAL is fallback only — used when barcode/RFID is unreadable or unavailable; system flags MANUAL entries for audit attention
}
```

**Capture flow:** Implant packaging carries a UDI barcode (or RFID tag) per EU MDR 2017/745. The circulating nurse scans the package; AIRIS decodes the UDI and populates manufacturer, model, lot, serial, expiration. The operator narrates the implant site as part of operative communication ("placing the cup in the right acetabulum") which the system structures. Manual data entry exists as a fallback only — for damaged packaging, legacy devices without UDI, or scanning equipment failure. Manual entries are flagged for audit because they're the most likely source of error in implant tracking.

#### PACURecord

```
PACURecord {
    pacu_id: UUID
    case_id: Reference → SurgicalCase
    pacu_bed: String                      // "P-1", "P-3"
    arrival_at: DateTime

    // Handoff (SBAR structure)
    handoff_from: Reference → User        // OR nurse → PACU nurse
    handoff_to: Reference → User
    handoff_procedure_summary: Text       // Auto-populated from case
    handoff_anesthesia_summary: Text      // From AIMS
    handoff_concerns: Text                // Key issues for recovery

    // Recovery Phase
    recovery_pathway: Enum (STANDARD_PHASE_I, FAST_TRACK_BYPASS, DIRECT_ICU)
    fast_track_eligible: Boolean          // White-Song ≥12
    fast_track_score: Reference → WhiteSongScore  // If assessed

    // Vitals (q5-15 min)
    vitals: [PACUVitals]

    // Phase I Scoring — Modified Aldrete (q15 min)
    aldrete_scores: [AldreteScore]

    // Phase II Scoring — PADSS (outpatients only)
    padss_scores: [PADSSScore]

    // PONV Assessment
    ponv_risk_score: Integer              // Apfel 0-4
    ponv_events: [PONVEvent]

    // Pain Management
    pain_assessments: [PainAssessment]

    // Interventions
    interventions: [PACUIntervention]

    // Phase I Discharge
    phase1_discharge_criteria_met: Boolean
    phase1_aldrete_score: Integer         // ≥9 required
    phase1_discharged_at: DateTime
    phase1_destination: Enum (WARD, ICU, PHASE_II, HOME_DIRECT)

    // Phase II Discharge (outpatients)
    phase2_padss_score: Integer           // ≥9 required
    responsible_adult_present: Boolean
    voiding_confirmed: Boolean            // Required for spinal/urologic/anorectal
    discharge_instructions_given: Boolean
    followup_scheduled: Boolean
    phase2_discharged_at: DateTime

    // Overall
    discharge_decision_by: Reference → User
    final_destination: Enum (WARD, ICU, HOME, EXTENDED_RECOVERY)
    discharge_orders: Text
}
```

#### AldreteScore (Phase I Discharge)

```
AldreteScore {
    score_id: UUID
    pacu_id: Reference → PACURecord
    scored_at: DateTime
    scored_by: Reference → User

    // Modified Aldrete (1995) — uses SpO2 instead of color
    activity: Integer                     // 0-2 (moves all extremities voluntarily)
    respiration: Integer                  // 0-2 (breathes deeply, coughs freely)
    circulation: Integer                  // 0-2 (BP within 20% of pre-op)
    consciousness: Integer                // 0-2 (fully awake)
    oxygen_saturation: Integer            // 0-2 (SpO2 >92% on room air)
    total_score: Integer                  // 0-10, ≥9 for Phase I discharge
}
```

#### PADSSScore (Phase II / Home Discharge — Outpatients)

```
PADSSScore {
    score_id: UUID
    pacu_id: Reference → PACURecord
    scored_at: DateTime
    scored_by: Reference → User

    vital_signs: Integer                  // 0-2 (stable, within normal)
    ambulation: Integer                   // 0-2 (steady gait, no dizziness)
    nausea_vomiting: Integer              // 0-2 (minimal, controlled)
    pain: Integer                         // 0-2 (acceptable, controlled with oral meds)
    surgical_bleeding: Integer            // 0-2 (minimal, consistent with expected)
    total_score: Integer                  // 0-10, ≥9 for home discharge
}
```

#### WhiteSongScore (Fast-Track Bypass Assessment)

```
WhiteSongScore {
    score_id: UUID
    case_id: Reference → SurgicalCase
    scored_at: DateTime
    scored_by: Reference → User

    // Assessed in OR or immediately post-op
    consciousness: Integer                // 0-2
    physical_activity: Integer            // 0-2
    hemodynamic_stability: Integer        // 0-2
    respiratory_stability: Integer        // 0-2
    oxygen_saturation: Integer            // 0-2
    pain: Integer                         // 0-2
    emetic_symptoms: Integer              // 0-2
    total_score: Integer                  // 0-14, ≥12 with no criterion <1 → bypass Phase I
    all_criteria_above_zero: Boolean      // Must be true for bypass eligibility
}
```

#### OperativeReport (Verbale Operatorio)

```
OperativeReport {
    report_id: UUID
    case_id: Reference → SurgicalCase
    version: Integer

    // Required content (Registro Operatorio — Circolare Min. Sanità 900.2/2.7/190)
    date: Date
    or_entry_time: DateTime
    or_exit_time: DateTime
    incision_time: DateTime
    closure_time: DateTime
    pre_op_diagnosis: Text
    post_op_diagnosis: Text
    procedure_description: Text           // Detailed operative narrative
    materials_used: Text
    asa_classification: Enum
    wound_classification: Enum
    anesthesia_type: Enum
    estimated_blood_loss_ml: Integer

    // Personnel (auto-populated from CaseStaffAssignment)
    primo_operatore: Reference → User     // First surgeon — MUST sign
    additional_surgeons: [Reference → User]
    anesthetist: Reference → User
    instrumentista: Reference → User      // Scrub nurse
    circulating_nurse: Reference → User

    // Coding (derived by Regulatory Layer code-mapping subsystem from procedure narrative and findings; surgeon does not select codes manually)
    procedure_codes_icd9cm: [String]      // Current: ICD-9-CM 2007 — derived
    procedure_codes_cipi: [String]        // From Jan 2027: CIPI — derived
    coding_system: Enum (ICD9CM, CIPI, DUAL)  // Dual during 2026 transition
    drg_relevant_procedures: [String]     // Subset of derived codes that affect DRG grouping

    // Findings
    findings: Text
    complications: Text
    drains_placed: Text
    specimens_sent: Text
    implants_placed: Text

    // Sign-off
    status: Enum (DRAFT, PENDING_SIGNATURE, SIGNED, AMENDED)
    signed_by: Reference → User           // Primo operatore
    signed_at: DateTime
    signature_certificate: String         // PAdES digital signature

    // FSE — NOTE: No dedicated CDA2 template exists for Verbale Operatorio.
    // Surgical data enters FSE primarily via LDO (Lettera di Dimissione Ospedaliera)
    // CDA2 template, or as generic clinical document (PDF with CDA2 metadata).
    fse_transmission_method: Enum (VIA_LDO, GENERIC_CDA2_DOCUMENT)
    fse_transmitted: Boolean
    fse_document_id: String
    fse_transmitted_at: DateTime
}
```

#### BlockSchedule

```
BlockSchedule {
    block_id: UUID
    or_room_id: Reference → ORRoom
    day_of_week: Enum (MON, TUE, WED, THU, FRI, SAT)
    start_time: Time
    end_time: Time
    allocated_to: String                  // Surgeon, service, or department
    allocated_surgeon_id: Reference → User // If surgeon-specific
    block_type: Enum (DEDICATED, SHARED, OPEN, EMERGENCY_RESERVE)
    effective_from: Date
    effective_until: Date
    is_active: Boolean

    // Release policy
    auto_release_hours_before: Integer    // Default 72h — unused time opens to all
    utilization_threshold_percent: Integer // Below this over 2 quarters → block review
}
```

---

### Status Progression

#### Standard Surgical Case Flow

```
REQUESTED
    ↓
SCHEDULED                    [Block time assigned, resources confirmed]
    ↓
PRE_OP_CLEARED               [Days/weeks before — labs, consults, anesthesia clearance complete]
    ↓
PRE_OP_HOLDING               [Day of — patient in holding area, consent verified]
    ↓
SIGN_IN_COMPLETE             [WHO checklist phase 1 — soft gate]
    ↓
IN_OR                        [Patient in room]
    ↓
ANESTHESIA_START             [Induction begun]
    ↓
TIME_OUT_COMPLETE            [WHO checklist phase 2 — HARD GATE, blocks incision]
    ↓
IN_PROCEDURE                 [Incision made]
    ↓
CLOSING                      [Closure begun]
    ↓
SIGN_OUT_COMPLETE            [WHO checklist phase 3 — soft gate]
    ↓
PROCEDURE_COMPLETE           [Patient leaving OR]
    ↓
IN_PACU_PHASE_I              [Standard recovery — Aldrete scoring]
    ↓                        OR: FAST_TRACK_BYPASS → IN_PACU_PHASE_II (White-Song ≥12)
    ↓                        OR: DIRECT_ICU (bypasses PACU entirely)
PACU_PHASE_I_COMPLETE        [Aldrete ≥9]
    ↓
    ├─→ TRANSFERRED_TO_WARD  [Inpatients → ward via Patient Flow Layer]
    ├─→ TRANSFERRED_TO_ICU   [If condition requires]
    └─→ IN_PACU_PHASE_II     [Outpatients → continued recovery]
         ↓
         PACU_PHASE_II_COMPLETE  [PADSS ≥9, responsible adult present]
         ↓
         DISCHARGED_HOME     [Outpatients only]

CASE_CLOSED                  [All documentation complete, Verbale Operatorio signed]
```

**Emergency/Urgent fast-track:**
```
EMERGENCY_REQUESTED → EMERGENCY_APPROVED → [joins at PRE_OP_HOLDING, IN_OR, or directly
                                             depending on urgency — may skip states]
```

**Cancellation states (can occur from any pre-procedure status):**
```
Any pre-incision status → CANCELLED
    with cancellation_point: PRE_DAY | PRE_OP_DAY_OF | IN_OR_PRE_ANESTHESIA | POST_ANESTHESIA
    with reason_category and preventability tracking
```

**WHO Checklist gate enforcement:**
- **Sign In → ANESTHESIA_START:** Soft gate. System strongly prompts. Override requires documented reason and generates compliance alert. Emergency cases may bypass.
- **Time Out → IN_PROCEDURE:** HARD GATE. System blocks incision documentation until Time Out is complete. No override. No exceptions.
- **Sign Out → PROCEDURE_COMPLETE:** Soft gate. System strongly prompts. Override requires documented reason and generates compliance alert.

**Room state machine (parallel, independent):**
```
DIRTY → CLEANING → CLEAN → SETTING_UP → ROOM_READY → IN_USE → DIRTY → ...
```
Room state drives turnover tracking and OR Tracking Board display. Transitions are timestamped for turnover metrics.

---

### Eight Environments

| Environment | Purpose | Primary Users |
|---|---|---|
| **SCHEDULING** | Book cases, manage block time, resource allocation | OR Schedulers, Surgeons |
| **PRE-OP HOLDING** | Patient preparation, checklist, holding area management | Pre-op Nurses |
| **OR TRACKING BOARD** | Real-time dashboard of all ORs, patient flow, timing, room status | All OR staff, OR Manager |
| **INTRA-OP DOCUMENTATION** | WHO checklist, counts, specimens, implants, nursing notes | Circulating Nurse |
| **PACU** | Recovery documentation, Aldrete/PADSS scoring, discharge | PACU Nurses |
| **REPORTING** | Verbale Operatorio (operative report) | Surgeons |
| **ARCHIVE** | Historical cases, analytics | All authorized |
| **ADMINISTRATION** | Preference cards, block allocation, room configuration | OR Manager, Admin |

**Scheduling** features block time management (dedicated surgeon/service blocks with utilization tracking and auto-release policy), multi-resource conflict detection (room + surgeon + anesthesia + equipment + staff — automated checks, manual resolution), preference card auto-loading (when surgeon + procedure selected, system loads preferred equipment/supplies), emergency case insertion with bump policy and notification cascade, estimated duration from historical averages by surgeon + procedure combination, and add-on case management with pending list.

**Pre-op Holding** manages patient preparation with site marking verification, consent confirmation (SurgicalConsent status check), Sign In checklist (WHO phase 1), and pre-op nursing assessment. Tracks patients in holding beds with time-to-OR visibility. Displays readiness milestones: consent signed, labs cleared, anesthesia cleared, blood available, imaging available.

**OR Tracking Board** is the real-time command center for the surgical department. Auto-updating display showing: all OR rooms with current case, phase, elapsed time vs estimated duration, next scheduled case, room status (in use / cleaning / ready), staff assignments, delays with reason codes, PACU bed occupancy, and pending add-on/emergency cases. Color-coded by case phase and alert status. Room-centric layout (unlike Emergency's patient-centric Tracking Board). Includes turnover timer (time since patient out, target countdown) and estimated completion predictions.

**Intra-op Documentation** is the circulating nurse's primary workspace during surgery. Manages Time Out checklist (WHO phase 2 — hard gate), surgical counts (sponge, needle, instrument — with two-person verification at initial, additional, pre-closure, skin closure — discrepancy triggers mandatory X-ray workflow), specimen documentation (with frozen section handoff to Pathology), implant capture (barcode/RFID scanning for UDI), Sign Out checklist (WHO phase 3), staff assignment tracking (CaseStaffAssignment with in/out times), and intra-op nursing notes.

**PACU** manages post-operative recovery across two phases. Phase I: vitals q5-15 min, Modified Aldrete scoring q15 min (0-10, ≥9 for Phase I discharge), PONV monitoring, pain management, handoff documentation (SBAR structure). Phase II (outpatients): PADSS scoring (0-10, ≥9 for home discharge), responsible adult verification, voiding confirmation where required, discharge instructions, follow-up scheduling. Fast-track pathway: White-Song score ≥12 with no criterion <1 allows Phase I bypass. Census view of all PACU beds with acuity indicators.

**Reporting** is where surgeons write and sign the Verbale Operatorio. Auto-populated from case data (times, personnel from CaseStaffAssignment, procedures, specimens, implants). Surgeon adds operative narrative. Digital signature (PAdES) required from primo operatore. Same version/addendum pattern as other modules. Dual coding support during ICD-9-CM → CIPI transition (2026-2027).

**Archive** provides historical case search with OR-specific filters (surgeon, procedure type, room, date range, complications, cancellation reason). Utilization reports, first-case on-time metrics, turnover time analytics, block utilization dashboards, cancellation analysis.

**Administration** manages OR rooms (capabilities, equipment, room status configuration), block schedule allocation with release policies, preference cards (surgeon-specific equipment/supply lists per procedure), users and roles, procedure catalog, equipment inventory, and configurable WHO checklist extensions.

---

### Integration Architecture

```
+-------------------------------------------------------+
|              AIRIS OPERATING ROOM                      |
|                                                        |
|  Scheduling → Pre-op → Intra-op → PACU → Reporting    |
|                                                        |
+---------------------------+----------------------------+
                            |
    +-----------+-----------+-----------+-----------+
    |           |           |           |           |
+-------+  +--------+  +-------+  +--------+  +-------+
| AIMS  |  | Patho- |  |  Lab  |  |Pharmacy|  | CSSD  |
|       |  | logy   |  |       |  |        |  |       |
|Anesth.|  |Specimen|  |Pre-op |  |Antibiox|  |Instr. |
|Record |  |Frozen  |  |Labs   |  |Control.|  |Sets   |
|Vitals |  |Section |  |Blood  |  |Subst.  |  |Track  |
+-------+  +--------+  +-------+  +--------+  +-------+
```

| System | Protocol | Direction | Data Exchange |
|---|---|---|---|
| **AIMS** | HL7 v2.x / FHIR | Bidirectional | Patient/timing/ASA out; anesthesia summary, timestamps (induction/extubation), clearance status in |
| **Pathology** | Shared database | Bidirectional | Specimen orders out, frozen section results in |
| **Laboratory** | Shared database | Bidirectional | Pre-op lab orders out, blood bank (T&S, crossmatch) |
| **Radiology** | Shared database | Unidirectional | Pre-op images reference, intraop imaging orders |
| **Pharmacy** | HL7 v2.x | Bidirectional | Antibiotic prophylaxis, controlled substances |
| **CSSD** | HL7 / API | Bidirectional | Instrument set requests out, availability/tracking in |
| **Materials Mgmt** | API | Bidirectional | Case cart preparation, implant inventory |
| **Patient Flow Layer** | Shared database | Bidirectional | Pre-op bed, PACU bed, post-op ward/ICU transfer |
| **FSE 2.0 Gateway** | CDA2 REST | Outbound | Via LDO template or generic CDA2 document |
| **Regional SDO System** | XML upload | Outbound | Procedure codes (ICD-9-CM / CIPI) for SDO |

**Data AIRIS receives from AIMS** (consumed and displayed, not owned): ASA classification, anesthesia type, anesthesia timestamps (induction, intubation, extubation, anesthesia end), pre-anesthesia clearance status, anesthesia summary (viewable from AIRIS for post-op review). Source of truth rule: whichever system's clinician documents the data owns it.

---

### Permissions Structure

| Permission | Admin | OR Manager | Surgeon | Circulating RN | Scrub Tech | PACU RN | Scheduler |
|---|---|---|---|---|---|---|---|
| View schedule | ✓ | ✓ | own | ✓ | ✓ | - | ✓ |
| Create/modify cases | ✓ | ✓ | own | - | - | - | ✓ |
| Manage block time | ✓ | ✓ | - | - | - | - | - |
| Pre-op documentation | - | - | - | ✓ | - | - | - |
| Complete Sign In | - | - | - | ✓ | - | - | - |
| Complete Time Out | - | - | ✓ | ✓ | - | - | - |
| Document counts | - | - | - | ✓ | verify | - | - |
| Document specimens | - | - | - | ✓ | - | - | - |
| Document implants | - | - | - | ✓ | - | - | - |
| Complete Sign Out | - | - | ✓ | ✓ | - | - | - |
| Override checklist (soft gates) | - | ✓ | ✓ | ✓ | - | - | - |
| PACU Phase I documentation | - | - | - | - | - | ✓ | - |
| PACU Phase II documentation | - | - | - | - | - | ✓ | - |
| Aldrete / PADSS scoring | - | - | - | - | - | ✓ | - |
| PACU discharge | - | ✓ | ✓ | - | - | ✓ | - |
| Write operative report | - | - | ✓ | - | - | - | - |
| Sign operative report | - | - | ✓ | - | - | - | - |
| Manage preference cards | ✓ | ✓ | own | - | - | - | - |
| Cancel case | ✓ | ✓ | ✓ | - | - | - | ✓ |
| OR administration | ✓ | ✓ | - | - | - | - | - |

---

### Interaction Layer Examples

```
Scheduling:
"Book Dr. Bianchi for a mastectomy next Tuesday in OR-1"
-> Opens booking with surgeon, procedure, date, room pre-filled

"Show me Dr. Rossi's block utilization"
-> Displays utilization report

"Add emergency appendectomy, OR-3, now"
-> Creates emergent case, notifies affected teams

"Release Dr. Verdi's unused block time for Thursday"
-> Triggers block release, opens time to all surgeons

Pre-op:
"Patient in H-2 is ready for OR"
-> Updates status to PRE_OP_HOLDING

"Complete sign in for Rossi"
-> Opens Sign In checklist

"Is consent signed for case ORG-2026-00145?"
-> Displays SurgicalConsent status

Intra-op:
"Complete time out"
-> Opens Time Out checklist with team verification

"Record sponge count, all correct"
-> Documents count with two-person verification

"Send specimen to pathology, frozen section"
-> Creates specimen, sends to Pathology with frozen section flag

"Scan implant"
-> Activates barcode/RFID capture for UDI

"Dr. Neri relieved Dr. Bianchi at 14:30"
-> Updates CaseStaffAssignment with relief and timestamps

PACU:
"Aldrete score for bed P-3"
-> Opens Modified Aldrete scoring interface

"PADSS score for P-1"
-> Opens PADSS scoring for outpatient Phase II discharge

"Discharge P-1 to surgical ward"
-> Triggers transfer workflow via Patient Flow Layer

"P-2 is fast-track eligible"
-> Opens White-Song assessment

Reporting:
"Open operative report for case ORG-2026-00145"
-> Opens Verbale Operatorio with auto-populated data from case and CaseStaffAssignment

"Sign operative report"
-> Applies PAdES signature, finalizes, triggers FSE transmission
```

---

### Compliance Requirements (Italian)

| Requirement | Implementation |
|---|---|
| **Registro Operatorio / Verbale Operatorio** | Part of cartella clinica per Circolare Min. Sanità 900.2/2.7/190 (1996). Mandatory content: dates, times (entry/exit/incision/closure), patient, pre-op and post-op diagnoses, procedure description, materials, ASA/wound classification, anesthesia type, all team names, procedure codes, report number. Primo operatore must sign. **Retention: unlimited** (conservazione illimitata) as part of the medical record. |
| **FSE 2.0** | DM 7 settembre 2023 (updated DM 30 dicembre 2024). PAdES signature required. Phase III deadline: 31 March 2026. **No dedicated CDA2 template exists for the Verbale Operatorio** — surgical data enters FSE via LDO (Lettera di Dimissione Ospedaliera) CDA2 template or as generic clinical document with CDA2 metadata. |
| **Procedure Coding** | Currently ICD-9-CM 2007 (Italian version, codes 01-86 by anatomical site). Max 6 procedures on SDO. **Transition to CIPI (Classificazione Italiana Procedure e Interventi)** mandatory from 1 January 2027 per Decreto 23 ottobre 2025. 2026 is "Gamma" experimental year — AIRIS must support dual coding during transition. CIPI will have ~2,500 procedure codes. |
| **Informed Consent (Legge 219/2017)** | Consent must be documented in written form, inserted in cartella clinica AND FSE. Must include: diagnosis, prognosis, benefits, risks, alternatives, consequences of refusal. Electronic consent valid with FEA or higher. **Consent for treatment and consent for data processing (GDPR) must remain legally separate.** |
| **EU MDR 2017/745 UDI** | Unique Device Identification for all implants. Hospital must record and store UDIs for Class III implantable devices. 15-year retention for manufacturer documentation (Class III/IIb). EUDAMED mandatory from 28 May 2026. |
| **WHO Surgical Safety Checklist** | Required by Italian Ministry of Health (Manuale Sicurezza Sala Operatoria 2009, Obiettivo 14). Three-phase checklist. Time Out is hard gate in AIRIS; Sign In and Sign Out are soft gates with override and compliance tracking. |
| **Surgical count documentation** | Mandatory documentation of sponge, needle, instrument counts at defined intervals (initial, additional, pre-closure, skin closure) with two-person verification. Discrepancy triggers mandatory X-ray before wound closure. |
| **SNICh2 (SSI Surveillance)** | ISS-coordinated national surveillance since 2019. Required reporting: intervention category, wound classification, ASA class, prosthetic implant presence, duration, antibiotic prophylaxis, SSI occurrence/type. AIRIS captures all required data fields for SNICh2 extraction. |
| **Blood Product Traceability** | D.Lgs. 261/2007 requires 30-year traceability for blood products administered during surgery. Tracked via Laboratory Module blood bank integration. |
| **Radiation Exposure** | D.Lgs. 101/2020 requires documentation of radiation exposure from intraoperative imaging (fluoroscopy, C-arm). Captured via Radiology Module integration for intraop imaging orders. |

---

### Scope and Boundaries

**Explicitly in scope:**
- OR scheduling with block management, release policies, conflict detection
- Complete perioperative case tracking (request through case closure)
- WHO Surgical Safety Checklist enforcement (configurable, with hard/soft gate model)
- Perioperative nursing documentation (pre-op, intra-op, PACU)
- Surgical consent tracking per Legge 219/2017
- Surgical counts with discrepancy workflow
- Specimen documentation and Pathology handoff (including frozen sections)
- Implant/UDI tracking per EU MDR 2017/745
- PACU documentation with three scoring systems (Aldrete, PADSS, White-Song)
- Verbale Operatorio generation with dual-coding support (ICD-9-CM → CIPI transition)
- Room turnover tracking
- Staff assignment tracking with individual timestamps
- OR utilization analytics and quality metrics

**Explicitly out of scope:**
- Anesthesia record (AIMS territory — continuous vitals, drug timing, ventilator settings)
- Medical device data capture from OR equipment
- Instrument sterilization workflow (CSSD system — integration only)
- Robotic surgery console control
- Detailed anesthesia billing
- Medication management beyond antibiotic prophylaxis tracking
- Case costing / financial charge capture (future financial module)
- Surgeon credentialing (administrative system)
- Patient experience / family tracking (future enhancement)

---

### Quality Metrics

| Metric | Target | Source |
|---|---|---|
| First-case on-time start | ≥85% | Scheduled vs actual start time |
| Turnover time | ≤25-30 min (same surgeon), ≤45 min (different) | RoomTurnover timestamps |
| OR utilization (prime time) | 75-85% | Case time vs available block time |
| Block utilization | ≥75% (threshold for block retention) | Cases scheduled vs block time allocated |
| WHO checklist completion | 100% Time Out (hard gate), ≥95% Sign In/Sign Out | Checklist records + override rates |
| Cancelled cases (day-of) | <1% | CaseCancellation with preventability tracking |
| Surgical site infection rate | Track per procedure type | SNICh2 surveillance data |
| Frozen section turnaround | ≤20 minutes | Specimen sent → result communicated |
| Unplanned return to OR | Track (≤2-3%) | Within 72 hours |
| Surgical count discrepancy rate | Track (target: decreasing trend) | Discrepancies per total counts |
| PACU hold time | Track | Cases where PACU unavailability delayed OR schedule |
| Cancellation reason analysis | Track by category | Preventable vs non-preventable trends |

---

### Glossary Additions for Operating Room

**AIMS:** Anesthesia Information Management System — specialized system for anesthesia documentation (external integration, not AIRIS scope)

**Aldrete Score:** Modified Aldrete (1995) — 10-point scoring system for PACU Phase I discharge readiness (activity, respiration, circulation, consciousness, SpO2; ≥9 required)

**ASA Classification:** American Society of Anesthesiologists physical status classification (I-VI, with "E" emergency modifier)

**Block Time:** Dedicated OR time allocated to specific surgeon or service, with release policy for unused time

**CIPI:** Classificazione Italiana Procedure e Interventi — new Italian procedure coding system replacing ICD-9-CM Volume 3 from January 2027

**Circulating Nurse:** RN who manages OR environment, documentation, and patient safety during surgery

**CSSD:** Central Sterile Supply Department — instrument sterilization and set management

**Fast-Track:** PACU Phase I bypass pathway for eligible patients (White-Song score ≥12)

**PADSS:** Post-Anesthetic Discharge Scoring System — 10-point scoring for outpatient home discharge from PACU Phase II (vital signs, ambulation, nausea/vomiting, pain, bleeding; ≥9 required)

**PONV:** Post-Operative Nausea and Vomiting — assessed via Apfel risk score (0-4)

**Preference Card:** Surgeon-specific list of equipment, supplies, and setup preferences per procedure type

**Primo Operatore:** First surgeon/operator — legally required to sign the Verbale Operatorio

**Registro Operatorio:** Italian operative register — legally part of cartella clinica, unlimited retention

**Scrub Tech/Nurse:** Sterile team member who handles instruments and assists surgeon directly

**Sign In:** First WHO checklist phase — before anesthesia induction (soft gate in AIRIS)

**Sign Out:** Third WHO checklist phase — before patient leaves OR (soft gate in AIRIS)

**SIS:** Surgical Information System — software managing perioperative workflow (what AIRIS OR module replaces)

**SNICh2:** Sistema Nazionale Sorveglianza Infezioni Sito Chirurgico — Italian national SSI surveillance

**Surgical Count:** Systematic counting of sponges, needles, instruments to prevent retained items — at initial, additional, pre-closure, and skin closure intervals

**Time Out:** Second WHO checklist phase — immediately before incision, all activity stops (HARD GATE in AIRIS — no override)

**Turnover Time:** Time between one patient leaving OR and next patient entering — tracked via RoomTurnover entity

**UDI:** Unique Device Identification — standardized system for identifying medical devices/implants (EU MDR 2017/745)

**Verbale Operatorio:** Italian operative report with legally required elements — part of Registro Operatorio

**White-Song Score:** 14-point fast-track scoring system — ≥12 with no criterion <1 allows PACU Phase I bypass

**WHO Checklist:** World Health Organization Surgical Safety Checklist — three-phase safety protocol (Sign In, Time Out, Sign Out)

**Wound Classification:** Classification of surgical wounds (Clean I through Dirty/Infected IV)

---

---

## DIALYSIS MODULE (Nefrologia Dialitica)

### Module Overview

The Dialysis Module manages chronic dialysis patients from prescription through recurring treatments, tracking adequacy and outcomes over years. It serves as the Dialysis Information System (DIS) component.

**AIRIS Position:** DIS-equivalent for dialysis
- **Owns:** Patient enrollment, prescriptions, recurring scheduling, treatment documentation, vascular access tracking, Kt/V calculation, quality metrics
- **Integrates with:** Dialysis machines, Laboratory, Pharmacy, Radiology, Vascular Surgery
- **Does not own:** Real-time machine control, home PD cycler platforms, remote monitoring systems

**Fundamental Characteristics - What Makes Dialysis Different:**

| Aspect | Typical Module | Dialysis |
|---|---|---|
| Patient relationship | Episode (visit, leave) | Chronic (years, same patient 156x/year) |
| Scheduling | Appointments | Recurring shifts (MWF or TuThSa) |
| Data pattern | Per-encounter | Longitudinal trends over months/years |
| Quality focus | Per-procedure | Outcome metrics (Kt/V, access, infections) |
| Primary entity | Single (Order, Exam, Case) | Dual (Patient Program + Treatment Session) |

**The DIS/Machine Parallel:**

| Radiology | Dialysis |
|---|---|
| RIS | DIS (AIRIS) |
| PACS | Machine Data Repository |
| Modality (CT, MRI) | Dialysis Machine |
| DICOM images | Treatment parameters (IEEE 11073) |
| Radiology report | Treatment summary |

---

### Types of Dialysis

| Type | Description | IT Implications |
|---|---|---|
| **Hemodialysis (HD)** | Blood filtered through machine, 3-4 hrs, 3x/week | Real-time machine data, in-center scheduling |
| **Peritoneal Dialysis (PD)** | Fluid exchanges via peritoneal cavity | Home-based, cycler downloads, supply management |
| **Home HD** | Hemodialysis at home | Remote monitoring, telehealth integration |
| **Acute Dialysis** | Hospital inpatient, ICU | Integration with inpatient workflows, CRRT |

Primary focus: In-center Hemodialysis (most common, ~90% of patients).

---

### Core Data Structures

#### Patient Dialysis Program (Longitudinal Record)

```
DialysisProgram {
 program_id: UUID
 patient_id: Reference -> Patient
 
 // Enrollment
 status: ProgramStatus
 esrd_date: Date // End-stage renal disease onset
 first_dialysis_date: Date
 enrolled_at: DateTime
 
 // Modality
 modality: DialysisModality // HD, PD, HOME_HD
 
 // Assignment
 assigned_shift: Shift // MWF_AM, MWF_PM, TuThSa_AM, etc.
 assigned_chair: Reference -> Chair
 primary_nephrologist: Reference -> User
 
 // Current Prescription
 current_prescription: Reference -> DialysisPrescription
 
 // Vascular Access
 current_access: Reference -> VascularAccess
 access_history: [Reference -> VascularAccess]
 
 // Targets
 dry_weight_kg: Decimal
 target_ktv: Decimal // Usually >= 1.2
 
 // Transplant
 transplant_waitlist: Boolean
 waitlist_date: Date
 
 // Outcome
 outcome: ProgramOutcome // ACTIVE, TRANSPLANTED, TRANSFERRED, DECEASED, PALLIATIVE
 outcome_date: Date
}

ProgramStatus {
 REFERRED
 EVALUATING
 ACCESS_MATURING
 ACTIVE
 ON_HOLD
 DISCHARGED
}

DialysisModality {
 HEMODIALYSIS
 PERITONEAL_DIALYSIS_CAPD
 PERITONEAL_DIALYSIS_APD
 HOME_HEMODIALYSIS
}
```

#### Dialysis Prescription

```
DialysisPrescription {
 prescription_id: UUID
 program_id: Reference -> DialysisProgram
 
 // Treatment Parameters
 frequency_per_week: Integer // Usually 3
 duration_minutes: Integer // Usually 180-240
 
 // Machine Settings
 blood_flow_rate_ml_min: Integer // Qb: 350-450
 dialysate_flow_rate_ml_min: Integer // Qd: 500-800
 
 // Dialysate Composition
 dialysate_potassium_meq_l: Decimal // 2-4
 dialysate_calcium_meq_l: Decimal // 2.5-3.5
 dialysate_sodium_meq_l: Integer // 138-145
 dialysate_bicarbonate_meq_l: Integer // 30-40
 dialysate_temp_celsius: Decimal // 35-37
 
 // Dialyzer
 dialyzer_type: String // Manufacturer, model
 dialyzer_surface_area_m2: Decimal
 
 // Anticoagulation
 heparin_bolus_units: Integer // 1000-2000
 heparin_maintenance_units_hr: Integer  // 500-1500
 
 // Ultrafiltration
 uf_max_rate_ml_hr: Integer
 sodium_profiling: Boolean
 uf_profiling: Boolean
 
 // Ordering
 prescribed_by: Reference -> User
 prescribed_at: DateTime
 effective_from: Date
 effective_until: Date
 
 is_current: Boolean
}
```

#### Treatment Session

```
TreatmentSession {
 session_id: UUID
 program_id: Reference -> DialysisProgram
 prescription_id: Reference -> DialysisPrescription
 
 // Scheduling
 scheduled_date: Date
 scheduled_shift: Shift
 chair_id: Reference -> Chair
 
 // Status
 status: SessionStatus
 
 // Pre-Treatment
 pre_weight_kg: Decimal
 pre_bp_systolic: Integer
 pre_bp_diastolic: Integer
 pre_pulse: Integer
 pre_temp_celsius: Decimal
 
 interdialytic_weight_gain_kg: Decimal  // Calculated
 target_uf_ml: Integer // Calculated from weight gain
 
 access_assessed: Boolean
 access_notes: String
 
 // Treatment
 actual_start_time: DateTime
 actual_end_time: DateTime
 actual_duration_minutes: Integer
 
 machine_id: Reference -> Machine
 
 // Machine Data (from integration or manual)
 actual_blood_flow_avg: Integer
 actual_dialysate_flow: Integer
 actual_uf_removed_ml: Integer
 
 arterial_pressure_avg: Integer
 venous_pressure_avg: Integer
 
 // Intradialytic Monitoring
 vitals: [IntradialyticVitals] // Every 30 min
 
 // Complications
 complications: [Complication]
 
 // Medications Given
 medications: [MedicationAdmin] // EPO, iron, heparin
 
 // Post-Treatment
 post_weight_kg: Decimal
 post_bp_systolic: Integer
 post_bp_diastolic: Integer
 post_pulse: Integer
 
 weight_removed_kg: Decimal // Calculated
 
 // Adequacy (calculated or from machine)
 ktv_delivered: Decimal
 urr_percent: Decimal // Urea Reduction Ratio
 
 // Documentation
 nurse_notes: Text
 documented_by: Reference -> User
 
 // Sign-off
 reviewed_by: Reference -> User // Nephrologist monthly review
 reviewed_at: DateTime
}

SessionStatus {
 SCHEDULED
 CHECKED_IN
 PRE_TREATMENT
 ON_DIALYSIS
 POST_TREATMENT
 COMPLETED
 MISSED
 SHORTENED
 CANCELLED
}
```

#### Vascular Access

```
VascularAccess {
 access_id: UUID
 program_id: Reference -> DialysisProgram
 
 // Type
 access_type: AccessType // AVF, AVG, CVC
 
 // Location
 site: String // Left forearm, right upper arm, etc.
 laterality: Enum (LEFT, RIGHT)
 
 // Creation
 created_date: Date
 created_by: String // Surgeon name
 maturation_date: Date // For AVF/AVG
 
 // Status
 status: AccessStatus
 first_use_date: Date
 
 // Surveillance
 last_flow_measurement_ml_min: Integer
 last_flow_date: Date
 
 // Complications
 complications: [AccessComplication]
 interventions: [AccessIntervention]
 
 // Retirement
 retired_date: Date
 retired_reason: String
}

AccessType {
 AVF // Arteriovenous Fistula (preferred)
 AVG // Arteriovenous Graft
 CVC_TUNNELED // Tunneled Central Venous Catheter
 CVC_TEMPORARY // Temporary Catheter
}

AccessStatus {
 MATURING
 IN_USE
 FAILING
 CLOTTED
 INFECTED
 RETIRED
}
```

---

### Status Progressions

#### Treatment Session Flow

```
SCHEDULED
 |
CHECKED_IN [Patient arrived]
 |
PRE_TREATMENT [Weight, vitals, access check]
 |
ON_DIALYSIS [Machine running]
 | [Vitals q30min, complications, meds]
POST_TREATMENT [Machine stopped, post-vitals]
 |
COMPLETED [Documented, patient discharged]
```

**Exception paths:**
- MISSED: Patient no-show
- SHORTENED: Ended early (complication, patient request)
- CANCELLED: Rescheduled

#### Patient Program Flow

```
REFERRED
 |
EVALUATING [Pre-dialysis workup]
 |
ACCESS_MATURING [AVF created, waiting 6-8 weeks]
 |
ACTIVE [Receiving regular dialysis]
 |
 +-> TRANSPLANTED
 +-> TRANSFERRED
 +-> PALLIATIVE
 +-> DECEASED
```

---

### Scheduling Model

Dialysis uses **recurring shift-based scheduling**, not individual appointments:

```
Shifts:
  MWF_AM (Mon/Wed/Fri morning)
  MWF_PM (Mon/Wed/Fri afternoon)
  MWF_EVE (Mon/Wed/Fri evening)
  TuThSa_AM (Tue/Thu/Sat morning)
  TuThSa_PM (Tue/Thu/Sat afternoon)
  TuThSa_EVE(Tue/Thu/Sat evening)

Resources per shift:
  - Chairs/Stations (each can do 2-3 patients/day)
  - Nurses (ratio ~1:4)
  - Machines
  - Supplies
```

**Key difference from other modules:** Patient is assigned to a shift/chair combination and keeps it for months or years. Schedule changes affect the whole facility.

---

### Adequacy Measurement (Kt/V)

**Kt/V Formula:** Measures dialysis dose
- K = dialyzer clearance (mL/min)
- t = treatment time (min)
- V = volume of distribution of urea (mL)

**Target:** spKt/V >= 1.2 per session (KDOQI guidelines)

**Calculation methods:**
1. **Lab-based:** Pre/post BUN with Daugirdas formula
2. **Machine-based:** Online Clearance Monitoring (real-time)

**URR (Urea Reduction Ratio):** Simpler metric, target >= 65%

```
URR = (Pre-BUN - Post-BUN) / Pre-BUN x 100
```

---

### Environments

| Environment | Purpose |
|---|---|
| **Schedule Board** | View shifts, chairs, today's patients, transportation |
| **Check-in** | Patient arrival, pre-treatment assessment |
| **Treatment Monitor** | Active treatments, real-time status, vitals, alerts |
| **Post-Treatment** | Complete session, post-vitals, complications |
| **Patient Chart** | Longitudinal view - program, access, labs, trends, Kt/V history |
| **Prescription** | View/edit dialysis prescription |
| **Access Management** | Vascular access registry, surveillance, interventions |
| **Quality Dashboard** | Kt/V trends, adequacy rates, infection rates, access outcomes |
| **Administration** | Chairs, shifts, staff assignment, machine inventory |

---

### Integration Architecture

```
 +---+
 |  AIRIS DIALYSIS  |
 | |
 | Schedule, Rx, |
 | Documentation, |
 | Kt/V, Access |
 +---+---+
 |
 +---+---+---+---+
 | | | | |
 v v v v v
  +---+ +---+ +---+ +---+ +---+
  |Dialysis| |  Lab | |Pharmacy| |Radiology| |Vascular|
  |Machines| | | | | | | |Surgery |
  +---+ +---+ +---+ +---+ +---+
  
  Treatment  Pre/post EPO, Iron  Access Access
  data BUN, labs  Heparin imaging creation
```

**Integration details:**

| System | Direction | Data |
|---|---|---|
| **Dialysis Machines** | Bidirectional | Rx parameters out, treatment data in (HL7/IEEE 11073) |
| **Laboratory** | Bidirectional | Orders out, results in (esp. pre/post BUN for Kt/V) |
| **Pharmacy** | Bidirectional | ESA, IV iron, heparin, vitamin D orders and administration |
| **Radiology** | Orders out | Access imaging (duplex, fistulogram) |
| **Vascular Surgery** | Referral | Access creation/revision coordination |
| **Inpatient** | Bidirectional | Acute dialysis for admitted patients |

---

### Compliance Requirements (Italian)

| Requirement | Implementation |
|---|---|
| FSE 2.0 | CDA2 treatment records, within 5 days |
| RIDT | Registro Italiano Dialisi e Trapianto - annual export |
| SIN Guidelines | Societa Italiana di Nefrologia quality indicators |
| GDPR | Consent for FSE, audit trails |

**RIDT Registry Data:**
- Patient demographics (anonymized)
- ESRD date, first dialysis date
- Primary renal diagnosis (ERA-EDTA codes)
- Treatment modality
- Access type
- Transplant status
- Outcomes

---

### Permissions Structure

| Permission | Admin | Nephrologist | Nurse | PCT | Scheduler | Dietitian |
|---|---|---|---|---|---|---|
| View schedule | Yes | Yes | Yes | Yes | Yes | Yes |
| Modify schedule | Yes | - | - | - | Yes | - |
| Write prescription | - | Yes | - | - | - | - |
| Pre-treatment doc | - | Yes | Yes | Yes | - | - |
| Intradialytic doc | - | Yes | Yes | Yes | - | - |
| Post-treatment doc | - | Yes | Yes | Yes | - | - |
| Administer meds | - | Yes | Yes | - | - | - |
| Document complications | - | Yes | Yes | Yes | - | - |
| Monthly review | - | Yes | - | - | - | - |
| Access management | - | Yes | Yes | - | - | - |
| Quality dashboard | Yes | Yes | Yes | - | - | - |
| Nutritional assessment | - | - | - | - | - | Yes |

---

### Interaction Layer Examples

```
Scheduling:
"Show me today's MWF morning shift"
-> Displays patients scheduled for current shift

"Move Rossi to chair 5"
-> Updates chair assignment

"Rossi missed today, reschedule for Saturday"
-> Marks session as MISSED, creates Saturday session

Treatment:
"Check in Rossi, pre-weight 78.5"
-> Starts pre-treatment, records weight

"Start dialysis, chair 3"
-> Changes status to ON_DIALYSIS, records start time

"Record vitals: BP 130/80, pulse 72"
-> Adds intradialytic vitals entry

"Rossi had hypotension, gave 250ml saline"
-> Documents complication and intervention

"End treatment, post-weight 76.2"
-> Completes session, calculates UF achieved

Clinical:
"Show Rossi's Kt/V trend"
-> Displays adequacy graph over past 3 months

"Update dry weight to 76 kg"
-> Updates target in patient program

"Rossi's fistula flow is declining, order duplex"
-> Creates radiology order for access imaging

"Change prescription to Qb 400"
-> Opens prescription modification
```

---

### Quality Metrics

| Metric | Target | Source |
|---|---|---|
| Kt/V adequacy | >= 1.2 (or URR >= 65%) | Lab or machine |
| AVF/AVG rate | >= 65% of patients | Access registry |
| Catheter rate | < 15% | Access registry |
| Catheter infection rate | < 0.5/1000 catheter-days | Complication tracking |
| Hospitalization rate | Track | Integration with inpatient |
| Missed treatment rate | < 3% | Session status |

---

### Glossary Additions for Dialysis

**AVF:** Arteriovenous Fistula - surgical connection between artery and vein, preferred dialysis access

**AVG:** Arteriovenous Graft - synthetic tube connecting artery to vein

**CVC:** Central Venous Catheter - temporary or tunneled catheter for dialysis access

**Dry Weight:** Target post-dialysis weight where patient is normotensive without fluid overload

**ESRD:** End-Stage Renal Disease - kidney failure requiring dialysis or transplant

**Kt/V:** Dialysis adequacy measure (clearance x time / volume)

**Qb:** Blood flow rate through dialysis machine (mL/min)

**Qd:** Dialysate flow rate (mL/min)

**RIDT:** Registro Italiano Dialisi e Trapianto - Italian dialysis registry

**Shift:** Recurring schedule pattern (MWF or TuThSa, AM/PM/EVE)

**SIN:** Societa Italiana di Nefrologia - Italian nephrology society

**UF:** Ultrafiltration - fluid removal during dialysis

**URR:** Urea Reduction Ratio - simple adequacy metric

---

---

## CARE UNIT MODULE (MODULO DEGENZA) - COMPLETE DESIGN

### Module Overview

**Purpose:** Manage complete inpatient ward workflow from admission through discharge, including daily clinical care, nursing documentation, physician orders, and regulatory compliance with Italian requirements (SDO, LDO, FSE 2.0).

**Core Principle:** Episode-driven workflow where the Encounter (Ricovero) is the primary entity spanning days to weeks, unlike service modules where Orders represent single events. Care Unit is an order ORIGINATOR to other departments, not an order receiver.

**AIRIS Position:** Inpatient ward information system managing the patient's hospital stay. Integrates with service modules (Laboratory, Radiology, Cardiology) by creating orders and receiving results through shared database.

**Ward Types Supported:** Single module with configurable ward type selected at department creation:
- Medical (Medicina) - Standard workflows
- Surgical (Chirurgia) - WHO checklist, NPO, drains, VTE
- Pediatric (Pediatria) - PEWS, age-specific parameters, weight-based dosing
- Psychiatric (Psichiatria/SPDC) - TSO/ASO, observation levels, restraints
- Rehabilitation (Riabilitazione) - PRI, FIM/Barthel, therapy tracking
- Maternity (Ostetricia) - Partogram, mother-baby linking, CedAP

**Explicitly Out of Scope:** ICU/Critical Care (fundamentally different architecture requiring real-time device streaming and minute-by-minute documentation — see ICU Module below).

**What Makes Care Unit Different from Service Modules:**

| Aspect | Service Modules | Care Unit Module |
|--------|-----------------|------------------|
| Primary entity | Order (single event) | Encounter (multi-day episode) |
| Time scope | Hours | Days to weeks |
| Documentation rhythm | Per procedure | Continuous (shifts) |
| Main output | Report (exam result) | SDO + LDO (administrative + clinical) |
| Scheduling | Appointment-based | Bed-based (no appointments) |
| Relationship to orders | RECEIVES orders | CREATES orders for other modules |
| Patient presence | Brief visit | Extended stay |
| Staff assignment | Per procedure | Per shift |

---

### Seven Environments

| Environment | Purpose | Primary Users |
|-------------|---------|---------------|
| **PATIENT LIST** | Active patients, assignments, key indicators | All clinical staff |
| **CENSUS** | Real-time bed status, occupancy, ADT operations | Charge nurses, bed management |
| **CLINICAL** | Patient chart: notes, orders, flowsheets, MAR | Physicians, nurses |
| **HANDOFF** | Shift change documentation and review | Nurses |
| **DISCHARGE** | Discharge workflow, SDO/LDO generation | Physicians, case managers |
| **ARCHIVE** | Historical encounters, search | All authorized |
| **ADMINISTRATION** | Ward config, beds, users, templates | Module admins |

**Plus:** My Preferences (personal customization)

---

### Core Data Structures

#### Hospital-Wide Infrastructure (from Patient Flow Layer — CORE Section 15)

The following data structures are defined in the Patient Flow Layer and consumed by Care Unit:
- **Encounter (Ricovero)** — full lifecycle from pre-admission through discharge, with sub-status for off-ward tracking
- **Location Hierarchy** — Facility → Building → Floor → Ward → Room → Bed
- **BedStatus** — full state machine (10 states including cleaning cascade, surge beds, reservation timeouts)
- **LocationHistory** — transfer tracking across all wards
- **BedRequest** — admission/transfer bed requests from all sources
- **TransportRequest** — patient movement dispatch
- **TransitionHandoff** — auto-generated inter-department clinical summaries

Care Unit is the primary clinical consumer of this infrastructure. The Census environment provides a ward-filtered view of hospital-wide bed data.

#### Clinical Data Structures (owned by Care Unit)

#### ClinicalNote

```
note_id, encounter_id
note_type (ADMISSION_HP | PROGRESS_NOTE | PROCEDURE_NOTE | CONSULT_NOTE | 
           DISCHARGE_SUMMARY | NURSING_ADMISSION | NURSING_ASSESSMENT | 
           NURSING_PROGRESS | THERAPY_NOTE | SOCIAL_WORK_NOTE | etc.)
note_datetime, author_id, author_role
title, content_structured (JSON), content_text
status (DRAFT | PENDING_COSIGN | SIGNED | AMENDED)
signed_at, signed_by_id, cosigner_id, cosigned_at
```

#### Order (Outbound to Service Modules)

```
order_id, encounter_id, patient_id
order_type (LAB | RADIOLOGY | CARDIOLOGY | CONSULT | PHARMACY | DIET | ACTIVITY | NURSING)
order_description
target_module (LABORATORY | RADIOLOGY | CARDIOLOGY | null)
target_module_order_id (FK -> target module's order table)
order_datetime, ordered_by_id, priority (1-5)
frequency (ONCE | DAILY | BID | TID | QID | Q4H | Q6H | Q8H | PRN | CONTINUOUS)
start_datetime, end_datetime
status (DRAFT | PENDING | ACTIVE | IN_PROGRESS | COMPLETED | RESULTED | CANCELLED | DISCONTINUED)
result_available, result_datetime, result_reviewed_by_id
```

#### VitalSigns

```
vitals_id, encounter_id, recorded_at, recorded_by_id, source
temperature_celsius, temperature_site
heart_rate_bpm, heart_rhythm
respiratory_rate
blood_pressure_systolic, blood_pressure_diastolic, bp_position, bp_site
oxygen_saturation_percent, oxygen_delivery, oxygen_flow_lpm
pain_score, pain_scale_used, pain_location
weight_kg, height_cm, bmi
avpu, gcs_total, gcs_eye, gcs_verbal, gcs_motor
pews_score (calculated, for pediatric)
notes
```

#### IntakeOutput

```
io_id, encounter_id, recorded_at, recorded_by_id, shift
io_type (INTAKE | OUTPUT)
category (ORAL_FLUIDS | IV_FLUIDS | URINE | STOOL | DRAIN_OUTPUT | etc.)
amount_ml, route, source_description
shift_intake_total_ml, shift_output_total_ml (calculated)
daily_intake_total_ml, daily_output_total_ml, daily_net_ml (calculated)
```

#### MedicationAdministration (MAR)

```
admin_id, encounter_id, order_id
medication_name, medication_code, dose, dose_unit, route, frequency
scheduled_datetime, scheduled_by_id
status (SCHEDULED | DUE | OVERDUE | GIVEN | HELD | REFUSED | NOT_GIVEN | CANCELLED)
administered_datetime, administered_by_id, administered_dose
patient_scanned, medication_scanned (BCMA)
is_prn, prn_indication, prn_effectiveness
not_given_reason, not_given_notes
witness_required, witness_id (for controlled substances)
```

#### NursingAssessment

```
assessment_id, encounter_id
assessment_type (ADMISSION | SHIFT | FOCUSED | REASSESSMENT)
assessed_at, assessed_by_id
neurological, cardiovascular, respiratory, gastrointestinal, 
genitourinary, skin, musculoskeletal, psychosocial, pain (JSON for each system)
braden_score, morse_fall_score, fall_risk_level
iv_sites, central_lines, drains, tubes (JSON arrays)
notes, signed_at
```

#### CarePlan (PAI)

```
care_plan_id, encounter_id, created_at, created_by_id
status (ACTIVE | RESOLVED | DISCONTINUED)
problem_statement, problem_type, priority, onset_date
goals (JSON array: goal_text, target_date, status, outcome)
interventions (JSON array: intervention_text, frequency, responsible_role)
evaluations (JSON array: date, evaluator_id, evaluation_text, goal_progress)
resolved_date, resolution_notes
```

#### Handoff

```
handoff_id, encounter_id
handoff_type (SHIFT | TRANSFER | PROCEDURE | DISCHARGE)
handoff_datetime, from_user_id, to_user_id, shift_from, shift_to
situation, background, assessment, recommendation (SBAR/I-PASS)
current_vitals_snapshot, active_orders_snapshot, pending_results, recent_meds (JSON)
code_status, isolation, fall_risk
acknowledged_at, acknowledged_by_id, annotations
```

#### SDO (Scheda di Dimissione Ospedaliera)

```
sdo_id, encounter_id, version
// Section A - hospital_code, ward_code, patient demographics
// Section B - admission date/time/type/source, diagnoses (1 principal + 5 secondary) with POA,
//             procedures (1 principal + 5 secondary) with dates, transfers, discharge data
drg_code, drg_type, drg_weight
// Rehabilitation fields (Barthel, FIM) per SDO-R
status (DRAFT | COMPLETE | VALIDATED | TRANSMITTED | ERROR)
validation_errors, transmitted_at
```

#### LDO (Lettera di Dimissione Ospedaliera)

```
ldo_id, encounter_id, version
// CDA2 header: document_id, type_code, creation_datetime, confidentiality_code
// Patient, author, custodian, legal authenticator data
// Content sections: reason_for_admission, hospital_course, discharge_condition,
//                   discharge_diagnoses, procedures_performed, discharge_medications,
//                   follow_up_instructions, pending_results, patient_education
signed_at, signature_certificate (PAdES)
fse_document_id, fse_transmitted, fse_transmitted_at, fse_transmission_status
pdf_generated, pdf_path
status (DRAFT | PENDING_SIGNATURE | SIGNED | TRANSMITTED)
```

---

### Status Progressions

Encounter lifecycle and bed status state machine are defined in the Patient Flow Layer (CORE Section 15). Key progressions:

```
Encounter: PRE_ADMITTED → ADMITTED → ACTIVE → DISCHARGE_PENDING → DISCHARGE_READY → DISCHARGED
           (with sub-statuses: IN_ROOM, OFF_WARD_PROCEDURE, OFF_WARD_TRANSIT, ON_LEAVE)

Bed: AVAILABLE → RESERVED → OCCUPIED → VACATED → CLEANING_REQUESTED → CLEANING_IN_PROGRESS → AVAILABLE
     (plus: OCCUPIED_PENDING_DISCHARGE, OCCUPIED_OFF_WARD, BLOCKED, SURGE_INACTIVE)

(Transfers within hospital = location change + LocationHistory entry, same encounter)
```

---

### Environment Designs

#### PATIENT LIST

Primary view showing assigned patients with key indicators:
- Bed/Room, Patient name, age, sex
- Diagnosis, Hospital day
- Attending, Assigned RN
- Alert icons: Code status, Isolation, Fall risk, Meds due, Results pending, Discharge pending

**Acting on a patient — voice/text primary, GUI fallback equivalent:**
The clinician describes what they want to do in clinical language: "open Rossi's chart," "vitals on bed 4: BP 130 over 80, HR 78, sat 97 on room air," "order chest x-ray for Bianchi STAT." The system identifies the patient (from context, name, or bed), executes the action, and shows the result. The GUI provides equivalent direct-manipulation paths — clickable patient rows that open the chart, a "Quick actions" affordance for Open Chart / Enter Orders / Document Vitals — for situations where the clinician prefers visual navigation or wants to see options laid out.

Filters: My patients, My team, All ward, Attending, Discharge status

#### CENSUS (Bed Board — Ward-Filtered View)

Ward-level view of hospital-wide bed data from the Patient Flow Layer's Bed Management Engine.

Visual ward layout showing:
- All beds with status (color-coded: occupied, available, dirty, cleaning, blocked, reserved)
- Patient preview on hover
- Admission queue sidebar (pending bed assignments for this ward)
- Metrics: Census count, occupancy %, available beds, pending discharges

Actions: Assign patient to bed, drag-drop transfers, mark cleaning complete, block/reserve bed

(Hospital-wide Bed Board for bed management staff is in Patient Flow Layer — CORE Section 15)

#### CLINICAL (Patient Chart)

Tabbed interface:
- **Summary**: At-a-glance (recent vitals, active problems, today's events, key labs, active meds, pending orders, last progress note)
- **Notes**: All clinical documentation with filters, new note creation
- **Orders**: CPOE with order entry, order sets, status tracking, results
- **Flowsheets**: Time-based grid for vitals, I&O, assessments with trending
- **MAR**: Medication administration record with scheduled/due/given status
- **Care Plan**: PAI management with problems, goals, interventions, evaluations
- **Documents**: Consents, scanned documents, advance directives

#### HANDOFF

Structured shift change tool (SBAR/I-PASS format):
- Auto-populated from system data
- Editable annotations
- Per-patient review with Situation, Background, Assessment, Recommendations
- Key alerts: Code status, Fall risk, Isolation
- Pending items, due medications
- Acknowledgment workflow

#### DISCHARGE

Workflow-driven discharge process:
1. Discharge order (date, time, type, destination)
2. Discharge diagnoses (ICD coding with POA)
3. Medication reconciliation (continue/new/discontinue)
4. Discharge instructions (LDO content)
5. SDO validation
6. Final sign-off (signatures, transmission)

#### ARCHIVE

Search historical encounters by patient, date range, diagnosis, attending.
View read-only historical charts.

#### ADMINISTRATION

Configuration: Ward settings, rooms/beds, users/permissions, note templates, order sets, flowsheet parameters, discharge templates, ward-type features.

---

### Ward Type Feature Activations

#### Surgical Ward (ward_type = SURGICAL)

Activates:
- **WHO Surgical Safety Checklist** tracking (Sign-In, Time-Out, Sign-Out phases)
- **NPO Status** tracking with ASA guideline compliance calculation
- **Drain Management** flowsheet (type, site, output, characteristics)
- **VTE Risk Assessment** (Caprini Score) with auto-ordered prophylaxis
- Post-operative monitoring frequency templates

Data structures: SurgicalChecklist, NPOStatus, DrainManagement, VTERiskAssessment

#### Pediatric Ward (ward_type = PEDIATRIC)

Activates:
- **PEWS** (Pediatric Early Warning Score) auto-calculation from vitals
- **Age-specific vital sign ranges** with automatic out-of-range flagging
- **Age-appropriate pain scales** (FLACC, Wong-Baker, NRS selection based on age)
- **Weight-based dose calculator** with mandatory verification
- **Guardian consent workflow** (dual parent for major procedures, minor assent)
- **Safeguarding documentation** with mandatory reporting integration

Data structures: PediatricVitals (extends VitalSigns), PediatricPainAssessment, GuardianConsent, PediatricMedication

#### Psychiatric Ward (ward_type = PSYCHIATRIC)

Activates:
- **TSO/ASO workflow** with 48-hour timeline tracking and deadline alerts
- **Observation level management** (1:1, q15min, q30min, q60min, routine)
- **Restraint documentation** (pre-restraint alternatives, monitoring, release)
- **Suicide risk assessment** scales (NGASR-ita, C-SSRS)
- **Psychiatric assessment** scales (BPRS-4.0, GAF)
- **Clozapine ANC monitoring** with prescription blocking
- **Enhanced privacy controls** (oscuramento for FSE)

Data structures: TSORecord, ASORecord, ObservationLevel, RestraintRecord, PsychiatricAssessment, ClozapineMonitoring

TSO Workflow:
1. Proposta motivata (any physician)
2. Convalida (ASL psychiatrist)
3. Ordinanza (Mayor, within 48h)
4. Judge notification (within 48h of ordinance)
5. Judge validation (within 48h of notification)
6. Duration: max 7 days, renewable

#### Rehabilitation Ward (ward_type = REHABILITATION)

Activates:
- **FIM** (Functional Independence Measure) scoring (18 items, 18-126 scale)
- **Barthel Index** scoring (10 items, 0-100 scale)
- **PRI** (Progetto Riabilitativo Individuale) documentation with ICF framework
- **Therapy session logging** with minute tracking
- **Therapy intensity dashboard** (18h/week, 3h/day targets)
- **SDO-R** compliant export with required scales by discipline code

Data structures: FIMAssessment, BarthelIndex, PRI, TherapySession, TherapyIntensityTracking

#### Maternity Ward (ward_type = MATERNITY)

Activates:
- **Pregnancy record** (G/P notation, gestational age, risk factors)
- **Electronic partogram** (cervical dilation, fetal station, FHR, contractions)
- **CTG integration** hooks for external fetal monitor data
- **Labor record** (onset, ROM, progression)
- **Delivery documentation** (type, personnel, complications)
- **Mother-baby linking** with dual RN verification
- **Newborn record** creation (birth data, Apgar, resuscitation)
- **Apgar scoring** interface (1min, 5min, 10min if needed)
- **Breastfeeding documentation**
- **CedAP generation** (per DM 394/2001 and new DM 2025)
- **Robson classification** reporting

Data structures: PregnancyRecord, LaborRecord, DeliveryRecord, NewbornRecord, MotherBabyLink, BreastfeedingRecord, CedAP

---

### Integration Patterns

**Outbound Orders (Care Unit → Service Modules):**
Care Unit physician creates order → writes to shared database → target module (Lab, Radiology, etc.) sees in worklist. No API calls - same database, filtered views.

**Inbound Results (Service Modules → Care Unit):**
Service module completes work → results in shared database → Care Unit sees via order link. Event system triggers notification.

**External Systems:**

| System | Protocol | Data Exchange |
|--------|----------|---------------|
| Pharmacy (PIS) | HL7 v2.x | Med orders out, dispense confirmations in |
| ADC (Pyxis) | Proprietary | Auth requests, dispense events |
| Vital Signs Monitors | HL7/IEEE 11073 | Vitals data in |
| FSE 2.0 Gateway | CDA2 REST | LDO out |
| Regional SDO System | XML upload | SDO out |

---

### Permissions Structure

| Permission | Admin | Attending | Resident | Charge RN | Staff RN | Aide |
|------------|-------|-----------|----------|-----------|----------|------|
| View all patients | ✓ | ✓ | ✓ | ✓ | assigned | assigned |
| Assign beds | ✓ | - | - | ✓ | - | - |
| Write physician notes | - | ✓ | cosign | - | - | - |
| Write nursing notes | - | - | - | ✓ | ✓ | - |
| Enter orders | - | ✓ | cosign | protocol | - | - |
| Document MAR | - | - | - | ✓ | ✓ | - |
| Document vitals/I&O | - | - | - | ✓ | ✓ | ✓ |
| Discharge patient | - | ✓ | cosign | - | - | - |
| Sign LDO | - | ✓ | - | - | - | - |

---

### Interaction Layer Examples

```
Admission:
"Admit Rossi Mario to Medicina 1, bed 5A, diagnosis pneumonia, attending Dr. Bianchi"

Orders:
"Order CBC and CMP for bed 12"
"Start Ceftriaxone 1 gram IV every 24 hours"
"Consult infectious disease for Rossi"

Documentation:
"Enter vitals: temperature 37.5, heart rate 88, blood pressure 130 over 85"
"Open progress note for bed 8"

MAR:
"Give scheduled meds for Rossi"
"Hold morning metformin for Rossi, NPO for procedure"

Discharge:
"Start discharge for bed 5A"
"Discharge diagnosis heart failure"
"Sign discharge letter"

Ward-Type Specific:
Surgical: "Complete sign-in checklist" | "Record JP drain output 50 mL"
Pediatric: "Calculate dose of amoxicillin for 15 kg patient" | "Document PEWS"
Psychiatric: "Start TSO documentation" | "Change observation to q15 minutes"
Rehabilitation: "Complete FIM assessment" | "Log PT session 45 minutes"
Maternity: "Update partogram: dilation 6 cm, FHR 140" | "Create newborn record, Apgar 8 and 9"
```

---

### Compliance Requirements (Italian)

**SDO (DM 380/2000, DM 261/2016, DM 165/2023):**
- XML format, monthly regional submission
- 31 required fields including diagnoses (1+5), procedures (1+5), POA indicators
- ICD-9-CM 2007 coding (→ ICD-10-IM January 2027)

**LDO (FSE 2.0 Guidelines):**
- HL7 CDA2 embedded in PAdES-signed PDF
- Submission within 5 days of discharge
- 90% target by March 2026

**ICD-10-IM Transition (DM 23 October 2025):**
- Effective January 1, 2027
- System must support dual coding and crosswalks

**Consent (Law 219/2017):**
- Document before treatment
- Store in cartella clinica AND FSE
- DAT (living wills) integration

**Clinical Record Retention:**
- UNLIMITED for clinical records
- Archive within 15 days of discharge
- Copy release within 7 days of request

---

### Glossary Additions for Care Unit

**ADT:** Admission, Discharge, Transfer - core hospital patient flow operations

**Barthel Index:** 10-item functional independence scale (0-100)

**BCMA:** Barcode Medication Administration - scanning workflow for medication safety

**Braden Scale:** Pressure injury risk assessment (6-23, lower = higher risk)

**Care Plan (PAI):** Piano Assistenziale Individualizzato - nursing care plan

**CedAP:** Certificato di Assistenza al Parto - Italian birth certificate document

**Census:** Real-time count and status of patients in a ward

**CPOE:** Computerized Provider Order Entry

**DAT:** Disposizioni Anticipate di Trattamento - Italian living wills

**Encounter (Ricovero):** Inpatient episode from admission to discharge

**FIM:** Functional Independence Measure - 18-item rehabilitation assessment (18-126)

**Flowsheet:** Time-based documentation grid for vital signs, I&O, assessments

**Handoff:** Structured communication at shift change or patient transfer

**H&P:** History and Physical - admission documentation

**I&O:** Intake and Output - fluid balance tracking

**I-PASS:** Illness severity, Patient summary, Action list, Situation awareness, Synthesis - handoff framework

**LDO:** Lettera di Dimissione Ospedaliera - discharge letter for FSE

**LOS:** Length of Stay - days from admission to discharge

**MAR:** Medication Administration Record

**Morse Fall Scale:** Fall risk assessment

**NGASR:** Nurses' Global Assessment of Suicide Risk (Italian version)

**NPO:** Nil Per Os - nothing by mouth

**Partogram:** Graphical record of labor progress

**PEWS:** Pediatric Early Warning Score (0-9+)

**PRI:** Progetto Riabilitativo Individuale - Italian rehabilitation care plan

**Progress Note:** Daily physician documentation (SOAP format)

**Robson Classification:** 10-group cesarean section classification

**SBAR:** Situation, Background, Assessment, Recommendation - handoff framework

**SDO:** Scheda di Dimissione Ospedaliera - Italian discharge abstract

**SDO-R:** SDO for Rehabilitation with additional required scales

**Shift:** Work period (typically 8h or 12h for nursing)

**SOAP:** Subjective, Objective, Assessment, Plan - note format

**TSO:** Trattamento Sanitario Obbligatorio - Italian involuntary psychiatric treatment

**ASO:** Accertamento Sanitario Obbligatorio - Italian compulsory psychiatric assessment

**SPDC:** Servizio Psichiatrico di Diagnosi e Cura - Italian psychiatric ward

**VTE:** Venous Thromboembolism - blood clot risk

**Ward:** Hospital unit/floor where patients stay (Reparto)

**WHO Surgical Safety Checklist:** Three-phase surgical safety verification

---

---

## ICU MODULE (MODULO TERAPIA INTENSIVA) - COMPLETE DESIGN

### Module Overview

**Purpose:** Manage complete Intensive Care Unit workflow including continuous bedside device data integration, high-frequency clinical documentation, mechanical ventilation management, continuous infusion titration, severity scoring, infection surveillance, and bundle compliance tracking.

**Core Principle:** Flowsheet-centric continuous monitoring where the time-based flowsheet is the primary clinical workspace. Unlike Care Unit (notes-centric, per-shift documentation) and service modules (order-driven, per-procedure), ICU is driven by continuous device data streams with intervention-driven documentation layered on top.

**AIRIS Position:** ICU Clinical Information System (ICU-CIS). Replaces standalone CIS products (Philips ICCA, iMDsoft MetaVision, Dräger ICM). Receives device data via external device integration middleware (Capsule MDIP or equivalent) through HL7v2 ORU^R01 messages. EU MDR Class IIa/IIb Medical Device Software certification required for deployment.

**Architecture Decision (Position C):** AIRIS IS the ICU CIS. Device integration middleware handles proprietary device protocol translation and pushes normalized data INTO AIRIS. Physical bedside monitors display real-time waveforms independently. AIRIS owns everything from the HL7v2 message inward: data storage, validation, flowsheet display, clinical documentation, scoring, alerting, and reporting.

**ICU Subtypes Supported:** Single module with configurable ICU subtype selected at department creation:
- General / Medical (MICU) — Standard ICU workflows, baseline configuration
- Surgical (SICU) — Post-op protocols, drain tracking, surgical site monitoring
- Cardiac (CICU/CCU) — Swan-Ganz hemodynamics, IABP/Impella, arrhythmia monitoring
- Cardiac Surgery (CSICU) — Chest tube tracking, epicardial pacing, sternal wound, fast-track protocols
- Neurological (Neuro ICU) — ICP/CPP monitoring, EVD management, neuro checks q1h, stroke pathway
- Trauma (Trauma ICU) — ISS scoring, damage control surgery follow-up, massive transfusion tracking
- Burn (Burn ICU) — TBSA calculation, Parkland formula, body-map wound tracking
- Step-down / HDU (Subintensiva) — Reduced monitoring frequency, non-invasive monitoring, wider nurse ratios

**Explicitly Out of Scope:**
- NICU (Neonatal ICU) — Fundamentally different architecture (gestational-age-aware, weight changes daily, different scoring, different vital sign ranges). Deferred to future pediatric critical care module.
- PICU (Pediatric ICU) — Deferred with NICU as future pediatric initiative.
- Bedside monitor hardware (Philips IntelliVue, GE CARESCAPE, Dräger Infinity, Nihon Kohden, Mindray)
- Ventilator hardware (Dräger Evita, Hamilton C6, GE R860, Getinge Servo)
- Infusion pump hardware (BD Alaris, B. Braun Space, Baxter Spectrum, ICU Medical Plum)
- Device integration middleware itself (Capsule MDIP, Masimo iSirona, etc.) — external integration
- Real-time waveform rendering on physical bedside monitors
- ECMO circuit management, IABP console operation, CRRT machine operation (hardware control)

**What Makes ICU a Separate Module (Not a Care Unit Ward Type):**

| Aspect | Care Unit (Wards) | ICU Module |
|---|---|---|
| Primary workspace | Clinical Notes tab | High-frequency Flowsheet |
| Documentation rhythm | Per shift (q4-8h manual) | Continuous device stream + q1h nursing |
| Device integration | Optional spot-check monitors | Continuous multi-device streaming (5-15+ devices/bed) |
| Data volume per bed/day | ~50 manually documented points | 1,500+ device data points + manual entries |
| Medication model | Standard MAR (scheduled doses) | Titratable continuous infusions (drip titration protocols) |
| Ventilator management | None | Full sub-system (settings, measured, weaning, bundles) |
| Severity scoring | Optional (NEWS2) | Core requirement (APACHE, SOFA, SAPS — daily) |
| Infection surveillance | Basic | Line-day counting, bundle compliance, CLABSI/CAUTI/VAP rates |
| Data validation | Not applicable (all manual) | Critical workflow (auto-charted vs nurse-validated) |
| Nurse:patient ratio | 1:4 to 1:6 | 1:1 to 1:2 |
| I&O granularity | Per shift totals | Hourly measurement with running net balance |

**Relationship to Care Unit Module:**
ICU consumes the same Patient Flow Layer infrastructure (Encounter, Bed Management, Transport, Transition Handoff). When a patient transfers from ICU to a general ward, the Encounter continues — only the location and active module change. Clinical data documented in ICU remains accessible from the ward. The two modules share outbound ordering patterns, SDO/LDO generation, and clinical note structures. They are siblings that share a parent (Patient Flow Layer), not parent-child.

---

### Eight Environments

| Environment | Purpose | Primary Users |
|---|---|---|
| **PATIENT LIST** | Active patients with ICU-specific indicators | All ICU staff |
| **CENSUS** | Real-time bed status, device associations, occupancy | Charge nurses, bed management |
| **BEDSIDE** | Primary clinical workspace — flowsheet-centric patient chart | Nurses, physicians, respiratory therapists |
| **ROUNDS** | Daily goals, severity scoring, bundle compliance, rounding checklists | Physicians, multidisciplinary team |
| **HANDOFF** | Shift change documentation and review | Nurses |
| **DISCHARGE** | Discharge/transfer workflow, SDO/LDO generation | Physicians, case managers |
| **ARCHIVE** | Historical ICU encounters, search | All authorized |
| **ADMINISTRATION** | ICU config, beds, devices, flowsheet templates, scoring, bundles | Module admins |

**Plus:** My Preferences (personal customization)

---

### Core Data Structures

#### Hospital-Wide Infrastructure (from Patient Flow Layer — CORE Section 15)

The following data structures are defined in the Patient Flow Layer and consumed by ICU:
- **Encounter (Ricovero)** — full lifecycle from pre-admission through discharge, with sub-status for off-ward tracking
- **Location Hierarchy** — Facility → Building → Floor → Ward → Room → Bed
- **BedStatus** — full state machine (10 states)
- **LocationHistory** — transfer tracking across all wards
- **BedRequest** — admission/transfer bed requests from all sources
- **TransportRequest** — patient movement dispatch
- **TransitionHandoff** — auto-generated inter-department clinical summaries

ICU is a primary clinical consumer of this infrastructure. The Census environment provides a ward-filtered view of hospital-wide bed data. ICU beds may have additional attributes (isolation capability, negative pressure, proximity to nursing station) managed in Administration.

#### Shared Clinical Structures (same patterns as Care Unit, used by ICU)

- **ClinicalNote** — same structure, ICU adds note types: ICU_ADMISSION_NOTE, ICU_PROGRESS_NOTE, ICU_PROCEDURE_NOTE, ICU_FAMILY_CONFERENCE, RESPIRATORY_THERAPY_NOTE
- **Order (Outbound)** — same pattern for ordering from Lab, Radiology, Pharmacy, Consult
- **NursingAssessment** — same structure, ICU-specific assessment content (more frequent, more systems)
- **CarePlan (PAI)** — same structure
- **SDO / LDO** — same structure and regulatory compliance
- **Handoff** — same SBAR/I-PASS structure, extended payload for ICU complexity (ventilator settings, active drips, invasive lines, device data summary)

#### ICU-Specific Data Structures

#### DeviceAssociation

Links a physical bedside device to a patient encounter. Middleware sends data tagged with device identifiers; AIRIS maps device → bed → patient.

```
association_id, encounter_id, bed_id
device_identifier (from middleware — serial number or middleware device ID)
device_type (BEDSIDE_MONITOR | VENTILATOR | INFUSION_PUMP | IABP | CRRT | ICP_MONITOR | 
             CARDIAC_OUTPUT | TEMPERATURE_MGMT | EEG | POC_ANALYZER | OTHER)
device_make, device_model (informational, from middleware)
associated_at, associated_by_id
disassociated_at, disassociated_by_id
is_active
```

**Key rule:** When a patient is transferred or discharged, all active device associations for that bed are automatically disassociated. New patient in same bed requires explicit re-association (patient safety).

#### DeviceDataPoint

Individual data point received from a device via middleware. This is the high-frequency data stream.

```
data_point_id, encounter_id, association_id
parameter_code (IEEE 11073-10101 nomenclature — e.g., MDC_ECG_HEART_RATE, MDC_PRESS_BLD_ART_ABP_SYS)
parameter_name (human-readable — e.g., "HR", "ABP Systolic")
parameter_category (VITALS | VENTILATOR_SETTINGS | VENTILATOR_MEASURED | HEMODYNAMICS | 
                    INFUSION | TEMPERATURE | NEUROLOGICAL | OTHER)
value_numeric, value_text, unit
source_device_type
recorded_at (device timestamp)
received_at (AIRIS receipt timestamp)
validation_status (RAW | VALIDATED | REJECTED | AUTO_CHARTED)
validated_by_id, validated_at
rejection_reason (ARTIFACT | SENSOR_DISCONNECT | IMPLAUSIBLE_VALUE | OTHER)
is_in_legal_record (boolean — true only when VALIDATED or AUTO_CHARTED)
```

**Two-tier data model:**
- **RAW tier:** All device data received, stored for trending, surveillance, research, AI. Never deleted. Not part of legal medical record.
- **VALIDATED tier:** Nurse-confirmed data points that enter the legal medical record. Validation can be per-point or per-snapshot (nurse validates a set of values at a point in time).
- **AUTO_CHARTED tier:** Data points that meet auto-charting rules (configurable per parameter, per ICU) and enter the legal record without individual nurse confirmation. Typically used for non-critical parameters at stable intervals.
- **REJECTED tier:** Data points explicitly marked as artifact or erroneous by nurse. Stored for audit trail but excluded from clinical trending.

#### ICUFlowsheetConfig

Defines what parameters appear in the flowsheet for a given ICU subtype. Configured in Administration.

```
config_id, department_id, icu_subtype
section_name (VITAL_SIGNS | HEMODYNAMICS | VENTILATOR | INFUSIONS | INTAKE_OUTPUT | 
              NEUROLOGICAL | LINES_TUBES | ASSESSMENTS | MEDICATIONS | CUSTOM)
row_definitions (JSON array):
  - parameter_code (IEEE 11073 or AIRIS-internal for manual entries)
  - display_name
  - unit
  - source (DEVICE | MANUAL | CALCULATED)
  - normal_range_low, normal_range_high
  - critical_range_low, critical_range_high
  - charting_frequency (minutes — for manual entries)
  - auto_chart_eligible (boolean)
  - display_order
is_active, created_by_id
```

#### IntakeOutput (ICU-Extended)

Same concept as Care Unit but with hourly granularity and more granular categories.

```
io_id, encounter_id, recorded_at, recorded_by_id
io_type (INTAKE | OUTPUT)
category:
  INTAKE: IV_CRYSTALLOID | IV_COLLOID | IV_BLOOD_PRODUCT | IV_MEDICATION | IV_TPN | 
          ORAL_FLUIDS | ORAL_NUTRITION | ENTERAL_FEEDING | FLUSH | OTHER_INTAKE
  OUTPUT: URINE | URINE_CATHETER | STOOL | EMESIS | NASOGASTRIC | CHEST_TUBE | 
          SURGICAL_DRAIN | WOUND_OUTPUT | ULTRAFILTRATE | OTHER_OUTPUT
amount_ml
source_detail (free text — e.g., "LR via pump 1", "JP drain #2", "OG tube")
route
hour_of_shift (1-12 for 12-hour, 1-8 for 8-hour shifts)
hourly_running_intake_ml, hourly_running_output_ml, hourly_net_ml (calculated)
shift_intake_total_ml, shift_output_total_ml, shift_net_ml (calculated)
daily_intake_total_ml, daily_output_total_ml, daily_net_ml (calculated)
cumulative_net_since_admission_ml (calculated)
```

#### ContinuousInfusion

Manages titratable continuous drip orders. Fundamentally different from standard MAR (scheduled discrete doses).

```
infusion_id, encounter_id, order_id
medication_name, medication_code
medication_class (VASOPRESSOR | INOTROPE | SEDATIVE | ANALGESIC | PARALYTIC | 
                  INSULIN | ANTICOAGULANT | ANTIARRHYTHMIC | ANTIHYPERTENSIVE | OTHER)
concentration (e.g., "norepinephrine 4mg in 250mL NS")
concentration_amount, concentration_unit, diluent, diluent_volume_ml
dose_unit (MCG_KG_MIN | MCG_MIN | MG_HR | UNITS_HR | ML_HR | MCG_KG_HR)
current_rate, current_dose
titration_parameters:
  - min_dose, max_dose
  - increment
  - titration_frequency_minutes
  - clinical_goal (free text — e.g., "MAP ≥ 65 mmHg", "RASS -2 to 0")
  - titration_protocol_id (if standardized protocol)
pump_channel (which pump/channel this runs on)
started_at, started_by_id
current_status (ORDERED | RUNNING | TITRATED | HELD | BOLUSED | DISCONTINUED | COMPLETED)
discontinued_at, discontinued_by_id, discontinue_reason
total_volume_infused_ml, total_drug_infused
weight_kg_for_dosing (patient weight used for dose calculation)
```

#### InfusionTitration

Each dose change event for a continuous infusion. Creates the titration history.

```
titration_id, infusion_id, encounter_id
titrated_at, titrated_by_id
previous_rate, previous_dose
new_rate, new_dose
reason (TITRATION_UP | TITRATION_DOWN | PROTOCOL_DRIVEN | BOLUS | RATE_CHANGE | RESTART_AFTER_HOLD)
clinical_context (free text — e.g., "MAP 58, increased per protocol")
associated_vital_signs (snapshot of key vitals at time of titration)
```

#### VentilatorRecord

Snapshot of ventilator settings and measured values. Settings are clinician-prescribed; measured values are ventilator-reported.

```
vent_record_id, encounter_id, recorded_at, recorded_by_id
record_source (DEVICE | MANUAL)

// Settings (clinician-prescribed)
mode (AC_VC | AC_PC | SIMV_VC | SIMV_PC | PSV | CPAP | APRV | HFOV | PRVC | BIPAP | OTHER)
set_tidal_volume_ml, set_respiratory_rate, set_peep_cmh2o, set_fio2_percent
set_pressure_support_cmh2o, set_pressure_control_cmh2o
set_inspiratory_time_sec, set_ie_ratio
set_trigger_sensitivity, trigger_type (FLOW | PRESSURE)

// Measured values (ventilator-reported)
measured_tidal_volume_ml, measured_minute_ventilation_lpm
measured_respiratory_rate_total, measured_respiratory_rate_spontaneous
measured_peak_pressure_cmh2o, measured_plateau_pressure_cmh2o, measured_mean_airway_pressure_cmh2o
measured_auto_peep_cmh2o
measured_static_compliance_ml_cmh2o, measured_dynamic_compliance_ml_cmh2o
measured_resistance_cmh2o_l_sec
measured_ie_ratio

// Calculated
driving_pressure_cmh2o (plateau - PEEP, calculated)
p_f_ratio (PaO2/FiO2, calculated when ABG available)
oxygenation_index (calculated when available)
```

#### WeaningTrial

Documents spontaneous breathing and awakening trials (SBT/SAT) as part of ABCDEF bundle.

```
trial_id, encounter_id, vent_record_id
trial_type (SAT | SBT | COMBINED_SAT_SBT)
trial_date, started_at, started_by_id

// SAT (Spontaneous Awakening Trial)
sat_sedation_held (JSON: which infusions held)
sat_readiness_criteria_met (boolean)
sat_readiness_criteria (JSON: individual criteria checked)

// SBT (Spontaneous Breathing Trial)
sbt_method (T_PIECE | LOW_PS | CPAP | AUTOMATIC)
sbt_duration_target_minutes (typically 30-120)
sbt_readiness_criteria_met (boolean)
sbt_readiness_criteria (JSON: FiO2 ≤ 0.5, PEEP ≤ 8, hemodynamically stable, etc.)

// Outcome
trial_result (PASSED | FAILED | ABORTED)
failure_reason (TACHYPNEA | DESATURATION | TACHYCARDIA | AGITATION | DIAPHORESIS | OTHER)
trial_duration_actual_minutes
ended_at, ended_by_id
extubation_performed (boolean)
extubation_datetime
reintubation_required (boolean), reintubation_datetime, reintubation_reason
post_extubation_support (ROOM_AIR | NASAL_CANNULA | HIGH_FLOW | NIV | NONE)
```

#### SeverityScore

Calculated severity/assessment score with auto-calculated and manual components.

```
score_id, encounter_id
score_type (APACHE_II | APACHE_IV | SAPS_II | SAPS_3 | SOFA | QSOFA | 
            GCS | RASS | CAM_ICU | CPOT | BPS | BRADEN | CAPRINI | PADUA |
            MURRAY_LUNG_INJURY | FOUR_SCORE | ISS | TBSA)
calculated_at, calculated_by_id
calculation_trigger (ADMISSION | DAILY | ON_DEMAND | AUTO_SCHEDULED)

total_score
predicted_mortality_percent (for APACHE, SAPS — where applicable)
components (JSON object — score-specific breakdown):
  // Example for SOFA:
  // { respiratory: {pf_ratio: 350, score: 1, source: "auto"},
  //   coagulation: {platelets: 120, score: 1, source: "auto"},
  //   liver: {bilirubin: 1.5, score: 0, source: "auto"},
  //   cardiovascular: {map: 68, vasopressors: "norepinephrine 0.08", score: 2, source: "manual"},
  //   cns: {gcs: 14, score: 1, source: "manual"},
  //   renal: {creatinine: 1.8, urine_output_24h: 1200, score: 1, source: "auto"} }

auto_calculated_components (list of components populated from device data + labs)
manual_required_components (list of components requiring bedside assessment)
manual_components_complete (boolean)
data_completeness_percent
notes
```

**Auto-calculation logic:**
- SOFA respiratory: auto from PaO2 (ABG lab result) + FiO2 (ventilator data)
- SOFA coagulation: auto from platelet count (lab)
- SOFA liver: auto from bilirubin (lab)
- SOFA cardiovascular: partially auto (MAP from device data), manual for vasopressor dose
- SOFA CNS: manual (GCS requires bedside assessment)
- SOFA renal: auto from creatinine (lab) + urine output (I&O data)

**APACHE II on admission:** Uses worst values from first 24 hours. System automatically tracks worst values and prompts completion at hour 24.

#### InvasiveDevice (Lines, Tubes, Drains)

Tracks all invasive devices for infection surveillance and clinical management.

```
device_entry_id, encounter_id
device_category (CENTRAL_LINE | ARTERIAL_LINE | PICC | DIALYSIS_CATHETER | 
                 SWAN_GANZ | ETT | TRACHEOSTOMY | CHEST_TUBE | NG_TUBE | OG_TUBE |
                 FOLEY_CATHETER | SURGICAL_DRAIN | EVD | ICP_MONITOR | 
                 ECMO_CANNULA | IABP | OTHER)
device_detail (e.g., "Triple-lumen CVC", "7.5mm cuffed ETT", "28Fr chest tube")
site (e.g., "R IJ", "L radial", "R femoral")
size
inserted_at, inserted_by_id, inserted_location (ICU, OR, ED, etc.)
last_dressing_change, next_dressing_due
last_site_assessment, site_condition (CLEAN_DRY_INTACT | ERYTHEMA | DRAINAGE | DISLODGED | OTHER)
daily_necessity_reviewed (boolean per day)
daily_necessity_reviewed_by_id, daily_necessity_reviewed_at
removed_at, removed_by_id, removal_reason (NO_LONGER_NEEDED | COMPLICATION | REPLACED | PATIENT_REQUEST)
complication (INFECTION | OCCLUSION | DISLODGEMENT | PNEUMOTHORAX | HEMORRHAGE | NONE)
is_active

// Infection surveillance
line_day_count (calculated: days since insertion while in_situ)
bundle_type (CLABSI_INSERTION | CLABSI_MAINTENANCE | CAUTI_INSERTION | CAUTI_MAINTENANCE | VAP)
```

#### BundleCompliance

Daily all-or-none compliance check for evidence-based bundles.

```
bundle_id, encounter_id
bundle_type (VAP | CLABSI_MAINTENANCE | CAUTI_MAINTENANCE | SEPSIS_3HR | SEPSIS_6HR | 
             DVT_PROPHYLAXIS | STRESS_ULCER | ABCDEF | CUSTOM)
assessment_date, assessed_by_id

elements (JSON array — each element is pass/fail):
  // Example for VAP bundle:
  // [{ element: "HOB elevation ≥30°", status: "COMPLIANT", source: "manual" },
  //  { element: "Daily sedation vacation", status: "COMPLIANT", source: "weaning_trial" },
  //  { element: "DVT prophylaxis", status: "COMPLIANT", source: "mar" },
  //  { element: "Oral care q4h", status: "NON_COMPLIANT", source: "manual" },
  //  { element: "Daily SBT assessment", status: "COMPLIANT", source: "weaning_trial" }]

all_or_none_compliant (boolean — true only if ALL elements are COMPLIANT)
non_compliant_elements (list)
notes
```

#### ICURoundsRecord

Documents daily multidisciplinary rounds and goals.

```
rounds_id, encounter_id
rounds_date, rounds_type (ATTENDING | MULTIDISCIPLINARY | RAPID | FAMILY)
led_by_id, participants (JSON array of user_ids and roles)

// Systems review (structured)
neurological_plan, cardiovascular_plan, respiratory_plan, 
renal_plan, gi_plan, hematologic_plan, infectious_disease_plan,
endocrine_plan, skin_wounds_plan, lines_access_plan

// Daily goals
daily_goals (JSON array: goal_text, responsible_role, target_time, completed)
code_status, code_status_discussed (boolean)
family_updated (boolean), family_update_notes

// Disposition
disposition_plan (CONTINUE_ICU | STEP_DOWN_WHEN | TRANSFER_WARD_WHEN | COMFORT_CARE | PENDING)
disposition_criteria (free text — e.g., "When off vasopressors and FiO2 ≤ 40%")
estimated_transfer_date

// Scores calculated during rounds
sofa_score_today, sofa_trend (IMPROVING | STABLE | WORSENING)
cam_icu_result (POSITIVE | NEGATIVE | UNABLE_TO_ASSESS)
rass_score
```

---

### Status Progressions

#### ICU Stay (within Encounter lifecycle)

The Encounter entity is owned by Patient Flow Layer. ICU adds clinical context to the encounter without changing the encounter state machine itself. The ICU-specific workflow stages are:

```
ICU Clinical Phase (tracked within encounter, not replacing encounter status):

ADMISSION_ASSESSMENT
  |  [Initial orders, device association, admission note, APACHE data collection begins]
ACTIVE_ICU_CARE
  |  [Continuous monitoring, daily rounds, scoring, interventions]
  |  [Can cycle through sub-phases: UNSTABLE → STABILIZING → STABLE]
WEANING
  |  [Active ventilator/vasopressor weaning, daily SAT/SBT]
STEP_DOWN_READY
  |  [Meets step-down criteria, awaiting bed/transfer]
TRANSFERRED / DISCHARGED
  [Encounter continues in destination ward or ends]
```

This is a clinical tracking field on the encounter, not a replacement for the encounter state machine.

#### Ventilator Status

```
NOT_VENTILATED
  |
INTUBATED → ON_VENTILATOR
  |              |
  |         [Mode changes, setting adjustments]
  |              |
  |         WEANING_IN_PROGRESS
  |              |
  |         SBT_IN_PROGRESS
  |              |  (pass)          |  (fail)
  |         EXTUBATED          BACK_TO_VENTILATOR
  |              |
  |         POST_EXTUBATION_MONITORING
  |              |  (success)       |  (failure)
  |         VENTILATOR_FREE    REINTUBATED → ON_VENTILATOR
  |
TRACHEOSTOMY → ON_VENTILATOR (via trach)
                    |
               TRACH_COLLAR_TRIAL
                    |
               DECANNULATED
```

#### Continuous Infusion Status

```
ORDERED
  |
RUNNING
  |  [titrations up/down, rate changes]
  |
HELD (temporary pause — e.g., for SAT)
  |
RUNNING (restarted)
  |
DISCONTINUED (no longer needed)
  |
COMPLETED (goal achieved, weaned off)
```

#### Data Validation Status

```
RAW (received from middleware)
  |
  +→ AUTO_CHARTED (meets auto-charting criteria → legal record)
  |
  +→ PENDING_VALIDATION (queued for nurse review)
       |
       +→ VALIDATED (nurse confirmed → legal record)
       |
       +→ REJECTED (artifact/error → excluded from clinical trending)
```

---

### Environment Designs

#### PATIENT LIST

Primary view showing ICU patients with critical indicators. More information-dense than Care Unit patient list.

**Per-patient row displays:**
- Bed/Room, Patient name, age, sex, ICU day number, hospital day number
- Primary diagnosis, Attending intensivist
- Assigned RN (1:1 or 1:2)
- **Ventilator status icon** (intubated, trach, extubated, not ventilated) with current mode and FiO2
- **Hemodynamic status** (current MAP, on vasopressors yes/no, number of drips)
- **Latest SOFA score** with trend arrow (↑↓→)
- **Active drip count** with medication classes
- **Alert icons:** Code status, Isolation, Fall risk, Active critical values, Bundle non-compliance, Overdue assessments

**Acting on a patient — voice/text primary, GUI fallback equivalent:**
The intensivist or nurse describes what they want: "open Rossi's chart," "MAP holding at 72 on noradrenaline 0.08, urine 40 last hour," "validate the auto-charted vitals for the last hour on bed 3." The system identifies the patient (often from the user's bed assignment context — in ICU, who you're talking to is usually who you're at), executes the action, and shows the result. GUI affordances for Open Bedside Chart / Enter Vitals / Validate Device Data remain available for direct-manipulation paths.

**Filters:** My patients, All ICU, By attending, By acuity (ventilated, on vasopressors, step-down ready), By ICU day

#### CENSUS (Bed Board — Ward-Filtered View)

Same concept as Care Unit Census, ward-filtered view of Patient Flow Layer bed data. ICU-specific additions:

**Visual layout showing:**
- All ICU beds with status (color-coded: occupied, available, cleaning, blocked, reserved)
- **Device overlay** per bed: ventilator connected (yes/no), number of pumps, monitor active
- Patient preview on hover (includes vent settings, drip summary, SOFA)
- Step-down beds shown separately (if configured as part of ICU department)
- Admission queue sidebar (pending ICU admissions from ED, OR, wards)
- **Metrics:** Census count, ventilated count, occupancy %, available beds, pending step-downs, pending admissions

**Actions:** Assign patient to bed, transfer within ICU, mark step-down ready, block/reserve bed, associate/disassociate devices

#### BEDSIDE (Primary Clinical Workspace)

**This is the core of the ICU module.** The Bedside environment is where ICU clinicians spend most of their time. It is flowsheet-centric — the time-based flowsheet is the primary display, with other clinical data accessible via tabs.

**Header bar (always visible):**
Patient name, age, sex, ICU day, allergies, code status, isolation, weight (for dosing), attending

**Tab structure:**

**Flowsheet (primary tab — opens by default):**
- Time-based grid: rows = parameters, columns = time intervals
- Configurable time scale (5min, 15min, 30min, 1hr, 2hr, 4hr, 8hr, 12hr, 24hr)
- **Sections** (collapsible): Vital Signs, Hemodynamics, Ventilator, Infusions, Intake/Output, Neurological, Lines/Tubes/Drains, Assessments, Custom
- Device-sourced values displayed with source indicator (device icon)
- Manual entries displayed with user indicator
- Validated values in normal weight; unvalidated/raw in lighter/italic style
- Out-of-range values highlighted (yellow = abnormal, red = critical)
- **Validation workflow:** Nurse selects time column → reviews device values → confirms/rejects → validated batch enters legal record
- Trending: click any parameter row → popup graph showing trend over configurable time window
- **Infusion rows** show drug name, rate, dose in primary unit — each titration creates a new cell
- **I&O rows** show hourly amounts with running totals and net balance

**Ventilator (tab):**
- Current settings vs measured values side-by-side
- Ventilator mode history (timeline)
- Weaning trial history (SAT/SBT attempts, outcomes)
- ABG correlation (ABG results aligned with vent settings at time of draw)
- P/F ratio trend
- Calculated parameters: driving pressure, compliance, resistance trends

**Infusions (tab):**
- All active continuous infusions with current rate/dose
- Titration history per drip (timeline with dose changes and associated vitals)
- Titration entry: select drip → new rate/dose → clinical context → save (creates InfusionTitration record)
- Weight-based dose calculator
- Protocol-driven titration guidance (if protocol attached to order)
- Inactive/discontinued infusions shown below in collapsed section

**I&O (tab):**
- Hourly intake/output grid (12h or 24h view)
- Category breakdown (IV crystalloid, blood products, urine, drains, etc.)
- Running totals: shift, daily, cumulative since admission
- Net fluid balance trending (graph)
- Quick entry for common sources

**Notes (tab):**
- Same as Care Unit: all clinical documentation with filters, new note creation
- ICU-specific note types: ICU Admission Note, ICU Progress Note, Procedure Note, Respiratory Therapy Note, Family Conference Note
- Structured templates for ICU-specific documentation

**Orders (tab):**
- CPOE with order entry, order sets, status tracking, results
- ICU-specific order sets (e.g., ICU admission, post-intubation, sepsis, DKA, post-cardiac surgery)
- Continuous infusion orders entered here, managed in Infusions tab
- Results viewing with critical value alerts

**MAR (tab):**
- Standard scheduled medications (same as Care Unit MAR)
- Continuous infusions shown separately (link to Infusions tab for management)
- PRN medications with effectiveness tracking
- Blood product administration tracking

**Devices (tab):**
- Active invasive device inventory (lines, tubes, drains)
- Per-device: type, site, insertion date, line-day count, last dressing, daily necessity review status
- Insert new device / Remove device workflows
- Bundle compliance status per device
- Infection surveillance metrics

**Documents (tab):**
- Consents, scanned documents, advance directives (same as Care Unit)

#### ROUNDS

Dedicated environment for ICU rounding workflow. Designed for team use during daily multidisciplinary rounds.

**Rounding view:**
- Patient list in bed order (rounds typically go bed-by-bed)
- Per-patient rounding card showing:
  - Systems review (neuro, CV, resp, renal, GI, heme, ID, endo, skin, lines)
  - Today's severity scores (SOFA with trend, RASS, CAM-ICU, pain score)
  - Active problems and overnight events summary
  - Current ventilator status and weaning readiness
  - Active infusions with doses
  - Pending results, pending consults
  - Bundle compliance status (red/green indicators)
  - Yesterday's goals — completed vs incomplete
- **Daily goals entry:** Structured list of today's goals with assigned roles and target times
- **Disposition plan:** Where is this patient going and what criteria need to be met
- **Code status / family update** checkboxes
- **Score calculators:** SOFA, GCS, RASS, CAM-ICU — auto-populated where possible, prompt for manual components

**Rounding summary:** Auto-generated summary of rounds decisions for documentation (can be imported into progress note).

#### HANDOFF

Same structured shift-change tool as Care Unit (SBAR/I-PASS format) with ICU-specific extensions:

**Per-patient handoff includes:**
- Standard SBAR/I-PASS content (auto-populated)
- **Ventilator summary:** Current mode, settings, last ABG, weaning status
- **Active drips:** All continuous infusions with current doses and recent titrations
- **Hemodynamic summary:** Current MAP, HR, vasopressor requirements
- **Lines/tubes/drains:** Complete inventory with line days
- **I&O summary:** Shift totals, net balance, trend
- **Overnight events:** Critical values, significant interventions, code events
- **Today's plan:** Goals from rounds, pending procedures, expected disposition
- Acknowledgment workflow

#### DISCHARGE

Same workflow as Care Unit for patients transferring out of ICU:

**For transfer to ward (most common):**
1. Step-down readiness documentation (criteria met)
2. TransitionHandoff auto-generated by Patient Flow Layer
3. Medication reconciliation (discontinue drips, convert to scheduled meds)
4. Active device removal documentation
5. Transfer orders

**For discharge from hospital (less common, typically via step-down first):**
1. Standard discharge workflow (SDO, LDO, medication reconciliation)
2. Same process as Care Unit discharge

**For death:**
1. Time of death documentation
2. Death note
3. SDO completion with death outcome code
4. Organ donation workflow hooks (if applicable)

#### ARCHIVE

Search historical ICU encounters by patient, date range, diagnosis, attending, ICU subtype, ventilator days, LOS.
View read-only historical charts with full flowsheet, notes, scoring history.

#### ADMINISTRATION

Configuration includes everything in Care Unit Administration plus:

- **ICU subtype configuration** (which content packages are active)
- **Flowsheet template management** (parameter rows, sections, display order, normal/critical ranges)
- **Device middleware configuration** (middleware endpoint, device type mappings, parameter mappings)
- **Auto-charting rules** (which parameters, what frequency, what validation criteria)
- **Scoring configuration** (which scores active, calculation schedules, auto-calculation thresholds)
- **Bundle definitions** (which bundles tracked, elements per bundle, compliance rules)
- **Titration protocol library** (standardized titration protocols for common drips)
- **ICU-specific order set management**
- **Quality metric targets** (CLABSI rate target, VAP rate target, etc.)
- **Bed attributes** (isolation capability, negative pressure, equipment)

---

### ICU Subtype Content Packages

All subtypes share the full ICU engine (flowsheet, device integration, infusion management, scoring, bundles). What varies is clinical content loaded on top.

#### Cardiac ICU (CICU/CCU) — icu_subtype = CARDIAC

Activates:
- **Swan-Ganz hemodynamic monitoring** flowsheet rows (PAP, PCWP, CO, CI, SVR, PVR, SvO2)
- **Hemodynamic calculation engine** (auto-calculates SVR, PVR, CI, DO2, VO2 from raw values)
- **IABP documentation** (timing, ratio, augmentation pressure, weaning)
- **Impella documentation** (flow, position, purge)
- **Arrhythmia monitoring** flowsheet section (rhythm documentation, pacing parameters)
- **Door-to-balloon time tracking** (integration with Cardiology STEMI pathway)
- **Post-PCI/post-cath documentation** templates
- **Cardiac output trending** dashboard

#### Cardiac Surgery ICU (CSICU) — icu_subtype = CARDIAC_SURGERY

Activates:
- All Cardiac ICU content plus:
- **Chest tube output tracking** (mediastinal, pleural — hourly with cumulative, high-output alerts)
- **Epicardial pacing wire management** (settings, sensing, capture threshold, removal tracking)
- **Sternal wound assessment** (inspection schedule, drainage, stability)
- **Fast-track extubation protocol** (target extubation within 4-6 hours post-surgery)
- **Post-bypass coagulation tracking** (ACT, TEG/ROTEM results correlation)
- **Surgical time linkage** (links to OR Module for operative details)

#### Neurological ICU (Neuro ICU) — icu_subtype = NEUROLOGICAL

Activates:
- **ICP/CPP monitoring** flowsheet rows (ICP, CPP = MAP - ICP, auto-calculated)
- **EVD management** (drain height, output volume, CSF appearance, drain status open/clamped)
- **Neurological assessment q1h** (GCS components, pupil size/reactivity, motor exam, cranial nerves)
- **FOUR Score** (alternative to GCS for intubated patients)
- **Continuous EEG data integration** hooks (if middleware supports)
- **Stroke pathway compliance** (door-to-needle, NIH Stroke Scale, tPA/thrombectomy tracking)
- **Targeted temperature management** documentation (target temp, method, rewarming protocol)
- **Seizure documentation** (type, duration, treatment, post-ictal state)

#### Trauma ICU — icu_subtype = TRAUMA

Activates:
- **ISS (Injury Severity Score)** calculation from AIS components
- **Damage control surgery tracking** (planned return-to-OR documentation)
- **Massive transfusion protocol tracking** (products given, ratio tracking, TEG/ROTEM)
- **Compartment syndrome monitoring** (extremity checks, pressure monitoring)
- **Trauma-specific flowsheet rows** (abdominal girth, compartment pressures)
- **FAST exam documentation** integration

#### Burn ICU — icu_subtype = BURN

Activates:
- **TBSA calculation** tool with body-map interface (Lund-Browder chart)
- **Parkland formula calculator** (4 mL × kg × %TBSA, auto-calculates hourly rate)
- **Burn resuscitation tracking** (actual vs predicted fluid, hourly urine output goal 0.5-1 mL/kg/hr)
- **Wound assessment** with body-map documentation (depth, appearance, treatment per zone)
- **Temperature management** documentation (burn patients have impaired thermoregulation)
- **Nutritional requirements** calculator (Curreri formula)

#### Step-down / HDU — icu_subtype = STEP_DOWN

Reduced-intensity configuration:
- **Monitoring frequency** reduced (q2h or q4h instead of continuous for some parameters)
- **Non-invasive monitoring focus** (telemetry, SpO2, NIBP instead of arterial lines)
- **Flowsheet simplified** (fewer parameter rows, manual entry more common than device-sourced)
- **Nurse ratio** 1:2 to 1:3
- **Device integration** still active but fewer devices per bed (typically: monitor, possibly HFNC or NIV)
- **Severity scoring** may use NEWS2 instead of full APACHE/SOFA
- **Retains** I&O tracking, medication management, notes, orders, handoff

---

### Integration Patterns

**Device Data Inbound (Middleware → AIRIS):**

```
+-------------------+      HL7v2 ORU^R01       +-------------------+
|   Device          |  (via IHE PCD-01 DEC)    |   AIRIS ICU       |
|   Integration     | -----------------------> |   Module          |
|   Middleware       |                          |                   |
|   (Capsule MDIP   |   IEEE 11073-10101       |   DeviceDataPoint |
|    or equivalent)  |   nomenclature           |   storage +       |
|                    |                          |   validation      |
+-------------------+                          +-------------------+
        ^                                              |
        |                                              v
  [Bedside devices:                            [Flowsheet display,
   monitors, vents,                             trending, scoring,
   pumps, ICP, etc.]                            alerting, reporting]
```

**Protocol:** HL7v2 ORU^R01 messages per IHE PCD-01 (Device Enterprise Communication) profile.
**Nomenclature:** IEEE 11073-10101 parameter codes for standardized identification.
**Frequency:** Configurable per parameter. Typical: vitals every 1-5 min, vent every 5 min, pumps on change.
**Future-ready:** FHIR Device/Observation abstraction layer for migration when HL7 FHIR PoCD IG matures.

**Alternative integration path (Position B fallback):**
For hospitals with existing CIS installations, AIRIS can integrate WITH an external CIS via HL7/FHIR rather than replacing it. AIRIS receives summarized data (hourly vital signs, daily summaries) from the CIS and manages hospital-level workflow (ADT, orders, SDO/LDO). This is a supported but non-preferred deployment model.

**Outbound Orders (ICU → Service Modules):**
Same pattern as Care Unit. ICU physician creates order → writes to shared database → target module sees in worklist.

**Inbound Results (Service Modules → ICU):**
Same as Care Unit. Results in shared database → ICU sees via order link. Event system triggers notification. Critical lab values trigger CRITICAL events.

**External Systems:**

| System | Protocol | Data Exchange |
|---|---|---|
| Device Middleware (Capsule/iSirona) | HL7v2 ORU^R01 (IHE PCD-01) | Device data in (continuous) |
| Infusion Pumps (bidirectional) | IHE PIV profile | Orders out to pump, infusion data in |
| Pharmacy (PIS) | HL7 v2.x | Med orders out, dispense confirmations in |
| ADC (Pyxis) | Proprietary | Auth requests, dispense events |
| PACS | DICOM (unchanged) | Imaging orders out, study notifications in |
| FSE 2.0 Gateway | CDA2 REST | LDO out |
| Regional SDO System | XML upload | SDO out |
| GiViTI (MargheritaTre) | Export format TBD | Quality registry data out |
| SPIN-UTI | Export format TBD | Infection surveillance data out |

---

### Permissions Structure

| Permission | Admin | Intensivist | Resident | Charge RN | Bedside RN | RT | Aide |
|---|---|---|---|---|---|---|---|
| View all patients | ✓ | ✓ | ✓ | ✓ | assigned | assigned | assigned |
| View flowsheet | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| Validate device data | - | ✓ | - | ✓ | ✓ | ✓ (vent only) | - |
| Write physician notes | - | ✓ | cosign | - | - | - | - |
| Write nursing notes | - | - | - | ✓ | ✓ | - | - |
| Write RT notes | - | - | - | - | - | ✓ | - |
| Enter orders | - | ✓ | cosign | protocol | - | protocol (RT) | - |
| Manage infusions (titrate) | - | ✓ | cosign | ✓ | ✓ | - | - |
| Document ventilator | - | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| Perform weaning trial | - | ✓ | cosign | - | - | ✓ | - |
| Calculate severity scores | - | ✓ | ✓ | ✓ | ✓ | - | - |
| Document I&O | - | - | - | ✓ | ✓ | - | ✓ |
| Document MAR | - | - | - | ✓ | ✓ | - | - |
| Manage devices (insert/remove) | - | ✓ | cosign | ✓ | ✓ | - | - |
| Conduct rounds | - | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| Assign beds | ✓ | - | - | ✓ | - | - | - |
| Associate/disassociate devices | ✓ | - | - | ✓ | ✓ | - | - |
| Discharge/transfer | - | ✓ | cosign | - | - | - | - |
| Sign LDO | - | ✓ | - | - | - | - | - |
| Administration | ✓ | - | - | - | - | - | - |

**RT = Respiratory Therapist** (Terapista Respiratorio / Fisioterapista Respiratorio). Note: in Italy, respiratory therapy is often performed by physicians or specialized nurses rather than dedicated RTs as in the US. The role is included for completeness and international compatibility.

---

### Interaction Layer Examples

```
Device Management:
"Associate monitor bed 5 to patient Rossi"
→ Creates DeviceAssociation for bed 5 monitor to Rossi's encounter

"Disassociate all devices bed 3"
→ Disassociates all active device associations for bed 3

Flowsheet & Vitals:
"Validate vitals for bed 7 at 14:00"
→ Opens validation interface for bed 7 device data at 14:00

"Enter manual BP 95/60 for Rossi"
→ Creates manual DeviceDataPoint for blood pressure

"Show me Rossi's MAP trend last 24 hours"
→ Opens trending graph for MAP parameter

Ventilator:
"Document vent settings: AC/VC, Vt 450, RR 14, PEEP 8, FiO2 40"
→ Creates VentilatorRecord with settings

"Start SBT for bed 4, PS 5 PEEP 5"
→ Creates WeaningTrial record, SBT type

"Bed 4 failed SBT, tachypnea"
→ Updates WeaningTrial with failure result and reason

"Rossi extubated at 10:30"
→ Updates ventilator status, creates extubation event

Infusions:
"Start norepinephrine 0.05 mcg/kg/min for Rossi, titrate to MAP 65"
→ Creates ContinuousInfusion order with titration parameters

"Increase norepi Rossi to 0.08, MAP was 58"
→ Creates InfusionTitration record with dose change and clinical context

"Hold propofol for SAT"
→ Changes infusion status to HELD, documents reason

"Wean off vasopressin"
→ Initiates discontinuation workflow

Lines and Devices:
"Document CVC insertion right IJ, triple lumen, placed by Dr. Bianchi"
→ Creates InvasiveDevice record

"Remove Foley bed 6, no longer needed"
→ Updates InvasiveDevice with removal

"Daily line check bed 8"
→ Opens daily necessity review for all active devices

Scoring:
"Calculate SOFA for Rossi"
→ Opens SOFA calculator, auto-populates available components, highlights manual entries needed

"GCS 11: eyes 3, verbal 3, motor 5"
→ Creates SeverityScore record for GCS

"RASS minus 2 for bed 4"
→ Records RASS score

"CAM-ICU positive for Rossi"
→ Records CAM-ICU result

Rounds:
"Start rounds"
→ Opens Rounds environment with patients in bed order

"Daily goal bed 3: wean FiO2 to 40, trial off vasopressin"
→ Adds goals to ICURoundsRecord

"Code status confirmed full code, family updated"
→ Updates rounds record checkboxes

I&O:
"Record urine output 45 mL for bed 5, last hour"
→ Creates IntakeOutput record

"Chest tube bed 2: 120 mL this hour"
→ Creates output record for chest tube

"Show net fluid balance for Rossi today"
→ Displays daily I&O summary with net balance

ICU-Subtype Specific:
Cardiac: "Swan numbers: PA 35/18, wedge 14, CO 5.2, CI 2.8"
→ Creates hemodynamic data entry

Neuro: "ICP 22, CPP 63, EVD at 15 cm, draining clear CSF"
→ Creates ICP and EVD data entries

Burn: "Calculate Parkland for 40% TBSA, 80 kg patient"
→ Calculates fluid requirement, suggests hourly rate

Discharge/Transfer:
"Rossi ready for step-down"
→ Changes ICU clinical phase to STEP_DOWN_READY, initiates transfer workflow

"Transfer bed 4 to Medicina 2"
→ Initiates Patient Flow Layer transfer with Transition Handoff generation
```

---

### Compliance Requirements (Italian)

**SDO (DM 380/2000, DM 261/2016, DM 165/2023):**
- Same requirements as Care Unit — XML format, monthly regional submission
- ICU stays generate higher-weight DRGs through procedure codes (mechanical ventilation 96.7x, tracheostomy 31.2x)
- ICU days tracked as "giorni di terapia intensiva" in SDO

**LDO (FSE 2.0 Guidelines):**
- Same CDA2/PAdES requirements as Care Unit
- ICU discharge letters include ICU-specific sections (ventilator duration, complications, severity scores)

**SIAARTI Guidelines:**
- SIAARTI (Società Italiana di Anestesia Analgesia Rianimazione e Terapia Intensiva) documentation standards
- Carry legal weight under Law 24/2017 (Gelli-Bianco) — adherence is a legal defense in liability cases
- Admission/discharge criteria documentation per SIAARTI recommendations

**Law 219/2017 (Informed Consent and Advance Directives):**
- Specific relevance in ICU for end-of-life decisions
- DAT (Disposizioni Anticipate di Trattamento) must be accessible and documented
- Family conference documentation when patient unable to consent

**GiViTI (Gruppo Italiano per la Valutazione degli Interventi in Terapia Intensiva):**
- Quality registry coordinated by Mario Negri IRCCS, ~450+ Italian ICUs participate
- AIRIS should support automated data export generation from routine clinical documentation
- Key data: demographics, admission source/diagnosis, SAPS II/III, SOFA, ventilator days, complications, outcome, LOS

**SPIN-UTI (Sorveglianza Prospettica delle Infezioni Nosocomiali nelle Unità di Terapia Intensiva):**
- ICU infection surveillance program (~51+ ICUs)
- Reports CLABSI, CAUTI, VAP rates per 1,000 device-days
- AIRIS auto-generates from InvasiveDevice line-day tracking and infection documentation

**DM 70/2015 and DL 34/2020 (ICU Capacity Standards):**
- Minimum 0.14 ICU beds per 1,000 inhabitants nationally
- At least 50% of semi-intensive beds convertible to full ICU
- System should support surge capacity tracking and bed conversion documentation

**EU MDR (Regulation 2017/745):**
- ICU module classified as Medical Device Software under Rule 11 (monitoring vital parameters where variations could result in immediate danger)
- Classification: Class IIa (vital signs display, trending) or Class IIb (clinical decision support, automated scoring, threshold alerting)
- Requires: ISO 13485 QMS, IEC 62304 software lifecycle, ISO 14971 risk management, clinical evaluation, Notified Body conformity assessment
- Estimated: €200K-600K, 12-24 months for initial certification
- Modular MDSW approach (MDCG 2019-11 Rev.1): display module and CDS module can be classified separately
- Device middleware (Capsule etc.) separately CE-marked — AIRIS does not bear regulatory burden for device protocol translation

---


---

### Glossary Additions for ICU

**ABCDEF Bundle:** ICU liberation bundle (Assess/prevent/manage pain, Both SAT and SBT, Choice of analgesia and sedation, Delirium assessment, Early mobility, Family engagement)

**ABG:** Arterial Blood Gas — blood gas analysis from arterial sample

**APACHE:** Acute Physiology and Chronic Health Evaluation — ICU severity scoring system (II, III, IV versions)

**Auto-charting:** Device data written directly to legal medical record meeting predefined validation criteria without individual nurse confirmation

**BPS:** Behavioral Pain Scale — pain assessment for intubated/sedated patients (3-12)

**Bundle Compliance:** All-or-none measurement of adherence to evidence-based intervention set

**CAM-ICU:** Confusion Assessment Method for ICU — delirium screening (Positive/Negative)

**CLABSI:** Central Line-Associated Bloodstream Infection — HAI tracked per 1,000 central line-days

**CAUTI:** Catheter-Associated Urinary Tract Infection — HAI tracked per 1,000 catheter-days

**CIS:** Clinical Information System — specialized ICU software (what AIRIS ICU module replaces)

**CPP:** Cerebral Perfusion Pressure (MAP minus ICP) — Neuro ICU

**CPOT:** Critical-Care Pain Observation Tool — pain assessment for non-verbal patients (0-8)

**Device Association:** Linking a physical bedside device to a specific patient encounter in AIRIS

**Device Middleware:** External software layer translating proprietary device protocols to standardized messages (HL7v2). Examples: Capsule MDIP, Masimo iSirona

**Driving Pressure:** Plateau pressure minus PEEP — ventilator-derived lung mechanics parameter

**EVD:** External Ventricular Drain — catheter draining cerebrospinal fluid from brain ventricles — Neuro ICU

**FOUR Score:** Full Outline of UnResponsiveness — coma scale alternative to GCS for intubated patients (0-16)

**GCS:** Glasgow Coma Scale — neurological assessment (3-15: Eye + Verbal + Motor)

**GiViTI:** Gruppo Italiano per la Valutazione degli Interventi in Terapia Intensiva — Italian ICU quality registry

**HFNC:** High-Flow Nasal Cannula — non-invasive respiratory support

**IABP:** Intra-Aortic Balloon Pump — mechanical circulatory support device — Cardiac ICU

**ICP:** Intracranial Pressure — monitored via EVD or ICP bolt — Neuro ICU

**IHE PCD-01:** IHE Device Enterprise Communication profile — standard for device-to-IT-system data transfer using HL7v2

**Impella:** Percutaneous ventricular assist device — Cardiac ICU

**ISS:** Injury Severity Score — trauma severity scoring based on Abbreviated Injury Scale — Trauma ICU

**Line-day:** One invasive device present at daily census = one device-day (denominator for infection rates)

**MAP:** Mean Arterial Pressure — key hemodynamic target, often from arterial line

**MDIP:** Medical Device Information Platform (Capsule/Philips middleware product)

**NIV:** Non-Invasive Ventilation (BiPAP, CPAP via mask)

**P/F Ratio:** PaO2/FiO2 ratio — measure of oxygenation efficiency

**Parkland Formula:** Burn resuscitation formula: 4 mL × kg × %TBSA — Burn ICU

**RASS:** Richmond Agitation-Sedation Scale — sedation level assessment (-5 to +4, target typically -2 to 0)

**SAT:** Spontaneous Awakening Trial — daily sedation interruption to assess consciousness

**SBT:** Spontaneous Breathing Trial — test of ability to breathe without ventilator support

**SAPS:** Simplified Acute Physiology Score — ICU severity scoring (II, 3 versions)

**SIAARTI:** Società Italiana di Anestesia Analgesia Rianimazione e Terapia Intensiva

**SOFA:** Sequential Organ Failure Assessment — daily organ dysfunction score (0-24, 6 organ systems)

**SPIN-UTI:** Sorveglianza Prospettica delle Infezioni Nosocomiali nelle Unità di Terapia Intensiva — Italian ICU infection surveillance

**Swan-Ganz:** Pulmonary artery catheter for hemodynamic monitoring — Cardiac ICU

**TBSA:** Total Body Surface Area (percent burned) — Burn ICU

**Titratable Order:** Continuous infusion order with nurse-driven dose adjustment parameters (min/max dose, increment, clinical goal)

**Titration:** Dose adjustment of continuous infusion based on clinical response

**Validated Data:** Device-sourced data confirmed by nurse as representing true patient physiologic state, entering legal medical record

**VAP:** Ventilator-Associated Pneumonia — HAI tracked per 1,000 ventilator-days

**Vasopressor:** Medication that increases blood pressure (norepinephrine, vasopressin, epinephrine, phenylephrine, dopamine)

---

---

## GLOSSARY

**Accession Number:** Unique identifier for exam/specimen/case visible to users (e.g., AIRIS_87.41.1, ACC-2026-0125-0089, S24-00893)

**Activity:** Amount of radioactivity, measured in MBq (megabecquerels) - Nuclear Medicine

**Add-on Test:** Additional test ordered on an existing specimen without new collection - Laboratory

**Addendum:** New version of report (full editing capability, not just adding text)

**ADT Event Journal:** Immutable record of all Admission, Discharge, Transfer events mapped to HL7 A01-A62 codes - Patient Flow Layer

**Agent:** Autonomous AI entity that operates within AIRIS to accomplish goals

**Agenda:** Calendar/schedule for booking exams, tied to modality type

**AIC Code:** Italian AIFA authorization code for pharmaceuticals/radiopharmaceuticals

**AIMS:** Anesthesia Information Management System - specialized system for anesthesia documentation - Operating Room

**Aldrete Score:** Standardized 10-point scoring system for PACU discharge readiness - Operating Room

**Aliquot:** Portion of a specimen separated for specific testing - Laboratory

**Analyzer:** Laboratory instrument that performs automated testing (chemistry, hematology, etc.) - Laboratory

**Appointment:** Scheduled time slot linking exam to agenda

**ASA Classification:** American Society of Anesthesiologists physical status classification (I-VI) - Operating Room

**Auto-charting:** Device data written directly to legal medical record meeting predefined validation criteria without individual nurse confirmation - ICU

**ASTM/LIS2-A2:** Communication standard between laboratory analyzers and LIS/middleware - Laboratory

**Auto-validation:** Automatic release of laboratory results meeting defined criteria without human review - Laboratory

**Automation:** Rule-based workflow that executes actions when triggered by events

**Bed Management Engine:** Hospital-wide system for bed tracking, assignment optimization, turnaround cascade, and capacity management - Patient Flow Layer

**BedRequest:** Entity bridging admission decision to bed assignment, created by any source (ED, OR, direct admit, transfer) - Patient Flow Layer

**Block:** Paraffin-embedded tissue in cassette, source for slides - Pathology

**Block Time:** Dedicated OR time allocated to specific surgeon or service - Operating Room

**Camera:** Nuclear medicine imaging device (gamma camera, PET scanner, SPECT scanner)

**CAP Protocol:** College of American Pathologists standardized cancer reporting template - Pathology

**Cascade Reporting:** Suppression of broad-spectrum antibiotics unless narrow-spectrum show resistance - Laboratory (Microbiology)

**Check-in:** Process when patient physically enters modality room for exam

**CIED:** Cardiac Implantable Electronic Device (pacemaker, ICD, CRT)

**CIS:** Clinical Information System — specialized ICU software for bedside device data management, flowsheets, and critical care documentation. AIRIS ICU Module replaces standalone CIS products (Position C architecture).

**CIPI:** Classificazione Italiana Procedure e Interventi — new Italian procedure coding system replacing ICD-9-CM Volume 3 from January 2027 - Operating Room, system-wide

**Circulating Nurse:** RN who manages OR environment, documentation, and patient safety during surgery - Operating Room

**Clinical Validation:** Verification of clinical appropriateness by physician before result release - Laboratory

**Concordance:** Agreement between frozen section diagnosis and final permanent section diagnosis - Pathology

**Critical Value:** Result indicating life-threatening condition requiring immediate notification - Laboratory

**Cytopathology:** Study of cells (Pap smears, FNA, fluids) vs tissue - Pathology

**DAP:** Dose Area Product (radiation measurement in cath lab, Gycm)

**Delta Check:** Comparison of current laboratory result with patient's prior values - Laboratory

**Department:** Organizational unit in hospital (can have multiple departments using same module type)

**Device Association:** Linking a physical bedside device to a specific patient encounter in AIRIS. Required for device data to flow to correct patient record - ICU

**Device Middleware:** External software layer translating proprietary medical device protocols to standardized HL7v2 messages. Examples: Capsule MDIP, Masimo iSirona. AIRIS integrates with middleware rather than connecting directly to devices - ICU

**DICOM:** Digital Imaging and Communications in Medicine (standard for medical images)

**Dose Calibrator:** Device measuring radiopharmaceutical activity before administration

**DRL:** Diagnostic Reference Level (radiation threshold)

**DWL:** DICOM Worklist (list of patients/exams for modality to perform)

**Exam:** Individual imaging study within an order (has own lifecycle, accession number, status)

**Execution Form:** Dynamic form filled when marking exam completed (configured per exam type)

**FFPE:** Formalin-Fixed Paraffin-Embedded tissue block - Pathology

**Fast-Track:** PACU Phase I bypass pathway for eligible patients (White-Song score ≥12) - Operating Room

**First Case On-Time:** Metric measuring whether first surgery of the day starts on schedule - Operating Room

**Folder:** Visual organization tool for grouping modalities (no logic attached)

**Frozen Section:** Rapid intraoperative diagnosis from fresh tissue (target <=20 min) - Pathology

**FSE:** Fascicolo Sanitario Elettronico (Italian Electronic Health Record)

**GISE:** Societ Italiana di Cardiologia Interventistica (Italian interventional cardiology registry)

**GiViTI:** Gruppo Italiano per la Valutazione degli Interventi in Terapia Intensiva — Italian ICU quality registry (~450+ ICUs, coordinated by Mario Negri IRCCS) - ICU

**Gross Description:** Documentation of specimen appearance before processing - Pathology

**Grossing:** Physical examination and dissection of specimen, selection of tissue for blocks - Pathology

**H&E:** Hematoxylin and Eosin, routine histologic stain - Pathology

**Half-life:** Time for radioactive material to decay to half its activity - Nuclear Medicine

**Hot Lab:** Radiopharmacy preparation area in Nuclear Medicine department

**IHC:** Immunohistochemistry, antibody-based staining for specific proteins - Pathology

**IHE PCD-01:** IHE Device Enterprise Communication profile — standard for device-to-IT-system data transfer using HL7v2 ORU^R01 messages with IEEE 11073 nomenclature. Primary protocol for device middleware to AIRIS communication - ICU

**IMS:** Image Management System for whole slide images (digital pathology) - Pathology

**ISBT 128:** International standard for blood product identification and labeling - Laboratory (Blood Bank)

**LOINC:** Logical Observation Identifiers Names and Codes - universal test/observation identifiers (mandatory for FSE 2.0 laboratory results)

**MBq:** Megabecquerel (unit of radioactivity) - Nuclear Medicine

**Middleware:** Software layer between LIS and analyzers managing connectivity and auto-verification rules - Laboratory

**Modality:** Piece of imaging equipment (CT, MRI, X-ray, etc.)

**Module:** Type of functionality (Radiology, Cardiology, Laboratory, Pathology, Operating Room, etc.)

**NMIS:** Nuclear Medicine Information System (what AIRIS NM module replaces)

**Order:** Request for exam/test including patient, priority, clinical indication

**PACU:** Post-Anesthesia Care Unit - recovery area for post-operative patients - Operating Room

**PADSS:** Post-Anesthetic Discharge Scoring System — 10-point scoring for outpatient home discharge from PACU Phase II - Operating Room

**PONV:** Post-Operative Nausea and Vomiting — assessed via Apfel risk score (0-4) - Operating Room

**Panel:** Group of laboratory tests ordered together (CBC, BMP, CMP) - Laboratory

**Patient Flow Layer:** CORE infrastructure managing hospital-wide patient movement, bed management, transport, location tracking, and transition handoffs (CORE Section 15)

**Part:** Specimen designator within a pathology case (Part A, Part B, etc.) - Pathology

**Prebooking:** Request type with associated time slot (vs. simple request without scheduling)

**Preference Card:** Surgeon-specific list of equipment, supplies, and setup preferences - Operating Room

**QNS:** Quantity Not Sufficient (inadequate specimen volume) - Laboratory

**Radiopharmaceutical:** Drug containing radioactive isotope for imaging or therapy - Nuclear Medicine

**Reflex Test:** Automatic follow-up test triggered by initial result - Laboratory

**Registro Operatorio:** Italian operative register — legally part of cartella clinica, unlimited retention - Operating Room

**Request:** Order for exam without associated time slot (vs. prebooking with scheduling)

**RTLS:** Real-Time Location System — hardware-based patient/asset tracking (RFID, BLE, Wi-Fi, infrared, UWB). Optional integration with Patient Flow Layer for continuous location tracking beyond workflow events.

**RPIS:** Radiopharmacy Information System (external system tracking doses) - Nuclear Medicine

**Scrub Tech/Nurse:** Sterile team member who handles instruments and assists surgeon directly - Operating Room

**Serum Indices:** Hemolysis, icterus, lipemia measurements affecting result validity - Laboratory

**Sign In:** First WHO checklist phase - before anesthesia induction - Operating Room

**Sign Out:** Third WHO checklist phase - before patient leaves OR - Operating Room

**Sign-out:** Final review and signature of pathology report by pathologist - Pathology

**SIS:** Surgical Information System - software managing perioperative workflow - Operating Room

**SOFA:** Sequential Organ Failure Assessment — daily ICU organ dysfunction score (0-24, 6 organ systems). Partially auto-calculable from lab results and device data - ICU

**Slide:** Glass slide with stained tissue section for microscopic examination - Pathology

**SNICh2:** Sistema Nazionale Sorveglianza Infezioni Sito Chirurgico — Italian national SSI surveillance - Operating Room

**Slot:** Single time unit on an agenda (building block for appointments)

**SPECT:** Single Photon Emission Computed Tomography - Nuclear Medicine

**Specimen:** Physical sample collected from patient (blood, urine, tissue, etc.)

**SUV:** Standardized Uptake Value (PET quantification metric) - Nuclear Medicine

**Surgical Count:** Systematic counting of sponges, needles, instruments to prevent retained items - Operating Room

**Surge Protocol:** Configurable hospital capacity escalation (4 levels based on occupancy thresholds), triggers automated notifications and bed activation - Patient Flow Layer

**Synoptic Report:** Structured cancer report following CAP protocol format - Pathology

**TAT:** Turnaround Time - time from order/receipt to result/report

**Technical Validation:** Verification of analytical correctness by TSLB - Laboratory

**Theranostics:** Combined diagnostic and therapeutic approach using paired radiopharmaceuticals - Nuclear Medicine

**Time Out:** Second WHO checklist phase - immediately before incision, all activity stops - Operating Room

**TNM:** Tumor-Node-Metastasis cancer staging system - Pathology

**Track:** Workflow pathway in Cardiology (DIAGNOSTIC, HOLTER, CATH_LAB, DEVICE_CLINIC, STEMI)

**TSLB:** Tecnico Sanitario di Laboratorio Biomedico (Italian laboratory technician) - Laboratory

**Turnover Time:** Time between one patient leaving OR and next patient entering - Operating Room

**UDI:** Unique Device Identification - standardized system for identifying medical devices/implants - Operating Room

**Uptake Period:** Time between radiopharmaceutical injection and imaging - Nuclear Medicine

**Verbale Operatorio:** Italian operative report with legally required elements - Operating Room

**Westgard Rules:** Statistical rules for laboratory quality control acceptance - Laboratory

**White-Song Score:** 14-point fast-track scoring system — ≥12 with no criterion <1 allows PACU Phase I bypass - Operating Room

**WHO Checklist:** World Health Organization Surgical Safety Checklist - three-phase safety protocol - Operating Room

**Wound Classification:** Classification of surgical wounds (Clean I through Dirty/Infected IV) - Operating Room

**WSI:** Whole Slide Imaging, digital scanning of glass slides - Pathology

**Italian Coronary Terminology:**
- TCS: Tronco Comune Sinistro (Left Main)
- IVA: Interventricolare Anteriore (LAD)
- Cx: Circonflesso (Circumflex)
- CDx: Coronaria Destra (RCA)

**Emergency Module Terms:**

**Accesso:** ED visit/episode - primary tracking entity in Emergency Module

**Area:** Physical/functional zone within ED (Treatment, Resuscitation, OBI, etc.)

**Codice Triage:** Italian 5-level triage code (1=Rosso through 5=Bianco)

**EMUR:** Emergency Room Minimum Data Set (Italian national ED data flow)

**Esito:** Italian outcome code (01-14) indicating disposition type

**LWBS:** Left Without Being Seen (Abbandono del PS)

**NEDOCS:** National Emergency Department Overcrowding Score

**OBI:** Osservazione Breve Intensiva (Short-stay observation unit within ED)

**Pronto Soccorso (PS):** Italian term for Emergency Department

**T0-T5:** EMUR mandatory timestamps (T0=Triage, T1=Diagnostic start, T2=Medical exam, T3=Outcome, T4=OBI admission, T5=OBI discharge)

**Tracking Board:** Real-time display of all ED patients with status and assignments

**Transition Handoff:** Auto-generated SBAR/I-PASS clinical summary at inter-department patient transfers. Distinct from shift handoff (intra-ward nursing) - Patient Flow Layer

**Transport Dispatch:** System for requesting, assigning, and tracking patient movement between departments. Auto-generated from appointments, status visible to origin and destination - Patient Flow Layer

**VPS:** Verbale di Pronto Soccorso (Official ED discharge document)

---

**END OF AIRIS MASTER DOCUMENTATION V21**

This document represents complete foundational design for AIRIS with eleven modules:
- Radiology Module (complete)
- Gastroenterology/Endoscopy Module (complete)
- Cardiology Module (complete)
- Emergency Module (complete)
- Nuclear Medicine Module (complete)
- Laboratory Module (complete)
- Pathology Module (complete)
- Operating Room Module (complete)
- Dialysis Module (complete)
- Care Unit Module (complete) - with ward types: Medical, Surgical, Pediatric, Psychiatric, Rehabilitation, Maternity
- ICU Module (complete) - with subtypes: General/Medical, Surgical, Cardiac, Cardiac Surgery, Neurological, Trauma, Burn, Step-down/HDU. Position C architecture: AIRIS is the ICU CIS, device middleware handles device connectivity. EU MDR Class IIa/IIb certification required. NICU/PICU deferred to future pediatric critical care module(s).

**System-Level Features:**
- Event System (complete) - full event structure, priority tiers, event catalog for all 11 modules + patient flow, consumer model, subscription rules, error handling, persistence, cross-module events
- Cross-Module Order Flow (complete) - how modules create orders for other modules, result visibility, catalog access, valid ordering paths
- Notification System (framework) - channels, priority-based behavior, user preferences, alert fatigue mitigation, routing logic. Marked for refinement with hands-on experience.
- Interaction Layer (complete) - three-layer architecture (gateway → domain agents → action execution), context-driven disambiguation, safety tiers, Italian medical language strategy, regulatory considerations. Dictation (speech-to-text) explicitly separate from the interaction layer.
- Automation Builder (complete) - deterministic rule-based workflows, event-triggered, visual builder, AI-powered nodes optional. Hospital-specific rules only — universal behavior is built-in system logic.
- Agent Builder (complete) - AI employees operating AIRIS through the interaction layer, configured via goal + permissions + guardrails. Deep integration: agent capabilities ARE AIRIS itself, no predefined skills needed. Agents DO things as instructed — they do NOT make autonomous clinical decisions. Designed to evolve significantly over time.
- Integration Builder (complete) - 100% AIRIS-built from scratch, not wrapping external engines. Event-driven architecture, visual field mapping, connection management, all protocols (HL7, FHIR, DICOM, APIs), Italian-specific integrations (FSE 2.0, SIED, NSIS). Can use open-source libraries for protocol parsing but the engine is AIRIS. Vision: potentially becoming an industry standard for healthcare integrations.
- DICOM Worklist Manager (complete) - hospital-wide modality management and worklist configuration, supports shared modalities across departments. Lives in System Tools, not inside modules.
- Audit Trail (complete) - permanent immutable record of all significant actions, consumer of Event System, stores CRITICAL and STANDARD events forever, GDPR/Italian privacy law compliant, query interface for authorized users only.
- Patient Flow Layer (complete) - hospital-wide infrastructure for patient movement, bed management, and department coordination. Five components: ADT Service (encounter lifecycle, admission workflows from all sources), Bed Management Engine (state machine, assignment optimization, turnaround cascade, capacity/surge), Transport Dispatch (auto-generated requests, status tracking, service module integration), Patient Location Service (workflow-based + optional RTLS, GDPR-compliant), Transition Handoff Generator (auto-compiled SBAR/I-PASS clinical summaries). Encounter and Location data structures moved from Care Unit to Patient Flow Layer as hospital-wide infrastructure. Scalable complexity from small to large hospitals.

**Architectural Principles (V21):**
- The Stance: AIRIS embodies one commitment — the system takes its work onto itself, so the clinician's work stays with the clinician. This commitment manifests in three connected forms: unified data, the absorbing interface, and executing-not-deciding agents. Each face is necessary; none is sufficient alone.
- Module Independence Principle: Core + any single module = complete standalone product. Three-way check (internal module → integration → not available). No hard dependencies between modules.
- Every Module Is Unique: No module is a copy or variant of another, regardless of shared patterns.
- Agents Do, Not Decide: Agents execute instructed tasks within job descriptions and permissions; they do not make autonomous clinical decisions. (One of two foundational hard lines.)
- No Increase in Administrative Burden: AIRIS will not, in any release, ask more administrative work of the clinician than the previous release did. (The second foundational hard line.)
- The Central Design Test: every feature is evaluated against whether it stands between the clinician and their craft (removed) or extends them further into it (built).
- Integration Builder 100% AIRIS: Built from scratch, not wrapping external engines.
- Specification and Development Are Simultaneous: Master Doc is a living document that evolves throughout development.

**Module Categories:**
- **Service Modules** (9): Radiology, Gastro/Endo, Cardiology, Nuclear Medicine, Laboratory, Pathology, Operating Room, Dialysis, Emergency
- **Care Unit Module** (1): Covers all inpatient ward types except ICU
- **ICU Module** (1): Covers all adult ICU subtypes. Flowsheet-centric, device-integrated, continuous monitoring. NICU/PICU deferred.

**Development Strategy:**
- Building the real product from day one — no light version, no prototype phase
- Real infrastructure, real database, real code, fully portable and deployable
- Build sequence: Core → Radiology → Laboratory → Emergency → Dialysis → all remaining modules
- Deployment requirement: identical codebase runs on cloud/online and fully local air-gapped infrastructure
- Claude Code as primary build tool; Master Doc + technical architecture document as session memory via Git
- Simplifications are in implementation depth only, never in architecture

All decisions explicitly discussed and confirmed.

**Bucket 1 — CORE System Components: COMPLETE**
All core architectural components designed:
1. Event System ✅
2. Cross-Module Order Flow ✅
3. Notification System ✅ (framework, refine with experience)
4. Interaction Layer ✅
5. Builders (Automation, Agent, Integration) + DICOM Worklist Manager ✅
6. Audit Trail ✅
7. Patient Flow Layer ✅

---

---

### Section 17 reframe note (V28)

Section 17 substantive content is preserved from V27. The strategic + operational commitments (D.12 + D.14-D.19, the 24 sub-section operational stack inventory) remain load-bearing for AIRIS production architecture. **V28 reframes the context of Section 17 with two additions:**

**Addition 1 — Real UX, Minimal Infrastructure operational philosophy** (per Part 0 Working Principle 0.3.1):

Section 17 specifies the AIRIS *production architecture target*. Phase 0 / early Phase A operational reality (per Working Principle 0.3.1) uses simpler infrastructure that the abstractions in Section 17 make swappable without code change:

- Section 17.1 Supabase Postgres EU → Phase 0/A operational: managed Supabase EU free tier; Phase D: self-hosted Supabase OSS per Hostinger deep research findings.
- Section 17.5 LLM substrate → Phase 0/A operational: **Claude API as current concrete backend** (an instance of deployment mode 2 — online APIs — per D.21 / D.22). Phase D and beyond: engine + deployment mode chosen per deployment from the three-mode abstraction (client-local self-hosted; online APIs; AIRIS-hosted non-HQ). Engine-agnostic substrate abstraction built from Phase A core systems Step 4.5 — protects UX, allows per-deployment backend selection without code change. (D.21 + D.22 supersede the V27 / earlier-V28 framing that named specific engines like Ollama / Bedrock EU / Mistral La Plateforme EU as platform commitments. Those names are illustrative deployment options, not committed platform engines.)
- Section 17.2 Backend services tier → Phase 0/A operational: Next.js calls Ollama directly; Python services tier provisioned when Phase A core systems work needs it. Phase D: Hostinger KVM 4 Germany or Hetzner per topology research.
- Section 17.16 SRE observability → Phase 0/A operational: Supabase dashboard + Vercel dashboard sufficient until production traffic exists. Phase D: full Sentry + Grafana + Better Stack stack per Section 17.16.
- Section 17.18 Backup 3-2-1 → Phase 0/A operational: Supabase PITR sufficient. Phase D: full 3-2-1 with Hetzner Storage Box + Backblaze B2 EU per Section 17.18.
- Other Section 17 components (Infisical, full voice stack, Inngest Pro, etc.) → activate as Phase A scope demands or Phase D pre-deployment context arrives.

**Addition 2 — Hostinger production-topology deep research findings** (May 2026 research absorbed in V28; full findings in Part VII Section 7.3.1):

Five concrete stack updates from research, applicable when Phase D pre-deployment infrastructure provisioning happens:
1. App layer: Vercel EU → Hostinger KVM 4 Germany (sovereignty + cost; abstraction-clean swap)
2. LLM serving production target: off Hostinger (no GPU) to Hetzner GEX44 (dev/staging) → OVHcloud L40S HDS-certified (clinical)
3. Python services: Cloud Run europe-west8 → Hostinger KVM 4 Germany
4. Workflow: Inngest Pro Frankfurt → Inngest OSS self-hosted on Hostinger KVM 2
5. Object storage: Backblaze B2 EU acceptable; Hetzner Object Storage flagged if hospital procurement raises CLOUD Act concerns

Recommended production topology: 3× Hostinger KVM 4 + 1× Hostinger KVM 2 + 1× Hostinger KVM 1 dev + Hetzner GEX44 + Backblaze B2 EU + Hetzner Storage Box. ~€67/mo promo / €122/mo renewal on Hostinger + €184/mo Hetzner GPU + ~€10/mo backup = ~€280-370/mo Phase D pre-deployment production run-rate.

**Architectural consequence:** Section 17 commitments remain operationally aspirational for Phase 0 / early Phase A (managed-now → self-hosted-later via abstractions) and operationally concrete for Phase D pre-deployment (full topology provisioned per Hostinger research). The discipline that makes this coherent: Working Principle 0.3.8 (Architecture Through Abstractions, Not Infrastructure Identity).

**Two cross-cutting reframes apply to all of Section 17** (strategy session 2026-05-28; promoted into D.21 / D.22 / D.24 in this commit):

- **Engine-agnostic LLM substrate** (per D.21 / D.22). All references in Section 17 to specific LLM engines or hosting (e.g., "AWS Bedrock EU inference profile," "Mistral La Plateforme EU," "Ollama / Hostinger / Hetzner GPU for LLM serving," "Claude Sonnet 4.6 via Bedrock EU") are illustrative deployment options under the engine-agnostic abstraction, **not** platform commitments. The platform commits to a stable AIRIS-internal LLM-call interface (§17.5) and to three supported deployment modes (client-local self-hosted, online APIs, AIRIS-hosted non-HQ). The current concrete backend is Claude API direct (per D.22 + `infra/manifest.md`); the abstraction lands at Step 4.5. Substantive Section 17 content otherwise unchanged.
- **International platform; Italy as first deployment market** (per D.24). All Italian-specific content in Section 17 (§17.6 voice stack, §17.7 Regulatory Layer, §17.8 Patient Flow Layer Italian-identity edges, §17.13 Italian clinician identity composition, §17.21 Italian incumbent landscape, §17.22 EU residency posture, §17.23 doppio audit) is **Italy's localization layer at first-market depth** — committed for the first deployment market, not a platform-wide commitment. The platform architecture (substrate, paradigm, eleven-module structure, engineering architecture) is language- and locale-agnostic by construction. Subsequent markets carry their own localization layer; Italian content is preserved here as the moat for the first market.

---


### 17. Engineering Architecture (since V27)

This section is the comprehensive technical inventory of the AIRIS Phase A engineering stack, organized by tier. It composes across all preceding Part II subsystems (Sections 1-16). It is the operational counterpart to the strategic commitments in Part III D.12 + D.14-D.19. **Subsystem-level shape lives in Sections 1-16; cross-cutting engineering decisions live here.**

Section 17 absorbs the consolidated output of Stage 1 (Engineering Scope Pass, 10 subsystem analyses + cross-subsystem synthesis) and Stage 2 (Tech Stack Revisit consolidation). The smart-and-open principle test produced one consistent answer across all 9 subsystem analyses: **AIRIS owns paradigm-load-bearing semantics; borrows open libraries and EU-resident plumbing for primitives; rejects vendor platforms that would impose paradigm.** This section captures the operational consequence of that principle.

#### 17.0 Architectural meta-pattern: AIRIS-native contracts

Every subsystem expresses its semantics as AIRIS-owned contracts that vendor implementations satisfy from below. The pattern is mechanical:

- **Consciousness Substrate** (per §17.4): `consciousness.read(scope, query)` / `consciousness.write(event)` / `consciousness.subscribe(channel, filters)` / `consciousness.resolve(reference, context)`. Implementations may swap (pgvector → Vespa, Redis → DragonflyDB, Bedrock → first-party EU when available); contracts do not.
- **Event System** (per §17.9): `subsystem.entity.action.version` typed event taxonomy; `events.emit(eventType, data, opts)` SDK; CloudEvents envelope mandatory; `tenantid` extension required.
- **Regulatory Layer** (per §17.7): `regulatory.fse.documents.list(patient_id, consent_scope)` / `regulatory.fse.documents.fetch(doc_id, purpose_of_use)` / `regulatory.consent.*` / lifecycle state transitions as Postgres state machine.
- **Patient Flow Layer** (per §17.8): `mpi.resolve(text_context, scope)` / `pfl.care_team.contactable(patient_id, purpose, channel)` / `can_access(clinician_id, patient_id, finalita, current_time)` ABAC predicate / PDTA actor lifecycle events.
- **Italian clinician identity** (per §17.13): Italian-claim JWT set continuously composed, not at login (per D.18).
- **Interaction Layer** (per §17.6): IntentRevision DAG; safety-tier state machine; three-modes-of-address router.
- **Automation Builder** (per §17.11): AIRIS-defined workflow JSON; 5 bounded AI node types + `invoke_agent` composition primitive.
- **Agent Builder** (per §17.12): wrapped-tool pattern with AIRIS-native permission/audit; agent identity AIRIS-native, never delegated.
- **Integration Builder** (per §17.10): generic plumbing for external system integration.

Implementations may swap behind contracts; subsystem identity stays AIRIS-owned. **This is the operational realization of the smart-and-open principle.**

#### 17.1 Application layer

- **Next.js 15+ on Vercel EU** (Frankfurt + Milan edges) — web frontend; App Router; server actions + API routes for application logic colocated with frontend.
- **React 19** with `useOptimistic` + `useTransition` + **Zustand intent atoms** as dual-surface speculative UI primitives (per IL §17.6 Interaction Layer; broadcasting via Supabase Realtime on private channels with RLS).
- Owns event semantics + workflow definitions + state machine authoring + UI composition.

#### 17.2 Backend services tier (per D.14)

- **Cloud Run europe-west8 (Milan)** for Python services tier; scale-to-zero CPU; warm-with-`min-instances=1` for voice pipeline. Five Python services consolidate here:
  - **hl7apy** (HL7 v2 parsing; per §17.10)
  - **Saxon-C HE + SchXslt** (CDA Schematron validation; per §17.7)
  - **Splink-Postgres `airis-mpi`** (probabilistic record linkage; per §17.8)
  - **BGE-M3 CPU mode** (Substrate L4 embeddings; per §17.4)
  - **Pipecat** (voice pipeline; per §17.6)
- **Hetzner GEX44** (RTX 4000 SFF Ada, Falkenstein) for sustained GPU workloads:
  - **MedWhisper Large ITA** (Whisper Large v3 Turbo LoRA, 4.5% WER outpatient Italian; per §17.6 IL offline replay)
  - **BGE-M3 GPU mode** (periodic re-indexing; per §17.4)
  - **Smart Turn v3 ONNX** (optional GPU; per §17.6 IL turn detection)
- **Docker on-prem agent (Medplum-Agent pattern)** inside hospital perimeter for HL7 v2 MLLP + FSE 2.0 submission where regional perimeter requires; outbound HTTPS+WS tunnel; per-hospital mTLS from Infisical PKI (per §17.15).
- **Steady-state cost ~€500-700/mo per launch hospital** before LLM tokens and storage.

#### 17.3 Durable execution (per D.16)

- **Inngest Pro EU (Frankfurt)** — cross-Builder durable execution layer for Agent Builder + Automation Builder + Regulatory Layer state coordination + Substrate orchestration + IL T3/T4 escalation + Event System + PFL PDTA actor durability + Core Systems composition.
- Pro tier: $75/mo, 1M executions included up to 20M add-on, payload 3MB, 100+ concurrent steps, 1000+ realtime connections, `step.sleep`/`step.sleepUntil` up to 1 year.
- **Escape hatch**: Trigger.dev v3 (Apache-2.0, self-host, similar API) documented; bounded migration cost if EU self-hosting becomes hard contractual requirement.

#### 17.4 Substrate layers (per D.17 for L6 audit)

The Consciousness Substrate is a **six-layer architecture bound by four AIRIS-native contracts.** Multi-layered, not single magic component. The "consciousness" terminology is paradigm framing for unified-event property (Part I terminology note); the technical substance is shared context and state.

- **L1 Deterministic truth**: Supabase Postgres (Team plan, eu-central-1 Frankfurt) + RLS + system-period temporal tables. Patients, encounters, appointments, documents, agent sessions, conversations. <50ms point reads.
- **L2 Real-time propagation**: Supabase Realtime **Broadcast** (NOT Postgres Changes — single-threaded bottleneck for hot paths) over Phoenix WebSocket. Private channels with RLS authorization on `realtime.messages`. Channel naming `tenant:{tenant_id}:patient:{patient_id}`. 50-200ms p95 end-to-end.
- **L3 Hot context cache**: Upstash Redis (managed in eu-central-1). DragonflyDB if cost/throughput becomes binding Phase B. <10ms. Cache miss falls through to Postgres; never a correctness issue.
- **L4 Semantic memory**: pgvector 0.8+ HNSW in same Supabase Postgres + **BGE-M3** (BAAI, 100+ languages, self-hosted on Hetzner GPU or Cloud Run CPU). <100ms top-k=20 over ≤5M vectors. Falls back to BM25/keyword.
- **L5 Contextual interpretation**: Claude Sonnet 4.6 (Bedrock EU) async via Inngest + Claude Haiku 4.5 (Bedrock EU) synchronous with prompt caching + structured outputs. <1s TTFT Haiku; Sonnet async (2-3s).
- **L6 Event sourcing / audit**: Hash-chained `consciousness_events` table generalized across all 8 subsystems via shared emitter library (per D.17). SHA-256 chain within `tenant_id` partition + daily SHA archived to immutable Backblaze B2 EU object-lock.

**Four AIRIS-native contracts**: `consciousness.read(scope, query)` / `consciousness.write(event)` / `consciousness.subscribe(channel, filters)` / `consciousness.resolve(reference, context)`.

**Reject memory frameworks as substrate**: Letta / Mem0 / Zep / Graphiti impose own semantics (paradigm-takers). Anthropic memory tool acceptable for agent-internal scratchpads (ZDR-eligible); NOT the substrate.

#### 17.5 LLM substrate

**Engine-agnostic abstraction** (per D.21). AIRIS code calls an LLM through a stable AIRIS-internal interface; the concrete engine and the deployment mode behind the interface are a per-deployment configuration choice, not a platform-wide commitment. The platform commits to the interface and the three supported deployment modes; the platform does **not** commit to any specific engine, model, vendor, or hosting topology.

**Three deployment modes supported by the abstraction** (per D.21):

- **Mode 1 — Client-local self-hosted.** LLM engine runs inside the client's environment (hospital data centre, sovereign cloud region the client controls, on-prem appliance). For clients whose procurement, regulatory posture, or sovereignty requirements demand no outbound LLM traffic.
- **Mode 2 — Online API.** LLM engine accessed via a vendor API (e.g., Claude API directly; or via a cloud inference profile). For clients comfortable with the vendor's residency and data-handling guarantees.
- **Mode 3 — AIRIS-hosted, non-HQ.** LLM engine hosted by AIRIS in a region / account distinct from HQ infrastructure, for clients who want a managed-by-us option without an outbound API dependency on a third-party vendor.

**Current concrete backend** (per D.22): **Claude API direct** (an instance of Mode 2). Used for Phase 0 development and current deployments. Specific model selection (Claude family member + version) is tracked operationally in `infra/manifest.md`, not committed in this Master Doc.

**Per-deployment selection.** At deployment time, the substrate is wired to whichever engine + mode the deployment requires. Application code, prompt assets, intent schemas, evaluation harness, and observability are identical across modes. Engine swaps are configuration, not rewrite.

**Prompt caching + SLO discipline.** Wherever the active engine supports it (Claude API does), cache reads materially cut TTFT and cost; cache hit rate is tracked as an SLO. Engines without cache support operate within their own latency budget; the abstraction does not paper over engine differences silently.

**Engines are not the substrate.** Vendor-provided "memory" or "agent" features (e.g., Anthropic's memory tool, vendor-side agent SDKs) are acceptable for agent-internal scratchpads where the vendor's ZDR / residency guarantees hold, but they are **not** the AIRIS consciousness substrate. Substrate semantics stay AIRIS-owned via the four contracts in §17.4.

**Supersession note.** Earlier framings of this section named specific engines and hosting as platform commitments (V27 / earlier-V28: "Bedrock EU primary + Mistral La Plateforme EU fallback; Phase D adds local self-hosted on Hetzner GEX44 / OVHcloud L40S"; intermediate V28: "Local Ollama as active backend; Bedrock EU + Mistral La Plateforme EU configured fallback"). All such engine names are retired as platform commitments; they remain as illustrative deployment options under the three modes above. See D.21 and D.22 for the architectural commitment and supersession history.

#### 17.6 Voice stack (Interaction Layer + Agent Builder)

- **Transport / pipeline**: Pipecat (BSD-2; AIRIS owns intent state, Pipecat owns frame transport).
- **Primary streaming STT (A/B)**: Deepgram Flux Multilingual IT (`flux-general-multi`, `language_hint="it"`) + AssemblyAI Universal-3 Pro Streaming IT (EU endpoint `streaming.eu.assemblyai.com`, up to 1,000 keyterms) + Soniox stt-rt-v4 IT (84.1% perfect-transcription rate, 1.29% pooled WER, 281ms p95 TTFS per Pipecat STT benchmark).
- **Italian medical caveat**: AssemblyAI Medical Mode does NOT support Italian (only EN/ES/DE/FR). Italian medical handled via keyterms + prompt engineering.
- **Turn detection**: Pipecat Smart Turn v3 (open ONNX, 8MB, 95.01% Italian accuracy on public test corpus, 12.6ms CPU / 3.3ms GPU).
- **VAD**: Silero v5 (<30ms).
- **Wake-word**: picovoice / porcupine (sub-100ms detection); wake variants "AIRIS, …".
- **Offline replay / audit correction**: MedWhisper Large ITA (LoRA on Whisper Large v3 Turbo, ReportAId, Hugging Face; 4.5% WER outpatient Italian) self-hosted Hetzner GPU.
- **TTS (Agent Builder primary)**: ElevenLabs Italian custom-cloned receptionist voice via Professional Voice Cloning.
- **TTS (latency fallback)**: Cartesia Sonic-3.
- **TTS (compliance backup)**: Azure Italian Neural.
- **Telephony**: Twilio (SIP + Voice + Messaging, dynamic alphanumeric sender ID in Italy).
- **Italian voice quality investment** (Phase A non-negotiable per Stage 1 Step 1.2): paid Italian voice talent recording session + listener panel + medical-receptionist consultant + Italian GP consultation. Pack workstream concern, not software workstream.
- **Reject Voiceflow, Rasa, Microsoft Bot Framework, Cartesia Voice Agent SDK, OpenAI Realtime API** as semantic owners — they impose interaction semantics, which AIRIS cannot give up.

#### 17.7 Regulatory Layer stack (Section 16)

- **State storage**: Postgres (Supabase) + partitioned monthly `regulatory_events` + hash-chained immutable audit log (per D.17 L6 pattern).
- **CDA R2 generation**: lxml for XML construction + XSD validation; deterministic narrative-from-structured-data via templated XSL.
- **Schematron validation**: **Saxon-C HE + SchXslt** (NOT lxml.isoschematron — fails on XSLT-2.0 Italian Schematron; documented infinite-loop bug). FastAPI sidecar on Cloud Run europe-west8 (per §17.2 — Saxon-C is JNI binding to C library, not Vercel-serverless deployable).
- **PAdES signing**: pyHanko PAdES B-LTA + Aruba QSCD REST (Phase A single provider; adapter pattern for multi-QSCD in Phase B).
- **Sogei reference**: `ministero-salute/it-fse-gtw-dispatcher` (AGPL-3.0 Java) — read as integration spec; AIRIS implements as REST client. NOT deployed as black box.
- **Schematron artifact mirror**: weekly via Inngest cron from `ministero-salute/it-fse-catalogs/schematron` (LDO v5.3, VPS v3.6, LAB v25, RAD v3.8, PSS v3.4, RSA v7.9, RAP v1.3, PrF v4.4, PrS v2.4, ErF v1.0, ErS v1.0).
- **Sogei certificates**: CSR via PEC to `fse_support@sogei.it` — manual renewal, no public ACME API. Lead-time alerting at T-30/T-14/T-7/T-3/T-1 days; documented runbook. Cert lifetime 1-2 yr.

#### 17.8 Patient Flow Layer stack (Section 15)

- **MPI**: Splink-Postgres (Fellegi-Sunter; Python FastAPI service `airis-mpi`) with Italian-tuned blocking + term-frequency adjustments + Metaphone Italian phonetics + conservative thresholds + human review queue + Garante DM 7.9.2023 audit. Reject OpenEMPI (functionally archived).
- **MPI thresholds**: ≥0.95 auto-link with audit; 0.7–0.95 human-review queue; <0.7 no link; conservative (false-positive-averse) Phase A.
- **Italian identity edges Phase A reality**: STP + ENI + transgender CF transition (Legge 164/1982 + Corte Cost. 221/2015 + sentenza 143/2024 removing surgical authorization; Agenzia Entrate emits new CF "agganciato al precedente") + pre-CF neonates + "Limbo" pattern (Toscana-inspired) for uncertified identities.
- **PDTA state machines**: TypeScript-XState v5 with `setup()` type safety + Inngest durable persistence (per §17.3). FHIR PlanDefinition + BPMN export compilers (`pdta-to-plan-definition.ts` + `pdta-to-bpmn.ts`).
- **Three Phase A PDTAs**: Scompenso Cardiaco + Diabete Tipo 2 + BPCO (per Stage 1 Step 1.8).
- **Reject Camunda BPMN, OpenMRS Care Pathway, Epic/Cerner adoption, EHR-wrapping** — paradigm-takers imposing concept hierarchies AIRIS cannot give up.
- **Longitudinal materialization**: `patient_timeline_v1` materialized view + Upstash Redis cache per `(patient_id, clinician_specialty, time_window)` (chart-open <500ms p95).
- **AI clinical summarization**: Claude Sonnet 4.6 (Bedrock EU) + BGE-M3 (Substrate L4) with prompt caching.
- **Handoff structure**: I-PASS as first-class events.
- **Auto-LDO at discharge**: CDA R2 v1.2 (HL7 Italia IG April 2024) via Regulatory Layer.

#### 17.9 Event System stack (Section 5)

- **Envelope**: CloudEvents v1.0.2 JSON encoding. Required attributes: `specversion`, `id` (ULID), `source`, `type`, `time`, `subject`, `datacontenttype`, `dataschema`, `data`. Extensions: `tenantid` (mandatory), `traceid`, `correlationid`, `causationid`, `actor`.
- **Event naming**: `subsystem.entity.action.version` (e.g., `regulatory.document.submitted.v1`). Past-tense for state events, imperative for commands.
- **Producer SDK**: AIRIS-internal `events.ts` wrapping `inngest.send()` + Supabase Realtime broadcast + Postgres queue insert with unified `emit(eventType, data, opts)` API. Compile-time type-checked against registry.
- **Schema authoring**: Zod / Standard Schema in `events/<subsystem>/<entity>.<action>/<vN>.ts` (one file per event type per version).
- **Runtime validation**: `@inngest/middleware-validation` on producer + consumer side; rejects mismatched events with structured error.
- **Catalog**: AsyncAPI 3 auto-generated from Zod files. EventCatalog (MIT non-enterprise core) self-hosted at `catalog.airis.it`. CI compatibility checker as hard merge gate.
- **Ingest queue**: Postgres-as-queue with `SELECT FOR UPDATE SKIP LOCKED` (~28% throughput improvement per pgqrs benchmarks). Composite index on `(status, created_at) WHERE status = 'pending'`.
- **Reject Kafka / Confluent / Solace / EventBridge / NATS** for Phase A — impose semantic models AIRIS would have to fight. Phase B+ reconsider on sustained >500 events/sec or multi-region active-active or per-event cost economics flip.

#### 17.10 Integration Builder stack (Section 11)

- **HL7 v2 parsing**: hl7apy (Italian origin — CRS4 Sardinia, MIT licensed; v1.3.5; supports HL7 v2.1 through 2.8.2; STRICT and TOLERANT validation modes). Alternative: python-hl7 (simpler API, less validation).
- **FHIR**: fhir.resources (Python) for FHIR R4/R5.
- **PAdES signing primitives**: pyHanko (shared with Regulatory Layer §17.7).
- **MLLP listener**: custom Python async pattern on Cloud Run europe-west8 + on-prem Docker agent (per §17.2) for hospital-perimeter ingest.
- **Reject BridgeLink / OIE Java engines as separate runtime** — wrong shape for Python/Node stack; Mirth-derived US-centric base; Italian regulatory connectors (FSE 2.0, NSIS, SDO) would need to be AIRIS-built regardless.
- **Architectural line with Regulatory Layer**: peer subsystems, not nested. Integration Builder owns transport mechanics (MLLP listener, SOAP envelope construction, mTLS, retry queues, certificate rotation). Regulatory Layer owns stateful compliance orchestration (lifecycle states, IHE associations, retention obligations, Schematron pipeline, signing pipeline, audit trail, ESITO handling, regional onboarding).

#### 17.11 Automation Builder stack (Section 9)

- **Durable execution**: Inngest (shared with Agent Builder; per §17.3 and D.16).
- **Visual canvas**: React Flow (xyflow) with Workflow Editor template as starting point. **Persona reframing per V27**: clinical informaticist / operations lead authors via canvas; bedside clinicians don't. Hospital-template parameterization UI (form-based, no canvas) for everyone else.
- **Workflow representation**: AIRIS-defined JSON (canonical AIRIS-owned format, compiles to Inngest functions).
- **AI nodes shape**: 5 bounded transformation types (extract, classify, summarize, draft from template, embed) + 1 `invoke_agent` composition primitive calling Agent Builder as separately-governed subsystem. **Hard architectural rule**: AI nodes cannot do tool-using agency; that's Agent Builder territory.
- **Hospital templates**: ~15 templates Phase A covering V26 scenarios (CT-with-contrast eGFR check, pre-op questionnaire cascade, Monday-morning critical-values report, post-discharge bundle, radiology technologist report draft, others).
- **Reject n8n-as-engine** — n8n forbids replacing/rebranding the editor (de-facto $50K/year embed floor); would force AIRIS paradigm-facing UI to become n8n's.

#### 17.12 Agent Builder stack (Section 10)

- **Agent runtime language**: Python (in backend services tier §17.2).
- **Framework**: LangGraph (primary) + Pydantic (typed I/O at tool boundary).
- **LLM**: Claude API directly (NOT via Claude Agent SDK wrapper); via Bedrock EU inference profile (§17.5).
- **Voice framework**: Pipecat (shared with IL §17.6).
- **Durable execution**: Inngest (shared per §17.3).
- **Permission/Audit**: AIRIS-native (Supabase Postgres) via wrapped-tool pattern — never delegate.
- **Guardrails**: Guardrails AI (output) + custom input rails (Pydantic + Claude-as-judge).
- **Reject Vapi / Retell / Bland / Mastra / ElevenLabs Conversational AI / indigo.ai-as-platform** — they want to own the agent identity and observability that AIRIS reserves.

#### 17.13 Italian clinician identity composition (per D.18)

- **Supabase Auth EU + Custom Access Token Hook** with Italian-claim set in `app_metadata` (codice_fiscale, fnomceo_iscrizione, albo, specializzazione, current_assignment, scope_version, consent_version, break_glass_active, break_glass_expires_at).
- **Per-clinician ABAC projection** in Postgres composes consent state from Regulatory Layer at every query via `can_access(clinician_id, patient_id, finalita, current_time) → boolean` function.
- **Hospital federation Phase A**: SAML 2.0 inbound (dominant Italian vendor pattern), optional OIDC for modern hospitals.
- **Phase B path**: Keycloak self-hosted with `italia/spid-keycloak-provider` + `lscorcia/keycloak-cieid-provider` + `keycloak-cns-authenticator` bridged to Supabase as external IdP.
- **Break-glass implementation**: feature-flag-gated by Garante Provv. n. 604 del 26 settembre 2024; mechanism + default-disable + per-launch-hospital legal sign-off.
- **Session policy**: 30-min idle, 8-h absolute, step-up auth `aal=aal2` for T4 medication orders.
- **FNOMCeO has no public REST API and explicitly prohibits programmatic harvesting** (per `portale.fnomceo.it/cerca-prof/` from 18 March 2026) — clinician verification manual at onboarding.

#### 17.14 Model registry (PHI-touching ML inference)

- **Postgres table** (NOT MLflow — overkill for 5 models): `model_id | model_family | version_hash | weights_provenance | deployed_at | deprecated_at | runtime_target | italian_clinical_validation_doc | mdr_class_iib_relevance`.
- **5 PHI-touching ML entries Phase A**: BGE-M3 (§17.4), Smart Turn v3 ONNX (§17.6), MedWhisper Large ITA (§17.6), Splink (§17.8), Saxon-C HE (§17.7 — rule-based not ML but composes same audit primitives).
- **Every PHI-touching ML output carries** `{model_id, model_version_hash, weights_provenance, timestamp, tenant_id, input_hash}` satisfying union of: Garante 24+ months retention; DM 7.9.2023 art. 21 long retention with assistito right of inspection; Italian statutory medical-record retention (perpetual); EU AI Act Article 12 lifetime-of-system logging; MDR Class IIb post-market surveillance (per D.19).
- **Tenant isolation**: PHI never leaves tenant boundary in Substrate L4 (embeddings scoped to `tenant_id` in pgvector); model instances shared (deterministic functions) but requests/outputs/audit carry `tenant_id`; tenant deletion cascades through embeddings.

#### 17.15 Secrets management

- **Infisical self-hosted on Hetzner CX23** (~€4/mo; open-source MIT; Postgres + Redis via Docker Compose; encrypted storage + RBAC + dynamic secrets + audit logging + X.509 PKI for internal mTLS service certs on 90-day rotation + machine identities via Universal Auth).
- **Alternative**: Infisical EU Cloud (`eu.infisical.com`) if operational cost outweighs sovereignty marginal value.
- **Sogei FSE 2.0 mTLS X.509 client cert rotation**: manual via CSR (Sogei has no public ACME API; 1-2 yr cert validity); lead-time alerting at T-30/T-14/T-7/T-3/T-1 days; documented runbook. Acceptable manual cadence ~once/year per environment.

#### 17.16 SRE observability stack (disjoint from audit per D.17)

- **Sentry EU (Frankfurt)** for app errors + **Grafana Cloud EU** for metrics/dashboards/tracing (Mimir + Tempo) + **Better Stack** (Czech s.r.o. Prague — EU-owned; Nano bundle $25/mo annual = 40 GB logs + 40 GB traces + 40 GB metrics; ClickHouse-backed; OTel-native) for logs/uptime/on-call (replaces PagerDuty).
- **Grafana SLO tracking** for SLOs established across Stage 1 (substrate L2 broadcast latency; Event System L6 projection latency; IL P50 commit latency; PFL chart-open p95; Core Systems Garante export latency).
- **Alternative if hospital procurement extremely strict**: self-host SigNoz on Hetzner.
- **Audit observability and SRE observability are disjoint stacks** per D.17. Mixing them is the failure mode V26 paradigm rejects.

#### 17.17 LLM observability

- **Langfuse self-hosted** (committed at Stage 1 Step 1.5; reinforced across all LLM-touching steps).
- Explicit Italian medical PII masking at trace boundary.
- Cache hit rate tracked as SLO per Anthropic Claude Code engineering team learnings (April 2026).

#### 17.18 Backup 3-2-1

- **Three independent copies, two regions, off-vendor**: Supabase managed PITR (Pro+ tier, 7 days) + nightly snapshot to **Backblaze B2 EU (Amsterdam, 90-day retention)** + monthly snapshot to **Hetzner Storage Box Frankfurt (5-year retention)**.
- **L6 audit chain**: same 3-2-1 + daily hash-anchor manifest to immutable B2 object-lock (per D.17).
- **Raw HL7 archive**: B2 EU + Hetzner Storage Box replica effectively perpetual.
- **Restore testing**: monthly automated restore-to-staging + quarterly manual cross-region drill.
- **Phase A target RTO 4h, RPO 15 min** (Supabase PITR). Dedalus/GPI typically commit 4h RTO / 1h RPO at hospital tier; AIRIS Phase A matches upper bound, documents honestly.

#### 17.19 CI/CD

- **GitHub Actions monorepo** structure: `apps/web`, `services/python`, `pdta-authoring`, `event-schemas`.
- **Pre-merge gates**: TypeScript build + tests; Python mypy + pytest; npm audit + pip-audit + Snyk; gitleaks (secret leakage detection); event schema diff; AsyncAPI catalog regeneration; PDTA DSL compile; FHIR profile validation; Schematron mirror diff.
- **Deploy**: Vercel auto for web; Cloud Build → Cloud Run blue/green revisions for Python services; Hetzner GPU via SSH + `docker compose pull && up -d` with systemd watch; Inngest SDK auto-deploy.
- **No production PHI in previews** — synthetic Italian clinical data fixtures library as Phase A deliverable.

#### 17.20 MDR Class IIb change control

- **GitHub PR history + CI logs + canonical `CHANGELOG.md`** mapped to MDR §6.1 design-change records.
- **Release notes immutable in Backblaze B2 EU object-lock.**
- **AI-assisted commits tagged `Co-authored-by: Claude`** for traceability of AI-assisted development.
- **Phase B**: off-the-shelf eQMS (Greenlight Guru / Matrix) deferred.

---

#### 17.21 Italian incumbent landscape

Stage 1 cumulative finding: Italian incumbents (Dedalus, GPI, Engineering, Connect Equipe, Reply, SISS Lombardia, SOLE Emilia-Romagna) do not publish what AIRIS commits to in the engineering architecture above. No canonical event broker, no BPMN/state-machine PDTA engine with per-patient pathway state and deviation detection, no continuous-ambient intent tracking, no stateful regulatory orchestration over time, no consciousness substrate composition with AIRIS-native contracts, no Italian-specific MPI handling with the edge cases AIRIS commits to (STP + ENI + transgender CF transition + pre-CF neonates + Toscana "Limbo" pattern).

This is the empirical grounding for R.9 (breadth-of-coverage as central AGFA value prop): clear daylight from first contact for AGFA-evaluator-style technical review.

**Naming references for forward accuracy (V27)**:
- GPI's HIS is **NGH** (Next Generation HIS).
- **ClinicalKey is Elsevier's** AI clinical content + decision support product (ASL Bari first Italian deployer), NOT Reply's.
- Reply's offerings are **Appheal Reply** (admin/PRM) and **Healthy Reply + InterSystems** for regional FSE infrastructure.

---

#### 17.22 EU residency posture (per D.15)

All vendors above are EU-resident throughout Phase A. **Better Stack (Czech s.r.o. Prague) and Hetzner (German) are the only fully-EU-owned vendors** in the stack. All other vendors are EU-resident-but-US-co (Supabase Delaware C-corp on AWS Frankfurt; Vercel US-co; Cloud Run Google; Bedrock AWS; Inngest US-co; Sentry US-co; Grafana Cloud US-co) — CLOUD-Act-exposed even with EU regions.

Italian incumbents (Dedalus on Azure, GPI on AWS) are in the same Schrems-II posture as AIRIS. **AIRIS not worse, just more honest about it.**

Mitigation: EU regions throughout + DPAs with SCCs + Schrems-II analysis documented in DPIA + tested **Aruba ACN QC3 migration target** as Phase B trigger-when-needed (per D.15). EU Tech Sovereignty Package monthly monitoring cadence.

---

#### 17.23 "Doppio audit" / "post-hoc review" reconciliation

AIRIS-internal vocabulary "doppio audit" and "post-hoc review" are paraphrases. The Italian regulatory framework codifies the union of (per D.19):

- **(a)** tracciamento dell'operazione per DM 7.9.2023 art. 21
- **(b)** notifica all'interessato
- **(c)** diritto dell'assistito di prendere visione delle registrazioni effettuate (Garante Provv. 331/2015)

The AIRIS implementation (hash-chained L6 audit ledger per D.17 + Garante export SQL function per §17.4) satisfies all three. DPIA documentation should reference the regulatory primitives by their Italian names + cite the AIRIS implementation pattern that satisfies them.

---

**End of Section 17.** Cross-references to D-entries: D.12 (managed services + custom code; this section is the operational counterpart); D.14 (backend services tier deployment topology); D.15 (EU residency posture and Schrems-II mitigation); D.16 (Inngest as cross-Builder durable execution); D.17 (hash-chained L6 audit ledger); D.18 (Italian clinician identity composition); D.19 (Italian regulatory anchor union). Cross-references to Part II Sections 1-16: each subsystem's per-section detail composes with the cross-cutting engineering architecture defined here.

---

## PART III — DECISIONS AND REASONING

This Part holds the *why* behind specific AIRIS decisions — the load-bearing reasoning that future sessions might need to reference, the design tensions that were worked through and resolved, and the explicit decisions made about commitments versus open options.

Distinct from Part II (which describes *what* AIRIS is structurally) — this Part captures *why* AIRIS is that way and not otherwise. It is also distinct from Part V (Live Edges), which captures decisions still open or revisitable; Part III holds settled decisions that should not be re-litigated in normal work.

Decisions that involve VIVA-level commitments (worldview, criterion, foundational method) are not here — they live in VIVA Master Document. Part III holds AIRIS-specific decisions and reasoning. Where AIRIS decisions reference VIVA-level commitments, the references are explicit.

---

### Section 1 — Decisions Made

These are commitments already made at the AIRIS level. They should not be re-litigated in normal work; if they need to be revisited, that should be done explicitly and with awareness that the foundation is being moved.

#### D.1 VIVA is the umbrella, not a feature inside AIRIS

The previous AIRIS Master Doc (V20) framed VIVA as "AIRIS's interaction layer, inseparable from AIRIS." This framing has been retired. VIVA is the philosophical/organizational umbrella, with its own Master Document at the root of the project tree. AIRIS is the first VIVA application. Other products — including a previously-discussed concept called ChatYourBusiness aimed at small craftspeople, a future doctor-focused project mentioned in passing, and others not yet named — are potential additional VIVA applications, evaluated against the same frame.

This decision was made because the founder's worldview is genuinely larger than what fits inside a single hospital information system. Folding VIVA inward as an AIRIS feature was making the docs tractable but felt wrong, and it was the specific spot where the AIRIS work had paused.

The current tree structure (see Project Core) and the separate VIVA Master Document operationalize this decision.

#### D.2 The AIRIS interaction layer needs no special name

Once VIVA was established as the umbrella, the section of AIRIS previously called "VIVA — The Interface That Materializes" needed a new name, because it could no longer share the umbrella's name without confusion. The decision: leave it nameless and call it simply "the AIRIS interaction layer" or "the interface."

Reasoning: branded names at this layer compete with VIVA for attention without earning it; the philosophy is what's distinctive, not a product-feature brand. Candidates considered if a name was wanted: *Materia* (because it materializes), *Voce* (Italian for voice). The working default is no special name; this held up well during V21 prose review and remains the position.

#### D.3 The eleven module specs stay

The eleven specialty module specifications (Radiology, Gastroenterology/Endoscopy, Cardiology, Emergency, Nuclear Medicine, Laboratory, Pathology, Operating Room, Dialysis, Care Unit, ICU — see Part II) represent serious clinical thinking and are largely philosophy-aligned where the philosophy applies. They are not being rebuilt. The rebuild work that produced V21–V24 was foundational only.

Where a specific workflow inside a module spec contradicts the frame (e.g., a form the clinician has to fill that should be absorbed by the system, a manual step that violates displace-vs-extend), it gets a surgical revision when surfaced. There is no general module-by-module rewrite. The modules are protected.

Cross-cutting patterns from earlier module audit work (V21 era) were applied in V23. Remaining module-specific touchpoints are pending clinical validation in Phase C of the production plan (Part IV) when hospital relationships and clinical partners are available. The audit content has been absorbed into V28; no separate audit document is part of the Moving Structure.

#### D.4 Three Pillars structure dropped, replaced by The Stance

The "Three Differentiating Pillars" structure (Unified System / VIVA / Agents & Automations) presented these as three coordinated features that combine into transformation. This was replaced in V21 by single-stance framing in which the unified data, the interface paradigm, and the executing-but-not-deciding agents are described as three connected expressions of one underlying commitment, not three independent good things stacked. The replacement section is titled "The Stance" and lives in Part I.

Reasoning: the three-pillars framing was suggested by AI assistance during earlier AIRIS work without the founder being clear on why three. On reflection, it presented AIRIS as a feature-stack-product when AIRIS is actually a stance-product. The three things only become transformative *together*, because together they constitute one coherent stance.

#### D.5 Regulations get a Regulatory Layer architecture

Italian healthcare regulatory work (FSE 2.0, SDO compilation, NSIS flows, codice fiscale handling, AI Act compliance, EU MDR classifications, GDPR for clinical data, IEC 62304 for software lifecycle, regional variations) is real and large. The decision was to architect this as a *Regulatory Layer* — structurally separate from clinical workflow — whose job is to maintain translation between AIRIS's internal data/events and what the institutional/legal world requires externally.

This solves the worry that pre-committing to current regulatory specifics will force rework when regulations change. When regulations change, the Regulatory Layer absorbs the change. The modules and clinical workflows stay untouched. The clinician never knows.

The Regulatory Layer is now specified as Section 16 of Part II (CORE System Components).

#### D.6 "AI-native" language retired

The phrase "AI-native hospital information system" appeared in early V20 doc. It was retired. AIRIS is not AI-native. AIRIS is *clinician-native* and uses AI as one of its means. The phrase puts technology at the center of the product's identity; the frame puts the clinician at the center.

#### D.7 Documentation structure: tree of Master Documents (since V24)

V20–V23 operated under the principle "the AIRIS Master Doc is the single authoritative source for everything AIRIS, including technical architecture. There is no separate technical architecture document."

In V24, this evolved to a multi-Master-Doc tree structure: each project (VIVA, AIRIS, future applications) gets its own Master Document; sub-content lives within parent Master Docs as sections. Single-source-per-project, not single-source-overall.

The reasoning: as VIVA grew beyond AIRIS, putting all VIVA content inside the AIRIS Master Doc would have made AIRIS Master Doc bloated with content not specifically about AIRIS. Future VIVA applications would have either duplicated VIVA content or referenced AIRIS Master Doc oddly. The tree structure with one Master Doc per coherent project scales naturally.

See VIVA Master Document Section 5 ("Cross-Application Principles") for the principle, and Project Core ("The Tree" section) for the operational structure.

#### D.8 The interaction paradigm is the dual-surface paradigm (since V25)

The earlier framing — "the materialization paradigm" — has been retired. AIRIS's interaction paradigm is the **dual-surface paradigm**, articulated in full at VIVA Master Document Section 6. Two surfaces working together: a conversation surface (the channel for intent, voice and text input, brief system confirmation and feedback) and a content surface (where the system's state, data, and views live, fully manipulable, fully featured). The two are perfectly synchronized through a single underlying state. Every action is available on both surfaces — no action locked to one. The user picks whichever surface fits the moment, never penalized.

Reasoning: the principle (least time and effort) cannot be served by any single form of interaction. Voice is fastest for some moments; clicking is fastest for others; ambient inference handles many without any interaction. A single-mode interface fails the principle for the moments that don't fit it. The dual-surface paradigm exists so that no moment is penalized. Materialization remains *one form* the conversation surface can take when it needs to — a brief surface that appears for ambiguity-resolution or high-stakes confirmation, then dismisses — but it is not the paradigm. The paradigm is the dual-surface architecture, of which materialized surfaces are a small piece.

This decision is foundational and applies to every VIVA application, not just AIRIS. For AIRIS implementation specifics, see Part II Section 8 (The Interaction Layer) and Part IV (the Production Plan, particularly Phase 0 — Exploration, where the actual implementation patterns are tested).

#### D.9 The production plan includes a Phase 0 — Exploration (since V25)

The four-phase arc (Real Thing → Finding the Way → Deep Professional Phase → Production Refinement) has been preceded by a new Phase 0 — Exploration. This is not a delay before "real work begins"; it is real work of a specific kind: building small things to test approaches, trying multiple options for the same problem, learning what actually works through doing rather than through reasoning.

Reasoning: the principle that technology choices are servants (V21+ commitment) is correct, but the practical implication wasn't sharp enough in V24. Decisions about how to implement the interaction paradigm, how to build the consciousness substrate, what tech stack to use, which AI coding tools fit best — these cannot be made well by reasoning alone. Reasoning produces hypotheses; testing produces intuitions; intuitions inform real decisions. Going straight from V24's plan ("Phase A: build AIRIS") to writing production code would mean making many major decisions based on reasoning alone, with the cost of being wrong being substantial. Phase 0 produces real intuitions before the real build commits.

Phase 0 also doubles as continued Master-Doc work — exploration surfaces things that inform V25, V26, etc. It is not a coding-only phase; it is a Master-Doc-and-coding-together phase. Output: real intuitions, real architectural decisions, real tech choices, the actual plan for Phase A that can be executed rather than reasoned.

This decision is VIVA-level in principle (see VIVA Master Document Section 5, "Technology choices are servants, not commitments — and are chosen by exploration, not by reasoning alone"). For AIRIS, the explicit Phase 0 structure lives in Part IV Section 2 (which has been substantially refactored in V25).

#### D.10 Phase A scope is qualitative coverage of distinctive kinds, not quantitative module coverage (since V26)

V25's Phase A scope committed to "all eleven modules functional end-to-end" at production-equivalent quality, plus all three Builders, plus the Regulatory Layer, plus the paradigm and substrate at production quality. V26 reshapes this around what the AGFA evaluation bar actually requires: qualitative proof that each *kind* of distinctive AIRIS capability is real, not quantitative coverage of every module at the same depth.

The reshaped scope:

- **All eleven modules present, depth varying.** Radiology built deep enough to prove the paradigm + interaction layer + consciousness substrate work end-to-end. One additional module (typically the orderer for cross-module flow demonstration) built deep enough to exchange orders with Radiology. The remaining nine present and architecturally real but with workflow depth limited to what conveys "this is the shape of this module" rather than "this module is complete." Each module visible as a market opportunity AGFA could expand into; none faked.
- **All three Builders fully working at production discipline.** Automation Builder, Agent Builder, Integration Builder — each is its own distinct value proposition to AGFA (each represents a platform capability they don't have in their current line). None can be reduced or skipped without removing a market-opening capability from what AGFA sees.
- **Regulatory Layer real with at least one Italian artifact.** Production-discipline generation of one real artifact (e.g., FSE 2.0 CDA R2 document or SDO XML) from clinical activity in the deep module. Demonstrates the architectural pattern of institutional/legal translation as a discrete layer.
- **Cross-module flow demonstrated** through Radiology plus the additional deep-enough module exchanging orders through unified data, not HL7. Distinctive AIRIS capability per Part II Section 6.
- **Interaction layer + consciousness substrate working on the deep parts.** The paradigm runs across all eleven modules as architecture (both surfaces present, synchronization wired), but the *depth* of interaction is bounded by what's implemented per module.

Unified Data is demonstrated implicitly by everything running on a single database. Module Independence is demonstrated implicitly by the deep module being a complete self-sufficient product alongside Core.

Reasoning: V25's quantitative bar ("all eleven modules at production-equivalent") was an aggregated number that didn't map cleanly to what an AGFA evaluator actually needs to be convinced. What convinces is qualitative — does the philosophy work, is each distinctive capability real, does the breadth-of-coverage demonstrate the expansion opportunity AGFA would be acquiring. One deep module proves the philosophy. All three Builders prove the platform-capability story. All eleven modules visible at honest depth prove the breadth-of-coverage value proposition. Quantitative deepening of every module is what Phase C (clinical co-design) and Phase D (deployment work) deliver, with hospital relationships and clinical partners that Phase A doesn't have.

This is a scope reduction, not a quality reduction. The quality bar within scope rises in V26 (see D.11); the scope of what's within bar contracts to what's qualitatively load-bearing for AGFA evaluation.

Cross-references: Part I Scope (small adjustment to clarify demonstration approach), Part IV Section 3 (Phase A reshape), Part V Section 5 (Tech Choices Status committed accordingly).

#### D.11 Single quality bar across phases: production discipline within scope, honest absence outside scope (since V26)

V25 distinguished between things at "production-equivalent quality" and things at "working quality" and things at "prototype quality" within Phase A. This distinction was always fuzzy in practice — what's the test for "production-equivalent" versus "working"? Where exactly does each Phase A subsystem sit? — and it leaked through to confusion about what discipline applied to what code.

V26 retires the split. One quality bar: **production discipline** on everything built. Anything not built is **honestly absent** — not faked, not hidden behind placeholders that pretend to work, not built-but-broken. Scope decisions (what's built, what's deferred) are now where the choices live; quality is uniform within scope.

What "production discipline" means concretely: real error handling, real types, decent abstractions, real tests for load-bearing logic, audit trails working, security baseline reasonable, performance adequate for realistic evaluation use. This is what an AGFA evaluator can push on without finding visible compromise. It is *not* the bar for hospital deployment (IEC 62304-certified, security-audited, validated against a clinical-validation protocol, integrated with real hospital systems, certified for real Italian regulatory submission) — that bar lives at Phase D and is composed of workstreams *around* the same code, not different code (see R.10).

What "honest absence" means concretely: the seven other modules whose depth is bounded show their architectural shape (data model, conversation surface, content surface, event emission, regulatory hooks) without pretending workflows are fully implemented when they aren't. An evaluator clicking on a deferred workflow finds an honest "this is the shape, full depth lives in Phase C" affordance rather than a half-working button that fails silently. The visibility of partial-ness is itself a strategic statement: "here is the market opportunity, here is what the architecture supports, here is what we build with your resources and our clinical relationships post-acquisition."

Reasoning: the V25 three-tier quality split was inherited from earlier doc versions and never sharpened. In practice it generated more confusion than clarity. The V26 framing has a single test ("is this real and complete within its scope?" yes or no) and a single mode of disclosure ("if it's not in scope, say so visibly"). This is more honest, easier to apply, and produces a system that withstands evaluator probing more reliably than a system where some parts are "production-equivalent" and others are "working" with no clear seam between them.

Cross-references: Part IV Section 3 (Phase A description rewritten around the single bar), R.10 (the relationship between Phase A code and later-phase workstreams).

#### D.12 Tech stack committed: managed services + custom application code (since V26; expanded V27)

V25 left most tech choices explicitly "to be tested in Phase 0." Strategic clarity reached in V26 narrowed the candidate space substantially, and the strategic-level commitment is: **managed services + custom application code; AIRIS owns paradigm-load-bearing semantics, vendors provide primitives.** Stage 1 (Engineering Scope Pass) + Stage 2 (Tech Stack Revisit) confirmed this strategic-level commitment in full at all 9 subsystem analyses and substantially expanded the operational stack with 21 subsystem-specific commitments.

**V27 retains the strategic commitment from V26 D.12:**

- **Frontend:** Next.js (React, App Router). Mature, AI coding tools work excellently with it, strong ecosystem fit, supports the dual-surface paradigm's synchronization patterns natively through the App Router's server/client component model.
- **Application backend:** Next.js server actions and API routes for application logic colocated with the frontend. **Python services tier (FastAPI + asyncio) for LLM orchestration + consciousness substrate inference + CDA validation + record linkage + voice pipeline + protocol parsing — RESOLVED Python before Phase 0 starts** (V26 left this as "Python or TypeScript Node, narrow validation in Phase 0"; Stage 1 Step 1.9 resolved).
- **Database:** Supabase Postgres for Phase A development and AGFA-demonstration deployment. Migration path to self-hosted Postgres for on-prem hospital deployment in Phase D. Same Postgres, different hosting. Aruba ACN QC3 documented as additional migration target if EU Tech Sovereignty Package binding regulation lands or launch hospital procurement explicitly demands EU-owned — see D.15.
- **Real-time sync:** Supabase Realtime **Broadcast** (NOT Postgres Changes — single-threaded bottleneck for hot paths per Stage 1 Step 1.5) over Phoenix WebSocket. Private channels with RLS authorization. Built on Postgres logical replication; self-hostable; architecture migrates with the database.
- **Auth:** **Supabase Auth EU + Custom Access Token Hook with Italian-claim set in `app_metadata`** — RESOLVED before Phase 0 (V26 left this as "Supabase Auth or Clerk, decision can defer slightly"; Stage 1 Step 1.9 resolved). Italian claims: codice_fiscale, fnomceo_iscrizione, albo, specializzazione, current_assignment, scope_version, consent_version, break_glass_active, break_glass_expires_at. See D.18.
- **Deployment:** Vercel EU (Frankfurt + Milan edges) for web; full backend services tier deployment topology per D.14 (Cloud Run europe-west8 Milan + Hetzner GEX44 Falkenstein + Docker on-prem agent for hospital perimeter). Dedicated infrastructure for production deployment in Phase D.
- **AI coding tool:** Claude Code primary; Cursor as alternative subject to Phase 0 head-to-head validation on AIRIS-style work. **Remains a Phase 0 micro-choice** (not revisited in Stage 1).
- **LLM:** **AWS Bedrock EU inference profile for Claude (Anthropic first-party EU "Coming 2026") + Mistral La Plateforme EU as fallback** (default EU residency). V26's "three-backend abstraction (hospital-local / AIRIS-hosted / online API)" reframed: Phase A is EU-resident online API (Bedrock EU primary + Mistral EU fallback); Phase D on-prem possibility preserved through abstraction. Anthropic memory tool acceptable for agent-internal scratchpads (ZDR-eligible); NOT the substrate. Prompt caching mandatory + SLO discipline per Anthropic's Claude Code engineering team learnings (April 2026); explicit handling required for March 2026 cache TTL change for automations >5min apart.
- **Version control:** Git (unchanged from prior).
- **Code organization:** Monorepo for solo + AI work. Structure: `apps/web`, `services/python`, `pdta-authoring`, `event-schemas`. AI coding tool context simplified; cross-module refactoring tractable.

**The V26 strategic reasoning holds:** the dual-surface paradigm's real-time bidirectional state synchronization between surfaces at low enough latency that the conversation-surface action and the content-surface state change feel like one event narrowed candidate space significantly. Stacks that fight real-time sync drop out. Supabase wins on Phase B / Phase D migration story (clean path to self-hosted Postgres + open-source Realtime) over Convex's vendor-platform lock.

**This is a commitment, not a hypothesis** — most of the candidate elimination happened by strategic reasoning grounded in V26 broader frame (D.10, D.11, D.13, R.9, R.10); Stage 1 + Stage 2 engineering scope work confirmed and substantially expanded the operational stack.

**Phase 0 work that remains** (the surviving micro-choices): Claude Code vs Cursor empirical head-to-head; paradigm-prototype real-time-sync feel test per the CT Scheduling Paradigm Prototype Sketch from Stage 1 Day 1. **NOT** Python vs TypeScript orchestration service (resolved Python before Phase 0); **NOT** Supabase Auth vs Clerk (resolved Supabase Auth EU + Italian-claim Custom Access Token Hook before Phase 0).

**Six new D-entries operationalize D.12 at the engineering-architecture level:**
- **D.14** — Backend services tier deployment topology (Cloud Run europe-west8 + Hetzner GEX44 + Docker on-prem agent)
- **D.15** — EU residency posture and Schrems-II mitigation
- **D.16** — Inngest as cross-Builder durable execution layer
- **D.17** — Hash-chained L6 audit ledger as cross-subsystem regulatory observability
- **D.18** — Italian clinician identity composition
- **D.19** — Italian regulatory anchor union

**The complete operational tech-stack inventory** (21 commitments organized by tier: application layer + backend services tier + durable execution + substrate layers + LLM + voice stack + per-subsystem stacks + Italian clinician identity composition + model registry + secrets + observability split + backup + CI/CD + MDR change control) lives in **Part II Section 17 — Engineering Architecture**. D.12 anchors the strategic commitment; D.14-D.19 capture paradigm-level decisions; Section 17 holds the technical inventory.

Cross-references: Part II Section 17 (Engineering Architecture — comprehensive technical inventory); D.14-D.19 (paradigm-level operational decisions); Part V Section 5 (Tech Choices Status — entries moved from "to be tested in Phase 0" to "committed"); Part IV Section 2 (Phase 0 narrowed further by Stage 1 + 2 resolutions); Part IV Section 3 (Phase A uses this stack); R.10 (code same throughout phases; migration paths preserved).

#### D.13 The pack is the Phase A deliverable, not software alone (since V26)

Phase A's deliverable to AGFA is reframed as a **pack** — multiple coordinated artifacts that together demonstrate trajectory, not software alone. The software is one piece; the rest is what makes the software's significance legible:

- **Working software** at the scope and quality bar specified in D.10 and D.11
- **Business model articulation** — how AIRIS becomes a sustainable product, pricing patterns, deployment economics, the relationship to hospital procurement realities
- **Vision document** — what AIRIS becomes when fully realized, why the breadth matters, why now
- **Timeline** — what Phase C, Phase D, and post-deployment look like with AGFA's resources; the credible path from Phase A's pack to hospital-deployable systems and beyond
- **Market analysis per module's territory** — for each of the eleven modules, what market AGFA could expand into, market size, competitive landscape, AIRIS's distinguishing fit
- **Regulatory roadmap** — what certification (IEC 62304, MDR), regulatory submissions (FSE 2.0, SDO, NSIS), and compliance work happens when and at what cost; how it sequences against deployment milestones
- **AGFA-specific narrative** — the tying-together: why AIRIS's breadth is AGFA's expansion path, why AIRIS's architecture is what makes the breadth tractable rather than burdensome, why the pack as a whole is more valuable than the sum of its parts

Reasoning: AGFA acquisition or partnership is rarely decided on software demonstration alone. Strategic acquirers buy trajectory — they buy what the work *becomes* with their resources, not what the work is in isolation. Solo + AI Phase A produces software that demonstrates feasibility; the surrounding pack artifacts demonstrate the trajectory that turns feasibility into category-defining product. Without the pack, the AGFA conversation is "look at this impressive software"; with the pack, the conversation is "look at this trajectory, here are the eleven markets, here is the credible path." The latter is the conversation that produces the outcome Phase B seeks.

The pack workstreams run alongside the software work in Phase A, not after. Some of the pack work informs the software (the regulatory roadmap clarifies what the Regulatory Layer needs to demonstrate; the market analysis per module informs which module gets the deeper build); some of the software work informs the pack (the working software is what the vision document points at, the demonstrable capabilities are what the market analysis per module is anchored to). Treating the pack as a Phase A workstream rather than as Phase B's preparation prevents the pack from being rushed and prevents the software from being built without strategic grounding.

Cross-references: Part IV Section 3 (Phase A reshape — pack workstreams added as subsections), R.9 (breadth-as-value-proposition framing the pack rests on).

#### D.14 Backend services tier deployment topology (since V27)

Stage 1 + Stage 2 resolved the backend services tier deployment topology that V26 D.12 deferred to Phase 0 ("separate service layer... narrow validation in Phase 0"). The decision affects all 9 Stage 1 subsystems and was deferred from Steps 1.1, 1.4, 1.5, 1.6, 1.7, 1.8 before resolving at Step 1.9. **The topology is:**

- **TypeScript application layer** owns event semantics + workflow definitions + state machine authoring + UI composition: **Next.js on Vercel EU** (Frankfurt + Milan edges).
- **Python services tier** handles ML workloads + CDA validation + record linkage + protocol parsing + voice pipeline: **Cloud Run europe-west8 (Milan)** for scale-to-zero CPU + warm-with-`min-instances=1` for voice. Five Python services consolidate here (hl7apy for HL7 v2 parsing; Saxon-C HE + SchXslt for CDA Schematron validation; Splink-Postgres for MPI; BGE-M3 CPU mode for Substrate L4 embeddings; Pipecat for voice pipeline).
- **GPU sustained workloads**: **Hetzner GEX44** (RTX 4000 SFF Ada, Falkenstein) for MedWhisper Large ITA batch + BGE-M3 GPU + optional Smart Turn ONNX. EU-owned (German), ~4-5× cheaper than hyperscaler GPU at predictable spend, Schrems-II clean.
- **On-prem agent**: **Docker (Medplum-Agent pattern)** inside hospital perimeter for HL7 v2 MLLP + FSE 2.0 submission where regional perimeter requires. Outbound HTTPS+WS tunnel; per-hospital mTLS from Infisical PKI. Avoids the failure mode of expecting hospitals to whitelist inbound traffic to cloud services.

**Steady-state cost: ~€500-700/mo per launch hospital before LLM tokens and storage.**

Reasoning: ML workloads + CDA validation + protocol parsing + record linkage all have stronger Python ecosystem support than TypeScript; the language choice for the services tier follows the workloads, not preference. EU residency is non-negotiable; Cloud Run europe-west8 is the only Italian-soil scale-to-zero option at hyperscaler quality. Hetzner GPU at predictable per-month pricing beats hyperscaler GPU at usage-based pricing for the sustained-batch workloads (MedWhisper Large ITA batch on synthetic audio for offline replay; BGE-M3 GPU for periodic re-indexing). On-prem agent pattern follows established healthcare integration practice (Medplum-Agent is the reference) and avoids the failure mode of hospital network perimeter assumptions.

Cross-references: D.12 (this operationalizes the "separate service layer" framing); D.15 (EU residency posture); D.16 (Inngest sits in this topology); Part II Section 17 (full operational detail).

#### D.15 EU residency posture and Schrems-II mitigation (since V27)

Stage 1 surfaced an explicit EU residency dimension that V26 D.12 did not address ("deployment dedicated infrastructure for Phase D" without specifying EU-resident-throughout-Phase-A vs EU-owned-where-feasible). **V27 commits to EU regions throughout Phase A with Schrems-II honest mitigation:**

- **EU regions throughout**: Vercel EU (Frankfurt + Milan edges) + Supabase EU (eu-central-1 Frankfurt) + Cloud Run europe-west8 (Milan) + Inngest EU (Frankfurt) + Bedrock EU inference profile + Mistral La Plateforme EU + Sentry EU + Grafana Cloud EU + Backblaze B2 EU (Amsterdam) + Upstash Redis (eu-central-1).
- **EU-owned where feasible**: **Better Stack (Czech s.r.o. Prague) and Hetzner (German)** are the only fully-EU-owned vendors in the recommended stack. All other vendors are EU-resident-but-US-co (Supabase Delaware C-corp on AWS Frankfurt; Vercel US-co; Cloud Run Google; Bedrock AWS; Inngest US-co; Sentry US-co; Grafana Cloud US-co). CLOUD-Act-exposed even with EU regions.
- **Schrems-II mitigation**: EU regions throughout + DPAs with SCCs + Schrems-II analysis documented in DPIA + tested Aruba ACN QC3 migration target as Phase B trigger-when-needed.
- **Aruba Cloud documented as migration target**: ACN QC3 qualified, Italian-soil DCs (Bergamo + Arezzo + Rome), Rating IV ANSI/TIA-942, EU-only governance. Documented migration path; Hetzner GPU node already proves EU-owned portability. **Trigger criteria** (per Stage 2 resolution): (a) EU Tech Sovereignty Package binding regulation lands (draft 27 May 2026 per CNBC reporting; final form/scope/timeline uncertain), or (b) launch hospital procurement explicitly demands EU-owned at contract negotiation. **Not pre-built as Phase A insurance** — pre-building for an event that may not happen is premature.
- **EU Tech Sovereignty Package monthly monitoring cadence**: Commission communications + Italian government implementing decrees. Treat as forward-planning input, not settled mandate.

Reasoning: Italian incumbents (Dedalus on Azure, GPI on AWS) are in the same Schrems-II posture as AIRIS — AIRIS is not worse, just more honest about it. Stage 1 cumulative evidence is that Italian healthcare procurement does NOT systematically reject EU-resident-but-US-co vendors today; the EU Tech Sovereignty Package could change this but is not yet binding. The migration path being documented + tested-against-Hetzner-already-EU-owned proves portability without committing to migration pre-emptively.

Cross-references: D.12; D.14 (deployment topology lives in EU regions); Part V Section 4 (Schrems-II + EU Tech Sovereignty Package + NIS2 risks); Part II Section 17 §17.16-17.18 (observability stacks; backup with Backblaze B2 EU + Hetzner Storage Box Frankfurt).

#### D.16 Inngest as cross-Builder durable execution layer (since V27)

Stage 1 Step 1.2 raised the question of durable execution layer; Step 1.3 resolved Inngest; Steps 1.4 + 1.5 + 1.6 + 1.7 + 1.8 + 1.9 reinforced. **V27 commits Inngest as the durable execution layer across all three Builders + Regulatory Layer + Substrate orchestration + IL T3/T4 escalation + Event System.**

- **Inngest Pro EU (Frankfurt)** — $75/mo with 1M executions included up to 20M add-on; payload 3MB on paid tier; 100+ concurrent steps; 1000+ realtime connections; `step.sleep` / `step.sleepUntil` up to 1 year.
- **Durable execution shape across subsystems**: Agent Builder uses event-driven steps with durable resumes from tool calls + HITL gates; Automation Builder uses deterministic step graphs with branching + time waits + scheduled triggers; Regulatory Layer uses `step.waitFor` for ESITO-style pause-and-resume + bulk Replay for re-submission + durable LTA refresh sweeps; Substrate orchestration uses event sourcing + projection rebuilds + async LLM resolution; IL T3/T4 escalation uses async re-grounding via Inngest; Event System Pro tier is the broker itself; PFL uses Inngest for PDTA actor durability + milestone scheduling + deviation event fan-out; Core Systems composes Inngest at topology level + per-clinician scope_snapshot carried through automations + DLQ events into L6 audit chain.
- **One real cost**: Inngest is proprietary hosted-only. If EU self-hosting becomes a hard contractual requirement before Phase A ships, **Trigger.dev v3 (Apache-2.0, self-host, similar API)** is documented escape hatch with bounded migration cost. Temporal would be a near-total rewrite.
- **Threshold for revisit**: ~10+ facilities (Pro overage motivates Enterprise quote, not publicly available, negotiate before second facility onboarding) or hard EU-sovereignty procurement gate (trigger Trigger.dev migration).

Reasoning: solo+AI engineering reality is that Inngest has lowest operational overhead from "I have a Next.js app" to "I have durable workflows." Temporal demands weeks of onboarding and a cluster; n8n queue mode demands Redis + workers + license negotiation. Single layer benefit: shared observability, shared mental model, shared deployment posture, single point of operational learning.

Cross-references: D.12; D.14 (Inngest sits in the EU deployment topology); Part II Section 17 §17.3 (durable execution); Part V Section 4 (Inngest Enterprise negotiation timing as open risk; Trigger.dev v3 as documented escape hatch).

#### D.17 Hash-chained L6 audit ledger as cross-subsystem regulatory observability (since V27)

Stage 1 Step 1.5 originated the hash-chained L6 audit ledger pattern for the Consciousness Substrate's `consciousness_events`; Step 1.9 generalized it across all 8 subsystems via a shared emitter library. **V27 commits the hash-chained L6 audit ledger as the canonical cross-subsystem regulatory observability mechanism.**

- **Canonical event schema**: `event_id (uuid) | prev_hash (sha256 of previous event in tenant chain) | content_hash (sha256 of canonical-JSON) | tenant_id | event_type | actor | subject | finalita | consent_state_snapshot | scope_snapshot | context | timestamp_utc | source_subsystem | model_provenance`
- **Chain pattern**: SHA-256 within `tenant_id` partition. Tampering invalidates chain from that point forward.
- **Daily SHA of latest tenant chain head** archived to immutable Backblaze B2 EU (Amsterdam) object-lock. **Pre-image-resistant SHA-256 + offline anchor satisfies inalterabilità tecnica per Garante.** Blockchain regulatorily unnecessary and operationally infeasible solo+AI.
- **Emission sources**: Substrate L6 (`consciousness_events`); Regulatory Layer state transitions + ESITO + FSE submission events; Event System DLQ events; Integration Builder HL7 v2 ingest; Patient Flow Layer MPI identity decisions + PDTA deviation events + clinical handoff events; Interaction Layer voice session events + T3/T4 escalations; Agent Builder agent actions audited `actor=agent:<id>`; Core Systems clinician authentication + secret access + model registry events.
- **Audit observability and SRE observability are disjoint stacks**: Postgres L6 + cold object storage for regulatory (slow, complete, inalterable, DPO/Garante access, schema-stable, long retention); Grafana Cloud EU + Sentry EU + OpenTelemetry for SRE (fast, sampled, founder/on-call access, schema-volatile, short retention). **Mixing them is the failure mode V26 paradigm rejects.**
- **Query infrastructure**: Postgres index on `(tenant_id, subject, timestamp_utc)` + materialized view `audit_event_patient`. SQL function `garante_export(tenant_id, patient_id, date_from, date_to)` emits CSV + JSON + chain proof.

Reasoning: Italian regulatory composition (Garante Provv. 331/2015 + DM 7.9.2023 art. 21 requiring finalità as required field on every clinician audit event) makes inalterable audit a legal anchor, not aesthetic preference. The hash-chain + daily offline anchor is stronger-than-required engineering choice highlighted to evaluators as defense-in-depth.

Cross-references: D.19 (Italian regulatory anchor union driving the requirement); Part II Section 13 (Audit Trail subsystem); Part II Section 17 §17.4 (substrate L6) + §17.16 (SRE observability disjoint from audit); Part V Section 4 (Garante audit at month 9 risk; synthetic-load chain from day one mitigation).

#### D.18 Italian clinician identity composition (since V27)

Stage 1 Step 1.9 resolved Italian clinician identity composition as a paradigm-load-bearing concern. **V27 commits to Supabase Auth EU + Custom Access Token Hook + per-clinician ABAC projection composing the union of Italian identity primitives.**

- **JWT claims in `app_metadata`** (Italian-specific): `codice_fiscale` (16-char Agenzia Entrate), `fnomceo_iscrizione` (Albo Unico Nazionale entry; manual verification at onboarding — FNOMCeO has no public REST API and explicitly forbids programmatic harvesting), `albo` (Ordine provinciale), `specializzazione` (per Albo specialistico), `current_assignment` (department × ward × roster slot × shift), `scope_version` (monotonic version of clinician's effective scope), `consent_version` (monotonic version of patient consent state composition), `break_glass_active` (boolean), `break_glass_expires_at` (TTL on elevated scope).
- **Per-clinician ABAC projection** in Postgres composes consent state from Regulatory Layer at every query via `can_access(clinician_id, patient_id, finalita, current_time) → boolean` function. Pure ABAC over RBAC envelope (RBAC roles: `medico_ospedaliero`, `specialista`, `infermiere_case_manager`, `OSS`, `farmacista`, `caregiver_familiare`, `amministratore_di_sostegno`).
- **Hospital federation Phase A**: SAML 2.0 inbound (dominant Italian vendor pattern), optional OIDC for modern hospitals. Attribute mapping per hospital onboarding. Deprovisioning when clinician leaves hospital propagates via SAML logout + Postgres clinician projection update.
- **Phase B path**: Keycloak self-hosted with `italia/spid-keycloak-provider` + `lscorcia/keycloak-cieid-provider` + `keycloak-cns-authenticator` bridged to Supabase as external IdP. Deferred Phase B — Italian clinicians don't in practice log in via SPID; Keycloak side-realm operationally non-trivial solo+AI; activates when patient-facing flows ship (taccuino, delega).
- **Break-glass implementation**: Feature-flag-gated by Garante Provv. n. 604 del 26 settembre 2024 (doc. web 10061545). Until PSS compiled in ≥70% of fascicoli nazionalmente, break-glass access without consent NOT permitted; AIRIS implements mechanism + default-disable + per-launch-hospital legal sign-off. Three Garante preconditions: impossibilità fisica / incapacità d'agire / incapacità naturale + rischio grave, imminente e irreparabile + non-darkened data. TTL on elevated scope 60-120 min default. Notify assistito per Garante right "di prendere visione delle registrazioni effettuate."
- **Session policy**: 30-min idle, 8-h absolute, step-up auth `aal=aal2` for T4 medication orders (re-prompt with `aal=aal2` transition logged per Part II Section 8 IL safety tier).

Reasoning: Italian identity primitives are genuinely textured (CF + FNOMCeO + Ordine + specializzazione + ASL credentials + hospital badge + TS-CNS smart cards) with no clean managed-service answer that composes them all. AIRIS owns "who is this clinician, in what role, with what consent scope, with what PDTA access" continuously composed — not at login. The smart-and-open principle test rejected healthcare-specific identity platforms (Yookey ID, Aruba Identity) as Phase A choice because they target citizen-side SPID/CIE not clinician composition.

Cross-references: D.12; D.17 (Italian-claim audit events into hash-chained L6 ledger); D.19 (Italian regulatory anchor union); Part II Section 14 (User Management & Security); Part II Section 16 (Regulatory Layer — consent state composition); Part II Section 17 §17.13 (full composition detail).

#### D.19 Italian regulatory anchor union (since V27)

Stage 1 Steps 1.4 + 1.6 + 1.8 + 1.9 cumulatively surfaced that Italian healthcare regulation is composed from a **union of frameworks**, not any single law. **V27 commits that AIRIS-internal documents reference the union, not any single member.**

**The Italian regulatory anchor union:**
- **Garante Provv. n. 331 del 4 giugno 2015** (Linee guida Dossier sanitario): clinician access only for personale sanitario coinvolto nella cura; every operation tracked + registered automatically; retention ≥24 months; inalterable.
- **DM 7 settembre 2023 art. 21**: finalità (purpose-of-access) as required field on every clinician audit event; long retention; assistito right of inspection.
- **DM 30 dicembre 2024 art. 27-bis** (transitorio): three phases (Fase 1 31 marzo 2025 oscuramento automatico + registrazione accessi; Fase 2 30 settembre 2025 PSS + Taccuino + deleghe + minor access; Fase 3 31 marzo 2026 full content + private structures + alimentation within 5 days).
- **Garante Provv. n. 604 del 26 settembre 2024** (doc. web 10061545): break-glass FSE access without consent not permitted until PSS ≥70% nationally; per-hospital legal sign-off required.
- **Legge 23 settembre 2025, n. 132 Art. 7**: AI in healthcare is supporto, clinician ultimate decision authority preserved; affidabili, periodicamente verificati e aggiornati. High-level — does NOT itself prescribe traceability/audit/data-residency.
- **EU AI Act Art. 12**: automatic recording of events over lifetime of system; minimum 6-month retention unless other law requires longer. Article 6/Annex III high-risk enforcement: 2 August 2026 unless Digital Omnibus delay enacted. Penalty up to €15M or 3% worldwide annual turnover.
- **EU AI Act + MDR Class IIb**: AI-enabled medical devices under MDR/IVDR with Notified Body assessment: 2 August 2027. AIRIS as MDR Class IIb on this transition. Rule 11 medication-ordering CDS; T1 information lookup Class IIa.
- **D.Lgs. 138/2024 (NIS2 transposition)** + ACN det. 164179 del 14 aprile 2025: Italian hospitals are essential entities; 16 categories minimum security measures; compliance October 2026. AIRIS as supplier to NIS2 essential entities (ACN det. 127437/2026) faces supply-chain security obligations.
- **Italian statutory retention** (Circolare 900/1986: *"le cartelle cliniche… vanno conservate illimitatamente"*): core clinical record perpetual; incompatible with naïve GDPR right-to-deletion responses — Regulatory Layer is retention obligation state machine.
- **D.M. 23/10/2025 ICD-9-CM → ICD-10-IM/CIPI dual-coding**: Fase 2 sperimentazione 1 Jan – 31 Dec 2026; mandatory 1 Jan 2027.

**AIRIS reference pattern**: internal documents reference the union, not any single framework. "Doppio audit" / "post-hoc review" are AIRIS-internal paraphrases; reconcile with regulatory primitives (tracciamento dell'operazione + notifica all'interessato + diritto dell'assistito di prendere visione delle registrazioni) in DPIA documentation.

**Italian regulatory tailwind**: AIRIS Phase A lands inside the FSE 2.0 transition window (Fase 3 deadline 31 marzo 2026; ICD mandatory 1 Jan 2027; NIS2 compliance October 2026). Favorable for paradigm credibility ("AIRIS ships clean compliance from day one"); risk that implementing decrees may still shift.

Reasoning: each individual law captures one slice of healthcare AI / clinical record / data protection / supply chain obligations; AIRIS faces all of them simultaneously. Referencing one law (e.g., Art. 7 of L. 132/2025) and inferring the full obligation set from it is incorrect and produces brittle compliance posture. The union framing is operationally accurate and survives regulator audit.

Cross-references: D.5 (Regulatory Layer architecture); D.13 (pack regulatory roadmap); D.17 (hash-chained L6 audit ledger satisfying the union); D.18 (Italian clinician identity composition with break-glass gated by Garante 604/2024); Part II Section 16 (Regulatory Layer); Part V Section 4 (Italian regulatory risks across the union).

---

### Section 2 — Load-Bearing Reasoning

This section captures the *why* behind specific choices that future sessions might need to reference. Not exhaustive — only the parts where the reasoning is non-obvious enough that re-deriving it from the frame alone would be expensive.

#### R.1 Why "displace versus extend" rather than "good tech vs bad tech"

The criterion came from working through the contradiction: VIVA is anti-bureaucracy-software but pro-surgical-robot, and a worldview that can't tell those apart is broken. The principle that emerged: it's not about high-tech vs low-tech, AI vs non-AI, or efficiency vs inefficiency. It's about whether the technology stands between the human and their craft (displaces) or extends them further into it (extends). The administrative system displaces. The surgical robot extends. Same criterion applied to: CRM that asks for 20 fields after a call (displaces) vs AI that listens to the call and surfaces the missed detail (extends); booking platform that turns hairdresser into receptionist (displaces) vs assistant that handles bookings while she cuts hair (extends).

The criterion is testable, self-correcting, and gives AIRIS a real moat because most B2B software accepts the displacement and just optimizes efficiency within it.

The criterion is articulated at VIVA level (see VIVA Master Document Section 2). AIRIS inherits it and operationalizes it through specific hard lines (see Part I — What AIRIS Will Not Become).

#### R.2 Why the cost-paid-twice argument matters

Without it, AIRIS is a clinician-experience product. With it, AIRIS is a product whose stakes include the patient. This changes how AIRIS is built, sold, and lived with. The patient is the second party paying the cost of the displacement, and they were already in trouble — the moral weight of fixing this is part of what makes AIRIS not just a better HIS but a different category of product.

The cost-paid-twice argument is articulated in Part I (Executive Vision). It is specific to AIRIS's domain (healthcare); other VIVA applications will have their own articulation of who bears the cost of displacement in their domain.

#### R.3 Why Traditional Mode being a "first-class alternative" is wrong

The early V20 doc said VIVA Mode and Traditional Mode were both first-class. This was a tell — it suggested uncertainty about whether the new paradigm could carry the whole experience, so the old GUI was preserved as a parallel-equal escape hatch.

Under the frame, the GUI is a tool the philosophy uses where appropriate (clicking is sometimes faster than speaking, regulators require fallbacks, some moments need precision the voice layer can't yet guarantee), not a parallel paradigm. There's one paradigm: the system absorbs work. There are many input methods. The GUI fallback exists for specific situations, not as a co-equal mode.

This decision is operationalized throughout the system specification (Part II) — Section 8 (The Interaction Layer) describes the unified paradigm; module workflow descriptions throughout describe voice/text as primary with GUI as equivalent direct-manipulation path, not as primary with voice as future enhancement.

#### R.4 Why VIVA stayed at the umbrella altitude rather than at the AIRIS-feature altitude

The umbrella deserves the better word. The interaction layer is a feature that should have a more functional name. The founder's worldview is genuinely larger than a hospital information system, and folding VIVA inward as an AIRIS feature was making the docs tractable while leaving the bigger thing unnamed. The earlier V18 framing (VIVA is independent from AIRIS, applicable to any software product) hinted at the right altitude; V19 and V20 pulled it inward, which is what got the work stuck.

The current tree structure — with VIVA Master Document at the root and AIRIS Master Document as a child — operationalizes this reasoning structurally.

#### R.5 Why two hard lines, not six refusals

An earlier draft had six "refusals." The founder pushed back: refusals can become rigidity, and pre-committing to specific tactical refusals is different from loyalty to values. The pushback was correct. Most of the original six were values dressed as refusals; locking them down as rules would constrain flexibility without serving the philosophy.

The two that remain — AIRIS will not make clinical decisions in place of the clinician; AIRIS will not, in any release, ask more administrative work of the clinician than the previous release did — are *true* hard lines: things that, if AIRIS crossed them, would make AIRIS no longer a VIVA application. They're spine, not constraint. The distinction: a flexible organization needs to be able to change almost everything. What it can't change without becoming a different organization is the small set of commitments that define what kind of thing it is. Hard lines protect against accidental drift under accumulated pressure; they don't constrain real adaptation.

Both hard lines are stated in Part I (What AIRIS Will Not Become).

#### R.6 Why the modules are protected

The eleven module specs represent serious clinical thinking and are largely philosophy-aligned where the philosophy applies. They are also where the bulk of the AIRIS doc's actual specification work lives. Rewriting them would have been wasteful and risky; auditing them surgically against the frame was the proportionate move. The rebuild work was foundational, not specification-level.

This protection is partial and conditional: surgical revisions to specific workflows are appropriate and have happened (V23 applied cross-cutting audit findings; Phase C of the production plan in Part IV will work through module-specific touchpoints with clinicians). What's protected is the *substance* of the clinical thinking in the modules, not the prose.

#### R.7 Why principle-first replaces form-first (the methodological lesson)

V24 framed the interaction problem around "the materialization paradigm" — a specific form. V25 retires this framing because of a deeper realization: when a form becomes the goal, the design has drifted from the principle. The original purpose of the materializing surface concept was to serve the principle (least time and effort); over time, "make materialization work well" became its own goal, separable from the principle. This is a failure mode worth naming and preventing.

The correction: every design decision starts from the principle and reasons downward to the form. *What takes the least time and effort for this user in this moment?* Sometimes that's a materialized surface. Sometimes it's voice with no surface at all. Sometimes it's a click on a familiar GUI element. Sometimes it's the system doing something silently without any user interaction. The form is whatever serves the principle for the specific case. No form is sacred. No form is the "VIVA paradigm" by itself.

The dual-surface paradigm (D.8) is not a form in this sense — it is the *architecture* that allows whichever form fits the moment to be used. The paradigm is form-agnostic; it enables form-flexibility. This is why the paradigm is foundational (it serves the principle structurally) while specific forms are not (they serve the principle situationally).

This reasoning lives also in VIVA Master Document Section 5 as the cross-application principle "Principle-first, not form-first." It applies to every VIVA application. For AIRIS in particular, the discipline is: every design decision about the interaction layer asks the principle question, not the paradigm-fit question.

#### R.8 Why exploration before production build (the methodological lesson, continued)

V24's plan jumped from "spec is complete" to "Phase A: build AIRIS." This compresses too much. Building AIRIS at production-equivalent quality requires many decisions about how to implement the paradigm, how to build the consciousness substrate, what tech stack to use, which AI coding tools fit, how the dev environment is structured, how the synchronization between the two surfaces actually works in code. These decisions cannot be made well by reasoning alone.

Reasoning is for hypotheses. Testing is for intuitions. Intuitions inform decisions. When stakes are high (a major architectural commitment that's expensive to change), the path from reasoning to commitment must include testing.

Phase 0 (D.9) implements this. Multiple approaches get tried in small builds. The dual-surface synchronization gets prototyped to learn what actually feels seamless. The consciousness substrate gets sketched to learn what kinds of signals can be accumulated tractably. Backend language and framework get tested by building the same small thing in each. AI coding tools get tested by using them on real subsystems. By the end of Phase 0, the major architectural decisions have empirical support, not just reasoned support.

This is honest about the limits of reasoning. It is also honest about the cost of building production code on shaky foundations. The cost of Phase 0 (time spent exploring rather than building toward AIRIS-complete) is paid once and produces durable returns. The cost of skipping Phase 0 (wrong tech, wrong paradigm implementation, having to redo Phase A work because the foundation was wrong) is paid many times and produces compounding losses.

This is captured at VIVA Master Document Section 5 as part of the refined "Technology choices" principle. For AIRIS, Phase 0 is the structural expression of this lesson.

#### R.9 Why breadth-of-coverage is the central value proposition to AGFA (since V26)

Earlier framings of AIRIS-to-AGFA emphasized the paradigm (dual-surface, consciousness substrate), the Builders as platform capabilities, the Regulatory Layer absorbing institutional translation work — all real, all distinctive, none individually answering the question "why would AGFA acquire or partner with this." That question's answer is strategic, not just technical: what does AIRIS unlock for AGFA that AGFA cannot unlock for themselves at comparable cost and risk?

The answer is breadth. AGFA's heritage is imaging — RIS, PACS, the diagnostic IT line. They are very strong there. Their gap, the thing that would matter most to acquire rather than build, is everything *outside* that line. Every hospital department that AGFA's current product does not serve is a market AIRIS opens for them: Emergency, Operating Room, Care Unit, ICU, Laboratory, Pathology, Cardiology, Dialysis, Endoscopy, Nuclear Medicine. Eleven markets. Eleven hospital territories AGFA does not currently sell into, all served by one architectural commitment AIRIS embodies (the philosophy expressed as eleven specialty modules on shared Core, Module Independence ensuring each is a complete product, the Stance ensuring each fits its specialty's craft seriously).

This is what frames the V26 scope reshape (D.10): all eleven modules present matters because each is an expansion territory; all three Builders fully working matters because each is a platform capability AGFA does not have; the architecture exposed as breadth-supporting matters because the architecture is what makes the breadth tractable to deliver.

Without this framing, the strategy drifts toward depth-in-one (build Radiology beautifully and let it speak for the rest) — which is precisely the conventional positioning AGFA already evaluates many times, and which loses to their existing strong RIS line on its own terms. The breadth framing positions AIRIS as adjacent-to-AGFA, expanding their footprint rather than competing for the footprint they already have.

Caveat held visible: this reasoning rests on the assumption that AGFA's actual strategic appetite is for expansion across hospital departments, not consolidation within their existing imaging line. The founder's reading of AGFA internally is that the appetite is for expansion; the V26 strategy proceeds on that reading. If subsequent intelligence about AGFA's direction contradicts this, the strategy pivots deliberately rather than implicitly — see Part V Section 4 (Risks) where this is logged as a load-bearing assumption-as-risk so it remains pivotable.

Cross-references: D.10 (Phase A scope reshape), D.13 (the pack — particularly the per-module market analysis and AGFA-specific narrative which directly operationalize this reasoning), Part V Section 4 (Risks — AGFA expansion appetite as load-bearing assumption).

#### R.10 The code is the same throughout phases; what differs is the workstreams that wrap it (since V26)

The natural intuition is that Phase A produces "demo code" and later phases produce "production code" — that a separate Phase D build replaces what Phase A built with something fit for hospital deployment. This is wrong, and the wrongness compounds expensively.

The correction: the code is the same. The Phase A application code is structurally what production application code looks like — same architecture, same patterns, same data models, same stack, written with production discipline (per D.11). What changes between Phase A and Phase D is not the code; it is the work that *wraps* the code.

What Phase A is missing relative to a hospital-deployable system, item by item, is mostly not different code:

- **Certification.** IEC 62304 traceability, MDR Technical File, validated test evidence. This certifies the existing code; it does not require different code. Phase D work.
- **Real hospital integration.** Connection to a real hospital's DICOM modalities, PACS, HL7 feeds, existing ADT system. Uses the existing Integration Builder; requires a hospital relationship that Phase A does not have. Phase C/D.
- **Real Italian regulatory submission.** Connection to actual FSE 2.0 endpoints, real NSIS pipeline, real SDO submission. Uses the existing Regulatory Layer; requires credentials and a recognized running instance. Phase D.
- **Security audit.** Formal penetration testing, vulnerability assessment by an independent firm. Audits the existing code; requires hiring and budget. Phase B/D.
- **Clinical validation.** Real clinicians using the system in real workflow. Refines the existing code where Phase C surfaces refinements; requires a clinical relationship. Phase C.
- **Hospital deployment engineering.** On-premise installation, redundancy, failover, backup, monitoring in the hospital environment. Operations work on the existing code. Phase D.
- **Performance at real load.** AIRIS at five users on Supabase is different from AIRIS at three hundred concurrent users. Tunes the existing code; requires real usage to surface what to tune. Phase C/D.

None of these are different code than Phase A. They are workstreams *on top of* Phase A's code.

This has direct implications for how Phase A is built. Two implications matter most:

First, Phase A must write code that the later workstreams can wrap, not code that has to be replaced. The failure mode being avoided: arriving at Phase D and discovering that the Phase A code was structurally a demo (shortcuts in error handling, ad-hoc data models, missing audit, security gaps) and the certification or audit work cannot proceed without rewriting major subsystems. The V25 framing (production-equivalent on things that matter, non-production on everything else) flirted with this failure mode; V26's single quality bar (D.11) prevents it.

Second, Phase A's work *output* is not "the software ready to deploy" — it is "the software stable enough that the wrapping workstreams (certification, integration, validation, deployment engineering) become possible." Those wrapping workstreams require relationships and resources (a hospital relationship, an auditor, a clinical partner, certification budget) that Phase A does not have. Phase B is when those relationships become available; Phase C/D is when those workstreams happen. The Phase A output is the *condition* for those workstreams, not the workstreams themselves.

This reasoning is what allows V26 to commit to a managed-services + custom-code stack (Supabase, Vercel, Claude API) without conceding production capability: the same code path migrates to self-hosted Postgres + dedicated infrastructure for Phase D, because the application code does not change in that migration. Only the hosting and ops surrounding it do.

Cross-references: D.11 (single quality bar), D.12 (managed services + custom code stack with same code path to self-hosted), Part IV (phase descriptions written around this framing).

#### R.11 No premature internal Phase A roadmap; pack timeline is appropriate Phase A pack deliverable (since V27)

Stage 1 Step 1.8 (Patient Flow Layer analysis) surfaced a discipline that subsequently held across Stage 1 + Stage 2: **Stage 1 outputs estimate subsystem scope (in engineering weeks or similar units); they do NOT write project roadmaps or sequenced staging within engineering envelope.** The original founder catch was on a research output that had drifted from subsystem-scope estimate into calendar-anchored project roadmap territory (week 0-2 / week 22-36 with validation gates and pilot launch dates) before tech stack and scope were settled.

V27 makes the discipline explicit and narrows its scope. Two distinct kinds of timeline work, with different appropriateness criteria:

- **Internal Phase A roadmap** (calendar plan for AIRIS's own work to get the Phase A pack ready): **premature before V27 commit + Phase 0 + early Phase A execution settle scope.** Writing one in Stage 1 produced fake dates against unsettled scope. Architectural rule: internal Phase A roadmap is NOT a Phase A pack deliverable; lives in operational planning (Active Plan), not Master Doc; develops as work happens, not before.

- **Pack timeline** (Phase C/D + post-deployment trajectory shown to AGFA): **appropriate and serves credibility.** What AIRIS becomes with AGFA's resources; the credible path from Phase A pack to hospital-deployable systems and beyond. Demonstrates AIRIS thinks clearly about what comes after Phase A — supports credibility as partner/competitor rather than early-stage idea. Founder framing (V27 commit conversation): "AIRIS must look like credible powerful partner/competitor, not early-stage idea. A thoughtful Phase C/D trajectory is what makes that case." Pack timeline IS a Phase A pack deliverable.

**The two are different work serving different goals.** Confusing them is the failure mode: producing pack timeline content with the internal-Phase-A discipline (no calendar commitments) makes the pack look thin to AGFA evaluators; producing internal Phase A roadmap content with the pack-timeline framing (here's our trajectory) bakes in premature commitments to fake dates.

Cross-references: D.13 (the pack is Phase A deliverable; pack timeline is one of the seven pack components); Part IV Section 3 (Phase A description acknowledges all 7 pack workstreams including pack timeline as first-class work); Part V Section 5 (Pack Workstream Status sub-section tracking 7 workstreams).

---


#### D.20 Real UX, Minimal Infrastructure operational philosophy (Phase 0 / early Phase A) (V28)

**Decision:** Phase 0 / early Phase A operational infrastructure is minimal — managed SaaS free tiers (Supabase managed EU, Vercel free tier), existing Ollama VPS, Claude Code subscription, ElevenLabs voice API. Production-grade self-hosted topology per Section 17 + Hostinger deep research findings (Part VII Section 7.3.1) moves to Phase D pre-deployment.

**Rationale:** User-facing reality must be uncompromised — dual-surface paradigm, Italian intent parsing, consciousness substrate behavior, voice quality, patient flows all real and production-discipline code per D.11 (Working Principle 0.3.5). But backing infrastructure during Phase 0 / early Phase A doesn't need to be production-grade self-hosted — the abstractions in Section 17 make managed-now → self-hosted-later a config swap, not a rewrite (per Working Principle 0.3.8 Architecture Through Abstractions).

**Alternatives considered:**
- *Self-host everything on Hostinger from Phase 0*: rejected as over-engineered for paradigm validation + early Phase A work; substantial operational overhead for marginal sovereignty improvement at this stage.
- *Managed services indefinitely*: rejected because Phase D hospital deployment context requires self-hosted sovereignty for procurement compliance.
- *Phase 0 deferred until full production infrastructure provisioned*: rejected; blocks paradigm validation and Phase A scope progress for infrastructure that doesn't yet matter operationally.

**Supersession history:**
- Earlier session framing had Step 4.1 procurement provisioning full V27 Section 17 production stack (Hetzner GPU + GEX44 + CX23 + Cloud Run + Inngest Pro + Backblaze + observability + Infisical). Superseded by founder direction this session: "we DO have everything one USE EXPERIENCE SIDE work COMPLETELY, but whats behind DOESNT MATTER AT ALL, at we leave that for the things that as per plan we in the future."
- V27 Phase 0 / Phase A framing implicitly assumed production-grade infrastructure as default. D.20 makes the explicit distinction: Section 17 = production architecture target; Phase 0 / early Phase A = minimal operational infrastructure with abstractions enabling migration.

**Validation discipline:** Before committing D.20, claude validated each UX pillar (dual-surface real-time sync, Italian intent parsing, voice quality, substrate behavior, patient flows, regulatory artifacts) against minimal-infrastructure stack. **One real catch surfaced**: Italian medical LLM quality with local Ollama alone (7B-14B Q4 models) may not deliver acceptable quality for all paradigm prototype validation cases. **Resolution**: three-backend abstraction (Section 17.5) is built from Phase A core systems Step 4.5 — see D.21.

**Cross-references:** Part 0 Working Principle 0.3.1; Part IV Production Plan Phase 0 / Phase A operational sections; Section 17 reframe note (Part II); Part VII Section 7.3 (Phase D pre-deployment).

#### D.21 Engine-agnostic LLM substrate abstraction; three deployment modes; built Step 4.5 (V28; reframed strategy session 2026-05-28)

**Decision:** The LLM substrate (Section 17.5) is **engine-agnostic** by construction. AIRIS code calls an LLM through a stable AIRIS-internal interface; concrete engine and deployment mode are per-deployment configuration, not platform commitments. The abstraction supports three deployment modes:

1. **Client-local self-hosted** — engine runs inside the client's environment.
2. **Online API** — engine accessed via a vendor API.
3. **AIRIS-hosted, non-HQ** — engine hosted by AIRIS in a region / account distinct from HQ.

The abstraction is built starting Phase A core systems Step 4.5 (not deferred). Step 4.3 paradigm prototype runs on the current concrete backend (per D.22) and moves behind the abstraction at Step 4.5 without semantics change.

**Rationale:**
- Engine identity is a deployment concern, not an architectural commitment. Clients have heterogeneous requirements (data residency, sovereignty, procurement posture, cost ceilings, latency budgets) that no single engine satisfies.
- The abstraction protects UX (Working Principle 0.3.1) by making engine choice configuration rather than rewrite.
- It also protects AIRIS from vendor lock-in and from being defined by any single LLM provider's roadmap.
- Sister abstraction to D.24: the same way the platform is locale-agnostic with concrete localization per market, the LLM substrate is engine-agnostic with concrete backend per deployment.

**Alternatives considered:**
- *Commit to one engine platform-wide*: rejected — forecloses deployments whose requirements don't match the chosen engine.
- *Defer the abstraction to Phase D*: rejected — without the abstraction during Phase A, the current concrete engine becomes load-bearing by accumulation, which is the exact lock-in the abstraction prevents.
- *Two-mode abstraction (online API + self-hosted only)*: rejected — the AIRIS-hosted-non-HQ mode is a real client posture distinct from both (managed-by-us without third-party vendor API dependency).

**Supersession history:**
- V21 framing: three-backend abstraction with specific named engines.
- V27 §17.5 (D.12): "Bedrock EU primary + Mistral La Plateforme EU fallback; Phase D adds local hospital-resident."
- V28 D.21 (May 2026): "Three-backend abstraction — local self-hosted active; Bedrock EU + Mistral La Plateforme EU configured but not active; built Step 4.5."
- **V28 D.21 reframe (strategy session 2026-05-28)** — this entry: engine-agnostic abstraction, three deployment modes (Mode 1 / Mode 2 / Mode 3 above), no specific engine commitments at the platform layer. All prior named engines (Ollama, Hostinger VPS, AWS Bedrock EU, Mistral La Plateforme EU, Hetzner GEX44, OVHcloud L40S) are retired as platform commitments; they remain illustrative deployment options. Current concrete backend lives in D.22.

**Cross-references:** Part 0 Working Principles 0.3.1 + 0.3.8; D.22; D.24 (sister abstraction — international platform / locale-agnostic by construction); Section 17.5; Section 17 reframe note (cross-cutting reframe across all of Section 17); Active Plan Stage 4 Step 4.3 (prototype on current concrete backend) + Step 4.5 (abstraction built here).

#### D.22 Current concrete LLM backend: Claude API direct (V28; reframed strategy session 2026-05-28)

**Decision:** The current concrete LLM backend for AIRIS Phase 0 development and current deployments is **Claude API directly** — an instance of deployment Mode 2 (online API) under the engine-agnostic abstraction (D.21). Specific model selection (Claude family member, version) is tracked operationally in `infra/manifest.md`, not committed at the Master Doc level.

This is a configuration choice, not an architectural commitment. The abstraction (D.21) allows any future deployment to wire a different engine and/or deployment mode without code change.

**Rationale (founder direction, strategy session 2026-05-28):**
- Claude API has the strongest current capability profile for the workloads AIRIS exercises (clinical-language intent parsing, structured outputs, multi-turn reasoning, code-switched language, tool use, prompt caching).
- Anthropic's prompt-caching + SLO discipline is mature and well-matched to AIRIS's latency budgets (§17.5).
- Phase 0 / early Phase A operational philosophy (Working Principle 0.3.1) favours the simplest concrete backend that delivers uncompromised UX; Claude API does, with no operational overhead beyond API key management.
- Per-deployment posture: the abstraction (D.21) is what carries the strategic options (sovereign self-hosted, AIRIS-hosted, etc.). Concrete backend choice happens per deployment.

**Alternatives considered:**
- *Commit to a self-hosted open-weights backend as platform default*: rejected — over-commits the platform to one engine identity; conflicts with D.21 engine-agnostic stance.
- *Commit to a multi-vendor API set (AWS Bedrock EU + Mistral La Plateforme EU + others) as platform default*: rejected — same over-commitment, plus operational complexity that Working Principle 0.3.1 doesn't justify Phase 0.
- *Pick the engine per workload inside the platform*: rejected — engine routing per workload is a deployment-level optimization, not a platform-level commitment.

**Supersession history:**
- V27 D.12 framing: "Bedrock EU primary + Mistral La Plateforme EU fallback."
- V28 D.22 (May 2026): "LLM substrate priority flip — local self-hosted as active backend; Bedrock EU + Mistral EU configured fallback."
- **V28 D.22 reframe (strategy session 2026-05-28)** — this entry: D.22 no longer names a deployment mode as "active." It names the **current concrete backend** (Claude API direct) as the Phase 0 operational default, with per-deployment selection thereafter governed by D.21. The earlier framings (Bedrock EU primary; then local-active) are retired as platform commitments and become illustrative deployment options under D.21.

**Cross-references:** Part 0 Working Principle 0.3.1; D.21; D.24 (sister abstraction); Section 17.5; Section 17 reframe note; Active Plan Stage 4 Step 4.3 (prototype on Claude API direct) + Step 4.5 (engine-agnostic abstraction built); `infra/manifest.md` (active model + key registration).

#### D.23 SW-first sequencing of pack workstreams (V28)

**Decision:** Active Plan operational sequencing places Working Software (Stage 4) before all six non-SW pack workstreams (Stage 5: Regulatory Roadmap, Italian Voice Talent, Business Model, Vision Document, Pilot Hospital Story, AGFA-Specific Narrative). Stage 6 assembles pack + prepares meeting.

**Rationale (founder direction this session):**
- Solo + AI work executes cleanest with focused tracks
- SW work has clear next steps and minimal external dependencies
- Strategic conversations on non-SW workstreams require founder thinking not yet surfaced
- Parallel execution would starve non-SW workstreams of attention OR muddle SW work with strategic confusion

**Honest tradeoff explicitly accepted:** AGFA-readiness timing extends if SW takes substantial time. Pack workstreams become later-Stage work rather than parallel-track work.

**Alternatives considered:**
- *Parallel SW + non-SW workstreams* (V27 framing): rejected — see rationale above
- *Non-SW first, SW second*: rejected — SW is the deliverable that anchors the pack; without SW maturity, non-SW workstreams lack concrete reference material

**Supersession history:** V27 Part IV Section 2.0 + Section 3 + Part V Section 5 Pack Workstream Status had framing about pack workstreams initiating during Phase 0 / "alongside software work." That framing was Claude inference from Stage 1 lead-time analysis, not founder strategic decision. V27 strategic frame holds (D.13 pack-as-Phase-A-deliverable; R.11 pack timeline appropriate). V28 D.23 makes operational sequencing explicit and resolves the inference.

**Cross-references:** Part 0 Working Principle 0.3.2; D.13 (pack is Phase A deliverable); R.11 (pack timeline); Active Plan Stages 4 + 5 + 6 structure.

#### D.24 International platform; locale-agnostic by construction; Italy as first deployment market (V28; strategy session 2026-05-28)

**Decision:** AIRIS is an **international platform**. The platform architecture — the dual-surface paradigm (D.8), the consciousness substrate (§17.4), the eleven-module structure (D.10), the engineering architecture (Part II Section 17), the three Builders, the Patient Flow Layer, the Regulatory Layer pattern — is **locale-agnostic by construction**. The platform commits to no single human language, medical-terminology system, regulatory regime, or national identity framework. Market-specific content lives in a **localization layer** produced per market.

**Italy is the first deployment market.** Italy's localization layer — Italian medical terminology, Italian voice character, FSE 2.0 / SDO / NSIS regulatory artifacts, codice fiscale / FNOMCeO / albo identity composition, NIS2 / HDS posture, Italian-specific MPI handling (STP / ENI / transgender CF transition / pre-CF neonates / "Limbo" pattern), Italian incumbent-landscape competitive positioning — is committed at first-market depth in §17.6, §17.7, §17.8, §17.13, §17.21, §17.22, §17.23, D.18, and D.19. This is the moat for the first market and the basis of the AGFA-Italy beachhead.

Subsequent markets carry their own localization layer. The platform underneath generalizes without architectural change.

**Rationale (founder direction, strategy session 2026-05-28):**
- Strategic positioning: AIRIS competes globally on the dual-surface paradigm + consciousness substrate; Italy is the first market because of clearest stakes and clearest fit (per Part I Scope), not because AIRIS is "an Italian product."
- Architectural integrity: the paradigm, substrate, and engineering architecture do not depend on any single locale; making this explicit prevents accidental Italianisms from accreting into the platform layer as load-bearing assumptions.
- Sister abstraction to D.21: same way the LLM substrate is engine-agnostic with concrete backend per deployment, the platform is locale-agnostic with concrete localization per market.
- Phase 0 demo language: English platform default. Italy localization remains at first-market depth and is the deployment target for AGFA + Italian launch hospitals.

**What this is not:**
- *Not a genericising-away of Italian content.* The Italian regulatory anchor union (D.19), Italian clinician identity composition (D.18), Italian voice stack (§17.6), Italian incumbent positioning (§17.21), Italian Regulatory Layer (§17.7), and Italian Patient Flow Layer edges (§17.8) all stay at first-market depth. They are now positioned as Italy's localization, not as platform-wide commitments.
- *Not a deferral of internationalisation to "later."* The architectural commitment is *now*; per-market localization work happens market by market when each market activates.
- *Not a translation framework.* Locale-agnostic by construction means the platform takes no position on what the localization layer must contain; each market produces its own.

**Operational consequences:**
- Platform-layer code, schemas, and contracts use English defaults and locale-aware data shapes where locale matters.
- Italy-specific concrete tables and components (FSE Schematron artifacts, codice fiscale identity fields, FNOMCeO claims, Italian PDTA state machines, Italian-tuned MPI thresholds) live within clearly-scoped Italian-localization modules of the broader engineering architecture.
- Step 4.3 paradigm prototype is built in **English** (platform default). Italian-localized paradigm validation is a follow-on milestone aligned with Italian-market readiness (likely Step 4.10 Radiology deep + Italian voice talent Stage 5.2).
- Master Doc framing throughout updates as drift surfaces, per Working Principle 0.3.7 (Audit Discipline). The Italian-specific content in Section 17 and elsewhere is preserved verbatim; only the framing changes.

**Alternatives considered:**
- *"Italian-first" with international as Phase B+ deferral*: rejected — that framing makes Italian content load-bearing at the platform layer, which constrains subsequent markets and conflates positioning with architecture.
- *Strip Italian content to a separate "Italy module"*: rejected — Italy is the first market and its content is committed at first-market depth; sequestering it would lose the moat. Localisation layer is conceptual scaffolding, not a code / doc reorganisation.
- *Defer this decision until second market activates*: rejected — by then, accumulated Italianisms in the platform layer would be hard to extract. Architectural commitment now is what protects platform generality.

**Supersession history:**
- V21–V27 framing: "Italian-first by deliberate market choice."
- V28 (May 2026): same framing inherited (Part 0.2 Stance bullet; Part I Scope paragraph).
- **V28 D.24 (strategy session 2026-05-28)** — this entry: international platform with Italy as first deployment market. "Italian-first" framing in Part 0.2 and Part I Scope reframed in this atomic commit; Italian-specific content in Section 17 / D.18 / D.19 preserved as Italy's localization.

**Cross-references:** Part 0.2 Stance (Italian-first bullet reframed this commit); Part 0.3.1 + 0.4 (locale-aware intent parsing + locale-agnostic platform commitment); Part I Scope (first-deployment-market paragraph reframed this commit); D.18 (Italian clinician identity composition — Italy localization); D.19 (Italian regulatory anchor union — Italy localization); §17.6 / §17.7 / §17.8 / §17.13 / §17.21–§17.23 (Italian-specific subsystem content preserved as first-market localization); Section 17 reframe note (cross-cutting reframe across all of Section 17); D.21 (sister abstraction — engine-agnostic substrate); Active Plan Stage 4 Step 4.3 (paradigm prototype in English platform default).

#### D.25 Single-session integrated operator (V28; founder direction 2026-05-28)

**Decision:** AIRIS is operated by **one Claude Code session at a time** that is the project's complete operator — strategy, execution, architecture, and review all happen within that session. The two-channel strategy/execution baton model (V28-and-earlier: strategy in Claude.ai chat, execution in Claude Code, coordination via a baton in `/STATE.md`) is retired. The session is ephemeral; the canonical docs structure (`CLAUDE.md` + `STATE.md` + `Project_Core.md` + `AIRIS_Active_Plan.md` + `AIRIS_Master_Document.md` + step-specific plans/notes + `infra/manifest.md` + `decision-log.md` + VIVA / Viva Mode Master Documents) is the entire memory across sessions.

**Context-agnostic machine property:** any fresh Claude Code session, given access to the repo at `main` HEAD and the session-start ritual of reading the canonical docs in the prescribed order, can pick up the work where the prior session left off — without relying on any chat-history or prior-session memory. This is the load-bearing property the architecture commits to.

**Rationale (founder direction, 2026-05-28):**
- *Relay overhead grew with project scale.* Two channels required Mattia to manually re-feed `main` HEAD docs into Claude.ai chat verbatim at every strategy turn (to mitigate strategic-channel staleness per the V28-and-earlier `CLAUDE.md` "verbatim relay" rule). At Phase 0 + Stage 4 scale the relay cost grew per turn.
- *Strategic-channel working-memory staleness was a recurring fault.* Chat working memory compacts; relevant Master Doc spans + recent `D.x` entries + Active Plan CURRENT STATE + STATE.md had to be re-grounded every strategy turn. The single-session model removes the compaction surface by reading the docs each time directly.
- *The docs structure had already become rich enough to carry all the state the strategy channel previously held.* `D.x` Decision Log (V27 + V28 entries), Section 17 (engineering architecture; 24 sub-sections), Active Plan (CURRENT STATE + stage/step structure + session-log entries), STATE.md (just-done / in-flight / next-step), step-specific plans + notes — together they make the project state observable from `main` alone.
- *Founder authority compresses cleanly.* Mattia retains direction-setting in-session; the call surface (qualitative SLOs, market positioning, taste calls, cost limits, time pressure, risk appetite) is the same as before — only the channel through which it's exercised changes.

**Operating model under D.25:**
- *Single operator.* Claude Code makes architectural calls when they follow existing commitments (the `D.x` log, Section 17, working principles, hard invariants). Surfaces inline to Mattia when a call sets a new commitment, supersedes a `D.x`, changes scope, or has founder-judgment-dependent tradeoffs.
- *Session-end flush is existential.* Before the session terminates: update `STATE.md`; append `decision-log.md`; promote any architectural commitment into the `D.x` log on the next atomic doc commit; update `infra/manifest.md` if non-git state changed; commit + push. Anything not on `main` does not survive.
- *Session-start ritual is reading.* CLAUDE.md → STATE.md → Project_Core.md → AIRIS_Active_Plan.md (CURRENT STATE + active step) → AIRIS_Master_Document.md (recent `D.x` + relevant sections) → infra/manifest.md → step-specific plan/notes if any. VIVA / Viva Mode Masters only when the session touches the paradigm foundations.
- *Branch model unchanged in shape.* One feature branch at a time; PR + squash-merge to `main`; self-merge of routine PRs allowed on greens; architectural-commitment merges surface inline to Mattia first.

**What this is not:**
- *Not a retirement of founder steering.* Mattia remains authoritative on strategic and qualitative calls. The retirement is of the separate strategy *channel*, not the strategy *role*.
- *Not a retirement of architectural decision rigor.* The `D.x` log + decision-log + atomic-doc-commit discipline is preserved verbatim. Architectural commitments still get rationale + alternatives + supersession + cross-refs recorded.
- *Not a retirement of the hard invariants from V28-and-earlier.* RLS-scoped tenant isolation, engine-agnostic LLM substrate, international platform, docs-win-over-chat, plans-cross-sessions-as-files, verbatim grounding (now self-applied within the session) all survive.
- *Not a parallel-session-allowed model.* One operator at a time; coordinating multiple concurrent Claude Code sessions on the same project is not part of D.25.

**Alternatives considered:**
- *Continue the two-channel baton (V28 baseline).* Rejected per the rationale above — relay overhead, strategic-channel staleness, and the maturation of the docs structure together made the channel split a net cost.
- *Move strategy into the docs entirely and execute mechanically.* Rejected — strategy isn't purely textual; founder judgment on qualitative triggers, market positioning, and taste calls remains a live operator-input. The single-session model preserves that input as in-session steering, not as docs-only.
- *Multiple parallel Claude Code sessions with file-locking on the active branch.* Rejected — adds coordination overhead with no project-scale justification at Phase 0; revisit if Stage 4 work fans out into independently parallel streams.

**Supersession history:**
- V28 (May 2026, earlier in same month): two-channel strategy/execution baton; coordination via `STATE.md` BATON field; "verbatim relay" rule for Mattia moving `main` HEAD context into Claude.ai chat at strategy turns; "execution self-merges routine PRs" + "architectural decisions surface to strategy *before* the merge" rules in `CLAUDE.md`.
- **V28 D.25 (founder direction 2026-05-28)** — this entry: single-session integrated operator. CLAUDE.md "Channels and baton" section retired and replaced with "Operating model"; STATE.md BATON header replaced with operator-and-status header; `decision-log.md` entry format drops the "channel" field; "Open questions for the other channel" reframes to "Open questions for Mattia."

**Operational consequences:**
- *CLAUDE.md* reframed in this atomic commit: "Channels and baton" → "Operating model"; "Rituals" rewritten for single-session start/mid/end; "Branch model" updated; "Hard invariants" adds the D.25 entry; "Compact instructions" updated.
- *STATE.md* reframed: BATON header → Active-stage/step + Operating-model + Active-branch + Status; "Open questions for the other channel (strategy)" → "Open questions for Mattia (founder steering)."
- *Project_Core.md* already aligned ("work on the project can resume in any environment / chat / AI tool seamlessly" — that line is the exact context-agnostic-machine property D.25 commits to); no edit needed.
- *Active Plan* historical session-log entries that reference "strategy session 2026-05-28 framed scope" stay verbatim (they're audit trail; the strategy session described happened under the V28-baseline two-channel model). Forward-looking references to "strategy channel" inside the active step (Step 4.3) are reframed inline in this commit where they exist.
- *infra/manifest.md* unchanged by this decision — non-git state pointers are independent of operating model.
- *decision-log.md* gets a chronological entry for this commit; format simplified (no "channel" field).

**Cross-references:** CLAUDE.md (full operating-manual reframe this commit); STATE.md (header reframe this commit); D.20 (Real UX, Minimal Infrastructure — single-session operator is the natural Phase 0 / Phase A operator-side counterpart); Project Core "How to Use the Tree" (session-start + session-end audit discipline — survives unchanged); Working Principle 0.3.7 (Audit Discipline — survives unchanged; applies to in-session architectural decisions); Working Principle 0.3.6 (Plan Evolves With Consciousness — survives unchanged; the docs are the surface that evolves); `docs/decision-log.md` (chronological entry this commit).


---

## PART IV — PRODUCTION PLAN

**V28 reframe note**: Part IV substantive content preserved from V27 (phase structure, Phase 0 / Phase A / Phase B / Phase C / Phase D scope definitions). V28 adds two reframes:

1. **Phase 0 / early Phase A operational philosophy reframe** (per D.20 Real UX, Minimal Infrastructure + Part 0 Working Principle 0.3.1): operational infrastructure during Phase 0 / early Phase A is minimal SaaS free tiers + existing Ollama VPS, not full production stack. Section 17 production architecture target activates Phase D pre-deployment.

2. **Pack workstream sequencing reframe** (per D.23 SW-first sequencing): V27 framing about pack workstreams initiating during Phase 0 / "alongside software work" is superseded by V28 operational sequencing — Working Software (Stage 4) completes before non-SW pack workstreams (Stage 5); Pack Assembly + Meeting Preparation is Stage 6. V27 strategic frame holds (D.13 pack is Phase A deliverable; R.11 pack timeline). Active Plan operationalizes this sequencing.

The V27 Phase structure (Phase 0 Exploration, Phase A Build, Phase B Sovereign Migration, Phase C Clinical Co-Design, Phase D Hospital Deployment) is preserved. The operational reality of Phase 0 + early Phase A is shaped by D.20 + D.23.


This Part holds the AIRIS production plan — the arc from "spec exists" to "AIRIS exists in the world." It is the real plan, the one that orients work when sitting down to build, not a sketch. It is also a working draft: real work will surface things that change it. Hence Part V (Live Edges) and the Update Protocol, which keep this plan honest as reality unfolds.

The plan is for a solo founder with AI as thinking and coding partner. Not a team plan. References to "we" mean founder + AI assistance. Limits of solo work are acknowledged where they bind; help is named where help is required.

What Part IV holds: the five-phase arc (Phase 0 Exploration → Phase A Real Thing → Phase B Finding the Way → Phase C Deep Professional → Phase D Production Refinement), with Phase 0 and Phase A in real depth, Phase B sketched at appropriate depth, Phases C and D lighter but real, plus a Section 8 that tracks implementation state versus spec as actual building happens.
What Part IV does not hold: dates or durations (they're unreliable for solo + AI work; milestones are tracked instead, not weeks), tactical decisions that haven't been made yet (those live in Part V Open Questions or Current Directions), or content that belongs to the system specification (that's Part II).

---

### Section 1 — The Arc

AIRIS moves through five phases from where it is now (a specification with the V26 strategic frame committed) to where it needs to go (real software in real hospitals serving real clinicians). The phases share one quality bar: production discipline within scope. They differ in *what is in scope* and *what workstreams wrap the code* — not in the discipline applied to the code itself (see Part III D.11, R.10).

**Phase 0 — Exploration.** Narrow empirical validation of the few open micro-choices remaining after V26's strategic frame collapsed most of the candidate space. Three concrete tests: Claude Code vs. Cursor head-to-head on AIRIS-style work; Python vs. TypeScript for the LLM orchestration service layer; the smallest CT scheduling paradigm prototype on the committed stack to validate that real-time bidirectional sync between conversation surface and content surface feels like one event. Output: confirmed (or revised) tech-stack commitments, an AI coding tool committed, a paradigm-prototype iteration that feels seamless. Phase 0 also captures the lessons that exploration surfaces — V26 → V27 etc. — back into the Master Doc.

**Phase A — The Real Thing.** Build the pack: working software at the scope defined in Part III D.10 (Radiology deep, one additional module deep enough for cross-module flow, the other nine present at honest partial depth, all three Builders at production discipline, Regulatory Layer real with at least one Italian artifact, paradigm + substrate working on the deep parts), plus the non-software pack artifacts (business model, vision, timeline, market analysis per module, regulatory roadmap, AGFA-specific narrative). Quality bar: production discipline within scope, honest absence outside scope. The output is what makes the Phase B conversation real — the pack demonstrates trajectory, not just feasibility.

**Phase B — Finding the Way.** Use the pack to find AIRIS's path into the world. Primary target: AGFA acquisition or working partnership, grounded in the breadth-of-coverage value proposition (see Part III R.9 and D.13). Fallback paths: other large HIS players in the European market, or independent operation toward first hospital deployment with seed/Series-A funding. Output: an actual path forward with named resources, partners, and milestones — and the workstreams Phase C/D require (clinical relationship, certification budget, hospital deployment partner) lined up or in motion.

**Phase C — The Deep Professional Phase.** With clinicians in the loop — radiologists, surgeons, nurses, intensivists from the partner relationships secured in Phase B — refine what's built. The audit document's Part 2 module-specific touchpoints get worked through here. The shallow modules from Phase A get deepened to the workflow specifics each specialty actually needs. The Phase A code evolves; it does not get replaced. Output: an AIRIS that real clinicians use without resentment because it actually serves them.

**Phase D — Production Refinement.** Certification (IEC 62304 traceability, MDR Technical File), security audit by independent firm, real hospital integration (real DICOM modalities, real PACS, real HL7 feeds from the partner hospital's existing systems), real Italian regulatory submission infrastructure (FSE 2.0 endpoints, NSIS pipeline, SDO submission), deployment engineering for hospital-local installation (on-prem Postgres migration, dedicated infrastructure, redundancy, monitoring), real exercise of the local-LLM backend in the three-backend abstraction now that hospital GPU hardware is real. The Phase A code is what gets certified, audited, integrated, and deployed — not replaced. Output: hospital-deployable AIRIS.

The phases share code (per R.10) and quality discipline (per D.11). They differ in scope and in the workstreams wrapping the code. Phase A's wrapping workstreams are the pack artifacts (D.13); Phase B's are partnership and funding; Phase C's are clinical co-design; Phase D's are certification, deployment engineering, and real-world integration.

The arc intentionally does not specify durations. Solo + AI timelines are unreliable; phase content varies; the work takes what it takes. Progress is tracked by milestones — Phase 0 paradigm-prototype real-time-sync test passes; tech stack micro-choices confirmed; Radiology deep module working end-to-end; second module deep enough for cross-module exchange; all three Builders working at production discipline; Regulatory Layer producing valid Italian artifact; pack artifacts drafted and coherent; AGFA conversation begun; AGFA conversation concluded — not by elapsed weeks.

---

### Section 2 — Phase 0: Exploration

Phase 0 is narrow empirical validation of the few open micro-choices remaining after V26's strategic frame collapsed most of V25's candidate space. The premise that produced V25's Phase 0 — that many architectural decisions cannot be made well by reasoning alone — is preserved; what changed is that strategic clarity reached in V26 (D.10, D.11, D.12, D.13, R.9, R.10) made many decisions answerable by reasoning grounded in a sharper frame. The decisions that remain genuinely empirical are the ones Phase 0 now tests.

V26's Phase 0 has three concrete tests, run as a single sequential thread rather than parallel workstreams (a Phase 0 lesson surfaced before any code is written — see the document head V26 changelog entry 8). All three can be done on the committed stack; the stack itself is not under test, only the micro-choices within it.

#### Goal and bar

Phase 0 ends when the following are true:

- The AI coding tool primary commitment is empirically grounded — direct head-to-head experience using Claude Code and Cursor (and any other candidate the founder wants to add) on AIRIS-style work, with the choice based on direct experience of fit with the founder's working style on this codebase, not on benchmarks or hype.
- The LLM orchestration service layer language is committed — Python or TypeScript, decided by building the smallest LLM-orchestration subsystem in each and choosing based on direct experience of fit with Claude API patterns, AI coding tool integration, and the consciousness substrate's accumulation and query needs.
- The dual-surface paradigm prototype (CT scheduling scenario) on the committed stack demonstrates real-time bidirectional sync between conversation surface and content surface that feels like one event, not two. The founder has direct experience that the synchronization approach works. If it does not work, V26's stack commitment (Part III D.12) gets revisited deliberately rather than implicitly.
- The dev environment is functional and ready for Phase A. The founder can sit down to it and start writing Phase A code immediately with no setup delay.
- The Master Document reflects everything learned. V26 → V27 (and beyond) captures what Phase 0 produced. By the end of Phase 0, the Master Document reflects empirical reality on the micro-choices, and Phase A begins with grounded commitments.

#### 2.0.0 The thread (not workstreams)

V25 presented Phase 0 as parallel workstreams (paradigm exploration, substrate exploration, multi-stack tech tests, AI coding tool tests, LLM serving sketch, dev environment, Master Doc refinement). For the founder this read as a fan-out and produced planning fog. V26 presents Phase 0 as one sequential thread of three tests with a coherent day-1 setup. This is itself the first Phase 0 lesson — that the plan-shape needed to be a thread rather than a map — and is captured before any code is written.

**The thread:**

1. **Day 1.** Procurement (Claude API key, Claude Code subscription, Cursor subscription, Supabase account, Vercel account); dev machine basics (Linux native or WSL, Git, editor, local Postgres for reference, the ability to make HTTPS calls to Claude API); written sketch of the CT scheduling paradigm prototype end-to-end (one to two pages of plain English — the clinician's experience, the conversation surface behavior, the content surface response, what state changes, what the consciousness substrate has to know to make it work). Note: local-LLM hardware is *not* a Day 1 procurement item — the three-backend abstraction is designed against published serving interfaces (Ollama, vLLM, llama.cpp server) and the local-LLM execution is deferred to when on-prem hospital deployment becomes real, per D.12.

2. **AI coding tool head-to-head.** Use Claude Code on a small subsystem for a few days. Use Cursor on a parallel subsystem for a few days. Same subsystem scope each time — a basic Patient Registry endpoint (auth, event emission, simple CRUD, structured against the committed stack: Next.js + Supabase + TypeScript). Note developer velocity, handling of substantial coherent codebase, cross-file refactoring quality, test generation quality, fit with the founder's working style. Commit to one as primary; treat the other as available alternative. The application code built here is throwaway.

3. **LLM orchestration language test.** Build the smallest LLM-orchestration subsystem in Python (with FastAPI) and again in TypeScript (with Node service or as a Next.js route). The subsystem: parse "schedule a CT abdomen with contrast for Mrs. Rossi" via Claude API, return a structured action, consult a tiny consciousness-substrate query to resolve which patient, emit an event. Same scope each time. Note which feels right for the consciousness substrate's query patterns, which integrates more cleanly with the committed AI coding tool, which produces clearer code under solo + AI work. Commit. The code built here is throwaway.

4. **The paradigm prototype.** Build the smallest CT scheduling prototype on the committed stack — Next.js + Supabase + Supabase Realtime + Claude API + chosen LLM orchestration service. The clinician's experience: voice or text input on the conversation surface ("schedule a CT abdomen with contrast for Mrs. Rossi tomorrow afternoon"), the system infers the patient from current context (consciousness substrate query: who is the user currently with?), the order appears on the content surface (worklist updates), the schedule reflects the proposed time, the conversation surface shows brief confirmation. Iterate on the timing, the layout, the synchronization behavior, the materialized-confirmation pattern for when ambiguity arises. The success test: does the action on the conversation surface and the state change on the content surface feel like one event? If yes, the paradigm implementation pattern is settled enough to base Phase A on. If no, iterate; if iterations don't converge, surface the issue in the Master Doc and revisit the stack commitment (D.12). The code built here is throwaway; the lessons survive.

5. **Master Doc refinement throughout.** Every lesson the thread produces — what the AI tool head-to-head revealed about working style, what the orchestration language test revealed about Claude API ergonomics, what the paradigm prototype revealed about the synchronization design — gets captured in V26 → V27 (or whatever version is current) as the thread runs. The discipline is V25 Part V Section 6 (Update Protocol): sessions touching Phase 0 work end with the Master Doc reflecting what was learned, before the session ends. Tech Choices Status entries move from "committed pending narrow validation" to "committed with empirical reasoning." Q.1 and Q.1a entries move toward "settled" as the prototype produces working answers.

6. **Phase 0 ends** when the criteria in "Goal and bar" above are all true. Substrate exploration, three-backend LLM exercise, frontend framework testing, and database confirmation — all V25 Phase 0 workstreams — fold into the paradigm prototype (substrate query is exercised by the prototype's patient-inference; database is confirmed by the prototype running on it; frontend is confirmed by the prototype's content-surface implementation) or defer (three-backend LLM exercise defers to when on-prem hardware exists, per D.12).

#### Pack workstream initiations alongside the software thread (since V27)

V26 D.13 commits the pack as Phase A deliverable, not software alone. Several pack workstreams are **lead-time-sensitive** and must initiate during Phase 0, not at Phase A start. These run **in parallel with the software thread above**, not after it:

- **Italian voice talent for Agent Builder receptionist persona (Pack Workstream 1 — software, voice quality dependency).** Identification + contract + recording session for a custom Italian receptionist voice (ElevenLabs Professional Voice Cloning) + listener panel for Italian-native quality assessment + medical-receptionist consultant for register/diction guidance + Italian GP consultation on patient-facing voice expectations. Cannot be self-validated solo (per Stage 1 Step 1.2 risk: founder is not Italian-native voice quality judge for medical clinical context). Lead-time-sensitive: studio booking + talent contract + recording session + post-production + AB validation takes substantial calendar time before Phase A voice work is ready.
- **Sogei certificate provisioning for FSE 2.0 mTLS (Pack Workstream 6 — regulatory roadmap dependency).** PEC to `fse_support@sogei.it` + CSR generation + identity verification + cert delivery has external 4-10 weeks lead time per fase per launch region; cannot parallelize after the fact. Phase 0 initiates with launch region selection (which may itself depend on launch hospital selection — see below).
- **Italian DPO + lawyer engagement (Pack Workstream 2 — regulatory roadmap).** AI Act Art. 50 disclosure language review for clinician + patient-facing surfaces; DPIA template for AIRIS-implementation-specific Garante composition; per-launch-hospital legal sign-off on break-glass per Garante Provv. 604/2024 PSS ≥70% precondition.
- **Clinical collaborator engagement (Pack Workstream 3 + 4 — market analysis and business model dependency).** One MMG + one specialist per Phase A PDTA (Scompenso Cardiaco + Diabete Tipo 2 + BPCO per Stage 1 Step 1.8) for PDTA validation; ad-hoc clinical informaticist / operations lead engagement for Automation Builder canvas authoring validation; at least one outpatient context (for the realistic ambient-acoustic environment characterization).
- **Launch hospital selection + CIO/CTO engagement (Pack Workstreams 3 + 4 — business model).** Region + hospital + procurement terms + NIS2 supplier security questionnaire response + ISO 27001 readiness signaling. Likely two regions deep enough across Stage 1 evidence to defend "AIRIS works on Italian regulatory + hospital integration reality."
- **ISO 27001 readiness assessment kickoff (Pack Workstream 6 — regulatory roadmap).** Cert is Phase B (post-launch); readiness assessment in Phase 0 establishes the baseline that Phase A development meets.

These initiations are **not** Phase 0 thread steps — they are parallel concerns that must start during Phase 0 to be ready when Phase A needs them. The software thread (steps 1-6 above) is the discipline-of-execution-against-software; pack workstream initiations are the discipline-of-execution-against-pack. **Per V26 D.13: the pack workstreams run alongside the software work in Phase A, not after; for the lead-time-sensitive ones, alongside begins in Phase 0.**

Cross-references: Part III D.13 (pack as Phase A deliverable); Part III R.9 (breadth-of-coverage as central AGFA value prop); Part III R.11 (no premature internal Phase A roadmap; pack timeline appropriate Phase A pack deliverable); Part V Section 5 (Pack Workstream Status sub-section tracking the seven pack workstreams; Phase 0 entries reflect what initiates here).

#### 2.0.1 What survives Phase 0

Phase 0 produces throwaway application code by intention. What survives is structural, not code:

**Carries forward into Phase A:**
- The committed AI coding tool (settings, learned workflow, configuration).
- The committed LLM orchestration language (Python or TypeScript) and any small scaffolding specific to that choice.
- The committed stack as exercised (Next.js + Supabase + Supabase Realtime + Claude API), with confirmation that it supports the paradigm without visible compromise.
- The paradigm implementation pattern lessons — synchronization approach, surface timing, materialized-confirmation timing, optimistic update strategy, the interaction-design answer to how LLM latency is handled in the conversation surface so the paradigm feels one-event. Captured in V26+ Part IV Section 3 (Phase A interaction layer description), in Part V Q.1 (which moves toward settled), and in any new R.X entries for foundational reasoning the thread surfaced.
- The consciousness substrate architecture decisions lessons — what signals the prototype exercised, what query shape worked, what the latency budget looked like in practice. Captured in V26+ Part V Q.1a and Part IV's Phase A consciousness substrate description.
- The dev environment — Linux setup, Git configuration, editor and tool configurations, Supabase project, Vercel project, Claude API access. Phase A uses this environment from Day 1.

**Does not survive (throwaway by design):**
- The Patient Registry-style subsystems built for the AI tool head-to-head.
- The LLM orchestration subsystems built for the language test.
- The CT scheduling paradigm prototype application code itself.

The discipline: keep configurations, abstractions, decisions, lessons. Throw away application code. Phase A is the right place to write production-discipline application code; rewriting in Phase A is fast given the design is settled, the stack is known, the tools are committed.

#### 2.0.2 Where Phase 0 lessons go

Phase 0 lessons go directly into the Master Doc sections where they belong, not into a separate Phase 0 journal. The Master Doc IS the journal. Version control (V26 → V27 → etc.) preserves history; the current version always reflects current reality.

Specifically:

- **Tech-stack micro-choices committed** (AI coding tool, LLM orchestration language) → Part V Section 5 (Technical Choices Status) updated from "committed pending narrow validation" to "committed with empirical reasoning"; Part V Section 1 (Decision Log) gets a chronological entry; if foundational enough, Part III D.X promotion via the protocol in Project Core.
- **Paradigm implementation pattern lessons** → Part IV Section 3.1 (Phase A interaction layer description) refined with the grounded approach; Part V Q.1 moves toward settled.
- **Consciousness substrate architecture lessons** → Part IV Section 3.1bis (Phase A consciousness substrate description) refined; Part V Q.1a moves toward settled.
- **Stack-level surprises** (if Supabase Realtime, Next.js, or Claude API turn out to have unexpected misfit) → Part V Section 5 entries revisited; Part V Section 4 (Risks) entries added or updated; potentially Part III D.12 revisited if the surprise is structural.
- **Procedural lessons** (e.g., "this kind of work needs to happen in this kind of session") → Project Core's Working Protocols if VIVA-wide, Part VI Orientation if AIRIS-specific.

When Phase 0 ends, all of Section 2 (this section) gets reviewed and refined — the Phase 0 description itself was a hypothesis; Phase 0 experience tested it; the V27 (or current) Phase 0 section reflects what Phase 0 actually was. This serves future readers and any future VIVA application that might have its own Phase 0.

---


### Section 3 — Phase A: The Real Thing

Phase A is where AIRIS becomes real — not as a finished hospital-deployable system (that's Phase D) but as the working software and surrounding pack artifacts that make the Phase B conversation real. The bulk of Part IV is this section because the bulk of the substantive work is here.

The V26 reshape: Phase A's scope and quality bar are reworked around qualitative coverage of the kinds of distinctive thing AIRIS does, not quantitative module coverage; the deliverable is a pack of which software is one piece. See Part III D.10 (scope reshape), D.11 (single quality bar), D.12 (committed tech stack), D.13 (pack as deliverable), R.9 (breadth-of-coverage value proposition), R.10 (same code throughout phases, workstreams differ).

The subsections below describe what gets built in Phase A and what surrounding workstreams the pack requires. The subsections inherit names from V25 where the underlying spec hasn't changed; their Phase A descriptions are adjusted to the V26 framing.

#### Goal and Bar

The output of Phase A is a pack that an AGFA strategic and technical evaluator can engage with and recognize as a real trajectory toward a category-defining product, not a demonstration of one piece. The pack has both software and non-software components, and the bar applies to all of them uniformly: production discipline within scope, honest absence outside scope (Part III D.11).

**What's in scope (built with production discipline):**

- **Radiology module, deep.** Production-discipline implementation of Radiology end-to-end — scheduling, check-in, execution, reporting, archive — with the dual-surface paradigm + consciousness substrate working across the full module. CT scheduling is the natural anchor scenario (Phase 0 already produces the prototype, Phase A productionizes it across the module). Radiology proves the philosophy is real, not slideware.
- **One additional module, deep enough for cross-module flow.** Typically Emergency (because Emergency is the most cross-cutting orderer) or Cardiology (because Cardiology orders into Radiology and the order paths are clean). Built to the depth needed to fire orders into Radiology, exchange data through unified data (not HL7), and demonstrate the Cross-Module Order Flow (Part II Section 6) as real architecture. Workflow depth is bounded to what cross-module flow requires; the rest is at the honest-partial depth of the other nine modules.
- **The other nine modules, honest partial.** Each present and architecturally real — data model in place, conversation surface and content surface wired into the dual-surface paradigm, event emission stubs in place, Regulatory Layer hooks defined — but workflow depth bounded to what conveys the module's shape rather than what makes the module complete. An evaluator clicking through Pathology, Nuclear Medicine, OR, ICU, Care Unit, Lab, Dialysis, Endoscopy, or whichever of Emergency/Cardiology isn't the deep second module, sees the module's architectural reality and a clear "this is the shape; full workflow depth is Phase C with clinical partners" affordance on deferred paths.
- **All three Builders (Automation, Agent, Integration) at production discipline.** Each is its own market-opening capability and each is its own value proposition to AGFA. An evaluator can sit down at any of the three Builders, configure a new agent / automation / integration, and watch it operate through the system. The Builders are not pre-built examples; they are working configurators with runtimes. Each builder has a UI, a runtime, an audit trail, permissions, guardrails. This is real engineering work — each Builder is a substantial subsystem.
- **The Regulatory Layer real, with at least one Italian artifact.** Production-discipline generation of one real artifact from Radiology's clinical activity (e.g., an FSE 2.0 CDA R2 document from a Radiology report, or an SDO entry from an Emergency discharge once Emergency is the deep second module). Demonstrates the architectural pattern of institutional/legal translation as a discrete layer (per Part II Section 16). Transmission to real regional endpoints is Phase D; valid generation against schemas happens in Phase A.
- **The dual-surface paradigm and consciousness substrate at production discipline.** The paradigm runs across all eleven modules as architecture (both surfaces present everywhere, synchronization wired, consciousness substrate accumulating context). The depth of *interaction* is bounded by what's implemented per module — deep on Radiology and the second module, honest partial elsewhere.
- **Unified data layer.** Implicit in everything above running on a single Supabase Postgres database. Not a separate workstream; demonstrated by virtue of the cross-module flow working without HL7 internally.
- **Module Independence.** Implicit in the deep Radiology module being complete as a self-sufficient product alongside Core. Demonstrated; not separately built.

**What's honestly absent (not in Phase A scope, marked visibly as deferred to specific later phases):**

- **Module workflow depth on the nine partial modules.** Phase C, with clinical partners.
- **Real device integrations.** Simulated DICOM/HL7 in Phase A; real device integrations in Phase D, with hospital partner.
- **Real Italian regulatory submission.** Valid artifact generation in Phase A; real submission to FSE 2.0 endpoints, NSIS pipeline, SDO databases in Phase D.
- **Hospital-local LLM execution.** Three-backend abstraction designed and exercised against Claude API + AIRIS-hosted backend in Phase A; local-LLM execution against 70B-class hardware in Phase D with hospital infrastructure.
- **Multi-tenant deployment.** Single-tenant Phase A; multi-tenant Phase D if SaaS path, single-tenant per-hospital if on-prem path.
- **IEC 62304 certification, MDR Technical File, security audit, clinical validation.** All Phase D / late Phase C — wrap the existing code, do not require different code (per Part III R.10).

**The pack workstreams in Phase A (per Part III D.13; V27 operationalization):**

V26 D.13 committed that the pack is the Phase A deliverable, not software alone. V27 makes the seven pack workstreams explicit as first-class Phase A work, not byproducts of software work. Each runs alongside software per V26 D.13 commitment "pack workstreams run alongside the software work in Phase A, not as Phase B preparation."

The seven pack workstreams:

1. **Working software** — what the rest of this Section 3 describes. Phase A scope per D.10 + D.11 + D.12 + D.14-D.19; architectural inventory per Part II Section 17. This is one of seven, not the umbrella.
2. **Regulatory roadmap** — standalone artifact for AGFA showing certification (IEC 62304, MDR Class IIb per D.19), regulatory submissions (FSE 2.0, NSIS, SDO, AGENAS under L. 132/2025 Art. 10), compliance work sequence + cost projections + dependencies on deployment milestones. Substantively informed by Stage 1 outputs (Sogei accreditamento per region; Italian regulatory union per D.19; NIS2 + EU AI Act timing; MDR Class IIb pathway); Phase A synthesizes into standalone deliverable.
3. **Market analysis per module's territory** — for each of 11 modules (Radiology, Emergency, Operating Room, Care Unit, ICU, Laboratory, Pathology, Cardiology, Dialysis, Endoscopy, Nuclear Medicine), what market AGFA could expand into, market size, competitive landscape, AIRIS's distinguishing fit. Different from Stage 1's incumbent-per-software-subsystem analysis (Dedalus/GPI/Engineering/Equipe/Reply per Section 17 §17.21); per-module-territory analysis is per-clinical-module market.
4. **Business model articulation** — how AIRIS becomes sustainable product, pricing patterns per region (FSE 2.0 maturity differences), deployment economics per hospital size, relationship to hospital procurement realities (NIS2 supplier contracts per D.Lgs. 138/2024 + ACN det. 164179, ACN qualifications, ISO 27001 readiness signaling). Primarily strategic articulation rather than research.
5. **Vision document** — standalone artifact distinct from Master Doc. Master Doc is internal reference; vision document is AGFA-evaluator-facing pack artifact: what AIRIS becomes when fully realized, why breadth matters (per R.9), why now (Italian regulatory tailwind per D.19; EU AI Act enforcement Aug 2026/2027; FSE 2.0 transition window).
6. **Pack timeline (Phase C/D + post-deployment trajectory)** — what Phase C, Phase D, post-deployment look like with AGFA's resources; credible path from Phase A pack to hospital-deployable systems and beyond. Per Part III R.11: this is appropriate Phase A pack deliverable and serves credibility as partner/competitor; distinct from premature internal Phase A roadmap which R.11 rejects. Demonstrates AIRIS thinks clearly about what comes after Phase A.
7. **AGFA-specific narrative (the tying-together)** — why AIRIS's breadth is AGFA's expansion path, why AIRIS's architecture is what makes the breadth tractable rather than burdensome, why the pack as a whole is more valuable than the sum. Integrates all other pack components into the single story AGFA evaluators see. Late-stage integration; finalized closer to AGFA conversation.

**Lead-time-sensitive pack workstream initiations begin in Phase 0**, not Phase A (see Section 2.0 "Pack workstream initiations alongside the software thread"): Italian voice talent recording + Sogei certificate provisioning + Italian DPO/lawyer engagement + clinical collaborator engagement + launch hospital selection + ISO 27001 readiness assessment. These run during Phase 0 alongside the software prototype thread.

**Work patterns differ across workstreams.** Working software (1) follows Section 3's structured Phase A execution. Regulatory roadmap (2) is synthesis pass from Stage 1 + targeted gap-filling. Market analysis per module (3) is 11 mini-research-passes per clinical-module market. Business model (4), vision document (5), pack timeline (6), AGFA-specific narrative (7) are primarily strategic articulation with founder + Claude co-development. Not all workstreams need research; some need structured drafting.

**Cross-feeding between workstreams is essential.** Regulatory roadmap clarifies what the Regulatory Layer artifact must demonstrate; market analysis informs which second-deep module to choose; vision document points at what working software demonstrates; AGFA-specific narrative ties all together; pack timeline grounds trajectory in regulatory + deployment realities.

**Tracking:** Part V Section 5 holds the **Pack Workstream Status** sub-section with per-workstream current state. Active Plan (operational doc) holds operational tracking. Master Doc Part IV anchors the strategic frame.

Cross-references: Part III D.13 (pack as Phase A deliverable); Part III R.9 (breadth-of-coverage); Part III R.11 (no premature internal Phase A roadmap; pack timeline appropriate); Part IV Section 2.0 "Pack workstream initiations" (lead-time-sensitive initiations during Phase 0); Part V Section 5 Pack Workstream Status sub-section.

**Quality bar applied uniformly:** production discipline (Part III D.11). Real error handling, real types, decent abstractions, real tests for load-bearing logic, audit trails working, security baseline reasonable. Within scope, an AGFA evaluator can probe and not find visible compromise. Outside scope, deferred paths are visible as such, not hidden.

#### 3.0 Tech stack (committed per Part III D.12)

The stack Phase A is built on:

- **Frontend:** Next.js (React, App Router)
- **Application backend:** Next.js server actions and API routes for application logic; separate LLM orchestration service in Python or TypeScript (Phase 0 narrow validation decides which)
- **Database:** Supabase Postgres
- **Real-time sync:** Supabase Realtime (conversation surface ↔ content surface)
- **Auth:** Supabase Auth or Clerk
- **Deployment:** Vercel for Phase A; same code path migrates to self-hosted Postgres + dedicated infrastructure for Phase D
- **AI coding tool:** Claude Code primary (or Cursor if Phase 0 head-to-head reverses this); developer-in-loop, not autonomous
- **LLM:** Claude API for development and Phase A; three-backend abstraction designed in code from the start but exercised against local-LLM hardware in Phase D
- **Version control:** Git
- **Code organization:** Monorepo

This is the committed Phase A stack. Tech Choices Status entries in Part V Section 5 carry the full reasoning per entry and the "what would prompt revisiting" notes.

#### 3.1 The Interaction Layer — Building the Dual-Surface Paradigm at Production Discipline

The interaction layer in Phase A is the production-discipline implementation of the dual-surface paradigm (articulated at VIVA Master Document Section 6) on top of the consciousness substrate (Section 7). Phase 0 produces grounded patterns for synchronization and surface behavior; Phase A productionizes those patterns across the modules at the depth each is built to (per Part III D.10, D.11).

What gets built:

**The conversation surface** — production implementation. Voice input always available (the system listens when the clinician is in a relevant context, handling clinical Italian and the slang of each specialty, gracefully handling ambient noise and overlap). Text input always available (same understanding as voice, for moments when speaking isn't natural). Brief feedback display showing what was said, what was understood, and what the system is doing. Materialized surfaces appearing when ambiguity or stakes require focused confirmation, dismissing when their purpose is served. The conversation surface is the same component across all modules (it's universal); what differs is the domain vocabulary it understands.

**The content surface** — production implementation. Every module's GUI lives here: worklists, schedules, patient charts, reports, agent builders, automation configurations, regulatory dashboards. Fully featured at the depth the module is built to (deep on Radiology + second deep module, honest-partial on the other nine — per D.10). State always reflects current reality. The content surface is what each module's UI work produces — different per module, but coherent in design language.

**The synchronization** — production implementation. A single underlying state, real-time bidirectional sync via Supabase Realtime. Actions on the conversation surface cause content surface state to update; direct manipulation on the content surface is immediately reflected. No drift between the two. The user can switch between surfaces mid-task without breaking flow. The latency target validated in Phase 0 (paradigm prototype) holds at Phase A scale.

**Every action available on both surfaces** — production implementation. Every clinical action (order, schedule, document, review, sign, communicate) within the deep modules' built scope has a conversation path and a content-surface path. Both are equal-status. Neither is a fallback. This is a strong requirement on the design of each deep module's content-surface UI: nothing can be "voice-only" or "click-only." For the honest-partial modules, the requirement holds for the workflows that are built; deferred workflows are visibly deferred (per D.11).

What Phase 0 has informed (patterns that shape Phase A work):
- The synchronization implementation pattern that actually feels seamless (validated on CT scheduling, generalized in Phase A)
- The conversation-surface layout and behavior that works across module contexts
- The way materialized confirmations appear and dismiss
- How discoverability works without persistent menus (relationship-style learning rather than menu-memorization)
- How the GUI direct-manipulation path coexists with conversation mid-flow
- How high-stakes (T4 safety tier) actions interact with the conversation surface

What Phase A produces beyond Phase 0:
- The paradigm working at production discipline across the deep modules' built scope (Radiology end-to-end and the second deep module's cross-module workflows)
- The paradigm wired into the honest-partial modules at architectural depth (both surfaces present, synchronization plumbed, consciousness substrate accumulating context) with workflow depth bounded per D.10
- The synchronization handling realistic load and the complexity of real cross-module flows between the two deep modules
- Integration with the consciousness substrate across all eleven modules' signal sources
- The fallback paths, the edge cases, the safety handling, the audit trails — all at production discipline

#### 3.1bis The Consciousness Substrate — Production Build

In parallel with the interaction layer build, the consciousness substrate (VIVA Master Document Section 7) gets built for production. The substrate is what makes the paradigm work; the paradigm is what the user sees of the substrate.

What gets built:

**Signal accumulation.** Continuous capture of relevant context: clinician location (where physical signals are available), recent chart access, active sessions, ward roster, scheduled procedures, recent conversation history, recent actions taken, the state of pending work. All of this fed into the substrate in real time.

**Context query.** A clean API by which the conversation surface, the content surface, and other system components can ask "what's the current context for this user right now?" with appropriate latency budgets. The query returns enough to make the inferences the paradigm requires (which patient is implied, which view is most relevant, whether the user's attention has shifted, etc.).

**Privacy boundaries.** The substrate operates within defined privacy bounds. For AIRIS specifically: clinical context only, GDPR-compliant, data not used for purposes outside the clinician's work, retention bounded, audit-trailed. The substrate respects the discipline that consciousness is in service of the user's craft, not surveillance.

**Accuracy and graceful degradation.** When the substrate doesn't know something with confidence, it says so rather than guessing badly. The conversation surface then asks the clinician (briefly) rather than producing wrong inferences. The system is honest about what it knows and doesn't.

Phase 0 has explored how the substrate is feasibly built (what kinds of signals can be accumulated tractably, what latency budgets work, what kinds of inferences are achievable). Phase A builds the production version of that.

The consciousness substrate is among the harder pieces of Phase A work. It is also where the philosophy lives technically. Without it, the dual-surface paradigm is a chat interface and a GUI; with it, the system becomes the kind of thing VIVA is trying to build.

#### 3.1ter Live state of paradigm-and-consciousness implementation

This is the live snapshot of where production implementation of the paradigm and substrate is. Updated as work progresses. Distinct from Phase 0's exploration log (which captured throwaway prototype lessons); this captures the state of production code.

Format for entries:
- **Module / Component:** Which piece of the system
- **Build status within Phase A scope:** Not started / In progress / Built within scope at production discipline (per D.11)
- **Depth tier** (per D.10): Deep (Radiology, second deep module) / Honest-partial (other nine) / Cross-cutting (Core, Builders, Regulatory Layer, paradigm, substrate)
- **Consciousness substrate integration status:** Not integrated / Partial / Full
- **Notes:** Important details about how it's working, what's still rough within scope, what was harder than expected, what is honestly deferred per scope

*Currently empty — this subsection grows as Phase A implementation progresses.*



#### 3.2 Architectural Foundation — The Core Build

Core must exist before any module can run on it. The Core build is the technical foundation that everything else sits on.

What Core includes (cross-references to Part II Section 5 / CORE System Components for full specification):
- Patient Registry — patient records, demographics, identifiers
- User Management & Security — two-level system (System Admin + Module Admin), role-based access
- Authentication — login, session management, audit-logged access
- Event System — pub/sub architecture, the substrate for cross-module communication
- Database structure — designed from the start to support all eleven modules and future expansion
- Interaction Layer foundation — Central Gateway, routing architecture, session context management, LLM service layer abstraction (the LLM serving abstraction is detailed in 2.6)
- Patient Flow Layer foundation — encounters, beds, transfers, discharge

What Core does *not* include (these arrive later in Phase A):
- Module-specific workflows
- The Regulatory Layer's specific adapters (the framework lives in Core; the adapters get built as modules emit the events that need them)
- The Builders' UIs and runtimes (frameworks in Core; full Builder capabilities arrive after first modules)
- LLM-specific configuration (the abstraction lives in Core; the configurations get layered on)

Cross-phase note: Core's architectural decisions constrain everything later. Decisions that turn out wrong here are expensive to revisit. This is why technical choices are tracked in Part V (Live Edges) with explicit "what would prompt revisiting" notes — to keep them open even as code accumulates.

#### 3.3 The Regulatory Layer Build

The Regulatory Layer (specified in Part II Section 16) is one of AIRIS's market-changing capabilities. It must be working in Phase A — not as adapters to real regional gateways (that's Phase D), but as functioning subsystems that demonstrably do what they claim.

What the Regulatory Layer needs in Phase A:

**Code-mapping subsystem.** Working translation from clinical descriptions to code systems (ICD-9-CM, CIPI from January 2027, Esito 01–14, LOINC, RadLex, SNOMED CT, ATC, DRG). The clinician describes a discharge diagnosis in Italian medical language; the subsystem produces the matching codes with confidence scores. This is the audit-flagged displacement reversal — codes derive from clinical content rather than clinicians selecting from dropdowns.

**Document generation.** Working CDA R2 XML generation for FSE 2.0 (LDO, VPS, modality-specific reports), working SDO XML compilation per DM 380/2000 format with all 31 required fields, working PAdES signature handling. The documents don't need to be transmitted to real regional gateways in Phase A (that's Phase D); they need to be generated correctly and validate against the appropriate schemas.

**NSIS flow scaffolding.** Working data extraction for SDO flow, EMUR-PS flow, HSP.22bis. Scheduled batch transmissions to a stand-in endpoint that demonstrates the data is correctly formatted; the real endpoints are Phase D.

**Verification points (carry over from Part II Section 16).** Specific schema versions, current ministerial formats, current grouper versions, current NSIS schedules, AI Act applicability dates need to be verified against current authoritative sources before implementation. This verification is bounded research that happens during the Regulatory Layer build, not before. It does not gate Phase A; it informs the Regulatory Layer's specific implementations.

The Regulatory Layer build benefits from being done early in Phase A (after Core, before or alongside the first modules) because (a) it demonstrates the philosophical commitment that bureaucratic translation is the system's job, not the clinician's; (b) modules emit the events the Regulatory Layer consumes, so the Layer needs to be there when modules go live; (c) it's a substantial but bounded body of work that benefits from focus.

#### 3.4 Module Build Sequence

The build sequence is determined by what serves the V26 scope (Goal and Bar above; Part III D.10): Radiology built deep, one additional module built deep enough for cross-module flow demonstration, the other nine present at honest-partial depth. Core must exist before any module.

**Build order:**
1. **Core System** (must be first — see 3.2)
2. **Radiology Module — built deep.** Phase 0's CT scheduling prototype productionizes into the full Radiology module — scheduling, check-in, execution, reporting, archive — at production discipline across the module. This is where the dual-surface paradigm + consciousness substrate get demonstrated at depth. Order-based workflow surfaces the cross-module ordering pattern. DICOM Worklist Manager exercised against simulated DICOM.
3. **Second deep module — built deep enough for cross-module flow.** Typically **Emergency** (most cross-cutting orderer, originates orders into Radiology and Lab, episode-driven workflow surfaces another architectural pattern, real-time triage demonstrates urgency handling) or **Cardiology** (cleaner order paths into Radiology, cath lab and device clinic surface their own paradigm-exercising flows). The choice is made during early Phase A based on which serves the AGFA-specific narrative best — Emergency reads as broader market opportunity; Cardiology reads as cleaner technical demonstration. Built to the depth needed to fire orders into Radiology, exchange data through unified data (not HL7), demonstrate the Cross-Module Order Flow (Part II Section 6) as real, and exercise the second specialty's distinct workflow patterns.
4. **The remaining nine modules — built at honest-partial depth.** Laboratory, Operating Room, Care Unit, ICU, Pathology, Nuclear Medicine, Dialysis, Gastroenterology/Endoscopy, and whichever of Emergency/Cardiology isn't the deep second. For each: data model in place per Part II spec, conversation surface and content surface wired into the dual-surface paradigm, event emission stubs in place, Regulatory Layer hooks defined where applicable. Workflow depth bounded to what conveys the module's architectural shape rather than what makes the module complete. Specialty-specific UI patterns present in skeletal form (the radiologist looking at the Cardiology module sees a Cardiology shape, not a Radiology clone). Deferred workflows are visibly deferred — clear "this is the shape; full depth lives in Phase C with clinical partners" affordance on paths not implemented.

**What "deep" means for the two deep modules (Radiology + second):**
- All the module's environments work end-to-end at production discipline
- Voice/text primary path works for the module's main workflows
- GUI direct-manipulation works equivalently for the same workflows
- Module emits the events specified in Part II at production discipline
- Module integrates with the Regulatory Layer for at least one real artifact
- Module participates in cross-module flow (orders to/from the other deep module) through unified data
- The consciousness substrate accumulates and serves context for module workflows
- Realistic clinical scenarios work end-to-end, not only demo-script paths

**What "honest partial" means for the other nine modules:**
- Module is architecturally real (data model, surfaces wired, events stubbed, Regulatory Layer hooks defined)
- An evaluator clicking through sees the module's shape and recognizes the specialty
- Deferred workflows are visibly deferred, not faked or hidden behind broken-on-probe placeholders
- The architecture supports later deep build during Phase C without rework — what's deferred is workflow depth, not architectural participation

This is a scope decision per Part III D.10. The quality bar within the depth that is built — both for the two deep modules and for the visible parts of the nine partial modules — is production discipline per Part III D.11. No demo code anywhere; honest absence where workflow depth is deferred.

What's deliberately not refined anywhere in Phase A (workable but not polished — applies to all eleven modules at their respective depths):
- Permissions: two-level system (System Admin + Module Admin) is built at production discipline. Granular per-action permission matrices are Phase C refinement.
- Event System: core pub/sub is real at production discipline. Loop detection, dead letter queues, sophisticated retry logic are Phase D production refinements.
- UI Polish: functional, clean, professional. Visual refinement against design-system perfectionism is continuous, not a Phase A blocker.
- Integration Protocol Depth: the Integration Builder architecture matters more in Phase A than supporting every HL7 message variant. Protocol depth grows over Phase C/D.
- Performance Optimization: correctness before scale. Real-load performance work happens in Phase D with real users.
- Notification System: framework and routing logic are real. Advanced alert fatigue mitigation and escalation chains are Phase C/D refinements.

These simplifications are in *depth of implementation* and *operational maturity*, never in *architecture* or *code discipline*. The architecture is correct from day one (per Part III R.10); the code is production discipline within whatever scope is built (per Part III D.11).

#### 3.5 The Builders — All Three at Production Discipline

The three Builders (Automation, Agent, Integration) are each their own market-opening capability and each their own value proposition to AGFA per Part III R.9. Phase A delivers all three at production discipline — not pre-built example agents/automations/integrations, but working configurators with runtimes that an AGFA evaluator can sit down at, configure something new, deploy it, and watch it operate through the interaction layer.

This is real engineering work — each Builder is a substantial subsystem and all three are in scope at the same quality bar.

**Automation Builder.** Deterministic, rule-based workflow configuration. UI for defining triggers (event types and conditions), actions (system operations within permissions), and rules. Runtime that executes configured automations against the live event stream. Full audit trail. Configurable per hospital. Phase A bar: an evaluator can configure an automation (e.g., "when an MRI is scheduled, send preparation instructions to the patient 48 hours before"), deploy it, and watch it fire against real event flows.

**Agent Builder.** AI agent configuration. The most complex of the three. UI for defining an agent's job description in natural language, permissions (agent-as-virtual-user with bounded scope), guardrails, and rollback conditions. Runtime that executes agent decisions within scope, integrating with the LLM service layer, operating through the interaction layer the same way human users do, fully audited. Phase A bar: an evaluator can configure a new agent (e.g., "appointment confirmation agent calling patients 24 hours before"), deploy it, and watch it operate with full audit visibility.

**Integration Builder.** External integration configuration. Generic adapter framework for HL7 v2, FHIR, REST, SOAP, custom DB, file drop, SFTP, with visual field mapping. UI for configuring a new integration (endpoint, protocol, field mappings, transformations, error handling). Runtime that operates configured integrations against external systems. Phase A bar: an evaluator can configure a new integration (e.g., "ingest HL7 ADT messages from an external system into AIRIS Patient Registry"), deploy it, and watch it operate; in Phase A this is exercised against simulated external endpoints, with real external systems coming in Phase D.

All three Builders are built alongside the modules, not before — modules generate the events that Builders consume, so the Builders are testable against real workflow events as soon as the deep modules are running. Each Builder produces at least one fully-working showcase configuration alongside the builder itself (e.g., Lab Critical Value Agent built with Agent Builder, MRI prep automation built with Automation Builder, mock HL7 ADT integration built with Integration Builder), but the showcase is a demonstration of the Builder, not the Builder's only capability.

#### 3.6 LLM Serving — Multi-Backend Abstraction

AIRIS must eventually run with the LLM hosted in three different ways:
- **Hospital-local** — model runs on the hospital's infrastructure (GPU server inside the hospital network), no external traffic. The modal Italian deployment when Phase D delivers real on-prem deployment.
- **AIRIS-hosted** — model runs on AIRIS's infrastructure (cloud or co-located), hospital connects to it. From the hospital's data-flow perspective this is similar to online API; the difference is who runs the inference.
- **Online API** — commercial LLM provider (Claude API for Phase A and ongoing development). Fastest iteration during development; hospitals that accept the data-processing arrangement can use this.

Same codebase, configured differently per deployment.

**Phase A scope (per Part III D.12).** The three-backend `LLMService` abstraction is designed in code from day one, with the Claude API backend operational at production discipline and the AIRIS-hosted backend operational where useful. The **local-LLM backend is designed against the published serving interfaces (Ollama, vLLM, llama.cpp server) — the abstraction contract is specified and code-tested against mocks of those interfaces — but the local-LLM backend is not exercised against a real 70B-class model in Phase A.** That exercise moves to Phase D when hospital on-prem deployment is a real workstream and the hospital infrastructure exists to test against.

This is a deliberate departure from V25's Phase 0 requirement that all three backends be exercised against real models. The reasoning: the abstraction shape is what the architecture needs to commit to, not the model behavior. The serving interfaces of Ollama, vLLM, and llama.cpp server are well enough understood that the abstraction can be specified with confidence and verified against mock implementations of those interfaces. The cost of testing the abstraction against a real 70B-class model in Phase A — workstation hardware or rented GPU time — buys little (the abstraction was already well-defined) and delays Phase A. The cost of being wrong is low (when on-prem deployment becomes real in Phase D, the abstraction either holds or gets a small revision; either way it's not Phase A blocker work).

The LLM serving choice is tracked in Part V (Live Edges) Technical Choices Status with the full reasoning. When better open-weight models emerge, when hosting economics shift, when new commercial APIs offer relevant capabilities, the choice gets revisited honestly.

#### 3.7 Tools and Dev Environment (per Part III D.12)

The stack and tools committed for Phase A development:

**AI coding tool.** Claude Code as primary, subject to Phase 0 head-to-head validation against Cursor. The choice is grounded in direct experience of fit with AIRIS-style work (substantial coherent codebase, complex domain, architectural attention required, cross-file refactoring quality, test generation, working style fit). Autonomous-agent coding tools (Devin and similar) are not yet good enough to be trusted with high-stakes domain code without extensive supervision; staying with developer-in-loop tools is correct for AIRIS's stage.

**Version control: Git.** Git is the memory between sessions. AI coding tools have no persistent memory; the codebase plus the documentation discipline is what carries memory forward. Every session ends with all work committed.

**Dev environment.** Linux native or WSL on the founder's development machine. Real Supabase Postgres for dev (Supabase free tier or cheapest paid tier for Phase A development). Real Claude API access. Local toolchain for Next.js development. The dev environment mirrors production architecturally (same Postgres, same real-time sync, same LLM service abstraction, same Next.js); what differs from production is hosting topology and scale.

**Code organization.** Monorepo. Simplifies AI coding tool context and cross-module refactoring; appropriate for solo + AI. The decision is settled per Part III D.12; per-module repositories revisited only if team scaling in Phase D produces structural reasons to split.

**Backend language and framework.** Frontend logic and most application logic: Next.js (React, App Router) with TypeScript, server actions and API routes for backend behavior. Separate LLM orchestration service: Python (with FastAPI) or TypeScript (Node service or extension to the Next.js backend) — decided by Phase 0 narrow validation. Both candidates are workable; the choice is grounded in direct experience with Claude API patterns, AI coding tool integration, and consciousness substrate query needs.

**Frontend approach.** React via Next.js App Router. Mature, strong AI coding tool support, supports the dual-surface paradigm's synchronization patterns natively through the server/client component model. Tracked in Part V Section 5 with the full reasoning.

**Database.** Supabase Postgres for Phase A development and AGFA-demonstration deployment. Same code path migrates to self-hosted Postgres in Phase D for on-prem hospital deployment. Postgres is committed (the case is structural — relational + JSON, full-text search, listen/notify, supports the data model AIRIS specifies, runs locally for on-prem); managed vs self-hosted is the variable, and the variable is sequenced (managed in Phase A, self-hosted in Phase D). Tracked in Part V Section 5.

**Real-time sync.** Supabase Realtime. Built on Postgres logical replication; self-hostable; migrates with the database. Supports the conversation surface ↔ content surface synchronization at the latency the dual-surface paradigm needs. Validation that this works at the needed latency is part of Phase 0's paradigm prototype test.

**Auth.** Supabase Auth or Clerk. Either is workable; the choice can defer slightly without blocking Phase A start. Supabase Auth integrates more cleanly with the rest of the stack; Clerk has more polish. Tracked in Part V Section 5.

**Deployment.** Vercel for Phase A frontend + Next.js backend. Same code path migrates to dedicated infrastructure in Phase D for on-prem hospital deployment.

The tool and infrastructure choices are committed per Part III D.12 with the full reasoning above. They remain trackable in Part V Section 5 with "what would prompt revisiting" notes — committed does not mean immutable.

#### 3.8 Testing and Documentation Discipline

These two disciplines are what keeps Phase A from drifting as code grows.

**Documentation discipline.** The Master Documents (AIRIS Master Doc and VIVA Master Document) and Project Core must always be current enough that any new session can begin reading them and work without ambiguity on any decided matter. Every decision made — in a conversation, a build session, anywhere — is reflected in the appropriate document before the session ends. Not later. Not eventually. The cost of one undocumented decision compounds silently across sessions that don't have it.

**Testing discipline.** Realistic for solo + AI: unit tests for non-obvious logic, integration tests for cross-module flows, end-to-end tests for the major user journeys per module. Not test-driven development as religion (sometimes counterproductive when paradigms are being invented), but tests as living verification of what's actually working. AI coding tools can write substantial test coverage if asked; the discipline is asking.

**Build session structure.** Each session begins with reading the relevant Master Document(s). Each session ends with code committed and Master Document updated to reflect what was decided. This is what keeps the system sane across many sessions with no persistent AI memory.

#### 3.9 The Pack — Non-Software Workstreams (per Part III D.13)

Phase A's deliverable is a pack, not software alone. The pack workstreams run alongside the software work in Phase A, not after. Each is named explicitly here so it's a tracked workstream rather than an afterthought.

**Business model articulation.** How AIRIS becomes sustainable as a product. Pricing patterns for hospital procurement (subscription? perpetual license? per-bed? per-module?), deployment economics (cloud vs on-prem cost structures), the relationship to Italian hospital procurement realities (regional buying, gara pubblica patterns, partnership models with system integrators), revenue trajectory through Phase B/C/D. This work informs the AGFA-specific narrative and stands on its own as a credible business case if independent operation becomes the Phase B path.

**Vision document.** What AIRIS becomes when fully realized — across the eleven modules, across Italian hospitals, beyond Italy. Why the breadth matters (Part III R.9 reasoning, expressed for an audience). What category of product AIRIS defines and what the next decade looks like with that category mature. Concise and concrete; this is not a manifesto. It is what an evaluator points at when asked "where is this going."

**Timeline.** What Phase C, Phase D, and post-deployment look like with AGFA's (or any acquirer/partner's) resources. The credible path from Phase A's pack to hospital-deployable AIRIS, to first deployment, to scaled deployment. Milestones honestly named; durations honestly estimated against solo-vs-team realities; clinical and regulatory dependencies surfaced.

**Market analysis per module's territory.** For each of the eleven modules, a concise analysis of the market AGFA could expand into through that module: market size (Italian, European, broader), competitive landscape (existing products serving that specialty), AIRIS's distinguishing fit, the partnership opportunity within that specialty. Eleven analyses; each sized to what a strategic conversation needs (one to two pages each, not full market reports). Together they make the breadth-of-coverage value proposition concrete: not "AIRIS does many things" but "AIRIS unlocks these specific eleven markets, each sized as follows."

**Regulatory roadmap.** What Phase D's certification and submission work looks like, sized and sequenced. IEC 62304 traceability work and timeline; MDR Technical File preparation; security audit (which firms, what scope, what cost); real FSE 2.0 endpoint connection (credentials, recognition, regional variations); NSIS pipeline real submission; SDO real submission; clinical validation protocol; deployment engineering for hospital-local installation. Where each requires what (auditor, partner, budget) and how it sequences. This is the work that turns Phase A's "Regulatory Layer produces valid artifacts against schemas" into "AIRIS submits real artifacts to real regional systems."

**AGFA-specific narrative.** The tying-together: why AIRIS's breadth is AGFA's expansion path (R.9), why AIRIS's architecture (Module Independence + unified data + the Builders) is what makes the breadth tractable rather than burdensome, why AIRIS's interaction paradigm (dual-surface on consciousness substrate) is what makes adoption different from existing HIS. The narrative is not the same as the vision document — the vision document is product-focused; this narrative is AGFA-strategic-fit-focused. It's the document that anchors the Phase B conversation when it happens.

The pack work is real work and benefits from being tracked alongside the software work. None of the pack artifacts can be drafted well in retrospect, after Phase A software is done — they inform what Phase A software should demonstrate and what Phase B should ask for. The discipline: pack artifacts get drafted during Phase A, refined as the software work clarifies what's demonstrable, finalized when the AGFA conversation timing approaches.

#### 3.10 Phase A Completion Criteria

Phase A is complete when ALL of the following are demonstrably true. The criteria apply to the V26 scope (Part III D.10) at the V26 quality bar (Part III D.11).

**Software (per scope in Goal and Bar above):**
- **Core complete at production discipline.** Patient Registry, User Management, Authentication, Event System, Database (Supabase Postgres), Interaction Layer foundation, Patient Flow Layer foundation — all working with real data, production-discipline code.
- **Radiology module deep, production discipline.** Full module end-to-end (scheduling, check-in, execution, reporting, archive), dual-surface paradigm + consciousness substrate working across the module, real Italian regulatory artifact generated (FSE 2.0 CDA R2 or equivalent) from Radiology activity.
- **Second deep module (Emergency or Cardiology) deep enough for cross-module flow, production discipline.** Orders fire into Radiology through unified data, results return, the cross-module exchange is real.
- **Other nine modules present at honest-partial depth, production discipline within visible scope.** Data model in place per Part II, surfaces wired into the paradigm, event emission stubs, Regulatory Layer hooks defined. Deferred workflows visibly deferred.
- **All three Builders at production discipline.** Automation Builder, Agent Builder, Integration Builder — each is a working configurator with runtime, audit trail, permissions, guardrails. An evaluator can sit down at any of the three, configure something new, deploy it, watch it operate.
- **Regulatory Layer real.** Code-mapping subsystem, document generation, NSIS scaffolding all functional at production discipline. At least one Italian artifact (FSE 2.0 CDA R2, SDO XML, or equivalent) generated correctly from clinical activity in the deep modules. Transmission to real regional gateways is Phase D.
- **Module Independence demonstrably true.** Core + Radiology alone works as a complete product. Core + Emergency alone works the same way. The architecture supports the principle observably.
- **The dual-surface paradigm working at production discipline.** Both surfaces present everywhere, synchronization wired and feeling like one event, consciousness substrate accumulating context across modules. Depth of interaction bounded by per-module workflow depth.
- **LLM serving abstraction designed and operational.** Three-backend abstraction implemented in code; Claude API backend exercised in Phase A; AIRIS-hosted backend operational; local-LLM backend designed against published serving interfaces with contract specified. Local-LLM execution against 70B-class hardware deferred to Phase D.

**The pack (per 3.9):**
- Business model articulation drafted and coherent
- Vision document drafted and concrete
- Timeline drafted with honestly estimated milestones
- Market analysis per module's territory completed (eleven analyses)
- Regulatory roadmap drafted with Phase D work sized and sequenced
- AGFA-specific narrative drafted as the strategic anchor for Phase B

**Documentation:**
- AIRIS Master Document (current version V26+ as Phase 0 lessons surface) reflects what was actually built and decided
- VIVA Master Document current (no AIRIS-specific work creates VIVA-level changes in Phase A unless reasoning surfaces otherwise)
- Project Core current
- No undocumented decisions

When all of these are true, Phase A is done and Phase B (finding the way) can begin with a real pack to bring to AGFA.

---

### Section 4 — Phase B: Finding the Way

Phase B begins when Phase A's completion criteria are met and the demonstration is convincing enough to support real conversations.

**Primary target: AGFA.** The founder has existing AGFA relationships from prior employment. AGFA is in the HIS market globally; they would understand what AIRIS is and could see the strategic value of acquiring or partnering on its technology. The conversation begins through the existing relationship channel, not through a generic outreach. The initial framing is "I built this; it's real; I think you'll find this interesting" — not "would you consider acquiring my startup."

What Phase B produces depends on what AGFA's response is. Possible outcomes:

- **Acquisition.** AGFA buys the technology and the founder's continued involvement. The founder either joins AGFA or stays on consultatively. Phases C and D happen with AGFA's resources, machinery, and clinical relationships. This is the highest-likelihood positive outcome based on AGFA's incumbency in HIS, their understanding of the domain, and their existing relationship with the founder.
- **Partnership with co-development funding.** AGFA invests in continued development without acquisition. The founder retains independent operation but with resources and AGFA's clinical channels. Less common as an outcome but possible.
- **Polite decline.** AGFA passes for any number of reasons (internal direction, organizational considerations, timing). This is real possibility and the plan must work without AGFA. See fallback paths.

**Fallback paths if AGFA passes.** Other large HIS players in the European market — Dedalus (Italian), Cerner (now Oracle Health), Epic (less likely given European market), Philips Healthcare (varies by region), Siemens Healthineers. These conversations are harder than AGFA because the founder doesn't have existing relationships, but the demonstrable technology is the same and may speak for itself.

If no acquirer or partner emerges, **independent operation toward first hospital deployment** is the next path. This is a much larger Phase D scope (full certification work, deployment engineering, sales process, support infrastructure) and probably requires team building. But the technology — what was built in Phase A — remains the foundation. AIRIS doesn't restart; it scales up.

**Timing of the AGFA conversation.** Begins when Phase A is *demonstrably complete*, not earlier. Premature conversations undercut the eventual real one — first impressions matter, and if AGFA sees AIRIS partway, the framing carries forward. Better to wait until the system can speak for itself than to enter the conversation explaining what it will be.

What AGFA evaluators will likely want to see (the pack — per Phase A D.13 and Section 3.9 — preparation completed during Phase A):
- Software at V26 Phase A scope (Part III D.10): Radiology deep, second module deep enough for cross-module flow, the other nine present at honest-partial depth, with the architecture observably real per module
- All three Builders demonstrably operational at production discipline
- Cross-module flow demonstrably working through the two deep modules' order exchange
- The Regulatory Layer producing at least one valid Italian artifact from clinical activity
- The dual-surface interaction paradigm working at production discipline across the deep modules; wired into the partial modules at architectural depth
- The three-backend LLM abstraction operational (Claude API + AIRIS-hosted); local-LLM execution against real hardware deferred to Phase D (per D.12) and surfaced honestly in the pack's regulatory roadmap
- Code quality and architecture they could absorb into their pipeline (production discipline within scope per D.11)
- The pack artifacts: business model, vision document, timeline, market analysis per module's territory (eleven analyses), regulatory roadmap, AGFA-specific narrative tying breadth-of-coverage to expansion opportunity (per D.13)
- A coherent story for what Phase C and Phase D look like with AGFA's resources — what the wrapping workstreams (certification, real integration, security audit, clinical validation, regulatory submission infrastructure, deployment engineering) require and how they sequence (per R.10)

The conversation itself — what to say, how to position, what to ask for — is its own work, not Phase A's. Phase B has an entry point (Phase A complete) and an output (AIRIS finds its way), but the path between them is a real conversation with real people, conducted by the founder, who has the relationships AIRIS doesn't have.

---

### Section 5 — Phase C: The Deep Professional Phase

Phase C is when AIRIS becomes what it claims to be in the full VIVA sense — a real instance of seeing-and-serving applied to clinical work. This is where the principle in VIVA Master Document Section 3 (Foundational Method) gets fully realized.

This phase happens after Phase B because it requires resources, time, and clinical relationships that Phase B's path-finding makes available. It is positioned here, not skipped or deferred indefinitely. It is the phase where AIRIS earns the claim its Master Document makes.

The work is module by module, workflow by workflow. Sit alongside the actual radiologist, surgeon, nurse, intensivist, lab technician, dialysis nurse — find the final shape of *their* things. See what is *their* art and what is *their* noise. Build correspondence between the system and their actual day. The audit document's Part 2 module-specific touchpoints get worked through here, alongside everything else that emerges from real engagement.

If Phase B was AGFA acquisition, Phase C happens within AGFA's clinical relationship network — they have hospitals using their existing products, and those clinicians can be the partners for AIRIS's deep professional phase. If Phase B was independent operation, Phase C happens through whatever clinical relationships the founder builds (likely starting with the hospital that becomes the first deployment).

What Phase C produces: an AIRIS where each module's workflows are tuned to how clinicians in that specialty actually work, where the interaction paradigm has been refined through real use, where the audit's pending findings are resolved through real clinical input rather than abstract reasoning, and where the documentation evolves alongside the implementation to reflect what was learned.

Phase C is open-ended in scope but bounded in purpose: the specific question is whether each module's work is recognizably craft-extending for the clinicians who use it. When that's observably true across modules, Phase C is functionally complete (though refinement continues forever).

---

### Section 6 — Phase D: Production Refinement

Phase D is the work to make AIRIS hospital-deployable. This is where the prototype-quality elements from Phase A become production-quality.

**Aesthetic refinement.** Visual design system, typography, motion design, accessibility polish. The materializing surfaces from Phase A get refined; the GUI fallback becomes pleasant to use; the system looks like what serious medical software should look like.

**Certification.** EU MDR conformity assessment for module classifications (Class IIa or IIb depending on specific clinical decision support features in each module). EU AI Act compliance for high-risk software. IEC 62304 software lifecycle compliance. GDPR for clinical data handling. EUDAMED registration. National-level certifications as required for each market.

**Deployment engineering.** Multi-tenant infrastructure where appropriate. Real device integrations (real DICOM, real PACS, real cath lab system, real device programmers, real lab middleware). Real regional FSE 2.0 gateway integration for each Italian region. Real NSIS submission infrastructure with real ministerial endpoints. Production monitoring, alerting, support infrastructure. Backup and disaster recovery. Security hardening (intrusion detection, audit log immutability, network segmentation per hospital requirements).

**Verification of regulatory specifics.** The verification points flagged in Part II Section 16 get verified against current authoritative sources and the relevant adapters get implemented to those specifics. HL7 Italia Implementation Guide current version. Current ministerial DRG grouper. Current NSIS schedules. Current AI Act timelines. Regional FSE gateway endpoints and authentication mechanisms.

**Performance optimization.** Real-load profiling, query optimization, caching, all the production-quality operational work that doesn't matter for a Phase A demonstration.

**Multi-language and internationalization** (if expanding beyond Italy).

If Phase B was AGFA acquisition, much of Phase D is AGFA's existing certification and deployment machinery applied to AIRIS — they have the certification team, the device-integration team, the deployment engineers, the support infrastructure. The founder's role is technical guidance to ensure the philosophy survives the productization process, not running the productization itself.

If Phase B was independent operation, Phase D is significantly larger and probably requires team-building (certification specialists, deployment engineers, integration developers, support staff). This is a real difference between the AGFA path and the independent path: Phase D is much harder solo.

---

### Section 7 — Notes on the Arc

This is a draft. Real work will adjust it.

Phase A surfaces things that change Phase B's positioning. Phase C surfaces things that change the AIRIS Master Doc. Phase D surfaces compliance issues that affect architecture. Each phase surfaces things that affect the next. The arc is a current best-guess at the shape of the path; the path itself emerges in walking it.

The arc intentionally does not include dates or durations. Solo founder timelines with AI tools are unreliable predictors; durations vary by phase content; the work takes what it takes. Tracking progress by phase milestones (interaction layer working end-to-end; first module complete; all eleven modules complete; all Builders functional; regulatory layer working; AGFA conversation begun; AGFA conversation concluded; first co-design completed; first hospital deployment) is more honest than tracking by elapsed weeks.

The umbrella structural decisions for VIVA-the-organization (legal entity, brand, team structure, financial model) are deliberately not in this arc. They are deferred until Phase B's path is clearer, because the right structural answer depends on what path emerges. They become urgent at the time they need to be answered, not before. Tracked in VIVA Master Document Section 7 as the deferred-but-acknowledged organizational branch.

The Development Strategy section that previously lived in Part II is now folded into this Part IV (specifically: 2.2 covers what was in "Build Sequence — Core System"; 2.4 covers what was in "Build Sequence" for modules; 2.7 covers what was in "Build Tool: Claude Code" and infrastructure choices; 2.8 covers what was in "What Stays Simplified in Early Build" and "Documentation Discipline"). Part II no longer contains a Development Strategy section because that content is plan content, not specification content.

---

### Section 8 — Implementation State Tracking

The spec (Part II) is normative — what AIRIS should be. As implementation happens through Phase A and beyond, actual code may be ahead of the spec (because implementation reveals refinements), behind it (because not everything is built yet), or diverging (because something tried to be built and didn't work out, requiring a different approach).

This section tracks the actual state of implementation per major component, updated as implementation progresses. It's the bridge between what the spec says and what actually exists.

**Format for entries:**

Per CORE component, per module, per Builder:
- **Spec status:** Where the spec for this lives in AIRIS Master Doc Part II (section reference)
- **Implementation status:** Not started / In progress / Built / Built and refined
- **Divergence notes:** Where implementation differs from spec, why, and what document should change (spec updated to match learned reality, or implementation realigned to spec) — usually decided by which one is more right

**CORE Components:**

| Component | Spec | Implementation Status | Divergence Notes |
|---|---|---|---|
| Patient Registry | Part II | Not started | — |
| User Management & Security | Part II | Not started | — |
| Authentication | Part II | Not started | — |
| Event System | Part II | Not started | — |
| Database structure | Part II | Not started | — |
| Interaction Layer foundation | Part II | Not started | — |
| Patient Flow Layer foundation | Part II | Not started | — |
| (remaining CORE components — table extends as implementation begins) | Part II | Not started | — |
| Regulatory Layer | Part II §16 | Not started | — |

**Modules:**

| Module | Spec | Implementation Status | Divergence Notes |
|---|---|---|---|
| Radiology | Part II | Not started | — |
| Laboratory | Part II | Not started | — |
| Emergency | Part II | Not started | — |
| Dialysis | Part II | Not started | — |
| (remaining 7 modules — table extends as implementation begins) | Part II | Not started | — |

**Builders:**

| Builder | Spec | Implementation Status | Divergence Notes |
|---|---|---|---|
| Agent Builder | Part II | Not started | — |
| Automation Builder | Part II | Not started | — |
| Integration Builder | Part II | Not started | — |

**The discipline:** as implementation progresses on any component, this table is updated. When divergence emerges, it's captured here and resolved deliberately — either the spec changes to match learned reality (most common when implementation reveals something better) or the implementation is realigned to spec (when the spec is more right and implementation took a wrong turn). Not as a passive log; as an active reconciliation point that prevents spec and reality from drifting.

When implementation is complete and aligned with spec, the entry reads "Built." When implementation is built with documented refinements over original spec, it reads "Built and refined" and the spec gets updated to reflect what was learned.

This section becomes most active during Phase A. Phases B/C/D have their own implementation work (deployment engineering, certifications, integrations) but the bulk of "spec vs implementation" reconciliation happens in Phase A as the system is first built.

---


---

## PART V — LIVE EDGES

**V28 audit note**: Part V substantive content preserved from V27. V28 audit notes:
- Several V27 Open Questions resolved by recent session decisions: AI coding tool single-tool choice (Claude Code primary, Cursor sequential) resolved per V27 D.12 + recent session direction; Phase 0 infrastructure shape resolved per D.20 + D.23; LLM substrate active backend resolved per D.22.
- V27 Risks R.1-R.11 audited — all remain live for their original concerns. R.10 (code stays the same throughout phases) reframed in V28 as Working Principle 0.3.3 (Part 0) — relocated as foundational principle while R.10 entry preserved as risk-tracking-of-violation discipline.
- V27 Open Architectural Questions audited — see Part VII Section 7.4 (Deferred Architectural Decisions) for current structured backlog. Open questions not yet resolved are migrated to Part VII for active resolution tracking.


This Part holds the parts of AIRIS's project state that change as work progresses. Distinct from Part III (Decisions and Reasoning), which captures what is settled — Part V captures what is in motion.

Six subsections: Decision Log (running record of decisions made, with date and reasoning); Open Questions (live edges of unresolved matters, with what triggers revisiting each); Current Directions (matters leaning toward an answer but not yet committed); Risks and Hard Turns (honest list of what could go wrong); Technical Choices Status (current best options with what would prompt revisiting each — this is the explicit register of the "tech choices are servants, not commitments" principle); Update Protocol (how this document and the others stay alive without ossifying or drifting).

Part V is updated continuously. Decisions move from Open Questions or Current Directions to Decision Log when they get committed. Current Directions emerge from Open Questions when a working answer forms. Technical choices update when revisited. Risks materialize and get resolved. The protocol governs all of this.

---

### Section 1 — Decision Log

This is a chronological running record of decisions made about AIRIS. Each entry records what was decided, when, and the reasoning. Future sessions read this to understand what's settled and why.

Older decisions made before the Decision Log was formalized are captured in Part III (Decisions and Reasoning). Going forward, new decisions are recorded here as they happen.

| Date | Decision | Reasoning |
|---|---|---|
| 2026-05-08 | V24 Documentation structure: tree of Master Documents with Project Core as coordinator | Multi-application growth made single-Master-Doc-for-everything unworkable. See Part III D.7 and VIVA Master Document Section 5. |
| 2026-05-08 | Database: PostgreSQL is the current best-current-option (not a foundational commitment) | Stable, well-supported, full-featured, runs locally on hospital infrastructure (deployment requirement). See Part IV 2.7 and Section 4 below. |
| 2026-05-08 | LLM Serving: three-backend abstraction designed from day one (hospital-local, AIRIS-hosted, online API) | Italian hospitals will mostly want hospital-local for security and cost reasons; AIRIS-hosted and online API are also needed for development speed and edge cases. Abstraction is needed regardless of multi-deployment intent. See Part IV 2.6. |
| 2026-05-08 | Phase A development uses online API (Claude or similar) as default; local-LLM must work before AGFA conversation | Online API provides best model quality for paradigm-design work; local-LLM demonstration is required for AGFA evaluation of on-prem viability. See Part IV 2.6. |
| 2026-05-08 | Phase A clinical depth uses founder's existing AGFA experience as input; deep co-design with clinicians is Phase C | The founder's clinical knowledge from AGFA is sufficient for prototype quality; Phase C does the irreplaceable seeing-with-specific-clinicians work. See Part IV 2.4 and Phase C section. |
| 2026-05-08 | All eleven modules built end-to-end in Phase A; partial demonstrations don't pass the AGFA bar | Acquirers have heard "this slice works, the rest is documented" before; only complete demonstration of philosophy across the system is convincing. See Part IV "Goal and Bar". |
| 2026-05-08 | Three Builders (Agent, Automation, Integration) built as fully working capabilities, not as pre-built examples | Market-changing thing is the builder, not the instance. AGFA evaluator can use the Builders to create new agents/automations/integrations on the spot. See Part IV 2.5. |
| 2026-05-12 | Renamed coordinator file from Project Memory to Project Core; renamed file `Project_Memory.md` → `Project_Core.md` | "Project Memory" suggested storage of past state, but the document actually holds the project's operating manual (tree, index, protocols, working discipline). "Project Core" names the load-bearing coordinator role accurately. Small semantic overlap with AIRIS "CORE System Components" noted but not blocking — contexts differ enough that confusion is unlikely. All references in V24 and VIVA Master Document updated to match. Project Instructions in Claude Project settings should reference Project_Core.md as the bible. |
| 2026-05-13 | The interaction principle is "least time and effort on the computer" — the operational form of displace-vs-extend | Earlier framing had VIVA principles as multiple co-equal demands. Reduces to one: the user spends as little time and effort as possible operating software. Everything else is consequence. Foundational; lives in VIVA Master Document Section 2 as the operational sharpening of the criterion. Also added as a cross-application principle in VIVA Master Document Section 5 ("Principle-first, not form-first"). See V25 Part III R.7. |
| 2026-05-13 | The interaction paradigm is the **dual-surface paradigm** — conversation surface + content surface, perfectly synchronized, every action on both, never penalized for choice. Materialization is one form the conversation surface can take, not the paradigm itself | The earlier "materialization paradigm" framing made a form into the goal. Correction: the principle (least time and effort) cannot be served by any single form. The dual-surface architecture allows whichever form fits each moment. Foundational at VIVA level. Lives in VIVA Master Document Section 6. AIRIS implementation specifics in Part II Section 8 and Part IV Section 3.1. See V25 Part III D.8. |
| 2026-05-13 | **System consciousness** is named as the foundational substrate the dual-surface paradigm depends on | The paradigm only works if the system maintains continuous awareness of what the user is doing, where they are, what they're attending to, what just happened. Without consciousness, paradigm fails. With it, paradigm becomes magic. Articulated at VIVA Master Document Section 7. Named as among the largest single technical challenges in Phase A; explored in Phase 0. See V25 Part III D.8 commentary. |
| 2026-05-13 | **Phase 0 — Exploration** added to the production plan, before Phase A | Going straight from spec to production code would require many major decisions made by reasoning alone. Phase 0 produces real intuitions by building small things to test approaches — paradigm implementation, consciousness substrate, tech stack, AI coding tools. Output: grounded commitments for Phase A. Lives in V25 Part IV Section 2. See V25 Part III D.9 and R.8. |
| 2026-05-13 | **Tech choices status updated**: most choices are now "to be tested in Phase 0" rather than "best-current-option" | Honoring the principle that tech choices are made by exploration, not reasoning alone. Backend language, frontend approach, code organization, AI coding tool choice — all genuinely open until Phase 0 produces evidence. PostgreSQL remains best-current-option for database (the case is strong enough that exploration confirms rather than discovers). LLM serving abstraction remains best-current-option for architecture (the three-backend need is structural). Updates to Part V Section 5 (Technical Choices Status). |
| 2026-05-16 | **Phase A scope reshape (V26): qualitative coverage, not quantitative.** All eleven modules present at varying depth — Radiology deep + one additional module deep enough for cross-module flow + nine at honest-partial depth. All three Builders at production discipline. Regulatory Layer real with at least one Italian artifact. | The AGFA evaluation bar is qualitative — does the philosophy work, is each distinctive capability real, does breadth-of-coverage demonstrate expansion opportunity. Quantitative module coverage at uniform depth is what Phase C and Phase D deliver with hospital and clinical partners. V25's "all eleven modules end-to-end at production-equivalent" was an aggregated bar that didn't map cleanly to what evaluators actually need. See V26 Part III D.10, R.9. |
| 2026-05-16 | **Single quality bar across phases (V26): production discipline within scope, honest absence outside scope.** Replaces V25's production-equivalent / working / prototype tier split. | The three-tier split was fuzzy in practice; the single bar is testable. Anything built is built with production discipline. Anything not built is honestly visible as deferred. Scope is where the choices live; quality is uniform. See V26 Part III D.11. |
| 2026-05-16 | **Tech stack committed (V26): managed services + custom code.** Next.js + Supabase Postgres + Supabase Realtime + Claude API + Vercel for Phase A. Same code path migrates to self-hosted Postgres + dedicated infrastructure for Phase D. | Strategic clarity reached in V26 narrowed the Phase 0 candidate space substantially. The dual-surface paradigm's hardest constraint (real-time bidirectional sync between surfaces) plus the strategic deployment migration story (managed for Phase A speed; self-hosted for Phase D on-prem) point to this specific stack. Convex was the runner-up; Supabase wins on Phase D migration cleanness. See V26 Part III D.12, Part V Section 5. |
| 2026-05-16 | **The pack is the Phase A deliverable (V26), not software alone.** Software + business model + vision + timeline + market analysis per module + regulatory roadmap + AGFA-specific narrative. | Strategic acquirers buy trajectory, not feasibility. The pack demonstrates trajectory; software alone demonstrates only feasibility. Pack workstreams run alongside software work in Phase A, not after. See V26 Part III D.13, Part IV Section 3.9. |
| 2026-05-16 | **Breadth-of-coverage as the central AGFA value proposition (V26).** Eleven modules = eleven new markets for AGFA. Three Builders = three distinct platform capabilities AGFA does not have. | AGFA's strategic gap is product breadth (imaging/RIS-PACS heritage). AIRIS's architecture (Module Independence + unified data + Builders) is what makes breadth tractable. Frames what gets demonstrated (each module visible as a market) and how (each Builder fully working). Rests on the load-bearing assumption that AGFA's appetite is for expansion across departments, not consolidation within imaging — assumption tracked as risk in Part V Section 4. See V26 Part III R.9. |
| 2026-05-16 | **Code is the same throughout phases (V26); workstreams that wrap it differ.** Phase A code is structurally what production code looks like; what's missing for hospital deployment is certification, real integration, security audit, clinical validation, regulatory submission infrastructure, deployment engineering — all workstreams *around* the code, not different code. | Direct implication: do not write "demo code" in Phase A. Write production-discipline code that the Phase D wrapping workstreams can wrap rather than replace. Failure mode being avoided: arriving at Phase D and discovering Phase A code was structurally a demo. See V26 Part III R.10. |
| 2026-05-16 | **Phase 0 narrowed (V26): three concrete sequential tests, not parallel workstreams.** Claude Code vs Cursor head-to-head; Python vs TypeScript for LLM orchestration service; smallest CT scheduling paradigm prototype on the committed stack to validate real-time sync feels like one event. | Strategic clarity in V26 collapsed most of V25's Phase 0 candidate space by reasoning grounded in a sharper frame. What was testable by reasoning was tested by reasoning. What remains genuinely empirical (the AI coding tool fit, the orchestration language fit, the paradigm-feel on the committed stack) is what Phase 0 now tests. The principle that tech choices are made by exploration is preserved; the candidate space is just smaller. Also surfaces a Phase 0 lesson before any code is written: V25's parallel-workstreams shape was unhelpful; sequential thread shape is what makes the plan thinkable. See V26 Part IV Section 2. |
| 2026-05-16 | **Local-LLM execution deferred from Phase 0 to Phase D.** The three-backend LLM abstraction is designed in code from the start and tested against published serving interfaces (Ollama, vLLM, llama.cpp server). Execution against a real 70B-class model on real hardware moves to Phase D when hospital on-prem deployment becomes real. | The abstraction shape is what the architecture commits to; the model behavior is not. Serving interfaces are well enough understood that the abstraction can be specified with confidence without firing up a 70B in Phase 0 or Phase A. Cost of being wrong is low (small revision in Phase D, not blocker). Cost of doing it in Phase 0 is real (workstation hardware or rented GPU time, time spent on hardware procurement and configuration). See V26 Part IV Section 3.6, Part III D.12. |
| 2026-05-16 | **AGFA expansion appetite named as load-bearing assumption (V26).** Strategy rests on AGFA wanting to expand across hospital departments adjacent to their existing imaging/RIS-PACS line. If actual play is to consolidate within imaging instead, the breadth pitch loses force and strategy needs deliberate pivot. | Named explicitly in Part V Section 4 (Risks) so the assumption stays visible and pivotable. Strategy proceeds on the founder's internal read of AGFA's appetite; intelligence shifts trigger deliberate re-evaluation rather than implicit drift. See V26 Part III R.9. |
| V27 commit | **V26 → V27 atomic cross-cutting commit.** Absorbs Stage 1 (Engineering Scope Pass; 10 subsystem analyses + cross-subsystem synthesis) + Stage 2 (Tech Stack Revisit consolidation) + Day 1 paradigm prototype sketch into Master Doc. New Part II Section 17 (Engineering Architecture) holds 21 operational commitments + naming references + Schrems-II posture + "doppio audit" reconciliation. D.12 refined; D.14-D.19 added (backend services tier topology / EU residency + Schrems-II / Inngest cross-Builder / hash-chained L6 audit ledger / Italian clinician identity composition / Italian regulatory anchor union). R.11 added (no premature internal Phase A roadmap; pack timeline appropriate Phase A pack deliverable). Pack-as-focus framing per V26 D.13 operationalized across Phase 0 + Phase A + new Pack Workstream Status sub-section in Part V Section 5. Open Questions rewritten (Stage 1 + 2 resolutions moved to Settled; 11 new open questions from Step 1.10 remaining cross-cutting decisions added). 24 new risks integrated into Part V Section 4 organized by category. Persona reframing reinforced for Automation Builder treatment. Naming references for forward accuracy in Section 17 §17.21. "Consciousness" terminology framing notes added at first Part I + first Part II uses. | Stage 1 (Engineering Scope Pass) substantively expanded the operational engineering stack with 21 commitments across all 9 analyzed subsystems; smart-and-open principle test produced one consistent answer across all 9 subsystem analyses (AIRIS owns paradigm-load-bearing semantics; borrows open libraries and EU-resident plumbing for primitives; rejects vendor platforms that would impose paradigm). Stage 2 (Tech Stack Revisit) confirmed V26 D.12 strategic-level commitment holds; substantial expansion at operational level; resolved 2 of 12 Step 1.10 cross-cutting decisions (Aruba migration as Phase B trigger-when-needed; EU Tech Sovereignty Package monthly monitoring cadence); identified surviving Phase 0 micro-choices (Claude Code vs Cursor; paradigm-prototype real-time-sync feel test). Pack-as-focus framing surfaced by founder conversation post-Stage 2 as structural correction to plan inheriting software-shaped framing despite V26 D.13 commitment. R.11 narrowed prior Step 1.8 "no roadmap before AGFA" principle: no premature internal Phase A calendar holds; pack timeline (Phase C/D + post-deployment trajectory) IS appropriate Phase A pack deliverable and serves credibility. Cross-cutting protocol executed: Step 1 (explicit V27 update inventory in V27_Commit_Plan.md temp doc); Step 2 (outline for coherence); Step 3 (atomic application — Stages A-G in two LLM turns); Step 4 (coherence verification scan); Step 5 (this Decision Log entry); Step 6 (Active Plan + Project Core update + temp doc discard). |

New decisions get appended to this log going forward. Each entry: date, what was decided, reasoning. Brief; the depth lives in cross-references to other Parts.

---

### Section 2 — Open Questions

These are live edges — known to be unresolved, deliberately left for later work. **V27 reorganizes this section into Settled (questions resolved by Stage 1 + 2 with where the resolution lives) and Open (questions still live, including new ones surfaced by Stage 1).**

---

#### Settled by V27 (Stage 1 + 2 outputs)

- **Q.1a — Consciousness substrate implementation approach:** Settled by Stage 1 Step 1.5. Six-layer architecture (L1 deterministic truth Postgres + L2 real-time propagation Supabase Realtime Broadcast + L3 hot context cache Upstash Redis + L4 semantic memory pgvector+BGE-M3 + L5 contextual interpretation Claude via Bedrock EU + L6 hash-chained audit ledger) bound by four AIRIS-native contracts (`read`/`write`/`subscribe`/`resolve`). Full operational detail in Part II Section 17 §17.4. Cross-references D.17 (hash-chained L6 audit ledger).

- **Q.2 — LLM orchestration service language Python or TypeScript:** Settled by Stage 1 Step 1.9 + Stage 2: **Python** services tier on Cloud Run europe-west8. Five Python services consolidate there (hl7apy + Saxon-C HE + Splink + BGE-M3 CPU + Pipecat). Resolved before Phase 0 starts — no longer a Phase 0 empirical test. Cross-references D.12 + D.14 + Part II Section 17 §17.2.

- **Authentication — Supabase Auth or Clerk:** Settled by Stage 1 Step 1.9: **Supabase Auth EU + Italian-claim Custom Access Token Hook**. Cross-references D.18 + Part II Section 17 §17.13.

- **Real-time sync mechanism — Supabase Realtime Postgres Changes or Broadcast:** Settled by Stage 1 Step 1.5: **Broadcast** for hot paths (Postgres Changes is single-threaded bottleneck). Private channels with RLS authorization on `realtime.messages`. Cross-references Part II Section 17 §17.4 L2.

- **Backend services tier deployment topology:** Settled by Stage 1 Step 1.9: Cloud Run europe-west8 (Milan) + Hetzner GEX44 (Falkenstein) + Docker on-prem agent (Medplum-Agent pattern). Steady-state ~€500-700/mo per launch hospital before LLM tokens and storage. Cross-references D.14.

- **Cross-Builder durable execution layer:** Settled by Stage 1 Steps 1.2 + 1.3 + reinforced across 1.4-1.9: **Inngest Pro Frankfurt EU** + Trigger.dev v3 documented escape hatch. Cross-references D.16 + Part II Section 17 §17.3.

- **LLM substrate for Phase A:** Settled by Stage 1 Step 1.5 + Stage 2: **AWS Bedrock EU inference profile for Claude** (primary) + Mistral La Plateforme EU (fallback). Anthropic memory tool acceptable for agent-internal scratchpads only (ZDR-eligible); NOT the substrate. Prompt caching mandatory + SLO discipline. Cross-references D.12 + Part II Section 17 §17.5.

- **Voice stack composition:** Settled by Stage 1 Steps 1.2 + 1.6: Pipecat transport + Deepgram Flux / AssemblyAI U3 Pro IT / Soniox stt-rt-v4 A/B + Smart Turn v3 + Silero v5 VAD + picovoice wake-word + MedWhisper Large ITA offline replay + ElevenLabs Italian custom-cloned + Cartesia Sonic-3 + Azure Italian Neural backup + Twilio. Cross-references Part II Section 17 §17.6.

- **MPI tooling:** Settled by Stage 1 Step 1.8: **Splink-Postgres** (Fellegi-Sunter; Italian-tuned blocking + Metaphone Italian phonetics + Garante DM 7.9.2023 audit). Cross-references Part II Section 17 §17.8.

- **PDTA state machine framework:** Settled by Stage 1 Step 1.8: **TypeScript-XState v5** with `setup()` type safety + Inngest durable persistence + FHIR PlanDefinition + BPMN export compilers. Three Phase A PDTAs: Scompenso Cardiaco + Diabete Tipo 2 + BPCO. Cross-references Part II Section 17 §17.8.

- **Schematron validator:** Settled by Stage 1 Step 1.4: **Saxon-C HE + SchXslt** (NOT lxml.isoschematron — documented infinite-loop bug on XSLT-2.0 Italian Schematron). Cross-references Part II Section 17 §17.7.

- **Sogei reference Gateway architecture:** Clarified by Stage 1 Step 1.1: REST/JWT centralized via `ministero-salute/it-fse-gtw-dispatcher` (AGPL-3.0 Java) read as integration spec; AIRIS implements as REST client (NOT deployed as black box). Cross-references Part II Section 17 §17.7.

- **Audit observability vs SRE observability:** Settled by Stage 1 Step 1.5 + 1.9: **disjoint stacks**. L6 audit (Postgres + cold object storage) for regulatory; Sentry EU + Grafana Cloud EU + Better Stack for SRE; Langfuse self-hosted for LLM. Cross-references D.17 + Part II Section 17 §17.16-17.17.

- **Backup architecture:** Settled by Stage 1 Step 1.9: 3-2-1 (Supabase PITR + Backblaze B2 EU + Hetzner Storage Box Frankfurt). Phase A target RTO 4h, RPO 15 min. Cross-references Part II Section 17 §17.18.

- **CI/CD architecture:** Settled by Stage 1 Step 1.9: GitHub Actions monorepo + pre-merge gates (TS build + tests + mypy + pytest + npm audit + pip-audit + Snyk + gitleaks + event schema diff + AsyncAPI catalog regen + PDTA DSL compile + Schematron mirror diff). Cross-references Part II Section 17 §17.19.

- **MDR Class IIb technical file maintenance approach Phase A:** Settled by Stage 1 Step 1.9: GitHub PR history + CI logs + canonical CHANGELOG.md + immutable B2 release notes. Off-the-shelf eQMS (Greenlight Guru / Matrix) deferred Phase B. Cross-references Part II Section 17 §17.20.

- **Q.3 — Frontend approach Next.js:** Already settled per V26 D.12; reaffirmed by Stage 1 across multiple subsystems with React 19 patterns (`useOptimistic`, `useTransition`, Zustand intent atoms) added. Cross-references Part II Section 17 §17.1.

- **Q.4 — Code organization Monorepo:** Already settled per V26 D.12; Stage 1 Step 1.9 added concrete structure (`apps/web`, `services/python`, `pdta-authoring`, `event-schemas`). Cross-references Part II Section 17 §17.19.

---

#### Open questions still live

##### Q.1 The dual-surface paradigm — specific implementation design questions

The paradigm itself is settled (V25 Part III D.8 + VIVA Master Document Section 6). Stage 1 Step 1.6 substantively informed IntentRevision DAG pattern + safety-tier state machine + three-modes-of-address router + IL T3/T4 escalation patterns (now in Part II Section 17 §17.6). Remaining open:
- The interaction-design answer for how the system handles LLM latency in the conversation surface so the paradigm feels one-event despite LLM responses taking seconds — Phase 0 paradigm prototype answers this for CT scheduling; Phase A generalizes across modules
- When and how materialized surfaces appear and dismiss; how multiple coexist — Phase 0 prototype starts this; Phase A productionizes
- How the conversation surface is laid out in real screen space — Phase A work, likely varies by module context
- How discoverability works without persistent menus — Phase A + Phase C work
- How power-user paths develop for fluent clinicians — Phase C with real clinicians
- How T4 safety-tier actions present in the dual-surface paradigm — Phase A

**Triggers revisiting:** Phase 0 paradigm prototype (Part IV Section 2.0.0). Phase A implements at production discipline across deep modules. Phase C refines with real clinicians.

##### Q.5 First market specifics — Italy beyond convenience

Stage 1 substantively informed (Italian regulatory union per D.19; FSE 2.0 transition window tailwind; regional patterns; Italian incumbent landscape per Section 17 §17.21). Open at the pack-workstream level: standalone vision document and AGFA-specific narrative articulating WHY Italy beyond convenience. **Triggers revisiting:** Phase A pack workstream 5 (Vision Document) and 7 (AGFA-Specific Narrative); Phase B AGFA conversation preparation.

##### Q.6 Regulatory verification specifics

Stage 1 substantively informed: CDA R2 v1.2 HL7 Italia IG April 2024; DM 380/2000 SDO format; ICD transition target 1 Jan 2027 (D.M. 23/10/2025); NSIS pipeline specs; EU AI Act enforcement Aug 2026 / Aug 2027; regional FSE 2.0 gateway endpoints (REST/JWT centralized via Sogei reference dispatcher); Schematron artifact catalog (LDO v5.3, VPS v3.6, LAB v25, RAD v3.8, PSS v3.4, RSA v7.9, RAP v1.3, PrF v4.4, PrS v2.4, ErF v1.0, ErS v1.0). Remaining open:
- DRG grouper current version (V21 referenced v24; needs current verification at Regulatory Layer build)
- AGENAS submission timing under L. 132/2025 Art. 10 implementing decrees (pending)
- EUDAMED requirements for MDR Class IIb device

**Triggers revisiting:** during Regulatory Layer build (Phase A 2.3); during Phase D for items needed at deployment.

##### Q.7 Umbrella structural decisions

How VIVA-the-organization is structured legally, branding, team structure, financial model, eventual public presence. None of this is urgent. **Triggers revisiting:** Phase B's path becomes clear.

##### Q.8 Other VIVA applications activation

The founder has mentioned at least two beyond AIRIS. Exist as concepts. **Triggers revisiting:** when the founder decides to activate one.

##### Q.9 Help / collaboration during Phase A

Stage 1 substantively reframed this question. Several Phase A workstreams require human inputs not substitutable by AI: Italian voice talent + listener panel + medical-receptionist consultant + Italian GP consultation (Pack Workstream 1); clinical informaticist / operations lead engagement for Automation Builder canvas validation; one MMG + one specialist per PDTA (Pack Workstreams 3 + 4); Italian DPO + lawyer engagement (Pack Workstream 2); launch hospital CIO/CTO engagement (Pack Workstreams 3 + 4 + 6). These are lead-time-sensitive and initiate in Phase 0 (Part IV Section 2.0 "Pack workstream initiations"). **Triggers revisiting:** Phase 0 surfaces which engagements happen and at what cadence.

##### Q.10 Launch hospital + region selection (NEW V27)

Specific Italian launch hospital + region selection is open. Affects Sogei accreditamento timeline planning, NIS2 supplier security questionnaire response shape, ISO 27001 readiness signaling depth, contractual terms, ACN qualification expectations. Drives several other open questions. **Triggers revisiting:** Phase 0 pack workstream initiation; founder existing AGFA-relationship strategic context informs.

##### Q.11 Aruba migration playbook detail (NEW V27)

Stage 2 recommended **Phase B trigger-when-needed**, NOT Phase A insurance spike (per D.15). Open question: how detailed should the migration playbook be documented in Phase A vs Phase B trigger moment? Pre-building Aruba migration spike for an event that may not happen is premature; documented migration path + Hetzner-already-EU-owned proves portability. **Trigger criteria for Phase A insurance spike:** (a) EU Tech Sovereignty Package binding regulation lands, or (b) launch hospital procurement explicitly demands EU-owned at contract negotiation. **Triggers revisiting:** EU Tech Sovereignty Package monthly monitoring cadence; launch hospital negotiation surfacing EU-owned demand.

##### Q.12 Italian clinical-collaborator requirements as Phase 0 deliverable (NEW V27)

Stage 1 surfaced multiple clinical-collaborator requirements (one MMG + one specialist per Phase A PDTA for validation; clinical informaticist / operations lead for Automation Builder canvas authoring validation; one outpatient context for ambient acoustics characterization). Open: aggregation of these requirements into a coherent Phase 0 deliverable + identification of specific collaborators. **Triggers revisiting:** Phase 0 pack workstream initiations.

##### Q.13 AGENAS submission timing under L. 132/2025 Art. 10 (NEW V27)

L. 132/2025 Art. 10 establishes AGENAS as governance authority for healthcare AI. Implementing decrees pending. Open: when does AIRIS submit to AGENAS — at Phase A development gate, Phase B pilot gate, Phase D deployment gate, or some other gate? **Triggers revisiting:** AGENAS implementing decrees publication; Italian DPO/lawyer engagement (Phase 0 pack workstream).

##### Q.14 Sogei accreditamento timeline planning per launch region (NEW V27)

External lead time 4-10 weeks per fase per region; sequential not parallel. Each launch region requires its own accreditamento. Open: which regions, in what sequence, with what trigger for initiating each. **Triggers revisiting:** Launch hospital selection (Q.10); Phase 0 pack workstream initiation timing.

##### Q.15 NIS2 supplier security questionnaire response (NEW V27)

D.Lgs. 138/2024 + ACN det. 164179 + ACN det. 127437/2026 — AIRIS as supplier to NIS2 essential entities faces supply-chain security obligations. Phase A target: ISO 27001 readiness + documented audit rights + MFA on admin + incident-notification SLA. Open: full questionnaire response content shape; per-hospital procurement contract negotiation specifics. **Triggers revisiting:** launch hospital procurement negotiation; ISO 27001 readiness assessment kickoff (Phase 0 pack workstream).

##### Q.16 Inngest Enterprise negotiation timing (NEW V27)

Pro tier 1M executions included up to 20M add-on supports ~10 facilities steady-state. Enterprise tier needed at ~10+ facilities scale; quote not publicly available, requires negotiation. **Triggers revisiting:** before second facility onboarding (Phase B commercial concern).

##### Q.17 EU Tech Sovereignty Package monitoring cadence (NEW V27)

Stage 2 recommended **monthly monitoring** of Commission communications + Italian government implementing decrees. Treat as forward-planning input, not settled mandate. Open: if package lands as binding regulation, trigger Aruba migration spike (per Q.11 trigger criteria). **Triggers revisiting:** monthly monitoring review; binding-regulation event.

##### Q.18 PDTA clinical-reality gap mitigation strategy (NEW V27)

Stage 1 Step 1.8 surfaced: Italian PDTAs as written by regions often don't match clinical reality. AIRIS encodes the canonical PDTA; clinical practice deviates routinely (not always wrongly — sometimes the deviation is clinically right). "Deviation as informational, not accusation" UX principle (Step 1.6 + 1.8). Open: how does AIRIS handle deviation gracefully — flag for review without blocking; offer to update PDTA template; surface to clinical informaticist for periodic review. **Triggers revisiting:** Phase A pilot with real clinicians.

##### Q.19 Multi-PDTA conflict surfacing UX (NEW V27)

Patient may be on multiple PDTAs simultaneously (Scompenso Cardiaco + Diabete Tipo 2 + BPCO realistic for elderly Italian patient). PDTAs may prescribe conflicting next actions. Open: how does the dual-surface paradigm surface conflicts coherently — both surfaces show conflict; conversation surface offers reconciliation; clinical informaticist tooling for batch resolution. **Triggers revisiting:** Phase A pilot territory; deferred from Stage 1.

##### Q.20 Italian medical keyterm dictionary curation (NEW V27)

Per AssemblyAI U3 Pro Italian (up to 1,000 keyterms) and Deepgram Flux Multilingual IT — Italian medical accuracy depends substantially on per-hospital keyterm curation (department-specific drug names, common procedures, local protocols). Open: per-hospital configuration vs central curation; who maintains; how updates propagate. **Triggers revisiting:** Phase A pilot at launch hospital characteristics determine.

---

### Section 3 — Current Directions

These are matters that are leaning in a specific direction but not yet settled enough to be decisions. The session has thought it through, has a working answer, but hasn't committed.

Distinct from the other Part V sections:
- **Decision Log (Section 1):** settled. Future sessions operate as if true.
- **Open Questions (Section 2):** unresolved. Future sessions know it's open.
- **Current Directions (this section):** working answer that hasn't been committed. Future sessions know what's being assumed but also know it could shift without ceremony.

The category matters because real work has more gradations than "decided" or "open." Many matters are functionally working answers that haven't earned the weight of explicit commitment. Putting them in the Decision Log inflates them; leaving them in Open Questions hides that there's a working answer; this section gives them their honest home.

**Format for each entry:**
- **Direction:** What we're going with as a working answer
- **Why:** Brief reasoning
- **What would prompt revisiting or promotion to a decision:** Specific trigger

When a Current Direction is challenged and reaffirmed, it stays here. When a Current Direction is committed to explicitly (or has accumulated enough downstream work that changing it would be costly), it gets promoted to the Decision Log — and to Part III if it meets the promotion criteria (see Project Core's "Decision promotion" protocol).

**Current entries:**

*Empty — this section grows as work surfaces leaning-but-not-committed states.*

---

### Section 4 — Risks and Hard Turns

Honest list of what could go wrong and what we'd do if it does. Not exhaustive — only the things worth thinking about explicitly.

**Risk: AGFA passes.** Possible for any number of reasons (internal direction, organizational considerations, timing, the technology not landing as expected). **Response:** Pursue fallback paths (other large HIS players in European market, then independent operation toward first hospital deployment). The technology built in Phase A is the foundation for any of these paths; AIRIS doesn't restart, it scales differently.

**Risk: AGFA's strategic appetite is for consolidation within their existing imaging/RIS-PACS line, not expansion into adjacent hospital departments (V26).** The entire V26 strategic frame (Part III D.10, R.9, D.13) rests on the assumption that AGFA wants to acquire breadth-of-coverage capability AIRIS provides — eleven specialty modules as eleven new markets. If their actual play is to deepen within imaging rather than expand across departments, the breadth-of-coverage pitch loses most of its central force. The founder's reading of AGFA internally is that the appetite is for expansion; V26 proceeds on that reading. **Response:** named explicitly as a load-bearing assumption so it stays visible and pivotable. Intelligence shifts about AGFA's direction trigger deliberate strategy re-evaluation, not implicit drift. If the assumption fails, the strategy pivots: either a different acquirer/partner whose appetite matches the breadth pitch (Dedalus, Cerner/Oracle Health, Philips Healthcare, Siemens Healthineers, each with their own strategic shape), or independent operation toward first hospital deployment where AIRIS makes the breadth case directly to hospitals rather than through an acquirer. The Phase A technology serves any of these paths; the pack artifacts (Part IV Section 3.9) get reframed for the actual interlocutor.

**Risk: The dual-surface paradigm and consciousness substrate prove harder than expected.** Together they are the hardest design and engineering problem in the project; it's possible the paradigm doesn't converge in reasonable time or the substrate cannot be made accurate enough at solo-buildable complexity. **Response:** Phase 0 surfaces this risk early — if Phase 0 produces intuitions that the paradigm or substrate is structurally too ambitious, the Master Doc gets refined before Phase A begins, scope reduces deliberately, and Phase A targets a narrower but real version. Phase A still completes; Phase C refines with real clinicians. The fallback: GUI fallback works robustly, voice/text input works, the paradigm operates in fewer scenarios than ideal but the system still passes the AGFA bar on its other distinguishing capabilities (Builders, unified data, Regulatory Layer, Module Independence).

**Risk: Solo + AI development hits a wall.** Some part of Phase A (likely a Builder, the Regulatory Layer, or the interaction paradigm) proves too complex for the solo + AI rhythm. **Response:** Bring in help (contractor, collaborator, partner). The Module Independence Principle means progress on other modules can continue while a hard subsystem gets unstuck.

**Risk: Runway runs out before Phase A completes.** Self-funded solo founder with extended scope. Possible. **Response:** Re-scope. The build sequence is technical-dependency-based; the first four modules (Core + Radiology + Lab + Emergency) demonstrate the architecture and could potentially serve as the AGFA conversation entry point if going further isn't feasible. AGFA conversation can begin earlier than ideal if necessary, with the trade-off that the demonstration is less complete.

**Risk: A core architectural decision (database, language, LLM abstraction) turns out wrong.** Real possibility. **Response:** The Live Edges Technical Choices Status section explicitly tracks "what would prompt revisiting" so this isn't catastrophic. Database and language are expensive to change but possible; LLM serving abstraction is what enables the multi-backend support and is easier to extend than to replace.

**Risk: Regulatory landscape shifts during Phase A.** AI Act implementation, MDR refinement, Italian regional changes. Possible. **Response:** The Regulatory Layer architecture is designed for exactly this — adapters absorb regulatory change, the rest of AIRIS doesn't. Verification of specifics happens during Phase A's Regulatory Layer build using whatever's current at that moment.

**Risk: Founder burnout.** Solo founder building substantial scope. Real risk. **Response:** Honest acknowledgment that this work is intensive. The plan does not specify durations partly because pretending pace can be set is dishonest. Pace is determined by what's sustainable, not what's optimal.

---

#### New risks from V27 (Stage 1 Step 1.10 synthesis)

Stage 1 cumulative analysis surfaced 24 new risks across categories. Organized below by category. Each risk includes mitigation framing; some are mitigated by Stage 1 + 2 commitments already, others are live going into Phase 0 + Phase A.

##### Italian regulatory risks

**Risk: Garante DM 7.9.2023 implementing decrees still settling.** L. 132/2025 + AGENAS implementing decrees pending; behavior under enforcement uncertain. **Response:** AIRIS commits to the Italian regulatory anchor union per D.19 (not single law); architecture is resilient to specific decree variations because it commits to over-comply on tracciamento + finalità + retention.

**Risk: Italian Schematron version drift.** Sogei publishes Schematron artifacts via GitHub; updates can land without notice and break validation. **Response:** Weekly mirror via Inngest cron from `ministero-salute/it-fse-catalogs/schematron`; SHA-pin per artifact; canary deploy on update detection (per Section 17 §17.7).

**Risk: Sogei cert rotation manual cadence.** Sogei has no public ACME API; cert renewal is manual via PEC + CSR; 1-2 yr lifetime; expiration would break FSE 2.0 submission. **Response:** Lead-time alerting at T-30/T-14/T-7/T-3/T-1 days; documented runbook; cert tracked in Infisical PKI (per Section 17 §17.15).

**Risk: FNOMCeO no public REST API.** Clinician verification cannot be programmatic; manual verification at onboarding only (per `portale.fnomceo.it/cerca-prof/` from 18 March 2026 — programmatic harvesting explicitly forbidden). **Response:** Manual verification flow at clinician onboarding documented; not assuming any automated lookup capability (per D.18 + Section 17 §17.13).

**Risk: ANA direct API not available.** Anagrafe Nazionale Assistiti has no programmatic interface for AIRIS to verify codice fiscale + identità anagrafica at scale. **Response:** Per-region INA service integration where available; otherwise reliance on hospital ADT system for identity primitives; MPI tooling absorbs the Italian identity edges (per Section 17 §17.8).

**Risk: AGENAS submission timing uncertain.** L. 132/2025 Art. 10 establishes AGENAS governance; implementing decrees specify submission timing. **Response:** Open question Q.13; Italian DPO + lawyer engagement (Phase 0 pack workstream) tracks decree publication; AIRIS architecture designed for submission at any phase gate.

**Risk: ACN det. 164179 compliance complexity.** 16 categories of minimum security measures; hospital essential-entity status drives supplier obligations on AIRIS (ACN det. 127437/2026). **Response:** Phase A target: ISO 27001 readiness + documented audit rights + MFA on admin + incident-notification SLA. Compliance October 2026 binding (per D.19).

##### EU regulatory risks

**Risk: Schrems-II posture.** EU regions but US-co vendors (Supabase, Vercel, Bedrock, Inngest, Sentry, Grafana Cloud) — CLOUD-Act-exposed even with EU regions. **Response (per D.15):** SCCs + DPIA + EU regions throughout + tested Aruba ACN QC3 migration target as Phase B trigger-when-needed. Italian incumbents (Dedalus on Azure, GPI on AWS) in same posture; AIRIS not worse, just more honest about it.

**Risk: EU Tech Sovereignty Package binding regulation.** Draft 27 May 2026 per CNBC reporting; final form/scope/timeline uncertain. If lands as binding, may require EU-owned infrastructure. **Response:** Monthly monitoring cadence (Q.17); Aruba migration spike triggered if binding regulation lands (Q.11 trigger criterion).

**Risk: EU AI Act enforcement timing.** Article 6/Annex III high-risk: 2 August 2026 unless Digital Omnibus delay enacted (proposed delay to December 2027 not enacted as of V27 commit; Council and Parliament have adopted negotiating positions). AI-enabled medical devices under MDR/IVDR with Notified Body assessment: 2 August 2027 (AIRIS as MDR Class IIb on this transition). Penalty up to €15M or 3% worldwide annual turnover. **Response:** AIRIS Phase A architecture designed for AI Act compliance (Article 12 lifetime-of-system logging per D.17; Article 50 disclosure language Italian DPO engagement in Phase 0). MDR Class IIb pathway prepared (per D.19 + Section 17 §17.20).

**Risk: NIS2 supply-chain security.** AIRIS as supplier to NIS2 essential entities (Italian hospitals) faces supply-chain security obligations under D.Lgs. 138/2024 + ACN det. 164179 + ACN det. 127437/2026. **Response:** Q.15 open question; Phase A target ISO 27001 readiness + documented audit rights + MFA + incident-notification SLA; ACN qualification consideration Phase B.

**Risk: MDR Class IIb timing.** Notified Body engagement for MDR Class IIb medical-device AI required by 2 August 2027. Phase B / late Phase C territory. **Response:** Phase A architecture designed to wrap (per R.10): GitHub PR history + CI logs + canonical CHANGELOG.md + immutable B2 release notes (per Section 17 §17.20). Off-the-shelf eQMS (Greenlight Guru / Matrix) deferred Phase B.

##### Vendor / tech risks

**Risk: Anthropic EU residency uncertain.** "Coming 2026" per Anthropic regional compliance page; no firm date. Bedrock EU inference profile is current production path. **Response (per D.12 + D.15):** Bedrock EU is committed Phase A; Anthropic first-party EU acceptable when GA-available; Mistral La Plateforme EU as fallback if Anthropic delay material.

**Risk: March 2026 cache TTL change.** Anthropic changed default prompt cache TTL from 60 min → 5 min for many request shapes; automations spaced wider than 5 min apart pay material cache-miss cost. **Response (per D.12):** Explicit 1-hour TTL beta header for long-interval automations; Langfuse self-hosted tracks cache hit rate as SLO (per Section 17 §17.17).

**Risk: AssemblyAI Italian Medical Mode missing.** Universal-3 Pro supports Italian streaming but Medical Mode does NOT support Italian (only EN/ES/DE/FR). Italian medical accuracy depends on keyterms + prompt engineering. **Response (per Section 17 §17.6):** A/B between Deepgram Flux + AssemblyAI U3 Pro + Soniox; Italian medical keyterm dictionary curation Phase A pilot (Q.20); fallback to MedWhisper Large ITA self-hosted for offline replay.

**Risk: Supabase Realtime cost engineering at scale.** Hot paths via Broadcast scale economically up to mid-thousands of concurrent connections; Pro tier limits + per-message pricing matter at Phase B onboarding. **Response:** Architecture documented; Phase B commercial concern; alternatives (self-hosted Realtime + Phoenix LiveView; Convex; custom WebSocket) tracked as fallback.

##### Solo + AI specific risks

**Risk: Italian voice quality not self-validatable solo.** Founder is not Italian-native voice quality judge for medical clinical context. Stage 1 Step 1.2 risk: voice quality is foundational to Pack Workstream 1 (working software) but founder cannot validate it solo. **Response (per Section 17 §17.6 + Part IV Section 2.0):** Pack workstream initiations in Phase 0 — Italian voice talent + listener panel + medical-receptionist consultant + Italian GP consultation. Non-negotiable.

**Risk: Clinical collaboration requirement non-negotiable.** AIRIS Phase A requires real clinical inputs that AI cannot substitute (PDTA validation, ambient acoustic characterization, informaticist canvas authoring validation, T4 medication-order flow validation). **Response:** Q.9 + Q.12 open questions; Phase 0 pack workstream initiation; founder existing network informs.

**Risk: Hospital pilots may show informaticists unable to author on canvas.** V27 persona reframing assumes clinical informaticists / operations leads can author Automation Builder workflows on canvas. If launch hospital pilot reveals informaticist tooling-fluency below assumption, hospital-template-only authoring path becomes the primary path. **Response:** Hospital-template parameterization UI as first-class Phase A scope (per Section 17 §17.11); informaticist-authoring as additional path; pilot data informs which is primary.

**Risk: Italian MPI cold-start quality.** Splink-Postgres requires training data to achieve optimal m/u parameter estimates; first launch hospital has limited prior linkage data. **Response (per Section 17 §17.8):** Conservative (false-positive-averse) thresholds Phase A; human review queue for 0.7-0.95 range; iterative refinement as launch hospital data accumulates.

##### Phase A pilot risks

**Risk: Continuous-ambient production wifi jitter.** IL T1 continuous-ambient intent tracking depends on stable network conditions; hospital wifi notorious for jitter + dead zones + AP handoff issues. **Response (per Section 17 §17.6):** Smart Turn v3 + Silero v5 client-side buffering + outbound burst when network restored; degraded-mode UX (conversation surface stays functional even if voice transport breaks); pilot characterization at launch hospital informs SLO.

**Risk: PDTA-as-paperwork drift.** Italian regional PDTAs sometimes function as bureaucratic artifact rather than clinical guide. AIRIS encoding canonical PDTA may surface compliance-vs-clinical-reality tension. **Response (per Q.18):** "Deviation as informational, not accusation" UX principle (Step 1.6 + 1.8); periodic clinical informaticist review of deviation patterns; PDTA template update flow.

**Risk: Regional PDTA heterogeneity.** Three Phase A PDTAs (Scompenso Cardiaco + Diabete Tipo 2 + BPCO) differ by region. Launch hospital regional PDTA may differ from canonical version. **Response (per Section 17 §17.8):** Per-region PDTA configuration in TypeScript-XState v5 templates; regional PDTA fork mechanism; clinical informaticist tooling for per-region customization.

**Risk: Launch hospital procurement demands.** May demand SOC 2 + ISO 27001 + ISO 27799 + ACN qualification + on-prem before pilot — beyond Phase A target. **Response (per Q.10 + Q.15):** Launch hospital selection informed by realistic procurement expectations; AIRIS Phase A architecture designed to support on-prem deployment path (per R.10 + Section 17 §17.2 on-prem Docker agent); SOC 2 / ISO 27001 / ISO 27799 readiness Phase A + cert Phase B.

##### Pack-related risks

**Risk: Taxonomy drift as Event System failure mode.** Cross-Builder Event System depends on stable event taxonomy. Multi-team development (post-Phase B) introduces taxonomy drift risk. **Response (per Section 17 §17.9):** CI compatibility checker as hard merge gate; AsyncAPI catalog auto-generation; EventCatalog self-hosted at `catalog.airis.it`; taxonomy governance documented as Phase B operational concern.

**Risk: Break-glass enable-where-legal-disagrees.** Per Garante Provv. 604/2024 — break-glass FSE access without consent not permitted until PSS compiled in ≥70% of fascicoli nazionalmente. AIRIS implements mechanism but cannot enable by default. **Response (per D.18 + Section 17 §17.13):** Feature-flag-gated; per-launch-hospital legal sign-off; default-disabled until Garante PSS precondition satisfied. Italian DPO + lawyer engagement (Phase 0 pack workstream) ensures correct enablement posture per launch hospital.

---

### Section 5 — Technical Choices Status

This section tracks specific technical choices with their current commitment level, why they fit AIRIS, what would prompt revisiting, and cost-of-changing. Updated to reflect V26 commitments per Part III D.12 and V27 expansion per Part III D.14-D.19.

The section is deliberate about distinguishing **commitments** (firm, philosophical, expensive to revisit — these live in Part I and Part III) from **choices** (technical, revisitable when better options emerge — these live here). The dual-surface paradigm (conversation surface + content surface, perfectly synchronized) is a commitment. The consciousness substrate as the foundation underneath both surfaces is a commitment. The Phase A scope shape (Part III D.10) and quality bar (D.11) are commitments. The specific tech stack that delivers them is choice — committed but trackable, revisitable with discipline.

**V27 status.** Stage 1 (Engineering Scope Pass) + Stage 2 (Tech Stack Revisit) substantially expanded the operational stack with 21 subsystem-specific commitments. **The comprehensive operational tech-stack inventory now lives in Part II Section 17 (Engineering Architecture).** This section continues to track the historically-tracked entries with commitment level + reasoning + revisit triggers + cost-of-changing; new entries surfaced by Stage 1 + 2 reference Section 17 for full operational detail rather than duplicating content here. Per V26 D.12: most entries that were "to be tested in Phase 0" in V25 are now committed; per V27 D.12 + D.14-D.19: many V26 Phase 0 micro-choices are now also resolved (Python services tier; Supabase Auth EU; LLM substrate Bedrock EU + Mistral EU fallback; backend services tier topology; cross-Builder Inngest durable execution; voice stack; MPI tooling; PDTA state machine framework). **Surviving Phase 0 micro-choices:** Claude Code vs Cursor (empirical head-to-head on AIRIS-style work); paradigm-prototype real-time-sync feel test per CT Scheduling Paradigm Prototype Sketch.

#### Database — Supabase Postgres for Phase A; self-hosted Postgres for Phase D (committed per Part III D.12)

**Why it fits:** Postgres is structural — relational + JSON columns, full-text search, logical replication / listen-notify for the real-time sync needs, supports the data model AIRIS specifies, runs on-prem when required. Managed (Supabase) for Phase A is what makes solo + AI feasible without operational overhead. Same code path migrates to self-hosted for Phase D when on-prem hospital deployment is real.

**What would prompt revisiting:** A database that materially improves a specific need Postgres can't meet (none currently in view); Supabase managed pricing or capability changes that make it inappropriate for Phase A development; on-prem migration in Phase D surfacing structural friction (unlikely — Postgres is Postgres).

**Cost of changing:** Low at the start of Phase A (Supabase setup is hours). Higher after schema is built but bounded — Postgres-to-Postgres migration tooling is mature. Cost of changing *off* Postgres entirely would be high but no reason to consider it.

#### Real-time sync — Supabase Realtime (committed per Part III D.12)

**Why it fits:** Built on Postgres logical replication, self-hostable, migrates with the database. Supports the conversation surface ↔ content surface synchronization at low enough latency to make the dual-surface paradigm feel like one event. Strong AI coding tool support; well-documented client SDKs for Next.js integration.

**Phase 0 role:** The paradigm prototype validates that Supabase Realtime hits the latency the dual-surface paradigm needs in practice. If it doesn't, the commitment gets revisited — Convex is the runner-up alternative; a custom WebSocket layer is the fallback.

**What would prompt revisiting:** Phase 0 paradigm prototype reveals latency or behavior that breaks the paradigm-feel; Supabase Realtime's open-source self-hosting path turns out to have hidden friction for Phase D on-prem deployment.

**Cost of changing:** Moderate. The application code that subscribes to real-time updates would need adapter changes; the core architecture is similar across alternatives.

#### Frontend — Next.js (React, App Router) (committed per Part III D.12)

**Why it fits:** Mature React framework with server/client component model that supports the dual-surface paradigm's synchronization patterns natively. Strong AI coding tool support (both Claude Code and Cursor work excellently with Next.js). Vercel deployment integration is seamless for Phase A; Next.js self-hostable for Phase D. App Router's nested layouts fit the conversation-surface-always-present + content-surface-changes-per-module pattern.

**What would prompt revisiting:** Phase 0 paradigm prototype reveals architectural friction between Next.js and the dual-surface synchronization (unlikely — Next.js is conventional enough that paradigm-friction would have been visible to the broader community); a substantially better-fitting framework emerges (e.g., a framework purpose-built for reactive dual-pane interfaces).

**Cost of changing:** High after substantial UI is built. Should not be revisited lightly after Phase A starts.

#### Application backend — Next.js server actions + API routes (committed per Part III D.12)

**Why it fits:** Co-located with frontend, no separate service to deploy or monitor for application-layer logic, AI coding tool support is excellent, TypeScript end-to-end matches the frontend, server actions provide a clean RPC-like pattern that fits the dual-surface paradigm's "action invoked, state updates, both surfaces reflect" flow.

**What would prompt revisiting:** Phase A reveals that significant application logic needs to be invoked from outside the Next.js context (a separate service, a webhook handler, etc.) — at which point separating some logic into a dedicated service may be appropriate. The commitment is to Next.js server actions as the *default*, not the exclusive home.

**Cost of changing:** Moderate. Some application logic could be extracted to a separate service if needed without restructuring the rest.

#### LLM orchestration service language — Python or TypeScript (Phase 0 narrow validation pending)

**Current state:** Both candidates workable. Python (with FastAPI) has strong LLM ecosystem fit and clean async patterns; TypeScript (as Node service or Next.js route extension) keeps the stack monolingual and reduces context-switching for solo + AI work.

**Phase 0 role:** Build the smallest LLM-orchestration subsystem in each. Same scope (parse a CT scheduling request via Claude API, consult a consciousness-substrate query, emit a structured action). Choose based on direct experience of fit with Claude API patterns, AI coding tool integration, consciousness substrate query needs, and the working-style fit for solo + AI iteration.

**Decision criteria when made:** Direct experience on AIRIS-style orchestration work, not benchmarks.

**Cost of changing:** Moderate after the orchestration service has substantial code. Decision should be made by end of Phase 0.

#### Auth — Supabase Auth or Clerk (committed per Part III D.12, micro-choice deferred)

**Current state:** Either is workable. Supabase Auth integrates more cleanly with the rest of the stack and has no additional vendor; Clerk has more polish in UI components and developer experience. The decision can defer slightly without blocking Phase A start — both have clean migration paths from one to the other if the early choice turns out poorly.

**What would prompt revisiting:** Either provider's pricing or capability changes that make it inappropriate; Phase A surfaces auth requirements (specific hospital identity integration patterns) that one handles meaningfully better than the other.

**Cost of changing:** Moderate. Auth provider migrations are well-documented; the application code's auth touch points are typically clean.

#### LLM Serving — Three-backend abstraction; Claude API as Phase A development default (committed per Part III D.12; local-LLM execution deferred to Phase D)

**Why it fits:** The three-backend pattern (hospital-local, AIRIS-hosted, online API) is structurally required by AIRIS's deployment model — Italian hospitals will mostly want hospital-local for data residency and cost; AIRIS-hosted is the cloud middle option; online API is fastest for development. The abstraction is needed regardless of which specific models are used. Claude API as development default provides the model quality the paradigm-design work needs.

**Phase A scope:** The abstraction is implemented in code from day one. Claude API backend operational. AIRIS-hosted backend operational. Local-LLM backend designed against the published serving interfaces (Ollama, vLLM, llama.cpp server) — contract specified, code-tested against mocks — but **not exercised against a real 70B-class model in Phase A.** That exercise moves to Phase D when hospital on-prem deployment is a real workstream and the hospital infrastructure exists.

**Reasoning for the deferral:** The abstraction shape is what the architecture commits to. The serving interfaces of Ollama, vLLM, and llama.cpp are well enough understood to specify the abstraction with confidence. Cost of testing against a real 70B in Phase A (workstation hardware or rented GPU time) buys little; the architectural decision was already well-defined. Cost of being wrong is low — small revision in Phase D, not blocker.

**What would prompt revisiting the development default:** A different commercial model proves materially better at the structured-output and language-understanding tasks; cost or rate-limit considerations during heavy development.

**What would prompt revisiting the abstraction approach:** Unlikely; the abstraction is what enables deployment flexibility AIRIS requires.

**What would prompt earlier local-LLM execution:** A Phase B partner conversation surfaces a requirement to demonstrate local-LLM working before Phase D timing; runs against an Anthropic-or-equivalent licensing change that requires the local path earlier.

**Cost of changing:** Low for the development default (configuration). High but contained for the abstraction (affects only the LLM service layer).

#### AI coding tool — Claude Code primary, Cursor as alternative (committed per Part III D.12, Phase 0 head-to-head validation pending)

**Current state:** Claude Code is the leading candidate. Cursor is the alternative. Aider and other dev-in-loop tools are workable but not primary candidates. Autonomous-agent tools (Devin and similar) not yet trustworthy for AIRIS-style work.

**Phase 0 role:** Use both Claude Code and Cursor on a small subsystem for a few days each. Pay attention to handling of substantial coherent codebase, complex domain, architectural attention required, cross-file refactoring quality, test generation, fit with the founder's working style. Commit to one as primary; the other available as alternative.

**Decision criteria when made:** Direct experience on AIRIS-style work, not benchmarks or hype.

**Cost of changing:** Low. Tools are interchangeable; the codebase itself is tool-agnostic.

#### Code organization — Monorepo (committed per Part III D.12)

**Why it fits:** Simplifies AI coding tool context (the whole codebase visible in one context). Simplifies cross-module refactoring. Appropriate for solo + AI. Standard tooling (Turborepo, Nx) makes the experience smooth.

**What would prompt revisiting:** Phase D team scaling produces structural reasons to split (unlikely to be necessary; large monorepos work for substantial teams with good tooling); a specific module needs to be deployable independently in a way the monorepo can't accommodate (none currently in view).

**Cost of changing:** Moderate. Repository restructuring is real work but mature tooling exists.

#### Deployment — Vercel for Phase A; dedicated infrastructure for Phase D (committed per Part III D.12)

**Why it fits Phase A:** Vercel + Next.js is seamless; Phase A deployments are demonstrations to AGFA and similar, not production hospital deployments; managed infrastructure is what makes solo + AI feasible. Same Next.js application code runs identically on Vercel and on dedicated infrastructure when Phase D requires.

**Phase D evolution:** Dedicated infrastructure (hospital-local servers, or AIRIS-hosted cloud, or AGFA-provided infrastructure depending on Phase B outcome) per hospital deployment. Same application code; different hosting.

**What would prompt revisiting in Phase A:** Vercel pricing or capability changes that make it inappropriate; a Phase B partner conversation surfaces a requirement to demonstrate on dedicated infrastructure earlier.

**Cost of changing:** Low for moving off Vercel to dedicated Next.js hosting (Node.js anywhere runs the same code); the cost lives in setting up the dedicated infrastructure, not in application code changes.

#### Deployment topology — Single-tenant in Phase A; single-tenant per-hospital in Phase D (committed per Part III D.12)

**Why it fits:** AIRIS's deployment model is single-tenant per hospital. Multi-tenant SaaS is not the path AIRIS is on; the typical Italian hospital deployment is on-prem or hospital-cloud, isolated per institution. Single-server, single-tenant in Phase A demonstrates the architecture without multi-tenant complexity that doesn't apply to the actual deployment model.

**What would prompt revisiting:** A Phase B path emerges where multi-tenant SaaS is the deployment model (e.g., small clinic chains where shared infrastructure is appropriate); some specific module ships independently as SaaS while the main suite stays single-tenant.

**Cost of changing:** Designed-in. The data model supports tenant isolation in the schema; multi-tenant evolution would add tenant scoping throughout rather than restructure.

#### Version control — Git (committed)

**Why it fits:** Universal standard. Required for AI coding tool integration. Provides cross-session memory.

**Cost of changing:** Practically zero — Git is what's used.

#### Consciousness substrate implementation approach — Architecture sketched, full implementation in Phase A (V26 update)

**Current state:** The substrate is a VIVA-level commitment (every VIVA application needs one) and a Part III commitment for AIRIS. The implementation pattern is sketched: signals (location, recent chart access, active sessions, ward roster, scheduled procedures, recent conversation history) accumulate in real time into a context store; the conversation surface and content surface query the context store with appropriate latency budgets (~200ms or less for typical queries); the context store handles missing or stale signals by returning uncertainty rather than wrong inferences. The data structure leans toward a hybrid (a typed context object as a first-class data model + LLM-based summarization for free-form recent activity), grounded in V26 strategic reasoning rather than empirical Phase 0 exploration.

**Phase 0 role:** The CT scheduling paradigm prototype exercises a thin slice of the substrate — patient inference from current context — which validates the substrate architecture at small scale. Larger architecture decisions (latency at scale, signal completeness, query patterns across modules) are deferred to early Phase A, where they become tractable as real modules generate real signals.

**What would prompt revisiting:** Phase A reveals the sketched architecture doesn't scale or doesn't produce accurate-enough inferences across modules; an alternative pattern (LLM-summarization-only, or dedicated context-service-only) emerges as materially better.

**Cost of changing:** High after substantial substrate is built. The Phase A architecture should be committed by mid-Phase A so the rest of Phase A builds on a stable foundation.

---

#### Pack Workstream Status (since V27)

Parallel to Technical Choices Status above. Tracks the seven pack workstreams (per Part III D.13; V27 operationalization in Part IV Section 3) with current state. Master Doc anchors strategic state; Active Plan (operational doc) holds finer-grained operational tracking.

**Status legend:** *Not yet scoped* = workstream identified but no Phase A work begun; *In execution* = active work happening; *Substantively informed* = inputs available from prior work, synthesis pending; *Settled* = pack artifact complete.

| # | Workstream | Status | Notes |
|---|---|---|---|
| 1 | **Working software** | In execution | Phase 0 entry; Phase A scope per D.10 + D.11 + D.12 + D.14-D.19; architectural inventory per Part II Section 17. Stage 1 + 2 produced foundational scope work. |
| 2 | **Regulatory roadmap** | Substantively informed | Stage 1 outputs: Sogei accreditamento timeline per region (4-10 weeks per fase external lead time); Italian regulatory union per D.19; MDR Class IIb pathway; NIS2 binding via D.Lgs. 138/2024 + ACN det. 164179 (compliance October 2026); EU AI Act timing (Art. 6/Annex III: 2 Aug 2026 unless Digital Omnibus delay enacted; MDR Class IIb medical-device AI: 2 Aug 2027). Phase A synthesizes into standalone deliverable. |
| 3 | **Market analysis per module** | Not yet scoped | 11 mini-research-passes per clinical-module market (Radiology + Emergency + OR + Care Unit + ICU + Laboratory + Pathology + Cardiology + Dialysis + Endoscopy + Nuclear Medicine). Distinct from Stage 1's incumbent-per-software-subsystem analysis. Phase A initiation, can parallel software work. |
| 4 | **Business model articulation** | Not yet scoped | Pricing patterns per region (FSE 2.0 maturity differences); deployment economics per hospital size; procurement realities (NIS2 supplier contracts, ACN qualifications, ISO 27001 readiness signaling). Co-development with founder; primarily strategic articulation. |
| 5 | **Vision document** | Not yet scoped | Standalone artifact distinct from Master Doc. AGFA-evaluator-facing. Anchored on Master Doc content + Stage 1 findings for "why breadth matters" empirical grounding. Co-development with founder. |
| 6 | **Pack timeline (Phase C/D + post-deployment trajectory)** | Not yet scoped (R.11 unblocked) | V27 R.11 narrowed the prior "no roadmap before AGFA" principle: no premature internal Phase A calendar holds; pack timeline is appropriate Phase A pack deliverable and serves credibility as partner/competitor. Co-development with founder; informed by regulatory roadmap + software work + AGFA-relationship strategic context. |
| 7 | **AGFA-specific narrative (the tying-together)** | Not yet scoped | Integrates all other pack components. Late-stage; co-development with founder; finalized closer to AGFA conversation. |

**Pack workstream initiation principle (per Part IV Section 2.0 + Section 3):** Lead-time-sensitive pack workstreams (Italian voice talent recording for Pack Workstream 1; Sogei certificate provisioning for Pack Workstream 6; Italian DPO/lawyer engagement for Pack Workstream 2; clinical collaborator engagement for Pack Workstreams 3 + 4; launch hospital selection + ISO 27001 readiness assessment for Pack Workstreams 3 + 4 + 6) initiate during Phase 0. Other workstreams initiate during Phase A. Workstream 7 (AGFA-specific narrative) finalizes late.

**Cross-references:** D.13 (pack as Phase A deliverable); R.9 (breadth-of-coverage); R.11 (no premature internal Phase A roadmap; pack timeline appropriate); Part IV Section 2.0 (Phase 0 pack workstream initiations); Part IV Section 3 (Phase A seven workstreams treatment).

---

### Section 6 — Update Protocol

This section describes how the AIRIS Master Document, VIVA Master Document, and Project Core stay alive — current with reality, not ossified into a script reality has outgrown.

**Continuous updating, not periodic revision.** The documents are updated as decisions are made, not at scheduled review intervals. When a decision is made in a session, the relevant document is updated before the session ends. The cost of one undocumented decision compounds silently across sessions; the discipline of immediate documentation prevents drift.

**Document update routing.**
- Decisions about VIVA-level matters (worldview, criterion, foundational method, cross-application principles, organization) → VIVA Master Document
- Decisions about AIRIS-specific matters (frame, spec, plan, live edges) → AIRIS Master Document, in the appropriate Part
- Decisions about Claude Project coordination (tree structure, document index, active focus, cross-tree references) → Project Core
- New entries to the Decision Log (Section 1 above) record the decision once it's made; cross-references to other Parts/documents capture the depth.

**Who updates:** the founder and Claude (in sessions). No one else. The founder retains the final say on any change. Claude's role is articulating, drafting, surfacing — not deciding what AIRIS becomes.

**What kinds of changes go where.**
- Frame changes (Part I): rare, deliberate, require revisiting commitments
- Spec changes (Part II): happen as the system is built and surface refinements; work through audit document for module changes that need clinical input
- Decisions and Reasoning (Part III): new entries when a new commitment is made; existing entries adjusted only if the underlying decision is revisited
- Plan changes (Part IV): regular, expected, plan adjusts as reality unfolds
- Live Edges (Part V): continuous; this is the most-updated Part
- Orientation (Part VI): rare, when how-to-use-this-document genuinely changes

**Anti-drift mechanisms.**
- The Decision Log makes commitments observable — drift becomes visible if the system starts behaving inconsistently with the log
- Open Questions list with "triggers revisiting" notes prevents quiet abandonment of unresolved matters
- The "what would prompt revisiting" notes in Technical Choices Status prevent silent commitment to choices that should remain open
- Cross-references between Parts (and between documents) make inconsistencies visible — if Part III says X and Part IV implies not-X, the inconsistency is catchable

**Cross-document updates.** When a session's work changes content that affects multiple documents (e.g., AIRIS-side work that surfaces VIVA-level insight, or a tech choice revisit that affects both Part V Section 4 and Part IV implementation references, or an open question becoming a settled decision that touches multiple Parts), ALL affected documents are updated in the same session, before the session ends.

The discipline for this — the session-end audit pass (what was decided, where it lands, what's superseded, what goes in Decision Log, what goes in Future Concerns) and the branch-consciousness coherence checks — lives in Project Core (How to Use the Tree) and in Part 0 Working Principle 0.3.7 (Audit Discipline). (Project Core was refactored to pure tree navigation; the earlier "table of common change patterns / Session-end checklist" subsections were superseded by the leaner audit discipline in 0.3.7.)

A session working in the AIRIS Master Doc should read Project Core at session start so the cross-document update discipline is active throughout the session, not remembered only at the end.

**The plan as living memory.** This Part — and Part V more broadly — is what makes the plan a working tool rather than a frozen document. A frozen plan goes stale. A living plan adjusts as reality teaches the project what's true.

---


---

## PART VI — ORIENTATION

**V28 refresh note**: Part VI substantive content preserved from V27. V28 refresh additions:
- **Part 0 — Operating Philosophy is now the foundational entry point.** Sessions touching strategic or architectural decisions should start at Part 0 before going deeper. Working Principles (0.3.1 through 0.3.9) drive every commitment elsewhere in the doc.
- **Part VII — Future Concerns + Deferred Work is the canonical backlog.** Items not addressed now but consciously deferred live here with triggers + target Stage. Audit Part VII periodically to surface items whose triggers have fired.
- **Decision Log strengthened format** (D.20-D.23 onward): each new architectural decision includes Decision / Rationale / Alternatives considered / Supersession history / Cross-references. V27 D.1-D.19 retain V27 format; new entries follow strengthened format.
- **Audit Discipline (Working Principle 0.3.7)**: sessions touching strategic/architectural decisions end with audit pass — what did we decide, where does it land in docs, what's superseded, what goes in Decision Log, what goes in Future Concerns. Sessions purely tactical/operational skip this.
- **Boundless Independent Structure (Working Principle 0.3.9)**: AIRIS work is operable in any environment, any AI tool, any new chat session, by loading only the five canonical REAL DOCS (V28 Master Doc + Active Plan + Project Core + VIVA Master + Viva Mode Master). All other artifacts are volatile. Every atomic commit includes self-sufficiency audit — fresh AI in new tool with only REAL DOCS loaded must have full operating context. **This Master Doc V28 is self-contained**: substantive content from intermediate analyses (Stage 1, Stage 2, V27 Commit Plan) and historical Master Doc versions (V26, V27) has been absorbed into V28 where load-bearing; those source artifacts are volatile and not required for AIRIS work continuation.


This Part is the orientation guide for sessions touching AIRIS work. How to use this document; how to use it alongside VIVA Master Document and Project Core; how to work with the founder; how to handle session boundaries; how to know which Part to consult for which kind of question.

Read this Part early in any new session that's going to do substantive AIRIS work. The thirty-second time investment saves hours of mis-targeted effort later.

---

### Section 1 — How to use this document

This document (AIRIS Master Document, current version V27+) is the single internal source of truth for AIRIS — its frame, its specification, its decisions, its plan, its live edges. Loading this document plus VIVA Master Document plus Project Core gives complete context for any AIRIS work.

**Each Part has a specific job:**

- **Part I (Frame)** is consulted when a question touches AIRIS's commitments — what AIRIS is committed to being, what it will not become, what it promises. Don't propose changes to Part I casually; the commitments here are deliberate and load-bearing.
- **Part II (System Specification)** is consulted for any question about what AIRIS *is* structurally — modules, CORE components, architecture, data structures, workflows. This is the spec to build against. Treat it as authoritative for what AIRIS does and how.
- **Part III (Decisions and Reasoning)** is consulted when a decision needs to be defended, when something doesn't seem to make sense, or when reasoning behind a choice needs to be understood. The decisions here are settled commitments; don't re-litigate in normal work.
- **Part IV (Production Plan)** is consulted when sitting down to actually build. It tells you what to work on, in what order, with what completion criteria. The plan is alive — it adjusts as work surfaces things — but it's the orienting document for execution.
- **Part V (Live Edges)** is consulted to see what's currently in motion. New decisions get added to the Decision Log. Open Questions show what's unresolved. Technical Choices Status shows what's currently best-option. Update Protocol governs how all of this stays alive.
- **Part VI (this Part)** is consulted when a session is starting and needs to know how to orient. That's now.

---

### Section 2 — How AIRIS Master Doc relates to other documents

**VIVA Master Document.** The umbrella's master doc, root of the project tree. AIRIS inherits VIVA's worldview, criterion, foundational method, and cross-application principles. When working on AIRIS, VIVA Master Document is the parent context — referenced for inheritance, not modified for AIRIS-specific content. Modifications to VIVA Master Document affect every VIVA application by inheritance and should be made deliberately, not as a side effect of AIRIS work.

**Project Core.** The coordination document. Holds the tree, the Master Doc index, the active focus pointer, working protocols. Read first in any new session to understand where things are. Update when coordination matters change (new Master Doc added, active focus shifted, cross-tree reference emerged).

*Historical audit work from earlier AIRIS versions (V21 module audit) is not part of the canonical structure — its cross-cutting patterns were applied in V23 and its substantive content is preserved in V28 module specifications (Part II). Working artifacts produced during sessions (specs, sketches, planning notes) are volatile per Part 0 — they exist for the work that uses them, not as load-bearing canonical content.*

The relationship for typical sessions:
- Most sessions touching AIRIS work load the AIRIS Master Document only (which references VIVA Master Document for inheritance — consult VIVA only when the inheritance question arises).
- Sessions touching coordination matters load Project Core only.
- Sessions touching VIVA-level matters load VIVA Master Document.
- Cross-cutting work loads multiple.

---

### Section 3 — For sessions doing foundational or strategic work on AIRIS

Foundational work means: rethinking what's in Part I or Part II, reconsidering decisions in Part III, restructuring the production plan in Part IV, opening questions in Part V that were thought settled.

Read the AIRIS Master Document in full first. Not optional — it's the context that makes everything downstream make sense. Read VIVA Master Document and Project Core in full as well. The foundational frame at the umbrella altitude affects the AIRIS-specific work below it.

Treat the frame (Part I) as authoritative. The founder has agreed to it. Don't propose changes casually; if it needs revision, that's a deliberate action requiring a real reason.

Treat the decisions (Part III) as commitments. They were worked through carefully. Don't re-open them in the course of normal work. If a decision genuinely needs to be revisited, name it explicitly, articulate the reason, and engage the founder on whether the foundation is being moved.

Use the reasoning (Part III) when something doesn't make sense or when a decision needs to be defended.

Use the open questions (Part V Section 2) as the live edges. These are where new thinking is welcome.

---

### Section 4 — For sessions doing implementation work on AIRIS

Implementation work means: writing code, building modules, configuring systems, integrating with real systems, refining workflows.

AIRIS Master Doc Part II is the spec to build against. Treat it as authoritative for what AIRIS does and how.

The audit document names places where V23/V24 prose may not yet fully reflect the philosophy. Implementation should not blindly follow the prose in those places — it should refer to the audit, validate with clinicians where needed (Phase C work), and produce implementations that align with the philosophy even where prose hasn't been updated.

Part IV is the production plan. The build order, the workstreams, the completion criteria — all there. Implementation work that doesn't follow Part IV's sequence is doing something other than what's planned; that's sometimes correct (the plan is alive) but should be deliberate.

The Regulatory Layer (Part II Section 16) has verification points flagged inline. Verify those against current authoritative sources before implementing the relevant adapters. The flagged items are: HL7 Italia Implementation Guide current version, current ministerial DRG grouper, current NSIS schedules, current AI Act timelines, regional FSE gateway endpoints. Don't implement against assumed-current data; verify.

Part V (Live Edges) is where new decisions made during implementation get logged. When implementation surfaces a decision that needs to be made, make it deliberately, log it in the Decision Log, update the relevant documents, and proceed.

---

### Section 5 — Working with the founder

The founder values pushback, real engagement, and honest disagreement. They don't want sycophancy or polished reflection. When something feels off, say so. When agreement comes too easily, flag it. When operating with incomplete information, name what's not known rather than performing confidence.

The founder's worldview includes commitments around honesty, evolution through hard truth-telling, refusal of comfort lies, and care for craft over performance. The work should reflect those values without becoming a manifesto.

The founder will sometimes ask for changes that an AI instance might be tempted to overdo. The discipline is: do the change requested, no more. Don't volunteer expansions. Don't reach for cleverness. Stay in the lane the founder pointed at, and check in if the lane seems wrong rather than choosing a different one unilaterally.

The founder is a solo founder building substantial scope with AI assistance. Sessions are part of a long arc of work, not isolated transactions. Decisions made in one session affect what's possible in the next. The documentation discipline is what carries memory across sessions; without it, work compounds badly. Honor the discipline.

A new chat with a new instance of Claude will not have the relational context an extended conversation builds. That's a real loss, not just a notional one. The early turns of any new chat should be spent letting the new instance understand the founder rather than presuming to know them. This document and Project Core help; they do not substitute for the work of earning trust over actual exchanges.

---

### Section 6 — Session boundaries and continuity

Sessions end. AI tools have no persistent memory. The codebase plus the documentation is what carries memory forward.

**At session start:**
- Read Project Core first to see the tree, the Master Doc Index, and the Active Focus.
- Load the relevant Master Document(s) based on the work being done.
- For implementation work, also pull from the Decision Log (Part V Section 1) to see recent decisions that may not yet be reflected in Parts I–IV.

**During the session:**
- When a decision is made, update the relevant document immediately. Not at the end of the session. Not "after we figure this part out." Immediately.
- Cross-reference Parts and documents as natural — the structure supports it; lean on it.

**At session end:**
- Verify all decisions made during the session are reflected in the appropriate document(s).
- Verify code is committed if implementation work happened.
- Update Project Core Active Focus if the next session's starting point has shifted.
- The session ends "clean" when documentation reflects reality.

**The cost of one undocumented decision compounds silently.** Decisions made and not captured become invisible context the next session lacks; the next session re-derives or misses them; the work degrades. The discipline of immediate documentation is what makes solo + AI work scale.

---

### Section 7 — Where to find what

Quick reference for what's where:

| If you need to know... | Look in... |
|---|---|
| What VIVA is | VIVA Master Document Sections 1–4 |
| What AIRIS is | AIRIS Master Doc Part I |
| Modules and CORE components | AIRIS Master Doc Part II |
| Why a specific decision was made | AIRIS Master Doc Part III |
| The plan for what to build next | AIRIS Master Doc Part IV (especially Section 2 for Phase 0 and Section 3 for Phase A) |
| What's currently being decided / open questions | AIRIS Master Doc Part V Section 2 |
| Current directions (leaning but not committed) | AIRIS Master Doc Part V Section 3 |
| What could go wrong | AIRIS Master Doc Part V Section 4 |
| Current technical stack choices | AIRIS Master Doc Part V Section 5 |
| How documents stay alive | AIRIS Master Doc Part V Section 6 |
| The tree of projects | Project Core "The Tree" |
| Which document holds what | Project Core Master Document Index |
| What's currently being worked on | Project Core Active Focus |
| How to start a new session | This Part (VI) Sections 1–2, plus Project Core's "Session start" |

---

**End of document.**

# PART VII — FUTURE CONCERNS + DEFERRED WORK

*This Part holds work and decisions that have been consciously deferred — not forgotten, not lost in session logs. Each entry has: the concern, why it's deferred-not-now, what triggers addressing it, target Stage/Phase/timeframe. This Part is the canonical backlog of "things we know about but aren't tackling yet." Audit Part VII periodically to surface items whose triggers have fired.*

## 7.1 Strategic Future Concerns

### 7.1.1 Per-Project AIRIS Tailoring as Business Model Shape

**Concern:** The business model shape AIRIS gravitates toward appears to be per-project tailoring — each client (hospital, hospital network, AGFA-deployed setup) receives a tailored AIRIS instance configured for their specific clinical context, module selection, voice talent, integration depth, regulatory profile. This is meaningfully different from "AIRIS as one-size-fits-all SaaS product."

**Why deferred:** SW-first sequencing (Working Principle 0.3.2). Business model articulation is Stage 5 work — needs founder strategic thinking surfaced after SW work matures and founder has clearer view of how AIRIS deploys in practice.

**Trigger to address:** Stage 5 Step 5.3 (Business Model articulation). Activates when Stage 4 SW Build reaches sufficient maturity for founder to articulate the per-project tailoring shape with concrete examples.

**Target Stage:** Stage 5 — Non-SW Work (Pack Workstreams).

**Implications when addressed:** Pricing model + per-project economics + capacity planning (how many concurrent projects can solo founder + AI handle) + scaling path (when team becomes necessary) + AGFA conversation framing (does AGFA license AIRIS or partner on tailoring?).

### 7.1.2 Voice Agent / Per-Project AI Runtime Cost Economics

**Concern:** Voice agent and AI inference runtime costs scale with usage. For a per-project tailored AIRIS instance (per 7.1.1), runtime costs become a per-client economic factor. Open questions: how does cost scale with clinician concurrent load? What's the cost model passed to clients? Does AIRIS absorb or pass through? How does this interact with local-LLM-active-backend strategy (where most inference is "free" infrastructure-wise but local hardware caps total throughput)?

**Why deferred:** Premature without business model shape clear (per 7.1.1). Cost economics meaningful only when business model is articulated.

**Trigger to address:** After 7.1.1 reaches Stage 5 Step 5.3 articulation.

**Target Stage:** Stage 5 — Non-SW Work, after Business Model is articulated.

## 7.2 Phase B Migration Triggers

### 7.2.1 Aruba ACN QC3 Migration (per V27 D.15 / V28 Decision Log D.15)

**Concern:** EU residency posture currently relies on US-co vendors with EU regions (Supabase, Vercel, AWS Bedrock EU, Mistral La Plateforme EU). Schrems-II concern accepted as Phase A posture with documented migration target: Aruba ACN QC3 (Italian sovereign cloud, ACN-qualified for healthcare data).

**Why deferred:** Not all infrastructure migration is needed immediately. Phase A Real-UX-Minimal-Infrastructure approach is acceptable per Working Principle 0.3.1. Production-grade EU sovereignty is Phase D pre-deployment work where it actually matters operationally.

**Triggers to address:**
1. Hospital deployment conversation requires Italian sovereign cloud certification.
2. Italian regulatory authority (Garante / ACN) issues clarification that ratchets sovereignty requirements.
3. Founder business conversation (AGFA or other) raises sovereignty as differentiation.
4. Schrems-II legal landscape shifts in EU.

**Target Stage:** Phase B / Phase D pre-deployment.

**Implications when addressed:** Migrate Supabase from managed EU to Supabase OSS self-hosted on Aruba ACN QC3 infrastructure. Migrate Bedrock EU LLM serving to local Hetzner/OVHcloud GPU (already V28 Decision Log direction — see 7.3.1). Document Schrems-II posture closure.

### 7.2.2 Hospital On-Prem Migration

**Concern:** Specific hospital deployments may require on-prem AIRIS instance (data + processing entirely within hospital network). Air-gapped or VPN-only access. Local infrastructure provisioning by hospital IT or AIRIS deployment team.

**Why deferred:** Phase A SW Build doesn't require on-prem capability — managed cloud SaaS posture acceptable for paradigm validation, pilot hospital conversation, AGFA evaluation.

**Trigger to address:** First pilot hospital signs deployment contract requiring on-prem.

**Target Stage:** Phase D pre-deployment.

**Implications when addressed:** Provision Hostinger production topology per Part VII Section 7.3.1 OR provide deployment tooling for hospital IT to provision equivalent topology on their hardware. Docker on-prem agent pattern per V27 §17.2 / V28 Section 17 — already architecturally committed.

## 7.3 Phase D Pre-Deployment Work

### 7.3.1 Production Infrastructure Provisioning (Hostinger Topology per Deep Research)

**Concern:** Full production-grade self-hosted topology not provisioned during Phase 0 / early Phase A per Working Principle 0.3.1. When clinical hospital deployment becomes operational reality, this topology must be provisioned.

**Findings from Hostinger deep research (May 2026):** Hostinger covers ~80% of AIRIS stack well. Three hard gaps: no GPU (production LLM serving must go to Hetzner GEX44 €184/mo + €79 setup for 8B-14B dev/staging, OVHcloud L40S HDS-certified for clinical hospital deployment); no S3-equivalent object storage (Backblaze B2 EU $6/TB or Hetzner Object Storage €5/mo); no managed Postgres (Supabase OSS self-hosted on Hostinger VPS handles this).

**Recommended production topology (~€67/mo promo, ~€122/mo renewal Hostinger + €184/mo Hetzner GPU + ~€10/mo backup):**
- 3× Hostinger KVM 4 (Germany): Next.js app, Supabase OSS, Python services tier
- 1× Hostinger KVM 2 (Germany): Workflow + observability + secrets + Gitea mirror
- 1× Hostinger KVM 1 (Germany): Dev workstation
- 1× Hetzner GEX44 (Falkenstein DE): LLM serving via vLLM
- Backblaze B2 EU: Object storage + immutable audit archive
- Hetzner Storage Box BX11: Backup tier 2

**Five V27 → V28 stack changes from research** (now part of V28 Section 17 reframe):
1. App layer: Vercel EU → Hostinger KVM 4 Germany (sovereignty + cost)
2. LLM serving: production target off Hostinger to Hetzner GEX44/OVHcloud L40S (GPU required)
3. Python services: Cloud Run europe-west8 → Hostinger KVM 4 Germany (sovereignty + cost)
4. Workflow: Inngest Pro Frankfurt → Inngest OSS self-hosted on Hostinger KVM 2 (sovereignty)
5. Object storage: Backblaze B2 EU acceptable; flag Hetzner Object Storage if hospital procurement raises CLOUD Act concerns

**Why deferred:** Phase 0 / early Phase A Real-UX-Minimal-Infrastructure approach. Production topology costs ~€280-370/mo + setup time; premature before hospital deployment context.

**Trigger to address:** First pilot hospital deployment conversation reaches commitment, OR founder otherwise wants to move from Phase A SW Build to Phase D deployment readiness.

**Target Stage:** Phase D pre-deployment.

### 7.3.2 NIS2 / HDS / MDR Class IIb Certification Tracks

**Concern:** Italian/EU hospital deployment requires regulatory compliance: NIS2 (EU cybersecurity directive applicable to healthcare infrastructure operators), HDS (Hébergeur de Données de Santé — French health data hosting certification, useful for Italian hospital procurement as quality signal), MDR Class IIb (Medical Device Regulation classification for software medical devices).

**Why deferred:** Phase A SW Build establishes architectural scaffolding (CI/CD pre-merge gates per Section 17.19, GitHub PR history + canonical CHANGELOG.md per Section 17.20 for MDR traceability, hash-chained L6 audit ledger per Decision Log D.17 for regulatory observability). Formal certification work is Phase D pre-deployment.

**Triggers to address:**
- MDR Class IIb: Italian Notified Body engagement begins. Trigger: pilot hospital deployment signed, hospital requires CE marking.
- NIS2: AIRIS deployment classified as "essential entity" or "important entity" supplier. Trigger: hospital deployment scale reaches NIS2 thresholds.
- HDS: AIRIS infrastructure migrates to OVHcloud (HDS-certified) per 7.3.1 LLM serving change.

**Target Stage:** Phase D pre-deployment.

## 7.4 Deferred Architectural Decisions

### 7.4.1 DICOM Image Storage Path Clarification

**Concern:** Radiology module is one of two deep modules Phase A. DICOM image storage path not fully named in V27 Section 17.10 — Integration Builder mentions DICOM worklist (work-item state management) but doesn't explicitly say where actual DICOM images live. Most likely answer: "hospital PACS is source of truth; AIRIS doesn't store DICOM images, just references them." Worth confirming explicitly.

**Why deferred:** Phase 0 paradigm prototype is CT scheduling intent (order creation flow, not image viewing). Phase A Radiology depth depends on which Radiology sub-flows are deep — order/schedule/report/billing flows can be deep without DICOM image storage being deep.

**Trigger to address:** Phase A Radiology module deep work scopes which sub-flows are in. If image viewing is in scope, DICOM storage path needs concrete commitment. Else, "PACS as source of truth" clarification suffices.

**Target Stage:** Phase A Stage 4 Step 4.10 (Radiology deep work) — surface decision then.

### 7.4.2 Patient-Facing FSE 2.0 Portal Scope

**Concern:** FSE 2.0 (Fascicolo Sanitario Elettronico 2.0 — Italian Electronic Health Record) is a clinician-facing concept in V27 Section 17 (CDA R2 generation + Schematron validation + Sogei submission). Patient access to their own health record via FSE 2.0 is a separate scope — patient portal, patient identity authentication via SPID/CIE, patient-facing UI/UX.

**Why deferred:** V27 / V28 Phase A SW Build is clinician-facing only. Patient-facing scope is Phase B or later product expansion.

**Trigger to address:** Strategic decision to expand AIRIS to patient-facing surfaces.

**Target Stage:** Phase B+ product expansion (not in current sequencing).

### 7.4.3 Reporting / Analytics Dashboard Strategy

**Concern:** Hospital management reporting + clinical analytics + NSIS (Nuovo Sistema Informativo Sanitario — Italian health information system) reporting are mentioned in V27 Section 17 module specs but not assembled into coherent reporting architecture commitment.

**Why deferred:** Phase A Working Software focus is clinician interaction paradigm, not management reporting. Reporting tier becomes scope when hospital deployment requires it.

**Trigger to address:** Hospital deployment conversation surfaces reporting requirements.

**Target Stage:** Phase A late or Phase D pre-deployment.

### 7.4.4 Italian Voice Talent Workstream (Pack Workstream 1)

**Concern:** ElevenLabs Italian custom-cloned voice character per V27 Section 17.6 + Pack Workstream 1. Custom voice talent recording, cloning quality validation, voice identity selection.

**Why deferred:** Stage 5 Non-SW Work (Pack Workstreams) per SW-First Sequencing principle. Phase 0 paradigm prototype uses ElevenLabs default Italian voices — paradigm validates real-time sync feel + intent parsing, not voice authenticity. Custom voice is Stage 5 polish.

**Trigger to address:** Stage 5 Step 5.2 (Italian Voice Talent workstream initiation).

**Target Stage:** Stage 5 — Non-SW Work.

## 7.5 Open Architectural Questions

*Questions whose answers haven't crystallized into commitments yet. Live for active resolution as Phase A SW Build progresses.*

(Migrated from V27 Open Questions section; see Part III for current Open Questions audit.)
