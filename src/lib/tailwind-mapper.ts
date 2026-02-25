import { createLogger, type IDesignContext, type IFigmaDesignToken, type ITailwindMapping } from '@forgespace/siza-gen';
import type { FigmaNode, FigmaFill } from './figma-client.js';

const logger = createLogger('tailwind-mapper');

// Spacing tolerance constants
const SPACING_TOLERANCE_PX = 2; // Maximum pixel difference for spacing match
const FONT_SIZE_TOLERANCE_REM = 0.0625; // Maximum rem difference for font size match
const LINE_HEIGHT_TOLERANCE = 0.0625; // Maximum difference for line height match

// Tailwind default spacing scale: class suffix → px value
const SPACING_SCALE: [string, number][] = [
  ['0', 0],
  ['px', 1],
  ['0.5', 2],
  ['1', 4],
  ['1.5', 6],
  ['2', 8],
  ['2.5', 10],
  ['3', 12],
  ['3.5', 14],
  ['4', 16],
  ['5', 20],
  ['6', 24],
  ['7', 28],
  ['8', 32],
  ['9', 36],
  ['10', 40],
  ['11', 44],
  ['12', 48],
  ['14', 56],
  ['16', 64],
  ['20', 80],
  ['24', 96],
];

// Tailwind default font-size scale: class suffix → rem value
const FONT_SIZE_SCALE: [string, string][] = [
  ['xs', '0.75rem'],
  ['sm', '0.875rem'],
  ['base', '1rem'],
  ['lg', '1.125rem'],
  ['xl', '1.25rem'],
  ['2xl', '1.5rem'],
  ['3xl', '1.875rem'],
  ['4xl', '2.25rem'],
  ['5xl', '3rem'],
  ['6xl', '3.75rem'],
  ['7xl', '4.5rem'],
  ['8xl', '6rem'],
  ['9xl', '8rem'],
];

// Tailwind default line-height scale
const LINE_HEIGHT_SCALE: [string, string][] = [
  ['none', '1'],
  ['tight', '1.25'],
  ['snug', '1.375'],
  ['normal', '1.5'],
  ['relaxed', '1.625'],
  ['loose', '2'],
];

function closestSpacing(px: number): string {
  if (!Number.isFinite(px) || px < 0) {
    logger.warn({ px }, 'Invalid spacing value (NaN, Infinity, -Infinity, or negative), defaulting to 0');
    return SPACING_SCALE[0][0];
  }
  let closestMatch = SPACING_SCALE[0];
  let closestDifference = Math.abs(px - closestMatch[1]);
  for (const scaleEntry of SPACING_SCALE) {
    const difference = Math.abs(px - scaleEntry[1]);
    if (difference < closestDifference) {
      closestMatch = scaleEntry;
      closestDifference = difference;
    }
  }
  // Use arbitrary value if the closest match is too far off
  return closestDifference <= SPACING_TOLERANCE_PX ? closestMatch[0] : `[${px}px]`;
}

function closestFontSize(value: string): string {
  const numericRem = parseFloat(value);
  if (isNaN(numericRem)) return `[${value}]`;
  let closestMatch = FONT_SIZE_SCALE[0];
  let closestDifference = Math.abs(numericRem - parseFloat(closestMatch[1]));
  for (const scaleEntry of FONT_SIZE_SCALE) {
    const difference = Math.abs(numericRem - parseFloat(scaleEntry[1]));
    if (difference < closestDifference) {
      closestMatch = scaleEntry;
      closestDifference = difference;
    }
  }
  return closestDifference <= FONT_SIZE_TOLERANCE_REM ? closestMatch[0] : `[${value}]`;
}

function closestLineHeight(value: string): string {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return `[${value}]`;
  let closestMatch = LINE_HEIGHT_SCALE[0];
  let closestDifference = Math.abs(numericValue - parseFloat(closestMatch[1]));
  for (const scaleEntry of LINE_HEIGHT_SCALE) {
    const difference = Math.abs(numericValue - parseFloat(scaleEntry[1]));
    if (difference < closestDifference) {
      closestMatch = scaleEntry;
      closestDifference = difference;
    }
  }
  return closestDifference <= LINE_HEIGHT_TOLERANCE ? closestMatch[0] : `[${value}]`;
}

function classifyShadow(val: string): string {
  const lower = val.toLowerCase();
  if (lower === 'none' || lower === '0') return 'shadow-none';
  // Heuristic: classify by vertical offset size
  const match = val.match(/\d+\s+(\d+)/);
  const yOffset = match ? parseInt(match[1], 10) : 0;
  if (yOffset <= 1) return 'shadow-sm';
  if (yOffset <= 3) return 'shadow';
  if (yOffset <= 6) return 'shadow-md';
  if (yOffset <= 10) return 'shadow-lg';
  if (yOffset <= 20) return 'shadow-xl';
  return 'shadow-2xl';
}

export function mapTokensToTailwind(tokens: IFigmaDesignToken[]): ITailwindMapping[] {
  const mappings: ITailwindMapping[] = [];

  for (const token of tokens) {
    switch (token.category) {
      case 'color':
        mappings.push({
          className: `text-[${token.value}]`,
          cssProperty: 'color',
          value: String(token.value),
        });
        mappings.push({
          className: `bg-[${token.value}]`,
          cssProperty: 'background-color',
          value: String(token.value),
        });
        break;

      case 'spacing': {
        const px = typeof token.value === 'number' ? token.value : parseFloat(String(token.value));
        const cls = closestSpacing(px);
        mappings.push({
          className: `p-${cls}`,
          cssProperty: 'padding',
          value: `${px}px`,
        });
        mappings.push({
          className: `m-${cls}`,
          cssProperty: 'margin',
          value: `${px}px`,
        });
        mappings.push({
          className: `gap-${cls}`,
          cssProperty: 'gap',
          value: `${px}px`,
        });
        break;
      }

      case 'typography': {
        const val = String(token.value);
        if (token.name.toLowerCase().includes('size')) {
          const cls = closestFontSize(val);
          mappings.push({
            className: `text-${cls}`,
            cssProperty: 'font-size',
            value: val,
          });
        } else if (token.name.toLowerCase().includes('weight')) {
          const weightMap: Record<string, string> = {
            '100': 'font-thin',
            '200': 'font-extralight',
            '300': 'font-light',
            '400': 'font-normal',
            '500': 'font-medium',
            '600': 'font-semibold',
            '700': 'font-bold',
            '800': 'font-extrabold',
            '900': 'font-black',
          };
          mappings.push({
            className: weightMap[val] ?? `font-[${val}]`,
            cssProperty: 'font-weight',
            value: val,
          });
        } else if (token.name.toLowerCase().includes('family')) {
          mappings.push({
            className: `font-['${val.replace(/\s/g, '_')}']`,
            cssProperty: 'font-family',
            value: val,
          });
        } else if (token.name.toLowerCase().includes('line') || token.name.toLowerCase().includes('height')) {
          const cls = closestLineHeight(val);
          mappings.push({
            className: `leading-${cls}`,
            cssProperty: 'line-height',
            value: val,
          });
        }
        break;
      }

      case 'borderRadius': {
        const radVal = String(token.value);
        const radiusMap: Record<string, string> = {
          '0': 'rounded-none',
          '2': 'rounded-sm',
          '4': 'rounded',
          '6': 'rounded-md',
          '8': 'rounded-lg',
          '12': 'rounded-xl',
          '16': 'rounded-2xl',
          '24': 'rounded-3xl',
        };
        mappings.push({
          className: radiusMap[radVal] ?? `rounded-[${radVal}px]`,
          cssProperty: 'border-radius',
          value: `${radVal}px`,
        });
        break;
      }

      case 'shadow':
        mappings.push({
          className: classifyShadow(String(token.value)),
          cssProperty: 'box-shadow',
          value: String(token.value),
        });
        break;
    }
  }

  return mappings;
}

export function extractTokensFromFigmaNode(node: FigmaNode): IFigmaDesignToken[] {
  const tokens: IFigmaDesignToken[] = [];

  if (node.fills && Array.isArray(node.fills)) {
    for (const fill of node.fills as FigmaFill[]) {
      if (fill.type === 'SOLID' && fill.color) {
        const hex = rgbToHex(fill.color.r, fill.color.g, fill.color.b);
        tokens.push({
          name: `${node.name}/fill`,
          type: 'color',
          value: hex,
          category: 'color',
        });
      }
    }
  }

  if (node.style) {
    const style = node.style as Record<string, unknown>;
    if (style['fontSize']) {
      const fontSizePx = style['fontSize'] as number;
      tokens.push({
        name: `${node.name}/fontSize`,
        type: 'string',
        value: `${(fontSizePx / 16).toFixed(3)}rem`,
        category: 'typography',
      });
    }
    if (style['fontWeight']) {
      tokens.push({
        name: `${node.name}/fontWeight`,
        type: 'string',
        value: String(style['fontWeight']),
        category: 'typography',
      });
    }
    if (style['fontFamily']) {
      tokens.push({
        name: `${node.name}/fontFamily`,
        type: 'string',
        value: style['fontFamily'] as string,
        category: 'typography',
      });
    }
    if (style['lineHeightPx']) {
      const lineHeightPx = style['lineHeightPx'] as number;
      // Use default 16px if fontSize is undefined, null, or 0 to prevent division issues
      const rawFontSize = style['fontSize'] as number | undefined;
      const fontSizePx = rawFontSize && rawFontSize > 0 ? rawFontSize : 16;
      tokens.push({
        name: `${node.name}/lineHeight`,
        type: 'string',
        value: (lineHeightPx / fontSizePx).toFixed(3),
        category: 'typography',
      });
    }
  }

  if (node.absoluteBoundingBox) {
    const { width, height } = node.absoluteBoundingBox;
    if (width) {
      tokens.push({ name: `${node.name}/width`, type: 'number', value: width, category: 'spacing' });
    }
    if (height) {
      tokens.push({ name: `${node.name}/height`, type: 'number', value: height, category: 'spacing' });
    }
  }

  const cornerRadius = node['cornerRadius'] as number | undefined;
  if (cornerRadius !== undefined) {
    tokens.push({
      name: `${node.name}/borderRadius`,
      type: 'number',
      value: cornerRadius,
      category: 'borderRadius',
    });
  }

  if (node.children) {
    for (const child of node.children) {
      tokens.push(...extractTokensFromFigmaNode(child));
    }
  }

  return tokens;
}

export function tokensToDesignContext(tokens: IFigmaDesignToken[]): Partial<IDesignContext> {
  const context: Partial<IDesignContext> = {};
  const colors: Record<string, string> = {};
  const fontFamilies = new Set<string>();

  for (const token of tokens) {
    if (token.category === 'color') {
      const namePart = token.name.split('/').pop()?.toLowerCase() ?? '';
      colors[namePart] = String(token.value);
    }
    if (token.category === 'typography' && token.name.toLowerCase().includes('family')) {
      fontFamilies.add(String(token.value));
    }
  }

  if (Object.keys(colors).length > 0) {
    const colorValues = Object.values(colors);
    context.colorPalette = {
      primary: colorValues[0] ?? '#2563eb',
      primaryForeground: '#ffffff',
      secondary: colorValues[1] ?? '#64748b',
      secondaryForeground: '#ffffff',
      accent: colorValues[2] ?? '#f59e0b',
      accentForeground: '#1c1917',
      background: '#ffffff',
      foreground: colorValues[3] ?? '#0f172a',
      muted: '#f1f5f9',
      mutedForeground: '#64748b',
      border: '#e2e8f0',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
    };
  }

  if (fontFamilies.size > 0) {
    const primaryFont = [...fontFamilies][0];
    context.typography = {
      fontFamily: `${primaryFont}, system-ui, sans-serif`,
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
      },
      fontWeight: { normal: '400', medium: '500', semibold: '600', bold: '700' },
      lineHeight: { tight: '1.25', normal: '1.5', relaxed: '1.75' },
    };
  }

  return context;
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) =>
    Math.round(c * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
