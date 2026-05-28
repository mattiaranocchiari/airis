**BATON:** strategy
**Stage / Step:** 4 / 4.1→4.2
**Updated:** 2026-05-28 by execution (Claude Code) @ this commit

---

## Just done

This execution turn (branch `claude/awesome-hopper-fqYdt` → PR → squash-merge to `main`):

- **Version-prefix cleanup** per previous STATE.md step 1:
  - `CLAUDE.md` "Two decision logs" section: `V28 D.x Decision Log` → `D.x Decision Log`; "promoted into the V28 log" → "promoted into the `D.x` Decision Log."
  - Same neutralization on the matching reference in the `CLAUDE.md` "Session end" ritual (kept the two phrasings consistent).
  - `docs/decision-log.md` dual-logging rule: dropped `V28` prefixes; now references "AIRIS Master Doc `D.x` Decision Log" and "`D.x` Decision Log."
- **Stale CLAUDE.md transition note removed**: dropped the "Current bootstrap state" section (the bootstrap is complete; the five canonical docs are populated; `main` is established).
- **Next.js scaffold landed** — completes Step 4.1 repository scaffold:
  - Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + ESLint 9 + Turbopack.
  - Files at repo root: `app/` (layout, page, globals.css, favicon), `public/` (empty), `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `next-env.d.ts`, `.gitignore`, `AGENTS.md` (Next-16 agent guidance from create-next-app).
  - Customized vs. create-next-app default: `package.json` name = `airis`; `app/layout.tsx` metadata + `html lang="it"`; `app/page.tsx` minimal AIRIS placeholder (removes the Vercel-marketing demo).
  - `npm run build` and `npm run lint` both pass clean (Next.js 16.2.6 / React 19.2.4 / Turbopack).
- **`infra/manifest.md` updated**: added App section (framework, styling, linter, scripts); cleared the obsolete "default branch to be established" note (main exists).
- **`CLAUDE.md` Build / test commands section** now lists the actual scripts.

## In flight / uncommitted
- None on the branch after the PR set. Test runner not yet installed — lands with Step 4.2 when the first endpoint needs unit tests.

## Next concrete step (execution turn)

**Step 4.2 — Patient Registry endpoint** per `docs/AIRIS_Active_Plan.md` Step 4.2. Deferred from this turn per the previous STATE.md's explicit "CC may split steps 2 and 3 across turns" allowance — Next.js scaffold (step 2) lands first as its own auditable PR; Patient Registry (step 3) lands as the next PR.

Scope per Active Plan + Master Doc:
- Auth-gated CRUD on a `patients` table; Next.js App Router API routes + Supabase EU (project ref `fijhswewuklcbjkqnyor`); TypeScript end-to-end.
- Tenant scoping by construction (RLS), not application-layer filtering.
- CloudEvents v1.0.2 envelope event emission on writes; hash-chained L6 audit ledger rows per D.17.
- Italian-claim Custom Access Token Hook stubbed per D.18 + §17.13.
- Anthropic API as Phase 0 active LLM backend per D.20 / D.22 (no LLM call yet at this step; three-backend abstraction is built later from Step 4.5 per D.21 — not here).
- Add a minimal test runner (Vitest is the leading candidate; confirm in plan mode) and one round-trip test against a Supabase preview branch.

Endpoint-level design details worked out in the next execution turn from the architectural commitments (D.17 audit ledger, D.18 Italian identity, §17.13).

## Open questions for the other channel
- None at handoff.
