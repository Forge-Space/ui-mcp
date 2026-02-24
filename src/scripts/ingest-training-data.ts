/**
 * Data ingestion CLI for specialist agent training.
 *
 * Downloads and processes external datasets to populate the RAG embedding store.
 * Run: npx tsx src/scripts/ingest-training-data.ts --source <name>
 *
 * Sources:
 *   shadcn    — shadcn/ui components (MIT)
 *   axe       — axe-core accessibility rules (MPL 2.0)
 *   tokens    — Material Design 3 + GitHub Primer design tokens (Apache 2.0 / MIT)
 *   aria      — WAI-ARIA Authoring Practices patterns (W3C)
 *   all       — Run all sources sequentially
 *
 * Flags:
 *   --stats       Show embedding counts by sourceType
 *   --test-query  Run a test semantic search query
 */

import { existsSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { execSync } from 'node:child_process';
import pino from 'pino';
import { embed, embedBatch } from '../lib/ml/embeddings.js';
import { storeEmbeddings, semanticSearch, getEmbeddingCount } from '../lib/ml/embedding-store.js';
import { getDatabase } from '../lib/design-references/database/store.js';
import type { IEmbedding } from '../lib/ml/types.js';

const logger = pino({ name: 'ingest-training-data', level: 'info' });
const CACHE_DIR = resolve(process.cwd(), '.uiforge', 'ingest-cache');

function ensureCacheDir(): void {
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }
}

// --- Source A: shadcn/ui components ---

interface ShadcnComponent {
  name: string;
  code: string;
  description: string;
  props: string[];
  tailwindClasses: string[];
}

function parseShadcnRegistry(registryDir: string): ShadcnComponent[] {
  const components: ShadcnComponent[] = [];
  if (!existsSync(registryDir)) return components;

  const files = readdirSync(registryDir).filter((f) => f.endsWith('.tsx'));

  for (const file of files) {
    const code = readFileSync(join(registryDir, file), 'utf-8');
    const name = basename(file, '.tsx');

    const jsdocMatch = code.match(/\/\*\*[\s\S]*?\*\//);
    const description = jsdocMatch ? jsdocMatch[0].replace(/\/\*\*|\*\/|\n\s*\*/g, ' ').trim() : `${name} component`;

    const propsMatch = code.match(/interface\s+\w+Props\s*\{([^}]*)\}/);
    const props = propsMatch
      ? propsMatch[1]
          .split('\n')
          .map((l) => l.trim().split(':')[0]?.trim())
          .filter(Boolean)
      : [];

    const twClasses = [
      ...new Set(
        (code.match(/(?:className|class)=["'][^"']*["']/g) ?? [])
          .flatMap((m) =>
            m
              .replace(/(?:className|class)=["']/, '')
              .replace(/["']$/, '')
              .split(/\s+/)
          )
          .filter((c) => /^[a-z]/.test(c))
      ),
    ];

    components.push({ name, code, description, props, tailwindClasses: twClasses });
  }

  return components;
}

async function ingestShadcn(): Promise<number> {
  logger.info('Ingesting shadcn/ui components...');
  const repoDir = join(CACHE_DIR, 'shadcn-ui');

  if (!existsSync(repoDir)) {
    logger.info('Cloning shadcn-ui/ui repository (sparse checkout)...');
    execSync(`git clone --depth 1 --filter=blob:none --sparse https://github.com/shadcn-ui/ui.git "${repoDir}"`, {
      stdio: 'pipe',
    });
    execSync('git sparse-checkout set packages/shadcn/src/registry', { cwd: repoDir, stdio: 'pipe' });
  }

  const registryPaths = [
    join(repoDir, 'packages', 'shadcn', 'src', 'registry', 'default', 'ui'),
    join(repoDir, 'packages', 'shadcn', 'src', 'registry', 'new-york', 'ui'),
  ];

  const allComponents: ShadcnComponent[] = [];
  for (const regPath of registryPaths) {
    allComponents.push(...parseShadcnRegistry(regPath));
  }

  const uniqueComponents = new Map<string, ShadcnComponent>();
  for (const comp of allComponents) {
    if (!uniqueComponents.has(comp.name)) {
      uniqueComponents.set(comp.name, comp);
    }
  }

  const components = [...uniqueComponents.values()];
  if (components.length === 0) {
    logger.warn('No shadcn components found, trying alternative registry paths...');
    const altPath = join(repoDir, 'apps', 'www', 'registry', 'default', 'ui');
    if (existsSync(altPath)) {
      components.push(...parseShadcnRegistry(altPath));
    }
  }

  if (components.length === 0) {
    logger.warn('No shadcn components found after trying all paths');
    return 0;
  }

  const texts = components.map(
    (c) =>
      `shadcn ${c.name}: ${c.description}. Tags: ${c.props.join(', ')}. Patterns: ${c.tailwindClasses.slice(0, 20).join(' ')}`
  );

  const vectors = await embedBatch(texts);
  const db = getDatabase();
  const embeddings: IEmbedding[] = components.map((c, i) => ({
    sourceId: `shadcn-${c.name}`,
    sourceType: 'component' as const,
    text: texts[i],
    vector: vectors[i],
    dimensions: vectors[i].length,
    createdAt: Date.now(),
  }));

  storeEmbeddings(embeddings, db);

  const codeEmbeddings: IEmbedding[] = [];
  const BATCH_SIZE = 10;
  for (let i = 0; i < components.length; i += BATCH_SIZE) {
    const batch = components.slice(i, i + BATCH_SIZE);
    const codeTexts = batch.map((c) => c.code.slice(0, 1000));
    const codeVectors = await embedBatch(codeTexts);
    for (let j = 0; j < batch.length; j++) {
      codeEmbeddings.push({
        sourceId: `shadcn-code-${batch[j].name}`,
        sourceType: 'example' as const,
        text: codeTexts[j],
        vector: codeVectors[j],
        dimensions: codeVectors[j].length,
        createdAt: Date.now(),
      });
    }
  }
  storeEmbeddings(codeEmbeddings, db);

  logger.info({ count: embeddings.length + codeEmbeddings.length }, 'shadcn/ui components ingested');
  return embeddings.length + codeEmbeddings.length;
}

// --- Source B: axe-core accessibility rules ---

interface AxeRule {
  id: string;
  description?: string;
  help?: string;
  impact?: string;
  tags?: string[];
  metadata?: {
    description?: string;
    help?: string;
    impact?: string;
  };
}

async function ingestAxeCore(): Promise<number> {
  logger.info('Ingesting axe-core accessibility rules...');

  let axeCorePath: string;
  try {
    const resolved = execSync('node -e "console.log(require.resolve(\'axe-core/package.json\'))"', {
      cwd: resolve(process.cwd()),
      stdio: ['pipe', 'pipe', 'pipe'],
    })
      .toString()
      .trim();
    axeCorePath = resolve(resolved, '..');
  } catch {
    logger.info('axe-core not found, installing as devDep...');
    execSync('npm install --save-dev axe-core', { cwd: process.cwd(), stdio: 'pipe' });
    const resolved = execSync('node -e "console.log(require.resolve(\'axe-core/package.json\'))"', {
      cwd: resolve(process.cwd()),
      stdio: ['pipe', 'pipe', 'pipe'],
    })
      .toString()
      .trim();
    axeCorePath = resolve(resolved, '..');
  }

  const axeMainPath = join(axeCorePath, 'axe.js');
  let rules: AxeRule[] = [];

  if (existsSync(axeMainPath)) {
    const axeContent = readFileSync(axeMainPath, 'utf-8');
    const rulesMatch = axeContent.match(/"rules"\s*:\s*\[[\s\S]*?\]\s*(?=,\s*"(?:checks|data|commons)")/);
    if (rulesMatch) {
      try {
        rules = JSON.parse(rulesMatch[0].replace(/"rules"\s*:\s*/, ''));
      } catch {
        logger.debug('Could not parse rules from axe.js main file');
      }
    }
  }

  if (rules.length === 0) {
    const localesPath = join(axeCorePath, 'locales', 'en.json');
    if (existsSync(localesPath)) {
      const localeData = JSON.parse(readFileSync(localesPath, 'utf-8'));
      if (localeData.rules) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rules = Object.entries(localeData.rules).map(([id, data]: [string, any]) => ({
          id,
          description: data.description || '',
          help: data.help || '',
        }));
      }
    }
  }

  if (rules.length === 0) {
    const rulesDir = join(axeCorePath, 'lib', 'rules');
    if (existsSync(rulesDir)) {
      const ruleFiles = readdirSync(rulesDir).filter((f) => f.endsWith('.json'));
      for (const file of ruleFiles) {
        const ruleData = JSON.parse(readFileSync(join(rulesDir, file), 'utf-8'));
        rules.push({
          id: ruleData.id || basename(file, '.json'),
          description: ruleData.metadata?.description || ruleData.description || '',
          help: ruleData.metadata?.help || ruleData.help || '',
          impact: ruleData.metadata?.impact || ruleData.impact || 'moderate',
          tags: ruleData.tags || [],
        });
      }
    }
  }

  if (rules.length === 0) {
    logger.info('Generating known axe-core rules from built-in list...');
    rules = getKnownAxeRules();
  }

  const texts = rules.map((r) => {
    const desc = r.description || r.metadata?.description || r.id;
    const help = r.help || r.metadata?.help || '';
    const impact = r.impact || r.metadata?.impact || 'moderate';
    return `a11y rule ${r.id}: ${desc}. Impact: ${impact}. Fix: ${help}`;
  });

  const vectors = await embedBatch(texts);
  const db = getDatabase();
  const embeddings: IEmbedding[] = rules.map((r, i) => ({
    sourceId: `axe-${r.id}`,
    sourceType: 'rule' as const,
    text: texts[i],
    vector: vectors[i],
    dimensions: vectors[i].length,
    createdAt: Date.now(),
  }));

  storeEmbeddings(embeddings, db);
  logger.info({ count: embeddings.length }, 'axe-core rules ingested');
  return embeddings.length;
}

function getKnownAxeRules(): AxeRule[] {
  return [
    {
      id: 'area-alt',
      description: 'Active <area> elements must have alternate text',
      help: 'Add alt attribute to <area> elements',
      impact: 'critical',
      tags: ['wcag2a', '1.1.1'],
    },
    {
      id: 'aria-allowed-attr',
      description: 'ARIA attributes must be allowed for the element role',
      help: 'Remove disallowed ARIA attributes',
      impact: 'critical',
      tags: ['wcag2a', '4.1.2'],
    },
    {
      id: 'aria-hidden-body',
      description: 'aria-hidden=true must not be present on the document body',
      help: 'Remove aria-hidden from body',
      impact: 'critical',
      tags: ['wcag2a', '4.1.2'],
    },
    {
      id: 'aria-hidden-focus',
      description: 'aria-hidden elements must not contain focusable elements',
      help: 'Remove focusable content from hidden areas',
      impact: 'serious',
      tags: ['wcag2a', '4.1.2'],
    },
    {
      id: 'aria-required-attr',
      description: 'Required ARIA attributes must be provided',
      help: 'Add required ARIA attributes for the role',
      impact: 'critical',
      tags: ['wcag2a', '4.1.2'],
    },
    {
      id: 'aria-required-parent',
      description: 'ARIA roles must be contained by required parent roles',
      help: 'Place element within proper parent role',
      impact: 'critical',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'aria-roles',
      description: 'ARIA roles must conform to valid values',
      help: 'Use valid ARIA role values',
      impact: 'critical',
      tags: ['wcag2a', '4.1.2'],
    },
    {
      id: 'aria-valid-attr',
      description: 'ARIA attributes must conform to valid names',
      help: 'Use valid ARIA attribute names',
      impact: 'critical',
      tags: ['wcag2a', '4.1.2'],
    },
    {
      id: 'aria-valid-attr-value',
      description: 'ARIA attributes must conform to valid values',
      help: 'Use valid ARIA attribute values',
      impact: 'critical',
      tags: ['wcag2a', '4.1.2'],
    },
    {
      id: 'button-name',
      description: 'Buttons must have discernible text',
      help: 'Add accessible name via text content, aria-label, or aria-labelledby',
      impact: 'critical',
      tags: ['wcag2a', '4.1.2'],
    },
    {
      id: 'bypass',
      description: 'Page must have means to bypass repeated blocks',
      help: 'Add skip navigation link or landmark regions',
      impact: 'serious',
      tags: ['wcag2a', '2.4.1'],
    },
    {
      id: 'color-contrast',
      description: 'Elements must meet minimum color contrast ratio thresholds',
      help: 'Ensure 4.5:1 contrast ratio for normal text, 3:1 for large text',
      impact: 'serious',
      tags: ['wcag2aa', '1.4.3'],
    },
    {
      id: 'document-title',
      description: 'Documents must have a <title> element',
      help: 'Add a descriptive <title> element',
      impact: 'serious',
      tags: ['wcag2a', '2.4.2'],
    },
    {
      id: 'duplicate-id',
      description: 'id attribute values must be unique',
      help: 'Ensure each id attribute value is unique',
      impact: 'minor',
      tags: ['wcag2a', '4.1.1'],
    },
    {
      id: 'form-field-multiple-labels',
      description: 'Form fields should not have multiple labels',
      help: 'Use a single label per form field',
      impact: 'moderate',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'frame-title',
      description: 'Frames must have an accessible name',
      help: 'Add title attribute to frames',
      impact: 'serious',
      tags: ['wcag2a', '4.1.2'],
    },
    {
      id: 'html-has-lang',
      description: 'HTML element must have a lang attribute',
      help: 'Add lang attribute to <html> element',
      impact: 'serious',
      tags: ['wcag2a', '3.1.1'],
    },
    {
      id: 'html-lang-valid',
      description: 'HTML element must have a valid value for the lang attribute',
      help: 'Use a valid BCP 47 language tag',
      impact: 'serious',
      tags: ['wcag2a', '3.1.1'],
    },
    {
      id: 'image-alt',
      description: 'Images must have alternate text',
      help: 'Add descriptive alt attribute or alt="" for decorative images',
      impact: 'critical',
      tags: ['wcag2a', '1.1.1'],
    },
    {
      id: 'input-image-alt',
      description: 'Image buttons must have alternate text',
      help: 'Add alt attribute to input type=image',
      impact: 'critical',
      tags: ['wcag2a', '1.1.1'],
    },
    {
      id: 'label',
      description: 'Form elements must have labels',
      help: 'Add visible label or aria-label to form elements',
      impact: 'critical',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'link-name',
      description: 'Links must have discernible text',
      help: 'Add text content, aria-label, or aria-labelledby to links',
      impact: 'serious',
      tags: ['wcag2a', '4.1.2'],
    },
    {
      id: 'list',
      description: 'Lists must be structured correctly',
      help: 'Use only <li> elements within <ul> and <ol>',
      impact: 'serious',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'listitem',
      description: 'List items must be contained in <ul> or <ol>',
      help: 'Place <li> elements within proper list containers',
      impact: 'serious',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'meta-viewport',
      description: 'Zooming and scaling must not be disabled',
      help: 'Do not use maximum-scale=1 or user-scalable=no',
      impact: 'critical',
      tags: ['wcag2aa', '1.4.4'],
    },
    {
      id: 'object-alt',
      description: '<object> elements must have alternate text',
      help: 'Add alt text or aria-label to object elements',
      impact: 'serious',
      tags: ['wcag2a', '1.1.1'],
    },
    {
      id: 'role-img-alt',
      description: 'Elements with role=img must have alternate text',
      help: 'Add aria-label or aria-labelledby',
      impact: 'serious',
      tags: ['wcag2a', '1.1.1'],
    },
    {
      id: 'scope-attr-valid',
      description: 'scope attribute must be used correctly',
      help: 'Use scope=col or scope=row on <th> elements only',
      impact: 'moderate',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'tabindex',
      description: 'tabindex should not be greater than 0',
      help: 'Use tabindex=0 or tabindex=-1 only',
      impact: 'serious',
      tags: ['wcag2a', '2.4.3'],
    },
    {
      id: 'td-headers-attr',
      description: 'Table cell headers must refer to existing cells',
      help: 'Ensure headers attribute references valid th elements',
      impact: 'serious',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'autocomplete-valid',
      description: 'autocomplete attribute must be used correctly',
      help: 'Use valid autocomplete values from the HTML spec',
      impact: 'serious',
      tags: ['wcag21a', '1.3.5'],
    },
    {
      id: 'avoid-inline-spacing',
      description: 'Inline text spacing must be adjustable with custom stylesheets',
      help: 'Do not use !important on text spacing properties',
      impact: 'serious',
      tags: ['wcag21aa', '1.4.12'],
    },
    {
      id: 'empty-heading',
      description: 'Headings must not be empty',
      help: 'Add text content to heading elements',
      impact: 'minor',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'empty-table-header',
      description: 'Table headers must not be empty',
      help: 'Add text content to <th> elements',
      impact: 'minor',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'heading-order',
      description: 'Heading levels should increase by one',
      help: 'Do not skip heading levels (e.g., h1 to h3)',
      impact: 'moderate',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'image-redundant-alt',
      description: 'Alt text must not duplicate text of adjacent link or button',
      help: 'Remove redundant alt text',
      impact: 'minor',
      tags: ['wcag2a', '1.1.1'],
    },
    {
      id: 'label-title-only',
      description: 'Form elements should have visible labels',
      help: 'Add visible text labels instead of relying only on title',
      impact: 'serious',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'landmark-banner-is-top-level',
      description: 'Banner landmark must be top level',
      help: 'Place banner role at top level of DOM',
      impact: 'moderate',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'landmark-contentinfo-is-top-level',
      description: 'Contentinfo landmark must be top level',
      help: 'Place contentinfo role at top level',
      impact: 'moderate',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'landmark-main-is-top-level',
      description: 'Main landmark must be top level',
      help: 'Place main role at top level of DOM',
      impact: 'moderate',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'landmark-no-duplicate-banner',
      description: 'Document must not have more than one banner',
      help: 'Use only one banner landmark per document',
      impact: 'moderate',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'landmark-no-duplicate-contentinfo',
      description: 'Document must not have more than one contentinfo',
      help: 'Use only one contentinfo landmark per document',
      impact: 'moderate',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'landmark-no-duplicate-main',
      description: 'Document must not have more than one main',
      help: 'Use only one main landmark per document',
      impact: 'moderate',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'landmark-one-main',
      description: 'Document must have one main landmark',
      help: 'Add exactly one element with role=main',
      impact: 'moderate',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'landmark-unique',
      description: 'Landmarks must have a unique role or label',
      help: 'Add unique aria-label to duplicate landmarks',
      impact: 'moderate',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'page-has-heading-one',
      description: 'Page must contain a level-one heading',
      help: 'Add an <h1> element to the page',
      impact: 'moderate',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'region',
      description: 'All page content must be contained by landmarks',
      help: 'Wrap content in landmark regions',
      impact: 'moderate',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'table-duplicate-name',
      description: 'Tables must not have duplicate accessible names',
      help: 'Use unique caption or aria-label for each table',
      impact: 'minor',
      tags: ['wcag2a', '1.3.1'],
    },
    {
      id: 'focus-order-semantics',
      description: 'Elements in focus order need appropriate role',
      help: 'Add appropriate role to focusable elements',
      impact: 'minor',
      tags: ['wcag2a', '2.4.3'],
    },
    {
      id: 'hidden-content',
      description: 'Hidden content must be analyzed',
      help: 'Review hidden content for accessibility',
      impact: 'minor',
      tags: ['wcag2a', '1.1.1'],
    },
    {
      id: 'target-size',
      description: 'Touch target must be at least 24x24 CSS pixels',
      help: 'Increase click/tap target size',
      impact: 'serious',
      tags: ['wcag22aa', '2.5.8'],
    },
    {
      id: 'link-in-text-block',
      description: 'Links within text must be distinguishable',
      help: 'Use underline or non-color indicator for links in text',
      impact: 'serious',
      tags: ['wcag2a', '1.4.1'],
    },
  ];
}

// --- Source C: Design tokens ---

interface DesignToken {
  system: string;
  category: string;
  name: string;
  value: string;
  description: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function flattenTokens(obj: any, system: string, category: string = '', prefix: string = ''): DesignToken[] {
  const tokens: DesignToken[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullName = prefix ? `${prefix}-${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const typedValue = value as Record<string, any>;
      if ('$value' in typedValue || 'value' in typedValue) {
        tokens.push({
          system,
          category: category || key,
          name: fullName,
          value: String(typedValue.$value ?? typedValue.value ?? ''),
          description: String(typedValue.$description ?? typedValue.description ?? ''),
        });
      } else {
        tokens.push(...flattenTokens(value, system, category || key, fullName));
      }
    }
  }

  return tokens;
}

async function ingestDesignTokens(): Promise<number> {
  logger.info('Ingesting design tokens (Material Design 3 + Primer)...');

  const allTokens: DesignToken[] = [];

  const md3Dir = join(CACHE_DIR, 'material-tokens');
  if (!existsSync(md3Dir)) {
    logger.info('Cloning Material Design 3 tokens...');
    try {
      execSync(`git clone --depth 1 https://github.com/nicholasgasior/material-design-tokens.git "${md3Dir}"`, {
        stdio: 'pipe',
        timeout: 30000,
      });
    } catch {
      logger.warn('Failed to clone material-tokens, trying alternative...');
      try {
        execSync(`git clone --depth 1 https://github.com/nicholasgasior/material-design-tokens.git "${md3Dir}"`, {
          stdio: 'pipe',
          timeout: 30000,
        });
      } catch {
        logger.warn('Material tokens not available, generating built-in set...');
      }
    }
  }

  if (existsSync(md3Dir)) {
    const tokenFiles = findJsonFiles(md3Dir, 3);
    for (const file of tokenFiles) {
      try {
        const data = JSON.parse(readFileSync(file, 'utf-8'));
        allTokens.push(...flattenTokens(data, 'material-design-3'));
      } catch {
        logger.debug({ file }, 'Skipped unparseable token file');
      }
    }
  }

  if (allTokens.filter((t) => t.system === 'material-design-3').length === 0) {
    allTokens.push(...getBuiltInMaterialTokens());
  }

  const primerDir = join(CACHE_DIR, 'primer-primitives');
  if (!existsSync(primerDir)) {
    logger.info('Cloning Primer design tokens...');
    try {
      execSync(
        `git clone --depth 1 --filter=blob:none --sparse https://github.com/primer/primitives.git "${primerDir}"`,
        { stdio: 'pipe', timeout: 30000 }
      );
      execSync('git sparse-checkout set data', { cwd: primerDir, stdio: 'pipe' });
    } catch {
      logger.warn('Failed to clone primer-primitives, using built-in set...');
    }
  }

  if (existsSync(primerDir)) {
    const tokenFiles = findJsonFiles(primerDir, 3);
    for (const file of tokenFiles) {
      try {
        const data = JSON.parse(readFileSync(file, 'utf-8'));
        allTokens.push(...flattenTokens(data, 'primer'));
      } catch {
        logger.debug({ file }, 'Skipped unparseable token file');
      }
    }
  }

  if (allTokens.filter((t) => t.system === 'primer').length === 0) {
    allTokens.push(...getBuiltInPrimerTokens());
  }

  const uniqueTokens = new Map<string, DesignToken>();
  for (const token of allTokens) {
    const key = `${token.system}-${token.category}-${token.name}`;
    if (!uniqueTokens.has(key)) {
      uniqueTokens.set(key, token);
    }
  }

  const tokens = [...uniqueTokens.values()].slice(0, 500);

  const texts = tokens.map(
    (t) => `${t.system} ${t.category} ${t.name}: ${t.value}. Usage: ${t.description || `${t.category} token`}`
  );

  const vectors = await embedBatch(texts);
  const db = getDatabase();
  const embeddings: IEmbedding[] = tokens.map((t, i) => ({
    sourceId: `token-${t.system}-${t.name}`,
    sourceType: 'token' as const,
    text: texts[i],
    vector: vectors[i],
    dimensions: vectors[i].length,
    createdAt: Date.now(),
  }));

  storeEmbeddings(embeddings, db);
  logger.info({ count: embeddings.length }, 'Design tokens ingested');
  return embeddings.length;
}

function findJsonFiles(dir: string, maxDepth: number): string[] {
  const files: string[] = [];
  if (maxDepth <= 0 || !existsSync(dir)) return files;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      files.push(...findJsonFiles(fullPath, maxDepth - 1));
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }

  return files;
}

function getBuiltInMaterialTokens(): DesignToken[] {
  const system = 'material-design-3';
  return [
    { system, category: 'color', name: 'primary', value: '#6750A4', description: 'Primary brand color' },
    { system, category: 'color', name: 'on-primary', value: '#FFFFFF', description: 'Text on primary color' },
    { system, category: 'color', name: 'primary-container', value: '#EADDFF', description: 'Primary container color' },
    { system, category: 'color', name: 'secondary', value: '#625B71', description: 'Secondary brand color' },
    { system, category: 'color', name: 'tertiary', value: '#7D5260', description: 'Tertiary accent color' },
    { system, category: 'color', name: 'error', value: '#B3261E', description: 'Error state color' },
    { system, category: 'color', name: 'surface', value: '#FFFBFE', description: 'Surface background color' },
    { system, category: 'color', name: 'surface-variant', value: '#E7E0EC', description: 'Variant surface color' },
    { system, category: 'color', name: 'outline', value: '#79747E', description: 'Outline border color' },
    { system, category: 'color', name: 'outline-variant', value: '#CAC4D0', description: 'Subtle outline color' },
    {
      system,
      category: 'typography',
      name: 'display-large',
      value: '57px/64px Roboto',
      description: 'Display large text style',
    },
    {
      system,
      category: 'typography',
      name: 'display-medium',
      value: '45px/52px Roboto',
      description: 'Display medium text style',
    },
    {
      system,
      category: 'typography',
      name: 'display-small',
      value: '36px/44px Roboto',
      description: 'Display small text style',
    },
    {
      system,
      category: 'typography',
      name: 'headline-large',
      value: '32px/40px Roboto',
      description: 'Headline large text style',
    },
    {
      system,
      category: 'typography',
      name: 'headline-medium',
      value: '28px/36px Roboto',
      description: 'Headline medium text style',
    },
    {
      system,
      category: 'typography',
      name: 'headline-small',
      value: '24px/32px Roboto',
      description: 'Headline small text style',
    },
    {
      system,
      category: 'typography',
      name: 'title-large',
      value: '22px/28px Roboto',
      description: 'Title large text style',
    },
    {
      system,
      category: 'typography',
      name: 'title-medium',
      value: '16px/24px Roboto Medium',
      description: 'Title medium text style',
    },
    {
      system,
      category: 'typography',
      name: 'title-small',
      value: '14px/20px Roboto Medium',
      description: 'Title small text style',
    },
    {
      system,
      category: 'typography',
      name: 'body-large',
      value: '16px/24px Roboto',
      description: 'Body large text style',
    },
    {
      system,
      category: 'typography',
      name: 'body-medium',
      value: '14px/20px Roboto',
      description: 'Body medium text style',
    },
    {
      system,
      category: 'typography',
      name: 'body-small',
      value: '12px/16px Roboto',
      description: 'Body small text style',
    },
    {
      system,
      category: 'typography',
      name: 'label-large',
      value: '14px/20px Roboto Medium',
      description: 'Label large text style',
    },
    {
      system,
      category: 'typography',
      name: 'label-medium',
      value: '12px/16px Roboto Medium',
      description: 'Label medium text style',
    },
    {
      system,
      category: 'typography',
      name: 'label-small',
      value: '11px/16px Roboto Medium',
      description: 'Label small text style',
    },
    { system, category: 'spacing', name: 'xs', value: '4px', description: 'Extra small spacing' },
    { system, category: 'spacing', name: 'sm', value: '8px', description: 'Small spacing' },
    { system, category: 'spacing', name: 'md', value: '16px', description: 'Medium spacing' },
    { system, category: 'spacing', name: 'lg', value: '24px', description: 'Large spacing' },
    { system, category: 'spacing', name: 'xl', value: '32px', description: 'Extra large spacing' },
    { system, category: 'shape', name: 'corner-none', value: '0px', description: 'No border radius' },
    { system, category: 'shape', name: 'corner-extra-small', value: '4px', description: 'Extra small border radius' },
    { system, category: 'shape', name: 'corner-small', value: '8px', description: 'Small border radius' },
    { system, category: 'shape', name: 'corner-medium', value: '12px', description: 'Medium border radius' },
    { system, category: 'shape', name: 'corner-large', value: '16px', description: 'Large border radius' },
    { system, category: 'shape', name: 'corner-extra-large', value: '28px', description: 'Extra large border radius' },
    { system, category: 'shape', name: 'corner-full', value: '50%', description: 'Fully rounded shape' },
    { system, category: 'elevation', name: 'level0', value: '0dp', description: 'No elevation' },
    { system, category: 'elevation', name: 'level1', value: '1dp', description: 'Low elevation (cards)' },
    { system, category: 'elevation', name: 'level2', value: '3dp', description: 'Medium elevation (menus)' },
    { system, category: 'elevation', name: 'level3', value: '6dp', description: 'High elevation (dialogs)' },
    { system, category: 'elevation', name: 'level4', value: '8dp', description: 'Navigation drawer elevation' },
    { system, category: 'elevation', name: 'level5', value: '12dp', description: 'Maximum elevation' },
    { system, category: 'state', name: 'hover-opacity', value: '0.08', description: 'Hover state layer opacity' },
    { system, category: 'state', name: 'focus-opacity', value: '0.12', description: 'Focus state layer opacity' },
    { system, category: 'state', name: 'pressed-opacity', value: '0.12', description: 'Pressed state layer opacity' },
    { system, category: 'state', name: 'dragged-opacity', value: '0.16', description: 'Dragged state layer opacity' },
    { system, category: 'state', name: 'disabled-opacity', value: '0.38', description: 'Disabled content opacity' },
    {
      system,
      category: 'state',
      name: 'disabled-container-opacity',
      value: '0.12',
      description: 'Disabled container opacity',
    },
    { system, category: 'motion', name: 'duration-short1', value: '50ms', description: 'Quick micro-interaction' },
    { system, category: 'motion', name: 'duration-short2', value: '100ms', description: 'Short animation duration' },
    { system, category: 'motion', name: 'duration-short3', value: '150ms', description: 'Medium-short animation' },
    { system, category: 'motion', name: 'duration-short4', value: '200ms', description: 'Standard short animation' },
    { system, category: 'motion', name: 'duration-medium1', value: '250ms', description: 'Medium animation' },
    { system, category: 'motion', name: 'duration-medium2', value: '300ms', description: 'Standard medium animation' },
    { system, category: 'motion', name: 'duration-long1', value: '450ms', description: 'Long animation' },
    { system, category: 'motion', name: 'duration-long2', value: '500ms', description: 'Extended animation' },
    {
      system,
      category: 'motion',
      name: 'easing-standard',
      value: 'cubic-bezier(0.2, 0, 0, 1)',
      description: 'Standard easing curve',
    },
    {
      system,
      category: 'motion',
      name: 'easing-emphasized',
      value: 'cubic-bezier(0.2, 0, 0, 1)',
      description: 'Emphasized easing curve',
    },
  ];
}

function getBuiltInPrimerTokens(): DesignToken[] {
  const system = 'primer';
  return [
    { system, category: 'color', name: 'fg-default', value: '#1F2328', description: 'Default foreground color' },
    { system, category: 'color', name: 'fg-muted', value: '#656d76', description: 'Muted text color' },
    { system, category: 'color', name: 'fg-subtle', value: '#6e7781', description: 'Subtle text color' },
    { system, category: 'color', name: 'fg-accent', value: '#0969da', description: 'Accent/link foreground color' },
    { system, category: 'color', name: 'fg-success', value: '#1a7f37', description: 'Success foreground color' },
    {
      system,
      category: 'color',
      name: 'fg-attention',
      value: '#9a6700',
      description: 'Attention/warning foreground color',
    },
    { system, category: 'color', name: 'fg-danger', value: '#d1242f', description: 'Danger/error foreground color' },
    { system, category: 'color', name: 'bg-default', value: '#ffffff', description: 'Default background color' },
    { system, category: 'color', name: 'bg-subtle', value: '#f6f8fa', description: 'Subtle background color' },
    { system, category: 'color', name: 'bg-inset', value: '#eff2f5', description: 'Inset background color' },
    { system, category: 'color', name: 'bg-emphasis', value: '#24292f', description: 'Emphasis background color' },
    { system, category: 'color', name: 'bg-accent', value: '#ddf4ff', description: 'Accent background color' },
    { system, category: 'color', name: 'bg-success', value: '#dafbe1', description: 'Success background color' },
    { system, category: 'color', name: 'bg-attention', value: '#fff8c5', description: 'Attention background color' },
    { system, category: 'color', name: 'bg-danger', value: '#ffebe9', description: 'Danger background color' },
    { system, category: 'color', name: 'border-default', value: '#d0d7de', description: 'Default border color' },
    { system, category: 'color', name: 'border-muted', value: '#d8dee4', description: 'Muted border color' },
    {
      system,
      category: 'color',
      name: 'border-subtle',
      value: 'rgba(27,31,36,0.15)',
      description: 'Subtle border color',
    },
    {
      system,
      category: 'typography',
      name: 'font-family',
      value: '-apple-system,BlinkMacSystemFont,Segoe UI,Noto Sans,Helvetica,Arial,sans-serif',
      description: 'System font stack',
    },
    {
      system,
      category: 'typography',
      name: 'font-family-mono',
      value: 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace',
      description: 'Monospace font stack',
    },
    { system, category: 'typography', name: 'font-size-xs', value: '12px', description: 'Extra small font size' },
    { system, category: 'typography', name: 'font-size-sm', value: '14px', description: 'Small font size' },
    { system, category: 'typography', name: 'font-size-md', value: '16px', description: 'Medium font size' },
    { system, category: 'typography', name: 'font-size-lg', value: '20px', description: 'Large font size' },
    { system, category: 'typography', name: 'font-size-xl', value: '24px', description: 'Extra large font size' },
    { system, category: 'typography', name: 'font-size-2xl', value: '32px', description: 'Display font size' },
    { system, category: 'typography', name: 'font-weight-light', value: '300', description: 'Light font weight' },
    { system, category: 'typography', name: 'font-weight-normal', value: '400', description: 'Normal font weight' },
    { system, category: 'typography', name: 'font-weight-semibold', value: '600', description: 'Semibold font weight' },
    { system, category: 'typography', name: 'font-weight-bold', value: '700', description: 'Bold font weight' },
    {
      system,
      category: 'typography',
      name: 'line-height-condensed',
      value: '1.25',
      description: 'Condensed line height',
    },
    { system, category: 'typography', name: 'line-height-default', value: '1.5', description: 'Default line height' },
    { system, category: 'typography', name: 'line-height-relaxed', value: '1.75', description: 'Relaxed line height' },
    { system, category: 'spacing', name: 'space-0', value: '0', description: 'No spacing' },
    { system, category: 'spacing', name: 'space-1', value: '4px', description: '4px spacing unit' },
    { system, category: 'spacing', name: 'space-2', value: '8px', description: '8px spacing unit' },
    { system, category: 'spacing', name: 'space-3', value: '16px', description: '16px spacing unit' },
    { system, category: 'spacing', name: 'space-4', value: '24px', description: '24px spacing unit' },
    { system, category: 'spacing', name: 'space-5', value: '32px', description: '32px spacing unit' },
    { system, category: 'spacing', name: 'space-6', value: '40px', description: '40px spacing unit' },
    { system, category: 'spacing', name: 'space-7', value: '48px', description: '48px spacing unit' },
    { system, category: 'spacing', name: 'space-8', value: '64px', description: '64px spacing unit' },
    { system, category: 'spacing', name: 'space-9', value: '80px', description: '80px spacing unit' },
    { system, category: 'spacing', name: 'space-10', value: '96px', description: '96px spacing unit' },
    { system, category: 'spacing', name: 'space-11', value: '112px', description: '112px spacing unit' },
    { system, category: 'spacing', name: 'space-12', value: '128px', description: '128px spacing unit' },
    { system, category: 'shape', name: 'border-radius-sm', value: '3px', description: 'Small border radius' },
    { system, category: 'shape', name: 'border-radius-md', value: '6px', description: 'Medium border radius' },
    { system, category: 'shape', name: 'border-radius-lg', value: '12px', description: 'Large border radius' },
    { system, category: 'shape', name: 'border-radius-full', value: '100px', description: 'Pill border radius' },
    {
      system,
      category: 'shadow',
      name: 'shadow-sm',
      value: '0 1px 0 rgba(27,31,36,0.04)',
      description: 'Small shadow',
    },
    {
      system,
      category: 'shadow',
      name: 'shadow-md',
      value: '0 3px 6px rgba(140,149,159,0.15)',
      description: 'Medium shadow',
    },
    {
      system,
      category: 'shadow',
      name: 'shadow-lg',
      value: '0 8px 24px rgba(140,149,159,0.2)',
      description: 'Large shadow',
    },
    {
      system,
      category: 'shadow',
      name: 'shadow-xl',
      value: '0 12px 28px rgba(140,149,159,0.3)',
      description: 'Extra large shadow',
    },
    { system, category: 'breakpoint', name: 'xs', value: '0px', description: 'Extra small breakpoint' },
    { system, category: 'breakpoint', name: 'sm', value: '544px', description: 'Small breakpoint' },
    { system, category: 'breakpoint', name: 'md', value: '768px', description: 'Medium breakpoint' },
    { system, category: 'breakpoint', name: 'lg', value: '1012px', description: 'Large breakpoint' },
    { system, category: 'breakpoint', name: 'xl', value: '1280px', description: 'Extra large breakpoint' },
  ];
}

// --- Source D: WAI-ARIA Authoring Practices patterns ---

interface AriaPattern {
  name: string;
  description: string;
  roles: string[];
  keyboard: string[];
  url: string;
}

async function ingestAriaPatterns(): Promise<number> {
  logger.info('Ingesting WAI-ARIA Authoring Practices patterns...');

  const patterns: AriaPattern[] = [
    {
      name: 'Accordion',
      description: 'A vertically stacked set of interactive headings that each reveal content',
      roles: ['heading', 'button', 'region'],
      keyboard: ['Enter/Space to toggle', 'Up/Down to navigate', 'Home/End for first/last'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
    },
    {
      name: 'Alert',
      description:
        'Element that displays a brief important message to attract user attention without interrupting flow',
      roles: ['alert'],
      keyboard: ['Not interactive by default'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/alert/',
    },
    {
      name: 'Alert Dialog',
      description: 'Modal dialog that interrupts workflow to communicate an important message requiring confirmation',
      roles: ['alertdialog', 'document'],
      keyboard: ['Tab to cycle focus within', 'Escape to close', 'Enter to confirm'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/',
    },
    {
      name: 'Breadcrumb',
      description: 'Navigation showing the current page location within a hierarchy',
      roles: ['navigation'],
      keyboard: ['Tab between links'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/',
    },
    {
      name: 'Button',
      description: 'Interactive element triggered via click, tap, keyboard, or voice to perform an action',
      roles: ['button'],
      keyboard: ['Enter/Space to activate', 'Focus via Tab'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/',
    },
    {
      name: 'Carousel',
      description: 'A section with content that scrolls through a set of items',
      roles: ['region', 'group', 'tablist'],
      keyboard: ['Tab to controls', 'Arrow keys to navigate slides', 'Enter to activate controls'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/carousel/',
    },
    {
      name: 'Checkbox',
      description: 'Input that allows selecting one or more options from a group',
      roles: ['checkbox', 'group'],
      keyboard: ['Space to toggle', 'Tab to navigate'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/',
    },
    {
      name: 'Combobox',
      description: 'Input with an associated popup for selecting a value from a collection',
      roles: ['combobox', 'listbox', 'option'],
      keyboard: ['Down to open', 'Up/Down to navigate', 'Enter to select', 'Escape to close'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/',
    },
    {
      name: 'Dialog Modal',
      description: 'Window overlaid on the primary content that traps focus',
      roles: ['dialog'],
      keyboard: ['Tab to cycle focus', 'Escape to close', 'Focus trapped within'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
    },
    {
      name: 'Disclosure',
      description: 'Widget that enables showing and hiding content sections',
      roles: ['button'],
      keyboard: ['Enter/Space to toggle', 'aria-expanded to indicate state'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/',
    },
    {
      name: 'Feed',
      description: 'Scrollable list of articles where new articles can be added dynamically',
      roles: ['feed', 'article'],
      keyboard: ['Page Down/Up to navigate articles', 'Tab for interactive elements'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/feed/',
    },
    {
      name: 'Grid',
      description: 'Interactive tabular data with two-dimensional navigation',
      roles: ['grid', 'row', 'gridcell', 'columnheader', 'rowheader'],
      keyboard: ['Arrow keys for cell navigation', 'Home/End for row edges', 'Ctrl+Home/End for grid edges'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/grid/',
    },
    {
      name: 'Link',
      description: 'Interactive reference to a resource inside or outside the current page',
      roles: ['link'],
      keyboard: ['Enter to activate', 'Tab to focus'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/link/',
    },
    {
      name: 'Listbox',
      description: 'Widget that presents a list of options for selection',
      roles: ['listbox', 'option'],
      keyboard: ['Up/Down to navigate', 'Home/End for first/last', 'Type to search'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/listbox/',
    },
    {
      name: 'Menu',
      description: 'Widget offering a list of choices such as actions or functions',
      roles: ['menu', 'menuitem', 'menuitemcheckbox', 'menuitemradio'],
      keyboard: ['Arrow keys to navigate', 'Enter to activate', 'Escape to close'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/menu/',
    },
    {
      name: 'Menu Button',
      description: 'Button that opens a menu of actions or options',
      roles: ['button', 'menu', 'menuitem'],
      keyboard: ['Enter/Space/Down to open', 'Arrow keys in menu', 'Escape to close'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/',
    },
    {
      name: 'Meter',
      description: 'Graphical display of a numeric value within a known range',
      roles: ['meter'],
      keyboard: ['Not interactive'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/meter/',
    },
    {
      name: 'Radio Group',
      description: 'Set of checkable buttons where only one can be checked at a time',
      roles: ['radiogroup', 'radio'],
      keyboard: ['Arrow keys to select', 'Tab to enter/leave group'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/radio/',
    },
    {
      name: 'Slider',
      description: 'Input for selecting a value from a range',
      roles: ['slider'],
      keyboard: ['Arrow keys to adjust', 'Home/End for min/max', 'Page Up/Down for larger steps'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider/',
    },
    {
      name: 'Spinbutton',
      description: 'Input for selecting a numeric value from a range with increment/decrement controls',
      roles: ['spinbutton'],
      keyboard: ['Up/Down to increment/decrement', 'Home/End for min/max'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/',
    },
    {
      name: 'Switch',
      description: 'Input representing on/off boolean values',
      roles: ['switch'],
      keyboard: ['Space to toggle', 'Enter to toggle'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/switch/',
    },
    {
      name: 'Table',
      description: 'Static tabular data in a grid-like structure',
      roles: ['table', 'row', 'cell', 'columnheader', 'rowheader'],
      keyboard: ['Tab through interactive content', 'Not navigable by arrow keys'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/table/',
    },
    {
      name: 'Tabs',
      description: 'Set of layered sections of content where one panel is displayed at a time',
      roles: ['tablist', 'tab', 'tabpanel'],
      keyboard: ['Arrow keys between tabs', 'Tab to panel', 'Home/End for first/last tab'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/tabs/',
    },
    {
      name: 'Toolbar',
      description: 'Container for grouping frequently used controls',
      roles: ['toolbar'],
      keyboard: ['Arrow keys between tools', 'Tab to enter/leave toolbar'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/',
    },
    {
      name: 'Tooltip',
      description: 'Popup displaying descriptive information about an element on hover or focus',
      roles: ['tooltip'],
      keyboard: ['Appears on focus', 'Escape to dismiss'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/',
    },
    {
      name: 'Tree View',
      description: 'Hierarchical list with nested groups that can be expanded/collapsed',
      roles: ['tree', 'treeitem', 'group'],
      keyboard: ['Arrow keys to navigate', 'Enter to activate', 'Left/Right to collapse/expand'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/treeview/',
    },
    {
      name: 'Treegrid',
      description: 'Grid with hierarchical rows that can be expanded/collapsed',
      roles: ['treegrid', 'row', 'gridcell'],
      keyboard: ['Arrow keys for navigation', 'Enter to expand/collapse', 'Home/End for edges'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/',
    },
    {
      name: 'Window Splitter',
      description: 'Movable separator between two sections that lets users resize',
      roles: ['separator'],
      keyboard: ['Arrow keys to resize', 'Home/End for min/max', 'Enter to toggle collapse'],
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/',
    },
    {
      name: 'Toast',
      description: 'Non-modal notification that auto-dismisses after a timeout',
      roles: ['status', 'alert'],
      keyboard: ['Focus moves to toast on appearance', 'Escape to dismiss early'],
      url: '',
    },
    {
      name: 'Navigation Menu',
      description: 'Primary site navigation with optional dropdowns and mobile toggle',
      roles: ['navigation', 'menubar', 'menu', 'menuitem'],
      keyboard: ['Arrow keys between items', 'Enter to follow links', 'Escape to close submenus'],
      url: '',
    },
  ];

  const texts = patterns.map(
    (p) => `ARIA pattern ${p.name}: ${p.description}. Roles: ${p.roles.join(', ')}. Keys: ${p.keyboard.join('; ')}`
  );

  const vectors = await embedBatch(texts);
  const db = getDatabase();
  const embeddings: IEmbedding[] = patterns.map((p, i) => ({
    sourceId: `aria-${p.name.toLowerCase().replace(/\s+/g, '-')}`,
    sourceType: 'pattern' as const,
    text: texts[i],
    vector: vectors[i],
    dimensions: vectors[i].length,
    createdAt: Date.now(),
  }));

  storeEmbeddings(embeddings, db);
  logger.info({ count: embeddings.length }, 'ARIA patterns ingested');
  return embeddings.length;
}

// --- Stats & Test ---

function showStats(): void {
  const db = getDatabase();
  const sourceTypes: IEmbedding['sourceType'][] = [
    'component',
    'prompt',
    'description',
    'rule',
    'token',
    'pattern',
    'example',
  ];
  let total = 0;

  console.log('\n📊 Embedding Statistics:');
  console.log('─'.repeat(40));

  for (const st of sourceTypes) {
    const count = getEmbeddingCount(st, db);
    total += count;
    if (count > 0) {
      console.log(`  ${st.padEnd(15)} ${String(count).padStart(6)}`);
    }
  }

  console.log('─'.repeat(40));
  console.log(`  ${'TOTAL'.padEnd(15)} ${String(total).padStart(6)}`);
  console.log();
}

async function testQuery(query: string): Promise<void> {
  const db = getDatabase();

  console.log(`\n🔍 Semantic search: "${query}"\n`);

  const queryVector = await embed(query);

  const sourceTypes: IEmbedding['sourceType'][] = ['component', 'rule', 'token', 'pattern', 'example'];

  for (const st of sourceTypes) {
    const count = getEmbeddingCount(st, db);
    if (count === 0) continue;

    const results = semanticSearch(queryVector, st, db, 3, 0.3);
    if (results.length > 0) {
      console.log(`  📚 ${st} matches:`);
      for (const r of results) {
        console.log(`    [${r.similarity.toFixed(3)}] ${r.text.slice(0, 100)}...`);
      }
      console.log();
    }
  }
}

// --- CLI ---

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const sourceArg = args.find((a) => !a.startsWith('--'));
  const source = sourceArg ?? (args.includes('--source') ? args[args.indexOf('--source') + 1] : undefined);

  ensureCacheDir();

  if (args.includes('--stats')) {
    showStats();
    return;
  }

  if (args.includes('--test-query')) {
    const queryIdx = args.indexOf('--test-query');
    const query = args[queryIdx + 1] ?? 'accessible modal with focus trap';
    await testQuery(query);
    return;
  }

  if (!source) {
    console.log(`
Usage: npx tsx src/scripts/ingest-training-data.ts [--source] <name>

Sources:
  shadcn    shadcn/ui components (MIT)
  axe       axe-core accessibility rules (MPL 2.0)
  tokens    Material Design 3 + Primer design tokens
  aria      WAI-ARIA Authoring Practices patterns
  all       Run all sources sequentially

Flags:
  --stats       Show embedding counts by sourceType
  --test-query  Run a test semantic search query
`);
    return;
  }

  const start = Date.now();
  let totalIngested = 0;

  const sources: Record<string, () => Promise<number>> = {
    shadcn: ingestShadcn,
    axe: ingestAxeCore,
    tokens: ingestDesignTokens,
    aria: ingestAriaPatterns,
  };

  if (source === 'all') {
    for (const [name, fn] of Object.entries(sources)) {
      try {
        const count = await fn();
        totalIngested += count;
        logger.info({ source: name, count }, 'Source ingested');
      } catch (err) {
        logger.error({ source: name, error: (err as Error).message }, 'Source ingestion failed');
      }
    }
  } else if (sources[source]) {
    totalIngested = await sources[source]();
  } else {
    console.error(`Unknown source: ${source}. Use one of: ${Object.keys(sources).join(', ')}, all`);
    process.exit(1);
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n✅ Ingestion complete: ${totalIngested} embeddings in ${elapsed}s`);
  showStats();
}

main().catch((err) => {
  logger.error({ error: err }, 'Ingestion failed');
  process.exit(1);
});
