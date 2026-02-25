import type { IComponentSnippet } from '../types.js';

export const modalSnippets: IComponentSnippet[] = [
  {
    id: 'modal-dialog',
    name: 'Standard Dialog Modal',
    category: 'molecule',
    type: 'general',
    variant: 'dialog',
    tags: ['dialog', 'overlay', 'popup', 'general'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <div className="relative w-full max-w-lg rounded-xl border bg-card p-6 text-card-foreground shadow-lg animate-in fade-in-0 zoom-in-95">
    <button type="button" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Close dialog">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
    </button>
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 id="dialog-title" className="text-lg font-semibold text-foreground">Edit Profile</h2>
        <p className="text-sm text-muted-foreground">Make changes to your profile information. Click save when you're done.</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="dialog-name" className="text-sm font-medium text-foreground">Name</label>
          <input id="dialog-name" type="text" className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" value="Jane Doe" />
        </div>
        <div className="space-y-2">
          <label htmlFor="dialog-email" className="text-sm font-medium text-foreground">Email</label>
          <input id="dialog-email" type="email" className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" value="jane@acme.co" />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <button type="button" className="inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Cancel</button>
        <button type="button" className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]">Save changes</button>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      overlay: 'fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm',
      dialog:
        'relative w-full max-w-lg rounded-xl border bg-card p-6 text-card-foreground shadow-lg animate-in fade-in-0 zoom-in-95',
      close:
        'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      title: 'text-lg font-semibold text-foreground',
      description: 'text-sm text-muted-foreground',
      input:
        'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      footer: 'flex justify-end gap-3',
    },
    animations: ['animate-in fade-in-0 zoom-in-95'],
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['aria-modal="true"', 'aria-labelledby', 'aria-label on close button'],
      keyboardNav: 'Escape to close, Tab through fields',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'animate-in fade-in-0 zoom-in-95 for smooth entrance',
        'backdrop-blur-sm on overlay',
        'absolute close button in consistent position',
        'aria-labelledby linking title',
      ],
      inspirationSource: 'shadcn/ui Dialog',
      craftDetails: [
        'z-50 for layering',
        'max-w-lg optimal reading width',
        'bg-background/80 semi-transparent overlay',
      ],
    },
  },
  {
    id: 'modal-drawer',
    name: 'Side Drawer Modal',
    category: 'molecule',
    type: 'general',
    variant: 'drawer',
    tags: ['drawer', 'sheet', 'sidebar', 'slide-out'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'ecommerce', 'general'],
    visualStyles: ['linear-modern', 'soft-depth', 'corporate-trust'],
    jsx: `<div className="fixed inset-0 z-50 flex bg-background/80 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
  <div className="fixed inset-y-0 right-0 flex w-full max-w-md flex-col border-l bg-background shadow-lg animate-in slide-in-from-right">
    <div className="flex items-center justify-between border-b px-6 py-4">
      <h2 id="drawer-title" className="text-lg font-semibold text-foreground">Shopping Cart</h2>
      <button type="button" className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Close drawer">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
      </button>
    </div>
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center" aria-hidden="true">
            <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h3 className="text-sm font-medium text-foreground">Premium Wireless Headphones</h3>
              <p className="mt-1 text-xs text-muted-foreground">Black, Medium</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button type="button" className="h-6 w-6 rounded border border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Decrease quantity">
                  <svg className="h-3 w-3 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>
                </button>
                <span className="text-sm font-medium text-foreground">1</span>
                <button type="button" className="h-6 w-6 rounded border border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Increase quantity">
                  <svg className="h-3 w-3 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </button>
              </div>
              <p className="text-sm font-medium text-foreground">$299.00</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center" aria-hidden="true">
            <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h3 className="text-sm font-medium text-foreground">Leather Laptop Sleeve</h3>
              <p className="mt-1 text-xs text-muted-foreground">Brown, 15 inch</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button type="button" className="h-6 w-6 rounded border border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Decrease quantity">
                  <svg className="h-3 w-3 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>
                </button>
                <span className="text-sm font-medium text-foreground">2</span>
                <button type="button" className="h-6 w-6 rounded border border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Increase quantity">
                  <svg className="h-3 w-3 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </button>
              </div>
              <p className="text-sm font-medium text-foreground">$118.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t px-6 py-4 space-y-4">
      <div className="space-y-1.5">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">$535.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground">$15.00</span>
        </div>
        <div className="flex justify-between border-t pt-1.5 font-medium">
          <span className="text-foreground">Total</span>
          <span className="text-foreground">$550.00</span>
        </div>
      </div>
      <button type="button" className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]">Checkout</button>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      overlay: 'fixed inset-0 z-50 flex bg-background/80 backdrop-blur-sm',
      drawer:
        'fixed inset-y-0 right-0 flex w-full max-w-md flex-col border-l bg-background shadow-lg animate-in slide-in-from-right',
      header: 'flex items-center justify-between border-b px-6 py-4',
      content: 'flex-1 overflow-y-auto px-6 py-6',
      footer: 'border-t px-6 py-4 space-y-4',
      productImage: 'h-20 w-20 rounded-lg bg-muted flex items-center justify-center',
      quantityButton:
        'h-6 w-6 rounded border border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    },
    animations: ['animate-in slide-in-from-right'],
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['aria-modal="true"', 'aria-labelledby', 'aria-label on buttons'],
      keyboardNav: 'Escape to close, Tab through interactive elements',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'slide-in-from-right animation',
        'sticky footer with totals and CTA',
        'overflow-y-auto content area for scrolling',
        'quantity steppers with +/- buttons',
      ],
      inspirationSource: 'Tailwind UI slide-over panels',
      craftDetails: [
        'inset-y-0 right-0 for right-side drawer',
        'max-w-md optimal drawer width',
        'flex-1 on content for footer push',
      ],
    },
  },
  {
    id: 'modal-command-palette',
    name: 'Command Palette Modal',
    category: 'molecule',
    type: 'general',
    variant: 'command-palette',
    tags: ['command', 'search', 'palette', 'quick-actions'],
    mood: ['professional', 'minimal', 'futuristic'],
    industry: ['devtools', 'saas', 'saas'],
    visualStyles: ['linear-modern', 'dark-premium', 'minimal-editorial'],
    jsx: `<div className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm pt-[20vh]" role="dialog" aria-modal="true" aria-labelledby="command-title">
  <div className="relative w-full max-w-2xl rounded-xl border bg-card shadow-2xl animate-in fade-in-0 zoom-in-95">
    <div className="flex items-center border-b px-4">
      <svg className="h-5 w-5 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
      <input type="text" className="flex h-12 w-full bg-transparent px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground" placeholder="Type a command or search..." aria-label="Command input" />
      <kbd className="hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </div>
    <div className="max-h-[400px] overflow-y-auto p-2">
      <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Suggestions</div>
      <div className="space-y-1">
        <button type="button" className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">
            <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
          </div>
          <div className="flex flex-1 flex-col items-start gap-0.5">
            <span className="font-medium text-foreground">Create new document</span>
            <span className="text-xs text-muted-foreground">Start with a blank page</span>
          </div>
          <kbd className="hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">⌘N</kbd>
        </button>
        <button type="button" className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">
            <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" /></svg>
          </div>
          <div className="flex flex-1 flex-col items-start gap-0.5">
            <span className="font-medium text-foreground">Open project</span>
            <span className="text-xs text-muted-foreground">Browse your projects</span>
          </div>
          <kbd className="hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">⌘O</kbd>
        </button>
        <button type="button" className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm bg-accent text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">
            <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.431.992a7.723 7.723 0 0 1 0 .255c-.007.378.138.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
          </div>
          <div className="flex flex-1 flex-col items-start gap-0.5">
            <span className="font-medium text-foreground">Preferences</span>
            <span className="text-xs text-muted-foreground">Manage settings</span>
          </div>
          <kbd className="hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">⌘,</kbd>
        </button>
      </div>
      <div className="mt-4 px-2 py-1.5 text-xs font-medium text-muted-foreground">Recent</div>
      <div className="space-y-1">
        <button type="button" className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground">
          <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
          <span className="flex-1 truncate text-left font-medium text-foreground">Project Alpha - Dashboard Redesign</span>
        </button>
        <button type="button" className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground">
          <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
          <span className="flex-1 truncate text-left font-medium text-foreground">Marketing Campaign Q1 2025</span>
        </button>
      </div>
    </div>
    <div className="flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <kbd className="h-5 select-none rounded border bg-muted px-1.5 font-mono font-medium">↑↓</kbd>
          <span>Navigate</span>
        </div>
        <div className="flex items-center gap-1">
          <kbd className="h-5 select-none rounded border bg-muted px-1.5 font-mono font-medium">↵</kbd>
          <span>Select</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <kbd className="h-5 select-none rounded border bg-muted px-1.5 font-mono font-medium">ESC</kbd>
        <span>Close</span>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      overlay: 'fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm pt-[20vh]',
      dialog: 'relative w-full max-w-2xl rounded-xl border bg-card shadow-2xl animate-in fade-in-0 zoom-in-95',
      searchBar: 'flex items-center border-b px-4',
      input:
        'flex h-12 w-full bg-transparent px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground',
      kbd: 'hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex',
      content: 'max-h-[400px] overflow-y-auto p-2',
      item: 'flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground',
      iconWrapper: 'flex h-8 w-8 items-center justify-center rounded-md border bg-background',
      footer: 'flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground',
    },
    animations: ['animate-in fade-in-0 zoom-in-95'],
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['aria-modal="true"', 'aria-labelledby', 'aria-label on input'],
      keyboardNav: 'Up/Down to navigate, Enter to select, Escape to close, ⌘K to open',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'pt-[20vh] for centered vertical positioning',
        'keyboard shortcuts displayed with kbd element',
        'categorized sections (Suggestions, Recent)',
        'footer hints for keyboard navigation',
      ],
      inspirationSource: 'Raycast command palette',
      craftDetails: [
        'max-w-2xl wider than standard dialog',
        'shadow-2xl for prominence',
        'h-12 input height for visibility',
      ],
    },
  },
  {
    id: 'modal-confirmation',
    name: 'Confirmation Dialog Modal',
    category: 'molecule',
    type: 'general',
    variant: 'confirmation',
    tags: ['confirm', 'alert', 'destructive', 'warning'],
    mood: ['professional', 'bold'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-description">
  <div className="relative w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground shadow-lg animate-in fade-in-0 zoom-in-95">
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
        <svg className="h-5 w-5 text-destructive" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
      </div>
      <div className="flex-1 space-y-3">
        <div className="space-y-1">
          <h2 id="confirm-title" className="text-lg font-semibold text-foreground">Delete Repository</h2>
          <p id="confirm-description" className="text-sm text-muted-foreground">This action cannot be undone. This will permanently delete the repository and remove all collaborator associations.</p>
        </div>
        <div className="space-y-2">
          <label htmlFor="confirm-input" className="text-sm font-medium text-foreground">Type <span className="font-mono text-destructive">user/repo</span> to confirm:</label>
          <input id="confirm-input" type="text" className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="user/repo" />
        </div>
        <div className="flex gap-3">
          <button type="button" className="inline-flex h-10 flex-1 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Cancel</button>
          <button type="button" className="inline-flex h-10 flex-1 items-center justify-center rounded-lg bg-destructive px-4 text-sm font-medium text-destructive-foreground transition-all hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50" disabled>Delete repository</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      overlay: 'fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm',
      dialog:
        'relative w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground shadow-lg animate-in fade-in-0 zoom-in-95',
      iconWrapper: 'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10',
      icon: 'h-5 w-5 text-destructive',
      title: 'text-lg font-semibold text-foreground',
      description: 'text-sm text-muted-foreground',
      confirmText: 'font-mono text-destructive',
      input:
        'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      deleteButton:
        'inline-flex h-10 flex-1 items-center justify-center rounded-lg bg-destructive px-4 text-sm font-medium text-destructive-foreground transition-all hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    },
    animations: ['animate-in fade-in-0 zoom-in-95'],
    a11y: {
      roles: ['alertdialog'],
      ariaAttributes: ['aria-modal="true"', 'aria-labelledby', 'aria-describedby', 'disabled on button'],
      keyboardNav: 'Tab through fields, Enter to confirm, Escape to cancel',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'alertdialog role for critical action',
        'warning icon with destructive/10 background',
        'confirmation input for double-check',
        'disabled state on delete button until validated',
      ],
      inspirationSource: 'GitHub delete repository dialog',
      craftDetails: [
        'bg-destructive/10 icon background for visual hierarchy',
        'font-mono on confirmation text',
        'flex-1 on buttons for equal width',
      ],
    },
  },
  {
    id: 'modal-lightbox',
    name: 'Image Lightbox Modal',
    category: 'molecule',
    type: 'general',
    variant: 'lightbox',
    tags: ['lightbox', 'image', 'media', 'viewer'],
    mood: ['minimal', 'editorial'],
    industry: ['media', 'ecommerce', 'agency'],
    visualStyles: ['dark-premium', 'minimal-editorial'],
    jsx: `<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Image viewer">
  <button type="button" className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white ring-offset-background transition-opacity hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Close lightbox">
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
  </button>
  <button type="button" className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white ring-offset-background transition-opacity hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Previous image">
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
  </button>
  <button type="button" className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white ring-offset-background transition-opacity hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Next image">
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
  </button>
  <div className="relative max-h-[90vh] max-w-[90vw] animate-in fade-in-0 zoom-in-95">
    <img src="/placeholder-image.jpg" alt="Mountain landscape at sunset with vibrant orange and purple sky" className="max-h-[90vh] w-auto rounded-lg object-contain shadow-2xl" />
    <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black/80 to-transparent px-6 py-4 text-white">
      <h3 className="text-lg font-semibold">Mountain Sunset Vista</h3>
      <p className="mt-1 text-sm text-white/80">Captured in the Swiss Alps, October 2024</p>
      <div className="mt-3 flex items-center gap-4 text-xs text-white/60">
        <span>Photo 3 of 12</span>
        <span>•</span>
        <span>1920 × 1080</span>
        <span>•</span>
        <span>2.4 MB</span>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      overlay: 'fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm',
      closeButton:
        'absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white ring-offset-background transition-opacity hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      navButton:
        'absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white ring-offset-background transition-opacity hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      imageWrapper: 'relative max-h-[90vh] max-w-[90vw] animate-in fade-in-0 zoom-in-95',
      image: 'max-h-[90vh] w-auto rounded-lg object-contain shadow-2xl',
      caption:
        'absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black/80 to-transparent px-6 py-4 text-white',
      metadata: 'mt-3 flex items-center gap-4 text-xs text-white/60',
    },
    animations: ['animate-in fade-in-0 zoom-in-95'],
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['aria-modal="true"', 'aria-label', 'alt text on image'],
      keyboardNav: 'Left/Right arrows for navigation, Escape to close',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'bg-black/90 for photo-focused dark overlay',
        'gradient caption overlay from-black/80',
        'prev/next navigation with centered positioning',
        'metadata display (count, dimensions, file size)',
      ],
      inspirationSource: 'Unsplash lightbox viewer',
      craftDetails: [
        'max-h-[90vh] max-w-[90vw] for viewport-aware sizing',
        'object-contain for aspect ratio preservation',
        'rounded-full buttons for modern aesthetic',
      ],
    },
  },
];
