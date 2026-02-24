import type { IComponentSnippet } from '../design-references/component-registry/types.js';

interface GenerationRecord {
  snippetId: string;
  type: string;
  variant: string;
  timestamp: number;
}

const MAX_HISTORY = 50;
const recent: GenerationRecord[] = [];

export function recordGeneration(snippet: IComponentSnippet): void {
  recent.push({
    snippetId: snippet.id,
    type: snippet.type,
    variant: snippet.variant,
    timestamp: Date.now(),
  });
  if (recent.length > MAX_HISTORY) recent.shift();
}

export function isDuplicateConsecutive(type: string, variant: string): boolean {
  if (recent.length === 0) return false;
  const last = recent[recent.length - 1];
  return last.type === type && last.variant === variant;
}

export function suggestDiverseVariant(type: string, available: string[]): string | undefined {
  const used = recent.filter((r) => r.type === type).map((r) => r.variant);
  const unused = available.filter((v) => !used.includes(v));
  return unused[0] ?? available[0];
}

export function clearHistory(): void {
  recent.length = 0;
}
