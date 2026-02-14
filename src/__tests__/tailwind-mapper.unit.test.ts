import { describe, it, expect } from 'vitest';
import {
  mapTokensToTailwind,
  extractTokensFromFigmaNode,
  tokensToDesignContext,
} from '../lib/tailwind-mapper.js';
import type { IFigmaDesignToken } from '../lib/types.js';
import type { FigmaNode } from '../lib/figma-client.js';

describe('mapTokensToTailwind', () => {
  it('should map color tokens to text and bg classes', () => {
    const tokens: IFigmaDesignToken[] = [
      { name: 'primary', type: 'color', value: '#2563eb', category: 'color' },
    ];
    const result = mapTokensToTailwind(tokens);
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.some((m) => m.className.includes('text-'))).toBe(true);
    expect(result.some((m) => m.className.includes('bg-'))).toBe(true);
  });

  it('should map spacing tokens to padding, margin, and gap classes', () => {
    const tokens: IFigmaDesignToken[] = [
      { name: 'space-md', type: 'number', value: 16, category: 'spacing' },
    ];
    const result = mapTokensToTailwind(tokens);
    expect(result.length).toBeGreaterThanOrEqual(3);
    expect(result.some((m) => m.className.includes('p-'))).toBe(true);
    expect(result.some((m) => m.className.includes('m-'))).toBe(true);
    expect(result.some((m) => m.className.includes('gap-'))).toBe(true);
  });

  it('should map typography size tokens', () => {
    const tokens: IFigmaDesignToken[] = [
      { name: 'font-size-lg', type: 'string', value: '1.125rem', category: 'typography' },
    ];
    const result = mapTokensToTailwind(tokens);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result[0].cssProperty).toBe('font-size');
  });

  it('should map font weight tokens with named classes', () => {
    const tokens: IFigmaDesignToken[] = [
      { name: 'font-weight-bold', type: 'number', value: '700', category: 'typography' },
    ];
    const result = mapTokensToTailwind(tokens);
    expect(result.length).toBe(1);
    expect(result[0].className).toBe('font-bold');
  });

  it('should map borderRadius tokens', () => {
    const tokens: IFigmaDesignToken[] = [
      { name: 'radius-md', type: 'number', value: '6', category: 'borderRadius' },
    ];
    const result = mapTokensToTailwind(tokens);
    expect(result.length).toBe(1);
    expect(result[0].className).toBe('rounded-md');
  });

  it('should handle arbitrary borderRadius values', () => {
    const tokens: IFigmaDesignToken[] = [
      { name: 'radius-custom', type: 'number', value: '10', category: 'borderRadius' },
    ];
    const result = mapTokensToTailwind(tokens);
    expect(result[0].className).toBe('rounded-[10px]');
  });

  it('should map shadow tokens', () => {
    const tokens: IFigmaDesignToken[] = [
      { name: 'shadow-md', type: 'string', value: '0 4px 6px rgba(0,0,0,0.1)', category: 'shadow' },
    ];
    const result = mapTokensToTailwind(tokens);
    expect(result.length).toBe(1);
    expect(result[0].cssProperty).toBe('box-shadow');
  });

  it('should return empty array for empty input', () => {
    expect(mapTokensToTailwind([])).toEqual([]);
  });
});

describe('extractTokensFromFigmaNode', () => {
  it('should extract fill colors from a node', () => {
    const node: FigmaNode = {
      id: '1:1',
      name: 'Rectangle',
      type: 'RECTANGLE',
      fills: [{ type: 'SOLID', color: { r: 0.15, g: 0.39, b: 0.92, a: 1 } }],
    };
    const tokens = extractTokensFromFigmaNode(node);
    expect(tokens.some((t) => t.category === 'color')).toBe(true);
  });

  it('should extract typography from style property', () => {
    const node: FigmaNode = {
      id: '2:1',
      name: 'TextNode',
      type: 'TEXT',
      style: { fontSize: 16, fontWeight: 600, fontFamily: 'Inter' },
    };
    const tokens = extractTokensFromFigmaNode(node);
    expect(tokens.some((t) => t.category === 'typography' && t.name.includes('fontSize'))).toBe(true);
    expect(tokens.some((t) => t.category === 'typography' && t.name.includes('fontWeight'))).toBe(true);
    expect(tokens.some((t) => t.category === 'typography' && t.name.includes('fontFamily'))).toBe(true);
  });

  it('should extract border radius', () => {
    const node: FigmaNode = {
      id: '3:1',
      name: 'RoundedBox',
      type: 'RECTANGLE',
      cornerRadius: 8,
    };
    const tokens = extractTokensFromFigmaNode(node);
    expect(tokens.some((t) => t.category === 'borderRadius')).toBe(true);
  });

  it('should recurse into children', () => {
    const node: FigmaNode = {
      id: '4:1',
      name: 'Frame',
      type: 'FRAME',
      children: [
        {
          id: '4:2',
          name: 'Child',
          type: 'RECTANGLE',
          fills: [{ type: 'SOLID', color: { r: 1, g: 0, b: 0, a: 1 } }],
        },
      ],
    };
    const tokens = extractTokensFromFigmaNode(node);
    expect(tokens.some((t) => t.name.includes('Child'))).toBe(true);
  });

  it('should return empty for minimal node', () => {
    const node: FigmaNode = { id: '5:1', name: 'Empty', type: 'GROUP' };
    expect(extractTokensFromFigmaNode(node)).toHaveLength(0);
  });
});

describe('tokensToDesignContext', () => {
  it('should build colorPalette from color tokens', () => {
    const tokens: IFigmaDesignToken[] = [
      { name: 'colors/primary', type: 'color', value: '#ff0000', category: 'color' },
      { name: 'colors/secondary', type: 'color', value: '#00ff00', category: 'color' },
    ];
    const ctx = tokensToDesignContext(tokens);
    expect(ctx.colorPalette).toBeDefined();
    // tokensToDesignContext uses Object.values positionally: first color → primary
    expect(ctx.colorPalette?.primary).toBe('#ff0000');
    expect(ctx.colorPalette?.secondary).toBe('#00ff00');
  });

  it('should build typography from font family tokens', () => {
    const tokens: IFigmaDesignToken[] = [
      { name: 'heading/fontFamily', type: 'string', value: 'Roboto', category: 'typography' },
    ];
    const ctx = tokensToDesignContext(tokens);
    expect(ctx.typography).toBeDefined();
    expect(ctx.typography?.fontFamily).toContain('Roboto');
  });

  it('should return empty context for empty tokens', () => {
    const ctx = tokensToDesignContext([]);
    expect(ctx).toEqual({});
  });
});
