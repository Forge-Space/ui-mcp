import type { IBackendSnippet } from '../types.js';

export const rateLimitingSnippets: IBackendSnippet[] = [
  {
    id: 'mw-rate-limit-memory',
    name: 'In-Memory Rate Limiter',
    category: 'middleware',
    type: 'rate-limiting',
    variant: 'memory',
    tags: ['rate-limit', 'throttle', 'security', 'middleware'],
    framework: ['nextjs-api', 'express'],
    patterns: ['middleware-chain'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';

interface RateLimitConfig {
  max: number;
  windowMs: number;
}

const store = new Map<string, { count: number; resetAt: number }>();

setInterval(() => {
  const now = Date.now();
  for (const [key, value] of store.entries()) {
    if (value.resetAt < now) store.delete(key);
  }
}, 60_000);

export function rateLimit(config: RateLimitConfig) {
  return function (
    handler: (req: NextRequest, ctx?: unknown) => Promise<NextResponse | Response>
  ) {
    return async (req: NextRequest, ctx?: unknown) => {
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        ?? req.headers.get('x-real-ip')
        ?? 'unknown';
      const key = \`\${ip}:\${req.nextUrl.pathname}\`;
      const now = Date.now();
      const record = store.get(key);
      if (!record || record.resetAt < now) {
        store.set(key, { count: 1, resetAt: now + config.windowMs });
      } else {
        record.count++;
        if (record.count > config.max) {
          return NextResponse.json(
            { error: { message: 'Too many requests' } },
            {
              status: 429,
              headers: {
                'Retry-After': String(Math.ceil((record.resetAt - now) / 1000)),
                'X-RateLimit-Limit': String(config.max),
                'X-RateLimit-Remaining': '0',
              },
            }
          );
        }
      }
      return handler(req, ctx);
    };
  };
}`,
    dependencies: ['next'],
    quality: {
      securityChecks: ['IP-based limiting', 'per-path rate tracking', 'Retry-After header for clients'],
      performanceConsiderations: ['periodic cleanup prevents memory leak', 'O(1) Map lookup', 'no external dependency'],
      antiPatterns: ['never rely on in-memory store in multi-instance deployments', 'never trust single IP header'],
      inspirationSource: 'express-rate-limit patterns adapted for Next.js',
    },
    testHint: 'Test under limit, at limit, over limit, window reset, Retry-After header',
  },
  {
    id: 'mw-rate-limit-redis',
    name: 'Redis Rate Limiter',
    category: 'middleware',
    type: 'rate-limiting',
    variant: 'redis',
    tags: ['rate-limit', 'redis', 'distributed', 'sliding-window'],
    framework: ['nextjs-api', 'express'],
    patterns: ['middleware-chain'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

interface SlidingWindowConfig {
  max: number;
  windowMs: number;
  keyPrefix?: string;
}

export function slidingWindowRateLimit(config: SlidingWindowConfig) {
  const prefix = config.keyPrefix ?? 'rl';
  return function (
    handler: (req: NextRequest, ctx?: unknown) => Promise<NextResponse | Response>
  ) {
    return async (req: NextRequest, ctx?: unknown) => {
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        ?? 'unknown';
      const key = \`\${prefix}:\${ip}:\${req.nextUrl.pathname}\`;
      const now = Date.now();
      const windowStart = now - config.windowMs;
      const pipeline = redis.pipeline();
      pipeline.zremrangebyscore(key, 0, windowStart);
      pipeline.zadd(key, { score: now, member: \`\${now}-\${Math.random()}\` });
      pipeline.zcard(key);
      pipeline.pexpire(key, config.windowMs);
      const results = await pipeline.exec();
      const count = results[2] as number;
      if (count > config.max) {
        return NextResponse.json(
          { error: { message: 'Too many requests' } },
          {
            status: 429,
            headers: {
              'X-RateLimit-Limit': String(config.max),
              'X-RateLimit-Remaining': '0',
            },
          }
        );
      }
      const response = await handler(req, ctx);
      if (response instanceof NextResponse) {
        response.headers.set('X-RateLimit-Limit', String(config.max));
        response.headers.set('X-RateLimit-Remaining', String(config.max - count));
      }
      return response;
    };
  };
}`,
    dependencies: ['@upstash/redis', 'next'],
    envVars: ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
    quality: {
      securityChecks: [
        'sliding window more accurate than fixed',
        'distributed across instances',
        'pipeline for atomic operations',
      ],
      performanceConsiderations: [
        'pipeline reduces Redis round-trips',
        'automatic TTL cleanup',
        'Edge-compatible with Upstash',
      ],
      antiPatterns: ['never use fixed window for critical endpoints', 'never skip cleanup of old entries'],
      inspirationSource: 'Upstash rate-limit library patterns',
    },
    testHint: 'Test within limit, exceeding limit, window sliding behavior, concurrent requests',
  },
];
