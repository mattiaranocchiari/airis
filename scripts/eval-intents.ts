import { readFile } from "node:fs/promises";
import path from "node:path";
import { config } from "dotenv";
import { z } from "zod";
import { parseIntent } from "@/lib/intents/parse";
import { Intent } from "@/lib/intents/schema";
import { getLlmProvider } from "@/lib/llm";
import type { LlmProvider } from "@/lib/llm";

// Step 4.3 failure-mode trigger: intent-parse correctness ≥90% on the corpus.
// Run against the live Claude API: `npx tsx scripts/eval-intents.ts`.
// Exits 1 if pass-rate < 90% so CI / preview-deploy validation catches drift.
//
// CI mode: set INTENT_EVAL_MOCK=1 to run a structure-only smoke pass with a
// stub provider (verifies the harness wires up; doesn't measure real quality).

config({ path: path.resolve(process.cwd(), ".env.local") });

const CorpusEntry = z.object({
  id: z.string(),
  utterance: z.string(),
  expected: z.record(z.string(), z.unknown()),
});

type CorpusEntry = z.infer<typeof CorpusEntry>;

async function main(): Promise<void> {
  const corpusPath = path.resolve(process.cwd(), "lib/intents/corpus.json");
  const raw = await readFile(corpusPath, "utf8");
  const corpus = z.array(CorpusEntry).parse(JSON.parse(raw));

  const mock = process.env.INTENT_EVAL_MOCK === "1";
  if (!mock && !process.env.ANTHROPIC_API_KEY) {
    console.log(
      "skipped: ANTHROPIC_API_KEY not set (use INTENT_EVAL_MOCK=1 for a structure-only smoke run).",
    );
    process.exit(0);
  }
  const provider = mock ? mockProvider() : getLlmProvider();

  let pass = 0;
  let fail = 0;
  const failures: { id: string; reason: string }[] = [];
  const latencies: number[] = [];

  for (const entry of corpus) {
    try {
      const result = await parseIntent(
        {
          utterance: entry.utterance,
          context: { todayLocalDate: "2026-05-28", currentRoomId: "CT1" },
        },
        provider,
      );
      latencies.push(result.modelLatencyMs);
      const reason = compareIntent(result.intent, entry.expected);
      if (reason === null) {
        pass++;
        console.log(`PASS  ${entry.id}  (${result.modelLatencyMs} ms)`);
      } else {
        fail++;
        failures.push({ id: entry.id, reason });
        console.log(`FAIL  ${entry.id}  ${reason}`);
      }
    } catch (err) {
      fail++;
      const reason = err instanceof Error ? err.message : String(err);
      failures.push({ id: entry.id, reason });
      console.log(`ERROR ${entry.id}  ${reason}`);
    }
  }

  const total = pass + fail;
  const rate = total > 0 ? pass / total : 0;
  const p95Latency = latencies.length
    ? latencies.slice().sort((a, b) => a - b)[Math.floor(latencies.length * 0.95)] ?? 0
    : 0;
  console.log("");
  console.log(`pass-rate: ${(rate * 100).toFixed(1)}%  (${pass}/${total})`);
  console.log(`p95 model latency: ${p95Latency} ms`);
  if (failures.length > 0) {
    console.log("");
    console.log("failures:");
    for (const f of failures) console.log(`  ${f.id}: ${f.reason}`);
  }

  if (mock) {
    console.log("mock mode: pass-rate gate skipped (harness wiring verified).");
    return;
  }
  if (rate < 0.9) {
    console.error(
      "FAILURE-MODE TRIGGER: intent-parse correctness < 90% — surface a Master Doc revision per Step 4.3 plan.",
    );
    process.exit(1);
  }
}

function compareIntent(actual: Intent, expected: Record<string, unknown>): string | null {
  if (actual.intent !== expected.intent) {
    return `intent ${actual.intent} ≠ ${String(expected.intent)}`;
  }
  // Spot-check the structural fields that the corpus declares; ignore fields
  // that the corpus doesn't pin (e.g. slot_start_local for book — exact time
  // depends on today's date and the model's parse).
  for (const [k, v] of Object.entries(expected)) {
    if (k === "intent") continue;
    const a = (actual as unknown as Record<string, unknown>)[k];
    if (a !== v) {
      return `${k}: ${JSON.stringify(a)} ≠ ${JSON.stringify(v)}`;
    }
  }
  return null;
}

function mockProvider(): LlmProvider {
  // Stub that always returns view_schedule — verifies the harness wires up.
  return {
    parseStructured: async <T>() => ({
      parsed: { intent: "view_schedule", room_id: "CT1", when: "today" } as unknown as T,
      usage: { inputTokens: 0, outputTokens: 0, cacheCreationInputTokens: 0, cacheReadInputTokens: 0 },
      modelLatencyMs: 0,
    }),
  };
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
