**BATON:** execution
**Stage / Step:** 4 / 4.1→4.2
**Updated:** 2026-05-28 by strategy (chat → Mattia) @ this commit

---

## Just done
- **Canonical documents committed** (this commit): the five canonical docs populated into their `/docs/` placeholders on `main`:
  - `VIVA_Master_Document.md` (V3 — worldview)
  - `Viva_Mode_Master_Document.md` (paradigm)
  - `AIRIS_Master_Document.md` (V28 — application)
  - `AIRIS_Active_Plan.md` (operational)
  - `Project_Core.md` (navigation)
- VIVA Master audited + aligned **V2 → V3** this session: worldview content preserved; stale Project Core protocol-table reference fixed; Branch Consciousness framing added; stable-filename + in-header-version convention adopted.
- One inherited stale reference also fixed in `AIRIS_Master_Document.md` (V27 protocol-table reference, Part V Section 6).
- Final coherence sweep across all five docs: **0 stale cross-references.** Canonical structure now live in the repo.

## In flight / uncommitted
- None.

## Next concrete step (execution turn)
Branch off `main` (one feature branch), use plan mode, PR-merge to close the turn. Sequence:
1. **Version-prefix cleanup** (strategy decision: neutralize content-version references for stable references). In `CLAUDE.md` "Two decision logs": drop the `V28` prefix — `D.x Decision Log inside AIRIS_Master_Document.md`, and "promoted into the `D.x` Decision Log on the next atomic doc commit." In `docs/decision-log.md` dual-logging rule: "the V28 Decision Log" → "the AIRIS Master Doc `D.x` Decision Log." Reference decisions by number (D.20, D.21); version is implicit from the doc header + git.
2. **Scaffold Next.js app** (App Router + TypeScript) — completes the Step 4.1 repository scaffold.
3. **Begin Step 4.2 — Patient Registry endpoint** per `docs/AIRIS_Active_Plan.md` Step 4.2 (auth-gated; CloudEvents-envelope events + hash-chained L6 audit ledger rows; CRUD on Next.js + Supabase EU + TypeScript; tenant scoping by construction; Italian-claim Custom Access Token Hook stubbed per AIRIS Master Doc D.18 + §17.13; Anthropic API as Phase 0 LLM backend per D.20/D.22; three-backend abstraction is built later from Step 4.5, not here).

CC may split steps 2 and 3 across turns via plan mode if cleaner.

## Open questions for the other channel
- None at handoff. (Version-prefix question resolved: neutralize — folded into next execution turn, step 1 above.)
