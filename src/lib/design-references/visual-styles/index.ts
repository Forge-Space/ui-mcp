import pino from 'pino';
import type { IVisualStyle, VisualStyleId, IComponentSnippet } from '../component-registry/types.js';

const logger = pino({ name: 'visual-styles' });

// --- Visual Style Registry ---

const styles: IVisualStyle[] = [];
let initialized = false;

export function registerVisualStyle(style: IVisualStyle): void {
  const exists = styles.findIndex((s) => s.id === style.id);
  if (exists >= 0) {
    styles[exists] = style;
  } else {
    styles.push(style);
  }
}

export function getVisualStyle(id: VisualStyleId): IVisualStyle | undefined {
  return styles.find((s) => s.id === id);
}

export function getAllVisualStyles(): IVisualStyle[] {
  return [...styles];
}

export function getVisualStylesByMood(mood: string): IVisualStyle[] {
  return styles.filter((s) => s.mood.includes(mood as IVisualStyle['mood'][number]));
}

/**
 * Apply a visual style to a component snippet.
 * Merges style class modifiers into the snippet's tailwindClasses.
 */
export function applyVisualStyle(
  snippet: IComponentSnippet,
  style: IVisualStyle
): IComponentSnippet {
  const newClasses = { ...snippet.tailwindClasses };
  const droppedModifiers: string[] = [];

  for (const [role, modifier] of Object.entries(style.classModifiers)) {
    if (newClasses[role]) {
      newClasses[role] = `${newClasses[role]} ${modifier}`.trim();
    } else {
      // Try to apply to root element (first key)
      const rootKey = Object.keys(newClasses)[0];
      if (rootKey && role === 'root') {
        newClasses[rootKey] = `${newClasses[rootKey]} ${modifier}`.trim();
      } else {
        droppedModifiers.push(role);
      }
    }
  }

  if (droppedModifiers.length > 0) {
    logger.warn(
      { styleId: style.id, snippetId: snippet.id, droppedModifiers },
      'Some style modifiers could not be applied - no matching role in snippet'
    );
  }

  let newCss = snippet.css ?? '';
  if (style.keyframes) {
    for (const kf of Object.values(style.keyframes)) {
      newCss += `\n${kf}`;
    }
  }

  return {
    ...snippet,
    tailwindClasses: newClasses,
    css: newCss.trim() || undefined,
    visualStyles: [...new Set([...(snippet.visualStyles ?? []), style.id])],
  };
}

// --- Built-in Visual Styles ---

const builtInStyles: IVisualStyle[] = [
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Frosted glass effect with backdrop blur, semi-transparent backgrounds, and subtle borders',
    classModifiers: {
      root: 'backdrop-blur-xl bg-white/10 border border-white/20',
      card: 'backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl',
      button: 'backdrop-blur-sm bg-white/20 border border-white/30 hover:bg-white/30',
      input: 'backdrop-blur-sm bg-white/10 border border-white/20 placeholder:text-white/50',
      container: 'bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/20',
      nav: 'backdrop-blur-xl bg-white/10 border-b border-white/20',
    },
    mood: ['futuristic', 'premium', 'creative'],
    compatibleWith: ['card', 'button', 'input', 'navbar', 'hero', 'dialog', 'sidebar'],
  },
  {
    id: 'neubrutalism',
    name: 'Neubrutalism',
    description: 'Bold borders, hard shadows, saturated colors, and a hand-crafted feel',
    classModifiers: {
      root: 'border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
      card: 'border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none bg-background',
      button: 'border-2 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-none hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-bold',
      input: 'border-2 border-foreground rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]',
      badge: 'border-2 border-foreground rounded-none font-bold uppercase tracking-wider',
    },
    mood: ['bold', 'playful', 'creative', 'energetic'],
    compatibleWith: ['card', 'button', 'input', 'badge', 'hero', 'form'],
  },
  {
    id: 'soft-depth',
    name: 'Soft Depth',
    description: 'Post-neumorphism with subtle shadows and bevels for tactile, accessible depth (Polaris/Apple style)',
    classModifiers: {
      root: 'shadow-sm bg-background',
      card: 'shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] bg-background rounded-xl',
      button: 'shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.1)] rounded-lg transition-shadow',
      input: 'shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] bg-muted/30 rounded-lg',
      container: 'bg-gradient-to-b from-background to-muted/20',
    },
    mood: ['calm', 'professional', 'minimal'],
    compatibleWith: ['card', 'button', 'input', 'dialog', 'form', 'sidebar', 'navbar'],
  },
  {
    id: 'bento-grid',
    name: 'Bento Grid',
    description: 'Asymmetric grid layout with varied spans, contained sections, and visual rhythm',
    classModifiers: {
      root: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
      card: 'rounded-2xl border bg-card p-6 overflow-hidden',
      'card-featured': 'col-span-2 row-span-2 rounded-2xl border bg-card p-8',
      'card-wide': 'col-span-2 rounded-2xl border bg-card p-6',
      'card-tall': 'row-span-2 rounded-2xl border bg-card p-6',
    },
    mood: ['bold', 'creative', 'editorial'],
    compatibleWith: ['card', 'feature-section', 'dashboard', 'hero'],
  },
  {
    id: 'gradient-mesh',
    name: 'Gradient Mesh',
    description: 'Rich mesh gradients, gradient text, and aurora backgrounds using OKLCH interpolation',
    classModifiers: {
      root: 'bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20',
      card: 'bg-gradient-to-br from-card/80 to-card border border-border/50 shadow-lg',
      button: 'bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25',
      heading: 'bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent',
      container: 'bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(var(--primary-rgb),0.15),transparent)]',
    },
    cssVariables: {
      '--gradient-start': 'oklch(0.7 0.15 250)',
      '--gradient-end': 'oklch(0.6 0.2 310)',
    },
    mood: ['premium', 'futuristic', 'bold', 'energetic'],
    compatibleWith: ['hero', 'button', 'card', 'heading', 'cta', 'pricing'],
  },
  {
    id: 'dark-premium',
    name: 'Dark Premium',
    description: 'Deep backgrounds, subtle glow accents, elevated surfaces — Stripe/Linear dark mode quality',
    classModifiers: {
      root: 'bg-zinc-950 text-zinc-100',
      card: 'bg-zinc-900/80 border border-zinc-800 shadow-xl shadow-black/20 rounded-xl',
      button: 'bg-white text-zinc-900 hover:bg-zinc-100 font-medium shadow-sm',
      'button-secondary': 'bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700',
      input: 'bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600',
      nav: 'bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800/50',
      container: 'bg-zinc-950',
      accent: 'text-blue-400',
    },
    mood: ['premium', 'professional', 'futuristic', 'editorial'],
    compatibleWith: ['card', 'button', 'input', 'navbar', 'hero', 'sidebar', 'dashboard', 'dialog'],
  },
  {
    id: 'minimal-editorial',
    name: 'Minimal Editorial',
    description: 'Maximum whitespace, sharp typography, dramatic size hierarchy — editorial magazine feel',
    classModifiers: {
      root: 'bg-white text-zinc-900',
      card: 'bg-white border-0 shadow-none p-0',
      button: 'bg-zinc-900 text-white rounded-full px-8 hover:bg-zinc-800 font-medium tracking-wide',
      'button-secondary': 'bg-transparent text-zinc-900 border border-zinc-300 rounded-full px-8 hover:bg-zinc-50',
      heading: 'font-bold tracking-tight leading-none',
      paragraph: 'text-zinc-600 leading-relaxed max-w-prose',
      container: 'max-w-5xl mx-auto px-6 lg:px-8',
      separator: 'border-zinc-200',
    },
    mood: ['minimal', 'editorial', 'calm', 'professional'],
    compatibleWith: ['hero', 'card', 'button', 'heading', 'cta', 'footer', 'blog', 'landing'],
  },
  {
    id: 'linear-modern',
    name: 'Linear Modern',
    description: 'Linear-inspired: LCH theming, reduced visual noise, high density, opacity-based elevation',
    classModifiers: {
      root: 'bg-zinc-950 text-zinc-300',
      card: 'bg-white/[0.03] border border-white/[0.06] rounded-lg',
      button: 'bg-indigo-500 text-white rounded-md text-sm font-medium hover:bg-indigo-400 shadow-sm',
      'button-secondary': 'bg-white/[0.06] text-zinc-300 border border-white/[0.08] rounded-md text-sm hover:bg-white/[0.1]',
      input: 'bg-white/[0.03] border border-white/[0.08] text-zinc-200 text-sm placeholder:text-zinc-500 rounded-md focus:border-indigo-500/50',
      nav: 'bg-zinc-950 border-b border-white/[0.06]',
      sidebar: 'bg-zinc-950 border-r border-white/[0.06] w-56',
      badge: 'bg-white/[0.06] text-zinc-400 border border-white/[0.08] text-xs rounded-md',
    },
    mood: ['professional', 'minimal', 'premium', 'futuristic'],
    compatibleWith: ['card', 'button', 'input', 'sidebar', 'navbar', 'dashboard', 'table', 'badge'],
  },
  {
    id: 'retro-playful',
    name: 'Retro Playful',
    description: 'Rounded corners, pastel colors, bouncy spring animations, friendly personality',
    classModifiers: {
      root: 'bg-amber-50 text-zinc-800',
      card: 'bg-white rounded-3xl border-2 border-zinc-200 shadow-md p-6',
      button: 'bg-violet-500 text-white rounded-full px-6 py-2.5 font-semibold hover:bg-violet-600 active:scale-95 transition-all shadow-md shadow-violet-500/25',
      'button-secondary': 'bg-pink-100 text-pink-700 rounded-full px-6 py-2.5 font-semibold hover:bg-pink-200 active:scale-95 transition-all',
      input: 'bg-white border-2 border-zinc-200 rounded-2xl px-4 py-2.5 focus:border-violet-400 focus:ring-4 focus:ring-violet-100',
      badge: 'bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 text-xs font-bold',
      heading: 'font-extrabold tracking-tight',
    },
    mood: ['playful', 'warm', 'creative', 'energetic'],
    compatibleWith: ['card', 'button', 'input', 'badge', 'hero', 'cta', 'pricing'],
  },
  {
    id: 'corporate-trust',
    name: 'Corporate Trust',
    description: 'Conservative colors, clear hierarchy, high-contrast, formal presentation — enterprise/fintech',
    classModifiers: {
      root: 'bg-white text-slate-900',
      card: 'bg-white border border-slate-200 rounded-lg shadow-sm p-6',
      button: 'bg-blue-700 text-white rounded-md px-5 py-2.5 font-medium hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      'button-secondary': 'bg-white text-slate-700 border border-slate-300 rounded-md px-5 py-2.5 font-medium hover:bg-slate-50',
      input: 'border border-slate-300 rounded-md bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
      heading: 'font-semibold text-slate-900',
      nav: 'bg-white border-b border-slate-200 shadow-sm',
      table: 'divide-y divide-slate-200',
    },
    mood: ['professional', 'corporate', 'calm'],
    compatibleWith: ['card', 'button', 'input', 'table', 'form', 'navbar', 'sidebar', 'dashboard'],
  },
];

// --- Initialize built-in styles ---

export function initializeStyles(): void {
  if (initialized) return;

  for (const style of builtInStyles) {
    registerVisualStyle(style);
  }

  initialized = true;
  logger.debug('Visual styles initialized');
}

// Re-export types
export type { IVisualStyle, VisualStyleId } from '../component-registry/types.js';
