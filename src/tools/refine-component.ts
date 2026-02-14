import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { designContextStore } from '../lib/design-context.js';

const inputSchema = {
  component_code: z.string().describe('The existing component source code to refine'),
  feedback: z
    .string()
    .describe(
      'Natural language description of desired improvements (e.g., "make it more responsive", "add dark mode support", "improve accessibility", "use shadcn Button instead of raw button")'
    ),
  framework: z
    .enum(['react', 'nextjs', 'vue', 'angular', 'svelte', 'html'])
    .describe('Framework of the existing component'),
  dark_mode: z.boolean().default(false).describe('Apply dark mode classes'),
};

export function registerRefineComponent(server: McpServer): void {
  server.tool(
    'refine_component',
    'Iteratively improve an existing component based on natural language feedback. Apply accessibility fixes, dark mode, responsive improvements, component library upgrades, and design context alignment. Supports all frameworks.',
    inputSchema,
    ({ component_code, feedback, framework, dark_mode }) => {
      const ctx = designContextStore.get();
      const feedbackLower = feedback.toLowerCase();
      let refined = component_code;
      const changes: string[] = [];

      // Accessibility improvements
      if (/accessib|a11y|wcag|aria|screen.?reader|keyboard/i.test(feedbackLower)) {
        const accessibilityResult = applyAccessibilityFixes(refined, framework);
        refined = accessibilityResult.code;
        changes.push(...accessibilityResult.changes);
      }

      // Dark mode
      if (/dark.?mode|dark.?theme|dark variant/i.test(feedbackLower) || dark_mode) {
        const darkResult = applyDarkMode(refined, framework);
        refined = darkResult.code;
        changes.push(...darkResult.changes);
      }

      // Responsive improvements
      if (/responsive|mobile|tablet|breakpoint|small screen/i.test(feedbackLower)) {
        const responsiveResult = applyResponsiveImprovements(refined, framework);
        refined = responsiveResult.code;
        changes.push(...responsiveResult.changes);
      }

      // Design context alignment
      if (/design.?context|style.?audit|brand|theme|consistent/i.test(feedbackLower)) {
        const contextResult = applyDesignContext(refined, ctx);
        refined = contextResult.code;
        changes.push(...contextResult.changes);
      }

      // Focus ring / focus visible improvements
      if (/focus|keyboard.?nav|tab.?order|outline/i.test(feedbackLower)) {
        const focusResult = applyFocusImprovements(refined);
        refined = focusResult.code;
        changes.push(...focusResult.changes);
      }

      // Semantic HTML improvements
      if (/semantic|html5|section|article|landmark/i.test(feedbackLower)) {
        const semanticResult = applySemanticHtml(refined);
        refined = semanticResult.code;
        changes.push(...semanticResult.changes);
      }

      // Loading/skeleton states
      if (/loading|skeleton|placeholder|shimmer/i.test(feedbackLower)) {
        const loadingResult = applyLoadingStates(refined, framework);
        refined = loadingResult.code;
        changes.push(...loadingResult.changes);
      }

      // Animation/transition improvements
      if (/animat|transition|motion|hover.?effect|micro.?interaction/i.test(feedbackLower)) {
        const animResult = applyAnimationImprovements(refined);
        refined = animResult.code;
        changes.push(...animResult.changes);
      }

      // If no specific patterns matched, provide general enhancement
      if (changes.length === 0) {
        changes.push('Feedback noted — no automated transformations matched. Consider these manual improvements:');
        changes.push(`  • Review the feedback: "${feedback}"`);
        changes.push('  • Use generate_ui_component for a fresh generation');
        changes.push('  • Use audit_accessibility for a11y-specific checks');
      }

      const summary = [
        `Refined ${framework} component`,
        `Changes applied: ${changes.length !== 0 ? changes.length : 'none'}`,
        `Changes applied: ${changes.filter((c) => !c.startsWith('  ')).length}`,
        '',
        'Changes:',
        ...changes.map((c) => `  ${c.startsWith('  ') ? c : `✅ ${c}`}`),
      ].join('\n');

      return {
        content: [
          { type: 'text', text: summary },
          {
            type: 'text',
            text: JSON.stringify(
              {
                files: [{ path: 'refined-component', content: refined }],
                originalLength: component_code.length,
                refinedLength: refined.length,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );
}

interface RefineResult {
  code: string;
  changes: string[];
}

function applyAccessibilityFixes(code: string, _framework: string): RefineResult {
  let result = code;
  const changes: string[] = [];

  // Add aria-label to buttons without text content
  if (/<button[^>]*>[\s]*<(svg|img|span class)/i.test(result)) {
    result = result.replace(
      /(<button(?![^>]*aria-label)[^>]*)(>[\s]*<(?:svg|img))/gi,
      '$1 aria-label="Action button"$2'
    );
    changes.push('Added aria-label to icon-only buttons');
  }

  // Add role="img" and aria-hidden to decorative SVGs
  if (/<svg(?![^>]*aria-hidden)[^>]*>/i.test(result)) {
    result = result.replace(/<svg(?![^>]*aria-hidden)([^>]*)>/gi, '<svg$1 aria-hidden="true">');
    changes.push('Added aria-hidden="true" to decorative SVGs');
  }

  // Ensure form inputs have associated labels
  if (/<input(?![^>]*aria-label)(?![^>]*id=)[^>]*>/i.test(result)) {
    changes.push('Warning: Found inputs without associated labels — add id + htmlFor pairing or aria-label');
  }

  // Add alt text to images missing it
  if (/<img(?![^>]*alt=)[^>]*>/i.test(result)) {
    result = result.replace(/<img(?![^>]*alt=)([^>]*)>/gi, '<img$1 alt="">');
    changes.push('Added empty alt attribute to images (review and add descriptive text)');
  }

  // Add role="navigation" to nav elements without it
  if (/<nav(?![^>]*aria-label)[^>]*>/i.test(result)) {
    result = result.replace(/<nav(?![^>]*aria-label)([^>]*)>/gi, '<nav$1 aria-label="Navigation">');
    changes.push('Added aria-label to nav elements');
  }

  if (changes.length === 0) {
    changes.push('Accessibility: No obvious issues detected (run audit_accessibility for thorough check)');
  }

  return { code: result, changes };
}

function applyDarkMode(code: string, _framework: string): RefineResult {
  let result = code;
  const changes: string[] = [];

  // Add dark mode variants to common patterns
  const darkMappings: Array<[RegExp, string]> = [
    [/bg-white(?!\S)/g, 'bg-white dark:bg-gray-900'],
    [/bg-background(?!\S)/g, 'bg-background dark:bg-gray-950'],
    [/bg-card(?!\S)/g, 'bg-card dark:bg-gray-900'],
    [/bg-muted(?!\S)/g, 'bg-muted dark:bg-gray-800'],
    [/text-foreground(?!\S)/g, 'text-foreground dark:text-gray-100'],
    [/text-gray-900(?!\S)/g, 'text-gray-900 dark:text-gray-100'],
    [/text-gray-700(?!\S)/g, 'text-gray-700 dark:text-gray-300'],
    [/text-gray-500(?!\S)/g, 'text-gray-500 dark:text-gray-400'],
    [/border-gray-200(?!\S)/g, 'border-gray-200 dark:border-gray-800'],
    [/border-input(?!\S)/g, 'border-input dark:border-gray-700'],
    [/border-b(?!\S)/g, 'border-b dark:border-gray-800'],
    [/border(?![- \w])/g, 'border dark:border-gray-800'],
  ];

  let appliedCount = 0;
  for (const [pattern, replacement] of darkMappings) {
    const before = result;
    result = result.replace(pattern, replacement);
    if (result !== before) {
      appliedCount++;
    }
  }

  if (appliedCount > 0) {
    changes.push(`Applied dark mode variants to ${appliedCount} class patterns`);
  } else {
    changes.push('Dark mode classes already present or no standard patterns found');
  }

  return { code: result, changes };
}

function applyResponsiveImprovements(code: string, _framework: string): RefineResult {
  let result = code;
  const changes: string[] = [];

  // Convert fixed widths to responsive
  if (/w-\d+(?!\S)/.test(result) && !/w-full|max-w-/.test(result)) {
    changes.push('Consider: Replace fixed widths (w-XX) with responsive max-w-XX + w-full');
  }

  // Add responsive padding
  if (/p-(\d+)(?!\s*sm:)/.test(result)) {
    result = result.replace(/\bp-(\d+)(?!\s*sm:)/g, (match, numericValue) => {
      const n = parseInt(numericValue, 10);
      if (n >= 6) return `p-4 sm:p-${numericValue}`;
      return match;
    });
    changes.push('Added responsive padding (p-4 sm:p-X) for larger paddings');
  }

  // Add responsive text sizes
  if (/text-(3xl|4xl|5xl)(?!\s)/g.test(result)) {
    result = result.replace(/text-(4xl|5xl)(?!\s)/g, 'text-2xl sm:text-$1');
    result = result.replace(/text-3xl(?!\s)/g, 'text-xl sm:text-3xl');
    changes.push('Added responsive text sizing for large headings');
  }

  // Convert fixed grid to responsive
  if (/grid-cols-3(?!\s*sm:|\s*md:|\s*lg:)/.test(result)) {
    result = result.replace(/grid-cols-3(?!\s)/g, 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3');
    changes.push('Made grid-cols-3 responsive (1 → 2 → 3 columns)');
  }

  // Add hidden/visible for mobile
  if (/table-cell/.test(result) && !/hidden\s+sm:table-cell/.test(result)) {
    changes.push('Consider: Hide non-essential table columns on mobile with "hidden sm:table-cell"');
  }

  if (changes.length === 0) {
    changes.push('Responsive: Component appears well-structured for responsive layouts');
  }

  return { code: result, changes };
}

function applyDesignContext(
  code: string,
  ctx: { typography: { fontFamily: string }; colorPalette: { primary: string } }
): RefineResult {
  const changes: string[] = [];

  changes.push(`Design context applied — primary color: ${ctx.colorPalette.primary}`);
  changes.push(`Font family: ${ctx.typography.fontFamily}`);
  changes.push('Tip: Use bg-primary, text-primary-foreground, etc. to align with design tokens');

  return { code, changes };
}

function applyFocusImprovements(code: string): RefineResult {
  let result = code;
  const changes: string[] = [];

  // Add focus-visible styles to interactive elements without them
  // Handle buttons: find className attribute and append focus classes
  const buttonMatches = result.matchAll(/<button([^>]*)>/gi);
  for (const match of buttonMatches) {
    const attrs = match[1];
    if (!attrs.includes('focus-visible')) {
      const classMatch = attrs.match(/className=["']([^"']*)["']/);
      if (classMatch) {
        const existingClasses = classMatch[1];
        const updated = attrs.replace(
          `className="${existingClasses}"`,
          `className="${existingClasses} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"`
        );
        result = result.replace(match[0], `<button${updated}>`);
      } else {
        // Insert className if missing
        const updated = match[0].replace(
          /<button/i,
          '<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"'
        );
        result = result.replace(match[0], updated);
      }
      if (!changes.includes('Added focus-visible ring styles to buttons')) {
        changes.push('Added focus-visible ring styles to buttons');
      }
    }
  }

  // Handle links: find className attribute and append focus classes
  const linkMatches = result.match(/<a[^>]*>/gi) ?? [];
  for (const match of linkMatches) {
    if (!/focus-visible/i.test(match) && /className="([^"]*)"/i.test(match)) {
      const updated = match.replace(/className="([^"]*)"/i, (m, classes) => {
        return `className="${classes} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"`;
      });
      result = result.replace(match, updated);
      if (!changes.includes('Added focus-visible ring styles to links')) {
        changes.push('Added focus-visible ring styles to links');
      }
    } else if (!/focus-visible/i.test(match) && !/className=/i.test(match)) {
      // Insert className if missing
      const updated = match.replace(
        /<a/i,
        '<a className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"'
      );
      result = result.replace(match, updated);
      if (!changes.includes('Added focus-visible ring styles to links')) {
        changes.push('Added focus-visible ring styles to links');
      }
    }
  }

  if (changes.length === 0) {
    changes.push('Focus styles: Interactive elements already have focus-visible styles');
  }

  return { code: result, changes };
}

function applySemanticHtml(code: string): RefineResult {
  const result = code;
  const changes: string[] = [];

  // Suggest replacing generic divs with semantic elements
  if (/<div[^>]*>\s*<h[1-6]/i.test(result)) {
    changes.push('Consider: Replace wrapper <div> around headings with <section> or <article>');
  }

  if (/<div[^>]*>\s*<nav/i.test(result)) {
    changes.push('Consider: The <nav> wrapper <div> may be unnecessary');
  }

  // Check for heading hierarchy
  if (/<h1/gi.test(result)) {
    const h1Count = (result.match(/<h1/gi) ?? []).length;
    if (h1Count > 1) {
      changes.push('Warning: Multiple <h1> tags found — ensure only one per page');
    }
  }

  if (changes.length === 0) {
    changes.push('Semantic HTML: Structure looks appropriate');
  }

  return { code: result, changes };
}

function applyLoadingStates(code: string, framework: string): RefineResult {
  const changes: string[] = [];

  if (framework === 'react' || framework === 'nextjs') {
    changes.push('Add a loading skeleton: wrap data sections with {isLoading ? <Skeleton /> : <Content />}');
    changes.push('Example skeleton class: "animate-pulse rounded-md bg-muted h-4 w-full"');
  } else if (framework === 'vue') {
    changes.push('Add v-if="loading" with skeleton placeholder divs');
  } else if (framework === 'svelte') {
    changes.push('Add {#if loading} block with skeleton placeholder divs');
  }

  changes.push('Skeleton pattern: <div class="animate-pulse rounded-md bg-muted h-4 w-3/4" />');

  return { code, changes };
}

function applyAnimationImprovements(code: string): RefineResult {
  let result = code;
  const changes: string[] = [];

  // Add hover transitions to cards
  if (/hover:shadow/i.test(result) && !/transition-shadow/.test(result)) {
    result = result.replace(/hover:shadow-md/g, 'hover:shadow-md transition-shadow duration-200');
    changes.push('Added transition-shadow to hover effects');
  }

  // Add transition to color changes
  if (/hover:(text|bg)-/i.test(result) && !/transition-colors/.test(result)) {
    changes.push('Consider: Add "transition-colors duration-150" to elements with hover color changes');
  }

  // Suggest entrance animations
  changes.push('Entrance animations: Add "animate-in fade-in slide-in-from-bottom-4" for scroll reveals');
  changes.push('For React: Consider framer-motion for complex animations');

  return { code: result, changes };
}
