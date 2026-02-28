import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { designContextStore, loadConfig } from '@forgespace/siza-gen';
import { registerGenerateForm, generateFormFiles } from '../../tools/generate-form.js';

describe('generate_form tool', () => {
  beforeAll(() => {
    loadConfig();
  });

  it('registers without errors', () => {
    const server = new McpServer({ name: 'test', version: '1.0.0' });
    expect(() => registerGenerateForm(server)).not.toThrow();
  });

  it('registers on multiple servers without side effects', () => {
    const s1 = new McpServer({ name: 't1', version: '1.0.0' });
    const s2 = new McpServer({ name: 't2', version: '1.0.0' });
    expect(() => {
      registerGenerateForm(s1);
      registerGenerateForm(s2);
    }).not.toThrow();
  });

  describe('preset form types', () => {
    const ctx = designContextStore.get();

    it.each(['login', 'signup', 'contact', 'checkout', 'settings', 'search', 'newsletter'] as const)(
      '%s generates valid output',
      (formType) => {
        const files = generateFormFiles(formType, formType, 'react', [], 'zod', 'none', false, false, ctx);
        expect(files).toBeDefined();
        expect(files.length).toBeGreaterThanOrEqual(2);
        expect(files[0].content).toContain('export');
      }
    );

    it('login preset includes email and password fields', () => {
      const files = generateFormFiles('login', 'login', 'react', [], 'zod', 'none', false, false, ctx);
      const form = files[0].content;
      expect(form).toContain('field-email');
      expect(form).toContain('field-password');
    });

    it('signup preset includes confirm password', () => {
      const files = generateFormFiles('signup', 'signup', 'react', [], 'zod', 'none', false, false, ctx);
      const form = files[0].content;
      expect(form).toContain('field-confirm_password');
    });
  });

  describe('custom fields', () => {
    const ctx = designContextStore.get();
    const customFields = [
      {
        name: 'username',
        type: 'text',
        label: 'Username',
        required: true,
      },
      {
        name: 'age',
        type: 'number',
        label: 'Age',
        required: false,
      },
      {
        name: 'role',
        type: 'select',
        label: 'Role',
        required: true,
        options: ['Admin', 'User', 'Editor'],
      },
    ];

    it('generates form with custom fields', () => {
      const files = generateFormFiles('custom', 'custom-form', 'react', customFields, 'zod', 'none', false, false, ctx);
      expect(files.length).toBeGreaterThanOrEqual(2);
      const form = files[0].content;
      expect(form).toContain('field-username');
      expect(form).toContain('field-age');
      expect(form).toContain('field-role');
    });

    it('generates select options', () => {
      const files = generateFormFiles(
        'custom',
        'custom-form',
        'react',
        customFields,
        'none',
        'none',
        false,
        false,
        ctx
      );
      const form = files[0].content;
      expect(form).toContain('Admin');
      expect(form).toContain('Editor');
    });
  });

  describe('validation schemas', () => {
    const ctx = designContextStore.get();
    const fields = [
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        required: true,
        validation: 'email',
      },
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        required: true,
        validation: 'min:2',
      },
    ];

    it('generates Zod schema', () => {
      const files = generateFormFiles('custom', 'test-form', 'react', fields, 'zod', 'none', false, false, ctx);
      const schema = files.find((f) => f.path.endsWith('.schema.ts'));
      expect(schema).toBeDefined();
      expect(schema!.content).toContain("import { z } from 'zod'");
      expect(schema!.content).toContain('z.string().email()');
      expect(schema!.content).toContain('.min(2)');
    });

    it('generates Yup schema', () => {
      const files = generateFormFiles('custom', 'test-form', 'react', fields, 'yup', 'none', false, false, ctx);
      const schema = files.find((f) => f.path.endsWith('.schema.ts'));
      expect(schema).toBeDefined();
      expect(schema!.content).toContain("import * as yup from 'yup'");
      expect(schema!.content).toContain('yup.string().email()');
    });

    it('skips schema when validation is none', () => {
      const files = generateFormFiles('custom', 'test-form', 'react', fields, 'none', 'none', false, false, ctx);
      const schema = files.find((f) => f.path.endsWith('.schema.ts'));
      expect(schema).toBeUndefined();
    });
  });

  describe('framework variants', () => {
    const ctx = designContextStore.get();

    it('generates React component', () => {
      const files = generateFormFiles('login', 'login', 'react', [], 'zod', 'none', false, false, ctx);
      expect(files[0].path).toMatch(/\.tsx$/);
      expect(files[0].content).toContain('export default function');
      expect(files[0].content).not.toContain("'use client'");
    });

    it('generates Next.js component with use client', () => {
      const files = generateFormFiles('login', 'login', 'nextjs', [], 'zod', 'none', false, false, ctx);
      expect(files[0].path).toMatch(/\.tsx$/);
      expect(files[0].content).toContain("'use client'");
    });

    it('generates Vue SFC', () => {
      const files = generateFormFiles('login', 'login', 'vue', [], 'zod', 'none', false, false, ctx);
      expect(files[0].path).toMatch(/\.vue$/);
      expect(files[0].content).toContain('<script setup');
      expect(files[0].content).toContain('<template>');
      expect(files[0].content).toContain('class=');
      expect(files[0].content).not.toContain('className=');
    });

    it('generates Angular component', () => {
      const files = generateFormFiles('login', 'login', 'angular', [], 'zod', 'none', false, false, ctx);
      expect(files[0].path).toMatch(/\.component\.ts$/);
      expect(files[0].content).toContain('@Component');
      expect(files[0].content).toContain('FormsModule');
    });

    it('generates Svelte component', () => {
      const files = generateFormFiles('login', 'login', 'svelte', [], 'zod', 'none', false, false, ctx);
      expect(files[0].path).toMatch(/\.svelte$/);
      expect(files[0].content).toContain('<script');
      expect(files[0].content).toContain('class=');
    });

    it('generates HTML page', () => {
      const files = generateFormFiles('login', 'login', 'html', [], 'none', 'none', false, false, ctx);
      expect(files[0].path).toMatch(/\.html$/);
      expect(files[0].content).toContain('<!DOCTYPE html>');
      expect(files[0].content).toContain('tailwindcss');
    });
  });

  describe('multi-step forms', () => {
    const ctx = designContextStore.get();

    it('generates step navigation for checkout', () => {
      const files = generateFormFiles('checkout', 'checkout', 'react', [], 'zod', 'none', false, true, ctx);
      const form = files[0].content;
      expect(form).toContain('useState');
      expect(form).toContain('step');
      expect(form).toContain('Back');
      expect(form).toContain('Next');
    });

    it('generates progress indicator', () => {
      const files = generateFormFiles('checkout', 'checkout', 'react', [], 'zod', 'none', false, true, ctx);
      const form = files[0].content;
      expect(form).toContain('Step');
    });

    it('does not use multi-step for small forms', () => {
      const files = generateFormFiles('newsletter', 'newsletter', 'react', [], 'zod', 'none', false, true, ctx);
      const form = files[0].content;
      expect(form).not.toContain('useState');
    });
  });

  describe('component library styling', () => {
    const ctx = designContextStore.get();

    it('uses shadcn classes when specified', () => {
      const files = generateFormFiles('login', 'login', 'react', [], 'zod', 'shadcn', false, false, ctx);
      const form = files[0].content;
      expect(form).toContain('bg-primary');
      expect(form).toContain('text-primary-foreground');
      expect(form).toContain('border-input');
    });

    it('uses standard Tailwind classes when none', () => {
      const files = generateFormFiles('login', 'login', 'react', [], 'zod', 'none', false, false, ctx);
      const form = files[0].content;
      expect(form).toContain('bg-blue-600');
    });
  });

  describe('accessibility', () => {
    const ctx = designContextStore.get();

    it('includes labels for all fields', () => {
      const files = generateFormFiles('contact', 'contact', 'react', [], 'zod', 'none', false, false, ctx);
      const form = files[0].content;
      expect(form).toContain('htmlFor="field-name"');
      expect(form).toContain('htmlFor="field-email"');
      expect(form).toContain('htmlFor="field-message"');
    });

    it('includes aria-describedby for error messages', () => {
      const files = generateFormFiles('login', 'login', 'react', [], 'zod', 'none', false, false, ctx);
      const form = files[0].content;
      expect(form).toContain('aria-describedby="field-email-error"');
    });

    it('includes role=alert on error containers', () => {
      const files = generateFormFiles('login', 'login', 'react', [], 'zod', 'none', false, false, ctx);
      const form = files[0].content;
      expect(form).toContain('role="alert"');
    });

    it('includes aria-label on form element', () => {
      const files = generateFormFiles('login', 'login', 'react', [], 'zod', 'none', false, false, ctx);
      const form = files[0].content;
      expect(form).toContain('aria-label=');
    });
  });

  describe('dark mode', () => {
    const ctx = designContextStore.get();

    it('includes dark mode classes when enabled', () => {
      const files = generateFormFiles('login', 'login', 'react', [], 'zod', 'none', true, false, ctx);
      const form = files[0].content;
      expect(form).toContain('dark:');
    });

    it('excludes dark mode classes when disabled', () => {
      const files = generateFormFiles('login', 'login', 'react', [], 'zod', 'none', false, false, ctx);
      const form = files[0].content;
      expect(form).not.toContain('dark:');
    });
  });

  describe('types file', () => {
    const ctx = designContextStore.get();

    it('generates TypeScript interface', () => {
      const files = generateFormFiles('login', 'login', 'react', [], 'zod', 'none', false, false, ctx);
      const types = files.find((f) => f.path.endsWith('.types.ts'));
      expect(types).toBeDefined();
      expect(types!.content).toContain('export interface');
      expect(types!.content).toContain('email');
      expect(types!.content).toContain('password');
    });
  });
});
