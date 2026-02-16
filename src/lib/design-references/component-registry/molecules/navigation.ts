import type { IComponentSnippet } from '../types.js';

export const navigationSnippets: IComponentSnippet[] = [
  {
    id: 'navbar-default',
    name: 'Default Navbar',
    category: 'molecule',
    type: 'navbar',
    variant: 'default',
    tags: ['navigation', 'header', 'menu', 'responsive'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
  <nav aria-label="Main navigation" className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
    <a href="/" className="flex items-center gap-2 font-semibold text-foreground">
      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
      <span>Brand</span>
    </a>
    <div className="hidden items-center gap-1 md:flex">
      <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Features</a>
      <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Pricing</a>
      <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Docs</a>
    </div>
    <div className="flex items-center gap-2">
      <a href="/login" className="hidden rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex">Sign in</a>
      <a href="/signup" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]">Get Started</a>
      <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Toggle menu" aria-expanded="false">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
      </button>
    </div>
  </nav>
</header>`,
    tailwindClasses: {
      header: 'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60',
      nav: 'mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8',
      logo: 'flex items-center gap-2 font-semibold text-foreground',
      links: 'hidden items-center gap-1 md:flex',
      link: 'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      cta: 'rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]',
      mobileToggle: 'inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    },
    a11y: {
      roles: ['navigation', 'menubar', 'menuitem'],
      ariaAttributes: ['aria-label', 'aria-expanded', 'role="menubar"'],
      keyboardNav: 'Tab through links, Enter to navigate, Escape to close mobile menu',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'header', landmark: 'navigation' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: ['backdrop-blur for modern glass header', 'supports-[backdrop-filter] progressive enhancement', 'max-w-7xl constrained width', 'mobile hamburger hidden on md+'],
      inspirationSource: 'shadcn/ui website navbar',
      craftDetails: ['h-14 fixed height', 'bg-background/95 + backdrop-blur', 'progressive responsive: logo always → links at md → sign-in at sm'],
    },
  },
  {
    id: 'sidebar-default',
    name: 'App Sidebar',
    category: 'molecule',
    type: 'sidebar',
    variant: 'default',
    tags: ['navigation', 'dashboard', 'app', 'menu'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'devtools', 'fintech'],
    visualStyles: ['linear-modern', 'dark-premium', 'soft-depth'],
    jsx: `<aside aria-label="Application navigation" className="flex h-full w-60 flex-col border-r bg-background">
  <div className="flex h-14 items-center border-b px-4">
    <a href="/" className="flex items-center gap-2 font-semibold text-foreground">
      <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
      App Name
    </a>
  </div>
  <nav aria-label="Sidebar links" className="flex-1 space-y-1 overflow-y-auto p-3">
    <a href="#" className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-foreground transition-colors" aria-current="page">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
      Dashboard
    </a>
    <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>
      Analytics
    </a>
    <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.431.992a7.723 7.723 0 0 1 0 .255c-.007.378.138.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
      Settings
    </a>
  </nav>
  <div className="border-t p-3">
    <div className="flex items-center gap-3 rounded-lg px-3 py-2">
      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground" aria-hidden="true">JD</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">Jane Doe</p>
        <p className="text-xs text-muted-foreground truncate">jane@example.com</p>
      </div>
    </div>
  </div>
</aside>`,
    tailwindClasses: {
      sidebar: 'flex h-full w-60 flex-col border-r bg-background',
      header: 'flex h-14 items-center border-b px-4',
      nav: 'flex-1 space-y-1 overflow-y-auto p-3',
      linkActive: 'flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-foreground transition-colors',
      link: 'flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      footer: 'border-t p-3',
      avatar: 'h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground',
    },
    a11y: {
      roles: ['navigation'],
      ariaAttributes: ['aria-label', 'aria-current="page"'],
      keyboardNav: 'Tab through links, Enter to navigate',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'aside', landmark: 'complementary' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['aria-current="page" on active link', 'icon + text nav items', 'user profile in footer with avatar fallback', 'truncate on email for overflow'],
      inspirationSource: 'Linear sidebar',
      craftDetails: ['w-60 optimal sidebar width', 'overflow-y-auto for scrollable nav', 'border-t footer separation'],
    },
  },
  {
    id: 'breadcrumb-default',
    name: 'Breadcrumb',
    category: 'molecule',
    type: 'breadcrumb',
    variant: 'default',
    tags: ['navigation', 'hierarchy', 'path', 'wayfinding'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'ecommerce'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<nav aria-label="Breadcrumb" className="flex">
  <ol className="flex items-center gap-1.5 text-sm" role="list">
    <li><a href="/" className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Home</a></li>
    <li aria-hidden="true"><svg className="h-3.5 w-3.5 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg></li>
    <li><a href="/products" className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Products</a></li>
    <li aria-hidden="true"><svg className="h-3.5 w-3.5 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg></li>
    <li><span className="font-medium text-foreground" aria-current="page">Current Page</span></li>
  </ol>
</nav>`,
    tailwindClasses: {
      nav: 'flex',
      list: 'flex items-center gap-1.5 text-sm',
      link: 'text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm',
      separator: 'h-3.5 w-3.5 text-muted-foreground/50',
      current: 'font-medium text-foreground',
    },
    a11y: {
      roles: ['navigation'],
      ariaAttributes: ['aria-label="Breadcrumb"', 'aria-current="page"', 'aria-hidden on separators'],
      keyboardNav: 'Tab through links',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav', landmark: 'navigation' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['aria-hidden on separators', 'aria-current on last item', 'ol for ordered hierarchy', 'chevron separators with reduced opacity'],
      inspirationSource: 'shadcn/ui Breadcrumb',
      craftDetails: ['ordered list for semantic hierarchy', 'separators hidden from screen readers'],
    },
  },
];
