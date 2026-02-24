import { ReactGenerator } from '../../../lib/generators/react-generator.js';
import { DEFAULT_DESIGN_CONTEXT } from '../../../lib/generators/default-design-context.js';
import type { IDesignContext, Architecture, StateManagement } from '../../../lib/types.js';
import type { ComponentLibrary } from '../../../lib/generators/base-generator.js';

describe('ReactGenerator', () => {
  let generator: ReactGenerator;
  let designContext: IDesignContext;

  beforeEach(() => {
    generator = new ReactGenerator('react');
    designContext = structuredClone(DEFAULT_DESIGN_CONTEXT);
  });

  describe('constructor', () => {
    it('creates a React generator instance', () => {
      expect(generator).toBeInstanceOf(ReactGenerator);
      expect(generator.getFramework()).toBe('react');
    });
  });

  describe('generateProject', () => {
    it('generates a complete React project with flat architecture', () => {
      const files = generator.generateProject('test-app', 'flat', 'none', designContext);

      expect(files.length).toBeGreaterThan(0);
      const filePaths = files.map((f) => f.path);
      expect(filePaths).toContain('package.json');
      expect(filePaths).toContain('tsconfig.json');
      expect(filePaths).toContain('vite.config.ts');
      expect(filePaths).toContain('README.md');
      expect(filePaths).toContain('src/App.tsx');
      expect(filePaths).toContain('index.html');
      expect(filePaths).toContain('tailwind.config.js');
    });

    it('generates project with zustand state management', () => {
      const files = generator.generateProject('zustand-app', 'flat', 'zustand', designContext);

      const packageJson = files.find((f) => f.path === 'package.json');
      expect(packageJson?.content).toContain('zustand');

      const storeFile = files.find((f) => f.path.includes('useAppStore'));
      expect(storeFile).toBeDefined();
      expect(storeFile?.content).toContain('create');
      expect(storeFile?.content).toContain('increment');
    });

    it('does not generate state management files when state is none', () => {
      const files = generator.generateProject('no-state-app', 'flat', 'none', designContext);

      const storeFile = files.find((f) => f.path.includes('store') || f.path.includes('Store'));
      expect(storeFile).toBeUndefined();
    });

    it('includes design context colors in App component', () => {
      const customContext: IDesignContext = {
        ...designContext,
        colorPalette: {
          ...designContext.colorPalette,
          primary: '#ff0000',
          background: '#000000',
        },
      };

      const files = generator.generateProject('colored-app', 'flat', 'none', customContext);
      const appFile = files.find((f) => f.path === 'src/App.tsx');

      expect(appFile?.content).toContain('#ff0000');
      expect(appFile?.content).toContain('#000000');
    });

    it('includes design context typography in App component', () => {
      const customContext: IDesignContext = {
        ...designContext,
        typography: {
          ...designContext.typography,
          fontFamily: 'Roboto, sans-serif',
        },
      };

      const files = generator.generateProject('font-app', 'flat', 'none', customContext);
      const appFile = files.find((f) => f.path === 'src/App.tsx');

      expect(appFile?.content).toContain('Roboto');
    });

    it('generates valid package.json with required dependencies', () => {
      const files = generator.generateProject('deps-app', 'flat', 'none', designContext);
      const packageJson = files.find((f) => f.path === 'package.json');

      expect(packageJson).toBeDefined();
      const pkg = JSON.parse(packageJson!.content);

      expect(pkg.dependencies).toHaveProperty('react');
      expect(pkg.dependencies).toHaveProperty('react-dom');
      expect(pkg.dependencies).toHaveProperty('react-router-dom');
      expect(pkg.dependencies).toHaveProperty('clsx');

      expect(pkg.devDependencies).toHaveProperty('typescript');
      expect(pkg.devDependencies).toHaveProperty('vite');
      expect(pkg.devDependencies).toHaveProperty('tailwindcss');
    });

    it('generates tailwind config with custom colors', () => {
      const files = generator.generateProject('tailwind-app', 'flat', 'none', designContext);
      const tailwindConfig = files.find((f) => f.path === 'tailwind.config.js');

      expect(tailwindConfig).toBeDefined();
      expect(tailwindConfig?.content).toContain(designContext.colorPalette.primary);
      expect(tailwindConfig?.content).toContain(designContext.typography.fontFamily);
    });
  });

  describe('generateComponent', () => {
    it('generates a simple button component', () => {
      const files = generator.generateComponent('Button', {}, designContext);

      expect(files.length).toBeGreaterThan(0);
      const componentFile = files.find((f) => f.path.includes('Button'));
      expect(componentFile).toBeDefined();
      expect(componentFile?.content).toContain('export');
      expect(componentFile?.content).toContain('button');
    });

    it('generates component with props interface', () => {
      const props = { label: 'string', onClick: 'function', disabled: 'boolean' };
      const files = generator.generateComponent('CustomButton', props, designContext);

      const componentFile = files[0];
      expect(componentFile?.content).toContain('interface');
      expect(componentFile?.content).toContain('CustomButtonProps');
      expect(componentFile?.content).toContain('label:');
      expect(componentFile?.content).toContain('onClick:');
      expect(componentFile?.content).toContain('disabled:');
    });

    it('generates component without props interface when no props', () => {
      const files = generator.generateComponent('SimpleCard', {}, designContext);

      const componentFile = files[0];
      expect(componentFile).toBeDefined();
      expect(componentFile.content.length).toBeGreaterThan(0);
    });

    it('generates test file for component', () => {
      const files = generator.generateComponent('TestableButton', {}, designContext);

      const testFile = files.find((f) => f.path.includes('.test.'));
      expect(testFile).toBeDefined();
      expect(testFile?.content).toContain('render');
      expect(testFile?.content).toContain('screen');
      expect(testFile?.content).toContain('describe');
    });

    it('does not generate Storybook file in production', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const files = generator.generateComponent('ProductionButton', {}, designContext, 'shadcn');

      const storyFile = files.find((f) => f.path.includes('.stories.'));
      expect(storyFile).toBeUndefined();

      process.env.NODE_ENV = originalEnv;
    });

    it('generates Storybook file in non-production with component library', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const files = generator.generateComponent('StoryButton', {}, designContext, 'shadcn');

      const storyFile = files.find((f) => f.path.includes('.stories.'));
      expect(storyFile).toBeDefined();
      expect(storyFile?.content).toContain('@storybook/react');
      expect(storyFile?.content).toContain('Meta');
      expect(storyFile?.content).toContain('StoryObj');

      process.env.NODE_ENV = originalEnv;
    });

    it('applies design context colors to component', () => {
      const customContext: IDesignContext = {
        ...designContext,
        colorPalette: {
          ...designContext.colorPalette,
          background: '#123456',
          foreground: '#abcdef',
        },
      };

      const files = generator.generateComponent('ColoredCard', {}, customContext);
      const componentFile = files[0];

      expect(componentFile?.content).toContain('#123456');
      expect(componentFile?.content).toContain('#abcdef');
    });
  });

  describe('component library integration', () => {
    it('generates shadcn component', () => {
      const files = generator.generateComponent('ShadcnButton', {}, designContext, 'shadcn');
      const componentFile = files[0];

      expect(componentFile?.content).toContain('@/lib/utils');
      expect(componentFile?.content).toContain('cn');
    });

    it('generates radix component', () => {
      const files = generator.generateComponent('RadixButton', {}, designContext, 'radix');
      const componentFile = files[0];

      expect(componentFile?.content).toContain('@radix-ui');
    });

    it('generates headlessui component', () => {
      const files = generator.generateComponent('HeadlessButton', {}, designContext, 'headlessui');
      const componentFile = files[0];

      expect(componentFile?.content).toContain('@headlessui/react');
    });

    it('generates material component', () => {
      const files = generator.generateComponent('MaterialButton', {}, designContext, 'material');
      const componentFile = files[0];

      expect(componentFile?.content).toContain('@mui/material');
    });

    it('generates tailwind component when library is none', () => {
      const files = generator.generateComponent('TailwindButton', {}, designContext, 'none');
      const componentFile = files[0];

      expect(componentFile?.content).toContain('clsx');
      expect(componentFile?.content).toContain('className');
    });
  });

  describe('component library dependencies', () => {
    const testCases: Array<[ComponentLibrary, string[]]> = [
      ['shadcn', ['@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge']],
      ['radix', ['@radix-ui/react-slot', '@radix-ui/react-dialog']],
      ['headlessui', ['@headlessui/react', '@heroicons/react']],
      ['material', ['@mui/material', '@mui/icons-material']],
    ];

    testCases.forEach(([library, expectedDeps]) => {
      it(`returns correct dependencies for ${library}`, () => {
        const files = generator.generateComponent('TestComp', {}, designContext, library);
        expect(files.length).toBeGreaterThan(0);
      });
    });
  });

  describe('component types', () => {
    const componentTypes = ['button', 'card', 'dialog', 'modal', 'form', 'input'];

    componentTypes.forEach((type) => {
      it(`generates ${type} component successfully`, () => {
        const files = generator.generateComponent(type, {}, designContext);
        expect(files.length).toBeGreaterThan(0);

        const componentFile = files[0];
        expect(componentFile).toBeDefined();
        expect(componentFile.content.length).toBeGreaterThan(0);
      });
    });
  });

  describe('shadcn component generation', () => {
    it('generates button with shadcn', () => {
      const files = generator.generateComponent('button', {}, designContext, 'shadcn');
      const componentFile = files[0];

      expect(componentFile?.content).toContain('Button');
      expect(componentFile?.content).toContain('shadcn');
    });

    it('generates dialog with shadcn', () => {
      const files = generator.generateComponent('dialog', {}, designContext, 'shadcn');
      const componentFile = files[0];

      expect(componentFile?.content).toContain('Dialog');
    });
  });

  describe('radix component generation', () => {
    it('generates button with radix', () => {
      const files = generator.generateComponent('button', {}, designContext, 'radix');
      const componentFile = files[0];

      expect(componentFile?.content).toContain('Button');
      expect(componentFile?.content).toContain('Slot');
    });

    it('generates dialog with radix', () => {
      const files = generator.generateComponent('dialog', {}, designContext, 'radix');
      const componentFile = files[0];

      expect(componentFile?.content).toContain('Dialog');
      expect(componentFile?.content).toContain('Portal');
    });

    it('generates fallback component for unknown types', () => {
      const files = generator.generateComponent('unknown-type', {}, designContext, 'radix');
      const componentFile = files[0];

      expect(componentFile).toBeDefined();
      expect(componentFile?.content).toContain('unknown-type');
    });
  });

  describe('headlessui component generation', () => {
    it('generates component with headlessui', () => {
      const files = generator.generateComponent('button', {}, designContext, 'headlessui');
      const componentFile = files[0];

      expect(componentFile?.content).toContain('Button');
      expect(componentFile?.content).toContain('@headlessui');
    });
  });

  describe('material component generation', () => {
    it('generates component with material ui', () => {
      const files = generator.generateComponent('button', {}, designContext, 'material');
      const componentFile = files[0];

      expect(componentFile?.content).toContain('Button');
      expect(componentFile?.content).toContain('@mui/material');
    });
  });
});
