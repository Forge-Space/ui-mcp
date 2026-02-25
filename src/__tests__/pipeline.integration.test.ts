import { generateReactProject } from '../lib/templates/react.js';
import { generateNextjsProject } from '../lib/templates/nextjs.js';
import { generateVueProject } from '../lib/templates/vue.js';
import { generateAngularProject } from '../lib/templates/angular.js';
import { designContextStore } from '@forgespace/siza-gen';
import { getPreset, listPresets } from '@forgespace/siza-gen';
import { COMPONENT_LIBRARIES, getComponentLibrariesForFramework, getRecommendedLibrary } from '@forgespace/siza-gen';
import { ICON_LIBRARIES, getDefaultIconLibrary } from '@forgespace/siza-gen';
import type { IDesignContext } from '@forgespace/siza-gen';

// --- Helpers ---

function findFile(files: { path: string; content: string }[], partial: string) {
  return files.find((f) => f.path.includes(partial));
}

function parseJson(files: { path: string; content: string }[], partial: string) {
  const f = findFile(files, partial);
  return f ? JSON.parse(f.content) : undefined;
}

// --- Integration Tests ---

describe('Full Generation Pipeline Integration', () => {
  let ctx: IDesignContext;

  beforeEach(() => {
    designContextStore.reset();
    ctx = getPreset('zinc-manrope');
  });

  // ─── Design Context → Template Pipeline ─────────────────────────

  describe('design context flows into templates', () => {
    it('React template uses design context colors in CSS variables', () => {
      const files = generateReactProject('test-app', 'flat', 'none', ctx);
      const css = findFile(files, 'index.css');
      expect(css).toBeDefined();
      expect(css!.content).toContain('--primary');
      expect(css!.content).toContain('--background');
      expect(css!.content).toContain('--foreground');
    });

    it('Next.js template uses design context font in layout', () => {
      const files = generateNextjsProject('test-app', 'flat', 'none', ctx);
      const layout = findFile(files, 'layout.tsx');
      expect(layout).toBeDefined();
      expect(layout!.content).toContain('next/font/google');
    });

    it('Vue template generates CSS variables from context', () => {
      const files = generateVueProject('test-app', 'flat', 'none', ctx);
      const css = findFile(files, 'style.css');
      expect(css).toBeDefined();
      expect(css!.content).toContain('--primary');
    });

    it('Angular template generates CSS variables from context', () => {
      const files = generateAngularProject('test-app', 'flat', 'signals', ctx);
      const css = findFile(files, 'styles.css');
      expect(css).toBeDefined();
      expect(css!.content).toContain('--primary');
    });

    it('all presets produce valid design contexts', () => {
      for (const presetName of listPresets()) {
        const preset = getPreset(presetName);
        expect(preset.colorPalette.primary).toBeTruthy();
        expect(preset.typography.fontFamily).toBeTruthy();
        expect(preset.spacing.unit).toBeGreaterThan(0);
      }
    });
  });

  // ─── SEO & Meta Tags ────────────────────────────────────────────

  describe('SEO meta tags in generated templates', () => {
    it('React index.html has OG tags, description, and theme-color', () => {
      const files = generateReactProject('seo-app', 'flat', 'none', ctx);
      const html = findFile(files, 'index.html');
      expect(html).toBeDefined();
      expect(html!.content).toContain('og:title');
      expect(html!.content).toContain('og:description');
      expect(html!.content).toContain('meta name="description"');
      expect(html!.content).toContain('meta name="theme-color"');
    });

    it('Next.js layout exports metadata with OG and robots', () => {
      const files = generateNextjsProject('seo-app', 'flat', 'none', ctx);
      const layout = findFile(files, 'layout.tsx');
      expect(layout).toBeDefined();
      expect(layout!.content).toContain('openGraph');
      expect(layout!.content).toContain('robots');
      expect(layout!.content).toContain('Viewport');
    });

    it('Vue index.html has OG tags', () => {
      const files = generateVueProject('seo-app', 'flat', 'none', ctx);
      const html = findFile(files, 'index.html');
      expect(html).toBeDefined();
      expect(html!.content).toContain('og:title');
    });

    it('Angular index.html has OG tags', () => {
      const files = generateAngularProject('seo-app', 'flat', 'signals', ctx);
      const html = findFile(files, 'index.html');
      expect(html).toBeDefined();
      expect(html!.content).toContain('og:title');
    });
  });

  // ─── Accessibility ──────────────────────────────────────────────

  describe('accessibility in generated templates', () => {
    it('React template has skip-to-content link', () => {
      const files = generateReactProject('a11y-app', 'flat', 'none', ctx);
      const html = findFile(files, 'index.html');
      expect(html!.content).toContain('Skip to main content');
      expect(html!.content).toContain('#main-content');
    });

    it('React App has ARIA landmarks (banner, main, contentinfo)', () => {
      const files = generateReactProject('a11y-app', 'flat', 'none', ctx);
      const app = findFile(files, 'App.tsx');
      expect(app).toBeDefined();
      expect(app!.content).toContain('role="banner"');
      expect(app!.content).toContain('role="main"');
      expect(app!.content).toContain('role="contentinfo"');
      expect(app!.content).toContain('aria-label');
      expect(app!.content).toContain('aria-labelledby');
    });

    it('Next.js page has ARIA landmarks', () => {
      const files = generateNextjsProject('a11y-app', 'flat', 'none', ctx);
      const page = findFile(files, 'page.tsx');
      expect(page).toBeDefined();
      expect(page!.content).toContain('role="banner"');
      expect(page!.content).toContain('role="main"');
      expect(page!.content).toContain('role="contentinfo"');
    });

    it('Vue App has ARIA landmarks', () => {
      const files = generateVueProject('a11y-app', 'flat', 'none', ctx);
      const app = findFile(files, 'App.vue');
      expect(app).toBeDefined();
      expect(app!.content).toContain('role="banner"');
      expect(app!.content).toContain('role="main"');
      expect(app!.content).toContain('role="contentinfo"');
    });

    it('Angular component has ARIA landmarks', () => {
      const files = generateAngularProject('a11y-app', 'flat', 'signals', ctx);
      const comp = findFile(files, 'app.component.ts');
      expect(comp).toBeDefined();
      expect(comp!.content).toContain('role="banner"');
      expect(comp!.content).toContain('role="main"');
      expect(comp!.content).toContain('role="contentinfo"');
    });

    it('all templates have noscript fallback', () => {
      const react = findFile(generateReactProject('n', 'flat', 'none', ctx), 'index.html');
      const vue = findFile(generateVueProject('n', 'flat', 'none', ctx), 'index.html');
      const angular = findFile(generateAngularProject('n', 'flat', 'signals', ctx), 'index.html');
      for (const html of [react, vue, angular]) {
        expect(html!.content).toContain('<noscript>');
      }
    });
  });

  // ─── Responsive Design ──────────────────────────────────────────

  describe('responsive design in generated templates', () => {
    it('React App uses responsive breakpoint classes', () => {
      const files = generateReactProject('resp-app', 'flat', 'none', ctx);
      const app = findFile(files, 'App.tsx');
      expect(app!.content).toContain('sm:');
      expect(app!.content).toContain('lg:');
      expect(app!.content).toContain('grid-cols-1');
    });

    it('Next.js page uses responsive breakpoint classes', () => {
      const files = generateNextjsProject('resp-app', 'flat', 'none', ctx);
      const page = findFile(files, 'page.tsx');
      expect(page!.content).toContain('sm:');
      expect(page!.content).toContain('lg:');
    });

    it('Vue App uses responsive breakpoint classes', () => {
      const files = generateVueProject('resp-app', 'flat', 'none', ctx);
      const app = findFile(files, 'App.vue');
      expect(app!.content).toContain('sm:');
      expect(app!.content).toContain('lg:');
    });

    it('Angular component uses responsive breakpoint classes', () => {
      const files = generateAngularProject('resp-app', 'flat', 'signals', ctx);
      const comp = findFile(files, 'app.component.ts');
      expect(comp!.content).toContain('sm:');
      expect(comp!.content).toContain('lg:');
    });
  });

  // ─── Essential Dependencies ─────────────────────────────────────

  describe('essential dependencies in generated projects', () => {
    it('React project includes essential deps', () => {
      const pkg = parseJson(generateReactProject('dep-app', 'flat', 'none', ctx), 'package.json');
      expect(pkg.dependencies['@phosphor-icons/react']).toBeDefined();
      expect(pkg.dependencies['react-hook-form']).toBeDefined();
      expect(pkg.dependencies.zod).toBeDefined();
      expect(pkg.dependencies['@tanstack/react-query']).toBeDefined();
      expect(pkg.dependencies['class-variance-authority']).toBeDefined();
      expect(pkg.dependencies.clsx).toBeDefined();
      expect(pkg.dependencies['tailwind-merge']).toBeDefined();
    });

    it('React project includes testing devDeps', () => {
      const pkg = parseJson(generateReactProject('dep-app', 'flat', 'none', ctx), 'package.json');
      expect(pkg.devDependencies.vitest).toBeDefined();
      expect(pkg.devDependencies['@testing-library/react']).toBeDefined();
      expect(pkg.devDependencies.eslint).toBeDefined();
      expect(pkg.devDependencies.prettier).toBeDefined();
    });

    it('Next.js project includes essential deps', () => {
      const pkg = parseJson(generateNextjsProject('dep-app', 'flat', 'none', ctx), 'package.json');
      expect(pkg.dependencies['@phosphor-icons/react']).toBeDefined();
      expect(pkg.dependencies['react-hook-form']).toBeDefined();
      expect(pkg.dependencies.zod).toBeDefined();
      expect(pkg.dependencies['@tanstack/react-query']).toBeDefined();
    });

    it('Vue project includes essential deps', () => {
      const pkg = parseJson(generateVueProject('dep-app', 'flat', 'none', ctx), 'package.json');
      expect(pkg.dependencies['@phosphor-icons/vue']).toBeDefined();
      expect(pkg.dependencies['vee-validate']).toBeDefined();
      expect(pkg.dependencies.zod).toBeDefined();
      expect(pkg.dependencies['@tanstack/vue-query']).toBeDefined();
    });

    it('Angular project includes testing devDeps', () => {
      const pkg = parseJson(generateAngularProject('dep-app', 'flat', 'signals', ctx), 'package.json');
      expect(pkg.devDependencies.eslint).toBeDefined();
      expect(pkg.devDependencies.prettier).toBeDefined();
      expect(pkg.devDependencies.jasmine).toBeDefined();
    });

    it('React main.tsx sets up QueryClientProvider', () => {
      const files = generateReactProject('dep-app', 'flat', 'none', ctx);
      const main = findFile(files, 'main.tsx');
      expect(main).toBeDefined();
      expect(main!.content).toContain('QueryClientProvider');
      expect(main!.content).toContain('QueryClient');
      expect(main!.content).toContain('staleTime');
    });
  });

  // ─── Component Library References ───────────────────────────────

  describe('component library references', () => {
    it('returns libraries for each framework', () => {
      expect(getComponentLibrariesForFramework('react').length).toBeGreaterThan(0);
      expect(getComponentLibrariesForFramework('vue').length).toBeGreaterThan(0);
      expect(getComponentLibrariesForFramework('angular').length).toBeGreaterThan(0);
      expect(getComponentLibrariesForFramework('nextjs').length).toBeGreaterThan(0);
    });

    it('returns a recommended library per framework', () => {
      expect(getRecommendedLibrary('react')?.name).toBe('shadcn/ui');
      expect(getRecommendedLibrary('vue')?.name).toBe('PrimeVue');
      expect(getRecommendedLibrary('angular')?.name).toBe('Angular Material');
    });

    it('every library has required fields', () => {
      for (const lib of COMPONENT_LIBRARIES) {
        expect(lib.name).toBeTruthy();
        expect(lib.description).toBeTruthy();
        expect(lib.frameworks.length).toBeGreaterThan(0);
        expect(lib.docsUrl).toContain('http');
        expect(lib.features.length).toBeGreaterThan(0);
        expect(Object.keys(lib.installPackage).length).toBeGreaterThan(0);
      }
    });
  });

  // ─── Icon Library References ────────────────────────────────────

  describe('icon library references', () => {
    it('Phosphor is recommended for react', () => {
      const libs = ICON_LIBRARIES.filter((l) => l.recommended.includes('react'));
      const names = libs.map((l) => l.name);
      expect(names).toContain('Phosphor');
    });

    it('react-icons is available for react', () => {
      const reactIcons = ICON_LIBRARIES.find((l) => l.name === 'react-icons');
      expect(reactIcons).toBeDefined();
      expect(reactIcons!.recommended).toContain('react');
    });

    it('getDefaultIconLibrary returns a recommended library', () => {
      const lib = getDefaultIconLibrary('react');
      expect(lib.recommended).toContain('react');
    });
  });

  // ─── Preset → Full Project Pipeline ─────────────────────────────

  describe('preset to full project pipeline', () => {
    it('each preset generates a valid React project', () => {
      for (const presetName of listPresets()) {
        const preset = getPreset(presetName);
        const files = generateReactProject('test', 'flat', 'none', preset);
        expect(files.length).toBeGreaterThanOrEqual(10);
        const css = findFile(files, 'index.css');
        expect(css).toBeDefined();
        expect(css!.content).toContain('--primary');
      }
    });

    it('design context store update flows to template generation', () => {
      designContextStore.selectPreset('ocean-sora');
      const ctx2 = designContextStore.get();
      const files = generateReactProject('ocean-app', 'flat', 'none', ctx2);
      const css = findFile(files, 'index.css');
      expect(css).toBeDefined();
      expect(css!.content).toContain('--primary');
    });
  });
});
