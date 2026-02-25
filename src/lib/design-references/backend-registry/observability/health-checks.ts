import type { IBackendSnippet } from '../types.js';

export const healthCheckSnippets: IBackendSnippet[] = [
  {
    id: 'obs-health-readiness',
    name: 'Readiness & Liveness Probes',
    category: 'observability',
    type: 'health',
    variant: 'readiness',
    tags: ['health', 'readiness', 'liveness', 'k8s', 'monitoring'],
    framework: ['nextjs-api', 'express'],
    patterns: ['service-layer'],
    typescript: `import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: Record<string, { status: string; latency?: number }>;
  uptime: number;
  version: string;
}

export async function GET(): Promise<NextResponse<HealthStatus>> {
  const checks: HealthStatus['checks'] = {};
  let overall: HealthStatus['status'] = 'healthy';

  const dbStart = performance.now();
  try {
    await prisma.$queryRaw\`SELECT 1\`;
    checks.database = { status: 'ok', latency: Math.round(performance.now() - dbStart) };
  } catch {
    checks.database = { status: 'error' };
    overall = 'unhealthy';
  }

  const status: HealthStatus = {
    status: overall,
    checks,
    uptime: process.uptime(),
    version: process.env.npm_package_version ?? 'unknown',
  };

  return NextResponse.json(status, {
    status: overall === 'healthy' ? 200 : 503,
    headers: { 'Cache-Control': 'no-store' },
  });
}`,
    dependencies: ['@prisma/client', 'next'],
    quality: {
      securityChecks: ['no-store prevents cached health status', 'no sensitive data in response', '503 for unhealthy'],
      performanceConsiderations: ['lightweight DB query', 'latency tracking per check', 'no cache on health endpoints'],
      antiPatterns: [
        'never cache health checks',
        'never include secrets in health response',
        'never return 200 when unhealthy',
      ],
      inspirationSource: 'Kubernetes probe patterns + Node.js health check best practices',
    },
    testHint: 'Test healthy state (200), DB down (503), response format, uptime value',
  },
];
