import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { designContextStore, loadConfig, type PageTemplateType } from '@forgespace/siza-gen';
import { registerGeneratePageTemplate, generateTemplate } from '../../tools/generate-page-template.js';

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

    it('generates landing page for React', async () => {
      const files = await generateTemplate('landing', 'react', 'none', false, 'TestApp', ctx);

      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].content).toContain('TestApp');
      expect(files[0].content).toContain('export');
    });

    it('generates dashboard for Vue', async () => {
      const files = await generateTemplate('dashboard', 'vue', 'none', false, 'MyApp', ctx);

      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].content).toContain('Dashboard');
    });

    it('generates auth login for Angular', async () => {
      const files = await generateTemplate('auth_login', 'angular', 'none', false, 'MyApp', ctx);

      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].path).toContain('login');
    });

    it('generates HTML template', async () => {
      const files = await generateTemplate('landing', 'html', 'none', false, 'MyApp', ctx);

      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].content).toContain('<!DOCTYPE html>');
    });

    it('includes dark mode classes when enabled', async () => {
      const files = await generateTemplate('landing', 'react', 'none', true, 'MyApp', ctx);

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
    ])('%s generates valid output', async (template) => {
      const files = await generateTemplate(template, 'react', 'none', false, 'MyApp', ctx);
      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
    });

    it('generates framework-specific syntax', async () => {
      const files = await generateTemplate('landing', 'angular', 'none', false, 'MyApp', ctx);

      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);

      const angularFile = files[0];
      expect(angularFile.content).toContain('@Component');
      expect(angularFile.content).toContain('standalone: true');
      expect(angularFile.content).toContain('template:');
      expect(angularFile.content).toContain('import { Component }');
    });

    it('includes "use client" directive for Next.js', async () => {
      const files = await generateTemplate('landing', 'nextjs', 'none', false, 'MyApp', ctx);

      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].content).toContain("'use client'");
    });

    it('generates Svelte-specific syntax', async () => {
      const files = await generateTemplate('landing', 'svelte', 'none', false, 'MyApp', ctx);

      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].path).toContain('.svelte');
      expect(files[0].content).toContain('<script lang="ts">');
    });

    it('should return placeholder for invalid template type', async () => {
      const files = await generateTemplate(
        'invalid_template' as PageTemplateType,
        'react',
        'none',
        false,
        'MyApp',
        ctx
      );
      expect(Array.isArray(files)).toBe(true);
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].content).toContain('Template "invalid_template" placeholder');
    });

    it('handles empty context gracefully', async () => {
      const emptyCtx = {
        colorPalette: {
          primary: '',
          primaryForeground: '',
          secondary: '',
          secondaryForeground: '',
          accent: '',
          accentForeground: '',
          background: '',
          foreground: '',
          muted: '',
          mutedForeground: '',
          border: '',
          destructive: '',
          destructiveForeground: '',
        },
        typography: {
          fontFamily: '',
          headingFont: '',
          fontSize: { xs: '', sm: '', base: '', lg: '', xl: '', '2xl': '', '3xl': '' },
          fontWeight: { normal: '', medium: '', semibold: '', bold: '' },
          lineHeight: { tight: '', normal: '', relaxed: '' },
        },
        spacing: { unit: 4, scale: [] },
        borderRadius: { sm: '', md: '', lg: '', full: '' },
        shadows: { sm: '', md: '', lg: '' },
        iconSet: 'lucide',
      } as typeof ctx;

      const files = await generateTemplate('landing', 'react', 'none', false, 'MyApp', emptyCtx);

      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);

      for (const file of files) {
        expect(file).toBeDefined();
        expect(file.content).toBeDefined();
        expect(file.content).not.toContain('undefined');
        expect(file.content).not.toContain('null');
        expect(file.content.length).toBeGreaterThan(0);
      }

      expect(files[0].content).toContain('MyApp');
    });

    it('uses react as fallback for unknown framework', async () => {
      const files = await generateTemplate('landing', 'unknown-framework' as 'react', 'none', false, 'TestApp', ctx);
      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].content).toBeDefined();
    });

    it('passes mood option through to template generation', async () => {
      const files = await generateTemplate('landing', 'react', 'none', false, 'TestApp', ctx, { mood: 'playful' });
      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
    });

    it('passes industry option through to template generation', async () => {
      const files = await generateTemplate('landing', 'react', 'none', false, 'TestApp', ctx, { industry: 'fintech' });
      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
    });

    it('passes visual_style option through to template generation', async () => {
      const files = await generateTemplate('landing', 'react', 'none', false, 'TestApp', ctx, {
        visual_style: 'minimal',
      });
      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
    });

    it('passes combined mood + industry + visual_style options', async () => {
      const files = await generateTemplate('landing', 'react', 'none', false, 'TestApp', ctx, {
        mood: 'professional',
        industry: 'saas',
        visual_style: 'modern',
      });
      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
    });
  });
});
