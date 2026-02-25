import type { IBackendSnippet } from '../types.js';

export const secretsManagementSnippets: IBackendSnippet[] = [
  {
    id: 'sec-env-validation',
    name: 'Environment Variable Validation',
    category: 'security',
    type: 'secrets',
    variant: 'env-validation',
    tags: ['env', 'validation', 'secrets', 'config'],
    framework: ['framework-agnostic'],
    patterns: ['singleton'],
    typescript: `import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  REDIS_URL: z.string().url().optional(),
  SENTRY_DSN: z.string().url().optional(),
});

type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error('Invalid environment variables:', result.error.flatten().fieldErrors);
    throw new Error('Invalid environment configuration');
  }
  return result.data;
}

export const env = validateEnv();`,
    dependencies: ['zod'],
    envVars: ['DATABASE_URL', 'JWT_SECRET', 'STRIPE_SECRET_KEY', 'NEXT_PUBLIC_APP_URL'],
    quality: {
      securityChecks: ['fail-fast on missing secrets', 'type validation on all env vars', 'min length on JWT secret'],
      performanceConsiderations: ['validated once at startup', 'cached in module scope'],
      antiPatterns: [
        'never access process.env directly in code',
        'never have optional secrets that are actually required',
      ],
      inspirationSource: 'create-t3-app env validation pattern',
    },
    testHint: 'Test with valid env, missing required vars, invalid formats, optional vars',
  },
];
