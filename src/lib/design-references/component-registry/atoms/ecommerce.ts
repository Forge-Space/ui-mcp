import type { IComponentSnippet } from '../types.js';

export const ecommerceAtomSnippets: IComponentSnippet[] = [
  {
    id: 'price-display',
    name: 'Price Display',
    category: 'atom',
    type: 'price',
    variant: 'display',
    tags: ['price', 'currency', 'sale', 'discount'],
    mood: ['professional', 'minimal'],
    industry: ['ecommerce'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="flex items-baseline gap-2">
  <span className="text-2xl font-bold text-foreground">$49.99</span>
  <span className="text-sm font-medium text-muted-foreground line-through">$79.99</span>
</div>`,
    tailwindClasses: {
      container: 'flex items-baseline gap-2',
      currentPrice: 'text-2xl font-bold text-foreground',
      originalPrice: 'text-sm font-medium text-muted-foreground line-through',
    },
    a11y: {
      roles: [],
      ariaAttributes: [],
      keyboardNav: 'N/A — display only',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'line-through on original price for clear sale indication',
        'muted-foreground for original price hierarchy',
        'text-2xl for price emphasis',
      ],
      inspirationSource: 'Stripe product cards',
      craftDetails: ['gap-2 for tight but readable spacing', 'items-baseline for optical alignment'],
    },
  },
  {
    id: 'star-rating',
    name: 'Star Rating',
    category: 'atom',
    type: 'rating',
    variant: 'stars',
    tags: ['rating', 'stars', 'review', 'score'],
    mood: ['professional', 'warm'],
    industry: ['ecommerce'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div role="img" aria-label="4 out of 5 stars" className="flex items-center gap-1">
  <svg className="h-4 w-4 fill-amber-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
  <svg className="h-4 w-4 fill-amber-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
  <svg className="h-4 w-4 fill-amber-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
  <svg className="h-4 w-4 fill-amber-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
  <svg className="h-4 w-4 fill-muted" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
</div>`,
    tailwindClasses: {
      container: 'flex items-center gap-1',
      starFilled: 'h-4 w-4 fill-amber-400',
      starEmpty: 'h-4 w-4 fill-muted',
    },
    a11y: {
      roles: ['img'],
      ariaAttributes: ['aria-label with rating value'],
      keyboardNav: 'N/A — display only',
      contrastRatio: 'N/A — icon-based',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'role="img" with aria-label for screen reader accessibility',
        'fill-amber-400 for filled stars',
        'fill-muted for empty stars',
      ],
      inspirationSource: 'Amazon product ratings',
      craftDetails: ['h-4 w-4 for compact star size', 'gap-1 for tight spacing'],
    },
  },
  {
    id: 'quantity-selector',
    name: 'Quantity Selector',
    category: 'atom',
    type: 'input',
    variant: 'quantity',
    tags: ['quantity', 'stepper', 'counter', 'input'],
    mood: ['professional', 'minimal'],
    industry: ['ecommerce'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="flex items-center rounded-md border border-input">
  <button
    type="button"
    aria-label="Decrease quantity"
    className="px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  >
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
  </button>
  <input
    type="number"
    min="1"
    value="1"
    role="spinbutton"
    aria-label="Quantity"
    className="w-12 border-x border-input bg-transparent px-2 py-2 text-center text-sm font-medium text-foreground focus-visible:outline-none"
  />
  <button
    type="button"
    aria-label="Increase quantity"
    className="px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  >
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  </button>
</div>`,
    tailwindClasses: {
      container: 'flex items-center rounded-md border border-input',
      button:
        'px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      input:
        'w-12 border-x border-input bg-transparent px-2 py-2 text-center text-sm font-medium text-foreground focus-visible:outline-none',
      icon: 'h-4 w-4',
    },
    a11y: {
      roles: ['button', 'spinbutton'],
      ariaAttributes: ['aria-label on buttons and input'],
      keyboardNav: 'Arrow keys for spinbutton, Enter/Space for buttons',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'role="spinbutton" on input for proper semantics',
        'aria-label on all interactive elements',
        'focus-visible:ring for keyboard focus',
      ],
      inspirationSource: 'Shopify cart quantity selector',
      craftDetails: [
        'border-x on input for visual separation',
        'w-12 for compact centered number',
        'hover:bg-muted for button feedback',
      ],
    },
  },
  {
    id: 'add-to-cart-button',
    name: 'Add to Cart Button',
    category: 'atom',
    type: 'button',
    variant: 'add-to-cart',
    tags: ['cart', 'cta', 'add', 'purchase'],
    mood: ['professional', 'energetic'],
    industry: ['ecommerce'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<button
  type="button"
  aria-label="Add to cart"
  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
>
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
  Add to Cart
</button>`,
    tailwindClasses: {
      button:
        'inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      icon: 'h-4 w-4',
    },
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label for screen readers'],
      keyboardNav: 'Enter and Space to activate',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'button' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'cart icon included for visual recognition',
        'disabled:opacity-50 for loading/disabled states',
        'focus-visible:ring for keyboard accessibility',
      ],
      inspirationSource: 'shadcn/ui Button with icon',
      craftDetails: [
        'gap-2 for icon-text spacing',
        'bg-primary for brand consistency',
        'hover:bg-primary/90 for subtle feedback',
      ],
    },
  },
  {
    id: 'inventory-badge',
    name: 'Inventory Badge',
    category: 'atom',
    type: 'badge',
    variant: 'inventory',
    tags: ['stock', 'inventory', 'availability', 'status'],
    mood: ['professional'],
    industry: ['ecommerce'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<!-- In Stock -->
<span role="status" className="inline-flex items-center gap-1.5 rounded-md bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success ring-1 ring-inset ring-success/20 dark:bg-success/10 dark:text-success dark:ring-success/20">
  <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
  In Stock
</span>

<!-- Low Stock -->
<span role="status" className="inline-flex items-center gap-1.5 rounded-md bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning ring-1 ring-inset ring-warning/20 dark:bg-warning/10 dark:text-warning dark:ring-warning/20">
  <span className="h-1.5 w-1.5 rounded-full bg-warning" aria-hidden="true" />
  Low Stock
</span>

<!-- Out of Stock -->
<span role="status" className="inline-flex items-center gap-1.5 rounded-md bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive ring-1 ring-inset ring-destructive/20 dark:bg-destructive/10 dark:text-destructive dark:ring-destructive/20">
  <span className="h-1.5 w-1.5 rounded-full bg-destructive" aria-hidden="true" />
  Out of Stock
</span>`,
    tailwindClasses: {
      inStock:
        'inline-flex items-center gap-1.5 rounded-md bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success ring-1 ring-inset ring-success/20 dark:bg-success/10 dark:text-success dark:ring-success/20',
      lowStock:
        'inline-flex items-center gap-1.5 rounded-md bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning ring-1 ring-inset ring-warning/20 dark:bg-warning/10 dark:text-warning dark:ring-warning/20',
      outOfStock:
        'inline-flex items-center gap-1.5 rounded-md bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive ring-1 ring-inset ring-destructive/20 dark:bg-destructive/10 dark:text-destructive dark:ring-destructive/20',
      dot: 'h-1.5 w-1.5 rounded-full',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-hidden on dot indicator'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'span' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'dot indicator — not color-only',
        'semantic color coding (success/warning/destructive)',
        'ring-inset for subtle border',
        'dark mode variants included',
      ],
      inspirationSource: 'Tailwind UI status badges',
      craftDetails: [
        'success for in-stock, warning for low-stock, destructive for out-of-stock',
        'consistent structure across all variants',
        'role="status" for semantic meaning',
      ],
    },
  },
];
