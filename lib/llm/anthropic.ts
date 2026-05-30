import Anthropic from "@anthropic-ai/sdk";
import type {
  LlmProvider,
  ParseStructuredOptions,
  ParseStructuredResult,
} from "@/lib/llm/types";

// Anthropic concrete implementation of the engine-agnostic LLM substrate
// (V28 D.21 + §17.5). This is the current concrete backend per V28 D.22 —
// Claude API direct, an instance of deployment Mode 2 (online API).
//
// Application code does NOT import this file directly. It goes through
// `getLlmProvider()` in `@/lib/llm` which resolves the active backend
// from `AIRIS_LLM_BACKEND` at deployment time. This file is one
// concrete implementation among potentially many (Mode 1 client-local
// self-hosted; Mode 3 AIRIS-hosted non-HQ); the abstraction promise is
// that swapping backends is configuration, not rewrite.
//
// Model + thinking + effort are env-configurable so deployments pick the
// cost / latency / quality point. Source defaults pick the most capable
// model; per-deployment overrides shape the SLO. Source never pins
// specific marketing names in commit messages or PR titles per the AIRIS
// operating manual.
//
// Tests can construct providers directly via `createAnthropicProvider()`
// for unit-test scenarios where an injectable provider is preferable to
// the env-driven lookup.

function clientFromEnv(): Anthropic {
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    baseURL: process.env.ANTHROPIC_BASE_URL,
  });
}

function modelFromEnv(): string {
  return process.env.ANTHROPIC_MODEL ?? "claude-opus-4-7";
}

function thinkingFromEnv(): "adaptive" | "disabled" {
  const v = (process.env.ANTHROPIC_THINKING ?? "adaptive").toLowerCase();
  return v === "disabled" ? "disabled" : "adaptive";
}

function effortFromEnv(): "low" | "medium" | "high" | "max" | "xhigh" {
  const v = (process.env.ANTHROPIC_EFFORT ?? "low").toLowerCase();
  if (v === "medium" || v === "high" || v === "max" || v === "xhigh" || v === "low") return v;
  return "low";
}

export function createAnthropicProvider(): LlmProvider {
  const client = clientFromEnv();
  const model = modelFromEnv();
  const thinking = thinkingFromEnv();
  const effort = effortFromEnv();

  return {
    async parseStructured<T>(opts: ParseStructuredOptions): Promise<ParseStructuredResult<T>> {
      const t0 = Date.now();
      const response = await client.messages.create({
        model,
        max_tokens: 4096,
        system: [
          {
            type: "text",
            text: opts.systemPrompt,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages: [{ role: "user", content: opts.userMessage }],
        output_config: {
          format: { type: "json_schema", schema: opts.schema },
          effort,
        },
        ...(thinking === "adaptive" ? { thinking: { type: "adaptive" as const } } : {}),
      });

      const textBlock = response.content.find((b) => b.type === "text");
      if (!textBlock || textBlock.type !== "text") {
        throw new Error("anthropic response contained no text block");
      }
      const parsed = JSON.parse(textBlock.text) as T;

      return {
        parsed,
        usage: {
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens,
          cacheCreationInputTokens: response.usage.cache_creation_input_tokens ?? 0,
          cacheReadInputTokens: response.usage.cache_read_input_tokens ?? 0,
        },
        modelLatencyMs: Date.now() - t0,
      };
    },
  };
}

// Re-export the types from the abstraction contract so existing callers that
// imported these from `@/lib/llm/anthropic` keep working during the lift.
// New code should import directly from `@/lib/llm` instead.
export type { LlmProvider, ParseStructuredOptions, ParseStructuredResult, LlmUsage } from "@/lib/llm/types";
