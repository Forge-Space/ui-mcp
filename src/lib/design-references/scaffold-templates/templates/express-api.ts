import type { IProjectTemplate, IDirectoryStructure, IConfigFile } from '../types.js';

const structure: IDirectoryStructure = {
  src: {
    routes: {
      'index.ts': 'file',
      'health.ts': 'file',
      api: {
        v1: {
          'users.ts': 'file',
          'auth.ts': 'file',
        },
      },
    },
    controllers: {
      'user.controller.ts': 'file',
      'auth.controller.ts': 'file',
    },
    services: {
      'user.service.ts': 'file',
      'auth.service.ts': 'file',
      'email.service.ts': 'file',
    },
    repositories: {
      'user.repository.ts': 'file',
      'session.repository.ts': 'file',
    },
    middleware: {
      'auth.middleware.ts': 'file',
      'error.middleware.ts': 'file',
      'validation.middleware.ts': 'file',
      'logger.middleware.ts': 'file',
    },
    types: {
      'index.ts': 'file',
      'express.d.ts': 'file',
    },
    config: {
      'database.ts': 'file',
      'redis.ts': 'file',
      'env.ts': 'file',
    },
    utils: {
      'logger.ts': 'file',
      'errors.ts': 'file',
    },
    'server.ts': 'file',
    'app.ts': 'file',
  },
  prisma: {
    'schema.prisma': 'file',
  },
  docs: {
    'openapi.yaml': 'file',
  },
  tests: {
    unit: 'directory',
    integration: 'directory',
    'setup.ts': 'file',
  },
  'package.json': 'file',
  'tsconfig.json': 'file',
  '.env.example': 'file',
  Dockerfile: 'file',
  '.dockerignore': 'file',
  'README.md': 'file',
};

const configFiles: IConfigFile[] = [
  {
    path: 'package.json',
    content: `{
  "name": "express-api",
  "version": "1.0.0",
  "description": "Clean architecture REST API with Express and TypeScript",
  "main": "dist/server.js",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "lint": "eslint src --ext .ts",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "express": "^4.21.2",
    "@prisma/client": "^6.1.0",
    "zod": "^3.24.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "redis": "^4.7.0",
    "winston": "^3.17.0",
    "helmet": "^8.0.0",
    "cors": "^2.8.5",
    "compression": "^1.7.5",
    "express-rate-limit": "^7.5.0",
    "dotenv": "^16.4.7"
  },
  "devDependencies": {
    "@types/express": "^5.0.0",
    "@types/node": "^22.10.2",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.7",
    "@types/cors": "^2.8.17",
    "@types/compression": "^1.7.5",
    "typescript": "^5.7.2",
    "tsx": "^4.19.2",
    "eslint": "^9.18.0",
    "prettier": "^3.4.2",
    "vitest": "^2.1.8",
    "prisma": "^6.1.0"
  }
}`,
  },
  {
    path: 'tsconfig.json',
    content: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022"],
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}`,
  },
  {
    path: '.env.example',
    content: `# Server
NODE_ENV=development
PORT=3000
API_VERSION=v1

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/api_dev"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET=""
JWT_EXPIRES_IN="7d"

# CORS
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:3001"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100`,
  },
  {
    path: 'Dockerfile',
    content: `FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN npx prisma generate

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

USER expressjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "dist/server.js"]`,
  },
  {
    path: '.dockerignore',
    content: `node_modules
dist
.env
.env.local
.git
.gitignore
README.md
tests
*.log`,
  },
  {
    path: 'docs/openapi.yaml',
    content: `openapi: 3.0.3
info:
  title: Express API
  description: Clean architecture REST API
  version: 1.0.0
servers:
  - url: http://localhost:3000/api/v1
    description: Development server
paths:
  /health:
    get:
      summary: Health check
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: ok
  /users:
    get:
      summary: List users
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Users list
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT`,
  },
  {
    path: 'src/app.ts',
    content: `import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { loggerMiddleware } from './middleware/logger.middleware.js';
import routes from './routes/index.js';

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.ALLOWED_ORIGINS.split(',') }));
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(loggerMiddleware);

  app.use('/api', routes);

  app.use(errorMiddleware);

  return app;
};`,
  },
];

export const expressApiTemplate: IProjectTemplate = {
  id: 'express-api',
  name: 'Express REST API',
  description: 'Clean architecture REST API with Express, Prisma, Redis, and OpenAPI docs',
  appTypes: ['api'],
  scales: ['solo', 'team', 'enterprise'],
  structure,
  dependencies: {
    express: '^4.21.2',
    '@prisma/client': '^6.1.0',
    zod: '^3.24.1',
    bcryptjs: '^2.4.3',
    jsonwebtoken: '^9.0.2',
    redis: '^4.7.0',
    winston: '^3.17.0',
    helmet: '^8.0.0',
    cors: '^2.8.5',
    compression: '^1.7.5',
    'express-rate-limit': '^7.5.0',
    dotenv: '^16.4.7',
  },
  devDependencies: {
    '@types/express': '^5.0.0',
    '@types/node': '^22.10.2',
    '@types/bcryptjs': '^2.4.6',
    '@types/jsonwebtoken': '^9.0.7',
    '@types/cors': '^2.8.17',
    '@types/compression': '^1.7.5',
    typescript: '^5.7.2',
    tsx: '^4.19.2',
    eslint: '^9.18.0',
    prettier: '^3.4.2',
    vitest: '^2.1.8',
    prisma: '^6.1.0',
  },
  scripts: {
    dev: 'tsx watch src/server.ts',
    build: 'tsc',
    start: 'node dist/server.js',
    lint: 'eslint src --ext .ts',
    'type-check': 'tsc --noEmit',
    test: 'vitest',
    'test:ui': 'vitest --ui',
    'db:push': 'prisma db push',
    'db:migrate': 'prisma migrate dev',
    'db:studio': 'prisma studio',
  },
  configFiles,
  features: [
    'Clean architecture (routes → controllers → services → repositories)',
    'Prisma ORM with PostgreSQL',
    'Redis caching',
    'JWT authentication',
    'OpenAPI documentation',
    'Structured logging (Winston)',
    'Security headers (Helmet)',
    'Rate limiting',
    'CORS configuration',
    'Compression',
    'Docker support',
    'Zod validation',
  ],
};
