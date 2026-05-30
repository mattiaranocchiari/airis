import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/types";

// Browser Supabase client — for client components that need an authenticated
// connection (Realtime Broadcast subscribes on private channels). Reads the
// publishable key from NEXT_PUBLIC env so this code lifts cleanly into the
// browser bundle.
export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
