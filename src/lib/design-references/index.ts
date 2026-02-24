import type { IDesignContext } from '../types.js';
import {
  FONT_PAIRINGS,
  DEFAULT_FONT_PAIRING,
  getFontPairing,
  getFontPairingsByMood,
  TYPE_SCALE,
} from './font-pairings.js';
import { COLOR_SYSTEMS, DEFAULT_COLOR_SYSTEM, getColorSystem, getColorSystemsByMood } from './color-systems.js';
import { SPACING_SYSTEM } from './spacing-layout.js';
import { ICON_LIBRARIES, getDefaultIconLibrary } from './icon-references.js';
import { ANIMATION_PRESETS, getAnimationsByCategory } from './animation-presets.js';
import { LAYOUT_PATTERNS, getLayoutPattern, getLayoutPatternsByUseCase } from './layout-patterns.js';
import {
  INSPIRATION_SOURCES,
  getInspirationByCategory,
  getInspirationByPriority,
  getPrimaryDesignReference,
  getFallbackDesignReference,
} from './inspiration-sources.js';
import {
  COMPONENT_LIBRARIES,
  getComponentLibrariesForFramework,
  getRecommendedLibrary,
} from './component-libraries.js';

export const DEFAULT_PRESET = 'zinc-manrope';

export interface IPresetConfig {
  colorSystem: string;
  fontPairing: string;
}

export const PRESETS: Record<string, IPresetConfig> = {
  'zinc-manrope': { colorSystem: 'zinc', fontPairing: 'manrope-inter' },
  'zinc-inter': { colorSystem: 'zinc', fontPairing: 'inter-inter' },
  'slate-inter': { colorSystem: 'slate', fontPairing: 'inter-inter' },
  'ocean-manrope': { colorSystem: 'ocean', fontPairing: 'manrope-inter' },
  'ocean-sora': { colorSystem: 'ocean', fontPairing: 'sora-heebo' },
  'emerald-dmsans': { colorSystem: 'emerald', fontPairing: 'dmsans-nunito' },
  'violet-epilogue': { colorSystem: 'violet', fontPairing: 'epilogue-mulish' },
  'rose-playfair': { colorSystem: 'rose', fontPairing: 'playfair-albertsans' },
  'amber-montserrat': { colorSystem: 'amber', fontPairing: 'montserrat-sourcesans' },
  'sunset-albertsans': { colorSystem: 'sunset', fontPairing: 'albertsans-barlow' },
  'midnight-sora': { colorSystem: 'midnight', fontPairing: 'sora-heebo' },
  'stone-fraunces': { colorSystem: 'stone', fontPairing: 'fraunces-poppins' },
};

function hslStringToHex(hsl: string): string {
  const parts = hsl.split(/\s+/);
  if (parts.length < 3) return '#000000';
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]) / 100;
  const l = parseFloat(parts[2]) / 100;

  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function getPreset(name: string = DEFAULT_PRESET): IDesignContext {
  const config = PRESETS[name] ?? PRESETS[DEFAULT_PRESET];
  const colorSystem = getColorSystem(config.colorSystem) ?? COLOR_SYSTEMS[0];
  const fontPairing = getFontPairing(config.fontPairing) ?? FONT_PAIRINGS[0];

  return {
    typography: {
      fontFamily: fontPairing.body.family,
      headingFont: fontPairing.heading.family,
      fontSize: {
        xs: TYPE_SCALE.xs,
        sm: TYPE_SCALE.sm,
        base: TYPE_SCALE.base,
        lg: TYPE_SCALE.lg,
        xl: TYPE_SCALE.xl,
        '2xl': TYPE_SCALE['2xl'],
        '3xl': TYPE_SCALE['3xl'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75',
      },
    },
    colorPalette: {
      primary: hslStringToHex(colorSystem.light.primary ?? '240 5.9% 10%'),
      primaryForeground: hslStringToHex(colorSystem.light['primary-foreground'] ?? '0 0% 98%'),
      secondary: hslStringToHex(colorSystem.light.secondary ?? '240 4.8% 95.9%'),
      secondaryForeground: hslStringToHex(colorSystem.light['secondary-foreground'] ?? '240 5.9% 10%'),
      accent: hslStringToHex(colorSystem.light.accent ?? '240 4.8% 95.9%'),
      accentForeground: hslStringToHex(colorSystem.light['accent-foreground'] ?? '240 5.9% 10%'),
      background: hslStringToHex(colorSystem.light.background ?? '0 0% 100%'),
      foreground: hslStringToHex(colorSystem.light.foreground ?? '240 10% 3.9%'),
      muted: hslStringToHex(colorSystem.light.muted ?? '240 4.8% 95.9%'),
      mutedForeground: hslStringToHex(colorSystem.light['muted-foreground'] ?? '240 3.8% 46.1%'),
      border: hslStringToHex(colorSystem.light.border ?? '240 5.9% 90%'),
      destructive: hslStringToHex(colorSystem.light.destructive ?? '0 84.2% 60.2%'),
      destructiveForeground: hslStringToHex(colorSystem.light['destructive-foreground'] ?? '0 0% 98%'),
    },
    spacing: {
      unit: SPACING_SYSTEM.baseUnit,
      scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96],
    },
    borderRadius: {
      sm: SPACING_SYSTEM.borderRadius.sm,
      md: SPACING_SYSTEM.borderRadius.md,
      lg: SPACING_SYSTEM.borderRadius.lg,
      full: SPACING_SYSTEM.borderRadius.full,
    },
    shadows: {
      sm: SPACING_SYSTEM.shadows.sm,
      md: SPACING_SYSTEM.shadows.md,
      lg: SPACING_SYSTEM.shadows.lg,
    },
    iconSet: 'phosphor',
  };
}

export function listPresets(): string[] {
  return Object.keys(PRESETS);
}

// Re-export everything
export {
  FONT_PAIRINGS,
  DEFAULT_FONT_PAIRING,
  getFontPairing,
  getFontPairingsByMood,
  TYPE_SCALE,
  COLOR_SYSTEMS,
  DEFAULT_COLOR_SYSTEM,
  getColorSystem,
  getColorSystemsByMood,
  SPACING_SYSTEM,
  ICON_LIBRARIES,
  getDefaultIconLibrary,
  ANIMATION_PRESETS,
  getAnimationsByCategory,
  LAYOUT_PATTERNS,
  getLayoutPattern,
  getLayoutPatternsByUseCase,
  INSPIRATION_SOURCES,
  getInspirationByCategory,
  getInspirationByPriority,
  getPrimaryDesignReference,
  getFallbackDesignReference,
  COMPONENT_LIBRARIES,
  getComponentLibrariesForFramework,
  getRecommendedLibrary,
};
