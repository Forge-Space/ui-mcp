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
  {
    id: 'content-blog-list',
    name: 'Blog List',
    category: 'organism',
    type: 'media',
    variant: 'blog-list',
    tags: ['media', 'blog', 'list', 'articles'],
    mood: ['minimal', 'editorial'] as const,
    industry: ['media', 'general'] as const,
    visualStyles: ['minimal-editorial', 'soft-depth'] as const,
    jsx: `<section className="py-16">
  <div className="container max-w-4xl">
    <div className="mb-12">
      <h1 className="text-4xl font-bold text-foreground tracking-tight">Blog</h1>
      <p className="mt-2 text-lg text-muted-foreground">Insights, updates, and technical deep dives</p>
    </div>
    <div className="space-y-12">
      <article className="group">
        <div className="flex gap-6">
          <div className="shrink-0 w-48 h-32 rounded-lg bg-muted overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <time>Jan 24, 2026</time>
              <span>•</span>
              <span>5 min read</span>
              <span>•</span>
              <span className="text-primary font-medium">Engineering</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              <a href="#" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Building scalable APIs with TypeScript</a>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">Learn how to architect production-ready APIs using TypeScript, focusing on type safety, error handling, and performance optimization.</p>
          </div>
        </div>
      </article>
      <article className="group">
        <div className="flex gap-6">
          <div className="shrink-0 w-48 h-32 rounded-lg bg-muted overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <time>Jan 20, 2026</time>
              <span>•</span>
              <span>8 min read</span>
              <span>•</span>
              <span className="text-primary font-medium">Product</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              <a href="#" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Designing for accessibility from day one</a>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">Accessibility shouldn't be an afterthought. Discover practical patterns for building inclusive interfaces that work for everyone.</p>
          </div>
        </div>
      </article>
      <article className="group">
        <div className="flex gap-6">
          <div className="shrink-0 w-48 h-32 rounded-lg bg-muted overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-muted-foreground/20 to-muted-foreground/5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <time>Jan 15, 2026</time>
              <span>•</span>
              <span>6 min read</span>
              <span>•</span>
              <span className="text-primary font-medium">DevOps</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              <a href="#" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Zero-downtime deployments on Cloudflare Workers</a>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">Deploy with confidence using progressive rollouts, canary releases, and instant rollbacks on the edge.</p>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      root: 'py-16',
      container: 'container max-w-4xl',
      header: 'mb-12',
      title: 'text-4xl font-bold text-foreground tracking-tight',
      subtitle: 'mt-2 text-lg text-muted-foreground',
      list: 'space-y-12',
      article: 'group',
      articleLayout: 'flex gap-6',
      thumbnail: 'shrink-0 w-48 h-32 rounded-lg bg-muted overflow-hidden',
      content: 'flex-1 min-w-0',
      meta: 'flex items-center gap-2 text-xs text-muted-foreground mb-2',
      category: 'text-primary font-medium',
      articleTitle: 'text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors',
      excerpt: 'text-sm text-muted-foreground leading-relaxed line-clamp-2',
    },
    a11y: {
      roles: ['article', 'list'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab through article links',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'thumbnail with gradient placeholder',
        'category tag with primary color',
        'reading time estimate',
        'group-hover on title for interaction feedback',
      ],
      inspirationSource: 'Vercel blog',
      craftDetails: [
        'line-clamp-2 for consistent excerpt heights',
        'min-w-0 prevents flex overflow',
        'space-y-12 generous article spacing',
        'shrink-0 on thumbnail prevents squishing',
      ],
    },
  },
  {
    id: 'content-rich-text-editor',
    name: 'Rich Text Editor',
    category: 'organism',
    type: 'media',
    variant: 'editor',
    tags: ['media', 'editor', 'wysiwyg', 'text'],
    mood: ['professional', 'minimal'] as const,
    industry: ['saas', 'general', 'devtools'] as const,
    visualStyles: ['soft-depth', 'linear-modern'] as const,
    jsx: `<div className="rounded-lg border border-input bg-card">
  <div className="flex items-center gap-1 border-b border-input bg-muted/50 px-2 py-2">
    <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Bold">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12h9M6 8h9m-9 8h9m6-9.75A2.25 2.25 0 0 1 18.75 4H5.25A2.25 2.25 0 0 1 3 6.25v11.5A2.25 2.25 0 0 0 5.25 20h13.5A2.25 2.25 0 0 0 21 17.75V6.25z" /></svg>
    </button>
    <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Italic">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5.248 20.246H9.05m0 0h3.696m-3.696 0 5.893-16.502m0 0h-3.697m3.697 0h3.803" /></svg>
    </button>
    <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Underline">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>
    </button>
    <div className="w-px h-6 bg-border mx-1" />
    <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Bulleted list">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z" /></svg>
    </button>
    <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Numbered list">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" /></svg>
    </button>
    <div className="w-px h-6 bg-border mx-1" />
    <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Insert link">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /></svg>
    </button>
    <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Insert image">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z" /></svg>
    </button>
  </div>
  <div className="p-4">
    <div contentEditable className="min-h-[300px] focus:outline-none text-sm text-foreground">
      <p className="mb-4">Start typing to create your content...</p>
    </div>
  </div>
  <div className="flex items-center justify-between border-t border-input bg-muted/50 px-4 py-2 text-xs text-muted-foreground">
    <div className="flex items-center gap-4">
      <span>0 words</span>
      <span>0 characters</span>
    </div>
    <kbd className="inline-flex items-center gap-1 rounded bg-muted px-2 py-1 font-mono">
      <span>⌘</span>S to save
    </kbd>
  </div>
</div>`,
    tailwindClasses: {
      root: 'rounded-lg border border-input bg-card',
      toolbar: 'flex items-center gap-1 border-b border-input bg-muted/50 px-2 py-2',
      toolbarButton:
        'inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      separator: 'w-px h-6 bg-border mx-1',
      editorArea: 'p-4',
      editor: 'min-h-[300px] focus:outline-none text-sm text-foreground',
      footer:
        'flex items-center justify-between border-t border-input bg-muted/50 px-4 py-2 text-xs text-muted-foreground',
      stats: 'flex items-center gap-4',
      shortcut: 'inline-flex items-center gap-1 rounded bg-muted px-2 py-1 font-mono',
    },
    a11y: {
      roles: ['textbox', 'toolbar'],
      ariaAttributes: ['aria-label', 'contentEditable'],
      keyboardNav: 'Toolbar shortcuts, Tab to navigate buttons',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'toolbar with semantic button groups',
        'visual separators between button groups',
        'word/character count in footer',
        'keyboard shortcut hint',
      ],
      inspirationSource: 'Notion editor',
      craftDetails: [
        'h-8 w-8 square buttons for consistency',
        'contentEditable for native text editing',
        'min-h-[300px] ensures adequate editing space',
        'bg-muted/50 on toolbar/footer for hierarchy',
      ],
    },
  },
  {
    id: 'content-faq-section',
    name: 'FAQ Section',
    category: 'organism',
    type: 'media',
    variant: 'faq',
    tags: ['media', 'faq', 'accordion', 'help'],
    mood: ['professional', 'warm'] as const,
    industry: ['general', 'saas', 'ecommerce'] as const,
    visualStyles: ['soft-depth', 'minimal-editorial'] as const,
    jsx: `<section className="py-16">
  <div className="container max-w-3xl">
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold text-foreground tracking-tight">Frequently asked questions</h2>
      <p className="mt-2 text-lg text-muted-foreground">Everything you need to know about our product</p>
    </div>
    <div className="space-y-4">
      <details className="group rounded-lg border border-input bg-card" open>
        <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-left font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 list-none">
          <span className="text-base">How does the free tier work?</span>
          <svg className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
        </summary>
        <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
          <p>Our free tier includes up to 100 API requests per month, 1GB of storage, and access to our community support channels. You can upgrade anytime to unlock higher limits and premium features.</p>
        </div>
      </details>
      <details className="group rounded-lg border border-input bg-card">
        <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-left font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 list-none">
          <span className="text-base">Can I cancel my subscription anytime?</span>
          <svg className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
        </summary>
        <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
          <p>Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your current billing period, with no additional charges.</p>
        </div>
      </details>
      <details className="group rounded-lg border border-input bg-card">
        <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-left font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 list-none">
          <span className="text-base">What payment methods do you accept?</span>
          <svg className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
        </summary>
        <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
          <p>We accept all major credit cards (Visa, Mastercard, American Express), as well as ACH transfers for annual plans. All payments are processed securely through Stripe.</p>
        </div>
      </details>
      <details className="group rounded-lg border border-input bg-card">
        <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-left font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 list-none">
          <span className="text-base">Do you offer refunds?</span>
          <svg className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
        </summary>
        <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
          <p>We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied with the service, contact our support team within 14 days of your initial purchase for a full refund.</p>
        </div>
      </details>
      <details className="group rounded-lg border border-input bg-card">
        <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-left font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 list-none">
          <span className="text-base">How do I upgrade my plan?</span>
          <svg className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
        </summary>
        <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
          <p>You can upgrade your plan anytime from your account dashboard. Changes take effect immediately, and we'll prorate the cost based on your current billing cycle.</p>
        </div>
      </details>
    </div>
    <div className="mt-12 rounded-lg border bg-muted/50 p-6 text-center">
      <p className="text-sm font-medium text-foreground mb-2">Still have questions?</p>
      <p className="text-sm text-muted-foreground mb-4">Can't find the answer you're looking for? Our support team is here to help.</p>
      <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
        Contact support
      </button>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      root: 'py-16',
      container: 'container max-w-3xl',
      header: 'mb-12 text-center',
      title: 'text-3xl font-bold text-foreground tracking-tight',
      subtitle: 'mt-2 text-lg text-muted-foreground',
      list: 'space-y-4',
      item: 'group rounded-lg border border-input bg-card',
      summary:
        'flex cursor-pointer items-center justify-between px-6 py-4 text-left font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 list-none',
      question: 'text-base',
      chevron: 'h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180',
      answer: 'px-6 pb-4 text-sm text-muted-foreground leading-relaxed',
      cta: 'mt-12 rounded-lg border bg-muted/50 p-6 text-center',
      ctaTitle: 'text-sm font-medium text-foreground mb-2',
      ctaDescription: 'text-sm text-muted-foreground mb-4',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab through questions, Enter/Space to toggle',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'details/summary for native accordion',
        'group-open:rotate-180 chevron animation',
        'first item open by default',
        'CTA section at bottom for unanswered questions',
      ],
      inspirationSource: 'Stripe FAQ',
      craftDetails: [
        'list-none removes marker',
        'space-y-4 for breathing room between items',
        'hover:bg-accent on summary for interaction feedback',
        'shrink-0 on chevron prevents squishing',
      ],
    },
  },
];
