import { BaseGenerator, ComponentLibrary } from './base-generator.js';
import type { IGeneratedFile, IDesignContext, Architecture, StateManagement, Framework } from '../types.js';
import { createLogger } from '../logger.js';

const _logger = createLogger('react-generator');

/**
 * React Generator - Generates React components and projects
 */
export class ReactGenerator extends BaseGenerator {
  constructor(framework: Framework) {
    super(framework);
  }

  /**
   * Generate a complete React project
   */
  generateProject(
    projectName: string,
    architecture: Architecture,
    stateManagement: StateManagement,
    designContext: IDesignContext
  ): IGeneratedFile[] {
    this.logStart('project', projectName);

    const files: IGeneratedFile[] = [];

    // Package.json
    files.push(this.createPackageJsonFile(projectName, stateManagement));

    // TypeScript config
    files.push(this.createTsConfigFile());

    // Vite config
    files.push(this.createViteConfigFile());

    // README
    files.push(this.createReadmeFile(projectName));

    // Main App component
    files.push(this.createAppComponent(designContext));

    // Index.html
    files.push(this.createIndexHtmlFile(projectName));

    // CSS/Tailwind config
    files.push(this.createTailwindConfig(designContext));

    // State management setup
    if (stateManagement !== 'none') {
      files.push(...this.createStateManagementFiles(stateManagement, designContext));
    }

    this.logComplete('project', projectName, files.length);
    return files;
  }

  /**
   * Generate a React component
   */
  generateComponent(
    componentType: string,
    props: Record<string, unknown>,
    designContext: IDesignContext,
    componentLibrary?: ComponentLibrary
  ): IGeneratedFile[] {
    this.logStart('component', componentType);

    const componentName = this.formatComponentName(componentType);
    const files: IGeneratedFile[] = [];

    // Component file
    files.push(this.createComponentFile(componentName, componentType, props, designContext, componentLibrary));

    // Storybook file (optional) - only when using component libraries
    if (process.env.NODE_ENV !== 'production' && componentLibrary && componentLibrary !== 'none') {
      files.push(this.createStorybookFile(componentName, componentType, designContext));
    }

    // Test file
    files.push(this.createTestFile(componentName, componentType, designContext));

    this.logComplete('component', componentType, files.length);
    return files;
  }

  private createPackageJsonFile(projectName: string, stateManagement: StateManagement): IGeneratedFile {
    const dependencies: Record<string, string> = {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'react-router-dom': '^6.8.0',
      clsx: '^1.2.1',
    };

    const devDependencies: Record<string, string> = {
      '@types/react': '^18.0.27',
      '@types/react-dom': '^18.0.10',
      '@vitejs/plugin-react': '^3.1.0',
      vite: '^4.1.0',
      tailwindcss: '^3.2.7',
      autoprefixer: '^10.4.14',
      postcss: '^8.4.21',
      '@testing-library/react': '^14.0.0',
      '@testing-library/jest-dom': '^5.16.5',
      vitest: '^0.29.1',
    };

    // Add state management dependencies
    if (stateManagement === 'zustand') {
      dependencies.zustand = '^4.3.6';
    }

    return {
      path: 'package.json',
      content: this.createPackageJson(projectName, dependencies, devDependencies),
    };
  }

  private createTsConfigFile(): IGeneratedFile {
    return {
      path: 'tsconfig.json',
      content: this.createTsConfig(),
    };
  }

  private createViteConfigFile(): IGeneratedFile {
    return {
      path: 'vite.config.ts',
      content: this.createViteConfig(),
    };
  }

  private createReadmeFile(projectName: string): IGeneratedFile {
    return {
      path: 'README.md',
      content: this.createReadme(projectName),
    };
  }

  private createAppComponent(designContext: IDesignContext): IGeneratedFile {
    const content = `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '${designContext.colorPalette.background}' }}>
      <header className="p-6">
        <h1 className="text-3xl font-bold" style={{ color: '${designContext.colorPalette.primary}' }}>
          Welcome to ${designContext.typography.fontFamily}
        </h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <p style={{ color: '${designContext.colorPalette.foreground}' }}>
          Your React application is ready!
        </p>
      </main>
    </div>
  );
}

export default App;
`;

    return {
      path: 'src/App.tsx',
      content,
    };
  }

  private createIndexHtmlFile(projectName: string): IGeneratedFile {
    return {
      path: 'index.html',
      content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    };
  }

  private createTailwindConfig(designContext: IDesignContext): IGeneratedFile {
    return {
      path: 'tailwind.config.js',
      content: `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '${designContext.colorPalette.primary}',
        secondary: '${designContext.colorPalette.secondary}',
        background: '${designContext.colorPalette.background}',
        foreground: '${designContext.colorPalette.foreground}',
      },
      fontFamily: {
        sans: ['${designContext.typography.fontFamily}', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
`,
    };
  }

  private createStateManagementFiles(
    stateManagement: StateManagement,
    _designContext: IDesignContext
  ): IGeneratedFile[] {
    const files: IGeneratedFile[] = [];

    if (stateManagement === 'zustand') {
      files.push({
        path: 'src/store/useAppStore.ts',
        content: `import { create } from 'zustand';

interface AppState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
`,
      });
    }

    return files;
  }

  private createComponentFile(
    componentName: string,
    componentType: string,
    props: Record<string, unknown>,
    designContext: IDesignContext,
    componentLibrary?: ComponentLibrary
  ): IGeneratedFile {
    const propsInterface =
      Object.keys(props).length > 0
        ? `interface ${componentName}Props {\n${Object.entries(props)
            .map(([key, type]) => `  ${key}: ${type};`)
            .join('\n')}\n}\n\n`
        : '';

    let content: string;

    if (componentLibrary && componentLibrary !== 'none') {
      // Use component library-specific generation
      const imports = this.getComponentLibraryImports(componentLibrary).join('\n');
      const componentCode = this.generateComponentLibraryCode(componentType, props, componentLibrary);

      content = `${propsInterface}${imports}

${componentCode}

export default ${componentName};`;
    } else {
      // Use default Tailwind CSS generation with appropriate HTML element
      const htmlElement = this.getHtmlElementForComponentType(componentType);
      const elementClasses = this.getTailwindClassesForComponentType(componentType);
      const rawComponentName = componentType.toLowerCase();

      content = `${propsInterface}import React from 'react';
import clsx from 'clsx';

export const ${rawComponentName}: React.FC<${rawComponentName}Props> = (${Object.keys(props).length > 0 ? '{' : ''}${Object.keys(props).join(', ')}${Object.keys(props).length > 0 ? '}' : ''}) => {
  return (
    <${htmlElement}
      className={clsx(
        '${elementClasses}'
      )}
      style={{
        backgroundColor: '${designContext.colorPalette.background}',
        color: '${designContext.colorPalette.foreground}',
        borderColor: '${designContext.colorPalette.muted}',
      }}
    >
      ${rawComponentName}
    </${htmlElement}>
  );
};

export default ${rawComponentName};`;
    }

    return {
      path: `src/components/${componentName}.tsx`,
      content,
    };
  }

  private createStorybookFile(
    componentName: string,
    _componentType: string,
    _designContext: IDesignContext
  ): IGeneratedFile {
    const content = `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomProps: Story = {
  args: {
    // Add custom props here
  },
};
`;

    return {
      path: `src/components/${componentName}.stories.tsx`,
      content,
    };
  }

  private createTestFile(componentName: string, componentType: string, _designContext: IDesignContext): IGeneratedFile {
    const content = `import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders without crashing', () => {
    render(<${componentName} />);
    expect(screen.getByText('${componentName}')).toBeInTheDocument();
  });

  it('displays the component type', () => {
    render(<${componentName} />);
    expect(screen.getByText(/${componentType}/i)).toBeInTheDocument();
  });
});
`;

    return {
      path: `src/components/${componentName}.test.tsx`,
      content,
    };
  }

  // Component Library Implementation Methods

  protected getShadcnDependencies(): string[] {
    return [
      '@radix-ui/react-slot',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
      'lucide-react',
    ];
  }

  protected getRadixDependencies(): string[] {
    return [
      '@radix-ui/react-slot',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
    ];
  }

  protected getHeadlessUIDependencies(): string[] {
    return ['@headlessui/react', '@heroicons/react'];
  }

  protected getPrimeVueDependencies(): string[] {
    return ['primevue', 'primeicons'];
  }

  protected getMaterialDependencies(): string[] {
    return ['@mui/material', '@mui/icons-material'];
  }

  protected getShadcnImports(): string[] {
    return [
      'import { cn } from "lib/utils";',
      'import { Button } from "components/ui/button";',
      'import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card";',
      'import { Input } from "components/ui/input";',
      'import { Label } from "components/ui/label";',
    ];
  }

  protected getRadixImports(): string[] {
    return [
      'import * as Dialog from "@radix-ui/react-dialog";',
      'import * as DropdownMenu from "@radix-ui/react-dropdown-menu";',
      'import * as Select from "@radix-ui/react-select";',
      'import * as Tabs from "@radix-ui/react-tabs";',
    ];
  }

  protected getHeadlessUIImports(): string[] {
    return [
      'import { Button } from "@headlessui/react";',
      'import { Dialog } from "@headlessui/react";',
      'import { Menu } from "@headlessui/react";',
      'import { Transition } from "@headlessui/react";',
    ];
  }

  protected getPrimeVueImports(): string[] {
    return [
      'import Button from "primevue/button";',
      'import Dialog from "primevue/dialog";',
      'import InputText from "primevue/inputtext";',
      'import DataTable from "primevue/datatable";',
    ];
  }

  protected getMaterialImports(): string[] {
    return [
      'import Button from "@mui/material/Button";',
      'import Dialog from "@mui/material/Dialog";',
      'import TextField from "@mui/material/TextField";',
      'import Card from "@mui/material/Card";',
      'import CardContent from "@mui/material/CardContent";',
    ];
  }

  protected generateShadcnComponent(componentType: string, props: Record<string, unknown>): string {
    const componentName = this.formatComponentName(componentType);

    return `import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ${componentName}(${this.generatePropsInterface(props)}) {
  return (
    <Card className={cn("w-full max-w-md", props.className)}>
      <CardHeader>
        <CardTitle>${componentName}</CardTitle>
        <CardDescription>
          A ${componentType.toLowerCase()} component built with shadcn/ui
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is a ${componentType.toLowerCase()} component using shadcn/ui design system.</p>
        <Button className="mt-4">Click me</Button>
      </CardContent>
    </Card>
  )
}`;
  }

  protected generateRadixComponent(componentType: string, props: Record<string, unknown>): string {
    const componentName = this.formatComponentName(componentType);
    const type = componentType.toLowerCase();

    if (type === 'button') {
      return `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

interface ${componentName}Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const ${componentName} = React.forwardRef<HTMLButtonElement, ${componentName}Props>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp ref={ref} {...props} />
  }
)
${componentName}.displayName = "${componentName}"

export function ${componentName}Demo() {
  return <Button>${componentName}</Button>
}`;
    }

    if (type === 'dialog') {
      return `import * as Dialog from "@radix-ui/react-dialog"

export function ${componentName}(${this.generatePropsInterface(props)}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>Open ${componentName}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <Dialog.Title>${componentName}</Dialog.Title>
          <Dialog.Description>
            A ${componentType.toLowerCase()} component using Radix UI primitives
          </Dialog.Description>
          <Dialog.Close asChild>
            <button>Close</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}`;
    }

    return `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

export function ${componentName}(${this.generatePropsInterface(props)}) {
  return (
    <div className="${type}-root">
      <span>${componentName}</span>
    </div>
  )
}`;
  }

  protected generateHeadlessUIComponent(componentType: string, props: Record<string, unknown>): string {
    const componentName = this.formatComponentName(componentType);

    return `import { Button } from "@headlessui/react"
import { Dialog } from "@headlessui/react"

export function ${componentName}(${this.generatePropsInterface(props)}) {
  return (
    <div className="p-4">
      <Button onClick={() => {}}>${componentName}</Button>
      <Dialog open={false} onClose={() => {}}>
        <Dialog.Panel className="fixed inset-0 bg-white p-6 rounded-lg shadow-lg">
          <Dialog.Title>${componentName}</Dialog.Title>
          <Dialog.Description>
            A ${componentType.toLowerCase()} component using Headless UI
          </Dialog.Description>
          <div className="mt-4">
            <Button onClick={() => {}}>Close</Button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}`;
  }

  protected generatePrimeVueComponent(componentType: string, props: Record<string, unknown>): string {
    const componentName = this.formatComponentName(componentType);

    // Note: This would be used in a Vue generator, but we provide a React-compatible version
    return `import { Button } from "@headlessui/react"
import { Dialog } from "@headlessui/react"

export function ${componentName}(${this.generatePropsInterface(props)}) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>${componentName}</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Dialog.Panel className="fixed inset-0 bg-white p-6 rounded-lg shadow-lg">
          <Dialog.Title>${componentName}</Dialog.Title>
          <Dialog.Description>
            A ${componentType.toLowerCase()} component (PrimeVue style)
          </Dialog.Description>
          <div className="mt-4">
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}`;
  }

  protected generateMaterialComponent(componentType: string, props: Record<string, unknown>): string {
    const componentName = this.formatComponentName(componentType);

    return `import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

export function ${componentName}(${this.generatePropsInterface(props)}) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="p-4">
      <Button variant="contained" onClick={() => setOpen(true)}>
        ${componentName}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>${componentName}</DialogTitle>
        <DialogContent>
          <p>A ${componentType.toLowerCase()} component using Material UI</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}`;
  }

  protected generateTailwindComponent(componentType: string, props: Record<string, unknown>): string {
    const componentName = this.formatComponentName(componentType);

    return `export function ${componentName}(${this.generatePropsInterface(props)}) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">${componentName}</h2>
      <p className="text-gray-600 mb-4">
        A ${componentType.toLowerCase()} component using Tailwind CSS
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => console.log('Button clicked')}
      >
        Click me
      </button>
    </div>
  )
}`;
  }

  private generatePropsInterface(props: Record<string, unknown>): string {
    const propKeys = Object.keys(props);
    if (propKeys.length === 0) return '';

    const propDefinitions = propKeys
      .map((key) => {
        const value = props[key];
        let type = 'string';

        if (typeof value === 'boolean') type = 'boolean';
        else if (typeof value === 'number') type = 'number';
        else if (typeof value === 'object') type = 'any';

        return `${key}?: ${type}`;
      })
      .join(', ');

    return `{ ${propDefinitions} }`;
  }

  private getHtmlElementForComponentType(componentType: string): string {
    const elementMap: Record<string, string> = {
      button: 'button',
      input: 'input',
      card: 'div',
      dialog: 'dialog',
      modal: 'dialog',
      form: 'form',
      nav: 'nav',
      header: 'header',
      footer: 'footer',
      section: 'section',
      article: 'article',
      aside: 'aside',
      main: 'main',
      img: 'img',
      link: 'a',
      text: 'p',
      heading: 'h2',
      list: 'ul',
      listItem: 'li',
      table: 'table',
      row: 'tr',
      cell: 'td',
    };

    return elementMap[componentType.toLowerCase()] || 'div';
  }

  private getTailwindClassesForComponentType(componentType: string): string {
    const classMap: Record<string, string> = {
      button: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors',
      input: 'px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500',
      card: 'p-4 rounded-lg bg-white shadow-md border border-gray-200',
      dialog: 'p-6 rounded-lg bg-white shadow-lg border border-gray-200',
      modal: 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50',
      form: 'space-y-4',
      nav: 'flex space-x-4',
      header: 'pb-4 border-b border-gray-200',
      footer: 'pt-4 border-t border-gray-200',
      section: 'py-8',
      article: 'prose max-w-none',
      aside: 'w-64',
      main: 'flex-1',
      img: 'max-w-full h-auto',
      link: 'text-blue-500 hover:text-blue-700 underline',
      text: 'text-gray-700',
      heading: 'text-2xl font-bold mb-4',
      list: 'list-disc list-inside space-y-2',
      listItem: 'ml-4',
      table: 'w-full border-collapse',
      row: 'border-b',
      cell: 'px-4 py-2 border',
    };

    return classMap[componentType.toLowerCase()] || 'p-4';
  }
}
