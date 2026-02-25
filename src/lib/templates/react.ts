import type { IGeneratedFile, IDesignContext, Architecture, StateManagement } from '@forgespace/siza-gen';
import { generateCssVariableBlock, generateFontImportHtml } from './css-variables.js';

export function generateReactProject(
  projectName: string,
  architecture: Architecture,
  stateManagement: StateManagement,
  designContext?: IDesignContext
): IGeneratedFile[] {
  const files: IGeneratedFile[] = [];

  // package.json
  files.push({
    path: `${projectName}/package.json`,
    content: JSON.stringify(
      {
        name: projectName,
        private: true,
        version: '0.1.0',
        type: 'module',
        scripts: {
          dev: 'vite',
          build: 'tsc -b && vite build',
          preview: 'vite preview',
          lint: 'eslint .',
        },
        dependencies: {
          react: '^19.0.0',
          'react-dom': '^19.0.0',
          'class-variance-authority': '^0.7.1',
          clsx: '^2.1.1',
          'tailwind-merge': '^3.0.0',
          '@phosphor-icons/react': '^2.1.0',
          'react-hook-form': '^7.54.0',
          '@hookform/resolvers': '^4.1.0',
          zod: '^3.24.0',
          '@tanstack/react-query': '^5.62.0',
          'react-router-dom': '^7.1.0',
          ...(stateManagement === 'zustand' ? { zustand: '^5.0.0' } : {}),
        },
        devDependencies: {
          '@types/react': '^19.0.0',
          '@types/react-dom': '^19.0.0',
          '@vitejs/plugin-react': '^4.3.0',
          autoprefixer: '^10.4.20',
          postcss: '^8.4.49',
          tailwindcss: '^3.4.17',
          typescript: '^5.7.0',
          vite: '^6.0.0',
          eslint: '^9.17.0',
          prettier: '^3.4.0',
          vitest: '^3.0.0',
          '@testing-library/react': '^16.1.0',
          '@testing-library/jest-dom': '^6.6.0',
          jsdom: '^25.0.0',
        },
      },
      null,
      2
    ),
  });

  // vite.config.ts
  files.push({
    path: `${projectName}/vite.config.ts`,
    content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
`,
  });

  // tsconfig.json
  files.push({
    path: `${projectName}/tsconfig.json`,
    content: JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          lib: ['ES2023', 'DOM', 'DOM.Iterable'],
          module: 'ESNext',
          moduleResolution: 'bundler',
          jsx: 'react-jsx',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          baseUrl: '.',
          paths: { '@/*': ['./src/*'] },
        },
        include: ['src'],
      },
      null,
      2
    ),
  });

  // tailwind.config.js
  files.push({
    path: `${projectName}/tailwind.config.js`,
    content: `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
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
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
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
}
`,
  });

  // postcss.config.js
  files.push({
    path: `${projectName}/postcss.config.js`,
    content: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`,
  });

  // index.html
  const fontLinks = generateFontImportHtml(designContext);
  files.push({
    path: `${projectName}/index.html`,
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${projectName} — Modern web application" />
    <meta name="theme-color" content="#ffffff" />
    <meta property="og:title" content="${projectName}" />
    <meta property="og:description" content="${projectName} — Modern web application" />
    <meta property="og:type" content="website" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    ${fontLinks}
    <title>${projectName}</title>
  </head>
  <body>
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">Skip to main content</a>
    <div id="root"></div>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
  });

  // src/main.tsx
  files.push({
    path: `${projectName}/src/main.tsx`,
    content: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
`,
  });

  // src/index.css
  files.push({
    path: `${projectName}/src/index.css`,
    content: generateCssVariableBlock(designContext),
  });

  // src/App.tsx
  files.push({
    path: `${projectName}/src/App.tsx`,
    content: `import { Button } from '@/components/ui/button'
import { RocketLaunch, GithubLogo, Lightning } from '@phosphor-icons/react'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header role="banner" className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav aria-label="Main navigation" className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="text-lg font-semibold">${projectName}</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">About</Button>
            <Button variant="ghost" size="sm">Features</Button>
            <Button size="sm">Get Started</Button>
          </div>
        </nav>
      </header>

      <main id="main-content" role="main" className="flex-1">
        <section aria-labelledby="hero-heading" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h1 id="hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              ${projectName}
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
              A modern, responsive web application built with React, Tailwind CSS, and shadcn/ui components.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg">
                <RocketLaunch className="mr-2 h-4 w-4" aria-hidden="true" />
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                <GithubLogo className="mr-2 h-4 w-4" aria-hidden="true" />
                View Source
              </Button>
            </div>
          </div>
        </section>

        <section aria-labelledby="features-heading" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold text-center mb-10">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Responsive Design', desc: 'Looks great on every screen size, from mobile to desktop.' },
                { title: 'Accessible', desc: 'Built with ARIA landmarks, keyboard navigation, and semantic HTML.' },
                { title: 'Performant', desc: 'Optimized with lazy loading, memoization, and efficient state management.' },
              ].map((feature) => (
                <article key={feature.title} className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Lightning className="h-8 w-8 text-primary mb-3" aria-hidden="true" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer role="contentinfo" className="border-t py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ${projectName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
`,
  });

  // Shadcn/ui utilities
  files.push({
    path: `${projectName}/src/lib/utils.ts`,
    content: `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,
  });

  // Shadcn/ui Button component
  files.push({
    path: `${projectName}/src/components/ui/button.tsx`,
    content: `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
`,
  });

  // Shadcn/ui Input component
  files.push({
    path: `${projectName}/src/components/ui/input.tsx`,
    content: `import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
`,
  });

  // Shadcn/ui Card component
  files.push({
    path: `${projectName}/src/components/ui/card.tsx`,
    content: `import * as React from 'react'
import { cn } from '@/lib/utils'

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)} {...props} />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
`,
  });

  // State management (zustand example)
  if (stateManagement === 'zustand') {
    files.push({
      path: `${projectName}/src/store/use-app-store.ts`,
      content: `import { create } from 'zustand'

interface AppState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))
`,
    });
  }

  // components.json (Shadcn/ui config)
  files.push({
    path: `${projectName}/components.json`,
    content: JSON.stringify(
      {
        $schema: 'https://ui.shadcn.com/schema.json',
        style: 'default',
        rsc: false,
        tsx: true,
        tailwind: {
          config: 'tailwind.config.js',
          css: 'src/index.css',
          baseColor: 'slate',
          cssVariables: true,
        },
        aliases: {
          components: '@/components',
          utils: '@/lib/utils',
        },
      },
      null,
      2
    ),
  });

  return files;
}
