import type { IPageComposition } from '../types.js';

export const cart: IPageComposition = {
  id: 'ecommerce-cart',
  name: 'Shopping Cart Page',
  description: 'Navbar with cart items and order summary',
  templateType: 'ecommerce_cart',
  sections: [
    {
      id: 'navbar',
      name: 'Navigation Bar',
      query: {
        type: 'navigation',
        variant: 'navbar',
        tags: ['minimal'],
      },
      containerClasses: 'w-full sticky top-0 z-50 bg-white border-b',
      darkModeClasses: 'dark:bg-gray-900 dark:border-gray-700',
    },
    {
      id: 'cart-items',
      name: 'Cart Items',
      query: {
        type: 'table',
        variant: 'cart',
        tags: ['editable', 'images'],
      },
      containerClasses: 'w-full md:w-2/3 p-8',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'order-summary',
      name: 'Order Summary',
      query: {
        type: 'card',
        variant: 'summary',
        tags: ['sticky', 'totals'],
      },
      containerClasses: 'w-full md:w-1/3 p-8',
      darkModeClasses: 'dark:bg-gray-900',
    },
  ],
  layout: 'split',
  layoutClasses: 'flex flex-col min-h-screen',
  mood: ['minimal', 'professional'],
  industry: ['ecommerce', 'general'],
  visualStyles: ['minimal-editorial'],
  quality: {
    antiGeneric: ['Split layout keeps summary always visible', 'Editable quantities without page reload'],
    inspirationSource: 'Modern e-commerce carts, Stripe Checkout inspiration',
    designPhilosophy: 'Reduce friction. Clear totals, easy edits, prominent checkout.',
  },
};
