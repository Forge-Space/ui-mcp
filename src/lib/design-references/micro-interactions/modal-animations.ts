import type { IMicroInteraction } from '../component-registry/types.js';

export const modalAnimationEffects: IMicroInteraction[] = [
  {
    id: 'modal-spring-scale',
    name: 'Modal Spring Scale',
    category: 'modal',
    purpose: ['orientation', 'delight'],
    tailwindClasses: '',
    css: '.modal-spring-scale[data-state="open"] { animation: modalSpringIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); } .modal-spring-scale[data-state="closed"] { animation: modalSpringOut 0.3s ease-in; } @keyframes modalSpringIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } } @keyframes modalSpringOut { to { opacity: 0; transform: scale(0.9); } }',
    keyframes:
      '@keyframes modalSpringIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } } @keyframes modalSpringOut { to { opacity: 0; transform: scale(0.9); } }',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '500ms',
    description: 'Modal bounces in with spring effect — playful dialog entrance',
  },
  {
    id: 'modal-slide-drawer',
    name: 'Modal Slide Drawer',
    category: 'modal',
    purpose: ['orientation'],
    tailwindClasses: '',
    css: '.modal-slide-drawer[data-state="open"] { animation: drawerSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); } .modal-slide-drawer[data-state="closed"] { animation: drawerSlideOut 0.3s ease-in; } @keyframes drawerSlideIn { from { transform: translateX(100%); } to { transform: translateX(0); } } @keyframes drawerSlideOut { to { transform: translateX(100%); } }',
    keyframes:
      '@keyframes drawerSlideIn { from { transform: translateX(100%); } to { transform: translateX(0); } } @keyframes drawerSlideOut { to { transform: translateX(100%); } }',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '400ms',
    description: 'Side drawer slides in from right — sheet/panel entrance',
  },
  {
    id: 'modal-blur-backdrop',
    name: 'Modal Blur Backdrop',
    category: 'modal',
    purpose: ['orientation', 'delight'],
    tailwindClasses: 'transition-all duration-300',
    css: '.modal-blur-backdrop[data-state="open"] { backdrop-filter: blur(8px); background: rgba(0, 0, 0, 0.5); } .modal-blur-backdrop[data-state="closed"] { backdrop-filter: blur(0); background: rgba(0, 0, 0, 0); }',
    reducedMotionFallback: 'motion-reduce:transition-none motion-reduce:backdrop-filter-none',
    duration: '300ms',
    description: 'Backdrop blurs when modal opens — premium depth effect',
  },
  {
    id: 'modal-morph-origin',
    name: 'Modal Morph Origin',
    category: 'modal',
    purpose: ['orientation', 'delight'],
    tailwindClasses: '',
    css: '.modal-morph-origin[data-state="open"] { animation: morphExpand 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); transform-origin: var(--origin-x, 50%) var(--origin-y, 50%); } @keyframes morphExpand { from { opacity: 0; transform: scale(0) translate(var(--origin-offset-x, 0), var(--origin-offset-y, 0)); border-radius: 50%; } to { opacity: 1; transform: scale(1) translate(0, 0); border-radius: 0.5rem; } }',
    keyframes:
      '@keyframes morphExpand { from { opacity: 0; transform: scale(0) translate(var(--origin-offset-x, 0), var(--origin-offset-y, 0)); border-radius: 50%; } to { opacity: 1; transform: scale(1) translate(0, 0); border-radius: 0.5rem; } }',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '500ms',
    description: 'Modal expands from trigger element — requires JS to set --origin-x/y CSS variables',
  },
];

export function registerModalAnimationEffects(): void {
  // Registration handled by index.ts
}
