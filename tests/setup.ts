import { config } from "dotenv";
import path from "node:path";

// Tests load env from .env.test first (test-only overrides), then .env.local
// (developer's working creds). Both gitignored. See infra/manifest.md for the
// required secret names.
config({ path: path.resolve(process.cwd(), ".env.test") });
config({ path: path.resolve(process.cwd(), ".env.local") });

const REQUIRED = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
];

for (const k of REQUIRED) {
  if (!process.env[k]) {
    throw new Error(
      `missing env var ${k} — populate .env.local from the Supabase project dashboard (see infra/manifest.md)`,
    );
  }
}
