# Configuration Guide

Comprehensive guide to UIForge MCP's linting, formatting, bundling, and CI/CD
configurations.

## Table of Contents

- [ESLint Configuration](#eslint-configuration)
- [Prettier Configuration](#prettier-configuration)
- [Bundler Configuration](#bundler-configuration)
- [CodeRabbit Configuration](#coderabbit-configuration)
- [CI/CD Pipeline](#cicd-pipeline)
- [Pre-commit Hooks](#pre-commit-hooks)
- [Dependency Management](#dependency-management)

---

## ESLint Configuration

**File**: `eslint.config.js`

### Overview

UIForge uses ESLint 10 with TypeScript ESLint parser and Prettier integration
for code quality enforcement.

### Key Features

- **Flat config format** (ESLint 9+)
- **Path-specific rules** for tools, tests, and templates
- **Async/await enforcement** for MCP server patterns
- **Type safety rules** for TypeScript

### Rule Sets

#### Base Rules (all TypeScript files)

```javascript
{
  '@typescript-eslint/no-unused-vars': 'warn',
  '@typescript-eslint/no-explicit-any': 'warn',
  'no-console': 'off', // Allowed in MCP server
  'require-await': 'error',
  '@typescript-eslint/no-floating-promises': 'error',
  'prefer-const': 'error',
}
```

#### MCP Tools (`src/tools/**/*.ts`)

Stricter rules for tool implementations:

```javascript
{
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/explicit-function-return-type': 'warn',
  'require-await': 'error',
}
```

#### Tests (`src/__tests__/**/*.ts`)

Relaxed rules for test flexibility:

```javascript
{
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-non-null-assertion': 'off',
}
```

#### Templates (`src/lib/templates/**/*.ts`)

Flexible rules for code generation:

```javascript
{
  'prefer-template': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
}
```

### Commands

```bash
npm run lint          # Check for lint errors
npm run lint:fix      # Auto-fix lint errors
```

---

## Prettier Configuration

**File**: `.prettierrc`

### Overview

Prettier enforces consistent code formatting across TypeScript, JSON, YAML, and
Markdown files.

### Base Settings

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 120,
  "tabWidth": 2,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### File-Specific Overrides

- **JSON files**: 80 char width, no trailing commas
- **YAML files**: 80 char width, double quotes
- **Markdown files**: 80 char width, wrap prose
- **package.json**: 80 char width for readability

### Commands

```bash
npm run format        # Format all TypeScript files
npm run format:check  # Check formatting without changes
```

---

## Bundler Configuration

**File**: `tsup.config.ts`

### Overview

Tsup provides fast bundling with esbuild for production builds (optional
alternative to `tsc`).

### Configuration

```typescript
{
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'node22',
  bundle: true,
  sourcemap: true,
  minify: false, // Keep readable for debugging
  external: [
    '@modelcontextprotocol/sdk',
    'playwright',
    'sharp',
    '@resvg/resvg-js',
    'pino',
    'pino-pretty',
  ],
}
```

### Key Features

- **ESM-only output** (matches project type)
- **Node 22 target** (matches engine requirement)
- **External dependencies** (not bundled)
- **Source maps** for debugging
- **No minification** for MCP server readability

### Commands

```bash
npm run build         # Standard TypeScript compilation
npm run build:bundle  # Fast bundling with tsup
```

### When to Use

- **Use `tsc`** (default): Development, debugging, type checking
- **Use `tsup`**: Production builds, faster CI builds, Docker optimization

---

## CodeRabbit Configuration

**File**: `.coderabbit.yaml`

### Overview

CodeRabbit provides AI-powered code reviews on GitHub PRs with UIForge
MCP-specific context.

### Key Features

1. **UIForge MCP Context**: Understands MCP server patterns, design systems,
   framework support
2. **Framework-Specific Labels**: Automatic labeling for React, Vue, Angular,
   Next.js, Svelte
3. **Path-Specific Instructions**: Detailed review rules for tools, templates,
   design references
4. **Security Tools**: Gitleaks, TruffleHog, ESLint, Hadolint integration
5. **Zero-Cost Enforcement**: Validates no paid dependencies are added

### Custom Labels

- `react`, `vue`, `angular`, `nextjs`, `svelte` - Framework changes
- `design-system` - Design tokens, color palettes
- `figma` - Figma API integration
- `image-generation` - SVG/PNG rendering
- `breaking-change` - API/tool interface changes

### Path-Specific Reviews

- **`src/tools/**/\*.ts`\*\*: MCP tool patterns, Zod validation
- **`src/lib/templates/**/\*.ts`\*\*: Framework best practices
- **`src/lib/design-references/**/\*.ts`\*\*: Color extraction, typography
- **`src/**tests**/**/\*.ts`\*\*: Test coverage, AAA pattern

See `docs/CODERABBIT_SETUP.md` for full usage guide.

---

## CI/CD Pipeline

**File**: `.github/workflows/ci.yml`

### Jobs

#### 1. Lint

- ESLint checks
- Prettier format validation
- Caches ESLint results

#### 2. Type Check

- TypeScript compilation check
- No emit, only type validation

#### 3. Test (Matrix: Node 20, 22)

- Jest with coverage
- Uploads coverage to Codecov
- Caches Jest results

#### 4. Build

- Compiles TypeScript
- Verifies build output exists

#### 5. Docker

- Builds Docker image
- Tests container startup
- Checks image size (warns if >500MB)
- Uses GitHub Actions cache

#### 6. Dependency Check (NEW)

- **npm-check-updates**: Checks for outdated dependencies
- **npm audit**: Security vulnerability scan
- **Dependency report**: Generates summary in GitHub Actions

### Caching Strategy

- **npm dependencies**: Cached by `package-lock.json`
- **ESLint cache**: Cached by lock file hash
- **Jest cache**: Cached by Node version + lock file
- **Docker layers**: GitHub Actions cache

### Performance

- Parallel job execution
- Aggressive caching
- Matrix testing for Node 20 & 22

---

## Pre-commit Hooks

**File**: `.husky/pre-commit`

### Workflow

1. **Lint-staged**: Auto-fix and format staged files
2. **Dependency check**: Warn about outdated dependencies (non-blocking)
3. **Security audit**: Warn about vulnerabilities (non-blocking)

### Lint-staged Configuration

**File**: `package.json` → `lint-staged`

```json
{
  "src/**/*.ts": ["eslint --fix", "prettier --write"]
}
```

### Features

- ✅ **Auto-fixes**: ESLint and Prettier run automatically
- ⚠️ **Warnings**: Dependency and security checks don't block commits
- 🚀 **Fast**: Only processes staged files

### Bypass (Emergency Only)

```bash
git commit --no-verify -m "Emergency fix"
```

---

## Dependency Management

### npm-check-updates (ncu)

**Package**: `npm-check-updates`

### Commands

```bash
npm run deps:check                # Check for outdated dependencies
npm run deps:update               # Update package.json (non-interactive)
npm run deps:update-interactive   # Interactive update with choices
```

### CI Integration

- **Runs on every PR**: Checks for outdated dependencies
- **Generates report**: Shows outdated packages in GitHub Actions summary
- **Non-blocking**: Doesn't fail CI, only warns

### Pre-commit Integration

- **Warns on commit**: Shows outdated dependencies before commit
- **Non-blocking**: Doesn't prevent commits
- **Actionable**: Suggests `npm run deps:update-interactive`

### Best Practices

1. **Weekly checks**: Run `npm run deps:check` weekly
2. **Interactive updates**: Use `deps:update-interactive` for control
3. **Test after updates**: Always run `npm test` after updating
4. **Review changelogs**: Check breaking changes before updating major versions

### Zero-Cost Mandate

All dependencies must remain:

- ✅ Free and open-source (MIT/ISC/Apache-2.0)
- ✅ No paid tiers or premium features
- ✅ No cloud service dependencies
- ✅ Self-hosted compatible

---

## Configuration Files Summary

| File                       | Purpose           | Key Features                           |
| -------------------------- | ----------------- | -------------------------------------- |
| `eslint.config.js`         | Code quality      | Path-specific rules, async enforcement |
| `.prettierrc`              | Code formatting   | File-type overrides, 120 char width    |
| `tsup.config.ts`           | Bundling          | Fast esbuild, ESM output, Node 22      |
| `.coderabbit.yaml`         | AI code review    | UIForge context, framework labels      |
| `.github/workflows/ci.yml` | CI/CD             | 6 jobs, dependency checks, caching     |
| `.husky/pre-commit`        | Git hooks         | Auto-fix, dependency warnings          |
| `.prettierignore`          | Format exclusions | Build outputs, dependencies            |
| `.eslintignore`            | Lint exclusions   | Generated files, configs               |

---

## Quick Start

### Initial Setup

```bash
# Install dependencies
npm ci --legacy-peer-deps

# Setup Husky hooks
npm run prepare

# Verify configuration
npm run validate
```

### Development Workflow

```bash
# Start development
npm run dev

# Before committing (automatic via pre-commit hook)
npm run lint:fix
npm run format
npm test

# Check dependencies weekly
npm run deps:check
```

### CI/CD Workflow

1. **Push to PR**: All CI jobs run automatically
2. **Review CodeRabbit feedback**: Check AI-generated review
3. **Fix issues**: Address lint, test, or dependency issues
4. **Merge**: All checks must pass

---

## Troubleshooting

### ESLint Errors

```bash
# Clear cache and re-run
rm -rf .eslintcache
npm run lint:fix
```

### Prettier Conflicts

```bash
# Format all files
npm run format

# Check specific file
npx prettier --check src/path/to/file.ts
```

### Pre-commit Hook Issues

```bash
# Reinstall Husky
rm -rf .husky
npm run prepare

# Make hooks executable
chmod +x .husky/pre-commit
```

### Dependency Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Check for conflicts
npm ls
```

---

## References

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [Tsup Documentation](https://tsup.egoist.dev/)
- [CodeRabbit Documentation](https://docs.coderabbit.ai/)
- [npm-check-updates](https://github.com/raineorshine/npm-check-updates)
- [Husky Documentation](https://typicode.github.io/husky/)

---

**Last Updated**: February 14, 2026  
**UIForge MCP Version**: 0.2.0
