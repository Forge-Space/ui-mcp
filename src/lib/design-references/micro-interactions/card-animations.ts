import type { IMicroInteraction } from '../component-registry/types.js';

export const cardAnimationEffects: IMicroInteraction[] = [
  {
    id: 'card-hover-lift-shadow',
    name: 'Card Hover Lift Shadow',
    category: 'card',
    purpose: ['user-feedback'],
    tailwindClasses: 'transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10',
    reducedMotionFallback:
      'motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none',
    duration: '200ms',
    description: 'Card lifts with expanding shadow on hover — classic interactive card effect',
  },
  {
    id: 'card-flip-reveal',
    name: 'Card Flip Reveal',
    category: 'card',
    purpose: ['delight'],
    tailwindClasses: '[perspective:1000px]',
    css: '.card-flip-reveal > .card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; } .card-flip-reveal:hover > .card-inner { transform: rotateY(180deg); } .card-flip-reveal .card-front, .card-flip-reveal .card-back { position: absolute; inset: 0; backface-visibility: hidden; } .card-flip-reveal .card-back { transform: rotateY(180deg); }',
    reducedMotionFallback: 'motion-reduce:[&>*]:transition-none motion-reduce:hover:[&>*]:transform-none',
    duration: '600ms',
    description: 'Card flips to reveal back side on hover — requires .card-front and .card-back children',
  },
  {
    id: 'card-stack-swipe',
    name: 'Card Stack Swipe',
    category: 'card',
    purpose: ['user-feedback', 'delight'],
    tailwindClasses: 'transition-transform duration-300',
    css: '.card-stack-swipe[data-swipe="left"] { transform: translateX(-150%) rotate(-15deg); opacity: 0; } .card-stack-swipe[data-swipe="right"] { transform: translateX(150%) rotate(15deg); opacity: 0; }',
    reducedMotionFallback: 'motion-reduce:transition-none',
    duration: '300ms',
    description: 'Card swipes left or right — Tinder-style interaction, toggle with data-swipe attribute',
  },
  {
    id: 'card-expand-detail',
    name: 'Card Expand Detail',
    category: 'card',
    purpose: ['orientation', 'delight'],
    tailwindClasses: 'transition-all duration-400 ease-out',
    css: '.card-expand-detail[data-expanded="true"] { position: fixed; inset: 5%; z-index: 50; transform: scale(1); } .card-expand-detail[data-expanded="false"] { transform: scale(1); }',
    reducedMotionFallback: 'motion-reduce:transition-none',
    duration: '400ms',
    description: 'Card expands to fill screen for detail view — toggle with data-expanded attribute',
  },
  {
    id: 'card-parallax-depth',
    name: 'Card Parallax Depth',
    category: 'card',
    purpose: ['delight'],
    tailwindClasses: '[perspective:1000px]',
    css: '.card-parallax-depth:hover { transform: rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)); transition: transform 0.1s ease-out; } .card-parallax-depth > .card-layer { transform: translateZ(var(--layer-depth, 0px)); transition: transform 0.1s ease-out; }',
    reducedMotionFallback: 'motion-reduce:hover:transform-none',
    duration: '100ms',
    description: 'Card tilts in 3D based on cursor position — requires JS to set --rotate-x/y and --layer-depth',
  },
];

export function registerCardAnimationEffects(): void {
  // Registration handled by index.ts
}
