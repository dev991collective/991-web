type Bucket = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  limited: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

const storeKey = "__rate_limit_store__";

function getStore(): Map<string, Bucket> {
  const globalStore = globalThis as typeof globalThis & {
    [storeKey]?: Map<string, Bucket>;
  };

  if (!globalStore[storeKey]) {
    globalStore[storeKey] = new Map<string, Bucket>();
  }

  return globalStore[storeKey];
}

export function takeRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const store = getStore();
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false, remaining: limit - 1, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  if (current.count >= limit) {
    return {
      limited: true,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  store.set(key, current);

  return {
    limited: false,
    remaining: Math.max(0, limit - current.count),
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}
