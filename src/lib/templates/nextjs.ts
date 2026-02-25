import type { IGeneratedFile, IDesignContext, Architecture, StateManagement } from '@forgespace/siza-gen';
import { generateCssVariableBlock } from './css-variables.js';

export function generateNextjsProject(
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
        version: '0.1.0',
        private: true,
        scripts: {
          dev: 'next dev',
          build: 'next build',
          start: 'next start',
          lint: 'next lint',
        },
        dependencies: {
          next: '^15.0.0',
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
          ...(stateManagement === 'zustand' ? { zustand: '^5.0.0' } : {}),
        },
        devDependencies: {
          '@types/node': '^22.0.0',
          '@types/react': '^19.0.0',
          '@types/react-dom': '^19.0.0',
          autoprefixer: '^10.4.20',
          postcss: '^8.4.49',
          tailwindcss: '^3.4.17',
          typescript: '^5.7.0',
          eslint: '^9.17.0',
          'eslint-config-next': '^15.0.0',
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

  // next.config.ts
  files.push({
    path: `${projectName}/next.config.ts`,
    content: `import type { NextConfig } from 'next'

const nextConfig: NextConfig = {}

export default nextConfig
`,
  });

  // tsconfig.json
  files.push({
    path: `${projectName}/tsconfig.json`,
    content: JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2017',
          lib: ['dom', 'dom.iterable', 'esnext'],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: 'esnext',
          moduleResolution: 'bundler',
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: 'preserve',
          incremental: true,
          plugins: [{ name: 'next' }],
          paths: { '@/*': ['./src/*'] },
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
        exclude: ['node_modules'],
      },
      null,
      2
    ),
  });

  // tailwind.config.ts
  files.push({
    path: `${projectName}/tailwind.config.ts`,
    content: `import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
export default config
`,
  });

  // postcss.config.mjs
  files.push({
    path: `${projectName}/postcss.config.mjs`,
    content: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
`,
  });

  // src/app/globals.css
  files.push({
    path: `${projectName}/src/app/globals.css`,
    content: generateCssVariableBlock(designContext),
  });

  // src/app/layout.tsx
  const bodyFont = designContext?.typography?.fontFamily ?? 'Inter';
  const nextFontImport = bodyFont.replace(/\s/g, '_');
  files.push({
    path: `${projectName}/src/app/layout.tsx`,
    content: `import type { Metadata, Viewport } from 'next'
import { ${nextFontImport} } from 'next/font/google'
import './globals.css'

const fontBody = ${nextFontImport}({ subsets: ['latin'], display: 'swap' })

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: '${projectName}',
    template: \`%s | ${projectName}\`,
  },
  description: '${projectName} — Modern web application',
  openGraph: {
    title: '${projectName}',
    description: '${projectName} — Modern web application',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontBody.className}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
`,
  });

  // src/app/page.tsx
  files.push({
    path: `${projectName}/src/app/page.tsx`,
    content: `import { Button } from '@/components/ui/button'
import { RocketLaunch, GithubLogo, Lightning } from '@phosphor-icons/react/dist/ssr'

export default function Home() {
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
              A modern, responsive web application built with Next.js, Tailwind CSS, and shadcn/ui components.
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
                { title: 'Performant', desc: 'Server components, streaming, and optimized for Core Web Vitals.' },
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
`,
  });

  // src/lib/utils.ts
  files.push({
    path: `${projectName}/src/lib/utils.ts`,
    content: `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,
  });

  // Shadcn/ui Button
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

  // Shadcn/ui Input
  files.push({
    path: `${projectName}/src/components/ui/input.tsx`,
    content: `import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
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

  // Shadcn/ui Card
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

  // components.json
  files.push({
    path: `${projectName}/components.json`,
    content: JSON.stringify(
      {
        $schema: 'https://ui.shadcn.com/schema.json',
        style: 'default',
        rsc: true,
        tsx: true,
        tailwind: {
          config: 'tailwind.config.ts',
          css: 'src/app/globals.css',
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

  // Zustand store
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

  return files;
}
