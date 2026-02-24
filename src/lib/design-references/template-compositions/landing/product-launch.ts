import type { IPageComposition } from '../types.js';

export const productLaunch: IPageComposition = {
  id: 'landing-product-launch',
  name: 'Product Launch Landing',
  description: 'Gradient hero with alternating features and social proof',
  templateType: 'landing',
  sections: [
    {
      id: 'hero',
      name: 'Gradient Hero',
      query: {
        type: 'hero',
        variant: 'gradient',
        tags: ['cta', 'visual'],
      },
      containerClasses: 'w-full',
      darkModeClasses: 'dark:bg-gradient-to-br dark:from-purple-900 dark:to-blue-900',
    },
    {
      id: 'features',
      name: 'Alternating Features',
      query: {
        type: 'feature',
        variant: 'alternating',
        tags: ['images', 'detailed'],
      },
      containerClasses: 'w-full py-24',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'testimonials',
      name: 'Testimonials',
      query: {
        type: 'testimonial',
        tags: ['quotes', 'avatars'],
      },
      containerClasses: 'w-full py-24 bg-gray-50',
      darkModeClasses: 'dark:bg-gray-800',
    },
    {
      id: 'cta-footer',
      name: 'CTA Footer',
      query: {
        type: 'cta-footer',
        tags: ['cta', 'footer'],
      },
      containerClasses: 'w-full py-16 bg-gradient-to-r from-purple-600 to-blue-600',
      darkModeClasses: 'dark:from-purple-700 dark:to-blue-700',
    },
  ],
  layout: 'single-column',
  layoutClasses: 'flex flex-col min-h-screen',
  mood: ['bold', 'energetic'],
  industry: ['saas', 'startup'],
  visualStyles: ['gradient-mesh', 'linear-modern'],
  quality: {
    antiGeneric: ['Gradient hero for visual impact', 'Alternating layout prevents monotony'],
    inspirationSource: 'Apple product pages, Notion marketing site',
    designPhilosophy: 'Story-driven design. Features build momentum toward conversion.',
  },
};
