import { z } from "zod";

export const appointmentCancelledV1 = z.object({
  appointment_id: z.string().uuid(),
});

export type AppointmentCancelledV1 = z.infer<typeof appointmentCancelledV1>;
