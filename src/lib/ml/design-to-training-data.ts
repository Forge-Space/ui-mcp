/**
 * Design-to-Training-Data Converter
 *
 * Converts extracted design patterns into ML training data format.
 * Integrates with existing feedback system and pattern detection.
 */

import type Database from 'better-sqlite3';
import pino from 'pino';
import type { IComponentSnippet } from '../design-references/component-registry/types.js';
import type { IDesignAnalysis } from './image-design-analyzer.js';
import { registerSnippet } from '../design-references/component-registry/index.js';

const logger = pino({ name: 'design-to-training-data' });

export interface ITrainingDataResult {
  snippetsCreated: number;
  feedbackEntriesCreated: number;
  patternsDetected: number;
  summary: string;
}

/**
 * Convert design analysis into training data and store in database.
 * This is the main entry point for the image-to-training-data pipeline.
 */
export function storeDesignLearning(
  analysis: IDesignAnalysis,
  generatedCode: string,
  componentName: string,
  framework: string,
  db: Database.Database
): ITrainingDataResult {
  const result: ITrainingDataResult = {
    snippetsCreated: 0,
    feedbackEntriesCreated: 0,
    patternsDetected: 0,
    summary: '',
  };

  // 1. Convert to component snippets (if quality is high enough)
  if (analysis.qualityScore >= 0.6) {
    const snippets = convertToComponentSnippets(analysis, generatedCode, componentName, framework);
    for (const snippet of snippets) {
      registerSnippet(snippet);
      result.snippetsCreated++;
    }
    logger.info({ count: snippets.length, qualityScore: analysis.qualityScore }, 'Component snippets created from design analysis');
  }

  // 2. Generate feedback entries for ML training
  const feedbackEntries = generateFeedbackEntries(analysis, componentName, db);
  result.feedbackEntriesCreated = feedbackEntries;

  // 3. Detect and store code patterns
  const patterns = detectAndStorePatterns(analysis, generatedCode, db);
  result.patternsDetected = patterns;

  // 4. Generate summary
  result.summary = generateSummary(analysis, result);

  logger.info(result, 'Design learning stored successfully');
  return result;
}

/**
 * Convert design analysis into IComponentSnippet format.
 */
function convertToComponentSnippets(
  analysis: IDesignAnalysis,
  generatedCode: string,
  componentName: string,
  _framework: string
): IComponentSnippet[] {
  const snippets: IComponentSnippet[] = [];

  // Create a snippet for each detected component
  for (let i = 0; i < analysis.components.length; i++) {
    const component = analysis.components[i];
    const snippet: IComponentSnippet = {
      id: `learned-${componentName.toLowerCase()}-${component.type}-${Date.now()}-${i}`,
      name: `${componentName} ${component.type}`,
      category: inferCategory(component.type),
      type: component.type,
      variant: component.variant || 'default',
      tags: extractTags(analysis, component.type),
      mood: analysis.mood,
      industry: analysis.industry,
      visualStyles: [analysis.visualStyle.primary],
      jsx: extractComponentJSX(generatedCode, component.type),
      tailwindClasses: extractTailwindClasses(generatedCode, component.type),
      css: undefined,
      a11y: {
        roles: [inferA11yRole(component.type)],
        ariaAttributes: [],
        keyboardNav: 'Standard keyboard navigation',
        contrastRatio: '4.5:1',
        focusVisible: true,
        reducedMotion: true,
      },
      seo: {
        semanticElement: inferSemanticElement(component.type),
      },
      responsive: {
        strategy: 'mobile-first',
        breakpoints: analysis.layout.responsive ? ['sm', 'md', 'lg'] : [],
      },
      quality: {
        antiGeneric: [`Learned from real design (quality score: ${analysis.qualityScore.toFixed(2)})`],
        inspirationSource: 'User-provided design reference',
        craftDetails: analysis.visualStyle.characteristics,
      },
    };

    snippets.push(snippet);
  }

  return snippets;
}

/**
 * Generate feedback entries for ML training.
 */
function generateFeedbackEntries(
  analysis: IDesignAnalysis,
  componentName: string,
  db: Database.Database
): number {
  const generationId = `design-learning-${Date.now()}`;
  const score = analysis.qualityScore * 2; // Scale to 0-2 range

  const stmt = db.prepare(`
    INSERT INTO feedback (generation_id, prompt, component_type, score, feedback_type, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  let count = 0;

  // Create feedback for each detected component
  for (const component of analysis.components) {
    stmt.run(
      `${generationId}-${component.type}`,
      `Design reference: ${componentName}`,
      component.type,
      score,
      'implicit',
      Date.now()
    );
    count++;
  }

  // Create feedback for visual style
  if (analysis.visualStyle.primary) {
    stmt.run(
      `${generationId}-style`,
      `Visual style: ${analysis.visualStyle.primary}`,
      'style',
      score,
      'implicit',
      Date.now()
    );
    count++;
  }

  logger.info({ count, score }, 'Feedback entries created from design analysis');
  return count;
}

/**
 * Detect and store code patterns from design analysis.
 */
function detectAndStorePatterns(
  analysis: IDesignAnalysis,
  generatedCode: string,
  db: Database.Database
): number {
  const patterns: Array<{ skeleton: string; snippet: string; componentType: string }> = [];

  // Extract patterns from components
  for (const component of analysis.components) {
    const componentCode = extractComponentJSX(generatedCode, component.type);
    if (componentCode.length > 20) {
      const skeleton = generateSkeleton(componentCode);
      patterns.push({
        skeleton,
        snippet: componentCode,
        componentType: component.type,
      });
    }
  }

  // Store patterns in database
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO code_patterns (id, skeleton_hash, skeleton, snippet, component_type, category, frequency, avg_score, promoted)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let count = 0;
  for (const pattern of patterns) {
    const hash = hashString(pattern.skeleton);
    const id = `pattern-${hash}`;

    stmt.run(
      id,
      hash,
      pattern.skeleton,
      pattern.snippet,
      pattern.componentType,
      'molecule',
      1,
      analysis.qualityScore,
      0
    );
    count++;
  }

  logger.info({ count }, 'Code patterns stored from design analysis');
  return count;
}

/**
 * Generate a summary of what was learned from the design.
 */
function generateSummary(analysis: IDesignAnalysis, result: ITrainingDataResult): string {
  const lines: string[] = [
    `📊 Design Learning Summary`,
    ``,
    `**Quality Score:** ${(analysis.qualityScore * 100).toFixed(0)}%`,
    `**Visual Style:** ${analysis.visualStyle.primary}`,
    `**Mood:** ${analysis.mood.join(', ') || 'general'}`,
    `**Industry:** ${analysis.industry.join(', ')}`,
    ``,
    `**Extracted Data:**`,
    `- ${result.snippetsCreated} component snippet(s) created`,
    `- ${result.feedbackEntriesCreated} feedback entry(ies) for ML training`,
    `- ${result.patternsDetected} code pattern(s) detected`,
    ``,
    `**Components Detected:** ${analysis.components.map(c => c.type).join(', ')}`,
    `**Color Palette:** ${Object.values(analysis.colors).flat().length} colors extracted`,
    `**Typography:** ${analysis.typography.fontFamilies.length} font(s), ${analysis.typography.weights.length} weight(s)`,
    `**Layout:** ${analysis.layout.type} (${analysis.layout.responsive ? 'responsive' : 'fixed'})`,
    ``,
    `**Metadata:**`,
    `- Complexity: ${analysis.metadata.complexity}`,
    `- Modernity Score: ${(analysis.metadata.modernityScore * 100).toFixed(0)}%`,
    ``,
    `✅ Design patterns successfully extracted and stored for ML training.`,
    `📝 No images were stored - only structured design data.`,
  ];

  return lines.join('\n');
}

// --- Helper Functions ---

function inferCategory(componentType: string): 'atom' | 'molecule' | 'organism' {
  const atoms = ['button', 'input', 'icon', 'badge', 'avatar'];
  const organisms = ['navigation', 'hero', 'footer', 'header'];

  if (atoms.includes(componentType)) return 'atom';
  if (organisms.includes(componentType)) return 'organism';
  return 'molecule';
}

function extractTags(analysis: IDesignAnalysis, componentType: string): string[] {
  const tags = [componentType, analysis.visualStyle.primary];

  if (analysis.layout.responsive) tags.push('responsive');
  if (analysis.metadata.modernityScore > 0.7) tags.push('modern');

  return tags;
}

/**
 * Extract component JSX from generated code.
 *
 * TODO: This line-based extraction is fragile and should be replaced with proper AST parsing.
 * Consider using a JSX/TSX parser (e.g., Babel parser or TypeScript AST) for robust extraction
 * that can handle complex component structures, nested elements, and edge cases.
 *
 * Technical debt: Current implementation uses simple string matching which may fail with:
 * - Multi-line JSX expressions
 * - Nested components with similar names
 * - Comments containing component keywords
 * - Dynamic component rendering
 */
function extractComponentJSX(code: string, componentType: string): string {
  // Simple extraction - in production, use proper AST parsing
  const lines = code.split('\n');
  const relevantLines = lines.filter(line =>
    line.toLowerCase().includes(componentType) ||
    line.includes('className') ||
    line.includes('class=')
  );

  return relevantLines.slice(0, 10).join('\n').trim() || `<div className="placeholder-${componentType}">Content</div>`;
}

function extractTailwindClasses(code: string, _componentType: string): Record<string, string> {
  const classMatches = code.match(/className="([^"]+)"/g) || [];
  const classes = classMatches.map(m => m.replace(/className="|"/g, ''));

  return {
    root: classes[0] || 'flex items-center justify-center',
    container: classes[1] || '',
  };
}

function inferA11yRole(componentType: string): string {
  const roleMap: Record<string, string> = {
    button: 'button',
    navigation: 'navigation',
    form: 'form',
    modal: 'dialog',
    table: 'table',
  };

  return roleMap[componentType] || 'region';
}

function inferSemanticElement(componentType: string): string {
  const elementMap: Record<string, string> = {
    button: 'button',
    navigation: 'nav',
    hero: 'section',
    footer: 'footer',
    header: 'header',
    form: 'form',
  };

  return elementMap[componentType] || 'div';
}

function generateSkeleton(code: string): string {
  // Generate a simplified skeleton of the code structure
  return code
    .replace(/className="[^"]+"/g, 'className="*"')
    .replace(/\{[^}]+\}/g, '{*}')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 200);
}

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}
