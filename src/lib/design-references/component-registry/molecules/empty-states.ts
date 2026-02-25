import type { IComponentSnippet } from '../types.js';

export const emptyStateSnippets: IComponentSnippet[] = [
  {
    id: 'empty-no-data',
    name: 'No Data Empty State',
    category: 'molecule',
    type: 'empty-state',
    variant: 'no-data',
    tags: ['empty', 'placeholder', 'illustration', 'startup'],
    mood: ['professional', 'warm'],
    industry: ['saas', 'general', 'devtools'],
    visualStyles: ['linear-modern', 'minimal-editorial', 'soft-depth'],
    jsx: `<div className="flex flex-col items-center justify-center rounded-xl border bg-card p-12 text-center">
  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted" aria-hidden="true">
    <svg className="h-10 w-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" /></svg>
  </div>
  <div className="mt-6 max-w-md space-y-2">
    <h3 className="text-lg font-semibold text-foreground">No projects yet</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">Get started by creating your first project. Projects help you organize your work and collaborate with your team.</p>
  </div>
  <div className="mt-6 flex gap-3">
    <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
      Create project
    </button>
    <button type="button" className="inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Learn more</button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex flex-col items-center justify-center rounded-xl border bg-card p-12 text-center',
      iconWrapper: 'flex h-20 w-20 items-center justify-center rounded-full bg-muted',
      icon: 'h-10 w-10 text-muted-foreground',
      content: 'mt-6 max-w-md space-y-2',
      title: 'text-lg font-semibold text-foreground',
      description: 'text-sm text-muted-foreground leading-relaxed',
      actions: 'mt-6 flex gap-3',
      primaryButton:
        'inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]',
      secondaryButton:
        'inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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
        'large rounded icon wrapper for visual hierarchy',
        'max-w-md on content for readability',
        'dual CTA pattern (primary + secondary)',
        'leading-relaxed for description',
      ],
      inspirationSource: 'Linear empty project state',
      craftDetails: ['p-12 generous padding for breathing room', 'h-20 w-20 icon wrapper', 'gap-3 button spacing'],
    },
  },
  {
    id: 'empty-no-results',
    name: 'No Search Results',
    category: 'molecule',
    type: 'empty-state',
    variant: 'no-results',
    tags: ['empty', 'search', 'no-results', 'filter'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'ecommerce'],
    visualStyles: ['linear-modern', 'minimal-editorial', 'soft-depth'],
    jsx: `<div className="flex flex-col items-center justify-center rounded-xl border bg-card p-12 text-center">
  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted" aria-hidden="true">
    <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
  </div>
  <div className="mt-6 max-w-sm space-y-2">
    <h3 className="text-lg font-semibold text-foreground">No results found</h3>
    <p className="text-sm text-muted-foreground">We couldn't find anything matching "<span className="font-medium text-foreground">react components</span>". Try adjusting your search or filters.</p>
  </div>
  <div className="mt-6 flex flex-col gap-2 text-sm">
    <p className="text-muted-foreground">Suggestions:</p>
    <ul className="space-y-1.5 text-left text-muted-foreground">
      <li className="flex items-center gap-2">
        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        Check your spelling
      </li>
      <li className="flex items-center gap-2">
        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        Try more general keywords
      </li>
      <li className="flex items-center gap-2">
        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        Remove filters to see more results
      </li>
    </ul>
  </div>
  <button type="button" className="mt-6 inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Clear search</button>
</div>`,
    tailwindClasses: {
      container: 'flex flex-col items-center justify-center rounded-xl border bg-card p-12 text-center',
      iconWrapper: 'flex h-16 w-16 items-center justify-center rounded-full bg-muted',
      icon: 'h-8 w-8 text-muted-foreground',
      content: 'mt-6 max-w-sm space-y-2',
      title: 'text-lg font-semibold text-foreground',
      description: 'text-sm text-muted-foreground',
      searchTerm: 'font-medium text-foreground',
      suggestions: 'mt-6 flex flex-col gap-2 text-sm',
      suggestionList: 'space-y-1.5 text-left text-muted-foreground',
      suggestionItem: 'flex items-center gap-2',
      button:
        'mt-6 inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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
        'font-medium on search term for emphasis',
        'actionable suggestions list',
        'search icon in muted background',
        'clear search CTA',
      ],
      inspirationSource: 'GitHub search no results',
      craftDetails: [
        'max-w-sm for narrow content width',
        'text-left on suggestions for readability',
        'space-y-1.5 tight list spacing',
      ],
    },
  },
  {
    id: 'empty-error',
    name: 'Error State',
    category: 'molecule',
    type: 'empty-state',
    variant: 'error',
    tags: ['empty', 'error', 'failure', 'retry'],
    mood: ['professional', 'bold'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['linear-modern', 'soft-depth', 'corporate-trust'],
    jsx: `<div className="flex flex-col items-center justify-center rounded-xl border border-destructive/50 bg-card p-12 text-center">
  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10" aria-hidden="true">
    <svg className="h-8 w-8 text-destructive" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
  </div>
  <div className="mt-6 max-w-md space-y-2">
    <h3 className="text-lg font-semibold text-foreground">Something went wrong</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">We encountered an error while loading your data. This could be a temporary issue with our servers.</p>
  </div>
  <div className="mt-4 rounded-lg border bg-muted/50 px-4 py-3 font-mono text-xs text-muted-foreground">
    <code>Error: Failed to fetch data (ERR_CONNECTION_REFUSED)</code>
  </div>
  <div className="mt-6 flex gap-3">
    <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
      Try again
    </button>
    <button type="button" className="inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Contact support</button>
  </div>
  <details className="mt-6 w-full max-w-md group">
    <summary className="cursor-pointer text-sm font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm list-none flex items-center justify-center gap-1">
      View error details
      <svg className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
    </summary>
    <div className="mt-3 rounded-lg border bg-muted/50 p-4 text-left">
      <dl className="space-y-2 text-xs">
        <div>
          <dt className="font-medium text-muted-foreground">Timestamp</dt>
          <dd className="mt-0.5 font-mono text-foreground">2025-01-24T14:32:15Z</dd>
        </div>
        <div>
          <dt className="font-medium text-muted-foreground">Request ID</dt>
          <dd className="mt-0.5 font-mono text-foreground">req_abc123xyz789</dd>
        </div>
        <div>
          <dt className="font-medium text-muted-foreground">Endpoint</dt>
          <dd className="mt-0.5 font-mono text-foreground">/api/v1/projects</dd>
        </div>
      </dl>
    </div>
  </details>
</div>`,
    tailwindClasses: {
      container:
        'flex flex-col items-center justify-center rounded-xl border border-destructive/50 bg-card p-12 text-center',
      iconWrapper: 'flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10',
      icon: 'h-8 w-8 text-destructive',
      content: 'mt-6 max-w-md space-y-2',
      title: 'text-lg font-semibold text-foreground',
      description: 'text-sm text-muted-foreground leading-relaxed',
      errorCode: 'mt-4 rounded-lg border bg-muted/50 px-4 py-3 font-mono text-xs text-muted-foreground',
      actions: 'mt-6 flex gap-3',
      retryButton:
        'inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]',
      supportButton:
        'inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      details: 'mt-6 w-full max-w-md group',
      summary:
        'cursor-pointer text-sm font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm list-none flex items-center justify-center gap-1',
      detailsContent: 'mt-3 rounded-lg border bg-muted/50 p-4 text-left',
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
        'border-destructive/50 for error emphasis',
        'error code display with monospace font',
        'details/summary for progressive disclosure',
        'retry icon + dual CTA',
      ],
      inspirationSource: 'Vercel deployment error state',
      craftDetails: [
        'bg-destructive/10 icon wrapper',
        'font-mono for technical details',
        'group-open:rotate-180 chevron animation',
      ],
    },
  },
  {
    id: 'empty-offline',
    name: 'Offline Empty State',
    category: 'molecule',
    type: 'empty-state',
    variant: 'offline',
    tags: ['empty', 'offline', 'network', 'connectivity'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['linear-modern', 'soft-depth', 'minimal-editorial'],
    jsx: `<div className="flex flex-col items-center justify-center rounded-xl border bg-card p-12 text-center">
  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted" aria-hidden="true">
    <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" /></svg>
  </div>
  <div className="mt-6 max-w-md space-y-2">
    <h3 className="text-lg font-semibold text-foreground">You're offline</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">Check your internet connection and try again. Your work will be saved locally until you reconnect.</p>
  </div>
  <div className="mt-6 flex gap-3">
    <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
      Retry connection
    </button>
    <button type="button" className="inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Work offline</button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex flex-col items-center justify-center rounded-xl border bg-card p-12 text-center',
      iconWrapper: 'flex h-16 w-16 items-center justify-center rounded-full bg-muted',
      icon: 'h-8 w-8 text-muted-foreground',
      content: 'mt-6 max-w-md space-y-2',
      title: 'text-lg font-semibold text-foreground',
      description: 'text-sm text-muted-foreground leading-relaxed',
      actions: 'mt-6 flex gap-3',
      retryButton:
        'inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]',
      offlineButton:
        'inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    },
    a11y: {
      roles: ['region', 'alert'],
      ariaAttributes: ['aria-label="Component"', 'aria-live="polite"'],
      keyboardNav: 'Standard focus management',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    seo: { semanticElement: 'section' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: [
        'offline icon with slash indicator',
        'local save reassurance in copy',
        'dual CTA: retry vs work offline',
        'aria-live for screen reader updates',
      ],
      inspirationSource: 'Notion offline mode',
      craftDetails: [
        'p-12 generous padding',
        'retry icon rotation on hover',
        'gap-3 button spacing',
        'leading-relaxed for readability',
      ],
    },
  },
  {
    id: 'empty-upgrade-required',
    name: 'Upgrade Required Empty State',
    category: 'molecule',
    type: 'empty-state',
    variant: 'upgrade-required',
    tags: ['empty', 'paywall', 'upsell', 'premium'],
    mood: ['professional', 'premium'],
    industry: ['saas', 'fintech', 'general'],
    visualStyles: ['soft-depth', 'gradient-mesh', 'corporate-trust'],
    jsx: `<div className="flex flex-col items-center justify-center rounded-xl border border-primary/20 bg-card p-12 text-center">
  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10" aria-hidden="true">
    <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
  </div>
  <div className="mt-6 max-w-md space-y-2">
    <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      PRO
    </div>
    <h3 className="text-lg font-semibold text-foreground">Upgrade to unlock advanced analytics</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">Get detailed insights, custom reports, and unlimited data exports with a Pro subscription.</p>
  </div>
  <div className="mt-6 rounded-lg border bg-muted/50 px-4 py-3">
    <ul className="space-y-2 text-left text-sm">
      <li className="flex items-center gap-2 text-foreground">
        <svg className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        Advanced analytics dashboard
      </li>
      <li className="flex items-center gap-2 text-foreground">
        <svg className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        Unlimited data exports
      </li>
      <li className="flex items-center gap-2 text-foreground">
        <svg className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        Priority support
      </li>
    </ul>
  </div>
  <div className="mt-6 flex gap-3">
    <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]">
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      Upgrade to Pro
    </button>
    <button type="button" className="inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Compare plans</button>
  </div>
</div>`,
    tailwindClasses: {
      container:
        'flex flex-col items-center justify-center rounded-xl border border-primary/20 bg-card p-12 text-center',
      iconWrapper: 'flex h-16 w-16 items-center justify-center rounded-full bg-primary/10',
      icon: 'h-8 w-8 text-primary',
      content: 'mt-6 max-w-md space-y-2',
      badge: 'inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary',
      title: 'text-lg font-semibold text-foreground',
      description: 'text-sm text-muted-foreground leading-relaxed',
      features: 'mt-6 rounded-lg border bg-muted/50 px-4 py-3',
      featureList: 'space-y-2 text-left text-sm',
      featureItem: 'flex items-center gap-2 text-foreground',
      actions: 'mt-6 flex gap-3',
      upgradeButton:
        'inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]',
      compareButton:
        'inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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
        'border-primary/20 for subtle premium emphasis',
        'PRO badge with star icon',
        'feature checklist with checkmark icons',
        'star icon on CTA for premium feel',
      ],
      inspirationSource: 'Linear Pro upgrade prompt',
      craftDetails: [
        'bg-primary/10 icon wrapper',
        'space-y-2 feature list spacing',
        'px-6 on CTA for emphasis',
        'text-left on features for scannability',
      ],
    },
  },
  {
    id: 'empty-permission-denied',
    name: 'Permission Denied Empty State',
    category: 'molecule',
    type: 'empty-state',
    variant: 'permission-denied',
    tags: ['empty', 'permission', 'access', 'security'],
    mood: ['professional', 'corporate'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['linear-modern', 'soft-depth', 'corporate-trust'],
    jsx: `<div className="flex flex-col items-center justify-center rounded-xl border bg-card p-12 text-center">
  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted" aria-hidden="true">
    <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
  </div>
  <div className="mt-6 max-w-md space-y-2">
    <h3 className="text-lg font-semibold text-foreground">Access denied</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">You don't have permission to view this resource. Contact your workspace admin to request access.</p>
  </div>
  <div className="mt-4 rounded-lg border bg-muted/50 px-4 py-3">
    <dl className="space-y-1.5 text-left text-xs">
      <div className="flex items-center justify-between gap-4">
        <dt className="text-muted-foreground">Required role</dt>
        <dd className="font-medium text-foreground">Admin</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-muted-foreground">Your role</dt>
        <dd className="font-medium text-foreground">Viewer</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-muted-foreground">Resource</dt>
        <dd className="font-mono text-foreground">/api/admin/users</dd>
      </div>
    </dl>
  </div>
  <div className="mt-6 flex gap-3">
    <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
      Request access
    </button>
    <button type="button" className="inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Go back</button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex flex-col items-center justify-center rounded-xl border bg-card p-12 text-center',
      iconWrapper: 'flex h-16 w-16 items-center justify-center rounded-full bg-muted',
      icon: 'h-8 w-8 text-muted-foreground',
      content: 'mt-6 max-w-md space-y-2',
      title: 'text-lg font-semibold text-foreground',
      description: 'text-sm text-muted-foreground leading-relaxed',
      details: 'mt-4 rounded-lg border bg-muted/50 px-4 py-3',
      detailsList: 'space-y-1.5 text-left text-xs',
      detailRow: 'flex items-center justify-between gap-4',
      detailLabel: 'text-muted-foreground',
      detailValue: 'font-medium text-foreground',
      resourceValue: 'font-mono text-foreground',
      actions: 'mt-6 flex gap-3',
      requestButton:
        'inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]',
      backButton:
        'inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    },
    a11y: {
      roles: ['region', 'alert'],
      ariaAttributes: ['aria-label="Component"', 'aria-live="polite"'],
      keyboardNav: 'Standard focus management',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    seo: { semanticElement: 'section' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: [
        'dl/dt/dd semantic markup for details',
        'font-mono on resource path',
        'role comparison (required vs actual)',
        'email icon on request CTA',
      ],
      inspirationSource: 'GitHub permission errors',
      craftDetails: [
        'space-y-1.5 tight detail spacing',
        'justify-between for key-value layout',
        'text-left on details for scannability',
        'gap-4 prevents label/value collisions',
      ],
    },
  },
];
