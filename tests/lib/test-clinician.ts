import { randomUUID, randomBytes } from "node:crypto";
import { adminClient, userClient } from "./clients";

export type TestClinician = {
  authUserId: string;
  tenantId: string;
  email: string;
  password: string;
  accessToken: string;
};

export type CreateTestClinicianOptions = {
  tenantId?: string;
  tenantName?: string;
};

export async function createTestClinician(
  opts: CreateTestClinicianOptions = {},
): Promise<TestClinician> {
  const admin = adminClient();
  const tenantId = opts.tenantId ?? randomUUID();

  // Tenant.
  const { error: tenantErr } = await admin
    .from("tenants")
    .insert({ id: tenantId, name: opts.tenantName ?? `test-${tenantId.slice(0, 8)}` });
  if (tenantErr) throw tenantErr;

  // Auth user — admin.createUser sets email_confirm so signInWithPassword works
  // immediately. The user_metadata is empty; Italian claims arrive via the
  // custom_access_token_hook reading clinician_profiles below.
  const email = `test-${randomBytes(6).toString("hex")}@airis.test`;
  const password = randomBytes(16).toString("hex");
  const { data: created, error: userErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (userErr || !created.user) throw userErr ?? new Error("createUser returned no user");
  const authUserId = created.user.id;

  // Clinician profile keyed to the auth user.
  const { error: profileErr } = await admin.from("clinician_profiles").insert({
    id: authUserId,
    tenant_id: tenantId,
    codice_fiscale: "TESTCF" + randomBytes(5).toString("hex").toUpperCase(),
    fnomceo_iscrizione: "TEST-FNOMCEO",
    albo: "TEST-ALBO",
    specializzazione: "Medicina interna",
    current_assignment: { department: "core", ward: "test", roster_slot: "A", shift: "day" },
  });
  if (profileErr) throw profileErr;

  // Sign in as the user — hook fires here and projects Italian claims into JWT.
  const signin = userClient("");
  const { data: session, error: signErr } = await signin.auth.signInWithPassword({
    email,
    password,
  });
  if (signErr || !session.session) {
    throw signErr ?? new Error("sign-in returned no session");
  }

  return {
    authUserId,
    tenantId,
    email,
    password,
    accessToken: session.session.access_token,
  };
}

export async function deleteTestClinician(c: TestClinician): Promise<void> {
  const admin = adminClient();
  // Order matters: child rows first (the FKs cascade to tenant).
  await admin.from("event_queue").delete().eq("tenant_id", c.tenantId);
  await admin.from("audit_events").delete().eq("tenant_id", c.tenantId);
  await admin.from("patients").delete().eq("tenant_id", c.tenantId);
  await admin.from("clinician_profiles").delete().eq("id", c.authUserId);
  await admin.from("tenants").delete().eq("id", c.tenantId);
  await admin.auth.admin.deleteUser(c.authUserId);
}
