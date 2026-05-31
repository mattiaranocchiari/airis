import { Inngest } from "inngest";

// Inngest durable-execution client (D.16 + §17.3). `id` namespaces the app.
// Event/signing keys come from INNGEST_EVENT_KEY / INNGEST_SIGNING_KEY at
// send/serve time; without them the functions are defined but dormant — Inngest
// Cloud never registers or triggers them, so Phase 0 behaviour is preserved
// (the event_queue outbox is still written by the audited emitter; nothing
// external drains it until Inngest is connected). Step 4.5 Turn 2 D.
export const inngest = new Inngest({ id: "airis" });
