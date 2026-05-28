import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createPatient, listPatients } from "@/lib/db/patients";
import { FINALITA_HEADER, parseFinalita } from "@/lib/finalita";

export const runtime = "nodejs";

const postBody = z.object({
  codice_fiscale: z.string().nullable().optional(),
  given_name: z.string().min(1),
  family_name: z.string().min(1),
  date_of_birth: z.string().nullable().optional(),
  sex: z.string().nullable().optional(),
});

export async function GET() {
  const db = await createSupabaseServerClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const patients = await listPatients(db);
  return NextResponse.json({ patients });
}

export async function POST(req: NextRequest) {
  const db = await createSupabaseServerClient();

  const finalita = parseFinalita(req.headers.get(FINALITA_HEADER));
  if (!finalita) {
    return NextResponse.json(
      { error: "missing or invalid X-AIRIS-Finalita header" },
      { status: 400 },
    );
  }

  const { data: { user } } = await db.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  const tenantId = (user.app_metadata as { tenant_id?: string }).tenant_id;
  if (!tenantId) {
    return NextResponse.json({ error: "no tenant on session" }, { status: 403 });
  }

  let body;
  try {
    body = postBody.parse(await req.json());
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "invalid body", issues: err.issues }, { status: 400 });
    }
    throw err;
  }

  const result = await createPatient(
    db,
    {
      codice_fiscale: body.codice_fiscale ?? null,
      given_name: body.given_name,
      family_name: body.family_name,
      date_of_birth: body.date_of_birth ?? null,
      sex: body.sex ?? null,
    },
    {
      actor: { type: "clinician", id: user.id },
      finalita,
      tenantId,
    },
  );

  return NextResponse.json(result, { status: 201 });
}
