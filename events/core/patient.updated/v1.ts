import { z } from "zod";

export const patientUpdatedV1 = z.object({
  patient_id: z.string().uuid(),
  changed_fields: z.array(
    z.enum(["codice_fiscale", "given_name", "family_name", "date_of_birth", "sex"]),
  ),
});

export type PatientUpdatedV1 = z.infer<typeof patientUpdatedV1>;
