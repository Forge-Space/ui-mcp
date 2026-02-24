import type { IComponentSnippet } from '../types.js';

export const footerSnippets: IComponentSnippet[] = [
  {
    id: 'footer-minimal',
    name: 'Minimal Footer',
    category: 'organism',
    type: 'footer',
    variant: 'minimal',
    tags: ['footer', 'minimal', 'simple'],
    mood: ['minimal', 'professional'] as const,
    industry: ['saas', 'general'] as const,
    visualStyles: ['minimal-editorial'] as const,
    jsx: `<footer className="border-t border-input bg-card">
  <div className="container py-12">
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
        <a className="text-sm font-medium text-muted-foreground hover:text-foreground" href="/about">About</a>
        <a className="text-sm font-medium text-muted-foreground hover:text-foreground" href="/privacy">Privacy</a>
        <a className="text-sm font-medium text-muted-foreground hover:text-foreground" href="/terms">Terms</a>
        <a className="text-sm font-medium text-muted-foreground hover:text-foreground" href="/contact">Contact</a>
      </div>
      <p className="text-sm text-muted-foreground">&copy; 2024 Acme Inc. All rights reserved.</p>
    </div>
  </div>
</footer>`,
    tailwindClasses: {
      root: 'border-t bg-card',
    },
    a11y: {
      roles: ['contentinfo'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab through footer links',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['md'] },
    quality: {
      antiGeneric: ['Clean single-row layout', 'Centered mobile view', 'Essential links only'],
      inspirationSource: 'Cal.com',
      craftDetails: ['Flexible layout', 'Minimal visual weight', 'Clear hierarchy'],
    },
  },
  {
    id: 'footer-mega',
    name: 'Mega Footer',
    category: 'organism',
    type: 'footer',
    variant: 'mega',
    tags: ['footer', 'mega', 'multi-column'],
    mood: ['professional', 'corporate'] as const,
    industry: ['saas', 'fintech'] as const,
    visualStyles: ['soft-depth'] as const,
    jsx: `<footer className="border-t border-input bg-card">
  <div className="container py-16">
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <a className="flex items-center space-x-2" href="/">
          <span className="text-lg font-bold text-foreground">Company</span>
        </a>
        <p className="mt-4 text-sm text-muted-foreground max-w-xs">
          Building the future of digital experiences with modern tools and infrastructure.
        </p>
        <div className="mt-6 flex gap-4">
          <a className="text-muted-foreground hover:text-foreground" href="https://twitter.com">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a className="text-muted-foreground hover:text-foreground" href="https://github.com">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a className="text-muted-foreground hover:text-foreground" href="https://linkedin.com">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">Product</h3>
        <ul className="mt-4 space-y-3">
          <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/features">Features</a></li>
          <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/pricing">Pricing</a></li>
          <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/security">Security</a></li>
          <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/roadmap">Roadmap</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">Company</h3>
        <ul className="mt-4 space-y-3">
          <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/about">About</a></li>
          <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/blog">Blog</a></li>
          <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/careers">Careers</a></li>
          <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/press">Press</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">Legal</h3>
        <ul className="mt-4 space-y-3">
          <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/privacy">Privacy</a></li>
          <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/terms">Terms</a></li>
          <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/cookies">Cookies</a></li>
          <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/licenses">Licenses</a></li>
        </ul>
      </div>
    </div>
    <div className="mt-12 pt-8 border-t border-input">
      <p className="text-sm text-muted-foreground">&copy; 2024 Company Inc. All rights reserved.</p>
    </div>
  </div>
</footer>`,
    tailwindClasses: {
      root: 'border-t bg-card',
    },
    a11y: {
      roles: ['contentinfo'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab through footer links',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['lg'] },
    quality: {
      antiGeneric: ['Multi-column layout', 'Social media links', 'Organized link sections'],
      inspirationSource: 'Stripe',
      craftDetails: ['Grid-based layout', 'Clear sections', 'Social icons'],
    },
  },
  {
    id: 'footer-newsletter',
    name: 'Footer with Newsletter',
    category: 'organism',
    type: 'footer',
    variant: 'newsletter',
    tags: ['footer', 'newsletter', 'email', 'cta'],
    mood: ['professional', 'minimal'] as const,
    industry: ['saas', 'media'] as const,
    visualStyles: ['soft-depth'] as const,
    jsx: `<footer className="border-t border-input bg-card">
  <div className="container py-16">
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <h3 className="text-xl font-bold text-foreground">Stay up to date</h3>
        <p className="mt-2 text-sm text-muted-foreground">Get the latest news, articles, and updates delivered to your inbox.</p>
        <form className="mt-6 flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Subscribe
          </button>
        </form>
        <p className="mt-3 text-xs text-muted-foreground">
          We care about your data. Read our <a className="underline hover:text-foreground" href="/privacy">privacy policy</a>.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Resources</h3>
          <ul className="mt-4 space-y-3">
            <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/docs">Documentation</a></li>
            <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/guides">Guides</a></li>
            <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/api">API Reference</a></li>
            <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/support">Support</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Company</h3>
          <ul className="mt-4 space-y-3">
            <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/about">About</a></li>
            <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/blog">Blog</a></li>
            <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/jobs">Jobs</a></li>
            <li><a className="text-sm text-muted-foreground hover:text-foreground" href="/press">Press</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="mt-12 pt-8 border-t border-input">
      <p className="text-sm text-muted-foreground">&copy; 2024 Acme Inc. All rights reserved.</p>
    </div>
  </div>
</footer>`,
    tailwindClasses: {
      root: 'border-t bg-card',
    },
    a11y: {
      roles: ['contentinfo', 'form'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab through form and links',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: ['Newsletter signup form', 'Privacy policy link', 'Email input with validation'],
      inspirationSource: 'Resend',
      craftDetails: ['Form integration', 'Privacy notice', 'Clear CTA'],
    },
  },
];
