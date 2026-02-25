import type { IMicroInteraction } from '../component-registry/types.js';

export const entranceFadeAnimations: IMicroInteraction[] = [
  {
    id: 'fade-in-up',
    name: 'Fade In Up',
    category: 'entrance',
    purpose: ['orientation'],
    tailwindClasses: 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500',
    reducedMotionFallback: 'motion-reduce:animate-none motion-reduce:opacity-100',
    duration: '500ms',
    description: 'Fades in while sliding up — default entrance for cards, sections, and content blocks',
  },
  {
    id: 'fade-in-down',
    name: 'Fade In Down',
    category: 'entrance',
    purpose: ['orientation'],
    tailwindClasses: 'animate-in fade-in-0 slide-in-from-top-4 duration-500',
    reducedMotionFallback: 'motion-reduce:animate-none motion-reduce:opacity-100',
    duration: '500ms',
    description: 'Fades in while sliding down — for header notifications and dropdowns',
  },
  {
    id: 'fade-in-left',
    name: 'Fade In Left',
    category: 'entrance',
    purpose: ['orientation'],
    tailwindClasses: 'animate-in fade-in-0 slide-in-from-left-8 duration-500',
    reducedMotionFallback: 'motion-reduce:animate-none motion-reduce:opacity-100',
    duration: '500ms',
    description: 'Fades in while sliding from left — for sidebar content and navigation panels',
  },
  {
    id: 'fade-in-right',
    name: 'Fade In Right',
    category: 'entrance',
    purpose: ['orientation'],
    tailwindClasses: 'animate-in fade-in-0 slide-in-from-right-8 duration-500',
    reducedMotionFallback: 'motion-reduce:animate-none motion-reduce:opacity-100',
    duration: '500ms',
    description: 'Fades in while sliding from right — for detail panels and sheet reveals',
  },
  {
    id: 'fade-in-scale',
    name: 'Fade In Scale',
    category: 'entrance',
    purpose: ['attention', 'delight'],
    tailwindClasses: 'animate-in fade-in-0 zoom-in-90 duration-400',
    reducedMotionFallback: 'motion-reduce:animate-none motion-reduce:opacity-100',
    duration: '400ms',
    description: 'Fades in while scaling from 90% — premium entrance for modals and hero elements',
  },
  {
    id: 'fade-in-rotate',
    name: 'Fade In Rotate',
    category: 'entrance',
    purpose: ['delight'],
    tailwindClasses: 'animate-in fade-in-0 duration-500',
    css: '.fade-in-rotate { animation: fadeInRotate 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); } @keyframes fadeInRotate { from { opacity: 0; transform: rotate(-5deg) scale(0.95); } to { opacity: 1; transform: rotate(0deg) scale(1); } }',
    keyframes:
      '@keyframes fadeInRotate { from { opacity: 0; transform: rotate(-5deg) scale(0.95); } to { opacity: 1; transform: rotate(0deg) scale(1); } }',
    reducedMotionFallback: 'motion-reduce:animate-none motion-reduce:opacity-100',
    duration: '500ms',
    description: 'Fades in with subtle rotation — playful entrance for cards and images',
  },
  {
    id: 'fade-stagger-children',
    name: 'Fade Stagger Children',
    category: 'entrance',
    purpose: ['orientation', 'delight'],
    tailwindClasses:
      '[&>*]:animate-in [&>*]:fade-in-0 [&>*]:slide-in-from-bottom-2 [&>*:nth-child(1)]:delay-[0ms] [&>*:nth-child(2)]:delay-[100ms] [&>*:nth-child(3)]:delay-[200ms] [&>*:nth-child(4)]:delay-[300ms] [&>*:nth-child(5)]:delay-[400ms]',
    reducedMotionFallback: 'motion-reduce:[&>*]:animate-none',
    duration: '500ms',
    description: 'Staggers entrance of child elements — for lists, grids, and feature sections',
  },
  {
    id: 'fade-in-blur',
    name: 'Fade In Blur',
    category: 'entrance',
    purpose: ['attention', 'delight'],
    tailwindClasses: '',
    css: '.fade-in-blur { animation: fadeInBlur 0.8s cubic-bezier(0.16, 1, 0.3, 1); } @keyframes fadeInBlur { from { opacity: 0; filter: blur(12px); transform: scale(0.98); } to { opacity: 1; filter: blur(0); transform: scale(1); } }',
    keyframes:
      '@keyframes fadeInBlur { from { opacity: 0; filter: blur(12px); transform: scale(0.98); } to { opacity: 1; filter: blur(0); transform: scale(1); } }',
    reducedMotionFallback: 'motion-reduce:animate-none motion-reduce:opacity-100',
    duration: '800ms',
    description: 'Premium blur-to-focus entrance — for hero sections and featured content',
  },
];

export function registerEntranceFadeAnimations(): void {
  // Registration handled by index.ts
}
