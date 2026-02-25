import type { IBackendSnippet } from '../types.js';

export const swaggerPatternSnippets: IBackendSnippet[] = [
  {
    id: 'doc-openapi-schema',
    name: 'OpenAPI Schema Generation',
    category: 'documentation',
    type: 'swagger',
    variant: 'openapi-schema',
    tags: ['documentation', 'openapi', 'swagger', 'api-docs'],
    framework: ['nextjs-api', 'express'],
    patterns: ['factory'],
    typescript: `import { z } from 'zod';
import { generateOpenApi } from '@anatine/zod-openapi';

const ItemSchema = z.object({
  id: z.string().uuid().openapi({ description: 'Unique item identifier' }),
  name: z.string().min(1).max(255).openapi({ example: 'My Item' }),
  status: z.enum(['draft', 'active', 'archived']).openapi({ default: 'draft' }),
  createdAt: z.string().datetime().openapi({ description: 'ISO 8601 timestamp' }),
});

const ErrorSchema = z.object({
  error: z.object({
    message: z.string(),
    code: z.string(),
    details: z.array(z.object({
      field: z.string(),
      message: z.string(),
    })).optional(),
  }),
});

export const openApiSpec = {
  openapi: '3.1.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Auto-generated from Zod schemas',
  },
  paths: {
    '/api/items': {
      get: {
        summary: 'List items',
        tags: ['Items'],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
        ],
        responses: {
          '200': {
            description: 'Success',
            content: { 'application/json': { schema: generateOpenApi(z.object({ data: z.array(ItemSchema) })) } },
          },
          '422': {
            description: 'Validation Error',
            content: { 'application/json': { schema: generateOpenApi(ErrorSchema) } },
          },
        },
      },
    },
  },
};`,
    dependencies: ['zod', '@anatine/zod-openapi'],
    quality: {
      securityChecks: ['schemas shared between validation and docs', 'error responses documented'],
      performanceConsiderations: ['generated at build time', 'Zod schemas are single source of truth'],
      antiPatterns: ['never maintain separate schema files', 'never skip error response documentation'],
      inspirationSource: 'Zod-to-OpenAPI integration patterns',
    },
    testHint: 'Test spec validates against OpenAPI 3.1, schema examples present, error responses documented',
  },
];
