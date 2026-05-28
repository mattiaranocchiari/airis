"use client";

import { useRef, useState, useSyncExternalStore } from "react";

// Phase 0 voice transport per Step 4.3 plan + V28 §17.6 "Phase 0 minimum".
// Uses the browser's built-in SpeechRecognition (Chrome/Edge English) so the
// paradigm-validation slice runs with zero external STT keys. The plan calls
// for Deepgram English or AssemblyAI English once the founder picks based on
// a latency check — that integration lands behind the same `onTranscript`
// callback in lib/voice/stt.ts (placeholder scaffold). Step 4.14 is the full
// Pipecat voice stack per §17.6.

type WebkitSpeechRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((ev: { results: ArrayLike<ArrayLike<{ transcript: string }>>; resultIndex: number }) => void) | null;
  onend: (() => void) | null;
  onerror: ((ev: { error: string }) => void) | null;
};

type SpeechRecognitionCtor = new () => WebkitSpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  }
}

export type PushToTalkProps = {
  onTranscript: (text: string, micCloseTs: number) => void;
};

const NOOP_SUBSCRIBE = () => () => {};

export function PushToTalk({ onTranscript }: PushToTalkProps) {
  const recognitionRef = useRef<WebkitSpeechRecognition | null>(null);
  const transcriptRef = useRef<string>("");
  const [active, setActive] = useState(false);
  const supported = useSyncExternalStore(
    NOOP_SUBSCRIBE,
    () => Boolean(window.SpeechRecognition ?? window.webkitSpeechRecognition),
    () => false,
  );

  function start() {
    const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Ctor) return;
    const recognition = new Ctor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (ev) => {
      let final = "";
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        final += ev.results[i]![0]!.transcript;
      }
      transcriptRef.current = final;
    };
    recognition.onend = () => {
      const micCloseTs = Date.now();
      setActive(false);
      const text = transcriptRef.current.trim();
      if (text) onTranscript(text, micCloseTs);
    };
    recognition.onerror = () => {
      setActive(false);
    };
    recognitionRef.current = recognition;
    transcriptRef.current = "";
    recognition.start();
    setActive(true);
  }

  function stop() {
    recognitionRef.current?.stop();
  }

  if (!supported) {
    return (
      <button
        type="button"
        disabled
        className="rounded border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
        title="Web Speech API unavailable — try Chrome, or wait for Deepgram (Phase D follow-up)"
      >
        mic n/a
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={active ? stop : start}
      className={
        active
          ? "rounded bg-red-600 px-3 py-1 text-xs text-white"
          : "rounded border border-zinc-300 px-3 py-1 text-xs dark:border-zinc-700"
      }
    >
      {active ? "stop" : "🎤 push to talk"}
    </button>
  );
}
