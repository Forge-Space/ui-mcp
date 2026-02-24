import type { IComponentSnippet } from '../types.js';

export const badgeSnippets: IComponentSnippet[] = [
  {
    id: 'badge-default',
    name: 'Default Badge',
    category: 'atom',
    type: 'badge',
    variant: 'default',
    tags: ['label', 'tag', 'status', 'indicator'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<span className="inline-flex items-center rounded-md bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">Badge</span>`,
    tailwindClasses: {
      badge: 'inline-flex items-center rounded-md bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: [],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['rounded-md not rounded-full for modern look', 'px-2.5 py-0.5 for compact proportions'],
      inspirationSource: 'shadcn/ui Badge',
      craftDetails: ['8pt grid aligned', 'text-xs for hierarchy subordination'],
    },
  },
  {
    id: 'badge-outline',
    name: 'Outline Badge',
    category: 'atom',
    type: 'badge',
    variant: 'outline',
    tags: ['label', 'tag', 'subtle', 'indicator'],
    mood: ['minimal', 'calm', 'professional'],
    industry: ['general', 'saas'],
    visualStyles: ['minimal-editorial', 'linear-modern', 'soft-depth'],
    jsx: `<span className="inline-flex items-center rounded-md border border-border px-2.5 py-0.5 text-xs font-medium text-foreground">Outline</span>`,
    tailwindClasses: {
      badge:
        'inline-flex items-center rounded-md border border-border px-2.5 py-0.5 text-xs font-medium text-foreground',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: [],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['border-border uses theme token', 'no background for reduced visual weight'],
      inspirationSource: 'shadcn/ui Badge outline',
      craftDetails: [
        'same dimensions as default for consistency',
        'border-only approach reduces visual weight in dense UIs',
      ],
    },
  },
  {
    id: 'badge-success',
    name: 'Success Badge',
    category: 'atom',
    type: 'badge',
    variant: 'success',
    tags: ['status', 'active', 'online', 'complete', 'positive'],
    mood: ['professional'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<span className="inline-flex items-center gap-1.5 rounded-md bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success ring-1 ring-inset ring-success/20 dark:bg-success/10 dark:text-success dark:ring-success/20">
  <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
  Active
</span>`,
    tailwindClasses: {
      badge:
        'inline-flex items-center gap-1.5 rounded-md bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success ring-1 ring-inset ring-success/20 dark:bg-success/10 dark:text-success dark:ring-success/20',
      dot: 'h-1.5 w-1.5 rounded-full bg-success',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-hidden on dot'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'dot indicator — not color-only',
        'ring-inset for subtle border',
        'dark mode variants included',
        'semantic success token not just "green"',
      ],
      inspirationSource: 'Tailwind UI status badges',
      craftDetails: [
        'ring-1 ring-inset for inset border effect',
        'gap-1.5 for dot spacing',
        'dark: variants for theme support',
      ],
    },
  },
  {
    id: 'badge-warning',
    name: 'Warning Badge',
    category: 'atom',
    type: 'badge',
    variant: 'warning',
    tags: ['status', 'pending', 'caution', 'alert'],
    mood: ['professional'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['soft-depth', 'corporate-trust'],
    jsx: `<span className="inline-flex items-center gap-1.5 rounded-md bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning ring-1 ring-inset ring-warning/20 dark:bg-warning/10 dark:text-warning dark:ring-warning/20">
  <span className="h-1.5 w-1.5 rounded-full bg-warning" aria-hidden="true" />
  Pending
</span>`,
    tailwindClasses: {
      badge:
        'inline-flex items-center gap-1.5 rounded-md bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning ring-1 ring-inset ring-warning/20 dark:bg-warning/10 dark:text-warning dark:ring-warning/20',
      dot: 'h-1.5 w-1.5 rounded-full bg-amber-500',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-hidden on dot'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['dot + text — not color-only', 'amber tones for clear warning hierarchy'],
      inspirationSource: 'Tailwind UI status badges',
      craftDetails: ['consistent with success badge structure', 'ring-inset border'],
    },
  },
  {
    id: 'badge-error',
    name: 'Error Badge',
    category: 'atom',
    type: 'badge',
    variant: 'error',
    tags: ['status', 'error', 'failed', 'danger', 'negative'],
    mood: ['professional'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['soft-depth', 'corporate-trust'],
    jsx: `<span className="inline-flex items-center gap-1.5 rounded-md bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive ring-1 ring-inset ring-destructive/20 dark:bg-destructive/10 dark:text-destructive dark:ring-destructive/20">
  <span className="h-1.5 w-1.5 rounded-full bg-destructive" aria-hidden="true" />
  Failed
</span>`,
    tailwindClasses: {
      badge:
        'inline-flex items-center gap-1.5 rounded-md bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive ring-1 ring-inset ring-destructive/20 dark:bg-destructive/10 dark:text-destructive dark:ring-destructive/20',
      dot: 'h-1.5 w-1.5 rounded-full bg-red-500',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-hidden on dot'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['dot indicator — not color-only', 'consistent with success/warning family'],
      inspirationSource: 'Tailwind UI status badges',
      craftDetails: ['destructive token for error states — consistent with design system', 'ring-inset border'],
    },
  },
  {
    id: 'badge-pill',
    name: 'Pill Badge',
    category: 'atom',
    type: 'badge',
    variant: 'pill',
    tags: ['tag', 'category', 'filter', 'chip'],
    mood: ['playful', 'creative', 'warm'],
    industry: ['ecommerce', 'media', 'agency'],
    visualStyles: ['retro-playful', 'gradient-mesh'],
    jsx: `<span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Category</span>`,
    tailwindClasses: {
      badge: 'inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: [],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'rounded-full for pill shape',
        'bg-primary/10 for subtle tinted background',
        'font-semibold for tag emphasis',
      ],
      inspirationSource: 'Vercel dashboard tags',
      craftDetails: ['primary/10 opacity for accessible tinted bg', 'px-3 py-1 for pill proportions'],
    },
  },
  {
    id: 'badge-dot',
    name: 'Dot Badge',
    category: 'atom',
    type: 'badge',
    variant: 'dot',
    tags: ['status', 'indicator', 'subtle', 'inline'],
    mood: ['minimal', 'professional', 'calm'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['minimal-editorial', 'linear-modern', 'soft-depth'],
    jsx: `<span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
  <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
  Published
</span>`,
    tailwindClasses: {
      badge: 'inline-flex items-center gap-1.5 text-xs font-medium text-foreground',
      dot: 'h-1.5 w-1.5 rounded-full bg-success',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-hidden'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'minimal design — no background, just dot + text',
        'h-1.5 w-1.5 (6px) for subtle indicator',
        'gap-1.5 for comfortable spacing',
      ],
      inspirationSource: 'Linear status indicators',
      craftDetails: [
        'no px/py padding — inline text style',
        'aria-hidden on dot since text conveys meaning',
        'bg-success for published/active state',
      ],
    },
  },
  {
    id: 'badge-outline-neutral',
    name: 'Outline Badge Neutral',
    category: 'atom',
    type: 'badge',
    variant: 'outline-neutral',
    tags: ['label', 'tag', 'subtle', 'neutral'],
    mood: ['minimal', 'calm', 'professional'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['minimal-editorial', 'linear-modern', 'soft-depth'],
    jsx: `<span className="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground">Draft</span>`,
    tailwindClasses: {
      badge:
        'inline-flex items-center rounded-md border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: [],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'bg-background for explicit background control',
        'text-muted-foreground for reduced emphasis',
        'border-border uses theme token',
      ],
      inspirationSource: 'GitHub PR draft labels',
      craftDetails: [
        'bg-background + border creates subtle outline effect',
        'text-muted-foreground de-emphasizes compared to primary badges',
        'same dimensions as other badge variants',
      ],
    },
  },
  {
    id: 'badge-with-icon',
    name: 'Badge with Icon',
    category: 'atom',
    type: 'badge',
    variant: 'with-icon',
    tags: ['label', 'icon', 'status', 'indicator'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'devtools', 'general'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<span className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
  Verified
</span>`,
    tailwindClasses: {
      badge:
        'inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground',
      icon: 'h-3 w-3',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-hidden'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'gap-1 for tight icon + text spacing',
        'h-3 w-3 icon scales with text-xs',
        'aria-hidden on icon since text conveys meaning',
      ],
      inspirationSource: 'Vercel deployment status',
      craftDetails: [
        'h-3 w-3 (12px) icon matches text-xs hierarchy',
        'gap-1 tighter than gap-1.5 for compact badge',
        'leading icon pattern (icon before text)',
      ],
    },
  },
  {
    id: 'badge-removable',
    name: 'Removable Badge',
    category: 'atom',
    type: 'badge',
    variant: 'removable',
    tags: ['chip', 'tag', 'filter', 'interactive', 'removable'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
  JavaScript
  <button
    type="button"
    className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-sm text-primary hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    aria-label="Remove JavaScript"
  >
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
  </button>
</span>`,
    tailwindClasses: {
      badge: 'inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary',
      removeButton:
        'inline-flex h-3.5 w-3.5 items-center justify-center rounded-sm text-primary hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      icon: 'h-3 w-3',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab to focus remove button, Enter/Space to remove',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'separate focusable remove button',
        'aria-label includes full context (not just "remove")',
        'hover:bg-primary/20 provides interaction feedback',
      ],
      inspirationSource: 'Gmail label chips',
      craftDetails: [
        'h-3.5 w-3.5 button fits within badge height',
        'gap-1 for tight spacing',
        'focus-visible:ring-2 for keyboard navigation',
      ],
    },
  },
];
