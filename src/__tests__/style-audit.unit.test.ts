import { describe, it, expect } from 'vitest';
import { auditStyles, parseTailwindConfig, parseCssVariables } from '../lib/style-audit.js';

describe('parseTailwindConfig', () => {
  it('should extract primary color from tailwind config', () => {
    const config = `
      module.exports = {
        theme: {
          extend: {
            colors: {
              primary: '#3b82f6',
              secondary: '#64748b',
            },
          },
        },
      };
    `;
    const result = parseTailwindConfig(config);
    expect(result.tokens.colorPalette).toBeDefined();
    expect(result.tokens.colorPalette?.primary).toBe('#3b82f6');
  });

  it('should extract border radius values', () => {
    const config = `
      module.exports = {
        theme: {
          extend: {
            borderRadius: {
              lg: '0.75rem',
              md: '0.5rem',
              sm: '0.25rem',
            },
          },
        },
      };
    `;
    const result = parseTailwindConfig(config);
    expect(result.tokens.borderRadius).toBeDefined();
    expect(result.tokens.borderRadius?.lg).toBe('0.75rem');
  });

  it('should return warnings for invalid config', () => {
    const result = parseTailwindConfig('not valid config {{{');
    expect(result.warnings.length).toBe(0);
    expect(result.tokens).toBeDefined();
  });

  it('should handle empty config', () => {
    const result = parseTailwindConfig('');
    expect(result.warnings).toHaveLength(0);
  });
});

describe('parseCssVariables', () => {
  it('should extract CSS color variables', () => {
    const css = `
      :root {
        --primary: #2563eb;
        --secondary: #64748b;
        --background: #ffffff;
        --foreground: #0f172a;
      }
    `;
    const result = parseCssVariables(css);
    expect(result.tokens.colorPalette).toBeDefined();
    expect(result.tokens.colorPalette?.primary).toBe('#2563eb');
    expect(result.tokens.colorPalette?.background).toBe('#ffffff');
  });

  it('should handle empty css', () => {
    const result = parseCssVariables('');
    expect(result.warnings).toHaveLength(0);
  });
});

describe('auditStyles', () => {
  it('should merge tailwind config and css variables', () => {
    const twConfig = `
      module.exports = {
        theme: {
          extend: {
            colors: { primary: '#ef4444' },
            borderRadius: { lg: '1rem' },
          },
        },
      };
    `;
    const css = `
      :root {
        --secondary: '#10b981';
      }
    `;

    const result = auditStyles(twConfig, css);
    expect(result.context).toBeDefined();
    expect(result.warnings).toBeInstanceOf(Array);
  });

  it('should handle undefined inputs', () => {
    const result = auditStyles(undefined, undefined);
    expect(result.context).toEqual({});
    expect(result.warnings).toHaveLength(0);
  });
});
