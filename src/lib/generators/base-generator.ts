import type { IGeneratedFile, IDesignContext, Architecture, StateManagement, Framework } from '../types.js';
import { createLogger } from '../logger.js';

const _logger = createLogger('base-generator');

/**
 * Component library types supported by UIForge
 */
export type ComponentLibrary = 'shadcn' | 'radix' | 'headlessui' | 'primevue' | 'material' | 'none';

/**
 * Abstract base class for all framework generators
 * Provides common functionality and enforces consistent interface
 */
export abstract class BaseGenerator {
  protected readonly framework: Framework;
  protected readonly logger = createLogger(`${this.constructor.name}`);

  constructor(framework: Framework) {
    this.framework = framework;
  }

  /**
   * Generate a complete project
   * @param projectName Project name
   * @param architecture Architecture pattern
   * @param stateManagement State management approach
   * @param designContext Design context
   * @returns Array of generated files
   */
  abstract generateProject(
    projectName: string,
    architecture: Architecture,
    stateManagement: StateManagement,
    designContext: IDesignContext
  ): IGeneratedFile[];

  /**
   * Generate a UI component
   * @param componentType Component type
   * @param props Component props
   * @param designContext Design context
   * @param componentLibrary Component library to use
   * @returns Array of generated files
   */
  abstract generateComponent(
    componentType: string,
    props: Record<string, unknown>,
    designContext: IDesignContext,
    componentLibrary?: ComponentLibrary
  ): IGeneratedFile[];

  /**
   * Get the framework this generator handles
   * @returns Framework type
   */
  getFramework(): Framework {
    return this.framework;
  }

  /**
   * Get component library dependencies for the current framework
   * @param componentLibrary Component library type
   * @returns Array of dependency names
   */
  protected getComponentLibraryDependencies(componentLibrary: ComponentLibrary): string[] {
    const deps: string[] = [];

    switch (componentLibrary) {
      case 'shadcn':
        deps.push(...this.getShadcnDependencies());
        break;
      case 'radix':
        deps.push(...this.getRadixDependencies());
        break;
      case 'headlessui':
        deps.push(...this.getHeadlessUIDependencies());
        break;
      case 'primevue':
        deps.push(...this.getPrimeVueDependencies());
        break;
      case 'material':
        deps.push(...this.getMaterialDependencies());
        break;
      case 'none':
      default:
        // No additional dependencies
        break;
    }

    return deps;
  }

  /**
   * Get component library imports for the current framework
   * @param componentLibrary Component library type
   * @returns Array of import statements
   */
  protected getComponentLibraryImports(componentLibrary: ComponentLibrary): string[] {
    const imports: string[] = [];

    switch (componentLibrary) {
      case 'shadcn':
        imports.push(...this.getShadcnImports());
        break;
      case 'radix':
        imports.push(...this.getRadixImports());
        break;
      case 'headlessui':
        imports.push(...this.getHeadlessUIImports());
        break;
      case 'primevue':
        imports.push(...this.getPrimeVueImports());
        break;
      case 'material':
        imports.push(...this.getMaterialImports());
        break;
      case 'none':
      default:
        // No additional imports
        break;
    }

    return imports;
  }

  /**
   * Generate component library-specific component code
   * @param componentType Component type
   * @param props Component props
   * @param componentLibrary Component library type
   * @returns Generated component code
   */
  protected generateComponentLibraryCode(
    componentType: string,
    props: Record<string, unknown>,
    componentLibrary: ComponentLibrary
  ): string {
    switch (componentLibrary) {
      case 'shadcn':
        return this.generateShadcnComponent(componentType, props);
      case 'radix':
        return this.generateRadixComponent(componentType, props);
      case 'headlessui':
        return this.generateHeadlessUIComponent(componentType, props);
      case 'primevue':
        return this.generatePrimeVueComponent(componentType, props);
      case 'material':
        return this.generateMaterialComponent(componentType, props);
      case 'none':
      default:
        return this.generateTailwindComponent(componentType, props);
    }
  }

  // Abstract methods for framework-specific component library implementations
  protected abstract getShadcnDependencies(): string[];
  protected abstract getRadixDependencies(): string[];
  protected abstract getHeadlessUIDependencies(): string[];
  protected abstract getPrimeVueDependencies(): string[];
  protected abstract getMaterialDependencies(): string[];

  protected abstract getShadcnImports(): string[];
  protected abstract getRadixImports(): string[];
  protected abstract getHeadlessUIImports(): string[];
  protected abstract getPrimeVueImports(): string[];
  protected abstract getMaterialImports(): string[];

  protected abstract generateShadcnComponent(componentType: string, props: Record<string, unknown>): string;
  protected abstract generateRadixComponent(componentType: string, props: Record<string, unknown>): string;
  protected abstract generateHeadlessUIComponent(componentType: string, props: Record<string, unknown>): string;
  protected abstract generatePrimeVueComponent(componentType: string, props: Record<string, unknown>): string;
  protected abstract generateMaterialComponent(componentType: string, props: Record<string, unknown>): string;
  protected abstract generateTailwindComponent(componentType: string, props: Record<string, unknown>): string;

  /**
   * Validate generation parameters
   * @param params Parameters to validate
   * @returns Validation result
   */
  protected validateParams(params: {
    projectName?: string;
    componentType?: string;
    architecture?: Architecture;
    stateManagement?: StateManagement;
  }): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate project name
    if (params.projectName) {
      if (!params.projectName.trim()) {
        errors.push('Project name cannot be empty');
      }
      if (!/^[a-zA-Z0-9-_]+$/.test(params.projectName)) {
        errors.push('Project name can only contain letters, numbers, hyphens, and underscores');
      }
    }

    // Validate component type
    if (params.componentType) {
      if (!params.componentType.trim()) {
        errors.push('Component type cannot be empty');
      }
      if (!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(params.componentType)) {
        errors.push(
          'Component type must start with a letter and contain only letters, numbers, hyphens, and underscores'
        );
      }
    }

    // Validate architecture
    if (params.architecture) {
      const validArchitectures: Architecture[] = ['flat', 'feature-based', 'atomic'];
      if (!validArchitectures.includes(params.architecture)) {
        errors.push(`Invalid architecture: ${params.architecture}. Valid options: ${validArchitectures.join(', ')}`);
      }
    }

    // Validate state management
    if (params.stateManagement) {
      const validStateManagement: StateManagement[] = ['useState', 'zustand', 'pinia', 'signals', 'none'];
      if (!validStateManagement.includes(params.stateManagement)) {
        errors.push(
          `Invalid state management: ${params.stateManagement}. Valid options: ${validStateManagement.join(', ')}`
        );
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Format component name based on framework conventions
   * @param componentType Component type
   * @returns Formatted component name
   */
  protected formatComponentName(componentType: string): string {
    // Convert kebab-case to PascalCase
    return componentType
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  /**
   * Get file extension for this framework
   * @returns File extension
   */
  protected getFileExtension(): string {
    switch (this.framework) {
      case 'react':
      case 'nextjs':
        return 'tsx';
      case 'svelte':
        return 'svelte';
      case 'vue':
        return 'vue';
      case 'angular':
        return 'ts';
      case 'html':
        return 'html';
      default:
        return 'ts';
    }
  }

  /**
   * Create a basic package.json for the project
   * @param projectName Project name
   * @param dependencies Project dependencies
   * @param devDependencies Development dependencies
   * @returns Package.json content
   */
  protected createPackageJson(
    projectName: string,
    dependencies: Record<string, string>,
    devDependencies: Record<string, string>
  ): string {
    return JSON.stringify(
      {
        name: projectName,
        version: '0.1.0',
        private: true,
        type: 'module',
        scripts: this.getDefaultScripts(),
        dependencies,
        devDependencies: {
          typescript: '^5.0.0',
          '@types/node': '^20.0.0',
          eslint: '^8.0.0',
          prettier: '^3.0.0',
          ...devDependencies,
        },
      },
      null,
      2
    );
  }

  /**
   * Get default scripts for package.json
   * @returns Default scripts object
   */
  protected getDefaultScripts(): Record<string, string> {
    switch (this.framework) {
      case 'react':
      case 'nextjs':
        return {
          dev: 'vite',
          build: 'tsc -b && vite build',
          preview: 'vite preview',
          lint: 'eslint .',
          test: 'vitest',
        };
      case 'vue':
        return {
          dev: 'vite',
          build: 'vue-tsc && vite build',
          preview: 'vite preview',
          lint: 'eslint .',
          test: 'vitest',
        };
      case 'angular':
        return {
          start: 'ng serve',
          build: 'ng build',
          test: 'ng test',
          lint: 'ng lint',
        };
      case 'svelte':
        return {
          dev: 'vite dev',
          build: 'vite build',
          preview: 'vite preview',
          test: 'vitest',
        };
      case 'html':
        return {
          dev: 'vite',
          build: 'vite build',
          preview: 'vite preview',
        };
      default:
        return {
          dev: 'vite',
          build: 'vite build',
        };
    }
  }

  /**
   * Create TypeScript configuration
   * @returns TypeScript config content
   */
  protected createTsConfig(): string {
    return JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2020',
          useDefineForClassFields: true,
          lib: ['ES2020', 'DOM', 'DOM.Iterable'],
          module: 'ESNext',
          skipLibCheck: true,
          moduleResolution: 'bundler',
          allowImportingTsExtensions: true,
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: 'react-jsx',
          strict: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          noFallthroughCasesInSwitch: true,
        },
        include: ['src'],
        references: [{ path: './tsconfig.node.json' }],
      },
      null,
      2
    );
  }

  /**
   * Create Vite configuration
   * @returns Vite config content
   */
  protected createViteConfig(): string {
    return `import { defineConfig } from 'vite';
import ${this.getVitePluginImport()} from '${this.getVitePluginPackage()}';

export default defineConfig({
  plugins: [${this.getVitePluginConfig()}],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
});`;
  }

  /**
   * Get Vite plugin import statement
   * @returns Import statement
   */
  protected getVitePluginImport(): string {
    switch (this.framework) {
      case 'react':
        return 'react';
      case 'vue':
        return 'vue';
      case 'svelte':
        return 'svelte';
      default:
        return 'vite';
    }
  }

  /**
   * Get Vite plugin package
   * @returns Package name
   */
  protected getVitePluginPackage(): string {
    switch (this.framework) {
      case 'react':
        return '@vitejs/plugin-react';
      case 'vue':
        return '@vitejs/plugin-vue';
      case 'svelte':
        return '@sveltejs/vite-plugin-svelte';
      default:
        return 'vite';
    }
  }

  /**
   * Get Vite plugin configuration
   * @returns Plugin configuration
   */
  protected getVitePluginConfig(): string {
    switch (this.framework) {
      case 'react':
        return 'react()';
      case 'vue':
        return 'vue()';
      case 'svelte':
        return 'svelte()';
      default:
        return '';
    }
  }

  /**
   * Create README.md content
   * @param projectName Project name
   * @returns README content
   */
  protected createReadme(projectName: string): string {
    return `# ${projectName}

A ${this.framework} project generated by UIForge MCP.

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint
- \`npm run test\` - Run tests

## Project Structure

This project uses the ${this.framework} framework with:
- TypeScript for type safety
- Vite for fast development and building
- Tailwind CSS for styling
- ESLint and Prettier for code quality

## Learn More

- [${this.framework} Documentation](${this.getFrameworkDocsUrl()})
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
`;
  }

  /**
   * Get framework documentation URL
   * @returns Documentation URL
   */
  protected getFrameworkDocsUrl(): string {
    switch (this.framework) {
      case 'react':
        return 'https://react.dev/';
      case 'nextjs':
        return 'https://nextjs.org/docs';
      case 'vue':
        return 'https://vuejs.org/guide/';
      case 'angular':
        return 'https://angular.dev/docs';
      case 'svelte':
        return 'https://svelte.dev/docs';
      case 'html':
        return 'https://developer.mozilla.org/en-US/docs/Web/HTML';
      default:
        return 'https://developer.mozilla.org/';
    }
  }

  /**
   * Log generation start
   * @param type Generation type
   * @param target Target name
   */
  protected logStart(type: 'project' | 'component', target: string): void {
    this.logger.info(`Starting ${type} generation for ${this.framework}: ${target}`);
  }

  /**
   * Log generation completion
   * @param type Generation type
   * @param target Target name
   * @param fileCount Number of files generated
   */
  protected logComplete(type: 'project' | 'component', target: string, fileCount: number): void {
    this.logger.info(`Completed ${type} generation for ${this.framework}: ${target} (${fileCount} files)`);
  }
}
