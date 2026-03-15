import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['scripts/*.mjs'],
  project: ['src/**/*.ts'],
  ignoreDependencies: [
    // @types/sharp: used via `typeof import('sharp')` in test files for type inference
    '@types/sharp',
    // @types/react: used as React.ReactNode namespace in src/lib/image-renderer.ts
    '@types/react',
    // @forgespace/core: planned runtime integration for forge-context tools (stub in place)
    '@forgespace/core',
  ],
  ignoreExportsUsedInFile: true,
  rules: {
    // Tool object exports are intentional public API for programmatic use.
    // Sentry captureException is exported for potential external callers.
    exports: 'warn',
  },
};

export default config;
