import type { IBackendSnippet } from '../types.js';

export const validationMiddlewareSnippets: IBackendSnippet[] = [
  {
    id: 'mw-validation-zod',
    name: 'Zod Request Validation',
    category: 'middleware',
    type: 'validation',
    variant: 'zod',
    tags: ['validation', 'zod', 'schema', 'input', 'middleware'],
    framework: ['nextjs-api', 'express'],
    patterns: ['middleware-chain', 'factory'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError, ZodSchema } from 'zod';

interface ValidationConfig<T> {
  body?: ZodSchema<T>;
  query?: ZodSchema<Record<string, unknown>>;
  params?: ZodSchema<Record<string, unknown>>;
}

export function validate<T>(config: ValidationConfig<T>) {
  return function (
    handler: (req: NextRequest & { validated: T }, ctx: unknown) => Promise<NextResponse>
  ) {
    return async (req: NextRequest, ctx: unknown) => {
      try {
        const validated: Record<string, unknown> = {};
        if (config.body) {
          validated.body = config.body.parse(await req.json());
        }
        if (config.query) {
          validated.query = config.query.parse(
            Object.fromEntries(req.nextUrl.searchParams)
          );
        }
        (req as unknown as Record<string, unknown>).validated = validated;
      } catch (error) {
        if (error instanceof ZodError) {
          return NextResponse.json({
            error: {
              message: 'Validation failed',
              details: error.errors.map((e) => ({
                field: e.path.join('.'),
                message: e.message,
              })),
            },
          }, { status: 422 });
        }
        throw error;
      }
      return handler(req as NextRequest & { validated: T }, ctx);
    };
  };
}`,
    dependencies: ['zod', 'next'],
    quality: {
      securityChecks: [
        'input validated before reaching handler',
        '422 with structured errors',
        'no raw error exposure',
      ],
      performanceConsiderations: ['Zod parse is fast for small schemas', 'early return on validation failure'],
      antiPatterns: ['never validate in handler body', 'never return raw ZodError to client'],
      inspirationSource: 'tRPC input validation patterns',
    },
    testHint: 'Test valid input, missing fields, wrong types, nested validation errors',
  },
  {
    id: 'mw-validation-sanitize',
    name: 'Input Sanitization Middleware',
    category: 'middleware',
    type: 'validation',
    variant: 'sanitize',
    tags: ['sanitization', 'xss', 'security', 'input', 'middleware'],
    framework: ['express', 'nextjs-api'],
    patterns: ['middleware-chain'],
    typescript: `const DANGEROUS_PATTERNS = [
  /<script[^>]*>/gi,
  /javascript:/gi,
  /on\\w+\\s*=/gi,
  /data:\\s*text\\/html/gi,
];

export function sanitizeString(input: string): string {
  let clean = input;
  for (const pattern of DANGEROUS_PATTERNS) {
    clean = clean.replace(pattern, '');
  }
  return clean
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export function sanitizeObject<T extends Record<string, unknown>>(
  obj: T
): T {
  const sanitized = { ...obj };
  for (const [key, value] of Object.entries(sanitized)) {
    if (typeof value === 'string') {
      (sanitized as Record<string, unknown>)[key] = sanitizeString(value);
    } else if (typeof value === 'object' && value !== null) {
      (sanitized as Record<string, unknown>)[key] = sanitizeObject(
        value as Record<string, unknown>
      );
    }
  }
  return sanitized;
}`,
    dependencies: [],
    quality: {
      securityChecks: ['XSS pattern removal', 'HTML entity encoding', 'recursive object sanitization'],
      performanceConsiderations: ['regex pre-compiled at module level', 'shallow copy for immutability'],
      antiPatterns: ['never rely solely on client-side sanitization', 'never use innerHTML with user input'],
      inspirationSource: 'OWASP XSS prevention cheat sheet',
    },
    testHint: 'Test script tags, event handlers, nested objects, clean input passthrough',
  },
];
