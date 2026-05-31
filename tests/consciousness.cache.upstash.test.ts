import { describe, expect, it } from "vitest";
import { createUpstashBackend, type RedisLike } from "@/lib/consciousness/cache.upstash";
import type { ConsciousnessContext } from "@/lib/consciousness/cache";

// Validates the Upstash L3 backend's key namespacing + serialization round-trip
// + prefix-scoped clearAll against an injected fake (mimics @upstash/redis's
// auto-(de)serialization: objects are stored + returned as-is). The high-level
// merge/trim logic is covered separately via the default memory backend.

function fakeRedis(): RedisLike & { map: Map<string, unknown> } {
  const map = new Map<string, unknown>();
  return {
    map,
    async get<T>(key: string) {
      return (map.has(key) ? (map.get(key) as T) : null);
    },
    async set(key: string, value: unknown) {
      map.set(key, value);
      return "OK";
    },
    async del(...keys: string[]) {
      let n = 0;
      for (const k of keys) if (map.delete(k)) n++;
      return n;
    },
    async scan(_cursor, opts) {
      const prefix = (opts.match ?? "").replace(/\*$/, "");
      return ["0", [...map.keys()].filter((k) => k.startsWith(prefix))];
    },
  };
}

const sample: ConsciousnessContext = {
  currentAppointmentId: "apt-1",
  recentActions: [
    { kind: "create", appointmentId: "apt-1", when: "2026-05-29T09:00:00.000Z", slotStartLocal: "2026-05-29T09:00:00.000Z" },
  ],
  conversationHistory: [{ role: "clinician", text: "book Rossi at 9", at: "2026-05-29T08:59:00.000Z" }],
};

describe("Upstash L3 cache backend", () => {
  it("namespaces the key and round-trips the context object", async () => {
    const fake = fakeRedis();
    const backend = createUpstashBackend(fake);

    await backend.set("00000000-0000-0000-0000-000000000001::scheduler:CT1", sample);
    expect(fake.map.has("airis:l3:00000000-0000-0000-0000-000000000001::scheduler:CT1")).toBe(true);

    const read = await backend.get("00000000-0000-0000-0000-000000000001::scheduler:CT1");
    expect(read).toEqual(sample);
  });

  it("returns undefined on a miss and after delete", async () => {
    const fake = fakeRedis();
    const backend = createUpstashBackend(fake);
    expect(await backend.get("t::c")).toBeUndefined();

    await backend.set("t::c", sample);
    await backend.delete("t::c");
    expect(await backend.get("t::c")).toBeUndefined();
  });

  it("clearAll removes only AIRIS-prefixed keys", async () => {
    const fake = fakeRedis();
    fake.map.set("airis:l3:a::b", sample);
    fake.map.set("airis:l3:c::d", sample);
    fake.map.set("someone-else:key", { keep: true });
    const backend = createUpstashBackend(fake);

    await backend.clearAll();

    expect(fake.map.has("airis:l3:a::b")).toBe(false);
    expect(fake.map.has("airis:l3:c::d")).toBe(false);
    expect(fake.map.has("someone-else:key")).toBe(true);
  });
});
