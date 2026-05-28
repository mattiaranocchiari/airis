**BATON:** execution
**Stage / Step:** 4 / 4.3
**Updated:** 2026-05-28 by strategy (Claude Code acting as strategy channel) @ this commit

---

## Just done

Strategy turn (branch `claude/loving-knuth-H2bSz` → draft PR — direct-to-`main` via founder merge per project ritual):

- **Step 4.3 framed** as a paradigm-validation prototype (not a Radiology subsystem build) — four pillars: dual-surface sync, English intent parsing on Claude API direct, consciousness substrate L1+L2+L3+L5+L6, engine call on the current concrete backend. Smallest paradigm-validating CT-scheduling slice committed in `docs/Step_4.3_plan.md` (~5 intents + disambiguation + Tier 3 read-back; two-browser preferred for L2 broadcast + RLS proof).
- **Two architectural reframes** absorbed into the Master Doc this session — both supersede prior framings without disturbing the substantive Italian / Section 17 content:
  - **D.21 reframed** — engine-agnostic LLM substrate abstraction; three deployment modes (client-local self-hosted; online API; AIRIS-hosted non-HQ); built Step 4.5. Earlier named engines (Ollama, Hostinger VPS, AWS Bedrock EU, Mistral La Plateforme EU, Hetzner GEX44, OVHcloud L40S) retired as platform commitments; they remain illustrative deployment options.
  - **D.22 reframed** — current concrete LLM backend is **Claude API direct** (an instance of Mode 2). No deployment-mode-as-platform-default; concrete backend per deployment under D.21.
  - **D.24 new** — international platform; Italy as first deployment market; locale-agnostic by construction; Italian content in §17.6 / §17.7 / §17.8 / §17.13 / §17.21–§17.23 / D.18 / D.19 preserved as Italy's localization layer at first-market depth, not as platform-wide commitments. Sister abstraction to D.21.
- **Master Doc surgical edits** this commit: Part 0.2 Stance (Italian-first bullet reframed to international + Italy first-market); Part 0.3.1 (locale-aware intent parsing; engine-agnostic discipline); Part 0.4 (procurement + abstraction bullets + new D.24 bullet); Part I Executive Vision Scope (international platform paragraph); Section 17 reframe note (cross-cutting reframes for engine-agnostic + international platform); §17.5 (full rewrite around engine-agnostic + three modes + current backend); D.21 (reframed in place with supersession history); D.22 (reframed in place with supersession history); D.24 (new entry). Italian-specific content in Section 17 / D.18 / D.19 / §8.6 preserved verbatim — only the framing changes.
- **Active Plan updated**: CURRENT STATE block (Step 4.3 active; Step 4.1 + 4.2 marked complete; revised Phase 0 cost line with Claude API usage); Step 4.3 scope (Ollama framing dropped; English platform default; Node-native voice; Claude API direct; references the new plan file); new session-log entry at the bottom recording the four founder directions + cross-doc updates.
- **CLAUDE.md updated**: header reframed to "international hospital information system; Italy as first deployment market"; Phase 0 stack line carries Claude API direct + engine-agnostic abstraction framing; Hard invariants block carries D.21 + D.24 entries.
- **Project_Core.md updated**: AIRIS one-liner now reads "hospital information system; international platform, Italy as first deployment market."
- **infra/manifest.md updated**: LLM backend section reframed to "current concrete backend: Claude API direct" (an instance of Mode 2 under the engine-agnostic abstraction); the obsolete Ollama-VPS-flip-at-Step-4.3 note removed.
- **`docs/Step_4.3_plan.md` committed** — execution-turn plan, same shape as the Step 4.2 plan that worked: scope, four pillars, minimum-viable slice, architectural commitments, schema additions, failure-mode triggers set before execution, corpus generation plan, acceptance criteria, open questions, the four steers from this strategy session.
- **`docs/decision-log.md` entry** appended for this turn.

## In flight / uncommitted

- None on the branch beyond what's listed above; awaiting founder merge of this strategy commit into `main`. Once merged, execution opens a new branch from `main` to build against `docs/Step_4.3_plan.md`.

## Next concrete step (execution turn)

**Step 4.3 — Paradigm prototype (CT scheduling)** per `docs/Step_4.3_plan.md`. Execution turn opens against that plan. First sub-deliverable likely: appointment schema + atomic RPCs + Realtime broadcast wiring + scheduler grid view + Claude API intent-parse path for the first two intent classes (Tier 1 view + Tier 2 schedule). Two-browser configuration brought up early to validate the L2 broadcast + RLS contract before the rest of the intents land. Founder drafts the English intent corpus alongside execution.

## Open questions for the other channel (execution)

- **Two-browser cost.** Founder lean is two-browser if cheap to wire up the second session against the existing auth-hook + RLS pattern. If execution discovers it's non-trivial (e.g., would require a second Supabase project, or the RLS policy on `realtime.messages` needs new work), single-user first is acceptable — surface to strategy and bring two-browser online later in the same step.
- **English STT pick.** Plan says one English streaming STT; execution picks between Deepgram English and AssemblyAI English (or equivalent) based on a quick latency check at execution time. Either is fine; no strategic preference from this session.
- **G2 trigger reminder.** Step 4.2 follow-up flagged "before any real or sensitive data exists." Step 4.3 adds only synthetic English patients + synthetic CT slots; reusing the existing `airis` dev Supabase project is fine. Re-evaluate at Step 4.4 transition.
- **CATH registration carry-forward.** The Custom Access Token Hook from Step 4.2 (`public.custom_access_token_hook`) is still defined in the DB but not yet registered in the Supabase Dashboard. Step 4.3 doesn't strictly depend on it (synthetic English patients don't need Italian claims). Register it when the localised Italian milestone arrives.
