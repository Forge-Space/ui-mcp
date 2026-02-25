import type { IMicroInteraction } from '../component-registry/types.js';

export const chartAnimationEffects: IMicroInteraction[] = [
  {
    id: 'chart-draw-path',
    name: 'Chart Draw Path',
    category: 'chart',
    purpose: ['orientation', 'delight'],
    tailwindClasses: '',
    css: '.chart-draw-path path { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: drawPath 2s ease-out forwards; } @keyframes drawPath { to { stroke-dashoffset: 0; } }',
    keyframes: '@keyframes drawPath { to { stroke-dashoffset: 0; } }',
    reducedMotionFallback: 'motion-reduce:path-animate-none motion-reduce:path-stroke-dashoffset-0',
    duration: '2000ms',
    description: 'SVG line chart path draws in — smooth data visualization reveal',
  },
  {
    id: 'chart-bar-grow',
    name: 'Chart Bar Grow',
    category: 'chart',
    purpose: ['orientation', 'delight'],
    tailwindClasses: '',
    css: '.chart-bar-grow [data-bar] { animation: barGrow 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; transform-origin: bottom; } .chart-bar-grow [data-bar]:nth-child(1) { animation-delay: 0ms; } .chart-bar-grow [data-bar]:nth-child(2) { animation-delay: 100ms; } .chart-bar-grow [data-bar]:nth-child(3) { animation-delay: 200ms; } @keyframes barGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }',
    keyframes: '@keyframes barGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }',
    reducedMotionFallback: 'motion-reduce:[data-bar]:animate-none motion-reduce:[data-bar]:transform-none',
    duration: '800ms',
    description: 'Bar chart bars grow up sequentially — engaging data reveal',
  },
  {
    id: 'chart-counter-increment',
    name: 'Chart Counter Increment',
    category: 'chart',
    purpose: ['attention', 'delight'],
    tailwindClasses: 'tabular-nums',
    css: '.chart-counter-increment { animation: countUp 1.5s ease-out forwards; } @keyframes countUp { from { --value: 0; } to { --value: var(--target, 100); } } .chart-counter-increment::after { content: counter(value); counter-reset: value var(--value, 0); }',
    keyframes: '@keyframes countUp { from { --value: 0; } to { --value: var(--target, 100); } }',
    reducedMotionFallback: 'motion-reduce:animate-none',
    duration: '1500ms',
    description: 'Number counts up from 0 to target — requires JS to set --target CSS variable',
  },
  {
    id: 'chart-data-morph',
    name: 'Chart Data Morph',
    category: 'chart',
    purpose: ['orientation', 'delight'],
    tailwindClasses: '',
    css: '.chart-data-morph [data-point] { transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }',
    reducedMotionFallback: 'motion-reduce:[data-point]:transition-none',
    duration: '600ms',
    description: 'Chart data points morph smoothly on update — fluid data transitions',
  },
];

export function registerChartAnimationEffects(): void {
  // Registration handled by index.ts
}
