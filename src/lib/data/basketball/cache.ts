// filepath: src/lib/data/basketball/cache.ts
/**
 * DRAFTEADOS NBA HUB — CACHE LAYER
 * Cache en memoria con TTL (Time-To-Live).
 * Preparado para extenderse a Cloudflare KV / Supabase sin romper la firma.
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class MemoryCache {
  private store = new Map<string, CacheEntry<unknown>>();

  async getOrSet<T>(key: string, ttlSeconds: number, fetcher: () => Promise<T>): Promise<T> {
    const now = Date.now();
    const existing = this.store.get(key) as CacheEntry<T> | undefined;

    if (existing && existing.expiresAt > now) {
      return existing.value;
    }

    try {
      const fresh = await fetcher();
      this.store.set(key, {
        value: fresh,
        expiresAt: now + ttlSeconds * 1000,
      });
      return fresh;
    } catch (err) {
      // Si falla la consulta fresca pero tenemos valor stale, lo devolvemos como fallback
      if (existing) {
        return existing.value;
      }
      throw err;
    }
  }

  clear(keyPrefix?: string): void {
    if (!keyPrefix) {
      this.store.clear();
      return;
    }
    for (const k of this.store.keys()) {
      if (k.startsWith(keyPrefix)) {
        this.store.delete(k);
      }
    }
  }
}

export const hubCache = new MemoryCache();
