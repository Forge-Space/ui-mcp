import type { ILayoutPattern } from '../types.js';

export const LAYOUT_PATTERNS: readonly ILayoutPattern[] = [
  {
    name: 'saas-landing',
    description: 'SaaS product landing page with hero, features, pricing, testimonials, and CTA',
    components: ['hero', 'features-grid', 'pricing-cards', 'testimonials', 'cta-section', 'footer'],
    useCase: ['product marketing', 'SaaS', 'startup launch'],
    responsiveBehavior: 'Single column on mobile, multi-column grids on desktop. Hero stacks vertically on mobile.',
    tailwindClasses: {
      wrapper: 'min-h-screen flex flex-col',
      hero: 'py-20 md:py-32 px-4 text-center max-w-4xl mx-auto',
      features: 'py-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto',
      pricing: 'py-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto',
      testimonials: 'py-16 px-4 max-w-4xl mx-auto',
      cta: 'py-20 px-4 text-center bg-primary text-primary-foreground',
      footer: 'py-12 px-4 border-t',
    },
  },
  {
    name: 'dashboard',
    description: 'Admin dashboard with sidebar navigation, header, stats cards, charts, and data table',
    components: ['sidebar-nav', 'header', 'stats-cards', 'chart-area', 'data-table'],
    useCase: ['admin panels', 'analytics', 'internal tools'],
    responsiveBehavior:
      'Sidebar collapses to hamburger on mobile. Stats cards stack vertically. Table scrolls horizontally.',
    tailwindClasses: {
      wrapper: 'flex min-h-screen',
      sidebar: 'w-64 border-r bg-card hidden md:flex flex-col',
      main: 'flex-1 flex flex-col',
      header: 'h-16 border-b px-6 flex items-center justify-between',
      content: 'flex-1 p-6 space-y-6',
      stats: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',
      chart: 'rounded-lg border bg-card p-6',
      table: 'rounded-lg border bg-card overflow-x-auto',
    },
  },
  {
    name: 'ecommerce-plp',
    description: 'Product listing page with sidebar filters and responsive product grid',
    components: ['filter-sidebar', 'sort-dropdown', 'product-grid', 'pagination', 'breadcrumb'],
    useCase: ['product listings', 'e-commerce', 'catalog browsing'],
    responsiveBehavior:
      'Filter sidebar collapses to slide-over on mobile. Product grid scales from 2 to 3 to 4 columns. Sort dropdown full-width on mobile.',
    tailwindClasses: {
      wrapper: 'max-w-7xl mx-auto px-4 py-8',
      breadcrumb: 'flex items-center gap-2 text-sm text-muted-foreground mb-6',
      layout: 'flex flex-col lg:flex-row gap-8',
      sidebar: 'w-full lg:w-64 shrink-0 space-y-6',
      main: 'flex-1',
      toolbar: 'flex items-center justify-between mb-6',
      grid: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
      pagination: 'flex items-center justify-center gap-2 mt-8',
    },
  },
  {
    name: 'ecommerce-pdp',
    description: 'E-commerce product detail page with image gallery, product info, reviews, and related items',
    components: ['image-gallery', 'product-info', 'add-to-cart', 'reviews', 'related-products'],
    useCase: ['product pages', 'e-commerce', 'marketplace'],
    responsiveBehavior:
      'Image gallery and product info side-by-side on desktop, stacked on mobile. Related products in horizontal scroll on mobile.',
    tailwindClasses: {
      wrapper: 'max-w-7xl mx-auto px-4 py-8',
      productGrid: 'grid grid-cols-1 md:grid-cols-2 gap-8',
      gallery: 'space-y-4',
      info: 'space-y-6',
      reviews: 'mt-16 space-y-6',
      related: 'mt-16',
      relatedGrid: 'grid grid-cols-2 md:grid-cols-4 gap-4',
    },
  },
  {
    name: 'ecommerce-cart',
    description: 'Shopping cart page with items list and sticky order summary sidebar',
    components: ['cart-items', 'quantity-selector', 'order-summary', 'continue-shopping', 'checkout-button'],
    useCase: ['shopping cart', 'e-commerce', 'order review'],
    responsiveBehavior:
      'Order summary moves below cart items on mobile. Item thumbnails shrink on small screens. Sticky summary on desktop.',
    tailwindClasses: {
      wrapper: 'max-w-7xl mx-auto px-4 py-8',
      layout: 'flex flex-col lg:flex-row gap-8',
      itemsList: 'flex-1 space-y-4',
      item: 'flex gap-4 rounded-lg border p-4',
      summary: 'w-full lg:w-80 shrink-0 lg:sticky lg:top-8 self-start rounded-lg border p-6 space-y-4',
    },
  },
  {
    name: 'ecommerce-checkout',
    description: 'Multi-step checkout flow with progress stepper, form sections, and order summary sidebar',
    components: ['progress-stepper', 'shipping-form', 'payment-form', 'order-summary', 'trust-badges'],
    useCase: ['checkout', 'e-commerce', 'payment flow'],
    responsiveBehavior:
      'Order summary moves below form on mobile. Progress stepper becomes compact on small screens. Form inputs stack vertically on mobile.',
    tailwindClasses: {
      wrapper: 'max-w-7xl mx-auto px-4 py-8',
      stepper: 'flex items-center justify-center gap-2 mb-8',
      layout: 'flex flex-col lg:flex-row gap-8',
      form: 'flex-1 space-y-8',
      section: 'rounded-lg border p-6 space-y-4',
      summary: 'w-full lg:w-80 shrink-0 lg:sticky lg:top-8 self-start rounded-lg border p-6 space-y-4',
      trustBadges: 'flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground',
    },
  },
  {
    name: 'blog-article',
    description: 'Blog or article page with header, prose content, sidebar, and related posts',
    components: ['article-header', 'prose-content', 'sidebar', 'related-posts', 'footer'],
    useCase: ['content sites', 'blogs', 'documentation'],
    responsiveBehavior: 'Sidebar below content on mobile. Prose content constrained to 65ch for readability.',
    tailwindClasses: {
      wrapper: 'max-w-7xl mx-auto px-4 py-8',
      layout: 'grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12',
      article: 'prose prose-lg max-w-[65ch]',
      sidebar: 'space-y-8',
      related: 'mt-16 grid grid-cols-1 md:grid-cols-3 gap-6',
    },
  },
  {
    name: 'auth-pages',
    description: 'Authentication pages with split layout (illustration + form) or centered card',
    components: ['illustration-panel', 'auth-form', 'social-login', 'footer-links'],
    useCase: ['login', 'signup', 'forgot password', 'onboarding'],
    responsiveBehavior:
      'Split layout on desktop, form-only centered card on mobile. Illustration panel hidden on mobile.',
    tailwindClasses: {
      wrapper: 'min-h-screen flex',
      illustration: 'hidden lg:flex lg:w-1/2 bg-muted items-center justify-center p-12',
      formPanel: 'flex-1 flex items-center justify-center p-6',
      card: 'w-full max-w-md space-y-6',
      form: 'space-y-4',
    },
  },
  {
    name: 'settings',
    description: 'Settings page with sidebar navigation and form sections',
    components: ['settings-nav', 'form-sections', 'save-bar'],
    useCase: ['user preferences', 'account settings', 'admin config'],
    responsiveBehavior: 'Sidebar becomes horizontal tabs on mobile. Save bar sticks to bottom.',
    tailwindClasses: {
      wrapper: 'max-w-5xl mx-auto px-4 py-8',
      layout: 'flex flex-col md:flex-row gap-8',
      nav: 'md:w-48 flex md:flex-col gap-1',
      content: 'flex-1 space-y-8',
      section: 'space-y-4 rounded-lg border p-6',
      saveBar: 'sticky bottom-0 bg-background border-t p-4 flex justify-end gap-3',
    },
  },
  {
    name: 'onboarding',
    description: 'Multi-step onboarding flow with stepper, card content, and navigation',
    components: ['stepper', 'step-content', 'progress-bar', 'navigation-buttons'],
    useCase: ['multi-step flows', 'wizards', 'setup guides'],
    responsiveBehavior:
      'Stepper becomes compact on mobile. Full-width card content. Navigation buttons always visible.',
    tailwindClasses: {
      wrapper: 'min-h-screen flex items-center justify-center p-4',
      card: 'w-full max-w-2xl rounded-xl border bg-card shadow-lg',
      stepper: 'flex items-center justify-center gap-2 p-6 border-b',
      content: 'p-8 space-y-6',
      navigation: 'p-6 border-t flex justify-between',
    },
  },
  {
    name: 'portfolio',
    description: 'Personal portfolio with hero, project grid, about section, and contact',
    components: ['hero', 'project-grid', 'about', 'skills', 'contact', 'footer'],
    useCase: ['personal sites', 'freelancer portfolios', 'creative showcases'],
    responsiveBehavior: 'Project grid 1 column on mobile, 2-3 on desktop. Hero full-width with centered content.',
    tailwindClasses: {
      wrapper: 'min-h-screen',
      hero: 'py-24 md:py-40 px-4 text-center',
      projects: 'py-16 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto',
      about: 'py-16 px-4 max-w-3xl mx-auto',
      contact: 'py-16 px-4 max-w-lg mx-auto',
    },
  },
  {
    name: 'pricing',
    description: 'Pricing page with billing toggle, plan cards, and feature comparison table',
    components: ['billing-toggle', 'plan-cards', 'feature-comparison', 'faq'],
    useCase: ['SaaS pricing', 'subscription plans', 'plan comparison'],
    responsiveBehavior: 'Plan cards stack on mobile. Feature comparison table scrolls horizontally on mobile.',
    tailwindClasses: {
      wrapper: 'max-w-6xl mx-auto px-4 py-16',
      header: 'text-center space-y-4 mb-12',
      toggle: 'flex items-center justify-center gap-3 mb-8',
      cards: 'grid grid-cols-1 md:grid-cols-3 gap-6',
      card: 'rounded-xl border p-8 space-y-6',
      comparison: 'mt-16 overflow-x-auto',
    },
  },
  {
    name: 'empty-state',
    description: '404 or empty state page with illustration, message, and CTA',
    components: ['illustration', 'message', 'cta-button'],
    useCase: ['error pages', 'empty states', 'no results'],
    responsiveBehavior: 'Centered content, scales down illustration on mobile.',
    tailwindClasses: {
      wrapper: 'min-h-screen flex items-center justify-center p-4',
      content: 'text-center space-y-6 max-w-md',
      illustration: 'mx-auto w-48 h-48 text-muted-foreground',
      message: 'space-y-2',
      cta: 'inline-flex',
    },
  },
] as const;

export function getLayoutPattern(name: string): ILayoutPattern | undefined {
  return LAYOUT_PATTERNS.find((p) => p.name === name);
}

export function getLayoutPatternsByUseCase(useCase: string): ILayoutPattern[] {
  return LAYOUT_PATTERNS.filter((p) => p.useCase.some((u) => u.toLowerCase().includes(useCase.toLowerCase())));
}
