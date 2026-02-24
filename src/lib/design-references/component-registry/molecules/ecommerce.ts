import type { IComponentSnippet } from '../types.js';

export const ecommerceMoleculeSnippets: IComponentSnippet[] = [
  {
    id: 'product-card',
    name: 'Product Card',
    category: 'molecule',
    type: 'card',
    variant: 'product',
    tags: ['product', 'card', 'listing', 'shop'],
    mood: ['professional', 'minimal'],
    industry: ['ecommerce'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<article className="group relative overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md">
  <div className="relative aspect-square overflow-hidden bg-muted">
    <img
      src="https://placehold.co/400x400/e2e8f0/64748b?text=Product"
      alt="Product name"
      className="h-full w-full object-cover transition-transform group-hover:scale-105"
    />
    <span className="absolute right-2 top-2 rounded-full bg-destructive px-2.5 py-0.5 text-xs font-semibold text-destructive-foreground">
      Sale
    </span>
  </div>
  <div className="space-y-2 p-4">
    <h3 className="line-clamp-2 text-base font-semibold text-foreground">
      Premium Product Name
    </h3>
    <div className="flex items-baseline gap-2">
      <span className="text-lg font-bold text-foreground">$79.99</span>
      <span className="text-sm text-muted-foreground line-through">$99.99</span>
    </div>
    <div className="flex items-center gap-1" aria-label="4.5 out of 5 stars">
      <svg className="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      <svg className="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      <svg className="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      <svg className="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      <svg className="h-4 w-4 fill-muted text-muted" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      <span className="ml-1 text-xs text-muted-foreground">(128)</span>
    </div>
    <button
      type="button"
      className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
      aria-label="Add Premium Product Name to cart"
    >
      Add to Cart
    </button>
  </div>
</article>`,
    tailwindClasses: {
      article: 'group relative overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md',
      imageWrapper: 'relative aspect-square overflow-hidden bg-muted',
      image: 'h-full w-full object-cover transition-transform group-hover:scale-105',
      badge:
        'absolute right-2 top-2 rounded-full bg-destructive px-2.5 py-0.5 text-xs font-semibold text-destructive-foreground',
      content: 'space-y-2 p-4',
      title: 'line-clamp-2 text-base font-semibold text-foreground',
      priceWrapper: 'flex items-baseline gap-2',
      price: 'text-lg font-bold text-foreground',
      originalPrice: 'text-sm text-muted-foreground line-through',
      rating: 'flex items-center gap-1',
      button:
        'w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]',
    },
    a11y: {
      roles: ['article'],
      ariaAttributes: ['aria-label on button', 'aria-label on rating', 'alt text on image'],
      keyboardNav: 'Tab to button, Enter to add to cart',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'article', landmark: 'complementary' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'group-hover:scale-105 on image for zoom effect',
        'aspect-square for consistent product grid',
        'line-clamp-2 for title overflow',
        'active:scale-[0.98] for tactile button feedback',
      ],
      inspirationSource: 'Shopify product cards',
      craftDetails: [
        'sale badge absolutely positioned',
        'star rating with review count',
        'strikethrough original price on sale',
      ],
    },
  },
  {
    id: 'product-filters',
    name: 'Product Filters',
    category: 'molecule',
    type: 'filter',
    variant: 'sidebar',
    tags: ['filter', 'sidebar', 'search', 'facets'],
    mood: ['professional', 'minimal'],
    industry: ['ecommerce'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<nav aria-label="Product filters" className="space-y-6 rounded-lg border bg-card p-4">
  <div>
    <h3 className="mb-3 text-sm font-semibold text-foreground">Category</h3>
    <fieldset className="space-y-2">
      <legend className="sr-only">Filter by category</legend>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <input type="checkbox" className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2" />
        <span>Electronics (234)</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <input type="checkbox" className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2" />
        <span>Clothing (156)</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <input type="checkbox" className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2" />
        <span>Home & Garden (98)</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <input type="checkbox" className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2" />
        <span>Sports (67)</span>
      </label>
    </fieldset>
  </div>
  <div className="border-t pt-6">
    <h3 className="mb-3 text-sm font-semibold text-foreground">Price Range</h3>
    <fieldset className="space-y-3">
      <legend className="sr-only">Filter by price range</legend>
      <div className="flex items-center gap-2">
        <label htmlFor="price-min" className="sr-only">Minimum price</label>
        <input
          type="number"
          id="price-min"
          placeholder="Min"
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
        <span className="text-muted-foreground">–</span>
        <label htmlFor="price-max" className="sr-only">Maximum price</label>
        <input
          type="number"
          id="price-max"
          placeholder="Max"
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </fieldset>
  </div>
  <div className="border-t pt-6">
    <h3 className="mb-3 text-sm font-semibold text-foreground">Rating</h3>
    <fieldset className="space-y-2">
      <legend className="sr-only">Filter by rating</legend>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <input type="checkbox" className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2" />
        <span className="flex items-center gap-1">
          <svg className="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          4 & up (89)
        </span>
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <input type="checkbox" className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2" />
        <span className="flex items-center gap-1">
          <svg className="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          3 & up (145)
        </span>
      </label>
    </fieldset>
  </div>
</nav>`,
    tailwindClasses: {
      nav: 'space-y-6 rounded-lg border bg-card p-4',
      heading: 'mb-3 text-sm font-semibold text-foreground',
      fieldset: 'space-y-2',
      label:
        'flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground',
      checkbox:
        'h-4 w-4 rounded border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2',
      divider: 'border-t pt-6',
      priceInputWrapper: 'flex items-center gap-2',
      input:
        'flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    },
    a11y: {
      roles: ['navigation'],
      ariaAttributes: ['aria-label="Product filters"', 'fieldset with legend (sr-only)'],
      keyboardNav: 'Tab through inputs, Space to toggle checkboxes',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first', breakpoints: ['lg'] },
    quality: {
      antiGeneric: [
        'fieldset + legend for semantic grouping',
        'product counts in parentheses',
        'sr-only legends for screen readers',
        'cursor-pointer on labels for better UX',
      ],
      inspirationSource: 'Amazon sidebar filters',
      craftDetails: [
        'border-t dividers between sections',
        'star icons in rating filters',
        'min/max price inputs with separator',
      ],
    },
  },
  {
    id: 'cart-item',
    name: 'Cart Item',
    category: 'molecule',
    type: 'card',
    variant: 'cart-item',
    tags: ['cart', 'item', 'line-item', 'order'],
    mood: ['professional', 'minimal'],
    industry: ['ecommerce'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="flex gap-4 rounded-lg border bg-card p-4">
  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
    <img
      src="https://placehold.co/64x64/e2e8f0/64748b?text=Item"
      alt="Product thumbnail"
      className="h-full w-full object-cover"
    />
  </div>
  <div className="flex flex-1 flex-col gap-2">
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-medium text-foreground">Premium Product Name</h3>
        <p className="text-xs text-muted-foreground">Size: L, Color: Navy</p>
      </div>
      <button
        type="button"
        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Remove Premium Product Name from cart"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          aria-label="Decrease quantity"
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
        <label htmlFor="quantity-1" className="sr-only">Quantity</label>
        <input
          type="number"
          id="quantity-1"
          min="1"
          value="1"
          className="h-7 w-12 rounded-md border border-input bg-background text-center text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          aria-label="Item quantity"
        />
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          aria-label="Increase quantity"
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
          </svg>
        </button>
      </div>
      <p className="text-sm font-semibold text-foreground">$79.99</p>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex gap-4 rounded-lg border bg-card p-4',
      thumbnail: 'h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted',
      image: 'h-full w-full object-cover',
      content: 'flex flex-1 flex-col gap-2',
      header: 'flex items-start justify-between gap-2',
      details: 'min-w-0 flex-1',
      title: 'text-sm font-medium text-foreground',
      variant: 'text-xs text-muted-foreground',
      removeButton:
        'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      footer: 'flex items-center justify-between gap-4',
      quantityWrapper: 'flex items-center gap-2',
      quantityButton:
        'flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
      quantityInput:
        'h-7 w-12 rounded-md border border-input bg-background text-center text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
      price: 'text-sm font-semibold text-foreground',
    },
    a11y: {
      roles: [],
      ariaAttributes: ['aria-label on buttons', 'aria-label on quantity input', 'sr-only label for quantity'],
      keyboardNav: 'Tab through buttons and input, Enter/Space to increment/decrement',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'quantity selector with +/- buttons',
        'remove button with hover:bg-destructive/10',
        'variant text (Size, Color) below title',
        '[appearance:textfield] to hide number input spinner',
      ],
      inspirationSource: 'Stripe checkout cart items',
      craftDetails: [
        'h-16 w-16 thumbnail for consistency',
        'min-w-0 flex-1 for text truncation',
        'gap-4 spacing between thumbnail and content',
      ],
    },
  },
  {
    id: 'order-summary',
    name: 'Order Summary',
    category: 'molecule',
    type: 'card',
    variant: 'order-summary',
    tags: ['summary', 'total', 'order', 'checkout'],
    mood: ['professional', 'corporate'],
    industry: ['ecommerce'],
    visualStyles: ['soft-depth', 'corporate-trust'],
    jsx: `<aside aria-label="Order summary" className="space-y-4 rounded-lg border bg-card p-6">
  <h3 className="text-lg font-semibold text-foreground">Order Summary</h3>
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">Subtotal</span>
      <span className="font-medium text-foreground">$159.98</span>
    </div>
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">Shipping</span>
      <span className="font-medium text-foreground">$8.00</span>
    </div>
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">Tax</span>
      <span className="font-medium text-foreground">$13.44</span>
    </div>
  </div>
  <div className="border-t pt-4">
    <div className="flex items-center justify-between">
      <span className="text-base font-semibold text-foreground">Total</span>
      <span className="text-xl font-bold text-foreground">$181.42</span>
    </div>
  </div>
  <button
    type="button"
    className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
  >
    Proceed to Checkout
  </button>
</aside>`,
    tailwindClasses: {
      aside: 'space-y-4 rounded-lg border bg-card p-6',
      heading: 'text-lg font-semibold text-foreground',
      list: 'space-y-2',
      row: 'flex items-center justify-between text-sm',
      label: 'text-muted-foreground',
      value: 'font-medium text-foreground',
      divider: 'border-t pt-4',
      totalRow: 'flex items-center justify-between',
      totalLabel: 'text-base font-semibold text-foreground',
      totalValue: 'text-xl font-bold text-foreground',
      button:
        'w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]',
    },
    a11y: {
      roles: [],
      ariaAttributes: ['aria-label="Order summary"'],
      keyboardNav: 'Tab to checkout button, Enter to proceed',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'aside', landmark: 'complementary' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'semantic aside element for landmark',
        'border-t separator before total',
        'text-xl font-bold for total price hierarchy',
        'py-3 larger button padding for prominence',
      ],
      inspirationSource: 'Shopify checkout summary',
      craftDetails: [
        'space-y-2 for tight line item spacing',
        'pt-4 after border-t for visual balance',
        'active:scale-[0.98] for tactile feedback',
      ],
    },
  },
];
