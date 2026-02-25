import type { IComponentSnippet } from '../types.js';

export const avatarSnippets: IComponentSnippet[] = [
  {
    id: 'avatar-single',
    name: 'Single Avatar',
    category: 'atom',
    type: 'avatar',
    variant: 'single',
    tags: ['user', 'profile', 'image', 'identity'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'minimal-editorial'],
    jsx: `<span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted ring-2 ring-background">
  <img src="/avatars/01.jpg" alt="User Name" className="h-full w-full object-cover" />
</span>`,
    tailwindClasses: {
      avatar:
        'inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted ring-2 ring-background',
      image: 'h-full w-full object-cover',
    },
    a11y: {
      roles: ['img'],
      ariaAttributes: ['alt'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'ring-2 ring-background for layered separation',
        'bg-muted fallback for loading state',
        'object-cover prevents aspect ratio distortion',
      ],
      inspirationSource: 'GitHub profile avatars',
      craftDetails: [
        'overflow-hidden clips image to circle',
        'ring-background creates gap effect on colored backgrounds',
        '40px (h-10 w-10) follows WCAG touch target guidelines',
      ],
    },
  },
  {
    id: 'avatar-group-stack',
    name: 'Avatar Group Stack',
    category: 'atom',
    type: 'avatar',
    variant: 'group-stack',
    tags: ['users', 'team', 'collaboration', 'multiple'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'startup', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<div className="flex -space-x-2">
  <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted ring-2 ring-background">
    <img src="/avatars/01.jpg" alt="User 1" className="h-full w-full object-cover" />
  </span>
  <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted ring-2 ring-background">
    <img src="/avatars/02.jpg" alt="User 2" className="h-full w-full object-cover" />
  </span>
  <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted ring-2 ring-background">
    <img src="/avatars/03.jpg" alt="User 3" className="h-full w-full object-cover" />
  </span>
  <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted ring-2 ring-background">
    <span className="text-xs font-medium text-muted-foreground">+5</span>
  </span>
</div>`,
    tailwindClasses: {
      group: 'flex -space-x-2',
      avatar:
        'inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted ring-2 ring-background',
      image: 'h-full w-full object-cover',
      count: 'text-xs font-medium text-muted-foreground',
    },
    a11y: {
      roles: ['img'],
      ariaAttributes: ['alt', 'aria-label'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        '-space-x-2 for overlapping effect',
        'ring-background prevents edge blending',
        '+N count avatar for overflow indication',
      ],
      inspirationSource: 'Linear issue assignees',
      craftDetails: [
        'negative margin creates stack',
        'ring-2 separates overlapping avatars',
        'count avatar uses bg-muted + text instead of image',
      ],
    },
  },
  {
    id: 'avatar-with-status',
    name: 'Avatar with Status',
    category: 'atom',
    type: 'avatar',
    variant: 'with-status',
    tags: ['user', 'online', 'presence', 'status'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'devtools', 'general'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted ring-2 ring-background">
  <img src="/avatars/01.jpg" alt="User Name" className="h-full w-full object-cover" />
  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success ring-2 ring-background" aria-label="Online" />
</span>`,
    tailwindClasses: {
      avatar:
        'relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted ring-2 ring-background',
      image: 'h-full w-full object-cover',
      status: 'absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success ring-2 ring-background',
    },
    a11y: {
      roles: ['img'],
      ariaAttributes: ['alt', 'aria-label'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'absolute positioning for status dot',
        'ring-2 ring-background on status dot for visibility',
        'aria-label on status for screen readers',
      ],
      inspirationSource: 'Slack user presence',
      craftDetails: [
        'relative parent enables absolute child',
        'h-3 w-3 status dot follows 12px standard',
        'bg-success for online — semantic token',
      ],
    },
  },
  {
    id: 'avatar-initials',
    name: 'Initials Avatar',
    category: 'atom',
    type: 'avatar',
    variant: 'initials',
    tags: ['user', 'fallback', 'initials', 'identity'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-medium text-primary-foreground ring-2 ring-background">
  JD
</span>`,
    tailwindClasses: {
      avatar:
        'inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-medium text-primary-foreground ring-2 ring-background',
    },
    a11y: {
      roles: ['img'],
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
        'bg-primary for theme-aware background',
        'text-primary-foreground for automatic contrast',
        'font-medium for readability at small size',
      ],
      inspirationSource: 'Google Workspace avatars',
      craftDetails: [
        'text-sm fits two initials comfortably',
        'ring-2 ring-background matches image avatars',
        'uppercase initials derived from full name',
      ],
    },
  },
  {
    id: 'avatar-square',
    name: 'Square Avatar',
    category: 'atom',
    type: 'avatar',
    variant: 'square',
    tags: ['user', 'server', 'brand', 'identity'],
    mood: ['professional', 'minimal', 'bold'],
    industry: ['devtools', 'saas', 'media'],
    visualStyles: ['soft-depth', 'linear-modern', 'neubrutalism'],
    jsx: `<span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-muted ring-2 ring-background">
  <img src="/avatars/server.jpg" alt="Server Name" className="h-full w-full object-cover" />
</span>`,
    tailwindClasses: {
      avatar:
        'inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-muted ring-2 ring-background',
      image: 'h-full w-full object-cover',
    },
    a11y: {
      roles: ['img'],
      ariaAttributes: ['alt'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'rounded-lg instead of rounded-full for brand identity',
        'ideal for servers, channels, brands — not people',
        'same dimensions as circular for consistency',
      ],
      inspirationSource: 'Discord server icons',
      craftDetails: [
        'rounded-lg (8px) provides distinct shape from user avatars',
        'ring-2 ring-background maintains visual separation',
        'bg-muted fallback for loading',
      ],
    },
  },
];
