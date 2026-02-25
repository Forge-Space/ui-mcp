import type { IComponentSnippet } from '../types.js';

export const buttonSnippets: IComponentSnippet[] = [
  {
    id: 'button-default',
    name: 'Default Button',
    category: 'atom',
    type: 'button',
    variant: 'default',
    tags: ['cta', 'action', 'primary', 'energetic'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern', 'minimal-editorial'],
    jsx: `<button
  type="button"
  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground ring-offset-background transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
  aria-label="Action button"
>
  Button
</button>`,
    tailwindClasses: {
      button:
        'inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground ring-offset-background transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label', 'aria-disabled'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: ['active:scale press feedback', 'gap-2 for icon spacing', 'ring-offset for layered focus'],
      inspirationSource: 'shadcn/ui Button',
      craftDetails: [
        '8pt grid spacing (px-4 py-2.5)',
        'consistent border-radius (rounded-lg)',
        'transition-all for smooth state changes',
      ],
    },
  },
  {
    id: 'button-outline',
    name: 'Outline Button',
    category: 'atom',
    type: 'button',
    variant: 'outline',
    tags: ['secondary', 'action', 'calm', 'energetic'],
    mood: ['minimal', 'calm', 'professional'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['soft-depth', 'corporate-trust', 'minimal-editorial'],
    jsx: `<button
  type="button"
  className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
>
  Outline
</button>`,
    tailwindClasses: {
      button:
        'inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label', 'aria-disabled'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: ['border-input for theme-aware borders', 'accent hover for subtle feedback'],
      inspirationSource: 'shadcn/ui Button outline variant',
      craftDetails: ['consistent with default button dimensions', 'bg-background for transparency control'],
    },
  },
  {
    id: 'button-ghost',
    name: 'Ghost Button',
    category: 'atom',
    type: 'button',
    variant: 'ghost',
    tags: ['tertiary', 'calm', 'navigation', 'energetic'],
    mood: ['minimal', 'calm'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['minimal-editorial', 'linear-modern', 'soft-depth'],
    jsx: `<button
  type="button"
  className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-foreground ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
>
  Ghost
</button>`,
    tailwindClasses: {
      button:
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-foreground ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label', 'aria-disabled'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: ['no background until hover — reduces visual noise', 'ideal for toolbars and nav items'],
      inspirationSource: 'Linear toolbar buttons',
      craftDetails: ['zero-chrome default state', 'same hit target as other button variants'],
    },
  },
  {
    id: 'button-destructive',
    name: 'Destructive Button',
    category: 'atom',
    type: 'button',
    variant: 'destructive',
    tags: ['danger', 'delete', 'warning', 'action'],
    mood: ['professional', 'corporate'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'corporate-trust'],
    jsx: `<button
  type="button"
  className="inline-flex items-center justify-center gap-2 rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground ring-offset-background transition-all hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
>
  Delete
</button>`,
    tailwindClasses: {
      button:
        'inline-flex items-center justify-center gap-2 rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground ring-offset-background transition-all hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label', 'aria-disabled'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: ['focus ring uses destructive color for context', 'never color-only — pair with icon in real usage'],
      inspirationSource: 'GitHub danger button',
      craftDetails: ['semantic destructive token', 'ring-destructive focus for danger context'],
    },
  },
  {
    id: 'button-gradient',
    name: 'Gradient CTA Button',
    category: 'atom',
    type: 'button',
    variant: 'gradient',
    tags: ['cta', 'conversion', 'primary', 'premium', 'agency'],
    mood: ['bold', 'energetic', 'premium'],
    industry: ['saas', 'startup', 'agency'],
    visualStyles: ['gradient-mesh', 'dark-premium'],
    jsx: `<button
  type="button"
  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary via-primary/80 to-accent px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 ring-offset-background transition-all hover:opacity-90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
>
  Get Started
</button>`,
    tailwindClasses: {
      button:
        'inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary via-primary/80 to-accent px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 ring-offset-background transition-all hover:opacity-90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label', 'aria-disabled'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'shadow-primary/25 for colored shadow',
        'via-primary/80 prevents flat two-tone gradient',
        'font-semibold for CTA emphasis',
      ],
      inspirationSource: 'Stripe CTA buttons',
      craftDetails: [
        'perceptual gradient with via stop',
        'colored box-shadow matching gradient',
        'larger padding for CTA prominence',
      ],
    },
  },
  {
    id: 'button-glass',
    name: 'Glass Button',
    category: 'atom',
    type: 'button',
    variant: 'glass',
    tags: ['frosted', 'premium', 'overlay', 'energetic'],
    mood: ['futuristic', 'premium', 'creative'],
    industry: ['saas', 'agency', 'startup'],
    visualStyles: ['glassmorphism', 'dark-premium'],
    jsx: `<button
  type="button"
  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md ring-offset-background transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
>
  Glass Button
</button>`,
    tailwindClasses: {
      button:
        'inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md ring-offset-background transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label', 'aria-disabled'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'backdrop-blur for real frosted glass',
        'border-white/20 for subtle edge definition',
        'requires dark/gradient background to look right',
      ],
      inspirationSource: 'Apple visionOS buttons',
      craftDetails: ['semi-transparent layering', 'focus ring adapts to glass context (white/50)'],
    },
  },
  {
    id: 'button-icon',
    name: 'Icon Button',
    category: 'atom',
    type: 'button',
    variant: 'icon',
    tags: ['icon-only', 'toolbar', 'minimal-editorial', 'action'],
    mood: ['minimal', 'professional'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['linear-modern', 'minimal-editorial', 'soft-depth'],
    jsx: `<button
  type="button"
  className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  aria-label="Icon action"
>
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
</button>`,
    tailwindClasses: {
      button:
        'inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      icon: 'h-5 w-5',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '3:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'fixed 44px hit target (h-11 w-11)',
        'aria-label required — never icon-only without it',
        'aria-hidden on SVG',
      ],
      inspirationSource: 'Radix Themes IconButton',
      craftDetails: [
        '44px touch target (h-11 w-11) for WCAG 2.5.5 compliance',
        'muted-foreground for low visual weight',
      ],
    },
  },
  {
    id: 'button-loading',
    name: 'Loading Button',
    category: 'atom',
    type: 'button',
    variant: 'loading',
    tags: ['async', 'submit', 'pending', 'feedback'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<button
  type="button"
  disabled
  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-80 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none"
  aria-label="Loading"
  aria-busy="true"
>
  <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
  Loading...
</button>`,
    tailwindClasses: {
      button:
        'inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-80 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
      spinner: 'h-4 w-4 animate-spin',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label', 'aria-busy', 'disabled'],
      keyboardNav: 'Disabled during loading — focus preserved',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'aria-busy for screen readers',
        'opacity-80 not opacity-50 — still readable',
        'maintains button dimensions during loading',
      ],
      inspirationSource: 'Vercel deploy button loading state',
      craftDetails: [
        'spinner matches text size',
        'disabled without visual collapse',
        'motion-reduce: animate-spin → animate-none',
      ],
    },
  },
  {
    id: 'button-split',
    name: 'Split Button',
    category: 'atom',
    type: 'button',
    variant: 'split',
    tags: ['dropdown', 'action', 'menu', 'composite'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<div className="inline-flex rounded-lg ring-offset-background">
  <button
    type="button"
    className="inline-flex items-center justify-center gap-2 rounded-l-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
  >
    Merge
  </button>
  <div className="w-px bg-primary-foreground/20" />
  <button
    type="button"
    className="inline-flex items-center justify-center rounded-r-lg bg-primary px-2 py-2.5 text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    aria-label="More options"
  >
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
  </button>
</div>`,
    tailwindClasses: {
      wrapper: 'inline-flex rounded-lg ring-offset-background',
      mainButton:
        'inline-flex items-center justify-center gap-2 rounded-l-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
      divider: 'w-px bg-primary-foreground/20',
      dropdownButton:
        'inline-flex items-center justify-center rounded-r-lg bg-primary px-2 py-2.5 text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      icon: 'h-4 w-4',
    },
    a11y: {
      roles: ['button', 'menu'],
      ariaAttributes: ['aria-label', 'aria-haspopup', 'aria-expanded'],
      keyboardNav: 'Tab to each button, Enter/Space to activate',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'rounded-l-lg + rounded-r-lg creates seamless split',
        'divider with bg-primary-foreground/20 for subtle separation',
        'dropdown button has aria-label for icon-only affordance',
      ],
      inspirationSource: 'GitHub merge button',
      craftDetails: [
        'w-px divider between buttons',
        'px-2 on dropdown (vs px-4) for compact icon button',
        'shared bg-primary hover state',
      ],
    },
  },
  {
    id: 'button-group',
    name: 'Button Group',
    category: 'atom',
    type: 'button',
    variant: 'group',
    tags: ['toggle', 'segmented', 'toolbar', 'radio'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'minimal-editorial'],
    jsx: `<div className="inline-flex rounded-lg border border-border p-1" role="group">
  <button
    type="button"
    className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:shadow-sm"
    data-state="active"
  >
    Week
  </button>
  <button
    type="button"
    className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:shadow-sm"
  >
    Month
  </button>
  <button
    type="button"
    className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:shadow-sm"
  >
    Year
  </button>
</div>`,
    tailwindClasses: {
      group: 'inline-flex rounded-lg border border-border p-1',
      button:
        'inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:shadow-sm',
    },
    a11y: {
      roles: ['group', 'button'],
      ariaAttributes: ['aria-pressed', 'role'],
      keyboardNav: 'Arrow keys to navigate, Space to select',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'p-1 wrapper creates contained button group',
        'data-[state=active] for active state styling',
        'shadow-sm on active for subtle depth',
      ],
      inspirationSource: 'Figma toolbar toggles',
      craftDetails: [
        'border + p-1 creates segmented control appearance',
        'rounded-md on buttons (not rounded-lg) for inner corners',
        'data attributes over classes for state management',
      ],
    },
  },
  {
    id: 'button-floating-action',
    name: 'Floating Action Button',
    category: 'atom',
    type: 'button',
    variant: 'floating-action',
    tags: ['fab', 'primary', 'action', 'floating'],
    mood: ['bold', 'energetic', 'playful'],
    industry: ['saas', 'startup', 'ecommerce'],
    visualStyles: ['soft-depth', 'gradient-mesh', 'dark-premium'],
    jsx: `<button
  type="button"
  className="fixed bottom-6 right-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-offset-background transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
  aria-label="Create new"
>
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
</button>`,
    tailwindClasses: {
      button:
        'fixed bottom-6 right-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-offset-background transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50',
      icon: 'h-6 w-6',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab to focus, Enter/Space to activate',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'fixed bottom-6 right-6 for consistent positioning',
        'hover:scale-105 + hover:shadow-xl for attention',
        'aria-label required for icon-only button',
      ],
      inspirationSource: 'Material Design FAB',
      craftDetails: [
        'h-14 w-14 (56px) exceeds WCAG touch target',
        'shadow-primary/30 creates colored shadow',
        'active:scale-95 provides press feedback',
      ],
    },
  },
  {
    id: 'button-pill',
    name: 'Pill Button',
    category: 'atom',
    type: 'button',
    variant: 'pill',
    tags: ['soft-depth', 'tag', 'filter', 'chip'],
    mood: ['playful', 'creative', 'warm'],
    industry: ['ecommerce', 'media', 'agency'],
    visualStyles: ['retro-playful', 'gradient-mesh', 'minimal-editorial'],
    jsx: `<button
  type="button"
  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
>
  Subscribe
</button>`,
    tailwindClasses: {
      button:
        'inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label', 'aria-disabled'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'rounded-full for pill shape',
        'px-5 (vs px-4) for elongated proportions',
        'py-2 maintains standard height',
      ],
      inspirationSource: 'Notion call-to-action buttons',
      craftDetails: [
        'rounded-full differentiates from standard rounded-lg buttons',
        'px-5 creates pill proportions',
        'same transition patterns as default button',
      ],
    },
  },
  {
    id: 'button-destructive-outline',
    name: 'Destructive Outline Button',
    category: 'atom',
    type: 'button',
    variant: 'destructive-outline',
    tags: ['danger', 'delete', 'warning', 'secondary'],
    mood: ['professional', 'corporate'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<button
  type="button"
  className="inline-flex items-center justify-center gap-2 rounded-lg border border-destructive bg-background px-4 py-2.5 text-sm font-medium text-destructive ring-offset-background transition-all hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
>
  Delete
</button>`,
    tailwindClasses: {
      button:
        'inline-flex items-center justify-center gap-2 rounded-lg border border-destructive bg-background px-4 py-2.5 text-sm font-medium text-destructive ring-offset-background transition-all hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label', 'aria-disabled'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'border-destructive + text-destructive for clear intent',
        'hover fills with destructive color',
        'less aggressive than solid destructive button',
      ],
      inspirationSource: 'GitHub delete repository outline button',
      craftDetails: [
        'bg-background transparent default',
        'hover:bg-destructive + hover:text-destructive-foreground for full state',
        'ring-destructive for contextual focus',
      ],
    },
  },
  {
    id: 'button-link',
    name: 'Link Button',
    category: 'atom',
    type: 'button',
    variant: 'link',
    tags: ['link', 'text', 'inline', 'calm'],
    mood: ['minimal', 'calm', 'professional'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['minimal-editorial', 'linear-modern', 'corporate-trust'],
    jsx: `<button
  type="button"
  className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
>
  Learn more
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
</button>`,
    tailwindClasses: {
      button:
        'inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      icon: 'h-3.5 w-3.5',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label', 'aria-disabled'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'underline-offset-4 for comfortable hover underline',
        'gap-1 for tight icon spacing',
        'h-3.5 w-3.5 smaller icon for inline context',
      ],
      inspirationSource: 'Stripe inline links',
      craftDetails: [
        'text-primary for link color',
        'hover:underline for standard link affordance',
        'no background or border — pure text button',
      ],
    },
  },
  {
    id: 'button-loading-spinner',
    name: 'Loading Spinner Button',
    category: 'atom',
    type: 'button',
    variant: 'loading-spinner',
    tags: ['loading', 'spinner', 'async', 'submit', 'pending'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<button disabled className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-80 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-busy="true">
  <svg className="h-4 w-4 motion-safe:animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
  Processing...
</button>`,
    tailwindClasses: {
      button:
        'inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-80 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      spinner: 'h-4 w-4 motion-safe:animate-spin motion-reduce:animate-none',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['disabled', 'aria-busy'],
      keyboardNav: 'N/A — disabled state',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['opacity-80 for disabled state clarity', 'gap-2 spinner-text alignment'],
      inspirationSource: 'shadcn/ui Button loading state',
      craftDetails: [
        'motion-safe:animate-spin with motion-reduce fallback',
        'disabled attribute prevents double-submit',
      ],
    },
  },
  {
    id: 'button-social',
    name: 'Social Login Button',
    category: 'atom',
    type: 'button',
    variant: 'media',
    tags: ['media', 'oauth', 'login', 'authentication', 'third-party'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'ecommerce'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50">
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" /></svg>
  Continue with Google
</button>`,
    tailwindClasses: {
      button:
        'inline-flex w-full items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
      icon: 'h-5 w-5',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label', 'aria-hidden on icon'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'w-full for consistent auth flow layout',
        'h-5 w-5 larger icon for brand recognition',
        'justify-center for centered content',
      ],
      inspirationSource: 'Clerk / NextAuth social buttons',
      craftDetails: ['brand icon uses currentColor for theme adaptation', 'outline variant for non-primary action'],
    },
  },
  {
    id: 'button-icon-only-circle',
    name: 'Circular Icon Button',
    category: 'atom',
    type: 'button',
    variant: 'icon-only-circle',
    tags: ['icon-only', 'circular', 'toolbar', 'minimal-editorial'],
    mood: ['minimal', 'professional', 'premium'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'dark-premium'],
    jsx: `<button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-card text-muted-foreground shadow-sm ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50" aria-label="More options">
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
</button>`,
    tailwindClasses: {
      button:
        'inline-flex h-10 w-10 items-center justify-center rounded-full border bg-card text-muted-foreground shadow-sm ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50',
      icon: 'h-5 w-5',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '3:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'rounded-full for circular shape',
        'active:scale-95 for press feedback',
        'shadow-sm → shadow-md hover transition',
      ],
      inspirationSource: 'Telegram / WhatsApp action buttons',
      craftDetails: [
        'h-10 w-10 for 40px touch target',
        'border + shadow-sm for subtle elevation',
        'bg-card instead of transparent for definition',
      ],
    },
  },
  {
    id: 'button-animated-gradient',
    name: 'Animated Gradient Button',
    category: 'atom',
    type: 'button',
    variant: 'animated-gradient',
    tags: ['gradient', 'energetic', 'premium', 'cta', 'agency'],
    mood: ['bold', 'energetic', 'premium'],
    industry: ['saas', 'startup', 'agency'],
    visualStyles: ['gradient-mesh', 'dark-premium'],
    jsx: `<button type="button" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 ring-offset-background transition-all duration-300 hover:bg-[position:100%_0] hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 motion-safe:animate-[gradient_3s_ease-in-out_infinite] motion-reduce:animate-none">
  Get Started Free
</button>`,
    tailwindClasses: {
      button:
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 ring-offset-background transition-all duration-300 hover:bg-[position:100%_0] hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    },
    animations: [
      '@keyframes gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }',
    ],
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label', 'aria-disabled'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'bg-[length:200%_100%] for animated gradient effect',
        'motion-safe:animate with motion-reduce fallback',
        'duration-300 for smooth hover transition',
      ],
      inspirationSource: 'Vercel marketing CTAs',
      craftDetails: [
        'gradient animates on hover via bg-position',
        'shadow-lg with colored shadow (shadow-primary/25)',
        'overflow-hidden prevents gradient bleed',
      ],
    },
  },
  {
    id: 'button-magnetic-hover',
    name: 'Magnetic Hover Button',
    category: 'atom',
    type: 'button',
    variant: 'magnetic-hover',
    tags: ['magnetic', 'energetic', 'premium', 'creative'],
    mood: ['premium', 'futuristic', 'creative'],
    industry: ['agency', 'startup', 'saas'],
    visualStyles: ['dark-premium', 'glassmorphism'],
    jsx: `<button type="button" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-primary bg-background px-6 py-3 text-sm font-semibold text-foreground ring-offset-background transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50">
  <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5">Explore</span>
  <svg className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
  <span className="absolute inset-0 bg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true" />
</button>`,
    tailwindClasses: {
      button:
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-primary bg-background px-6 py-3 text-sm font-semibold text-foreground ring-offset-background transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50',
      text: 'relative z-10 transition-transform duration-200 group-hover:translate-x-0.5',
      icon: 'relative z-10 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1',
      overlay: 'absolute inset-0 bg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label', 'aria-hidden on overlay'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'group-hover:translate-x for magnetic effect',
        'layered z-10 content above overlay',
        'border-2 for stronger outline',
      ],
      inspirationSource: 'Awwwards agency sites',
      craftDetails: [
        'text and icon translate on hover for cursor follow illusion',
        'absolute overlay fills background smoothly',
        'duration-200 for snappy interaction',
      ],
    },
  },
  {
    id: 'button-social-login',
    name: 'Social Login Button',
    category: 'atom',
    type: 'button',
    variant: 'social-login',
    tags: ['social', 'oauth', 'login', 'authentication', 'third-party'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'ecommerce'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50">
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" /></svg>
  Continue with Google
</button>`,
    tailwindClasses: {
      button:
        'inline-flex w-full items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
      icon: 'h-5 w-5',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label', 'aria-hidden on icon'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'w-full for consistent auth flow layout',
        'h-5 w-5 larger icon for brand recognition',
        'justify-center for centered content',
      ],
      inspirationSource: 'Clerk / NextAuth social buttons',
      craftDetails: ['brand icon uses currentColor for theme adaptation', 'outline variant for non-primary action'],
    },
  },
  {
    id: 'button-icon-circle',
    name: 'Circular Icon Button',
    category: 'atom',
    type: 'button',
    variant: 'icon-circle',
    tags: ['icon-only', 'circular', 'toolbar', 'minimal'],
    mood: ['minimal', 'professional', 'premium'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'dark-premium'],
    jsx: `<button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-card text-muted-foreground shadow-sm ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50" aria-label="More options">
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
</button>`,
    tailwindClasses: {
      button:
        'inline-flex h-10 w-10 items-center justify-center rounded-full border bg-card text-muted-foreground shadow-sm ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50',
      icon: 'h-5 w-5',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '3:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'rounded-full for circular shape',
        'active:scale-95 for press feedback',
        'shadow-sm → shadow-md hover transition',
      ],
      inspirationSource: 'Telegram / WhatsApp action buttons',
      craftDetails: [
        'h-10 w-10 for 40px touch target',
        'border + shadow-sm for subtle elevation',
        'bg-card instead of transparent for definition',
      ],
    },
  },
  {
    id: 'button-gradient-border',
    name: 'Animated Gradient Border Button',
    category: 'atom',
    type: 'button',
    variant: 'gradient-border',
    tags: ['gradient', 'border', 'premium', 'energetic'],
    mood: ['bold', 'energetic', 'premium'],
    industry: ['saas', 'startup', 'agency'],
    visualStyles: ['gradient-mesh', 'dark-premium'],
    jsx: `<button type="button" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-background p-[2px] ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50">
  <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] transition-all duration-300 group-hover:bg-[position:100%_0]" aria-hidden="true" />
  <div className="relative inline-flex items-center justify-center gap-2 rounded-md bg-background px-6 py-2.5 text-sm font-semibold text-foreground">
    Gradient Border
  </div>
</button>`,
    tailwindClasses: {
      wrapper:
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-background p-[2px] ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
      gradient:
        'absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] transition-all duration-300 group-hover:bg-[position:100%_0]',
      inner:
        'relative inline-flex items-center justify-center gap-2 rounded-md bg-background px-6 py-2.5 text-sm font-semibold text-foreground',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label', 'aria-hidden on gradient'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'p-[2px] for thin gradient border effect',
        'bg-[length:200%_100%] for animated gradient',
        'layered structure: gradient wrapper + inner content',
      ],
      inspirationSource: 'Framer marketing buttons',
      craftDetails: [
        'overflow-hidden prevents gradient overflow',
        'group-hover animates gradient position',
        'inner div maintains content background',
      ],
    },
  },
  {
    id: 'button-magnetic',
    name: 'Magnetic Hover Button',
    category: 'atom',
    type: 'button',
    variant: 'magnetic',
    tags: ['magnetic', 'energetic', 'premium', 'creative'],
    mood: ['premium', 'futuristic', 'creative'],
    industry: ['agency', 'startup', 'saas'],
    visualStyles: ['dark-premium', 'glassmorphism'],
    jsx: `<button type="button" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-primary bg-background px-6 py-3 text-sm font-semibold text-foreground ring-offset-background transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50">
  <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5">Explore</span>
  <svg className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
  <span className="absolute inset-0 bg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true" />
</button>`,
    tailwindClasses: {
      button:
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-primary bg-background px-6 py-3 text-sm font-semibold text-foreground ring-offset-background transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50',
      text: 'relative z-10 transition-transform duration-200 group-hover:translate-x-0.5',
      icon: 'relative z-10 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1',
      overlay: 'absolute inset-0 bg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label', 'aria-hidden on overlay'],
      keyboardNav: 'Enter/Space to activate, Tab to focus',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'group-hover:translate-x for magnetic effect',
        'layered z-10 content above overlay',
        'border-2 for stronger outline',
      ],
      inspirationSource: 'Awwwards agency sites',
      craftDetails: [
        'text and icon translate on hover for cursor follow illusion',
        'absolute overlay fills background smoothly',
        'duration-200 for snappy interaction',
      ],
    },
  },
];
