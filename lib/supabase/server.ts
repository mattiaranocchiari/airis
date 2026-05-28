import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/supabase/types";

export type AirisSupabaseClient = Awaited<ReturnType<typeof createSupabaseServerClient>>;

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const key = requireEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

  return createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // setAll may be called from a server component where cookie writes
          // are no-ops — safe to ignore; the auth refresh still propagates.
        }
      },
    },
  });
}

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`missing env var ${name}`);
  return v;
}
