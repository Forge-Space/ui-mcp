# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- **`.eslintrc.js`**: aligned with forge-patterns base config — adds `no-floating-promises`, `prefer-template`, `no-duplicate-imports`, `require-await`; removes style rules delegated to Prettier
- **`@uiforge/forge-patterns`**: added as dev dependency (local file reference) for shared constants access

### Changed

- **`.prettierrc.json`**: `trailingComma` `none` → `es5`; `arrowParens` `avoid` → `always` (forge canonical)
- **`tsconfig.json`**: added `composite: true`; removed redundant `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes` (already implied by `strict: true`)
- **`.husky/pre-commit`**: updated to forge gate pattern (`bash`, `set -euo pipefail`, lint-staged → tsc → tests)
- **CI `checkout@v6` → `checkout@v4`**, **`setup-node@v6` → `setup-node@v4`** across all jobs

### Fixed

- **`scripts/quick-setup.sh`**: `set -e` → `set -euo pipefail`
- **`scripts/validate-integration.sh`**: `set -e` → `set -euo pipefail`

## 0.5.0 (2026-02-18)

### Added

- **Component Library Integration**: Full implementation of component library code generation across all 6 frameworks
  - **React/Next.js**: shadcn/ui, Radix UI, Headless UI, Material UI support with proper imports and component patterns
  - **Vue**: PrimeVue, Headless UI, shadcn-vue, Radix Vue, Material support with Composition API
  - **Angular**: Angular Material, CDK, PrimeNG support with proper module declarations
  - **Svelte**: bits-ui (shadcn-svelte), @radix-ui/svelte, @headlessui/svelte, @smui/material support
  - **HTML**: Tailwind CSS CDN-based generation for all library styles
- **Generator Architecture**: `BaseGenerator` now exposes abstract methods for library-specific dependencies, imports, and component generation per library
- **Generator Factory**: Updated `generateComponent` to accept and forward `ComponentLibrary` parameter
- **Tool Integration**: `generate_ui_component` and `image_to_component` tools now fully utilise the `componentLibrary` parameter
- **Test Files**: All framework generators now produce component + test file pairs (React also produces Storybook stories)

### Fixed

- **Build**: Resolved duplicate export ambiguity in `src/lib/utils/index.ts`
- **Build**: Fixed `generate-ui-component.ts` referencing undefined `generation` variable
- **Build**: Fixed `consolidated.utils.ts` strict-null errors

### Changed

- `SvelteGenerator.generateComponent` now accepts optional `componentLibrary` parameter
- `VueGenerator`, `AngularGenerator`, `HtmlGenerator` updated to generate test/spec files alongside component files
- Removed stale TODO comments from generator `generateComponent` methods
