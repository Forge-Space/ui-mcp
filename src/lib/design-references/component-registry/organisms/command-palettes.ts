import type { IComponentSnippet } from '../types.js';

export const commandPaletteSnippets: IComponentSnippet[] = [
  {
    id: 'command-palette-spotlight',
    name: 'Spotlight Command Palette',
    category: 'organism',
    type: 'command-palette',
    variant: 'spotlight',
    tags: ['command', 'search', 'navigation', 'keyboard', 'shortcuts'],
    mood: ['professional', 'minimal', 'futuristic'],
    industry: ['saas', 'devtools', 'general'],
    visualStyles: ['soft-depth', 'linear-modern', 'dark-premium'],
    jsx: `<div className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="command-palette-title">
  <div className="mt-24 w-full max-w-2xl overflow-hidden rounded-xl border bg-card shadow-2xl">
    <div className="flex items-center gap-3 border-b px-4 py-3">
      <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
      <input type="text" className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" placeholder="Type a command or search..." aria-label="Command search" id="command-palette-title" />
      <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">ESC</kbd>
    </div>
    <div className="max-h-[400px] overflow-y-auto p-2">
      <div className="mb-2 px-2 py-1 text-xs font-medium text-muted-foreground">Quick Actions</div>
      <button type="button" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Create new project</p>
          <p className="text-xs text-muted-foreground">Start a fresh workspace</p>
        </div>
        <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">⌘N</kbd>
      </button>
      <button type="button" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/10 text-accent-foreground">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Open recent file</p>
          <p className="text-xs text-muted-foreground">Access recently viewed items</p>
        </div>
        <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">⌘O</kbd>
      </button>
      <div className="mb-2 mt-4 px-2 py-1 text-xs font-medium text-muted-foreground">Settings</div>
      <button type="button" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
          <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Preferences</p>
          <p className="text-xs text-muted-foreground">Customize your experience</p>
        </div>
        <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">⌘,</kbd>
      </button>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      overlay: 'fixed inset-0 z-50 flex items-start justify-center bg-background/80 p-4 backdrop-blur-sm',
      container: 'mt-24 w-full max-w-2xl overflow-hidden rounded-xl border bg-card shadow-2xl',
      searchBar: 'flex items-center gap-3 border-b px-4 py-3',
      searchIcon: 'h-5 w-5 text-muted-foreground',
      searchInput: 'flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none',
      results: 'max-h-[400px] overflow-y-auto p-2',
      groupTitle: 'mb-2 px-2 py-1 text-xs font-medium text-muted-foreground',
      item: 'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none',
      itemIcon: 'flex h-8 w-8 items-center justify-center rounded-md',
      itemContent: 'flex-1',
      itemTitle: 'text-sm font-medium text-foreground',
      itemDescription: 'text-xs text-muted-foreground',
      kbd: 'rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground',
    },
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['aria-modal', 'aria-labelledby', 'aria-label on input'],
      keyboardNav: 'Arrow keys to navigate, Enter to select, Esc to close',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'backdrop-blur-sm for glassmorphism effect',
        'mt-24 positions palette at top 1/4 of viewport',
        'max-w-2xl constrains width for readability',
        'kbd tags for keyboard shortcuts visualization',
        'grouped commands with section headers',
      ],
      inspirationSource: 'macOS Spotlight / Raycast',
      craftDetails: [
        'shadow-2xl for elevated modal feel',
        'icon backgrounds use semantic color/10 for subtle branding',
        'max-h-[400px] with overflow-y-auto for long lists',
        'focus-visible:bg-accent for keyboard navigation',
      ],
    },
  },
  {
    id: 'command-palette-omnibar',
    name: 'Omnibar Command Palette',
    category: 'organism',
    type: 'command-palette',
    variant: 'omnibar',
    tags: ['omnibar', 'command', 'universal-search', 'quick-access'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'devtools', 'fintech'],
    visualStyles: ['linear-modern', 'soft-depth', 'minimal-editorial'],
    jsx: `<div className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="search" aria-label="Command omnibar">
  <div className="mx-auto max-w-5xl px-4 py-2">
    <div className="flex items-center gap-2">
      <button type="button" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Menu">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
      </button>
      <div className="relative flex-1">
        <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 transition-colors focus-within:bg-background focus-within:ring-2 focus-within:ring-ring">
          <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
          <input type="text" className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" placeholder="Search or jump to..." aria-label="Omnibar search" />
          <div className="flex items-center gap-1">
            <kbd className="hidden rounded bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground shadow-sm sm:inline-block">⌘</kbd>
            <kbd className="hidden rounded bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground shadow-sm sm:inline-block">K</kbd>
          </div>
        </div>
      </div>
      <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
        <span className="hidden sm:inline">New</span>
      </button>
      <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="User menu">
        <span className="text-xs font-medium">U</span>
      </button>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container:
        'fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      wrapper: 'mx-auto max-w-5xl px-4 py-2',
      toolbar: 'flex items-center gap-2',
      menuButton:
        'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      searchWrapper: 'relative flex-1',
      searchContainer:
        'flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 transition-colors focus-within:bg-background focus-within:ring-2 focus-within:ring-ring',
      searchIcon: 'h-4 w-4 text-muted-foreground',
      searchInput: 'flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none',
      kbd: 'hidden rounded bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground shadow-sm sm:inline-block',
      actionButton:
        'flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      avatar:
        'flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    },
    a11y: {
      roles: ['search'],
      ariaAttributes: ['aria-label on buttons and inputs'],
      keyboardNav: 'Tab through buttons, / to focus search, Cmd+K to open',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div', landmark: 'search' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'backdrop-blur with fallback for browser support',
        'focus-within:ring-2 for search container focus state',
        'hidden sm:inline-block for responsive kbd hints',
        'bg-muted/50 → bg-background transition on focus',
      ],
      inspirationSource: 'Linear omnibar / GitHub command bar',
      craftDetails: [
        'sticky top bar with blur background',
        'max-w-5xl centers content',
        'h-9 consistent height for all toolbar items',
        'supports-[backdrop-filter] for progressive enhancement',
      ],
    },
  },
  {
    id: 'command-palette-nested',
    name: 'Nested Command Palette',
    category: 'organism',
    type: 'command-palette',
    variant: 'nested',
    tags: ['command', 'nested', 'corporate', 'breadcrumb'],
    mood: ['professional', 'corporate'],
    industry: ['saas', 'devtools', 'agency'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="nested-command-title">
  <div className="w-full max-w-xl overflow-hidden rounded-xl border bg-card shadow-2xl">
    <div className="border-b px-4 py-3">
      <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
        <button type="button" className="hover:text-foreground transition-colors">Commands</button>
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        <span>Project Settings</span>
      </div>
      <div className="flex items-center gap-3">
        <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
        <input type="text" className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" placeholder="Search settings..." aria-label="Nested command search" id="nested-command-title" />
      </div>
    </div>
    <div className="max-h-[360px] overflow-y-auto p-2">
      <button type="button" className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none">
        <div className="flex items-center gap-3">
          <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
          <div>
            <p className="text-sm font-medium text-foreground">Team Members</p>
            <p className="text-xs text-muted-foreground">Manage access and roles</p>
          </div>
        </div>
        <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
      </button>
      <button type="button" className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none">
        <div className="flex items-center gap-3">
          <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
          <div>
            <p className="text-sm font-medium text-foreground">Security & Privacy</p>
            <p className="text-xs text-muted-foreground">Auth, encryption, compliance</p>
          </div>
        </div>
        <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
      </button>
      <button type="button" className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none">
        <div className="flex items-center gap-3">
          <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>
          <div>
            <p className="text-sm font-medium text-foreground">Notifications</p>
            <p className="text-xs text-muted-foreground">Email, push, in-app alerts</p>
          </div>
        </div>
        <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
      </button>
      <div className="my-2 border-t" />
      <button type="button" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none">
        <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Advanced Settings</p>
          <p className="text-xs text-muted-foreground">API keys, webhooks, integrations</p>
        </div>
      </button>
    </div>
    <div className="border-t bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
      <div className="flex items-center justify-between">
        <span>Navigate: ↑↓ · Select: ↵ · Back: ←</span>
        <span>ESC to close</span>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      overlay: 'fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm',
      container: 'w-full max-w-xl overflow-hidden rounded-xl border bg-card shadow-2xl',
      header: 'border-b px-4 py-3',
      breadcrumb: 'mb-2 flex items-center gap-1 text-xs text-muted-foreground',
      breadcrumbButton: 'hover:text-foreground transition-colors',
      searchBar: 'flex items-center gap-3',
      searchIcon: 'h-5 w-5 text-muted-foreground',
      searchInput: 'flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none',
      results: 'max-h-[360px] overflow-y-auto p-2',
      nestedItem:
        'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none',
      itemContent: 'flex items-center gap-3',
      itemTitle: 'text-sm font-medium text-foreground',
      itemDescription: 'text-xs text-muted-foreground',
      chevron: 'h-4 w-4 text-muted-foreground',
      divider: 'my-2 border-t',
      footer: 'border-t bg-muted/30 px-4 py-2 text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['aria-modal', 'aria-labelledby'],
      keyboardNav: 'Arrow keys to navigate, Enter to drill down, Backspace/Left to go up, Esc to close',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'breadcrumb navigation shows current context',
        'chevron icons indicate nested navigation',
        'footer with keyboard hints',
        'divider separates grouped vs ungrouped items',
      ],
      inspirationSource: 'VS Code command palette / Slack command menu',
      craftDetails: [
        'breadcrumb with clickable parent levels',
        'max-w-xl narrower than spotlight for nested focus',
        'py-2.5 taller items for nested hierarchy',
        'bg-muted/30 footer for subtle separation',
      ],
    },
  },
];
