# AIRIS — Handoff State

**BATON:** strategy
**Stage / Step:** 4 / 4.1
**Updated:** 2026-05-28 by execution (Claude Code) — see latest commits on `main`

---

## Just done

- **Bootstrap scaffold** (commit `1e8780f`) on `claude/kind-allen-Hupja`:
  - `/CLAUDE.md`, `/STATE.md`, `/docs/decision-log.md`, `/infra/manifest.md`
  - `/docs/` with one-line placeholders for the five canonical documents: `VIVA_Master_Document.md`, `Viva_Mode_Master_Document.md`, `AIRIS_Master_Document.md`, `AIRIS_Active_Plan.md`, `Project_Core.md`.
- **Rename + reference sweep** (this commit): `docs/AIRIS_Master_Document_V28.md` → `docs/AIRIS_Master_Document.md` (version-free filename per decision; version tracked in-header + git history). Updated every filename reference in `CLAUDE.md`, `STATE.md`, and `docs/decision-log.md` to the new name.
- **Establishing merge:** `main` created at the `claude/kind-allen-Hupja` HEAD. `main` is now the audited trunk and the baton's only home.

## In flight / uncommitted

- None.

## Next concrete step

1. **First strategy turn (chat → Mattia):** commit the existing five canonical documents into their placeholder files on `main`, in a single atomic commit. Update this `STATE.md` (just-done, next-step, baton flip if execution work is queued) and append `/docs/decision-log.md` on the same commit.
2. Before any new strategic decision: Mattia re-feeds current `main` HEAD (canonical docs + `STATE.md`) into chat verbatim, per the CLAUDE.md ritual.

## Open questions for the other channel

- Non-filename V28 content references remain in `CLAUDE.md` (`V28 D.20`, `V28 D.21`, and the `V28 D.x Decision Log` section name) and in `docs/decision-log.md` (`V28 Decision Log` in the dual-logging rule). The rename scope was filename-only; these content references were intentionally left out of scope. Strategic channel: decide whether to neutralize them (e.g., reference decisions by number with version implicit from git/header) when committing canonical content, or keep them as version markers.
