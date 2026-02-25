import type { IComponentSnippet } from '../types.js';

export const switchSnippets: IComponentSnippet[] = [
  {
    id: 'switch-basic',
    name: 'Default Switch',
    category: 'atom',
    type: 'switch',
    variant: 'basic',
    tags: ['switch', 'toggle', 'checkbox', 'boolean'],
    mood: ['minimal', 'playful'],
    industry: ['general', 'saas', 'saas'],
    visualStyles: ['linear-modern', 'soft-depth'],
    jsx: `<label htmlFor="switch-default" className="inline-flex cursor-pointer items-center gap-3">
  <div className="relative">
    <input type="checkbox" id="switch-default" className="peer sr-only" />
    <div className="h-6 w-11 rounded-full bg-secondary transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2"></div>
    <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-background shadow-sm transition-transform peer-checked:translate-x-5"></div>
  </div>
  <span className="text-sm font-medium text-foreground">Enable notifications</span>
</label>`,
    tailwindClasses: {
      label: 'inline-flex cursor-pointer items-center gap-3',
      wrapper: 'relative',
      input: 'peer sr-only',
      track:
        'h-6 w-11 rounded-full bg-secondary transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
      thumb:
        'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-background shadow-sm transition-transform peer-checked:translate-x-5',
      text: 'text-sm font-medium text-foreground',
    },
    a11y: {
      roles: ['checkbox with implicit role'],
      ariaAttributes: ['label association via htmlFor'],
      keyboardNav: 'Tab to focus, Space to toggle',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=checkbox]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'peer-checked:translate-x-5 slides thumb on toggle',
        'peer-focus-visible:ring-2 for keyboard focus',
      ],
      inspirationSource: 'Headless UI Switch',
      craftDetails: [
        'sr-only hides checkbox, peer enables sibling styling',
        'h-6 w-11 track with h-5 w-5 thumb for standard switch proportions',
      ],
    },
  },
  {
    id: 'switch-icon',
    name: 'Icon Switch',
    category: 'atom',
    type: 'switch',
    variant: 'icon',
    tags: ['switch', 'toggle', 'icon', 'gradient-mesh'],
    mood: ['minimal', 'playful'],
    industry: ['general', 'saas', 'saas'],
    visualStyles: ['retro-playful', 'linear-modern'],
    jsx: `<label htmlFor="switch-icon" className="inline-flex cursor-pointer items-center gap-3">
  <div className="relative">
    <input type="checkbox" id="switch-icon" className="peer sr-only" />
    <div className="h-6 w-11 rounded-full bg-secondary transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2"></div>
    <div className="absolute left-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-background shadow-sm transition-transform peer-checked:translate-x-5">
      <svg className="h-3 w-3 text-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" className="hidden peer-checked:block" />
      </svg>
    </div>
  </div>
  <span className="text-sm font-medium text-foreground">Dark mode</span>
</label>`,
    tailwindClasses: {
      label: 'inline-flex cursor-pointer items-center gap-3',
      wrapper: 'relative',
      input: 'peer sr-only',
      track:
        'h-6 w-11 rounded-full bg-secondary transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
      thumb:
        'absolute left-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-background shadow-sm transition-transform peer-checked:translate-x-5',
      icon: 'h-3 w-3 text-foreground',
      text: 'text-sm font-medium text-foreground',
    },
    a11y: {
      roles: ['checkbox'],
      ariaAttributes: ['label association', 'aria-hidden on icon'],
      keyboardNav: 'Tab to focus, Space to toggle',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=checkbox]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'flex items-center justify-center on thumb for icon centering',
        'h-3 w-3 icon fits within h-5 thumb',
      ],
      inspirationSource: 'HeroUI Switch',
      craftDetails: ['hidden peer-checked:block toggles checkmark visibility', 'shadow-sm on thumb creates depth'],
    },
  },
  {
    id: 'switch-labeled',
    name: 'Labeled Switch',
    category: 'atom',
    type: 'switch',
    variant: 'labeled',
    tags: ['switch', 'toggle', 'labeled', 'on-off'],
    mood: ['professional', 'professional'],
    industry: ['general', 'saas', 'saas'],
    visualStyles: ['corporate-trust', 'linear-modern'],
    jsx: `<label htmlFor="switch-labeled" className="inline-flex cursor-pointer items-center gap-3">
  <div className="relative">
    <input type="checkbox" id="switch-labeled" className="peer sr-only" />
    <div className="flex h-6 w-16 items-center justify-between rounded-full bg-secondary px-2 transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
      <span className="text-xs font-medium text-muted-foreground peer-checked:text-primary-foreground">OFF</span>
      <span className="text-xs font-medium text-muted-foreground peer-checked:text-primary-foreground">ON</span>
    </div>
    <div className="absolute left-0.5 top-0.5 h-5 w-7 rounded-full bg-background shadow-sm transition-transform peer-checked:translate-x-8"></div>
  </div>
  <span className="text-sm font-medium text-foreground">Auto-save</span>
</label>`,
    tailwindClasses: {
      label: 'inline-flex cursor-pointer items-center gap-3',
      wrapper: 'relative',
      input: 'peer sr-only',
      track:
        'flex h-6 w-16 items-center justify-between rounded-full bg-secondary px-2 transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
      trackLabel: 'text-xs font-medium text-muted-foreground peer-checked:text-primary-foreground',
      thumb:
        'absolute left-0.5 top-0.5 h-5 w-7 rounded-full bg-background shadow-sm transition-transform peer-checked:translate-x-8',
      text: 'text-sm font-medium text-foreground',
    },
    a11y: {
      roles: ['checkbox'],
      ariaAttributes: ['label association'],
      keyboardNav: 'Tab to focus, Space to toggle',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=checkbox]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['w-16 wider track accommodates ON/OFF labels', 'justify-between spaces labels at track edges'],
      inspirationSource: 'Radix Switch with labels',
      craftDetails: ['w-7 wider thumb covers inactive label', 'peer-checked:translate-x-8 accounts for label spacing'],
    },
  },
  {
    id: 'switch-size-variants',
    name: 'Size Variants Switch',
    category: 'atom',
    type: 'switch',
    variant: 'size-variants',
    tags: ['switch', 'toggle', 'size', 'small'],
    mood: ['minimal', 'minimal'],
    industry: ['general', 'saas', 'saas'],
    visualStyles: ['minimal-editorial', 'linear-modern'],
    jsx: `<label htmlFor="switch-small" className="inline-flex cursor-pointer items-center gap-2">
  <div className="relative">
    <input type="checkbox" id="switch-small" className="peer sr-only" />
    <div className="h-5 w-9 rounded-full bg-secondary transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-1"></div>
    <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-background shadow-sm transition-transform peer-checked:translate-x-4"></div>
  </div>
  <span className="text-xs font-medium text-foreground">Compact mode</span>
</label>`,
    tailwindClasses: {
      label: 'inline-flex cursor-pointer items-center gap-2',
      wrapper: 'relative',
      input: 'peer sr-only',
      track:
        'h-5 w-9 rounded-full bg-secondary transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-1',
      thumb:
        'absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-background shadow-sm transition-transform peer-checked:translate-x-4',
      text: 'text-xs font-medium text-foreground',
    },
    a11y: {
      roles: ['checkbox'],
      ariaAttributes: ['label association'],
      keyboardNav: 'Tab to focus, Space to toggle',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=checkbox]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'h-5 w-9 track with h-4 w-4 thumb for small switch variant',
        'ring-offset-1 for tighter focus ring on small switch',
      ],
      inspirationSource: 'Headless UI Switch size variants',
      craftDetails: ['gap-2 reduces spacing for compact layout', 'text-xs label matches small switch scale'],
    },
  },
];
