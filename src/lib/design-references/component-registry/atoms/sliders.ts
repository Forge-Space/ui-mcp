import type { IComponentSnippet } from '../types.js';

export const sliderSnippets: IComponentSnippet[] = [
  {
    id: 'slider-single',
    name: 'Single Slider',
    category: 'atom',
    type: 'slider',
    variant: 'single',
    tags: ['input', 'slider', 'range', 'control'],
    mood: ['minimal', 'playful'],
    industry: ['general', 'saas', 'media'],
    visualStyles: ['linear-modern', 'retro-playful'],
    jsx: `<div className="space-y-2">
  <label htmlFor="slider-single" className="text-sm font-medium text-foreground">
    Volume
  </label>
  <div className="relative flex items-center">
    <input
      type="range"
      id="slider-single"
      min="0"
      max="100"
      defaultValue="50"
      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-ring [&::-webkit-slider-thumb]:ring-offset-2 [&::-webkit-slider-thumb]:transition-all hover:[&::-webkit-slider-thumb]:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={50}
    />
  </div>
</div>`,
    tailwindClasses: {
      container: 'space-y-2',
      label: 'text-sm font-medium text-foreground',
      wrapper: 'relative flex items-center',
      input: 'h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary',
    },
    a11y: {
      roles: ['slider with implicit role'],
      ariaAttributes: ['aria-valuemin', 'aria-valuemax', 'aria-valuenow', 'aria-label or label association'],
      keyboardNav: 'Arrow keys to adjust value, Home/End for min/max',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=range]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['ring-2 ring-ring on thumb for elevated appearance', 'ring-offset-2 creates separation from track'],
      inspirationSource: 'Radix Slider, HeroUI',
      craftDetails: [
        'appearance-none removes browser default styles',
        'webkit-slider-thumb pseudo-class styles custom thumb',
      ],
    },
  },
  {
    id: 'slider-range',
    name: 'Range Slider',
    category: 'atom',
    type: 'slider',
    variant: 'range',
    tags: ['input', 'slider', 'range', 'dual', 'filter'],
    mood: ['minimal', 'professional'],
    industry: ['ecommerce', 'saas', 'general'],
    visualStyles: ['corporate-trust', 'linear-modern'],
    jsx: `<div className="space-y-3">
  <label className="text-sm font-medium text-foreground">
    Price Range
  </label>
  <div className="relative pt-1">
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <input
          type="range"
          min="0"
          max="1000"
          defaultValue="200"
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-ring [&::-webkit-slider-thumb]:transition-all hover:[&::-webkit-slider-thumb]:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Minimum price"
        />
      </div>
    </div>
    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
      <span>$0</span>
      <span>$1000</span>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'space-y-3',
      label: 'text-sm font-medium text-foreground',
      wrapper: 'relative pt-1',
      inputWrapper: 'flex items-center gap-4',
      input: 'h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary',
      labels: 'mt-2 flex items-center justify-between text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['slider'],
      ariaAttributes: ['aria-label on each input', 'aria-valuemin', 'aria-valuemax'],
      keyboardNav: 'Arrow keys for value adjustment, Tab between sliders',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=range]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'dual input pattern for min/max range selection',
        'text-xs labels at track endpoints for value context',
      ],
      inspirationSource: 'HeroUI Slider',
      craftDetails: ['pt-1 provides space for thumb overflow', 'justify-between on labels aligns with track ends'],
    },
  },
  {
    id: 'slider-stepped',
    name: 'Stepped Slider',
    category: 'atom',
    type: 'slider',
    variant: 'stepped',
    tags: ['input', 'slider', 'discrete', 'stepped'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'saas'],
    visualStyles: ['linear-modern', 'minimal-editorial'],
    jsx: `<div className="space-y-2">
  <div className="flex items-center justify-between">
    <label htmlFor="slider-stepped" className="text-sm font-medium text-foreground">
      Quality
    </label>
    <span className="text-sm text-muted-foreground">Medium</span>
  </div>
  <div className="relative">
    <input
      type="range"
      id="slider-stepped"
      min="0"
      max="4"
      step="1"
      defaultValue="2"
      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-ring [&::-webkit-slider-thumb]:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      list="quality-markers"
      aria-valuetext="Medium"
    />
    <datalist id="quality-markers" className="mt-2 flex w-full justify-between px-2.5 text-xs text-muted-foreground">
      <option value="0" label="Low"></option>
      <option value="1" label=""></option>
      <option value="2" label="Medium"></option>
      <option value="3" label=""></option>
      <option value="4" label="High"></option>
    </datalist>
  </div>
</div>`,
    tailwindClasses: {
      container: 'space-y-2',
      header: 'flex items-center justify-between',
      label: 'text-sm font-medium text-foreground',
      value: 'text-sm text-muted-foreground',
      input: 'h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary',
      datalist: 'mt-2 flex w-full justify-between px-2.5 text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['slider'],
      ariaAttributes: ['aria-valuetext for human-readable value', 'label association'],
      keyboardNav: 'Arrow keys snap to steps, Page Up/Down for larger jumps',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=range]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['step=1 enforces discrete values', 'datalist with option labels shows step markers'],
      inspirationSource: 'Chakra Slider',
      craftDetails: [
        'aria-valuetext provides semantic labels for numeric steps',
        'justify-between on header aligns label and current value',
      ],
    },
  },
  {
    id: 'slider-marks',
    name: 'Marks Slider',
    category: 'atom',
    type: 'slider',
    variant: 'marks',
    tags: ['input', 'slider', 'marks', 'labels'],
    mood: ['professional', 'professional'],
    industry: ['saas', 'saas', 'saas'],
    visualStyles: ['corporate-trust', 'soft-depth'],
    jsx: `<div className="space-y-4">
  <label htmlFor="slider-marks" className="text-sm font-medium text-foreground">
    Temperature (°C)
  </label>
  <div className="relative px-2">
    <input
      type="range"
      id="slider-marks"
      min="0"
      max="100"
      step="25"
      defaultValue="50"
      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-ring [&::-webkit-slider-thumb]:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    />
    <div className="relative mt-2 flex justify-between">
      <span className="absolute left-0 h-2 w-0.5 -translate-y-4 bg-border"></span>
      <span className="absolute left-1/4 h-2 w-0.5 -translate-x-0.5 -translate-y-4 bg-border"></span>
      <span className="absolute left-1/2 h-2 w-0.5 -translate-x-0.5 -translate-y-4 bg-border"></span>
      <span className="absolute left-3/4 h-2 w-0.5 -translate-x-0.5 -translate-y-4 bg-border"></span>
      <span className="absolute right-0 h-2 w-0.5 -translate-y-4 bg-border"></span>
    </div>
    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
      <span>0°</span>
      <span>25°</span>
      <span>50°</span>
      <span>75°</span>
      <span>100°</span>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'space-y-4',
      label: 'text-sm font-medium text-foreground',
      wrapper: 'relative px-2',
      input: 'h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary',
      marks: 'relative mt-2 flex justify-between',
      mark: 'absolute h-2 w-0.5 bg-border',
      labels: 'mt-1 flex justify-between text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['slider'],
      ariaAttributes: ['label association', 'aria-valuemin', 'aria-valuemax'],
      keyboardNav: 'Arrow keys adjust by step value',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=range]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'absolute positioned tick marks using w-0.5 vertical lines',
        'px-2 on wrapper aligns marks with track endpoints',
      ],
      inspirationSource: 'Ant Design Slider',
      craftDetails: ['-translate-y-4 positions marks above track', 'step=25 snaps to mark positions'],
    },
  },
  {
    id: 'slider-vertical',
    name: 'Vertical Slider',
    category: 'atom',
    type: 'slider',
    variant: 'soft-depth',
    tags: ['input', 'slider', 'soft-depth', 'volume'],
    mood: ['minimal', 'minimal'],
    industry: ['media', 'media', 'agency'],
    visualStyles: ['retro-playful', 'linear-modern'],
    jsx: `<div className="flex items-center gap-3">
  <label htmlFor="slider-vertical" className="text-sm font-medium text-foreground">
    Volume
  </label>
  <div className="relative flex h-48 items-center">
    <input
      type="range"
      id="slider-vertical"
      min="0"
      max="100"
      defaultValue="70"
      orient="vertical"
      className="h-full w-2 cursor-pointer appearance-none rounded-full bg-secondary [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-ring [&::-webkit-slider-thumb]:transition-all hover:[&::-webkit-slider-thumb]:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' }}
      aria-orientation="vertical"
    />
  </div>
  <div className="flex flex-col justify-between text-xs text-muted-foreground">
    <span>100</span>
    <span className="mt-auto">0</span>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex items-center gap-3',
      label: 'text-sm font-medium text-foreground',
      wrapper: 'relative flex h-48 items-center',
      input: 'h-full w-2 cursor-pointer appearance-none rounded-full bg-secondary',
      labels: 'flex flex-col justify-between text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['slider'],
      ariaAttributes: ['aria-orientation=vertical', 'label association'],
      keyboardNav: 'Up/Down arrows adjust value',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=range]' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'orient=vertical with writingMode for vertical orientation',
        'h-48 constrains vertical height for usable range',
      ],
      inspirationSource: 'Radix Slider vertical variant',
      craftDetails: [
        'WebkitAppearance slider-vertical for Safari support',
        'aria-orientation=vertical for screen readers',
      ],
    },
  },
];
