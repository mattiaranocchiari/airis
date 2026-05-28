import Anthropic from "@anthropic-ai/sdk";

// Substrate L5 call site per AIRIS_Master_Document §17.5 + V28 D.22.
// Current concrete backend: Claude API direct (an instance of deployment Mode 2).
// At Step 4.5 the call site moves behind the engine-agnostic abstraction (D.21)
// without semantics change — the interface here (parseStructured) is the contract
// that survives.
//
// Model + thinking + effort are all env-configurable so the deployment chooses
// the cost / latency / quality point. Source defaults pick the most capable model;
// per-deployment overrides shape the SLO. Source never pins specific marketing
// names in commit messages or PR titles per the AIRIS operating manual.

export type LlmUsage = {
  inputTokens: number;
  outputTokens: number;
  cacheCreationInputTokens: number;
  cacheReadInputTokens: number;
};

export type ParseStructuredOptions = {
  systemPrompt: string;
  userMessage: string;
  schema: Record<string, unknown>;
};

export type ParseStructuredResult<T> = {
  parsed: T;
  usage: LlmUsage;
  modelLatencyMs: number;
};

export type LlmProvider = {
  parseStructured: <T>(opts: ParseStructuredOptions) => Promise<ParseStructuredResult<T>>;
};

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
