import type { IComponentSnippet } from '../types.js';

export const featureSnippets: IComponentSnippet[] = [
  {
    id: 'features-grid',
    name: 'Features Grid',
    category: 'organism',
    type: 'feature-section',
    variant: 'grid',
    tags: ['features', 'benefits', 'grid', 'agency'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'startup'],
    visualStyles: ['soft-depth', 'corporate-trust', 'minimal-editorial'],
    jsx: `<section className="py-20 sm:py-28" aria-labelledby="features-heading">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-sm font-semibold text-primary">Features</span>
      <h2 id="features-heading" className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Everything you need to ship fast</h2>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">A complete toolkit designed to help you build, deploy, and scale your applications with confidence.</p>
    </div>
    <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <div className="group rounded-xl border bg-card p-6 transition-all hover:shadow-md hover:-translate-y-0.5">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
        </div>
        <h3 className="text-base font-semibold text-foreground">Lightning Performance</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Optimized builds with tree shaking, code splitting, and edge deployment for sub-second load times.</p>
      </div>
      <div className="group rounded-xl border bg-card p-6 transition-all hover:shadow-md hover:-translate-y-0.5">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
        </div>
        <h3 className="text-base font-semibold text-foreground">Enterprise Security</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">SOC 2 compliant with end-to-end encryption, SSO, and role-based access controls built in.</p>
      </div>
      <div className="group rounded-xl border bg-card p-6 transition-all hover:shadow-md hover:-translate-y-0.5">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" /></svg>
        </div>
        <h3 className="text-base font-semibold text-foreground">Developer Experience</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">TypeScript-first APIs, comprehensive docs, and a thriving open-source community.</p>
      </div>
      <div className="group rounded-xl border bg-card p-6 transition-all hover:shadow-md hover:-translate-y-0.5">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>
        </div>
        <h3 className="text-base font-semibold text-foreground">Real-time Analytics</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Monitor performance, track user behavior, and make data-driven decisions in real-time.</p>
      </div>
      <div className="group rounded-xl border bg-card p-6 transition-all hover:shadow-md hover:-translate-y-0.5">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>
        </div>
        <h3 className="text-base font-semibold text-foreground">Team Collaboration</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Built-in multiplayer editing, commenting, and approval workflows for seamless teamwork.</p>
      </div>
      <div className="group rounded-xl border bg-card p-6 transition-all hover:shadow-md hover:-translate-y-0.5">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.491 48.491 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" /></svg>
        </div>
        <h3 className="text-base font-semibold text-foreground">Extensible Platform</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Plugin architecture with 200+ integrations. Connect to the tools your team already uses.</p>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      section: 'py-20 sm:py-28',
      container: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
      header: 'mx-auto max-w-2xl text-center',
      eyebrow: 'text-sm font-semibold text-primary',
      heading: 'mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl',
      description: 'mt-4 text-lg text-muted-foreground leading-relaxed',
      grid: 'mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3',
      featureCard: 'group rounded-xl border bg-card p-6 transition-all hover:shadow-md hover:-translate-y-0.5',
      iconWrapper:
        'mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground',
      featureTitle: 'text-base font-semibold text-foreground',
      featureDesc: 'mt-2 text-sm text-muted-foreground leading-relaxed',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-labelledby'],
      keyboardNav: 'N/A — content',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'icon wrapper bg transitions on card hover',
        'eyebrow text above heading',
        'consistent card structure from atoms',
        'hover:-translate-y-0.5 subtle lift',
        '6 features in 3-col grid for balanced layout',
      ],
      inspirationSource: 'Stripe features section',
      craftDetails: [
        'max-w-5xl grid within max-w-7xl container',
        'group hover on entire card',
        'responsive: 1 → 2 → 3 columns',
      ],
    },
  },
  {
    id: 'features-bento',
    name: 'Bento Features',
    category: 'organism',
    type: 'feature-section',
    variant: 'bento',
    tags: ['features', 'bento', 'grid', 'asymmetric', 'agency'],
    mood: ['creative', 'bold', 'editorial'],
    industry: ['saas', 'startup', 'agency'],
    visualStyles: ['bento-grid', 'dark-premium', 'gradient-mesh'],
    jsx: `<section className="py-20 sm:py-28" aria-labelledby="bento-heading">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 id="bento-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Powerful by design</h2>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">Everything you need, nothing you don't. A carefully crafted set of tools for modern teams.</p>
    </div>
    <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="sm:col-span-2 rounded-2xl border bg-card p-8 shadow-sm">
        <div className="max-w-sm">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" /></svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground">Advanced Dashboard</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Real-time metrics and customizable widgets. Monitor everything from one place with live data streaming.</p>
        </div>
      </div>
      <div className="rounded-2xl border bg-card p-8 shadow-sm">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground">Secure by Default</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">End-to-end encryption with zero-knowledge architecture.</p>
      </div>
      <div className="rounded-2xl border bg-card p-8 shadow-sm">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground">AI-Powered</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Intelligent suggestions and automations that learn from your workflow.</p>
      </div>
      <div className="sm:col-span-2 rounded-2xl border bg-card p-8 shadow-sm">
        <div className="max-w-sm">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground">Developer API</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">RESTful and GraphQL APIs with comprehensive SDKs for every major language and framework.</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      section: 'py-20 sm:py-28',
      grid: 'mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
      cardWide: 'sm:col-span-2 rounded-2xl border bg-card p-8 shadow-sm',
      cardNormal: 'rounded-2xl border bg-card p-8 shadow-sm',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-labelledby'],
      keyboardNav: 'N/A — content',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'asymmetric bento layout — not uniform grid',
        'col-span-2 for featured items',
        'rounded-2xl for premium feel',
        'varied content lengths create natural rhythm',
      ],
      inspirationSource: 'Apple bento grids',
      craftDetails: ['alternating wide/normal cards', 'max-w-sm on wide card text to prevent stretching'],
    },
  },
];
