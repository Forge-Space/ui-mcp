import type { IProjectTemplate, IDirectoryStructure, IConfigFile } from '../types.js';

const structure: IDirectoryStructure = {
  apps: {
    web: {
      src: {
        app: 'directory',
        components: 'directory',
        lib: 'directory',
      },
      public: 'directory',
      'package.json': 'file',
      'tsconfig.json': 'file',
      'next.config.js': 'file',
    },
    api: {
      src: {
        routes: 'directory',
        controllers: 'directory',
        services: 'directory',
        middleware: 'directory',
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
    core: {
      src: {
        types: 'directory',
        utils: 'directory',
        constants: 'directory',
        'index.ts': 'file',
      },
      'package.json': 'file',
      'tsconfig.json': 'file',
    },
    ui: {
      src: {
        components: 'directory',
        hooks: 'directory',
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
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
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
  "name": "fullstack-monorepo",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "test": "turbo run test",
    "clean": "turbo run clean && rm -rf node_modules",
    "format": "prettier --write '**/*.{ts,tsx,md}'"
  },
  "devDependencies": {
    "turbo": "^2.3.0",
    "@types/node": "^22.10.2",
    "typescript": "^5.7.2",
    "prettier": "^3.4.2",
    "eslint": "^9.18.0"
  },
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  },
  "packageManager": "pnpm@9.15.0"
}`,
  },
  {
    path: 'packages/core/package.json',
    content: `{
  "name": "@repo/core",
  "version": "0.1.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "lint": "eslint src",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "typescript": "^5.7.2",
    "eslint": "^9.18.0"
  }
}`,
  },
  {
    path: 'packages/ui/package.json',
    content: `{
  "name": "@repo/ui",
  "version": "0.1.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "lint": "eslint src",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^3.4.17",
    "clsx": "^2.1.1",
    "class-variance-authority": "^0.7.1"
  },
  "devDependencies": {
    "@types/react": "^19.0.6",
    "@types/react-dom": "^19.0.2",
    "typescript": "^5.7.2",
    "eslint": "^9.18.0"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}`,
  },
  {
    path: 'packages/db/package.json',
    content: `{
  "name": "@repo/db",
  "version": "0.1.0",
  "main": "./src/client.ts",
  "types": "./src/client.ts",
  "scripts": {
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "postinstall": "prisma generate"
  },
  "dependencies": {
    "@prisma/client": "^6.1.0"
  },
  "devDependencies": {
    "prisma": "^6.1.0",
    "typescript": "^5.7.2"
  }
}`,
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
      POSTGRES_DB: fullstack_dev
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
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fullstack_dev"

# Redis
REDIS_URL="redis://localhost:6379"

# Web App
NEXT_PUBLIC_API_URL="http://localhost:3001"

# API
PORT=3001
JWT_SECRET=""`,
  },
];

export const fullstackMonoTemplate: IProjectTemplate = {
  id: 'fullstack-mono',
  name: 'Fullstack Turborepo Monorepo',
  description: 'Fullstack monorepo with Next.js web app, Express API, and shared packages (inspired by cal.com)',
  appTypes: ['saas', 'dashboard', 'ecommerce'],
  scales: ['team', 'enterprise'],
  structure,
  dependencies: {
    next: '^15.1.6',
    react: '^19.0.0',
    'react-dom': '^19.0.0',
    express: '^4.21.2',
    '@prisma/client': '^6.1.0',
    zod: '^3.24.1',
    tailwindcss: '^3.4.17',
    clsx: '^2.1.1',
  },
  devDependencies: {
    turbo: '^2.3.0',
    '@types/node': '^22.10.2',
    '@types/react': '^19.0.6',
    '@types/react-dom': '^19.0.2',
    '@types/express': '^5.0.0',
    typescript: '^5.7.2',
    eslint: '^9.18.0',
    prettier: '^3.4.2',
    prisma: '^6.1.0',
    vitest: '^2.1.8',
  },
  scripts: {
    dev: 'turbo run dev',
    build: 'turbo run build',
    lint: 'turbo run lint',
    'type-check': 'turbo run type-check',
    test: 'turbo run test',
    clean: 'turbo run clean && rm -rf node_modules',
    format: 'prettier --write "**/*.{ts,tsx,md}"',
  },
  configFiles,
  features: [
    'Turborepo monorepo',
    'Next.js web app',
    'Express REST API',
    'Shared core package (types, utils)',
    'Shared UI component library',
    'Shared database package (Prisma)',
    'Docker Compose for local dev',
    'Parallel builds and caching',
    'Consistent TypeScript and ESLint configs',
  ],
};
