import type { IComponentSnippet } from '../types.js';

export const breadcrumbSnippets: IComponentSnippet[] = [
  {
    id: 'breadcrumb-basic',
    name: 'Default Breadcrumb',
    category: 'atom',
    type: 'breadcrumb',
    variant: 'default',
    tags: ['navigation', 'breadcrumb', 'hierarchy', 'path'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'ecommerce'],
    visualStyles: ['linear-modern', 'minimal-editorial'],
    jsx: `<nav aria-label="Breadcrumb">
  <ol className="flex items-center gap-2 text-sm text-muted-foreground">
    <li>
      <a href="/" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
        Home
      </a>
    </li>
    <li aria-hidden="true" className="select-none">/</li>
    <li>
      <a href="/products" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
        Products
      </a>
    </li>
    <li aria-hidden="true" className="select-none">/</li>
    <li>
      <span className="font-medium text-foreground" aria-current="page">
        Laptop
      </span>
    </li>
  </ol>
</nav>`,
    tailwindClasses: {
      nav: '',
      list: 'flex items-center gap-2 text-sm text-muted-foreground',
      link: 'hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
      separator: 'select-none',
      current: 'font-medium text-foreground',
    },
    a11y: {
      roles: ['navigation with aria-label'],
      ariaAttributes: ['aria-label=Breadcrumb', 'aria-current=page', 'aria-hidden on separators'],
      keyboardNav: 'Tab through links, Enter/Space to activate',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav > ol > li > a' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['gap-2 for breathing room between crumbs', 'select-none on separator prevents text selection'],
      inspirationSource: 'shadcn/ui Breadcrumb',
      craftDetails: [
        'aria-hidden on separators hides decorative slashes from screen readers',
        'aria-current=page on active crumb for semantic navigation',
      ],
    },
  },
  {
    id: 'breadcrumb-icon',
    name: 'Icon Breadcrumb',
    category: 'atom',
    type: 'breadcrumb',
    variant: 'icon',
    tags: ['navigation', 'breadcrumb', 'icons', 'gradient-mesh'],
    mood: ['minimal', 'playful'],
    industry: ['general', 'saas', 'media'],
    visualStyles: ['retro-playful', 'linear-modern'],
    jsx: `<nav aria-label="Breadcrumb">
  <ol className="flex items-center gap-2 text-sm text-muted-foreground">
    <li>
      <a href="/" className="flex items-center gap-1.5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        Home
      </a>
    </li>
    <li>
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </li>
    <li>
      <a href="/products" className="flex items-center gap-1.5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
        Products
      </a>
    </li>
    <li>
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </li>
    <li>
      <span className="font-medium text-foreground" aria-current="page">
        Laptop
      </span>
    </li>
  </ol>
</nav>`,
    tailwindClasses: {
      list: 'flex items-center gap-2 text-sm text-muted-foreground',
      link: 'flex items-center gap-1.5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
      icon: 'h-4 w-4',
      current: 'font-medium text-foreground',
    },
    a11y: {
      roles: ['navigation with aria-label'],
      ariaAttributes: ['aria-label=Breadcrumb', 'aria-current=page', 'aria-hidden on icons'],
      keyboardNav: 'Tab through links, Enter/Space to activate',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav > ol > li > a' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'gap-1.5 between icon and text for optical balance',
        'chevron-right separators instead of slash for modern look',
      ],
      inspirationSource: 'Ant Design Breadcrumb',
      craftDetails: ['h-4 w-4 icons match text-sm scale', 'flex items-center on links aligns icon with text baseline'],
    },
  },
  {
    id: 'breadcrumb-dropdown',
    name: 'Dropdown Breadcrumb',
    category: 'atom',
    type: 'breadcrumb',
    variant: 'dropdown',
    tags: ['navigation', 'breadcrumb', 'dropdown', 'collapsed'],
    mood: ['minimal', 'minimal'],
    industry: ['general', 'saas', 'saas'],
    visualStyles: ['corporate-trust', 'linear-modern'],
    jsx: `<nav aria-label="Breadcrumb">
  <ol className="flex items-center gap-2 text-sm text-muted-foreground">
    <li>
      <a href="/" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
        Home
      </a>
    </li>
    <li aria-hidden="true" className="select-none">/</li>
    <li>
      <button type="button" className="flex items-center gap-1 rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Show more levels">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
      </button>
    </li>
    <li aria-hidden="true" className="select-none">/</li>
    <li>
      <a href="/products" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
        Products
      </a>
    </li>
    <li aria-hidden="true" className="select-none">/</li>
    <li>
      <span className="font-medium text-foreground" aria-current="page">
        Laptop
      </span>
    </li>
  </ol>
</nav>`,
    tailwindClasses: {
      list: 'flex items-center gap-2 text-sm text-muted-foreground',
      link: 'hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
      ellipsis:
        'flex items-center gap-1 rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      icon: 'h-4 w-4',
      current: 'font-medium text-foreground',
    },
    a11y: {
      roles: ['navigation with aria-label', 'button for dropdown trigger'],
      ariaAttributes: ['aria-label=Breadcrumb', 'aria-label=Show more levels', 'aria-current=page'],
      keyboardNav: 'Tab through links and ellipsis button, Enter/Space to expand',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav > ol > li > a' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'ellipsis button for collapsed intermediate levels',
        'aria-label on ellipsis for screen reader context',
      ],
      inspirationSource: 'Ant Design collapsed breadcrumb',
      craftDetails: ['ellipsis-horizontal icon for overflow indicator', 'consistent focus ring on button and links'],
    },
  },
  {
    id: 'breadcrumb-truncated',
    name: 'Truncated Breadcrumb',
    category: 'atom',
    type: 'breadcrumb',
    variant: 'truncated',
    tags: ['navigation', 'breadcrumb', 'truncate', 'overflow'],
    mood: ['minimal', 'professional'],
    industry: ['general', 'saas', 'saas'],
    visualStyles: ['minimal-editorial', 'corporate-trust'],
    jsx: `<nav aria-label="Breadcrumb">
  <ol className="flex items-center gap-2 text-sm text-muted-foreground">
    <li className="shrink-0">
      <a href="/" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
        Home
      </a>
    </li>
    <li aria-hidden="true" className="shrink-0 select-none">/</li>
    <li className="min-w-0">
      <a href="/products" className="block truncate hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm" title="Products">
        Products
      </a>
    </li>
    <li aria-hidden="true" className="shrink-0 select-none">/</li>
    <li className="min-w-0">
      <a href="/products/laptops" className="block truncate hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm" title="Laptops">
        Laptops
      </a>
    </li>
    <li aria-hidden="true" className="shrink-0 select-none">/</li>
    <li className="shrink-0">
      <span className="font-medium text-foreground" aria-current="page">
        MacBook Pro 16"
      </span>
    </li>
  </ol>
</nav>`,
    tailwindClasses: {
      list: 'flex items-center gap-2 text-sm text-muted-foreground',
      staticItem: 'shrink-0',
      truncatedItem: 'min-w-0',
      link: 'block truncate hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
      current: 'font-medium text-foreground',
    },
    a11y: {
      roles: ['navigation with aria-label'],
      ariaAttributes: ['aria-label=Breadcrumb', 'title on truncated links', 'aria-current=page'],
      keyboardNav: 'Tab through links, Enter/Space to activate',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'nav > ol > li > a' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'min-w-0 on li enables text truncation within flex layout',
        'shrink-0 on first/last prevents critical crumbs from shrinking',
      ],
      inspirationSource: 'shadcn/ui responsive breadcrumb patterns',
      craftDetails: [
        'title attribute on truncated links provides full text on hover',
        'block truncate on links enables text-overflow ellipsis',
      ],
    },
  },
];
