import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getLlmProvider } from "@/lib/llm";

// Engine-agnostic LLM substrate lookup per V28 D.21 + §17.5. Verifies the
// abstraction layer's contract: default backend selection, env override,
// unknown-backend rejection. Concrete Anthropic-backed call behaviour is
// covered by the live `npm run eval:intents` corpus harness, not unit
// tests — the abstraction is the only piece we lift in Step 4.5.

describe("LLM provider abstraction (getLlmProvider)", () => {
  const ENV_KEYS = ["AIRIS_LLM_BACKEND", "ANTHROPIC_API_KEY"];
  const snapshot: Record<string, string | undefined> = {};

  beforeEach(() => {
    for (const k of ENV_KEYS) snapshot[k] = process.env[k];
    // The Anthropic SDK validates env lazily; setting a stub key keeps
    // construction non-throwing in CI without secrets.
    process.env.ANTHROPIC_API_KEY = "sk-stub-for-test";
  });

  afterEach(() => {
    for (const k of ENV_KEYS) {
      if (snapshot[k] === undefined) delete process.env[k];
      else process.env[k] = snapshot[k]!;
    }
  });

  it("defaults to anthropic when AIRIS_LLM_BACKEND is unset", () => {
    delete process.env.AIRIS_LLM_BACKEND;
    const provider = getLlmProvider();
    expect(typeof provider.parseStructured).toBe("function");
  });

  it("returns an anthropic provider when AIRIS_LLM_BACKEND=anthropic", () => {
    process.env.AIRIS_LLM_BACKEND = "anthropic";
    const provider = getLlmProvider();
    expect(typeof provider.parseStructured).toBe("function");
  });

  it("accepts mixed case (case-insensitive backend name)", () => {
    process.env.AIRIS_LLM_BACKEND = "Anthropic";
    const provider = getLlmProvider();
    expect(typeof provider.parseStructured).toBe("function");
  });

  it("throws a clear error for an unsupported backend", () => {
    process.env.AIRIS_LLM_BACKEND = "made-up";
    expect(() => getLlmProvider()).toThrow(/unsupported AIRIS_LLM_BACKEND/);
  });
});
