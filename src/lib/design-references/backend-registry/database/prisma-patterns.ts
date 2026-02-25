import type { IBackendSnippet } from '../types.js';

export const prismaPatternSnippets: IBackendSnippet[] = [
  {
    id: 'db-prisma-singleton',
    name: 'Prisma Client Singleton',
    category: 'database',
    type: 'prisma',
    variant: 'singleton',
    tags: ['prisma', 'database', 'singleton', 'connection'],
    framework: ['nextjs-api', 'express'],
    patterns: ['singleton'],
    typescript: `import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}`,
    dependencies: ['@prisma/client'],
    envVars: ['DATABASE_URL'],
    quality: {
      securityChecks: ['prevents connection pool exhaustion in dev', 'query logging only in dev'],
      performanceConsiderations: ['singleton prevents multiple client instances', 'globalThis survives HMR'],
      antiPatterns: ['never create PrismaClient per request', 'never log queries in production'],
      inspirationSource: 'Next.js + Prisma official documentation',
    },
    testHint: 'Test singleton behavior, same instance returned, dev vs prod logging config',
  },
  {
    id: 'db-prisma-transaction',
    name: 'Prisma Transaction Pattern',
    category: 'database',
    type: 'prisma',
    variant: 'transaction',
    tags: ['prisma', 'transaction', 'atomic', 'rollback'],
    framework: ['framework-agnostic'],
    patterns: ['repository'],
    typescript: `import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function transferCredits(
  fromUserId: string,
  toUserId: string,
  amount: number
): Promise<void> {
  await prisma.$transaction(async (tx) => {
    const sender = await tx.user.findUniqueOrThrow({
      where: { id: fromUserId },
      select: { credits: true },
    });
    if (sender.credits < amount) {
      throw new Error('Insufficient credits');
    }
    await tx.user.update({
      where: { id: fromUserId },
      data: { credits: { decrement: amount } },
    });
    await tx.user.update({
      where: { id: toUserId },
      data: { credits: { increment: amount } },
    });
    await tx.transaction.create({
      data: {
        fromUserId,
        toUserId,
        amount,
        type: 'transfer',
      },
    });
  }, {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    maxWait: 5000,
    timeout: 10000,
  });
}`,
    dependencies: ['@prisma/client'],
    quality: {
      securityChecks: [
        'serializable isolation prevents race conditions',
        'balance check inside transaction',
        'audit trail created',
      ],
      performanceConsiderations: [
        'timeout prevents long-running locks',
        'maxWait limits queue time',
        'select only needed fields',
      ],
      antiPatterns: ['never check balance outside transaction', 'never skip audit trail for financial ops'],
      inspirationSource: 'Prisma interactive transactions documentation',
    },
    testHint: 'Test successful transfer, insufficient balance, concurrent transfers, timeout',
  },
  {
    id: 'db-prisma-soft-delete',
    name: 'Prisma Soft Delete Middleware',
    category: 'database',
    type: 'prisma',
    variant: 'soft-delete',
    tags: ['prisma', 'soft-delete', 'middleware', 'data-retention'],
    framework: ['framework-agnostic'],
    patterns: ['middleware-chain'],
    typescript: `import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

prisma.$use(async (params, next) => {
  if (params.action === 'delete') {
    params.action = 'update';
    params.args.data = { deletedAt: new Date() };
  }
  if (params.action === 'deleteMany') {
    params.action = 'updateMany';
    if (params.args.data !== undefined) {
      params.args.data.deletedAt = new Date();
    } else {
      params.args.data = { deletedAt: new Date() };
    }
  }
  if (params.action === 'findFirst' || params.action === 'findMany') {
    if (!params.args) params.args = {};
    if (!params.args.where) params.args.where = {};
    if (params.args.where.deletedAt === undefined) {
      params.args.where.deletedAt = null;
    }
  }
  return next(params);
});`,
    dependencies: ['@prisma/client'],
    quality: {
      securityChecks: [
        'delete becomes soft delete transparently',
        'queries auto-filter deleted records',
        'data retention for compliance',
      ],
      performanceConsiderations: ['index on deletedAt recommended', 'archive old soft-deleted records periodically'],
      antiPatterns: ['never hard delete user data without legal review', 'never forget to filter in aggregations'],
      inspirationSource: 'Prisma middleware documentation + GDPR patterns',
    },
    testHint: 'Test delete marks deletedAt, find excludes deleted, explicit deletedAt query includes deleted',
  },
];
