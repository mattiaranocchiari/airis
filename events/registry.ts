import { patientCreatedV1 } from "@/events/core/patient.created/v1";
import { patientUpdatedV1 } from "@/events/core/patient.updated/v1";
import { patientDeletedV1 } from "@/events/core/patient.deleted/v1";
import { appointmentCreatedV1 } from "@/events/core/appointment.created/v1";
import { appointmentUpdatedV1 } from "@/events/core/appointment.updated/v1";
import { appointmentCancelledV1 } from "@/events/core/appointment.cancelled/v1";
import type { z } from "zod";

// Compile-time-typed registry per §17.9. Add new event types here only —
// each `type` string must equal `<subsystem>.<entity>.<action>.v<n>` per the
// naming convention, with one Zod schema file at events/<subsystem>/<entity>.<action>/v<n>.ts.
export const eventRegistry = {
  "core.patient.created.v1": patientCreatedV1,
  "core.patient.updated.v1": patientUpdatedV1,
  "core.patient.deleted.v1": patientDeletedV1,
  "core.appointment.created.v1": appointmentCreatedV1,
  "core.appointment.updated.v1": appointmentUpdatedV1,
  "core.appointment.cancelled.v1": appointmentCancelledV1,
} as const;

export type EventType = keyof typeof eventRegistry;

export type EventDataFor<T extends EventType> = z.infer<(typeof eventRegistry)[T]>;
