import type { IDesignContext } from './types.js';
import { getPreset, DEFAULT_PRESET, listPresets } from './design-references/index.js';

const DEFAULT_CONTEXT: IDesignContext = getPreset(DEFAULT_PRESET);

function deepMerge(target: IDesignContext, source: Partial<IDesignContext>): IDesignContext {
  const result = structuredClone(target);
  const res = result as unknown as Record<string, unknown>;
  const src = source as unknown as Record<string, unknown>;

  for (const key of Object.keys(src)) {
    const sourceVal = src[key];
    const targetVal = res[key];

    if (sourceVal === undefined) {
      continue;
    }

    if (
      sourceVal !== null &&
      typeof sourceVal === 'object' &&
      !Array.isArray(sourceVal) &&
      targetVal !== null &&
      targetVal !== undefined &&
      typeof targetVal === 'object' &&
      !Array.isArray(targetVal)
    ) {
      // Recursively merge nested objects
      res[key] = deepMergeObjects(targetVal as Record<string, unknown>, sourceVal as Record<string, unknown>);
    } else {
      res[key] = structuredClone(sourceVal);
    }
  }
  return result;
}

function deepMergeObjects(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };

  for (const key of Object.keys(source)) {
    const sourceVal = source[key];
    const targetVal = result[key];

    if (sourceVal === undefined) {
      continue;
    }

    if (
      sourceVal !== null &&
      typeof sourceVal === 'object' &&
      !Array.isArray(sourceVal) &&
      targetVal !== null &&
      targetVal !== undefined &&
      typeof targetVal === 'object' &&
      !Array.isArray(targetVal)
    ) {
      result[key] = deepMergeObjects(targetVal as Record<string, unknown>, sourceVal as Record<string, unknown>);
    } else {
      result[key] = sourceVal;
    }
  }

  return result;
}

class DesignContextStore {
  private context: IDesignContext;

  constructor() {
    this.context = structuredClone(DEFAULT_CONTEXT);
  }

  get(): IDesignContext {
    return structuredClone(this.context);
  }

  set(ctx: IDesignContext): void {
    this.context = structuredClone(ctx);
  }

  update(partial: Partial<IDesignContext>): void {
    this.context = deepMerge(this.context, partial);
  }

  selectPreset(name: string): IDesignContext {
    this.context = getPreset(name);
    return structuredClone(this.context);
  }

  listPresets(): string[] {
    return listPresets();
  }

  reset(): void {
    this.context = getPreset(DEFAULT_PRESET);
  }
}

export const designContextStore = new DesignContextStore();
export { DEFAULT_CONTEXT };
