import type { IMicroInteraction, AnimationCategory } from '../component-registry/types.js';

import { entranceFadeAnimations } from './entrance-fade.js';
import { entranceSlideAnimations } from './entrance-slide.js';
import { scrollRevealAnimations } from './scroll-reveal.js';
import { hoverEffectAnimations } from './hover-effects.js';
import { textAnimationEffects } from './text-animations.js';
import { loadingStateAnimations } from './loading-states.js';
import { pageTransitionAnimations } from './page-transitions.js';
import { feedbackAnimationEffects } from './feedback-animations.js';
import { backgroundEffectAnimations } from './background-effects.js';
import { buttonAnimationEffects } from './button-animations.js';
import { cardAnimationEffects } from './card-animations.js';
import { listAnimationEffects } from './list-animations.js';
import { modalAnimationEffects } from './modal-animations.js';
import { navigationAnimationEffects } from './navigation-animations.js';
import { chartAnimationEffects } from './chart-animations.js';

// --- Micro-Interaction Registry ---

const interactions: IMicroInteraction[] = [];

export function registerInteraction(interaction: IMicroInteraction): void {
  const exists = interactions.findIndex((i) => i.id === interaction.id);
  if (exists >= 0) {
    interactions[exists] = interaction;
  } else {
    interactions.push(interaction);
  }
}

export function registerInteractions(items: IMicroInteraction[]): void {
  for (const item of items) {
    registerInteraction(item);
  }
}

export function getMicroInteraction(id: string): IMicroInteraction | undefined {
  return interactions.find((i) => i.id === id);
}

export function getInteractionsByCategory(category: AnimationCategory): IMicroInteraction[] {
  return interactions.filter((i) => i.category === category);
}

/**
 * Get all registered micro-interactions as a frozen shallow copy.
 * Note: This is a shallow freeze - nested objects within interactions are not frozen.
 * For deep immutability, consider using a deep freeze utility or immutable data structures.
 */
export function getAllInteractions(): readonly IMicroInteraction[] {
  return Object.freeze([...interactions]);
}

/**
 * Clear all registered interactions (for testing).
 */
export function clearAllMicroInteractions(): void {
  interactions.length = 0;
  initialized = false;
}

// --- Entrance Animations ---

const entranceAnimations: IMicroInteraction[] = [
  {
    id: 'fade-up',
    name: 'Fade Up',
    category: 'entrance',
    purpose: ['orientation'],
    tailwindClasses: 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '500ms',
    description: 'Fades in while sliding up from below — default entrance for cards and sections',
  },
  {
    id: 'fade-in',
    name: 'Fade In',
    category: 'entrance',
    purpose: ['orientation'],
    tailwindClasses: 'animate-in fade-in-0 duration-300',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '300ms',
    description: 'Simple opacity fade — minimal entrance for subtle elements',
  },
  {
    id: 'slide-in-left',
    name: 'Slide In Left',
    category: 'entrance',
    purpose: ['orientation'],
    tailwindClasses: 'animate-in slide-in-from-left-8 fade-in-0 duration-500',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '500ms',
    description: 'Slides in from the left — for sidebar or navigation reveals',
  },
  {
    id: 'slide-in-right',
    name: 'Slide In Right',
    category: 'entrance',
    purpose: ['orientation'],
    tailwindClasses: 'animate-in slide-in-from-right-8 fade-in-0 duration-500',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '500ms',
    description: 'Slides in from the right — for panel or drawer reveals',
  },
  {
    id: 'scale-in',
    name: 'Scale In',
    category: 'entrance',
    purpose: ['attention'],
    tailwindClasses: 'animate-in zoom-in-95 fade-in-0 duration-200',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '200ms',
    description: 'Scales up from 95% — for dialogs and popovers',
  },
  {
    id: 'blur-in',
    name: 'Blur In',
    category: 'entrance',
    purpose: ['attention', 'delight'],
    tailwindClasses: 'animate-in fade-in-0 duration-700',
    keyframes: '@keyframes blur-in { from { filter: blur(8px); opacity: 0; } to { filter: blur(0); opacity: 1; } }',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '700ms',
    description: 'Fades in while deblurring — premium entrance for hero sections',
  },
];

// --- Hover Animations ---

const hoverAnimations: IMicroInteraction[] = [
  {
    id: 'hover-lift',
    name: 'Hover Lift',
    category: 'hover',
    purpose: ['user-feedback'],
    tailwindClasses: 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
    reducedMotionFallback: 'motion-reduce:transition-none',
    duration: '200ms',
    description: 'Subtle lift with shadow — Linear-style card hover feedback',
  },
  {
    id: 'hover-glow',
    name: 'Hover Glow',
    category: 'hover',
    purpose: ['user-feedback', 'attention'],
    tailwindClasses: 'transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)]',
    reducedMotionFallback: 'motion-reduce:transition-none',
    duration: '300ms',
    description: 'Soft glow using primary color — premium button/card hover',
  },
  {
    id: 'hover-scale',
    name: 'Hover Scale',
    category: 'hover',
    purpose: ['user-feedback'],
    tailwindClasses: 'transition-transform duration-200 hover:scale-[1.02]',
    reducedMotionFallback: 'motion-reduce:transition-none',
    duration: '200ms',
    description: 'Subtle scale up — for interactive cards and images',
  },
  {
    id: 'hover-brightness',
    name: 'Hover Brightness',
    category: 'hover',
    purpose: ['user-feedback'],
    tailwindClasses: 'transition-all duration-200 hover:brightness-110',
    reducedMotionFallback: 'motion-reduce:transition-none',
    duration: '200ms',
    description: 'Brightness increase — for image overlays and gradient elements',
  },
];

// --- Loading Animations ---

const loadingAnimations: IMicroInteraction[] = [
  {
    id: 'skeleton-shimmer',
    name: 'Skeleton Shimmer',
    category: 'loading',
    purpose: ['progress', 'orientation'],
    tailwindClasses: 'animate-pulse rounded-md bg-muted',
    reducedMotionFallback: 'motion-reduce:animate-none bg-muted',
    duration: '2000ms',
    description: 'Pulsing skeleton placeholder — matches content shape for low CLS',
  },
  {
    id: 'spinner-ring',
    name: 'Spinner Ring',
    category: 'loading',
    purpose: ['progress'],
    tailwindClasses: 'animate-spin',
    css: '.animate-spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }',
    keyframes: '@keyframes spin { to { transform: rotate(360deg); } }',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '1000ms',
    description: 'Rotating ring spinner — use sparingly, prefer skeletons',
  },
  {
    id: 'dot-bounce',
    name: 'Dot Bounce',
    category: 'loading',
    purpose: ['progress'],
    tailwindClasses: 'flex gap-1',
    css: '.dot-bounce span { animation: bounce 1.4s infinite ease-in-out both; width: 0.5rem; height: 0.5rem; border-radius: 9999px; background: currentColor; } .dot-bounce span:nth-child(1) { animation-delay: -0.32s; } .dot-bounce span:nth-child(2) { animation-delay: -0.16s; }',
    keyframes: '@keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '1400ms',
    description: 'Three bouncing dots — for inline loading indicators',
  },
];

// --- Feedback Animations ---

const feedbackAnimations: IMicroInteraction[] = [
  {
    id: 'success-check',
    name: 'Success Check',
    category: 'feedback',
    purpose: ['confirmation', 'delight'],
    tailwindClasses: 'animate-in zoom-in-0 duration-300',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '300ms',
    description: 'Scale-in success indicator — for form submissions and confirmations',
  },
  {
    id: 'error-shake',
    name: 'Error Shake',
    category: 'feedback',
    purpose: ['user-feedback'],
    tailwindClasses: '',
    css: '.error-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }',
    keyframes:
      '@keyframes shake { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-4px); } 40%, 60% { transform: translateX(4px); } }',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '500ms',
    description: 'Horizontal shake — for form validation errors',
  },
  {
    id: 'button-press',
    name: 'Button Press',
    category: 'feedback',
    purpose: ['user-feedback'],
    tailwindClasses: 'active:scale-[0.98] transition-transform duration-100',
    reducedMotionFallback: 'motion-reduce:transition-none',
    duration: '100ms',
    description: 'Subtle press-down on click — tactile button feedback',
  },
  {
    id: 'toggle-spring',
    name: 'Toggle Spring',
    category: 'feedback',
    purpose: ['user-feedback', 'delight'],
    tailwindClasses: 'transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
    reducedMotionFallback: 'motion-reduce:transition-none',
    duration: '200ms',
    description: 'Spring-physics toggle — overshoots slightly for delight',
  },
];

// --- Text Animations ---

const textAnimations: IMicroInteraction[] = [
  {
    id: 'gradient-text',
    name: 'Gradient Text',
    category: 'text',
    purpose: ['attention', 'delight'],
    tailwindClasses: 'bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent',
    reducedMotionFallback: '',
    duration: '0ms',
    description: 'Static gradient text — premium heading effect',
  },
  {
    id: 'text-shimmer',
    name: 'Text Shimmer',
    category: 'text',
    purpose: ['attention', 'delight'],
    tailwindClasses:
      'bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent bg-[length:200%_100%]',
    css: '.text-shimmer { animation: shimmer 3s linear infinite; }',
    keyframes: '@keyframes shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }',
    reducedMotionFallback: 'motion-reduce:animate-none text-foreground',
    duration: '3000ms',
    description: 'Animated shimmer across text — use on hero headlines only',
  },
];

// --- Transition Animations ---

const transitionAnimations: IMicroInteraction[] = [
  {
    id: 'dialog-enter',
    name: 'Dialog Enter',
    category: 'transition',
    purpose: ['orientation'],
    tailwindClasses: 'animate-in fade-in-0 zoom-in-95 duration-200',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '200ms',
    description: 'Dialog/modal entrance — scale + fade',
  },
  {
    id: 'dialog-exit',
    name: 'Dialog Exit',
    category: 'transition',
    purpose: ['orientation'],
    tailwindClasses: 'animate-out fade-out-0 zoom-out-95 duration-150',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '150ms',
    description: 'Dialog/modal exit — reverse scale + fade',
  },
  {
    id: 'sheet-enter-right',
    name: 'Sheet Enter Right',
    category: 'transition',
    purpose: ['orientation'],
    tailwindClasses: 'animate-in slide-in-from-right fade-in-0 duration-300',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '300ms',
    description: 'Side sheet entrance from right edge',
  },
  {
    id: 'dropdown-enter',
    name: 'Dropdown Enter',
    category: 'transition',
    purpose: ['orientation'],
    tailwindClasses: 'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '150ms',
    description: 'Dropdown menu entrance — slight slide + scale from top',
  },
];

// --- Register all built-in animations ---

let initialized = false;

export function initializeInteractions(): void {
  if (initialized) return;
  registerInteractions([
    ...entranceAnimations,
    ...hoverAnimations,
    ...loadingAnimations,
    ...feedbackAnimations,
    ...textAnimations,
    ...transitionAnimations,
    // New animation arrays
    ...entranceFadeAnimations,
    ...entranceSlideAnimations,
    ...scrollRevealAnimations,
    ...hoverEffectAnimations,
    ...textAnimationEffects,
    ...loadingStateAnimations,
    ...pageTransitionAnimations,
    ...feedbackAnimationEffects,
    ...backgroundEffectAnimations,
    ...buttonAnimationEffects,
    ...cardAnimationEffects,
    ...listAnimationEffects,
    ...modalAnimationEffects,
    ...navigationAnimationEffects,
    ...chartAnimationEffects,
  ]);
  initialized = true;
}

// Re-export types
export type { IMicroInteraction, AnimationCategory, AnimationPurpose } from '../component-registry/types.js';
