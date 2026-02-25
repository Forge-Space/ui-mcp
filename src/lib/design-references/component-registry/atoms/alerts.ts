import type { IComponentSnippet } from '../types.js';

export const alertSnippets: IComponentSnippet[] = [
  {
    id: 'alert-info-banner',
    name: 'Info Alert',
    category: 'atom',
    type: 'alert',
    variant: 'info',
    tags: ['notification', 'info', 'message', 'feedback'],
    mood: ['professional', 'calm'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<div role="alert" className="relative flex items-start gap-3 rounded-lg border border-border bg-card p-4">
  <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
  </svg>
  <div className="flex-1">
    <h5 className="text-sm font-medium text-foreground">Heads up</h5>
    <p className="mt-1 text-sm text-muted-foreground">You can add components to your app using the cli.</p>
  </div>
</div>`,
    tailwindClasses: {
      container: 'relative flex items-start gap-3 rounded-lg border border-border bg-card p-4',
      icon: 'mt-0.5 h-5 w-5 shrink-0 text-primary',
      title: 'text-sm font-medium text-foreground',
      description: 'mt-1 text-sm text-muted-foreground',
    },
    a11y: {
      roles: ['alert'],
      ariaAttributes: ['aria-hidden on icon'],
      keyboardNav: 'N/A — static content',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=alert]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm:flex-row'] },
    quality: {
      antiGeneric: ['gap-3 with icon alignment', 'rounded-lg border for contained feel'],
      inspirationSource: 'shadcn/ui Alert',
      craftDetails: ['mt-0.5 on icon for optical alignment with text', 'shrink-0 prevents icon squish'],
    },
  },
  {
    id: 'alert-success',
    name: 'Success Alert',
    category: 'atom',
    type: 'alert',
    variant: 'success',
    tags: ['notification', 'success', 'confirmation', 'feedback'],
    mood: ['playful', 'bold'],
    industry: ['general', 'saas', 'ecommerce'],
    visualStyles: ['soft-depth', 'retro-playful'],
    jsx: `<div role="alert" className="relative flex items-start gap-3 rounded-lg border border-success/20 bg-success/10 p-4">
  <svg className="mt-0.5 h-5 w-5 shrink-0 text-success" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  <div className="flex-1">
    <h5 className="text-sm font-medium text-success">Success</h5>
    <p className="mt-1 text-sm text-foreground">Your changes have been saved successfully.</p>
  </div>
</div>`,
    tailwindClasses: {
      container: 'relative flex items-start gap-3 rounded-lg border border-success/20 bg-success/10 p-4',
      icon: 'mt-0.5 h-5 w-5 shrink-0 text-success',
      title: 'text-sm font-medium text-success',
      description: 'mt-1 text-sm text-foreground',
    },
    a11y: {
      roles: ['alert'],
      ariaAttributes: ['aria-hidden on icon'],
      keyboardNav: 'N/A — static content',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=alert]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'success/20 border with success/10 bg for subtle success state',
        'checkmark icon in circle for completion',
      ],
      inspirationSource: 'Flowbite Alerts',
      craftDetails: [
        'opacity modifiers for layered success color',
        'foreground text on colored background for readability',
      ],
    },
  },
  {
    id: 'alert-warning',
    name: 'Warning Alert',
    category: 'atom',
    type: 'alert',
    variant: 'warning',
    tags: ['notification', 'warning', 'caution', 'feedback'],
    mood: ['professional', 'professional'],
    industry: ['general', 'fintech', 'healthcare'],
    visualStyles: ['corporate-trust', 'soft-depth'],
    jsx: `<div role="alert" className="relative flex items-start gap-3 rounded-lg border border-warning/20 bg-warning/10 p-4">
  <svg className="mt-0.5 h-5 w-5 shrink-0 text-warning" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
  </svg>
  <div className="flex-1">
    <h5 className="text-sm font-medium text-warning">Warning</h5>
    <p className="mt-1 text-sm text-foreground">This action may have unintended consequences.</p>
  </div>
</div>`,
    tailwindClasses: {
      container: 'relative flex items-start gap-3 rounded-lg border border-warning/20 bg-warning/10 p-4',
      icon: 'mt-0.5 h-5 w-5 shrink-0 text-warning',
      title: 'text-sm font-medium text-warning',
      description: 'mt-1 text-sm text-foreground',
    },
    a11y: {
      roles: ['alert'],
      ariaAttributes: ['aria-hidden on icon'],
      keyboardNav: 'N/A — static content',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=alert]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['warning/20 border for subtle emphasis without alarm', 'triangle exclamation icon for attention'],
      inspirationSource: 'DaisyUI Alert',
      craftDetails: ['layered warning opacity for visual hierarchy', 'consistent semantic color token usage'],
    },
  },
  {
    id: 'alert-error',
    name: 'Error Alert',
    category: 'atom',
    type: 'alert',
    variant: 'error',
    tags: ['notification', 'error', 'danger', 'feedback'],
    mood: ['bold', 'bold'],
    industry: ['general', 'fintech', 'healthcare'],
    visualStyles: ['gradient-mesh', 'soft-depth'],
    jsx: `<div role="alert" className="relative flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-4">
  <svg className="mt-0.5 h-5 w-5 shrink-0 text-destructive" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
  </svg>
  <div className="flex-1">
    <h5 className="text-sm font-medium text-destructive">Error</h5>
    <p className="mt-1 text-sm text-foreground">There was a problem processing your request.</p>
  </div>
</div>`,
    tailwindClasses: {
      container: 'relative flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-4',
      icon: 'mt-0.5 h-5 w-5 shrink-0 text-destructive',
      title: 'text-sm font-medium text-destructive',
      description: 'mt-1 text-sm text-foreground',
    },
    a11y: {
      roles: ['alert'],
      ariaAttributes: ['aria-hidden on icon'],
      keyboardNav: 'N/A — static content',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=alert]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['destructive semantic token for error state', 'circle exclamation icon for critical feedback'],
      inspirationSource: 'shadcn/ui Alert variants',
      craftDetails: [
        'destructive/10 bg keeps error visible without overwhelming',
        'consistent opacity layering pattern',
      ],
    },
  },
  {
    id: 'alert-banner',
    name: 'Banner Alert',
    category: 'atom',
    type: 'alert',
    variant: 'banner',
    tags: ['notification', 'banner', 'announcement', 'full-width'],
    mood: ['professional', 'professional'],
    industry: ['general', 'saas', 'media'],
    visualStyles: ['linear-modern', 'corporate-trust'],
    jsx: `<div role="alert" className="relative flex items-center justify-between gap-4 border-b border-border bg-muted px-6 py-3">
  <div className="flex items-center gap-3">
    <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
    </svg>
    <p className="text-sm text-foreground">New features are available. Check out the latest updates.</p>
  </div>
  <button type="button" className="rounded-md p-1 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Dismiss">
    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  </button>
</div>`,
    tailwindClasses: {
      container: 'relative flex items-center justify-between gap-4 border-b border-border bg-muted px-6 py-3',
      content: 'flex items-center gap-3',
      icon: 'h-5 w-5 shrink-0 text-primary',
      text: 'text-sm text-foreground',
      dismiss: 'rounded-md p-1 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    },
    a11y: {
      roles: ['alert'],
      ariaAttributes: ['aria-label on dismiss button', 'aria-hidden on icons'],
      keyboardNav: 'Tab to dismiss button, Enter/Space to activate',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=alert]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm:px-6'] },
    quality: {
      antiGeneric: [
        'border-b instead of full border for page-width banner',
        'justify-between for dismiss button alignment',
      ],
      inspirationSource: 'Flowbite Banner',
      craftDetails: [
        'px-6 py-3 for horizontal banner proportions',
        'hover:bg-accent on dismiss for subtle interaction',
      ],
    },
  },
  {
    id: 'alert-toast',
    name: 'Toast Alert',
    category: 'atom',
    type: 'alert',
    variant: 'toast',
    tags: ['notification', 'toast', 'temporary', 'feedback'],
    mood: ['minimal', 'calm'],
    industry: ['general', 'saas', 'media'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div role="alert" className="pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-lg border border-border bg-popover p-4 shadow-lg">
  <svg className="mt-0.5 h-5 w-5 shrink-0 text-success" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  <div className="flex-1">
    <h5 className="text-sm font-medium text-popover-foreground">Saved</h5>
    <p className="mt-1 text-sm text-muted-foreground">Your preferences have been updated.</p>
  </div>
  <button type="button" className="rounded-md p-0.5 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Close">
    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  </button>
</div>`,
    tailwindClasses: {
      container:
        'pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-lg border border-border bg-popover p-4 shadow-lg',
      icon: 'mt-0.5 h-5 w-5 shrink-0 text-success',
      title: 'text-sm font-medium text-popover-foreground',
      description: 'mt-1 text-sm text-muted-foreground',
      close: 'rounded-md p-0.5 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    },
    a11y: {
      roles: ['alert'],
      ariaAttributes: ['aria-label on close button', 'aria-hidden on icons'],
      keyboardNav: 'Tab to close, Enter/Space to dismiss',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=alert]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['max-w-md'] },
    quality: {
      antiGeneric: ['pointer-events-auto for toast overlay context', 'shadow-lg for elevated toast appearance'],
      inspirationSource: 'shadcn/ui Toast',
      craftDetails: [
        'bg-popover semantic token for overlay surface',
        'max-w-md constrains toast width on large screens',
      ],
    },
  },
  {
    id: 'alert-inline',
    name: 'Inline Alert',
    category: 'atom',
    type: 'alert',
    variant: 'inline',
    tags: ['notification', 'inline', 'form', 'validation'],
    mood: ['minimal', 'minimal'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['linear-modern', 'minimal-editorial'],
    jsx: `<div role="alert" className="flex items-start gap-2 rounded-md bg-destructive/10 px-3 py-2">
  <svg className="mt-0.5 h-4 w-4 shrink-0 text-destructive" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
  </svg>
  <p className="text-sm text-destructive">This field is required</p>
</div>`,
    tailwindClasses: {
      container: 'flex items-start gap-2 rounded-md bg-destructive/10 px-3 py-2',
      icon: 'mt-0.5 h-4 w-4 shrink-0 text-destructive',
      text: 'text-sm text-destructive',
    },
    a11y: {
      roles: ['alert'],
      ariaAttributes: ['aria-hidden on icon'],
      keyboardNav: 'N/A — static content',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=alert]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['compact px-3 py-2 for inline form context', 'gap-2 for tighter spacing than card alerts'],
      inspirationSource: 'DaisyUI form validation',
      craftDetails: ['h-4 w-4 icon matches text size', 'rounded-md softer than rounded-lg for inline use'],
    },
  },
  {
    id: 'alert-dismissible',
    name: 'Dismissible Alert',
    category: 'atom',
    type: 'alert',
    variant: 'dismissible',
    tags: ['notification', 'dismissible', 'closable', 'playful'],
    mood: ['minimal', 'minimal'],
    industry: ['general', 'saas', 'ecommerce'],
    visualStyles: ['soft-depth', 'retro-playful'],
    jsx: `<div role="alert" className="relative flex items-start gap-3 rounded-lg border border-border bg-card p-4 pr-12">
  <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
  </svg>
  <div className="flex-1">
    <h5 className="text-sm font-medium text-foreground">Updates available</h5>
    <p className="mt-1 text-sm text-muted-foreground">A new version is ready to install.</p>
  </div>
  <button type="button" className="absolute right-4 top-4 rounded-md p-1 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Dismiss">
    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  </button>
</div>`,
    tailwindClasses: {
      container: 'relative flex items-start gap-3 rounded-lg border border-border bg-card p-4 pr-12',
      icon: 'mt-0.5 h-5 w-5 shrink-0 text-primary',
      title: 'text-sm font-medium text-foreground',
      description: 'mt-1 text-sm text-muted-foreground',
      dismiss:
        'absolute right-4 top-4 rounded-md p-1 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    },
    a11y: {
      roles: ['alert'],
      ariaAttributes: ['aria-label on dismiss button', 'aria-hidden on icons'],
      keyboardNav: 'Tab to dismiss, Enter/Space to close',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div[role=alert]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'pr-12 reserves space for absolute positioned dismiss button',
        'absolute right-4 top-4 for consistent close button placement',
      ],
      inspirationSource: 'shadcn/ui Alert with close button',
      craftDetails: ['relative container enables absolute dismiss positioning', 'bell icon for update notifications'],
    },
  },
];
