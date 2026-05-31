import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

// Service-role Supabase client for server-side jobs that run with NO user
// session (Inngest functions, cron drains). It bypasses RLS, so it must NEVER
// be imported from client components or user-facing request paths — only from
// trusted server-side job code. Reads SUPABASE_SERVICE_ROLE_KEY (server-only).

export function createSupabaseAdminClient(): SupabaseClient<Database> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "service-role client requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY",
    );
  }
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
