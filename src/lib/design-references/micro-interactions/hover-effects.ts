import type { IMicroInteraction } from '../component-registry/types.js';

export const hoverEffectAnimations: IMicroInteraction[] = [
  {
    id: 'hover-lift-shadow',
    name: 'Hover Lift Shadow',
    category: 'hover',
    purpose: ['user-feedback'],
    tailwindClasses: 'transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10',
    reducedMotionFallback: 'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
    duration: '200ms',
    description: 'Lifts element with expanding shadow — Linear-inspired card interaction',
  },
  {
    id: 'hover-glow-primary',
    name: 'Hover Glow Primary',
    category: 'hover',
    purpose: ['user-feedback', 'attention'],
    tailwindClasses: 'transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(var(--brand-solid-default-rgb),0.2)]',
    reducedMotionFallback: 'motion-reduce:transition-none',
    duration: '300ms',
    description: 'Brand-colored glow on hover — premium button and card effect',
  },
  {
    id: 'hover-tilt-3d',
    name: 'Hover Tilt 3D',
    category: 'hover',
    purpose: ['delight', 'user-feedback'],
    tailwindClasses:
      'transition-transform duration-200 hover:[transform:perspective(1000px)_rotateX(2deg)_rotateY(2deg)]',
    reducedMotionFallback: 'motion-reduce:transition-none motion-reduce:hover:transform-none',
    duration: '200ms',
    description: '3D tilt effect on hover — playful card interaction requiring mouse position tracking',
  },
  {
    id: 'hover-magnetic',
    name: 'Hover Magnetic',
    category: 'hover',
    purpose: ['delight', 'user-feedback'],
    tailwindClasses: 'transition-transform duration-150 ease-out',
    css: '.hover-magnetic:hover { transform: translate(var(--magnetic-x, 0), var(--magnetic-y, 0)); }',
    reducedMotionFallback: 'motion-reduce:transition-none motion-reduce:hover:transform-none',
    duration: '150ms',
    description: 'Button moves toward cursor — requires JS to set --magnetic-x/y CSS variables',
  },
  {
    id: 'hover-border-beam',
    name: 'Hover Border Beam',
    category: 'hover',
    purpose: ['attention', 'delight'],
    tailwindClasses:
      'relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-brand-solid-default before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100',
    css: '.hover-border-beam::before { mask: linear-gradient(90deg, transparent, white 50%, transparent); mask-size: 200% 100%; animation: beamSlide 1.5s infinite; } @keyframes beamSlide { to { mask-position: -200% 0; } }',
    keyframes: '@keyframes beamSlide { to { mask-position: -200% 0; } }',
    reducedMotionFallback: 'motion-reduce:before:animate-none motion-reduce:before:opacity-0',
    duration: '1500ms',
    description: 'Animated border beam on hover — premium card highlight effect',
  },
  {
    id: 'hover-shine-sweep',
    name: 'Hover Shine Sweep',
    category: 'hover',
    purpose: ['delight', 'user-feedback'],
    tailwindClasses:
      'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
    reducedMotionFallback: 'motion-reduce:before:transition-none motion-reduce:before:translate-x-0',
    duration: '700ms',
    description: 'Shine sweeps across on hover — glass-morphism button effect',
  },
  {
    id: 'hover-glitch',
    name: 'Hover Glitch',
    category: 'hover',
    purpose: ['delight'],
    tailwindClasses: '',
    css: '.hover-glitch:hover { animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); } @keyframes glitch { 0%, 100% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(2px, -2px); } 60% { transform: translate(-2px, -2px); } 80% { transform: translate(2px, 2px); } }',
    keyframes:
      '@keyframes glitch { 0%, 100% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(2px, -2px); } 60% { transform: translate(-2px, -2px); } 80% { transform: translate(2px, 2px); } }',
    reducedMotionFallback: 'motion-reduce:hover:animate-none',
    duration: '300ms',
    description: 'Glitch effect on hover — edgy, experimental UI accent',
  },
  {
    id: 'hover-flip-horizontal',
    name: 'Hover Flip Horizontal',
    category: 'hover',
    purpose: ['delight', 'user-feedback'],
    tailwindClasses:
      'transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]',
    reducedMotionFallback: 'motion-reduce:transition-none motion-reduce:hover:transform-none',
    duration: '500ms',
    description: 'Card flips to reveal back — requires front/back child elements with backface-visibility',
  },
];

export function registerHoverEffectAnimations(): void {
  // Registration handled by index.ts
}
