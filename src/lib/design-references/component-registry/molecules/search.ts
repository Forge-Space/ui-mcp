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
  {
    id: 'search-results-list',
    name: 'Search Results List',
    category: 'molecule',
    type: 'search',
    variant: 'results-list',
    tags: ['search', 'results', 'list'],
    mood: ['professional', 'minimal'] as const,
    industry: ['general', 'saas', 'devtools'] as const,
    visualStyles: ['soft-depth', 'linear-modern'] as const,
    jsx: `<div className="rounded-lg border border-input bg-card shadow-lg">
  <div className="p-3 border-b border-input">
    <p className="text-xs text-muted-foreground">Found 4 results for "<span className="font-medium text-foreground">react hooks</span>"</p>
  </div>
  <div className="max-h-96 overflow-y-auto">
    <div className="p-2 space-y-1">
      <a href="#" className="flex items-start gap-3 rounded-md px-3 py-2 hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-5 w-5 shrink-0 mt-0.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z" /></svg>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground">Getting Started with React Hooks</div>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">Learn how to use useState and useEffect in your React components...</p>
        </div>
      </a>
      <a href="#" className="flex items-start gap-3 rounded-md px-3 py-2 hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-5 w-5 shrink-0 mt-0.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground">Custom Hooks Best Practices</div>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">Build reusable logic with custom hooks and avoid common pitfalls...</p>
        </div>
      </a>
      <a href="#" className="flex items-start gap-3 rounded-md px-3 py-2 hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-5 w-5 shrink-0 mt-0.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25z" /></svg>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground">React Hooks Video Tutorial</div>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">45-minute deep dive into all built-in hooks with live examples...</p>
        </div>
      </a>
      <a href="#" className="flex items-start gap-3 rounded-md px-3 py-2 hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-5 w-5 shrink-0 mt-0.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground">React Hooks API Reference</div>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">Complete documentation for all React hooks with usage examples...</p>
        </div>
      </a>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      root: 'rounded-lg border border-input bg-card shadow-lg',
      header: 'p-3 border-b border-input',
      headerText: 'text-xs text-muted-foreground',
      query: 'font-medium text-foreground',
      resultsContainer: 'max-h-96 overflow-y-auto',
      resultsList: 'p-2 space-y-1',
      resultItem:
        'flex items-start gap-3 rounded-md px-3 py-2 hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      icon: 'h-5 w-5 shrink-0 mt-0.5 text-muted-foreground',
      content: 'flex-1 min-w-0',
      title: 'text-sm font-medium text-foreground',
      description: 'text-xs text-muted-foreground mt-0.5 line-clamp-1',
    },
    a11y: {
      roles: ['list', 'listitem'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab through results, Enter to select',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'result count with search query highlight',
        'icon indicators for content type (doc, code, video, reference)',
        'line-clamp-1 for consistent description heights',
        'max-h-96 scrollable container',
      ],
      inspirationSource: 'Algolia DocSearch',
      craftDetails: [
        'shrink-0 mt-0.5 aligns icons with text baseline',
        'min-w-0 prevents flex overflow on long titles',
        'space-y-1 tight result spacing',
        'hover:bg-accent for clear interaction feedback',
      ],
    },
  },
  {
    id: 'search-autocomplete-dropdown',
    name: 'Autocomplete Dropdown',
    category: 'molecule',
    type: 'search',
    variant: 'autocomplete',
    tags: ['search', 'autocomplete', 'dropdown', 'suggestions'],
    mood: ['professional', 'minimal'] as const,
    industry: ['general', 'saas', 'ecommerce'] as const,
    visualStyles: ['soft-depth', 'linear-modern'] as const,
    jsx: `<div className="relative w-full max-w-md">
  <div className="relative">
    <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
    <input
      type="search"
      placeholder="Search products..."
      className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      aria-autocomplete="list"
      aria-expanded="true"
      role="combobox"
    />
  </div>
  <div className="absolute top-full left-0 right-0 mt-2 rounded-lg border border-input bg-card shadow-lg z-50">
    <div className="p-2">
      <div className="mb-2 px-3 py-1.5 text-xs font-medium text-muted-foreground">Suggestions</div>
      <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
        <span className="flex-1 text-sm text-foreground">wireless headphones</span>
        <kbd className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">⌘1</kbd>
      </a>
      <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
        <span className="flex-1 text-sm text-foreground">bluetooth speakers</span>
        <kbd className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">⌘2</kbd>
      </a>
      <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
        <span className="flex-1 text-sm text-foreground">laptop accessories</span>
        <kbd className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">⌘3</kbd>
      </a>
      <div className="mt-2 border-t border-input pt-2">
        <div className="mb-2 px-3 py-1.5 text-xs font-medium text-muted-foreground">Recent</div>
        <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
          <span className="flex-1 text-sm text-muted-foreground">mechanical keyboards</span>
        </a>
        <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
          <span className="flex-1 text-sm text-muted-foreground">usb-c cables</span>
        </a>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      root: 'relative w-full max-w-md',
      inputWrapper: 'relative',
      icon: 'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground',
      input:
        'h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary',
      dropdown: 'absolute top-full left-0 right-0 mt-2 rounded-lg border border-input bg-card shadow-lg z-50',
      dropdownContent: 'p-2',
      sectionLabel: 'mb-2 px-3 py-1.5 text-xs font-medium text-muted-foreground',
      suggestionItem:
        'flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      suggestionIcon: 'h-4 w-4 shrink-0 text-muted-foreground',
      suggestionText: 'flex-1 text-sm text-foreground',
      shortcut: 'inline-flex items-center rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground',
      separator: 'mt-2 border-t border-input pt-2',
      recentText: 'flex-1 text-sm text-muted-foreground',
    },
    a11y: {
      roles: ['combobox', 'listbox'],
      ariaAttributes: ['aria-autocomplete="list"', 'aria-expanded', 'aria-controls'],
      keyboardNav: 'Arrow keys to navigate, Enter to select, Cmd+number for shortcuts',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'keyboard shortcuts (⌘1, ⌘2, ⌘3) for quick selection',
        'grouped sections (suggestions vs recent)',
        'icon differentiation (search vs clock)',
        'recent items with muted text',
      ],
      inspirationSource: 'Raycast search',
      craftDetails: [
        'z-50 ensures dropdown appears above content',
        'top-full left-0 right-0 for full-width dropdown',
        'border-t separator between sections',
        'shrink-0 on icons prevents squishing',
      ],
    },
  },
];
