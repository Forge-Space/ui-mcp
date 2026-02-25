import type { IComponentSnippet } from '../types.js';

export const tabSnippets: IComponentSnippet[] = [
  {
    id: 'tab-underline',
    name: 'Underline Tabs',
    category: 'molecule',
    type: 'tab',
    variant: 'underline',
    tags: ['navigation', 'switcher', 'minimal-editorial', 'minimal-editorial'],
    mood: ['minimal', 'professional'],
    industry: ['general', 'saas', 'saas'],
    visualStyles: ['linear-modern', 'minimal-editorial'],
    jsx: `<div className="w-full border-b border-border">
  <div className="flex gap-6">
    <button className="border-b-2 border-primary px-1 pb-3 text-sm font-medium text-primary">
      Overview
    </button>
    <button className="border-b-2 border-transparent px-1 pb-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
      Analytics
    </button>
    <button className="border-b-2 border-transparent px-1 pb-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
      Settings
    </button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full border-b border-border',
      list: 'flex gap-6',
      active: 'border-b-2 border-primary px-1 pb-3 text-sm font-medium text-primary',
      inactive:
        'border-b-2 border-transparent px-1 pb-3 text-sm text-muted-foreground transition-colors hover:text-foreground',
    },
    a11y: {
      roles: ['tablist', 'tab'],
      ariaAttributes: ['role=tablist', 'role=tab', 'aria-selected=true'],
      keyboardNav: 'Arrow keys navigate tabs, Tab moves to panel',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav' },
    responsive: { strategy: 'mobile-first', breakpoints: ['gap-6 for comfortable tap targets'] },
    quality: {
      antiGeneric: ['border-b-2 border-primary for active indicator', 'pb-3 aligns text with border'],
      inspirationSource: 'GitHub repository navigation tabs',
      craftDetails: ['border-transparent for consistent layout', 'font-medium for active state emphasis'],
    },
  },
  {
    id: 'tab-pills',
    name: 'Pill Tabs',
    category: 'molecule',
    type: 'tab',
    variant: 'pills',
    tags: ['soft-depth', 'filled', 'futuristic', 'switcher'],
    mood: ['futuristic', 'warm'],
    industry: ['saas', 'ecommerce', 'media'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="inline-flex gap-1 rounded-lg bg-muted p-1">
  <button className="rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm">
    Day
  </button>
  <button className="rounded-md px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-background/50 hover:text-foreground">
    Week
  </button>
  <button className="rounded-md px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-background/50 hover:text-foreground">
    Month
  </button>
</div>`,
    tailwindClasses: {
      container: 'inline-flex gap-1 rounded-lg bg-muted p-1',
      active: 'rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm',
      inactive:
        'rounded-md px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-background/50 hover:text-foreground',
    },
    a11y: {
      roles: ['tablist', 'tab'],
      ariaAttributes: ['role=tablist', 'role=tab', 'aria-selected=true'],
      keyboardNav: 'Arrow keys navigate tabs',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav' },
    responsive: { strategy: 'mobile-first', breakpoints: ['inline-flex for compact layout'] },
    quality: {
      antiGeneric: ['shadow-sm for active tab elevation', 'bg-background/50 for subtle hover'],
      inspirationSource: 'iOS segmented control / shadcn Tabs',
      craftDetails: ['gap-1 tight spacing within muted container', 'rounded-lg outer with rounded-md inner'],
    },
  },
  {
    id: 'tab-vertical',
    name: 'Vertical Tabs',
    category: 'molecule',
    type: 'tab',
    variant: 'soft-depth',
    tags: ['sidebar', 'navigation', 'stacked', 'settings'],
    mood: ['professional', 'professional'],
    industry: ['saas', 'media', 'saas'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="flex gap-4">
  <div className="flex flex-col gap-1 border-r border-border pr-4">
    <button className="rounded-md bg-accent px-3 py-2 text-left text-sm font-medium text-accent-foreground">
      Profile
    </button>
    <button className="rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground">
      Account
    </button>
    <button className="rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground">
      Notifications
    </button>
    <button className="rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground">
      Billing
    </button>
  </div>
  <div className="flex-1 text-sm text-card-foreground">
    Tab content goes here
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex gap-4',
      sidebar: 'flex flex-col gap-1 border-r border-border pr-4',
      active: 'rounded-md bg-accent px-3 py-2 text-left text-sm font-medium text-accent-foreground',
      inactive:
        'rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground',
      content: 'flex-1 text-sm text-card-foreground',
    },
    a11y: {
      roles: ['tablist', 'tab', 'tabpanel'],
      ariaAttributes: ['role=tablist', 'role=tab', 'role=tabpanel', 'aria-orientation=vertical'],
      keyboardNav: 'Up/Down arrows navigate tabs, Tab moves to panel',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav' },
    responsive: {
      strategy: 'mobile-first',
      breakpoints: ['flex for sidebar layout', 'border-r for visual separation'],
    },
    quality: {
      antiGeneric: ['aria-orientation=vertical for screen readers', 'border-r border-border for section division'],
      inspirationSource: 'Stripe Dashboard settings navigation',
      craftDetails: ['text-left for sidebar alignment', 'hover:bg-accent/50 for subtle feedback'],
    },
  },
  {
    id: 'tab-icon',
    name: 'Icon Tabs',
    category: 'molecule',
    type: 'tab',
    variant: 'icon',
    tags: ['gradient-mesh', 'icon', 'minimal-editorial', 'navigation'],
    mood: ['futuristic', 'professional'],
    industry: ['saas', 'media', 'saas'],
    visualStyles: ['linear-modern', 'linear-modern'],
    jsx: `<div className="inline-flex gap-2 rounded-lg border border-border bg-card p-1">
  <button className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    <span>Home</span>
  </button>
  <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    <span>Stats</span>
  </button>
  <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    <span>Settings</span>
  </button>
</div>`,
    tailwindClasses: {
      container: 'inline-flex gap-2 rounded-lg border border-border bg-card p-1',
      active: 'flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground',
      inactive:
        'flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
    },
    a11y: {
      roles: ['tablist', 'tab'],
      ariaAttributes: ['role=tablist', 'role=tab', 'aria-selected=true', 'aria-label'],
      keyboardNav: 'Arrow keys navigate tabs',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav' },
    responsive: { strategy: 'mobile-first', breakpoints: ['gap-2 for icon-text spacing'] },
    quality: {
      antiGeneric: ['gap-2 between icon and label', 'h-4 w-4 consistent icon sizing'],
      inspirationSource: 'Vercel Dashboard navigation tabs',
      craftDetails: ['flex items-center for vertical alignment', 'border-border outer container'],
    },
  },
  {
    id: 'tab-closeable',
    name: 'Closeable Tabs',
    category: 'molecule',
    type: 'tab',
    variant: 'closeable',
    tags: ['energetic', 'dismissible', 'document', 'editor'],
    mood: ['professional', 'energetic'],
    industry: ['devtools', 'saas', 'media'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="flex gap-1 border-b border-border">
  <button className="group flex items-center gap-2 border-b-2 border-primary bg-accent/50 px-3 py-2 text-sm font-medium text-accent-foreground">
    <span>index.tsx</span>
    <svg className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
  </button>
  <button className="group flex items-center gap-2 border-b-2 border-transparent px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/30 hover:text-foreground">
    <span>App.tsx</span>
    <svg className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
  </button>
  <button className="group flex items-center gap-2 border-b-2 border-transparent px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/30 hover:text-foreground">
    <span>utils.ts</span>
    <svg className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
  </button>
</div>`,
    tailwindClasses: {
      container: 'flex gap-1 border-b border-border',
      active:
        'group flex items-center gap-2 border-b-2 border-primary bg-accent/50 px-3 py-2 text-sm font-medium text-accent-foreground',
      inactive:
        'group flex items-center gap-2 border-b-2 border-transparent px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/30 hover:text-foreground',
      closeIcon: 'h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100',
    },
    a11y: {
      roles: ['tablist', 'tab'],
      ariaAttributes: ['role=tablist', 'role=tab', 'aria-label=Close tab'],
      keyboardNav: 'Arrow keys navigate tabs, Delete/Backspace closes focused tab',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav' },
    responsive: { strategy: 'mobile-first', breakpoints: ['gap-1 compact spacing'] },
    quality: {
      antiGeneric: ['group-hover:opacity-100 for progressive disclosure', 'h-3 w-3 compact close icon'],
      inspirationSource: 'VS Code editor tabs',
      craftDetails: ['opacity-0 hides close icon until hover', 'bg-accent/30 subtle hover state'],
    },
  },
  {
    id: 'tab-animated',
    name: 'Animated Tabs',
    category: 'molecule',
    type: 'tab',
    variant: 'energetic',
    tags: ['motion', 'smooth', 'futuristic', 'premium'],
    mood: ['premium', 'futuristic'],
    industry: ['saas', 'agency', 'agency'],
    visualStyles: ['linear-modern', 'soft-depth'],
    jsx: `<div className="relative">
  <div className="flex gap-4 border-b border-border">
    <button className="relative px-3 py-2 text-sm font-medium text-primary">
      Features
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"></div>
    </button>
    <button className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
      Pricing
    </button>
    <button className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
      Documentation
    </button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'relative',
      list: 'flex gap-4 border-b border-border',
      active: 'relative px-3 py-2 text-sm font-medium text-primary',
      indicator: 'absolute bottom-0 left-0 h-0.5 w-full bg-primary',
      inactive: 'px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground',
    },
    a11y: {
      roles: ['tablist', 'tab'],
      ariaAttributes: ['role=tablist', 'role=tab', 'aria-selected=true'],
      keyboardNav: 'Arrow keys navigate tabs, smooth indicator transition',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav' },
    responsive: { strategy: 'mobile-first', breakpoints: ['gap-4 for spacing'] },
    quality: {
      antiGeneric: ['h-0.5 thin indicator line', 'absolute positioning for animated underline'],
      inspirationSource: 'Framer Motion tabs animation',
      craftDetails: ['bottom-0 left-0 positioning for indicator', 'transition-colors for smooth text state'],
    },
  },
];
