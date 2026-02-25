import type { IMicroInteraction } from '../component-registry/types.js';

export const feedbackAnimationEffects: IMicroInteraction[] = [
  {
    id: 'feedback-success-check',
    name: 'Feedback Success Check',
    category: 'feedback',
    purpose: ['confirmation', 'delight'],
    tailwindClasses: '',
    css: '.feedback-success-check { animation: successPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); } @keyframes successPop { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.2); } 100% { transform: scale(1); opacity: 1; } }',
    keyframes:
      '@keyframes successPop { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.2); } 100% { transform: scale(1); opacity: 1; } }',
    reducedMotionFallback: 'motion-reduce:animate-none motion-reduce:opacity-100',
    duration: '500ms',
    description: 'Success checkmark pops in with bounce — form submission confirmation',
  },
  {
    id: 'feedback-error-shake',
    name: 'Feedback Error Shake',
    category: 'feedback',
    purpose: ['user-feedback'],
    tailwindClasses: '',
    css: '.feedback-error-shake { animation: errorShake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both; } @keyframes errorShake { 10%, 90% { transform: translateX(-2px); } 20%, 80% { transform: translateX(4px); } 30%, 50%, 70% { transform: translateX(-6px); } 40%, 60% { transform: translateX(6px); } }',
    keyframes:
      '@keyframes errorShake { 10%, 90% { transform: translateX(-2px); } 20%, 80% { transform: translateX(4px); } 30%, 50%, 70% { transform: translateX(-6px); } 40%, 60% { transform: translateX(6px); } }',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '500ms',
    description: 'Input shakes horizontally on error — instant validation feedback',
  },
  {
    id: 'feedback-confetti',
    name: 'Feedback Confetti',
    category: 'feedback',
    purpose: ['delight', 'confirmation'],
    tailwindClasses: '',
    css: '.feedback-confetti { position: relative; } .feedback-confetti::before { content: ""; position: absolute; inset: 0; background-image: radial-gradient(circle, var(--brand-solid-default) 20%, transparent 20%); background-size: 10px 10px; animation: confettiRise 1s ease-out forwards; opacity: 0; } @keyframes confettiRise { 0% { opacity: 1; transform: translateY(0) scale(1); } 100% { opacity: 0; transform: translateY(-100px) scale(0.5); } }',
    keyframes:
      '@keyframes confettiRise { 0% { opacity: 1; transform: translateY(0) scale(1); } 100% { opacity: 0; transform: translateY(-100px) scale(0.5); } }',
    reducedMotionFallback: 'motion-reduce:before:animate-none motion-reduce:before:opacity-0',
    duration: '1000ms',
    description: 'Confetti bursts upward — celebration effect for achievements',
  },
  {
    id: 'feedback-ripple-click',
    name: 'Feedback Ripple Click',
    category: 'feedback',
    purpose: ['user-feedback'],
    tailwindClasses: 'relative overflow-hidden',
    css: '.feedback-ripple-click::after { content: ""; position: absolute; inset: 50%; width: 0; height: 0; border-radius: 50%; background: rgba(255, 255, 255, 0.3); transform: translate(-50%, -50%); animation: rippleExpand 0.6s ease-out; pointer-events: none; } .feedback-ripple-click:active::after { animation: none; width: 200%; height: 200%; opacity: 0; } @keyframes rippleExpand { 0% { width: 0; height: 0; opacity: 0.5; } 100% { width: 200%; height: 200%; opacity: 0; } }',
    keyframes:
      '@keyframes rippleExpand { 0% { width: 0; height: 0; opacity: 0.5; } 100% { width: 200%; height: 200%; opacity: 0; } }',
    reducedMotionFallback: 'motion-reduce:after:animate-none',
    duration: '600ms',
    description: 'Material Design ripple on click — tactile button feedback',
  },
  {
    id: 'feedback-toast-slide',
    name: 'Feedback Toast Slide',
    category: 'feedback',
    purpose: ['user-feedback', 'orientation'],
    tailwindClasses: 'animate-in slide-in-from-top-full fade-in-0 duration-300',
    css: '.feedback-toast-slide[data-state="closed"] { animation: slideOut 200ms ease-in forwards; } @keyframes slideOut { to { transform: translateY(-100%); opacity: 0; } }',
    keyframes: '@keyframes slideOut { to { transform: translateY(-100%); opacity: 0; } }',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '300ms',
    description: 'Toast notification slides in from top — non-blocking user feedback',
  },
];

export function registerFeedbackAnimationEffects(): void {
  // Registration handled by index.ts
}
