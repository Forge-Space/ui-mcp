import type { IPageComposition } from '../types.js';

export const onboarding: IPageComposition = {
  id: 'auth-onboarding',
  name: 'Onboarding Flow',
  description: 'Multi-step wizard with progress indicator',
  templateType: 'onboarding',
  sections: [
    {
      id: 'progress-header',
      name: 'Progress Header',
      query: {
        type: 'navigation',
        variant: 'stepper',
        tags: ['progress', 'steps'],
      },
      containerClasses: 'w-full py-4 border-b',
      darkModeClasses: 'dark:bg-gray-900 dark:border-gray-700',
    },
    {
      id: 'onboarding-step',
      name: 'Onboarding Step',
      query: {
        type: 'form',
        variant: 'wizard',
        tags: ['multi-step', 'centered'],
      },
      containerClasses: 'flex-1 flex items-center justify-center p-8',
      darkModeClasses: 'dark:bg-gray-900',
    },
  ],
  layout: 'single-column',
  layoutClasses: 'flex flex-col min-h-screen',
  mood: ['warm', 'calm'],
  industry: ['saas', 'general'],
  visualStyles: ['minimal-editorial'],
  quality: {
    antiGeneric: [
      'Progress indicator reduces abandonment',
      'Centered wizard keeps focus on current step',
    ],
    inspirationSource: 'Notion onboarding, Stripe Connect setup',
    designPhilosophy: 'Progressive disclosure. One question at a time.',
  },
};
