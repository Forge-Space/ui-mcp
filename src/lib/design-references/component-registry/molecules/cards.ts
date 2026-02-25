import type { IComponentSnippet } from '../types.js';

export const cardSnippets: IComponentSnippet[] = [
  {
    id: 'card-basic',
    name: 'Basic Card',
    category: 'molecule',
    type: 'card',
    variant: 'basic',
    tags: ['container', 'media', 'surface'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<article className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-md">
  <h3 className="text-lg font-semibold text-foreground">Card Title</h3>
  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Brief description that provides context about this card's content.</p>
  <div className="mt-4 flex gap-2">
    <button type="button" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] transition-all">Action</button>
    <button type="button" className="rounded-lg border border-input px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] transition-all">Secondary</button>
  </div>
</article>`,
    tailwindClasses: {
      card: 'rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-md',
      title: 'text-lg font-semibold text-foreground',
      description: 'mt-2 text-sm text-muted-foreground leading-relaxed',
      actions: 'mt-4 flex gap-2',
      button:
        'rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] transition-all',
      buttonSecondary:
        'rounded-lg border border-input px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] transition-all',
    },
    a11y: {
      roles: ['article'],
      ariaAttributes: [],
      keyboardNav: 'Tab through interactive elements',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'article' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'rounded-xl for modern feel',
        'hover:shadow-md for depth on interaction',
        'article element for semantics',
        'active:scale on buttons',
      ],
      inspirationSource: 'shadcn/ui Card',
      craftDetails: ['consistent 24px padding (p-6)', 'shadow-sm → shadow-md hover transition'],
    },
  },
  {
    id: 'card-stats',
    name: 'Stats Card',
    category: 'molecule',
    type: 'card',
    variant: 'stats',
    tags: ['saas', 'metric', 'number', 'kpi'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'fintech', 'devtools'],
    visualStyles: ['linear-modern', 'dark-premium', 'corporate-trust'],
    jsx: `<div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
  <div className="flex items-center justify-between">
    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
  </div>
  <div className="mt-3">
    <p className="text-2xl font-bold text-foreground tracking-tight">$45,231.89</p>
    <p className="mt-1 flex items-center gap-1 text-xs text-success">
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" /></svg>
      +20.1% from last month
    </p>
  </div>
</div>`,
    tailwindClasses: {
      card: 'rounded-xl border bg-card p-6 text-card-foreground shadow-sm',
      header: 'flex items-center justify-between',
      label: 'text-sm font-medium text-muted-foreground',
      icon: 'h-4 w-4 text-muted-foreground',
      value: 'text-2xl font-bold text-foreground tracking-tight',
      trend: 'mt-1 flex items-center gap-1 text-xs text-success',
    },
    a11y: {
      roles: [],
      ariaAttributes: ['aria-hidden on icons'],
      keyboardNav: 'N/A — informational',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'trend indicator with icon + text — not color-only',
        'tracking-tight on large number',
        'contextual icon in header',
        'dark mode trend color',
      ],
      inspirationSource: 'shadcn/ui Dashboard cards',
      craftDetails: ['icon + text trend for color-independent info', 'consistent card dimensions with basic card'],
    },
  },
  {
    id: 'card-pricing',
    name: 'Pricing Tier Card',
    category: 'molecule',
    type: 'card',
    variant: 'pricing',
    tags: ['pricing', 'plan', 'subscription', 'conversion'],
    mood: ['professional', 'bold'],
    industry: ['saas', 'startup'],
    visualStyles: ['soft-depth', 'gradient-mesh', 'corporate-trust'],
    jsx: `<div className="relative rounded-2xl border bg-card p-8 text-card-foreground shadow-sm transition-shadow hover:shadow-lg">
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-foreground">Pro</h3>
    <p className="mt-1 text-sm text-muted-foreground">For growing teams</p>
    <div className="mt-4 flex items-baseline gap-1">
      <span className="text-4xl font-bold tracking-tight text-foreground">$29</span>
      <span className="text-sm text-muted-foreground">/month</span>
    </div>
  </div>
  <ul className="space-y-3 text-sm text-muted-foreground" role="list">
    <li className="flex items-center gap-3">
      <svg className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
      Unlimited projects
    </li>
    <li className="flex items-center gap-3">
      <svg className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
      Priority support
    </li>
    <li className="flex items-center gap-3">
      <svg className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
      Advanced analytics
    </li>
  </ul>
  <button type="button" className="mt-8 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] transition-all">
    Get started
  </button>
</div>`,
    tailwindClasses: {
      card: 'relative rounded-2xl border bg-card p-8 text-card-foreground shadow-sm transition-shadow hover:shadow-lg',
      planName: 'text-lg font-semibold text-foreground',
      planDesc: 'mt-1 text-sm text-muted-foreground',
      price: 'text-4xl font-bold tracking-tight text-foreground',
      period: 'text-sm text-muted-foreground',
      featureList: 'space-y-3 text-sm text-muted-foreground',
      featureIcon: 'h-4 w-4 shrink-0 text-primary',
      cta: 'mt-8 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] transition-all',
    },
    a11y: {
      roles: ['minimal-editorial', 'listitem'],
      ariaAttributes: ['role="list"', 'aria-hidden on check icons'],
      keyboardNav: 'Tab to CTA button',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'rounded-2xl for premium feel',
        'check icons are primary color',
        'tracking-tight on price for impact',
        'hover:shadow-lg for depth',
      ],
      inspirationSource: 'Stripe pricing cards',
      craftDetails: ['8-unit padding (p-8)', 'clear visual hierarchy: name → desc → price → features → CTA'],
    },
  },
  {
    id: 'card-testimonial',
    name: 'Testimonial Card',
    category: 'molecule',
    type: 'card',
    variant: 'testimonial',
    tags: ['social-proof', 'review', 'quote', 'trust'],
    mood: ['warm', 'professional'],
    industry: ['saas', 'agency', 'ecommerce'],
    visualStyles: ['soft-depth', 'minimal-editorial', 'corporate-trust'],
    jsx: `<figure className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
  <blockquote className="text-sm leading-relaxed text-foreground">
    "This product has completely transformed how our team works. The attention to detail is remarkable."
  </blockquote>
  <figcaption className="mt-4 flex items-center gap-3">
    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground" aria-hidden="true">JD</div>
    <div>
      <p className="text-sm font-semibold text-foreground">Jane Doe</p>
      <p className="text-xs text-muted-foreground">CEO at Company</p>
    </div>
  </figcaption>
</figure>`,
    tailwindClasses: {
      card: 'rounded-xl border bg-card p-6 text-card-foreground shadow-sm',
      quote: 'text-sm leading-relaxed text-foreground',
      caption: 'mt-4 flex items-center gap-3',
      avatar:
        'h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground',
      name: 'text-sm font-semibold text-foreground',
      role: 'text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['figure'],
      ariaAttributes: [],
      keyboardNav: 'N/A — content',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'figure' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'figure + figcaption for proper semantics',
        'avatar fallback initials',
        'leading-relaxed for quote readability',
      ],
      inspirationSource: 'Tailwind UI testimonials',
      craftDetails: ['semantic figure/figcaption', 'avatar with text fallback — no broken image'],
    },
  },
  {
    id: 'card-feature',
    name: 'Feature Card',
    category: 'molecule',
    type: 'card',
    variant: 'feature',
    tags: ['feature', 'benefit', 'agency', 'agency'],
    mood: ['professional', 'bold'],
    industry: ['saas', 'startup', 'agency'],
    visualStyles: ['soft-depth', 'gradient-mesh', 'dark-premium'],
    jsx: `<div className="group rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
  </div>
  <h3 className="text-base font-semibold text-foreground">Lightning Fast</h3>
  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Built for speed with optimized rendering and minimal bundle size for the best user experience.</p>
</div>`,
    tailwindClasses: {
      card: 'group rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5',
      iconWrapper:
        'mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground',
      icon: 'h-5 w-5',
      title: 'text-base font-semibold text-foreground',
      description: 'mt-2 text-sm text-muted-foreground leading-relaxed',
    },
    a11y: {
      roles: [],
      ariaAttributes: ['aria-hidden on icon'],
      keyboardNav: 'N/A — content',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'group hover transforms icon wrapper',
        'hover:-translate-y-0.5 lift effect',
        'icon bg transitions from primary/10 to primary on hover — reveals intent',
      ],
      inspirationSource: 'Linear feature showcase',
      craftDetails: ['group utility for parent-child hover', 'icon wrapper bg change adds interaction depth'],
    },
  },
  {
    id: 'card-bento',
    name: 'Bento Grid Card',
    category: 'molecule',
    type: 'card',
    variant: 'bento',
    tags: ['bento', 'grid', 'feature', 'agency'],
    mood: ['bold', 'creative', 'premium'],
    industry: ['agency', 'startup', 'saas'],
    visualStyles: ['bento-grid', 'soft-depth', 'gradient-mesh'],
    jsx: `<article className="group relative col-span-2 row-span-2 overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-card p-8 shadow-sm transition-all hover:shadow-xl">
  <div className="relative z-10">
    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
    </div>
    <h3 className="mt-4 text-2xl font-bold text-foreground">Lightning Fast</h3>
    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Experience blazing speeds with our optimized infrastructure.</p>
  </div>
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
</article>`,
    tailwindClasses: {
      card: 'group relative col-span-2 row-span-2 overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-card p-8 shadow-sm transition-all hover:shadow-xl',
      icon: 'inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary',
      title: 'mt-4 text-2xl font-bold text-foreground',
      description: 'mt-2 text-sm text-muted-foreground leading-relaxed',
      overlay:
        'absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100',
    },
    a11y: {
      roles: ['article'],
      ariaAttributes: ['aria-hidden on decorative elements'],
      keyboardNav: 'N/A — informational',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'article' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'col-span-2 row-span-2 for grid layout',
        'gradient from-primary/10 via-card for depth',
        'hover overlay with opacity transition',
      ],
      inspirationSource: 'Apple bento grids / Linear feature cards',
      craftDetails: [
        'larger icon (h-12 w-12) for bento prominence',
        'rounded-2xl for modern premium feel',
        'gradient overlay on hover',
      ],
    },
  },
  {
    id: 'card-glass',
    name: 'Glassmorphism Card',
    category: 'molecule',
    type: 'card',
    variant: 'glass',
    tags: ['glass', 'frosted', 'premium', 'overlay'],
    mood: ['premium', 'futuristic', 'creative'],
    industry: ['agency', 'startup', 'saas'],
    visualStyles: ['glassmorphism', 'dark-premium'],
    jsx: `<article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-lg">
  <h3 className="text-lg font-semibold text-white">Glassmorphism Card</h3>
  <p className="mt-2 text-sm text-white/70 leading-relaxed">Semi-transparent design with backdrop blur for modern, layered UIs.</p>
  <div className="mt-4 flex gap-2">
    <button type="button" className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:scale-[0.98]">Action</button>
  </div>
</article>`,
    tailwindClasses: {
      card: 'rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-lg',
      title: 'text-lg font-semibold text-white',
      description: 'mt-2 text-sm text-white/70 leading-relaxed',
      button:
        'rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:scale-[0.98]',
    },
    a11y: {
      roles: ['article'],
      ariaAttributes: [],
      keyboardNav: 'Tab through interactive elements',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'article' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'backdrop-blur-md for frosted glass effect',
        'border-white/10 for subtle edge',
        'bg-white/5 for transparency',
      ],
      inspirationSource: 'Apple visionOS / iOS 15+ cards',
      craftDetails: [
        'semi-transparent backgrounds require dark/gradient parent',
        'backdrop-blur creates real glass effect',
        'white/opacity for dark backgrounds',
      ],
    },
  },
  {
    id: 'card-interactive-3d',
    name: '3D Tilt Card',
    category: 'molecule',
    type: 'card',
    variant: 'interactive-3d',
    tags: ['3d', 'tilt', 'energetic', 'premium'],
    mood: ['premium', 'creative', 'futuristic'],
    industry: ['agency', 'startup', 'media'],
    visualStyles: ['dark-premium', 'gradient-mesh'],
    jsx: `<article className="group relative rounded-2xl border bg-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl" style={{ transformStyle: 'preserve-3d' }}>
  <div className="relative z-10">
    <h3 className="text-lg font-semibold text-foreground">Interactive Card</h3>
    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Hover to see the 3D tilt effect in action.</p>
  </div>
  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
</article>`,
    tailwindClasses: {
      card: 'group relative rounded-2xl border bg-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl',
      content: 'relative z-10',
      title: 'text-lg font-semibold text-foreground',
      description: 'mt-2 text-sm text-muted-foreground leading-relaxed',
      gradientOverlay:
        'absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 transition-opacity group-hover:opacity-100',
    },
    a11y: {
      roles: ['article'],
      ariaAttributes: ['aria-hidden on decorative overlay'],
      keyboardNav: 'N/A — visual effect only',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'article' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'hover:-translate-y-1 for lift effect',
        'duration-300 for smooth animation',
        'shadow-lg → shadow-2xl transition',
      ],
      inspirationSource: 'Dribbble card hover effects',
      craftDetails: [
        'transformStyle: preserve-3d for 3D context',
        'gradient overlay fades in on hover',
        'layered z-10 content',
      ],
    },
  },
  {
    id: 'card-hover-lift',
    name: 'Hover Lift Card',
    category: 'molecule',
    type: 'card',
    variant: 'hover-lift',
    tags: ['hover', 'lift', 'energetic', 'depth'],
    mood: ['professional', 'minimal', 'premium'],
    industry: ['saas', 'fintech', 'general'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<article className="group rounded-xl border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-2 hover:shadow-xl">
  <div className="flex items-start justify-between">
    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
    </div>
    <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">+12%</span>
  </div>
  <h3 className="mt-4 text-lg font-semibold text-foreground">Active Users</h3>
  <p className="text-2xl font-bold text-foreground mt-1">2,543</p>
  <p className="mt-2 text-xs text-muted-foreground">Updated 2 minutes ago</p>
</article>`,
    tailwindClasses: {
      card: 'group rounded-xl border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-2 hover:shadow-xl',
      header: 'flex items-start justify-between',
      icon: 'flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground',
      badge: 'rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success',
      title: 'mt-4 text-lg font-semibold text-foreground',
      value: 'text-2xl font-bold text-foreground mt-1',
      timestamp: 'mt-2 text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['article'],
      ariaAttributes: ['aria-hidden on icon'],
      keyboardNav: 'N/A — informational',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'article' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'hover:-translate-y-2 for pronounced lift',
        'icon bg changes on hover',
        'duration-200 for snappy interaction',
      ],
      inspirationSource: 'Tremor dashboard cards',
      craftDetails: [
        'shadow-sm → shadow-xl for dramatic depth change',
        'group-hover on icon for coordinated animation',
        'success badge for trend indicator',
      ],
    },
  },
  {
    id: 'card-media-overlay',
    name: 'Media Overlay Card',
    category: 'molecule',
    type: 'card',
    variant: 'media-overlay',
    tags: ['media', 'image', 'overlay', 'media'],
    mood: ['bold', 'creative', 'editorial'],
    industry: ['media', 'ecommerce', 'agency'],
    visualStyles: ['gradient-mesh', 'dark-premium', 'minimal-editorial'],
    jsx: `<article className="group relative overflow-hidden rounded-2xl bg-muted shadow-lg transition-all hover:shadow-2xl">
  <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
    <svg className="h-16 w-16 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" strokeWidth="0.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" /></svg>
  </div>
  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
  <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
    <h3 className="text-xl font-bold">Featured Article</h3>
    <p className="mt-1 text-sm text-white/80">Discover the latest insights and trends in the industry.</p>
    <button type="button" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white hover:gap-2 transition-all">
      Read more
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
    </button>
  </div>
</article>`,
    tailwindClasses: {
      card: 'group relative overflow-hidden rounded-2xl bg-muted shadow-lg transition-all hover:shadow-2xl',
      media: 'aspect-[16/9] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center',
      overlay:
        'absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100',
      content:
        'absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100',
      title: 'text-xl font-bold',
      description: 'mt-1 text-sm text-white/80',
      link: 'mt-3 inline-flex items-center gap-1 text-sm font-medium text-white hover:gap-2 transition-all',
    },
    a11y: {
      roles: ['article'],
      ariaAttributes: ['aria-hidden on decorative elements'],
      keyboardNav: 'Tab to link',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'article' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'translate-y-4 content slides up on hover',
        'gradient overlay from-background for readability',
        'aspect-[16/9] for consistent media ratio',
      ],
      inspirationSource: 'Medium article cards / Unsplash',
      craftDetails: [
        'duration-300 for smooth slide-up animation',
        'hover:gap-2 on link for interactive arrow',
        'layered gradients for depth',
      ],
    },
  },
  {
    id: 'card-feature-highlight',
    name: 'Feature Highlight Card',
    category: 'molecule',
    type: 'card',
    variant: 'feature-highlight',
    tags: ['feature', 'icon', 'highlight', 'product'],
    mood: ['professional', 'bold', 'minimal'],
    industry: ['saas', 'startup', 'agency'],
    visualStyles: ['soft-depth', 'gradient-mesh', 'linear-modern'],
    jsx: `<article className="group rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
  </div>
  <h3 className="text-base font-semibold text-foreground">Lightning Fast</h3>
  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Built for speed with optimized rendering and minimal bundle size for the best user experience.</p>
</article>`,
    tailwindClasses: {
      card: 'group rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5',
      iconWrapper:
        'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground',
      icon: 'h-6 w-6',
      title: 'text-base font-semibold text-foreground',
      description: 'mt-2 text-sm text-muted-foreground leading-relaxed',
    },
    a11y: {
      roles: ['article'],
      ariaAttributes: ['aria-hidden on icon'],
      keyboardNav: 'N/A — content',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'article' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'group hover transforms icon wrapper',
        'hover:-translate-y-0.5 lift effect',
        'icon bg transitions from primary/10 to primary on hover',
      ],
      inspirationSource: 'Linear feature showcase',
      craftDetails: ['group utility for parent-child hover', 'icon wrapper bg change adds interaction depth'],
    },
  },
];
