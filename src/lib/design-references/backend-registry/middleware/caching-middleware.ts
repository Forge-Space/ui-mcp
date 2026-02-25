import type { IBackendSnippet } from '../types.js';

export const cachingMiddlewareSnippets: IBackendSnippet[] = [
  {
    id: 'mw-cache-stale-while-revalidate',
    name: 'Stale-While-Revalidate Cache',
    category: 'middleware',
    type: 'caching',
    variant: 'stale-while-revalidate',
    tags: ['cache', 'swr', 'revalidate', 'performance'],
    framework: ['nextjs-api', 'express'],
    patterns: ['middleware-chain'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';

interface CacheConfig {
  maxAge: number;
  staleWhileRevalidate: number;
  varyHeaders?: string[];
}

export function withCache(config: CacheConfig) {
  return function (
    handler: (req: NextRequest) => Promise<NextResponse>
  ) {
    return async (req: NextRequest) => {
      if (req.method !== 'GET') return handler(req);
      const response = await handler(req);
      response.headers.set(
        'Cache-Control',
        \`public, s-maxage=\${config.maxAge}, stale-while-revalidate=\${config.staleWhileRevalidate}\`
      );
      if (config.varyHeaders?.length) {
        response.headers.set('Vary', config.varyHeaders.join(', '));
      }
      return response;
    };
  };
}`,
    dependencies: ['next'],
    quality: {
      securityChecks: [
        'only caches GET requests',
        'Vary header prevents cache poisoning',
        'public only for non-authenticated endpoints',
      ],
      performanceConsiderations: [
        'SWR serves stale while fetching fresh',
        's-maxage for CDN layer',
        'Vary for correct cache keys',
      ],
      antiPatterns: [
        'never cache authenticated responses with public',
        'never skip Vary header for personalized content',
      ],
      inspirationSource: 'Vercel Edge caching patterns',
    },
    testHint: 'Test Cache-Control header values, GET vs POST behavior, Vary header',
  },
  {
    id: 'mw-cache-redis',
    name: 'Redis Response Cache',
    category: 'middleware',
    type: 'caching',
    variant: 'redis',
    tags: ['cache', 'redis', 'response', 'performance'],
    framework: ['nextjs-api', 'express'],
    patterns: ['middleware-chain'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

interface RedisCacheConfig {
  ttlSeconds: number;
  keyPrefix?: string;
}

export function withRedisCache(config: RedisCacheConfig) {
  const prefix = config.keyPrefix ?? 'cache';
  return function (
    handler: (req: NextRequest) => Promise<NextResponse>
  ) {
    return async (req: NextRequest) => {
      if (req.method !== 'GET') return handler(req);
      const cacheKey = \`\${prefix}:\${req.nextUrl.pathname}\${req.nextUrl.search}\`;
      const cached = await redis.get<string>(cacheKey);
      if (cached) {
        return NextResponse.json(JSON.parse(cached), {
          headers: { 'X-Cache': 'HIT' },
        });
      }
      const response = await handler(req);
      const body = await response.text();
      await redis.set(cacheKey, body, { ex: config.ttlSeconds });
      return new NextResponse(body, {
        status: response.status,
        headers: {
          ...Object.fromEntries(response.headers),
          'X-Cache': 'MISS',
        },
      });
    };
  };
}`,
    dependencies: ['@upstash/redis', 'next'],
    envVars: ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
    quality: {
      securityChecks: ['only caches GET requests', 'cache key includes query params', 'X-Cache header for debugging'],
      performanceConsiderations: [
        'Redis lookup fast for hot paths',
        'TTL prevents stale data',
        'Edge-compatible with Upstash',
      ],
      antiPatterns: ['never cache user-specific data without user key', 'never cache POST/PUT/DELETE responses'],
      inspirationSource: 'Upstash caching patterns for Next.js',
    },
    testHint: 'Test cache HIT/MISS, TTL expiry, different query params, POST bypass',
  },
];
