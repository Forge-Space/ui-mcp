import type { IGeneratedFile, IDesignContext, Architecture, StateManagement } from '@forgespace/siza-gen';
import { generateCssVariableBlock, generateFontImportHtml } from './css-variables.js';

export function generateAngularProject(
  projectName: string,
  _architecture: Architecture,
  _stateManagement: StateManagement,
  designContext?: IDesignContext
): IGeneratedFile[] {
  const files: IGeneratedFile[] = [];

  // package.json
  files.push({
    path: `${projectName}/package.json`,
    content: JSON.stringify(
      {
        name: projectName,
        version: '0.1.0',
        private: true,
        scripts: {
          ng: 'ng',
          start: 'ng serve',
          build: 'ng build',
          test: 'ng test',
        },
        dependencies: {
          '@angular/animations': '^19.0.0',
          '@angular/common': '^19.0.0',
          '@angular/compiler': '^19.0.0',
          '@angular/core': '^19.0.0',
          '@angular/forms': '^19.0.0',
          '@angular/platform-browser': '^19.0.0',
          '@angular/platform-browser-dynamic': '^19.0.0',
          '@angular/router': '^19.0.0',
          rxjs: '~7.8.0',
          tslib: '^2.6.0',
          'zone.js': '~0.15.0',
        },
        devDependencies: {
          '@angular/cli': '^19.0.0',
          '@angular/compiler-cli': '^19.0.0',
          '@angular-devkit/build-angular': '^19.0.0',
          typescript: '^5.7.0',
          tailwindcss: '^3.4.17',
          autoprefixer: '^10.4.20',
          postcss: '^8.4.49',
          eslint: '^9.17.0',
          prettier: '^3.4.0',
          karma: '~6.4.0',
          'karma-chrome-launcher': '~3.2.0',
          'karma-jasmine': '~5.1.0',
          jasmine: '~5.4.0',
        },
      },
      null,
      2
    ),
  });

  // angular.json
  files.push({
    path: `${projectName}/angular.json`,
    content: JSON.stringify(
      {
        $schema: './node_modules/@angular/cli/lib/config/schema.json',
        version: 1,
        newProjectRoot: 'projects',
        projects: {
          [projectName]: {
            projectType: 'application',
            root: '',
            sourceRoot: 'src',
            architect: {
              build: {
                builder: '@angular-devkit/build-angular:application',
                options: {
                  outputPath: `dist/${projectName}`,
                  index: 'src/index.html',
                  browser: 'src/main.ts',
                  tsConfig: 'tsconfig.json',
                  styles: ['src/styles.css'],
                },
              },
              serve: {
                builder: '@angular-devkit/build-angular:dev-server',
                configurations: {
                  development: { buildTarget: `${projectName}:build` },
                },
                defaultConfiguration: 'development',
              },
            },
          },
        },
      },
      null,
      2
    ),
  });

  // tsconfig.json
  files.push({
    path: `${projectName}/tsconfig.json`,
    content: JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          module: 'ES2022',
          moduleResolution: 'bundler',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          experimentalDecorators: true,
          lib: ['ES2023', 'DOM'],
          paths: { '@/*': ['./src/*'] },
        },
        include: ['src'],
      },
      null,
      2
    ),
  });

  // tailwind.config.js
  files.push({
    path: `${projectName}/tailwind.config.js`,
    content: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
`,
  });

  // src/styles.css
  files.push({
    path: `${projectName}/src/styles.css`,
    content: generateCssVariableBlock(designContext),
  });

  // src/index.html
  const fontLinks = generateFontImportHtml(designContext);
  files.push({
    path: `${projectName}/src/index.html`,
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${projectName} — Modern web application" />
    <meta name="theme-color" content="#ffffff" />
    <meta property="og:title" content="${projectName}" />
    <meta property="og:description" content="${projectName} — Modern web application" />
    <meta property="og:type" content="website" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    ${fontLinks}
    <title>${projectName}</title>
  </head>
  <body>
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">Skip to main content</a>
    <app-root></app-root>
    <noscript>You need to enable JavaScript to run this app.</noscript>
  </body>
</html>
`,
  });

  // src/main.ts
  files.push({
    path: `${projectName}/src/main.ts`,
    content: `import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
`,
  });

  // src/app/app.component.ts
  files.push({
    path: `${projectName}/src/app/app.component.ts`,
    content: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: \`
    <div class="min-h-screen flex flex-col">
      <header role="banner" class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <nav aria-label="Main navigation" class="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
          <span class="text-lg font-semibold">${projectName}</span>
          <div class="flex items-center gap-2">
            <button class="px-3 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">About</button>
            <button class="px-3 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">Features</button>
            <button class="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Get Started</button>
          </div>
        </nav>
      </header>

      <main id="main-content" role="main" class="flex-1">
        <section aria-labelledby="hero-heading" class="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div class="container mx-auto max-w-4xl text-center space-y-6">
            <h1 id="hero-heading" class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              ${projectName}
            </h1>
            <p class="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
              A modern, responsive web application built with Angular, Tailwind CSS, and Standalone Components.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button class="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Get Started
              </button>
              <button class="inline-flex items-center px-6 py-3 border border-input bg-background rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors">
                View Source
              </button>
            </div>
          </div>
        </section>

        <section aria-labelledby="features-heading" class="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div class="container mx-auto max-w-6xl">
            <h2 id="features-heading" class="text-2xl sm:text-3xl font-bold text-center mb-10">Features</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (feature of features; track feature.title) {
                <article class="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
                  <p class="text-sm text-muted-foreground">{{ feature.desc }}</p>
                </article>
              }
            </div>
          </div>
        </section>
      </main>

      <footer role="contentinfo" class="border-t py-8 px-4 sm:px-6 lg:px-8">
        <div class="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; ${projectName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  \`,
})
export class AppComponent {
  features = [
    { title: 'Responsive Design', desc: 'Looks great on every screen size, from mobile to desktop.' },
    { title: 'Accessible', desc: 'Built with ARIA landmarks, keyboard navigation, and semantic HTML.' },
    { title: 'Performant', desc: 'Optimized with signals, OnPush change detection, and lazy loading.' },
  ];
}
`,
  });

  // Signals-based service
  files.push({
    path: `${projectName}/src/app/services/app-state.service.ts`,
    content: `import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private readonly _count = signal(0);

  readonly count = this._count.asReadonly();
  readonly doubled = computed(() => this._count() * 2);

  increment() {
    this._count.update((c) => c + 1);
  }

  decrement() {
    this._count.update((c) => c - 1);
  }

  reset() {
    this._count.set(0);
  }
}
`,
  });

  return files;
}
