import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";

// CHANGELOG.md generation from PR titles (§17.20 / MDR Class IIb change
// control). A squash-merge into `main` lands as a single commit whose subject
// is the PR title + `(#N)`. This regenerates CHANGELOG.md deterministically
// from that history — the merged-PR record is the source of truth, so the file
// is a derived artifact, not hand-edited. Run after merges: `npm run changelog`
// (optionally `npm run changelog -- <ref>`; defaults to `main`).
//
// Not wired into the pre-merge CI gate by design: a PR's own changelog entry
// only exists once it is squash-merged, so enforcement would always lag by one
// merge. The post-merge auto-commit variant pairs with branch protection
// (the "G heavy" scaffolding) and is deferred per the Step 4.5 plan.

type Entry = { pr: number; title: string; sha: string; date: string };

const PR_RE = /^(.*?)\s*\(#(\d+)\)\s*$/;

function gitLog(ref: string): string {
  // %x09 = tab; subject (%s) last so titles containing a tab can't shift columns.
  return execFileSync(
    "git",
    ["log", ref, "--no-merges", "--date=short", "--pretty=format:%h%x09%ad%x09%s"],
    { encoding: "utf8" },
  );
}

function parse(log: string): Entry[] {
  const entries: Entry[] = [];
  for (const line of log.split("\n")) {
    if (!line.trim()) continue;
    const [sha, date, ...rest] = line.split("\t");
    const subject = rest.join("\t");
    const m = PR_RE.exec(subject ?? "");
    if (!m) continue; // commits without a `(#N)` suffix aren't merged PRs
    entries.push({ pr: Number(m[2]), title: m[1]!.trim(), sha: sha!, date: date! });
  }
  return entries;
}

function render(entries: Entry[]): string {
  const lines = [
    "# Changelog",
    "",
    "Generated from squash-merged pull-request titles on `main` via `npm run changelog`.",
    "Each entry is one merged PR — the MDR Class IIb change-control record per §17.20.",
    "Derived artifact: do not hand-edit; regenerate after merges.",
    "",
  ];
  for (const e of entries) {
    lines.push(`- **#${e.pr}** ${e.title} (\`${e.sha}\`, ${e.date})`);
  }
  lines.push("");
  return lines.join("\n");
}

function main(): void {
  const ref = process.argv[2] ?? "main";
  const entries = parse(gitLog(ref));
  const out = path.resolve(process.cwd(), "CHANGELOG.md");
  writeFileSync(out, render(entries), "utf8");
  console.log(`CHANGELOG.md written from ${ref}: ${entries.length} merged PRs.`);
}

main();
