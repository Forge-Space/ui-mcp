import type { IComponentSnippet } from '../types.js';

export const navbarSnippets: IComponentSnippet[] = [
  {
    id: 'navbar-sticky',
    name: 'Sticky Navigation',
    category: 'organism',
    type: 'navbar',
    variant: 'sticky',
    tags: ['navbar', 'navigation', 'sticky', 'header'],
    mood: ['professional', 'minimal', 'corporate'],
    industry: ['saas', 'startup', 'general'],
    visualStyles: ['minimal-editorial', 'corporate-trust', 'soft-depth'],
    jsx: `<nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm" aria-label="Main navigation">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="flex items-center gap-8">
        <a href="/" className="text-lg font-bold text-foreground">Acme</a>
        <div className="hidden items-center gap-6 md:flex">
          <a href="/features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">Features</a>
          <a href="/pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">Pricing</a>
          <a href="/docs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">Docs</a>
          <a href="/blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">Blog</a>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <a href="/login" className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">Sign in</a>
        <a href="/signup" className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Get Started</a>
      </div>
    </div>
  </div>
</nav>`,
    tailwindClasses: {
      nav: 'sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm',
      container: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
      wrapper: 'flex h-16 items-center justify-between',
      logo: 'text-lg font-bold text-foreground',
      navLinks: 'hidden items-center gap-6 md:flex',
      navLink: 'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
      cta: 'inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground',
    },
    a11y: {
      roles: ['navigation'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab through links and CTA',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav', landmark: 'navigation' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: [
        'backdrop-blur-sm for glassmorphic effect',
        'bg-background/80 for translucency on scroll',
        'sticky positioning with z-50',
        'gap-8 between logo and links for breathing room',
      ],
      inspirationSource: 'Vercel navigation',
      craftDetails: [
        'h-16 standard navbar height',
        'hidden → flex responsive pattern for nav links',
        'focus-visible ring on all interactive elements',
      ],
    },
  },
  {
    id: 'navbar-transparent',
    name: 'Transparent Navbar with Scroll Reveal',
    category: 'organism',
    type: 'navbar',
    variant: 'transparent',
    tags: ['navbar', 'navigation', 'transparent', 'scroll'],
    mood: ['premium', 'bold', 'editorial'],
    industry: ['agency', 'startup', 'media'],
    visualStyles: ['dark-premium', 'gradient-mesh'],
    jsx: `<nav className="fixed inset-x-0 top-0 z-50 transition-all duration-300" aria-label="Main navigation">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-20 items-center justify-between">
      <a href="/" className="text-xl font-bold text-white">Brand</a>
      <div className="hidden items-center gap-8 lg:flex">
        <a href="/work" className="text-sm font-medium text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">Work</a>
        <a href="/services" className="text-sm font-medium text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">Services</a>
        <a href="/about" className="text-sm font-medium text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">About</a>
        <a href="/contact" className="text-sm font-medium text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">Contact</a>
      </div>
      <a href="/contact" className="inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">Get in Touch</a>
    </div>
  </div>
</nav>`,
    tailwindClasses: {
      nav: 'fixed inset-x-0 top-0 z-50 transition-all duration-300',
      wrapper: 'flex h-20 items-center justify-between',
      logo: 'text-xl font-bold text-white',
      navLink: 'text-sm font-medium text-white/80 transition-colors hover:text-white',
      cta: 'inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-sm',
    },
    a11y: {
      roles: ['navigation'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab through navigation',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav', landmark: 'navigation' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'fixed positioning for overlay effect',
        'transparent initial state (would add scroll class via JS)',
        'rounded-full CTA for soft aesthetic',
        'white/opacity color scheme for dark hero overlay',
      ],
      inspirationSource: 'Apple.com hero navbar',
      craftDetails: [
        'h-20 taller for hero presence',
        'border-white/20 subtle borders',
        'transition-all for scroll animations',
      ],
    },
  },
  {
    id: 'navbar-mega-menu',
    name: 'Navbar with Mega Menu',
    category: 'organism',
    type: 'navbar',
    variant: 'mega-menu',
    tags: ['navbar', 'navigation', 'mega-menu', 'dropdown'],
    mood: ['professional', 'corporate'],
    industry: ['saas', 'fintech', 'saas'],
    visualStyles: ['corporate-trust', 'soft-depth'],
    jsx: `<nav className="border-b bg-background" aria-label="Main navigation">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="flex items-center gap-8">
        <a href="/" className="text-lg font-bold text-foreground">Platform</a>
        <div className="hidden items-center gap-1 lg:flex">
          <div className="group relative">
            <button className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Products
              <svg className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
            </button>
            <div className="invisible absolute left-0 top-full w-screen max-w-md pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100" role="menu">
              <div className="overflow-hidden rounded-xl border bg-background p-4 shadow-xl">
                <div className="grid gap-4">
                  <a href="/analytics" className="group/item flex gap-3 rounded-lg p-3 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" role="menuitem">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Analytics</div>
                      <div className="text-xs text-muted-foreground">Track performance metrics in real-time</div>
                    </div>
                  </a>
                  <a href="/security" className="group/item flex gap-3 rounded-lg p-3 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" role="menuitem">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Security</div>
                      <div className="text-xs text-muted-foreground">Enterprise-grade protection and compliance</div>
                    </div>
                  </a>
                  <a href="/collaboration" className="group/item flex gap-3 rounded-lg p-3 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" role="menuitem">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Collaboration</div>
                      <div className="text-xs text-muted-foreground">Work together seamlessly across teams</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <a href="/pricing" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Pricing</a>
          <a href="/customers" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Customers</a>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <a href="/login" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Sign in</a>
        <a href="/signup" className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Start Free Trial</a>
      </div>
    </div>
  </div>
</nav>`,
    tailwindClasses: {
      nav: 'border-b bg-background',
      megaMenuTrigger: 'inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground',
      megaMenuPanel:
        'invisible absolute left-0 top-full w-screen max-w-md pt-3 opacity-0 group-hover:visible group-hover:opacity-100',
      megaMenuItem: 'group/item flex gap-3 rounded-lg p-3 transition-colors hover:bg-accent',
      iconWrapper: 'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary',
    },
    a11y: {
      roles: ['navigation', 'menu', 'menuitem'],
      ariaAttributes: ['aria-label', 'aria-hidden'],
      keyboardNav: 'Tab through nav, Enter on dropdown to expand, Arrow keys for menu items',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav', landmark: 'navigation' },
    responsive: { strategy: 'mobile-first', breakpoints: ['lg'] },
    quality: {
      antiGeneric: [
        'icon + text layout in mega menu items',
        'invisible/opacity transition for smooth reveal',
        'max-w-md on panel for readability',
        'group/item for nested hover states',
      ],
      inspirationSource: 'Stripe navigation',
      craftDetails: [
        'pt-3 on panel for hover gap tolerance',
        'shadow-xl on dropdown for depth',
        'role="menu" for proper semantics',
      ],
    },
  },
  {
    id: 'navbar-mobile-drawer',
    name: 'Navbar with Mobile Drawer',
    category: 'organism',
    type: 'navbar',
    variant: 'mobile-drawer',
    tags: ['navbar', 'navigation', 'mobile', 'drawer', 'hamburger'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'startup', 'general'],
    visualStyles: ['minimal-editorial', 'soft-depth'],
    jsx: `<nav className="border-b bg-background" aria-label="Main navigation">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <a href="/" className="text-lg font-bold text-foreground">App</a>
      <div className="hidden items-center gap-6 md:flex">
        <a href="/features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Features</a>
        <a href="/pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Pricing</a>
        <a href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">About</a>
      </div>
      <div className="flex items-center gap-3">
        <a href="/login" className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Sign in</a>
        <a href="/signup" className="hidden md:inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Get Started</a>
        <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input transition-colors hover:bg-accent md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Open menu" aria-expanded="false">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
        </button>
      </div>
    </div>
  </div>
  <div className="fixed inset-0 z-50 hidden bg-background" role="dialog" aria-modal="true" aria-label="Navigation menu">
    <div className="flex h-16 items-center justify-between border-b px-4">
      <a href="/" className="text-lg font-bold text-foreground">App</a>
      <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Close menu">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
      </button>
    </div>
    <div className="flex flex-col gap-1 p-4">
      <a href="/features" className="rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Features</a>
      <a href="/pricing" className="rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Pricing</a>
      <a href="/about" className="rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">About</a>
      <hr className="my-4" />
      <a href="/login" className="rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Sign in</a>
      <a href="/signup" className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-4 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Get Started</a>
    </div>
  </div>
</nav>`,
    tailwindClasses: {
      nav: 'border-b bg-background',
      hamburger: 'inline-flex h-9 w-9 items-center justify-center rounded-md border border-input md:hidden',
      drawer: 'fixed inset-0 z-50 hidden bg-background',
      drawerHeader: 'flex h-16 items-center justify-between border-b px-4',
      drawerNav: 'flex flex-col gap-1 p-4',
      drawerLink: 'rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-accent',
    },
    a11y: {
      roles: ['navigation', 'dialog'],
      ariaAttributes: ['aria-label', 'aria-expanded', 'aria-modal'],
      keyboardNav: 'Tab through links, Escape to close drawer',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav', landmark: 'navigation' },
    responsive: { strategy: 'mobile-first', breakpoints: ['md'] },
    quality: {
      antiGeneric: [
        'full-screen drawer overlay for mobile',
        'hamburger visible only on mobile with md:hidden',
        'drawer header matches main nav height',
        'hr separator for visual grouping in drawer',
      ],
      inspirationSource: 'Linear mobile navigation',
      craftDetails: [
        'role="dialog" aria-modal="true" for drawer',
        'h-11 larger touch targets in drawer',
        'fixed inset-0 for full-screen drawer',
      ],
    },
  },
  {
    id: 'navbar-sidebar',
    name: 'Vertical Sidebar Navigation',
    category: 'organism',
    type: 'navbar',
    variant: 'sidebar',
    tags: ['navbar', 'navigation', 'sidebar', 'vertical'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'devtools', 'saas'],
    visualStyles: ['minimal-editorial', 'linear-modern'],
    jsx: `<aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background" aria-label="Main navigation">
  <div className="flex h-full flex-col">
    <div className="flex h-16 items-center gap-2 border-b px-6">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">A</div>
      <span className="text-sm font-semibold text-foreground">Acme Workspace</span>
    </div>
    <nav className="flex-1 space-y-1 overflow-y-auto p-3">
      <a href="/home" className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-current="page">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
        Home
      </a>
      <a href="/inbox" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" /></svg>
        Inbox
        <span className="ml-auto inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-medium text-primary-foreground">3</span>
      </a>
      <a href="/projects" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /></svg>
        Projects
      </a>
      <a href="/team" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>
        Team
      </a>
      <hr className="my-3" />
      <a href="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
        Settings
      </a>
    </nav>
    <div className="border-t p-3">
      <button type="button" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">JD</div>
        <div className="flex-1 text-left">
          <div className="text-xs font-semibold text-foreground">John Doe</div>
          <div className="text-[10px] text-muted-foreground">john@acme.com</div>
        </div>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" /></svg>
      </button>
    </div>
  </div>
</aside>`,
    tailwindClasses: {
      aside: 'fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background',
      header: 'flex h-16 items-center gap-2 border-b px-6',
      nav: 'flex-1 space-y-1 overflow-y-auto p-3',
      navItem: 'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
      navItemActive: 'bg-accent text-foreground',
      navItemInactive: 'text-muted-foreground hover:bg-accent hover:text-foreground',
      badge:
        'ml-auto inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-medium text-primary-foreground',
      footer: 'border-t p-3',
    },
    a11y: {
      roles: ['navigation'],
      ariaAttributes: ['aria-label', 'aria-current'],
      keyboardNav: 'Tab through nav items, Enter to activate',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'aside', landmark: 'navigation' },
    responsive: { strategy: 'mobile-first', breakpoints: ['lg'] },
    quality: {
      antiGeneric: [
        'fixed sidebar with h-screen for full height',
        'notification badge on Inbox item',
        'user profile in footer with account switcher',
        'workspace branding in header',
      ],
      inspirationSource: 'Linear/Notion sidebar',
      craftDetails: [
        'overflow-y-auto on nav for scrollable items',
        'space-y-1 for compact vertical rhythm',
        'ml-auto on badge for right alignment',
      ],
    },
  },
  {
    id: 'navbar-command-bar',
    name: 'Navbar with Command Bar',
    category: 'organism',
    type: 'navbar',
    variant: 'command-bar',
    tags: ['navbar', 'navigation', 'search', 'command-palette'],
    mood: ['professional', 'futuristic', 'premium'],
    industry: ['devtools', 'saas', 'saas'],
    visualStyles: ['linear-modern', 'dark-premium'],
    jsx: `<nav className="border-b bg-background" aria-label="Main navigation">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-14 items-center justify-between gap-4">
      <div className="flex items-center gap-6">
        <a href="/" className="text-base font-bold text-foreground">Raycast</a>
        <div className="hidden items-center gap-1 lg:flex">
          <a href="/store" className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Store</a>
          <a href="/changelog" className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Changelog</a>
          <a href="/teams" className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Teams</a>
        </div>
      </div>
      <button type="button" className="flex h-9 flex-1 max-w-md items-center gap-2 rounded-lg border bg-muted/50 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
        <span className="flex-1 text-left">Search or jump to...</span>
        <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded border bg-background px-1.5 text-[10px] font-medium text-muted-foreground">
          <span>⌘</span>K
        </kbd>
      </button>
      <div className="flex items-center gap-3">
        <a href="/login" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Sign in</a>
        <a href="/download" className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Download</a>
      </div>
    </div>
  </div>
</nav>`,
    tailwindClasses: {
      nav: 'border-b bg-background',
      searchButton:
        'flex h-9 flex-1 max-w-md items-center gap-2 rounded-lg border bg-muted/50 px-3 text-sm text-muted-foreground',
      kbd: 'hidden sm:inline-flex h-5 items-center gap-0.5 rounded border bg-background px-1.5 text-[10px] font-medium text-muted-foreground',
      navLink: 'rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground',
    },
    a11y: {
      roles: ['navigation', 'search'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab to search, ⌘K to open command palette',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav', landmark: 'navigation' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'integrated search bar in navbar',
        'kbd element for keyboard shortcut hint',
        'bg-muted/50 for subtle input background',
        'max-w-md on search for controlled width',
      ],
      inspirationSource: 'Raycast landing page',
      craftDetails: [
        'flex-1 on search input for responsive width',
        'hidden sm:inline-flex on kbd for mobile',
        'h-14 slightly shorter navbar for modern feel',
      ],
    },
  },
];
