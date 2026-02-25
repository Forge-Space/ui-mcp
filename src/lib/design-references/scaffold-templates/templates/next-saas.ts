import type { IProjectTemplate, IDirectoryStructure, IConfigFile } from '../types.js';

const structure: IDirectoryStructure = {
  apps: {
    web: {
      src: {
        app: {
          '(auth)': {
            signin: 'directory',
            signup: 'directory',
            'forgot-password': 'directory',
          },
          '(dashboard)': {
            dashboard: 'directory',
            settings: 'directory',
            billing: 'directory',
          },
          api: {
            auth: 'directory',
            webhooks: 'directory',
            trpc: 'directory',
          },
          'layout.tsx': 'file',
          'page.tsx': 'file',
        },
        components: {
          ui: 'directory',
          forms: 'directory',
          layouts: 'directory',
        },
        lib: {
          'utils.ts': 'file',
          'trpc.ts': 'file',
        },
        stores: 'directory',
        hooks: 'directory',
      },
      public: 'directory',
      'package.json': 'file',
      'tsconfig.json': 'file',
      'next.config.js': 'file',
      'tailwind.config.ts': 'file',
    },
    api: {
      src: {
        routes: 'directory',
        controllers: 'directory',
        services: 'directory',
        middleware: 'directory',
        types: 'directory',
        'server.ts': 'file',
      },
      'package.json': 'file',
      'tsconfig.json': 'file',
    },
    docs: {
      src: 'directory',
      'package.json': 'file',
    },
  },
  packages: {
    ui: {
      src: {
        components: 'directory',
        'index.ts': 'file',
      },
      'package.json': 'file',
      'tsconfig.json': 'file',
    },
    db: {
      prisma: {
        'schema.prisma': 'file',
      },
      src: {
        'client.ts': 'file',
        migrations: 'directory',
      },
      'package.json': 'file',
    },
    auth: {
      src: {
        'config.ts': 'file',
        providers: 'directory',
        'utils.ts': 'file',
      },
      'package.json': 'file',
    },
    config: {
      eslint: 'directory',
      typescript: 'directory',
      tailwind: 'directory',
    },
  },
  'package.json': 'file',
  'turbo.json': 'file',
  'pnpm-workspace.yaml': 'file',
  '.env.example': 'file',
  'docker-compose.yml': 'file',
  'README.md': 'file',
};

const configFiles: IConfigFile[] = [
  {
    path: 'turbo.json',
    content: `{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "type-check": {
      "dependsOn": ["^type-check"]
    },
    "test": {
      "dependsOn": ["^build"]
    }
  }
}`,
  },
  {
    path: 'pnpm-workspace.yaml',
    content: `packages:
  - 'apps/*'
  - 'packages/*'`,
  },
  {
    path: 'package.json',
    content: `{
  "name": "saas-monorepo",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "test": "turbo run test",
    "clean": "turbo run clean && rm -rf node_modules"
  },
  "devDependencies": {
    "turbo": "^2.3.0",
    "@types/node": "^22.10.2",
    "typescript": "^5.7.2",
    "prettier": "^3.4.2"
  },
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  },
  "packageManager": "pnpm@9.15.0"
}`,
  },
  {
    path: 'apps/web/tsconfig.json',
    content: `{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/stores/*": ["./src/stores/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`,
  },
  {
    path: 'apps/web/next.config.js',
    content: `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui', '@repo/auth', '@repo/db'],
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudflare.com',
      },
    ],
  },
};

module.exports = nextConfig;`,
  },
  {
    path: 'docker-compose.yml',
    content: `version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: saas_dev
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:`,
  },
  {
    path: '.env.example',
    content: `# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/saas_dev"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""

# OAuth Providers
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""

# Redis
REDIS_URL="redis://localhost:6379"

# Email
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASSWORD=""
SMTP_FROM=""`,
  },
];

export const nextSaasTemplate: IProjectTemplate = {
  id: 'next-saas',
  name: 'Next.js SaaS Monorepo',
  description: 'Production-ready SaaS monorepo with Next.js, tRPC, Prisma, Stripe, and Auth',
  appTypes: ['saas', 'dashboard'],
  scales: ['team', 'enterprise'],
  structure,
  dependencies: {
    next: '^15.1.6',
    react: '^19.0.0',
    'react-dom': '^19.0.0',
    '@trpc/server': '^11.0.0',
    '@trpc/client': '^11.0.0',
    '@trpc/react-query': '^11.0.0',
    '@tanstack/react-query': '^5.62.14',
    'next-auth': '^5.0.0-beta.25',
    stripe: '^17.5.0',
    '@stripe/stripe-js': '^5.2.0',
    prisma: '^6.1.0',
    '@prisma/client': '^6.1.0',
    zod: '^3.24.1',
    zustand: '^5.0.3',
    'react-hook-form': '^7.54.2',
    tailwindcss: '^3.4.17',
    clsx: '^2.1.1',
    'class-variance-authority': '^0.7.1',
  },
  devDependencies: {
    '@types/node': '^22.10.2',
    '@types/react': '^19.0.6',
    '@types/react-dom': '^19.0.2',
    typescript: '^5.7.2',
    eslint: '^9.18.0',
    'eslint-config-next': '^15.1.6',
    prettier: '^3.4.2',
    turbo: '^2.3.0',
    '@testing-library/react': '^16.1.0',
    '@testing-library/jest-dom': '^6.6.3',
    vitest: '^2.1.8',
  },
  scripts: {
    dev: 'turbo run dev',
    build: 'turbo run build',
    start: 'turbo run start',
    lint: 'turbo run lint',
    'type-check': 'turbo run type-check',
    test: 'turbo run test',
    'db:push': 'cd packages/db && prisma db push',
    'db:migrate': 'cd packages/db && prisma migrate dev',
    'db:studio': 'cd packages/db && prisma studio',
    clean: 'turbo run clean && rm -rf node_modules',
  },
  configFiles,
  features: [
    'Authentication (NextAuth)',
    'Database (Prisma + PostgreSQL)',
    'Payments (Stripe)',
    'tRPC API',
    'Shared UI components',
    'Monorepo (Turborepo)',
    'Docker Compose for local dev',
    'Type-safe forms (react-hook-form + zod)',
    'State management (Zustand)',
    'Email templates',
  ],
};
