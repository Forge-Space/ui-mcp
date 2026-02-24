import type { IPageComposition } from '../types.js';

export const analytics: IPageComposition = {
  id: 'dashboard-analytics',
  name: 'Analytics Dashboard',
  description: 'Sidebar nav with stats overview, chart grid, and data table',
  templateType: 'dashboard',
  sections: [
    {
      id: 'sidebar-nav',
      name: 'Sidebar Navigation',
      query: {
        type: 'navigation',
        variant: 'sidebar',
        tags: ['icons', 'collapsible'],
      },
      containerClasses: 'fixed left-0 top-0 h-screen w-64 bg-gray-900',
      darkModeClasses: 'dark:bg-black',
    },
    {
      id: 'stats-overview',
      name: 'Stats Overview',
      query: {
        type: 'stats',
        variant: 'cards',
        tags: ['metrics', 'icons'],
      },
      containerClasses: 'ml-64 p-8',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'chart-grid',
      name: 'Chart Grid',
      query: {
        type: 'chart',
        variant: 'grid',
        tags: ['analytics', 'responsive'],
      },
      containerClasses: 'ml-64 p-8',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'data-table',
      name: 'Data Table',
      query: {
        type: 'table',
        variant: 'data',
        tags: ['sortable', 'filterable'],
      },
      containerClasses: 'ml-64 p-8',
      darkModeClasses: 'dark:bg-gray-900',
    },
  ],
  layout: 'sidebar-left',
  layoutClasses: 'flex min-h-screen',
  mood: ['professional', 'minimal'],
  industry: ['saas', 'devtools'],
  visualStyles: ['minimal-editorial', 'linear-modern'],
  quality: {
    antiGeneric: [
      'Fixed sidebar for persistent navigation',
      'Stats cards above charts for quick insights',
    ],
    inspirationSource: 'Linear dashboard, Vercel Analytics',
    designPhilosophy: 'Data density balanced with whitespace. Information hierarchy.',
  },
};
