# AIRIS — Operating Manual

Italian hospital information system; first application of the Viva mode pattern.
**Stage:** 4 (SW Build) — **Step:** 4.1 (minimal infrastructure setup).

**Phase 0 stack:** GitHub (`mattiaranocchiari/airis`); Supabase managed EU free tier (`eu-west-3`, project `airis`); Vercel free, GitHub-linked; Anthropic API as active LLM backend. Three-backend LLM abstraction built from Step 4.5 per V28 D.21.

**Operating principles:** *Real UX, Minimal Infrastructure* (V28 D.20). *Branch consciousness* — each node knows itself + parent + children only.

---

## The single fact

The git repo is the only state shared between the strategic (Claude.ai chat) and execution (Claude Code) channels. `main` HEAD is the sync barrier. Anything not on `main` does not cross channels.

---

## Canonical documents (read in order at session start)

1. `/CLAUDE.md` — this file. Operating rules.
2. `/STATE.md` — current baton, stage/step, just-done, in-flight, next step.
3. `/docs/AIRIS_Active_Plan.md` — cross-session execution plan.
4. `/docs/AIRIS_Master_Document.md` — architectural truth + Decision Log (D.1…D.x).
5. `/docs/Project_Core.md` — project-specific invariants.
6. `/docs/VIVA_Master_Document.md`, `/docs/Viva_Mode_Master_Document.md` — pattern foundations.
7. `/infra/manifest.md` — non-git infra pointers (DB migration level, deployed versions, secret names).

---

## Channels and baton

- Two channels: **strategy** (Claude.ai chat) and **execution** (Claude Code).
- Coordination via the **baton** in `/STATE.md` — single home, on `main`.
- One channel acts per turn. At most one open code branch at a time.

---

## Rituals

### Session start (both channels)

1. Read `CLAUDE.md` → `STATE.md` → docs referenced → `infra/manifest.md`.
2. Verify the baton is yours. If not, do not act — wait for the other channel.
3. If this is a strategy turn: Mattia re-feeds current `main` HEAD (relevant docs + `STATE.md`) into chat **verbatim, not paraphrased**, before any decision. (Mitigates strategic-channel staleness.)

### Session end (both channels)

1. Update `/STATE.md` (just done, in flight, next step, baton flip).
2. Append `/docs/decision-log.md` (date, channel, SHA, action).
3. If any decision is architectural: queue promotion into the V28 `D.x` log on the next atomic doc commit.
4. Commit + push. Turn closer:
   - **Strategy turn:** push to `main` = closes the turn.
   - **Execution turn:** PR merge to `main` = closes the turn.

---

## Branch model

- `main` = audited trunk; baton's only home; single consistent state.
- **Code (execution)** = feature branches (one open at a time) → PR → squash-merge to `main`. PR is the MDR Class IIb audit record.
- **Docs (strategy)** = direct commit to `main`. (Promote to PR-per-change later if auditors require it.)
- Rebase feature branches on `main` before merge.
- The merge atomically lands code + STATE update + baton flip. Nothing is "real" until on `main`.

---

## Hard invariants

- **Never commit secrets.** Names only in `/infra/manifest.md`; values live in Vercel/Supabase env.
- **Tenant scoping by construction**, not by application-layer filtering (RLS / schema-per-tenant; see V28).
- **Three-backend LLM abstraction** from Step 4.5 per V28 D.21. Phase 0 active backend: Anthropic API.
- **Docs win over chat memory.** When strategic-chat working memory disagrees with committed docs, the docs are truth.
- **Plans cross sessions as files, not plan-mode artifacts.** `/docs/AIRIS_Active_Plan.md` + `/STATE.md` are the carriers. Plan mode is in-session scratch only.
- **Flush state before session end.** Auto-compaction can drop early conversation; only what is committed survives.
- **Verbatim relay.** Mattia moves files between channels; he does not summarize them.

---

## Two decision logs

- **`/docs/decision-log.md`** — operational chronology: every turn (date, channel, SHA, action).
- **V28 `D.x` Decision Log** inside `AIRIS_Master_Document.md` — architectural commitments (decision, rationale, alternatives, supersession, cross-refs).
- Every architectural decision lands in **both**: chronological entry now; promoted into the V28 log on the next atomic doc commit.

---

## Build / test commands

TBD — stack not yet initialized. Update this section when the first code lands.

---

## Compact instructions

If context is auto-compacted, preserve:

1. The baton state and current stage/step from `/STATE.md`.
2. The hard invariants above.
3. The rituals.

Tool-output history can be dropped; everything important is already in the repo.

---

## Current bootstrap state

This repo was just scaffolded by the execution channel. The five canonical docs in `/docs/` are placeholders; the first post-bootstrap **strategy turn** lands their content. `main` does not yet exist — the first merge of `claude/kind-allen-Hupja` establishes it.
