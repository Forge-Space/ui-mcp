import type { IPageComposition } from '../types.js';

export const agencyPortfolio: IPageComposition = {
  id: 'landing-agency-portfolio',
  name: 'Agency Portfolio Landing',
  description: 'Split hero with bento grid features and testimonials',
  templateType: 'landing',
  sections: [
    {
      id: 'hero',
      name: 'Split Hero',
      query: {
        type: 'hero',
        variant: 'split',
        tags: ['image', 'cta'],
      },
      containerClasses: 'w-full',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'features',
      name: 'Bento Grid Features',
      query: {
        type: 'feature',
        variant: 'bento',
        tags: ['grid', 'visual'],
      },
      containerClasses: 'w-full py-24 bg-gray-50',
      darkModeClasses: 'dark:bg-gray-800',
    },
    {
      id: 'testimonials',
      name: 'Client Testimonials',
      query: {
        type: 'testimonial',
        tags: ['quotes', 'logos'],
      },
      containerClasses: 'w-full py-24',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'cta-footer',
      name: 'CTA Footer',
      query: {
        type: 'cta-footer',
        tags: ['contact', 'footer'],
      },
      containerClasses: 'w-full py-16 bg-gray-900 text-white',
      darkModeClasses: 'dark:bg-black',
    },
  ],
  layout: 'single-column',
  layoutClasses: 'flex flex-col min-h-screen',
  mood: ['creative', 'professional'],
  industry: ['agency', 'general'],
  visualStyles: ['linear-modern', 'neubrutalism'],
  quality: {
    antiGeneric: [
      'Split hero for immediate visual impact',
      'Bento grid showcases work variety',
    ],
    inspirationSource: 'Design agency sites, creative studios',
    designPhilosophy: 'Portfolio as proof. Visual hierarchy guides exploration.',
  },
};
