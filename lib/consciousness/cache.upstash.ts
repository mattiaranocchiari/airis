import { Redis } from "@upstash/redis";
import type { CacheBackend, ConsciousnessContext } from "./cache";

// Upstash Redis (EU) backend for the L3 hot-context cache (§17.4; Step 4.5
// Turn 2 sub-deliverable E). Selected via AIRIS_CACHE_BACKEND=upstash; lazily
// imported by cache.ts so the default `memory` path never loads this module.
// @upstash/redis auto-(de)serializes JSON, so whole ConsciousnessContext
// objects round-trip directly. Keys are namespaced + given a hot-window TTL.

const PREFIX = "airis:l3:";
const TTL_SECONDS = 60 * 60 * 24; // 24h hot-context window; reads still fall through to L1 on miss

// The subset of the Redis client this backend uses — lets tests inject a fake
// without standing up a live Upstash instance.
export type RedisLike = {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: unknown, opts?: { ex?: number }): Promise<unknown>;
  del(...keys: string[]): Promise<number>;
  scan(
    cursor: string | number,
    opts: { match?: string; count?: number },
  ): Promise<[string | number, string[]]>;
};

export function createUpstashBackend(client?: RedisLike): CacheBackend {
  const redis = client ?? fromEnv();
  const redisKey = (k: string) => `${PREFIX}${k}`;
  return {
    async get(k) {
      const v = await redis.get<ConsciousnessContext>(redisKey(k));
      return v ?? undefined;
    },
    async set(k, value) {
      await redis.set(redisKey(k), value, { ex: TTL_SECONDS });
    },
    async delete(k) {
      await redis.del(redisKey(k));
    },
    async clearAll() {
      // Test/dev only — scoped to the AIRIS L3 prefix so it never touches keys
      // outside this cache's namespace.
      // @upstash/redis returns the scan cursor as a string ("0" when done);
      // String() guards against versions that surface it as a number.
      let cursor: string | number = "0";
      do {
        const [next, keys] = await redis.scan(cursor, { match: `${PREFIX}*`, count: 100 });
        if (keys.length > 0) await redis.del(...keys);
        cursor = next;
      } while (String(cursor) !== "0");
    },
  };
}

function fromEnv(): RedisLike {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error(
      "AIRIS_CACHE_BACKEND=upstash requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN",
    );
  }
  return new Redis({ url, token }) as unknown as RedisLike;
}
