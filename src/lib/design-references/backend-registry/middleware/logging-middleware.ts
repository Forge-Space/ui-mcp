import type { IBackendSnippet } from '../types.js';

export const loggingMiddlewareSnippets: IBackendSnippet[] = [
  {
    id: 'mw-logging-structured',
    name: 'Structured Request Logger',
    category: 'middleware',
    type: 'logging',
    variant: 'structured',
    tags: ['logging', 'structured', 'pino', 'request', 'middleware'],
    framework: ['nextjs-api', 'express'],
    patterns: ['middleware-chain'],
    typescript: `import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  transport: process.env.NODE_ENV === 'development'
    ? { target: 'pino-pretty', options: { colorize: true } }
    : undefined,
  base: {
    service: process.env.SERVICE_NAME ?? 'api',
    env: process.env.NODE_ENV,
  },
  redact: ['req.headers.authorization', 'req.headers.cookie', '*.password', '*.token'],
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      userAgent: req.headers?.['user-agent'],
    }),
  },
});

export function requestLogger(
  handler: (req: Request) => Promise<Response>
) {
  return async (req: Request) => {
    const start = performance.now();
    const requestId = crypto.randomUUID();
    const child = logger.child({ requestId });
    child.info({ method: req.method, url: req.url }, 'request started');
    try {
      const response = await handler(req);
      const duration = Math.round(performance.now() - start);
      child.info(
        { status: response.status, duration },
        'request completed'
      );
      return response;
    } catch (error) {
      const duration = Math.round(performance.now() - start);
      child.error({ error, duration }, 'request failed');
      throw error;
    }
  };
}`,
    dependencies: ['pino', 'pino-pretty'],
    envVars: ['LOG_LEVEL', 'SERVICE_NAME'],
    quality: {
      securityChecks: ['redacts auth headers and sensitive fields', 'no password logging', 'request ID for tracing'],
      performanceConsiderations: [
        'pino is fastest Node.js logger',
        'child logger avoids object spread',
        'pretty only in dev',
      ],
      antiPatterns: [
        'never use console.log in production',
        'never log full request bodies',
        'never log sensitive data',
      ],
      inspirationSource: 'Pino documentation + 12-factor logging',
    },
    testHint: 'Test log output format, redacted fields, request ID propagation, duration tracking',
  },
];
