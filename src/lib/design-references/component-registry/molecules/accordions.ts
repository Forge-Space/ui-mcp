import type { IComponentSnippet } from '../types.js';

export const accordionSnippets: IComponentSnippet[] = [
  {
    id: 'accordion-single',
    name: 'Single Accordion',
    category: 'molecule',
    type: 'accordion',
    variant: 'single',
    tags: ['collapsible', 'expandable', 'faq', 'media'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'saas'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="w-full divide-y divide-border rounded-lg border border-border bg-card">
  <div>
    <button className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-card-foreground transition-colors hover:bg-accent/50">
      <span>What is your refund policy?</span>
      <svg className="h-4 w-4 text-muted-foreground transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
    <div className="px-4 pb-3 text-sm text-muted-foreground">
      We offer a 30-day money-back guarantee for all subscriptions. No questions asked.
    </div>
  </div>
  <div>
    <button className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-card-foreground transition-colors hover:bg-accent/50">
      <span>How do I cancel my subscription?</span>
      <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
  </div>
  <div>
    <button className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-card-foreground transition-colors hover:bg-accent/50">
      <span>Do you offer discounts for non-profits?</span>
      <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full divide-y divide-border rounded-lg border border-border bg-card',
      trigger:
        'flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-card-foreground transition-colors hover:bg-accent/50',
      icon: 'h-4 w-4 text-muted-foreground transition-transform',
      content: 'px-4 pb-3 text-sm text-muted-foreground',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-expanded=true', 'aria-controls'],
      keyboardNav: 'Space/Enter toggles, Tab moves between items',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'details/summary' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-full for mobile stacking'] },
    quality: {
      antiGeneric: ['divide-y divide-border for item separation', 'transition-transform on icon for rotation'],
      inspirationSource: 'shadcn/ui Accordion with Radix primitives',
      craftDetails: ['hover:bg-accent/50 for subtle interaction feedback', 'pb-3 content padding without top'],
    },
  },
  {
    id: 'accordion-multiple',
    name: 'Multiple Accordion',
    category: 'molecule',
    type: 'accordion',
    variant: 'multiple',
    tags: ['multi-expand', 'collapsible', 'media', 'faq'],
    mood: ['professional', 'creative'],
    industry: ['saas', 'devtools', 'saas'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="w-full space-y-2">
  <div className="rounded-lg border border-border bg-card">
    <button className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-card-foreground">
      <span>Getting Started</span>
      <svg className="h-4 w-4 rotate-180 text-muted-foreground transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
    <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
      Follow our quick start guide to get up and running in minutes.
    </div>
  </div>
  <div className="rounded-lg border border-border bg-card">
    <button className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-card-foreground">
      <span>API Reference</span>
      <svg className="h-4 w-4 rotate-180 text-muted-foreground transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
    <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
      Complete API documentation with examples and best practices.
    </div>
  </div>
  <div className="rounded-lg border border-border bg-card">
    <button className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-card-foreground">
      <span>Troubleshooting</span>
      <svg className="h-4 w-4 text-muted-foreground transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full space-y-2',
      item: 'rounded-lg border border-border bg-card',
      trigger: 'flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-card-foreground',
      iconExpanded: 'h-4 w-4 rotate-180 text-muted-foreground transition-transform',
      iconCollapsed: 'h-4 w-4 text-muted-foreground transition-transform',
      content: 'border-t border-border px-4 py-3 text-sm text-muted-foreground',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-expanded=true/false', 'aria-controls'],
      keyboardNav: 'Space/Enter toggles individual items independently',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'details' },
    responsive: { strategy: 'mobile-first', breakpoints: ['space-y-2 for visual separation'] },
    quality: {
      antiGeneric: ['space-y-2 gap between independent items', 'rotate-180 for expanded state icon'],
      inspirationSource: 'Radix Accordion with type=multiple',
      craftDetails: ['border-t on content for visual separation', 'transition-transform for smooth icon rotation'],
    },
  },
  {
    id: 'accordion-flush',
    name: 'Flush Accordion',
    category: 'molecule',
    type: 'accordion',
    variant: 'flush',
    tags: ['minimal-editorial', 'borderless', 'minimal-editorial', 'simple'],
    mood: ['minimal', 'minimal'],
    industry: ['general', 'media', 'devtools'],
    visualStyles: ['minimal-editorial', 'minimal-editorial'],
    jsx: `<div className="w-full divide-y divide-border">
  <div>
    <button className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-foreground">
      <span>Installation</span>
      <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
    </button>
  </div>
  <div>
    <button className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-foreground">
      <span>Configuration</span>
      <svg className="h-4 w-4 rotate-45 text-muted-foreground transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
    </button>
    <div className="pb-3 text-sm text-muted-foreground">
      Configure your settings in the config file. All options are documented in the API reference.
    </div>
  </div>
  <div>
    <button className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-foreground">
      <span>Deployment</span>
      <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
    </button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full divide-y divide-border',
      trigger: 'flex w-full items-center justify-between py-3 text-left text-sm font-medium text-foreground',
      iconCollapsed: 'h-4 w-4 text-muted-foreground',
      iconExpanded: 'h-4 w-4 rotate-45 text-muted-foreground transition-transform',
      content: 'pb-3 text-sm text-muted-foreground',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-expanded=true/false'],
      keyboardNav: 'Space/Enter toggles accordion',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'details' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['rotate-45 transforms plus to X', 'divide-y only separator'],
      inspirationSource: 'Flowbite Flush Accordion',
      craftDetails: ['py-3 without horizontal padding for flush effect', 'pb-3 content padding only bottom'],
    },
  },
  {
    id: 'accordion-bordered',
    name: 'Bordered Accordion',
    category: 'molecule',
    type: 'accordion',
    variant: 'bordered',
    tags: ['outlined', 'card', 'professional', 'professional'],
    mood: ['professional', 'professional'],
    industry: ['saas', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="w-full space-y-3">
  <div className="overflow-hidden rounded-lg border border-border">
    <button className="flex w-full items-center justify-between bg-muted px-4 py-3 text-left text-sm font-medium text-foreground">
      <span>Account Settings</span>
      <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
  </div>
  <div className="overflow-hidden rounded-lg border-2 border-primary">
    <button className="flex w-full items-center justify-between bg-primary/10 px-4 py-3 text-left text-sm font-medium text-foreground">
      <span>Security & Privacy</span>
      <svg className="h-5 w-5 rotate-180 text-primary transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
    <div className="border-t border-primary bg-card px-4 py-3 text-sm text-card-foreground">
      Manage your security settings, two-factor authentication, and privacy preferences.
    </div>
  </div>
  <div className="overflow-hidden rounded-lg border border-border">
    <button className="flex w-full items-center justify-between bg-muted px-4 py-3 text-left text-sm font-medium text-foreground">
      <span>Notifications</span>
      <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full space-y-3',
      item: 'overflow-hidden rounded-lg border border-border',
      activeItem: 'overflow-hidden rounded-lg border-2 border-primary',
      trigger:
        'flex w-full items-center justify-between bg-muted px-4 py-3 text-left text-sm font-medium text-foreground',
      activeTrigger:
        'flex w-full items-center justify-between bg-primary/10 px-4 py-3 text-left text-sm font-medium text-foreground',
      content: 'border-t border-primary bg-card px-4 py-3 text-sm text-card-foreground',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-expanded=true/false'],
      keyboardNav: 'Space/Enter toggles, Tab navigates items',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'details' },
    responsive: { strategy: 'mobile-first', breakpoints: ['space-y-3 for card separation'] },
    quality: {
      antiGeneric: ['border-2 border-primary for active state', 'bg-primary/10 for subtle active background'],
      inspirationSource: 'Ant Design Collapse component',
      craftDetails: ['overflow-hidden for rounded border clipping', 'h-5 w-5 larger icon for prominence'],
    },
  },
  {
    id: 'accordion-nested',
    name: 'Nested Accordion',
    category: 'molecule',
    type: 'accordion',
    variant: 'nested',
    tags: ['corporate', 'tree', 'nested', 'corporate-trust'],
    mood: ['professional', 'corporate'],
    industry: ['devtools', 'media', 'saas'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="w-full divide-y divide-border rounded-lg border border-border bg-card">
  <div>
    <button className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-card-foreground">
      <span>Components</span>
      <svg className="h-4 w-4 rotate-180 text-muted-foreground transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
    <div className="border-t border-border bg-muted/30">
      <div className="divide-y divide-border">
        <div>
          <button className="flex w-full items-center justify-between px-6 py-2 text-left text-sm text-muted-foreground hover:text-foreground">
            <span>Atoms</span>
            <svg className="h-3 w-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>
        <div>
          <button className="flex w-full items-center justify-between px-6 py-2 text-left text-sm text-muted-foreground hover:text-foreground">
            <span>Molecules</span>
            <svg className="h-3 w-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>
        <div>
          <button className="flex w-full items-center justify-between px-6 py-2 text-left text-sm text-muted-foreground hover:text-foreground">
            <span>Organisms</span>
            <svg className="h-3 w-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <button className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-card-foreground">
      <span>Templates</span>
      <svg className="h-4 w-4 text-muted-foreground transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full divide-y divide-border rounded-lg border border-border bg-card',
      parentTrigger:
        'flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-card-foreground',
      parentContent: 'border-t border-border bg-muted/30',
      nestedContainer: 'divide-y divide-border',
      childTrigger:
        'flex w-full items-center justify-between px-6 py-2 text-left text-sm text-muted-foreground hover:text-foreground',
      childIcon: 'h-3 w-3 transition-transform',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-expanded=true/false', 'aria-level'],
      keyboardNav: 'Space/Enter toggles, Tab navigates hierarchy',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'details' },
    responsive: { strategy: 'mobile-first', breakpoints: ['px-6 increased indent for nesting'] },
    quality: {
      antiGeneric: ['bg-muted/30 for nested content background', 'px-6 vs px-4 for visual hierarchy'],
      inspirationSource: 'GitHub file tree navigation',
      craftDetails: ['h-3 w-3 smaller nested icons', 'py-2 compact nested items vs py-3 parent'],
    },
  },
];
