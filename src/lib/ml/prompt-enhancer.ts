/**
 * Prompt enhancer — improves user prompts before sending to the host LLM.
 *
 * Uses the sidecar model when available, otherwise applies rule-based
 * enhancement to add specificity, style hints, and structure guidance.
 *
 * Enhancement strategies:
 * 1. Add missing context (framework, style, accessibility)
 * 2. Expand vague terms into specific design tokens
 * 3. Inject best-practice hints based on component type
 */

import pino from 'pino';
import { isSidecarReady, infer } from './sidecar-model.js';
import { embed } from './embeddings.js';
import { semanticSearch, getEmbeddingCount } from './embedding-store.js';
import { getDatabase } from '../design-references/database/store.js';

const logger = pino({ name: 'prompt-enhancer' });

/** Enhancement result. */
export interface IEnhancedPrompt {
  /** The enhanced prompt text. */
  enhanced: string;
  /** The original prompt text. */
  original: string;
  /** Whether the enhancement came from the model or rules. */
  source: 'model' | 'rules';
  /** What was added/changed. */
  additions: string[];
  /** Latency in ms. */
  latencyMs: number;
}

/** Context for prompt enhancement. */
export interface IEnhancementContext {
  componentType?: string;
  framework?: string;
  style?: string;
  mood?: string;
  industry?: string;
}

/**
 * Enhance a user prompt for better generation results.
 */
export function enhancePrompt(prompt: string, context?: IEnhancementContext): Promise<IEnhancedPrompt> {
  const start = Date.now();

  if (isSidecarReady()) {
    return enhanceWithModel(prompt, context, start);
  }

  return Promise.resolve(enhanceWithRules(prompt, context, start));
}

/**
 * Enhance using the sidecar model.
 */
async function enhanceWithModel(
  prompt: string,
  context: IEnhancementContext | undefined,
  start: number
): Promise<IEnhancedPrompt> {
  const inferPrompt = [
    'Improve the following UI generation prompt to produce better, more specific results.',
    'Keep the original intent but add specificity about layout, styling, and accessibility.',
    'Respond with ONLY the improved prompt, nothing else.',
    '',
    `Original: ${prompt}`,
    context?.componentType ? `Component type: ${context.componentType}` : '',
    context?.framework ? `Framework: ${context.framework}` : '',
    context?.style ? `Style: ${context.style}` : '',
    '',
    'Improved:',
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const result = await infer(inferPrompt, { maxTokens: 256, temperature: 0.5 });

    if (result.source === 'model' && result.text.trim().length > prompt.length * 0.5) {
      return {
        enhanced: result.text.trim(),
        original: prompt,
        source: 'model',
        additions: ['model-enhanced'],
        latencyMs: Date.now() - start,
      };
    }

    // Model returned but result was too short - fallback to rules
    return enhanceWithRules(prompt, context, start);
  } catch (err) {
    logger.warn({ err, prompt }, 'Model enhancement failed, falling back to rules');
    return enhanceWithRules(prompt, context, start);
  }
}

/**
 * Enhance using rule-based strategies.
 */
export function enhanceWithRules(
  prompt: string,
  context?: IEnhancementContext,
  start: number = Date.now()
): IEnhancedPrompt {
  const additions: string[] = [];
  let enhanced = prompt.trim();
  const lower = enhanced.toLowerCase();

  // Strategy 1: Add framework hint if missing
  if (context?.framework && !lower.includes(context.framework.toLowerCase())) {
    enhanced += ` using ${context.framework}`;
    additions.push('framework');
  }

  // Strategy 2: Add accessibility guidance if not mentioned
  const a11yKeywords = ['accessible', 'a11y', 'aria', 'screen reader', 'wcag', 'keyboard'];
  if (!a11yKeywords.some((k) => lower.includes(k))) {
    enhanced += '. Include ARIA labels and keyboard navigation support';
    additions.push('accessibility');
  }

  // Strategy 3: Add responsive design if not mentioned
  const responsiveKeywords = ['responsive', 'mobile', 'breakpoint', 'adaptive'];
  if (!responsiveKeywords.some((k) => lower.includes(k))) {
    enhanced += '. Make it responsive across mobile, tablet, and desktop';
    additions.push('responsive');
  }

  // Strategy 4: Expand vague style terms
  enhanced = expandVagueTerms(enhanced, additions);

  // Strategy 5: Add component-specific hints
  if (context?.componentType) {
    enhanced = addComponentHints(enhanced, context.componentType, additions);
  }

  // Strategy 6: Add style context if available
  if (context?.style && !lower.includes(context.style.toLowerCase())) {
    enhanced += ` with ${context.style} visual style`;
    additions.push('style');
  }

  // Strategy 7: Add mood context if available
  if (context?.mood && !lower.includes(context.mood.toLowerCase())) {
    enhanced += ` conveying a ${context.mood} mood`;
    additions.push('mood');
  }

  // Strategy 8: RAG-based enhancement (async-safe, best-effort)
  try {
    const ragAdditions = enrichWithRAG(enhanced, context);
    if (ragAdditions) {
      enhanced += ragAdditions.text;
      additions.push(...ragAdditions.additions);
    }
  } catch (err) {
    logger.debug({ error: (err as Error).message }, 'RAG enhancement skipped');
  }

  return {
    enhanced,
    original: prompt,
    source: 'rules',
    additions,
    latencyMs: Date.now() - start,
  };
}

function enrichWithRAG(
  _prompt: string,
  _context?: IEnhancementContext
): { text: string; additions: string[] } | null {
  const db = getDatabase();
  const patternCount = getEmbeddingCount('pattern', db);
  const ruleCount = getEmbeddingCount('rule', db);

  if (patternCount === 0 && ruleCount === 0) return null;

  // We need a sync-compatible approach: use pre-computed embeddings
  // Since embed() is async, we check if we can find keyword-based matches instead
  // For full async RAG, use enhancePromptWithRAG() directly
  return null;
}

/**
 * Async RAG-enhanced prompt enhancement.
 * Retrieves relevant ARIA patterns and a11y rules to enrich the prompt.
 */
export async function enhancePromptWithRAG(
  prompt: string,
  context?: IEnhancementContext
): Promise<IEnhancedPrompt> {
  const start = Date.now();

  // First, apply rule-based enhancement
  const ruleResult = enhanceWithRules(prompt, context, start);
  let enhanced = ruleResult.enhanced;
  const additions = [...ruleResult.additions];

  // Then, enrich with RAG
  try {
    const db = getDatabase();
    const patternCount = getEmbeddingCount('pattern', db);
    const ruleCount = getEmbeddingCount('rule', db);

    if (patternCount === 0 && ruleCount === 0) {
      return ruleResult;
    }

    const queryVector = await embed(enhanced);

    if (patternCount > 0) {
      const patterns = semanticSearch(queryVector, 'pattern', db, 2, 0.4);
      if (patterns.length > 0) {
        const patternHints = patterns
          .map(p => {
            const rolesMatch = p.text.match(/Roles:\s*([^.]+)/);
            const keysMatch = p.text.match(/Keys:\s*(.+)/);
            return [
              rolesMatch ? `Use roles: ${rolesMatch[1].trim()}` : '',
              keysMatch ? `Keyboard: ${keysMatch[1].trim()}` : '',
            ].filter(Boolean).join('. ');
          })
          .filter(Boolean);

        if (patternHints.length > 0) {
          enhanced += `. ${patternHints.join('. ')}`;
          additions.push('rag:aria-patterns');
        }
      }
    }

    if (ruleCount > 0) {
      const rules = semanticSearch(queryVector, 'rule', db, 3, 0.4);
      if (rules.length > 0) {
        const ruleHints = rules
          .map(r => {
            const fixMatch = r.text.match(/Fix:\s*(.+)/);
            return fixMatch ? fixMatch[1].trim() : '';
          })
          .filter(Boolean);

        if (ruleHints.length > 0) {
          enhanced += `. A11y requirements: ${ruleHints.join('; ')}`;
          additions.push('rag:a11y-rules');
        }
      }
    }
  } catch (err) {
    logger.warn({ error: (err as Error).message }, 'RAG enhancement failed');
  }

  return {
    enhanced,
    original: prompt,
    source: 'rules',
    additions,
    latencyMs: Date.now() - start,
  };
}

/**
 * Check if a prompt would benefit from enhancement.
 */
export function needsEnhancement(prompt: string): boolean {
  const lower = prompt.toLowerCase();

  // Short prompts almost always benefit
  if (prompt.length < 30) return true;

  // Check for vague language
  const vagueTerms = ['nice', 'good', 'cool', 'simple', 'basic', 'clean', 'modern'];
  if (vagueTerms.some((t) => lower.includes(t))) return true;

  // Check for missing accessibility mention
  const a11yKeywords = ['accessible', 'a11y', 'aria', 'wcag'];
  if (!a11yKeywords.some((k) => lower.includes(k))) return true;

  // Check for missing responsive mention
  if (!lower.includes('responsive') && !lower.includes('mobile')) return true;

  return false;
}

// --- Internal helpers ---

const VAGUE_EXPANSIONS: Record<string, string> = {
  nice: 'polished and visually refined',
  'good-looking': 'aesthetically pleasing with balanced spacing and typography',
  cool: 'modern with subtle animations and visual depth',
  simple: 'clean and minimal with clear visual hierarchy',
  basic: 'straightforward with essential elements and clear layout',
  fancy: 'sophisticated with layered effects and refined details',
  pretty: 'visually appealing with harmonious colors and spacing',
  beautiful: 'elegantly designed with attention to typography and whitespace',
};

function expandVagueTerms(prompt: string, additions: string[]): string {
  let result = prompt;
  for (const [vague, specific] of Object.entries(VAGUE_EXPANSIONS)) {
    const regex = new RegExp(`\\b${vague}\\b`, 'gi');
    if (regex.test(result)) {
      result = result.replace(regex, specific);
      additions.push(`expanded:${vague}`);
    }
  }
  return result;
}

const COMPONENT_HINTS: Record<string, string> = {
  card: '. Use consistent padding, clear content hierarchy with heading, body, and action areas',
  button: '. Include hover, focus, and active states with appropriate contrast ratios',
  form: '. Add proper label associations, validation feedback, and logical tab order',
  modal: '. Trap focus within the dialog, handle Escape key, and restore focus on close',
  nav: '. Include skip navigation link, clear active state indicators, and mobile menu toggle',
  table: '. Add proper scope attributes, sortable column headers if applicable, and responsive overflow handling',
  hero: '. Use an attention-grabbing layout with clear CTA, balanced whitespace, and optimized image loading',
  footer: '. Include logical link grouping, social links, and sufficient color contrast',
  sidebar: '. Support collapsible state, keyboard navigation, and proper landmark role',
  header: '. Include logo placement, navigation, and responsive breakpoint behavior',
};

function addComponentHints(prompt: string, componentType: string, additions: string[]): string {
  const hint = COMPONENT_HINTS[componentType.toLowerCase()];
  if (hint && !prompt.includes(hint.slice(2, 20))) {
    additions.push(`component-hint:${componentType}`);
    return prompt + hint;
  }
  return prompt;
}
