# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.0] - 2026-02-24

### Added
- **Professional Template & Snippet Library** — 500+ design snippets replacing generic AI output
  - Anti-Generic Quality System: validation rules enforce semantic tokens, inspiration sources, craft details
  - Diversity tracker prevents consecutive duplicate variant generation
- **Page Compositions Engine** — dynamic page assembly from registry queries
  - 5 composition categories: landing (4 variants), dashboard (3), auth (3), ecommerce (3), content (2)
  - `composePageFromTemplate()` replaces hardcoded page templates with search-driven assembly
- **Template Packs** — curated multi-page app starters
  - SaaS Dashboard (Linear/Vercel-inspired): 6 pages with dark premium theme
  - Startup Landing (Cal.com/Resend-inspired): 4 pages with minimal editorial theme
  - AI Chat App (ChatGPT/Claude-inspired): 3 pages with linear-modern theme
- **New MCP Tool**: `generate_from_template_pack` — generates complete multi-page apps from packs
  - Supports all 6 frameworks (React, Next.js, Vue, Angular, Svelte, HTML)
  - Generates routing config, shared layout, and framework-specific boilerplate
- **Expanded Component Registry** (25 → 100+ snippets):
  - 8 new organism files: navbars (6), pricing (6), testimonials (5), auth (6), dashboards (8), footers (5), chat (4), content (4)
  - 6 new molecule files: data-tables (6), modals (5), lists (5), search (4), stats (4), empty-states (3)
  - 4 new atom files: avatars (5), status (4), dividers (3), skeletons (4)
  - Expanded existing files: buttons, inputs, badges, cards, forms, navigation
- **13 New PageTemplateTypes**: ai_chat, changelog, team_members, settings_billing, api_keys, analytics, profile, file_manager, kanban, calendar, docs, faq, blog_post
- SQLite DB as source of truth for component registry with batch hydration

### Changed
- `generate-page-template.ts` extended with 13 new template body functions
- `scaffold-full-application.ts` wired to ML composition pipeline
- Registry init now loads compositions and template packs at startup

## [0.5.1] - 2026-02-24

### Added
- **RAG-Powered Specialist Agents**: Semantic search over external datasets for context-aware generation
  - Component Architect: shadcn/ui component library (50+ production components)
  - Accessibility Auditor: axe-core rules (50+ WCAG rules) + WAI-ARIA patterns (30 widget patterns)
  - Style Recommender: Material Design 3 + GitHub Primer design tokens (500+ entries)
  - Quality Scorer: RAG-based a11y compliance checking with violation detection
  - Prompt Enhancer: ARIA pattern and a11y rule injection for context-aware prompts
- **Data Ingestion CLI** (`src/scripts/ingest-training-data.ts`): Download and embed external datasets
  - Sources: shadcn/ui, axe-core, Material Design 3 tokens, Primer tokens, WAI-ARIA APG patterns
  - Built-in fallback datasets when external repos unavailable
  - Stats and test-query modes for verification
- **Style Recommender Module** (`src/lib/ml/style-recommender.ts`): Design token recommendation engine
  - RAG retrieval from ingested token embeddings
  - 10 industry presets (fintech, saas, healthcare, etc.)
  - 12 mood modifiers (bold, calm, playful, etc.)
  - Integrated into generation pipeline
- **Cross-Repo Knowledge Sync** (`src/scripts/sync-knowledge.ts`): Export embeddings as JSONL for mcp-gateway
  - Incremental sync with timestamp tracking
  - Agent-specific routing metadata
- **Synthetic Training Data Generator** (`src/scripts/generate-training-data.ts`): LoRA fine-tuning preparation
  - Quality-scorer: degraded code pairs (good/medium/bad)
  - Prompt-enhancer: simplified → enhanced prompt pairs
  - Style-recommender: industry/mood → design token mappings
- Extended `IEmbedding.sourceType` union with `rule`, `token`, `pattern`, `example`
- `enhancePromptWithRAG()`: async RAG-enhanced prompt enhancement
- `scoreQualityWithRAG()`: async RAG-enhanced quality scoring
- Lower synthetic data thresholds for `hasEnoughData()`

### Changed
- `generate_ui_component` tool now performs semantic search before generation
- `audit_accessibility` tool enriches issues with axe-core rule IDs and WCAG criteria
- Quality scoring upgraded from heuristic-only to RAG + heuristic hybrid

### Technical Details
- All RAG features degrade gracefully — zero behavior change when embeddings table is empty
- No breaking changes to existing interfaces
- CPU-first, zero-cost design: all-MiniLM-L6-v2 embeddings (~50ms each)
- Expected ~680 embeddings from Phase 1 sources, ~25K from Phase 5 HuggingFace datasets

## [0.4.3] - 2026-02-18

### Fixed
- **ESLint**: Resolved all ESLint warnings and errors (32 issues fixed)
  - Removed unused imports (`ConfigNotInitializedError`, `ModelId`, `designContextStore`)
  - Replaced logical OR (`||`) with nullish coalescing (`??`) operators
  - Fixed non-null assertions with safer nullish coalescing
  - Prefixed unused variables and parameters with underscore
  - Replaced string concatenation with template literals
  - Added proper ESLint disable comments for external library `any` types
  - Removed deprecated `.eslintignore` file (migrated to config `ignores`)
- **Code Quality**: Achieved zero ESLint warnings and errors
- **Files Modified**: 15+ files across `src/lib/`, `src/tools/`, and `src/scripts/`

### Technical Details
- **Embeddings**: Properly handled `@huggingface/transformers` dynamic imports with ESLint disable comments
- **Database**: Fixed unused variable references in `design-references/database/store.ts`
- **ML Components**: Updated all ML-related files to use nullish coalescing
- **Tools**: Fixed unused parameters in `generate-ui-component.ts` and other tool files

## [0.4.2] - 2026-02-17

### Added
- **Security**: Integrated Codecov and Snyk security scanning
- **CI/CD**: Added comprehensive GitHub workflows for security and coverage
- **Documentation**: Updated deployment documentation with new setup instructions
- **Memory**: Added memory entries for security and coverage integrations

### Changed
- **Workflows**: Replaced deployment scripts with admin-only GitHub workflows
- **Strategy**: Implemented Trunk Based Development strategy
- **CI**: Updated test matrix to use Node.js 22 and 24

### Fixed
- **Compatibility**: Resolved ESLint compatibility issues with Node.js 24
- **Deployment**: Simplified ESLint config to avoid project service issues

## [0.4.1] - 2026-02-15

### Added
- **Docker**: Multi-stage Docker build for production deployment
- **Documentation**: Comprehensive deployment and setup guides
- **CI/CD**: GitHub Actions workflows for automated testing and deployment
- **Security**: Snyk integration for vulnerability scanning
- **Coverage**: Codecov integration for test coverage reporting

### Fixed
- **Dependencies**: Updated all dependencies to latest stable versions
- **TypeScript**: Fixed type issues and improved type safety
- **Testing**: Improved test coverage and fixed failing tests

## [0.4.0] - 2026-02-10

### Added
- **Major Refactor**: Complete architecture overhaul with service layer
- **Component Library**: Added support for multiple UI component libraries
- **ML Integration**: Enhanced ML capabilities with local model support
- **Templates**: Added comprehensive template system for rapid development
- **API**: New REST API endpoints for external integrations

### Changed
- **Performance**: Significant performance improvements across all features
- **UI**: Completely redesigned user interface with modern design patterns
- **Architecture**: Moved to microservices architecture for better scalability

### Fixed
- **Memory**: Fixed memory leaks and improved resource management
- **Security**: Enhanced security measures and vulnerability fixes
- **Compatibility**: Improved browser and Node.js compatibility

## [0.3.0] - 2026-01-20

### Added
- **Figma Integration**: Full Figma API integration for design tokens
- **Prototyping**: Interactive prototype generation
- **Accessibility**: WCAG 2.1 AA compliance checking
- **Components**: Enhanced component library with 50+ components

### Changed
- **Performance**: Optimized rendering and generation algorithms
- **UX**: Improved user experience with better error handling

## [0.2.0] - 2025-12-15

### Added
- **Multi-framework Support**: Vue, Angular, Svelte support
- **Image Analysis**: Advanced design pattern recognition
- **Training Data**: ML training data export and management
- **Quality Scoring**: Automated quality assessment for generated code

### Fixed
- **Generation**: Improved code generation quality and accuracy
- **Dependencies**: Updated all dependencies for security

## [0.1.0] - 2025-11-01

### Added
- **Initial Release**: Basic UI generation from natural language
- **React Support**: Full React component generation
- **Design Context**: Basic design system integration
- **CLI Tool**: Command-line interface for batch operations