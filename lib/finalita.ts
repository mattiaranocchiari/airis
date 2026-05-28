// Italian regulatory `finalità` (purpose of access) enum per D.17 / DM 7.9.2023
// art. 21. Phase 0 closed set; exact values to be reconciled with the FSE 2.0
// purpose-of-access categories when the Regulatory Layer lands (Step 4.13).
export const FINALITA_VALUES = [
  "cura_diretta",
  "assistenza",
  "amministrativo",
  "verifica_qualita",
  "urgenza_break_glass",
] as const;

export type Finalita = (typeof FINALITA_VALUES)[number];

const FINALITA_SET = new Set<string>(FINALITA_VALUES);

export const FINALITA_HEADER = "x-airis-finalita";

export function parseFinalita(headerValue: string | null | undefined): Finalita | null {
  if (!headerValue) return null;
  const normalized = headerValue.trim().toLowerCase();
  return FINALITA_SET.has(normalized) ? (normalized as Finalita) : null;
}
