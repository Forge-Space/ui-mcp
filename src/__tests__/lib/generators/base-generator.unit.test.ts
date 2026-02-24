import { BaseGenerator, ComponentLibrary } from '../../../lib/generators/base-generator.js';
import type { IGeneratedFile, IDesignContext, Architecture, StateManagement, Framework } from '../../../lib/types.js';
import { DEFAULT_DESIGN_CONTEXT } from '../../../lib/generators/default-design-context.js';

class TestGenerator extends BaseGenerator {
  generateProject(
    projectName: string,
    architecture: Architecture,
    stateManagement: StateManagement,
    designContext: IDesignContext
  ): IGeneratedFile[] {
    return [
      {
        path: 'package.json',
        content: this.createPackageJson(projectName, { react: '^18.0.0' }, { typescript: '^5.0.0' }),
      },
    ];
  }

  generateComponent(
    componentType: string,
    props: Record<string, unknown>,
    designContext: IDesignContext,
    componentLibrary?: ComponentLibrary
  ): IGeneratedFile[] {
    return [
      {
        path: `${componentType}.tsx`,
        content: `Component: ${componentType}`,
      },
    ];
  }

  protected getShadcnDependencies(): string[] {
    return ['@radix-ui/react-slot'];
  }

  protected getRadixDependencies(): string[] {
    return ['@radix-ui/react-dialog'];
  }

  protected getHeadlessUIDependencies(): string[] {
    return ['@headlessui/react'];
  }

  protected getPrimeVueDependencies(): string[] {
    return ['primevue'];
  }

  protected getMaterialDependencies(): string[] {
    return ['@mui/material'];
  }

  protected getShadcnImports(): string[] {
    return ['import { Button } from "components/ui/button";'];
  }

  protected getRadixImports(): string[] {
    return ['import * as Dialog from "@radix-ui/react-dialog";'];
  }

  protected getHeadlessUIImports(): string[] {
    return ['import { Button } from "@headlessui/react";'];
  }

  protected getPrimeVueImports(): string[] {
    return ['import Button from "primevue/button";'];
  }

  protected getMaterialImports(): string[] {
    return ['import Button from "@mui/material/Button";'];
  }

  protected generateShadcnComponent(componentType: string, props: Record<string, unknown>): string {
    return `<Button>Shadcn ${componentType}</Button>`;
  }

  protected generateRadixComponent(componentType: string, props: Record<string, unknown>): string {
    return `<Dialog.Root>Radix ${componentType}</Dialog.Root>`;
  }

  protected generateHeadlessUIComponent(componentType: string, props: Record<string, unknown>): string {
    return `<Button>Headless ${componentType}</Button>`;
  }

  protected generatePrimeVueComponent(componentType: string, props: Record<string, unknown>): string {
    return `<Button>PrimeVue ${componentType}</Button>`;
  }

  protected generateMaterialComponent(componentType: string, props: Record<string, unknown>): string {
    return `<Button>Material ${componentType}</Button>`;
  }

  protected generateTailwindComponent(componentType: string, props: Record<string, unknown>): string {
    return `<div>Tailwind ${componentType}</div>`;
  }
}

describe('BaseGenerator', () => {
  let generator: TestGenerator;
  let designContext: IDesignContext;

  beforeEach(() => {
    generator = new TestGenerator('react');
    designContext = structuredClone(DEFAULT_DESIGN_CONTEXT);
  });

  describe('constructor', () => {
    it('stores framework correctly', () => {
      expect(generator.getFramework()).toBe('react');
    });

    it('supports different frameworks', () => {
      const vueGen = new TestGenerator('vue');
      expect(vueGen.getFramework()).toBe('vue');

      const svelteGen = new TestGenerator('svelte');
      expect(svelteGen.getFramework()).toBe('svelte');
    });
  });

  describe('getFramework', () => {
    it('returns the stored framework', () => {
      const framework = generator.getFramework();
      expect(framework).toBe('react');
    });
  });

  describe('getComponentLibraryDependencies', () => {
    it('returns shadcn dependencies', () => {
      const deps = generator['getComponentLibraryDependencies']('shadcn');
      expect(deps).toContain('@radix-ui/react-slot');
    });

    it('returns radix dependencies', () => {
      const deps = generator['getComponentLibraryDependencies']('radix');
      expect(deps).toContain('@radix-ui/react-dialog');
    });

    it('returns headlessui dependencies', () => {
      const deps = generator['getComponentLibraryDependencies']('headlessui');
      expect(deps).toContain('@headlessui/react');
    });

    it('returns primevue dependencies', () => {
      const deps = generator['getComponentLibraryDependencies']('primevue');
      expect(deps).toContain('primevue');
    });

    it('returns material dependencies', () => {
      const deps = generator['getComponentLibraryDependencies']('material');
      expect(deps).toContain('@mui/material');
    });

    it('returns empty array for none', () => {
      const deps = generator['getComponentLibraryDependencies']('none');
      expect(deps).toEqual([]);
    });
  });

  describe('getComponentLibraryImports', () => {
    it('returns shadcn imports', () => {
      const imports = generator['getComponentLibraryImports']('shadcn');
      expect(imports.length).toBeGreaterThan(0);
      expect(imports[0]).toContain('Button');
    });

    it('returns radix imports', () => {
      const imports = generator['getComponentLibraryImports']('radix');
      expect(imports.length).toBeGreaterThan(0);
      expect(imports[0]).toContain('Dialog');
    });

    it('returns headlessui imports', () => {
      const imports = generator['getComponentLibraryImports']('headlessui');
      expect(imports.length).toBeGreaterThan(0);
      expect(imports[0]).toContain('Button');
    });

    it('returns primevue imports', () => {
      const imports = generator['getComponentLibraryImports']('primevue');
      expect(imports.length).toBeGreaterThan(0);
      expect(imports[0]).toContain('Button');
    });

    it('returns material imports', () => {
      const imports = generator['getComponentLibraryImports']('material');
      expect(imports.length).toBeGreaterThan(0);
      expect(imports[0]).toContain('Button');
    });

    it('returns empty array for none', () => {
      const imports = generator['getComponentLibraryImports']('none');
      expect(imports).toEqual([]);
    });
  });

  describe('generateComponentLibraryCode', () => {
    it('generates shadcn code', () => {
      const code = generator['generateComponentLibraryCode']('button', {}, 'shadcn');
      expect(code).toContain('Shadcn');
      expect(code).toContain('button');
    });

    it('generates radix code', () => {
      const code = generator['generateComponentLibraryCode']('dialog', {}, 'radix');
      expect(code).toContain('Radix');
      expect(code).toContain('dialog');
    });

    it('generates headlessui code', () => {
      const code = generator['generateComponentLibraryCode']('button', {}, 'headlessui');
      expect(code).toContain('Headless');
    });

    it('generates primevue code', () => {
      const code = generator['generateComponentLibraryCode']('button', {}, 'primevue');
      expect(code).toContain('PrimeVue');
    });

    it('generates material code', () => {
      const code = generator['generateComponentLibraryCode']('button', {}, 'material');
      expect(code).toContain('Material');
    });

    it('generates tailwind code for none', () => {
      const code = generator['generateComponentLibraryCode']('button', {}, 'none');
      expect(code).toContain('Tailwind');
    });
  });

  describe('validateParams', () => {
    it('validates valid project name', () => {
      const result = generator['validateParams']({ projectName: 'my-project' });
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('rejects empty project name', () => {
      const result = generator['validateParams']({ projectName: '   ' });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Project name cannot be empty');
    });

    it('rejects project name with invalid characters', () => {
      const result = generator['validateParams']({ projectName: 'my@project!' });
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('letters, numbers, hyphens, and underscores');
    });

    it('validates valid component type', () => {
      const result = generator['validateParams']({ componentType: 'Button' });
      expect(result.valid).toBe(true);
    });

    it('rejects empty component type', () => {
      const result = generator['validateParams']({ componentType: '   ' });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Component type cannot be empty');
    });

    it('rejects component type starting with number', () => {
      const result = generator['validateParams']({ componentType: '123Button' });
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('must start with a letter');
    });

    it('validates valid architecture', () => {
      const result = generator['validateParams']({ architecture: 'flat' });
      expect(result.valid).toBe(true);
    });

    it('rejects invalid architecture', () => {
      const result = generator['validateParams']({ architecture: 'invalid' as Architecture });
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('Invalid architecture');
    });

    it('validates all valid architectures', () => {
      const architectures: Architecture[] = ['flat', 'feature-based', 'atomic'];
      architectures.forEach((arch) => {
        const result = generator['validateParams']({ architecture: arch });
        expect(result.valid).toBe(true);
      });
    });

    it('validates valid state management', () => {
      const result = generator['validateParams']({ stateManagement: 'zustand' });
      expect(result.valid).toBe(true);
    });

    it('rejects invalid state management', () => {
      const result = generator['validateParams']({ stateManagement: 'invalid' as StateManagement });
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('Invalid state management');
    });

    it('validates all valid state management options', () => {
      const options: StateManagement[] = ['useState', 'zustand', 'pinia', 'signals', 'none'];
      options.forEach((opt) => {
        const result = generator['validateParams']({ stateManagement: opt });
        expect(result.valid).toBe(true);
      });
    });

    it('combines multiple validation errors', () => {
      const result = generator['validateParams']({
        projectName: 'bad@name',
        componentType: '123',
        architecture: 'invalid' as Architecture,
      });
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });

  describe('formatComponentName', () => {
    it('converts kebab-case to PascalCase', () => {
      const result = generator['formatComponentName']('my-button');
      expect(result).toBe('MyButton');
    });

    it('converts single word to PascalCase', () => {
      const result = generator['formatComponentName']('button');
      expect(result).toBe('Button');
    });

    it('handles already PascalCase names', () => {
      const result = generator['formatComponentName']('Button');
      expect(result).toBe('Button');
    });

    it('handles multiple hyphens', () => {
      const result = generator['formatComponentName']('custom-nav-bar-item');
      expect(result).toBe('CustomNavBarItem');
    });
  });

  describe('getFileExtension', () => {
    it('returns tsx for react', () => {
      const gen = new TestGenerator('react');
      expect(gen['getFileExtension']()).toBe('tsx');
    });

    it('returns tsx for nextjs', () => {
      const gen = new TestGenerator('nextjs');
      expect(gen['getFileExtension']()).toBe('tsx');
    });

    it('returns svelte for svelte', () => {
      const gen = new TestGenerator('svelte');
      expect(gen['getFileExtension']()).toBe('svelte');
    });

    it('returns vue for vue', () => {
      const gen = new TestGenerator('vue');
      expect(gen['getFileExtension']()).toBe('vue');
    });

    it('returns ts for angular', () => {
      const gen = new TestGenerator('angular');
      expect(gen['getFileExtension']()).toBe('ts');
    });

    it('returns html for html', () => {
      const gen = new TestGenerator('html');
      expect(gen['getFileExtension']()).toBe('html');
    });
  });

  describe('createPackageJson', () => {
    it('creates valid JSON', () => {
      const json = generator['createPackageJson']('test-app', { react: '^18.0.0' }, { vite: '^4.0.0' });
      const parsed = JSON.parse(json);
      expect(parsed).toHaveProperty('name', 'test-app');
    });

    it('includes project name', () => {
      const json = generator['createPackageJson']('my-app', {}, {});
      const parsed = JSON.parse(json);
      expect(parsed.name).toBe('my-app');
    });

    it('includes dependencies', () => {
      const json = generator['createPackageJson']('app', { react: '^18.0.0', lodash: '^4.17.21' }, {});
      const parsed = JSON.parse(json);
      expect(parsed.dependencies).toHaveProperty('react', '^18.0.0');
      expect(parsed.dependencies).toHaveProperty('lodash', '^4.17.21');
    });

    it('includes default devDependencies', () => {
      const json = generator['createPackageJson']('app', {}, {});
      const parsed = JSON.parse(json);
      expect(parsed.devDependencies).toHaveProperty('typescript');
      expect(parsed.devDependencies).toHaveProperty('eslint');
      expect(parsed.devDependencies).toHaveProperty('prettier');
    });

    it('merges custom devDependencies', () => {
      const json = generator['createPackageJson']('app', {}, { jest: '^29.0.0' });
      const parsed = JSON.parse(json);
      expect(parsed.devDependencies).toHaveProperty('jest', '^29.0.0');
      expect(parsed.devDependencies).toHaveProperty('typescript');
    });

    it('sets type to module', () => {
      const json = generator['createPackageJson']('app', {}, {});
      const parsed = JSON.parse(json);
      expect(parsed.type).toBe('module');
    });

    it('sets private to true', () => {
      const json = generator['createPackageJson']('app', {}, {});
      const parsed = JSON.parse(json);
      expect(parsed.private).toBe(true);
    });

    it('includes scripts', () => {
      const json = generator['createPackageJson']('app', {}, {});
      const parsed = JSON.parse(json);
      expect(parsed.scripts).toBeDefined();
      expect(Object.keys(parsed.scripts).length).toBeGreaterThan(0);
    });
  });

  describe('getDefaultScripts', () => {
    it('returns react scripts', () => {
      const gen = new TestGenerator('react');
      const scripts = gen['getDefaultScripts']();
      expect(scripts).toHaveProperty('dev', 'vite');
      expect(scripts).toHaveProperty('build');
      expect(scripts).toHaveProperty('lint');
    });

    it('returns vue scripts', () => {
      const gen = new TestGenerator('vue');
      const scripts = gen['getDefaultScripts']();
      expect(scripts).toHaveProperty('dev', 'vite');
      expect(scripts.build).toContain('vue-tsc');
    });

    it('returns angular scripts', () => {
      const gen = new TestGenerator('angular');
      const scripts = gen['getDefaultScripts']();
      expect(scripts).toHaveProperty('start', 'ng serve');
      expect(scripts).toHaveProperty('build', 'ng build');
    });

    it('returns svelte scripts', () => {
      const gen = new TestGenerator('svelte');
      const scripts = gen['getDefaultScripts']();
      expect(scripts).toHaveProperty('dev', 'vite dev');
    });

    it('returns html scripts', () => {
      const gen = new TestGenerator('html');
      const scripts = gen['getDefaultScripts']();
      expect(scripts).toHaveProperty('dev', 'vite');
    });
  });

  describe('createTsConfig', () => {
    it('creates valid JSON', () => {
      const json = generator['createTsConfig']();
      const parsed = JSON.parse(json);
      expect(parsed).toHaveProperty('compilerOptions');
    });

    it('includes compiler options', () => {
      const json = generator['createTsConfig']();
      const parsed = JSON.parse(json);
      expect(parsed.compilerOptions).toHaveProperty('target');
      expect(parsed.compilerOptions).toHaveProperty('module');
      expect(parsed.compilerOptions).toHaveProperty('strict', true);
    });

    it('sets ESNext module', () => {
      const json = generator['createTsConfig']();
      const parsed = JSON.parse(json);
      expect(parsed.compilerOptions.module).toBe('ESNext');
    });
  });

  describe('createViteConfig', () => {
    it('includes import statement', () => {
      const config = generator['createViteConfig']();
      expect(config).toContain('import');
      expect(config).toContain('defineConfig');
    });

    it('includes plugins', () => {
      const config = generator['createViteConfig']();
      expect(config).toContain('plugins');
    });

    it('includes server port', () => {
      const config = generator['createViteConfig']();
      expect(config).toContain('port: 3000');
    });

    it('includes build config', () => {
      const config = generator['createViteConfig']();
      expect(config).toContain('outDir');
    });
  });

  describe('createReadme', () => {
    it('includes project name', () => {
      const readme = generator['createReadme']('my-awesome-app');
      expect(readme).toContain('my-awesome-app');
    });

    it('includes getting started section', () => {
      const readme = generator['createReadme']('app');
      expect(readme).toContain('Getting Started');
      expect(readme).toContain('npm install');
    });

    it('includes available scripts', () => {
      const readme = generator['createReadme']('app');
      expect(readme).toContain('Available Scripts');
      expect(readme).toContain('npm run dev');
    });

    it('includes framework documentation link', () => {
      const readme = generator['createReadme']('app');
      expect(readme).toContain('Documentation');
      expect(readme).toContain('https://');
    });
  });

  describe('getFrameworkDocsUrl', () => {
    const testCases: Array<[Framework, string]> = [
      ['react', 'https://react.dev/'],
      ['nextjs', 'https://nextjs.org/docs'],
      ['vue', 'https://vuejs.org/guide/'],
      ['angular', 'https://angular.dev/docs'],
      ['svelte', 'https://svelte.dev/docs'],
      ['html', 'https://developer.mozilla.org/en-US/docs/Web/HTML'],
    ];

    testCases.forEach(([framework, expectedUrl]) => {
      it(`returns correct URL for ${framework}`, () => {
        const gen = new TestGenerator(framework);
        const url = gen['getFrameworkDocsUrl']();
        expect(url).toBe(expectedUrl);
      });
    });
  });
});
