import type { IBackendSnippet } from '../types.js';

export const structuredLoggingSnippets: IBackendSnippet[] = [
  {
    id: 'obs-logging-pino',
    name: 'Pino Structured Logger',
    category: 'observability',
    type: 'logging',
    variant: 'pino',
    tags: ['logging', 'structured', 'pino', 'observability'],
    framework: ['nextjs-api', 'express'],
    patterns: ['singleton'],
    typescript: `import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: {
    paths: ['*.password', '*.token', '*.secret', 'req.headers.authorization'],
    censor: '[REDACTED]',
  },
  base: {
    service: process.env.SERVICE_NAME ?? 'app',
    version: process.env.npm_package_version,
  },
});

export function createRequestLogger(requestId: string) {
  return logger.child({ requestId });
}`,
    dependencies: ['pino'],
    envVars: ['LOG_LEVEL', 'SERVICE_NAME'],
    quality: {
      securityChecks: [
        'sensitive fields redacted',
        'no passwords or tokens logged',
        'structured format for log aggregation',
      ],
      performanceConsiderations: [
        'pino is 5x faster than winston',
        'child loggers avoid object spread',
        'async logging by default',
      ],
      antiPatterns: ['never use console.log in production services', 'never log full request/response bodies'],
      inspirationSource: 'Pino documentation + 12-factor app logging',
    },
    testHint: 'Test log level filtering, redaction, child logger context propagation',
  },
];
