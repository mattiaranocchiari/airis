"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") ?? "/scheduler";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.replace(next);
    router.refresh();
  }

  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <form
        onSubmit={(e) => {
          if (pending) return;
          startTransition(() => {
            void handleSubmit(e);
          });
        }}
        className="w-full max-w-sm space-y-4 rounded-md border border-zinc-200 p-6 dark:border-zinc-800"
      >
        <h1 className="text-lg font-semibold">AIRIS — sign in</h1>
        <label className="block space-y-1 text-sm">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded border border-zinc-300 bg-transparent px-2 py-1 outline-none focus:border-zinc-500 dark:border-zinc-700"
          />
        </label>
        <label className="block space-y-1 text-sm">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded border border-zinc-300 bg-transparent px-2 py-1 outline-none focus:border-zinc-500 dark:border-zinc-700"
          />
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded bg-zinc-900 px-3 py-2 text-sm text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
        >
          {pending ? "signing in…" : "sign in"}
        </button>
      </form>
    </main>
  );
}
