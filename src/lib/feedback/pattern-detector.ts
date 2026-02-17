/**
 * Code pattern detection — extracts structural skeletons from generated code
 * and hashes them for cross-session pattern recognition.
 */

import { createHash } from 'node:crypto';
import type { ICodePattern } from './types.js';

// Void elements that self-close (all HTML self-closing tags)
const VOID_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

/**
 * Extract a structural skeleton from JSX/HTML code.
 *
 * Strips class names, text content, and attribute values,
 * keeping only the element hierarchy and semantic roles.
 *
 * Example:
 *   Input:  <div className="flex gap-4"><h2 className="text-2xl">Title</h2><button>CTA</button></div>
 *   Output: div>h2+button
 */
export function extractSkeleton(code: string): string {
  // Remove comments
  let clean = code.replace(/<!--[\s\S]*?-->/g, '');
  clean = clean.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

  // Extract tag structure using a simple regex-based approach
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*\/?>/g;
  const stack: string[] = [];
  const parts: string[] = [];
  let match: RegExpExecArray | null;
  let lastDepth = 0;

  while ((match = tagRegex.exec(clean)) !== null) {
    const fullTag = match[0] ?? '';
    const tagName = match[1]?.toLowerCase() ?? '';

    // Skip self-closing tags that are decorative
    const isSelfClosing = fullTag.endsWith('/>') || VOID_TAGS.has(tagName);
    const isClosing = fullTag.startsWith('</');

    if (isClosing) {
      stack.pop();
    } else {
      const depth = stack.length;
      const semanticRole = inferSemanticRole(tagName, fullTag);
      const label = semanticRole ? `${tagName}[${semanticRole}]` : tagName;

      if (depth > lastDepth) {
        parts.push('>');
      } else if (depth === lastDepth && parts.length > 0) {
        parts.push('+');
      }

      parts.push(label);
      lastDepth = depth;

      if (!isSelfClosing) {
        stack.push(tagName);
      }
    }
  }

  // Clean up leading separators
  let skeleton = parts.join('');
  if (skeleton.startsWith('>') || skeleton.startsWith('+')) {
    skeleton = skeleton.slice(1);
  }

  return skeleton || 'empty';
}

/**
 * Infer a semantic role from a tag name and its attributes.
 */
function inferSemanticRole(tagName: string, fullTag: string): string | null {
  const lower = fullTag.toLowerCase();

  // Headings
  if (/^h[1-6]$/.test(tagName)) return 'heading';

  // Interactive - check specific patterns first, then defaults
  if (tagName === 'button' && lower.includes('link')) return 'link';
  if (tagName === 'button') return 'button';
  if (tagName === 'a' && lower.includes('button')) return 'button';
  if (tagName === 'a') return 'link';

  // Form elements
  if (['input', 'textarea', 'select'].includes(tagName)) return 'input';
  if (tagName === 'form') return 'form';
  if (tagName === 'label') return 'label';

  // Content
  if (tagName === 'p') return 'body';
  if (tagName === 'span' && lower.includes('badge')) return 'badge';
  if (tagName === 'img' || tagName === 'picture') return 'media';
  if (tagName === 'video' || tagName === 'audio') return 'media';
  if (tagName === 'svg') return 'icon';

  // Layout
  if (tagName === 'nav') return 'navigation';
  if (tagName === 'header') return 'header';
  if (tagName === 'footer') return 'footer';
  if (tagName === 'main') return 'main';
  if (tagName === 'section') return 'section';
  if (tagName === 'article') return 'article';
  if (tagName === 'aside') return 'sidebar';

  // Lists
  if (tagName === 'ul' || tagName === 'ol') return 'list';
  if (tagName === 'li') return 'item';

  // Tables
  if (tagName === 'table') return 'table';
  if (tagName === 'tr') return 'row';
  if (tagName === 'td' || tagName === 'th') return 'cell';

  // Generic containers — try to infer from classes
  if (tagName === 'div') {
    if (lower.includes('flex') || lower.includes('grid')) return 'layout';
    if (lower.includes('card')) return 'card';
    if (lower.includes('modal') || lower.includes('dialog')) return 'modal';
    if (lower.includes('container') || lower.includes('wrapper')) return 'container';
    return null; // Generic div, no role
  }

  return null;
}

/**
 * Hash a skeleton string to create a consistent fingerprint.
 */
export function hashSkeleton(skeleton: string): string {
  return createHash('sha256').update(skeleton).digest('hex').slice(0, 16);
}

/**
 * Extract skeleton and hash from code in one step.
 */
export function fingerprint(code: string): { skeleton: string; hash: string } {
  const skeleton = extractSkeleton(code);
  return { skeleton, hash: hashSkeleton(skeleton) };
}

/**
 * Check if a pattern meets promotion criteria.
 */
export function isPromotable(pattern: ICodePattern): boolean {
  return pattern.frequency >= 3 && pattern.avgScore > 0.5 && !pattern.promoted;
}
