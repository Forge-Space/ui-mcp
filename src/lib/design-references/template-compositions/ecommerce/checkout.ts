import type { IPageComposition } from '../types.js';

export const checkout: IPageComposition = {
  id: 'ecommerce-checkout',
  name: 'Checkout Page',
  description: 'Split layout with shipping/payment forms and order summary sidebar',
  templateType: 'ecommerce_checkout',
  sections: [
    {
      id: 'navbar',
      name: 'Navigation Bar',
      query: {
        type: 'navigation',
        variant: 'navbar',
        tags: ['minimal', 'secure'],
      },
      containerClasses: 'w-full sticky top-0 z-50 bg-white border-b',
      darkModeClasses: 'dark:bg-gray-900 dark:border-gray-700',
    },
    {
      id: 'progress-stepper',
      name: 'Progress Stepper',
      query: {
        type: 'stepper',
        variant: 'progress',
        tags: ['horizontal', 'numbered'],
      },
      containerClasses: 'w-full max-w-7xl mx-auto px-4 py-6',
    },
    {
      id: 'shipping-form',
      name: 'Shipping Form',
      query: {
        type: 'form',
        variant: 'shipping',
        tags: ['fieldset', 'address'],
      },
      containerClasses: 'flex-1 space-y-8',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'payment-form',
      name: 'Payment Form',
      query: {
        type: 'form',
        variant: 'payment',
        tags: ['fieldset', 'card'],
      },
      containerClasses: 'flex-1 space-y-4',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'order-summary',
      name: 'Order Summary',
      query: {
        type: 'card',
        variant: 'summary',
        tags: ['sticky', 'totals', 'items'],
      },
      containerClasses: 'w-full lg:w-80 shrink-0',
      darkModeClasses: 'dark:bg-gray-900',
    },
  ],
  layout: 'split',
  layoutClasses: 'flex flex-col min-h-screen bg-background text-foreground',
  mood: ['professional', 'minimal'],
  industry: ['ecommerce', 'general'],
  visualStyles: ['minimal-editorial'],
  quality: {
    antiGeneric: [
      'Split layout keeps order summary visible during form entry',
      'Progress stepper reduces abandonment by showing clear steps',
    ],
    inspirationSource: 'Stripe Checkout, Shopify one-page checkout',
    designPhilosophy: 'Reduce friction. Minimal steps, clear totals, trust signals.',
  },
};
