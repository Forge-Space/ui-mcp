import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { IAccessibilityIssue, IAccessibilityReport, Framework } from '../lib/types.js';
import { embed } from '../lib/ml/embeddings.js';
import { semanticSearch, getEmbeddingCount } from '../lib/ml/embedding-store.js';
import { getDatabase } from '../lib/design-references/database/store.js';
import pino from 'pino';

const a11yLogger = pino({ name: 'audit-accessibility' });

const FRAMEWORK_VALUES = ['react', 'nextjs', 'vue', 'angular', 'svelte', 'html'] as const;

const inputSchema = {
  component_code: z.string().describe('Component source code to audit for accessibility'),
  framework: z.enum(FRAMEWORK_VALUES).describe('Framework of the component'),
  strict: z.boolean().default(false).describe('Enable strict mode for additional WCAG AAA checks'),
};

/**
 * Register the audit_accessibility MCP tool
 *
 * Audits component code for WCAG 2.1 accessibility violations and returns a detailed report.
 *
 * @param server - The MCP server instance to register the tool with
 *
 * **Input Schema:**
 * - `component_code` (string): Component source code to audit
 * - `framework` (enum): Framework of the component (react, nextjs, vue, angular, svelte, html)
 * - `strict` (boolean): Enable strict mode for WCAG AAA checks (default: false)
 *
 * **Behavior:**
 * - Calls `auditAccessibility()` with provided code, framework, and strict mode
 * - Checks: color contrast hints, ARIA attributes, keyboard navigation, semantic HTML,
 *   form labels, focus management, landmarks, image alt text, heading hierarchy, and more
 * - Returns formatted summary with score, issue counts, and detailed issue list
 *
 * **Output:**
 * - Text summary with accessibility score (0-100), emoji indicator, and issue breakdown
 * - JSON report with structured violations array containing:
 *   - `rule`: Rule identifier
 *   - `severity`: error | warning | info
 *   - `message`: Human-readable issue description
 *   - `suggestion`: Remediation guidance
 *   - `wcagCriteria`: WCAG 2.1 criterion reference
 *
 * **Side Effects:**
 * None - pure analysis function
 *
 * @example
 * // Register tool
 * registerAuditAccessibility(server);
 *
 * // Tool returns:
 * // { score: 85, issues: [...], passed: [...], summary: { errors: 2, warnings: 1, info: 0 } }
 */
export function registerAuditAccessibility(server: McpServer): void {
  server.tool(
    'audit_accessibility',
    'Audit a component for WCAG 2.1 accessibility violations. Checks color contrast hints, ARIA attributes, keyboard navigation, semantic HTML, form labels, focus management, and more. Returns issues with severity, suggestions, and WCAG criteria references.',
    inputSchema,
    async ({ component_code, framework, strict }) => {
      const report = auditAccessibility(component_code, framework, strict);

      await enrichIssuesWithRAG(report);

      const scoreEmoji = report.score >= 90 ? '🟢' : report.score >= 70 ? '🟡' : '🔴';

      const summary = [
        `${scoreEmoji} Accessibility Score: ${report.score}/100`,
        '',
        `Errors: ${report.summary.errors} | Warnings: ${report.summary.warnings} | Info: ${report.summary.info}`,
        '',
        ...(report.issues.length > 0
          ? [
              'Issues:',
              ...report.issues.map(
                (issue) =>
                  `  ${severityIcon(issue.severity)} [${issue.rule}] ${issue.message}${issue.wcagCriteria ? ` (${issue.wcagCriteria})` : ''}\n    → ${issue.suggestion}`
              ),
            ]
          : ['✅ No accessibility issues found!']),
        '',
        ...(report.passed.length > 0 ? ['Passed checks:', ...report.passed.map((p) => `  ✅ ${p}`)] : []),
      ].join('\n');

      return {
        content: [
          { type: 'text', text: summary },
          {
            type: 'text',
            text: JSON.stringify(report, null, 2),
          },
        ],
      };
    }
  );
}

function severityIcon(severity: string): string {
  switch (severity) {
    case 'error':
      return '🔴';
    case 'warning':
      return '🟡';
    case 'info':
      return '🔵';
    default:
      return '⚪';
  }
}

async function enrichIssuesWithRAG(report: IAccessibilityReport): Promise<void> {
  try {
    const db = getDatabase();
    const ruleCount = getEmbeddingCount('rule', db);
    if (ruleCount === 0) return;

    for (const issue of report.issues) {
      const queryVector = await embed(issue.message);
      const matches = semanticSearch(queryVector, 'rule', db, 3, 0.4);

      if (matches.length > 0) {
        const best = matches[0];
        const ruleIdMatch = best.text.match(/a11y rule ([^:]+)/);
        const wcagMatch = best.text.match(/\d+\.\d+\.\d+/);
        const fixMatch = best.text.match(/Fix:\s*(.+)/);

        if (ruleIdMatch) {
          issue.rule = `${issue.rule} (axe: ${ruleIdMatch[1].trim()})`;
        }
        if (wcagMatch && !issue.wcagCriteria) {
          issue.wcagCriteria = `WCAG ${wcagMatch[0]}`;
        }
        if (fixMatch && fixMatch[1].trim().length > issue.suggestion.length) {
          issue.suggestion = fixMatch[1].trim();
        }
      }
    }
  } catch (err) {
    a11yLogger.debug({ error: (err as Error).message }, 'RAG enrichment skipped');
  }
}

export function auditAccessibility(code: string, framework: Framework, strict: boolean): IAccessibilityReport {
  const issues: IAccessibilityIssue[] = [];
  const passed: string[] = [];

  // Normalize attribute names for JSX vs HTML
  const classAttr = framework === 'react' || framework === 'nextjs' ? 'className' : 'class';
  const forAttr = framework === 'react' || framework === 'nextjs' ? 'htmlFor' : 'for';

  // 1. Images without alt text
  checkImageAlt(code, issues, passed);

  // 2. Form inputs without labels
  checkFormLabels(code, forAttr, issues, passed);

  // 3. Buttons without accessible names
  checkButtonNames(code, issues, passed);

  // 4. Missing landmark roles
  checkLandmarks(code, issues, passed);

  // 5. Heading hierarchy
  checkHeadingHierarchy(code, issues, passed);

  // 6. Links without href or descriptive text
  checkLinks(code, issues, passed);

  // 7. Color contrast hints
  checkColorContrast(code, classAttr, issues, passed);

  // 8. Focus management
  checkFocusManagement(code, issues, passed);

  // 9. ARIA usage
  checkAriaUsage(code, issues, passed);

  // 10. Interactive elements keyboard accessibility
  checkKeyboardAccess(code, issues, passed);

  // 11. Tables accessibility
  checkTables(code, issues, passed);

  // 12. Language attribute
  checkLanguage(code, issues, passed);

  // 13. Auto-playing media
  checkAutoPlay(code, issues, passed);

  // Strict mode additional checks
  if (strict) {
    checkStrictMode(code, issues, passed);
  }

  // Calculate score
  const errorWeight = 10;
  const warningWeight = 3;
  const infoWeight = 1;
  const totalDeductions =
    issues.filter((i) => i.severity === 'error').length * errorWeight +
    issues.filter((i) => i.severity === 'warning').length * warningWeight +
    issues.filter((i) => i.severity === 'info').length * infoWeight;

  const score = Math.max(0, Math.min(100, 100 - totalDeductions));

  return {
    score,
    issues,
    summary: {
      errors: issues.filter((i) => i.severity === 'error').length,
      warnings: issues.filter((i) => i.severity === 'warning').length,
      info: issues.filter((i) => i.severity === 'info').length,
    },
    passed,
  };
}

function checkImageAlt(code: string, issues: IAccessibilityIssue[], passed: string[]): void {
  const imgTags = code.match(/<img[^>]*>/gi) ?? [];
  const missingAlt = imgTags.filter((tag) => !/alt=/i.test(tag));

  if (missingAlt.length > 0) {
    issues.push({
      rule: 'img-alt',
      severity: 'error',
      message: `${missingAlt.length} image(s) missing alt attribute`,
      element: missingAlt[0],
      suggestion: 'Add descriptive alt text to all <img> elements. Use alt="" for decorative images.',
      wcagCriteria: 'WCAG 1.1.1 Non-text Content',
    });
  } else if (imgTags.length > 0) {
    passed.push('All images have alt attributes');
  }
}

function checkFormLabels(code: string, forAttr: string, issues: IAccessibilityIssue[], passed: string[]): void {
  const inputs = code.match(/<input[^>]*>/gi) ?? [];
  const visibleInputs = inputs.filter((tag) => !/type=["']hidden["']/i.test(tag));

  const unlabeled = visibleInputs.filter(
    (tag) => !/aria-label=/i.test(tag) && !/aria-labelledby=/i.test(tag) && !/id=/i.test(tag)
  );

  if (unlabeled.length > 0) {
    issues.push({
      rule: 'form-label',
      severity: 'error',
      message: `${unlabeled.length} form input(s) without associated labels`,
      suggestion: `Add <label ${forAttr}="inputId"> or aria-label attribute to each input.`,
      wcagCriteria: 'WCAG 1.3.1 Info and Relationships',
    });
  } else if (visibleInputs.length > 0) {
    passed.push('All form inputs have associated labels');
  }

  // Check for labels with matching for/htmlFor
  const labelForValues = [...code.matchAll(new RegExp(`${forAttr}=["']([^"']+)["']`, 'gi'))].map((m) => m[1]);
  const inputIds = [...code.matchAll(/id=["']([^"']+)["']/gi)].map((m) => m[1]);
  const orphanedLabels = labelForValues.filter((v) => !inputIds.includes(v));

  if (orphanedLabels.length > 0) {
    issues.push({
      rule: 'label-orphan',
      severity: 'warning',
      message: `${orphanedLabels.length} label(s) reference non-existent input IDs: ${orphanedLabels.join(', ')}`,
      suggestion: 'Ensure label for/htmlFor values match input id attributes.',
      wcagCriteria: 'WCAG 1.3.1 Info and Relationships',
    });
  }
}

function checkButtonNames(code: string, issues: IAccessibilityIssue[], passed: string[]): void {
  const buttons = code.match(/<button[^>]*>[\s\S]*?<\/button>/gi) ?? [];
  const unnamed = buttons.filter((btn) => {
    const hasAriaLabel = /aria-label=/i.test(btn);
    const hasTextContent = /<button[^>]*>\s*[^<\s]/i.test(btn);
    const hasChildText = /<button[^>]*>[\s\S]*?[A-Za-z][\s\S]*?<\/button>/i.test(btn);
    return !hasAriaLabel && !hasTextContent && !hasChildText;
  });

  if (unnamed.length > 0) {
    issues.push({
      rule: 'button-name',
      severity: 'error',
      message: `${unnamed.length} button(s) without accessible name`,
      suggestion: 'Add text content or aria-label to all buttons.',
      wcagCriteria: 'WCAG 4.1.2 Name, Role, Value',
    });
  } else if (buttons.length > 0) {
    passed.push('All buttons have accessible names');
  }
}

function checkLandmarks(code: string, issues: IAccessibilityIssue[], passed: string[]): void {
  const hasMain = /<main/i.test(code);
  const hasNav = /<nav/i.test(code);

  if (!hasMain && code.length > 500) {
    issues.push({
      rule: 'landmark-main',
      severity: 'warning',
      message: 'No <main> landmark found',
      suggestion: 'Wrap primary content in a <main> element for screen reader navigation.',
      wcagCriteria: 'WCAG 1.3.1 Info and Relationships',
    });
  } else if (hasMain) {
    passed.push('Main landmark present');
  }

  if (hasNav) {
    const navs = code.match(/<nav[^>]*>/gi) ?? [];
    const unlabeledNavs = navs.filter((n) => !/aria-label/i.test(n));
    if (unlabeledNavs.length > 0 && navs.length > 1) {
      issues.push({
        rule: 'nav-label',
        severity: 'warning',
        message: 'Multiple <nav> elements without unique aria-label',
        suggestion: 'Add unique aria-label to each <nav> when multiple navigation regions exist.',
        wcagCriteria: 'WCAG 1.3.1 Info and Relationships',
      });
    } else {
      passed.push('Navigation landmarks properly labeled');
    }
  }
}

function checkHeadingHierarchy(code: string, issues: IAccessibilityIssue[], passed: string[]): void {
  const headings = [...code.matchAll(/<h([1-6])/gi)].map((m) => parseInt(m[1], 10));

  if (headings.length === 0 && code.length > 300) {
    issues.push({
      rule: 'heading-present',
      severity: 'warning',
      message: 'No heading elements found in component',
      suggestion: 'Add appropriate heading elements (h1-h6) for content structure.',
      wcagCriteria: 'WCAG 1.3.1 Info and Relationships',
    });
    return;
  }

  // Check for skipped levels
  for (let i = 1; i < headings.length; i++) {
    if (headings[i] > headings[i - 1] + 1) {
      issues.push({
        rule: 'heading-order',
        severity: 'warning',
        message: `Heading level skipped: h${headings[i - 1]} → h${headings[i]}`,
        suggestion: `Use sequential heading levels. Consider h${headings[i - 1] + 1} instead of h${headings[i]}.`,
        wcagCriteria: 'WCAG 1.3.1 Info and Relationships',
      });
      break;
    }
  }

  // Check multiple h1
  const h1Count = headings.filter((h) => h === 1).length;
  if (h1Count > 1) {
    issues.push({
      rule: 'heading-one-h1',
      severity: 'warning',
      message: `Multiple h1 elements found (${h1Count})`,
      suggestion: 'Use only one h1 per page. Use h2-h6 for subsections.',
      wcagCriteria: 'WCAG 1.3.1 Info and Relationships',
    });
  } else if (headings.length > 0) {
    passed.push('Heading hierarchy is correct');
  }
}

function checkLinks(code: string, issues: IAccessibilityIssue[], passed: string[]): void {
  const links = code.match(/<a[^>]*>[\s\S]*?<\/a>/gi) ?? [];

  // Check for links with only "#" href
  const hashOnlyLinks = links.filter((link) => /href=["']#["']/i.test(link));
  if (hashOnlyLinks.length > 0) {
    issues.push({
      rule: 'link-valid-href',
      severity: 'info',
      message: `${hashOnlyLinks.length} link(s) with href="#" (placeholder)`,
      suggestion: 'Replace "#" with actual URLs or use <button> for actions.',
      wcagCriteria: 'WCAG 2.4.4 Link Purpose',
    });
  }

  // Check for generic link text
  const genericLinks = links.filter((link) => />\s*(click here|here|read more|more|link)\s*</i.test(link));
  if (genericLinks.length > 0) {
    issues.push({
      rule: 'link-text',
      severity: 'warning',
      message: `${genericLinks.length} link(s) with generic text ("click here", "read more", etc.)`,
      suggestion: 'Use descriptive link text that makes sense out of context.',
      wcagCriteria: 'WCAG 2.4.4 Link Purpose',
    });
  } else if (links.length > 0) {
    passed.push('Link text is descriptive');
  }
}

function checkColorContrast(code: string, classAttr: string, issues: IAccessibilityIssue[], passed: string[]): void {
  // Check for known low-contrast patterns
  const lowContrastPatterns = [
    { pattern: /text-gray-300/i, desc: 'text-gray-300 on light background' },
    { pattern: /text-gray-400(?![\s\S]*dark:)/i, desc: 'text-gray-400 may have low contrast on light backgrounds' },
    { pattern: /text-white[\s\S]{0,50}bg-yellow/i, desc: 'white text on yellow background' },
    { pattern: /text-yellow[\s\S]{0,50}bg-white/i, desc: 'yellow text on white background' },
  ];

  let foundLowContrast = false;
  for (const { pattern, desc } of lowContrastPatterns) {
    if (pattern.test(code)) {
      issues.push({
        rule: 'color-contrast',
        severity: 'warning',
        message: `Potential low contrast: ${desc}`,
        suggestion: 'Ensure text has at least 4.5:1 contrast ratio (3:1 for large text). Use a contrast checker tool.',
        wcagCriteria: 'WCAG 1.4.3 Contrast (Minimum)',
      });
      foundLowContrast = true;
    }
  }

  if (!foundLowContrast) {
    passed.push('No obvious low-contrast patterns detected (verify with contrast checker)');
  }
}

function checkFocusManagement(code: string, issues: IAccessibilityIssue[], passed: string[]): void {
  const interactiveElements = [
    ...(code.match(/<button[^>]*>/gi) ?? []),
    ...(code.match(/<a[^>]*>/gi) ?? []),
    ...(code.match(/<input[^>]*>/gi) ?? []),
    ...(code.match(/<select[^>]*>/gi) ?? []),
    ...(code.match(/<textarea[^>]*>/gi) ?? []),
  ];

  // Check for focus styles in class attributes (Tailwind pattern)
  // Look for focus-visible:, focus:, or :focus in className/class attributes
  const hasFocusClasses = /class(?:Name)?=["'][^"']*(?:\bfocus-visible:|\bfocus:)/i.test(code);

  // Also check for CSS :focus selectors in style tags or inline styles
  const hasFocusCss = /:focus(?:-visible|-within)?[\s{]/i.test(code);

  if (interactiveElements.length > 0 && !hasFocusClasses && !hasFocusCss) {
    issues.push({
      rule: 'focus-visible',
      severity: 'warning',
      message: 'No focus-visible styles found on interactive elements',
      suggestion:
        'Add focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring to buttons, links, and inputs.',
      wcagCriteria: 'WCAG 2.4.7 Focus Visible',
    });
  } else if (interactiveElements.length > 0) {
    passed.push('Interactive elements have focus styles');
  }

  // Check for tabindex > 0
  if (/tabindex=["'][1-9]/i.test(code)) {
    issues.push({
      rule: 'tabindex-positive',
      severity: 'error',
      message: 'Positive tabindex values found',
      suggestion: 'Avoid tabindex > 0. Use tabindex="0" or "-1" only. Rely on DOM order for tab sequence.',
      wcagCriteria: 'WCAG 2.4.3 Focus Order',
    });
  }
}

function checkAriaUsage(code: string, issues: IAccessibilityIssue[], passed: string[]): void {
  // Check for aria-labelledby referencing existing IDs
  const ariaLabelledBy = [...code.matchAll(/aria-labelledby=["']([^"']+)["']/gi)].map((m) => m[1]);
  const allIds = [...code.matchAll(/id=["']([^"']+)["']/gi)].map((m) => m[1]);

  for (const ref of ariaLabelledBy) {
    if (!allIds.includes(ref)) {
      issues.push({
        rule: 'aria-valid-ref',
        severity: 'error',
        message: `aria-labelledby references non-existent id: "${ref}"`,
        suggestion: `Ensure an element with id="${ref}" exists in the document.`,
        wcagCriteria: 'WCAG 4.1.2 Name, Role, Value',
      });
    }
  }

  // Check modals for proper aria attributes
  if (/role=["']dialog["']/i.test(code)) {
    if (!/aria-modal/i.test(code)) {
      issues.push({
        rule: 'dialog-aria',
        severity: 'warning',
        message: 'Dialog missing aria-modal="true"',
        suggestion: 'Add aria-modal="true" to dialog elements to indicate modal behavior.',
        wcagCriteria: 'WCAG 4.1.2 Name, Role, Value',
      });
    }
    if (!/aria-labelledby|aria-label/i.test(code.match(/role=["']dialog["'][^>]*/i)?.[0] ?? '')) {
      issues.push({
        rule: 'dialog-label',
        severity: 'error',
        message: 'Dialog missing accessible name (aria-labelledby or aria-label)',
        suggestion: 'Add aria-labelledby pointing to the dialog title, or aria-label.',
        wcagCriteria: 'WCAG 4.1.2 Name, Role, Value',
      });
    } else {
      passed.push('Dialog has proper ARIA attributes');
    }
  }
}

function checkKeyboardAccess(code: string, issues: IAccessibilityIssue[], passed: string[]): void {
  // Check for onClick on non-interactive elements without keyboard handlers
  if (/onClick/i.test(code)) {
    const divClicks = code.match(/<div[^>]*onClick/gi) ?? [];
    const spanClicks = code.match(/<span[^>]*onClick/gi) ?? [];
    const nonInteractive = [...divClicks, ...spanClicks];

    if (nonInteractive.length > 0) {
      const hasKeyboard = nonInteractive.some((el) => /onKeyDown|onKeyUp|onKeyPress|role=["']button["']/i.test(el));
      if (!hasKeyboard) {
        issues.push({
          rule: 'click-keyboard',
          severity: 'error',
          message: `${nonInteractive.length} non-interactive element(s) with onClick but no keyboard handler`,
          suggestion: 'Add role="button", tabIndex={0}, and onKeyDown handler, or use a <button> element instead.',
          wcagCriteria: 'WCAG 2.1.1 Keyboard',
        });
      }
    }
  } else {
    passed.push('No keyboard accessibility issues with click handlers');
  }
}

function checkTables(code: string, issues: IAccessibilityIssue[], passed: string[]): void {
  if (/<table/i.test(code)) {
    if (!/<th/i.test(code)) {
      issues.push({
        rule: 'table-header',
        severity: 'error',
        message: 'Table without header cells (<th>)',
        suggestion: 'Add <th> elements with scope="col" or scope="row" to define table headers.',
        wcagCriteria: 'WCAG 1.3.1 Info and Relationships',
      });
    }

    if (!/<caption/i.test(code) && !/aria-label/i.test(code.match(/<table[^>]*>/i)?.[0] ?? '')) {
      issues.push({
        rule: 'table-caption',
        severity: 'info',
        message: 'Table without <caption> or aria-label',
        suggestion: 'Add a <caption> element or aria-label to describe the table purpose.',
        wcagCriteria: 'WCAG 1.3.1 Info and Relationships',
      });
    }

    if (/<th[^>]*scope/i.test(code)) {
      passed.push('Table headers have scope attributes');
    }
  }
}

function checkLanguage(code: string, issues: IAccessibilityIssue[], passed: string[]): void {
  if (/<html/i.test(code)) {
    if (!/<html[^>]*lang=/i.test(code)) {
      issues.push({
        rule: 'html-lang',
        severity: 'error',
        message: 'Missing lang attribute on <html> element',
        suggestion: 'Add lang="en" (or appropriate language code) to the <html> element.',
        wcagCriteria: 'WCAG 3.1.1 Language of Page',
      });
    } else {
      passed.push('HTML lang attribute present');
    }
  }
}

function checkAutoPlay(code: string, issues: IAccessibilityIssue[], _passed: string[]): void {
  if (/autoplay|autoPlay/i.test(code)) {
    issues.push({
      rule: 'no-autoplay',
      severity: 'warning',
      message: 'Auto-playing media detected',
      suggestion:
        'Avoid auto-playing media. If necessary, provide controls to pause/stop and ensure no audio plays automatically.',
      wcagCriteria: 'WCAG 1.4.2 Audio Control',
    });
  } else {
    _passed.push('no-autoplay');
  }
}

function checkStrictMode(code: string, issues: IAccessibilityIssue[], _passed: string[]): void {
  // AAA: Enhanced contrast
  if (/text-muted-foreground/i.test(code)) {
    issues.push({
      rule: 'contrast-enhanced',
      severity: 'info',
      message: 'Muted text colors may not meet AAA contrast ratio (7:1)',
      suggestion: 'For WCAG AAA, ensure all text has at least 7:1 contrast ratio.',
      wcagCriteria: 'WCAG 1.4.6 Contrast (Enhanced)',
    });
  }

  // AAA: Text spacing
  issues.push({
    rule: 'text-spacing',
    severity: 'info',
    message: 'Verify text spacing meets AAA requirements',
    suggestion:
      'Ensure content adapts to: line-height 1.5x, paragraph spacing 2x, letter-spacing 0.12em, word-spacing 0.16em.',
    wcagCriteria: 'WCAG 1.4.12 Text Spacing',
  });

  // Check for target size (44x44 minimum)
  if (/p-1|p-0\.5|px-1|py-0\.5/i.test(code)) {
    issues.push({
      rule: 'target-size',
      severity: 'info',
      message: 'Some interactive elements may have small touch targets',
      suggestion: 'Ensure touch targets are at least 44x44 CSS pixels for WCAG AAA.',
      wcagCriteria: 'WCAG 2.5.5 Target Size (Enhanced)',
    });
  }
}
