import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/__tests__/**/*.unit.test.ts'],
    globals: true,
    environment: 'node',
    testTimeout: 15_000,
  },
});
