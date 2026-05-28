# Project Core

*Entry point to the project tree. Pure navigation — what nodes exist, what each holds, how to use the tree. No node-specific content lives here; that lives in each node's own Master Document.*

---

## THE TREE

```
VIVA — values, philosophy, vision
  → VIVA Master Document
│
└── Viva mode — solution / pattern for creating solutions
      → Viva Mode Master Document
    │
    └── AIRIS — hospital information system; international platform, Italy as first deployment market (first Viva mode application)
          → AIRIS Master Document  (currently V28)
          → AIRIS Active Plan (operational counterpart to V28)
```

---

## BRANCH CONSCIOUSNESS PRINCIPLE

Each tree branch is fully and only conscious about what concerns IT — itself + its parent (above) + its children (below). Not siblings, not unrelated content.

- **VIVA branch:** aware of itself + its children (Viva mode).
- **Viva mode branch:** aware of itself + parent (VIVA) + its children (AIRIS, future Viva mode applications).
- **AIRIS branch:** aware of itself + parent (Viva mode) + grandparent (VIVA, for cross-tree references) + its children (none currently).

This makes the structure modular and automatic. Each branch is self-sufficient for what concerns it; cross-tree references are explicit.

---

## HOW TO USE THIS TREE

**Session start:**
1. Read Project Core (you're doing it now) — confirms tree layout and which node is active.
2. Identify which branch the session touches.
3. Read that branch's Master Document for the relevant content (VIVA Master, Viva Mode Master, or AIRIS Master Document).
4. For AIRIS operational sessions, also read AIRIS Active Plan Current State.

**Session end (when strategic/architectural decisions touched):**
- What did we decide?
- Where does it land — which branch's Master Document?
- What gets superseded?
- What goes in that branch's Decision Log or equivalent?
- What goes in Future Concerns?
- What changes immediately vs accumulates for next atomic commit on the affected Master Document?

**Atomic commit discipline:**
Each branch's Master Document evolves through atomic commits. When a session surfaces real improvements, the affected Master Document gets the atomic commit. Cross-doc coherence checked: parent + children references stay consistent.

---

## CANONICAL DOCS

These are the only docs that compose the persistent project structure. Everything else (sketches, specs, analyses, planning notes, intermediate outputs) is volatile working context that exists during sessions but does NOT belong to the canonical structure.

- `Project_Core.md` — this file
- `VIVA_Master_Document.md` — VIVA branch
- `Viva_Mode_Master_Document.md` — Viva mode branch
- `AIRIS_Master_Document.md` — AIRIS branch
- `AIRIS_Active_Plan.md` — AIRIS operational counterpart

That's it. With these five files, work on the project can resume in any environment / chat / AI tool seamlessly. The canonical structure is bounded; nothing leaks volatile context.

---

## CROSS-TREE REFERENCES

Specific decisions or learnings in one branch that explicitly inform another. Live additions tracked here when they emerge as real (not speculative).

- *(Currently empty — references between branches are tracked in the branches themselves via explicit parent/child links, not duplicated here.)*
