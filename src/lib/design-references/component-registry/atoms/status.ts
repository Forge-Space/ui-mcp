import type { IComponentSnippet } from '../types.js';

export const statusSnippets: IComponentSnippet[] = [
  {
    id: 'status-dot',
    name: 'Status Dot',
    category: 'atom',
    type: 'status',
    variant: 'dot',
    tags: ['indicator', 'status', 'presence', 'state'],
    mood: ['minimal', 'professional'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'minimal-editorial'],
    jsx: `<span className="inline-flex items-center gap-2">
  <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
  <span className="text-sm text-foreground">In Progress</span>
</span>`,
    tailwindClasses: {
      wrapper: 'inline-flex items-center gap-2',
      dot: 'h-2 w-2 rounded-full bg-success',
      label: 'text-sm text-foreground',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-hidden'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'dot + label — never color-only',
        'aria-hidden on dot since label conveys meaning',
        'h-2 w-2 (8px) for subtle indicator',
      ],
      inspirationSource: 'Linear issue status',
      craftDetails: [
        'gap-2 for comfortable spacing',
        'bg-success for semantic success/active state',
        'text-sm matches typical UI hierarchy',
      ],
    },
  },
  {
    id: 'status-pill',
    name: 'Status Pill',
    category: 'atom',
    type: 'status',
    variant: 'pill',
    tags: ['badge', 'label', 'status', 'indicator'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success ring-1 ring-inset ring-success/20 dark:bg-success/10 dark:text-success dark:ring-success/20">
  <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
  Open
</span>`,
    tailwindClasses: {
      pill: 'inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success ring-1 ring-inset ring-success/20 dark:bg-success/10 dark:text-success dark:ring-success/20',
      dot: 'h-1.5 w-1.5 rounded-full bg-success',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-hidden'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'rounded-full for pill shape',
        'ring-inset for subtle border',
        'dot + text — never color-only',
        'dark mode variants included',
      ],
      inspirationSource: 'GitHub PR labels',
      craftDetails: [
        'success/10 bg with text-success for sufficient contrast',
        'ring-1 ring-inset creates contained border',
        'gap-1.5 for comfortable dot spacing',
      ],
    },
  },
  {
    id: 'status-notification-count',
    name: 'Notification Count',
    category: 'atom',
    type: 'status',
    variant: 'notification-count',
    tags: ['badge', 'count', 'notification', 'unread'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-destructive px-1.5 text-xs font-semibold text-destructive-foreground" aria-label="3 unread notifications">
  3
</span>`,
    tailwindClasses: {
      badge:
        'inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-destructive px-1.5 text-xs font-semibold text-destructive-foreground',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'min-w-[20px] ensures single digits center properly',
        'aria-label with full context (not just number)',
        'font-semibold for readability at small size',
      ],
      inspirationSource: 'Slack notification badges',
      craftDetails: [
        'h-5 min-w-[20px] creates circular badge for 1-digit, pill for 2+',
        'px-1.5 provides horizontal padding for multi-digit counts',
        'bg-destructive is universally recognized notification color',
      ],
    },
  },
  {
    id: 'status-online-offline',
    name: 'Online/Offline Status',
    category: 'atom',
    type: 'status',
    variant: 'online-offline',
    tags: ['presence', 'user', 'availability', 'indicator'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'devtools', 'general'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<span className="inline-flex items-center gap-2">
  <span className="relative flex h-2.5 w-2.5">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/75 opacity-75" />
    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
  </span>
  <span className="text-sm text-foreground">Online</span>
</span>`,
    tailwindClasses: {
      wrapper: 'inline-flex items-center gap-2',
      dotWrapper: 'relative flex h-2.5 w-2.5',
      ping: 'absolute inline-flex h-full w-full animate-ping rounded-full bg-success/75 opacity-75',
      dot: 'relative inline-flex h-2.5 w-2.5 rounded-full bg-success',
      label: 'text-sm text-foreground',
    },
    animations: ['animate-ping'],
    a11y: {
      roles: ['status'],
      ariaAttributes: [],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'animate-ping for attention-drawing pulse',
        'layered dots (ping + solid) for depth',
        'text label accompanies visual indicator',
      ],
      inspirationSource: 'Discord user status',
      craftDetails: [
        'ping uses success/75, solid uses success for depth',
        'opacity-75 on ping prevents overwhelming animation',
        'motion-reduce: animate-ping → animate-none',
      ],
    },
  },
];
