import type { IComponentSnippet } from '../types.js';

export const heroSnippets: IComponentSnippet[] = [
  {
    id: 'hero-centered',
    name: 'Centered Hero',
    category: 'organism',
    type: 'hero',
    variant: 'centered',
    tags: ['hero', 'landing', 'headline', 'cta', 'above-fold'],
    mood: ['professional', 'minimal', 'bold'],
    industry: ['saas', 'startup', 'agency'],
    visualStyles: ['minimal-editorial', 'soft-depth', 'corporate-trust'],
    jsx: `<section className="relative overflow-hidden" aria-labelledby="hero-heading">
  <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
    <div className="text-center">
      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-6">New Release v2.0</span>
      <h1 id="hero-heading" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Build beautiful products<br className="hidden sm:inline" />
        <span className="text-primary">faster than ever</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        The modern toolkit for designers and developers. Create stunning interfaces with professional-grade components and seamless workflows.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a href="/signup" className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]">Get Started Free</a>
        <a href="/demo" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-input px-8 text-sm font-medium text-foreground transition-all hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /></svg>
          Watch Demo
        </a>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">No credit card required · Free forever for individuals</p>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      section: 'relative overflow-hidden',
      container: 'mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8',
      badge: 'inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-6',
      heading: 'text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl',
      headingAccent: 'text-primary',
      description: 'mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed',
      actions: 'mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center',
      primaryCta:
        'inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]',
      secondaryCta:
        'inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-input px-8 text-sm font-medium text-foreground transition-all hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]',
      disclaimer: 'mt-6 text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-labelledby'],
      keyboardNav: 'Tab through CTAs',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h1' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'badge for context/social proof above heading',
        'accent color on key phrase — not entire heading',
        'disclaimer reduces friction',
        'play icon on demo CTA for visual hint',
        'flex-col → flex-row for mobile CTA stacking',
      ],
      inspirationSource: 'Vercel / shadcn/ui landing pages',
      craftDetails: [
        'max-w-5xl container for readability',
        'responsive type scale: 4xl → 5xl → 6xl',
        'max-w-2xl on description for line length control',
      ],
    },
  },
  {
    id: 'hero-split',
    name: 'Split Hero with Visual',
    category: 'organism',
    type: 'hero',
    variant: 'split',
    tags: ['hero', 'landing', 'image', 'asymmetric', 'above-fold'],
    mood: ['professional', 'bold'],
    industry: ['saas', 'fintech', 'ecommerce'],
    visualStyles: ['soft-depth', 'corporate-trust', 'dark-premium'],
    jsx: `<section className="relative overflow-hidden" aria-labelledby="hero-split-heading">
  <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success ring-1 ring-inset ring-success/20 dark:bg-success/10 dark:text-success dark:ring-success/20 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
          Now available
        </span>
        <h1 id="hero-split-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          The smarter way to manage your workflow
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Streamline your processes with intelligent automation. Built for teams that want to move fast without breaking things.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="/signup" className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]">Start free trial</a>
          <a href="/pricing" className="inline-flex h-11 items-center justify-center rounded-lg border border-input px-8 text-sm font-medium text-foreground transition-all hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]">View pricing</a>
        </div>
        <div className="mt-8 flex items-center gap-4">
          <div className="flex -space-x-2">
            <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-medium text-muted-foreground" aria-hidden="true">A</div>
            <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-medium text-muted-foreground" aria-hidden="true">B</div>
            <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-medium text-muted-foreground" aria-hidden="true">C</div>
          </div>
          <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">2,000+</span> teams already on board</p>
        </div>
      </div>
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl border bg-muted shadow-2xl">
          <div className="flex h-full items-center justify-center text-muted-foreground/50">
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth="0.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" /></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      section: 'relative overflow-hidden',
      container: 'mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8',
      grid: 'grid items-center gap-12 lg:grid-cols-2 lg:gap-16',
      heading: 'text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl',
      description: 'mt-6 text-lg text-muted-foreground leading-relaxed',
      actions: 'mt-8 flex flex-col gap-3 sm:flex-row',
      socialProof: 'mt-8 flex items-center gap-4',
      avatarStack: 'flex -space-x-2',
      visual: 'aspect-[4/3] overflow-hidden rounded-2xl border bg-muted shadow-2xl',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-labelledby'],
      keyboardNav: 'Tab through CTAs',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h1' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'avatar stack for social proof',
        'status badge with dot indicator',
        'shadow-2xl on visual for depth',
        'aspect-[4/3] for consistent visual proportions',
        'team count with semibold number',
      ],
      inspirationSource: 'Stripe hero layout',
      craftDetails: [
        'grid → stacked on mobile, side-by-side on lg',
        '-space-x-2 overlapping avatars',
        'rounded-2xl + shadow-2xl for premium visual',
      ],
    },
  },
  {
    id: 'hero-gradient',
    name: 'Gradient Hero',
    category: 'organism',
    type: 'hero',
    variant: 'gradient',
    tags: ['hero', 'landing', 'gradient', 'premium', 'above-fold'],
    mood: ['premium', 'bold', 'futuristic'],
    industry: ['saas', 'startup', 'agency'],
    visualStyles: ['gradient-mesh', 'dark-premium'],
    jsx: `<section className="relative overflow-hidden bg-zinc-950" aria-labelledby="hero-gradient-heading">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),transparent)]" aria-hidden="true" />
  <div className="relative mx-auto max-w-5xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
    <div className="text-center">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-sm mb-8">
        <span className="h-1.5 w-1.5 rounded-full bg-success motion-safe:animate-pulse motion-reduce:animate-none" aria-hidden="true" />
        Now in public beta
      </span>
      <h1 id="hero-gradient-heading" className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
        Ship products that<br />
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">users love</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 leading-relaxed">
        Build with the tools that power the best teams in the world. From prototype to production in minutes.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a href="/signup" className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-zinc-900 shadow-sm transition-all hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-[0.98]">Get Started</a>
        <a href="/docs" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/10 px-8 text-sm font-medium text-zinc-300 transition-all hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-[0.98]">Read the docs →</a>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      section: 'relative overflow-hidden bg-zinc-950',
      gradientBg:
        'absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),transparent)]',
      container: 'relative mx-auto max-w-5xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8',
      badge:
        'inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-sm mb-8',
      heading: 'text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl',
      gradientText: 'bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent',
      description: 'mx-auto mt-6 max-w-2xl text-lg text-zinc-400 leading-relaxed',
      primaryCta:
        'inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-zinc-900 shadow-sm transition-all hover:bg-zinc-100',
      secondaryCta:
        'inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/10 px-8 text-sm font-medium text-zinc-300 transition-all hover:bg-white/5 hover:text-white',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-labelledby', 'aria-hidden on decorative bg'],
      keyboardNav: 'Tab through CTAs',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h1' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'radial gradient background (not linear)',
        'gradient text with via stop for richness',
        'inverted CTA (white on dark)',
        'pulsing dot for live status feel',
        'ring-offset-zinc-950 for dark mode focus rings',
      ],
      inspirationSource: 'Linear / Vercel dark hero sections',
      craftDetails: [
        'radial-gradient from above for aurora effect',
        'text scale up to 7xl',
        'h-12 larger CTAs for dark hero impact',
      ],
    },
  },
];
