// Substrate L3 hot context cache per §17.4. Phase 0 form: in-process Node Map
// per tenant + scheduler-channel. Step 4.5 swaps the implementation to Upstash
// Redis without changing the read/write API. The cached object travels with the
// L2 broadcast as the source of truth for the conversation surface's current
// view; misses fall through to L1 (Postgres).

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

type Key = `${string}::${string}`;

const store = new Map<Key, ConsciousnessContext>();

const key = (tenantId: string, channelId: string): Key => `${tenantId}::${channelId}`;

export function readContext(tenantId: string, channelId: string): ConsciousnessContext {
  return store.get(key(tenantId, channelId)) ?? emptyContext();
}

export function writeContext(
  tenantId: string,
  channelId: string,
  patch: Partial<ConsciousnessContext>,
): ConsciousnessContext {
  const prior = store.get(key(tenantId, channelId)) ?? emptyContext();
  const next: ConsciousnessContext = {
    ...prior,
    ...patch,
    recentActions: patch.recentActions ?? prior.recentActions,
    conversationHistory: patch.conversationHistory ?? prior.conversationHistory,
  };
  store.set(key(tenantId, channelId), next);
  return next;
}

export function recordAction(
  tenantId: string,
  channelId: string,
  action: ConsciousnessContext["recentActions"][number],
): ConsciousnessContext {
  const prior = store.get(key(tenantId, channelId)) ?? emptyContext();
  const trimmed = [action, ...prior.recentActions].slice(0, 10);
  return writeContext(tenantId, channelId, {
    recentActions: trimmed,
    currentAppointmentId: action.appointmentId,
  });
}

export function recordUtterance(
  tenantId: string,
  channelId: string,
  text: string,
  role: "clinician" | "system" = "clinician",
): ConsciousnessContext {
  const prior = store.get(key(tenantId, channelId)) ?? emptyContext();
  const trimmed = [{ role, text, at: new Date().toISOString() }, ...prior.conversationHistory].slice(
    0,
    20,
  );
  return writeContext(tenantId, channelId, { conversationHistory: trimmed });
}

export function setPendingDisambiguation(
  tenantId: string,
  channelId: string,
  pending: PendingDisambiguation,
): ConsciousnessContext {
  return writeContext(tenantId, channelId, { pendingDisambiguation: pending });
}

export function clearPendingDisambiguation(
  tenantId: string,
  channelId: string,
): ConsciousnessContext {
  const prior = store.get(key(tenantId, channelId)) ?? emptyContext();
  const next: ConsciousnessContext = { ...prior };
  delete next.pendingDisambiguation;
  store.set(key(tenantId, channelId), next);
  return next;
}

export function clearForTest(tenantId: string, channelId: string): void {
  store.delete(key(tenantId, channelId));
}

export function _clearAllForTest(): void {
  store.clear();
}
