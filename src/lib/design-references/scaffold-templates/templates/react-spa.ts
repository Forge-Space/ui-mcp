import type { IProjectTemplate, IDirectoryStructure, IConfigFile } from '../types.js';

const structure: IDirectoryStructure = {
  src: {
    pages: {
      'Home.tsx': 'file',
      'About.tsx': 'file',
      'Dashboard.tsx': 'file',
    },
    components: {
      ui: 'directory',
      layouts: {
        'MainLayout.tsx': 'file',
        'DashboardLayout.tsx': 'file',
      },
      features: 'directory',
    },
    hooks: {
      'use-auth.ts': 'file',
      'use-api.ts': 'file',
    },
    stores: {
      'auth.ts': 'file',
      'user.ts': 'file',
    },
    api: {
      'client.ts': 'file',
      endpoints: 'directory',
    },
    assets: {
      images: 'directory',
      icons: 'directory',
    },
    lib: {
      'utils.ts': 'file',
      'constants.ts': 'file',
    },
    routes: {
      'index.tsx': 'file',
    },
    'App.tsx': 'file',
    'main.tsx': 'file',
    'index.css': 'file',
    'vite-env.d.ts': 'file',
  },
  public: {
    'favicon.ico': 'file',
  },
  'package.json': 'file',
  'tsconfig.json': 'file',
  'tsconfig.node.json': 'file',
  'vite.config.ts': 'file',
  'tailwind.config.ts': 'file',
  'postcss.config.js': 'file',
  '.env.example': 'file',
  'index.html': 'file',
  'README.md': 'file',
};

const configFiles: IConfigFile[] = [
  {
    path: 'package.json',
    content: `{
  "name": "react-spa",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.1.3",
    "@tanstack/react-query": "^5.62.14",
    "zustand": "^5.0.3",
    "axios": "^1.7.9",
    "zod": "^3.24.1",
    "react-hook-form": "^7.54.2",
    "@hookform/resolvers": "^3.9.1",
    "tailwindcss": "^3.4.17",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "lucide-react": "^0.468.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.6",
    "@types/react-dom": "^19.0.2",
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.5",
    "typescript": "^5.7.2",
    "eslint": "^9.18.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "@typescript-eslint/eslint-plugin": "^8.19.1",
    "@typescript-eslint/parser": "^8.19.1",
    "prettier": "^3.4.2",
    "prettier-plugin-tailwindcss": "^0.6.9",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "vitest": "^2.1.8",
    "@testing-library/react": "^16.1.0",
    "@testing-library/jest-dom": "^6.6.3"
  }
}`,
  },
  {
    path: 'tsconfig.json',
    content: `{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,
  },
  {
    path: 'tsconfig.node.json',
    content: `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}`,
  },
  {
    path: 'vite.config.ts',
    content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});`,
  },
  {
    path: 'tailwind.config.ts',
    content: `import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
    path: 'postcss.config.js',
    content: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,
  },
  {
    path: '.env.example',
    content: `# API
VITE_API_URL="http://localhost:3001"
VITE_API_TIMEOUT=30000

# App
VITE_APP_NAME="React SPA"
VITE_APP_VERSION="0.1.0"`,
  },
  {
    path: 'index.html',
    content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React SPA</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
  },
  {
    path: 'src/main.tsx',
    content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx.js';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);`,
  },
  {
    path: 'src/App.tsx',
    content: `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Dashboard from './pages/Dashboard.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;`,
  },
];

export const reactSpaTemplate: IProjectTemplate = {
  id: 'react-spa',
  name: 'React SPA with Vite',
  description: 'Modern React single-page application with Vite, React Router, TanStack Query, and Zustand',
  appTypes: ['dashboard', 'landing'],
  scales: ['solo', 'team'],
  structure,
  dependencies: {
    react: '^19.0.0',
    'react-dom': '^19.0.0',
    'react-router-dom': '^7.1.3',
    '@tanstack/react-query': '^5.62.14',
    zustand: '^5.0.3',
    axios: '^1.7.9',
    zod: '^3.24.1',
    'react-hook-form': '^7.54.2',
    '@hookform/resolvers': '^3.9.1',
    tailwindcss: '^3.4.17',
    clsx: '^2.1.1',
    'tailwind-merge': '^2.6.0',
    'lucide-react': '^0.468.0',
  },
  devDependencies: {
    '@types/react': '^19.0.6',
    '@types/react-dom': '^19.0.2',
    '@vitejs/plugin-react': '^4.3.4',
    vite: '^6.0.5',
    typescript: '^5.7.2',
    eslint: '^9.18.0',
    'eslint-plugin-react-hooks': '^5.0.0',
    'eslint-plugin-react-refresh': '^0.4.16',
    '@typescript-eslint/eslint-plugin': '^8.19.1',
    '@typescript-eslint/parser': '^8.19.1',
    prettier: '^3.4.2',
    'prettier-plugin-tailwindcss': '^0.6.9',
    autoprefixer: '^10.4.20',
    postcss: '^8.4.49',
    vitest: '^2.1.8',
    '@testing-library/react': '^16.1.0',
    '@testing-library/jest-dom': '^6.6.3',
  },
  scripts: {
    dev: 'vite',
    build: 'tsc && vite build',
    preview: 'vite preview',
    lint: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
    'type-check': 'tsc --noEmit',
    test: 'vitest',
    'test:ui': 'vitest --ui',
  },
  configFiles,
  features: [
    'Vite for fast development',
    'React Router v7 for routing',
    'TanStack Query for server state',
    'Zustand for client state',
    'Axios for HTTP requests',
    'React Hook Form with Zod validation',
    'Tailwind CSS',
    'TypeScript strict mode',
    'ESLint + Prettier',
    'Vitest + Testing Library',
    'Path aliases (@/*)',
  ],
};
