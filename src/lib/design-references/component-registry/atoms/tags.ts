import type { IComponentSnippet } from '../types.js';

export const tagSnippets: IComponentSnippet[] = [
  {
    id: 'tag-default',
    name: 'Default Tag',
    category: 'atom',
    type: 'tag',
    variant: 'default',
    tags: ['tag', 'badge', 'label', 'pill'],
    mood: ['minimal', 'professional'],
    industry: ['general', 'saas', 'ecommerce'],
    visualStyles: ['minimal-editorial', 'soft-depth'],
    jsx: `<span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
  Design
</span>`,
    tailwindClasses: {
      tag: 'inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground',
    },
    a11y: {
      roles: ['generic span'],
      ariaAttributes: [],
      keyboardNav: 'N/A — static content',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['rounded-full creates pill shape', 'px-3 py-1 provides balanced tag proportions'],
      inspirationSource: 'Ant Design Tag',
      craftDetails: [
        'bg-secondary with text-secondary-foreground for semantic pairing',
        'inline-flex centers text within tag',
      ],
    },
  },
  {
    id: 'tag-removable',
    name: 'Removable Tag',
    category: 'atom',
    type: 'tag',
    variant: 'removable',
    tags: ['tag', 'badge', 'removable', 'closable'],
    mood: ['playful', 'minimal'],
    industry: ['general', 'saas', 'saas'],
    visualStyles: ['linear-modern', 'retro-playful'],
    jsx: `<span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
  TypeScript
  <button type="button" className="rounded-full hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Remove tag">
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  </button>
</span>`,
    tailwindClasses: {
      tag: 'inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground',
      button: 'rounded-full hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      icon: 'h-3 w-3',
    },
    a11y: {
      roles: ['button for remove action'],
      ariaAttributes: ['aria-label=Remove tag', 'aria-hidden on icon'],
      keyboardNav: 'Tab to button, Enter/Space to remove',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span with button' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['gap-1 between text and remove button', 'rounded-full on button matches tag shape'],
      inspirationSource: 'Mantine Badge with close button',
      craftDetails: ['h-3 w-3 icon matches text-xs scale', 'hover:bg-accent for subtle button feedback'],
    },
  },
  {
    id: 'tag-status',
    name: 'Status Tag',
    category: 'atom',
    type: 'tag',
    variant: 'status',
    tags: ['tag', 'badge', 'status', 'indicator'],
    mood: ['professional', 'professional'],
    industry: ['general', 'saas', 'saas'],
    visualStyles: ['corporate-trust', 'linear-modern'],
    jsx: `<span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
  <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8" aria-hidden="true">
    <circle cx="4" cy="4" r="4" />
  </svg>
  Active
</span>`,
    tailwindClasses: {
      tag: 'inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success',
      dot: 'h-2 w-2 fill-current',
    },
    a11y: {
      roles: ['generic span'],
      ariaAttributes: ['aria-hidden on dot'],
      keyboardNav: 'N/A — static content',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'success/10 bg with text-success for status color pairing',
        'h-2 w-2 dot indicator for status visualization',
      ],
      inspirationSource: 'Ant Design Badge status variant',
      craftDetails: ['gap-1.5 provides spacing between dot and text', 'fill-current inherits text color for dot'],
    },
  },
  {
    id: 'tag-outline',
    name: 'Outline Tag',
    category: 'atom',
    type: 'tag',
    variant: 'outline',
    tags: ['tag', 'badge', 'outline', 'bordered'],
    mood: ['minimal', 'minimal'],
    industry: ['general', 'saas', 'media'],
    visualStyles: ['minimal-editorial', 'linear-modern'],
    jsx: `<span className="inline-flex items-center rounded-full border border-border bg-transparent px-3 py-1 text-xs font-medium text-foreground">
  Featured
</span>`,
    tailwindClasses: {
      tag: 'inline-flex items-center rounded-full border border-border bg-transparent px-3 py-1 text-xs font-medium text-foreground',
    },
    a11y: {
      roles: ['generic span'],
      ariaAttributes: [],
      keyboardNav: 'N/A — static content',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'bg-transparent with border for outline-only appearance',
        'border-border for semantic border color',
      ],
      inspirationSource: 'shadcn/ui Badge outline variant',
      craftDetails: ['rounded-full maintains pill shape', 'text-foreground for standard text color'],
    },
  },
  {
    id: 'tag-colored',
    name: 'Colored Tag',
    category: 'atom',
    type: 'tag',
    variant: 'colored',
    tags: ['tag', 'badge', 'colored', 'category'],
    mood: ['bold', 'professional'],
    industry: ['general', 'ecommerce', 'media'],
    visualStyles: ['retro-playful', 'gradient-mesh'],
    jsx: `<span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
  Premium
</span>`,
    tailwindClasses: {
      tag: 'inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground',
    },
    a11y: {
      roles: ['generic span'],
      ariaAttributes: [],
      keyboardNav: 'N/A — static content',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'bg-primary with text-primary-foreground for brand-colored tag',
        'rounded-full for consistent pill shape',
      ],
      inspirationSource: 'Mantine Badge color variants',
      craftDetails: ['semantic color pairing ensures contrast', 'px-3 py-1 maintains standard tag proportions'],
    },
  },
];
