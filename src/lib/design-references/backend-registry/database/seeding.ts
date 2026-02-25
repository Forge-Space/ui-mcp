import type { IBackendSnippet } from '../types.js';

export const seedingSnippets: IBackendSnippet[] = [
  {
    id: 'db-seed-structured',
    name: 'Structured Seed Data',
    category: 'database',
    type: 'seeding',
    variant: 'structured',
    tags: ['seed', 'data', 'development', 'testing'],
    framework: ['framework-agnostic'],
    patterns: ['factory'],
    typescript: `import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const PLANS = [
  { id: 'plan_free', name: 'Free', price: 0, limits: { projects: 3 } },
  { id: 'plan_pro', name: 'Pro', price: 29, limits: { projects: 50 } },
  { id: 'plan_ent', name: 'Enterprise', price: 99, limits: { projects: -1 } },
] as const;

async function seed() {
  console.log('Seeding database...');
  for (const plan of PLANS) {
    await prisma.plan.upsert({
      where: { id: plan.id },
      update: plan,
      create: plan,
    });
  }
  const password = await hash('TestPassword123!', 12);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password,
      role: 'admin',
      planId: 'plan_ent',
    },
  });
  console.log('Seeding complete');
}

seed()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());`,
    dependencies: ['@prisma/client', 'bcryptjs'],
    quality: {
      securityChecks: ['seed password is test-only', 'upsert prevents duplicates', 'separate seed for dev only'],
      performanceConsiderations: ['upsert for idempotent seeds', 'disconnect after completion'],
      antiPatterns: ['never use seed passwords in production', 'never seed production DB accidentally'],
      inspirationSource: 'Prisma seed documentation',
    },
    testHint: 'Test idempotent seed execution, plan creation, user creation with hashed password',
  },
];
