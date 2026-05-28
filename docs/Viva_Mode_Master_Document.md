# Viva mode — Master Document

**Document Version:** 1.0
**Date:** May 17, 2026
**Status:** Newly extracted from VIVA Master Document. Contains the software-paradigm content that previously sat in VIVA Master Document Sections 2, 5, 6, 7, and Catalog, plus new framing for what Viva mode is, honest N=1 scope, the meta-pattern of how specific applications instantiate Viva mode, and the catalog of Viva mode applications.

---

## What this document is

Viva mode is the software-paradigm expression of VIVA. This document holds Viva-mode-level content: what the paradigm commits to, the criterion applied at the software level, the dual-surface interaction architecture, the system consciousness substrate, the cross-application principles, the meta-pattern of how specific applications instantiate Viva mode, and the catalog of Viva mode applications.

This document was extracted from VIVA Master Document on May 17, 2026, when it became clear that VIVA the worldview is broader than the software paradigm and that conflating them in a single document was misleading. The content here was crystallized through AIRIS-focused work — it is what has been extracted and named at the layer above as seeming to apply more broadly. N=1 today; refinement expected as more applications get built.

**Relationship with VIVA.** Viva mode inherits VIVA's worldview, method, and values. The software paradigm exists because the worldview demands it — software that doesn't displace the human requires this specific architecture. See VIVA Master Document for the worldview itself.

**Relationship with applications.** AIRIS is the only currently active application. ChatYourBusiness and a doctor-focused project are conceptual children, not yet activated. Application-specific content lives in each application's Master Document — for AIRIS, in AIRIS Master Document.

For coordination across the tree (which Master Doc to load when, what's currently active, cross-tree references), see Project Core.

This document is updated continuously as Viva mode's thinking evolves. The discipline: Viva mode content here, worldview content in VIVA Master Document, application-specific content in each application's Master Doc.

---

## 1. What Viva mode is

Viva mode is the software-paradigm expression of VIVA. It names how VIVA's worldview gets expressed when the work being done is building software.

The worldview commits to software that serves the human's craft rather than asking the human to serve software (see VIVA Master Document Section 1). That commitment, taken seriously at the architecture level, forces a specific set of paradigm commitments. Those commitments are what Viva mode names.

These are not abstract preferences — they are load-bearing architecture. A software application that does not implement them is not a Viva mode application, regardless of what it claims. Conversely, two applications can look completely different in their content, modules, and domain — and still be Viva mode applications, if they implement the paradigm faithfully.

Viva mode applications can be in any domain where software serves human professionals — healthcare, small business, professional services, education, anywhere. The application's domain shapes everything specific about it; Viva mode shapes everything universal.

### Honest scope: what we know and how we know it

What is currently in this document is what has been extracted from AIRIS-focused work and named at the layer above as seeming to apply more broadly. The actual generality of these commitments has been tested at N=1.

When ChatYourBusiness gets built, some things in this document will turn out to be AIRIS-shaped wearing the costume of universal — and will need to be relaxed or reframed. Other things currently thought of as AIRIS-specific will turn out to be universal patterns and get pulled up here. The expected direction is bidirectional refinement, not unilateral application.

This is "Real before refined" applied to a paradigm itself. We build the real application (AIRIS), let the paradigm crystallize from it, refine as more real applications get built. Premature abstraction would produce a framework that looks rigorous but isn't grounded.

---

## 2. The Criterion

The criterion Viva mode applies to every tool, including its own, is whether it stands between a person and their work, or extends them further into it.

The first kind is to be removed. The second kind is to be built. Software that cannot pass this test, no matter how clever, is not Viva mode's work.

This criterion is testable, self-correcting, and clean. It distinguishes between displacement (technology that takes the professional out of their craft and into administration of the technology) and extension (technology that takes the professional further into their craft). It cuts across surface categories: a CRM that asks a salesperson for twenty fields after every call displaces; an AI that listens to the call and surfaces what was missed extends. A booking platform that turns a hairdresser into a receptionist displaces; an assistant that handles bookings while she cuts hair extends. A surgical robot that lets a surgeon do work she could not otherwise do extends; an electronic health record that reduces a doctor to a typist displaces. The category of the technology is not what determines this; the relationship of the technology to the practitioner's craft is.

The criterion is also the foundational hard line. Any Viva mode application must demonstrably pass it. Application-specific hard lines — such as AIRIS's commitment never to make clinical decisions in place of the clinician, and never to ship a release that increases the clinician's administrative burden — are operationalizations of this criterion in their domain. Each Viva mode application articulates its own such hard lines in its own Master Doc, derived from this one.

**The operational form of the criterion: least time and effort.** Displace-vs-extend is the philosophical test. In the daily work of designing and building, it sharpens to a more concrete question: *does this take more or less of the user's time and effort than the alternative?* Displacement, at the level of any specific design decision, means more time and effort spent operating the software — typing into fields, navigating menus, confirming what the system should already know, switching attention away from the work. Extension means less of that. The professional's life, when measured by what they actually do across a day, has more of it in their craft and less of it in software-administration.

"Effort" here is broad: elapsed time, cognitive load, attention interruption, verification work, trust cost. Total cost of the interaction, not just seconds on a clock. A 2-second interaction that requires significant thought is more costly than a 4-second one that requires none.

This is the test applied to every design decision in every Viva mode application. Not "does this match the paradigm" or "is this the standard way to do it" — *does this take less time and effort than the alternative?* That is what serves the craft.

---

## 3. The Interaction Paradigm — Dual Surface

Every Viva mode application presents two surfaces working together: a **conversation surface** and a **content surface**. These are not two modes the user chooses between; they are two different kinds of surface with different roles, both always available, both first-class, perfectly synchronized.

This paradigm exists because the principle (least time and effort) cannot be served by any single form of interaction. Voice is fastest for some moments, clicking is fastest for others, ambient inference handles many moments without any interaction at all. A single-mode interface — pure voice, pure GUI, pure chatbot — fails the principle for the moments that don't fit it. The dual-surface paradigm exists so that no moment is penalized.

### The conversation surface

This is where the user speaks or types to the system. It is the channel for *intent*. The user expresses what they want in natural language — clinical language for AIRIS, business language for ChatYourBusiness, whatever language is native to the domain. The system understands the language of the domain and the context of what the user is doing.

The conversation surface itself shows only the interaction: what the user said, what the system understood, brief confirmations and feedback, and — when ambiguity or stakes require it — focused questions that the user answers briefly. It does not show content. It does not duplicate the views that the content surface shows. It stays light. It is the channel for talking to the system, and nothing more.

A small surface in screen real estate. A large surface in what it enables.

### The content surface

This is where the system's state, data, and views live. Everything the user might look at, manipulate, navigate, or directly act on. Patient lists, charts, calendars, configurations, agent builders, forms, reports, results — all of it lives here, visibly.

The content surface is fully featured for its domain. It carries the entire visual interface of the application. Anything the system holds is visible from here. Anything the user might do via direct manipulation, they do here. This is the application as a traditional GUI would have it — except enriched by the fact that the conversation surface can also act on it.

Larger in screen real estate. Carries the visual weight of the application.

### Their relationship

When the user acts via the conversation surface, the effect appears on the content surface. The user says "show me the calendar for next Tuesday" — the calendar appears (on the content surface). The user says "schedule a CT for Mrs. Rossi" — the order appears on the worklist (on the content surface). The conversation surface itself shows brief feedback ("scheduled, 14:30"); the actual content lives where content lives.

When the user acts via the content surface — clicking, dragging, typing into a form, selecting from a list — the system responds directly. No conversation is needed. The conversation surface stays out of the way unless the user invokes it. The content surface is fully usable without ever touching the conversation surface, if the user prefers.

The two surfaces are synchronized through a single underlying state. There is only one copy of the data. The conversation surface acts on it; the content surface reflects it; both are always consistent because there is no separate copy to drift. State on the content surface always reflects what the conversation has done. State changed via the content surface is immediately available to the conversation.

### Every action is available on both surfaces

This is a defining property of the paradigm: **no action is locked to a surface.** Anything the user can do via the conversation surface, they can also do via the content surface — by clicking, by directly manipulating. Anything they can do via the content surface, they can also invoke via the conversation surface — by speaking or typing the intent.

This is not a design preference; it is what the principle demands. If something can only be done by voice, voice is mandatory for that action, which penalizes users whose moment doesn't suit voice. If something can only be done by clicking, clicking is mandatory, which penalizes users whose moment suits voice better. Either form of mandatory penalizes the principle. The way out is: every action available on both, the user chooses freely, never penalized.

This is a strong requirement on the design of every Viva mode application. It means the content surface must be genuinely complete — every action with a visible path. It means the conversation surface must be genuinely capable — able to invoke any action the system supports. Neither is the "primary" surface with the other as fallback. They are equal-status paths to the same actions.

### Why this is foundational, not just one option among many

The dual-surface paradigm is not "an interesting design choice." It is the *form* the principle (least time and effort) takes at the interaction layer. Any other arrangement — single-mode interfaces, voice-as-primary-with-GUI-fallback, GUI-with-AI-features-bolted-on — fails the principle for some moments. Only the dual-surface, with full synchronization and equal-status paths, serves the principle for every moment.

This means: every Viva mode application implements this paradigm. AIRIS implements it for clinical work. ChatYourBusiness would implement it for craftspeople. The doctor-focused project would implement it for its domain. The implementations differ in what the content surface shows and what the conversation surface understands — but the paradigm itself is shared. It is a Viva-mode-wide commitment, not an application-specific choice.

### What this does not specify

The paradigm names the architecture. It does not specify the visual design, the exact layout, the specific UI patterns, or the technical implementation. Those are domain-specific and discovered through exploration (see Section 5 on technology choices). What is fixed: two surfaces, fully synchronized, equal-status paths, every action available on both. What is open: how those surfaces look, how they're laid out (side by side, stacked, one foregrounded, one peripheral — adapts to the moment), how the synchronization is implemented technically, how the conversation surface handles different input modalities (voice, text, gesture). These are working questions to be answered by building and testing.

---

## 4. System Consciousness

The dual-surface paradigm depends on a substrate: continuous awareness, by the system, of what the user is doing, where they are, what they are attending to, and what has just happened. Without this substrate, the paradigm cannot work as designed. With it, the paradigm becomes magic.

This substrate is *system consciousness*. It is what makes the conversation surface able to understand intent in context. It is what makes the content surface able to update meaningfully in response to a conversational action. It is what lets the system absorb work that would otherwise have to be done by the user (identifying patients, routing orders, generating regulatory artifacts, anticipating next steps). It is what allows the system to time its feedback well, choose when to ask versus when to default, surface what's relevant and stay quiet about what isn't.

### What the system must be conscious of

Continuous awareness, at every moment, of:

- **Where the user is** — physically (location, presence), within the application (which view, which context), within their work (which task, which sub-step)
- **Who the user is doing this with or for** — the patient at this bedside, the client this message is about, the team member being addressed
- **What the user just did** — the last several actions, the recent inputs, the views recently opened
- **What the user is in the middle of** — multi-step tasks, ongoing reviews, focused work in progress
- **What was just said on the conversation surface** — the active exchange, the questions posed, the answers given
- **What the system just did in response** — actions taken, content updated, state changed
- **What's pending, completed, or awaiting acknowledgment** — the live edge of what's in motion
- **What's expected of the user next** — schedule, alerts, deadlines, things that should happen
- **The state of the environment** — what others are doing, what alerts are active, what's happening on the ward / in the business / in the relevant context

The consciousness is built from many signals: location data, recent chart access, active sessions, ward roster, scheduled procedures, recent conversation history, system state, environmental context. The system stitches these into a continuous picture and uses that picture to do everything else.

### Why this is foundational

Without consciousness, the paradigm breaks immediately. The conversation surface can't know what "her last labs" refers to (which patient?). The content surface can't know what to update when the conversation completes an action (which view should change?). The system can't infer what to do without asking. Every action requires explicit specification of context — which patient, which order, which view, which time — and the user spends their time and effort spelling out what the system should already know.

The moment the system seems unaware — asks an obvious question, fails to update the right view, responds with stale information — the magic breaks. The user learns the system isn't paying attention. They start spelling everything out. The conversation surface becomes useless because it can't infer anything. The content surface becomes a traditional GUI with all its costs. The principle fails.

System consciousness is what differentiates a Viva mode application from "a chat interface bolted onto a GUI." Other AI-powered products typically have either chat or GUI or both, but neither knows what the user is actually doing. They cannot make the inferences that absorb work. They make the user spell everything out, which is the displacement Viva mode exists to end. The consciousness is the difference.

### What system consciousness is not

It is not surveillance. It is not collection of the user's data for purposes beyond their work. It is not a profile of their behavior shared with third parties. The consciousness exists *in service of the user's craft* — knowing where they are, what they're doing, so the system can serve them better. The information stays within the system, used to reduce the user's time and effort, not used for any other purpose.

Privacy and consent matter here, and each application's Master Doc articulates how its consciousness substrate respects them in its domain. For AIRIS specifically, the consciousness operates within clinical context, with appropriate boundaries on what is captured and how it is used; GDPR and clinical-data protections govern this. For other Viva mode applications, analogous protections apply per domain.

### Honest acknowledgment: this is hard

Building a system that is genuinely this conscious is among the harder problems any Viva mode application will face. It is not "context window in an LLM." It is a continuous, multi-source, latency-sensitive substrate that has to accumulate signals from many places and make them available in real time for inference. The substrate has to be accurate (wrong context leads to wrong inferences, which destroys trust) and complete enough to support the inferences the application needs.

This is real engineering work, and it is foundational. A Viva mode application cannot achieve the paradigm without it. An application that fakes the paradigm without the substrate — chat interface that pretends to be aware but isn't — fails the principle and reveals itself quickly to users.

This work is named explicitly in each Viva mode application's plan as one of the foundational technical commitments. For AIRIS, see AIRIS Master Document Part IV — the consciousness substrate is part of what the Exploration phase tests and what the Real Thing phase builds for production.

---

## 5. Cross-Application Principles

These apply to every Viva mode application by inheritance. They are derivable from the worldview (see VIVA Master Document) but worth stating explicitly so they don't have to be re-derived for each new application.

**Specific over generic.** Every Viva mode application is built with specific professionals in mind, not generic ones. Generic understanding produces generic software. See VIVA Master Document Section 2 (The Method — Seeing the Specific Human) for what this means in practice and why no shortcut exists.

**Real before refined.** Every Viva mode application aims at being a real thing in the world before it tries to be a polished one. A real working application that demonstrably passes the displace-vs-extend test, even at non-production quality, is more valuable than a polished application that hasn't shown the test passes. The order matters: prove it works the real way it claims to work, then refine.

**The professional's time and craft are the measure of success.** Not feature counts, not adoption rates, not industry awards. The measure is whether the professional, working their actual day, is more in their craft and less in software-administration than they were before. This is the only success metric Viva mode accepts.

**The system absorbs; the human is freed.** Every Viva mode application is in service of the human's craft. The system takes on the bureaucratic translation, the administrative overhead, the institutional friction, the cross-system coordination. The human is freed to do what they were trained and called to do.

**Honesty about what's done and what isn't.** Every Viva mode application is honest about what's been built and what hasn't, what's been tested and what hasn't, what's been validated with real users and what hasn't. Marketing-grade claims that exceed what's actually been demonstrated are not Viva mode's work.

**Principle-first, not form-first.** Every Viva mode application is designed from the principle (least time and effort, displace-vs-extend) downward, not from a form upward. Forms — voice interfaces, materialized surfaces, dashboards, particular UI patterns — emerge from the principle as appropriate for specific moments. They are not chosen because they are modern, distinctive, or compelling on their own. A form earns its place by serving the principle better than alternatives in the specific case where it applies. When a form starts to feel like the goal rather than a means, the design has drifted and needs correcting. This protects against the failure mode where a clever paradigm becomes the thing being protected, rather than the user's time and effort.

**Technology choices are servants, not commitments — and are chosen by exploration, not by reasoning alone.** Specific technical choices (database, language, framework, deployment topology, AI model serving, paradigm implementation approaches, etc.) are best-current-options, not foundational commitments. They serve the philosophical goals; they do not constrain them. When a better option emerges, it gets considered honestly, with full awareness of the cost of changing. *And* — significantly — the right way to discover what works is by exploration and testing in real conditions, not by abstract reasoning alone. Before any production build phase, a Viva mode application should go through an exploration phase where multiple approaches are tried, prototyped, evaluated. Reasoning produces hypotheses; testing produces intuitions; intuitions inform real decisions. This applies especially to interaction-paradigm implementation, which cannot be reasoned to correctness in the abstract. Each application's Master Doc tracks its current technical choices and what would prompt revisiting each.

---

## 6. How specific applications instantiate Viva mode

The paradigm commits to architecture — two surfaces, full synchronization, consciousness substrate, the criterion, the principles above. It does not commit to:

- What the content surface actually shows in the domain
- What language the conversation surface understands
- What the consciousness substrate is conscious *of* — which signals matter in this domain
- The modules / components / building blocks of the application
- The domain-specific hard lines (operationalizations of the criterion in this domain)
- What "art" and what "noise" mean for the specific professionals being served
- The institutional and regulatory shape the application has to fit

These come from the seeing-the-specific-human work (VIVA Master Document Section 2) applied to the specific domain. They cannot be derived from the paradigm by reasoning alone; they emerge from sitting next to specific practitioners.

Every Viva mode application has, in its own Master Document, a **Frame section** that articulates its specific translation. The Frame describes how dual-surface manifests in the domain, what the consciousness substrate is conscious of, what the domain-specific hard lines are, what the modules and components are, what "the system absorbs; the human is freed" looks like in this domain. For AIRIS, see AIRIS Master Document Part I.

The relationship between Viva mode and a specific application is bidirectional, not parental. Viva mode was crystallized through AIRIS-focused work and named at the layer above when patterns seemed to apply more broadly. Future applications will refine Viva mode in turn — some "universal" commitments here will turn out to be AIRIS-shaped and need to be relaxed; some "AIRIS-specific" things will turn out to be patterns and get pulled up here.

### What we know about translation today

We have one Viva mode application active (AIRIS). What we know about the translation work is what AIRIS has taught us. The categories of decisions that show up in any translation, the questions a domain has to answer, what patterns recur across domains — these will emerge as more applications are built.

This section will grow as more applications are completed. For now, it points to AIRIS as the concrete instantiation and acknowledges the meta-pattern as not yet meaningful enough to articulate. The seeing in each new domain is irreplaceable; no meta-pattern substitutes for it (see VIVA Master Document Section 2). What the meta-pattern can do, once more applications exist, is help orient — not prescribe — the seeing work in a new domain.

---

## 7. Catalog of Viva mode applications

This is the current state of Viva mode's tree of software applications. Each entry indicates the application's status and points to its Master Doc if one exists.

### AIRIS — first Viva mode application, in healthcare

**Status:** Active. System specification, production plan, and execution work all in progress. Currently at V28 of its Master Document (Phase 0 / Stage 4 SW Build).

**Domain:** Hospital information systems. Eleven specialty modules (Radiology, Cardiology, Emergency, Operating Room, Laboratory, Pathology, Nuclear Medicine, Gastroenterology/Endoscopy, Dialysis, Care Unit, ICU) plus core infrastructure (Patient Registry, Event System, Interaction Layer, Builders, Patient Flow Layer, Regulatory Layer, and others). Deploys initially in Italian healthcare; designed for broader markets thereafter.

**Why this domain first:** Healthcare is where the displacement Viva mode opposes is most visible, most painful, and most consequential. The cost-paid-twice — once by the clinician, once by the patient — is paid by people who were already in trouble. Existing software in this domain is, with very few exceptions, an unusually clear example of the colonization Viva mode is trying to end.

**Status in the Viva mode tree:** AIRIS is the first translation of Viva mode into a specific domain. What is currently in this Viva mode Master Document is what AIRIS-focused work has crystallized as paradigm-level. As more applications get built, expect refinement in both directions.

**See:** AIRIS Master Document.

### ChatYourBusiness — concept, not yet activated

**Status:** Conceptual. No Master Doc yet.

**Domain:** Small craftspeople and self-employed professionals (hairdressers, mechanics, electricians, plumbers, photographers, etc.) using WhatsApp as their entire operational interface for client communication, scheduling, quotes, invoicing, follow-ups. The software absorbs the operational overhead while the craftsperson is in the conversation with their client; they don't operate a separate business-management application.

**Notes:** Initial concept work happened in early VIVA conversation but was set aside in favor of focusing on AIRIS first. Will get its own Master Doc when activated. The displace-vs-extend test for this domain: a hairdresser texting a client to confirm an appointment is in their craft (relationship with the client); operating a separate booking platform with twenty fields is displacement. ChatYourBusiness's job would be to keep the craftsperson in the relationship while the bureaucracy of running a business gets handled.

### Doctor-focused project — concept, not yet activated

**Status:** Conceptual. No Master Doc yet.

**Domain:** A future project focused specifically on doctors, in a capacity not yet defined. Mentioned in early conversation as a future direction. Distinct from AIRIS (which is a hospital information system serving the whole care team and institution); this would be doctor-centered in some specific way that will be articulated when the project is activated.

**Notes:** Will get its own Master Doc when activated and the domain is specified.

### Future applications

The catalog will grow as new applications are conceived. Each future application gets its own Master Doc when activated. The pattern is consistent: the application inherits everything in this Viva mode Master Doc (and through it, VIVA Master Doc), articulates how the paradigm applies in its specific domain, specifies its system, plans its production, tracks its decisions and live edges.

---

## Appendix — Notes on this document

This document is the Viva mode layer of the VIVA tree — the software-paradigm expression of VIVA's worldview.

This document is updated continuously as Viva mode's thinking evolves. Sessions that touch Viva mode-level matters (paradigm refinement, criterion sharpening, cross-application principle changes, consciousness substrate architecture) update this document directly. Sessions working on specific applications reference this document for inheritance but do not modify it for application-specific content; that goes in the application's own Master Doc. Sessions touching VIVA-worldview-level matters update VIVA Master Document.

For coordination across the tree, see Project Core.

**Cross-document updates.** When Viva mode-level work in a session affects content in any application's Master Document (by inheritance), all affected documents are updated in the same session before the session ends. This is critical because Viva mode's content is inherited by every application; if Viva mode shifts but the applications don't get updated, every downstream Master Doc operates from a stale parent.

The cross-document update discipline — the session-end audit pass (what was decided, where it lands, what's superseded) and the branch-consciousness coherence checks — lives in Project Core (How to Use the Tree) and in AIRIS Master Document V28 Working Principle 0.3.7 (Audit Discipline). A session working at the Viva mode level reads those before substantive work begins.

---

**End of document.**
