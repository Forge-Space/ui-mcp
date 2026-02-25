import type { IComponentSnippet } from '../types.js';

export const listSnippets: IComponentSnippet[] = [
  {
    id: 'list-checkbox',
    name: 'Checkbox List',
    category: 'molecule',
    type: 'minimal-editorial',
    variant: 'checkbox',
    tags: ['minimal-editorial', 'checkbox', 'task', 'todo'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'saas', 'general'],
    visualStyles: ['linear-modern', 'minimal-editorial', 'soft-depth'],
    jsx: `<div className="w-full space-y-2">
  <label className="flex items-start gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent cursor-pointer group">
    <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" />
    <div className="flex flex-1 flex-col gap-1">
      <span className="text-sm font-medium text-foreground group-has-[:checked]:line-through group-has-[:checked]:text-muted-foreground transition-all">Complete project documentation</span>
      <span className="text-xs text-muted-foreground">Due today at 5:00 PM</span>
    </div>
    <span className="inline-flex items-center rounded-full bg-destructive/10 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-400 ring-1 ring-inset ring-red-500/20">High</span>
  </label>
  <label className="flex items-start gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent cursor-pointer group">
    <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" checked />
    <div className="flex flex-1 flex-col gap-1">
      <span className="text-sm font-medium text-foreground group-has-[:checked]:line-through group-has-[:checked]:text-muted-foreground transition-all">Review pull requests</span>
      <span className="text-xs text-muted-foreground">Completed 2 hours ago</span>
    </div>
    <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">Medium</span>
  </label>
  <label className="flex items-start gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent cursor-pointer group">
    <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" />
    <div className="flex flex-1 flex-col gap-1">
      <span className="text-sm font-medium text-foreground group-has-[:checked]:line-through group-has-[:checked]:text-muted-foreground transition-all">Update dependencies</span>
      <span className="text-xs text-muted-foreground">Due tomorrow</span>
    </div>
    <span className="inline-flex items-center rounded-full bg-zinc-500/10 px-2 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-400 ring-1 ring-inset ring-zinc-500/20">Low</span>
  </label>
</div>`,
    tailwindClasses: {
      container: 'w-full space-y-2',
      item: 'flex items-start gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent cursor-pointer group',
      checkbox:
        'mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
      label:
        'text-sm font-medium text-foreground group-has-[:checked]:line-through group-has-[:checked]:text-muted-foreground transition-all',
      meta: 'text-xs text-muted-foreground',
      badge:
        'inline-flex items-center rounded-full bg-destructive/10 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-400 ring-1 ring-inset ring-red-500/20',
    },
    a11y: {
      roles: [],
      ariaAttributes: ['checked state'],
      keyboardNav: 'Tab through items, Space to toggle checkbox',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'group-has-[:checked]:line-through for checked state',
        'label wrapper for full-row click area',
        'priority badges with contextual colors',
        'mt-0.5 on checkbox for vertical alignment with text',
      ],
      inspirationSource: 'Todoist task list',
      craftDetails: [
        'cursor-pointer on label for UX clarity',
        'hover:bg-accent for interactive feedback',
        'transition-all on label for smooth strikethrough',
      ],
    },
  },
  {
    id: 'list-radio-group',
    name: 'Radio Option List',
    category: 'molecule',
    type: 'minimal-editorial',
    variant: 'radio-group',
    tags: ['minimal-editorial', 'radio', 'select', 'option'],
    mood: ['professional', 'minimal'],
    industry: ['ecommerce', 'saas', 'fintech'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<div className="w-full space-y-2" role="radiogroup" aria-labelledby="payment-method-label">
  <label id="payment-method-label" className="text-sm font-medium text-foreground">Payment Method</label>
  <label className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-all hover:bg-accent cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
    <input type="radio" name="payment" className="h-4 w-4 border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" checked />
    <div className="flex flex-1 items-center gap-3">
      <div className="flex h-10 w-16 items-center justify-center rounded border bg-background">
        <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none" aria-hidden="true"><rect width="48" height="32" rx="4" fill="#1434CB"/><path d="M17.5 11.5h13v9h-13z" fill="#FF5F00"/><path d="M18.3 16c0-1.9.9-3.6 2.2-4.7-1-0.8-2.3-1.3-3.7-1.3-3.3 0-6 2.7-6 6s2.7 6 6 6c1.4 0 2.7-0.5 3.7-1.3-1.3-1.1-2.2-2.8-2.2-4.7z" fill="#EB001B"/><path d="M30.3 16c0 3.3-2.7 6-6 6-1.4 0-2.7-0.5-3.7-1.3 1.3-1.1 2.2-2.8 2.2-4.7s-0.9-3.6-2.2-4.7c1-0.8 2.3-1.3 3.7-1.3 3.3 0 6 2.7 6 6z" fill="#F79E1B"/></svg>
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground">Credit Card</span>
        <span className="text-xs text-muted-foreground">Visa, Mastercard, Amex</span>
      </div>
    </div>
    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">Popular</span>
  </label>
  <label className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-all hover:bg-accent cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
    <input type="radio" name="payment" className="h-4 w-4 border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" />
    <div className="flex flex-1 items-center gap-3">
      <div className="flex h-10 w-16 items-center justify-center rounded border bg-background">
        <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none" aria-hidden="true"><rect width="48" height="32" rx="4" fill="#00457C"/><path d="M20 16c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z" fill="#0079C1"/><path d="M36 16c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z" fill="#009CDE"/></svg>
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground">PayPal</span>
        <span className="text-xs text-muted-foreground">Fast & secure checkout</span>
      </div>
    </div>
  </label>
  <label className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-all hover:bg-accent cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
    <input type="radio" name="payment" className="h-4 w-4 border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" />
    <div className="flex flex-1 items-center gap-3">
      <div className="flex h-10 w-16 items-center justify-center rounded border bg-background">
        <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none" aria-hidden="true"><rect width="48" height="32" rx="4" fill="#635BFF"/><path d="M16 14.5c0-.8.5-1 1.3-1h2.2c1.8 0 3.2.7 3.7 2.5.1.3.1.5.1.8 0 2-1.3 3.2-3.5 3.2h-2.5c-.8 0-1.3-.3-1.3-1v-4.5zm2 6.5h2.5c2.8 0 5.5-1.7 5.5-5.2 0-3.2-2.5-5.3-6-5.3h-4c-1.3 0-2 .7-2 2v11c0 1.3.7 2 2 2h2v-4.5z" fill="white"/></svg>
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground">Bank Transfer</span>
        <span className="text-xs text-muted-foreground">2-3 business days</span>
      </div>
    </div>
  </label>
</div>`,
    tailwindClasses: {
      container: 'w-full space-y-2',
      label:
        'flex items-center gap-4 rounded-lg border bg-card p-4 transition-all hover:bg-accent cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5',
      radio:
        'h-4 w-4 border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
      iconWrapper: 'flex h-10 w-16 items-center justify-center rounded border bg-background',
      title: 'text-sm font-medium text-foreground',
      description: 'text-xs text-muted-foreground',
      badge:
        'inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20',
    },
    a11y: {
      roles: ['radiogroup'],
      ariaAttributes: ['aria-labelledby', 'checked state on radio'],
      keyboardNav: 'Arrow keys to select, Space to choose',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'has-[:checked]:border-primary for selected state',
        'payment brand icons for visual recognition',
        'label wrapper for full-row selection',
        'has-[:checked]:bg-primary/5 for subtle highlight',
      ],
      inspirationSource: 'Stripe payment method selector',
      craftDetails: [
        'w-16 fixed icon width for alignment',
        'transition-all for smooth state changes',
        'gap-3 for visual breathing room',
      ],
    },
  },
  {
    id: 'list-stacked',
    name: 'Stacked List',
    category: 'molecule',
    type: 'minimal-editorial',
    variant: 'stacked',
    tags: ['minimal-editorial', 'items', 'saas', 'media'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'general', 'saas'],
    visualStyles: ['linear-modern', 'soft-depth', 'minimal-editorial'],
    jsx: `<ul className="w-full divide-y divide-border rounded-xl border bg-card" role="list">
  <li className="flex items-start gap-3 p-4 transition-colors hover:bg-muted/50">
    <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" aria-hidden="true"></div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-foreground">New comment on your issue</p>
      <p className="mt-1 text-sm text-muted-foreground">@johndoe mentioned you in "Fix navigation bug"</p>
      <p className="mt-1 text-xs text-muted-foreground">2 minutes ago</p>
    </div>
    <button type="button" className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Mark as read">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
    </button>
  </li>
  <li className="flex items-start gap-3 p-4 transition-colors hover:bg-muted/50">
    <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" aria-hidden="true"></div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-foreground">Pull request merged</p>
      <p className="mt-1 text-sm text-muted-foreground">Your PR "Add dark mode" was merged into main</p>
      <p className="mt-1 text-xs text-muted-foreground">1 hour ago</p>
    </div>
    <button type="button" className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Mark as read">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
    </button>
  </li>
  <li className="flex items-start gap-3 p-4 transition-colors hover:bg-muted/50 opacity-60">
    <div className="h-2 w-2 mt-2 rounded-full bg-muted-foreground shrink-0" aria-hidden="true"></div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-foreground">Deploy succeeded</p>
      <p className="mt-1 text-sm text-muted-foreground">Production deployment completed successfully</p>
      <p className="mt-1 text-xs text-muted-foreground">3 hours ago</p>
    </div>
    <button type="button" className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Mark as read">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
    </button>
  </li>
</ul>`,
    tailwindClasses: {
      list: 'w-full divide-y divide-border rounded-xl border bg-card',
      item: 'flex items-start gap-3 p-4 transition-colors hover:bg-muted/50',
      unreadDot: 'h-2 w-2 mt-2 rounded-full bg-primary shrink-0',
      readDot: 'h-2 w-2 mt-2 rounded-full bg-muted-foreground shrink-0',
      content: 'flex-1 min-w-0',
      title: 'text-sm font-medium text-foreground',
      description: 'mt-1 text-sm text-muted-foreground',
      timestamp: 'mt-1 text-xs text-muted-foreground',
      dismissButton:
        'shrink-0 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    },
    a11y: {
      roles: ['minimal-editorial', 'listitem'],
      ariaAttributes: ['aria-label on dismiss buttons'],
      keyboardNav: 'Tab through dismiss buttons',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'ul' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'unread indicator with colored dot',
        'opacity-60 on read items',
        'divide-y for item separation',
        'min-w-0 for text truncation',
      ],
      inspirationSource: 'GitHub notifications list',
      craftDetails: [
        'mt-2 on dot for alignment with first line',
        'shrink-0 on dot and button to prevent squishing',
        'rounded-xl border wrapper for card style',
      ],
    },
  },
  {
    id: 'list-timeline',
    name: 'Timeline List',
    category: 'molecule',
    type: 'minimal-editorial',
    variant: 'general',
    tags: ['minimal-editorial', 'general', 'saas', 'soft-depth'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'saas', 'devtools'],
    visualStyles: ['linear-modern', 'minimal-editorial', 'soft-depth'],
    jsx: `<ol className="relative border-l border-border pl-6 space-y-6" role="list">
  <li className="relative">
    <div className="absolute -left-[1.625rem] flex h-6 w-6 items-center justify-center rounded-full border-4 border-background bg-primary">
      <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
    </div>
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-foreground">Issue closed</span>
        <span className="inline-flex items-center rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-purple-700 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">Completed</span>
      </div>
      <p className="text-sm text-muted-foreground">The bug has been fixed and deployed to production</p>
      <time className="text-xs text-muted-foreground" dateTime="2025-01-24T14:30">Jan 24, 2025 at 2:30 PM</time>
    </div>
  </li>
  <li className="relative">
    <div className="absolute -left-[1.625rem] flex h-6 w-6 items-center justify-center rounded-full border-4 border-background bg-accent">
      <svg className="h-3 w-3 text-accent-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" /></svg>
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-foreground">Comment added</span>
      <p className="text-sm text-muted-foreground">@janedoe: "Looks good to merge!"</p>
      <time className="text-xs text-muted-foreground" dateTime="2025-01-24T11:15">Jan 24, 2025 at 11:15 AM</time>
    </div>
  </li>
  <li className="relative">
    <div className="absolute -left-[1.625rem] flex h-6 w-6 items-center justify-center rounded-full border-4 border-background bg-accent">
      <svg className="h-3 w-3 text-accent-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" /></svg>
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-foreground">Label added</span>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">bug</span>
        <span className="inline-flex items-center rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground ring-1 ring-inset ring-accent/20">priority-high</span>
      </div>
      <time className="text-xs text-muted-foreground" dateTime="2025-01-23T16:45">Jan 23, 2025 at 4:45 PM</time>
    </div>
  </li>
  <li className="relative">
    <div className="absolute -left-[1.625rem] flex h-6 w-6 items-center justify-center rounded-full border-4 border-background bg-accent">
      <svg className="h-3 w-3 text-accent-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-foreground">Issue opened</span>
      <p className="text-sm text-muted-foreground">Navigation menu not working on mobile devices</p>
      <time className="text-xs text-muted-foreground" dateTime="2025-01-23T09:00">Jan 23, 2025 at 9:00 AM</time>
    </div>
  </li>
</ol>`,
    tailwindClasses: {
      timeline: 'relative border-l border-border pl-6 space-y-6',
      item: 'relative',
      iconWrapper:
        'absolute -left-[1.625rem] flex h-6 w-6 items-center justify-center rounded-full border-4 border-background',
      iconWrapperActive: 'bg-primary',
      iconWrapperDefault: 'bg-accent',
      content: 'flex flex-col gap-1',
      title: 'text-sm font-semibold text-foreground',
      description: 'text-sm text-muted-foreground',
      timestamp: 'text-xs text-muted-foreground',
      badge:
        'inline-flex items-center rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-purple-700 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20',
    },
    a11y: {
      roles: ['minimal-editorial', 'listitem'],
      ariaAttributes: ['dateTime on time elements'],
      keyboardNav: 'N/A — informational',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'ol' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'border-4 border-background for icon separation from line',
        'contextual icons for event types',
        'bg-primary for completed/final event',
        'time element with dateTime attribute',
      ],
      inspirationSource: 'Linear activity timeline',
      craftDetails: [
        '-left-[1.625rem] precise icon positioning',
        'pl-6 content offset from timeline',
        'ordered list for chronological semantics',
      ],
    },
  },
  {
    id: 'list-tree',
    name: 'Tree View List',
    category: 'molecule',
    type: 'minimal-editorial',
    variant: 'tree',
    tags: ['minimal-editorial', 'tree', 'folder', 'hierarchy'],
    mood: ['professional', 'minimal'],
    industry: ['devtools', 'saas', 'general'],
    visualStyles: ['linear-modern', 'minimal-editorial', 'dark-premium'],
    jsx: `<ul className="w-full space-y-0.5" role="tree">
  <li role="none">
    <div className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors group">
      <button type="button" className="h-4 w-4 shrink-0 rounded hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Expand folder" aria-expanded="true">
        <svg className="h-3.5 w-3.5 transition-transform rotate-90" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
      </button>
      <svg className="h-4 w-4 shrink-0 text-primary dark:text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" /></svg>
      <span className="flex-1 font-medium text-foreground truncate">src</span>
    </div>
    <ul className="ml-4 space-y-0.5 border-l border-border pl-2" role="group">
      <li role="none">
        <div className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors group">
          <button type="button" className="h-4 w-4 shrink-0 rounded hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Expand folder" aria-expanded="true">
            <svg className="h-3.5 w-3.5 transition-transform rotate-90" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          </button>
          <svg className="h-4 w-4 shrink-0 text-primary dark:text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" /></svg>
          <span className="flex-1 font-medium text-foreground truncate">components</span>
        </div>
        <ul className="ml-4 space-y-0.5 border-l border-border pl-2" role="group">
          <li role="treeitem" className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors cursor-pointer">
            <span className="h-4 w-4 shrink-0"></span>
            <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
            <span className="flex-1 text-foreground truncate">Button.tsx</span>
          </li>
          <li role="treeitem" className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors cursor-pointer bg-accent">
            <span className="h-4 w-4 shrink-0"></span>
            <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
            <span className="flex-1 text-foreground truncate">Input.tsx</span>
          </li>
        </ul>
      </li>
      <li role="treeitem" className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors cursor-pointer">
        <span className="h-4 w-4 shrink-0"></span>
        <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
        <span className="flex-1 text-foreground truncate">index.ts</span>
      </li>
    </ul>
  </li>
  <li role="treeitem" className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors cursor-pointer">
    <span className="h-4 w-4 shrink-0"></span>
    <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
    <span className="flex-1 text-foreground truncate">README.md</span>
  </li>
</ul>`,
    tailwindClasses: {
      tree: 'w-full space-y-0.5',
      branch: 'ml-4 space-y-0.5 border-l border-border pl-2',
      item: 'flex items-center gap-1 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors',
      expandButton:
        'h-4 w-4 shrink-0 rounded hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      chevron: 'h-3.5 w-3.5 transition-transform rotate-90',
      folderIcon: 'h-4 w-4 shrink-0 text-primary dark:text-blue-400',
      fileIcon: 'h-4 w-4 shrink-0 text-muted-foreground',
      label: 'flex-1 text-foreground truncate',
      selected: 'bg-accent',
    },
    a11y: {
      roles: ['tree', 'treeitem', 'group'],
      ariaAttributes: ['aria-expanded on folders', 'aria-label on expand buttons', 'role="none" on wrapper li'],
      keyboardNav: 'Arrow keys to navigate, Enter to select, Space to expand/collapse',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'ul' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'role="tree" for semantic tree structure',
        'border-l on nested lists for visual hierarchy',
        'rotate-90 on chevron for expanded state',
        'blue folder icons for differentiation',
      ],
      inspirationSource: 'VS Code file explorer',
      craftDetails: [
        'ml-4 pl-2 for nested indentation',
        'space-y-0.5 tight vertical spacing',
        'h-4 w-4 empty span for alignment on leaf nodes',
      ],
    },
  },
];
