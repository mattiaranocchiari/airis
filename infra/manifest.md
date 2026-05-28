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
- **Project URL:** `https://fijhswewuklcbjkqnyor.supabase.co`
- **Region:** `eu-west-3` (EU)
- **Plan:** managed free tier
- **Postgres version:** 17
- **Migration level:** 17 (see `supabase/migrations/`)
- **Schemas:**
  - `public`: `tenants`, `clinician_profiles`, `patients`, `audit_events`, `event_queue`.
    Functions: `current_tenant_id`, `custom_access_token_hook`, `patient_create`, `patient_update`, `patient_delete`.
  - `airis_internal` (not exposed via PostgREST): `audit_events_append` (SECURITY DEFINER chain insertion).
- **RLS:** enabled on all `public` PHI-bearing tables; reads `tenant_id` from JWT `app_metadata`. Soft-delete filter (`deleted_at IS NULL`) is application-side, not RLS (see `notes.md`).
- **Audit chain:** hash-chained `audit_events` per D.17, ordered by per-tenant monotonic `chain_sequence`. Daily SHA hash-anchor to B2 EU object-lock is **deferred to Phase A** per D.20.
- **Custom Access Token Hook:** function `public.custom_access_token_hook(event jsonb)` defined; **must be registered manually** in the Supabase Dashboard → Authentication → Hooks → "Customize Access Token (JWT) Claims" for it to fire on auth events.
- **Tightened defaults:** `EXECUTE` on `public.rls_auto_enable()` revoked from `anon` / `authenticated` / `public` (delta from Supabase project default; silences advisor lint).

## App

- **Framework:** Next.js 16 (App Router, TypeScript, Turbopack).
- **Styling:** Tailwind CSS 4.
- **Linter:** ESLint 9 (`eslint-config-next`).
- **Package manager:** npm.
- **Node:** verified on Node 22 (Next 16 requires Node ≥ 18.18).
- **Entry points:** `app/layout.tsx`, `app/page.tsx`.
- **API routes:** `app/api/patients/route.ts` (GET list + POST), `app/api/patients/[id]/route.ts` (GET + PATCH + DELETE).
- **Runtime deps:** `@supabase/supabase-js`, `@supabase/ssr`, `zod`, `ulid`.
- **Test runner:** Vitest (dev dep), test scripts `npm run test` / `npm run test:watch`. Round-trip integration test under `tests/patients.roundtrip.test.ts`. Requires local `.env.local` with the Supabase secrets (see below) to run.
- **Scripts:** `npm run dev | build | start | lint | test | test:watch | typecheck`.

## Vercel

- **Project:** GitHub-linked to `mattiaranocchiari/airis`
- **Project name / production URL:** TBD (record after first deploy)
- **Plan:** free tier
- **Env vars to set (Vercel project Settings → Environment Variables):**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-side only; never `NEXT_PUBLIC_*`)

## LLM backend (Phase 0)

- **Active backend:** Anthropic API
- **Abstraction layer:** to be built from Step 4.5 per V28 `D.21` (three-backend abstraction). Step 4.3 paradigm prototype flips the *active* default to local self-hosted (Ollama VPS) per D.22 while keeping the abstraction unchanged.

## Secret names (values NOT in repo)

The following names are expected/used; values live in Vercel/Supabase env (production) and developers' local `.env.local` (gitignored). Never commit values.

- `ANTHROPIC_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — modern publishable key (preferred over legacy anon).
- `SUPABASE_ANON_KEY` — legacy JWT-format anon key (kept for compatibility; not the default in the codebase).
- `SUPABASE_SERVICE_ROLE_KEY` — required for the Vitest round-trip test (creates test auth users / asserts admin-side state). Never ship to the browser.

Extend this list as new secrets are provisioned. Never add values.
