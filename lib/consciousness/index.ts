// Substrate contracts per §17.4. First sketch — Step 4.3 paradigm prototype.
// Implementations are Phase 0 (L1 Postgres + L3 in-process Map + L5 Claude API).
// Step 4.5 lifts everything behind the engine-agnostic abstraction per V28 D.21.

export {
  readContext,
  writeContext,
  recordAction,
  recordUtterance,
  setPendingDisambiguation,
  clearPendingDisambiguation,
  clearForTest,
  _clearAllForTest,
  type ConsciousnessContext,
  type PendingDisambiguation,
} from "@/lib/consciousness/cache";

export { resolveReference, type ResolveReferenceResult } from "@/lib/consciousness/resolve";

export function channelTopicFor(tenantId: string, scope: string): string {
  return `tenant:${tenantId}:${scope}`;
}
