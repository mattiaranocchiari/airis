// Migration-level change-control check (§17.19 + §17.20 / MDR Class IIb).
//
// The Supabase CLI applies supabase/migrations in lexical filename order. For
// the schema-evolution audit trail to be deterministic and complete, the
// numeric version prefixes must form a single strictly-increasing, gap-free,
// duplicate-free sequence: a gap means a migration was dropped or its number
// skipped; a duplicate means two migrations claim the same ordering slot.
// Either breaks reproducibility of the schema — a change-control event the
// gate must surface rather than let merge silently.
//
// Convention (see infra/manifest.md "Migration level"): each filename is
// `<14-digit-version>_<snake_case_name>.sql`, where the version is an
// `YYYYMMDD` date prefix + a 6-digit counter. The counter is a single global
// sequence starting at 000001; "migration level N" == the highest counter ==
// the file count. A future change to this numbering convention (e.g. per-date
// counter resets) is itself a change-control decision and should update this
// check consciously — that is the intended failure mode, not a false positive.
//
// Pure function (no fs / no process) so it is unit-testable and shared by the
// CI runner (scripts/check-migrations.ts) and tests/migrations.check.test.ts.

export type MigrationCheckResult =
  | { ok: true; count: number; level: number }
  | { ok: false; errors: string[] };

const FILENAME_RE = /^\d{8}(\d{6})_[a-z0-9]+(?:_[a-z0-9]+)*\.sql$/;

export function checkMigrationSequence(filenames: string[]): MigrationCheckResult {
  const errors: string[] = [];
  const sqlFiles = filenames.filter((f) => f.endsWith(".sql")).slice().sort();

  if (sqlFiles.length === 0) {
    return { ok: false, errors: ["no .sql migrations found in supabase/migrations"] };
  }

  const counters: number[] = [];
  for (const name of sqlFiles) {
    const m = FILENAME_RE.exec(name);
    if (!m) {
      errors.push(
        `malformed migration filename (expected <YYYYMMDD><NNNNNN>_snake_name.sql): ${name}`,
      );
      continue;
    }
    counters.push(Number(m[1]));
  }

  // Only sequence-check when every filename parsed; otherwise the counter list
  // is incomplete and gap reporting would mislead.
  if (errors.length === 0) {
    const seen = new Set<number>();
    let prev = 0;
    for (let i = 0; i < counters.length; i++) {
      const c = counters[i]!;
      if (seen.has(c)) {
        errors.push(`duplicate migration counter ${pad(c)} (${sqlFiles[i]})`);
        continue;
      }
      seen.add(c);
      const expected = prev + 1;
      if (c > expected) {
        errors.push(
          `gap in migration sequence: expected ${pad(expected)} but found ${pad(c)} (${sqlFiles[i]})`,
        );
      } else if (c < expected) {
        errors.push(
          `migration counter out of order: ${pad(c)} follows ${pad(prev)} (${sqlFiles[i]})`,
        );
      }
      prev = Math.max(prev, c);
    }
  }

  if (errors.length > 0) return { ok: false, errors };
  const level = counters[counters.length - 1]!;
  return { ok: true, count: sqlFiles.length, level };
}

function pad(n: number): string {
  return n.toString().padStart(6, "0");
}
