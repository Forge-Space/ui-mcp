import type { IComponentSnippet } from '../types.js';

export const commandMenuSnippets: IComponentSnippet[] = [
  {
    id: 'command-spotlight',
    name: 'Spotlight Command Menu',
    category: 'molecule',
    type: 'command-menu',
    variant: 'spotlight',
    tags: ['command', 'search', 'keyboard', 'modal'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'devtools', 'general'],
    visualStyles: ['soft-depth', 'linear-modern', 'dark-premium'],
    jsx: `<div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" data-state="open">
  <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg">
    <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Type a command or search..."
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
        />
        <kbd className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded border border-border">ESC</kbd>
      </div>
      <div className="max-h-80 overflow-y-auto p-2">
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Suggestions</div>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground text-left transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div className="flex-1">
            <div className="text-sm font-medium">Create new document</div>
            <div className="text-xs text-muted-foreground">Start with a blank page</div>
          </div>
          <kbd className="px-1.5 py-0.5 text-xs bg-muted text-muted-foreground rounded">⌘N</kbd>
        </button>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      overlay: 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
      container: 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg',
      content: 'bg-card border border-border rounded-lg shadow-lg overflow-hidden',
      searchBar: 'flex items-center gap-2 px-4 py-3 border-b border-border',
      input: 'flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm',
      kbd: 'px-2 py-1 text-xs bg-muted text-muted-foreground rounded border border-border',
      list: 'max-h-80 overflow-y-auto p-2',
      sectionLabel: 'px-2 py-1.5 text-xs font-medium text-muted-foreground',
      item: 'w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground text-left transition-colors',
      itemTitle: 'text-sm font-medium',
      itemSubtitle: 'text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['dialog', 'searchbox', 'listbox', 'option'],
      ariaAttributes: ['aria-label', 'aria-modal="true"', 'aria-haspopup="listbox"'],
      htmlAttributes: ['type="text"'],
      keyboardNav: 'CMD+K to open, Arrow keys to navigate, Enter to select, ESC to close',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: {
      semanticElement: 'div',
    },
    responsive: {
      strategy: 'mobile-first',
      breakpoints: ['md:max-w-2xl'],
    },
    quality: {
      antiGeneric: [
        'backdrop blur overlay for depth',
        'keyboard shortcuts displayed inline',
        'two-line item layout with title + subtitle',
        'section labels for grouping',
      ],
      inspirationSource: 'Raycast command palette',
      craftDetails: [
        'centered modal with transform translate',
        'max-h-80 for scrollable results',
        'gap-3 for icon-content spacing',
        'rounded-md items for subtle containment',
      ],
    },
  },
  {
    id: 'command-omnibar',
    name: 'Omnibar Command Menu',
    category: 'molecule',
    type: 'command-menu',
    variant: 'omnibar',
    tags: ['omnibar', 'search', 'navigation'],
    mood: ['professional', 'minimal'],
    industry: ['devtools', 'saas', 'general'],
    visualStyles: ['linear-modern', 'minimal-editorial'],
    jsx: `<div className="w-full max-w-2xl mx-auto">
  <div className="relative">
    <div className="flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-lg">
      <kbd className="px-1.5 py-0.5 text-xs bg-background text-muted-foreground rounded border border-border">⌘</kbd>
      <input
        type="text"
        placeholder="Jump to..."
        className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
      />
    </div>
    <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
      <div className="p-2 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-accent text-accent-foreground">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <span className="flex-1 text-left text-sm font-medium">Projects</span>
          <span className="text-xs text-muted-foreground">12 items</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="flex-1 text-left text-sm font-medium">Team members</span>
          <span className="text-xs text-muted-foreground">8 items</span>
        </button>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full max-w-2xl mx-auto',
      wrapper: 'relative',
      searchBar: 'flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-lg',
      kbd: 'px-1.5 py-0.5 text-xs bg-background text-muted-foreground rounded border border-border',
      input: 'flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm',
      dropdown:
        'absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden',
      list: 'p-2 space-y-1',
      item: 'w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors',
      itemActive: 'w-full flex items-center gap-3 px-3 py-2 rounded-md bg-accent text-accent-foreground',
      itemText: 'flex-1 text-left text-sm font-medium',
      itemCount: 'text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['combobox', 'listbox', 'option'],
      ariaAttributes: ['aria-expanded', 'aria-controls', 'aria-activedescendant'],
      htmlAttributes: ['type="text"'],
      keyboardNav: 'Arrow keys to navigate, Enter to select, ESC to close',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: {
      semanticElement: 'div',
    },
    responsive: {
      strategy: 'mobile-first',
      breakpoints: ['md:max-w-3xl'],
    },
    quality: {
      antiGeneric: [
        'inline keyboard hint in search bar',
        'absolute dropdown positioning',
        'item count metadata',
        'space-y-1 for compact list spacing',
      ],
      inspirationSource: 'GitHub command palette',
      craftDetails: [
        'muted search bar background for input affordance',
        'mt-2 gap between input and dropdown',
        'gap-3 for icon-text-metadata layout',
      ],
    },
  },
  {
    id: 'command-nested',
    name: 'Nested Command Menu',
    category: 'molecule',
    type: 'command-menu',
    variant: 'nested',
    tags: ['command', 'nested', 'hierarchy'],
    mood: ['professional', 'minimal'],
    industry: ['devtools', 'saas', 'general'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="w-full max-w-lg bg-card border border-border rounded-lg shadow-lg overflow-hidden">
  <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
    <button className="p-1 hover:bg-accent rounded transition-colors" aria-label="Back">
      <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <input
      type="text"
      placeholder="Search settings..."
      className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
    />
  </div>
  <div className="max-h-96 overflow-y-auto">
    <div className="p-2 space-y-1">
      <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground flex items-center gap-2">
        <span>Appearance</span>
        <span className="text-muted-foreground/60">›</span>
        <span>Theme</span>
      </div>
      <button className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
        <span className="text-sm font-medium">System</span>
        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      <button className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
        <span className="text-sm font-medium">Light</span>
      </button>
      <button className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
        <span className="text-sm font-medium">Dark</span>
      </button>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full max-w-lg bg-card border border-border rounded-lg shadow-lg overflow-hidden',
      header: 'flex items-center gap-2 px-4 py-3 border-b border-border',
      backButton: 'p-1 hover:bg-accent rounded transition-colors',
      input: 'flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm',
      content: 'max-h-96 overflow-y-auto',
      list: 'p-2 space-y-1',
      breadcrumb: 'px-2 py-1.5 text-xs font-medium text-muted-foreground flex items-center gap-2',
      item: 'w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors',
      itemText: 'text-sm font-medium',
    },
    a11y: {
      roles: ['navigation', 'searchbox', 'listbox', 'option'],
      ariaAttributes: ['aria-label', 'aria-current'],
      htmlAttributes: ['type="text"'],
      keyboardNav: 'Arrow keys to navigate, Enter to select, Backspace to go back',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: {
      semanticElement: 'div',
    },
    responsive: {
      strategy: 'mobile-first',
      breakpoints: ['md:max-w-xl'],
    },
    quality: {
      antiGeneric: [
        'breadcrumb trail with › separator',
        'back button for navigation',
        'checkmark indicator for selected option',
        'max-h-96 for scrollable nested content',
      ],
      inspirationSource: 'Linear settings command menu',
      craftDetails: [
        'border-b on header for separation',
        'space-y-1 for compact options',
        'justify-between for option + checkmark layout',
      ],
    },
  },
  {
    id: 'command-recent',
    name: 'Recent Items Command Menu',
    category: 'molecule',
    type: 'command-menu',
    variant: 'recent',
    tags: ['command', 'recent', 'history'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'devtools', 'general'],
    visualStyles: ['linear-modern', 'minimal-editorial'],
    jsx: `<div className="w-full max-w-md bg-card border border-border rounded-lg shadow-lg overflow-hidden">
  <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
    <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <input
      type="text"
      placeholder="Recent files..."
      className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
    />
  </div>
  <div className="max-h-80 overflow-y-auto p-2 space-y-1">
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
      <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <div className="flex-1 text-left">
        <div className="text-sm font-medium">Design System.md</div>
        <div className="text-xs text-muted-foreground">Updated 2 hours ago</div>
      </div>
      <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded transition-all" aria-label="Remove from recent">
        <svg className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </button>
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
      <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
      <div className="flex-1 text-left">
        <div className="text-sm font-medium">Components</div>
        <div className="text-xs text-muted-foreground">Opened yesterday</div>
      </div>
      <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded transition-all" aria-label="Remove from recent">
        <svg className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full max-w-md bg-card border border-border rounded-lg shadow-lg overflow-hidden',
      header: 'flex items-center gap-2 px-4 py-3 border-b border-border',
      input: 'flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm',
      list: 'max-h-80 overflow-y-auto p-2 space-y-1',
      item: 'w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group',
      itemContent: 'flex-1 text-left',
      itemTitle: 'text-sm font-medium',
      itemMeta: 'text-xs text-muted-foreground',
      removeButton: 'opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded transition-all',
    },
    a11y: {
      roles: ['searchbox', 'list', 'listitem', 'button'],
      ariaAttributes: ['aria-label'],
      htmlAttributes: ['type="text"'],
      keyboardNav: 'Arrow keys to navigate, Enter to open, ESC to close',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: {
      semanticElement: 'div',
    },
    responsive: {
      strategy: 'mobile-first',
      breakpoints: ['md:max-w-lg'],
    },
    quality: {
      antiGeneric: [
        'time-based metadata (2 hours ago, yesterday)',
        'group hover reveals remove button',
        'two-line item with title + timestamp',
        'clock icon in search bar for recency context',
      ],
      inspirationSource: 'Notion recent pages',
      craftDetails: [
        'opacity-0 to opacity-100 on remove button hover',
        'destructive color hint on remove hover',
        'space-y-1 for compact recent list',
      ],
    },
  },
  {
    id: 'command-ai',
    name: 'AI Command Menu',
    category: 'molecule',
    type: 'command-menu',
    variant: 'ai',
    tags: ['ai', 'command', 'assistant', 'prompt'],
    mood: ['professional', 'futuristic'],
    industry: ['saas', 'devtools', 'general'],
    visualStyles: ['gradient-mesh', 'linear-modern', 'dark-premium'],
    jsx: `<div className="w-full max-w-xl bg-card border border-border rounded-lg shadow-lg overflow-hidden">
  <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
      <svg className="w-3.5 h-3.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
    <input
      type="text"
      placeholder="Ask AI anything..."
      className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
    />
    <kbd className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded border border-border">⌘K</kbd>
  </div>
  <div className="max-h-96 overflow-y-auto p-2 space-y-2">
    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Suggested prompts</div>
    <button className="w-full flex items-start gap-3 px-3 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-left">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">Generate component code</div>
        <div className="text-xs text-muted-foreground mt-0.5">Create a new React component with TypeScript</div>
      </div>
    </button>
    <button className="w-full flex items-start gap-3 px-3 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-left">
      <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">Explain this code</div>
        <div className="text-xs text-muted-foreground mt-0.5">Get a detailed explanation of the selected code</div>
      </div>
    </button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full max-w-xl bg-card border border-border rounded-lg shadow-lg overflow-hidden',
      header: 'flex items-center gap-2 px-4 py-3 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5',
      icon: 'w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center',
      input: 'flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm',
      kbd: 'px-2 py-1 text-xs bg-muted text-muted-foreground rounded border border-border',
      list: 'max-h-96 overflow-y-auto p-2 space-y-2',
      sectionLabel: 'px-2 py-1.5 text-xs font-medium text-muted-foreground',
      item: 'w-full flex items-start gap-3 px-3 py-2.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-left',
      itemIcon: 'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
      itemContent: 'flex-1',
      itemTitle: 'text-sm font-medium',
      itemDescription: 'text-xs text-muted-foreground mt-0.5',
    },
    a11y: {
      roles: ['dialog', 'searchbox', 'list', 'button'],
      ariaAttributes: ['aria-label', 'aria-modal="true"'],
      htmlAttributes: ['type="text"'],
      keyboardNav: 'CMD+K to open, Arrow keys to navigate, Enter to select, ESC to close',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: {
      semanticElement: 'div',
    },
    responsive: {
      strategy: 'mobile-first',
      breakpoints: ['md:max-w-2xl'],
    },
    quality: {
      antiGeneric: [
        'gradient header background for AI branding',
        'gradient AI icon with lightning bolt',
        'colored icon backgrounds (primary/success) for prompt categories',
        'two-line prompts with title + description',
        'space-y-2 for breathing room between prompts',
      ],
      inspirationSource: 'Cursor AI command palette',
      craftDetails: [
        'items-start alignment for multi-line content',
        'flex-shrink-0 on icons to prevent squishing',
        'mt-0.5 for tight description spacing',
        'py-2.5 for taller touch targets on prompts',
      ],
    },
  },
];
