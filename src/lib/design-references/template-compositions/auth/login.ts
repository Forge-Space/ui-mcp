import type { IPageComposition } from '../types.js';

export const login: IPageComposition = {
  id: 'auth-login',
  name: 'Login Page',
  description: 'Centered card with social auth options',
  templateType: 'auth_login',
  sections: [
    {
      id: 'login-card',
      name: 'Login Card',
      query: {
        type: 'form',
        variant: 'auth',
        tags: ['login', 'social'],
      },
      containerClasses: 'min-h-screen flex items-center justify-center bg-gray-50',
      darkModeClasses: 'dark:bg-gray-900',
    },
  ],
  layout: 'single-column',
  layoutClasses: 'w-full',
  mood: ['minimal', 'professional'],
  industry: ['saas', 'general'],
  visualStyles: ['minimal-editorial'],
  quality: {
    antiGeneric: [
      'Centered card reduces cognitive load',
      'Social auth first for faster onboarding',
    ],
    inspirationSource: 'Clerk, Auth0 login flows',
    designPhilosophy: 'Minimal friction. Get users in fast.',
  },
};
