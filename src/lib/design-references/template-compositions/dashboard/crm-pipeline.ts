import type { IPageComposition } from '../types.js';

export const crmPipeline: IPageComposition = {
  id: 'dashboard-crm-pipeline',
  name: 'CRM Pipeline Dashboard',
  description: 'Sidebar nav with pipeline board and activity feed',
  templateType: 'dashboard',
  sections: [
    {
      id: 'sidebar-nav',
      name: 'Sidebar Navigation',
      query: {
        type: 'navigation',
        variant: 'sidebar',
        tags: ['icons', 'badges'],
      },
      containerClasses: 'fixed left-0 top-0 h-screen w-64 bg-gray-900',
      darkModeClasses: 'dark:bg-black',
    },
    {
      id: 'pipeline-board',
      name: 'Pipeline Board',
      query: {
        type: 'kanban',
        variant: 'pipeline',
        tags: ['draggable', 'columns'],
      },
      containerClasses: 'ml-64 p-8',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'activity-feed',
      name: 'Activity Feed',
      query: {
        type: 'feed',
        variant: 'activity',
        tags: ['timeline', 'avatars'],
      },
      containerClasses: 'ml-64 p-8 border-t',
      darkModeClasses: 'dark:bg-gray-900 dark:border-gray-700',
    },
  ],
  layout: 'sidebar-left',
  layoutClasses: 'flex min-h-screen',
  mood: ['professional', 'energetic'],
  industry: ['saas', 'general'],
  visualStyles: ['minimal-editorial'],
  quality: {
    antiGeneric: ['Kanban-style pipeline for visual deal tracking', 'Activity feed provides context and updates'],
    inspirationSource: 'HubSpot, Pipedrive CRM dashboards',
    designPhilosophy: 'Visual workflow. Drag-and-drop for fast updates.',
  },
};
