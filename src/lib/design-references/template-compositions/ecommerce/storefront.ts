import type { IPageComposition } from '../types.js';

export const storefront: IPageComposition = {
  id: 'ecommerce-storefront',
  name: 'Storefront Page',
  description: 'Navbar with hero, product grid, and CTA footer',
  templateType: 'ecommerce_plp',
  sections: [
    {
      id: 'navbar',
      name: 'Navigation Bar',
      query: {
        type: 'navigation',
        variant: 'navbar',
        tags: ['cart', 'search'],
      },
      containerClasses: 'w-full sticky top-0 z-50 bg-white border-b',
      darkModeClasses: 'dark:bg-gray-900 dark:border-gray-700',
    },
    {
      id: 'hero',
      name: 'Hero Banner',
      query: {
        type: 'hero',
        variant: 'banner',
        tags: ['promotion', 'image'],
      },
      containerClasses: 'w-full',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'product-grid',
      name: 'Product Grid',
      query: {
        type: 'grid',
        variant: 'products',
        tags: ['cards', 'images'],
      },
      containerClasses: 'w-full py-12 px-4',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'cta-footer',
      name: 'CTA Footer',
      query: {
        type: 'cta-footer',
        tags: ['newsletter', 'footer'],
      },
      containerClasses: 'w-full py-16 bg-gray-900 text-white',
      darkModeClasses: 'dark:bg-black',
    },
  ],
  layout: 'single-column',
  layoutClasses: 'flex flex-col min-h-screen',
  mood: ['warm', 'professional'],
  industry: ['ecommerce', 'general'],
  visualStyles: ['minimal-editorial', 'gradient-mesh'],
  quality: {
    antiGeneric: ['Sticky nav for persistent cart access', 'Hero banner highlights current promotion'],
    inspirationSource: 'Shopify themes, modern e-commerce sites',
    designPhilosophy: 'Browse-friendly. Clear product hierarchy, fast access to cart.',
  },
};
