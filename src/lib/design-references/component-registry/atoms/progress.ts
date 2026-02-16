import type { IComponentSnippet } from '../types.js';

export const progressSnippets: IComponentSnippet[] = [
  {
    id: 'progress-bar',
    name: 'Progress Bar',
    category: 'atom',
    type: 'progress',
    variant: 'bar',
    tags: ['loading', 'status', 'percentage', 'indicator'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span className="text-foreground font-medium">Progress</span>
    <span className="text-muted-foreground">60%</span>
  </div>
  <div className="h-2 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} aria-label="Progress">
    <div className="h-full rounded-full bg-primary transition-all duration-500 ease-out" style={{ width: '60%' }} />
  </div>
</div>`,
    tailwindClasses: {
      wrapper: 'space-y-2',
      header: 'flex justify-between text-sm',
      label: 'text-foreground font-medium',
      value: 'text-muted-foreground',
      track: 'h-2 w-full overflow-hidden rounded-full bg-muted',
      fill: 'h-full rounded-full bg-primary transition-all duration-500 ease-out',
    },
    a11y: {
      roles: ['progressbar'],
      ariaAttributes: ['aria-valuenow', 'aria-valuemin', 'aria-valuemax', 'aria-label'],
      keyboardNav: 'N/A — informational',
      contrastRatio: '3:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['transition-all for animated fill', 'label + percentage for context', 'ease-out for natural deceleration'],
      inspirationSource: 'shadcn/ui Progress',
      craftDetails: ['h-2 thin bar for modern look', 'rounded-full on both track and fill'],
    },
  },
  {
    id: 'skeleton-default',
    name: 'Skeleton Loader',
    category: 'atom',
    type: 'skeleton',
    variant: 'default',
    tags: ['loading', 'placeholder', 'shimmer', 'feedback'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<div className="space-y-3" aria-busy="true" aria-label="Loading content">
  <div className="h-4 w-3/4 animate-pulse motion-reduce:animate-none rounded-md bg-muted" />
  <div className="h-4 w-full animate-pulse motion-reduce:animate-none rounded-md bg-muted" />
  <div className="h-4 w-5/6 animate-pulse motion-reduce:animate-none rounded-md bg-muted" />
</div>`,
    tailwindClasses: {
      wrapper: 'space-y-3',
      line: 'h-4 animate-pulse motion-reduce:animate-none rounded-md bg-muted',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-busy="true"', 'aria-label'],
      keyboardNav: 'N/A — loading state',
      contrastRatio: '3:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['varied widths (3/4, full, 5/6) mimic real content', 'aria-busy for screen readers', 'matches content shape for low CLS'],
      inspirationSource: 'shadcn/ui Skeleton',
      craftDetails: ['staggered widths prevent uniform shimmer', 'animate-pulse with motion-reduce fallback'],
    },
  },
  {
    id: 'skeleton-card',
    name: 'Card Skeleton',
    category: 'atom',
    type: 'skeleton',
    variant: 'card',
    tags: ['loading', 'placeholder', 'card', 'feedback'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="rounded-lg border bg-card p-6 shadow-sm" aria-busy="true" aria-label="Loading card">
  <div className="space-y-4">
    <div className="h-5 w-1/3 animate-pulse rounded-md bg-muted" />
    <div className="space-y-2">
      <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
      <div className="h-4 w-4/5 animate-pulse rounded-md bg-muted" />
    </div>
    <div className="flex gap-2 pt-2">
      <div className="h-9 w-20 animate-pulse rounded-lg bg-muted" />
      <div className="h-9 w-20 animate-pulse rounded-lg bg-muted" />
    </div>
  </div>
</div>`,
    tailwindClasses: {
      card: 'rounded-lg border bg-card p-6 shadow-sm',
      title: 'h-5 w-1/3 animate-pulse rounded-md bg-muted',
      textLine: 'h-4 animate-pulse rounded-md bg-muted',
      button: 'h-9 w-20 animate-pulse rounded-lg bg-muted',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-busy="true"', 'aria-label'],
      keyboardNav: 'N/A — loading state',
      contrastRatio: '3:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['skeleton mirrors actual card layout', 'button skeletons maintain action area', 'prevents CLS when content loads'],
      inspirationSource: 'Vercel dashboard loading states',
      craftDetails: ['exact match of card dimensions', 'rounded-lg on buttons matches real buttons'],
    },
  },
];
