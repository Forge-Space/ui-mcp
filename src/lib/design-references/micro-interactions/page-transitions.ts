import type { IMicroInteraction } from '../component-registry/types.js';

export const pageTransitionAnimations: IMicroInteraction[] = [
  {
    id: 'page-fade-crossfade',
    name: 'Page Fade Crossfade',
    category: 'transition',
    purpose: ['orientation'],
    tailwindClasses: 'transition-opacity duration-300',
    css: '.page-exit { opacity: 1; } .page-exit-active { opacity: 0; } .page-enter { opacity: 0; } .page-enter-active { opacity: 1; transition: opacity 300ms; }',
    reducedMotionFallback: 'motion-reduce:transition-none',
    duration: '300ms',
    description: 'Simple crossfade between pages — minimal, fast page transition',
  },
  {
    id: 'page-slide-stack',
    name: 'Page Slide Stack',
    category: 'transition',
    purpose: ['orientation'],
    tailwindClasses: '',
    css: '.page-exit { transform: translateX(0); } .page-exit-active { transform: translateX(-30%); opacity: 0.5; transition: all 400ms ease-in-out; } .page-enter { transform: translateX(100%); } .page-enter-active { transform: translateX(0); transition: all 400ms ease-in-out; }',
    reducedMotionFallback: 'motion-reduce:transition-none motion-reduce:transform-none',
    duration: '400ms',
    description: 'New page slides in, old page slides out — native app-style navigation',
  },
  {
    id: 'page-morph-layout',
    name: 'Page Morph Layout',
    category: 'transition',
    purpose: ['orientation', 'delight'],
    tailwindClasses: '',
    css: '.page-exit { transform: scale(1); opacity: 1; } .page-exit-active { transform: scale(0.95); opacity: 0; transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1); } .page-enter { transform: scale(1.05); opacity: 0; } .page-enter-active { transform: scale(1); opacity: 1; transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1); }',
    reducedMotionFallback: 'motion-reduce:transition-none motion-reduce:transform-none',
    duration: '300ms',
    description: 'Pages scale and morph during transition — smooth layout shift effect',
  },
  {
    id: 'page-zoom-portal',
    name: 'Page Zoom Portal',
    category: 'transition',
    purpose: ['orientation', 'delight'],
    tailwindClasses: '',
    css: '.page-exit { transform: scale(1); opacity: 1; } .page-exit-active { transform: scale(1.2); opacity: 0; transition: all 500ms cubic-bezier(0.34, 1.56, 0.64, 1); } .page-enter { transform: scale(0.8); opacity: 0; } .page-enter-active { transform: scale(1); opacity: 1; transition: all 500ms cubic-bezier(0.34, 1.56, 0.64, 1); }',
    reducedMotionFallback: 'motion-reduce:transition-none motion-reduce:transform-none',
    duration: '500ms',
    description: 'Portal-like zoom transition between pages — dramatic, attention-grabbing',
  },
  {
    id: 'page-shared-element',
    name: 'Page Shared Element',
    category: 'transition',
    purpose: ['orientation', 'delight'],
    tailwindClasses: '',
    css: '.shared-element { view-transition-name: var(--transition-name); } @supports (view-transition-name: none) { ::view-transition-old(root), ::view-transition-new(root) { animation-duration: 400ms; } }',
    reducedMotionFallback: 'motion-reduce:animation-none',
    duration: '400ms',
    description:
      'Shared element morphs between pages — uses View Transitions API, requires --transition-name CSS variable',
  },
];

export function registerPageTransitionAnimations(): void {
  // Registration handled by index.ts
}
