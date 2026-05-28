# AIRIS — Operational Decision Log

Append-only chronological record of session activity across both channels (strategy = Claude.ai chat; execution = Claude Code).

**Entry format:**

- **Date** (YYYY-MM-DD)
- **Channel** (strategy | execution)
- **SHA** (commit SHA of the work)
- **Action** (one-line summary)
- **Notes** (optional context)

**Rule:** architectural decisions (those that would merit a V28 `D.x` entry) are recorded **here** chronologically **and promoted** into the V28 Decision Log inside `AIRIS_Master_Document_V28.md` on the next atomic doc commit. The V28 log is the architectural source of truth; this file is the chronological audit trail.

---

## 2026-05-28 — execution — bootstrap scaffold

- **Channel:** execution (Claude Code)
- **SHA:** (this commit; see `git log` on `claude/kind-allen-Hupja`)
- **Action:** Scaffolded repo skeleton and workflow structure: `/CLAUDE.md`, `/STATE.md`, `/docs/` with five canonical-doc placeholders, `/docs/decision-log.md` (this file), `/infra/manifest.md`.
- **Notes:** Branch pushed; no PR opened; `main` not yet established. Mattia performs the establishing merge to create `main` as trunk. First post-bootstrap strategy turn commits the five canonical documents into the placeholder files on `main`.
