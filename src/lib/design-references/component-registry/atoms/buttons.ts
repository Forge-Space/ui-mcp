import type { IComponentSnippet } from '../types.js';

export const buttonSnippets: IComponentSnippet[] = [
  {
    id: 'button-default',
    name: 'Default Button',
    category: 'atom',
    type: 'button',
    variant: 'default',
    tags: ['cta', 'action', 'primary', 'interactive'],
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
      button: 'inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground ring-offset-background transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
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
      craftDetails: ['8pt grid spacing (px-4 py-2.5)', 'consistent border-radius (rounded-lg)', 'transition-all for smooth state changes'],
    },
  },
  {
    id: 'button-outline',
    name: 'Outline Button',
    category: 'atom',
    type: 'button',
    variant: 'outline',
    tags: ['secondary', 'action', 'subtle', 'interactive'],
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
      button: 'inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
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
    tags: ['tertiary', 'subtle', 'navigation', 'interactive'],
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
      button: 'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-foreground ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
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
      button: 'inline-flex items-center justify-center gap-2 rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground ring-offset-background transition-all hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
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
    tags: ['cta', 'conversion', 'primary', 'premium', 'marketing'],
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
      button: 'inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary via-primary/80 to-accent px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 ring-offset-background transition-all hover:opacity-90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
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
      antiGeneric: ['shadow-primary/25 for colored shadow', 'via-primary/80 prevents flat two-tone gradient', 'font-semibold for CTA emphasis'],
      inspirationSource: 'Stripe CTA buttons',
      craftDetails: ['perceptual gradient with via stop', 'colored box-shadow matching gradient', 'larger padding for CTA prominence'],
    },
  },
  {
    id: 'button-glass',
    name: 'Glass Button',
    category: 'atom',
    type: 'button',
    variant: 'glass',
    tags: ['frosted', 'premium', 'overlay', 'interactive'],
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
      button: 'inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md ring-offset-background transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
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
      antiGeneric: ['backdrop-blur for real frosted glass', 'border-white/20 for subtle edge definition', 'requires dark/gradient background to look right'],
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
    tags: ['icon-only', 'toolbar', 'compact', 'action'],
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
      button: 'inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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
      antiGeneric: ['fixed 44px hit target (h-11 w-11)', 'aria-label required — never icon-only without it', 'aria-hidden on SVG'],
      inspirationSource: 'Radix Themes IconButton',
      craftDetails: ['44px touch target (h-11 w-11) for WCAG 2.5.5 compliance', 'muted-foreground for low visual weight'],
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
      button: 'inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-80 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
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
      antiGeneric: ['aria-busy for screen readers', 'opacity-80 not opacity-50 — still readable', 'maintains button dimensions during loading'],
      inspirationSource: 'Vercel deploy button loading state',
      craftDetails: ['spinner matches text size', 'disabled without visual collapse', 'motion-reduce: animate-spin → animate-none'],
    },
  },
];
