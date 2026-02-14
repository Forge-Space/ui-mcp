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
  collectCoverageFrom: [
    'src/lib/**/*.ts',
    '!src/lib/types.ts',
    '!src/lib/figma-client.ts',
    '!src/lib/design-extractor.ts',
    '!src/lib/browser-scraper.ts',
    '!src/lib/templates/prototype-shell.ts',
    '!src/__tests__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};

export default config;
