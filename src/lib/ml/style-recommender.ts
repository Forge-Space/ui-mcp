/**
 * Style recommender — suggests design tokens based on prompt context.
 *
 * Uses RAG retrieval from ingested design tokens (Material Design 3, Primer)
 * to recommend appropriate styling. Falls back to heuristic industry/mood
 * lookup when no embeddings are available.
 */

import pino from 'pino';
import { embed } from './embeddings.js';
import { semanticSearch, getEmbeddingCount } from './embedding-store.js';
import { getDatabase } from '../design-references/database/store.js';
import type { ISimilarityResult } from './types.js';

const logger = pino({ name: 'style-recommender' });

export interface IStyleRecommendation {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  spacing: string;
  borderRadius: string;
  designSystem: string;
  confidence: number;
  source: 'rag' | 'heuristic';
  matchedTokens: ISimilarityResult[];
}

export interface IStyleContext {
  industry?: string;
  mood?: string;
}

const INDUSTRY_STYLES: Record<string, Omit<IStyleRecommendation, 'confidence' | 'source' | 'matchedTokens'>> = {
  fintech: {
    primaryColor: '#0F172A',
    secondaryColor: '#0EA5E9',
    fontFamily: 'Inter, system-ui, sans-serif',
    spacing: '16px',
    borderRadius: '8px',
    designSystem: 'custom-fintech',
  },
  saas: {
    primaryColor: '#6366F1',
    secondaryColor: '#818CF8',
    fontFamily: 'Inter, system-ui, sans-serif',
    spacing: '16px',
    borderRadius: '8px',
    designSystem: 'custom-saas',
  },
  ecommerce: {
    primaryColor: '#DC2626',
    secondaryColor: '#F97316',
    fontFamily: 'Poppins, system-ui, sans-serif',
    spacing: '16px',
    borderRadius: '12px',
    designSystem: 'custom-ecommerce',
  },
  healthcare: {
    primaryColor: '#0D9488',
    secondaryColor: '#06B6D4',
    fontFamily: 'Source Sans 3, system-ui, sans-serif',
    spacing: '20px',
    borderRadius: '12px',
    designSystem: 'custom-healthcare',
  },
  education: {
    primaryColor: '#7C3AED',
    secondaryColor: '#A78BFA',
    fontFamily: 'Nunito, system-ui, sans-serif',
    spacing: '16px',
    borderRadius: '16px',
    designSystem: 'custom-education',
  },
  startup: {
    primaryColor: '#8B5CF6',
    secondaryColor: '#EC4899',
    fontFamily: 'Inter, system-ui, sans-serif',
    spacing: '16px',
    borderRadius: '12px',
    designSystem: 'custom-startup',
  },
  agency: {
    primaryColor: '#1E1E1E',
    secondaryColor: '#F5F5F5',
    fontFamily: 'Space Grotesk, system-ui, sans-serif',
    spacing: '24px',
    borderRadius: '4px',
    designSystem: 'custom-agency',
  },
  media: {
    primaryColor: '#EF4444',
    secondaryColor: '#F59E0B',
    fontFamily: 'Merriweather, Georgia, serif',
    spacing: '16px',
    borderRadius: '8px',
    designSystem: 'custom-media',
  },
  devtools: {
    primaryColor: '#1E293B',
    secondaryColor: '#38BDF8',
    fontFamily: 'JetBrains Mono, monospace',
    spacing: '12px',
    borderRadius: '6px',
    designSystem: 'primer',
  },
  general: {
    primaryColor: '#3B82F6',
    secondaryColor: '#6366F1',
    fontFamily: 'Inter, system-ui, sans-serif',
    spacing: '16px',
    borderRadius: '8px',
    designSystem: 'custom',
  },
};

const MOOD_MODIFIERS: Record<string, Partial<IStyleRecommendation>> = {
  bold: { borderRadius: '4px', spacing: '20px' },
  calm: { primaryColor: '#0EA5E9', borderRadius: '16px', spacing: '24px' },
  playful: { borderRadius: '20px', spacing: '16px' },
  professional: { borderRadius: '6px', spacing: '16px' },
  premium: { primaryColor: '#1E1E1E', borderRadius: '8px', spacing: '24px' },
  energetic: { borderRadius: '12px', spacing: '12px' },
  minimal: { borderRadius: '4px', spacing: '24px' },
  editorial: { fontFamily: 'Playfair Display, Georgia, serif', spacing: '24px', borderRadius: '0px' },
  futuristic: { primaryColor: '#8B5CF6', borderRadius: '16px' },
  warm: { primaryColor: '#D97706', borderRadius: '12px' },
  corporate: { primaryColor: '#1E40AF', borderRadius: '6px', spacing: '16px' },
  creative: { borderRadius: '20px', spacing: '16px' },
};

export async function recommendStyle(prompt: string, context?: IStyleContext): Promise<IStyleRecommendation> {
  const db = getDatabase();
  const tokenCount = getEmbeddingCount('token', db);

  if (tokenCount > 0) {
    try {
      return await recommendWithRAG(prompt, context, db);
    } catch (err) {
      logger.warn({ error: (err as Error).message }, 'RAG style recommendation failed, using heuristic');
    }
  }

  return recommendWithHeuristic(prompt, context);
}

async function recommendWithRAG(
  prompt: string,
  context: IStyleContext | undefined,
  db: ReturnType<typeof getDatabase>
): Promise<IStyleRecommendation> {
  const searchText = [
    prompt,
    context?.industry ? `${context.industry} industry` : '',
    context?.mood ? `${context.mood} mood` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const queryVector = await embed(searchText);
  const tokenResults = semanticSearch(queryVector, 'token', db, 10, 0.3);

  if (tokenResults.length === 0) {
    return recommendWithHeuristic(prompt, context);
  }

  const systemCounts = new Map<string, number>();
  for (const r of tokenResults) {
    const system = r.text.split(' ')[0] ?? 'unknown';
    systemCounts.set(system, (systemCounts.get(system) ?? 0) + 1);
  }

  let bestSystem = 'material-design-3';
  let bestCount = 0;
  for (const [system, count] of systemCounts) {
    if (count > bestCount) {
      bestSystem = system;
      bestCount = count;
    }
  }

  const colorToken = tokenResults.find((r) => r.text.includes('color') && r.text.includes('primary'));
  const fontToken = tokenResults.find((r) => r.text.includes('typography') || r.text.includes('font'));
  const spacingToken = tokenResults.find((r) => r.text.includes('spacing') || r.text.includes('space'));
  const radiusToken = tokenResults.find(
    (r) => r.text.includes('radius') || r.text.includes('corner') || r.text.includes('shape')
  );

  const extractValue = (text: string): string => {
    const match = text.match(/:\s*([^.]+)/);
    return match?.[1]?.trim() ?? '';
  };

  const base = INDUSTRY_STYLES[context?.industry ?? 'general'] ?? INDUSTRY_STYLES.general;

  return {
    primaryColor: colorToken ? extractValue(colorToken.text) || base.primaryColor : base.primaryColor,
    secondaryColor: base.secondaryColor,
    fontFamily: fontToken ? extractValue(fontToken.text) || base.fontFamily : base.fontFamily,
    spacing: spacingToken ? extractValue(spacingToken.text) || base.spacing : base.spacing,
    borderRadius: radiusToken ? extractValue(radiusToken.text) || base.borderRadius : base.borderRadius,
    designSystem: bestSystem,
    confidence: Math.min(0.9, tokenResults[0].similarity + 0.1),
    source: 'rag',
    matchedTokens: tokenResults.slice(0, 5),
  };
}

function recommendWithHeuristic(_prompt: string, context?: IStyleContext): IStyleRecommendation {
  const base = INDUSTRY_STYLES[context?.industry ?? 'general'] ?? INDUSTRY_STYLES.general;
  const moodMods = context?.mood ? (MOOD_MODIFIERS[context.mood] ?? {}) : {};

  return {
    ...base,
    ...moodMods,
    confidence: 0.4,
    source: 'heuristic',
    matchedTokens: [],
  };
}
