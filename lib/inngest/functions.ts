import { inngest } from "./client";
import { drainEventQueue, type EventBroadcaster } from "@/lib/events/drain";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { CloudEvent } from "@/lib/cloudevents";

// First durable function — foundation for the Step 4.7 Event System. Drains the
// event_queue outbox on a schedule and relays each CloudEvent onto the durable
// per-tenant event bus (distinct from the scheduler's direct L2 broadcast, so
// it doesn't double-fire the scheduler UI). Dormant until Inngest Cloud is
// connected (no signing key → never registered/triggered).

const eventsTopic = (tenantId: string) => `tenant:${tenantId}:events`;

export const drainOutbox = inngest.createFunction(
  {
    id: "drain-event-queue",
    name: "Drain event_queue outbox",
    triggers: [{ cron: "*/1 * * * *" }],
  },
  async ({ step }) => {
    return step.run("drain", async () => {
      const db = createSupabaseAdminClient();
      const broadcast: EventBroadcaster = async (event: CloudEvent) => {
        const channel = db.channel(eventsTopic(event.tenantid), { config: { private: true } });
        await channel.send({ type: "broadcast", event: "airis.event", payload: event });
        await db.removeChannel(channel);
      };
      return drainEventQueue(db, broadcast);
    });
  },
);

export const functions = [drainOutbox];
