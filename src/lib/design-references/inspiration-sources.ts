import type { IInspirationSource } from '../types.js';

export const INSPIRATION_SOURCES: readonly IInspirationSource[] = [
  // --- Priority 1: Dribbble (PRIMARY) ---
  {
    name: 'Dribbble',
    url: 'https://dribbble.com',
    category: 'gallery',
    description: 'Primary design reference — UI concepts, components, mobile patterns, visual trends',
    priority: 1,
  },

  // --- Priority 2: Pinterest (FALLBACK) ---
  {
    name: 'Pinterest',
    url: 'https://br.pinterest.com',
    category: 'gallery',
    description: 'Fallback design reference — broader visual inspiration, mood boards, UI collections',
    priority: 2,
  },

  // --- Priority 3+: Other Galleries ---
  {
    name: 'Awwwards',
    url: 'https://www.awwwards.com',
    category: 'gallery',
    description: 'Award-winning web design — cutting-edge interactions and visual quality',
    priority: 3,
  },
  {
    name: 'Mobbin',
    url: 'https://mobbin.com',
    category: 'gallery',
    description: 'Real mobile app UI patterns — screenshots from production apps',
    priority: 3,
  },
  {
    name: 'Godly',
    url: 'https://godly.website',
    category: 'gallery',
    description: 'Curated landing pages — high-quality web design inspiration',
    priority: 3,
  },
  {
    name: 'SiteInspire',
    url: 'https://www.siteinspire.com',
    category: 'gallery',
    description: 'Curated web design — clean, minimal, editorial sites',
    priority: 4,
  },
  {
    name: 'Screenlane',
    url: 'https://screenlane.com',
    category: 'gallery',
    description: 'Mobile and web UI flows — real product screenshots',
    priority: 4,
  },
  {
    name: 'Behance',
    url: 'https://www.behance.net',
    category: 'gallery',
    description: 'Full case studies and branding projects',
    priority: 4,
  },
  {
    name: 'Lapa Ninja',
    url: 'https://www.lapa.ninja',
    category: 'gallery',
    description: 'Landing page inspiration — categorized by industry',
    priority: 5,
  },
  {
    name: 'One Page Love',
    url: 'https://onepagelove.com',
    category: 'gallery',
    description: 'Single-page website designs and templates',
    priority: 5,
  },
  {
    name: 'Land-book',
    url: 'https://land-book.com',
    category: 'gallery',
    description: 'Landing page gallery — curated product and marketing pages',
    priority: 5,
  },

  // --- Design Systems & Component References ---
  {
    name: 'Shadcn/ui',
    url: 'https://ui.shadcn.com',
    category: 'design-system',
    description: 'Component library + themes — the default UIForge component reference',
    priority: 1,
  },
  {
    name: 'Radix UI',
    url: 'https://www.radix-ui.com',
    category: 'design-system',
    description: 'Accessible UI primitives — foundation for Shadcn components',
    priority: 2,
  },
  {
    name: 'Tailwind UI',
    url: 'https://tailwindui.com',
    category: 'design-system',
    description: 'Official Tailwind CSS component examples',
    priority: 2,
  },
  {
    name: 'Chakra UI',
    url: 'https://chakra-ui.com',
    category: 'design-system',
    description: 'Accessible component library with theming',
    priority: 3,
  },
  {
    name: 'Ant Design',
    url: 'https://ant.design',
    category: 'design-system',
    description: 'Enterprise-grade component library',
    priority: 3,
  },
  {
    name: 'MUI',
    url: 'https://mui.com',
    category: 'design-system',
    description: 'Material Design components for React',
    priority: 3,
  },
  {
    name: 'Mantine',
    url: 'https://mantine.dev',
    category: 'design-system',
    description: 'Full-featured React component library with hooks',
    priority: 3,
  },

  // --- Typography ---
  {
    name: 'Typewolf',
    url: 'https://www.typewolf.com',
    category: 'typography',
    description: 'Font recommendations and real-world typography examples',
    priority: 2,
  },
  {
    name: 'FontPair',
    url: 'https://www.fontpair.co',
    category: 'typography',
    description: 'Google Fonts pairing suggestions',
    priority: 3,
  },
  {
    name: 'Type Scale',
    url: 'https://typescale.com',
    category: 'typography',
    description: 'Visual type scale calculator',
    priority: 3,
  },

  // --- Color Tools ---
  {
    name: 'Radix Colors',
    url: 'https://www.radix-ui.com/colors',
    category: 'color',
    description: 'Accessible color system with automatic dark mode',
    priority: 2,
  },
  {
    name: 'TweakCN',
    url: 'https://tweakcn.com',
    category: 'color',
    description: 'Shadcn theme editor — visual color customization',
    priority: 2,
  },
  {
    name: 'Realtime Colors',
    url: 'https://www.realtimecolors.com',
    category: 'color',
    description: 'Live color previewer on a real website layout',
    priority: 3,
  },
  {
    name: 'Coolors',
    url: 'https://coolors.co',
    category: 'color',
    description: 'Color palette generator',
    priority: 3,
  },
  {
    name: 'UI Colors',
    url: 'https://uicolors.app',
    category: 'color',
    description: 'Tailwind CSS color scale generator from a single color',
    priority: 3,
  },
] as const;

export function getInspirationByCategory(category: IInspirationSource['category']): IInspirationSource[] {
  return INSPIRATION_SOURCES.filter((s) => s.category === category);
}

export function getInspirationByPriority(maxPriority: number = 3): IInspirationSource[] {
  return INSPIRATION_SOURCES.filter((s) => s.priority <= maxPriority);
}

export function getPrimaryDesignReference(): IInspirationSource {
  return INSPIRATION_SOURCES.find((s) => s.category === 'gallery' && s.priority === 1) as IInspirationSource;
}

export function getFallbackDesignReference(): IInspirationSource {
  return INSPIRATION_SOURCES.find((s) => s.category === 'gallery' && s.priority === 2) as IInspirationSource;
}
