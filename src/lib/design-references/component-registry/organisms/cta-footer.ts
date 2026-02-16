import type { IComponentSnippet } from '../types.js';

export const ctaFooterSnippets: IComponentSnippet[] = [
  {
    id: 'cta-centered',
    name: 'Centered CTA Section',
    category: 'organism',
    type: 'cta',
    variant: 'centered',
    tags: ['cta', 'conversion', 'call-to-action', 'marketing'],
    mood: ['bold', 'professional'],
    industry: ['saas', 'startup', 'agency'],
    visualStyles: ['soft-depth', 'gradient-mesh', 'corporate-trust'],
    jsx: `<section className="py-20 sm:py-28" aria-labelledby="cta-heading">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl sm:px-16 sm:py-24">
      <h2 id="cta-heading" className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">Ready to get started?</h2>
      <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80 leading-relaxed">Join thousands of teams already using our platform. Start your free trial today — no credit card required.</p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a href="/signup" className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-primary shadow-sm transition-all hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary active:scale-[0.98]">Start free trial</a>
        <a href="/contact" className="inline-flex h-11 items-center justify-center rounded-lg border border-primary-foreground/20 px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary active:scale-[0.98]">Talk to sales</a>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      section: 'py-20 sm:py-28',
      container: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
      card: 'relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl sm:px-16 sm:py-24',
      heading: 'mx-auto max-w-2xl text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl',
      description: 'mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80 leading-relaxed',
      primaryCta: 'inline-flex h-11 items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-primary shadow-sm transition-all hover:bg-white/90 active:scale-[0.98]',
      secondaryCta: 'inline-flex h-11 items-center justify-center rounded-lg border border-primary-foreground/20 px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary-foreground/10 active:scale-[0.98]',
    },
    a11y: { roles: ['region'], ariaAttributes: ['aria-labelledby'], keyboardNav: 'Tab through CTAs', contrastRatio: '7:1', focusVisible: true, reducedMotion: true },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: ['rounded-3xl card for premium feel', 'inverted CTA (white on primary)', 'shadow-2xl for strong elevation', 'ring-offset-primary for themed focus'],
      inspirationSource: 'Tailwind UI CTA sections',
      craftDetails: ['full-bleed primary bg with rounded container', 'text-primary-foreground/80 for description subordination'],
    },
  },
  {
    id: 'cta-banner',
    name: 'Banner CTA',
    category: 'organism',
    type: 'cta',
    variant: 'banner',
    tags: ['cta', 'banner', 'inline', 'conversion'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'startup'],
    visualStyles: ['soft-depth', 'corporate-trust', 'dark-premium'],
    jsx: `<section className="border-y bg-muted/30 py-12 sm:py-16" aria-labelledby="banner-cta-heading">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
      <div>
        <h2 id="banner-cta-heading" className="text-xl font-semibold text-foreground sm:text-2xl">Start building today</h2>
        <p className="mt-1 text-sm text-muted-foreground">Free for individuals. Team plans start at $10/month.</p>
      </div>
      <div className="flex shrink-0 gap-3">
        <a href="/signup" className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]">Get started</a>
        <a href="/pricing" className="inline-flex h-10 items-center justify-center rounded-lg border border-input px-6 text-sm font-medium text-foreground transition-all hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]">View pricing</a>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      section: 'border-y bg-muted/30 py-12 sm:py-16',
      container: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
      layout: 'flex flex-col items-center justify-between gap-6 sm:flex-row',
      heading: 'text-xl font-semibold text-foreground sm:text-2xl',
      description: 'mt-1 text-sm text-muted-foreground',
    },
    a11y: { roles: ['region'], ariaAttributes: ['aria-labelledby'], keyboardNav: 'Tab through CTAs', contrastRatio: '4.5:1', focusVisible: true, reducedMotion: true },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: ['border-y + bg-muted/30 for subtle section break', 'horizontal layout on sm+', 'shrink-0 on CTAs prevents compression'],
      inspirationSource: 'Vercel inline CTA banners',
      craftDetails: ['minimal padding compared to full CTA', 'inline layout for less disruptive placement'],
    },
  },
  {
    id: 'footer-default',
    name: 'Default Footer',
    category: 'organism',
    type: 'footer',
    variant: 'default',
    tags: ['footer', 'navigation', 'links', 'copyright'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'corporate-trust', 'dark-premium'],
    jsx: `<footer className="border-t bg-background" aria-label="Site footer">
  <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <a href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
          Brand
        </a>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">Building the future of team collaboration with modern tools and workflows.</p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">Product</h3>
        <ul className="mt-4 space-y-3" role="list">
          <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</a></li>
          <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Pricing</a></li>
          <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Changelog</a></li>
          <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Documentation</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">Company</h3>
        <ul className="mt-4 space-y-3" role="list">
          <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</a></li>
          <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Blog</a></li>
          <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Careers</a></li>
          <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">Legal</h3>
        <ul className="mt-4 space-y-3" role="list">
          <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Privacy Policy</a></li>
          <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Terms of Service</a></li>
          <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Cookie Policy</a></li>
        </ul>
      </div>
    </div>
    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
      <p className="text-sm text-muted-foreground">&copy; {{YEAR}} Brand. All rights reserved.</p>
      <div className="flex gap-4">
        <a href="#" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Twitter"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
        <a href="#" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="GitHub"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg></a>
      </div>
    </div>
  </div>
</footer>`,
    tailwindClasses: {
      footer: 'border-t bg-background',
      container: 'mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16',
      grid: 'grid gap-8 sm:grid-cols-2 lg:grid-cols-4',
      columnTitle: 'text-sm font-semibold text-foreground',
      linkList: 'mt-4 space-y-3',
      link: 'text-sm text-muted-foreground transition-colors hover:text-foreground',
      bottom: 'mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row',
      copyright: 'text-sm text-muted-foreground',
      socialLink: 'text-muted-foreground transition-colors hover:text-foreground',
    },
    a11y: { roles: ['contentinfo'], ariaAttributes: ['aria-label'], keyboardNav: 'Tab through links', contrastRatio: '4.5:1', focusVisible: true, reducedMotion: true },
    seo: { semanticElement: 'footer', landmark: 'contentinfo' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: ['4-column grid with brand + 3 link groups', 'social icons with aria-labels', 'border-t separator between grid and copyright', 'max-w-xs on brand description'],
      inspirationSource: 'Vercel / shadcn landing footer',
      craftDetails: ['space-y-3 for comfortable link spacing', 'responsive grid: 1 → 2 → 4 columns'],
    },
  },
];
