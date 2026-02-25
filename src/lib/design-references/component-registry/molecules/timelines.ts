import type { IComponentSnippet } from '../types.js';

export const timelineSnippets: IComponentSnippet[] = [
  {
    id: 'timeline-vertical',
    name: 'Vertical Timeline',
    category: 'molecule',
    type: 'general',
    variant: 'soft-depth',
    tags: ['general', 'soft-depth', 'linear-modern', 'soft-depth'],
    mood: ['professional', 'professional'],
    industry: ['general', 'devtools', 'general'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="space-y-6">
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <div className="h-full w-0.5 flex-1 bg-primary"></div>
    </div>
    <div className="flex-1 pb-8">
      <div className="mb-1 flex items-center gap-2">
        <h3 className="text-sm font-semibold text-foreground">Project Started</h3>
        <span className="text-xs text-muted-foreground">2 hours ago</span>
      </div>
      <p className="text-sm text-muted-foreground">Initial setup and configuration completed successfully.</p>
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
      <div className="mb-1 flex items-center gap-2">
        <h3 className="text-sm font-semibold text-primary">Development Phase</h3>
        <span className="text-xs text-muted-foreground">In progress</span>
      </div>
      <p className="text-sm text-muted-foreground">Building core features and implementing functionality.</p>
    </div>
  </div>
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-background text-xs text-muted-foreground">
        3
      </div>
    </div>
    <div className="flex-1">
      <div className="mb-1 flex items-center gap-2">
        <h3 className="text-sm text-muted-foreground">Testing & Launch</h3>
        <span className="text-xs text-muted-foreground">Upcoming</span>
      </div>
      <p className="text-sm text-muted-foreground">Quality assurance and deployment preparation.</p>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'space-y-6',
      item: 'flex gap-4',
      iconColumn: 'flex flex-col items-center',
      iconComplete:
        'flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground',
      iconActive:
        'flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background text-xs font-medium text-primary',
      iconPending:
        'flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-background text-xs text-muted-foreground',
      connectorComplete: 'h-full w-0.5 flex-1 bg-primary',
      connectorPending: 'h-full w-0.5 flex-1 bg-border',
      content: 'flex-1 pb-8',
      header: 'mb-1 flex items-center gap-2',
    },
    a11y: {
      roles: ['minimal-editorial'],
      ariaAttributes: ['role=list', 'role=listitem'],
      keyboardNav: 'Tab navigates timeline items',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'ol' },
    responsive: { strategy: 'mobile-first', breakpoints: ['gap-4 for icon-content spacing'] },
    quality: {
      antiGeneric: ['w-0.5 thin vertical connector', 'pb-8 for item spacing'],
      inspirationSource: 'GitHub activity timeline',
      craftDetails: ['flex-1 on connector for dynamic height', 'space-y-6 for timeline rhythm'],
    },
  },
  {
    id: 'timeline-horizontal',
    name: 'Horizontal Timeline',
    category: 'molecule',
    type: 'general',
    variant: 'horizontal',
    tags: ['general', 'linear-modern', 'steps', 'horizontal'],
    mood: ['energetic', 'professional'],
    industry: ['general', 'saas', 'saas'],
    visualStyles: ['linear-modern', 'linear-modern'],
    jsx: `<div className="w-full overflow-x-auto pb-4">
  <div className="flex min-w-max items-start gap-4">
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-foreground">Order Placed</p>
        <p className="text-xs text-muted-foreground">Jan 15, 2024</p>
      </div>
    </div>
    <div className="mt-5 h-0.5 w-24 bg-primary"></div>
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-foreground">Processing</p>
        <p className="text-xs text-muted-foreground">Jan 16, 2024</p>
      </div>
    </div>
    <div className="mt-5 h-0.5 w-24 bg-primary"></div>
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-medium text-primary">
        3
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-primary">In Transit</p>
        <p className="text-xs text-muted-foreground">Expected Jan 18</p>
      </div>
    </div>
    <div className="mt-5 h-0.5 w-24 bg-border"></div>
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-background text-sm text-muted-foreground">
        4
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground">Delivered</p>
        <p className="text-xs text-muted-foreground">Pending</p>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full overflow-x-auto pb-4',
      timeline: 'flex min-w-max items-start gap-4',
      step: 'flex flex-col items-center gap-2',
      iconComplete:
        'flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground',
      iconActive:
        'flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-medium text-primary',
      iconPending:
        'flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-background text-sm text-muted-foreground',
      connectorComplete: 'mt-5 h-0.5 w-24 bg-primary',
      connectorPending: 'mt-5 h-0.5 w-24 bg-border',
      label: 'text-center',
    },
    a11y: {
      roles: ['minimal-editorial'],
      ariaAttributes: ['role=list', 'role=listitem', 'aria-current=step'],
      keyboardNav: 'Tab navigates steps, horizontal scroll if needed',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'ol' },
    responsive: { strategy: 'mobile-first', breakpoints: ['overflow-x-auto for mobile scrolling'] },
    quality: {
      antiGeneric: ['h-0.5 thin horizontal connector', 'min-w-max prevents wrapping'],
      inspirationSource: 'Order tracking interfaces',
      craftDetails: ['mt-5 aligns connector with icon center', 'w-24 fixed connector length'],
    },
  },
  {
    id: 'timeline-alternating',
    name: 'Alternating Timeline',
    category: 'molecule',
    type: 'general',
    variant: 'alternating',
    tags: ['general', 'zigzag', 'alternating', 'soft-depth'],
    mood: ['calm', 'professional'],
    industry: ['general', 'agency', 'general'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="relative">
  <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
  <div className="space-y-8">
    <div className="flex items-center gap-8">
      <div className="flex-1 text-right">
        <h3 className="mb-1 text-sm font-semibold text-foreground">Company Founded</h3>
        <p className="text-xs text-muted-foreground">January 2020</p>
        <p className="mt-2 text-sm text-muted-foreground">Started with a vision to revolutionize the industry.</p>
      </div>
      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary text-xs font-medium text-primary-foreground">
        1
      </div>
      <div className="flex-1"></div>
    </div>
    <div className="flex items-center gap-8">
      <div className="flex-1"></div>
      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary text-xs font-medium text-primary-foreground">
        2
      </div>
      <div className="flex-1">
        <h3 className="mb-1 text-sm font-semibold text-foreground">First Product Launch</h3>
        <p className="text-xs text-muted-foreground">June 2020</p>
        <p className="mt-2 text-sm text-muted-foreground">Released our flagship product to market acclaim.</p>
      </div>
    </div>
    <div className="flex items-center gap-8">
      <div className="flex-1 text-right">
        <h3 className="mb-1 text-sm font-semibold text-foreground">Series A Funding</h3>
        <p className="text-xs text-muted-foreground">March 2021</p>
        <p className="mt-2 text-sm text-muted-foreground">Secured $10M to accelerate growth and expansion.</p>
      </div>
      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary text-xs font-medium text-primary-foreground">
        3
      </div>
      <div className="flex-1"></div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'relative',
      centerLine: 'absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border',
      timeline: 'space-y-8',
      itemLeft: 'flex items-center gap-8',
      itemRight: 'flex items-center gap-8',
      contentLeft: 'flex-1 text-right',
      contentRight: 'flex-1',
      icon: 'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary text-xs font-medium text-primary-foreground',
      spacer: 'flex-1',
    },
    a11y: {
      roles: ['minimal-editorial'],
      ariaAttributes: ['role=list', 'role=listitem'],
      keyboardNav: 'Tab navigates timeline items',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'ol' },
    responsive: { strategy: 'mobile-first', breakpoints: ['left-1/2 for center alignment'] },
    quality: {
      antiGeneric: ['border-4 border-background for icon outline effect', 'text-right for left-side content'],
      inspirationSource: 'Historical timeline layouts',
      craftDetails: ['z-10 on icons to overlay center line', 'gap-8 for icon-content spacing'],
    },
  },
  {
    id: 'timeline-icon',
    name: 'Icon Timeline',
    category: 'molecule',
    type: 'general',
    variant: 'icon',
    tags: ['general', 'icon', 'gradient-mesh', 'saas'],
    mood: ['professional', 'creative'],
    industry: ['saas', 'saas', 'media'],
    visualStyles: ['linear-modern', 'linear-modern'],
    jsx: `<div className="space-y-4">
  <div className="flex gap-3">
    <div className="flex flex-col items-center">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
      </div>
      <div className="h-full w-px flex-1 bg-border"></div>
    </div>
    <div className="flex-1 pb-4">
      <p className="mb-1 text-sm text-foreground"><span className="font-semibold">John Doe</span> created a new task</p>
      <p className="text-xs text-muted-foreground">2 minutes ago</p>
    </div>
  </div>
  <div className="flex gap-3">
    <div className="flex flex-col items-center">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
      </div>
      <div className="h-full w-px flex-1 bg-border"></div>
    </div>
    <div className="flex-1 pb-4">
      <p className="mb-1 text-sm text-foreground"><span className="font-semibold">Sarah Smith</span> commented on your post</p>
      <p className="text-xs text-muted-foreground">1 hour ago</p>
    </div>
  </div>
  <div className="flex gap-3">
    <div className="flex flex-col items-center">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
    </div>
    <div className="flex-1">
      <p className="mb-1 text-sm text-foreground"><span className="font-semibold">Mike Johnson</span> completed the project</p>
      <p className="text-xs text-muted-foreground">Yesterday</p>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'space-y-4',
      item: 'flex gap-3',
      iconColumn: 'flex flex-col items-center',
      icon: 'flex h-8 w-8 items-center justify-center rounded-full bg-primary/10',
      connector: 'h-full w-px flex-1 bg-border',
      content: 'flex-1 pb-4',
      text: 'mb-1 text-sm text-foreground',
      name: 'font-semibold',
      timestamp: 'text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['media'],
      ariaAttributes: ['role=feed', 'aria-label=Activity feed'],
      keyboardNav: 'Tab navigates feed items',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'ul' },
    responsive: { strategy: 'mobile-first', breakpoints: ['gap-3 for icon-content spacing'] },
    quality: {
      antiGeneric: ['bg-primary/10 for icon background', 'w-px thin connector line'],
      inspirationSource: 'Activity feed patterns',
      craftDetails: ['h-4 w-4 consistent icon sizing', 'space-y-4 for feed rhythm'],
    },
  },
];
