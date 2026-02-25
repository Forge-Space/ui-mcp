import type { IBackendSnippet } from '../types.js';

export const corsSecuritySnippets: IBackendSnippet[] = [
  {
    id: 'mw-cors-config',
    name: 'CORS Configuration',
    category: 'middleware',
    type: 'cors',
    variant: 'config',
    tags: ['cors', 'security', 'headers', 'origin'],
    framework: ['nextjs-api', 'express'],
    patterns: ['middleware-chain'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_ORIGINS = new Set(
  (process.env.ALLOWED_ORIGINS ?? '').split(',').filter(Boolean)
);

export function cors(
  handler: (req: NextRequest) => Promise<NextResponse | Response>
) {
  return async (req: NextRequest) => {
    const origin = req.headers.get('origin') ?? '';
    if (req.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: corsHeaders(origin),
      });
    }
    const response = await handler(req);
    const headers = corsHeaders(origin);
    for (const [key, value] of Object.entries(headers)) {
      response.headers.set(key, value);
    }
    return response;
  };
}

function corsHeaders(origin: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Request-ID',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Allow-Credentials': 'true',
  };
  if (ALLOWED_ORIGINS.has(origin) || ALLOWED_ORIGINS.has('*')) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}`,
    dependencies: ['next'],
    envVars: ['ALLOWED_ORIGINS'],
    quality: {
      securityChecks: [
        'origin allowlist from env',
        'preflight caching via Max-Age',
        'credentials require specific origin',
      ],
      performanceConsiderations: ['Set lookup O(1)', 'preflight cached 24h', '204 for OPTIONS'],
      antiPatterns: ['never use Access-Control-Allow-Origin: * with credentials', 'never hardcode allowed origins'],
      inspirationSource: 'OWASP CORS security guidelines',
    },
    testHint: 'Test allowed origin, disallowed origin, preflight OPTIONS, credentials header',
  },
  {
    id: 'mw-security-headers',
    name: 'Security Headers',
    category: 'middleware',
    type: 'security',
    variant: 'headers',
    tags: ['security', 'csp', 'headers', 'helmet'],
    framework: ['nextjs-api', 'express'],
    patterns: ['middleware-chain'],
    typescript: `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '0',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
  ].join('; '),
};

export function middleware(req: NextRequest) {
  const response = NextResponse.next();
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}`,
    dependencies: ['next'],
    quality: {
      securityChecks: [
        'CSP prevents XSS',
        'HSTS enforces HTTPS',
        'frame-ancestors prevents clickjacking',
        'nosniff prevents MIME sniffing',
      ],
      performanceConsiderations: ['headers set once per response', 'HSTS preload list registration recommended'],
      antiPatterns: ['never disable CSP for convenience', 'never set X-XSS-Protection: 1 (can cause issues)'],
      inspirationSource: 'Next.js security headers documentation + OWASP',
    },
    testHint: 'Test all security headers present, CSP policy format, HSTS max-age',
  },
];
