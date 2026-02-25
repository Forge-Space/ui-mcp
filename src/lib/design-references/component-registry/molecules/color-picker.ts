import type { IComponentSnippet } from '../types.js';

export const colorPickerSnippets: IComponentSnippet[] = [
  {
    id: 'color-swatch-grid',
    name: 'Color Swatch Grid',
    category: 'molecule',
    type: 'color-picker',
    variant: 'swatch-grid',
    tags: ['color', 'swatch', 'palette', 'selection'],
    mood: ['minimal', 'professional', 'creative'],
    industry: ['general', 'agency', 'saas'],
    visualStyles: ['minimal-editorial', 'linear-modern', 'soft-depth'],
    jsx: `<div className="flex flex-col gap-3">
  <label className="text-sm font-medium text-foreground">Choose Color</label>
  <div className="grid grid-cols-8 gap-2" role="radiogroup" aria-label="Color selection">
    <button
      type="button"
      role="radio"
      aria-checked="true"
      aria-label="Red"
      className="group relative h-8 w-8 rounded-md bg-destructive ring-2 ring-ring ring-offset-2 ring-offset-background transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <svg className="absolute inset-0 m-auto h-4 w-4 text-destructive-foreground opacity-100" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    </button>
    <button
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Primary"
      className="h-8 w-8 rounded-md bg-primary ring-offset-background transition-all hover:scale-110 hover:ring-2 hover:ring-ring hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    />
    <button
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Accent"
      className="h-8 w-8 rounded-md bg-accent ring-offset-background transition-all hover:scale-110 hover:ring-2 hover:ring-ring hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    />
    <button
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Success"
      className="h-8 w-8 rounded-md bg-success ring-offset-background transition-all hover:scale-110 hover:ring-2 hover:ring-ring hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    />
    <button
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Muted"
      className="h-8 w-8 rounded-md bg-muted ring-offset-background transition-all hover:scale-110 hover:ring-2 hover:ring-ring hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    />
  </div>
</div>`,
    tailwindClasses: {
      flex: 'flex',
      'flex-col': 'flex-col',
      'gap-3': 'gap-3',
      'text-sm': 'text-sm',
      'font-medium': 'font-medium',
    },
    a11y: {
      roles: ['radiogroup'],
      ariaAttributes: ['aria-label="Color swatch selection with labels"'],
      keyboardNav: 'Arrow keys for navigation, Space to select',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: [
        'ring-2 ring-ring on selected swatch',
        'hover:scale-110 for swatch feedback',
        'checkmark SVG on selected swatch',
      ],
      craftDetails: [
        'aria-label on each swatch with color name',
        'role="radio" for semantic color selection',
        'ring-offset-2 for layered focus rings',
      ],
      inspirationSource: 'Figma color picker swatches',
    },
  },
  {
    id: 'color-hsl-picker',
    name: 'HSL Slider Picker',
    category: 'molecule',
    type: 'color-picker',
    variant: 'hsl-picker',
    tags: ['color', 'hsl', 'slider', 'advanced'],
    mood: ['professional', 'minimal', 'creative'],
    industry: ['agency', 'saas', 'devtools'],
    visualStyles: ['minimal-editorial', 'linear-modern', 'soft-depth'],
    jsx: `<div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4">
  <div className="flex items-center gap-3">
    <div className="h-16 w-16 rounded-md border-2 border-border bg-primary shadow-sm" aria-label="Color preview" />
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-foreground">hsl(220, 90%, 56%)</span>
      <span className="text-xs text-muted-foreground">HSL Color</span>
    </div>
  </div>
  <div className="flex flex-col gap-3">
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground">Hue</label>
        <span className="text-xs tabular-nums text-foreground">220°</span>
      </div>
      <input
        type="range"
        min="0"
        max="360"
        value="220"
        className="h-2 w-full appearance-none rounded-full bg-gradient-to-r from-destructive via-success to-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Hue slider"
      />
    </div>
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground">Saturation</label>
        <span className="text-xs tabular-nums text-foreground">90%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value="90"
        className="h-2 w-full appearance-none rounded-full bg-muted ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Saturation slider"
      />
    </div>
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground">Lightness</label>
        <span className="text-xs tabular-nums text-foreground">56%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value="56"
        className="h-2 w-full appearance-none rounded-full bg-muted ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Lightness slider"
      />
    </div>
  </div>
</div>`,
    tailwindClasses: {
      flex: 'flex',
      'flex-col': 'flex-col',
      'gap-4': 'gap-4',
      'rounded-lg': 'rounded-lg',
      border: 'border',
    },
    a11y: {
      roles: ['slider'],
      ariaAttributes: ['aria-label="HSL sliders with preview and values"'],
      keyboardNav: 'Focus on each slider, arrow keys adjust value',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: [
        'tabular-nums for consistent value display',
        'bg-gradient-to-r from-destructive via-success to-primary for hue slider visual',
        'h-16 w-16 preview square with border-2',
      ],
      craftDetails: [
        'gap-1.5 between label row and slider',
        'justify-between for label and value alignment',
        'appearance-none on range inputs for custom styling',
      ],
      inspirationSource: 'Linear color picker',
    },
  },
  {
    id: 'color-input-hex',
    name: 'Hex Color Input',
    category: 'molecule',
    type: 'color-picker',
    variant: 'hex-input',
    tags: ['color', 'hex', 'input', 'manual'],
    mood: ['minimal', 'professional', 'calm'],
    industry: ['general', 'devtools', 'saas'],
    visualStyles: ['minimal-editorial', 'linear-modern', 'soft-depth'],
    jsx: `<div className="flex items-center gap-2 rounded-lg border border-border bg-background p-2">
  <div className="relative">
    <input
      type="color"
      value="#3b82f6"
      className="h-10 w-10 cursor-pointer rounded-md border border-border bg-transparent ring-offset-background transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="Color picker"
    />
  </div>
  <div className="flex flex-1 items-center gap-2">
    <input
      type="text"
      value="#3B82F6"
      maxLength={7}
      placeholder="#000000"
      className="h-9 flex-1 rounded-md border border-border bg-background px-3 text-sm font-mono text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Hex color input"
    />
    <button
      type="button"
      className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      Apply
    </button>
  </div>
</div>`,
    tailwindClasses: {
      flex: 'flex',
      'items-center': 'items-center',
      'gap-2': 'gap-2',
      'rounded-lg': 'rounded-lg',
      border: 'border',
    },
    a11y: {
      roles: ['textbox'],
      ariaAttributes: ['aria-label="Hex color input with native picker"'],
      keyboardNav: 'Focus on input, tab to button',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: [
        'font-mono for hex input legibility',
        'hover:scale-105 on color picker for interaction feedback',
        'maxLength={7} for hex format validation',
      ],
      craftDetails: [
        'h-10 w-10 color picker matches input height',
        'gap-2 between picker, input, and button',
        'text-xs Apply button for compact action',
      ],
      inspirationSource: 'Tailwind CSS color picker',
    },
  },
  {
    id: 'color-palette-generator',
    name: 'Palette Generator',
    category: 'molecule',
    type: 'color-picker',
    variant: 'palette-generator',
    tags: ['color', 'palette', 'shades', 'generator'],
    mood: ['creative', 'professional', 'minimal'],
    industry: ['agency', 'saas', 'devtools'],
    visualStyles: ['minimal-editorial', 'linear-modern', 'soft-depth'],
    jsx: `<div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4">
  <div className="flex items-center gap-3">
    <label className="text-sm font-medium text-foreground">Base Color</label>
    <input
      type="color"
      value="#3b82f6"
      className="h-8 w-16 cursor-pointer rounded-md border border-border bg-transparent ring-offset-background transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="Base color picker"
    />
  </div>
  <div className="flex flex-col gap-2">
    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Generated Palette</span>
    <div className="grid grid-cols-5 gap-1 rounded-md border border-border p-1">
      <button
        type="button"
        className="group relative flex h-16 flex-col items-center justify-center rounded-sm bg-primary/20 ring-offset-background transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Shade 100"
      >
        <span className="text-xs font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">100</span>
      </button>
      <button
        type="button"
        className="group relative flex h-16 flex-col items-center justify-center rounded-sm bg-primary/40 ring-offset-background transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Shade 200"
      >
        <span className="text-xs font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">200</span>
      </button>
      <button
        type="button"
        className="group relative flex h-16 flex-col items-center justify-center rounded-sm bg-primary/60 ring-offset-background transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Shade 300"
      >
        <span className="text-xs font-medium text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">300</span>
      </button>
      <button
        type="button"
        className="group relative flex h-16 flex-col items-center justify-center rounded-sm bg-primary/80 ring-offset-background transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Shade 400"
      >
        <span className="text-xs font-medium text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">400</span>
      </button>
      <button
        type="button"
        className="group relative flex h-16 flex-col items-center justify-center rounded-sm bg-primary ring-offset-background transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Shade 500"
      >
        <span className="text-xs font-medium text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">500</span>
      </button>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      flex: 'flex',
      'flex-col': 'flex-col',
      'gap-4': 'gap-4',
      'rounded-lg': 'rounded-lg',
      border: 'border',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label="Palette generator with shade selection"'],
      keyboardNav: 'Focus on base picker, grid items selectable',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: [
        'bg-primary/20, /40, /60, /80, /100 for shade progression',
        'opacity-0 group-hover:opacity-100 for shade labels',
        'hover:scale-105 for swatch interaction',
      ],
      craftDetails: [
        'uppercase tracking-wide for palette header',
        'gap-1 between swatches in grid',
        'rounded-sm swatches within rounded-md container',
      ],
      inspirationSource: 'Coolors palette generator',
    },
  },
];
