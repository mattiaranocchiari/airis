import { createAnthropicProvider } from "@/lib/llm/anthropic";
import type { LlmProvider } from "@/lib/llm/types";

// Engine-agnostic LLM provider lookup per V28 D.21 + §17.5. The active
// concrete backend is selected at deployment time via `AIRIS_LLM_BACKEND`
// (defaults to `anthropic` per D.22 — Claude API direct, Mode 2). Adding a
// new backend means:
//   1. Implement `LlmProvider` from `@/lib/llm/types` in a new file under
//      `lib/llm/` (e.g. `lib/llm/ollama.ts` for a Mode 1 client-local
//      provider).
//   2. Add the backend name to the switch below.
//   3. Document the new env-var contract in `infra/manifest.md`.
// Application code (intent parse, agent loops, future Phase A surfaces)
// imports `getLlmProvider()` from here and never touches the concrete
// implementations — that's the invariant the abstraction enforces.

export type LlmBackend = "anthropic";

const DEFAULT_BACKEND: LlmBackend = "anthropic";

function backendFromEnv(): LlmBackend {
  const v = (process.env.AIRIS_LLM_BACKEND ?? DEFAULT_BACKEND).toLowerCase();
  if (v === "anthropic") return "anthropic";
  throw new Error(
    `unsupported AIRIS_LLM_BACKEND='${v}' — supported: anthropic (more arrive as Phase A subsystems add provider implementations under lib/llm/).`,
  );
}

export function getLlmProvider(): LlmProvider {
  const backend = backendFromEnv();
  switch (backend) {
    case "anthropic":
      return createAnthropicProvider();
  }
}

export type { LlmProvider, ParseStructuredOptions, ParseStructuredResult, LlmUsage, DeploymentMode } from "@/lib/llm/types";
