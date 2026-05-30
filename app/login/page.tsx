import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center p-8">
          <p className="text-sm text-zinc-500">loading…</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
