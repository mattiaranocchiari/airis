import { Intent, intentJsonSchema } from "@/lib/intents/schema";
import type { LlmProvider } from "@/lib/llm/anthropic";

// L5 intent-parse pipeline. Takes a clinician utterance + optional context
// (current_patient / current_appointment / recent_actions) and returns a
// validated Intent. Provider is injectable for tests; production wires
// createAnthropicProvider() from @/lib/llm/anthropic.

const SYSTEM_PROMPT = `You are AIRIS, an Italian hospital information system operating in English platform default per V28 D.24.

You parse a single clinician utterance into one of five structured intents for the CT scheduler:

1. view_schedule — "Show me tomorrow's schedule for CT1."
2. book_appointment — "Book a CT abdomen for Marco Rossi tomorrow at 9."
3. move_appointment — "Move the 9 a.m. to 11."
4. cancel_appointment — "Cancel the 9 a.m." / "Cancel that."
5. disambiguate_patient — "Marco." (in response to a "Which Rossi? 1) Marco 2) Anna" materialised brief)

Conventions:
- room_id is "CT1" Phase 0 unless the utterance names another room explicitly.
- kind is the modality (e.g. "CT"); subtype is the anatomy or null.
- with_contrast is true when the utterance includes "with contrast" / "w/ contrast" / "IV contrast"; false otherwise.
- slot_start_local: ISO-8601 local-time string ("2026-05-29T09:00") inferred from the clinician's reference and today's date in the user message context.
- duration_minutes: default 30 unless the utterance specifies otherwise.
- patient_query: the patient text as the clinician said it — do NOT resolve to a patient_id at this stage. The L3 + L1 layers handle resolution downstream.
- reference: an anaphoric or temporal reference like "the 9 a.m." / "that" / "it" — do not attempt to resolve to an id; pass through as text.
- selection: a short disambiguation reply like "Marco" or "the second one".

Return strictly one intent per call. If the utterance is ambiguous between two intents, prefer the higher-tier one (book over view, cancel over move).
`;

export type ParseContext = {
  todayLocalDate: string;
  currentRoomId?: string;
};

export type ParseIntentInput = {
  utterance: string;
  context: ParseContext;
};

export type ParseIntentOutput = {
  intent: Intent;
  modelLatencyMs: number;
  promptTokens: number;
  cacheReadTokens: number;
};

export async function parseIntent(
  input: ParseIntentInput,
  provider: LlmProvider,
): Promise<ParseIntentOutput> {
  const userMessage = [
    `Today (local): ${input.context.todayLocalDate}`,
    input.context.currentRoomId ? `Current room: ${input.context.currentRoomId}` : null,
    "",
    `Utterance: ${input.utterance}`,
  ]
    .filter(Boolean)
    .join("\n");

  const result = await provider.parseStructured<Record<string, unknown>>({
    systemPrompt: SYSTEM_PROMPT,
    userMessage,
    schema: intentJsonSchema as Record<string, unknown>,
  });

  const intent = Intent.parse(result.parsed);
  return {
    intent,
    modelLatencyMs: result.modelLatencyMs,
    promptTokens: result.usage.inputTokens,
    cacheReadTokens: result.usage.cacheReadInputTokens,
  };
}
