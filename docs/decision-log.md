# AIRIS — Operational Decision Log

Append-only chronological record of session activity across both channels (strategy = Claude.ai chat; execution = Claude Code).

**Entry format:**

- **Date** (YYYY-MM-DD)
- **Channel** (strategy | execution)
- **SHA** (commit SHA of the work)
- **Action** (one-line summary)
- **Notes** (optional context)

**Rule:** architectural decisions (those that would merit a V28 `D.x` entry) are recorded **here** chronologically **and promoted** into the V28 Decision Log inside `AIRIS_Master_Document.md` on the next atomic doc commit. The V28 log is the architectural source of truth; this file is the chronological audit trail.

---

## 2026-05-28 — execution — bootstrap scaffold

- **Channel:** execution (Claude Code)
- **SHA:** `1e8780f` (root commit on `claude/kind-allen-Hupja`)
- **Action:** Scaffolded repo skeleton and workflow structure: `/CLAUDE.md`, `/STATE.md`, `/docs/` with five canonical-doc placeholders, `/docs/decision-log.md` (this file), `/infra/manifest.md`.
- **Notes:** Branch pushed; no PR opened at scaffold time; `main` not yet established at scaffold time. First post-bootstrap strategy turn commits the five canonical documents into the placeholder files on `main`.

## 2026-05-28 — execution — rename to version-free filename + establishing merge

- **Channel:** execution (Claude Code)
- **SHA:** (this commit; see `git log` on `claude/kind-allen-Hupja` and `main`)
- **Action:** Renamed `docs/AIRIS_Master_Document_V28.md` → `docs/AIRIS_Master_Document.md` (version-free filename for stable references; version tracked in-header + git history). Updated all filename references in `CLAUDE.md`, `STATE.md`, and this file to the new stable name. Established `main` as trunk by pushing `claude/kind-allen-Hupja` to `origin/main` (bootstrap special case: no PR, no merge commit — `main` is fast-forwarded to the feature-branch HEAD).
- **Notes:** Mattia authorized the direct merge. `main` HEAD now matches `claude/kind-allen-Hupja` HEAD. Baton flips to strategy. Non-filename V28 content references (D.20/D.21 cites, "V28 Decision Log" section name) are out of this rename's scope; flagged in `STATE.md`.
