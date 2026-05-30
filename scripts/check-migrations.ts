import { readdirSync } from "node:fs";
import path from "node:path";
import { checkMigrationSequence } from "@/scripts/lib/migrations";

// CI/dev change-control gate (§17.19 + §17.20). Verifies supabase/migrations
// forms a complete, gap-free, duplicate-free version sequence and exits 1 on
// any violation, so the MDR Class IIb change-control trail can't silently lose
// or reorder a migration. Run: `npm run check:migrations`.

function main(): void {
  const dir = path.resolve(process.cwd(), "supabase/migrations");
  const files = readdirSync(dir);
  const result = checkMigrationSequence(files);
  if (!result.ok) {
    console.error("migration-level check FAILED:");
    for (const e of result.errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log(
    `migration-level check ok: ${result.count} migrations, level ${result.level}.`,
  );
}

main();
