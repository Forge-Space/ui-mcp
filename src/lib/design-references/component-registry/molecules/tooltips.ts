import type { IComponentSnippet } from '../types.js';

export const tooltipSnippets: IComponentSnippet[] = [
  {
    id: 'tooltip-default',
    name: 'Default Tooltip',
    category: 'molecule',
    type: 'tooltip',
    variant: 'default',
    tags: ['hint', 'help', 'hover', 'info'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="relative inline-block">
  <button className="text-sm text-foreground underline decoration-dotted underline-offset-4">Hover me</button>
  <div role="tooltip" className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-md bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md">
    Helpful information
  </div>
</div>`,
    tailwindClasses: {
      trigger: 'text-sm text-foreground underline decoration-dotted underline-offset-4',
      tooltip:
        'absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-md bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md',
    },
    a11y: {
      roles: ['tooltip'],
      ariaAttributes: ['role=tooltip'],
      keyboardNav: 'Focus trigger to show tooltip, Escape to dismiss',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=tooltip]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['decoration-dotted for discoverable trigger', 'z-50 for proper stacking context'],
      inspirationSource: 'Radix Tooltip primitive',
      craftDetails: ['-translate-x-1/2 for precise center alignment', 'mb-2 for comfortable breathing room'],
    },
  },
  {
    id: 'tooltip-arrow',
    name: 'Arrow Tooltip',
    category: 'molecule',
    type: 'tooltip',
    variant: 'arrow',
    tags: ['hint', 'pointer', 'directional', 'help'],
    mood: ['professional', 'premium'],
    industry: ['general', 'saas', 'education'],
    visualStyles: ['soft-depth', 'neubrutalism'],
    jsx: `<div className="relative inline-block">
  <button className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground">Info</button>
  <div role="tooltip" className="absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2">
    <div className="rounded-md bg-popover px-3 py-2 text-xs text-popover-foreground shadow-lg">
      Extended information with arrow pointer
    </div>
    <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-popover"></div>
  </div>
</div>`,
    tailwindClasses: {
      trigger: 'rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground',
      tooltip: 'rounded-md bg-popover px-3 py-2 text-xs text-popover-foreground shadow-lg',
      arrow: 'absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-popover',
    },
    a11y: {
      roles: ['tooltip'],
      ariaAttributes: ['role=tooltip'],
      keyboardNav: 'Focus trigger, Escape to dismiss',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=tooltip]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['CSS triangle arrow using border technique', 'mb-3 accounts for arrow height'],
      inspirationSource: 'shadcn/ui Tooltip with floating-ui',
      craftDetails: ['border-t-popover matches tooltip background', 'shadow-lg for elevated appearance'],
    },
  },
  {
    id: 'tooltip-rich-content',
    name: 'Rich Content Tooltip',
    category: 'molecule',
    type: 'tooltip',
    variant: 'rich-content',
    tags: ['corporate-trust', 'formatted', 'professional', 'info'],
    mood: ['professional', 'professional'],
    industry: ['saas', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="relative inline-block">
  <button className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-card-foreground">View Stats</button>
  <div role="tooltip" className="absolute bottom-full left-0 z-50 mb-2 w-64 rounded-lg bg-popover p-4 text-popover-foreground shadow-xl">
    <h4 className="mb-2 text-sm font-semibold">Performance Metrics</h4>
    <div className="space-y-1 text-xs">
      <div className="flex justify-between"><span className="text-muted-foreground">Response Time:</span><span className="font-medium">142ms</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Success Rate:</span><span className="font-medium text-primary">99.8%</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Last Updated:</span><span className="font-medium">2 min ago</span></div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      trigger: 'rounded-md border border-border bg-card px-3 py-1.5 text-sm text-card-foreground',
      tooltip: 'absolute bottom-full left-0 z-50 mb-2 w-64 rounded-lg bg-popover p-4 text-popover-foreground shadow-xl',
      heading: 'mb-2 text-sm font-semibold',
      content: 'space-y-1 text-xs',
      row: 'flex justify-between',
    },
    a11y: {
      roles: ['tooltip'],
      ariaAttributes: ['role=tooltip'],
      keyboardNav: 'Focus trigger, Escape to dismiss',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=tooltip]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-64 for readable multi-line content'] },
    quality: {
      antiGeneric: ['w-64 fixed width for stable layout', 'space-y-1 for compact data rows'],
      inspirationSource: 'Chakra UI Tooltip with portal support',
      craftDetails: ['shadow-xl for strong elevation hierarchy', 'text-muted-foreground for label distinction'],
    },
  },
  {
    id: 'tooltip-interactive',
    name: 'Interactive Tooltip',
    category: 'molecule',
    type: 'tooltip',
    variant: 'energetic',
    tags: ['clickable', 'action', 'persistent', 'hover'],
    mood: ['energetic', 'energetic'],
    industry: ['saas', 'education', 'saas'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="relative inline-block">
  <button className="rounded-full bg-muted p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  </button>
  <div role="tooltip" className="absolute bottom-full right-0 z-50 mb-2 w-56 rounded-lg bg-popover p-3 text-popover-foreground shadow-lg">
    <p className="mb-2 text-xs">Need more information?</p>
    <button className="w-full rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground transition-colors hover:bg-primary/90">
      Learn More
    </button>
  </div>
</div>`,
    tailwindClasses: {
      trigger:
        'rounded-full bg-muted p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      tooltip:
        'absolute bottom-full right-0 z-50 mb-2 w-56 rounded-lg bg-popover p-3 text-popover-foreground shadow-lg',
      action:
        'w-full rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground transition-colors hover:bg-primary/90',
    },
    a11y: {
      roles: ['tooltip'],
      ariaAttributes: ['role=tooltip'],
      keyboardNav: 'Focus trigger, Tab to interact with tooltip content, Escape to dismiss',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=tooltip]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-56 for CTA button'] },
    quality: {
      antiGeneric: ['rounded-full icon button for modern aesthetic', 'w-full CTA for touch-friendly target'],
      inspirationSource: 'Radix Popover pattern for interactive content',
      craftDetails: ['transition-colors on both trigger and CTA', 'hover:bg-primary/90 for tactile feedback'],
    },
  },
  {
    id: 'tooltip-keyboard',
    name: 'Keyboard Shortcut Tooltip',
    category: 'molecule',
    type: 'tooltip',
    variant: 'keyboard',
    tags: ['shortcut', 'hint', 'accessibility', 'power-user'],
    mood: ['professional', 'minimal'],
    industry: ['devtools', 'saas', 'saas'],
    visualStyles: ['linear-modern', 'neubrutalism'],
    jsx: `<div className="relative inline-block">
  <button className="rounded-md bg-secondary px-3 py-1.5 text-sm text-secondary-foreground">Save</button>
  <div role="tooltip" className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md">
    <span className="mr-2">Save changes</span>
    <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-muted-foreground">⌘S</kbd>
  </div>
</div>`,
    tailwindClasses: {
      trigger: 'rounded-md bg-secondary px-3 py-1.5 text-sm text-secondary-foreground',
      tooltip:
        'absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md',
      kbd: 'rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-muted-foreground',
    },
    a11y: {
      roles: ['tooltip'],
      ariaAttributes: ['role=tooltip'],
      keyboardNav: 'Focus trigger, keyboard shortcut executes action',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'kbd' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['kbd semantic element for keyboard shortcuts', 'whitespace-nowrap prevents wrapping'],
      inspirationSource: 'Linear app keyboard hint tooltips',
      craftDetails: ['font-mono for technical aesthetic', 'border-border for subtle kbd elevation'],
    },
  },
  {
    id: 'tooltip-delay',
    name: 'Delayed Tooltip',
    category: 'molecule',
    type: 'tooltip',
    variant: 'delay',
    tags: ['hover', 'energetic', 'polite', 'ux'],
    mood: ['calm', 'professional'],
    industry: ['general', 'saas', 'ecommerce'],
    visualStyles: ['soft-depth', 'minimal-editorial'],
    jsx: `<div className="relative inline-block">
  <button className="text-sm text-muted-foreground underline decoration-wavy underline-offset-4 transition-colors hover:text-foreground">
    Hover for details
  </button>
  <div role="tooltip" className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-md bg-popover px-3 py-1.5 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity duration-300 delay-500 hover:opacity-100">
    This tooltip appears after 500ms delay
  </div>
</div>`,
    tailwindClasses: {
      trigger:
        'text-sm text-muted-foreground underline decoration-wavy underline-offset-4 transition-colors hover:text-foreground',
      tooltip:
        'absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-md bg-popover px-3 py-1.5 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity duration-300 delay-500 hover:opacity-100',
    },
    a11y: {
      roles: ['tooltip'],
      ariaAttributes: ['role=tooltip'],
      keyboardNav: 'Focus trigger, tooltip appears after delay',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=tooltip]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['delay-500 prevents accidental tooltip spam', 'decoration-wavy for visual interest'],
      inspirationSource: 'GitHub hover card delay pattern',
      craftDetails: [
        'opacity-0 hover:opacity-100 for smooth fade',
        'transition-opacity duration-300 for perceived speed',
      ],
    },
  },
];
