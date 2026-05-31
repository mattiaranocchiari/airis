import { describe, expect, it } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { drainEventQueue, type EventBroadcaster } from "@/lib/events/drain";
import type { Database } from "@/lib/supabase/types";
import type { CloudEvent } from "@/lib/cloudevents";

// Validates the outbox-drain loop against a fake Supabase query chain + a fake
// broadcaster: every unprocessed event is broadcast and marked processed; a
// failed broadcast leaves its row unprocessed for the next drain (at-least-once).

function fakeDb(rows: { id: string; cloudevent: unknown }[]) {
  const updatedIds: string[] = [];
  const builder = {
    select: () => builder,
    is: () => builder,
    order: () => builder,
    limit: () => Promise.resolve({ data: rows, error: null }),
    update: () => ({
      eq: (_col: string, id: string) => {
        updatedIds.push(id);
        return Promise.resolve({ error: null });
      },
    }),
  };
  const client = { from: () => builder };
  return { db: client as unknown as SupabaseClient<Database>, updatedIds };
}

function ev(id: string, tenantId = "t1"): { id: string; cloudevent: CloudEvent } {
  return {
    id,
    cloudevent: {
      specversion: "1.0",
      id,
      source: "airis://core/scheduler",
      type: "core.appointment.created.v1",
      time: "2026-05-29T09:00:00.000Z",
      subject: "apt",
      datacontenttype: "application/json",
      dataschema: "airis://events/core/appointment/created/v1",
      data: {} as never,
      tenantid: tenantId,
      actor: { type: "system", id: "sys" },
    } as CloudEvent,
  };
}

describe("drainEventQueue", () => {
  it("broadcasts each unprocessed event and marks it processed", async () => {
    const { db, updatedIds } = fakeDb([ev("ev-1"), ev("ev-2")]);
    const seen: string[] = [];
    const broadcast: EventBroadcaster = async (e) => {
      seen.push(e.id);
    };
    const result = await drainEventQueue(db, broadcast);
    expect(result).toEqual({ processed: 2, failed: 0 });
    expect(seen).toEqual(["ev-1", "ev-2"]);
    expect(updatedIds).toEqual(["ev-1", "ev-2"]);
  });

  it("leaves a row unprocessed when its broadcast fails", async () => {
    const { db, updatedIds } = fakeDb([ev("ev-1"), ev("ev-2")]);
    const broadcast: EventBroadcaster = async (e) => {
      if (e.id === "ev-2") throw new Error("broadcast boom");
    };
    const result = await drainEventQueue(db, broadcast);
    expect(result).toEqual({ processed: 1, failed: 1 });
    expect(updatedIds).toEqual(["ev-1"]); // ev-2 stays unprocessed for retry
  });

  it("no-ops cleanly on an empty queue", async () => {
    const { db } = fakeDb([]);
    const result = await drainEventQueue(db, async () => {});
    expect(result).toEqual({ processed: 0, failed: 0 });
  });
});
