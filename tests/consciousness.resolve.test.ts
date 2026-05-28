import { beforeEach, describe, expect, it } from "vitest";
import { recordAction, _clearAllForTest } from "@/lib/consciousness/cache";
import { resolveReference } from "@/lib/consciousness/resolve";

// L3-only resolve path. We exercise the in-process cache hit (no DB needed).
// L1 fallback path is exercised by the live-DB appointment round-trip.

const tenantId = "00000000-0000-0000-0000-000000000001";
const channelId = "scheduler:CT1";

describe("consciousness.resolveReference (L3 path)", () => {
  beforeEach(() => {
    _clearAllForTest();
  });

  it("resolves 'the 9 a.m.' to the recent action whose slot starts at 09:00", async () => {
    recordAction(tenantId, channelId, {
      kind: "create",
      appointmentId: "apt-1",
      when: new Date().toISOString(),
      slotStartLocal: new Date(2026, 4, 29, 9, 0).toISOString(),
    });
    const result = await resolveReference(
      // db is unused on the L3 hit path
      null as never,
      {
        reference: "the 9 a.m.",
        tenantId,
        channelId,
        roomId: "CT1",
        dayStart: new Date(2026, 4, 29).toISOString(),
        dayEnd: new Date(2026, 4, 30).toISOString(),
      },
    );
    expect(result).toEqual({ kind: "resolved", appointmentId: "apt-1", via: "l3" });
  });

  it("resolves 'the 14' to a 2pm slot via 24-hour parsing", async () => {
    recordAction(tenantId, channelId, {
      kind: "create",
      appointmentId: "apt-2",
      when: new Date().toISOString(),
      slotStartLocal: new Date(2026, 4, 29, 14, 0).toISOString(),
    });
    const result = await resolveReference(null as never, {
      reference: "the 14",
      tenantId,
      channelId,
      roomId: "CT1",
      dayStart: new Date(2026, 4, 29).toISOString(),
      dayEnd: new Date(2026, 4, 30).toISOString(),
    });
    expect(result).toEqual({ kind: "resolved", appointmentId: "apt-2", via: "l3" });
  });
});
