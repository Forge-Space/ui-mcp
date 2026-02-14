import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['dist/', 'node_modules/', 'coverage/', '*.config.js', '*.config.ts', '.tsbuildinfo'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Variable naming
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',

      // Console usage - allow in MCP server context
      'no-console': 'off',

      // Async/await patterns
      'require-await': 'error',
      'no-return-await': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      // Type safety
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',

      // Code quality
      'no-duplicate-imports': 'error',
      'no-unreachable': 'error',
      'no-constant-condition': ['error', { checkLoops: false }],
      'prefer-const': 'error',
      'prefer-template': 'warn',

      // ESM imports
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
    },
  },
  {
    // MCP Tools - stricter rules for tool implementations
    files: ['src/tools/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      'require-await': 'error',
    },
  },
  {
    // Test files - relaxed rules and disable ALL type-aware linting
    // Test files are excluded from tsconfig.json, so we disable all type-aware rules
    files: ['src/__tests__/**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: false,
      },
    },
    rules: {
      // Disable type-aware rules
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-optional-chain': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      'require-await': 'off',

      // Relaxed rules for tests
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },
  {
    // Templates - allow flexible patterns for code generation
    files: ['src/lib/templates/**/*.ts'],
    rules: {
      'prefer-template': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    // Design references and pattern detector - allow non-null assertions after validation
    files: [
      'src/lib/design-references/**/*.ts',
      'src/lib/pattern-detector.ts',
      'src/lib/figma-client.ts',
      'src/tools/analyze-design-references.ts',
    ],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  }
);
