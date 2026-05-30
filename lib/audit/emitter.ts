import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import { buildEvent, type Actor } from "@/lib/cloudevents";
import type { Finalita } from "@/lib/finalita";
import type { Database, Json } from "@/lib/supabase/types";
import type { EventType, EventDataFor } from "@/events/registry";

// Audit ledger emitter (D.17 + §17.9). The single Node-side path for every
// audited mutation: build the CloudEvents v1.0.2 envelope, then dispatch the
// atomic RPC whose DB function inserts the row + the event_queue outbox row +
// the hash-chained L6 audit row in one transaction. Consolidates the dispatch
// that was duplicated verbatim across lib/db/patients.ts + lib/db/appointments.ts
// so every later subsystem (Patient Flow Layer, Regulatory Layer, Agent
// Builder) calls one audited path instead of re-rolling it per RPC.
//
// The chain-append + per-tenant monotonic `chain_sequence` ordering guarantee
// lives in the DB function (airis_internal.audit_events_append); this library
// is the typed caller, not the chain authority. Phase 0 transport is the
// same-transaction outbox insert; Step 4.5 Turn 2 lifts fan-out to Inngest +
// Realtime broadcast behind this same call signature.

type DB = SupabaseClient<Database>;
type Functions = Database["public"]["Functions"];

// Who/why context shared by every mutation. `actor` + `finalita` (purpose of
// access per D.17 / DM 7.9.2023 art. 21) land in the audit row; `tenantId`
// stamps the CloudEvent envelope (RLS scopes the persisted rows by construction).
export type MutationContext = {
  actor: Actor;
  finalita: Finalita;
  tenantId: string;
};

// The audit/event tail every audited mutation RPC carries in addition to its
// domain args. The DB function reads these to write the outbox + audit rows.
export type AuditTail = {
  p_finalita: string;
  p_cloudevent_id: string;
  p_cloudevent: Json;
};

type IsNever<T> = [T] extends [never] ? true : false;

// RPC names whose Args carry the audit tail — i.e. the audited mutation RPCs
// (patient_* / appointment_*). Read-only RPCs (current_tenant_id, Args: never)
// and the auth hook (custom_access_token_hook) are excluded by construction.
export type AuditedRpc = {
  [K in keyof Functions]: IsNever<Functions[K]["Args"]> extends true
    ? never
    : Functions[K]["Args"] extends AuditTail
      ? K
      : never;
}[keyof Functions];

// The domain-specific RPC args the caller supplies — everything except the
// audit tail, which emitAuditEvent appends.
export type DomainArgs<R extends AuditedRpc> = Omit<Functions[R]["Args"], keyof AuditTail>;

export type EmitAuditEventOptions<T extends EventType, R extends AuditedRpc> = {
  /** CloudEvents type — must exist in the compile-time event registry. */
  type: T;
  /** The atomic mutation RPC to dispatch. */
  rpc: R;
  /** Who/why context (actor + finalita + tenant). */
  ctx: MutationContext;
  /** Event subject — the entity id the mutation concerns. */
  subject: string;
  /** Event payload — validated against the registry schema inside buildEvent. */
  data: EventDataFor<T>;
  /** Domain RPC args only; emitAuditEvent appends p_finalita / p_cloudevent_id / p_cloudevent. */
  args: DomainArgs<R>;
  /** CloudEvents source override (defaults to the patient-registry source in buildEvent). */
  source?: string;
};

// The universal fields every audited mutation RPC returns: the audit row id and
// the outbox event id. The entity id is already known to the caller (it
// generates it on create, or receives it on update/delete), so it is not
// re-read here — keeping this contract identical across every subsystem.
const auditEmitResult = z.object({
  audit_event_id: z.string().uuid(),
  event_id: z.string(),
});

export type AuditEmitResult = z.infer<typeof auditEmitResult>;

export async function emitAuditEvent<T extends EventType, R extends AuditedRpc>(
  db: DB,
  opts: EmitAuditEventOptions<T, R>,
): Promise<AuditEmitResult> {
  const event = buildEvent(opts.type, {
    subject: opts.subject,
    tenantId: opts.ctx.tenantId,
    actor: opts.ctx.actor,
    source: opts.source,
    data: opts.data,
  });

  // Omit<…> + spread isn't provably the original Args to the compiler for a
  // generic R, so the constructed object is asserted at this single chokepoint
  // (mirrors the per-RPC cast the db modules used before consolidation).
  const args = {
    ...opts.args,
    p_finalita: opts.ctx.finalita,
    p_cloudevent_id: event.id,
    p_cloudevent: event as unknown as Json,
  } as Functions[R]["Args"];

  const { data, error } = await db.rpc(opts.rpc, args);
  if (error) throw error;
  return auditEmitResult.parse(data);
}
