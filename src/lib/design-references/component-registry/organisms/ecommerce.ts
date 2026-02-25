import type { IComponentSnippet } from '../types.js';

export const ecommerceOrganismSnippets: IComponentSnippet[] = [
  {
    id: 'product-gallery',
    name: 'Product Gallery',
    category: 'organism',
    type: 'media',
    variant: 'ecommerce',
    tags: ['media', 'images', 'ecommerce', 'zoom'],
    mood: ['professional', 'minimal'],
    industry: ['ecommerce'],
    visualStyles: ['soft-depth', 'minimal-editorial'],
    jsx: `<div role="group" aria-label="Product images" className="space-y-4">
  <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted">
    <img src="/api/placeholder/800/800" alt="Main product view" className="h-full w-full object-cover object-center" />
  </div>
  <div className="flex gap-2">
    <button type="button" aria-current="true" className="h-16 w-16 overflow-hidden rounded-md border-2 border-primary ring-2 ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <img src="/api/placeholder/64/64" alt="Product thumbnail 1" className="h-full w-full object-cover" />
    </button>
    <button type="button" className="h-16 w-16 overflow-hidden rounded-md border border-input opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <img src="/api/placeholder/64/64" alt="Product thumbnail 2" className="h-full w-full object-cover" />
    </button>
    <button type="button" className="h-16 w-16 overflow-hidden rounded-md border border-input opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <img src="/api/placeholder/64/64" alt="Product thumbnail 3" className="h-full w-full object-cover" />
    </button>
    <button type="button" className="h-16 w-16 overflow-hidden rounded-md border border-input opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <img src="/api/placeholder/64/64" alt="Product thumbnail 4" className="h-full w-full object-cover" />
    </button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'space-y-4',
      mainImage: 'aspect-square w-full overflow-hidden rounded-lg bg-muted',
      thumbnailGrid: 'flex gap-2',
      thumbnailSelected: 'h-16 w-16 overflow-hidden rounded-md border-2 border-primary ring-2 ring-primary',
      thumbnail: 'h-16 w-16 overflow-hidden rounded-md border border-input opacity-60 hover:opacity-100',
    },
    a11y: {
      roles: ['group'],
      ariaAttributes: ['aria-label', 'aria-current'],
      keyboardNav: 'Tab between thumbnails, Enter/Space to select',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: ['ring-2 for selected state not just border', 'opacity transition for non-selected'],
      inspirationSource: 'Apple product pages',
      craftDetails: ['aspect-square for consistent sizing', 'focus-visible ring for keyboard users'],
    },
  },
  {
    id: 'product-grid',
    name: 'Product Grid with Filters',
    category: 'organism',
    type: 'grid',
    variant: 'product-listing',
    tags: ['grid', 'listing', 'products', 'catalog'],
    mood: ['professional', 'minimal'],
    industry: ['ecommerce'],
    visualStyles: ['soft-depth', 'minimal-editorial'],
    jsx: `<section aria-label="Product listing">
  <div className="flex gap-6">
    <aside className="hidden w-64 space-y-6 lg:block">
      <div>
        <h3 className="mb-3 text-sm font-semibold">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="rounded border-input" />
            <span>Electronics</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="rounded border-input" />
            <span>Clothing</span>
          </label>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold">Price Range</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="rounded border-input" />
            <span>Under $25</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="rounded border-input" />
            <span>$25 - $50</span>
          </label>
        </div>
      </div>
    </aside>
    <main className="flex-1">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing 24 of 96 products</p>
        <select className="rounded-md border border-input bg-background px-3 py-2 text-sm">
          <option>Sort by: Featured</option>
          <option>Price: Low to High</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="group overflow-hidden rounded-lg border bg-card">
            <div className="aspect-square bg-muted" />
            <div className="p-3">
              <h3 className="text-sm font-medium">Product Name</h3>
              <p className="text-lg font-semibold">$29.99</p>
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="Pagination" className="mt-8 flex justify-center gap-2">
        <button className="rounded-md border border-input px-3 py-2 text-sm hover:bg-accent">Previous</button>
        <button className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">1</button>
        <button className="rounded-md border border-input px-3 py-2 text-sm hover:bg-accent">Next</button>
      </nav>
    </main>
  </div>
</section>`,
    tailwindClasses: {
      layout: 'flex gap-6',
      sidebar: 'hidden w-64 space-y-6 lg:block',
      grid: 'grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4',
      productCard: 'group overflow-hidden rounded-lg border bg-card',
      pagination: 'mt-8 flex justify-center gap-2',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab through filters, grid items, and pagination',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', landmark: 'main' },
    responsive: { strategy: 'mobile-first', breakpoints: ['md', 'lg'] },
    quality: {
      antiGeneric: ['sidebar hidden on mobile not just collapsed', 'responsive grid 2→3→4 columns'],
      inspirationSource: 'Shopify storefront themes',
      craftDetails: ['group hover for card interactions', 'sticky sidebar on desktop'],
    },
  },
  {
    id: 'cart-summary',
    name: 'Cart Summary',
    category: 'organism',
    type: 'section',
    variant: 'cart',
    tags: ['cart', 'ecommerce', 'summary', 'order'],
    mood: ['professional', 'corporate'],
    industry: ['ecommerce'],
    visualStyles: ['soft-depth', 'corporate-trust'],
    jsx: `<section className="container mx-auto px-4 py-8">
  <h2 className="mb-6 text-2xl font-bold">Shopping Cart (3 items)</h2>
  <div className="flex flex-col gap-8 lg:flex-row">
    <div className="flex-1 space-y-4">
      <div className="flex gap-4 rounded-lg border bg-card p-4">
        <div className="h-24 w-24 shrink-0 rounded-md bg-muted" />
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="font-medium">Premium Wireless Headphones</h3>
            <p className="text-sm text-muted-foreground">Black, Standard</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="h-8 w-8 rounded-md border border-input hover:bg-accent">-</button>
              <span className="w-8 text-center">1</span>
              <button className="h-8 w-8 rounded-md border border-input hover:bg-accent">+</button>
            </div>
            <p className="font-semibold">$129.99</p>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-destructive" aria-label="Remove item">×</button>
      </div>
    </div>
    <aside className="lg:sticky lg:top-4 lg:h-fit lg:w-96">
      <div className="space-y-4 rounded-lg border bg-card p-6">
        <h3 className="text-lg font-semibold">Order Summary</h3>
        <div className="space-y-2 border-b pb-4">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>$479.96</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span>$12.00</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tax</span><span>$38.40</span></div>
        </div>
        <div className="flex justify-between text-lg font-bold"><span>Total</span><span>$530.36</span></div>
        <button className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">Proceed to Checkout</button>
        <a href="#" className="block text-center text-sm text-primary hover:underline">Continue Shopping</a>
      </div>
    </aside>
  </div>
</section>`,
    tailwindClasses: {
      layout: 'flex flex-col gap-8 lg:flex-row',
      cartItem: 'flex gap-4 rounded-lg border bg-card p-4',
      sidebar: 'lg:sticky lg:top-4 lg:h-fit lg:w-96',
      summaryCard: 'space-y-4 rounded-lg border bg-card p-6',
      checkoutButton: 'w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab through quantity controls and action buttons',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section' },
    responsive: { strategy: 'mobile-first', breakpoints: ['lg'] },
    quality: {
      antiGeneric: ['sticky summary sidebar on desktop', 'semantic heading hierarchy h2→h3'],
      inspirationSource: 'Stripe checkout cart summary',
      craftDetails: ['hover:text-destructive on remove for clear intent', 'lg:h-fit for natural height'],
    },
  },
  {
    id: 'checkout-form',
    name: 'Checkout Form',
    category: 'organism',
    type: 'form',
    variant: 'ecommerce',
    tags: ['ecommerce', 'form', 'payment', 'shipping'],
    mood: ['professional', 'corporate'],
    industry: ['ecommerce'],
    visualStyles: ['soft-depth', 'corporate-trust'],
    jsx: `<form className="mx-auto max-w-2xl space-y-8 rounded-lg border bg-card p-6 shadow-sm">
  <fieldset className="space-y-4">
    <legend className="mb-4 text-xl font-semibold">Shipping Information</legend>
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
        <input id="firstName" type="text" required aria-required="true" autoComplete="given-name" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      </div>
      <div className="space-y-2">
        <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
        <input id="lastName" type="text" required aria-required="true" autoComplete="family-name" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      </div>
    </div>
    <div className="space-y-2">
      <label htmlFor="address" className="text-sm font-medium">Address</label>
      <input id="address" type="text" required aria-required="true" autoComplete="street-address" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
    </div>
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="space-y-2">
        <label htmlFor="city" className="text-sm font-medium">City</label>
        <input id="city" type="text" required aria-required="true" autoComplete="address-level2" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      </div>
      <div className="space-y-2">
        <label htmlFor="state" className="text-sm font-medium">State</label>
        <input id="state" type="text" required aria-required="true" autoComplete="address-level1" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      </div>
      <div className="space-y-2">
        <label htmlFor="zip" className="text-sm font-medium">ZIP</label>
        <input id="zip" type="text" required aria-required="true" autoComplete="postal-code" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      </div>
    </div>
    <div className="space-y-2">
      <label htmlFor="country" className="text-sm font-medium">Country</label>
      <select id="country" required aria-required="true" autoComplete="country-name" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <option value="">Select country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="UK">United Kingdom</option>
      </select>
    </div>
  </fieldset>
  <fieldset className="space-y-4">
    <legend className="mb-4 text-xl font-semibold">Payment Information</legend>
    <div className="space-y-2">
      <label htmlFor="cardNumber" className="text-sm font-medium">Card Number</label>
      <input id="cardNumber" type="text" required aria-required="true" autoComplete="cc-number" placeholder="1234 5678 9012 3456" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <label htmlFor="expiry" className="text-sm font-medium">Expiry Date</label>
        <input id="expiry" type="text" required aria-required="true" autoComplete="cc-exp" placeholder="MM/YY" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      </div>
      <div className="space-y-2">
        <label htmlFor="cvv" className="text-sm font-medium">CVV</label>
        <input id="cvv" type="text" required aria-required="true" autoComplete="cc-csc" placeholder="123" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      </div>
    </div>
    <div className="space-y-2">
      <label htmlFor="cardName" className="text-sm font-medium">Cardholder Name</label>
      <input id="cardName" type="text" required aria-required="true" autoComplete="cc-name" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
    </div>
  </fieldset>
  <button type="submit" className="w-full rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Place Order</button>
  <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
    <span>🔒 Secure Checkout</span>
    <span>📦 Free Returns</span>
  </div>
</form>`,
    tailwindClasses: {
      form: 'mx-auto max-w-2xl space-y-8 rounded-lg border bg-card p-6 shadow-sm',
      fieldset: 'space-y-4',
      legend: 'mb-4 text-xl font-semibold',
      input:
        'w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      submitButton: 'w-full rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground',
      trustBadges: 'flex items-center justify-center gap-6 text-sm text-muted-foreground',
    },
    a11y: {
      roles: ['form'],
      ariaAttributes: ['aria-required', 'autocomplete'],
      keyboardNav: 'Tab through form fields, Enter to submit',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'form' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: ['fieldset/legend for semantic grouping', 'autocomplete attributes for autofill'],
      inspirationSource: 'Stripe Checkout',
      craftDetails: ['focus-visible ring on all inputs', 'trust badges for conversion optimization'],
    },
  },
];
