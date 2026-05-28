import { z } from "zod";

export const appointmentCreatedV1 = z.object({
  appointment_id: z.string().uuid(),
  room_id: z.string().min(1),
  patient_id: z.string().uuid(),
  kind: z.string().min(1),
  subtype: z.string().nullable(),
  with_contrast: z.boolean(),
  slot_start_at: z.string(),
  slot_end_at: z.string(),
  notes: z.string().nullable(),
});

export type AppointmentCreatedV1 = z.infer<typeof appointmentCreatedV1>;
