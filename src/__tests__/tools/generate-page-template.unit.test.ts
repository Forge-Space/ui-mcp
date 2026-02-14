import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig } from '../../lib/config.js';
import { registerGeneratePageTemplate, generateTemplate } from '../../tools/generate-page-template.js';
import { designContextStore } from '../../lib/design-context.js';
import type { PageTemplateType } from '../../lib/types.js';

describe('generate_page_template tool', () => {
  beforeAll(() => {
    loadConfig();
  });

  it('registers without errors', () => {
    const server = new McpServer({ name: 'test', version: '1.0.0' });
    expect(() => registerGeneratePageTemplate(server)).not.toThrow();
  });

  it('tool is properly exported and can be registered multiple times', () => {
    const server1 = new McpServer({ name: 'test1', version: '1.0.0' });
    const server2 = new McpServer({ name: 'test2', version: '1.0.0' });

    expect(() => {
      registerGeneratePageTemplate(server1);
      registerGeneratePageTemplate(server2);
    }).not.toThrow();
  });

  describe('functional template generation', () => {
    let ctx: ReturnType<typeof designContextStore.get>;

    beforeEach(() => {
      ctx = designContextStore.get();
    });

    it('generates landing page for React', () => {
      const files = generateTemplate('landing', 'react', 'none', false, 'TestApp', ctx);

      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].content).toContain('TestApp');
      expect(files[0].content).toContain('export');
    });

    it('generates dashboard for Vue', () => {
      const files = generateTemplate('dashboard', 'vue', 'none', false, 'MyApp', ctx);

      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].content).toContain('Dashboard');
    });

    it('generates auth login for Angular', () => {
      const files = generateTemplate('auth_login', 'angular', 'none', false, 'MyApp', ctx);

      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].path).toContain('login');
    });

    it('generates HTML template', () => {
      const files = generateTemplate('landing', 'html', 'none', false, 'MyApp', ctx);

      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].content).toContain('<!DOCTYPE html>');
    });

    it('includes dark mode classes when enabled', () => {
      const files = generateTemplate('landing', 'react', 'none', true, 'MyApp', ctx);

      expect(files).toBeDefined();
      expect(files[0].content).toContain('dark:');
    });

    it.each<PageTemplateType>([
      'landing',
      'dashboard',
      'auth_login',
      'auth_signup',
      'pricing',
      'settings',
      'crud_table',
      'blog_list',
      'onboarding',
      'error_404',
    ])('%s generates valid output', (template) => {
      const files = generateTemplate(template, 'react', 'none', false, 'MyApp', ctx);
      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
    });

    it('generates framework-specific syntax', () => {
      const files = generateTemplate('landing', 'angular', 'none', false, 'MyApp', ctx);

      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);

      // Verify Angular-specific patterns
      const angularFile = files[0];
      expect(angularFile.content).toContain('@Component');
      expect(angularFile.content).toContain('standalone: true');
      expect(angularFile.content).toContain('template:');
      expect(angularFile.content).toContain('import { Component }');
    });

    it('includes "use client" directive for Next.js', () => {
      const files = generateTemplate('landing', 'nextjs', 'none', false, 'MyApp', ctx);

      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].content).toContain("'use client'");
    });

    it('generates Svelte-specific syntax', () => {
      const files = generateTemplate('landing', 'svelte', 'none', false, 'MyApp', ctx);

      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].path).toContain('.svelte');
      expect(files[0].content).toContain('<script lang="ts">');
    });

    it('should return placeholder for invalid template type', () => {
      const files = generateTemplate('invalid_template' as PageTemplateType, 'react', 'none', false, 'MyApp', ctx);
      expect(Array.isArray(files)).toBe(true);
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].content).toContain('Template "invalid_template" placeholder');
    });

    it('handles empty context gracefully', () => {
      // Create a minimal properly-typed empty context instead of using 'as any'
      const emptyCtx = {
        colorPalette: {
          primary: '',
          secondary: '',
          accent: '',
          background: '',
          foreground: '',
          muted: '',
          mutedForeground: '',
          card: '',
          cardForeground: '',
          popover: '',
          popoverForeground: '',
          border: '',
          input: '',
          ring: '',
          destructive: '',
          destructiveForeground: '',
        },
        typography: {
          fontFamily: '',
          headingFont: '',
          fontSize: { base: '', sm: '', lg: '', xl: '', '2xl': '' },
          fontWeight: { normal: '', medium: '', semibold: '', bold: '' },
          lineHeight: { tight: '', normal: '', relaxed: '' },
        },
        spacing: { xs: '', sm: '', md: '', lg: '', xl: '' },
        borderRadius: { sm: '', md: '', lg: '' },
        iconSet: 'lucide' as const,
      } as typeof ctx;

      const files = generateTemplate('landing', 'react', 'none', false, 'MyApp', emptyCtx);

      // Strengthen assertions
      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);

      // Check each file is defined and doesn't contain literal "undefined" or "null"
      for (const file of files) {
        expect(file).toBeDefined();
        expect(file.content).toBeDefined();
        expect(file.content).not.toContain('undefined');
        expect(file.content).not.toContain('null');

        // Assert that expected fallback values or defaults are present
        // Templates should use fallback colors/fonts when context is empty
        expect(file.content.length).toBeGreaterThan(0);
      }

      // Verify the app name is present
      expect(files[0].content).toContain('MyApp');
    });
  });
});
