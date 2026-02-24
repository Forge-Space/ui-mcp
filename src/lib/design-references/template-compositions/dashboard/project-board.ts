import type { IPageComposition } from '../types.js';

export const projectBoard: IPageComposition = {
  id: 'dashboard-project-board',
  name: 'Project Board Dashboard',
  description: 'Sidebar nav with kanban board and team activity',
  templateType: 'dashboard',
  sections: [
    {
      id: 'sidebar-nav',
      name: 'Sidebar Navigation',
      query: {
        type: 'navigation',
        variant: 'sidebar',
        tags: ['icons', 'sections'],
      },
      containerClasses: 'fixed left-0 top-0 h-screen w-64 bg-gray-900',
      darkModeClasses: 'dark:bg-black',
    },
    {
      id: 'kanban-board',
      name: 'Kanban Board',
      query: {
        type: 'kanban',
        variant: 'board',
        tags: ['draggable', 'cards'],
      },
      containerClasses: 'ml-64 p-8',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'team-activity',
      name: 'Team Activity',
      query: {
        type: 'feed',
        variant: 'team',
        tags: ['avatars', 'recent'],
      },
      containerClasses: 'ml-64 p-8 border-t',
      darkModeClasses: 'dark:bg-gray-900 dark:border-gray-700',
    },
  ],
  layout: 'sidebar-left',
  layoutClasses: 'flex min-h-screen',
  mood: ['professional', 'energetic'],
  industry: ['saas', 'devtools'],
  visualStyles: ['minimal-editorial', 'linear-modern'],
  quality: {
    antiGeneric: [
      'Kanban board for task visualization',
      'Team activity shows collaboration in real-time',
    ],
    inspirationSource: 'Notion, Linear project boards',
    designPhilosophy: 'Transparency and flow. Every task visible, every update shared.',
  },
};
