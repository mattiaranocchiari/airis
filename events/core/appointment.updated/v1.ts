import { z } from "zod";

export const appointmentUpdatedV1 = z.object({
  appointment_id: z.string().uuid(),
  changed_fields: z.array(
    z.enum(["subtype", "with_contrast", "slot_start_at", "slot_end_at", "notes"]),
  ),
});

export type AppointmentUpdatedV1 = z.infer<typeof appointmentUpdatedV1>;
