import type { IComponentSnippet } from '../types.js';

export const toastSnippets: IComponentSnippet[] = [
  {
    id: 'toast-success',
    name: 'Success Toast',
    category: 'molecule',
    type: 'toast',
    variant: 'success',
    tags: ['notification', 'toast', 'success', 'feedback', 'confirmation'],
    mood: ['professional', 'warm'],
    industry: ['general', 'saas', 'ecommerce'],
    visualStyles: ['soft-depth', 'linear-modern', 'dark-premium'],
    jsx: `<div role="status" aria-live="polite" className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border border-success/20 bg-success/10 shadow-lg">
  <div className="flex items-start gap-3 p-4">
    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/20">
      <svg className="h-3.5 w-3.5 text-success" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
    </div>
    <div className="flex-1 pt-0.5">
      <p className="text-sm font-semibold text-success">Changes saved</p>
      <p className="mt-1 text-sm text-success/80">Your preferences have been updated successfully.</p>
    </div>
    <button type="button" className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-success/50 hover:text-success transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success" aria-label="Close notification">
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
    </button>
  </div>
</div>`,
    tailwindClasses: {
      toast:
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border border-success/20 bg-success/10 shadow-lg',
      content: 'flex items-start gap-3 p-4',
      iconWrapper: 'flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/20',
      icon: 'h-3.5 w-3.5 text-success',
      textWrapper: 'flex-1 pt-0.5',
      title: 'text-sm font-semibold text-success',
      description: 'mt-1 text-sm text-success/80',
      close:
        'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-success/50 hover:text-success transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-label="Component"'],
      keyboardNav: 'Standard focus management',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    seo: { semanticElement: 'section' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: [
        'success semantic color with opacity variants',
        'check icon in rounded badge',
        'aria-live=polite for non-intrusive SR',
      ],
      inspirationSource: 'Radix UI Toast with success state',
      craftDetails: ['pt-0.5 text alignment with icon', 'border-success/20 subtle border', 'shadow-lg elevation'],
    },
  },
  {
    id: 'toast-error',
    name: 'Error Toast',
    category: 'molecule',
    type: 'toast',
    variant: 'error',
    tags: ['notification', 'toast', 'error', 'failure', 'retry'],
    mood: ['professional', 'bold'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<div role="alert" aria-live="assertive" className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border border-destructive/20 bg-destructive/10 shadow-lg">
  <div className="flex items-start gap-3 p-4">
    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/20">
      <svg className="h-3.5 w-3.5 text-destructive" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
    </div>
    <div className="flex-1 pt-0.5">
      <p className="text-sm font-semibold text-destructive">Upload failed</p>
      <p className="mt-1 text-sm text-destructive/80">Could not upload file. Check your connection and try again.</p>
    </div>
    <button type="button" className="inline-flex h-6 shrink-0 items-center justify-center rounded-md px-2 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive">Retry</button>
  </div>
</div>`,
    tailwindClasses: {
      toast:
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border border-destructive/20 bg-destructive/10 shadow-lg',
      content: 'flex items-start gap-3 p-4',
      iconWrapper: 'flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/20',
      icon: 'h-3.5 w-3.5 text-destructive',
      textWrapper: 'flex-1 pt-0.5',
      title: 'text-sm font-semibold text-destructive',
      description: 'mt-1 text-sm text-destructive/80',
      retryButton:
        'inline-flex h-6 shrink-0 items-center justify-center rounded-md px-2 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-label="Component"'],
      keyboardNav: 'Standard focus management',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    seo: { semanticElement: 'section' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: ['aria-live=assertive for errors', 'inline retry action button', 'X icon in destructive badge'],
      inspirationSource: 'GitHub error toasts',
      craftDetails: ['h-6 compact retry button', 'hover:bg-destructive/20 interaction', 'text-xs on action'],
    },
  },
  {
    id: 'toast-info',
    name: 'Info Toast',
    category: 'molecule',
    type: 'toast',
    variant: 'info',
    tags: ['notification', 'toast', 'info', 'message'],
    mood: ['professional', 'calm'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'linear-modern', 'minimal-editorial'],
    jsx: `<div role="status" aria-live="polite" className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border border-info/20 bg-info/10 shadow-lg">
  <div className="flex items-start gap-3 p-4">
    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-info/20">
      <svg className="h-3.5 w-3.5 text-info" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
    </div>
    <div className="flex-1 pt-0.5">
      <p className="text-sm font-semibold text-info">New feature available</p>
      <p className="mt-1 text-sm text-info/80">You can now export your data in CSV format.</p>
    </div>
    <button type="button" className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-info/50 hover:text-info transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info" aria-label="Close notification">
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
    </button>
  </div>
</div>`,
    tailwindClasses: {
      toast:
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border border-info/20 bg-info/10 shadow-lg',
      content: 'flex items-start gap-3 p-4',
      iconWrapper: 'flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-info/20',
      icon: 'h-3.5 w-3.5 text-info',
      textWrapper: 'flex-1 pt-0.5',
      title: 'text-sm font-semibold text-info',
      description: 'mt-1 text-sm text-info/80',
      close:
        'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-info/50 hover:text-info transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-label="Component"'],
      keyboardNav: 'Standard focus management',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    seo: { semanticElement: 'section' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: ['info semantic color system', 'info icon in badge', 'consistent structure across variants'],
      inspirationSource: 'Linear feature announcement toasts',
      craftDetails: ['border-info/20 subtle outline', 'text-info/80 description opacity', 'rounded-full badge'],
    },
  },
  {
    id: 'toast-action',
    name: 'Action Toast',
    category: 'molecule',
    type: 'toast',
    variant: 'action',
    tags: ['notification', 'toast', 'action', 'undo', 'interactive'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'dark-premium', 'linear-modern'],
    jsx: `<div role="status" aria-live="polite" className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border bg-background shadow-lg">
  <div className="flex items-center gap-3 p-4">
    <div className="flex-1">
      <p className="text-sm font-medium text-foreground">Message deleted</p>
    </div>
    <button type="button" className="inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Undo</button>
    <button type="button" className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground/50 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Close notification">
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
    </button>
  </div>
</div>`,
    tailwindClasses: {
      toast: 'pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border bg-background shadow-lg',
      content: 'flex items-center gap-3 p-4',
      textWrapper: 'flex-1',
      title: 'text-sm font-medium text-foreground',
      actionButton:
        'inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      close:
        'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground/50 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-label="Component"'],
      keyboardNav: 'Standard focus management',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    seo: { semanticElement: 'section' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: [
        'primary action button inline',
        'text-primary for visual hierarchy',
        'items-center horizontal layout',
      ],
      inspirationSource: 'Gmail undo send toast',
      craftDetails: ['h-8 action button', 'px-3 button padding', 'hover:bg-primary/10 subtle hover'],
    },
  },
  {
    id: 'toast-promise',
    name: 'Promise Toast',
    category: 'molecule',
    type: 'toast',
    variant: 'promise',
    tags: ['notification', 'toast', 'loading', 'promise', 'async'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'dark-premium'],
    jsx: `<div role="status" aria-live="polite" aria-busy="true" className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border bg-background shadow-lg">
  <div className="flex items-start gap-3 p-4">
    <div className="flex h-5 w-5 shrink-0 items-center justify-center">
      <svg className="h-4 w-4 animate-spin text-muted-foreground" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <div className="flex-1 pt-0.5">
      <p className="text-sm font-semibold text-foreground">Uploading file...</p>
      <p className="mt-1 text-sm text-muted-foreground">This may take a few moments</p>
    </div>
  </div>
  <div className="h-1 bg-muted">
    <div className="h-full w-2/3 bg-primary transition-all duration-300" role="progressbar" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
</div>`,
    tailwindClasses: {
      toast: 'pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border bg-background shadow-lg',
      content: 'flex items-start gap-3 p-4',
      spinner: 'flex h-5 w-5 shrink-0 items-center justify-center',
      spinnerIcon: 'h-4 w-4 animate-spin text-muted-foreground',
      textWrapper: 'flex-1 pt-0.5',
      title: 'text-sm font-semibold text-foreground',
      description: 'mt-1 text-sm text-muted-foreground',
      progressTrack: 'h-1 bg-muted',
      progressBar: 'h-full w-2/3 bg-primary transition-all duration-300',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-label="Component"'],
      keyboardNav: 'Standard focus management',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    seo: { semanticElement: 'section' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: [
        'progress bar at bottom edge',
        'aria-busy for loading state',
        'animate-spin spinner with reduced motion support',
      ],
      inspirationSource: 'Vercel deployment progress toast',
      craftDetails: [
        'h-1 thin progress track',
        'transition-all duration-300 smooth progress',
        'rounded-xl with overflow-hidden',
      ],
    },
  },
];
