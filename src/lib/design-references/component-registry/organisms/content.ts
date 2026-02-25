import type { IComponentSnippet } from '../types.js';

export const contentSnippets: IComponentSnippet[] = [
  {
    id: 'content-article',
    name: 'Article Content',
    category: 'organism',
    type: 'media',
    variant: 'article',
    tags: ['media', 'article', 'media', 'text'],
    mood: ['minimal', 'editorial'] as const,
    industry: ['media', 'general'] as const,
    visualStyles: ['minimal-editorial'] as const,
    jsx: `<article className="py-16">
  <div className="container max-w-3xl">
    <header className="mb-8">
      <div className="mb-4 flex items-center gap-2 text-sm">
        <span className="text-primary font-medium">Product</span>
        <span className="text-muted-foreground">•</span>
        <time className="text-muted-foreground">Jan 15, 2024</time>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">5 min read</span>
      </div>
      <h1 className="text-4xl font-bold text-foreground tracking-tight">Building scalable web applications with modern tools</h1>
      <p className="mt-4 text-lg text-muted-foreground">Learn how to architect and deploy production-ready applications using best practices and proven patterns.</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-muted" />
        <div>
          <div className="text-sm font-medium text-foreground">Sarah Johnson</div>
          <div className="text-xs text-muted-foreground">Engineering Lead</div>
        </div>
      </div>
    </header>
    <div className="prose prose-neutral max-w-none">
      <p className="text-foreground">Modern web development requires careful consideration of architecture, performance, and scalability from the start. This guide walks through essential patterns and tools for building applications that can grow with your business.</p>
      <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Architecture fundamentals</h2>
      <p className="text-foreground">A well-architected application separates concerns, maintains clear boundaries, and enables independent scaling of components. Start with a modular design that allows teams to work independently.</p>
      <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Performance considerations</h2>
      <p className="text-foreground">Every decision impacts performance. Choose technologies that align with your scale requirements and team expertise. Monitor key metrics from day one to establish baselines.</p>
    </div>
  </div>
</article>`,
    tailwindClasses: {
      root: 'py-16',
    },
    a11y: {
      roles: ['article'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Standard document navigation',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['sm'] },
    quality: {
      antiGeneric: ['Author bio', 'Reading time', 'Category tags'],
      inspirationSource: 'Medium',
      craftDetails: ['Readable line length', 'Clear typography hierarchy', 'Semantic article structure'],
    },
  },
];
