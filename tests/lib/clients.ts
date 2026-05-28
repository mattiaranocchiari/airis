import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`missing env var ${name}`);
  return v;
}

export function adminClient(): SupabaseClient<Database> {
  // Service-role client. Bypasses RLS. Used only for test setup/teardown and
  // for asserting state from outside any tenant scope.
  return createClient<Database>(env("NEXT_PUBLIC_SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function userClient(accessToken: string): SupabaseClient<Database> {
  // User-scoped client. Carries the auth bearer; RLS engaged against the JWT.
  return createClient<Database>(
    env("NEXT_PUBLIC_SUPABASE_URL"),
    env("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
    {
      auth: { autoRefreshToken: false, persistSession: false },
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
    },
  );
}
