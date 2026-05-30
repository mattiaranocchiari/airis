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
- **Migration level:** 23 (see `supabase/migrations/`)
- **Schemas:**
  - `public`: `tenants`, `clinician_profiles`, `patients`, `audit_events`, `event_queue`, `appointments`, `egfr_results` (Phase 0 mock).
    Functions: `current_tenant_id`, `custom_access_token_hook`, `patient_create`, `patient_update`, `patient_delete`, `appointment_create`, `appointment_update`, `appointment_cancel`.
  - `airis_internal` (not exposed via PostgREST): `audit_events_append` (SECURITY DEFINER chain insertion).
- **RLS:** enabled on all `public` PHI-bearing tables; reads `tenant_id` from JWT `app_metadata`. Soft-delete filter (`deleted_at IS NULL`) is application-side, not RLS (see `notes.md`).
- **Realtime broadcast:** `realtime.messages` carries per-tenant policies (migration 0021) authorising authenticated clinicians on topics matching `tenant:{tenant_id}:%`. Channel naming for the CT scheduler is `tenant:{tenant_id}:scheduler:{room_id}` per §17.4 L2.
- **Audit chain:** hash-chained `audit_events` per D.17, ordered by per-tenant monotonic `chain_sequence`. Daily SHA hash-anchor to B2 EU object-lock is **deferred to Phase A** per D.20.
- **Custom Access Token Hook:** function `public.custom_access_token_hook(event jsonb)` defined; **must be registered manually** in the Supabase Dashboard → Authentication → Hooks → "Customize Access Token (JWT) Claims" for it to fire on auth events.
- **Tightened defaults:** `EXECUTE` on `public.rls_auto_enable()` revoked from `anon` / `authenticated` / `public` (delta from Supabase project default; silences advisor lint).

## App

- **Framework:** Next.js 16 (App Router, TypeScript, Turbopack).
- **Styling:** Tailwind CSS 4.
- **Linter:** ESLint 9 (`eslint-config-next`).
- **Package manager:** npm.
- **Node:** verified on Node 22 (Next 16 requires Node ≥ 18.18).
- **Entry points:** `app/layout.tsx` (`lang="en"` per V28 D.24), `app/page.tsx`, `app/scheduler/page.tsx` (Step 4.3 CT-scheduling paradigm prototype).
- **API routes:** `app/api/patients/route.ts` (GET list + POST), `app/api/patients/[id]/route.ts` (GET + PATCH + DELETE).
- **Server actions:** `app/scheduler/actions.ts` (`interpretUtterance`, `confirmContrastBooking`, `loadGridForCT1`).
- **Runtime deps:** `@supabase/supabase-js`, `@supabase/ssr`, `@anthropic-ai/sdk`, `zod`, `ulid`.
- **Test runner:** Vitest (dev dep), test scripts `npm run test` / `npm run test:watch`. Unit tests run unconditionally; integration tests under `tests/*.roundtrip.test.ts` + `tests/realtime.policy.test.ts` skip when `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` / `SUPABASE_SERVICE_ROLE_KEY` are absent (env-gated via `tests/setup.ts`).
- **Intent corpus harness:** `npm run eval:intents` (uses `tsx`) runs the English intent corpus against the live Claude API; exits non-zero on <90% pass-rate. Skips with a clean exit when `ANTHROPIC_API_KEY` is unset; `INTENT_EVAL_MOCK=1` runs structure-only.
- **Scripts:** `npm run dev | build | start | lint | test | test:watch | typecheck | eval:intents`.
- **CI:** `.github/workflows/ci.yml` runs build + lint + typecheck + test + eval:intents on PR; live-DB suites and intent eval activate when their respective repo secrets are set.

## Vercel

- **Project:** GitHub-linked to `mattiaranocchiari/airis`
- **Project name / production URL:** TBD (record after first deploy)
- **Plan:** free tier
- **Env vars to set (Vercel project Settings → Environment Variables):**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-side only; never `NEXT_PUBLIC_*`)
  - `ANTHROPIC_API_KEY` (server-side only; powers the L5 intent parse path)
  - `ANTHROPIC_BASE_URL` (optional override)
  - `ANTHROPIC_MODEL` (optional; defaults to `claude-opus-4-7` in source)
  - `ANTHROPIC_THINKING` (optional; `adaptive` | `disabled`; default `adaptive`)
  - `ANTHROPIC_EFFORT` (optional; `low` | `medium` | `high` | `xhigh` | `max`; default `low` for sub-1s SLO)

## LLM backend (Phase 0)

- **Current concrete backend:** Claude API direct (per V28 D.22). An instance of deployment Mode 2 (online API) under the engine-agnostic abstraction.
- **Abstraction layer:** engine-agnostic LLM substrate (per V28 D.21) — three deployment modes (client-local self-hosted, online API, AIRIS-hosted non-HQ). Abstraction built from Step 4.5; Step 4.3 paradigm prototype calls Claude API directly and moves behind the abstraction at Step 4.5 without semantics change. Earlier framings (Ollama VPS / Bedrock EU / Mistral La Plateforme EU) retired as platform commitments per the 2026-05-28 strategy session reframe; see Master Doc D.21 + D.22 supersession history.
- **Model + version:** record the active Claude model name + version in this manifest as deployments configure them. Phase 0 dev uses the model identifier set in `ANTHROPIC_API_KEY`'s associated workspace; no specific version pinned in this Master Doc.

## Secret names (values NOT in repo)

The following names are expected/used; values live in Vercel/Supabase env (production) and developers' local `.env.local` (gitignored). Never commit values.

- `ANTHROPIC_API_KEY` — server-side L5 intent parse + `eval:intents` corpus harness.
- `ANTHROPIC_BASE_URL` — optional override.
- `ANTHROPIC_MODEL` — optional; source default `claude-opus-4-7`.
- `ANTHROPIC_THINKING` — optional; `adaptive` | `disabled`.
- `ANTHROPIC_EFFORT` — optional; `low` | `medium` | `high` | `xhigh` | `max`.
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — modern publishable key (preferred over legacy anon).
- `SUPABASE_ANON_KEY` — legacy JWT-format anon key (kept for compatibility; not the default in the codebase).
- `SUPABASE_SERVICE_ROLE_KEY` — required for the Vitest live-DB suites (creates test auth users / asserts admin-side state). Never ship to the browser.
- `DEEPGRAM_API_KEY` — Phase D follow-up English streaming STT (deferred per `lib/voice/stt.ts`).
- `ASSEMBLYAI_API_KEY` — alternative to Deepgram; pick one.
- `ELEVENLABS_API_KEY` — Phase D follow-up English TTS WebSocket (deferred per `lib/voice/tts.ts`).

Extend this list as new secrets are provisioned. Never add values.
