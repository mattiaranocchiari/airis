// Phase 0 voice transport per Step 4.3 plan + V28 §17.6 minimum.
//
// Phase 0 path (shipped): browser-native Web Speech API in PushToTalk.tsx.
// Zero external STT keys; English Chrome/Edge only.
//
// Phase D follow-up — once the founder picks Deepgram English or AssemblyAI
// English based on a quick latency check:
//   - Server route at app/api/voice/stt-token/route.ts issues a short-lived
//     token from `DEEPGRAM_API_KEY` (or AssemblyAI equivalent).
//     Phase D follow-up: use `@deepgram/sdk` or `assemblyai`.
//   - Browser opens a WebSocket to the chosen provider, streams mic frames,
//     listens for `is_final` transcripts.
//   - On `mic_close`, call back into the existing PushToTalk.onTranscript
//     contract — the rest of the dual-surface path is unchanged.
//
// §17.6 Pipecat commitment + Silero VAD + Smart Turn v3 + MedWhisper Italian
// land at Step 4.14 with the full voice stack. Phase 0 holds the contract
// (transcript text + mic_close_ts) so downstream code never changes when the
// voice transport upgrades.

export type SttAdapter = {
  start: () => Promise<void>;
  stop: () => Promise<void>;
};

export type SttCallback = (text: string, micCloseTs: number) => void;
