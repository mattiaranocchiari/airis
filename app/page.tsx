import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">AIRIS</h1>
      <p className="text-zinc-500 dark:text-zinc-400">
        International hospital information system; Italy as first deployment market.
      </p>
      <div className="mt-4 flex gap-3 text-sm">
        <Link
          href="/scheduler"
          className="rounded border border-zinc-300 px-3 py-1 dark:border-zinc-700"
        >
          Open scheduler
        </Link>
        <Link
          href="/login"
          className="rounded bg-zinc-900 px-3 py-1 text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
}
