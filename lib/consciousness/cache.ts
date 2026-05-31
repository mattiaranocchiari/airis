// Substrate L3 hot context cache per §17.4. The read/write contract is stable;
// the backend is selected by AIRIS_CACHE_BACKEND — `memory` (default; Phase 0
// in-process Map per tenant + scheduler-channel) or `upstash` (managed Redis EU,
// for the cross-process access Inngest workers + the Patient Flow Layer need).
// Step 4.5 Turn 2 sub-deliverable E (docs/Step_4.5_Turn2_plan.md).
//
// The contract is async so a network backend (Upstash REST) fits without
// changing call semantics; with the default memory backend the awaits resolve
// synchronously. The cached object is the source of truth for the conversation
// surface's current view; misses fall through to L1 (Postgres).

export type PendingDisambiguation = {
  // Booking inputs minus patient_id — the action is resumed once a patient
  // candidate is chosen.
  room_id: string;
  kind: string;
  subtype: string | null;
  with_contrast: boolean;
  slot_start_at: string;
  slot_end_at: string;
  notes: string | null;
  candidates: { id: string; label: string }[];
  patient_query: string;
};

export type ConsciousnessContext = {
  currentPatientId?: string;
  currentAppointmentId?: string;
  pendingDisambiguation?: PendingDisambiguation;
  recentActions: Array<{
    kind: "create" | "update" | "cancel";
    appointmentId: string;
    when: string;
    slotStartLocal: string;
  }>;
  conversationHistory: Array<{ role: "clinician" | "system"; text: string; at: string }>;
};

const emptyContext = (): ConsciousnessContext => ({
  recentActions: [],
  conversationHistory: [],
});

const key = (tenantId: string, channelId: string): string => `${tenantId}::${channelId}`;

// Backend contract: the high-level operations below own the merge/trim logic;
// a backend only persists + retrieves whole context objects per key. Keeps the
// trimming rules in one place rather than duplicated per backend.
export type CacheBackend = {
  get(key: string): Promise<ConsciousnessContext | undefined>;
  set(key: string, value: ConsciousnessContext): Promise<void>;
  delete(key: string): Promise<void>;
  clearAll(): Promise<void>;
};

function createMemoryBackend(): CacheBackend {
  const store = new Map<string, ConsciousnessContext>();
  return {
    async get(k) {
      return store.get(k);
    },
    async set(k, v) {
      store.set(k, v);
    },
    async delete(k) {
      store.delete(k);
    },
    async clearAll() {
      store.clear();
    },
  };
}

let backendPromise: Promise<CacheBackend> | null = null;

function backend(): Promise<CacheBackend> {
  if (!backendPromise) backendPromise = createBackend();
  return backendPromise;
}

async function createBackend(): Promise<CacheBackend> {
  const kind = (process.env.AIRIS_CACHE_BACKEND ?? "memory").toLowerCase();
  if (kind === "memory") return createMemoryBackend();
  if (kind === "upstash") {
    // Lazily imported so the default path never loads the Redis client.
    const { createUpstashBackend } = await import("./cache.upstash");
    return createUpstashBackend();
  }
  throw new Error(
    `unsupported AIRIS_CACHE_BACKEND='${kind}' (expected 'memory' | 'upstash')`,
  );
}

export async function readContext(
  tenantId: string,
  channelId: string,
): Promise<ConsciousnessContext> {
  const b = await backend();
  return (await b.get(key(tenantId, channelId))) ?? emptyContext();
}

export async function writeContext(
  tenantId: string,
  channelId: string,
  patch: Partial<ConsciousnessContext>,
): Promise<ConsciousnessContext> {
  const b = await backend();
  const k = key(tenantId, channelId);
  const prior = (await b.get(k)) ?? emptyContext();
  const next: ConsciousnessContext = {
    ...prior,
    ...patch,
    recentActions: patch.recentActions ?? prior.recentActions,
    conversationHistory: patch.conversationHistory ?? prior.conversationHistory,
  };
  await b.set(k, next);
  return next;
}

export async function recordAction(
  tenantId: string,
  channelId: string,
  action: ConsciousnessContext["recentActions"][number],
): Promise<ConsciousnessContext> {
  const b = await backend();
  const k = key(tenantId, channelId);
  const prior = (await b.get(k)) ?? emptyContext();
  const next: ConsciousnessContext = {
    ...prior,
    recentActions: [action, ...prior.recentActions].slice(0, 10),
    currentAppointmentId: action.appointmentId,
  };
  await b.set(k, next);
  return next;
}

export async function recordUtterance(
  tenantId: string,
  channelId: string,
  text: string,
  role: "clinician" | "system" = "clinician",
): Promise<ConsciousnessContext> {
  const b = await backend();
  const k = key(tenantId, channelId);
  const prior = (await b.get(k)) ?? emptyContext();
  const next: ConsciousnessContext = {
    ...prior,
    conversationHistory: [{ role, text, at: new Date().toISOString() }, ...prior.conversationHistory].slice(
      0,
      20,
    ),
  };
  await b.set(k, next);
  return next;
}

export async function setPendingDisambiguation(
  tenantId: string,
  channelId: string,
  pending: PendingDisambiguation,
): Promise<ConsciousnessContext> {
  return writeContext(tenantId, channelId, { pendingDisambiguation: pending });
}

export async function clearPendingDisambiguation(
  tenantId: string,
  channelId: string,
): Promise<ConsciousnessContext> {
  const b = await backend();
  const k = key(tenantId, channelId);
  const prior = (await b.get(k)) ?? emptyContext();
  const next: ConsciousnessContext = { ...prior };
  delete next.pendingDisambiguation;
  await b.set(k, next);
  return next;
}

export async function clearForTest(tenantId: string, channelId: string): Promise<void> {
  const b = await backend();
  await b.delete(key(tenantId, channelId));
}

export async function _clearAllForTest(): Promise<void> {
  const b = await backend();
  await b.clearAll();
}
