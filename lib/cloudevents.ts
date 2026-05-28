import { ulid } from "ulid";
import { eventRegistry, type EventType, type EventDataFor } from "@/events/registry";

// Producer SDK per §17.9. CloudEvents v1.0.2 JSON envelope with the AIRIS
// extensions tenantid + actor (+ optional trace/correlation/causation ids).
// Phase 0 transport: same-transaction insert into the event_queue outbox by
// the patient_* RPC. Step 4.5 lifts emit() to Inngest + Realtime broadcast
// behind the same call signature.

export type Actor = {
  type: "clinician" | "system" | "agent";
  id: string;
};

export type CloudEvent<T extends EventType = EventType> = {
  specversion: "1.0";
  id: string;
  source: string;
  type: T;
  time: string;
  subject: string;
  datacontenttype: "application/json";
  dataschema: string;
  data: EventDataFor<T>;
  tenantid: string;
  actor: Actor;
  traceid?: string;
  correlationid?: string;
  causationid?: string;
};

export type BuildEventOptions<T extends EventType> = {
  subject: string;
  tenantId: string;
  actor: Actor;
  data: EventDataFor<T>;
  source?: string;
  traceId?: string;
  correlationId?: string;
  causationId?: string;
};

export function buildEvent<T extends EventType>(
  type: T,
  opts: BuildEventOptions<T>,
): CloudEvent<T> {
  const schema = eventRegistry[type];
  const data = schema.parse(opts.data) as EventDataFor<T>;

  const envelope: CloudEvent<T> = {
    specversion: "1.0",
    id: ulid(),
    source: opts.source ?? "airis://core/patient_registry",
    type,
    time: new Date().toISOString(),
    subject: opts.subject,
    datacontenttype: "application/json",
    dataschema: `airis://events/${type.replaceAll(".", "/")}`,
    data,
    tenantid: opts.tenantId,
    actor: opts.actor,
  };
  if (opts.traceId) envelope.traceid = opts.traceId;
  if (opts.correlationId) envelope.correlationid = opts.correlationId;
  if (opts.causationId) envelope.causationid = opts.causationId;
  return envelope;
}
