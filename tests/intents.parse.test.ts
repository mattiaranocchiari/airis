import { describe, expect, it } from "vitest";
import { parseIntent } from "@/lib/intents/parse";
import type { LlmProvider, ParseStructuredResult } from "@/lib/llm/anthropic";

// Unit tests for the L5 intent parse path. Use a mock LLM provider so this
// runs in CI without an Anthropic key. The corpus harness in
// scripts/eval-intents.ts is what exercises the live Claude API path —
// that's the failure-mode trigger (≥90% pass rate on the corpus).

function mockProviderReturning<T>(value: T): LlmProvider {
  return {
    parseStructured: async <U>(): Promise<ParseStructuredResult<U>> => ({
      parsed: value as unknown as U,
      usage: {
        inputTokens: 0,
        outputTokens: 0,
        cacheCreationInputTokens: 0,
        cacheReadInputTokens: 0,
      },
      modelLatencyMs: 1,
    }),
  };
}

describe("intent parser (mock provider)", () => {
  it("parses view_schedule shape through Zod", async () => {
    const result = await parseIntent(
      { utterance: "show today", context: { todayLocalDate: "2026-05-28", currentRoomId: "CT1" } },
      mockProviderReturning({ intent: "view_schedule", room_id: "CT1", when: "today" }),
    );
    expect(result.intent).toEqual({ intent: "view_schedule", room_id: "CT1", when: "today" });
  });

  it("parses book_appointment shape", async () => {
    const result = await parseIntent(
      {
        utterance: "book a CT abdomen for Marco Rossi tomorrow at 9",
        context: { todayLocalDate: "2026-05-28", currentRoomId: "CT1" },
      },
      mockProviderReturning({
        intent: "book_appointment",
        room_id: "CT1",
        patient_query: "Marco Rossi",
        kind: "CT",
        subtype: "abdomen",
        with_contrast: false,
        slot_start_local: "2026-05-29T09:00",
        duration_minutes: 30,
      }),
    );
    if (result.intent.intent !== "book_appointment") throw new Error("wrong shape");
    expect(result.intent.patient_query).toBe("Marco Rossi");
    expect(result.intent.with_contrast).toBe(false);
  });

  it("parses move_appointment with anaphoric reference", async () => {
    const result = await parseIntent(
      { utterance: "move the 9 a.m. to 11", context: { todayLocalDate: "2026-05-28" } },
      mockProviderReturning({
        intent: "move_appointment",
        reference: "the 9 a.m.",
        new_slot_start_local: "2026-05-29T11:00",
      }),
    );
    if (result.intent.intent !== "move_appointment") throw new Error("wrong shape");
    expect(result.intent.reference).toBe("the 9 a.m.");
  });

  it("rejects payloads that fail Zod discriminated-union", async () => {
    await expect(
      parseIntent(
        { utterance: "garbage", context: { todayLocalDate: "2026-05-28" } },
        mockProviderReturning({ intent: "not_an_intent" }),
      ),
    ).rejects.toThrow();
  });
});
