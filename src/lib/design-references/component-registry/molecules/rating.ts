import type { IComponentSnippet } from '../types.js';

export const ratingSnippets: IComponentSnippet[] = [
  {
    id: 'rating-stars',
    name: 'Star Rating',
    category: 'molecule',
    type: 'rating',
    variant: 'stars',
    tags: ['rating', 'stars', 'review', 'feedback', 'interactive'],
    mood: ['professional', 'warm'],
    industry: ['general', 'ecommerce', 'media'],
    visualStyles: ['soft-depth', 'linear-modern', 'minimal-editorial'],
    jsx: `<div className="flex flex-col gap-3">
  <label className="text-sm font-medium text-foreground" id="rating-label">Rate your experience</label>
  <div className="flex gap-1" role="radiogroup" aria-labelledby="rating-label">
    <button type="button" role="radio" aria-checked="false" aria-label="1 star" className="group inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <svg className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-warning group-aria-checked:fill-warning group-aria-checked:text-warning" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
    </button>
    <button type="button" role="radio" aria-checked="false" aria-label="2 stars" className="group inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <svg className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-warning group-aria-checked:fill-warning group-aria-checked:text-warning" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
    </button>
    <button type="button" role="radio" aria-checked="true" aria-label="3 stars" className="group inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <svg className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-warning group-aria-checked:fill-warning group-aria-checked:text-warning" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
    </button>
    <button type="button" role="radio" aria-checked="false" aria-label="4 stars" className="group inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <svg className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-warning group-aria-checked:fill-warning group-aria-checked:text-warning" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
    </button>
    <button type="button" role="radio" aria-checked="false" aria-label="5 stars" className="group inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <svg className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-warning group-aria-checked:fill-warning group-aria-checked:text-warning" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
    </button>
  </div>
  <p className="text-xs text-muted-foreground">3 out of 5 stars</p>
</div>`,
    tailwindClasses: {
      container: 'flex flex-col gap-3',
      label: 'text-sm font-medium text-foreground',
      radiogroup: 'flex gap-1',
      button:
        'group inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      star: 'h-6 w-6 text-muted-foreground transition-colors group-hover:text-warning group-aria-checked:fill-warning group-aria-checked:text-warning',
      hint: 'text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-label="Component"'],
      keyboardNav: 'Standard focus management',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    seo: { semanticElement: 'section' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: [
        'radiogroup semantics for mutually exclusive selection',
        'group-aria-checked for CSS state management',
        'text-warning semantic color',
        'hover preview with group-hover',
      ],
      inspirationSource: 'Amazon product ratings',
      craftDetails: ['h-10 w-10 touch targets', 'gap-1 tight star spacing', 'fill-warning on selected stars'],
    },
  },
  {
    id: 'rating-emoji',
    name: 'Emoji Rating',
    category: 'molecule',
    type: 'rating',
    variant: 'emoji',
    tags: ['rating', 'emoji', 'feedback', 'sentiment', 'playful'],
    mood: ['playful', 'warm'],
    industry: ['general', 'saas', 'media'],
    visualStyles: ['soft-depth', 'linear-modern', 'retro-playful'],
    jsx: `<div className="flex flex-col gap-3">
  <label className="text-sm font-medium text-foreground" id="emoji-rating-label">How was your experience?</label>
  <div className="flex gap-2" role="radiogroup" aria-labelledby="emoji-rating-label">
    <button type="button" role="radio" aria-checked="false" aria-label="Very dissatisfied" className="group inline-flex h-14 w-14 items-center justify-center rounded-lg border border-transparent text-3xl transition-all hover:border-border hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-destructive aria-checked:bg-destructive/10">
      😞
    </button>
    <button type="button" role="radio" aria-checked="false" aria-label="Dissatisfied" className="group inline-flex h-14 w-14 items-center justify-center rounded-lg border border-transparent text-3xl transition-all hover:border-border hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-warning aria-checked:bg-warning/10">
      🙁
    </button>
    <button type="button" role="radio" aria-checked="false" aria-label="Neutral" className="group inline-flex h-14 w-14 items-center justify-center rounded-lg border border-transparent text-3xl transition-all hover:border-border hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-border aria-checked:bg-muted">
      😐
    </button>
    <button type="button" role="radio" aria-checked="true" aria-label="Satisfied" className="group inline-flex h-14 w-14 items-center justify-center rounded-lg border border-transparent text-3xl transition-all hover:border-border hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-success aria-checked:bg-success/10">
      🙂
    </button>
    <button type="button" role="radio" aria-checked="false" aria-label="Very satisfied" className="group inline-flex h-14 w-14 items-center justify-center rounded-lg border border-transparent text-3xl transition-all hover:border-border hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-success aria-checked:bg-success/10">
      😄
    </button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex flex-col gap-3',
      label: 'text-sm font-medium text-foreground',
      radiogroup: 'flex gap-2',
      button:
        'group inline-flex h-14 w-14 items-center justify-center rounded-lg border border-transparent text-3xl transition-all hover:border-border hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-label="Component"'],
      keyboardNav: 'Standard focus management',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    seo: { semanticElement: 'section' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: [
        'emoji faces for emotional resonance',
        'semantic color borders on selection',
        'h-14 w-14 large touch targets',
        'aria-checked state variants',
      ],
      inspirationSource: 'Uber rating screen',
      craftDetails: ['text-3xl emoji size', 'gap-2 spacing', 'border state transitions'],
    },
  },
  {
    id: 'rating-thumbs',
    name: 'Thumbs Rating',
    category: 'molecule',
    type: 'rating',
    variant: 'thumbs',
    tags: ['rating', 'thumbs', 'binary', 'feedback', 'like-dislike'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'media'],
    visualStyles: ['minimal-editorial', 'linear-modern', 'soft-depth'],
    jsx: `<div className="flex flex-col gap-3">
  <label className="text-sm font-medium text-foreground" id="thumbs-rating-label">Was this helpful?</label>
  <div className="flex gap-2" role="radiogroup" aria-labelledby="thumbs-rating-label">
    <button type="button" role="radio" aria-checked="true" aria-label="Yes, this was helpful" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-transparent bg-background px-4 text-sm font-medium text-foreground transition-all hover:border-border hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-success aria-checked:bg-success/10 aria-checked:text-success">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5.004 9.5H5.25a.75.75 0 0 1 .75.75v7.5c0 .329-.062.646-.177.927Z" /></svg>
      Yes
    </button>
    <button type="button" role="radio" aria-checked="false" aria-label="No, this was not helpful" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-transparent bg-background px-4 text-sm font-medium text-foreground transition-all hover:border-border hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-destructive aria-checked:bg-destructive/10 aria-checked:text-destructive">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.923 1.227h-.405a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 .6-.734Z" /></svg>
      No
    </button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex flex-col gap-3',
      label: 'text-sm font-medium text-foreground',
      radiogroup: 'flex gap-2',
      button:
        'inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-transparent bg-background px-4 text-sm font-medium text-foreground transition-all hover:border-border hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-label="Component"'],
      keyboardNav: 'Standard focus management',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    seo: { semanticElement: 'section' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: [
        'binary choice with clear semantic colors',
        'success/destructive color coding',
        'descriptive text labels with icons',
      ],
      inspirationSource: 'YouTube like/dislike',
      craftDetails: ['gap-2 button spacing', 'aria-checked state styling', 'px-4 horizontal padding'],
    },
  },
  {
    id: 'rating-scale',
    name: 'Number Scale Rating',
    category: 'molecule',
    type: 'rating',
    variant: 'scale',
    tags: ['rating', 'scale', 'nps', 'number', 'survey'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'agency', 'general'],
    visualStyles: ['minimal-editorial', 'linear-modern', 'corporate-trust'],
    jsx: `<div className="flex flex-col gap-3">
  <label className="text-sm font-medium text-foreground" id="scale-rating-label">How likely are you to recommend us to a friend?</label>
  <div className="flex gap-1.5" role="radiogroup" aria-labelledby="scale-rating-label">
    <button type="button" role="radio" aria-checked="false" aria-label="Not at all likely - 0" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium text-muted-foreground transition-all hover:border-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-destructive aria-checked:bg-destructive aria-checked:text-destructive-foreground">0</button>
    <button type="button" role="radio" aria-checked="false" aria-label="1" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium text-muted-foreground transition-all hover:border-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-destructive aria-checked:bg-destructive aria-checked:text-destructive-foreground">1</button>
    <button type="button" role="radio" aria-checked="false" aria-label="2" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium text-muted-foreground transition-all hover:border-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-destructive aria-checked:bg-destructive aria-checked:text-destructive-foreground">2</button>
    <button type="button" role="radio" aria-checked="false" aria-label="3" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium text-muted-foreground transition-all hover:border-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-destructive aria-checked:bg-destructive aria-checked:text-destructive-foreground">3</button>
    <button type="button" role="radio" aria-checked="false" aria-label="4" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium text-muted-foreground transition-all hover:border-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-destructive aria-checked:bg-destructive aria-checked:text-destructive-foreground">4</button>
    <button type="button" role="radio" aria-checked="false" aria-label="5" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium text-muted-foreground transition-all hover:border-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-warning aria-checked:bg-warning aria-checked:text-warning-foreground">5</button>
    <button type="button" role="radio" aria-checked="false" aria-label="6" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium text-muted-foreground transition-all hover:border-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-warning aria-checked:bg-warning aria-checked:text-warning-foreground">6</button>
    <button type="button" role="radio" aria-checked="false" aria-label="7" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium text-muted-foreground transition-all hover:border-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-warning aria-checked:bg-warning aria-checked:text-warning-foreground">7</button>
    <button type="button" role="radio" aria-checked="false" aria-label="8" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium text-muted-foreground transition-all hover:border-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-warning aria-checked:bg-warning aria-checked:text-warning-foreground">8</button>
    <button type="button" role="radio" aria-checked="true" aria-label="9" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium text-muted-foreground transition-all hover:border-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-success aria-checked:bg-success aria-checked:text-success-foreground">9</button>
    <button type="button" role="radio" aria-checked="false" aria-label="Extremely likely - 10" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium text-muted-foreground transition-all hover:border-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-checked:border-success aria-checked:bg-success aria-checked:text-success-foreground">10</button>
  </div>
  <div className="flex justify-between text-xs text-muted-foreground">
    <span>Not at all likely</span>
    <span>Extremely likely</span>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex flex-col gap-3',
      label: 'text-sm font-medium text-foreground',
      radiogroup: 'flex gap-1.5',
      button:
        'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium text-muted-foreground transition-all hover:border-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      labels: 'flex justify-between text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-label="Component"'],
      keyboardNav: 'Standard focus management',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    seo: { semanticElement: 'section' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: [
        'NPS-style 0-10 scale',
        'semantic color gradient (destructive → warning → success)',
        'descriptive labels at extremes',
        'h-10 w-10 uniform squares',
      ],
      inspirationSource: 'Net Promoter Score surveys',
      craftDetails: ['gap-1.5 tight spacing', 'aria-checked state colors', 'text-xs labels'],
    },
  },
];
