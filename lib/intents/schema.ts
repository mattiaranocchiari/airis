import { z } from "zod";

// L5 intent contract per Step 4.3 plan. Five intent classes + disambiguation
// signal. The Zod schemas are the runtime validators; the JSON Schema export
// at the bottom is what Claude's structured-outputs format consumes.

export const Tier1ViewSchedule = z.object({
  intent: z.literal("view_schedule"),
  room_id: z.string(),
  when: z.enum(["today", "tomorrow"]),
});

export const Tier2BookAppointment = z.object({
  intent: z.literal("book_appointment"),
  room_id: z.string(),
  patient_query: z.string().min(1),
  kind: z.string(),
  subtype: z.string().nullable(),
  with_contrast: z.boolean(),
  slot_start_local: z.string(),
  duration_minutes: z.number().int().positive(),
});

export const Tier2MoveAppointment = z.object({
  intent: z.literal("move_appointment"),
  reference: z.string().min(1),
  new_slot_start_local: z.string(),
});

export const Tier2CancelAppointment = z.object({
  intent: z.literal("cancel_appointment"),
  reference: z.string().min(1),
});

export const DisambiguatePatient = z.object({
  intent: z.literal("disambiguate_patient"),
  selection: z.string().min(1),
});

export const Intent = z.discriminatedUnion("intent", [
  Tier1ViewSchedule,
  Tier2BookAppointment,
  Tier2MoveAppointment,
  Tier2CancelAppointment,
  DisambiguatePatient,
]);

export type Intent = z.infer<typeof Intent>;

// JSON Schema (Draft 2020-12 subset compatible with Claude structured outputs)
// must mirror the discriminated-union above. Keep the two in sync.
export const intentJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["intent"],
  properties: {
    intent: {
      type: "string",
      enum: [
        "view_schedule",
        "book_appointment",
        "move_appointment",
        "cancel_appointment",
        "disambiguate_patient",
      ],
    },
    room_id: { type: "string" },
    when: { type: "string", enum: ["today", "tomorrow"] },
    patient_query: { type: "string" },
    kind: { type: "string" },
    subtype: { type: ["string", "null"] },
    with_contrast: { type: "boolean" },
    slot_start_local: { type: "string" },
    duration_minutes: { type: "integer" },
    reference: { type: "string" },
    new_slot_start_local: { type: "string" },
    selection: { type: "string" },
  },
} as const;
