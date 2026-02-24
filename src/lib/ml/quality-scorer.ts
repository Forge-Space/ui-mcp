/**
 * Quality scorer — predicts whether generated code will be accepted by the user.
 *
 * Uses the sidecar model when available, otherwise falls back to
 * heuristic scoring based on code structure analysis.
 *
 * Score range: 0-10 (0 = likely rejected, 10 = likely accepted).
 */

import pino from 'pino';
import { isSidecarReady, infer } from './sidecar-model.js';
import { embed } from './embeddings.js';
import { semanticSearch, getEmbeddingCount } from './embedding-store.js';
import { getDatabase } from '../design-references/database/store.js';

const logger = pino({ name: 'quality-scorer' });

/** Quality score result. */
export interface IQualityScore {
  /** Score from 0-10. */
  score: number;
  /** Confidence in the score (0-1). */
  confidence: number;
  /** Whether the score came from the model or heuristics. */
  source: 'model' | 'heuristic';
  /** Breakdown of heuristic factors (when source is 'heuristic'). */
  factors?: Record<string, number>;
  /** Inference latency in ms. */
  latencyMs: number;
}

/**
 * Score the quality of generated code.
 *
 * When the sidecar model is loaded, uses it for prediction.
 * Otherwise, applies structural heuristics.
 */
// Configurable weights for quality scoring factors
export const QUALITY_WEIGHTS = {
  length: 1.0,
  accessibility: 1.5,
  semanticHTML: 1.2,
  styling: 1.0,
  responsiveness: 1.3,
  completeness: 1.4,
};

export function scoreQuality(
  prompt: string,
  generatedCode: string,
  params?: { componentType?: string; framework?: string; style?: string }
): Promise<IQualityScore> {
  const start = Date.now();

  if (isSidecarReady()) {
    return scoreWithModel(prompt, generatedCode, params, start);
  }

  return Promise.resolve(scoreWithHeuristics(prompt, generatedCode, params, start));
}

/**
 * Score using the sidecar model.
 */
async function scoreWithModel(
  prompt: string,
  generatedCode: string,
  params: { componentType?: string; framework?: string; style?: string } | undefined,
  start: number
): Promise<IQualityScore> {
  const inferPrompt = [
    'Rate the likelihood that the following UI generation request will be accepted by the user.',
    'Respond with ONLY a number from 0 to 10.',
    '',
    `Prompt: ${prompt}`,
    `Component: ${params?.componentType ?? 'unknown'}`,
    `Framework: ${params?.framework ?? 'unknown'}`,
    `Style: ${params?.style ?? 'default'}`,
    `Code length: ${generatedCode.length} chars`,
    '',
    'Score:',
  ].join('\n');

  const result = await infer(inferPrompt, { maxTokens: 8, temperature: 0.1 });

  if (result.source === 'model' && result.text.trim()) {
    const parsed = parseFloat(result.text.trim());
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 10) {
      return {
        score: Math.round(parsed * 10) / 10,
        confidence: 0.8,
        source: 'model',
        latencyMs: Date.now() - start,
      };
    }
  }

  // Fallback to heuristics if model output is unparseable
  logger.debug('Model output unparseable, falling back to heuristics');
  return scoreWithHeuristics(prompt, generatedCode, params, start);
}

/**
 * Score using structural heuristics.
 * Analyzes code structure, accessibility markers, and completeness.
 */
function scoreWithHeuristics(
  prompt: string,
  generatedCode: string,
  params: { componentType?: string; framework?: string; style?: string } | undefined,
  start: number
): IQualityScore {
  const factors: Record<string, number> = {};
  let total = 0;
  let maxPossible = 0;

  // Factor 1: Code length (too short = incomplete, too long = bloated)
  const len = generatedCode.length;
  if (len < 50) {
    factors.length = 0;
  } else if (len < 200) {
    factors.length = 0.5;
  } else if (len < 5000) {
    factors.length = 1.0;
  } else {
    factors.length = 0.7;
  }
  total += factors.length;
  maxPossible += 1;

  // Factor 2: Accessibility markers
  const a11yMarkers = [/aria-/i, /role=/i, /alt=/i, /tabIndex/i, /sr-only/i, /<label/i, /htmlFor/i];
  const a11yScore = a11yMarkers.filter((r) => r.test(generatedCode)).length / a11yMarkers.length;
  factors.accessibility = a11yScore;
  total += a11yScore;
  maxPossible += 1;

  // Factor 3: Semantic HTML
  const semanticTags = ['<header', '<main', '<nav', '<section', '<article', '<footer', '<aside'];
  const semanticCount = semanticTags.filter((t) => generatedCode.includes(t)).length;
  factors.semanticHtml = Math.min(1.0, semanticCount / 3);
  total += factors.semanticHtml;
  maxPossible += 1;

  // Factor 4: Tailwind usage (if expected)
  if (generatedCode.includes('className') || generatedCode.includes('class=')) {
    const tailwindPatterns = [/\bflex\b/, /\bgrid\b/, /\bp-\d/, /\bm-\d/, /\btext-/, /\bbg-/, /\brounded/];
    const twScore = tailwindPatterns.filter((r) => r.test(generatedCode)).length / tailwindPatterns.length;
    factors.tailwind = twScore;
    total += twScore;
    maxPossible += 1;
  }

  // Factor 5: Component structure (exports, props)
  const structureMarkers = [/export\s+(default\s+)?function/, /interface\s+\w+Props/, /return\s*\(/, /import\s+/];
  const structScore = structureMarkers.filter((r) => r.test(generatedCode)).length / structureMarkers.length;
  factors.structure = structScore;
  total += structScore;
  maxPossible += 1;

  // Factor 6: Responsive design
  const responsiveMarkers = [/\bsm:/, /\bmd:/, /\blg:/, /\bxl:/, /@media/];
  const respScore = responsiveMarkers.filter((r) => r.test(generatedCode)).length / responsiveMarkers.length;
  factors.responsive = respScore;
  total += respScore;
  maxPossible += 1;

  // Factor 7: Dark mode support
  if (generatedCode.includes('dark:')) {
    factors.darkMode = 1.0;
  } else {
    factors.darkMode = 0;
  }
  total += factors.darkMode;
  maxPossible += 1;

  // Factor 8: Prompt alignment — check if component type appears in code
  if (params?.componentType) {
    const typeInCode = generatedCode.toLowerCase().includes(params.componentType.toLowerCase());
    factors.promptAlignment = typeInCode ? 1.0 : 0.3;
  } else {
    factors.promptAlignment = 0.5;
  }
  total += factors.promptAlignment;
  maxPossible += 1;

  const normalizedScore = maxPossible > 0 ? (total / maxPossible) * 10 : 5;

  return {
    score: Math.round(normalizedScore * 10) / 10,
    confidence: 0.5,
    source: 'heuristic',
    factors,
    latencyMs: Date.now() - start,
  };
}

/**
 * Enhanced quality scoring with RAG-based a11y compliance checks.
 * Retrieves relevant axe-core rules and checks violations against them.
 */
export async function scoreQualityWithRAG(
  prompt: string,
  generatedCode: string,
  params?: { componentType?: string; framework?: string; style?: string }
): Promise<IQualityScore> {
  const start = Date.now();

  const baseScore = await scoreQuality(prompt, generatedCode, params);

  try {
    const db = getDatabase();
    const ruleCount = getEmbeddingCount('rule', db);

    if (ruleCount === 0) return baseScore;

    const codeSnippet = generatedCode.slice(0, 500);
    const queryVector = await embed(codeSnippet);
    const relevantRules = semanticSearch(queryVector, 'rule', db, 10, 0.3);

    if (relevantRules.length === 0) return baseScore;

    let violations = 0;
    const checkedRules: string[] = [];

    for (const rule of relevantRules) {
      const ruleId = rule.text.match(/a11y rule ([^:]+)/)?.[1] ?? '';
      checkedRules.push(ruleId);

      if (ruleId === 'image-alt' && /<img/i.test(generatedCode) && !/alt=/i.test(generatedCode)) {
        violations++;
      }
      if (ruleId === 'button-name' && /<button[^>]*>\s*<\/button>/i.test(generatedCode)) {
        violations++;
      }
      if (ruleId === 'label' && /<input/i.test(generatedCode) && !/aria-label|<label/i.test(generatedCode)) {
        violations++;
      }
      if (ruleId === 'color-contrast' && /text-gray-[23]00/i.test(generatedCode)) {
        violations++;
      }
      if (ruleId === 'html-has-lang' && /<html/i.test(generatedCode) && !/lang=/i.test(generatedCode)) {
        violations++;
      }
      if (ruleId === 'heading-order') {
        const headings = [...generatedCode.matchAll(/<h([1-6])/gi)].map((m) => parseInt(m[1], 10));
        for (let i = 1; i < headings.length; i++) {
          if (headings[i] > headings[i - 1] + 1) {
            violations++;
            break;
          }
        }
      }
      if (ruleId === 'link-name' && /<a[^>]*>\s*<\/a>/i.test(generatedCode)) {
        violations++;
      }
      if (ruleId === 'tabindex' && /tabindex=["'][1-9]/i.test(generatedCode)) {
        violations++;
      }
    }

    const ragDeduction = Math.min(3, violations * 0.5);
    const ragScore = Math.max(0, baseScore.score - ragDeduction);
    const ragConfidence = Math.min(0.85, baseScore.confidence + 0.2);

    const ragFactors = {
      ...baseScore.factors,
      ragA11yCompliance: Math.max(0, 1 - violations / Math.max(1, relevantRules.length)),
      ragRulesChecked: relevantRules.length,
      ragViolations: violations,
    };

    return {
      score: Math.round(ragScore * 10) / 10,
      confidence: ragConfidence,
      source: 'heuristic',
      factors: ragFactors,
      latencyMs: Date.now() - start,
    };
  } catch (err) {
    logger.warn({ error: (err as Error).message }, 'RAG quality scoring failed');
    return baseScore;
  }
}

/**
 * Quick check: is the code likely acceptable? (score >= 6)
 */
export async function isLikelyAccepted(
  prompt: string,
  generatedCode: string,
  params?: { componentType?: string; framework?: string; style?: string }
): Promise<boolean> {
  const result = await scoreQuality(prompt, generatedCode, params);
  return result.score >= 6;
}
