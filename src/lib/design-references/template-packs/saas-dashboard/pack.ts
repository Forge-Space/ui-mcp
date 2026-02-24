import type { ITemplatePack } from '../types.js';

export const saasDashboardPack: ITemplatePack = {
  id: 'saas-dashboard',
  name: 'SaaS Dashboard',
  description:
    'Complete SaaS application template inspired by Linear, Vercel, ' +
    'and Raycast with analytics, settings, team management, and billing',
  appType: 'saas',
  pages: [
    {
      path: '/',
      compositionId: 'dashboard-analytics',
      title: 'Dashboard',
      isIndex: true,
    },
    {
      path: '/settings',
      compositionId: 'settings-page',
      title: 'Settings',
      isIndex: false,
    },
    {
      path: '/team',
      compositionId: 'team-members',
      title: 'Team',
      isIndex: false,
    },
    {
      path: '/billing',
      compositionId: 'billing-page',
      title: 'Billing',
      isIndex: false,
    },
    {
      path: '/changelog',
      compositionId: 'changelog-page',
      title: 'Changelog',
      isIndex: false,
    },
    {
      path: '/api-keys',
      compositionId: 'api-keys-page',
      title: 'API Keys',
      isIndex: false,
    },
  ],
  theme: {
    colorSystemId: 'midnight-sora',
    fontPairingId: 'inter-system',
    visualStyle: 'dark-premium',
    mood: 'professional',
  },
  sharedComponents: ['nav-sidebar-collapsible', 'footer-minimal'],
  quality: {
    antiGeneric: [
      'Avoid generic dashboard cards with meaningless metrics',
      'No "Welcome back, User!" without context',
      'Skip placeholder chart data and "Coming soon" states',
      'Avoid overwhelming users with every possible metric at once',
      'Skip generic "Dashboard" or "Overview" page titles',
    ],
    designPhilosophy:
      'Inspired by Linear, Vercel, and Raycast: data-dense without ' +
      'clutter, keyboard-first navigation, subtle dark themes with ' +
      'purposeful color accents, progressive disclosure of complexity',
    inspirationSources: [
      'Linear (linear.app) - Clean data tables, subtle gradients',
      'Vercel Dashboard (vercel.com) - Deployment cards, usage graphs',
      'Raycast (raycast.com) - Command palette, keyboard shortcuts',
    ],
  },
};
