import type { IPageComposition } from '../types.js';

export const signup: IPageComposition = {
  id: 'auth-signup',
  name: 'Signup Page',
  description: 'Split layout with branding and signup form',
  templateType: 'auth_signup',
  sections: [
    {
      id: 'branding-panel',
      name: 'Branding Panel',
      query: {
        type: 'hero',
        variant: 'split',
        tags: ['branding', 'visual'],
      },
      containerClasses: 'w-1/2 bg-gradient-to-br from-blue-600 to-purple-600',
      darkModeClasses: 'dark:from-blue-700 dark:to-purple-700',
    },
    {
      id: 'signup-form',
      name: 'Signup Form',
      query: {
        type: 'form',
        variant: 'auth',
        tags: ['signup', 'social'],
      },
      containerClasses: 'w-1/2 flex items-center justify-center bg-white',
      darkModeClasses: 'dark:bg-gray-900',
    },
  ],
  layout: 'split',
  layoutClasses: 'flex min-h-screen',
  mood: ['professional', 'warm'],
  industry: ['saas', 'general'],
  visualStyles: ['gradient-mesh', 'minimal-editorial'],
  quality: {
    antiGeneric: [
      'Split layout reinforces brand while collecting info',
      'Visual panel reduces perceived form length',
    ],
    inspirationSource: 'Stripe signup, Linear onboarding',
    designPhilosophy: 'Balance utility and brand. Form on right, inspiration on left.',
  },
};
