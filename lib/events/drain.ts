import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";
import type { CloudEvent } from "@/lib/cloudevents";

type DB = SupabaseClient<Database>;

// Outbox relay (§17.9 + D.16). Drains unprocessed event_queue rows: broadcasts
// each CloudEvent onto the durable per-tenant event bus, then stamps
// processed_at. The same-transaction outbox write (by the audited emitter)
// stays the durable source of truth; this is the at-least-once fan-out layer
// Inngest retries. Foundation for the Step 4.7 Event System.
//
// Pure over an injected db + broadcaster, so the loop / mark-processed /
// retry-on-failure behaviour unit-tests without a live Inngest or Supabase.

export type EventBroadcaster = (event: CloudEvent) => Promise<void>;

export type DrainResult = { processed: number; failed: number };

export async function drainEventQueue(
  db: DB,
  broadcast: EventBroadcaster,
  opts: { batchSize?: number } = {},
): Promise<DrainResult> {
  const batchSize = opts.batchSize ?? 100;
  const { data, error } = await db
    .from("event_queue")
    .select("id, cloudevent")
    .is("processed_at", null)
    .order("created_at", { ascending: true })
    .limit(batchSize);
  if (error) throw error;
  const rows = data ?? [];

  let processed = 0;
  let failed = 0;
  for (const row of rows) {
    try {
      await broadcast(row.cloudevent as unknown as CloudEvent);
      const { error: upErr } = await db
        .from("event_queue")
        .update({ processed_at: new Date().toISOString() })
        .eq("id", row.id);
      if (upErr) throw upErr;
      processed += 1;
    } catch {
      // Leave processed_at null so the next drain retries this row
      // (at-least-once; downstream consumers must tolerate redelivery).
      failed += 1;
    }
  }
  return { processed, failed };
}
