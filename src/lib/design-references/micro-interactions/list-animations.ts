import type { IMicroInteraction } from '../component-registry/types.js';

export const listAnimationEffects: IMicroInteraction[] = [
  {
    id: 'list-stagger-in',
    name: 'List Stagger In',
    category: 'list',
    purpose: ['orientation', 'delight'],
    tailwindClasses:
      '[&>*]:animate-in [&>*]:fade-in-0 [&>*]:slide-in-from-left-4 [&>*:nth-child(1)]:delay-[0ms] [&>*:nth-child(2)]:delay-[75ms] [&>*:nth-child(3)]:delay-[150ms] [&>*:nth-child(4)]:delay-[225ms] [&>*:nth-child(5)]:delay-[300ms]',
    reducedMotionFallback: 'motion-reduce:[&>*]:animate-none',
    duration: '500ms',
    description: 'List items fade in sequentially — creates rhythm and flow',
  },
  {
    id: 'list-reorder-layout',
    name: 'List Reorder Layout',
    category: 'list',
    purpose: ['orientation', 'user-feedback'],
    tailwindClasses: '[&>*]:transition-all [&>*]:duration-300',
    reducedMotionFallback: 'motion-reduce:[&>*]:transition-none',
    duration: '300ms',
    description: 'List items animate to new positions on reorder — smooth layout shifts using FLIP technique',
  },
  {
    id: 'list-delete-shrink',
    name: 'List Delete Shrink',
    category: 'list',
    purpose: ['user-feedback', 'orientation'],
    tailwindClasses: 'transition-all duration-300',
    css: '.list-delete-shrink[data-deleting="true"] { max-height: 0; opacity: 0; margin: 0; padding: 0; overflow: hidden; }',
    reducedMotionFallback: 'motion-reduce:transition-none',
    duration: '300ms',
    description: 'List item shrinks and fades out on delete — smooth removal animation',
  },
  {
    id: 'list-add-expand',
    name: 'List Add Expand',
    category: 'list',
    purpose: ['orientation', 'delight'],
    tailwindClasses: '',
    css: '.list-add-expand[data-new="true"] { animation: expandIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); } @keyframes expandIn { from { max-height: 0; opacity: 0; transform: scaleY(0); } to { max-height: 500px; opacity: 1; transform: scaleY(1); } }',
    keyframes:
      '@keyframes expandIn { from { max-height: 0; opacity: 0; transform: scaleY(0); } to { max-height: 500px; opacity: 1; transform: scaleY(1); } }',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '400ms',
    description: 'New list item expands in — bouncy insertion effect',
  },
  {
    id: 'list-filter-shuffle',
    name: 'List Filter Shuffle',
    category: 'list',
    purpose: ['orientation'],
    tailwindClasses: '[&>*]:transition-all [&>*]:duration-400',
    css: '.list-filter-shuffle > [data-filtered="true"] { opacity: 0.3; transform: scale(0.95); pointer-events: none; }',
    reducedMotionFallback: 'motion-reduce:[&>*]:transition-none',
    duration: '400ms',
    description: 'Filtered items fade and shrink — visual separation of search results',
  },
];

export function registerListAnimationEffects(): void {
  // Registration handled by index.ts
}
