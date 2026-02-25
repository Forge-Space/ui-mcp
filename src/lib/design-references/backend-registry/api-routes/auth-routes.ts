import type { IBackendSnippet } from '../types.js';

export const authRouteSnippets: IBackendSnippet[] = [
  {
    id: 'api-auth-login',
    name: 'Email/Password Login',
    category: 'api-route',
    type: 'auth',
    variant: 'login',
    tags: ['auth', 'login', 'email', 'password', 'jwt'],
    framework: ['nextjs-api', 'express'],
    patterns: ['service-layer'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authenticateUser } from '@/services/auth-service';
import { signToken } from '@/lib/jwt';
import { rateLimit } from '@/middleware/rate-limit';

const loginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8).max(128),
});

export const POST = rateLimit({ max: 5, windowMs: 60_000 })(
  async (req: NextRequest) => {
    const { email, password } = loginSchema.parse(await req.json());
    const user = await authenticateUser(email, password);
    const { accessToken, refreshToken } = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    const response = NextResponse.json({
      data: { user: { id: user.id, email: user.email, role: user.role } },
    });
    response.cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/api/auth',
    });
    response.headers.set('Authorization', \`Bearer \${accessToken}\`);
    return response;
  }
);`,
    dependencies: ['zod', 'next', 'jose'],
    envVars: ['JWT_SECRET', 'JWT_EXPIRES_IN'],
    quality: {
      securityChecks: [
        'rate limited 5/min',
        'httpOnly secure cookie for refresh',
        'password never returned',
        'email normalized',
      ],
      performanceConsiderations: ['bcrypt in service layer', 'short-lived access token'],
      antiPatterns: [
        'never store JWT in localStorage',
        'never return password hash',
        'never skip rate limiting on login',
      ],
      inspirationSource: 'OWASP authentication cheat sheet',
    },
    testHint: 'Test valid login, invalid password, non-existent email, rate limit exceeded',
  },
  {
    id: 'api-auth-register',
    name: 'User Registration',
    category: 'api-route',
    type: 'auth',
    variant: 'register',
    tags: ['auth', 'register', 'signup', 'onboarding'],
    framework: ['nextjs-api', 'express'],
    patterns: ['service-layer'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUser, isEmailTaken } from '@/services/user-service';
import { sendVerificationEmail } from '@/services/email-service';
import { rateLimit } from '@/middleware/rate-limit';

const registerSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8).max(128)
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[0-9]/, 'Must contain number'),
});

export const POST = rateLimit({ max: 3, windowMs: 60_000 })(
  async (req: NextRequest) => {
    const body = registerSchema.parse(await req.json());
    if (await isEmailTaken(body.email)) {
      return NextResponse.json(
        { error: { message: 'An account with this email already exists' } },
        { status: 409 }
      );
    }
    const user = await createUser(body);
    await sendVerificationEmail(user.email, user.verificationToken);
    return NextResponse.json(
      { data: { id: user.id, email: user.email } },
      { status: 201 }
    );
  }
);`,
    dependencies: ['zod', 'next'],
    quality: {
      securityChecks: [
        'password strength validation',
        'email uniqueness check',
        'rate limited 3/min',
        'verification email required',
      ],
      performanceConsiderations: ['async email sending', 'unique index on email in DB'],
      antiPatterns: ['never reveal if email exists via timing', 'never auto-login before verification'],
      inspirationSource: 'Auth.js registration patterns',
    },
    testHint: 'Test valid registration, duplicate email, weak password, rate limiting',
  },
  {
    id: 'api-auth-refresh',
    name: 'Token Refresh',
    category: 'api-route',
    type: 'auth',
    variant: 'refresh',
    tags: ['auth', 'refresh', 'token', 'jwt'],
    framework: ['nextjs-api', 'express'],
    patterns: ['service-layer'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { verifyRefreshToken, signToken } from '@/lib/jwt';
import { getUserById } from '@/services/user-service';
import { rateLimit } from '@/middleware/rate-limit';

export const POST = rateLimit({ max: 10, windowMs: 60_000 })(
  async (req: NextRequest) => {
    const refreshToken = req.cookies.get('refresh_token')?.value;
    if (!refreshToken) {
      return NextResponse.json(
        { error: { message: 'No refresh token' } },
        { status: 401 }
      );
    }
    const payload = await verifyRefreshToken(refreshToken);
    const user = await getUserById(payload.userId);
    if (!user || user.tokenVersion !== payload.tokenVersion) {
      const response = NextResponse.json(
        { error: { message: 'Invalid refresh token' } },
        { status: 401 }
      );
      response.cookies.delete('refresh_token');
      return response;
    }
    const tokens = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    const response = NextResponse.json({ data: { accessToken: tokens.accessToken } });
    response.cookies.set('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/api/auth',
    });
    return response;
  }
);`,
    dependencies: ['next', 'jose'],
    envVars: ['JWT_SECRET'],
    quality: {
      securityChecks: [
        'token version check for revocation',
        'httpOnly cookie rotation',
        'deletes cookie on invalid token',
      ],
      performanceConsiderations: ['user fetch validates account still active', 'token rotation on each refresh'],
      antiPatterns: ['never accept refresh token from body', 'never skip token version check'],
      inspirationSource: 'Auth0 token rotation best practices',
    },
    testHint: 'Test valid refresh, expired token, revoked token (version mismatch), missing cookie',
  },
  {
    id: 'api-auth-magic-link',
    name: 'Magic Link Authentication',
    category: 'api-route',
    type: 'auth',
    variant: 'magic-link',
    tags: ['auth', 'magic-link', 'passwordless', 'email'],
    framework: ['nextjs-api', 'express'],
    patterns: ['service-layer'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createMagicLink, verifyMagicLink } from '@/services/auth-service';
import { sendMagicLinkEmail } from '@/services/email-service';
import { signToken } from '@/lib/jwt';
import { rateLimit } from '@/middleware/rate-limit';

const requestSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
});

const verifySchema = z.object({
  token: z.string().min(32).max(128),
});

export const POST = rateLimit({ max: 3, windowMs: 300_000 })(
  async (req: NextRequest) => {
    const { email } = requestSchema.parse(await req.json());
    const link = await createMagicLink(email);
    if (link) await sendMagicLinkEmail(email, link.token);
    return NextResponse.json({
      data: { message: 'If the email exists, a magic link has been sent' },
    });
  }
);

export const GET = rateLimit({ max: 5, windowMs: 60_000 })(
  async (req: NextRequest) => {
    const token = req.nextUrl.searchParams.get('token') ?? '';
    const { token: validToken } = verifySchema.parse({ token });
    const user = await verifyMagicLink(validToken);
    const tokens = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    return NextResponse.redirect(
      new URL(\`/auth/callback?token=\${tokens.accessToken}\`, req.url)
    );
  }
);`,
    dependencies: ['zod', 'next', 'jose'],
    envVars: ['JWT_SECRET', 'MAGIC_LINK_EXPIRES_IN'],
    quality: {
      securityChecks: [
        'constant-time response prevents email enumeration',
        'magic link expires quickly',
        'rate limited',
        'single-use token',
      ],
      performanceConsiderations: ['async email sending', 'token indexed for fast lookup'],
      antiPatterns: ['never reveal if email exists', 'never allow magic link reuse'],
      inspirationSource: 'Slack magic link authentication flow',
    },
    testHint: 'Test request for existing/non-existing email, token verification, expired token, reuse',
  },
];
