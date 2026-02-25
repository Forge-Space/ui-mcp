import type { IMicroInteraction } from '../component-registry/types.js';

export const backgroundEffectAnimations: IMicroInteraction[] = [
  {
    id: 'bg-aurora-gradient',
    name: 'Background Aurora Gradient',
    category: 'background',
    purpose: ['delight', 'attention'],
    tailwindClasses: 'relative overflow-hidden',
    css: '.bg-aurora-gradient::before { content: ""; position: absolute; inset: -50%; background: radial-gradient(circle at 20% 50%, rgba(var(--brand-solid-default-rgb), 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(var(--accent-rgb), 0.2), transparent 50%); animation: auroraMove 15s ease-in-out infinite; filter: blur(40px); } @keyframes auroraMove { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 33% { transform: translate(10%, -10%) rotate(120deg); } 66% { transform: translate(-10%, 10%) rotate(240deg); } }',
    keyframes:
      '@keyframes auroraMove { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 33% { transform: translate(10%, -10%) rotate(120deg); } 66% { transform: translate(-10%, 10%) rotate(240deg); } }',
    reducedMotionFallback: 'motion-reduce:before:animate-none',
    duration: '15000ms',
    description: 'Slowly moving aurora-like gradient background — premium hero section effect',
  },
  {
    id: 'bg-particles-float',
    name: 'Background Particles Float',
    category: 'background',
    purpose: ['delight'],
    tailwindClasses: 'relative overflow-hidden',
    css: '.bg-particles-float::before { content: ""; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 50px 50px; animation: particlesFloat 20s linear infinite; } @keyframes particlesFloat { 0% { transform: translateY(0); } 100% { transform: translateY(-50px); } }',
    keyframes: '@keyframes particlesFloat { 0% { transform: translateY(0); } 100% { transform: translateY(-50px); } }',
    reducedMotionFallback: 'motion-reduce:before:animate-none',
    duration: '20000ms',
    description: 'Floating particle grid background — subtle depth and movement',
  },
  {
    id: 'bg-mesh-gradient',
    name: 'Background Mesh Gradient',
    category: 'background',
    purpose: ['attention', 'delight'],
    tailwindClasses: 'relative',
    css: '.bg-mesh-gradient::before { content: ""; position: absolute; inset: 0; background: radial-gradient(at 0% 0%, rgba(var(--brand-solid-default-rgb), 0.2) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(var(--accent-rgb), 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(var(--brand-solid-hover-rgb), 0.2) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(var(--accent-rgb), 0.15) 0px, transparent 50%); animation: meshPulse 10s ease-in-out infinite; filter: blur(60px); } @keyframes meshPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }',
    keyframes: '@keyframes meshPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }',
    reducedMotionFallback: 'motion-reduce:before:animate-none',
    duration: '10000ms',
    description: 'Pulsing mesh gradient at corners — modern, dynamic background',
  },
  {
    id: 'bg-grid-pattern',
    name: 'Background Grid Pattern',
    category: 'background',
    purpose: ['orientation'],
    tailwindClasses: 'relative',
    css: '.bg-grid-pattern { background-image: linear-gradient(rgba(var(--text-muted-rgb), 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-muted-rgb), 0.05) 1px, transparent 1px); background-size: 40px 40px; }',
    reducedMotionFallback: '',
    duration: '0ms',
    description: 'Static grid pattern background — technical, blueprint aesthetic',
  },
  {
    id: 'bg-spotlight-follow',
    name: 'Background Spotlight Follow',
    category: 'background',
    purpose: ['delight', 'attention'],
    tailwindClasses: 'relative overflow-hidden',
    css: '.bg-spotlight-follow::before { content: ""; position: absolute; inset: 0; background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--brand-solid-default-rgb), 0.15), transparent 40%); pointer-events: none; transition: opacity 0.3s; } .bg-spotlight-follow:not(:hover)::before { opacity: 0; }',
    reducedMotionFallback: 'motion-reduce:before:opacity-0',
    duration: '300ms',
    description: 'Spotlight follows mouse cursor — requires JS to set --mouse-x/y CSS variables',
  },
  {
    id: 'bg-noise-texture',
    name: 'Background Noise Texture',
    category: 'background',
    purpose: ['delight'],
    tailwindClasses: 'relative',
    css: ".bg-noise-texture::before { content: \"\"; position: absolute; inset: 0; background-image: url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\"); opacity: 0.8; pointer-events: none; mix-blend-mode: overlay; }",
    reducedMotionFallback: '',
    duration: '0ms',
    description: 'Subtle noise texture overlay — adds film grain for depth and texture',
  },
];

export function registerBackgroundEffectAnimations(): void {
  // Registration handled by index.ts
}
