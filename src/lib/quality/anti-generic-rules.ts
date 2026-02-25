import type { IComponentSnippet } from '../design-references/component-registry/types.js';

export interface IValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

const RAW_COLOR_PATTERN =
  /\b(?:bg|text|border|ring|shadow)-(?:red|blue|green|yellow|purple|pink|indigo|violet|cyan|teal|orange|amber|lime|emerald|fuchsia|rose|sky)-\d{2,3}\b/;

const PLACEHOLDER_PATTERNS = [
  /lorem ipsum/i,
  /your amazing feature/i,
  /click here/i,
  /sample text/i,
  />\s*placeholder text/i,
  />\s*type here/i,
  /todo:/i,
  /xxx/i,
  /\bexample\.com\b/i,
];

export function validateSnippet(snippet: IComponentSnippet): IValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  validateSemanticColors(snippet, errors);
  validateAntiGenericMarkers(snippet, errors);
  validateCraftDetails(snippet, errors);
  validateInspirationSource(snippet, errors);
  validateTypographyIntentionality(snippet, warnings);
  validateNoPlaceholderContent(snippet, errors);

  return { valid: errors.length === 0, errors, warnings };
}

function validateSemanticColors(snippet: IComponentSnippet, errors: string[]): void {
  const allClasses = Object.values(snippet.tailwindClasses).join(' ');
  const match = RAW_COLOR_PATTERN.exec(allClasses);
  if (match) {
    errors.push(`Raw color literal "${match[0]}" found. ` + 'Use semantic tokens (bg-primary, text-foreground, etc.)');
  }
}

function validateAntiGenericMarkers(snippet: IComponentSnippet, errors: string[]): void {
  const markers = snippet.quality?.antiGeneric ?? [];
  if (markers.length < 2) {
    errors.push(`Requires 2+ antiGeneric markers, found ${markers.length}`);
  }
}

function validateCraftDetails(snippet: IComponentSnippet, errors: string[]): void {
  const details = snippet.quality?.craftDetails ?? [];
  if (details.length < 2) {
    errors.push(`Requires 2+ craftDetails, found ${details.length}`);
  }
}

function validateInspirationSource(snippet: IComponentSnippet, errors: string[]): void {
  const source = snippet.quality?.inspirationSource ?? '';
  if (!source.trim()) {
    errors.push('Missing inspirationSource');
  }
}

function validateTypographyIntentionality(snippet: IComponentSnippet, warnings: string[]): void {
  const allClasses = Object.values(snippet.tailwindClasses).join(' ');
  const hasTypo = /(?:font-|text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)|tracking-|leading-)/.test(
    allClasses
  );
  if (!hasTypo) {
    warnings.push('No typography classes found — consider font/tracking/leading');
  }
}

function validateNoPlaceholderContent(snippet: IComponentSnippet, errors: string[]): void {
  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(snippet.jsx)) {
      errors.push(`Placeholder content detected matching ${pattern.source}`);
      return;
    }
  }
}

export function validateSnippetStrict(snippet: IComponentSnippet): IValidationResult {
  const base = validateSnippet(snippet);
  const errors = [...base.errors];
  const warnings = [...base.warnings];

  if (!snippet.a11y?.focusVisible) {
    errors.push('focusVisible must be true for strict validation');
  }
  if (!snippet.a11y?.reducedMotion) {
    errors.push('reducedMotion must be true for strict validation');
  }
  if ((snippet.a11y?.ariaAttributes?.length ?? 0) === 0) {
    warnings.push('No ARIA attributes specified');
  }

  return { valid: errors.length === 0, errors, warnings };
}
