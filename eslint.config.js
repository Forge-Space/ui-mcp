import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
  {
    ignores: ['node_modules/', 'dist/', 'build/', 'coverage/', '**/*.min.js', 'docs/'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            '*.config.ts',
            '*.config.js',
            '*.config.mjs',
            'tsup.config.ts',
            'jest.config.ts',
            'run-tests.mjs',
            'scripts/*.mjs',
          ],
        },
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'prefer-template': 'warn',
      'no-duplicate-imports': 'error',
      'require-await': 'warn',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
      eqeqeq: ['error', 'always'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
    },
  },
  {
    files: ['**/__tests__/**', '**/*.test.*', '**/*.spec.*'],
    languageOptions: {
      parserOptions: {
        projectService: false,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-optional-chain': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-undef': 'off',
      'require-await': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-duplicate-imports': 'off',
      'prefer-arrow-callback': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['*.config.js', '*.config.ts', '*.config.mjs'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-undef': 'off',
    },
  },
  {
    files: ['scripts/**/*.js', 'scripts/**/*.ts', 'scripts/**/*.mjs', 'run-tests.mjs'],
    rules: {
      'no-console': 'off',
    },
  }
);
