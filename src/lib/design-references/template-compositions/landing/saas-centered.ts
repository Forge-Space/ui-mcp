import type { IPageComposition } from '../types.js';

export const saasCentered: IPageComposition = {
  id: 'landing-saas-centered',
  name: 'SaaS Centered Landing',
  description: 'Clean, centered hero with feature grid and pricing',
  templateType: 'landing',
  sections: [
    {
      id: 'hero',
      name: 'Hero Section',
      query: {
        type: 'hero',
        variant: 'centered',
        tags: ['cta', 'heading'],
      },
      containerClasses: 'w-full',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'features',
      name: 'Features Grid',
      query: {
        type: 'feature',
        variant: 'grid',
        tags: ['icons', 'grid'],
      },
      containerClasses: 'w-full py-24 bg-gray-50',
      darkModeClasses: 'dark:bg-gray-800',
    },
    {
      id: 'pricing',
      name: 'Pricing Section',
      query: {
        type: 'pricing',
        tags: ['cards', 'tiers'],
      },
      containerClasses: 'w-full py-24',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'cta-footer',
      name: 'CTA Footer',
      query: {
        type: 'cta-footer',
        tags: ['cta', 'footer'],
      },
      containerClasses: 'w-full py-16 bg-blue-600',
      darkModeClasses: 'dark:bg-blue-700',
    },
  ],
  layout: 'single-column',
  layoutClasses: 'flex flex-col min-h-screen',
  mood: ['professional', 'minimal'],
  industry: ['saas', 'devtools'],
  visualStyles: ['minimal-editorial', 'gradient-mesh'],
  quality: {
    antiGeneric: [
      'Centered hero with clear value proposition',
      'Grid-based feature layout for scanability',
    ],
    inspirationSource: 'Vercel, Linear, Stripe landing pages',
    designPhilosophy: 'Clarity over creativity. Every element earns its space.',
  },
};
