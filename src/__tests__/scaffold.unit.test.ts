import { generateReactProject } from '../lib/templates/react.js';
import { generateNextjsProject } from '../lib/templates/nextjs.js';
import { generateVueProject } from '../lib/templates/vue.js';
import { generateAngularProject } from '../lib/templates/angular.js';
import { generateSvelteProject } from '../lib/templates/svelte.js';

describe('scaffold_full_application', () => {
  describe('React project', () => {
    const files = generateReactProject('my-app', 'flat', 'none');

    it('generates expected number of files', () => {
      expect(files.length).toBeGreaterThanOrEqual(10);
    });

    it('includes package.json', () => {
      const pkg = files.find((f) => f.path === 'my-app/package.json');
      expect(pkg).toBeDefined();
      const parsed = JSON.parse(pkg!.content);
      expect(parsed.name).toBe('my-app');
      expect(parsed.dependencies.react).toBeDefined();
    });

    it('includes vite.config.ts', () => {
      expect(files.find((f) => f.path === 'my-app/vite.config.ts')).toBeDefined();
    });

    it('includes tailwind.config.js', () => {
      expect(files.find((f) => f.path === 'my-app/tailwind.config.js')).toBeDefined();
    });

    it('includes Shadcn/ui button component', () => {
      const btn = files.find((f) => f.path.includes('components/ui/button.tsx'));
      expect(btn).toBeDefined();
      expect(btn!.content).toContain('buttonVariants');
    });

    it('includes cn utility', () => {
      const utils = files.find((f) => f.path.includes('lib/utils.ts'));
      expect(utils).toBeDefined();
      expect(utils!.content).toContain('twMerge');
    });

    it('includes components.json', () => {
      const cj = files.find((f) => f.path === 'my-app/components.json');
      expect(cj).toBeDefined();
    });

    it('includes zustand store when state_management is zustand', () => {
      const withZustand = generateReactProject('my-app', 'flat', 'zustand');
      const store = withZustand.find((f) => f.path.includes('store/use-app-store.ts'));
      expect(store).toBeDefined();
      expect(store!.content).toContain('zustand');
    });

    it('does not include zustand store when state_management is none', () => {
      const store = files.find((f) => f.path.includes('store/'));
      expect(store).toBeUndefined();
    });
  });

  describe('Next.js project', () => {
    const files = generateNextjsProject('next-app', 'flat', 'none');

    it('generates expected number of files', () => {
      expect(files.length).toBeGreaterThanOrEqual(10);
    });

    it('includes package.json with next dependency', () => {
      const pkg = files.find((f) => f.path === 'next-app/package.json');
      expect(pkg).toBeDefined();
      const parsed = JSON.parse(pkg!.content);
      expect(parsed.dependencies.next).toBeDefined();
    });

    it('includes app/layout.tsx', () => {
      expect(files.find((f) => f.path.includes('src/app/layout.tsx'))).toBeDefined();
    });

    it('includes app/page.tsx', () => {
      expect(files.find((f) => f.path.includes('src/app/page.tsx'))).toBeDefined();
    });

    it('includes next.config.ts', () => {
      expect(files.find((f) => f.path === 'next-app/next.config.ts')).toBeDefined();
    });
  });

  describe('Vue project', () => {
    const files = generateVueProject('vue-app', 'flat', 'none');

    it('generates expected number of files', () => {
      expect(files.length).toBeGreaterThanOrEqual(8);
    });

    it('includes package.json with vue dependency', () => {
      const pkg = files.find((f) => f.path === 'vue-app/package.json');
      expect(pkg).toBeDefined();
      const parsed = JSON.parse(pkg!.content);
      expect(parsed.dependencies.vue).toBeDefined();
    });

    it('includes App.vue', () => {
      const app = files.find((f) => f.path.includes('App.vue'));
      expect(app).toBeDefined();
      expect(app!.content).toContain('<script setup');
    });

    it('includes pinia store when state_management is pinia', () => {
      const withPinia = generateVueProject('vue-app', 'flat', 'pinia');
      const store = withPinia.find((f) => f.path.includes('stores/app.ts'));
      expect(store).toBeDefined();
      expect(store!.content).toContain('defineStore');
    });
  });

  describe('Angular project', () => {
    const files = generateAngularProject('ng-app', 'flat', 'signals');

    it('generates expected number of files', () => {
      expect(files.length).toBeGreaterThanOrEqual(7);
    });

    it('includes package.json with angular dependencies', () => {
      const pkg = files.find((f) => f.path === 'ng-app/package.json');
      expect(pkg).toBeDefined();
      const parsed = JSON.parse(pkg!.content);
      expect(parsed.dependencies['@angular/core']).toBeDefined();
    });

    it('includes standalone app component', () => {
      const comp = files.find((f) => f.path.includes('app.component.ts'));
      expect(comp).toBeDefined();
      expect(comp!.content).toContain('standalone: true');
    });

    it('includes signals-based service', () => {
      const svc = files.find((f) => f.path.includes('app-state.service.ts'));
      expect(svc).toBeDefined();
      expect(svc!.content).toContain('signal');
    });

    it('uses bootstrapApplication', () => {
      const main = files.find((f) => f.path.includes('src/main.ts'));
      expect(main).toBeDefined();
      expect(main!.content).toContain('bootstrapApplication');
    });
  });

  describe('Svelte project', () => {
    const files = generateSvelteProject('svelte-app', 'flat', 'none');

    it('generates expected number of files', () => {
      expect(files.length).toBeGreaterThanOrEqual(12);
    });

    it('includes package.json with svelte dependency', () => {
      const pkg = files.find((f) => f.path === 'svelte-app/package.json');
      expect(pkg).toBeDefined();
      const parsed = JSON.parse(pkg!.content);
      expect(parsed.dependencies.svelte).toBeDefined();
      expect(parsed.dependencies['@sveltejs/kit']).toBeDefined();
    });

    it('includes svelte.config.js', () => {
      expect(files.find((f) => f.path === 'svelte-app/svelte.config.js')).toBeDefined();
    });

    it('includes vite.config.ts with SvelteKit plugin', () => {
      const vite = files.find((f) => f.path === 'svelte-app/vite.config.ts');
      expect(vite).toBeDefined();
      expect(vite!.content).toContain('sveltekit');
    });

    it('includes tailwind.config.js with Svelte content paths', () => {
      const tw = files.find((f) => f.path === 'svelte-app/tailwind.config.js');
      expect(tw).toBeDefined();
      expect(tw!.content).toContain('./src/**/*.{html,js,svelte,ts}');
    });

    it('includes src/routes/+layout.svelte', () => {
      expect(files.find((f) => f.path.includes('src/routes/+layout.svelte'))).toBeDefined();
    });

    it('includes src/routes/+page.svelte', () => {
      expect(files.find((f) => f.path.includes('src/routes/+page.svelte'))).toBeDefined();
    });

    it('includes app.html shell', () => {
      expect(files.find((f) => f.path.includes('src/app.html'))).toBeDefined();
    });

    it('includes Shadcn-style button component', () => {
      const btn = files.find((f) => f.path.includes('components/ui/button.svelte'));
      expect(btn).toBeDefined();
      expect(btn!.content).toContain('variant');
    });

    it('includes cn utility', () => {
      const utils = files.find((f) => f.path.includes('lib/utils.ts'));
      expect(utils).toBeDefined();
      expect(utils!.content).toContain('twMerge');
    });

    it('includes Svelte stores when state_management is not none', () => {
      // Svelte scaffold generates stores for any non-'none' state_management option
      const withStores = generateSvelteProject('svelte-app', 'flat', 'signals');
      const store = withStores.find((f) => f.path.includes('stores/app.ts'));
      expect(store).toBeDefined();
      expect(store!.content).toContain('writable');

      // Verify stores are also generated for other non-none options
      const withZustand = generateSvelteProject('svelte-app', 'flat', 'zustand');
      const zustandStore = withZustand.find((f) => f.path.includes('stores/app.ts'));
      expect(zustandStore).toBeDefined();
      expect(zustandStore!.content).toContain('writable');
    });

    it('does not include stores when state_management is none', () => {
      const store = files.find((f) => f.path.includes('stores/'));
      expect(store).toBeUndefined();
    });

    it('includes CSS variables matching design context', () => {
      const css = files.find((f) => f.path.includes('app.css'));
      expect(css).toBeDefined();
      expect(css!.content).toContain('--background');
      expect(css!.content).toContain('--foreground');
    });
  });
});
