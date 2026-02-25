import type { IComponentSnippet } from '../types.js';

export const chipSnippets: IComponentSnippet[] = [
  {
    id: 'chip-filter',
    name: 'Filter Chip',
    category: 'atom',
    type: 'chip',
    variant: 'filter',
    tags: ['filter', 'pill', 'tag', 'removable'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'ecommerce', 'general'],
    visualStyles: ['soft-depth', 'linear-modern', 'minimal-editorial'],
    jsx: `<div className="inline-flex items-center gap-1.5 bg-muted text-foreground px-3 py-1.5 rounded-full text-sm font-medium border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
  <span>Design</span>
  <button className="hover:bg-destructive/10 rounded-full p-0.5 transition-colors" aria-label="Remove filter">
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>`,
    tailwindClasses: {
      chip: 'inline-flex items-center gap-1.5 bg-muted text-foreground px-3 py-1.5 rounded-full text-sm font-medium border border-border hover:bg-accent hover:text-accent-foreground transition-colors',
      removeButton: 'hover:bg-destructive/10 rounded-full p-0.5 transition-colors',
    },
    a11y: {
      roles: ['group'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab to focus, Enter/Space to remove',
      contrastRatio: '4.5:1',
      focusVisible: true,
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
        'rounded-full for pill aesthetic',
        '1.5px gap for optical balance',
        'border for depth without shadow',
      ],
      inspirationSource: 'Linear app filter chips',
      craftDetails: [
        '4pt grid aligned spacing',
        'hover states on both chip and remove button',
        'destructive color hint on remove hover',
      ],
    },
  },
  {
    id: 'chip-input',
    name: 'Input Chip',
    category: 'atom',
    type: 'chip',
    variant: 'input',
    tags: ['input', 'tag', 'multiselect'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'general'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1.5 rounded-md text-sm font-medium">
  <span>john@company.co</span>
  <button className="hover:text-destructive transition-colors" aria-label="Remove">
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>`,
    tailwindClasses: {
      chip: 'inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1.5 rounded-md text-sm font-medium',
      removeButton: 'hover:text-destructive transition-colors',
    },
    a11y: {
      roles: ['group'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab to focus, Enter/Space to remove',
      contrastRatio: '4.5:1',
      focusVisible: true,
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
      antiGeneric: ['rounded-md for input field consistency', 'gap-2 for text + icon balance'],
      inspirationSource: 'Gmail recipient chips',
      craftDetails: ['accent background for selected state', 'destructive color on remove hover only'],
    },
  },
  {
    id: 'chip-choice',
    name: 'Choice Chip',
    category: 'atom',
    type: 'chip',
    variant: 'choice',
    tags: ['radio', 'toggle', 'selection'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'ecommerce', 'general'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<button className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:border-primary" aria-pressed="false">
  <span>Medium</span>
</button>`,
    tailwindClasses: {
      chip: 'inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:border-primary',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-pressed'],
      htmlAttributes: ['type="button"'],
      keyboardNav: 'Tab to focus, Space/Enter to toggle',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: {
      semanticElement: 'button',
    },
    responsive: {
      strategy: 'mobile-first',
      breakpoints: [],
    },
    quality: {
      antiGeneric: [
        'aria-pressed state styling instead of separate classes',
        'rounded-full for pill aesthetic',
        'border color changes on selection',
      ],
      inspirationSource: 'Material Design choice chips',
      craftDetails: ['px-4 py-2 for comfortable tap target (44px height)', 'hover state distinct from selected state'],
    },
  },
  {
    id: 'chip-action',
    name: 'Action Chip',
    category: 'atom',
    type: 'chip',
    variant: 'action',
    tags: ['action', 'button', 'cta'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'general'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
  <span>Add Item</span>
</button>`,
    tailwindClasses: {
      chip: 'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: [],
      htmlAttributes: ['type="button"'],
      keyboardNav: 'Tab to focus, Enter/Space to activate',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: {
      semanticElement: 'button',
    },
    responsive: {
      strategy: 'mobile-first',
      breakpoints: [],
    },
    quality: {
      antiGeneric: [
        'leading icon for action affordance',
        'primary background for high emphasis',
        'rounded-full for friendly aesthetic',
      ],
      inspirationSource: 'Notion add button chips',
      craftDetails: ['gap-2 for icon-text optical balance', 'hover opacity at 90% not 80% for subtlety'],
    },
  },
  {
    id: 'chip-status',
    name: 'Status Chip',
    category: 'atom',
    type: 'chip',
    variant: 'status',
    tags: ['status', 'badge', 'indicator'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'general'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-success/10 text-success border border-success/20">
  <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
  <span>Active</span>
</div>`,
    tailwindClasses: {
      chip: 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-success/10 text-success border border-success/20',
      indicator: 'w-1.5 h-1.5 rounded-full bg-success animate-pulse',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-live="polite"'],
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
        'pulsing dot indicator for live status',
        'success color with 10% background tint',
        'border at 20% opacity for depth',
      ],
      inspirationSource: 'Vercel deployment status chips',
      craftDetails: [
        '1.5px dot for subtle prominence',
        'xs text size for compact status display',
        'animate-pulse respects prefers-reduced-motion',
      ],
    },
  },
  {
    id: 'chip-removable',
    name: 'Removable Chip',
    category: 'atom',
    type: 'chip',
    variant: 'removable',
    tags: ['tag', 'removable', 'close'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'general'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-foreground border border-border group">
  <span>TypeScript</span>
  <button className="opacity-60 hover:opacity-100 hover:text-destructive transition-all" aria-label="Remove TypeScript">
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>`,
    tailwindClasses: {
      chip: 'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-foreground border border-border group',
      removeButton: 'opacity-60 hover:opacity-100 hover:text-destructive transition-all',
    },
    a11y: {
      roles: ['group'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab to focus remove button, Enter/Space to remove',
      contrastRatio: '4.5:1',
      focusVisible: true,
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
        'rounded-lg not rounded-full for code/tech tags',
        'opacity transition on remove button',
        'group hover state capability',
      ],
      inspirationSource: 'GitHub topic tags',
      craftDetails: [
        '60% opacity baseline for subtle remove affordance',
        'destructive color only on hover for non-alarming UX',
      ],
    },
  },
];
