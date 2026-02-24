import type { IComponentSnippet } from '../types.js';

export const skeletonSnippets: IComponentSnippet[] = [
  {
    id: 'skeleton-text',
    name: 'Text Skeleton',
    category: 'atom',
    type: 'skeleton',
    variant: 'text',
    tags: ['loading', 'placeholder', 'shimmer', 'text'],
    mood: ['minimal', 'professional'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'minimal-editorial'],
    jsx: `<div className="space-y-2">
  <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
  <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted" />
  <div className="h-4 w-4/6 animate-pulse rounded-md bg-muted" />
</div>`,
    tailwindClasses: {
      wrapper: 'space-y-2',
      line: 'h-4 animate-pulse rounded-md bg-muted',
    },
    animations: ['animate-pulse'],
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-busy', 'aria-label'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '3:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'varying widths (w-full, w-5/6, w-4/6) create realistic text pattern',
        'animate-pulse provides subtle loading feedback',
        'rounded-md matches typical text line height',
      ],
      inspirationSource: 'Facebook content placeholders',
      craftDetails: [
        'h-4 matches typical text line height',
        'bg-muted uses theme color for skeleton',
        'motion-reduce: animate-pulse → animate-none',
      ],
    },
  },
  {
    id: 'skeleton-card',
    name: 'Card Skeleton',
    category: 'atom',
    type: 'skeleton',
    variant: 'card',
    tags: ['loading', 'placeholder', 'shimmer', 'card'],
    mood: ['minimal', 'professional'],
    industry: ['general', 'saas', 'ecommerce'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<div className="flex flex-col space-y-3 rounded-lg border border-border bg-card p-4">
  <div className="h-48 w-full animate-pulse rounded-md bg-muted" />
  <div className="space-y-2">
    <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
    <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
    <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted" />
  </div>
</div>`,
    tailwindClasses: {
      card: 'flex flex-col space-y-3 rounded-lg border border-border bg-card p-4',
      image: 'h-48 w-full animate-pulse rounded-md bg-muted',
      textWrapper: 'space-y-2',
      textLine: 'h-4 animate-pulse rounded-md bg-muted',
    },
    animations: ['animate-pulse'],
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-busy', 'aria-label'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '3:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'matches card component structure',
        'h-48 image placeholder creates realistic proportions',
        'varying text widths mimic content layout',
      ],
      inspirationSource: 'LinkedIn feed loading cards',
      craftDetails: [
        'border + bg-card maintains visual consistency with real cards',
        'space-y-3 matches typical card spacing',
        'rounded-lg matches card corner radius',
      ],
    },
  },
  {
    id: 'skeleton-avatar',
    name: 'Avatar Skeleton',
    category: 'atom',
    type: 'skeleton',
    variant: 'avatar',
    tags: ['loading', 'placeholder', 'shimmer', 'user'],
    mood: ['minimal', 'professional'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'minimal-editorial'],
    jsx: `<div className="flex items-center gap-3">
  <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
  <div className="flex-1 space-y-2">
    <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
    <div className="h-3 w-24 animate-pulse rounded-md bg-muted" />
  </div>
</div>`,
    tailwindClasses: {
      wrapper: 'flex items-center gap-3',
      avatar: 'h-10 w-10 animate-pulse rounded-full bg-muted',
      textWrapper: 'flex-1 space-y-2',
      name: 'h-4 w-32 animate-pulse rounded-md bg-muted',
      subtitle: 'h-3 w-24 animate-pulse rounded-md bg-muted',
    },
    animations: ['animate-pulse'],
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-busy', 'aria-label'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '3:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'rounded-full for circular avatar shape',
        'two text lines (name + subtitle) for realism',
        'gap-3 matches typical avatar + text spacing',
      ],
      inspirationSource: 'Slack user list loading',
      craftDetails: [
        'h-10 w-10 matches standard avatar size',
        'h-4 name, h-3 subtitle creates visual hierarchy',
        'w-32 and w-24 fixed widths prevent layout shift',
      ],
    },
  },
  {
    id: 'skeleton-table',
    name: 'Table Skeleton',
    category: 'atom',
    type: 'skeleton',
    variant: 'table',
    tags: ['loading', 'placeholder', 'shimmer', 'data'],
    mood: ['minimal', 'professional'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<div className="space-y-3">
  <div className="flex gap-4">
    <div className="h-4 w-1/4 animate-pulse rounded-md bg-muted" />
    <div className="h-4 w-1/3 animate-pulse rounded-md bg-muted" />
    <div className="h-4 w-1/5 animate-pulse rounded-md bg-muted" />
    <div className="h-4 w-1/6 animate-pulse rounded-md bg-muted" />
  </div>
  <div className="flex gap-4">
    <div className="h-4 w-1/4 animate-pulse rounded-md bg-muted" />
    <div className="h-4 w-1/3 animate-pulse rounded-md bg-muted" />
    <div className="h-4 w-1/5 animate-pulse rounded-md bg-muted" />
    <div className="h-4 w-1/6 animate-pulse rounded-md bg-muted" />
  </div>
  <div className="flex gap-4">
    <div className="h-4 w-1/4 animate-pulse rounded-md bg-muted" />
    <div className="h-4 w-1/3 animate-pulse rounded-md bg-muted" />
    <div className="h-4 w-1/5 animate-pulse rounded-md bg-muted" />
    <div className="h-4 w-1/6 animate-pulse rounded-md bg-muted" />
  </div>
</div>`,
    tailwindClasses: {
      wrapper: 'space-y-3',
      row: 'flex gap-4',
      cell: 'h-4 animate-pulse rounded-md bg-muted',
    },
    animations: ['animate-pulse'],
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-busy', 'aria-label'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '3:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: [
        'varying column widths (w-1/4, w-1/3, w-1/5, w-1/6) create realistic table',
        'consistent widths across rows maintain column alignment',
        'gap-4 provides comfortable cell spacing',
      ],
      inspirationSource: 'GitHub repository list loading',
      craftDetails: [
        'flex layout mimics table structure',
        'space-y-3 creates row spacing',
        'h-4 matches typical text height',
      ],
    },
  },
];
