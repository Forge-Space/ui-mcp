import type { IComponentSnippet } from '../types.js';

export const toggleSnippets: IComponentSnippet[] = [
  {
    id: 'switch-default',
    name: 'Switch Toggle',
    category: 'atom',
    type: 'switch',
    variant: 'default',
    tags: ['toggle', 'boolean', 'settings', 'energetic'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<label className="inline-flex items-center gap-3 cursor-pointer">
  <span className="text-sm font-medium text-foreground">Notifications</span>
  <button
    type="button"
    role="switch"
    aria-checked="false"
    className="peer relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-muted transition-colors duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary"
  >
    <span className="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-sm ring-0 transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] translate-x-0 data-[state=checked]:translate-x-4" />
  </button>
</label>`,
    tailwindClasses: {
      label: 'inline-flex items-center gap-3 cursor-pointer',
      text: 'text-sm font-medium text-foreground',
      switch:
        'peer relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-muted transition-colors duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary',
      thumb:
        'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-sm ring-0 transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] translate-x-0 data-[state=checked]:translate-x-4',
    },
    a11y: {
      roles: ['switch'],
      ariaAttributes: ['aria-checked', 'role="switch"'],
      keyboardNav: 'Space to toggle, Tab to focus',
      contrastRatio: '3:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'spring easing cubic-bezier(0.34,1.56,0.64,1) for delight',
        'role=switch for proper semantics',
        'data-[state=checked] for framework-agnostic state',
      ],
      inspirationSource: 'Radix UI Switch',
      craftDetails: ['spring physics overshoot on toggle', 'shadow-sm on thumb for depth'],
    },
  },
  {
    id: 'checkbox-default',
    name: 'Checkbox',
    category: 'atom',
    type: 'checkbox',
    variant: 'default',
    tags: ['form', 'boolean', 'multi-select', 'energetic'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<label className="inline-flex items-center gap-2 cursor-pointer">
  <input
    type="checkbox"
    className="h-4 w-4 shrink-0 rounded border border-input bg-background text-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary checked:border-primary"
  />
  <span className="text-sm text-foreground leading-none">Accept terms and conditions</span>
</label>`,
    tailwindClasses: {
      label: 'inline-flex items-center gap-2 cursor-pointer',
      checkbox:
        'h-4 w-4 shrink-0 rounded border border-input bg-background text-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary checked:border-primary',
      text: 'text-sm text-foreground leading-none',
    },
    a11y: {
      roles: ['checkbox'],
      ariaAttributes: ['aria-checked'],
      keyboardNav: 'Space to toggle, Tab to focus',
      contrastRatio: '3:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['native input with styled appearance', 'leading-none on label for vertical alignment'],
      inspirationSource: 'shadcn/ui Checkbox',
      craftDetails: ['h-4 w-4 for appropriate click target', 'shrink-0 prevents checkbox compression'],
    },
  },
  {
    id: 'radio-group',
    name: 'Radio Group',
    category: 'atom',
    type: 'radio',
    variant: 'default',
    tags: ['form', 'single-select', 'options', 'energetic'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'corporate-trust'],
    jsx: `<fieldset className="space-y-3" role="radiogroup" aria-label="Select option">
  <legend className="text-sm font-medium text-foreground mb-3">Choose an option</legend>
  <label className="inline-flex items-center gap-2 cursor-pointer">
    <input type="radio" name="option" value="1" className="h-4 w-4 shrink-0 border border-input text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
    <span className="text-sm text-foreground">Option one</span>
  </label>
  <label className="inline-flex items-center gap-2 cursor-pointer">
    <input type="radio" name="option" value="2" className="h-4 w-4 shrink-0 border border-input text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
    <span className="text-sm text-foreground">Option two</span>
  </label>
  <label className="inline-flex items-center gap-2 cursor-pointer">
    <input type="radio" name="option" value="3" className="h-4 w-4 shrink-0 border border-input text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
    <span className="text-sm text-foreground">Option three</span>
  </label>
</fieldset>`,
    tailwindClasses: {
      fieldset: 'space-y-3',
      legend: 'text-sm font-medium text-foreground mb-3',
      label: 'inline-flex items-center gap-2 cursor-pointer',
      radio:
        'h-4 w-4 shrink-0 border border-input text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      text: 'text-sm text-foreground',
    },
    a11y: {
      roles: ['radiogroup', 'radio'],
      ariaAttributes: ['aria-label', 'role="radiogroup"'],
      keyboardNav: 'Arrow keys to navigate, Space to select, Tab to exit group',
      contrastRatio: '3:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'fieldset' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'fieldset + legend for proper grouping',
        'arrow key navigation per WAI-ARIA',
        'shared name attribute for mutual exclusion',
      ],
      inspirationSource: 'Radix UI RadioGroup',
      craftDetails: ['fieldset semantics', 'consistent with checkbox sizing'],
    },
  },
];
