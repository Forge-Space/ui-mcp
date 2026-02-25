import type { IComponentSnippet } from '../types.js';

export const heroSnippets: IComponentSnippet[] = [
  {
    id: 'hero-centered',
    name: 'Centered Hero',
    category: 'organism',
    type: 'hero',
    variant: 'soft-depth',
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
        <span className="inline-flex items-center gap-1.5 rounded-md bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success ring-1 ring-inset ring-success/20 dark:bg-success/100/10 dark:text-success dark:ring-success/20 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-success/100" aria-hidden="true" />
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
  {
    id: 'hero-parallax',
    name: 'Parallax Hero',
    category: 'organism',
    type: 'hero',
    variant: 'parallax',
    tags: ['hero', 'parallax', 'scroll', 'energetic', 'landing'],
    mood: ['creative', 'premium', 'futuristic'],
    industry: ['agency', 'startup', 'media'],
    visualStyles: ['gradient-mesh', 'dark-premium'],
    jsx: `<section className="relative min-h-screen overflow-hidden flex items-center" aria-labelledby="hero-parallax-heading">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" aria-hidden="true" />
  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-20" aria-hidden="true" />
  <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
    <div className="max-w-3xl">
      <h1 id="hero-parallax-heading" className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
        Design that moves<br />
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">with you</span>
      </h1>
      <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
        Experience depth and motion as you scroll. Built for immersive storytelling.
      </p>
      <div className="mt-10 flex gap-4">
        <a href="/start" className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]">Get Started</a>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      section: 'relative min-h-screen overflow-hidden flex items-center',
      gradient: 'absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10',
      pattern: 'absolute inset-0 opacity-20',
      container: 'relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8',
      heading: 'text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl',
      gradientText: 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent',
      description: 'mt-6 text-xl text-muted-foreground leading-relaxed',
      cta: 'inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-labelledby', 'aria-hidden on decorative layers'],
      keyboardNav: 'Tab to CTA',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h1' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'min-h-screen for full viewport impact',
        'layered backgrounds for depth',
        'gradient text on key phrase',
      ],
      inspirationSource: 'Apple product pages / Stripe homepage',
      craftDetails: [
        'absolute layers with z-index stacking',
        'max-w-3xl for readability',
        'shadow-lg with colored shadows',
      ],
    },
  },
  {
    id: 'hero-video-bg',
    name: 'Video Background Hero',
    category: 'organism',
    type: 'hero',
    variant: 'video-bg',
    tags: ['hero', 'video', 'background', 'media', 'immersive'],
    mood: ['bold', 'premium', 'creative'],
    industry: ['agency', 'media', 'startup'],
    visualStyles: ['dark-premium', 'gradient-mesh'],
    jsx: `<section className="relative min-h-screen overflow-hidden flex items-center" aria-labelledby="hero-video-heading">
  <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10" aria-hidden="true" />
  <div className="absolute inset-0 bg-muted">
    <svg className="h-full w-full text-muted-foreground/10" fill="none" viewBox="0 0 24 24" strokeWidth="0.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>
  </div>
  <div className="relative z-20 mx-auto max-w-5xl px-4 py-32 text-center sm:px-6 lg:px-8">
    <h1 id="hero-video-heading" className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
      See it in action
    </h1>
    <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 leading-relaxed">
      Full-screen video backgrounds that captivate and engage your audience from the first frame.
    </p>
    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <a href="/demo" className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-zinc-900 shadow-lg transition-all hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 active:scale-[0.98]">Watch Demo</a>
      <button type="button" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-white/20 px-8 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 active:scale-[0.98]" aria-label="Mute video">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" /></svg>
      </button>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      section: 'relative min-h-screen overflow-hidden flex items-center',
      overlay: 'absolute inset-0 bg-background/60 backdrop-blur-sm z-10',
      videoPlaceholder: 'absolute inset-0 bg-muted',
      container: 'relative z-20 mx-auto max-w-5xl px-4 py-32 text-center sm:px-6 lg:px-8',
      heading: 'text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl',
      description: 'mx-auto mt-6 max-w-2xl text-lg text-white/90 leading-relaxed',
      actions: 'mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center',
      primaryCta:
        'inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-zinc-900 shadow-lg transition-all hover:bg-white/90',
      muteButton:
        'inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-white/20 px-8 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-labelledby', 'aria-label on mute button', 'aria-hidden on decorative video'],
      keyboardNav: 'Tab through CTAs',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h1' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'backdrop-blur-sm overlay for text readability',
        'z-index layering for video/overlay/content',
        'mute button for a11y control',
      ],
      inspirationSource: 'Airbnb experiences / Nike product launches',
      craftDetails: [
        'bg-background/60 darkens video without black',
        'white text with white/90 description',
        'border-2 border-white/20 for glass mute button',
      ],
    },
  },
  {
    id: 'hero-animated-text',
    name: 'Animated Text Hero',
    category: 'organism',
    type: 'hero',
    variant: 'animated-text',
    tags: ['hero', 'energetic', 'text', 'typewriter', 'creative'],
    mood: ['energetic', 'creative', 'futuristic'],
    industry: ['agency', 'startup', 'devtools'],
    visualStyles: ['linear-modern', 'dark-premium', 'gradient-mesh'],
    jsx: `<section className="relative overflow-hidden" aria-labelledby="hero-animated-heading">
  <div className="mx-auto max-w-6xl px-4 py-32 sm:px-6 lg:px-8">
    <div className="text-center">
      <h1 id="hero-animated-heading" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Build products that are<br />
        <span className="inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent motion-safe:animate-pulse motion-reduce:animate-none">impossible to ignore</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed opacity-0 motion-safe:animate-[fadeIn_0.6s_ease-in_0.3s_forwards] motion-reduce:opacity-100">
        From concept to launch in record time. No code, no limits.
      </p>
      <div className="mt-10 flex justify-center gap-4 opacity-0 motion-safe:animate-[fadeIn_0.6s_ease-in_0.6s_forwards] motion-reduce:opacity-100">
        <a href="/signup" className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]">Start Building</a>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      section: 'relative overflow-hidden',
      container: 'mx-auto max-w-6xl px-4 py-32 sm:px-6 lg:px-8',
      heading: 'text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl',
      animatedText:
        'inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent motion-safe:animate-pulse motion-reduce:animate-none',
      description:
        'mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed opacity-0 motion-safe:animate-[fadeIn_0.6s_ease-in_0.3s_forwards] motion-reduce:opacity-100',
      actions:
        'mt-10 flex justify-center gap-4 opacity-0 motion-safe:animate-[fadeIn_0.6s_ease-in_0.6s_forwards] motion-reduce:opacity-100',
    },
    animations: ['@keyframes fadeIn { to { opacity: 1; } }'],
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-labelledby'],
      keyboardNav: 'Tab to CTA',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h1' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'staggered fade-in animations (0.3s, 0.6s delays)',
        'motion-safe/reduce for a11y',
        'animate-pulse on gradient text',
      ],
      inspirationSource: 'Framer Motion landing pages',
      craftDetails: [
        'inline-block on animated span for transform support',
        'forwards fill-mode retains opacity:1',
        'motion-reduce:opacity-100 fallback',
      ],
    },
  },
  {
    id: 'hero-waitlist',
    name: 'Waitlist Hero',
    category: 'organism',
    type: 'hero',
    variant: 'waitlist',
    tags: ['hero', 'waitlist', 'email', 'signup', 'launch'],
    mood: ['professional', 'minimal', 'bold'],
    industry: ['startup', 'saas'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<section className="relative overflow-hidden" aria-labelledby="hero-waitlist-heading">
  <div className="mx-auto max-w-4xl px-4 py-32 text-center sm:px-6 lg:px-8">
    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-6">
      <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse motion-reduce:animate-none" aria-hidden="true" />
      Coming Soon
    </span>
    <h1 id="hero-waitlist-heading" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
      The future of productivity<br />
      <span className="text-primary">starts here</span>
    </h1>
    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
      Join thousands on the waitlist. Be the first to know when we launch.
    </p>
    <form className="mx-auto mt-10 max-w-md" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input type="email" className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Enter your email" required aria-label="Email address" />
        <button type="submit" className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]">Join Waitlist</button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">We'll never share your email. Unsubscribe anytime.</p>
    </form>
    <div className="mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          <div className="h-8 w-8 rounded-full border-2 border-background bg-muted" aria-hidden="true" />
          <div className="h-8 w-8 rounded-full border-2 border-background bg-muted" aria-hidden="true" />
          <div className="h-8 w-8 rounded-full border-2 border-background bg-muted" aria-hidden="true" />
        </div>
        <span><span className="font-semibold text-foreground">2,543</span> people joined</span>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      section: 'relative overflow-hidden',
      container: 'mx-auto max-w-4xl px-4 py-32 text-center sm:px-6 lg:px-8',
      badge:
        'inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-6',
      heading: 'text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl',
      headingAccent: 'text-primary',
      description: 'mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed',
      form: 'mx-auto mt-10 max-w-md',
      formRow: 'flex flex-col gap-3 sm:flex-row',
      input:
        'flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring',
      submit:
        'inline-flex h-12 items-center justify-center whitespace-nowrap rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]',
      disclaimer: 'mt-3 text-xs text-muted-foreground',
      socialProof: 'mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-labelledby', 'aria-label on input', 'required on email'],
      keyboardNav: 'Tab through form fields',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h1' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'form-first design for conversion',
        'social proof with avatar stack + count',
        'disclaimer reduces friction',
      ],
      inspirationSource: 'Product Hunt / Linear waitlist pages',
      craftDetails: [
        'max-w-md constrains form width',
        'flex-col → flex-row for mobile input stacking',
        'whitespace-nowrap on button text',
      ],
    },
  },
];
