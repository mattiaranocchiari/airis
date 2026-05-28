import { config } from "dotenv";
import path from "node:path";

// Tests load env from .env.test first (test-only overrides), then .env.local
// (developer's working creds). Both gitignored. See infra/manifest.md for the
// required secret names.
config({ path: path.resolve(process.cwd(), ".env.test") });
config({ path: path.resolve(process.cwd(), ".env.local") });

// Live-DB tests skip when env is absent (CI without secrets); they throw if
// only partially populated, since silently passing a half-configured suite
// hides regressions. See tests/lib/clients.ts and the `describeIfLiveDb`
// helpers in each integration test file.

const LIVE_DB_REQUIRED = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
];

const present = LIVE_DB_REQUIRED.filter((k) => process.env[k]);
if (present.length > 0 && present.length < LIVE_DB_REQUIRED.length) {
  const missing = LIVE_DB_REQUIRED.filter((k) => !process.env[k]);
  throw new Error(
    `partial Supabase env — set all of ${LIVE_DB_REQUIRED.join(", ")} or none. missing: ${missing.join(", ")}`,
  );
}

export const hasLiveDbEnv = present.length === LIVE_DB_REQUIRED.length;
export const hasAnthropicKey = Boolean(process.env.ANTHROPIC_API_KEY);
