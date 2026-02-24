import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testMatch: ['<rootDir>/src/__tests__/**/*.unit.test.ts', '<rootDir>/src/__tests__/**/*.integration.test.ts'],
  testTimeout: 15_000,
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          verbatimModuleSyntax: false,
          isolatedModules: true,
        },
        diagnostics: {
          ignoreCodes: [151002],
        },
      },
    ],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov', 'json-summary'],
  collectCoverageFrom: [
    'src/lib/**/*.ts',
    'src/tools/**/*.ts',
    'src/resources/**/*.ts',
    'src/index.ts',
    '!src/lib/types.ts',
    '!src/lib/figma-client.ts',
    '!src/lib/design-extractor.ts',
    '!src/lib/browser-scraper.ts',
    '!src/lib/templates/prototype-shell.ts',
    '!src/lib/generators/svelte-generator-complete.ts',
    '!src/lib/design-references/database/store.ts',
    '!src/lib/image-renderer.ts',
    '!src/lib/ml/types.ts',
    '!src/lib/ml/design-to-training-data.ts',
    '!src/lib/ml/image-design-analyzer.ts',
    '!src/resources/forge-context.ts',
    '!src/__tests__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 77,
      statements: 77,
    },
  },
};

export default config;
