import type { IComponentSnippet } from '../types.js';

export const stepperSnippets: IComponentSnippet[] = [
  {
    id: 'stepper-horizontal',
    name: 'Horizontal Stepper',
    category: 'molecule',
    type: 'stepper',
    variant: 'horizontal',
    tags: ['wizard', 'linear-modern', 'multi-step', 'navigation'],
    mood: ['professional', 'professional'],
    industry: ['saas', 'ecommerce', 'saas'],
    visualStyles: ['linear-modern', 'linear-modern'],
    jsx: `<div className="w-full">
  <div className="flex items-center justify-between">
    <div className="flex flex-1 items-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
        1
      </div>
      <div className="h-0.5 flex-1 bg-primary"></div>
    </div>
    <div className="flex flex-1 items-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-medium text-primary">
        2
      </div>
      <div className="h-0.5 flex-1 bg-border"></div>
    </div>
    <div className="flex items-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-background text-sm text-muted-foreground">
        3
      </div>
    </div>
  </div>
  <div className="mt-4 flex justify-between">
    <div className="text-sm">
      <p className="font-medium text-foreground">Account Info</p>
      <p className="text-xs text-muted-foreground">Complete</p>
    </div>
    <div className="text-sm">
      <p className="font-medium text-primary">Payment</p>
      <p className="text-xs text-muted-foreground">In Progress</p>
    </div>
    <div className="text-sm">
      <p className="text-muted-foreground">Confirmation</p>
      <p className="text-xs text-muted-foreground">Pending</p>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full',
      stepperRow: 'flex items-center justify-between',
      stepContainer: 'flex flex-1 items-center',
      stepComplete:
        'flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground',
      stepActive:
        'flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-medium text-primary',
      stepPending:
        'flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-background text-sm text-muted-foreground',
      connectorComplete: 'h-0.5 flex-1 bg-primary',
      connectorPending: 'h-0.5 flex-1 bg-border',
      labels: 'mt-4 flex justify-between',
    },
    a11y: {
      roles: ['navigation'],
      ariaAttributes: ['role=navigation', 'aria-label=Progress', 'aria-current=step'],
      keyboardNav: 'Tab navigates steps, Enter activates',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav' },
    responsive: { strategy: 'mobile-first', breakpoints: ['flex for horizontal layout'] },
    quality: {
      antiGeneric: ['h-0.5 thin connector line', 'border-2 for active step emphasis'],
      inspirationSource: 'Material Design Stepper',
      craftDetails: ['rounded-full for circular steps', 'flex-1 for equal connector spacing'],
    },
  },
  {
    id: 'stepper-vertical',
    name: 'Vertical Stepper',
    category: 'molecule',
    type: 'stepper',
    variant: 'soft-depth',
    tags: ['wizard', 'general', 'multi-step', 'saas'],
    mood: ['professional', 'professional'],
    industry: ['saas', 'devtools', 'startup'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="space-y-4">
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <div className="h-full w-0.5 flex-1 bg-primary"></div>
    </div>
    <div className="flex-1 pb-8">
      <h3 className="text-sm font-semibold text-foreground">Create Account</h3>
      <p className="mt-1 text-sm text-muted-foreground">Your account has been created successfully.</p>
    </div>
  </div>
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background text-xs font-medium text-primary">
        2
      </div>
      <div className="h-full w-0.5 flex-1 bg-border"></div>
    </div>
    <div className="flex-1 pb-8">
      <h3 className="text-sm font-semibold text-primary">Verify Email</h3>
      <p className="mt-1 text-sm text-muted-foreground">Check your inbox for verification link.</p>
      <button className="mt-3 rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground transition-colors hover:bg-primary/90">
        Resend Email
      </button>
    </div>
  </div>
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-background text-xs text-muted-foreground">
        3
      </div>
    </div>
    <div className="flex-1">
      <h3 className="text-sm text-muted-foreground">Complete Profile</h3>
      <p className="mt-1 text-sm text-muted-foreground">Add your personal information.</p>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'space-y-4',
      step: 'flex gap-4',
      stepIcon: 'flex flex-col items-center',
      stepComplete:
        'flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground',
      stepActive:
        'flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background text-xs font-medium text-primary',
      stepPending:
        'flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-background text-xs text-muted-foreground',
      connectorComplete: 'h-full w-0.5 flex-1 bg-primary',
      connectorPending: 'h-full w-0.5 flex-1 bg-border',
      stepContent: 'flex-1 pb-8',
    },
    a11y: {
      roles: ['minimal-editorial'],
      ariaAttributes: ['role=list', 'role=listitem', 'aria-current=step'],
      keyboardNav: 'Tab navigates actionable items',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'ol' },
    responsive: { strategy: 'mobile-first', breakpoints: ['gap-4 for icon-content spacing'] },
    quality: {
      antiGeneric: ['w-0.5 thin vertical connector', 'pb-8 for content spacing'],
      inspirationSource: 'Ant Design Steps vertical mode',
      craftDetails: ['h-8 w-8 compact step circles', 'flex-1 on content for full width'],
    },
  },
  {
    id: 'stepper-numbered',
    name: 'Numbered Stepper',
    category: 'molecule',
    type: 'stepper',
    variant: 'linear-modern',
    tags: ['linear-modern', 'professional', 'wizard', 'form'],
    mood: ['professional', 'professional'],
    industry: ['saas', 'startup', 'ecommerce'],
    visualStyles: ['linear-modern', 'linear-modern'],
    jsx: `<div className="w-full">
  <div className="flex items-center">
    <div className="flex flex-col items-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
        1
      </div>
      <span className="mt-2 text-xs font-medium text-foreground">Details</span>
    </div>
    <div className="mx-4 h-px flex-1 bg-primary"></div>
    <div className="flex flex-col items-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-lg font-semibold text-primary">
        2
      </div>
      <span className="mt-2 text-xs font-medium text-primary">Review</span>
    </div>
    <div className="mx-4 h-px flex-1 bg-border"></div>
    <div className="flex flex-col items-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-muted text-lg font-semibold text-muted-foreground">
        3
      </div>
      <span className="mt-2 text-xs text-muted-foreground">Submit</span>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full',
      row: 'flex items-center',
      stepWrapper: 'flex flex-col items-center',
      stepComplete:
        'flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground',
      stepActive:
        'flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-lg font-semibold text-primary',
      stepPending:
        'flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-muted text-lg font-semibold text-muted-foreground',
      connector: 'mx-4 h-px flex-1',
      connectorComplete: 'bg-primary',
      connectorPending: 'bg-border',
      label: 'mt-2 text-xs',
    },
    a11y: {
      roles: ['navigation'],
      ariaAttributes: ['role=navigation', 'aria-label=Steps', 'aria-current=step'],
      keyboardNav: 'Tab navigates steps',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav' },
    responsive: { strategy: 'mobile-first', breakpoints: ['flex items-center for horizontal layout'] },
    quality: {
      antiGeneric: ['h-12 w-12 larger step circles', 'bg-primary/10 for active state background'],
      inspirationSource: 'Checkout flow step indicators',
      craftDetails: ['text-lg font-semibold for prominent numbers', 'mx-4 connector spacing'],
    },
  },
  {
    id: 'stepper-icon',
    name: 'Icon Stepper',
    category: 'molecule',
    type: 'stepper',
    variant: 'icon',
    tags: ['gradient-mesh', 'icon', 'wizard', 'linear-modern'],
    mood: ['professional', 'futuristic'],
    industry: ['saas', 'startup', 'ecommerce'],
    visualStyles: ['linear-modern', 'linear-modern'],
    jsx: `<div className="w-full">
  <div className="flex items-start justify-between">
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-sm">
        <svg className="h-6 w-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
      </div>
      <span className="text-xs font-medium text-foreground">Profile</span>
      <div className="mt-1 flex h-1 w-12 rounded-full bg-primary"></div>
    </div>
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-background shadow-sm">
        <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
      </div>
      <span className="text-xs font-medium text-primary">Payment</span>
      <div className="mt-1 flex h-1 w-12 rounded-full bg-primary"></div>
    </div>
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-muted shadow-sm">
        <svg className="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
      <span className="text-xs text-muted-foreground">Complete</span>
      <div className="mt-1 flex h-1 w-12 rounded-full bg-border"></div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full',
      row: 'flex items-start justify-between',
      step: 'flex flex-col items-center gap-2',
      iconComplete: 'flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-sm',
      iconActive:
        'flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-background shadow-sm',
      iconPending: 'flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-muted shadow-sm',
      label: 'text-xs',
      progressComplete: 'mt-1 flex h-1 w-12 rounded-full bg-primary',
      progressPending: 'mt-1 flex h-1 w-12 rounded-full bg-border',
    },
    a11y: {
      roles: ['navigation'],
      ariaAttributes: ['role=navigation', 'aria-label=Progress', 'aria-current=step'],
      keyboardNav: 'Tab navigates steps',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav' },
    responsive: { strategy: 'mobile-first', breakpoints: ['justify-between for equal spacing'] },
    quality: {
      antiGeneric: ['h-14 w-14 large icon containers', 'h-1 w-12 rounded-full progress indicator'],
      inspirationSource: 'Apple onboarding flow',
      craftDetails: ['shadow-sm for subtle depth', 'gap-2 for vertical spacing'],
    },
  },
  {
    id: 'stepper-progress',
    name: 'Progress Stepper',
    category: 'molecule',
    type: 'stepper',
    variant: 'linear-modern',
    tags: ['progress-bar', 'percentage', 'wizard', 'completion'],
    mood: ['professional', 'energetic'],
    industry: ['startup', 'saas', 'saas'],
    visualStyles: ['linear-modern', 'linear-modern'],
    jsx: `<div className="w-full">
  <div className="mb-2 flex items-center justify-between text-sm">
    <span className="font-medium text-foreground">Step 2 of 4</span>
    <span className="text-muted-foreground">50% Complete</span>
  </div>
  <div className="relative h-2 overflow-hidden rounded-full bg-muted">
    <div className="absolute left-0 top-0 h-full w-1/2 rounded-full bg-primary transition-all duration-300"></div>
  </div>
  <div className="mt-4 flex justify-between">
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <span className="text-xs text-muted-foreground">Start</span>
    </div>
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
        2
      </div>
      <span className="text-xs font-medium text-foreground">Info</span>
    </div>
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-border bg-background text-xs text-muted-foreground">
        3
      </div>
      <span className="text-xs text-muted-foreground">Review</span>
    </div>
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-border bg-background text-xs text-muted-foreground">
        4
      </div>
      <span className="text-xs text-muted-foreground">Done</span>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full',
      header: 'mb-2 flex items-center justify-between text-sm',
      progressBar: 'relative h-2 overflow-hidden rounded-full bg-muted',
      progressFill: 'absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-300',
      steps: 'mt-4 flex justify-between',
      step: 'flex flex-col items-center gap-1',
      stepComplete: 'flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground',
      stepActive:
        'flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground',
      stepPending:
        'flex h-6 w-6 items-center justify-center rounded-full border-2 border-border bg-background text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['progressbar'],
      ariaAttributes: ['role=progressbar', 'aria-valuenow=50', 'aria-valuemin=0', 'aria-valuemax=100'],
      keyboardNav: 'Tab navigates steps',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'linear-modern' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-full for full-width progress'] },
    quality: {
      antiGeneric: ['transition-all duration-300 for smooth progress animation', 'h-2 thin progress bar'],
      inspirationSource: 'Multi-step form progress indicators',
      craftDetails: ['overflow-hidden rounded-full for clean bar edges', 'w-1/2 for 50% progress'],
    },
  },
];
