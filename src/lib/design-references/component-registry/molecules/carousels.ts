import type { IComponentSnippet } from '../types.js';

export const carouselSnippets: IComponentSnippet[] = [
  {
    id: 'carousel-auto',
    name: 'Auto-Play Carousel',
    category: 'molecule',
    type: 'carousel',
    variant: 'auto',
    tags: ['slider', 'slideshow', 'auto-play', 'images'],
    mood: ['energetic', 'energetic'],
    industry: ['agency', 'ecommerce', 'agency'],
    visualStyles: ['soft-depth', 'gradient-mesh'],
    jsx: `<div className="relative w-full max-w-2xl overflow-hidden rounded-lg">
  <div className="aspect-video bg-muted">
    <img src="/placeholder1.jpg" alt="Slide 1" className="h-full w-full object-cover" />
  </div>
  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
    <button className="h-2 w-2 rounded-full bg-primary"></button>
    <button className="h-2 w-2 rounded-full bg-background/50 transition-colors hover:bg-background/80"></button>
    <button className="h-2 w-2 rounded-full bg-background/50 transition-colors hover:bg-background/80"></button>
    <button className="h-2 w-2 rounded-full bg-background/50 transition-colors hover:bg-background/80"></button>
  </div>
  <button className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm transition-colors hover:bg-background">
    <svg className="h-5 w-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
  </button>
  <button className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm transition-colors hover:bg-background">
    <svg className="h-5 w-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
  </button>
</div>`,
    tailwindClasses: {
      container: 'relative w-full max-w-2xl overflow-hidden rounded-lg',
      slide: 'aspect-video bg-muted',
      image: 'h-full w-full object-cover',
      indicators: 'absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2',
      indicatorActive: 'h-2 w-2 rounded-full bg-primary',
      indicatorInactive: 'h-2 w-2 rounded-full bg-background/50 transition-colors hover:bg-background/80',
      navButton: 'rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm transition-colors hover:bg-background',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['role=region', 'aria-label=Carousel', 'aria-roledescription=carousel'],
      keyboardNav: 'Tab to controls, Arrow keys navigate slides, Space/Enter activates',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['max-w-2xl for carousel width'] },
    quality: {
      antiGeneric: ['backdrop-blur-sm for modern nav buttons', 'h-2 w-2 compact indicators'],
      inspirationSource: 'Embla Carousel autoplay',
      craftDetails: ['aspect-video for consistent ratio', 'bg-background/80 semi-transparent controls'],
    },
  },
  {
    id: 'carousel-manual',
    name: 'Manual Carousel',
    category: 'molecule',
    type: 'carousel',
    variant: 'manual',
    tags: ['slider', 'navigation', 'manual', 'media'],
    mood: ['professional', 'calm'],
    industry: ['ecommerce', 'agency', 'media'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="w-full max-w-3xl">
  <div className="overflow-hidden rounded-lg border border-border bg-card">
    <div className="aspect-[4/3] bg-muted p-8">
      <div className="flex h-full items-center justify-center rounded-lg bg-primary/10">
        <span className="text-4xl font-bold text-primary">Slide 1</span>
      </div>
    </div>
    <div className="flex items-center justify-between border-t border-border p-4">
      <button className="rounded-md border border-border bg-card px-4 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50" disabled>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <span className="text-sm text-muted-foreground">1 / 5</span>
      <button className="rounded-md border border-border bg-card px-4 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full max-w-3xl',
      carousel: 'overflow-hidden rounded-lg border border-border bg-card',
      slide: 'aspect-[4/3] bg-muted p-8',
      slideContent: 'flex h-full items-center justify-center rounded-lg bg-primary/10',
      controls: 'flex items-center justify-between border-t border-border p-4',
      navButton:
        'rounded-md border border-border bg-card px-4 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
      counter: 'text-sm text-muted-foreground',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['role=region', 'aria-label=Image carousel'],
      keyboardNav: 'Tab to nav buttons, Enter/Space activates',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['max-w-3xl for carousel'] },
    quality: {
      antiGeneric: ['border-t border-border for control separation', 'disabled:opacity-50 for nav state'],
      inspirationSource: 'Simple gallery controls',
      craftDetails: ['aspect-[4/3] for landscape ratio', 'justify-between for control layout'],
    },
  },
  {
    id: 'carousel-infinite',
    name: 'Infinite Carousel',
    category: 'molecule',
    type: 'carousel',
    variant: 'infinite',
    tags: ['infinite', 'loop', 'energetic', 'slider'],
    mood: ['minimal', 'energetic'],
    industry: ['agency', 'agency', 'agency'],
    visualStyles: ['minimal-editorial', 'minimal-editorial'],
    jsx: `<div className="w-full overflow-hidden bg-muted/30 py-8">
  <div className="flex gap-8 px-4">
    <div className="flex h-24 w-48 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
      <span className="text-lg font-semibold text-muted-foreground">Logo 1</span>
    </div>
    <div className="flex h-24 w-48 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
      <span className="text-lg font-semibold text-muted-foreground">Logo 2</span>
    </div>
    <div className="flex h-24 w-48 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
      <span className="text-lg font-semibold text-muted-foreground">Logo 3</span>
    </div>
    <div className="flex h-24 w-48 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
      <span className="text-lg font-semibold text-muted-foreground">Logo 4</span>
    </div>
    <div className="flex h-24 w-48 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
      <span className="text-lg font-semibold text-muted-foreground">Logo 5</span>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full overflow-hidden bg-muted/30 py-8',
      track: 'flex gap-8 px-4',
      item: 'flex h-24 w-48 shrink-0 items-center justify-center rounded-lg border border-border bg-card',
      content: 'text-lg font-semibold text-muted-foreground',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['role=region', 'aria-label=Partner logos'],
      keyboardNav: 'Non-interactive scrolling element',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-48 fixed item width'] },
    quality: {
      antiGeneric: ['shrink-0 prevents item shrinking', 'overflow-hidden for clean edges'],
      inspirationSource: 'Infinite logo marquee patterns',
      craftDetails: ['gap-8 for item spacing', 'bg-muted/30 for subtle background'],
    },
  },
  {
    id: 'carousel-thumbnails',
    name: 'Thumbnail Carousel',
    category: 'molecule',
    type: 'carousel',
    variant: 'thumbnails',
    tags: ['thumbnails', 'soft-depth', 'media', 'navigation'],
    mood: ['professional', 'professional'],
    industry: ['ecommerce', 'media', 'ecommerce'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="w-full max-w-2xl space-y-4">
  <div className="overflow-hidden rounded-lg border border-border bg-card">
    <div className="aspect-square bg-muted">
      <img src="/product1.jpg" alt="Product view 1" className="h-full w-full object-cover" />
    </div>
  </div>
  <div className="flex gap-2 overflow-x-auto pb-2">
    <button className="shrink-0 overflow-hidden rounded-md border-2 border-primary">
      <div className="h-20 w-20 bg-muted">
        <img src="/product1.jpg" alt="Thumbnail 1" className="h-full w-full object-cover" />
      </div>
    </button>
    <button className="shrink-0 overflow-hidden rounded-md border-2 border-border transition-colors hover:border-accent">
      <div className="h-20 w-20 bg-muted">
        <img src="/product2.jpg" alt="Thumbnail 2" className="h-full w-full object-cover" />
      </div>
    </button>
    <button className="shrink-0 overflow-hidden rounded-md border-2 border-border transition-colors hover:border-accent">
      <div className="h-20 w-20 bg-muted">
        <img src="/product3.jpg" alt="Thumbnail 3" className="h-full w-full object-cover" />
      </div>
    </button>
    <button className="shrink-0 overflow-hidden rounded-md border-2 border-border transition-colors hover:border-accent">
      <div className="h-20 w-20 bg-muted">
        <img src="/product4.jpg" alt="Thumbnail 4" className="h-full w-full object-cover" />
      </div>
    </button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full max-w-2xl space-y-4',
      main: 'overflow-hidden rounded-lg border border-border bg-card',
      mainImage: 'aspect-square bg-muted',
      thumbnails: 'flex gap-2 overflow-x-auto pb-2',
      thumbnailActive: 'shrink-0 overflow-hidden rounded-md border-2 border-primary',
      thumbnailInactive:
        'shrink-0 overflow-hidden rounded-md border-2 border-border transition-colors hover:border-accent',
      thumbnail: 'h-20 w-20 bg-muted',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['role=region', 'aria-label=Product images'],
      keyboardNav: 'Tab to thumbnails, Enter selects, Arrow keys navigate',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['overflow-x-auto for mobile scrolling'] },
    quality: {
      antiGeneric: ['border-2 border-primary for active thumbnail', 'h-20 w-20 square thumbnails'],
      inspirationSource: 'Product image galleries',
      craftDetails: ['aspect-square for main image', 'shrink-0 prevents thumbnail compression'],
    },
  },
  {
    id: 'carousel-vertical',
    name: 'Vertical Carousel',
    category: 'molecule',
    type: 'carousel',
    variant: 'soft-depth',
    tags: ['soft-depth', 'stacked', 'scroll', 'general'],
    mood: ['creative', 'futuristic'],
    industry: ['agency', 'general', 'agency'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="relative h-96 w-full max-w-sm overflow-hidden rounded-lg border border-border bg-card">
  <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
    <div className="shrink-0 rounded-lg border-2 border-primary bg-primary/10 p-6">
      <h3 className="mb-2 text-lg font-semibold text-primary">Feature 1</h3>
      <p className="text-sm text-muted-foreground">Advanced analytics dashboard with real-time insights.</p>
    </div>
    <div className="shrink-0 rounded-lg border border-border bg-muted/30 p-6">
      <h3 className="mb-2 text-lg font-semibold text-card-foreground">Feature 2</h3>
      <p className="text-sm text-muted-foreground">Collaborative workspace for team productivity.</p>
    </div>
    <div className="shrink-0 rounded-lg border border-border bg-muted/30 p-6">
      <h3 className="mb-2 text-lg font-semibold text-card-foreground">Feature 3</h3>
      <p className="text-sm text-muted-foreground">Automated workflows to streamline operations.</p>
    </div>
  </div>
  <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-2">
    <button className="h-2 w-2 rounded-full bg-primary"></button>
    <button className="h-2 w-2 rounded-full bg-muted transition-colors hover:bg-muted-foreground"></button>
    <button className="h-2 w-2 rounded-full bg-muted transition-colors hover:bg-muted-foreground"></button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'relative h-96 w-full max-w-sm overflow-hidden rounded-lg border border-border bg-card',
      track: 'flex h-full flex-col gap-4 overflow-y-auto p-4',
      slideActive: 'shrink-0 rounded-lg border-2 border-primary bg-primary/10 p-6',
      slideInactive: 'shrink-0 rounded-lg border border-border bg-muted/30 p-6',
      slideTitle: 'mb-2 text-lg font-semibold',
      slideDescription: 'text-sm text-muted-foreground',
      indicators: 'absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-2',
      indicatorActive: 'h-2 w-2 rounded-full bg-primary',
      indicatorInactive: 'h-2 w-2 rounded-full bg-muted transition-colors hover:bg-muted-foreground',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['role=region', 'aria-label=Features carousel'],
      keyboardNav: 'Tab to scroll area, arrow keys navigate vertically',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['h-96 for vertical viewport'] },
    quality: {
      antiGeneric: ['flex-col for vertical stacking', 'overflow-y-auto for vertical scroll'],
      inspirationSource: 'Mobile app onboarding flows',
      craftDetails: ['shrink-0 maintains slide size', 'border-2 border-primary for active slide'],
    },
  },
];
