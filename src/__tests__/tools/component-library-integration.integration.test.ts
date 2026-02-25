import { describe, it, expect, beforeEach } from '@jest/globals';
import { generateComponent } from '../../tools/generate-ui-component.js';
import type { IDesignContext } from '@forgespace/siza-gen';

describe('Component Library Integration', () => {
  let mockDesignContext: IDesignContext;

  beforeEach(() => {
    mockDesignContext = {
      typography: {
        fontFamily: 'Inter',
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
        },
        fontWeight: {
          normal: '400',
          medium: '500',
          semibold: '600',
          bold: '700',
        },
        lineHeight: {
          tight: '1.25',
          normal: '1.5',
          relaxed: '1.75',
        },
      },
      colorPalette: {
        primary: '#3b82f6',
        primaryForeground: '#ffffff',
        secondary: '#64748b',
        secondaryForeground: '#ffffff',
        accent: '#f59e0b',
        accentForeground: '#000000',
        background: '#ffffff',
        foreground: '#0f172a',
        muted: '#f1f5f9',
        mutedForeground: '#64748b',
        border: '#e2e8f0',
        destructive: '#ef4444',
        destructiveForeground: '#ffffff',
      },
      spacing: {
        unit: 4,
        scale: [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24],
      },
      borderRadius: {
        sm: '0.125rem',
        md: '0.25rem',
        lg: '0.5rem',
        full: '9999px',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      },
    };
  });

  describe('shadcn/ui Integration', () => {
    it('should generate shadcn/ui button component', () => {
      const files = generateComponent('button', 'react', mockDesignContext, {}, undefined, undefined, 'shadcn');

      expect(files).toHaveLength(3); // Component + test + Storybook
      const buttonFile = files[0];

      // Should contain shadcn/ui imports (note: actual path uses relative imports)
      expect(buttonFile.content).toContain('import { cn } from "@/lib/utils"');
      expect(buttonFile.content).toContain('import { Button } from "components/ui/button"');

      // Should use Button component instead of button element
      expect(buttonFile.content).toContain('<Button');
      expect(buttonFile.content).not.toContain('<button');
    });

    it('should generate shadcn/ui card component', () => {
      const files = generateComponent('card', 'react', mockDesignContext, {}, undefined, undefined, 'shadcn');

      expect(files).toHaveLength(3); // Component + test + Storybook
      const cardFile = files[0];

      // Should contain card imports
      expect(cardFile.content).toContain(
        'import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card"'
      );
    });

    it('should generate shadcn/ui input component', () => {
      const files = generateComponent('input', 'react', mockDesignContext, {}, undefined, undefined, 'shadcn');

      expect(files).toHaveLength(3); // Component + test + Storybook
      const inputFile = files[0];

      // Should contain input imports
      expect(inputFile.content).toContain('import { Input } from "components/ui/input"');
      // Note: Input component generates a Card wrapper, not a div
      expect(inputFile.content).toContain('<Card className={cn("w-full max-w-md", props.className)}>');
    });

    it('should generate shadcn/ui dialog component', () => {
      const files = generateComponent('dialog', 'react', mockDesignContext, {}, undefined, undefined, 'shadcn');

      expect(files).toHaveLength(3); // Component + test + Storybook
      const dialogFile = files[0];

      // Should contain card wrapper imports (shadcn dialog uses Card component)
      expect(dialogFile.content).toContain(
        'import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card"'
      );
    });
  });

  describe('Radix UI Integration', () => {
    it('should generate Radix UI button component', () => {
      const files = generateComponent('button', 'react', mockDesignContext, {}, undefined, undefined, 'radix');

      expect(files).toHaveLength(3); // Component + test + Storybook
      const buttonFile = files[0];

      // Should contain Radix UI imports (note: actual uses namespace imports with aliases)
      expect(buttonFile.content).toContain('import * as Dialog from "@radix-ui/react-dialog"');
      expect(buttonFile.content).toContain('<Button');
      expect(buttonFile.content).not.toContain('<button>');
    });

    it('should generate Radix UI dialog component', () => {
      const files = generateComponent('dialog', 'react', mockDesignContext, {}, undefined, undefined, 'radix');

      expect(files).toHaveLength(3); // Component + test + Storybook
      const dialogFile = files[0];

      // Should contain dialog imports (note: actual uses namespace imports with aliases)
      expect(dialogFile.content).toContain('import * as Dialog from "@radix-ui/react-dialog"');
    });
  });

  describe('Headless UI Integration', () => {
    it('should generate Headless UI button component', () => {
      const files = generateComponent('button', 'react', mockDesignContext, {}, undefined, undefined, 'headlessui');

      expect(files).toHaveLength(3); // Component + test + Storybook
      const buttonFile = files[0];

      // Should contain Headless UI imports
      expect(buttonFile.content).toContain('import { Button } from "@headlessui/react"');
      expect(buttonFile.content).toContain('<Button');
      expect(buttonFile.content).not.toContain('<button');
    });

    it('should generate Headless UI dialog component', () => {
      const files = generateComponent('dialog', 'react', mockDesignContext, {}, undefined, undefined, 'headlessui');

      expect(files).toHaveLength(3); // Component + test + Storybook
      const dialogFile = files[0];

      // Should contain dialog imports
      expect(dialogFile.content).toContain('import { Dialog } from "@headlessui/react"');
    });
  });

  describe('Material UI Integration', () => {
    it('should generate Material UI button component', () => {
      const files = generateComponent('button', 'react', mockDesignContext, {}, undefined, undefined, 'material');

      expect(files).toHaveLength(3); // Component + test + Storybook
      const buttonFile = files[0];

      // Should contain Material UI imports
      expect(buttonFile.content).toContain('import Button from "@mui/material/Button"');
      expect(buttonFile.content).toContain('<Button');
      expect(buttonFile.content).not.toContain('<button');
    });

    it('should generate Material UI card component', () => {
      const files = generateComponent('card', 'react', mockDesignContext, {}, undefined, undefined, 'material');

      expect(files).toHaveLength(3); // Component + test + Storybook
      const cardFile = files[0];

      // Should contain card imports
      expect(cardFile.content).toContain('import Card from "@mui/material/Card"');
      expect(cardFile.content).toContain('import CardContent from "@mui/material/CardContent"');
    });

    it('should generate Material UI text field component', () => {
      const files = generateComponent('input', 'react', mockDesignContext, {}, undefined, undefined, 'material');

      expect(files).toHaveLength(3); // Component + test + Storybook
      const inputFile = files[0];

      // Should contain TextField import
      expect(inputFile.content).toContain('import TextField from "@mui/material/TextField"');
    });
  });

  describe('No Component Library', () => {
    it('should generate raw Tailwind CSS when no library specified', () => {
      const files = generateComponent('button', 'react', mockDesignContext, {}, undefined, undefined, 'none');

      expect(files).toHaveLength(2); // Component + test file
      const buttonFile = files.find((f) => f.path.includes('.tsx'));

      if (!buttonFile) {
        throw new Error('Component file not found');
      }

      // Should use regular button element with Tailwind classes
      expect(buttonFile.content).toContain('<button');
      expect(buttonFile.content).not.toContain('<Button');
      // Specifically check no Button component import
      expect(buttonFile.content).not.toMatch(/import\s*\{\s*Button\s*\}/);
    });
  });

  describe('Cross-Framework Support', () => {
    it('should support Vue with PrimeVue', () => {
      const files = generateComponent('button', 'vue', mockDesignContext, {}, undefined, undefined, 'primevue');

      expect(files).toHaveLength(2); // Component + test file
      const vueFile = files.find((f) => f.path.includes('.vue'));

      if (!vueFile) {
        throw new Error('Vue component file not found');
      }

      // Should be a Vue component
      expect(vueFile.path).toContain('.vue');
      expect(vueFile.content).toContain('<script setup lang="ts">');
      expect(vueFile.content).toContain('<template>');
      expect(vueFile.content).toContain('Button');
      expect(vueFile.content).toContain('primevue/button');
    });

    it('should support Angular with Material UI', () => {
      const files = generateComponent('button', 'angular', mockDesignContext, {}, undefined, undefined, 'material');

      expect(files).toHaveLength(2); // Component + test file
      const angularFile = files.find((f) => f.path.includes('.component.ts'));

      if (!angularFile) {
        throw new Error('Angular component file not found');
      }

      // Should be an Angular component
      expect(angularFile.path).toContain('.component.ts');
      expect(angularFile.content).toContain('@Component');
      expect(angularFile.content).toContain('selector:');
      expect(angularFile.content).toContain('MatButton');
      expect(angularFile.content).toContain('@angular/material/button');
    });

    it('should support Svelte with Headless UI', () => {
      const files = generateComponent('button', 'svelte', mockDesignContext, {}, undefined, undefined, 'headlessui');

      expect(files).toHaveLength(2); // Component + test file
      const svelteFile = files.find((f) => f.path.includes('.svelte'));

      if (!svelteFile) {
        throw new Error('Svelte component file not found');
      }

      // Should be a Svelte component
      expect(svelteFile.path).toContain('.svelte');
      expect(svelteFile.content).toContain('<script lang="ts">');
      expect(svelteFile.content).not.toContain('<template>');
      expect(svelteFile.content).toContain('Button');
      expect(svelteFile.content).toContain('@headlessui/svelte');
    });

    it('should ignore component library for HTML framework', () => {
      const files = generateComponent('button', 'html', mockDesignContext, {}, undefined, undefined, 'shadcn');

      expect(files).toHaveLength(1); // HTML generator only creates 1 file
      const htmlFile = files[0];

      // Should be HTML with vanilla CSS
      expect(htmlFile.path).toContain('.html');
      expect(htmlFile.content).toContain('<!DOCTYPE html>');
      expect(htmlFile.content).toContain('<script src="https://cdn.tailwindcss.com">');
      expect(htmlFile.content).not.toContain('<Button');
    });
  });
});
