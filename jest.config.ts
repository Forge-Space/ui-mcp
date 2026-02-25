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
    '!src/lib/figma-client.ts',
    '!src/lib/design-extractor.ts',
    '!src/lib/browser-scraper.ts',
    '!src/lib/templates/prototype-shell.ts',
    '!src/lib/image-renderer.ts',
    '!src/resources/forge-context.ts',
    '!src/tools/setup-component-library.ts',
    '!src/tools/manage-training.ts',
    '!src/tools/figma-context-parser.ts',
    '!src/tools/fetch-design-inspiration.ts',
    '!src/tools/image-to-component.ts',
    '!src/tools/analyze-design-references.ts',
    '!src/tools/generate-design-image.ts',
    '!src/tools/analyze-design-image-for-training.ts',
    '!src/tools/refine-component.ts',
    '!src/tools/generate-ui-component.ts',
    '!src/tools/page-template-bodies.ts',
    '!src/tools/scaffold-full-application.ts',
    '!src/tools/submit-feedback.ts',
    '!src/tools/generate-prototype.ts',
    '!src/__tests__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 55,
      functions: 55,
      lines: 60,
      statements: 60,
    },
  },
};

export default config;
