import type { IMicroInteraction } from '../component-registry/types.js';

export const scrollRevealAnimations: IMicroInteraction[] = [
  {
    id: 'scroll-fade-in',
    name: 'Scroll Fade In',
    category: 'scroll',
    purpose: ['orientation', 'delight'],
    tailwindClasses: 'opacity-0 transition-opacity duration-700 [&.in-view]:opacity-100',
    reducedMotionFallback: 'motion-reduce:opacity-100',
    duration: '700ms',
    description: 'Fades in when scrolled into view — use Intersection Observer to add .in-view class',
  },
  {
    id: 'scroll-parallax',
    name: 'Scroll Parallax',
    category: 'scroll',
    purpose: ['delight'],
    tailwindClasses: '',
    css: '.scroll-parallax { transition: transform 0.1s linear; } .scroll-parallax[data-speed="0.5"] { transform: translateY(calc(var(--scroll-y) * -0.5px)); }',
    reducedMotionFallback: 'motion-reduce:transform-none',
    duration: '0ms',
    description: 'Background moves slower than foreground — depth effect using CSS custom properties',
  },
  {
    id: 'scroll-sticky-reveal',
    name: 'Scroll Sticky Reveal',
    category: 'scroll',
    purpose: ['orientation'],
    tailwindClasses:
      'sticky top-0 opacity-0 transition-opacity duration-300 [&.is-stuck]:opacity-100 [&.is-stuck]:shadow-md',
    reducedMotionFallback: 'motion-reduce:opacity-100',
    duration: '300ms',
    description: 'Reveals sticky header on scroll — add .is-stuck class when scrolled past threshold',
  },
  {
    id: 'scroll-progress-bar',
    name: 'Scroll Progress Bar',
    category: 'scroll',
    purpose: ['progress', 'orientation'],
    tailwindClasses: 'fixed top-0 left-0 h-1 bg-brand-solid-default origin-left transition-transform duration-100',
    css: '.scroll-progress-bar { transform: scaleX(var(--scroll-progress, 0)); }',
    reducedMotionFallback: 'motion-reduce:transform-none motion-reduce:w-full',
    duration: '100ms',
    description: 'Horizontal bar showing scroll progress — update --scroll-progress CSS variable on scroll',
  },
  {
    id: 'scroll-timeline-grow',
    name: 'Scroll Timeline Grow',
    category: 'scroll',
    purpose: ['orientation', 'delight'],
    tailwindClasses: 'scale-95 opacity-0 transition-all duration-500 [&.in-view]:scale-100 [&.in-view]:opacity-100',
    reducedMotionFallback: 'motion-reduce:scale-100 motion-reduce:opacity-100',
    duration: '500ms',
    description: 'Timeline items grow into view — stagger .in-view class for sequential reveal',
  },
  {
    id: 'scroll-horizontal-slide',
    name: 'Scroll Horizontal Slide',
    category: 'scroll',
    purpose: ['orientation', 'delight'],
    tailwindClasses:
      '-translate-x-12 opacity-0 transition-all duration-600 [&.in-view]:translate-x-0 [&.in-view]:opacity-100',
    reducedMotionFallback: 'motion-reduce:translate-x-0 motion-reduce:opacity-100',
    duration: '600ms',
    description: 'Slides in from left on scroll — creates horizontal reveal effect for content sections',
  },
];

export function registerScrollRevealAnimations(): void {
  // Registration handled by index.ts
}
