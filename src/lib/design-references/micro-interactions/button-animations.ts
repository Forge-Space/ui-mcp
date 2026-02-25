import type { IMicroInteraction } from '../component-registry/types.js';

export const buttonAnimationEffects: IMicroInteraction[] = [
  {
    id: 'btn-press-scale',
    name: 'Button Press Scale',
    category: 'button',
    purpose: ['user-feedback'],
    tailwindClasses: 'active:scale-[0.97] transition-transform duration-100',
    reducedMotionFallback: 'motion-reduce:transition-none motion-reduce:active:scale-100',
    duration: '100ms',
    description: 'Subtle press-down scale on click — tactile button feedback',
  },
  {
    id: 'btn-loading-spinner',
    name: 'Button Loading Spinner',
    category: 'button',
    purpose: ['progress', 'user-feedback'],
    tailwindClasses: 'relative',
    css: '.btn-loading-spinner[data-loading="true"] { pointer-events: none; } .btn-loading-spinner[data-loading="true"]::before { content: ""; position: absolute; left: 50%; top: 50%; width: 1rem; height: 1rem; margin: -0.5rem 0 0 -0.5rem; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: spin 0.6s linear infinite; } .btn-loading-spinner[data-loading="true"] > * { opacity: 0; } @keyframes spin { to { transform: rotate(360deg); } }',
    keyframes: '@keyframes spin { to { transform: rotate(360deg); } }',
    reducedMotionFallback: 'motion-reduce:before:animate-none',
    duration: '600ms',
    description: 'Button shows spinner on loading state — toggle with data-loading attribute',
  },
  {
    id: 'btn-success-morph',
    name: 'Button Success Morph',
    category: 'button',
    purpose: ['confirmation', 'delight'],
    tailwindClasses: 'transition-all duration-300',
    css: '.btn-success-morph[data-state="success"] { background: var(--success-bg); color: var(--success-text); } .btn-success-morph[data-state="success"]::before { content: "✓"; animation: successPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); } @keyframes successPop { from { transform: scale(0); } to { transform: scale(1); } }',
    keyframes: '@keyframes successPop { from { transform: scale(0); } to { transform: scale(1); } }',
    reducedMotionFallback: 'motion-reduce:before:animate-none',
    duration: '400ms',
    description: 'Button morphs to show success state — instant visual confirmation',
  },
  {
    id: 'btn-hover-fill',
    name: 'Button Hover Fill',
    category: 'button',
    purpose: ['user-feedback', 'attention'],
    tailwindClasses: 'relative overflow-hidden',
    css: '.btn-hover-fill::before { content: ""; position: absolute; inset: 0; background: var(--brand-solid-hover); transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease-out; z-index: -1; } .btn-hover-fill:hover::before { transform: scaleX(1); }',
    reducedMotionFallback: 'motion-reduce:before:transition-none',
    duration: '300ms',
    description: 'Fill slides in from left on hover — dynamic button interaction',
  },
  {
    id: 'btn-magnetic-pull',
    name: 'Button Magnetic Pull',
    category: 'button',
    purpose: ['delight', 'user-feedback'],
    tailwindClasses: 'transition-transform duration-200 ease-out',
    css: '.btn-magnetic-pull:hover { transform: translate(var(--magnetic-x, 0), var(--magnetic-y, 0)) scale(1.05); }',
    reducedMotionFallback: 'motion-reduce:transition-none motion-reduce:hover:transform-none',
    duration: '200ms',
    description: 'Button moves toward cursor with slight scale — requires JS to set --magnetic-x/y',
  },
];

export function registerButtonAnimationEffects(): void {
  // Registration handled by index.ts
}
