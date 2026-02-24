import type { IComponentSnippet } from '../types.js';

export const searchSnippets: IComponentSnippet[] = [
  {
    id: 'search-basic',
    name: 'Basic Search',
    category: 'molecule',
    type: 'search',
    variant: 'basic',
    tags: ['search', 'input', 'filter'],
    mood: ['professional', 'minimal'] as const,
    industry: ['saas', 'general'] as const,
    visualStyles: ['soft-depth'] as const,
    jsx: `<div className="relative">
  <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
  <input
    type="search"
    placeholder="Search..."
    className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
  />
</div>`,
    tailwindClasses: {
      root: 'relative',
    },
    a11y: {
      roles: ['search'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Type to search, Escape to clear',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['sm'] },
    quality: {
      antiGeneric: ['Icon prefix', 'Focus ring', 'Semantic search input'],
      inspirationSource: 'GitHub',
      craftDetails: ['Icon positioning', 'Clear affordances', 'Consistent padding'],
    },
  },
  {
    id: 'search-with-filters',
    name: 'Search with Filters',
    category: 'molecule',
    type: 'search',
    variant: 'filters',
    tags: ['search', 'filter', 'dropdown'],
    mood: ['professional', 'minimal'] as const,
    industry: ['saas', 'ecommerce'] as const,
    visualStyles: ['soft-depth'] as const,
    jsx: `<div className="flex gap-2">
  <div className="relative flex-1">
    <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      type="search"
      placeholder="Search products..."
      className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
  <button className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent">
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
    Filters
  </button>
</div>`,
    tailwindClasses: {
      root: 'flex gap-2',
    },
    a11y: {
      roles: ['search'],
      ariaAttributes: ['aria-label', 'aria-expanded'],
      keyboardNav: 'Tab to filters, Enter to expand',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['sm'] },
    quality: {
      antiGeneric: ['Filter button', 'Combined search and filter', 'Icon indicators'],
      inspirationSource: 'Shopify',
      craftDetails: ['Flexible layout', 'Clear button affordances', 'Icon + text pattern'],
    },
  },
  {
    id: 'search-command-palette',
    name: 'Command Palette Search',
    category: 'molecule',
    type: 'search',
    variant: 'command',
    tags: ['search', 'command', 'keyboard'],
    mood: ['professional', 'futuristic'] as const,
    industry: ['devtools', 'saas'] as const,
    visualStyles: ['soft-depth'] as const,
    jsx: `<div className="w-full max-w-2xl">
  <div className="relative">
    <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      type="search"
      placeholder="Search or jump to..."
      className="h-12 w-full rounded-lg border border-input bg-background pl-12 pr-24 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
      <kbd className="inline-flex h-6 items-center gap-0.5 rounded border border-input bg-muted px-2 text-xs font-medium text-muted-foreground">
        <span>⌘</span>K
      </kbd>
    </div>
  </div>
  <div className="mt-2 rounded-lg border border-input bg-card shadow-lg">
    <div className="p-2">
      <div className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent">
        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="flex-1 text-sm text-foreground">Dashboard</span>
        <span className="text-xs text-muted-foreground">⌘D</span>
      </div>
      <div className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent">
        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        </svg>
        <span className="flex-1 text-sm text-foreground">Settings</span>
        <span className="text-xs text-muted-foreground">⌘,</span>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      root: 'w-full max-w-2xl',
    },
    a11y: {
      roles: ['search', 'listbox'],
      ariaAttributes: ['aria-label', 'aria-activedescendant'],
      keyboardNav: 'Cmd+K to open, Arrow keys to navigate, Enter to select',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['sm'] },
    quality: {
      antiGeneric: ['Keyboard shortcut display', 'Quick actions', 'Icon indicators'],
      inspirationSource: 'Raycast',
      craftDetails: ['Command palette pattern', 'Keyboard shortcuts', 'Dropdown results'],
    },
  },
];
