import type { IComponentSnippet } from '../types.js';

export const statSnippets: IComponentSnippet[] = [
  {
    id: 'stat-card',
    name: 'Simple Stat Card',
    category: 'molecule',
    type: 'stat',
    variant: 'card',
    tags: ['stat', 'metric', 'kpi', 'saas'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'fintech', 'devtools'],
    visualStyles: ['linear-modern', 'dark-premium', 'corporate-trust'],
    jsx: `<div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
  <div className="flex items-center justify-between">
    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
  </div>
  <div className="mt-3 flex items-baseline gap-2">
    <p className="text-3xl font-bold tracking-tight text-foreground">$45,231.89</p>
    <span className="inline-flex items-center gap-0.5 text-sm font-medium text-success dark:text-success">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" /></svg>
      +20.1%
    </span>
  </div>
  <p className="mt-1 text-xs text-muted-foreground">+$4,500 from last month</p>
</div>`,
    tailwindClasses: {
      card: 'rounded-xl border bg-card p-6 text-card-foreground shadow-sm',
      header: 'flex items-center justify-between',
      label: 'text-sm font-medium text-muted-foreground',
      icon: 'h-4 w-4 text-muted-foreground',
      value: 'text-3xl font-bold tracking-tight text-foreground',
      trend: 'inline-flex items-center gap-0.5 text-sm font-medium text-success dark:text-success',
      description: 'mt-1 text-xs text-muted-foreground',
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
        'tracking-tight on large number for impact',
        'trend with icon + percentage',
        'contextual icon in header',
        'dark mode trend color',
      ],
      inspirationSource: 'Vercel Analytics dashboard',
      craftDetails: [
        'text-3xl for visual hierarchy',
        'gap-2 for value and trend spacing',
        'mt-1 tight description spacing',
      ],
    },
  },
  {
    id: 'stat-sparkline',
    name: 'Stat with Mini Chart',
    category: 'molecule',
    type: 'stat',
    variant: 'sparkline',
    tags: ['stat', 'chart', 'sparkline', 'trend'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'fintech', 'devtools'],
    visualStyles: ['linear-modern', 'dark-premium', 'gradient-mesh'],
    jsx: `<div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
  <div className="flex items-start justify-between">
    <div className="space-y-1">
      <p className="text-sm font-medium text-muted-foreground">Active Users</p>
      <p className="text-3xl font-bold tracking-tight text-foreground">2,845</p>
      <p className="inline-flex items-center gap-0.5 text-xs font-medium text-success dark:text-success">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" /></svg>
        +12.5% vs last week
      </p>
    </div>
    <div className="h-16 w-24" aria-hidden="true">
      <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" className="text-primary" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-primary" />
          </linearGradient>
        </defs>
        <path d="M 0 40 L 10 35 L 20 38 L 30 25 L 40 28 L 50 20 L 60 22 L 70 15 L 80 18 L 90 10 L 100 12" fill="url(#gradient)" />
        <path d="M 0 40 L 10 35 L 20 38 L 30 25 L 40 28 L 50 20 L 60 22 L 70 15 L 80 18 L 90 10 L 100 12" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
      </svg>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      card: 'rounded-xl border bg-card p-6 text-card-foreground shadow-sm',
      container: 'flex items-start justify-between',
      content: 'space-y-1',
      label: 'text-sm font-medium text-muted-foreground',
      value: 'text-3xl font-bold tracking-tight text-foreground',
      trend: 'inline-flex items-center gap-0.5 text-xs font-medium text-success dark:text-success',
      chart: 'h-16 w-24',
    },
    a11y: {
      roles: [],
      ariaAttributes: ['aria-hidden on chart'],
      keyboardNav: 'N/A — informational',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'inline SVG sparkline chart',
        'gradient fill under line',
        'preserveAspectRatio="none" for stretch',
        'aria-hidden on decorative chart',
      ],
      inspirationSource: 'Linear project metrics',
      craftDetails: [
        'h-16 w-24 chart dimensions',
        'linearGradient with opacity for depth',
        'currentColor for theme compatibility',
      ],
    },
  },
  {
    id: 'stat-trend',
    name: 'Stat with Trend Indicator',
    category: 'molecule',
    type: 'stat',
    variant: 'trend',
    tags: ['stat', 'trend', 'indicator', 'change'],
    mood: ['professional', 'minimal'],
    industry: ['fintech', 'saas', 'devtools'],
    visualStyles: ['corporate-trust', 'linear-modern', 'soft-depth'],
    jsx: `<div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" /></svg>
      </div>
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
        <p className="text-2xl font-bold tracking-tight text-foreground">$12,345</p>
      </div>
    </div>
    <div className="flex flex-col items-end gap-0.5">
      <div className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-sm font-semibold text-success dark:text-success">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>
        18.2%
      </div>
      <p className="text-xs text-muted-foreground">vs last month</p>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      card: 'rounded-xl border bg-card p-6 text-card-foreground shadow-sm',
      container: 'flex items-center justify-between',
      iconWrapper: 'flex h-12 w-12 items-center justify-center rounded-full bg-primary/10',
      icon: 'h-6 w-6 text-primary',
      content: 'space-y-0.5',
      label: 'text-sm font-medium text-muted-foreground',
      value: 'text-2xl font-bold tracking-tight text-foreground',
      trendBadge:
        'inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-sm font-semibold text-success dark:text-success',
      trendIcon: 'h-4 w-4',
      trendLabel: 'text-xs text-muted-foreground',
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
        'rounded-full trend badge',
        'bg-success/10 with ring for depth',
        'icon wrapper with primary/10 background',
        'trending-up icon in badge',
      ],
      inspirationSource: 'Stripe dashboard metrics',
      craftDetails: ['flex-col items-end for right alignment', 'h-12 w-12 icon wrapper', 'gap-1 tight badge spacing'],
    },
  },
  {
    id: 'stat-comparison',
    name: 'Before/After Comparison',
    category: 'molecule',
    type: 'stat',
    variant: 'comparison',
    tags: ['stat', 'comparison', 'before-after', 'diff'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'devtools', 'fintech'],
    visualStyles: ['linear-modern', 'minimal-editorial', 'corporate-trust'],
    jsx: `<div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
  <p className="text-sm font-medium text-muted-foreground">Page Load Time</p>
  <div className="mt-4 flex items-center gap-8">
    <div className="flex-1">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Before</p>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-3xl font-bold tracking-tight text-foreground">3.2s</p>
      </div>
      <div className="mt-3 h-2 w-full rounded-full bg-destructive/20">
        <div className="h-2 rounded-full bg-red-600 dark:bg-destructive" style={{ width: '80%' }}></div>
      </div>
    </div>
    <svg className="h-6 w-6 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
    <div className="flex-1">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">After</p>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-3xl font-bold tracking-tight text-foreground">1.1s</p>
        <span className="inline-flex items-center gap-0.5 text-sm font-medium text-success dark:text-success">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" /></svg>
          -66%
        </span>
      </div>
      <div className="mt-3 h-2 w-full rounded-full bg-success/20">
        <div className="h-2 rounded-full bg-success dark:bg-success" style={{ width: '28%' }}></div>
      </div>
    </div>
  </div>
  <p className="mt-4 text-xs text-muted-foreground">After optimization and CDN implementation</p>
</div>`,
    tailwindClasses: {
      card: 'rounded-xl border bg-card p-6 text-card-foreground shadow-sm',
      title: 'text-sm font-medium text-muted-foreground',
      comparison: 'mt-4 flex items-center gap-8',
      side: 'flex-1',
      sideLabel: 'text-xs font-medium text-muted-foreground uppercase tracking-wide',
      value: 'text-3xl font-bold tracking-tight text-foreground',
      change: 'inline-flex items-center gap-0.5 text-sm font-medium text-success dark:text-success',
      progressBar: 'mt-3 h-2 w-full rounded-full',
      progressBarBefore: 'bg-destructive/20',
      progressBarAfter: 'bg-success/20',
      progressFill: 'h-2 rounded-full',
      arrow: 'h-6 w-6 shrink-0 text-muted-foreground',
      description: 'mt-4 text-xs text-muted-foreground',
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
        'before/after layout with arrow separator',
        'progress bars with contextual colors (red → green)',
        'percentage improvement indicator',
        'uppercase tracking-wide labels',
      ],
      inspirationSource: 'Plausible Analytics comparisons',
      craftDetails: [
        'gap-8 for visual separation',
        'inline style for dynamic progress width',
        'bg-destructive/20 and bg-success/20 for bar backgrounds',
      ],
    },
  },
];
