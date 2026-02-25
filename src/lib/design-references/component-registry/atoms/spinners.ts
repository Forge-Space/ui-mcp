import type { IComponentSnippet } from '../types.js';

export const spinnerSnippets: IComponentSnippet[] = [
  {
    id: 'spinner-circle',
    name: 'Circle Spinner',
    category: 'atom',
    type: 'spinner',
    variant: 'circle',
    tags: ['loading', 'spinner', 'linear-modern', 'circle'],
    mood: ['minimal', 'minimal'],
    industry: ['general', 'saas', 'media'],
    visualStyles: ['linear-modern', 'minimal-editorial'],
    jsx: `<div role="status" aria-label="Loading">
  <svg className="h-8 w-8 animate-spin text-primary" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
  <span className="sr-only">Loading...</span>
</div>`,
    tailwindClasses: {
      container: '',
      svg: 'h-8 w-8 animate-spin text-primary',
      circle: 'opacity-25',
      path: 'opacity-75',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-label=Loading', 'aria-hidden on svg'],
      keyboardNav: 'N/A — status indicator',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=status]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['opacity-25 on background circle creates depth', 'opacity-75 on spinning arc for visual hierarchy'],
      inspirationSource: 'HeroUI Spinner',
      craftDetails: ['animate-spin applies tailwind rotation animation', 'sr-only text provides screen reader context'],
    },
  },
  {
    id: 'spinner-dots',
    name: 'Dots Spinner',
    category: 'atom',
    type: 'spinner',
    variant: 'dots',
    tags: ['loading', 'spinner', 'dots', 'pulse'],
    mood: ['playful', 'playful'],
    industry: ['general', 'media', 'media'],
    visualStyles: ['retro-playful', 'soft-depth'],
    jsx: `<div role="status" aria-label="Loading" className="flex items-center gap-1">
  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></span>
  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></span>
  <span className="h-2 w-2 animate-bounce rounded-full bg-primary"></span>
  <span className="sr-only">Loading...</span>
</div>`,
    tailwindClasses: {
      container: 'flex items-center gap-1',
      dot: 'h-2 w-2 animate-bounce rounded-full bg-primary',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-label=Loading'],
      keyboardNav: 'N/A — status indicator',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=status]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['animation-delay on dots creates wave effect', 'gap-1 for tight dot spacing'],
      inspirationSource: 'Chakra Spinner',
      craftDetails: ['animate-bounce for vertical pulsing motion', '[animation-delay:-0.3s] applies staggered timing'],
    },
  },
  {
    id: 'spinner-bars',
    name: 'Bars Spinner',
    category: 'atom',
    type: 'spinner',
    variant: 'bars',
    tags: ['loading', 'spinner', 'bars', 'equalizer'],
    mood: ['energetic', 'energetic'],
    industry: ['media', 'media', 'agency'],
    visualStyles: ['gradient-mesh', 'retro-playful'],
    jsx: `<div role="status" aria-label="Loading" className="flex items-center gap-1">
  <span className="h-6 w-1 animate-pulse rounded-full bg-primary [animation-delay:-0.4s]"></span>
  <span className="h-8 w-1 animate-pulse rounded-full bg-primary [animation-delay:-0.3s]"></span>
  <span className="h-6 w-1 animate-pulse rounded-full bg-primary [animation-delay:-0.2s]"></span>
  <span className="h-8 w-1 animate-pulse rounded-full bg-primary [animation-delay:-0.1s]"></span>
  <span className="h-6 w-1 animate-pulse rounded-full bg-primary"></span>
  <span className="sr-only">Loading...</span>
</div>`,
    tailwindClasses: {
      container: 'flex items-center gap-1',
      bar: 'w-1 animate-pulse rounded-full bg-primary',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-label=Loading'],
      keyboardNav: 'N/A — status indicator',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=status]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'alternating h-6/h-8 heights create equalizer-like pattern',
        'w-1 narrow bars for vertical emphasis',
      ],
      inspirationSource: 'Magic UI animated loaders',
      craftDetails: ['animate-pulse for opacity pulsing', 'staggered animation-delay creates wave motion'],
    },
  },
  {
    id: 'spinner-pulse',
    name: 'Pulse Spinner',
    category: 'atom',
    type: 'spinner',
    variant: 'pulse',
    tags: ['loading', 'spinner', 'pulse', 'ring'],
    mood: ['calm', 'calm'],
    industry: ['general', 'healthcare', 'healthcare'],
    visualStyles: ['soft-depth', 'minimal-editorial'],
    jsx: `<div role="status" aria-label="Loading" className="relative flex h-12 w-12 items-center justify-center">
  <span className="absolute h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
  <span className="relative h-8 w-8 rounded-full bg-primary"></span>
  <span className="sr-only">Loading...</span>
</div>`,
    tailwindClasses: {
      container: 'relative flex h-12 w-12 items-center justify-center',
      ping: 'absolute h-full w-full animate-ping rounded-full bg-primary opacity-75',
      core: 'relative h-8 w-8 rounded-full bg-primary',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-label=Loading'],
      keyboardNav: 'N/A — status indicator',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=status]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['animate-ping creates expanding ring effect', 'absolute positioning layers ping over core circle'],
      inspirationSource: 'Tailwind UI pulse pattern',
      craftDetails: ['opacity-75 on ping for subtle expansion', 'relative h-8 core circle provides solid center'],
    },
  },
  {
    id: 'spinner-ring',
    name: 'Ring Spinner',
    category: 'atom',
    type: 'spinner',
    variant: 'ring',
    tags: ['loading', 'spinner', 'ring', 'border'],
    mood: ['minimal', 'minimal'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['linear-modern', 'corporate-trust'],
    jsx: `<div role="status" aria-label="Loading">
  <div className="h-12 w-12 animate-spin rounded-full border-4 border-secondary border-t-primary"></div>
  <span className="sr-only">Loading...</span>
</div>`,
    tailwindClasses: {
      container: '',
      ring: 'h-12 w-12 animate-spin rounded-full border-4 border-secondary border-t-primary',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-label=Loading'],
      keyboardNav: 'N/A — status indicator',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=status]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'border-t-primary creates single colored segment on ring',
        'border-secondary for muted background ring',
      ],
      inspirationSource: 'HeroUI Spinner variants',
      craftDetails: [
        'border-4 thickness balances visibility with proportions',
        'animate-spin rotates border-t segment around circle',
      ],
    },
  },
  {
    id: 'spinner-skeleton',
    name: 'Skeleton Spinner',
    category: 'atom',
    type: 'spinner',
    variant: 'skeleton',
    tags: ['loading', 'skeleton', 'shimmer', 'placeholder'],
    mood: ['calm', 'professional'],
    industry: ['general', 'saas', 'ecommerce'],
    visualStyles: ['soft-depth', 'corporate-trust'],
    jsx: `<div role="status" aria-label="Loading content" className="space-y-3">
  <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
  <div className="h-4 w-5/6 animate-pulse rounded bg-muted"></div>
  <div className="h-4 w-4/6 animate-pulse rounded bg-muted"></div>
  <span className="sr-only">Loading content...</span>
</div>`,
    tailwindClasses: {
      container: 'space-y-3',
      line: 'h-4 animate-pulse rounded bg-muted',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-label=Loading content'],
      keyboardNav: 'N/A — status indicator',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=status]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'decreasing widths (full → 5/6 → 4/6) simulate text line lengths',
        'space-y-3 mimics paragraph spacing',
      ],
      inspirationSource: 'Chakra Skeleton',
      craftDetails: ['animate-pulse creates shimmer effect', 'bg-muted for subtle placeholder appearance'],
    },
  },
];
