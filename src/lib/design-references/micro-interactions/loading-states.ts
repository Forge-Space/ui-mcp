import type { IMicroInteraction } from '../component-registry/types.js';

export const loadingStateAnimations: IMicroInteraction[] = [
  {
    id: 'loading-skeleton-pulse',
    name: 'Loading Skeleton Pulse',
    category: 'loading',
    purpose: ['progress', 'orientation'],
    tailwindClasses: 'animate-pulse rounded-md bg-surface-muted',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '2000ms',
    description: 'Pulsing skeleton placeholder — matches content shape for low CLS',
  },
  {
    id: 'loading-spinner-ring',
    name: 'Loading Spinner Ring',
    category: 'loading',
    purpose: ['progress'],
    tailwindClasses: 'border-4 border-surface-muted border-t-brand-solid-default rounded-full w-8 h-8 animate-spin',
    reducedMotionFallback: 'motion-reduce:animate-none motion-reduce:border-t-transparent',
    duration: '1000ms',
    description: 'Rotating ring spinner — use sparingly, prefer skeleton loaders',
  },
  {
    id: 'loading-progress-bar',
    name: 'Loading Progress Bar',
    category: 'loading',
    purpose: ['progress'],
    tailwindClasses: 'h-1 w-full bg-surface-muted overflow-hidden',
    css: '.loading-progress-bar::after { content: ""; display: block; height: 100%; width: 40%; background: linear-gradient(90deg, transparent, var(--brand-solid-default), transparent); animation: progressSlide 1.5s ease-in-out infinite; } @keyframes progressSlide { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }',
    keyframes:
      '@keyframes progressSlide { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }',
    reducedMotionFallback: 'motion-reduce:after:animate-none',
    duration: '1500ms',
    description: 'Indeterminate progress bar with sliding highlight — for async operations',
  },
  {
    id: 'loading-dot-bounce-wave',
    name: 'Loading Dot Bounce Wave',
    category: 'loading',
    purpose: ['progress'],
    tailwindClasses: 'flex gap-1.5 items-center justify-center',
    css: '.loading-dot-bounce-wave > span { width: 0.5rem; height: 0.5rem; border-radius: 9999px; background: currentColor; animation: dotBounce 1.4s infinite ease-in-out both; } .loading-dot-bounce-wave > span:nth-child(1) { animation-delay: -0.32s; } .loading-dot-bounce-wave > span:nth-child(2) { animation-delay: -0.16s; } .loading-dot-bounce-wave > span:nth-child(3) { animation-delay: 0s; } @keyframes dotBounce { 0%, 80%, 100% { transform: scale(0); opacity: 0.5; } 40% { transform: scale(1); opacity: 1; } }',
    keyframes:
      '@keyframes dotBounce { 0%, 80%, 100% { transform: scale(0); opacity: 0.5; } 40% { transform: scale(1); opacity: 1; } }',
    reducedMotionFallback: 'motion-reduce:[&>span]:animate-none motion-reduce:[&>span]:opacity-100',
    duration: '1400ms',
    description: 'Three dots bouncing in sequence — inline loading indicator',
  },
  {
    id: 'loading-shimmer-sweep',
    name: 'Loading Shimmer Sweep',
    category: 'loading',
    purpose: ['progress', 'orientation'],
    tailwindClasses: 'relative overflow-hidden bg-surface-muted rounded-md',
    css: '.loading-shimmer-sweep::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); animation: shimmerSweep 2s infinite; } @keyframes shimmerSweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }',
    keyframes: '@keyframes shimmerSweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }',
    reducedMotionFallback: 'motion-reduce:after:animate-none',
    duration: '2000ms',
    description: 'Shimmering light sweeps across skeleton — premium loading state',
  },
  {
    id: 'loading-content-placeholder',
    name: 'Loading Content Placeholder',
    category: 'loading',
    purpose: ['progress', 'orientation'],
    tailwindClasses: 'space-y-3',
    css: '.loading-content-placeholder > div { background: linear-gradient(90deg, var(--surface-muted) 25%, var(--surface-default) 50%, var(--surface-muted) 75%); background-size: 200% 100%; animation: placeholderWave 2s ease-in-out infinite; border-radius: 0.375rem; height: 1rem; } .loading-content-placeholder > div:nth-child(1) { width: 100%; } .loading-content-placeholder > div:nth-child(2) { width: 85%; } .loading-content-placeholder > div:nth-child(3) { width: 70%; } @keyframes placeholderWave { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }',
    keyframes:
      '@keyframes placeholderWave { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }',
    reducedMotionFallback: 'motion-reduce:[&>div]:animate-none',
    duration: '2000ms',
    description: 'Multi-line content placeholder with wave animation — for text-heavy loading states',
  },
];

export function registerLoadingStateAnimations(): void {
  // Registration handled by index.ts
}
