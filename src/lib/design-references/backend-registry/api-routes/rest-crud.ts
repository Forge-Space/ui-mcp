import type { IBackendSnippet } from '../types.js';

export const restCrudSnippets: IBackendSnippet[] = [
  {
    id: 'api-crud-list',
    name: 'RESTful List Endpoint',
    category: 'api-route',
    type: 'crud',
    variant: 'list',
    tags: ['rest', 'crud', 'list', 'get', 'collection'],
    framework: ['nextjs-api', 'express'],
    patterns: ['service-layer', 'repository'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getItems } from '@/services/item-service';
import { withAuth } from '@/middleware/auth';

const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.enum(['createdAt', 'updatedAt', 'name']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export const GET = withAuth(async (req: NextRequest) => {
  const params = querySchema.parse(
    Object.fromEntries(req.nextUrl.searchParams)
  );
  const { data, total } = await getItems(params);
  return NextResponse.json({
    data,
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      totalPages: Math.ceil(total / params.limit),
    },
  });
});`,
    dependencies: ['zod', 'next'],
    quality: {
      securityChecks: ['auth middleware wraps handler', 'Zod validates all query params'],
      performanceConsiderations: ['limit capped at 100', 'pagination prevents full table scan'],
      antiPatterns: ['never return unbounded collections', 'avoid SELECT * in service layer'],
      inspirationSource: 'goldbergyoni/nodebestpractices pagination patterns',
    },
    testHint: 'Test with valid/invalid page params, empty results, max limit boundary',
  },
  {
    id: 'api-crud-get-by-id',
    name: 'RESTful Get By ID',
    category: 'api-route',
    type: 'crud',
    variant: 'get-by-id',
    tags: ['rest', 'crud', 'get', 'single', 'detail'],
    framework: ['nextjs-api', 'express'],
    patterns: ['service-layer', 'repository'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getItemById } from '@/services/item-service';
import { withAuth } from '@/middleware/auth';
import { NotFoundError } from '@/lib/errors';

const paramsSchema = z.object({
  id: z.string().uuid('Invalid item ID format'),
});

export const GET = withAuth(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = paramsSchema.parse(params);
    const item = await getItemById(id);
    if (!item) throw new NotFoundError('Item not found');
    return NextResponse.json({ data: item });
  }
);`,
    dependencies: ['zod', 'next'],
    quality: {
      securityChecks: ['UUID validation prevents injection', 'auth check before data access'],
      performanceConsiderations: ['single record fetch by primary key', 'consider caching for hot records'],
      antiPatterns: ['never expose internal IDs without validation', 'never return raw DB records'],
      inspirationSource: 'Next.js App Router API patterns',
    },
    testHint: 'Test with valid UUID, invalid UUID format, non-existent ID (404)',
  },
  {
    id: 'api-crud-create',
    name: 'RESTful Create Endpoint',
    category: 'api-route',
    type: 'crud',
    variant: 'create',
    tags: ['rest', 'crud', 'post', 'create'],
    framework: ['nextjs-api', 'express'],
    patterns: ['service-layer', 'repository'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createItem } from '@/services/item-service';
import { withAuth } from '@/middleware/auth';

const createSchema = z.object({
  name: z.string().min(1).max(255).trim(),
  description: z.string().max(2000).optional(),
  status: z.enum(['draft', 'active', 'archived']).default('draft'),
});

export const POST = withAuth(async (req: NextRequest) => {
  const body = createSchema.parse(await req.json());
  const item = await createItem({
    ...body,
    createdBy: req.auth.userId,
  });
  return NextResponse.json({ data: item }, { status: 201 });
});`,
    dependencies: ['zod', 'next'],
    quality: {
      securityChecks: ['Zod validates + trims input', 'auth userId from token not body', 'max length prevents abuse'],
      performanceConsiderations: ['201 status for created resources', 'return created item to avoid extra fetch'],
      antiPatterns: ['never trust client-provided userId', 'never skip input validation'],
      inspirationSource: 'bulletproof-react API patterns',
    },
    testHint: 'Test with valid body, missing required fields, exceeding max lengths, unauthorized',
  },
  {
    id: 'api-crud-update',
    name: 'RESTful Update Endpoint',
    category: 'api-route',
    type: 'crud',
    variant: 'update',
    tags: ['rest', 'crud', 'put', 'patch', 'update'],
    framework: ['nextjs-api', 'express'],
    patterns: ['service-layer', 'repository'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { updateItem, getItemById } from '@/services/item-service';
import { withAuth } from '@/middleware/auth';
import { NotFoundError, ForbiddenError } from '@/lib/errors';

const updateSchema = z.object({
  name: z.string().min(1).max(255).trim().optional(),
  description: z.string().max(2000).optional(),
  status: z.enum(['draft', 'active', 'archived']).optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided',
});

export const PATCH = withAuth(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const existing = await getItemById(params.id);
    if (!existing) throw new NotFoundError('Item not found');
    if (existing.createdBy !== req.auth.userId) {
      throw new ForbiddenError('Not authorized to update this item');
    }
    const body = updateSchema.parse(await req.json());
    const updated = await updateItem(params.id, body);
    return NextResponse.json({ data: updated });
  }
);`,
    dependencies: ['zod', 'next'],
    quality: {
      securityChecks: [
        'ownership check before update',
        'partial update with optional fields',
        'non-empty body validation',
      ],
      performanceConsiderations: ['PATCH for partial updates', 'single fetch + update pattern'],
      antiPatterns: ['never allow updating another users resources', 'never accept PUT for partial updates'],
      inspirationSource: 'nodebestpractices PATCH vs PUT patterns',
    },
    testHint: 'Test partial update, empty body rejection, ownership check, non-existent item',
  },
  {
    id: 'api-crud-delete',
    name: 'RESTful Delete Endpoint',
    category: 'api-route',
    type: 'crud',
    variant: 'delete',
    tags: ['rest', 'crud', 'delete', 'remove'],
    framework: ['nextjs-api', 'express'],
    patterns: ['service-layer', 'repository'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { deleteItem, getItemById } from '@/services/item-service';
import { withAuth } from '@/middleware/auth';
import { NotFoundError, ForbiddenError } from '@/lib/errors';

export const DELETE = withAuth(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const existing = await getItemById(params.id);
    if (!existing) throw new NotFoundError('Item not found');
    if (existing.createdBy !== req.auth.userId) {
      throw new ForbiddenError('Not authorized to delete this item');
    }
    await deleteItem(params.id);
    return new NextResponse(null, { status: 204 });
  }
);`,
    dependencies: ['next'],
    quality: {
      securityChecks: ['ownership verification before delete', '204 No Content — no data leak'],
      performanceConsiderations: ['soft delete in service layer recommended', '204 with empty body'],
      antiPatterns: ['never hard delete without audit trail', 'never return deleted entity data'],
      inspirationSource: 'REST API design best practices',
    },
    testHint: 'Test successful delete (204), not found (404), unauthorized (403)',
  },
];
