import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";
import { readContext } from "@/lib/consciousness/cache";
import { listAppointments } from "@/lib/db/appointments";

type DB = SupabaseClient<Database>;

// Substrate contract: consciousness.resolve(reference, context) -> appointment_id.
// First pass via L3 — anaphoric references like "the 9 a.m." map to a recent
// action whose slot_start matches the time mentioned. Fallback to L1 — a
// directed query against today's grid. L5 disambiguation (asking Claude to
// reconcile complex anaphora) is reserved for Step 4.5 when the engine-agnostic
// abstraction lands; Phase 0 keeps the contract tight + grammatical.

const HOUR_PATTERN = /\b(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)?/i;

export type ResolveReferenceInput = {
  reference: string;
  tenantId: string;
  channelId: string;
  roomId: string;
  // Local timezone window for the L1 fallback.
  dayStart: string;
  dayEnd: string;
};

export type ResolveReferenceResult =
  | { kind: "resolved"; appointmentId: string; via: "l3" | "l1" }
  | { kind: "ambiguous"; candidates: string[] }
  | { kind: "not_found" };

export async function resolveReference(
  db: DB,
  input: ResolveReferenceInput,
): Promise<ResolveReferenceResult> {
  const hour = parseHour(input.reference);

  // L3 first — recent action whose slot matches the hour
  if (hour !== null) {
    const ctx = await readContext(input.tenantId, input.channelId);
    const match = ctx.recentActions.find((a) => slotHour(a.slotStartLocal) === hour);
    if (match) {
      return { kind: "resolved", appointmentId: match.appointmentId, via: "l3" };
    }
  }

  // L1 fallback — directed grid query.
  const rows = await listAppointments(db, {
    roomId: input.roomId,
    range: { from: input.dayStart, to: input.dayEnd },
  });

  if (rows.length === 0) {
    return { kind: "not_found" };
  }

  // Pure-temporal reference: "the 9", "the 9 a.m."
  if (hour !== null) {
    const candidates = rows.filter((r) => slotHour(r.slot_start_at) === hour);
    if (candidates.length === 1) {
      return { kind: "resolved", appointmentId: candidates[0]!.id, via: "l1" };
    }
    if (candidates.length > 1) {
      return { kind: "ambiguous", candidates: candidates.map((r) => r.id) };
    }
  }

  // "that" / "it" / "the [name] appointment" — fall back to the most-recent action.
  const ctx = await readContext(input.tenantId, input.channelId);
  if (ctx.currentAppointmentId) {
    return { kind: "resolved", appointmentId: ctx.currentAppointmentId, via: "l3" };
  }

  return { kind: "not_found" };
}

function parseHour(reference: string): number | null {
  const m = reference.match(HOUR_PATTERN);
  if (!m) return null;
  const baseHour = Number.parseInt(m[1]!, 10);
  if (Number.isNaN(baseHour)) return null;
  const meridian = m[3]?.toLowerCase().replace(/\./g, "");
  if (meridian === "pm" && baseHour < 12) return baseHour + 12;
  if (meridian === "am" && baseHour === 12) return 0;
  return baseHour;
}

function slotHour(slotIso: string): number {
  // UTC to match the rest of the scheduler's hour handling (slots stored +
  // rendered in UTC Phase 0). "the 9 a.m." → parseHour 9 → matches a slot
  // stored at 09:00Z. See the SchedulerGrid timezone note.
  return new Date(slotIso).getUTCHours();
}
