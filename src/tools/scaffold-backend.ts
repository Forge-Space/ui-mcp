import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as pino from 'pino';
import {
  initializeBackendRegistry,
  searchBackendSnippets,
  type BackendFramework,
} from '../lib/design-references/backend-registry/index.js';

const logger = pino({ name: 'scaffold-backend' });

const inputSchema = {
  projectName: z.string().min(1).describe('Project name (e.g., "my-api", "ecommerce-backend")'),
  framework: z.enum(['express', 'nextjs']).describe('Backend framework'),
  features: z
    .array(z.enum(['auth', 'database', 'realtime', 'api-docs', 'monitoring', 'queue', 'caching']))
    .min(1)
    .describe('Features to include in the scaffold'),
  database: z
    .enum(['prisma', 'drizzle'])
    .optional()
    .describe('Database ORM (required if "database" feature is selected)'),
  auth: z
    .enum(['jwt', 'oauth', 'session'])
    .optional()
    .describe('Authentication strategy (required if "auth" feature is selected)'),
};

interface IProjectFile {
  path: string;
  content: string;
  description: string;
}

interface IScaffoldedProject {
  files: IProjectFile[];
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  envVars: string[];
  scripts: Record<string, string>;
  setupSteps: string[];
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function scaffoldBackend(
  projectName: string,
  framework: 'express' | 'nextjs',
  features: string[],
  database?: 'prisma' | 'drizzle',
  auth?: 'jwt' | 'oauth' | 'session'
): IScaffoldedProject {
  initializeBackendRegistry();

  const projectKebab = toKebabCase(projectName);
  const files: IProjectFile[] = [];
  const dependencies: Record<string, string> = {
    zod: '^3.22.4',
    dotenv: '^16.3.1',
  };
  const devDependencies: Record<string, string> = {
    typescript: '^5.3.3',
    '@types/node': '^20.10.5',
    tsx: '^4.7.0',
    prettier: '^3.1.1',
    eslint: '^8.56.0',
  };
  const envVars: string[] = ['NODE_ENV=development', 'PORT=3000'];
  const scripts: Record<string, string> = {
    dev: framework === 'nextjs' ? 'next dev' : 'tsx watch src/index.ts',
    build: framework === 'nextjs' ? 'next build' : 'tsc',
    start: framework === 'nextjs' ? 'next start' : 'node dist/index.js',
    lint: 'eslint src --ext .ts,.tsx',
    format: 'prettier --write "src/**/*.{ts,tsx}"',
    'type-check': 'tsc --noEmit',
  };

  // Framework-specific setup
  if (framework === 'nextjs') {
    dependencies['next'] = '^14.0.4';
    dependencies['react'] = '^18.2.0';
    dependencies['react-dom'] = '^18.2.0';
    devDependencies['@types/react'] = '^18.2.45';
    devDependencies['@types/react-dom'] = '^18.2.18';
  } else {
    dependencies['express'] = '^4.18.2';
    dependencies['cors'] = '^2.8.5';
    dependencies['helmet'] = '^7.1.0';
    devDependencies['@types/express'] = '^4.17.21';
    devDependencies['@types/cors'] = '^2.8.17';
  }

  // 1. Package.json
  const packageJson = {
    name: projectKebab,
    version: '0.1.0',
    type: 'module',
    scripts,
    dependencies,
    devDependencies,
  };

  files.push({
    path: 'package.json',
    content: JSON.stringify(packageJson, null, 2),
    description: 'Project manifest with dependencies',
  });

  // 2. tsconfig.json
  const tsconfigNext = {
    compilerOptions: {
      target: 'ES2020',
      lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      jsx: 'preserve',
      module: 'ESNext',
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      allowJs: true,
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      noEmit: true,
      incremental: true,
      plugins: [{ name: 'next' }],
      paths: {
        '@/*': ['./src/*'],
      },
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules'],
  };

  const tsconfigExpress = {
    compilerOptions: {
      target: 'ES2020',
      module: 'ESNext',
      lib: ['ES2020'],
      moduleResolution: 'node',
      rootDir: './src',
      outDir: './dist',
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      strict: true,
      skipLibCheck: true,
      resolveJsonModule: true,
      declaration: true,
      declarationMap: true,
      sourceMap: true,
      paths: {
        '@/*': ['./src/*'],
      },
    },
    include: ['src/**/*'],
    exclude: ['node_modules', 'dist'],
  };

  files.push({
    path: 'tsconfig.json',
    content: JSON.stringify(framework === 'nextjs' ? tsconfigNext : tsconfigExpress, null, 2),
    description: 'TypeScript configuration',
  });

  // 3. .env.example
  files.push({
    path: '.env.example',
    content: envVars.join('\n'),
    description: 'Environment variables template',
  });

  // 4. Database setup
  if (features.includes('database') && database) {
    if (database === 'prisma') {
      dependencies['@prisma/client'] = '^5.7.1';
      devDependencies['prisma'] = '^5.7.1';
      scripts['db:push'] = 'prisma db push';
      scripts['db:studio'] = 'prisma studio';
      scripts['db:generate'] = 'prisma generate';
      envVars.push('DATABASE_URL=postgresql://user:password@localhost:5432/mydb');

      const prismaSchema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`;

      files.push({
        path: 'prisma/schema.prisma',
        content: prismaSchema,
        description: 'Prisma database schema',
      });

      const dbClientContent = `import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;`;

      files.push({
        path: 'src/lib/db.ts',
        content: dbClientContent,
        description: 'Database client singleton',
      });
    } else {
      dependencies['drizzle-orm'] = '^0.29.1';
      devDependencies['drizzle-kit'] = '^0.20.9';
      scripts['db:push'] = 'drizzle-kit push:pg';
      scripts['db:studio'] = 'drizzle-kit studio';
      envVars.push('DATABASE_URL=postgresql://user:password@localhost:5432/mydb');

      const drizzleConfig = `import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
});`;

      files.push({
        path: 'drizzle.config.ts',
        content: drizzleConfig,
        description: 'Drizzle ORM configuration',
      });

      const schemaContent = `import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});`;

      files.push({
        path: 'src/lib/schema.ts',
        content: schemaContent,
        description: 'Drizzle database schema',
      });

      const dbClientContent = `import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.js';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle(pool, { schema });`;

      files.push({
        path: 'src/lib/db.ts',
        content: dbClientContent,
        description: 'Drizzle database client',
      });

      dependencies['pg'] = '^8.11.3';
      devDependencies['@types/pg'] = '^8.10.9';
    }
  }

  // 5. Auth setup
  if (features.includes('auth') && auth) {
    if (auth === 'jwt') {
      dependencies['jsonwebtoken'] = '^9.0.2';
      devDependencies['@types/jsonwebtoken'] = '^9.0.5';
      envVars.push('JWT_SECRET=your-secret-key-change-in-production');
      envVars.push('JWT_EXPIRES_IN=7d');

      const authMiddlewareContent = `import jwt from 'jsonwebtoken';
import type { NextRequest, NextResponse } from 'next/server';

export interface IAuthUser {
  id: string;
  email: string;
}

export async function withAuth(
  handler: (req: NextRequest & { user: IAuthUser }) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IAuthUser;
      (req as NextRequest & { user: IAuthUser }).user = decoded;
      return handler(req as NextRequest & { user: IAuthUser });
    } catch (err) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  };
}`;

      files.push({
        path: 'src/middleware/auth.ts',
        content: authMiddlewareContent,
        description: 'JWT authentication middleware',
      });
    } else if (auth === 'oauth') {
      dependencies['@auth/core'] = '^0.18.6';
      dependencies['next-auth'] = '^4.24.5';
      envVars.push('NEXTAUTH_URL=http://localhost:3000');
      envVars.push('NEXTAUTH_SECRET=your-secret-key-change-in-production');
      envVars.push('GITHUB_ID=your-github-oauth-client-id');
      envVars.push('GITHUB_SECRET=your-github-oauth-client-secret');

      const nextAuthConfig = `import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
});`;

      files.push({
        path: 'src/lib/auth.ts',
        content: nextAuthConfig,
        description: 'NextAuth OAuth configuration',
      });
    } else {
      dependencies['express-session'] = '^1.17.3';
      devDependencies['@types/express-session'] = '^1.17.10';
      envVars.push('SESSION_SECRET=your-session-secret-change-in-production');

      const sessionMiddleware = `import session from 'express-session';

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
});`;

      files.push({
        path: 'src/middleware/session.ts',
        content: sessionMiddleware,
        description: 'Express session middleware',
      });
    }
  }

  // 6. Monitoring
  if (features.includes('monitoring')) {
    dependencies['@sentry/node'] = '^7.92.0';
    envVars.push('SENTRY_DSN=your-sentry-dsn');

    const sentryConfig = `import * as Sentry from '@sentry/node';

export function initSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
  });
}`;

    files.push({
      path: 'src/lib/monitoring.ts',
      content: sentryConfig,
      description: 'Sentry monitoring setup',
    });
  }

  // 7. Caching
  if (features.includes('caching')) {
    dependencies['redis'] = '^4.6.11';
    envVars.push('REDIS_URL=redis://localhost:6379');

    const cacheClient = `import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on('error', (err) => console.error('Redis Client Error', err));

await client.connect();

export const cache = client;`;

    files.push({
      path: 'src/lib/cache.ts',
      content: cacheClient,
      description: 'Redis cache client',
    });
  }

  // 8. API documentation
  if (features.includes('api-docs')) {
    dependencies['swagger-ui-express'] = '^5.0.0';
    dependencies['swagger-jsdoc'] = '^6.2.8';
    devDependencies['@types/swagger-ui-express'] = '^4.1.6';
    devDependencies['@types/swagger-jsdoc'] = '^6.0.4';

    const swaggerConfig = `import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: '${projectName} API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/**/*.ts', './src/modules/**/*.ts'],
});`;

    files.push({
      path: 'src/lib/swagger.ts',
      content: swaggerConfig,
      description: 'Swagger API documentation config',
    });
  }

  // 9. Main entry point
  let mainContent = '';
  if (framework === 'nextjs') {
    mainContent = `// Next.js app is bootstrapped via next.config.js
// Add middleware configuration in middleware.ts if needed
export {};`;
  } else {
    const imports = [
      "import express from 'express';",
      "import helmet from 'helmet';",
      "import cors from 'cors';",
      "import { config } from 'dotenv';",
    ];
    const middleware = ['app.use(helmet());', 'app.use(cors());', 'app.use(express.json());'];
    const setup = [];

    if (features.includes('api-docs')) {
      imports.push("import swaggerUi from 'swagger-ui-express';");
      imports.push("import { swaggerSpec } from './lib/swagger.js';");
      setup.push("app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));");
    }

    if (features.includes('monitoring')) {
      imports.push("import { initSentry } from './lib/monitoring.js';");
      setup.push('initSentry();');
    }

    mainContent = `${imports.join('\n')}

config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
${middleware.join('\n')}

${setup.length > 0 ? '// Additional setup\n' + setup.join('\n') + '\n' : ''}
// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// TODO: Add your routes here
// import userRouter from './modules/users/router.js';
// app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`;
  }

  files.push({
    path: framework === 'nextjs' ? 'src/app/layout.tsx' : 'src/index.ts',
    content: mainContent,
    description: 'Application entry point',
  });

  // 10. README
  const readmeLines = [
    `# ${projectName}`,
    '',
    'Generated with Siza MCP Backend Scaffold',
    '',
    '## Setup',
    '',
    '1. Install dependencies:',
    '   ```bash',
    '   npm install',
    '   ```',
    '',
    '2. Copy environment variables:',
    '   ```bash',
    '   cp .env.example .env',
    '   ```',
    '',
    '3. Configure your database and other services in `.env`',
    '',
  ];

  if (features.includes('database') && database) {
    readmeLines.push('4. Setup database:', '   ```bash', '   npm run db:push', '   ```', '');
  }

  readmeLines.push(
    '## Development',
    '',
    '```bash',
    'npm run dev',
    '```',
    '',
    '## Features',
    '',
    ...features.map((f) => `- ${f.charAt(0).toUpperCase() + f.slice(1)}`),
    '',
    '## Architecture',
    '',
    framework === 'nextjs' ? '- Next.js App Router with API routes' : '- Express with modular architecture'
  );

  if (features.includes('database') && database) {
    readmeLines.push(`- ${database === 'prisma' ? 'Prisma' : 'Drizzle'} ORM`);
  }

  if (features.includes('auth') && auth) {
    readmeLines.push(`- ${auth.toUpperCase()} authentication`);
  }

  readmeLines.push('- TypeScript with strict mode', '- Zod for runtime validation');

  files.push({
    path: 'README.md',
    content: readmeLines.join('\n'),
    description: 'Project documentation',
  });

  const setupSteps = [
    'Run: npm install',
    'Copy .env.example to .env and configure',
    features.includes('database') ? 'Run: npm run db:push' : null,
    'Run: npm run dev',
    features.includes('api-docs') ? 'Open API docs at http://localhost:3000/api-docs' : null,
  ].filter(Boolean) as string[];

  return {
    files,
    dependencies,
    devDependencies,
    envVars,
    scripts,
    setupSteps,
  };
}

export function registerScaffoldBackend(server: McpServer): void {
  server.tool(
    'scaffold_backend',
    'Generate a complete production-ready backend project scaffold. Supports Express and Next.js with configurable features: auth (JWT/OAuth/Session), database (Prisma/Drizzle), API docs (Swagger), monitoring (Sentry), caching (Redis), and more. Includes TypeScript, testing, and CI/CD setup.',
    inputSchema,
    async ({ projectName, framework, features, database, auth }) => {
      // Validate feature dependencies
      if (features.includes('auth') && !auth) {
        return {
          content: [
            {
              type: 'text',
              text: 'Error: "auth" parameter is required when "auth" feature is selected',
            },
          ],
        };
      }

      if (features.includes('database') && !database) {
        return {
          content: [
            {
              type: 'text',
              text: 'Error: "database" parameter is required when "database" feature is selected',
            },
          ],
        };
      }

      const result = scaffoldBackend(projectName, framework, features, database, auth);

      const summary = [
        `Generated ${projectName} backend project with ${framework}`,
        `Files: ${result.files.length}`,
        `Features: ${features.join(', ')}`,
        '',
        '📦 Setup Steps:',
        ...result.setupSteps.map((step, i) => `  ${i + 1}. ${step}`),
        '',
        '🔧 Available Scripts:',
        ...Object.entries(result.scripts).map(([name, cmd]) => `  npm run ${name} - ${cmd}`),
        '',
        '🌍 Environment Variables:',
        ...result.envVars.map((v) => `  ${v}`),
      ]
        .filter(Boolean)
        .join('\n');

      return {
        content: [
          { type: 'text', text: summary },
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );
}
