import type { IGeneratedFile, Architecture, StateManagement } from '../types.js';

export function generateReactProject(
  projectName: string,
  architecture: Architecture,
  stateManagement: StateManagement
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
          'lucide-react': '^0.469.0',
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
  files.push({
    path: `${projectName}/index.html`,
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
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
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`,
  });

  // src/index.css
  files.push({
    path: `${projectName}/src/index.css`,
    content: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`,
  });

  // src/App.tsx
  files.push({
    path: `${projectName}/src/App.tsx`,
    content: `import { Button } from '@/components/ui/button'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          ${projectName}
        </h1>
        <p className="text-muted-foreground text-lg">
          Built with React, Tailwind CSS, and Shadcn/ui
        </p>
        <Button size="lg">Get Started</Button>
      </div>
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
