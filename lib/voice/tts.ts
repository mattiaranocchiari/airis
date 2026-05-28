// Phase 0 TTS per Step 4.3 plan + V28 §17.6 minimum.
//
// Phase 0 path (shipped): browser-native `speechSynthesis` for the system
// reply ("booked at 9", "eGFR last value 32 — confirm contrast?"). Zero
// external keys; default English voice provided by the OS.
//
// Phase D follow-up: ElevenLabs default English TTS WebSocket. Server route
// proxies to ElevenLabs using `ELEVENLABS_API_KEY`; browser plays the streamed
// audio. The PushToTalk.onTranscript path stays unchanged — only the spoken
// reply rendering swaps.
//
// Voice quality trigger (per plan): if ElevenLabs default English feels
// demo-inadequate to founder + listener panel, pull Stage 5.2 voice talent
// forward or switch to a different default English voice asset.

export function speak(text: string): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}
