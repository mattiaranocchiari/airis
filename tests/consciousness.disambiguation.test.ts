import { beforeEach, describe, expect, it } from "vitest";
import {
  clearPendingDisambiguation,
  readContext,
  setPendingDisambiguation,
  _clearAllForTest,
} from "@/lib/consciousness/cache";

const tenantId = "00000000-0000-0000-0000-000000000001";
const channelId = "scheduler:CT1";

describe("L3 pendingDisambiguation (substrate write contract)", () => {
  beforeEach(() => {
    _clearAllForTest();
  });

  it("set + read round-trips the pending booking inputs and candidates", () => {
    setPendingDisambiguation(tenantId, channelId, {
      room_id: "CT1",
      kind: "CT",
      subtype: "abdomen",
      with_contrast: false,
      slot_start_at: "2026-05-29T09:00:00.000Z",
      slot_end_at: "2026-05-29T09:30:00.000Z",
      notes: null,
      candidates: [
        { id: "p1", label: "Marco Rossi" },
        { id: "p2", label: "Anna Rossi" },
      ],
      patient_query: "Rossi",
    });
    const ctx = readContext(tenantId, channelId);
    expect(ctx.pendingDisambiguation?.candidates).toHaveLength(2);
    expect(ctx.pendingDisambiguation?.candidates[0]?.label).toBe("Marco Rossi");
    expect(ctx.pendingDisambiguation?.patient_query).toBe("Rossi");
  });

  it("clear drops the pending field but keeps other context", () => {
    setPendingDisambiguation(tenantId, channelId, {
      room_id: "CT1",
      kind: "CT",
      subtype: null,
      with_contrast: false,
      slot_start_at: "2026-05-29T09:00:00.000Z",
      slot_end_at: "2026-05-29T09:30:00.000Z",
      notes: null,
      candidates: [{ id: "p1", label: "Marco Rossi" }],
      patient_query: "Rossi",
    });
    clearPendingDisambiguation(tenantId, channelId);
    const ctx = readContext(tenantId, channelId);
    expect(ctx.pendingDisambiguation).toBeUndefined();
  });
});
