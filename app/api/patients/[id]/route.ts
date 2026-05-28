import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deletePatient, getPatient, updatePatient } from "@/lib/db/patients";
import { FINALITA_HEADER, parseFinalita } from "@/lib/finalita";

export const runtime = "nodejs";

const patchBody = z.object({
  codice_fiscale: z.string().nullable().optional(),
  given_name: z.string().min(1).optional(),
  family_name: z.string().min(1).optional(),
  date_of_birth: z.string().nullable().optional(),
  sex: z.string().nullable().optional(),
});

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const db = await createSupabaseServerClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const patient = await getPatient(db, id);
  if (!patient) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ patient });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
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
  if (!tenantId) return NextResponse.json({ error: "no tenant on session" }, { status: 403 });

  let body;
  try {
    body = patchBody.parse(await req.json());
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "invalid body", issues: err.issues }, { status: 400 });
    }
    throw err;
  }
  if (Object.keys(body).length === 0) {
    return NextResponse.json({ error: "no fields to update" }, { status: 400 });
  }

  try {
    const result = await updatePatient(db, id, body, {
      actor: { type: "clinician", id: user.id },
      finalita,
      tenantId,
    });
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof Error && /not found/.test(err.message)) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    throw err;
  }
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
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
  if (!tenantId) return NextResponse.json({ error: "no tenant on session" }, { status: 403 });

  try {
    const result = await deletePatient(db, id, {
      actor: { type: "clinician", id: user.id },
      finalita,
      tenantId,
    });
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof Error && /not found/.test(err.message)) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    throw err;
  }
}
