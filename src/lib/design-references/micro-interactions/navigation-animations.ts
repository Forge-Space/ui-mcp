import type { IMicroInteraction } from '../component-registry/types.js';

export const navigationAnimationEffects: IMicroInteraction[] = [
  {
    id: 'nav-underline-slide',
    name: 'Nav Underline Slide',
    category: 'navigation',
    purpose: ['user-feedback', 'orientation'],
    tailwindClasses: 'relative',
    css: '.nav-underline-slide::after { content: ""; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: var(--brand-solid-default); transition: width 0.3s ease-out, left 0.3s ease-out; } .nav-underline-slide.active::after { width: 100%; } .nav-underline-slide:hover::after { width: 100%; }',
    reducedMotionFallback: 'motion-reduce:after:transition-none',
    duration: '300ms',
    description: 'Underline slides in on active/hover — clean navigation indicator',
  },
  {
    id: 'nav-indicator-morph',
    name: 'Nav Indicator Morph',
    category: 'navigation',
    purpose: ['orientation', 'delight'],
    tailwindClasses: 'relative',
    css: '.nav-indicator-morph-container { position: relative; } .nav-indicator-morph-container::before { content: ""; position: absolute; background: var(--brand-solid-default); border-radius: 9999px; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); left: var(--indicator-left, 0); width: var(--indicator-width, 0); height: 2px; bottom: 0; }',
    reducedMotionFallback: 'motion-reduce:before:transition-none',
    duration: '400ms',
    description: 'Indicator morphs and slides between nav items — requires JS to set --indicator-left/width',
  },
  {
    id: 'nav-menu-expand',
    name: 'Nav Menu Expand',
    category: 'navigation',
    purpose: ['orientation'],
    tailwindClasses: '',
    css: '.nav-menu-expand[data-state="open"] { animation: menuExpand 0.3s cubic-bezier(0.16, 1, 0.3, 1); } .nav-menu-expand[data-state="closed"] { animation: menuCollapse 0.2s ease-in; } @keyframes menuExpand { from { opacity: 0; max-height: 0; } to { opacity: 1; max-height: 500px; } } @keyframes menuCollapse { to { opacity: 0; max-height: 0; } }',
    keyframes:
      '@keyframes menuExpand { from { opacity: 0; max-height: 0; } to { opacity: 1; max-height: 500px; } } @keyframes menuCollapse { to { opacity: 0; max-height: 0; } }',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '300ms',
    description: 'Mobile menu expands/collapses smoothly — accordion-style navigation',
  },
  {
    id: 'nav-breadcrumb-trail',
    name: 'Nav Breadcrumb Trail',
    category: 'navigation',
    purpose: ['orientation', 'delight'],
    tailwindClasses:
      '[&>*]:animate-in [&>*]:fade-in-0 [&>*]:slide-in-from-left-2 [&>*:nth-child(1)]:delay-[0ms] [&>*:nth-child(2)]:delay-[50ms] [&>*:nth-child(3)]:delay-[100ms] [&>*:nth-child(4)]:delay-[150ms]',
    reducedMotionFallback: 'motion-reduce:[&>*]:animate-none',
    duration: '300ms',
    description: 'Breadcrumb items cascade in sequentially — creates path visualization',
  },
];

export function registerNavigationAnimationEffects(): void {
  // Registration handled by index.ts
}
