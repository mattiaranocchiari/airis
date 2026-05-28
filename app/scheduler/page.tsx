import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loadGridForCT1 } from "@/app/scheduler/actions";
import { SchedulerWorkbench } from "@/app/scheduler/SchedulerWorkbench";

export const dynamic = "force-dynamic";

export default async function SchedulerPage() {
  const db = await createSupabaseServerClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) {
    redirect("/login?next=/scheduler");
  }
  const tenantId = (user.app_metadata as { tenant_id?: string }).tenant_id;
  if (!tenantId) {
    return (
      <main className="flex flex-1 items-center justify-center p-8">
        <p className="text-sm text-zinc-500">
          No tenant on session — register the Custom Access Token Hook (see infra/manifest.md).
        </p>
      </main>
    );
  }

  const { appointments } = await loadGridForCT1();

  return <SchedulerWorkbench initial={appointments} tenantId={tenantId} />;
}
