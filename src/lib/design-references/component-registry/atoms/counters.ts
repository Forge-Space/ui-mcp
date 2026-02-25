import type { IComponentSnippet } from '../types.js';

export const counterSnippets: IComponentSnippet[] = [
  {
    id: 'counter-animated',
    name: 'Animated Counter',
    category: 'atom',
    type: 'counter',
    variant: 'animated',
    tags: ['counter', 'number', 'animation', 'stats'],
    mood: ['professional', 'energetic'],
    industry: ['saas', 'fintech', 'general'],
    visualStyles: ['linear-modern', 'minimal-editorial'],
    jsx: `<div className="flex flex-col items-center gap-2">
  <span className="text-4xl font-bold text-foreground tabular-nums" data-count-to="1000">
    0
  </span>
  <span className="text-sm text-muted-foreground">Active Users</span>
</div>`,
    tailwindClasses: {
      container: 'flex flex-col items-center gap-2',
      number: 'text-4xl font-bold text-foreground tabular-nums',
      label: 'text-sm text-muted-foreground',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-live="polite"'],
      keyboardNav: 'N/A',
      contrastRatio: '7:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: {
      semanticElement: 'div',
    },
    responsive: {
      strategy: 'mobile-first',
      breakpoints: ['md:text-5xl'],
    },
    quality: {
      antiGeneric: [
        'tabular-nums for smooth digit transitions',
        'data-count-to attribute for animation target',
        'vertical layout for clarity',
      ],
      inspirationSource: 'Stripe Dashboard metrics',
      craftDetails: [
        '4xl/5xl text size for prominence',
        'muted foreground for label hierarchy',
        'gap-2 for tight vertical rhythm',
      ],
    },
  },
  {
    id: 'counter-countdown',
    name: 'Countdown Timer',
    category: 'atom',
    type: 'counter',
    variant: 'countdown',
    tags: ['countdown', 'timer', 'deadline'],
    mood: ['professional', 'energetic'],
    industry: ['ecommerce', 'saas', 'general'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="flex items-center gap-3">
  <div className="flex flex-col items-center gap-1 bg-card border border-border rounded-lg px-3 py-2">
    <span className="text-2xl font-bold text-foreground tabular-nums">23</span>
    <span className="text-xs text-muted-foreground uppercase tracking-wider">Hours</span>
  </div>
  <div className="flex flex-col items-center gap-1 bg-card border border-border rounded-lg px-3 py-2">
    <span className="text-2xl font-bold text-foreground tabular-nums">59</span>
    <span className="text-xs text-muted-foreground uppercase tracking-wider">Mins</span>
  </div>
  <div className="flex flex-col items-center gap-1 bg-card border border-border rounded-lg px-3 py-2">
    <span className="text-2xl font-bold text-foreground tabular-nums">42</span>
    <span className="text-xs text-muted-foreground uppercase tracking-wider">Secs</span>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex items-center gap-3',
      segment: 'flex flex-col items-center gap-1 bg-card border border-border rounded-lg px-3 py-2',
      number: 'text-2xl font-bold text-foreground tabular-nums',
      label: 'text-xs text-muted-foreground uppercase tracking-wider',
    },
    a11y: {
      roles: ['timer'],
      ariaAttributes: ['aria-live="polite"', 'aria-atomic="true"'],
      keyboardNav: 'N/A',
      contrastRatio: '7:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: {
      semanticElement: 'div',
    },
    responsive: {
      strategy: 'mobile-first',
      breakpoints: ['md:text-3xl', 'md:px-4', 'md:py-3'],
    },
    quality: {
      antiGeneric: [
        'segmented boxes for each time unit',
        'uppercase tracking-wider labels for clarity',
        'tabular-nums for stable digit width',
      ],
      inspirationSource: 'Product Hunt launch countdown',
      craftDetails: [
        'rounded-lg segments with border depth',
        'gap-3 for visual separation between units',
        'gap-1 internal for tight hierarchy',
      ],
    },
  },
  {
    id: 'counter-step',
    name: 'Step Counter',
    category: 'atom',
    type: 'counter',
    variant: 'step',
    tags: ['step', 'progress', 'pagination'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'general'],
    visualStyles: ['linear-modern', 'minimal-editorial'],
    jsx: `<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted text-muted-foreground rounded-md text-sm font-medium">
  <span className="text-foreground font-semibold">3</span>
  <span>/</span>
  <span>12</span>
</div>`,
    tailwindClasses: {
      container:
        'inline-flex items-center gap-2 px-3 py-1.5 bg-muted text-muted-foreground rounded-md text-sm font-medium',
      current: 'text-foreground font-semibold',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-label="Step 3 of 12"'],
      keyboardNav: 'N/A',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: {
      semanticElement: 'div',
    },
    responsive: {
      strategy: 'mobile-first',
      breakpoints: [],
    },
    quality: {
      antiGeneric: [
        'current step in foreground, total in muted',
        'compact inline layout',
        'gap-2 for breathing room around slash',
      ],
      inspirationSource: 'Linear onboarding steps',
      craftDetails: [
        'semibold for current step emphasis',
        'muted background for subtle prominence',
        'sm text for non-intrusive display',
      ],
    },
  },
  {
    id: 'counter-stat',
    name: 'Stat Counter',
    category: 'atom',
    type: 'counter',
    variant: 'stat',
    tags: ['stat', 'metric', 'kpi', 'analytics'],
    mood: ['professional', 'premium'],
    industry: ['saas', 'fintech', 'general'],
    visualStyles: ['soft-depth', 'linear-modern', 'dark-premium'],
    jsx: `<div className="flex flex-col gap-1 p-4 bg-card border border-border rounded-lg">
  <div className="flex items-baseline gap-2">
    <span className="text-3xl font-bold text-foreground tabular-nums">$24,500</span>
    <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
      <span>12.5%</span>
    </span>
  </div>
  <span className="text-sm text-muted-foreground">Revenue this month</span>
</div>`,
    tailwindClasses: {
      container: 'flex flex-col gap-1 p-4 bg-card border border-border rounded-lg',
      valueRow: 'flex items-baseline gap-2',
      value: 'text-3xl font-bold text-foreground tabular-nums',
      change: 'inline-flex items-center gap-1 text-xs font-medium text-success',
      label: 'text-sm text-muted-foreground',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-label="Revenue: $24,500, up 12.5%"'],
      keyboardNav: 'N/A',
      contrastRatio: '7:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: {
      semanticElement: 'div',
    },
    responsive: {
      strategy: 'mobile-first',
      breakpoints: ['md:text-4xl'],
    },
    quality: {
      antiGeneric: [
        'baseline alignment for value + change indicator',
        'tabular-nums for stable digit width',
        'success color for positive change',
        'trend arrow icon for quick scanning',
      ],
      inspirationSource: 'Vercel Analytics dashboard',
      craftDetails: [
        'card container with border depth',
        'gap-1 for tight vertical hierarchy',
        'xs change indicator to avoid competing with main value',
      ],
    },
  },
];
