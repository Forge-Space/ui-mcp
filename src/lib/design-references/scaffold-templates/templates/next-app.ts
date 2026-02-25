import type { IProjectTemplate, IDirectoryStructure, IConfigFile } from '../types.js';

const structure: IDirectoryStructure = {
  src: {
    app: {
      '(routes)': {
        about: 'directory',
        contact: 'directory',
      },
      api: {
        trpc: 'directory',
      },
      'layout.tsx': 'file',
      'page.tsx': 'file',
      'globals.css': 'file',
    },
    server: {
      api: {
        routers: 'directory',
        'trpc.ts': 'file',
        'root.ts': 'file',
      },
      db: {
        'index.ts': 'file',
      },
      auth: {
        'config.ts': 'file',
      },
    },
    components: {
      ui: 'directory',
      forms: 'directory',
      layouts: 'directory',
    },
    lib: {
      'utils.ts': 'file',
      'validations.ts': 'file',
    },
    hooks: {
      'use-toast.ts': 'file',
    },
    stores: {
      'user.ts': 'file',
    },
    types: {
      'index.ts': 'file',
    },
    'env.js': 'file',
  },
  public: {
    'favicon.ico': 'file',
    images: 'directory',
  },
  prisma: {
    'schema.prisma': 'file',
  },
  'package.json': 'file',
  'tsconfig.json': 'file',
  'next.config.js': 'file',
  'tailwind.config.ts': 'file',
  'postcss.config.js': 'file',
  '.env.example': 'file',
  '.eslintrc.cjs': 'file',
  'prettier.config.js': 'file',
  'README.md': 'file',
};

const configFiles: IConfigFile[] = [
  {
    path: 'package.json',
    content: `{
  "name": "next-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "postinstall": "prisma generate"
  },
  "dependencies": {
    "next": "^15.1.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@trpc/server": "^11.0.0",
    "@trpc/client": "^11.0.0",
    "@trpc/react-query": "^11.0.0",
    "@tanstack/react-query": "^5.62.14",
    "next-auth": "^5.0.0-beta.25",
    "@prisma/client": "^6.1.0",
    "zod": "^3.24.1",
    "zustand": "^5.0.3",
    "react-hook-form": "^7.54.2",
    "@hookform/resolvers": "^3.9.1",
    "tailwindcss": "^3.4.17",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "lucide-react": "^0.468.0"
  },
  "devDependencies": {
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.6",
    "@types/react-dom": "^19.0.2",
    "typescript": "^5.7.2",
    "eslint": "^9.18.0",
    "eslint-config-next": "^15.1.6",
    "prettier": "^3.4.2",
    "prettier-plugin-tailwindcss": "^0.6.9",
    "prisma": "^6.1.0"
  }
}`,
  },
  {
    path: 'tsconfig.json',
    content: `{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`,
  },
  {
    path: 'next.config.js',
    content: `import './src/env.js';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

export default config;`,
  },
  {
    path: 'tailwind.config.ts',
    content: `import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};

export default config;`,
  },
  {
    path: '.env.example',
    content: `# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_dev"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""

# OAuth
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""`,
  },
  {
    path: '.eslintrc.cjs',
    content: `/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['next/core-web-vitals'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
  },
};

module.exports = config;`,
  },
  {
    path: 'src/env.js',
    content: `import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.string().url(),
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});`,
  },
];

export const nextAppTemplate: IProjectTemplate = {
  id: 'next-app',
  name: 'Next.js App (T3 Stack)',
  description: 'Single Next.js app inspired by create-t3-app with tRPC, Prisma, and NextAuth',
  appTypes: ['saas', 'dashboard', 'landing'],
  scales: ['solo', 'team'],
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
    '@prisma/client': '^6.1.0',
    zod: '^3.24.1',
    zustand: '^5.0.3',
    'react-hook-form': '^7.54.2',
    '@hookform/resolvers': '^3.9.1',
    tailwindcss: '^3.4.17',
    clsx: '^2.1.1',
    'tailwind-merge': '^2.6.0',
    'lucide-react': '^0.468.0',
    '@t3-oss/env-nextjs': '^0.11.1',
  },
  devDependencies: {
    '@types/node': '^22.10.2',
    '@types/react': '^19.0.6',
    '@types/react-dom': '^19.0.2',
    typescript: '^5.7.2',
    eslint: '^9.18.0',
    'eslint-config-next': '^15.1.6',
    prettier: '^3.4.2',
    'prettier-plugin-tailwindcss': '^0.6.9',
    prisma: '^6.1.0',
  },
  scripts: {
    dev: 'next dev',
    build: 'next build',
    start: 'next start',
    lint: 'next lint',
    'type-check': 'tsc --noEmit',
    'db:push': 'prisma db push',
    'db:migrate': 'prisma migrate dev',
    'db:studio': 'prisma studio',
    postinstall: 'prisma generate',
  },
  configFiles,
  features: [
    'Next.js 15 App Router',
    'tRPC for type-safe API',
    'Prisma ORM',
    'NextAuth v5',
    'Type-safe environment variables',
    'Zustand state management',
    'React Hook Form with Zod',
    'Tailwind CSS',
    'TypeScript strict mode',
  ],
};
