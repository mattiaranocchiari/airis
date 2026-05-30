// Engine-agnostic LLM substrate interface per V28 D.21 + §17.5. Step 4.5
// lift of the Phase 0 call site: the AIRIS-internal LLM-call interface
// committed to by D.21 lives here as a TypeScript contract. Concrete
// implementations live alongside (`anthropic.ts` is the current concrete
// backend per D.22; Mode 1 client-local self-hosted and Mode 3 AIRIS-hosted
// non-HQ providers land when their respective deployment-time call sites
// surface). Consumers acquire the active provider via `getLlmProvider()` in
// `index.ts`; they NEVER import the concrete backend directly — that's the
// invariant the abstraction enforces.

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

// The minimal Phase 0/Phase A surface: structured-outputs intent + entity
// extraction. Phase A subsystems that need streaming chat, tool use, or
// async agentic loops extend this interface with additional methods —
// concrete providers implement what they support; consumers can typecheck
// for the methods they need.
export type LlmProvider = {
  parseStructured: <T>(opts: ParseStructuredOptions) => Promise<ParseStructuredResult<T>>;
};

// Three deployment modes per D.21. Source-level enum is documentary; runtime
// selection happens via the AIRIS_LLM_BACKEND env var which names a concrete
// provider (anthropic, ollama, airis-hosted, …) within a mode.
export type DeploymentMode =
  | "client-local-self-hosted" // Mode 1
  | "online-api" // Mode 2 — current default per D.22
  | "airis-hosted-non-hq"; // Mode 3
