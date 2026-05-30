# AIRIS — Operating Manual

International hospital information system; Italy as first deployment market (V28 D.24); first application of the Viva mode pattern.
**Stage:** 4 (SW Build) — **Step:** 4.2 done → 4.3 (paradigm prototype — CT scheduling).

**Phase 0 stack:** GitHub (`mattiaranocchiari/airis`); Supabase managed EU free tier (`eu-west-3`, project `airis`); Vercel free, GitHub-linked; **Claude API direct** as the current concrete LLM backend per V28 D.22. Engine-agnostic LLM substrate abstraction (three deployment modes — client-local self-hosted, online API, AIRIS-hosted non-HQ) built from Step 4.5 per V28 D.21.

**Operating principles:** *Real UX, Minimal Infrastructure* (V28 D.20). *Branch consciousness* — each node knows itself + parent + children only. *Single-session integrated operator* (V28 D.25) — see Operating model below.

---

## The single fact

The git repo is the only state that survives between sessions. `main` HEAD is the sync barrier. The Claude Code session is ephemeral; the docs structure is the entire memory. Anything not on `main` does not survive.

---

## Canonical documents (read in order at session start)

1. `/CLAUDE.md` — this file. Operating rules.
2. `/STATE.md` — current stage/step, just-done, in-flight, next concrete step, open questions for Mattia.
3. `/docs/Project_Core.md` — tree layout (VIVA → Viva mode → AIRIS) + canonical-docs catalogue.
4. `/docs/AIRIS_Active_Plan.md` — cross-session execution plan; read CURRENT STATE block + the active step's section.
5. `/docs/AIRIS_Master_Document.md` — architectural truth + `D.x` Decision Log. Read recent `D.x` entries; read deeper sections only when the session touches them.
6. `/infra/manifest.md` — non-git infra pointers (DB migration level, deployed versions, secret names).
7. Step-specific plan/notes (e.g. `/docs/Step_4.x_plan.md`, `/docs/Step_4.x_notes.md`) when STATE.md flags an active step.
8. `/docs/VIVA_Master_Document.md`, `/docs/Viva_Mode_Master_Document.md` — pattern foundations. Read only when the session touches them.

This list IS the bootstrap path. A fresh Claude Code session that reads these in order can pick up the project from a cold start — that's the **context-agnostic machine** property.

---

## Operating model (per V28 D.25)

One Claude Code session is the project's complete operator: strategy, execution, architecture, and review all happen here. The two-channel strategy/execution baton from V28-and-earlier is retired.

**Operator responsibilities (Claude Code, this session):**

- Make architectural calls when they follow from existing commitments (the `D.x` log, Section 17, working principles, hard invariants below). Propose + execute + record.
- Surface inline to Mattia when a call is genuinely strategic — sets a new commitment, supersedes a `D.x`, changes scope, has founder-judgment-dependent tradeoffs (qualitative SLO calls, market positioning, cost limits, time pressure, risk appetite).
- Execute the work. One open code branch at a time; PR + squash-merge to `main` when greens are in and validation steers permit.
- Flush state to the docs before the session ends. Anything not on `main` does not survive.

**Founder steering (Mattia):**

- Provides direction in-session.
- Authoritative on qualitative trigger evaluation (UX feel, voice quality, materialisation feel, taste calls).
- For risky / irreversible / shared-state-affecting actions, Claude Code pauses and confirms by default per the "executing actions with care" rule.

**At most one open code branch at a time.**

---

## Rituals

### Session start

1. Read the canonical documents in the order listed above. STATE.md is the action-driver — everything else informs.
2. Confirm what's in flight (uncommitted changes on the active branch; open PRs). Match the working tree to what STATE.md describes.
3. If STATE.md lists Open questions for Mattia, surface them at the top of the session before continuing.

### Mid-session — architectural calls

When a decision is architecturally significant per the operator-responsibility rule:

1. Note the call, the rationale, and alternatives considered.
2. If it follows existing commitments: proceed; record as `D.x` + decision-log on next atomic doc commit.
3. If it sets a new commitment or supersedes a `D.x`: surface inline to Mattia, await direction, proceed with attribution recorded.

### Session end — the flush ritual (existential)

The session terminates at indeterminate times. Before it ends:

1. Update `/STATE.md` (just done, in flight, next concrete step, open questions for Mattia). Precise; a fresh session reads it and must be able to act.
2. Append `/docs/decision-log.md` (date, action one-liner, SHA, any `D.x` promotion note).
3. If an architectural commitment was made: promote into the `D.x` Decision Log inside `AIRIS_Master_Document.md` on the next atomic doc commit. Update `infra/manifest.md` if non-git state changed (migration level, deployed versions, secret names).
4. Commit + push. The push completes the flush.

---

## Branch model

- `main` = audited trunk; single consistent state across sessions.
- Feature branches (one open at a time) → PR → squash-merge to `main`. The PR is the MDR Class IIb audit record.
- Rebase feature branches on `main` before merge.
- Docs may go either via PR (atomic doc commits) or, when scope is small and follows from session work, direct commit on the active feature branch and squash-merged with the code. Use PR-per-doc-change later if auditors require it.
- **Self-merge of routine PRs is allowed when:** all CI checks green (no failing or pending blockers); no failure-mode trigger fired; no new architectural commitment was made that hasn't been surfaced inline to Mattia first. Squash-merge into `main`, delete the source branch. The merge atomically lands code + STATE update + docs.
- **Architectural-commitment merges:** if the PR encodes a new architectural commitment, surface inline to Mattia before merging; record the commitment as `D.x` + decision-log; merge only after Mattia's direction lands.
- Nothing is "real" until on `main`.

---

## Hard invariants

- **Never commit secrets.** Names only in `/infra/manifest.md`; values live in Vercel/Supabase env.
- **Tenant scoping by construction**, not by application-layer filtering (RLS / schema-per-tenant; see V28).
- **Engine-agnostic LLM substrate abstraction** from Step 4.5 per V28 D.21 (three deployment modes: client-local self-hosted, online API, AIRIS-hosted non-HQ). Current concrete backend per V28 D.22: Claude API direct.
- **International platform; Italy as first deployment market** per V28 D.24. Platform architecture (paradigm, substrate, engineering architecture) is language- and locale-agnostic by construction; Italian content in the Master Doc is Italy's localization layer, not a platform-wide commitment.
- **Single-session integrated operator** per V28 D.25. Canonical docs are the entire memory across sessions; the session is ephemeral; flush-before-end is existential.
- **Docs win over chat memory.** When in-session reasoning disagrees with committed docs, the docs are truth. (Inverse: when in-session reasoning *improves* on the docs, update the docs in the same atomic commit.)
- **Plans cross sessions as files, not plan-mode artifacts.** `/docs/AIRIS_Active_Plan.md` + `/STATE.md` + step-specific plan/notes files are the carriers. Plan mode is in-session scratch only.
- **Flush state before session end.** The session can terminate at any time; only what is committed to `main` survives.
- **Verbatim grounding.** Quotations / direct evidence from docs are not paraphrased before they inform decisions. Within the single-session model this is self-applied: read the relevant doc spans, don't reason from compressed memory.

---

## Two decision logs

- **`/docs/decision-log.md`** — operational chronology: every session of consequence (date, action, SHA).
- **`D.x` Decision Log** inside `AIRIS_Master_Document.md` — architectural commitments (decision, rationale, alternatives, supersession, cross-refs).
- Every architectural decision lands in **both**: chronological entry now; promoted into the `D.x` Decision Log on the next atomic doc commit.

---

## Build / test commands

- `npm install` — install dependencies.
- `npm run dev` — local dev server on `http://localhost:3000` (Turbopack).
- `npm run build` — production build.
- `npm start` — serve the production build.
- `npm run lint` — ESLint (Next + TypeScript rules).
- `npm run typecheck` — `tsc --noEmit`.
- `npm run test` — Vitest. Unit suites run unconditionally; live-DB suites skip when Supabase secrets are absent (env-gated via `tests/setup.ts`).
- `npm run eval:intents` — English intent corpus harness against the live Claude API; exits non-zero on <90% pass-rate. Skips cleanly when `ANTHROPIC_API_KEY` is unset; `INTENT_EVAL_MOCK=1` runs structure-only.

---

## Compact instructions

If session context is auto-compacted, preserve:

1. The current stage/step + active branch state from `/STATE.md`.
2. The Operating model and Rituals sections above.
3. The Hard invariants list.

Everything else can be re-read from the canonical docs. Tool-output history can be dropped; everything important is already in the repo.
