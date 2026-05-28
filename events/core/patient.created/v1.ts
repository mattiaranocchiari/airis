import { z } from "zod";

export const patientCreatedV1 = z.object({
  patient_id: z.string().uuid(),
  codice_fiscale: z.string().nullable(),
  given_name: z.string().min(1),
  family_name: z.string().min(1),
  date_of_birth: z.string().nullable(),
  sex: z.string().nullable(),
});

export type PatientCreatedV1 = z.infer<typeof patientCreatedV1>;
