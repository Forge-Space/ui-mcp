import type { IComponentSnippet } from '../types.js';

export const inputSnippets: IComponentSnippet[] = [
  {
    id: 'input-default',
    name: 'Default Input',
    category: 'atom',
    type: 'input',
    variant: 'default',
    tags: ['form', 'text', 'field', 'energetic'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<div className="space-y-2">
  <label htmlFor="input-default" className="text-sm font-medium text-foreground">Label</label>
  <input
    id="input-default"
    type="text"
    placeholder="Enter text..."
    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    aria-required="false"
  />
</div>`,
    tailwindClasses: {
      wrapper: 'space-y-2',
      label: 'text-sm font-medium text-foreground',
      input:
        'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    },
    a11y: {
      roles: ['textbox'],
      ariaAttributes: ['aria-required', 'aria-invalid', 'aria-describedby'],
      keyboardNav: 'Tab to focus, type to input',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: ['visible label (not placeholder-only)', 'h-10 consistent height', 'ring-offset for layered focus'],
      inspirationSource: 'shadcn/ui Input',
      craftDetails: [
        'label always visible',
        'placeholder as hint not label',
        'transition-colors for smooth state change',
      ],
    },
  },
  {
    id: 'input-with-icon',
    name: 'Input with Icon',
    category: 'atom',
    type: 'input',
    variant: 'with-icon',
    tags: ['form', 'search', 'icon', 'energetic'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<div className="space-y-2">
  <label htmlFor="input-icon" className="text-sm font-medium text-foreground">Search</label>
  <div className="relative">
    <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
    <input
      id="input-icon"
      type="search"
      placeholder="Search..."
      className="flex h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
  </div>
</div>`,
    tailwindClasses: {
      wrapper: 'space-y-2',
      label: 'text-sm font-medium text-foreground',
      inputWrapper: 'relative',
      icon: 'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground',
      input:
        'flex h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    },
    a11y: {
      roles: ['searchbox'],
      ariaAttributes: ['aria-label'],
      htmlAttributes: ['autoComplete'],
      keyboardNav: 'Tab to focus, Escape to clear',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'icon vertically centered with translate-y-1/2',
        'pl-10 accounts for icon width + padding',
        'aria-hidden on decorative icon',
      ],
      inspirationSource: 'Linear search input',
      craftDetails: ['absolute positioning for icon', 'type=search for native clear button on mobile'],
    },
  },
  {
    id: 'input-floating-label',
    name: 'Floating Label Input',
    category: 'atom',
    type: 'input',
    variant: 'floating-label',
    tags: ['form', 'text', 'material', 'energetic', 'energetic'],
    mood: ['premium', 'professional'],
    industry: ['saas', 'fintech', 'ecommerce'],
    visualStyles: ['soft-depth', 'corporate-trust'],
    jsx: `<div className="relative">
  <input
    id="input-floating"
    type="text"
    placeholder=" "
    className="peer flex h-12 w-full rounded-lg border border-input bg-background px-3 pt-5 pb-1 text-sm text-foreground ring-offset-background transition-colors placeholder:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    aria-required="false"
  />
  <label
    htmlFor="input-floating"
    className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-200 peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
  >
    Email address
  </label>
</div>`,
    tailwindClasses: {
      wrapper: 'relative',
      input:
        'peer flex h-12 w-full rounded-lg border border-input bg-background px-3 pt-5 pb-1 text-sm text-foreground ring-offset-background transition-colors placeholder:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      label:
        'absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-200 peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs',
    },
    a11y: {
      roles: ['textbox'],
      ariaAttributes: ['aria-required', 'aria-invalid'],
      keyboardNav: 'Tab to focus, type to input',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'CSS-only floating label using peer modifier',
        'placeholder=" " trick for :not(:placeholder-shown)',
        'label turns primary on focus',
      ],
      inspirationSource: 'Material Design floating label',
      craftDetails: ['no JavaScript required', 'peer modifier for CSS-only state detection', 'smooth 200ms transition'],
    },
  },
  {
    id: 'input-textarea',
    name: 'Textarea',
    category: 'atom',
    type: 'textarea',
    variant: 'default',
    tags: ['form', 'multiline', 'text', 'energetic'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<div className="space-y-2">
  <label htmlFor="textarea-default" className="text-sm font-medium text-foreground">Message</label>
  <textarea
    id="textarea-default"
    placeholder="Type your message..."
    rows={4}
    className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
    aria-required="false"
  />
</div>`,
    tailwindClasses: {
      wrapper: 'space-y-2',
      label: 'text-sm font-medium text-foreground',
      textarea:
        'flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
    },
    a11y: {
      roles: ['textbox'],
      ariaAttributes: ['aria-required', 'aria-invalid', 'aria-describedby'],
      keyboardNav: 'Tab to focus, type to input',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'textarea' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: ['min-h-[80px] prevents collapsed textarea', 'resize-y allows vertical but not horizontal resize'],
      inspirationSource: 'shadcn/ui Textarea',
      craftDetails: ['consistent styling with input component', 'vertical resize only'],
    },
  },
  {
    id: 'input-password',
    name: 'Password Input with Toggle',
    category: 'atom',
    type: 'input',
    variant: 'password-toggle',
    tags: ['form', 'password', 'auth', 'security', 'energetic'],
    mood: ['professional'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['soft-depth', 'corporate-trust'],
    jsx: `<div className="space-y-2">
  <label htmlFor="input-password" className="text-sm font-medium text-foreground">Password</label>
  <div className="relative">
    <input
      id="input-password"
      type="password"
      placeholder="Enter password"
      autoComplete="current-password"
      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 pr-10 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      aria-required="true"
    />
    <button
      type="button"
      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Toggle password visibility"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
    </button>
  </div>
</div>`,
    tailwindClasses: {
      wrapper: 'space-y-2',
      label: 'text-sm font-medium text-foreground',
      inputWrapper: 'relative',
      input:
        'flex h-10 w-full rounded-lg border border-input bg-background px-3 pr-10 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      toggle:
        'absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      icon: 'h-4 w-4',
    },
    a11y: {
      roles: ['textbox'],
      ariaAttributes: ['aria-required', 'aria-label'],
      keyboardNav: 'Tab to focus input, Tab to toggle button',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'toggle button has its own focus ring',
        'autoComplete for browser autofill',
        'aria-label on toggle for screen readers',
      ],
      inspirationSource: 'shadcn/ui password input pattern',
      craftDetails: ['pr-10 accounts for toggle button', 'toggle is a separate focusable element'],
    },
  },
  {
    id: 'input-search',
    name: 'Search Input',
    category: 'atom',
    type: 'input',
    variant: 'search',
    tags: ['form', 'search', 'filter', 'energetic'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'minimal-editorial'],
    jsx: `<div className="space-y-2">
  <label htmlFor="input-search" className="text-sm font-medium text-foreground">Search</label>
  <div className="relative">
    <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
    <input
      id="input-search"
      type="search"
      placeholder="Search projects..."
      className="flex h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
  </div>
</div>`,
    tailwindClasses: {
      wrapper: 'space-y-2',
      label: 'text-sm font-medium text-foreground',
      inputWrapper: 'relative',
      icon: 'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground',
      input:
        'flex h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    },
    a11y: {
      roles: ['searchbox'],
      ariaAttributes: ['aria-label'],
      htmlAttributes: ['autoComplete'],
      keyboardNav: 'Tab to focus, Escape to clear',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'type="search" for native clear button',
        'left-aligned icon for search affordance',
        'pl-10 accounts for icon width',
      ],
      inspirationSource: 'Algolia search inputs',
      craftDetails: [
        'type=search provides native clear button on mobile',
        'absolute icon positioning with translate centering',
        'aria-hidden on decorative icon',
      ],
    },
  },
  {
    id: 'input-tags',
    name: 'Tags Input',
    category: 'atom',
    type: 'input',
    variant: 'tags',
    tags: ['form', 'multi-value', 'chips', 'energetic'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'devtools', 'general'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<div className="space-y-2">
  <label htmlFor="input-tags" className="text-sm font-medium text-foreground">Labels</label>
  <div className="flex min-h-[40px] w-full flex-wrap gap-1.5 rounded-lg border border-input bg-background px-2 py-1.5 ring-offset-background transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
    <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
      bug
      <button type="button" className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-sm text-primary hover:bg-primary/20" aria-label="Remove bug">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
      </button>
    </span>
    <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
      urgent
      <button type="button" className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-sm text-primary hover:bg-primary/20" aria-label="Remove urgent">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
      </button>
    </span>
    <input
      id="input-tags"
      type="text"
      placeholder="Add label..."
      className="flex-1 min-w-[120px] bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
    />
  </div>
</div>`,
    tailwindClasses: {
      wrapper: 'space-y-2',
      label: 'text-sm font-medium text-foreground',
      container:
        'flex min-h-[40px] w-full flex-wrap gap-1.5 rounded-lg border border-input bg-background px-2 py-1.5 ring-offset-background transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
      tag: 'inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary',
      removeButton: 'inline-flex h-3.5 w-3.5 items-center justify-center rounded-sm text-primary hover:bg-primary/20',
      input:
        'flex-1 min-w-[120px] bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    },
    a11y: {
      roles: ['textbox'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab to focus, Enter to add tag, Backspace to remove last tag',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'focus-within:ring-2 on container for unified focus',
        'flex-wrap allows tags to wrap',
        'min-w-[120px] on input prevents too-narrow input',
      ],
      inspirationSource: 'Linear issue labels',
      craftDetails: [
        'flex-wrap + gap-1.5 for flexible tag layout',
        'bg-transparent input integrates seamlessly',
        'remove button with hover:bg-primary/20 for feedback',
      ],
    },
  },
  {
    id: 'input-otp',
    name: 'OTP Input',
    category: 'atom',
    type: 'input',
    variant: 'otp',
    tags: ['form', 'auth', 'verification', 'security', 'energetic'],
    mood: ['professional', 'minimal'],
    industry: ['fintech', 'saas', 'general'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<div className="space-y-2">
  <label className="text-sm font-medium text-foreground">Verification Code</label>
  <div className="flex gap-2">
    <input
      type="text"
      maxLength={1}
      inputMode="numeric"
      pattern="[0-9]"
      className="flex h-12 w-12 items-center justify-center rounded-lg border border-input bg-background text-center text-lg font-semibold text-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Digit 1"
    />
    <input
      type="text"
      maxLength={1}
      inputMode="numeric"
      pattern="[0-9]"
      className="flex h-12 w-12 items-center justify-center rounded-lg border border-input bg-background text-center text-lg font-semibold text-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Digit 2"
    />
    <input
      type="text"
      maxLength={1}
      inputMode="numeric"
      pattern="[0-9]"
      className="flex h-12 w-12 items-center justify-center rounded-lg border border-input bg-background text-center text-lg font-semibold text-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Digit 3"
    />
    <input
      type="text"
      maxLength={1}
      inputMode="numeric"
      pattern="[0-9]"
      className="flex h-12 w-12 items-center justify-center rounded-lg border border-input bg-background text-center text-lg font-semibold text-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Digit 4"
    />
    <input
      type="text"
      maxLength={1}
      inputMode="numeric"
      pattern="[0-9]"
      className="flex h-12 w-12 items-center justify-center rounded-lg border border-input bg-background text-center text-lg font-semibold text-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Digit 5"
    />
    <input
      type="text"
      maxLength={1}
      inputMode="numeric"
      pattern="[0-9]"
      className="flex h-12 w-12 items-center justify-center rounded-lg border border-input bg-background text-center text-lg font-semibold text-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Digit 6"
    />
  </div>
</div>`,
    tailwindClasses: {
      wrapper: 'space-y-2',
      label: 'text-sm font-medium text-foreground',
      inputGroup: 'flex gap-2',
      input:
        'flex h-12 w-12 items-center justify-center rounded-lg border border-input bg-background text-center text-lg font-semibold text-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    },
    a11y: {
      roles: ['textbox'],
      ariaAttributes: ['aria-label', 'inputMode', 'pattern'],
      keyboardNav: 'Type digit to auto-advance, Backspace to go back',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'maxLength={1} enforces single digit',
        'inputMode="numeric" shows numeric keyboard on mobile',
        'text-center + font-semibold for digit emphasis',
      ],
      inspirationSource: 'Clerk OTP verification',
      craftDetails: [
        'h-12 w-12 square inputs for visual consistency',
        'pattern="[0-9]" for HTML5 validation',
        'aria-label per input for screen reader clarity',
      ],
    },
  },
  {
    id: 'input-textarea-auto',
    name: 'Auto-Resize Textarea',
    category: 'atom',
    type: 'textarea',
    variant: 'auto-resize',
    tags: ['form', 'multiline', 'text', 'energetic', 'energetic'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'minimal-editorial'],
    jsx: `<div className="space-y-2">
  <label htmlFor="textarea-auto" className="text-sm font-medium text-foreground">Message</label>
  <textarea
    id="textarea-auto"
    placeholder="Type your message..."
    rows={1}
    className="flex min-h-[40px] w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    aria-required="false"
  />
  <p className="text-xs text-muted-foreground">Auto-expands as you type</p>
</div>`,
    tailwindClasses: {
      wrapper: 'space-y-2',
      label: 'text-sm font-medium text-foreground',
      textarea:
        'flex min-h-[40px] w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      hint: 'text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['textbox'],
      ariaAttributes: ['aria-required', 'aria-invalid', 'aria-describedby'],
      keyboardNav: 'Tab to focus, type to input',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'textarea' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'resize-none prevents manual resize (JS handles auto-resize)',
        'rows={1} starts compact',
        'min-h-[40px] ensures minimum usable height',
      ],
      inspirationSource: 'ChatGPT message input',
      craftDetails: [
        'resize-none disables manual resize handle',
        'rows={1} minimal starting height',
        'JS would set height = scrollHeight on input',
      ],
    },
  },
  {
    id: 'input-select',
    name: 'Custom Select',
    category: 'atom',
    type: 'input',
    variant: 'select',
    tags: ['form', 'dropdown', 'select', 'energetic'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<div className="space-y-2">
  <label htmlFor="select-custom" className="text-sm font-medium text-foreground">Country</label>
  <button
    type="button"
    id="select-custom"
    className="flex h-10 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    aria-haspopup="listbox"
    aria-expanded="false"
  >
    <span>United States</span>
    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
  </button>
</div>`,
    tailwindClasses: {
      wrapper: 'space-y-2',
      label: 'text-sm font-medium text-foreground',
      trigger:
        'flex h-10 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      icon: 'h-4 w-4 text-muted-foreground',
    },
    a11y: {
      roles: ['button', 'listbox'],
      ariaAttributes: ['aria-haspopup', 'aria-expanded', 'aria-labelledby'],
      keyboardNav: 'Enter/Space to open, Arrow keys to navigate, Escape to close',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'button with aria-haspopup for accessible dropdown',
        'chevron icon indicates expandable nature',
        'hover:bg-accent for subtle interaction feedback',
      ],
      inspirationSource: 'Radix Select',
      craftDetails: [
        'justify-between positions text + icon',
        'h-10 matches input height for consistency',
        'aria-expanded toggles on open/close',
      ],
    },
  },
  {
    id: 'input-combobox',
    name: 'Combobox',
    category: 'atom',
    type: 'input',
    variant: 'combobox',
    tags: ['form', 'autocomplete', 'search', 'filter', 'energetic'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'devtools', 'general'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<div className="space-y-2">
  <label htmlFor="combobox" className="text-sm font-medium text-foreground">Assignee</label>
  <div className="relative">
    <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
    <input
      id="combobox"
      type="text"
      placeholder="Search users..."
      role="combobox"
      aria-expanded="false"
      aria-autocomplete="list"
      className="flex h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
  </div>
</div>`,
    tailwindClasses: {
      wrapper: 'space-y-2',
      label: 'text-sm font-medium text-foreground',
      inputWrapper: 'relative',
      icon: 'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground',
      input:
        'flex h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    },
    a11y: {
      roles: ['combobox'],
      ariaAttributes: ['aria-expanded', 'aria-autocomplete', 'aria-controls'],
      keyboardNav: 'Type to filter, Arrow keys to navigate, Enter to select',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'role="combobox" for ARIA semantics',
        'aria-autocomplete="list" for screen readers',
        'search icon indicates filtering capability',
      ],
      inspirationSource: 'Headless UI Combobox',
      craftDetails: [
        'role + aria-expanded for proper combobox pattern',
        'pl-10 accounts for search icon',
        'aria-autocomplete="list" indicates filtered results',
      ],
    },
  },
  {
    id: 'input-date-picker',
    name: 'Date Picker',
    category: 'atom',
    type: 'input',
    variant: 'date-picker',
    tags: ['form', 'date', 'calendar', 'energetic'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<div className="space-y-2">
  <label htmlFor="date-picker" className="text-sm font-medium text-foreground">Date</label>
  <button
    type="button"
    id="date-picker"
    className="flex h-10 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    aria-haspopup="dialog"
  >
    <span>February 24, 2026</span>
    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
  </button>
</div>`,
    tailwindClasses: {
      wrapper: 'space-y-2',
      label: 'text-sm font-medium text-foreground',
      trigger:
        'flex h-10 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      icon: 'h-4 w-4 text-muted-foreground',
    },
    a11y: {
      roles: ['button', 'dialog'],
      ariaAttributes: ['aria-haspopup', 'aria-expanded', 'aria-label'],
      keyboardNav: 'Enter/Space to open calendar, Arrow keys to navigate dates',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'button trigger with aria-haspopup="dialog"',
        'calendar icon for clear affordance',
        'formatted date display (not raw value)',
      ],
      inspirationSource: 'Cal.com date picker',
      craftDetails: [
        'justify-between positions date + icon',
        'hover:bg-accent for interaction feedback',
        'h-10 matches input height',
      ],
    },
  },
  {
    id: 'input-file-upload',
    name: 'File Upload',
    category: 'atom',
    type: 'input',
    variant: 'file-upload',
    tags: ['form', 'upload', 'file', 'dropzone', 'energetic'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<div className="space-y-2">
  <label className="text-sm font-medium text-foreground">Upload File</label>
  <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/50 px-6 py-8 text-center transition-colors hover:bg-muted/80 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
    <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
    <div className="space-y-1">
      <p className="text-sm font-medium text-foreground">
        <label htmlFor="file-upload" className="cursor-pointer text-primary hover:underline">
          Upload a file
        </label>
        <span className="text-muted-foreground"> or drag and drop</span>
      </p>
      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
    </div>
    <input
      id="file-upload"
      type="file"
      accept="image/png,image/jpeg,image/gif"
      className="sr-only"
      aria-label="Upload file"
    />
  </div>
</div>`,
    tailwindClasses: {
      wrapper: 'space-y-2',
      label: 'text-sm font-medium text-foreground',
      dropzone:
        'flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/50 px-6 py-8 text-center transition-colors hover:bg-muted/80 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
      icon: 'h-8 w-8 text-muted-foreground',
      textWrapper: 'space-y-1',
      primaryText: 'text-sm font-medium text-foreground',
      uploadLink: 'cursor-pointer text-primary hover:underline',
      secondaryText: 'text-muted-foreground',
      hint: 'text-xs text-muted-foreground',
      input: 'sr-only',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label', 'accept'],
      keyboardNav: 'Tab to focus, Enter/Space to open file dialog',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'border-dashed for dropzone affordance',
        'focus-within:border-ring for keyboard accessibility',
        'sr-only hides native input, custom UI replaces it',
      ],
      inspirationSource: 'Uploadthing dropzone',
      craftDetails: [
        'border-2 border-dashed for clear dropzone pattern',
        'bg-muted/50 hover:bg-muted/80 for interaction feedback',
        'accept attribute restricts file types',
      ],
    },
  },
];
