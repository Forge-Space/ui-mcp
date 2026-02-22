import type { IDesignContext } from '../lib/types.js';
import { designContextStore, DEFAULT_CONTEXT } from '../lib/design-context.js';
import { getPreset } from '../lib/design-references/index.js';

/**
 * Design Service - Handles all design context operations
 * Provides a clean interface for design context management with proper error handling
 */
export class DesignService {
  /**
   * Get the current design context
   * @returns A clone of the current design context
   */
  getCurrentContext(): IDesignContext {
    return designContextStore.get();
  }

  /**
   * Update the design context with partial changes
   * @param updates Partial design context updates
   * @returns The updated design context
   */
  updateContext(updates: Partial<IDesignContext>): IDesignContext {
    designContextStore.update(updates);
    return designContextStore.get();
  }

  /**
   * Replace the entire design context
   * @param context New design context to set
   * @returns The new design context
   */
  setContext(context: IDesignContext): IDesignContext {
    designContextStore.set(context);
    return designContextStore.get();
  }

  /**
   * Reset the design context to default values
   * @returns The reset design context
   */
  resetContext(): IDesignContext {
    designContextStore.reset();
    return designContextStore.get();
  }

  /**
   * Select a preset by name and apply it
   * @param presetName Name of the preset to apply
   * @returns The applied preset context
   */
  selectPreset(presetName: string): IDesignContext {
    const context = designContextStore.selectPreset(presetName);
    return context;
  }

  /**
   * Get list of available preset names
   * @returns Array of available preset names
   */
  listPresets(): string[] {
    return designContextStore.listPresets();
  }

  /**
   * Get a specific preset without applying it
   * @param presetName Name of the preset to retrieve
   * @returns The preset context
   */
  getPreset(presetName: string): IDesignContext {
    return getPreset(presetName);
  }

  /**
   * Get the default design context
   * @returns The default design context
   */
  getDefaultContext(): IDesignContext {
    return DEFAULT_CONTEXT;
  }

  /**
   * Validate a design context for required fields
   * @param context Design context to validate
   * @returns Validation result with any errors
   */
  validateContext(context: IDesignContext): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check required color palette fields
    if (!context.colorPalette?.primary) {
      errors.push('Primary color is required');
    }
    if (!context.colorPalette?.background) {
      errors.push('Background color is required');
    }
    if (!context.colorPalette?.foreground) {
      errors.push('Foreground color is required');
    }

    // Check typography
    if (!context.typography?.fontFamily) {
      errors.push('Font family is required');
    }
    if (!context.typography?.headingFont) {
      errors.push('Heading font is required');
    }

    // Check spacing
    if (!context.spacing?.unit) {
      errors.push('Spacing unit is required');
    }

    // Validate color format (hex)
    const hexColorRegex = /^#[0-9a-f]{6}$/i;
    if (context.colorPalette?.primary && !hexColorRegex.test(context.colorPalette.primary)) {
      errors.push('Primary color must be a valid hex color (#RRGGBB)');
    }
    if (context.colorPalette?.background && !hexColorRegex.test(context.colorPalette.background)) {
      errors.push('Background color must be a valid hex color (#RRGGBB)');
    }
    if (context.colorPalette?.foreground && !hexColorRegex.test(context.colorPalette.foreground)) {
      errors.push('Foreground color must be a valid hex color (#RRGGBB)');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Merge multiple design contexts, with later contexts taking precedence
   * @param contexts Array of contexts to merge
   * @returns Merged design context
   */
  mergeContexts(...contexts: Partial<IDesignContext>[]): IDesignContext {
    let merged = this.getCurrentContext();

    for (const context of contexts) {
      if (context) {
        merged = { ...merged, ...context };
      }
    }

    // Update store once with merged result
    designContextStore.update(merged);
    return designContextStore.get();
  }

  /**
   * Extract design tokens from context for external use
   * @param context Design context to extract from (uses current if not provided)
   * @returns Object with design tokens
   */
  extractDesignTokens(context?: IDesignContext): {
    colors: Record<string, string>;
    typography: Record<string, string>;
    spacing: Record<string, string>;
    borderRadius: Record<string, string>;
  } {
    const ctx = context || this.getCurrentContext();

    return {
      colors: {
        primary: ctx.colorPalette?.primary ?? '#000000',
        secondary: ctx.colorPalette?.secondary ?? '#ffffff',
        background: ctx.colorPalette?.background ?? '#ffffff',
        foreground: ctx.colorPalette?.foreground ?? '#000000',
        muted: ctx.colorPalette?.muted ?? '#f3f4f6',
        accent: ctx.colorPalette?.accent ?? '#3b82f6',
        destructive: ctx.colorPalette?.destructive ?? '#ef4444',
      },
      typography: {
        fontFamily: ctx.typography?.fontFamily ?? 'Inter, sans-serif',
        headingFont: ctx.typography?.headingFont ?? 'Inter, sans-serif',
        baseFontSize: ctx.typography?.fontSize?.base ?? '1rem',
        headingScale: ctx.typography?.fontSize?.lg ?? '1.125rem',
      },
      spacing: {
        unit: String(ctx.spacing?.unit ?? 4),
        scale: (ctx.spacing?.scale ?? [1, 2, 4, 8]).join(','),
      },
      borderRadius: {
        sm: ctx.borderRadius?.sm ?? '0.25rem',
        md: ctx.borderRadius?.md ?? '0.375rem',
      },
    };
  }
}

// Export singleton instance for backward compatibility
export const designService = new DesignService();
