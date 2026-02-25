import type { IMicroInteraction } from '../component-registry/types.js';

export const entranceSlideAnimations: IMicroInteraction[] = [
  {
    id: 'slide-up-spring',
    name: 'Slide Up Spring',
    category: 'entrance',
    purpose: ['orientation', 'delight'],
    tailwindClasses: '',
    css: '.slide-up-spring { animation: slideUpSpring 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); } @keyframes slideUpSpring { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }',
    keyframes:
      '@keyframes slideUpSpring { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }',
    reducedMotionFallback: 'motion-reduce:animate-none motion-reduce:opacity-100',
    duration: '600ms',
    description: 'Bouncy spring slide up — adds personality to card and section reveals',
  },
  {
    id: 'slide-down-bounce',
    name: 'Slide Down Bounce',
    category: 'entrance',
    purpose: ['attention', 'delight'],
    tailwindClasses: '',
    css: '.slide-down-bounce { animation: slideDownBounce 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55); } @keyframes slideDownBounce { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }',
    keyframes:
      '@keyframes slideDownBounce { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }',
    reducedMotionFallback: 'motion-reduce:animate-none motion-reduce:opacity-100',
    duration: '700ms',
    description: 'Bounces down with overshoot — playful for notifications and alerts',
  },
  {
    id: 'slide-left-smooth',
    name: 'Slide Left Smooth',
    category: 'entrance',
    purpose: ['orientation'],
    tailwindClasses: 'animate-in slide-in-from-right-full duration-500 ease-out',
    reducedMotionFallback: 'motion-reduce:animate-none motion-reduce:opacity-100',
    duration: '500ms',
    description: 'Smooth slide from right to left — for carousel transitions and content panels',
  },
  {
    id: 'slide-right-smooth',
    name: 'Slide Right Smooth',
    category: 'entrance',
    purpose: ['orientation'],
    tailwindClasses: 'animate-in slide-in-from-left-full duration-500 ease-out',
    reducedMotionFallback: 'motion-reduce:animate-none motion-reduce:opacity-100',
    duration: '500ms',
    description: 'Smooth slide from left to right — for back navigation and reverse transitions',
  },
  {
    id: 'slide-bounce-in',
    name: 'Slide Bounce In',
    category: 'entrance',
    purpose: ['attention', 'delight'],
    tailwindClasses: '',
    css: '.slide-bounce-in { animation: slideBounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); } @keyframes slideBounceIn { 0% { opacity: 0; transform: translateX(-100px) scale(0.8); } 60% { opacity: 1; transform: translateX(10px) scale(1.05); } 100% { transform: translateX(0) scale(1); } }',
    keyframes:
      '@keyframes slideBounceIn { 0% { opacity: 0; transform: translateX(-100px) scale(0.8); } 60% { opacity: 1; transform: translateX(10px) scale(1.05); } 100% { transform: translateX(0) scale(1); } }',
    reducedMotionFallback: 'motion-reduce:animate-none motion-reduce:opacity-100',
    duration: '800ms',
    description: 'Dramatic slide with bounce and overshoot — use sparingly for key moments',
  },
  {
    id: 'slide-spring-up',
    name: 'Slide Spring Up',
    category: 'entrance',
    purpose: ['orientation', 'delight'],
    tailwindClasses: '',
    css: '.slide-spring-up { animation: slideSpringUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); } @keyframes slideSpringUp { from { opacity: 0; transform: translateY(60px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }',
    keyframes:
      '@keyframes slideSpringUp { from { opacity: 0; transform: translateY(60px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }',
    reducedMotionFallback: 'motion-reduce:animate-none motion-reduce:opacity-100',
    duration: '500ms',
    description: 'Gentle spring upward with scale — balanced energy for buttons and CTA sections',
  },
];

export function registerEntranceSlideAnimations(): void {
  // Registration handled by index.ts
}
