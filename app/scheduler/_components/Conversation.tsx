"use client";

import { useState, useTransition } from "react";
import {
  confirmContrastBooking,
  interpretUtterance,
  type PendingContrast,
  type SchedulerActionResult,
} from "@/app/scheduler/actions";
import { PushToTalk } from "@/app/scheduler/_components/PushToTalk";
import { speak } from "@/lib/voice/tts";

export type ConversationEntry =
  | { id: string; role: "clinician"; text: string }
  | { id: string; role: "system"; text: string }
  | { id: string; role: "system"; text: string; pendingContrast: PendingContrast }
  | {
      id: string;
      role: "system";
      text: string;
      candidates: { id: string; label: string }[];
    };

type Props = {
  entries: ConversationEntry[];
  appendEntry: (entry: ConversationEntry) => void;
};

export function Conversation({ entries, appendEntry }: Props) {
  const [input, setInput] = useState("");
  const [pending, startTransition] = useTransition();

  async function dispatch(text: string, micCloseTs: number) {
    appendEntry({ id: crypto.randomUUID(), role: "clinician", text });
    const result = await interpretUtterance(text, micCloseTs);
    handleResult(result);
  }

  function handleResult(result: SchedulerActionResult) {
    const replyId = crypto.randomUUID();
    if (result.kind === "ok") {
      const latency = result.timing.micCloseTs
        ? result.timing.broadcastSentTs - result.timing.micCloseTs
        : null;
      const latencyTxt = latency !== null ? ` (${latency} ms end-to-end)` : "";
      appendEntry({ id: replyId, role: "system", text: `${result.message}${latencyTxt}` });
      speak(result.message);
    } else if (result.kind === "needs_disambiguation") {
      appendEntry({
        id: replyId,
        role: "system",
        text: result.reason,
        candidates: result.candidates,
      });
      speak(result.reason);
    } else if (result.kind === "needs_egfr_confirmation") {
      const readback = `eGFR last value ${result.appointment.egfr_value} — confirm contrast?`;
      appendEntry({ id: replyId, role: "system", text: readback, pendingContrast: result.appointment });
      speak(readback);
    } else {
      appendEntry({ id: replyId, role: "system", text: `error: ${result.reason}` });
    }
  }

  return (
    <div className="flex h-full flex-col rounded-md border border-zinc-200 dark:border-zinc-800">
      <div className="border-b border-zinc-200 px-4 py-2 dark:border-zinc-800">
        <h2 className="text-sm font-semibold">Conversation</h2>
      </div>
      <ul className="flex-1 space-y-2 overflow-y-auto px-4 py-3 text-sm">
        {entries.length === 0 ? (
          <li className="text-zinc-400">
            Try: &ldquo;Book a CT abdomen for Marco Rossi tomorrow at 9.&rdquo;
          </li>
        ) : null}
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={
              entry.role === "clinician"
                ? "rounded bg-zinc-100 px-2 py-1 dark:bg-zinc-800"
                : "rounded border border-zinc-200 px-2 py-1 dark:border-zinc-700"
            }
          >
            <div>{entry.text}</div>
            {"pendingContrast" in entry && entry.pendingContrast ? (
              <button
                className="mt-2 rounded border border-amber-500 px-2 py-1 text-xs text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-950"
                onClick={() =>
                  startTransition(async () => {
                    const result = await confirmContrastBooking(entry.pendingContrast);
                    handleResult(result);
                  })
                }
              >
                Confirm with contrast
              </button>
            ) : null}
            {"candidates" in entry && entry.candidates ? (
              <ul className="mt-2 flex flex-wrap gap-1">
                {entry.candidates.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      className="rounded border border-zinc-300 px-2 py-1 text-xs hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
                      disabled={pending}
                      onClick={() => {
                        if (pending) return;
                        const text = c.label;
                        const micCloseTs = Date.now();
                        startTransition(() => {
                          void dispatch(text, micCloseTs);
                        });
                      }}
                    >
                      {c.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 border-t border-zinc-200 px-4 py-2 dark:border-zinc-800">
        <PushToTalk
          onTranscript={(text, micCloseTs) => {
            if (pending) return;
            startTransition(() => {
              void dispatch(text, micCloseTs);
            });
          }}
        />
        <span className="text-xs text-zinc-400">
          (browser Web Speech API — Deepgram lands in Phase D follow-up)
        </span>
      </div>
      <form
        className="flex gap-2 border-t border-zinc-200 px-4 py-3 dark:border-zinc-800"
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim() || pending) return;
          const text = input.trim();
          const micCloseTs = Date.now();
          setInput("");
          startTransition(() => {
            void dispatch(text, micCloseTs);
          });
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type an utterance — push-to-talk wired in Phase D"
          className="flex-1 rounded border border-zinc-300 bg-transparent px-2 py-1 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700"
          disabled={pending}
        />
        <button
          type="submit"
          className="rounded bg-zinc-900 px-3 py-1 text-sm text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
          disabled={pending}
        >
          send
        </button>
      </form>
    </div>
  );
}
