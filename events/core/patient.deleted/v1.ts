import { z } from "zod";

export const patientDeletedV1 = z.object({
  patient_id: z.string().uuid(),
});

export type PatientDeletedV1 = z.infer<typeof patientDeletedV1>;
