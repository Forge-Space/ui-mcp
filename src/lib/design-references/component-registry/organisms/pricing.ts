import type { IComponentSnippet } from '../types.js';

export const pricingSnippets: IComponentSnippet[] = [
  {
    id: 'pricing-three-tier',
    name: 'Three-Tier Pricing',
    category: 'organism',
    type: 'pricing',
    variant: 'three-tier',
    tags: ['pricing', 'tiers', 'plans', 'saas'],
    mood: ['professional', 'minimal', 'corporate'],
    industry: ['saas', 'startup'],
    visualStyles: ['minimal-editorial', 'corporate-trust', 'soft-depth'],
    jsx: `<section className="py-20 sm:py-28" aria-labelledby="pricing-heading">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 id="pricing-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Simple, transparent pricing</h2>
      <p className="mt-4 text-lg text-muted-foreground">Choose the plan that fits your needs. Always flexible, cancel anytime.</p>
    </div>
    <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
      <div className="rounded-2xl border bg-card p-8">
        <h3 className="text-lg font-semibold text-foreground">Starter</h3>
        <p className="mt-2 text-sm text-muted-foreground">For individuals and small teams getting started.</p>
        <p className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">$19</span>
          <span className="text-sm text-muted-foreground">/month</span>
        </p>
        <a href="/signup?plan=starter" className="mt-8 block w-full rounded-lg border border-input bg-background py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Get Started</a>
        <ul className="mt-8 space-y-3" role="list">
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Up to 5 team members</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">10 GB storage</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Email support</span>
          </li>
        </ul>
      </div>
      <div className="relative rounded-2xl border-2 border-primary bg-card p-8 shadow-lg">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">Most Popular</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground">Pro</h3>
        <p className="mt-2 text-sm text-muted-foreground">For growing teams that need more power.</p>
        <p className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">$49</span>
          <span className="text-sm text-muted-foreground">/month</span>
        </p>
        <a href="/signup?plan=pro" className="mt-8 block w-full rounded-lg bg-primary py-2.5 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Get Started</a>
        <ul className="mt-8 space-y-3" role="list">
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Up to 20 team members</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">100 GB storage</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Priority support</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Advanced analytics</span>
          </li>
        </ul>
      </div>
      <div className="rounded-2xl border bg-card p-8">
        <h3 className="text-lg font-semibold text-foreground">Enterprise</h3>
        <p className="mt-2 text-sm text-muted-foreground">For large organizations with custom needs.</p>
        <p className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">Custom</span>
        </p>
        <a href="/contact-sales" className="mt-8 block w-full rounded-lg border border-input bg-background py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Contact Sales</a>
        <ul className="mt-8 space-y-3" role="list">
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Unlimited team members</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Unlimited storage</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Dedicated support</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Custom integrations</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      section: 'py-20 sm:py-28',
      grid: 'mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3',
      card: 'rounded-2xl border bg-card p-8',
      cardFeatured: 'relative rounded-2xl border-2 border-primary bg-card p-8 shadow-lg',
      badge:
        'absolute -top-4 left-1/2 -translate-x-1/2 inline-flex rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground',
      price: 'mt-6 flex items-baseline gap-1 text-4xl font-bold text-foreground',
      featureList: 'mt-8 space-y-3',
      featureItem: 'flex items-start gap-3',
    },
    a11y: {
      roles: ['region', 'minimal-editorial'],
      ariaAttributes: ['aria-labelledby'],
      keyboardNav: 'Tab through CTA buttons',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'featured plan with border-2 border-primary',
        'badge positioned absolutely above card',
        'shadow-lg on featured card for elevation',
        'different CTA styles for featured vs non-featured',
      ],
      inspirationSource: 'Vercel pricing',
      craftDetails: [
        'rounded-2xl for premium feel',
        'space-y-3 for feature list breathing room',
        'shrink-0 on checkmark icons to prevent squishing',
      ],
    },
  },
  {
    id: 'pricing-comparison-table',
    name: 'Pricing Comparison Table',
    category: 'organism',
    type: 'pricing',
    variant: 'comparison-table',
    tags: ['pricing', 'comparison', 'table', 'features'],
    mood: ['professional', 'corporate'],
    industry: ['saas', 'fintech', 'saas'],
    visualStyles: ['corporate-trust', 'minimal-editorial'],
    jsx: `<section className="py-20 sm:py-28" aria-labelledby="comparison-heading">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 id="comparison-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Compare plans</h2>
      <p className="mt-4 text-lg text-muted-foreground">Find the perfect plan for your team size and needs.</p>
    </div>
    <div className="mt-16 overflow-x-auto">
      <table className="w-full border-collapse" role="table">
        <thead>
          <tr className="border-b">
            <th scope="col" className="pb-4 pr-4 text-left text-sm font-semibold text-foreground">Features</th>
            <th scope="col" className="px-4 pb-4 text-center">
              <div className="text-sm font-semibold text-foreground">Free</div>
              <div className="mt-1 text-2xl font-bold text-foreground">$0</div>
            </th>
            <th scope="col" className="px-4 pb-4 text-center">
              <div className="text-sm font-semibold text-foreground">Pro</div>
              <div className="mt-1 text-2xl font-bold text-foreground">$29</div>
            </th>
            <th scope="col" className="px-4 pb-4 text-center">
              <div className="text-sm font-semibold text-foreground">Enterprise</div>
              <div className="mt-1 text-2xl font-bold text-foreground">Custom</div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          <tr>
            <th scope="row" className="py-4 pr-4 text-left text-sm font-medium text-foreground">Users</th>
            <td className="px-4 py-4 text-center text-sm text-muted-foreground">1</td>
            <td className="px-4 py-4 text-center text-sm text-muted-foreground">Up to 10</td>
            <td className="px-4 py-4 text-center text-sm text-muted-foreground">Unlimited</td>
          </tr>
          <tr>
            <th scope="row" className="py-4 pr-4 text-left text-sm font-medium text-foreground">Storage</th>
            <td className="px-4 py-4 text-center text-sm text-muted-foreground">5 GB</td>
            <td className="px-4 py-4 text-center text-sm text-muted-foreground">100 GB</td>
            <td className="px-4 py-4 text-center text-sm text-muted-foreground">Unlimited</td>
          </tr>
          <tr>
            <th scope="row" className="py-4 pr-4 text-left text-sm font-medium text-foreground">API Access</th>
            <td className="px-4 py-4 text-center">
              <svg className="mx-auto h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              <span className="sr-only">Not included</span>
            </td>
            <td className="px-4 py-4 text-center">
              <svg className="mx-auto h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              <span className="sr-only">Included</span>
            </td>
            <td className="px-4 py-4 text-center">
              <svg className="mx-auto h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              <span className="sr-only">Included</span>
            </td>
          </tr>
          <tr>
            <th scope="row" className="py-4 pr-4 text-left text-sm font-medium text-foreground">Priority Support</th>
            <td className="px-4 py-4 text-center">
              <svg className="mx-auto h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              <span className="sr-only">Not included</span>
            </td>
            <td className="px-4 py-4 text-center">
              <svg className="mx-auto h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              <span className="sr-only">Not included</span>
            </td>
            <td className="px-4 py-4 text-center">
              <svg className="mx-auto h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              <span className="sr-only">Included</span>
            </td>
          </tr>
          <tr>
            <th scope="row" className="py-4 pr-4 text-left text-sm font-medium text-foreground">SSO</th>
            <td className="px-4 py-4 text-center">
              <svg className="mx-auto h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              <span className="sr-only">Not included</span>
            </td>
            <td className="px-4 py-4 text-center">
              <svg className="mx-auto h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              <span className="sr-only">Not included</span>
            </td>
            <td className="px-4 py-4 text-center">
              <svg className="mx-auto h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              <span className="sr-only">Included</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      section: 'py-20 sm:py-28',
      tableWrapper: 'mt-16 overflow-x-auto',
      table: 'w-full border-collapse',
      thead: 'border-b',
      tbody: 'divide-y',
      thRow: 'py-4 pr-4 text-left text-sm font-medium text-foreground',
      td: 'px-4 py-4 text-center text-sm text-muted-foreground',
    },
    a11y: {
      roles: ['region', 'table'],
      ariaAttributes: ['aria-labelledby', 'scope'],
      htmlAttributes: ['sr-only for icon labels'],
      keyboardNav: 'N/A — content table',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'semantic table with scope attributes',
        'sr-only text for icon meaning',
        'overflow-x-auto for mobile scrolling',
        'green checkmarks vs gray X for visual clarity',
      ],
      inspirationSource: 'GitHub pricing comparison',
      craftDetails: [
        'divide-y on tbody for row separators',
        'mx-auto on icons for centering',
        'text-success for positive indicators',
      ],
    },
  },
  {
    id: 'pricing-toggle-annual',
    name: 'Pricing with Monthly/Annual Toggle',
    category: 'organism',
    type: 'pricing',
    variant: 'toggle-annual',
    tags: ['pricing', 'toggle', 'annual', 'monthly'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'startup'],
    visualStyles: ['minimal-editorial', 'soft-depth'],
    jsx: `<section className="py-20 sm:py-28" aria-labelledby="pricing-toggle-heading">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 id="pricing-toggle-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Pricing that scales with you</h2>
      <p className="mt-4 text-lg text-muted-foreground">Save 20% with annual billing</p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">Monthly</span>
        <button type="button" role="switch" aria-checked="false" className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-muted transition-colors hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <span className="pointer-events-none inline-block h-5 w-5 translate-x-0 rounded-full bg-background shadow ring-0 transition-transform group-aria-checked:translate-x-5" aria-hidden="true"></span>
        </button>
        <span className="text-sm font-medium text-foreground">Annual</span>
        <span className="inline-flex items-center rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success dark:bg-success/100/10 dark:text-green-400">Save 20%</span>
      </div>
    </div>
    <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border bg-card p-8">
        <h3 className="text-lg font-semibold text-foreground">Starter</h3>
        <p className="mt-2 text-sm text-muted-foreground">Perfect for individuals and small projects.</p>
        <p className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">$12</span>
          <span className="text-sm text-muted-foreground">/month</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Billed monthly</p>
        <a href="/signup?plan=starter" className="mt-8 block w-full rounded-lg border border-input bg-background py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Get Started</a>
        <ul className="mt-8 space-y-3" role="list">
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">5 projects</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">5 GB storage</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Community support</span>
          </li>
        </ul>
      </div>
      <div className="rounded-2xl border-2 border-primary bg-card p-8 shadow-lg">
        <h3 className="text-lg font-semibold text-foreground">Pro</h3>
        <p className="mt-2 text-sm text-muted-foreground">For professionals and growing teams.</p>
        <p className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">$29</span>
          <span className="text-sm text-muted-foreground">/month</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Billed monthly</p>
        <a href="/signup?plan=pro" className="mt-8 block w-full rounded-lg bg-primary py-2.5 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Get Started</a>
        <ul className="mt-8 space-y-3" role="list">
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Unlimited projects</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">100 GB storage</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Priority support</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Advanced analytics</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      toggle:
        'group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-muted',
      toggleThumb:
        'pointer-events-none inline-block h-5 w-5 translate-x-0 rounded-full bg-background shadow ring-0 group-aria-checked:translate-x-5',
      saveBadge: 'inline-flex items-center rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success',
      billingNote: 'mt-1 text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['region', 'switch', 'minimal-editorial'],
      ariaAttributes: ['aria-labelledby', 'aria-checked'],
      keyboardNav: 'Tab to toggle, Space to switch',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'toggle switch with aria-checked state',
        'savings badge for annual option',
        'billing frequency note below price',
        'prices would update via JS on toggle',
      ],
      inspirationSource: 'Cal.com pricing',
      craftDetails: [
        'group-aria-checked: for toggle thumb position',
        'transition-transform on toggle thumb',
        'role="switch" for proper semantics',
      ],
    },
  },
  {
    id: 'pricing-usage-based',
    name: 'Usage-Based Pricing',
    category: 'organism',
    type: 'pricing',
    variant: 'usage-based',
    tags: ['pricing', 'usage', 'pay-as-you-go', 'metered'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'fintech', 'devtools'],
    visualStyles: ['minimal-editorial', 'corporate-trust'],
    jsx: `<section className="py-20 sm:py-28" aria-labelledby="usage-pricing-heading">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 id="usage-pricing-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Pay for what you use</h2>
      <p className="mt-4 text-lg text-muted-foreground">Transparent pricing that scales with your usage. No hidden fees.</p>
    </div>
    <div className="mx-auto mt-16 max-w-3xl">
      <div className="rounded-2xl border bg-card p-8 sm:p-10">
        <div className="flex items-baseline justify-between border-b pb-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground">Usage-Based Plan</h3>
            <p className="mt-2 text-sm text-muted-foreground">Only pay for the resources you consume</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Starting at</div>
            <div className="text-3xl font-bold text-foreground">$0</div>
          </div>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex items-start justify-between gap-4 rounded-lg border bg-muted/50 p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground">API Requests</h4>
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Metered</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">First 10,000 requests free per month</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-foreground">$0.10</div>
              <div className="text-xs text-muted-foreground">per 1,000 requests</div>
            </div>
          </div>
          <div className="flex items-start justify-between gap-4 rounded-lg border bg-muted/50 p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground">Storage</h4>
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Metered</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">First 5 GB free per month</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-foreground">$0.20</div>
              <div className="text-xs text-muted-foreground">per GB/month</div>
            </div>
          </div>
          <div className="flex items-start justify-between gap-4 rounded-lg border bg-muted/50 p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground">Bandwidth</h4>
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Metered</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">First 100 GB free per month</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-foreground">$0.08</div>
              <div className="text-xs text-muted-foreground">per GB</div>
            </div>
          </div>
          <div className="flex items-start justify-between gap-4 rounded-lg border bg-accent p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground">Support</h4>
                <span className="inline-flex items-center rounded-md bg-success/10 px-2 py-0.5 text-xs font-medium text-success dark:bg-success/100/10 dark:text-green-400">Included</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Email and community support included</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-foreground">Free</div>
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-lg bg-muted p-4">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
            <div>
              <div className="text-sm font-medium text-foreground">Example monthly cost</div>
              <div className="mt-1 text-xs text-muted-foreground">50,000 API requests + 20 GB storage + 500 GB bandwidth = ~$10/month</div>
            </div>
          </div>
        </div>
        <a href="/signup" className="mt-8 block w-full rounded-lg bg-primary py-3 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Get Started Free</a>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      card: 'rounded-2xl border bg-card p-8 sm:p-10',
      metricCard: 'flex items-start justify-between gap-4 rounded-lg border bg-muted/50 p-4',
      meteredBadge: 'inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary',
      exampleBox: 'mt-8 rounded-lg bg-muted p-4',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-labelledby'],
      keyboardNav: 'Tab to CTA',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'metered badges on usage items',
        'free tier callout on each metric',
        'example cost calculation box',
        'different badge colors for metered vs included',
      ],
      inspirationSource: 'Stripe usage-based pricing',
      craftDetails: [
        'bg-muted/50 for subtle metric card backgrounds',
        'text-right alignment on pricing',
        'border-b on header for visual separation',
      ],
    },
  },
  {
    id: 'pricing-enterprise',
    name: 'Enterprise-Focused Pricing',
    category: 'organism',
    type: 'pricing',
    variant: 'saas',
    tags: ['pricing', 'saas', 'custom', 'b2b'],
    mood: ['professional', 'corporate', 'premium'],
    industry: ['saas', 'fintech', 'saas'],
    visualStyles: ['corporate-trust', 'dark-premium'],
    jsx: `<section className="py-20 sm:py-28" aria-labelledby="enterprise-pricing-heading">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 id="enterprise-pricing-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Built for the enterprise</h2>
      <p className="mt-4 text-lg text-muted-foreground">Custom solutions tailored to your organization's unique requirements.</p>
    </div>
    <div className="mx-auto mt-16 max-w-4xl rounded-2xl border bg-card p-8 shadow-lg sm:p-12">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Enterprise Plan</h3>
          <p className="mt-4 text-base text-muted-foreground">Everything you need to run mission-critical workloads at scale with the highest levels of security and compliance.</p>
          <div className="mt-8">
            <div className="text-sm font-semibold text-muted-foreground">Starting at</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-5xl font-bold text-foreground">$499</span>
              <span className="text-lg text-muted-foreground">/month</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Custom pricing available for 500+ seats</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/contact-sales" className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Contact Sales</a>
            <a href="/demo" className="inline-flex h-11 items-center justify-center rounded-lg border border-input px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Schedule Demo</a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground">Enterprise Features</h4>
          <ul className="mt-4 space-y-3" role="list">
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              <span className="text-sm text-foreground">Unlimited seats and projects</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              <span className="text-sm text-foreground">Advanced security (SSO, SAML, SCIM)</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              <span className="text-sm text-foreground">SOC 2 Type II, GDPR, HIPAA compliance</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              <span className="text-sm text-foreground">99.99% uptime SLA with financial credits</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              <span className="text-sm text-foreground">Dedicated account manager and CSM</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              <span className="text-sm text-foreground">Priority 24/7 phone and email support</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              <span className="text-sm text-foreground">Custom integrations and API rate limits</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              <span className="text-sm text-foreground">On-premise deployment options</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t pt-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">500+</div>
            <div className="text-xs text-muted-foreground">Enterprise customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">99.99%</div>
            <div className="text-xs text-muted-foreground">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">24/7</div>
            <div className="text-xs text-muted-foreground">Priority support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">SOC 2</div>
            <div className="text-xs text-muted-foreground">Type II certified</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      card: 'mx-auto mt-16 max-w-4xl rounded-2xl border bg-card p-8 shadow-lg sm:p-12',
      grid: 'grid gap-12 lg:grid-cols-2',
      price: 'mt-2 flex items-baseline gap-2 text-5xl font-bold text-foreground',
      stats: 'mt-12 border-t pt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4',
      statValue: 'text-2xl font-bold text-foreground',
      statLabel: 'text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['region', 'minimal-editorial'],
      ariaAttributes: ['aria-labelledby'],
      keyboardNav: 'Tab through CTAs',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'single focused card layout for enterprise',
        'stats bar at bottom for social proof',
        'two CTA options: sales and demo',
        'compliance badges and certifications highlighted',
      ],
      inspirationSource: 'Datadog enterprise pricing',
      craftDetails: [
        'shadow-lg on card for premium feel',
        'text-5xl large price for impact',
        'border-t on stats section for separation',
      ],
    },
  },
  {
    id: 'pricing-freemium',
    name: 'Freemium Pricing',
    category: 'organism',
    type: 'pricing',
    variant: 'freemium',
    tags: ['pricing', 'freemium', 'free-tier', 'upgrade'],
    mood: ['minimal', 'professional'],
    industry: ['saas', 'startup', 'saas'],
    visualStyles: ['minimal-editorial', 'soft-depth'],
    jsx: `<section className="py-20 sm:py-28" aria-labelledby="freemium-pricing-heading">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 id="freemium-pricing-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Start free, upgrade as you grow</h2>
      <p className="mt-4 text-lg text-muted-foreground">Get started with our generous free plan. Upgrade anytime for more power.</p>
    </div>
    <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
      <div className="rounded-2xl border-2 border-primary bg-card p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Free</h3>
          <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Popular</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Perfect for personal projects and trying us out.</p>
        <p className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">$0</span>
          <span className="text-sm text-muted-foreground">/forever</span>
        </p>
        <a href="/signup" className="mt-8 block w-full rounded-lg bg-primary py-2.5 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Get Started Free</a>
        <ul className="mt-8 space-y-3" role="list">
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">3 projects</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Up to 2 team members</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">1 GB storage</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Community support</span>
          </li>
        </ul>
      </div>
      <div className="rounded-2xl border bg-card p-8">
        <h3 className="text-lg font-semibold text-foreground">Plus</h3>
        <p className="mt-2 text-sm text-muted-foreground">For individuals who need more.</p>
        <p className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">$10</span>
          <span className="text-sm text-muted-foreground">/month</span>
        </p>
        <a href="/signup?plan=plus" className="mt-8 block w-full rounded-lg border border-input bg-background py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Upgrade to Plus</a>
        <ul className="mt-8 space-y-3" role="list">
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Unlimited projects</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Up to 5 team members</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">10 GB storage</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Email support</span>
          </li>
        </ul>
      </div>
      <div className="rounded-2xl border bg-card p-8">
        <h3 className="text-lg font-semibold text-foreground">Pro</h3>
        <p className="mt-2 text-sm text-muted-foreground">For teams and professionals.</p>
        <p className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">$25</span>
          <span className="text-sm text-muted-foreground">/month</span>
        </p>
        <a href="/signup?plan=pro" className="mt-8 block w-full rounded-lg border border-input bg-background py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Upgrade to Pro</a>
        <ul className="mt-8 space-y-3" role="list">
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Unlimited projects</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Unlimited team members</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">100 GB storage</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Priority support</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span className="text-sm text-muted-foreground">Advanced features</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      grid: 'mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3',
      freeTierCard: 'rounded-2xl border-2 border-primary bg-card p-8',
      popularBadge:
        'inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground',
      pricePeriod: 'text-sm text-muted-foreground',
    },
    a11y: {
      roles: ['region', 'minimal-editorial'],
      ariaAttributes: ['aria-labelledby'],
      keyboardNav: 'Tab through CTAs',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'free tier emphasized with border-2 border-primary',
        'popular badge on free tier',
        '/forever pricing period for free tier',
        'progressive feature unlocking across tiers',
      ],
      inspirationSource: 'Notion freemium pricing',
      craftDetails: [
        'free tier has primary CTA, others have secondary',
        'flex items-center justify-between for badge layout',
        'rounded-2xl consistent across all cards',
      ],
    },
  },
];
