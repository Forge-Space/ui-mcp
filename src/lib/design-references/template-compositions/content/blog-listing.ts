import type { IPageComposition } from '../types.js';

export const blogListing: IPageComposition = {
  id: 'content-blog-listing',
  name: 'Blog Listing Page',
  description: 'Navbar with featured post, post grid, and pagination',
  templateType: 'blog_list',
  sections: [
    {
      id: 'navbar',
      name: 'Navigation Bar',
      query: {
        type: 'navigation',
        variant: 'navbar',
        tags: ['minimal', 'search'],
      },
      containerClasses: 'w-full sticky top-0 z-50 bg-white border-b',
      darkModeClasses: 'dark:bg-gray-900 dark:border-gray-700',
    },
    {
      id: 'featured-post',
      name: 'Featured Post',
      query: {
        type: 'hero',
        variant: 'article',
        tags: ['featured', 'image'],
      },
      containerClasses: 'w-full py-12',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'post-grid',
      name: 'Post Grid',
      query: {
        type: 'grid',
        variant: 'blog',
        tags: ['cards', 'metadata'],
      },
      containerClasses: 'w-full py-12 px-4',
      darkModeClasses: 'dark:bg-gray-900',
    },
    {
      id: 'pagination',
      name: 'Pagination',
      query: {
        type: 'navigation',
        variant: 'pagination',
        tags: ['numbered'],
      },
      containerClasses: 'w-full py-8 flex justify-center',
      darkModeClasses: 'dark:bg-gray-900',
    },
  ],
  layout: 'single-column',
  layoutClasses: 'flex flex-col min-h-screen',
  mood: ['editorial', 'minimal'],
  industry: ['media', 'general'],
  visualStyles: ['minimal-editorial'],
  quality: {
    antiGeneric: ['Featured post drives engagement with hero treatment', 'Grid layout supports scanning and discovery'],
    inspirationSource: 'Vercel blog, Linear changelog',
    designPhilosophy: 'Content-first. Typography and whitespace create reading flow.',
  },
};
