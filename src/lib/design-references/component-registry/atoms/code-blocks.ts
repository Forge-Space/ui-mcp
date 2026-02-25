import type { IComponentSnippet } from '../types.js';

export const codeBlockSnippets: IComponentSnippet[] = [
  {
    id: 'code-block-inline',
    name: 'Inline Code',
    category: 'atom',
    type: 'code-block',
    variant: 'inline',
    tags: ['code', 'inline', 'monospace', 'syntax'],
    mood: ['professional', 'minimal'],
    industry: ['devtools', 'devtools', 'education'],
    visualStyles: ['minimal-editorial', 'linear-modern'],
    jsx: `<p className="text-sm text-foreground">
  Install the package using <code className="relative rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">npm install</code> in your terminal.
</p>`,
    tailwindClasses: {
      paragraph: 'text-sm text-foreground',
      code: 'relative rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground',
    },
    a11y: {
      roles: ['code semantic element'],
      ariaAttributes: [],
      keyboardNav: 'N/A — static content',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'code' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['px-1.5 py-0.5 for compact inline padding', 'rounded instead of rounded-md for subtle corners'],
      inspirationSource: 'GitHub Primer inline code',
      craftDetails: ['font-mono preserves monospace in tailwind', 'bg-muted for subtle distinction from body text'],
    },
  },
  {
    id: 'code-block-block',
    name: 'Code Block',
    category: 'atom',
    type: 'code-block',
    variant: 'block',
    tags: ['code', 'block', 'pre', 'monospace'],
    mood: ['professional', 'professional'],
    industry: ['devtools', 'devtools', 'education'],
    visualStyles: ['soft-depth', 'minimal-editorial'],
    jsx: `<pre className="overflow-x-auto rounded-lg border border-border bg-muted p-4">
  <code className="font-mono text-sm text-foreground">
    {${'`'}const greeting = "Hello, World!";
console.log(greeting);${'`'}}
  </code>
</pre>`,
    tailwindClasses: {
      pre: 'overflow-x-auto rounded-lg border border-border bg-muted p-4',
      code: 'font-mono text-sm text-foreground',
    },
    a11y: {
      roles: ['pre and code semantic elements'],
      ariaAttributes: [],
      keyboardNav: 'Scrollable with arrow keys if overflow',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'pre > code' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'overflow-x-auto for horizontal scrolling on long lines',
        'border border-border for defined code block container',
      ],
      inspirationSource: 'Shiki code block patterns',
      craftDetails: ['p-4 provides breathing room for multi-line code', 'rounded-lg for modern block appearance'],
    },
  },
  {
    id: 'code-block-syntax',
    name: 'Syntax Highlighted Code',
    category: 'atom',
    type: 'code-block',
    variant: 'syntax',
    tags: ['code', 'syntax', 'highlighting', 'language'],
    mood: ['professional', 'premium'],
    industry: ['devtools', 'devtools', 'education'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="relative overflow-hidden rounded-lg border border-border bg-muted">
  <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
    <span className="text-xs font-medium text-muted-foreground">JavaScript</span>
  </div>
  <pre className="overflow-x-auto p-4">
    <code className="font-mono text-sm">
      <span className="text-primary">const</span>{" "}
      <span className="text-foreground">greeting</span>{" "}
      <span className="text-muted-foreground">=</span>{" "}
      <span className="text-success">"Hello, World!"</span>
      <span className="text-muted-foreground">;</span>
      {"\n"}
      <span className="text-foreground">console</span>
      <span className="text-muted-foreground">.</span>
      <span className="text-primary">log</span>
      <span className="text-muted-foreground">(</span>
      <span className="text-foreground">greeting</span>
      <span className="text-muted-foreground">);</span>
    </code>
  </pre>
</div>`,
    tailwindClasses: {
      container: 'relative overflow-hidden rounded-lg border border-border bg-muted',
      header: 'flex items-center justify-between border-b border-border bg-card px-4 py-2',
      language: 'text-xs font-medium text-muted-foreground',
      pre: 'overflow-x-auto p-4',
      code: 'font-mono text-sm',
      keyword: 'text-primary',
      string: 'text-success',
      punctuation: 'text-muted-foreground',
    },
    a11y: {
      roles: ['pre and code semantic elements'],
      ariaAttributes: [],
      keyboardNav: 'Scrollable with arrow keys if overflow',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'pre > code' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'border-b on header separates language label from code',
        'semantic color tokens for syntax highlighting (primary for keywords, success for strings)',
      ],
      inspirationSource: 'Shiki syntax highlighting',
      craftDetails: [
        'overflow-hidden on container for rounded border with scrolling pre',
        'text-xs language label for subtle metadata',
      ],
    },
  },
  {
    id: 'code-block-line-numbers',
    name: 'Code Block with Line Numbers',
    category: 'atom',
    type: 'code-block',
    variant: 'line-numbers',
    tags: ['code', 'line-numbers', 'gutter', 'reference'],
    mood: ['professional', 'professional'],
    industry: ['devtools', 'devtools', 'education'],
    visualStyles: ['corporate-trust', 'soft-depth'],
    jsx: `<div className="overflow-hidden rounded-lg border border-border bg-muted">
  <pre className="overflow-x-auto">
    <code className="grid font-mono text-sm">
      <span className="flex">
        <span className="inline-block w-12 select-none border-r border-border bg-card px-3 py-1 text-right text-muted-foreground">1</span>
        <span className="px-4 py-1 text-foreground"><span className="text-primary">const</span> greeting = <span className="text-success">"Hello!"</span>;</span>
      </span>
      <span className="flex">
        <span className="inline-block w-12 select-none border-r border-border bg-card px-3 py-1 text-right text-muted-foreground">2</span>
        <span className="px-4 py-1 text-foreground">console.log(greeting);</span>
      </span>
      <span className="flex">
        <span className="inline-block w-12 select-none border-r border-border bg-card px-3 py-1 text-right text-muted-foreground">3</span>
        <span className="px-4 py-1 text-foreground"></span>
      </span>
    </code>
  </pre>
</div>`,
    tailwindClasses: {
      container: 'overflow-hidden rounded-lg border border-border bg-muted',
      pre: 'overflow-x-auto',
      code: 'grid font-mono text-sm',
      line: 'flex',
      lineNumber:
        'inline-block w-12 select-none border-r border-border bg-card px-3 py-1 text-right text-muted-foreground',
      lineContent: 'px-4 py-1 text-foreground',
    },
    a11y: {
      roles: ['pre and code semantic elements'],
      ariaAttributes: [],
      keyboardNav: 'Scrollable with arrow keys if overflow',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'pre > code' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'grid on code enables flex row layout per line',
        'select-none on line numbers prevents copying line numbers',
      ],
      inspirationSource: 'GitHub code viewer',
      craftDetails: ['w-12 fixed width gutter for line numbers', 'border-r on line numbers separates gutter from code'],
    },
  },
  {
    id: 'code-block-copy',
    name: 'Code Block with Copy Button',
    category: 'atom',
    type: 'code-block',
    variant: 'copy',
    tags: ['code', 'copy', 'clipboard', 'playful'],
    mood: ['minimal', 'minimal'],
    industry: ['devtools', 'devtools', 'education'],
    visualStyles: ['retro-playful', 'soft-depth'],
    jsx: `<div className="group relative overflow-hidden rounded-lg border border-border bg-muted">
  <button
    type="button"
    className="absolute right-2 top-2 rounded-md bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:opacity-100"
    aria-label="Copy code"
  >
    Copy
  </button>
  <pre className="overflow-x-auto p-4">
    <code className="font-mono text-sm text-foreground">
      {${'`'}npm install @acme/ui${'`'}}
    </code>
  </pre>
</div>`,
    tailwindClasses: {
      container: 'group relative overflow-hidden rounded-lg border border-border bg-muted',
      button:
        'absolute right-2 top-2 rounded-md bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:opacity-100',
      pre: 'overflow-x-auto p-4',
      code: 'font-mono text-sm text-foreground',
    },
    a11y: {
      roles: ['button for copy action'],
      ariaAttributes: ['aria-label=Copy code'],
      keyboardNav: 'Tab to button, Enter/Space to copy',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'pre > code' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'group utility on container for hover-triggered button visibility',
        'opacity-0 group-hover:opacity-100 for reveal on hover',
      ],
      inspirationSource: 'GitHub code block copy button',
      craftDetails: [
        'absolute right-2 top-2 positions copy button in top-right',
        'focus-visible:opacity-100 ensures keyboard accessibility',
      ],
    },
  },
];
