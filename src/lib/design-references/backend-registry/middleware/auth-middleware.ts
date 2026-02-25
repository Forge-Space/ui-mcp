import type { IBackendSnippet } from '../types.js';

export const authMiddlewareSnippets: IBackendSnippet[] = [
  {
    id: 'mw-auth-jwt',
    name: 'JWT Authentication Middleware',
    category: 'middleware',
    type: 'auth',
    variant: 'jwt',
    tags: ['auth', 'jwt', 'bearer', 'token', 'middleware'],
    framework: ['nextjs-api', 'express'],
    patterns: ['middleware-chain', 'decorator'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

interface AuthPayload {
  userId: string;
  email: string;
  role: string;
}

declare module 'next/server' {
  interface NextRequest {
    auth: AuthPayload;
  }
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export function withAuth(
  handler: (req: NextRequest, ctx: unknown) => Promise<NextResponse>
) {
  return async (req: NextRequest, ctx: unknown) => {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json(
        { error: { message: 'Authentication required' } },
        { status: 401 }
      );
    }
    try {
      const { payload } = await jwtVerify(token, secret);
      (req as unknown as Record<string, unknown>).auth = {
        userId: payload.sub as string,
        email: payload.email as string,
        role: payload.role as string,
      };
    } catch {
      return NextResponse.json(
        { error: { message: 'Invalid or expired token' } },
        { status: 401 }
      );
    }
    return handler(req, ctx);
  };
}`,
    dependencies: ['jose', 'next'],
    envVars: ['JWT_SECRET'],
    quality: {
      securityChecks: [
        'jose library for JWT (not jsonwebtoken)',
        'Bearer prefix stripped',
        'generic error message hides details',
      ],
      performanceConsiderations: ['jose is Edge-compatible', 'TextEncoder secret cached at module level'],
      antiPatterns: ['never use jsonwebtoken in Edge runtime', 'never expose token validation errors to client'],
      inspirationSource: 'Auth.js JWT session strategy',
    },
    testHint: 'Test valid token, expired token, malformed token, missing Authorization header',
  },
  {
    id: 'mw-auth-rbac',
    name: 'Role-Based Access Control',
    category: 'middleware',
    type: 'auth',
    variant: 'rbac',
    tags: ['auth', 'rbac', 'roles', 'permissions', 'middleware'],
    framework: ['nextjs-api', 'express'],
    patterns: ['middleware-chain', 'strategy'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';

type Role = 'admin' | 'editor' | 'viewer';

const ROLE_HIERARCHY: Record<Role, number> = {
  admin: 3,
  editor: 2,
  viewer: 1,
};

export function requireRole(minimumRole: Role) {
  return function (
    handler: (req: NextRequest, ctx: unknown) => Promise<NextResponse>
  ) {
    return async (req: NextRequest, ctx: unknown) => {
      const userRole = (req as unknown as Record<string, { role: Role }>)
        .auth?.role;
      if (!userRole || ROLE_HIERARCHY[userRole] < ROLE_HIERARCHY[minimumRole]) {
        return NextResponse.json(
          { error: { message: 'Insufficient permissions' } },
          { status: 403 }
        );
      }
      return handler(req, ctx);
    };
  };
}`,
    dependencies: ['next'],
    quality: {
      securityChecks: [
        'role hierarchy prevents privilege escalation',
        'generic error message',
        'composable with auth middleware',
      ],
      performanceConsiderations: ['O(1) role lookup', 'no DB call needed for basic RBAC'],
      antiPatterns: ['never check roles by string equality only', 'never hardcode role checks in route handlers'],
      inspirationSource: 'CASL/ABAC permission patterns simplified',
    },
    testHint: 'Test admin access all, editor restricted, viewer denied, missing role',
  },
  {
    id: 'mw-auth-api-key',
    name: 'API Key Authentication',
    category: 'middleware',
    type: 'auth',
    variant: 'api-key',
    tags: ['auth', 'api-key', 'service', 'machine-to-machine'],
    framework: ['nextjs-api', 'express'],
    patterns: ['middleware-chain'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { getApiKeyRecord } from '@/services/api-key-service';

export function withApiKey(
  handler: (req: NextRequest, ctx: unknown) => Promise<NextResponse>
) {
  return async (req: NextRequest, ctx: unknown) => {
    const apiKey = req.headers.get('x-api-key');
    if (!apiKey) {
      return NextResponse.json(
        { error: { message: 'API key required' } },
        { status: 401 }
      );
    }
    const keyHash = crypto
      .createHash('sha256')
      .update(apiKey)
      .digest('hex');
    const record = await getApiKeyRecord(keyHash);
    if (!record || record.revokedAt) {
      return NextResponse.json(
        { error: { message: 'Invalid API key' } },
        { status: 401 }
      );
    }
    (req as unknown as Record<string, unknown>).auth = {
      userId: record.userId,
      scope: record.scope,
      keyId: record.id,
    };
    return handler(req, ctx);
  };
}`,
    dependencies: ['next'],
    quality: {
      securityChecks: [
        'key hashed before lookup (never stored raw)',
        'revocation check',
        'scope attached for fine-grained access',
      ],
      performanceConsiderations: ['hash lookup is O(1) with index', 'consider caching key records'],
      antiPatterns: ['never store API keys in plaintext', 'never skip revocation check'],
      inspirationSource: 'Stripe API key authentication model',
    },
    testHint: 'Test valid key, revoked key, missing header, invalid key hash',
  },
];
