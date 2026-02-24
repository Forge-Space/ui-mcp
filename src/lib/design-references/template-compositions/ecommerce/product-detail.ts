import type { IPageComposition } from '../types.js';

export const productDetail: IPageComposition = {
  id: 'ecommerce-product-detail',
  name: 'Product Detail Page',
  description: 'Navbar with product gallery, info, and related products',
  templateType: 'ecommerce_pdp',
  sections: [
    {
      id: 'navbar',
      name: 'Navigation Bar',
      query: {
        type: 'navigation',
        variant: 'navbar',
        tags: ['cart', 'breadcrumbs'],
      },
      containerClasses: 'w-full sticky top-0 z-50 bg-white border-b',
      darkModeClasses: 'dark:bg-gray-900 dark:border-gray-700',
    },
    {
      id: 'product-gallery',
      name: 'Product Gallery',
      query: {
        type: 'gallery',
        variant: 'product',
        tags: ['images', 'zoom'],
      },
      containerClasses: 'w-full md:w-1/2 p-8',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'product-info',
      name: 'Product Info',
      query: {
        type: 'form',
        variant: 'product',
        tags: ['details', 'add-to-cart'],
      },
      containerClasses: 'w-full md:w-1/2 p-8',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'related-products',
      name: 'Related Products',
      query: {
        type: 'grid',
        variant: 'products',
        tags: ['related', 'carousel'],
      },
      containerClasses: 'w-full py-12 px-4 bg-gray-50',
      darkModeClasses: 'dark:bg-gray-800',
    },
  ],
  layout: 'split',
  layoutClasses: 'flex flex-col min-h-screen',
  mood: ['professional', 'premium'],
  industry: ['ecommerce', 'general'],
  visualStyles: ['minimal-editorial'],
  quality: {
    antiGeneric: ['Gallery-first layout for visual products', 'Related products drive additional sales'],
    inspirationSource: 'Apple Store, premium e-commerce PDPs',
    designPhilosophy: 'Product as hero. Clear CTAs, trust signals, related discovery.',
  },
};
