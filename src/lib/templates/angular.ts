import type { IGeneratedFile, Architecture, StateManagement } from '../types.js';

export function generateAngularProject(
  projectName: string,
  _architecture: Architecture,
  _stateManagement: StateManagement
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
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#f59e0b',
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
    content: `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
  });

  // src/index.html
  files.push({
    path: `${projectName}/src/index.html`,
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <app-root></app-root>
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
    content: `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: \`
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center space-y-6">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900">
          ${projectName}
        </h1>
        <p class="text-gray-500 text-lg">
          Built with Angular, Tailwind CSS, and Standalone Components
        </p>
        <button
          class="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          (click)="count.set(count() + 1)"
        >
          Count: {{ count() }}
        </button>
      </div>
    </div>
  \`,
})
export class AppComponent {
  count = signal(0);
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
