import type { IComponentSnippet } from '../types.js';

export const paginationSnippets: IComponentSnippet[] = [
  {
    id: 'pagination-simple',
    name: 'Simple Pagination',
    category: 'molecule',
    type: 'pagination',
    variant: 'simple',
    tags: ['navigation', 'pages', 'basic', 'minimal-editorial'],
    mood: ['minimal', 'professional'],
    industry: ['general', 'media', 'devtools'],
    visualStyles: ['minimal-editorial', 'linear-modern'],
    jsx: `<div className="flex items-center justify-between">
  <button className="rounded-md border border-border bg-card px-4 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50" disabled>
    Previous
  </button>
  <span className="text-sm text-muted-foreground">Page 2 of 10</span>
  <button className="rounded-md border border-border bg-card px-4 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
    Next
  </button>
</div>`,
    tailwindClasses: {
      container: 'flex items-center justify-between',
      button:
        'rounded-md border border-border bg-card px-4 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
      info: 'text-sm text-muted-foreground',
    },
    a11y: {
      roles: ['navigation'],
      ariaAttributes: ['role=navigation', 'aria-label=Pagination'],
      keyboardNav: 'Tab to buttons, Enter activates',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav' },
    responsive: { strategy: 'mobile-first', breakpoints: ['justify-between for edge alignment'] },
    quality: {
      antiGeneric: [
        'disabled:opacity-50 for clear inactive state',
        'disabled:pointer-events-none prevents interaction',
      ],
      inspirationSource: 'GitHub simple pagination pattern',
      craftDetails: ['text-muted-foreground for page info', 'transition-colors for smooth hover'],
    },
  },
  {
    id: 'pagination-full',
    name: 'Full Pagination',
    category: 'molecule',
    type: 'pagination',
    variant: 'full',
    tags: ['navigation', 'linear-modern', 'complete', 'pages'],
    mood: ['professional', 'professional'],
    industry: ['saas', 'ecommerce', 'saas'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<nav className="flex items-center gap-1">
  <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50" disabled>
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
  </button>
  <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
    1
  </button>
  <button className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-primary bg-primary text-sm font-medium text-primary-foreground">
    2
  </button>
  <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
    3
  </button>
  <span className="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground">...</span>
  <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
    10
  </button>
  <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
  </button>
</nav>`,
    tailwindClasses: {
      container: 'flex items-center gap-1',
      button:
        'flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      active:
        'flex h-8 w-8 items-center justify-center rounded-md border-2 border-primary bg-primary text-sm font-medium text-primary-foreground',
      ellipsis: 'flex h-8 w-8 items-center justify-center text-sm text-muted-foreground',
    },
    a11y: {
      roles: ['navigation'],
      ariaAttributes: ['role=navigation', 'aria-label=Pagination', 'aria-current=page'],
      keyboardNav: 'Tab navigates page numbers, Enter selects',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav' },
    responsive: { strategy: 'mobile-first', breakpoints: ['h-8 w-8 square buttons', 'gap-1 tight spacing'] },
    quality: {
      antiGeneric: ['border-2 border-primary for active page emphasis', 'h-8 w-8 consistent square dimensions'],
      inspirationSource: 'Ant Design Pagination component',
      craftDetails: ['font-medium for active page number', 'ellipsis for truncated page ranges'],
    },
  },
  {
    id: 'pagination-input',
    name: 'Input Pagination',
    category: 'molecule',
    type: 'pagination',
    variant: 'input',
    tags: ['jump', 'input', 'direct', 'navigation'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="flex items-center gap-4">
  <div className="flex items-center gap-2">
    <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50" disabled>
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
    </button>
    <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
    </button>
  </div>
  <div className="flex items-center gap-2 text-sm">
    <span className="text-muted-foreground">Page</span>
    <input type="number" min="1" max="10" value="2" className="h-8 w-16 rounded-md border border-border bg-card px-2 text-center text-card-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
    <span className="text-muted-foreground">of 10</span>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex items-center gap-4',
      buttonGroup: 'flex items-center gap-2',
      button:
        'flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
      inputGroup: 'flex items-center gap-2 text-sm',
      input:
        'h-8 w-16 rounded-md border border-border bg-card px-2 text-center text-card-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary',
    },
    a11y: {
      roles: ['navigation'],
      ariaAttributes: ['role=navigation', 'aria-label=Page navigation'],
      keyboardNav: 'Tab to input, type page number, Enter jumps to page',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-16 for 2-3 digit page numbers'] },
    quality: {
      antiGeneric: ['text-center for input alignment', 'focus:ring-1 focus:ring-primary for clear focus state'],
      inspirationSource: 'Ant Design Pagination with quick jumper',
      craftDetails: ['type=number with min/max constraints', 'gap-4 separates controls from input'],
    },
  },
  {
    id: 'pagination-compact',
    name: 'Compact Pagination',
    category: 'molecule',
    type: 'pagination',
    variant: 'minimal-editorial',
    tags: ['minimal-editorial', 'small', 'space-saving', 'linear-modern'],
    mood: ['minimal', 'minimal'],
    industry: ['general', 'saas', 'general'],
    visualStyles: ['minimal-editorial', 'minimal-editorial'],
    jsx: `<div className="inline-flex items-center gap-1 rounded-md border border-border bg-card p-1">
  <button className="flex h-7 w-7 items-center justify-center rounded text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50" disabled>
    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
  </button>
  <div className="flex h-7 items-center gap-1 px-2">
    <span className="text-xs font-medium text-foreground">2</span>
    <span className="text-xs text-muted-foreground">/</span>
    <span className="text-xs text-muted-foreground">10</span>
  </div>
  <button className="flex h-7 w-7 items-center justify-center rounded text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
  </button>
</div>`,
    tailwindClasses: {
      container: 'inline-flex items-center gap-1 rounded-md border border-border bg-card p-1',
      button:
        'flex h-7 w-7 items-center justify-center rounded text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
      info: 'flex h-7 items-center gap-1 px-2',
      current: 'text-xs font-medium text-foreground',
      separator: 'text-xs text-muted-foreground',
      total: 'text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['navigation'],
      ariaAttributes: ['role=navigation', 'aria-label=Pagination'],
      keyboardNav: 'Tab between prev/next, Enter activates',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav' },
    responsive: { strategy: 'mobile-first', breakpoints: ['h-7 w-7 compact touch targets'] },
    quality: {
      antiGeneric: ['h-3 w-3 smaller icons for compact size', 'gap-1 minimal spacing throughout'],
      inspirationSource: 'Mobile-first pagination patterns',
      craftDetails: ['font-medium for current page emphasis', 'inline-flex for minimal footprint'],
    },
  },
  {
    id: 'pagination-infinite-scroll',
    name: 'Infinite Scroll Trigger',
    category: 'molecule',
    type: 'pagination',
    variant: 'infinite-scroll',
    tags: ['loading', 'infinite', 'lazy', 'scroll'],
    mood: ['futuristic', 'minimal'],
    industry: ['media', 'ecommerce', 'media'],
    visualStyles: ['minimal-editorial', 'soft-depth'],
    jsx: `<div className="flex flex-col items-center gap-3 py-6">
  <button className="rounded-md border border-border bg-card px-6 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
    Load More
  </button>
  <div className="flex items-center gap-2 text-xs text-muted-foreground">
    <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
    <span>Showing 20 of 156 items</span>
    <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex flex-col items-center gap-3 py-6',
      button:
        'rounded-md border border-border bg-card px-6 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      info: 'flex items-center gap-2 text-xs text-muted-foreground',
      dot: 'h-1 w-1 rounded-full bg-muted-foreground',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label=Load more items'],
      keyboardNav: 'Tab to button, Enter loads more content',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: ['flex-col for centered layout'] },
    quality: {
      antiGeneric: ['h-1 w-1 decorative dots', 'py-6 generous vertical spacing'],
      inspirationSource: 'Instagram/Twitter load more pattern',
      craftDetails: ['gap-2 between info elements', 'px-6 wider button for prominence'],
    },
  },
];
