import pino from 'pino';
import type Database from 'better-sqlite3';
import type {
  IComponentSnippet,
  IComponentQuery,
  ISearchResult,
  VisualStyleId,
  ComponentCategory,
  MoodTag,
  IndustryTag,
} from './types.js';
import { getVisualStyle, applyVisualStyle as applyStyle } from '../visual-styles/index.js';
import { getMicroInteraction } from '../micro-interactions/index.js';
import { feedbackBoostedSearch, runPromotionCycle } from '../../feedback/index.js';
import { validateSnippet } from '../../quality/anti-generic-rules.js';

const logger = pino({ name: 'component-registry' });

// --- In-Memory Component Registry ---

const registry: IComponentSnippet[] = [];

// Mood affinities for partial matching
const moodAffinities: Record<MoodTag, MoodTag[]> = {
  bold: ['energetic', 'premium'],
  calm: ['minimal', 'professional'],
  playful: ['creative', 'warm', 'energetic'],
  professional: ['corporate', 'minimal', 'calm'],
  premium: ['bold', 'editorial', 'futuristic'],
  minimal: ['calm', 'editorial', 'professional'],
  editorial: ['minimal', 'premium'],
  futuristic: ['premium', 'bold'],
  creative: ['playful', 'warm'],
  corporate: ['professional'],
  energetic: ['bold', 'playful'],
  warm: ['playful', 'creative'],
};

/**
 * Register a component snippet into the knowledge base.
 * Validates input and normalizes fields for consistent searching.
 */
export function registerSnippet(snippet: IComponentSnippet): void {
  // Validate snippet
  if (!snippet?.id || typeof snippet.id !== 'string') {
    logger.warn({ snippet }, 'Invalid snippet: missing or invalid id');
    return;
  }

  // Validate required string fields
  if (!snippet.type || typeof snippet.type !== 'string' || !snippet.type.trim()) {
    logger.warn({ snippet }, 'Invalid snippet: missing or invalid type');
    return;
  }
  if (!snippet.variant || typeof snippet.variant !== 'string' || !snippet.variant.trim()) {
    logger.warn({ snippet }, 'Invalid snippet: missing or invalid variant');
    return;
  }
  if (!Array.isArray(snippet.tags)) {
    logger.warn({ snippet }, 'Invalid snippet: tags must be an array');
    return;
  }

  const validation = validateSnippet(snippet);
  if (!validation.valid) {
    logger.warn(
      { id: snippet.id, errors: validation.errors },
      'Snippet failed quality validation'
    );
  }
  if (validation.warnings.length > 0) {
    logger.debug(
      { id: snippet.id, warnings: validation.warnings },
      'Snippet quality warnings'
    );
  }

  const normalized: IComponentSnippet = {
    ...snippet,
    type: snippet.type.toLowerCase().trim(),
    variant: snippet.variant.toLowerCase().trim(),
    tags: snippet.tags.map((t) => t.toLowerCase().trim()),
  };

  const exists = registry.findIndex((s) => s.id === normalized.id);
  if (exists >= 0) {
    logger.warn(
      { id: normalized.id, existingSource: registry[exists].name, newSource: normalized.name },
      'Overwriting existing snippet with duplicate id'
    );
    registry[exists] = normalized;
  } else {
    registry.push(normalized);
    logger.debug({ id: normalized.id, name: normalized.name }, 'Registered new snippet');
  }
}

/**
 * Clear the registry (for testing).
 */
export function clearRegistry(): void {
  registry.length = 0;
  logger.debug('Registry cleared');
}

/**
 * Register multiple snippets at once.
 */
export function registerSnippets(snippets: IComponentSnippet[]): void {
  for (const snippet of snippets) {
    registerSnippet(snippet);
  }
}

/**
 * Get a snippet by exact ID.
 */
export function getSnippetById(id: string): IComponentSnippet | undefined {
  return registry.find((s) => s.id === id);
}

/**
 * Get all registered snippets count.
 */
export function getRegistrySize(): number {
  return registry.length;
}

/**
 * Get a shallow copy of all registered snippets.
 */
export function getAllSnippets(): IComponentSnippet[] {
  return [...registry];
}

/**
 * Search components using tag-based fuzzy scoring.
 * Scores are computed by matching mood, industry, style, type, tags, and category.
 */
export function searchComponents(query: IComponentQuery): ISearchResult[] {
  if (registry.length === 0) return [];

  const results: ISearchResult[] = [];

  for (const snippet of registry) {
    let score = 0;
    let maxPossible = 0;

    // Type match (highest weight) - fields already normalized at registration
    if (query.type) {
      maxPossible += 10;
      const queryType = query.type.toLowerCase();
      if (snippet.type === queryType) {
        score += 10;
      } else if (snippet.type.includes(queryType) || queryType.includes(snippet.type)) {
        score += 5;
      }
    }

    // Variant match - fields already normalized at registration
    if (query.variant) {
      maxPossible += 8;
      const queryVariant = query.variant.toLowerCase();
      if (snippet.variant === queryVariant) {
        score += 8;
      } else if (snippet.variant.includes(queryVariant)) {
        score += 4;
      }
    }

    // Category match
    if (query.category) {
      maxPossible += 4;
      if (snippet.category === query.category) {
        score += 4;
      }
    }

    // Mood match
    if (query.mood) {
      maxPossible += 6;
      if (snippet.mood.includes(query.mood)) {
        score += 6;
      } else {
        // Partial mood affinity (some moods are related)
        const related = moodAffinities[query.mood] ?? [];
        if (snippet.mood.some((m) => related.includes(m))) {
          score += 3;
        }
      }
    }

    // Industry match
    if (query.industry) {
      maxPossible += 5;
      if (snippet.industry.includes(query.industry)) {
        score += 5;
      } else if (snippet.industry.includes('general')) {
        score += 2;
      }
    }

    // Visual style match
    if (query.style) {
      maxPossible += 6;
      if (snippet.visualStyles.includes(query.style)) {
        score += 6;
      }
    }

    // Tags match
    if (query.tags && query.tags.length > 0) {
      maxPossible += 4;
      const matchCount = query.tags.filter((t) => snippet.tags.includes(t.toLowerCase())).length;
      score += Math.min(4, (matchCount / query.tags.length) * 4);
    }

    // Only include if there's some match
    if (score > 0) {
      const normalizedScore = maxPossible > 0 ? score / maxPossible : 0;
      results.push({ snippet, score: normalizedScore });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results;
}

/**
 * Get all variants for a given component type.
 */
export function getVariants(type: string): IComponentSnippet[] {
  return registry.filter((s) => s.type === type.toLowerCase());
}

/**
 * Get all component types available in the registry.
 */
export function getAvailableTypes(): string[] {
  return [...new Set(registry.map((s) => s.type))];
}

/**
 * Get all snippets for a given category.
 */
export function getByCategory(category: ComponentCategory): IComponentSnippet[] {
  return registry.filter((s) => s.category === category);
}

/**
 * Get snippets matching a mood.
 */
export function getByMood(mood: MoodTag): IComponentSnippet[] {
  return registry.filter((s) => s.mood.includes(mood));
}

/**
 * Get snippets matching an industry.
 */
export function getByIndustry(industry: IndustryTag): IComponentSnippet[] {
  return registry.filter((s) => s.industry.includes(industry));
}

/**
 * Apply a visual style layer onto a component snippet.
 * Returns a new snippet with modified tailwind classes.
 */
export function applyVisualStyle(snippet: IComponentSnippet, styleId: VisualStyleId): IComponentSnippet {
  const style = getVisualStyle(styleId);
  if (!style) {
    logger.warn(
      { styleId, snippetId: snippet.id, snippetType: snippet.type },
      'Visual style not found in applyVisualStyle, returning original snippet'
    );
    return snippet;
  }
  return applyStyle(snippet, style);
}

/**
 * Inject micro-interaction animations into a snippet.
 * Returns a new snippet with animation classes added.
 */
export function injectAnimations(snippet: IComponentSnippet, animationIds: string[]): IComponentSnippet {
  const additionalClasses: string[] = [];
  let additionalCss = snippet.css ?? '';

  for (const animId of animationIds) {
    const anim = getMicroInteraction(animId);
    if (anim) {
      additionalClasses.push(anim.tailwindClasses);
      if (anim.keyframes) {
        additionalCss += `\n${anim.keyframes}`;
      }
    }
  }

  if (additionalClasses.length === 0) return snippet;

  const newTailwindClasses = { ...snippet.tailwindClasses };
  const keys = Object.keys(newTailwindClasses);

  if (keys.length === 0) {
    newTailwindClasses.root = additionalClasses.join(' ').trim();
  } else {
    // Prefer explicit 'root' or 'container' keys, otherwise use first key
    const rootKey = 'root' in newTailwindClasses ? 'root' : 'container' in newTailwindClasses ? 'container' : keys[0];
    if (rootKey !== 'root' && rootKey !== 'container') {
      logger.warn({ snippetId: snippet.id, animationIds, rootKey }, 'No root/container key found, using first key');
    }
    newTailwindClasses[rootKey] = `${newTailwindClasses[rootKey]} ${additionalClasses.join(' ')}`.trim();
  }

  return {
    ...snippet,
    tailwindClasses: newTailwindClasses,
    css: additionalCss.trim() || undefined,
    animations: [...(snippet.animations ?? []), ...animationIds],
  };
}

/**
 * Compose a full section by searching for an organism and optionally applying style + animations.
 */
export function composeSection(
  sectionType: string,
  options?: { style?: VisualStyleId; mood?: MoodTag; industry?: IndustryTag }
): IComponentSnippet | undefined {
  const results = searchComponents({
    type: sectionType,
    category: 'organism',
    mood: options?.mood,
    industry: options?.industry,
    style: options?.style,
  });

  if (results.length === 0) return undefined;

  let snippet = results[0].snippet;

  if (options?.style) {
    snippet = applyVisualStyle(snippet, options.style);
  }

  return snippet;
}

/**
 * Get the best matching snippet for a component type, falling back gracefully.
 * This is the main entry point for the generation tools.
 */
export function getBestMatch(
  type: string,
  options?: {
    variant?: string;
    mood?: MoodTag;
    industry?: IndustryTag;
    style?: VisualStyleId;
  }
): IComponentSnippet | undefined {
  // Try exact type + variant first
  if (options?.variant) {
    const exact = registry.find((s) => s.type === type.toLowerCase() && s.variant === options.variant?.toLowerCase());
    if (exact) return exact;
  }

  // Try search with all criteria
  const results = searchComponents({
    type,
    variant: options?.variant,
    mood: options?.mood,
    industry: options?.industry,
    style: options?.style,
  });

  if (results.length > 0) return results[0].snippet;

  // Fallback: just type match
  const typeMatch = registry.find((s) => s.type === type.toLowerCase());
  return typeMatch;
}

/**
 * Get the best matching snippet with feedback boosting.
 * Uses feedback data to re-rank search results based on user acceptance patterns.
 */
export function getBestMatchWithFeedback(
  type: string,
  options?: {
    variant?: string;
    mood?: MoodTag;
    industry?: IndustryTag;
    style?: VisualStyleId;
  },
  db?: Database.Database
): IComponentSnippet | undefined {
  // Apply feedback boost if DB available
  if (db) {
    try {
      const query: IComponentQuery = {
        type,
        variant: options?.variant,
        mood: options?.mood,
        industry: options?.industry,
        style: options?.style,
      };
      const boosted = feedbackBoostedSearch(query, db);
      if (boosted.length > 0 && boosted[0]?.snippet) {
        return boosted[0].snippet;
      }
      // Fall through to base search if empty result
    } catch (err) {
      logger.error({ err, type }, 'Failed to apply feedback boost, falling back to base search');
    }
  }

  // Fallback to standard search
  const results = searchComponents({
    type,
    variant: options?.variant,
    mood: options?.mood,
    industry: options?.industry,
    style: options?.style,
  });

  if (results.length > 0) return results[0]?.snippet;

  // Final fallback: just type match
  const typeMatch = registry.find((s) => s.type === type.toLowerCase());
  return typeMatch;
}

/**
 * Trigger pattern promotion cycle.
 * Promotes high-performing code patterns from feedback to the registry.
 */
export function triggerPatternPromotion(db: Database.Database): number {
  try {
    const promoted = runPromotionCycle(db);
    return promoted;
  } catch (err) {
    logger.warn({ error: err }, 'Pattern promotion failed');
    return 0;
  }
}

// Re-export types
export type {
  IComponentSnippet,
  IComponentQuery,
  ISearchResult,
  ComponentCategory,
  MoodTag,
  IndustryTag,
  VisualStyleId,
} from './types.js';
