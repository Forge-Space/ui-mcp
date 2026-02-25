import type { IBackendSnippet } from '../types.js';

export const cachingStrategySnippets: IBackendSnippet[] = [
  {
    id: 'perf-cache-lru',
    name: 'LRU In-Memory Cache',
    category: 'performance',
    type: 'caching',
    variant: 'lru',
    tags: ['cache', 'lru', 'memory', 'performance'],
    framework: ['framework-agnostic'],
    patterns: ['singleton'],
    typescript: `interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class LRUCache<T> {
  private cache = new Map<string, CacheEntry<T>>();

  constructor(
    private readonly maxSize: number = 1000,
    private readonly defaultTtlMs: number = 60_000
  ) {}

  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  set(key: string, value: T, ttlMs?: number): void {
    if (this.cache.has(key)) this.cache.delete(key);
    if (this.cache.size >= this.maxSize) {
      const oldest = this.cache.keys().next().value;
      if (oldest) this.cache.delete(oldest);
    }
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + (ttlMs ?? this.defaultTtlMs),
    });
  }

  invalidate(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }
}

export const appCache = new LRUCache(500, 5 * 60_000);`,
    dependencies: [],
    quality: {
      securityChecks: ['TTL prevents stale data', 'max size prevents memory exhaustion'],
      performanceConsiderations: [
        'Map iteration order is insertion order — delete/re-insert for LRU',
        'O(1) get/set operations',
      ],
      antiPatterns: [
        'never cache without TTL',
        'never cache without size limit',
        'never cache sensitive data long-term',
      ],
      inspirationSource: 'lru-cache npm package patterns simplified',
    },
    testHint: 'Test get/set, TTL expiry, LRU eviction, max size enforcement, invalidation',
  },
];
