import type { IBackendSnippet } from '../types.js';

export const cleanArchitectureSnippets: IBackendSnippet[] = [
  {
    id: 'arch-clean-controller',
    name: 'Clean Architecture Controller',
    category: 'architecture',
    type: 'clean-architecture',
    variant: 'controller',
    tags: ['clean-architecture', 'controller', 'layer', 'separation'],
    framework: ['nextjs-api', 'express'],
    patterns: ['clean-architecture', 'service-layer'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { CreateItemUseCase } from '@/use-cases/create-item';
import { ItemRepository } from '@/repositories/item-repository';
import { withAuth } from '@/middleware/auth';
import { withErrorHandler } from '@/middleware/error-handler';

const createItemSchema = z.object({
  name: z.string().min(1).max(255).trim(),
  description: z.string().max(2000).optional(),
});

const repository = new ItemRepository();
const createItemUseCase = new CreateItemUseCase(repository);

export const POST = withErrorHandler(
  withAuth(async (req: NextRequest) => {
    const input = createItemSchema.parse(await req.json());
    const result = await createItemUseCase.execute({
      ...input,
      userId: req.auth.userId,
    });
    return NextResponse.json({ data: result }, { status: 201 });
  })
);`,
    dependencies: ['zod', 'next'],
    quality: {
      securityChecks: [
        'controller only handles HTTP concerns',
        'validation at boundary',
        'no business logic in controller',
      ],
      performanceConsiderations: ['dependency injection enables testing', 'use case is pure business logic'],
      antiPatterns: ['never put DB queries in controllers', 'never skip validation at the boundary'],
      inspirationSource: 'Uncle Bob Clean Architecture + nodebestpractices',
    },
    testHint: 'Test controller with mocked use case, validate HTTP status codes and response format',
  },
  {
    id: 'arch-clean-use-case',
    name: 'Clean Architecture Use Case',
    category: 'architecture',
    type: 'clean-architecture',
    variant: 'use-case',
    tags: ['clean-architecture', 'use-case', 'business-logic', 'domain'],
    framework: ['framework-agnostic'],
    patterns: ['clean-architecture', 'repository'],
    typescript: `import type { IItemRepository } from '@/repositories/interfaces';
import { ConflictError } from '@/lib/errors';

interface CreateItemInput {
  name: string;
  description?: string;
  userId: string;
}

interface CreateItemOutput {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
}

export class CreateItemUseCase {
  constructor(private readonly repository: IItemRepository) {}

  async execute(input: CreateItemInput): Promise<CreateItemOutput> {
    const existing = await this.repository.findByName(
      input.name,
      input.userId
    );
    if (existing) {
      throw new ConflictError(\`Item "\${input.name}" already exists\`);
    }
    const item = await this.repository.create({
      name: input.name,
      description: input.description ?? null,
      userId: input.userId,
    });
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      createdAt: item.createdAt,
    };
  }
}`,
    dependencies: [],
    quality: {
      securityChecks: [
        'no HTTP/framework dependency',
        'business rules enforced here',
        'output DTO strips internal fields',
      ],
      performanceConsiderations: ['repository interface enables caching layer', 'single responsibility'],
      antiPatterns: ['never import Express/Next.js in use cases', 'never expose DB model directly'],
      inspirationSource: 'node.js-clean-architecture use case pattern',
    },
    testHint: 'Test with mock repository: successful creation, duplicate name conflict, missing fields',
  },
  {
    id: 'arch-clean-repository',
    name: 'Clean Architecture Repository',
    category: 'architecture',
    type: 'clean-architecture',
    variant: 'repository',
    tags: ['clean-architecture', 'repository', 'data-access', 'persistence'],
    framework: ['framework-agnostic'],
    patterns: ['repository', 'clean-architecture'],
    typescript: `import { PrismaClient } from '@prisma/client';

export interface IItemRepository {
  findById(id: string): Promise<Item | null>;
  findByName(name: string, userId: string): Promise<Item | null>;
  findMany(params: ListParams): Promise<{ data: Item[]; total: number }>;
  create(input: CreateInput): Promise<Item>;
  update(id: string, input: UpdateInput): Promise<Item>;
  delete(id: string): Promise<void>;
}

interface Item {
  id: string;
  name: string;
  description: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ListParams {
  userId: string;
  page: number;
  limit: number;
  sort: string;
  order: 'asc' | 'desc';
}

interface CreateInput {
  name: string;
  description: string | null;
  userId: string;
}

interface UpdateInput {
  name?: string;
  description?: string | null;
}

export class ItemRepository implements IItemRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Item | null> {
    return this.prisma.item.findUnique({ where: { id } });
  }

  async findByName(name: string, userId: string): Promise<Item | null> {
    return this.prisma.item.findFirst({ where: { name, userId } });
  }

  async findMany(params: ListParams) {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.item.findMany({
        where: { userId: params.userId },
        orderBy: { [params.sort]: params.order },
        skip: (params.page - 1) * params.limit,
        take: params.limit,
      }),
      this.prisma.item.count({ where: { userId: params.userId } }),
    ]);
    return { data, total };
  }

  async create(input: CreateInput): Promise<Item> {
    return this.prisma.item.create({ data: input });
  }

  async update(id: string, input: UpdateInput): Promise<Item> {
    return this.prisma.item.update({ where: { id }, data: input });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.item.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}`,
    dependencies: ['@prisma/client'],
    quality: {
      securityChecks: ['interface enables mock injection', 'soft delete by default', 'user-scoped queries'],
      performanceConsiderations: [
        '$transaction for count + data',
        'skip/take for pagination',
        'sorted queries use index',
      ],
      antiPatterns: ['never hard delete by default', 'never expose Prisma types outside repository'],
      inspirationSource: 'Prisma official best practices + repository pattern',
    },
    testHint: 'Test CRUD operations, pagination, soft delete, transaction behavior',
  },
];
