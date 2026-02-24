/**
 * Synthetic training data generator for LoRA fine-tuning.
 *
 * Generates degraded versions of high-quality ingested data to create
 * training pairs for quality-scorer, prompt-enhancer, and style-recommender.
 *
 * Usage:
 *   npx tsx src/scripts/generate-training-data.ts              # Generate all
 *   npx tsx src/scripts/generate-training-data.ts --adapter <name>  # Specific adapter
 *   npx tsx src/scripts/generate-training-data.ts --stats       # Show counts
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import pino from 'pino';
import { getDatabase } from '../lib/design-references/database/store.js';
import { loadEmbeddings, getEmbeddingCount } from '../lib/ml/embedding-store.js';

const logger = pino({ name: 'generate-training-data' });

const OUTPUT_DIR = resolve(process.cwd(), '.uiforge', 'training-data');

interface TrainingRow {
  instruction: string;
  input: string;
  output: string;
}

function ensureOutputDir(): void {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

function writeJsonl(rows: TrainingRow[], filename: string): number {
  if (rows.length === 0) return 0;
  ensureOutputDir();
  const filePath = join(OUTPUT_DIR, filename);
  const lines = rows.map((r) => JSON.stringify(r)).join('\n');
  writeFileSync(filePath, `${lines}\n`, 'utf-8');
  logger.info({ path: filePath, count: rows.length }, 'Training data written');
  return rows.length;
}

// --- Quality Scorer Training Data ---

function degradeCode(code: string, level: 'minor' | 'moderate' | 'severe'): string {
  let degraded = code;

  if (level === 'minor' || level === 'moderate' || level === 'severe') {
    degraded = degraded.replace(/aria-[\w-]+="[^"]*"\s*/g, '');
    degraded = degraded.replace(/role="[^"]*"\s*/g, '');
  }

  if (level === 'moderate' || level === 'severe') {
    degraded = degraded.replace(/\b(sm|md|lg|xl):[^\s"]+/g, '');
    degraded = degraded.replace(/focus-visible:[^\s"]+/g, '');
    degraded = degraded.replace(/\s+/g, ' ');
  }

  if (level === 'severe') {
    degraded = degraded.replace(/<(header|main|nav|section|article|footer|aside)/g, '<div');
    degraded = degraded.replace(/<\/(header|main|nav|section|article|footer|aside)>/g, '</div>');
    degraded = degraded.replace(/alt="[^"]*"/g, '');
    degraded = degraded.replace(/<label[^>]*>.*?<\/label>/g, '');
  }

  return degraded.trim();
}

function generateQualityScorerData(): number {
  const db = getDatabase();
  const componentCount = getEmbeddingCount('component', db);
  const exampleCount = getEmbeddingCount('example', db);

  if (componentCount === 0 && exampleCount === 0) {
    logger.warn('No component or example embeddings found, skipping quality-scorer data');
    return 0;
  }

  const rows: TrainingRow[] = [];
  const instruction =
    'Rate the quality of this UI component code on a scale of 0-10. Consider accessibility, responsiveness, semantic HTML, and code structure.';

  const components = loadEmbeddings('component', db);
  const examples = loadEmbeddings('example', db);
  const allSources = [...components, ...examples];

  for (const source of allSources.slice(0, 200)) {
    const code = source.text;

    rows.push({
      instruction,
      input: code,
      output: '9',
    });

    const minorDegraded = degradeCode(code, 'minor');
    if (minorDegraded !== code) {
      rows.push({
        instruction,
        input: minorDegraded,
        output: '6',
      });
    }

    const moderateDegraded = degradeCode(code, 'moderate');
    if (moderateDegraded !== minorDegraded) {
      rows.push({
        instruction,
        input: moderateDegraded,
        output: '4',
      });
    }

    if (rows.length < 800) {
      const severeDegraded = degradeCode(code, 'severe');
      if (severeDegraded !== moderateDegraded) {
        rows.push({
          instruction,
          input: severeDegraded,
          output: '2',
        });
      }
    }
  }

  const targetCount = Math.min(1000, rows.length);
  const shuffled = rows.sort(() => Math.random() - 0.5).slice(0, targetCount);
  return writeJsonl(shuffled, 'quality-scorer.jsonl');
}

// --- Prompt Enhancer Training Data ---

function degradePrompt(prompt: string): string {
  let degraded = prompt;

  degraded = degraded.replace(/\b(accessible|a11y|aria|wcag|keyboard navigation)\b/gi, '');
  degraded = degraded.replace(/\b(responsive|mobile|tablet|desktop|breakpoint)\b/gi, '');
  degraded = degraded.replace(/\b(using React|with Tailwind|in Next\.js|with TypeScript)\b/gi, '');
  degraded = degraded.replace(/\.\s*(Include|Add|Make|Ensure|Use)[^.]*\./g, '.');
  degraded = degraded.replace(/\s+/g, ' ').trim();

  if (degraded.length > prompt.length * 0.8) {
    const sentences = degraded.split(/\.\s+/);
    degraded = sentences.slice(0, Math.ceil(sentences.length / 2)).join('. ');
  }

  return degraded || prompt.split(' ').slice(0, 3).join(' ');
}

function generatePromptEnhancerData(): number {
  const db = getDatabase();
  const promptCount = getEmbeddingCount('prompt', db);
  const patternCount = getEmbeddingCount('pattern', db);
  const componentCount = getEmbeddingCount('component', db);

  if (promptCount === 0 && patternCount === 0 && componentCount === 0) {
    logger.warn('No prompt/pattern/component embeddings found, generating from templates');
  }

  const rows: TrainingRow[] = [];
  const instruction =
    'Improve the following UI generation prompt to produce better, more specific results with accessibility, responsiveness, and good design practices.';

  const allPrompts = [
    ...loadEmbeddings('prompt', db),
    ...loadEmbeddings('pattern', db),
    ...loadEmbeddings('component', db),
  ];

  for (const source of allPrompts.slice(0, 500)) {
    const originalPrompt = source.text;
    const degradedPrompt = degradePrompt(originalPrompt);

    if (degradedPrompt !== originalPrompt && degradedPrompt.length > 5) {
      rows.push({
        instruction,
        input: degradedPrompt,
        output: originalPrompt,
      });
    }
  }

  const templatePairs: Array<[string, string]> = [
    [
      'button',
      'Create an accessible button component with hover, focus, and active states. Include ARIA labels, keyboard navigation support, and responsive sizing across mobile, tablet, and desktop.',
    ],
    [
      'modal',
      'Create a modal dialog that traps focus within the dialog, handles Escape key to close, restores focus on close, and uses role=dialog with aria-modal=true. Make it responsive with mobile-first design.',
    ],
    [
      'form',
      'Create a login form with proper label associations, validation feedback, logical tab order, and aria-required attributes. Include responsive layout and focus-visible styles.',
    ],
    [
      'card',
      'Create a card component with consistent padding, clear content hierarchy with heading, body, and action areas. Use semantic HTML with article element and responsive spacing.',
    ],
    [
      'nav',
      'Create a navigation bar with skip navigation link, clear active state indicators, mobile menu toggle, and proper landmark roles. Support keyboard navigation between items.',
    ],
    [
      'table',
      'Create a data table with proper scope attributes on headers, sortable column indicators, responsive overflow handling, and caption for accessibility.',
    ],
    [
      'tabs',
      'Create a tab interface with tablist, tab, and tabpanel roles. Support arrow key navigation between tabs, Tab to panel, and Home/End for first/last tab.',
    ],
    [
      'dropdown',
      'Create a dropdown menu with proper ARIA roles (menu, menuitem), keyboard navigation (arrow keys, Enter to activate, Escape to close), and focus management.',
    ],
    [
      'sidebar',
      'Create a collapsible sidebar with proper landmark role (aside), keyboard navigation, and responsive breakpoint behavior. Support aria-expanded state.',
    ],
    [
      'hero',
      'Create a hero section with attention-grabbing layout, clear CTA, balanced whitespace, optimized image loading, and proper heading hierarchy.',
    ],
    [
      'toast',
      'Create a toast notification with role=status or alert, auto-dismiss timer, Escape to dismiss, and focus management. Ensure it does not disrupt screen reader flow.',
    ],
    [
      'accordion',
      'Create an accordion with heading/button structure, Enter/Space to toggle, Up/Down to navigate, Home/End for first/last, and aria-expanded state management.',
    ],
    [
      'carousel',
      'Create an accessible carousel with Tab to controls, arrow keys to navigate slides, Enter to activate, and proper region/group roles with live region announcements.',
    ],
    [
      'checkbox',
      'Create a checkbox group with proper grouping, Space to toggle, Tab to navigate, and aria-checked state. Support indeterminate state for parent checkboxes.',
    ],
    [
      'radio',
      'Create a radio group with radiogroup role, arrow keys to select within group, Tab to enter/leave group, and proper labeling.',
    ],
    [
      'slider',
      'Create a range slider with aria-valuemin, aria-valuemax, aria-valuenow, arrow keys to adjust, Home/End for min/max, and Page Up/Down for larger steps.',
    ],
    [
      'switch',
      'Create a toggle switch with switch role, Space/Enter to toggle, clear on/off visual indicators, and aria-checked state.',
    ],
    [
      'breadcrumb',
      'Create a breadcrumb navigation with nav landmark, aria-label="Breadcrumb", ordered list structure, and aria-current="page" on current item.',
    ],
    [
      'tooltip',
      'Create a tooltip that appears on hover and focus, dismisses on Escape, uses role=tooltip, and is associated via aria-describedby.',
    ],
    [
      'combobox',
      'Create an autocomplete combobox with listbox popup, Down to open, Up/Down to navigate options, Enter to select, and Escape to close.',
    ],
  ];

  for (const [degraded, enhanced] of templatePairs) {
    rows.push({ instruction, input: degraded, output: enhanced });
    rows.push({ instruction, input: `create a ${degraded}`, output: enhanced });
    rows.push({ instruction, input: `${degraded} component`, output: enhanced });
    rows.push({ instruction, input: `simple ${degraded}`, output: enhanced });
    rows.push({ instruction, input: `make a ${degraded} for my app`, output: enhanced });
  }

  const targetCount = Math.min(2000, rows.length);
  const shuffled = rows.sort(() => Math.random() - 0.5).slice(0, targetCount);
  return writeJsonl(shuffled, 'prompt-enhancer.jsonl');
}

// --- Style Recommender Training Data ---

function generateStyleRecommenderData(): number {
  const db = getDatabase();
  const tokenCount = getEmbeddingCount('token', db);

  const rows: TrainingRow[] = [];
  const instruction =
    'Given the following UI generation request, recommend the best visual style including primary color, font family, spacing, and border radius.';

  const industryMappings: Array<{ prompt: string; style: string }> = [
    {
      prompt: 'enterprise B2B dashboard for financial data',
      style: 'primaryColor: #0F172A, fontFamily: Inter, spacing: 16px, borderRadius: 8px, designSystem: fintech',
    },
    {
      prompt: 'consumer mobile app for food delivery',
      style: 'primaryColor: #DC2626, fontFamily: Poppins, spacing: 16px, borderRadius: 12px, designSystem: ecommerce',
    },
    {
      prompt: 'developer documentation site',
      style:
        'primaryColor: #1E293B, fontFamily: JetBrains Mono, spacing: 12px, borderRadius: 6px, designSystem: primer',
    },
    {
      prompt: 'healthcare patient portal',
      style:
        'primaryColor: #0D9488, fontFamily: Source Sans 3, spacing: 20px, borderRadius: 12px, designSystem: healthcare',
    },
    {
      prompt: 'SaaS analytics dashboard',
      style: 'primaryColor: #6366F1, fontFamily: Inter, spacing: 16px, borderRadius: 8px, designSystem: saas',
    },
    {
      prompt: 'e-learning platform for students',
      style: 'primaryColor: #7C3AED, fontFamily: Nunito, spacing: 16px, borderRadius: 16px, designSystem: education',
    },
    {
      prompt: 'creative agency portfolio website',
      style: 'primaryColor: #1E1E1E, fontFamily: Space Grotesk, spacing: 24px, borderRadius: 4px, designSystem: agency',
    },
    {
      prompt: 'news and media publishing platform',
      style: 'primaryColor: #EF4444, fontFamily: Merriweather, spacing: 16px, borderRadius: 8px, designSystem: media',
    },
    {
      prompt: 'startup landing page with modern aesthetic',
      style: 'primaryColor: #8B5CF6, fontFamily: Inter, spacing: 16px, borderRadius: 12px, designSystem: startup',
    },
    {
      prompt: 'corporate intranet for enterprise employees',
      style: 'primaryColor: #1E40AF, fontFamily: Inter, spacing: 16px, borderRadius: 6px, designSystem: corporate',
    },
    {
      prompt: 'minimalist blog with editorial layout',
      style:
        'primaryColor: #1E1E1E, fontFamily: Playfair Display, spacing: 24px, borderRadius: 0px, designSystem: editorial',
    },
    {
      prompt: 'playful kids education game interface',
      style: 'primaryColor: #F59E0B, fontFamily: Nunito, spacing: 16px, borderRadius: 20px, designSystem: playful',
    },
    {
      prompt: 'premium luxury brand product showcase',
      style:
        'primaryColor: #1E1E1E, fontFamily: Playfair Display, spacing: 24px, borderRadius: 8px, designSystem: premium',
    },
    {
      prompt: 'futuristic tech product landing page',
      style:
        'primaryColor: #8B5CF6, fontFamily: Space Grotesk, spacing: 16px, borderRadius: 16px, designSystem: futuristic',
    },
    {
      prompt: 'calm meditation and wellness app',
      style: 'primaryColor: #0EA5E9, fontFamily: Inter, spacing: 24px, borderRadius: 16px, designSystem: wellness',
    },
    {
      prompt: 'bold sports and fitness tracking app',
      style: 'primaryColor: #EF4444, fontFamily: Inter, spacing: 12px, borderRadius: 4px, designSystem: sports',
    },
    {
      prompt: 'warm coffee shop ordering interface',
      style: 'primaryColor: #D97706, fontFamily: Poppins, spacing: 16px, borderRadius: 12px, designSystem: food',
    },
    {
      prompt: 'energetic music streaming platform',
      style: 'primaryColor: #22C55E, fontFamily: Inter, spacing: 12px, borderRadius: 12px, designSystem: music',
    },
    {
      prompt: 'professional law firm website',
      style: 'primaryColor: #1E3A5F, fontFamily: Merriweather, spacing: 20px, borderRadius: 4px, designSystem: legal',
    },
    {
      prompt: 'real estate property listing platform',
      style: 'primaryColor: #059669, fontFamily: Inter, spacing: 16px, borderRadius: 8px, designSystem: realestate',
    },
  ];

  for (const mapping of industryMappings) {
    rows.push({ instruction, input: mapping.prompt, output: mapping.style });

    const variations = [
      `Create a ${mapping.prompt.split(' ').slice(0, 4).join(' ')}`,
      `Build ${mapping.prompt}`,
      `Design ${mapping.prompt}`,
      `Generate UI for ${mapping.prompt}`,
    ];

    for (const variation of variations) {
      rows.push({ instruction, input: variation, output: mapping.style });
    }
  }

  if (tokenCount > 0) {
    const tokens = loadEmbeddings('token', db);
    for (const token of tokens.slice(0, 100)) {
      const system = token.text.split(' ')[0] ?? 'unknown';
      const promptText = `Generate a component using ${system} design system tokens`;
      rows.push({
        instruction,
        input: promptText,
        output: `designSystem: ${system}, token: ${token.text.slice(0, 100)}`,
      });
    }
  }

  const targetCount = Math.min(1000, rows.length);
  const shuffled = rows.sort(() => Math.random() - 0.5).slice(0, targetCount);
  return writeJsonl(shuffled, 'style-recommender.jsonl');
}

// --- Stats ---

function showStats(): void {
  // eslint-disable-next-line no-console
  console.log('\n📊 Training Data Statistics:');
  // eslint-disable-next-line no-console
  console.log('─'.repeat(50));

  const files = ['quality-scorer.jsonl', 'prompt-enhancer.jsonl', 'style-recommender.jsonl'];
  let totalRows = 0;

  for (const file of files) {
    const filePath = join(OUTPUT_DIR, file);
    if (existsSync(filePath)) {
      const content = readFileSync(filePath, 'utf-8');
      const count = content.split('\n').filter((l) => l.trim().length > 0).length;
      totalRows += count;
      const adapter = file.replace('.jsonl', '');
      // eslint-disable-next-line no-console
      console.log(`  ${adapter.padEnd(25)} ${String(count).padStart(6)} examples`);
    } else {
      const adapter = file.replace('.jsonl', '');
      // eslint-disable-next-line no-console
      console.log(`  ${adapter.padEnd(25)}    N/A (not generated)`);
    }
  }

  // eslint-disable-next-line no-console
  console.log('─'.repeat(50));
  // eslint-disable-next-line no-console
  console.log(`  ${'TOTAL'.padEnd(25)} ${String(totalRows).padStart(6)} examples`);
  // eslint-disable-next-line no-console
  console.log(`  Output dir: ${OUTPUT_DIR}`);
  // eslint-disable-next-line no-console
  console.log();
}

// --- CLI ---

function main(): void {
  const args = process.argv.slice(2);

  if (args.includes('--stats')) {
    showStats();
    return;
  }

  const adapterArg = args.includes('--adapter') ? args[args.indexOf('--adapter') + 1] : undefined;

  const start = Date.now();
  let totalGenerated = 0;

  const adapters: Record<string, () => number> = {
    'quality-scorer': generateQualityScorerData,
    'prompt-enhancer': generatePromptEnhancerData,
    'style-recommender': generateStyleRecommenderData,
  };

  if (adapterArg && adapters[adapterArg]) {
    totalGenerated = adapters[adapterArg]();
  } else if (!adapterArg) {
    for (const [name, fn] of Object.entries(adapters)) {
      try {
        const count = fn();
        totalGenerated += count;
        logger.info({ adapter: name, count }, 'Training data generated');
      } catch (err) {
        logger.error({ adapter: name, error: (err as Error).message }, 'Generation failed');
      }
    }
  } else {
    // eslint-disable-next-line no-console
    console.error(`Unknown adapter: ${adapterArg}. Use: ${Object.keys(adapters).join(', ')}`);
    process.exit(1);
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  // eslint-disable-next-line no-console
  console.log(`\n✅ Training data generation complete: ${totalGenerated} examples in ${elapsed}s`);
  showStats();
}

try {
  main();
} catch (err) {
  logger.error({ error: err }, 'Training data generation failed');
  process.exit(1);
}
