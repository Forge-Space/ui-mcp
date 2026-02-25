import type { IComponentSnippet } from '../types.js';

export const popoverSnippets: IComponentSnippet[] = [
  {
    id: 'popover-default',
    name: 'Default Popover',
    category: 'molecule',
    type: 'popover',
    variant: 'default',
    tags: ['overlay', 'floating', 'contextual', 'info'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'saas'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="relative inline-block">
  <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
    Open
  </button>
  <div className="absolute bottom-full left-0 z-50 mb-2 w-64 rounded-lg border border-border bg-popover p-4 shadow-lg">
    <h4 className="mb-2 text-sm font-semibold text-popover-foreground">Quick Info</h4>
    <p className="text-sm text-muted-foreground">This is additional contextual information displayed in a popover.</p>
  </div>
</div>`,
    tailwindClasses: {
      trigger: 'rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground',
      popover: 'absolute bottom-full left-0 z-50 mb-2 w-64 rounded-lg border border-border bg-popover p-4 shadow-lg',
      heading: 'mb-2 text-sm font-semibold text-popover-foreground',
      content: 'text-sm text-muted-foreground',
    },
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['role=dialog', 'aria-labelledby'],
      keyboardNav: 'Escape closes, Tab traps focus within popover',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'dialog' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-64 for readable content'] },
    quality: {
      antiGeneric: ['shadow-lg for elevation hierarchy', 'z-50 for proper stacking'],
      inspirationSource: 'Radix Popover primitive',
      craftDetails: ['mb-2 spacing between trigger and popover', 'p-4 comfortable content padding'],
    },
  },
  {
    id: 'popover-interactive',
    name: 'Interactive Popover',
    category: 'molecule',
    type: 'popover',
    variant: 'energetic',
    tags: ['form', 'actions', 'energetic', 'controls'],
    mood: ['energetic', 'professional'],
    industry: ['saas', 'saas', 'ecommerce'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="relative inline-block">
  <button className="rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
    Filter
  </button>
  <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-lg border border-border bg-popover p-4 shadow-xl">
    <div className="mb-3">
      <label className="mb-1.5 block text-xs font-medium text-popover-foreground">Date Range</label>
      <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary">
        <option>Last 7 days</option>
        <option>Last 30 days</option>
        <option>Last 90 days</option>
      </select>
    </div>
    <div className="mb-4">
      <label className="mb-1.5 block text-xs font-medium text-popover-foreground">Status</label>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-popover-foreground">
          <input type="checkbox" checked className="h-4 w-4 rounded border-border text-primary" />
          <span>Active</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-popover-foreground">
          <input type="checkbox" className="h-4 w-4 rounded border-border text-primary" />
          <span>Inactive</span>
        </label>
      </div>
    </div>
    <div className="flex gap-2 border-t border-border pt-3">
      <button className="flex-1 rounded-md bg-secondary px-3 py-2 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80">
        Reset
      </button>
      <button className="flex-1 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90">
        Apply
      </button>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      trigger:
        'rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      popover: 'absolute right-0 top-full z-50 mt-2 w-72 rounded-lg border border-border bg-popover p-4 shadow-xl',
      field: 'mb-3',
      label: 'mb-1.5 block text-xs font-medium text-popover-foreground',
      select:
        'w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary',
      footer: 'flex gap-2 border-t border-border pt-3',
    },
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['role=dialog', 'aria-label=Filter options'],
      keyboardNav: 'Tab navigates form fields, Escape closes',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'dialog' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-72 for form controls'] },
    quality: {
      antiGeneric: ['shadow-xl for strong elevation', 'border-t for footer separation'],
      inspirationSource: 'Linear filter popover',
      craftDetails: ['flex-1 on footer buttons for equal width', 'space-y-2 for checkbox group'],
    },
  },
  {
    id: 'popover-arrow',
    name: 'Arrow Popover',
    category: 'molecule',
    type: 'popover',
    variant: 'arrow',
    tags: ['pointer', 'tooltip', 'directional', 'floating'],
    mood: ['premium', 'professional'],
    industry: ['saas', 'education', 'devtools'],
    visualStyles: ['soft-depth', 'neubrutalism'],
    jsx: `<div className="relative inline-block">
  <button className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  </button>
  <div className="absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2">
    <div className="relative rounded-lg border border-border bg-popover px-4 py-3 shadow-lg">
      <p className="text-sm text-popover-foreground">This feature helps you track progress</p>
      <div className="absolute left-1/2 top-full -translate-x-1/2 border-8 border-transparent border-t-popover"></div>
      <div className="absolute left-1/2 top-full -translate-x-1/2 translate-y-px border-8 border-transparent border-t-border"></div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      trigger:
        'rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      wrapper: 'absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2',
      popover: 'relative rounded-lg border border-border bg-popover px-4 py-3 shadow-lg',
      content: 'text-sm text-popover-foreground',
      arrow: 'absolute left-1/2 top-full -translate-x-1/2 border-8 border-transparent border-t-popover',
      arrowBorder:
        'absolute left-1/2 top-full -translate-x-1/2 translate-y-px border-8 border-transparent border-t-border',
    },
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['role=dialog'],
      keyboardNav: 'Escape closes popover',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'dialog' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['Double arrow for border effect', 'translate-y-px for precise border alignment'],
      inspirationSource: 'Floating UI arrow middleware',
      craftDetails: ['mb-3 accounts for arrow height', 'border-8 for arrow size'],
    },
  },
  {
    id: 'popover-nested',
    name: 'Nested Popover',
    category: 'molecule',
    type: 'popover',
    variant: 'nested',
    tags: ['corporate', 'submenu', 'nested', 'corporate-trust'],
    mood: ['professional', 'professional'],
    industry: ['saas', 'saas', 'media'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="relative inline-block">
  <button className="rounded-md bg-secondary px-4 py-2 text-sm text-secondary-foreground">
    Options
  </button>
  <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-lg border border-border bg-popover p-2 shadow-lg">
    <button className="w-full rounded-md px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
      Settings
    </button>
    <div className="relative">
      <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        <span>Export</span>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
      <div className="absolute left-full top-0 z-50 ml-2 w-48 rounded-lg border border-border bg-popover p-2 shadow-lg">
        <button className="w-full rounded-md px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          Export as PDF
        </button>
        <button className="w-full rounded-md px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          Export as CSV
        </button>
        <button className="w-full rounded-md px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          Export as JSON
        </button>
      </div>
    </div>
    <button className="w-full rounded-md px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
      Help
    </button>
  </div>
</div>`,
    tailwindClasses: {
      trigger: 'rounded-md bg-secondary px-4 py-2 text-sm text-secondary-foreground',
      popover: 'absolute left-0 top-full z-50 mt-2 w-56 rounded-lg border border-border bg-popover p-2 shadow-lg',
      item: 'w-full rounded-md px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      submenuTrigger:
        'flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      submenu: 'absolute left-full top-0 z-50 ml-2 w-48 rounded-lg border border-border bg-popover p-2 shadow-lg',
    },
    a11y: {
      roles: ['dialog', 'menu'],
      ariaAttributes: ['role=dialog', 'role=menu', 'aria-haspopup=true'],
      keyboardNav: 'Arrow keys navigate, Right opens submenu, Escape closes',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'dialog' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-56 parent, w-48 submenu'] },
    quality: {
      antiGeneric: ['left-full top-0 for submenu positioning', 'ml-2 gap between nested popovers'],
      inspirationSource: 'Radix nested popover pattern',
      craftDetails: ['z-50 on both levels for stacking', 'Right arrow icon for submenu indicator'],
    },
  },
  {
    id: 'popover-click-outside',
    name: 'Click Outside Popover',
    category: 'molecule',
    type: 'popover',
    variant: 'click-outside',
    tags: ['dismissible', 'general', 'overlay', 'contextual'],
    mood: ['professional', 'energetic'],
    industry: ['general', 'saas', 'saas'],
    visualStyles: ['soft-depth', 'minimal-editorial'],
    jsx: `<div className="relative inline-block">
  <button className="rounded-md border border-border bg-card px-4 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
    Click me
  </button>
  <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"></div>
  <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded-lg border border-border bg-popover p-4 shadow-xl">
    <div className="mb-3 flex items-center justify-between">
      <h4 className="text-sm font-semibold text-popover-foreground">Confirmation Required</h4>
      <button className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
    <p className="mb-4 text-sm text-muted-foreground">Click outside this popover or press Escape to close it.</p>
    <div className="flex justify-end gap-2">
      <button className="rounded-md bg-secondary px-3 py-2 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80">
        Cancel
      </button>
      <button className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90">
        Confirm
      </button>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      trigger:
        'rounded-md border border-border bg-card px-4 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      overlay: 'fixed inset-0 z-40 bg-background/80 backdrop-blur-sm',
      popover: 'absolute left-0 top-full z-50 mt-2 w-80 rounded-lg border border-border bg-popover p-4 shadow-xl',
      header: 'mb-3 flex items-center justify-between',
      heading: 'text-sm font-semibold text-popover-foreground',
      close: 'rounded-sm p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      content: 'mb-4 text-sm text-muted-foreground',
      footer: 'flex justify-end gap-2',
    },
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['role=dialog', 'aria-modal=true', 'aria-labelledby'],
      keyboardNav: 'Escape closes, Tab cycles focus within popover',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'dialog' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-80 for modal-like popover'] },
    quality: {
      antiGeneric: ['backdrop-blur-sm for depth perception', 'z-40 overlay, z-50 popover for layering'],
      inspirationSource: 'shadcn Dialog with Radix primitives',
      craftDetails: ['bg-background/80 semi-transparent overlay', 'shadow-xl for strong elevation'],
    },
  },
];
