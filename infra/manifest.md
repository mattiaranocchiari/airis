# AIRIS — Infrastructure Manifest

Non-git state both channels need to know about. **Names and pointers only — never values or secrets.** Values live in the platform consoles (Vercel / Supabase) or as environment variables.

Update on every change to deployed infrastructure or environment configuration.

---

## Repository

- **GitHub:** `mattiaranocchiari/airis`
- **Default branch:** `main`

## Supabase

- **Project name:** `airis`
- **Project ref:** `fijhswewuklcbjkqnyor`
- **Region:** `eu-west-3` (EU)
- **Plan:** managed free tier
- **Postgres version:** 17
- **Migration level:** 0 (no migrations applied yet)
- **Schema state:** empty

## App

- **Framework:** Next.js 16 (App Router, TypeScript, Turbopack).
- **Styling:** Tailwind CSS 4.
- **Linter:** ESLint 9 (`eslint-config-next`).
- **Package manager:** npm.
- **Node:** verified on Node 22 (Next 16 requires Node ≥ 18.18).
- **Entry points:** `app/layout.tsx`, `app/page.tsx`.
- **Scripts:** `npm run dev | build | start | lint` (see `CLAUDE.md`).

## Vercel

- **Project:** GitHub-linked to `mattiaranocchiari/airis`
- **Project name / production URL:** TBD (record after first deploy)
- **Plan:** free tier

## LLM backend (Phase 0)

- **Active backend:** Anthropic API
- **Abstraction layer:** to be built from Step 4.5 per V28 `D.21` (three-backend abstraction).

## Secret names (values NOT in repo)

The following names are expected/used; values live in Vercel/Supabase env and are never committed:

- `ANTHROPIC_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Extend this list as new secrets are provisioned. Never add values.
