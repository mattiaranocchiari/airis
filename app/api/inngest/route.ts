import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { functions } from "@/lib/inngest/functions";

// Inngest serve endpoint (D.16 + §17.3). Inngest Cloud calls this route to
// register + invoke functions; without INNGEST_SIGNING_KEY it stays dormant
// (no registration). Node runtime: the drain function uses the service-role
// Supabase admin client.
export const runtime = "nodejs";

export const { GET, POST, PUT } = serve({ client: inngest, functions });
