import { readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { checkMigrationSequence } from "@/scripts/lib/migrations";

// Unit coverage for the MDR Class IIb migration-level change-control check
// (§17.19 + §17.20). The synthetic cases pin the logic; the final case runs the
// check against the repo's real supabase/migrations so `npm run test` itself
// guards the sequence (not only the dedicated CI gate).

describe("checkMigrationSequence", () => {
  it("accepts a contiguous, well-formed sequence", () => {
    const r = checkMigrationSequence([
      "20260528000001_extensions.sql",
      "20260528000002_tenants.sql",
      "20260528000003_clinician_profiles.sql",
    ]);
    expect(r).toEqual({ ok: true, count: 3, level: 3 });
  });

  it("ignores non-sql entries and sorts before checking", () => {
    const r = checkMigrationSequence([
      "20260528000002_tenants.sql",
      ".gitkeep",
      "README.md",
      "20260528000001_extensions.sql",
    ]);
    expect(r).toEqual({ ok: true, count: 2, level: 2 });
  });

  it("tolerates a date-prefix change while the global counter stays contiguous", () => {
    const r = checkMigrationSequence([
      "20260528000001_extensions.sql",
      "20260601000002_later_day.sql",
    ]);
    expect(r.ok).toBe(true);
  });

  it("flags a gap in the sequence", () => {
    const r = checkMigrationSequence([
      "20260528000001_extensions.sql",
      "20260528000003_tenants.sql",
    ]);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.join(" ")).toMatch(/gap/);
  });

  it("flags a duplicate counter", () => {
    const r = checkMigrationSequence([
      "20260528000001_extensions.sql",
      "20260528000002_tenants.sql",
      "20260528000002_patients.sql",
    ]);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.join(" ")).toMatch(/duplicate/);
  });

  it("flags a malformed filename", () => {
    const r = checkMigrationSequence([
      "20260528000001_extensions.sql",
      "0002_tenants.sql",
    ]);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.join(" ")).toMatch(/malformed/);
  });

  it("flags an empty migrations set", () => {
    expect(checkMigrationSequence([]).ok).toBe(false);
  });

  it("passes for the repo's real migration set", () => {
    const dir = path.resolve(process.cwd(), "supabase/migrations");
    const result = checkMigrationSequence(readdirSync(dir));
    expect(result.ok).toBe(true);
  });
});
