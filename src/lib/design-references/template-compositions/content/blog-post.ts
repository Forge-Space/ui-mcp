import type { IPageComposition } from '../types.js';

export const blogPost: IPageComposition = {
  id: 'content-blog-post',
  name: 'Blog Post Page',
  description: 'Navbar with article header, body, and related posts',
  templateType: 'blog_list',
  sections: [
    {
      id: 'navbar',
      name: 'Navigation Bar',
      query: {
        type: 'navigation',
        variant: 'navbar',
        tags: ['minimal'],
      },
      containerClasses: 'w-full sticky top-0 z-50 bg-white border-b',
      darkModeClasses: 'dark:bg-gray-900 dark:border-gray-700',
    },
    {
      id: 'article-header',
      name: 'Article Header',
      query: {
        type: 'hero',
        variant: 'article',
        tags: ['metadata', 'author'],
      },
      containerClasses: 'w-full max-w-3xl mx-auto py-12 px-4',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'article-body',
      name: 'Article Body',
      query: {
        type: 'media',
        variant: 'article',
        tags: ['typography', 'prose'],
      },
      containerClasses: 'w-full max-w-3xl mx-auto px-4',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'related-posts',
      name: 'Related Posts',
      query: {
        type: 'grid',
        variant: 'blog',
        tags: ['related', 'cards'],
      },
      containerClasses: 'w-full py-12 px-4 bg-gray-50',
      darkModeClasses: 'dark:bg-gray-800',
    },
  ],
  layout: 'single-column',
  layoutClasses: 'flex flex-col min-h-screen',
  mood: ['editorial', 'professional'],
  industry: ['media', 'general'],
  visualStyles: ['minimal-editorial'],
  quality: {
    antiGeneric: [
      'Centered column maintains optimal reading width',
      'Related posts keep users engaged after reading',
    ],
    inspirationSource: 'Medium, thoughtful blog designs',
    designPhilosophy: 'Reading experience first. Typography, spacing, zero distractions.',
  },
};
