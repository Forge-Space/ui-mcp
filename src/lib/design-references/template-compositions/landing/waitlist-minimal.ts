import type { IPageComposition } from '../types.js';

export const waitlistMinimal: IPageComposition = {
  id: 'landing-waitlist-minimal',
  name: 'Waitlist Minimal Landing',
  description: 'Ultra-minimal hero with single feature and CTA',
  templateType: 'landing',
  sections: [
    {
      id: 'hero',
      name: 'Minimal Hero',
      query: {
        type: 'hero',
        variant: 'minimal',
        tags: ['cta', 'email-capture'],
      },
      containerClasses: 'w-full min-h-screen flex items-center justify-center',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'feature',
      name: 'Single Feature',
      query: {
        type: 'feature',
        variant: 'single',
        tags: ['centered'],
      },
      containerClasses: 'w-full py-24 bg-gray-50',
      darkModeClasses: 'dark:bg-gray-800',
    },
    {
      id: 'cta-footer',
      name: 'CTA Footer',
      query: {
        type: 'cta-footer',
        tags: ['simple', 'footer'],
      },
      containerClasses: 'w-full py-16',
      darkModeClasses: 'dark:bg-gray-900',
    },
  ],
  layout: 'single-column',
  layoutClasses: 'flex flex-col min-h-screen',
  mood: ['minimal', 'calm'],
  industry: ['saas', 'startup'],
  visualStyles: ['minimal-editorial'],
  quality: {
    antiGeneric: [
      'No clutter. Just value prop and email capture.',
      'Single feature highlight maintains focus',
    ],
    inspirationSource: 'Resend, Cal.com, early-stage SaaS waitlists',
    designPhilosophy: 'Less is more. Perfect for pre-launch validation.',
  },
};
