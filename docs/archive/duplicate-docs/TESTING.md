# Testing Guide

This document describes the testing strategy and practices for UIForge MCP.

## Test Coverage

Current coverage: **84.38%** (22 test suites, 236 tests)

| Metric     | Coverage | Threshold |
| ---------- | -------- | --------- |
| Statements | 84.38%   | 84% ✅    |
| Branches   | 73.96%   | 73% ✅    |
| Functions  | 88.18%   | 85% ✅    |
| Lines      | 84.38%   | 84% ✅    |

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- src/__tests__/design-context.unit.test.ts
```

## Test Organization

```
src/__tests__/
├── *.unit.test.ts              # Unit tests for lib modules
├── *.integration.test.ts       # Integration tests
├── tools/                      # Tool registration tests
│   ├── scaffold-full-application.unit.test.ts
│   ├── generate-ui-component.unit.test.ts
│   ├── generate-prototype.unit.test.ts
│   ├── generate-design-image.unit.test.ts
│   ├── fetch-design-inspiration.unit.test.ts
│   ├── analyze-design-references.unit.test.ts
│   ├── figma-context-parser.unit.test.ts
│   └── figma-push-variables.unit.test.ts
├── resources/                  # Resource tests
│   └── current-styles.unit.test.ts
└── index.unit.test.ts          # Server initialization tests
```

## Testing Strategy

### Unit Tests

Unit tests focus on individual functions and modules in isolation:

- **Template Generation**: React, Next.js, Vue, Angular templates
- **Design Context**: Color palettes, typography, spacing
- **Style Audit**: Tailwind config parsing, CSS variable extraction
- **Image Analysis**: Dominant color extraction, layout detection
- **Pattern Detection**: Common design pattern identification
- **Tailwind Mapping**: Design token to Tailwind class conversion

### Integration Tests

Integration tests verify end-to-end workflows:

- **Code Generation Pipeline**: Design context → template → output
- **Accessibility**: ARIA landmarks, semantic HTML, skip links
- **SEO**: Meta tags, Open Graph, structured data
- **Responsive Design**: Breakpoint classes, mobile-first approach

### Tool Tests

Tool tests verify MCP tool registration and basic functionality:

- Tool registration without errors
- Input schema validation
- Basic handler execution
- Error handling

## Writing Tests

### Test Structure

```typescript
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('Module Name', () => {
  beforeEach(() => {
    // Setup code
  });

  it('should do something specific', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = functionUnderTest(input);

    // Assert
    expect(result).toBe('expected');
  });
});
```

### Best Practices

1. **Test Naming**: Use descriptive names that explain what is being tested
2. **Arrange-Act-Assert**: Structure tests clearly with setup, execution, and
   verification
3. **One Assertion Per Test**: Focus each test on a single behavior
4. **Avoid Test Interdependence**: Tests should be independent and runnable in
   any order
5. **Mock External Dependencies**: Use mocks for API calls, file system, etc.
6. **Test Edge Cases**: Include tests for error conditions and boundary values

### Example: Testing a Template Generator

```typescript
import { generateReactProject } from '../lib/templates/react.js';
import { designContextStore } from '../lib/design-context.js';

describe('React Template Generator', () => {
  beforeEach(() => {
    designContextStore.reset();
  });

  it('generates all required files', () => {
    const ctx = designContextStore.get();
    const files = generateReactProject('test-app', 'flat', 'zustand', ctx);

    expect(files.length).toBeGreaterThan(0);
    expect(files.some((f) => f.path.includes('package.json'))).toBe(true);
    expect(files.some((f) => f.path.includes('App.tsx'))).toBe(true);
  });

  it('includes design context in CSS', () => {
    const ctx = designContextStore.get();
    const files = generateReactProject('test', 'flat', 'none', ctx);

    const css = files.find((f) => f.path.includes('index.css'));
    expect(css?.content).toContain('--primary');
    expect(css?.content).toContain('--background');
  });
});
```

## Coverage Requirements

### Enforced Thresholds

Coverage thresholds are enforced in `jest.config.ts`:

```typescript
coverageThreshold: {
  global: {
    branches: 73,
    functions: 85,
    lines: 84,
    statements: 84,
  },
}
```

### Files Excluded from Coverage

The following files are excluded from coverage collection:

- `src/lib/types.ts` - Type definitions only
- `src/lib/figma-client.ts` - Requires live Figma API
- `src/lib/design-extractor.ts` - Requires live HTTP requests
- `src/lib/browser-scraper.ts` - Requires Playwright browser
- `src/lib/templates/prototype-shell.ts` - Template string only

### Adding Tests for New Code

When adding new functionality:

1. Write tests first (TDD approach recommended)
2. Ensure new code maintains coverage thresholds
3. Add both unit and integration tests where appropriate
4. Update this documentation if adding new test patterns

## MCP Protocol Testing

For testing the MCP server with stdio transport:

```bash
# Run MCP protocol test script
node scripts/test-mcp-server.mjs
```

This script tests:

- Server initialization
- Tool registration and listing
- Resource endpoints
- Tool invocation
- Error handling

## Continuous Integration

Tests run automatically on:

- Push to `main` branch
- Pull requests to `main`

CI workflow includes:

- Linting (`npm run lint`)
- Format checking (`npm run format:check`)
- Type checking (`npx tsc --noEmit`)
- Tests with coverage (`npm run test:coverage`)
- Build verification (`npm run build`)

## Debugging Tests

### Run Tests in Debug Mode

```bash
# Node.js debugging
node --inspect-brk node_modules/.bin/jest --runInBand

# VS Code: Add to launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal"
}
```

### Common Issues

**Issue**: Tests timeout

- **Solution**: Increase timeout in test:
  `it('test', async () => { ... }, 10000);`

**Issue**: ESM import errors

- **Solution**: Ensure `NODE_OPTIONS=--experimental-vm-modules` is set

**Issue**: Coverage not updating

- **Solution**: Clear Jest cache: `npx jest --clearCache`

## Performance

Test suite performance:

- **Total time**: ~3-4 seconds
- **Parallel execution**: Enabled by default
- **Watch mode**: Optimized for fast feedback

## Future Improvements

Planned testing enhancements:

- [ ] E2E tests for generated applications
- [ ] Visual regression tests for image generation
- [ ] Performance benchmarks for code generation
- [ ] Mutation testing for coverage quality
- [ ] Contract tests for MCP protocol compliance
