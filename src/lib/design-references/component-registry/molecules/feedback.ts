import type { IComponentSnippet } from '../types.js';

export const feedbackSnippets: IComponentSnippet[] = [
  {
    id: 'alert-info',
    name: 'Info Alert',
    category: 'molecule',
    type: 'alert',
    variant: 'info',
    tags: ['notification', 'message', 'info', 'feedback'],
    mood: ['professional', 'calm'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<div role="alert" className="relative rounded-lg border border-info/20 bg-info/10 p-4 text-info dark:border-info/20 dark:bg-info/10 dark:text-info [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11">
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
  <div>
    <h5 className="mb-1 font-medium leading-none">Heads up</h5>
    <p className="text-sm opacity-90">You can add components to your app using the CLI.</p>
  </div>
</div>`,
    tailwindClasses: {
      alert:
        'relative rounded-lg border border-info/20 bg-info/10 p-4 text-info dark:border-info/20 dark:bg-info/10 dark:text-info',
      icon: 'h-4 w-4',
      title: 'mb-1 font-medium leading-none',
      description: 'text-sm opacity-90',
    },
    a11y: {
      roles: ['alert'],
      ariaAttributes: ['role="alert"'],
      keyboardNav: 'N/A — announcement',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'icon + text — not color-only',
        'dark mode variants',
        'role=alert for screen readers',
        'ring-inset-like border approach',
      ],
      inspirationSource: 'shadcn/ui Alert',
      craftDetails: ['absolute icon positioning with has() selector', 'semantic alert role'],
    },
  },
  {
    id: 'alert-destructive',
    name: 'Destructive Alert',
    category: 'molecule',
    type: 'alert',
    variant: 'destructive',
    tags: ['error', 'warning', 'danger', 'feedback'],
    mood: ['professional'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'corporate-trust'],
    jsx: `<div role="alert" className="relative rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-destructive dark:border-destructive/20 dark:bg-destructive/10 dark:text-destructive [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11">
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
  <div>
    <h5 className="mb-1 font-medium leading-none">Error</h5>
    <p className="text-sm opacity-90">Something went wrong. Please try again later.</p>
  </div>
</div>`,
    tailwindClasses: {
      alert:
        'relative rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-destructive dark:border-destructive/20 dark:bg-destructive/10 dark:text-destructive',
      icon: 'h-4 w-4',
      title: 'mb-1 font-medium leading-none',
      description: 'text-sm opacity-90',
    },
    a11y: {
      roles: ['alert'],
      ariaAttributes: ['role="alert"'],
      keyboardNav: 'N/A — announcement',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['warning triangle icon for clarity', 'dark mode color adaptation'],
      inspirationSource: 'shadcn/ui Alert destructive',
      craftDetails: ['consistent structure with info alert', 'role=alert for immediate SR announcement'],
    },
  },
  {
    id: 'toast-default',
    name: 'Toast Notification',
    category: 'molecule',
    type: 'toast',
    variant: 'default',
    tags: ['notification', 'toast', 'snackbar', 'feedback', 'transient'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'dark-premium', 'linear-modern'],
    jsx: `<div role="status" aria-live="polite" className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border bg-background shadow-lg">
  <div className="flex items-start gap-3 p-4">
    <div className="flex-1">
      <p className="text-sm font-semibold text-foreground">Changes saved</p>
      <p className="mt-1 text-sm text-muted-foreground">Your preferences have been updated successfully.</p>
    </div>
    <button type="button" className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground/50 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Close notification">
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
    </button>
  </div>
</div>`,
    tailwindClasses: {
      toast: 'pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border bg-background shadow-lg',
      content: 'flex items-start gap-3 p-4',
      title: 'text-sm font-semibold text-foreground',
      description: 'mt-1 text-sm text-muted-foreground',
      close:
        'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground/50 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['role="status"', 'aria-live="polite"', 'aria-label on close'],
      keyboardNav: 'Tab to close button',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'aria-live=polite for non-intrusive SR',
        'pointer-events-auto for stacking context',
        'close button with clear aria-label',
      ],
      inspirationSource: 'sonner toast library',
      craftDetails: ['max-w-sm constrained width', 'shadow-lg for elevation', 'rounded-xl for modern feel'],
    },
  },
];
