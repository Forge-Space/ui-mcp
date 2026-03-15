import { describe, it, expect } from '@jest/globals';
import { mapTokensToTailwind, extractTokensFromFigmaNode, tokensToDesignContext } from '../../lib/tailwind-mapper.js';
import type { IFigmaDesignToken } from '@forgespace/siza-gen';

describe('tailwind-mapper', () => {
  describe('mapTokensToTailwind', () => {
    it('maps color tokens to text and bg classes', () => {
      const tokens: IFigmaDesignToken[] = [{ name: 'primary', type: 'color', value: '#7c3aed', category: 'color' }];
      const result = mapTokensToTailwind(tokens);
      expect(result).toHaveLength(2);
      expect(result[0]!.className).toBe('text-[#7c3aed]');
      expect(result[0]!.cssProperty).toBe('color');
      expect(result[1]!.className).toBe('bg-[#7c3aed]');
      expect(result[1]!.cssProperty).toBe('background-color');
    });

    it('maps exact spacing to tailwind class', () => {
      const tokens: IFigmaDesignToken[] = [{ name: 'gap-sm', type: 'number', value: 8, category: 'spacing' }];
      const result = mapTokensToTailwind(tokens);
      // value 8 = 'p-2', 'm-2', 'gap-2'
      expect(result.some((r) => r.className === 'p-2')).toBe(true);
      expect(result.some((r) => r.className === 'm-2')).toBe(true);
      expect(result.some((r) => r.className === 'gap-2')).toBe(true);
    });

    it('maps spacing within tolerance to closest class', () => {
      // 9px is closest to 8px (class '2')
      const tokens: IFigmaDesignToken[] = [{ name: 'spacing', type: 'number', value: 9, category: 'spacing' }];
      const result = mapTokensToTailwind(tokens);
      expect(result.some((r) => r.className === 'p-2')).toBe(true);
    });

    it('uses arbitrary value for spacing far from scale', () => {
      // 51px: closest scale is 48px (class '12'), diff = 3 > tolerance(2) → arbitrary
      const tokens: IFigmaDesignToken[] = [{ name: 'custom', type: 'number', value: 51, category: 'spacing' }];
      const result = mapTokensToTailwind(tokens);
      expect(result.some((r) => r.className === 'p-[51px]')).toBe(true);
    });

    it('maps font-size token to text class', () => {
      const tokens: IFigmaDesignToken[] = [
        { name: 'fontSize/body', type: 'string', value: '1rem', category: 'typography' },
      ];
      const result = mapTokensToTailwind(tokens);
      expect(result.some((r) => r.className === 'text-base')).toBe(true);
    });

    it('maps font-weight 700 to font-bold', () => {
      const tokens: IFigmaDesignToken[] = [
        { name: 'fontWeight/heading', type: 'string', value: '700', category: 'typography' },
      ];
      const result = mapTokensToTailwind(tokens);
      expect(result.some((r) => r.className === 'font-bold')).toBe(true);
    });

    it('maps unknown font-weight to arbitrary class', () => {
      const tokens: IFigmaDesignToken[] = [
        { name: 'fontWeight/custom', type: 'string', value: '350', category: 'typography' },
      ];
      const result = mapTokensToTailwind(tokens);
      expect(result.some((r) => r.className === 'font-[350]')).toBe(true);
    });

    it('maps font-family token to font class', () => {
      const tokens: IFigmaDesignToken[] = [
        { name: 'fontFamily/base', type: 'string', value: 'Inter', category: 'typography' },
      ];
      const result = mapTokensToTailwind(tokens);
      expect(result.some((r) => r.className.startsWith("font-['Inter"))).toBe(true);
    });

    it('maps line-height 1.5 to leading-normal', () => {
      const tokens: IFigmaDesignToken[] = [
        { name: 'lineHeight/body', type: 'string', value: '1.5', category: 'typography' },
      ];
      const result = mapTokensToTailwind(tokens);
      expect(result.some((r) => r.className === 'leading-normal')).toBe(true);
    });

    it('maps border-radius 8 to rounded-lg', () => {
      const tokens: IFigmaDesignToken[] = [{ name: 'radius/card', type: 'number', value: 8, category: 'borderRadius' }];
      const result = mapTokensToTailwind(tokens);
      expect(result.some((r) => r.className === 'rounded-lg')).toBe(true);
    });

    it('maps unknown border-radius to arbitrary value', () => {
      const tokens: IFigmaDesignToken[] = [
        { name: 'radius/custom', type: 'number', value: 999, category: 'borderRadius' },
      ];
      const result = mapTokensToTailwind(tokens);
      expect(result.some((r) => r.className === 'rounded-[999px]')).toBe(true);
    });

    it('maps shadow-none for 0 value', () => {
      const tokens: IFigmaDesignToken[] = [{ name: 'shadow/none', type: 'string', value: '0', category: 'shadow' }];
      const result = mapTokensToTailwind(tokens);
      expect(result[0]!.className).toBe('shadow-none');
    });

    it('maps heavy shadow to shadow-xl', () => {
      const tokens: IFigmaDesignToken[] = [
        { name: 'shadow/large', type: 'string', value: '0 12px 24px rgba(0,0,0,0.2)', category: 'shadow' },
      ];
      const result = mapTokensToTailwind(tokens);
      expect(result[0]!.className).toBe('shadow-xl');
    });

    it('returns empty array for empty tokens', () => {
      expect(mapTokensToTailwind([])).toEqual([]);
    });
  });

  describe('extractTokensFromFigmaNode', () => {
    it('extracts color from solid fill', () => {
      const node = {
        name: 'Button',
        fills: [{ type: 'SOLID', color: { r: 0.486, g: 0.227, b: 0.929 } }],
        children: [],
      };
      const tokens = extractTokensFromFigmaNode(node as never);
      expect(tokens.some((t) => t.category === 'color')).toBe(true);
      expect(tokens[0]!.name).toBe('Button/fill');
    });

    it('extracts font-size from style', () => {
      const node = {
        name: 'Label',
        style: { fontSize: 16 },
        children: [],
      };
      const tokens = extractTokensFromFigmaNode(node as never);
      const sizeToken = tokens.find((t) => t.name.includes('fontSize'));
      expect(sizeToken).toBeDefined();
      expect(sizeToken!.value).toBe('1.000rem');
    });

    it('extracts font-weight from style', () => {
      const node = {
        name: 'Heading',
        style: { fontWeight: 700 },
        children: [],
      };
      const tokens = extractTokensFromFigmaNode(node as never);
      expect(tokens.some((t) => t.name.includes('fontWeight') && t.value === '700')).toBe(true);
    });

    it('extracts spacing from bounding box', () => {
      const node = {
        name: 'Card',
        absoluteBoundingBox: { width: 320, height: 200 },
        children: [],
      };
      const tokens = extractTokensFromFigmaNode(node as never);
      expect(tokens.some((t) => t.category === 'spacing' && t.value === 320)).toBe(true);
      expect(tokens.some((t) => t.category === 'spacing' && t.value === 200)).toBe(true);
    });

    it('extracts border-radius from cornerRadius', () => {
      const node = {
        name: 'Chip',
        cornerRadius: 8,
        children: [],
      };
      const tokens = extractTokensFromFigmaNode(node as never);
      expect(tokens.some((t) => t.category === 'borderRadius' && t.value === 8)).toBe(true);
    });

    it('recursively extracts from children', () => {
      const node = {
        name: 'Parent',
        children: [{ name: 'Child', style: { fontSize: 14 }, children: [] }],
      };
      const tokens = extractTokensFromFigmaNode(node as never);
      expect(tokens.some((t) => t.name.includes('Child'))).toBe(true);
    });

    it('returns empty array for node with no extractable info', () => {
      const node = { name: 'Empty', children: [] };
      expect(extractTokensFromFigmaNode(node as never)).toEqual([]);
    });
  });

  describe('tokensToDesignContext', () => {
    it('builds colorPalette from color tokens', () => {
      const tokens: IFigmaDesignToken[] = [
        { name: 'brand/primary', type: 'color', value: '#7c3aed', category: 'color' },
        { name: 'brand/secondary', type: 'color', value: '#3B82F6', category: 'color' },
      ];
      const ctx = tokensToDesignContext(tokens);
      expect(ctx.colorPalette).toBeDefined();
      expect(ctx.colorPalette!.primary).toBe('#7c3aed');
    });

    it('builds typography from font-family token', () => {
      const tokens: IFigmaDesignToken[] = [
        { name: 'text/fontFamily', type: 'string', value: 'Inter', category: 'typography' },
      ];
      const ctx = tokensToDesignContext(tokens);
      expect(ctx.typography).toBeDefined();
      expect(ctx.typography!.fontFamily).toContain('Inter');
    });

    it('returns empty context for empty tokens', () => {
      const ctx = tokensToDesignContext([]);
      expect(ctx.colorPalette).toBeUndefined();
      expect(ctx.typography).toBeUndefined();
    });
  });
});
