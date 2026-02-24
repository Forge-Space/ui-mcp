import type { IComponentSnippet } from '../types.js';

export const cardSnippets: IComponentSnippet[] = [
  {
    id: 'card-basic',
    name: 'Basic Card',
    category: 'molecule',
    type: 'card',
    variant: 'basic',
    tags: ['container', 'content', 'surface'],
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
    tags: ['dashboard', 'metric', 'number', 'kpi'],
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
      roles: ['list', 'listitem'],
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
    tags: ['feature', 'benefit', 'marketing', 'showcase'],
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
];
