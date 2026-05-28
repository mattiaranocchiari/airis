# AIRIS — Operational Decision Log

Append-only chronological record of session activity across both channels (strategy = Claude.ai chat; execution = Claude Code).

**Entry format:**

- **Date** (YYYY-MM-DD)
- **Channel** (strategy | execution)
- **SHA** (commit SHA of the work)
- **Action** (one-line summary)
- **Notes** (optional context)

**Rule:** architectural decisions (those that would merit a `D.x` entry) are recorded **here** chronologically **and promoted** into the AIRIS Master Doc `D.x` Decision Log on the next atomic doc commit. The `D.x` Decision Log is the architectural source of truth; this file is the chronological audit trail.

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
## 2026-05-28 — strategy — canonical documents committed
- **Channel:** strategy (chat → Mattia)
- **SHA:** (this commit)
- **Action:** Populated the five canonical documents into their `/docs/` placeholders on `main`: `VIVA_Master_Document.md` (V3), `Viva_Mode_Master_Document.md`, `AIRIS_Master_Document.md` (V28), `AIRIS_Active_Plan.md`, `Project_Core.md`. Canonical structure now live in the repo. Updated `STATE.md` on the same commit (baton → execution).
- **Notes:** VIVA Master audited + aligned V2 → V3 this session (worldview preserved; stale Project Core protocol-table reference fixed; Branch Consciousness framing added; stable-filename convention). One inherited stale reference also fixed in `AIRIS_Master_Document.md` (V27 protocol-table ref). Final coherence sweep: 0 stale cross-references across all five docs. No new architectural `D.x` decision this turn — D.20–D.23 already live in the AIRIS Master Doc `D.x` Decision Log. Version-prefix cleanup in `CLAUDE.md` + this file delegated to the next execution turn (neutralize content-version references).

## 2026-05-28 — execution — version-prefix cleanup + Next.js scaffold (Step 4.1 complete)
- **Channel:** execution (Claude Code)
- **SHA:** (this PR's squash-merge commit on `main`; branch `claude/awesome-hopper-fqYdt`)
- **Action:** Two-part execution turn closing Step 4.1. (1) **Version-prefix cleanup**: `CLAUDE.md` "Two decision logs" section + matching "Session end" ritual + this file's dual-logging rule all neutralized — `V28 D.x Decision Log` → `D.x Decision Log`, "the V28 log/Decision Log" → "the `D.x` Decision Log" / "the AIRIS Master Doc `D.x` Decision Log." Also removed the now-stale "Current bootstrap state" section from `CLAUDE.md`. (2) **Next.js scaffold landed** at repo root: Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + ESLint 9 + Turbopack (`app/`, `public/`, `package.json` + lock, config files, `.gitignore`, `AGENTS.md`). `app/page.tsx` customized to a minimal AIRIS placeholder (Vercel-marketing demo removed); `app/layout.tsx` set to `lang="it"` + AIRIS metadata; `package.json` name = `airis`. `npm run build` + `npm run lint` both pass clean.
- **Notes:** No new architectural `D.x` decision this turn — operates entirely within D.10–D.23 commitments. `CLAUDE.md` "Build / test commands" now lists `npm run dev / build / start / lint`. `infra/manifest.md` gained an App section (framework / styling / linter / scripts); "default branch to be established" note cleared (main exists). Step 4.2 (Patient Registry endpoint — auth-gated CRUD + CloudEvents-envelope events + hash-chained L6 audit ledger per D.17 + tenant scoping by construction + Italian-claim CATH stub per D.18 / §17.13) deferred to the next execution turn per the previous STATE.md's "CC may split steps 2 and 3 across turns" allowance. Baton flips to strategy.
