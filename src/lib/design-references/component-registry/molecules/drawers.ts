import type { IComponentSnippet } from '../types.js';

export const drawerSnippets: IComponentSnippet[] = [
  {
    id: 'drawer-left',
    name: 'Left Drawer',
    category: 'molecule',
    type: 'drawer',
    variant: 'left',
    tags: ['sidebar', 'navigation', 'saas', 'slide'],
    mood: ['professional', 'professional'],
    industry: ['saas', 'saas', 'media'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div>
  <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"></div>
  <div className="fixed inset-y-0 left-0 z-50 w-80 border-r border-border bg-card shadow-xl">
    <div className="flex h-16 items-center justify-between border-b border-border px-4">
      <h2 className="text-lg font-semibold text-card-foreground">Menu</h2>
      <button className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
    <nav className="flex flex-col gap-1 p-4">
      <a href="#" className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground">Dashboard</a>
      <a href="#" className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">Projects</a>
      <a href="#" className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">Team</a>
      <a href="#" className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">Settings</a>
    </nav>
  </div>
</div>`,
    tailwindClasses: {
      overlay: 'fixed inset-0 z-40 bg-background/80 backdrop-blur-sm',
      drawer: 'fixed inset-y-0 left-0 z-50 w-80 border-r border-border bg-card shadow-xl',
      header: 'flex h-16 items-center justify-between border-b border-border px-4',
      title: 'text-lg font-semibold text-card-foreground',
      close: 'rounded-sm p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      nav: 'flex flex-col gap-1 p-4',
      navItemActive: 'rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground',
      navItem:
        'rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
    },
    a11y: {
      roles: ['dialog', 'navigation'],
      ariaAttributes: ['role=dialog', 'aria-modal=true', 'aria-labelledby'],
      keyboardNav: 'Escape closes, Tab cycles through navigation items',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-80 for navigation drawer'] },
    quality: {
      antiGeneric: ['inset-y-0 left-0 for left positioning', 'border-r for right edge separation'],
      inspirationSource: 'shadcn Sheet component',
      craftDetails: ['h-16 header height matches common nav bars', 'backdrop-blur-sm for depth'],
    },
  },
  {
    id: 'drawer-right',
    name: 'Right Drawer',
    category: 'molecule',
    type: 'drawer',
    variant: 'right',
    tags: ['sidebar', 'details', 'saas', 'slide'],
    mood: ['professional', 'professional'],
    industry: ['saas', 'ecommerce', 'saas'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div>
  <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"></div>
  <div className="fixed inset-y-0 right-0 z-50 w-96 border-l border-border bg-card shadow-xl">
    <div className="flex h-16 items-center justify-between border-b border-border px-6">
      <h2 className="text-lg font-semibold text-card-foreground">Details</h2>
      <button className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
    <div className="overflow-y-auto p-6">
      <div className="mb-6">
        <h3 className="mb-2 text-sm font-medium text-card-foreground">Product Information</h3>
        <p className="text-sm text-muted-foreground">View and edit product details, pricing, and inventory.</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-card-foreground">Product Name</label>
          <input type="text" value="Premium Widget" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-card-foreground">Price</label>
          <input type="number" value="99.00" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-card p-4">
      <div className="flex gap-2">
        <button className="flex-1 rounded-md bg-secondary px-4 py-2 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80">Cancel</button>
        <button className="flex-1 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90">Save</button>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      overlay: 'fixed inset-0 z-40 bg-background/80 backdrop-blur-sm',
      drawer: 'fixed inset-y-0 right-0 z-50 w-96 border-l border-border bg-card shadow-xl',
      header: 'flex h-16 items-center justify-between border-b border-border px-6',
      content: 'overflow-y-auto p-6',
      footer: 'absolute bottom-0 left-0 right-0 border-t border-border bg-card p-4',
    },
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['role=dialog', 'aria-modal=true', 'aria-labelledby'],
      keyboardNav: 'Escape closes, Tab navigates form fields',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'aside' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-96 for detailed content'] },
    quality: {
      antiGeneric: ['inset-y-0 right-0 for right positioning', 'absolute footer for sticky actions'],
      inspirationSource: 'Shopify admin detail panels',
      craftDetails: ['overflow-y-auto for scrollable content', 'border-l for left edge separation'],
    },
  },
  {
    id: 'drawer-top',
    name: 'Top Drawer',
    category: 'molecule',
    type: 'drawer',
    variant: 'top',
    tags: ['notification', 'banner', 'slide', 'alert'],
    mood: ['professional', 'bold'],
    industry: ['saas', 'general', 'general'],
    visualStyles: ['soft-depth', 'minimal-editorial'],
    jsx: `<div>
  <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"></div>
  <div className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-card shadow-xl">
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-card-foreground">New Feature Available</h3>
            <p className="mt-1 text-sm text-muted-foreground">Check out our latest updates and improvements to your dashboard.</p>
          </div>
        </div>
        <button className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div className="flex gap-2">
        <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90">Learn More</button>
        <button className="rounded-md bg-secondary px-4 py-2 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80">Dismiss</button>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      overlay: 'fixed inset-0 z-40 bg-background/80 backdrop-blur-sm',
      drawer: 'fixed left-0 right-0 top-0 z-50 border-b border-border bg-card shadow-xl',
      container: 'mx-auto max-w-4xl p-6',
      header: 'mb-4 flex items-start justify-between',
      iconWrapper: 'rounded-full bg-primary/10 p-2',
      actions: 'flex gap-2',
    },
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['role=dialog', 'aria-modal=true'],
      keyboardNav: 'Escape closes, Tab navigates actions',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'aside' },
    responsive: { strategy: 'mobile-first', breakpoints: ['max-w-4xl for centered content'] },
    quality: {
      antiGeneric: ['left-0 right-0 top-0 for top positioning', 'border-b for bottom edge separation'],
      inspirationSource: 'iOS notification center',
      craftDetails: ['rounded-full bg-primary/10 for icon background', 'max-w-4xl prevents overly wide content'],
    },
  },
  {
    id: 'drawer-bottom',
    name: 'Bottom Drawer',
    category: 'molecule',
    type: 'drawer',
    variant: 'bottom',
    tags: ['sheet', 'linear-modern', 'slide-up', 'general'],
    mood: ['futuristic', 'professional'],
    industry: ['general', 'ecommerce', 'media'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div>
  <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"></div>
  <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-border bg-card shadow-2xl">
    <div className="flex justify-center pt-3">
      <div className="h-1 w-12 rounded-full bg-muted"></div>
    </div>
    <div className="px-6 pb-6 pt-4">
      <h2 className="mb-4 text-lg font-semibold text-card-foreground">Share Options</h2>
      <div className="grid grid-cols-4 gap-4">
        <button className="flex flex-col items-center gap-2 rounded-lg p-3 transition-colors hover:bg-accent">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          </div>
          <span className="text-xs text-muted-foreground">Copy Link</span>
        </button>
        <button className="flex flex-col items-center gap-2 rounded-lg p-3 transition-colors hover:bg-accent">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <span className="text-xs text-muted-foreground">Email</span>
        </button>
        <button className="flex flex-col items-center gap-2 rounded-lg p-3 transition-colors hover:bg-accent">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <span className="text-xs text-muted-foreground">Download</span>
        </button>
        <button className="flex flex-col items-center gap-2 rounded-lg p-3 transition-colors hover:bg-accent">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          </div>
          <span className="text-xs text-muted-foreground">Duplicate</span>
        </button>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      overlay: 'fixed inset-0 z-40 bg-background/80 backdrop-blur-sm',
      drawer: 'fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-border bg-card shadow-2xl',
      handle: 'flex justify-center pt-3',
      handleBar: 'h-1 w-12 rounded-full bg-muted',
      content: 'px-6 pb-6 pt-4',
      grid: 'grid grid-cols-4 gap-4',
      gridItem: 'flex flex-col items-center gap-2 rounded-lg p-3 transition-colors hover:bg-accent',
      iconWrapper: 'flex h-12 w-12 items-center justify-center rounded-full bg-primary/10',
    },
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['role=dialog', 'aria-modal=true', 'aria-labelledby'],
      keyboardNav: 'Escape closes, Tab navigates grid items',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'dialog' },
    responsive: { strategy: 'mobile-first', breakpoints: ['grid-cols-4 for mobile action grid'] },
    quality: {
      antiGeneric: ['rounded-t-2xl for modern mobile aesthetic', 'h-1 w-12 drag handle indicator'],
      inspirationSource: 'iOS bottom sheet pattern',
      craftDetails: ['shadow-2xl for strong elevation', 'pt-3 for handle spacing'],
    },
  },
  {
    id: 'drawer-overlay',
    name: 'Overlay Drawer',
    category: 'molecule',
    type: 'drawer',
    variant: 'overlay',
    tags: ['general', 'soft-depth', 'overlay', 'dialog'],
    mood: ['minimal', 'professional'],
    industry: ['saas', 'ecommerce', 'general'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div>
  <div className="fixed inset-0 z-40 bg-background/90 backdrop-blur-md"></div>
  <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card shadow-2xl">
    <div className="flex items-center justify-between border-b border-border p-6">
      <h2 className="text-xl font-semibold text-card-foreground">Confirm Action</h2>
      <button className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
    <div className="p-6">
      <p className="mb-4 text-sm text-muted-foreground">Are you sure you want to proceed with this action? This cannot be undone.</p>
      <div className="flex justify-end gap-3">
        <button className="rounded-md border border-border bg-card px-4 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          Cancel
        </button>
        <button className="rounded-md bg-destructive px-4 py-2 text-sm text-destructive-foreground transition-colors hover:bg-destructive/90">
          Delete
        </button>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      overlay: 'fixed inset-0 z-40 bg-background/90 backdrop-blur-md',
      drawer:
        'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card shadow-2xl',
      header: 'flex items-center justify-between border-b border-border p-6',
      content: 'p-6',
      actions: 'flex justify-end gap-3',
    },
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['role=dialog', 'aria-modal=true', 'aria-labelledby'],
      keyboardNav: 'Escape closes, Tab cycles actions, Enter confirms',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'dialog' },
    responsive: { strategy: 'mobile-first', breakpoints: ['max-w-lg for centered modal'] },
    quality: {
      antiGeneric: [
        'backdrop-blur-md for stronger overlay effect',
        '-translate-x-1/2 -translate-y-1/2 for perfect centering',
      ],
      inspirationSource: 'shadcn AlertDialog component',
      craftDetails: ['rounded-xl for modern aesthetic', 'bg-destructive for dangerous action'],
    },
  },
  {
    id: 'drawer-push',
    name: 'Push Drawer',
    category: 'molecule',
    type: 'drawer',
    variant: 'push',
    tags: ['sidebar', 'push-content', 'navigation', 'saas'],
    mood: ['futuristic', 'professional'],
    industry: ['saas', 'media', 'saas'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="flex h-screen">
  <div className="w-72 border-r border-border bg-card shadow-lg">
    <div className="flex h-16 items-center justify-between border-b border-border px-4">
      <h2 className="text-lg font-semibold text-card-foreground">Navigation</h2>
      <button className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
      </button>
    </div>
    <nav className="flex flex-col gap-1 p-4">
      <a href="#" className="flex items-center gap-3 rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        <span>Home</span>
      </a>
      <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
        <span>Projects</span>
      </a>
      <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        <span>Team</span>
      </a>
    </nav>
  </div>
  <div className="flex-1 bg-background p-6">
    <div className="rounded-lg border border-border bg-card p-6">
      <h1 className="text-2xl font-bold text-card-foreground">Main Content</h1>
      <p className="mt-2 text-sm text-muted-foreground">Content area pushes right when drawer opens</p>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex h-screen',
      drawer: 'w-72 border-r border-border bg-card shadow-lg',
      header: 'flex h-16 items-center justify-between border-b border-border px-4',
      nav: 'flex flex-col gap-1 p-4',
      navItemActive:
        'flex items-center gap-3 rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground',
      navItem:
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      content: 'flex-1 bg-background p-6',
    },
    a11y: {
      roles: ['navigation'],
      ariaAttributes: ['role=navigation', 'aria-label=Main navigation'],
      keyboardNav: 'Tab navigates links, Enter activates',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-72 drawer width', 'flex-1 for remaining content'] },
    quality: {
      antiGeneric: ['flex h-screen for full-height layout', 'gap-3 for icon-text alignment'],
      inspirationSource: 'Material Design navigation drawer',
      craftDetails: ['shadow-lg for drawer elevation', 'border-r for visual separation'],
    },
  },
];
