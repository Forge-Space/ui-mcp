import type { IComponentSnippet } from '../types.js';

export const kanbanSnippets: IComponentSnippet[] = [
  {
    id: 'kanban-basic',
    name: 'Basic Kanban Board',
    category: 'organism',
    type: 'kanban',
    variant: 'basic',
    tags: ['kanban', 'board', 'saas', 'task-management', 'drag-drop'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'devtools', 'general'],
    visualStyles: ['soft-depth', 'linear-modern', 'minimal-editorial'],
    jsx: `<section className="flex h-full gap-4 overflow-x-auto p-4" aria-label="Kanban board">
  <div className="flex min-w-[280px] flex-col rounded-lg border bg-muted/50 p-4">
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-foreground">To Do</h3>
      <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">3</span>
    </div>
    <div className="flex flex-col gap-2">
      <article className="cursor-grab rounded-lg border bg-card p-3 shadow-sm transition-all hover:shadow-md active:cursor-grabbing">
        <h4 className="text-sm font-medium text-foreground">Update landing page copy</h4>
        <p className="mt-1 text-xs text-muted-foreground">Review messaging and CTAs</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">High</span>
          <div className="h-5 w-5 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[8px] font-medium text-muted-foreground" aria-label="Assignee avatar">A</div>
        </div>
      </article>
      <article className="cursor-grab rounded-lg border bg-card p-3 shadow-sm transition-all hover:shadow-md active:cursor-grabbing">
        <h4 className="text-sm font-medium text-foreground">Fix checkout flow bug</h4>
        <p className="mt-1 text-xs text-muted-foreground">Payment validation error</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-md bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive">Urgent</span>
          <div className="h-5 w-5 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[8px] font-medium text-muted-foreground" aria-label="Assignee avatar">B</div>
        </div>
      </article>
    </div>
  </div>
  <div className="flex min-w-[280px] flex-col rounded-lg border bg-muted/50 p-4">
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-foreground">In Progress</h3>
      <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">2</span>
    </div>
    <div className="flex flex-col gap-2">
      <article className="cursor-grab rounded-lg border bg-card p-3 shadow-sm transition-all hover:shadow-md active:cursor-grabbing">
        <h4 className="text-sm font-medium text-foreground">API integration tests</h4>
        <p className="mt-1 text-xs text-muted-foreground">Add coverage for endpoints</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-md bg-warning/10 px-1.5 py-0.5 text-[10px] font-medium text-warning">Medium</span>
          <div className="h-5 w-5 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[8px] font-medium text-muted-foreground" aria-label="Assignee avatar">C</div>
        </div>
      </article>
    </div>
  </div>
  <div className="flex min-w-[280px] flex-col rounded-lg border bg-muted/50 p-4">
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-foreground">Done</h3>
      <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">4</span>
    </div>
    <div className="flex flex-col gap-2">
      <article className="rounded-lg border bg-card p-3 opacity-70 shadow-sm">
        <h4 className="text-sm font-medium text-foreground line-through">Deploy v2.0 to staging</h4>
        <p className="mt-1 text-xs text-muted-foreground">Completed yesterday</p>
      </article>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      container: 'flex h-full gap-4 overflow-x-auto p-4',
      column: 'flex min-w-[280px] flex-col rounded-lg border bg-muted/50 p-4',
      columnHeader: 'mb-3 flex items-center justify-between',
      columnTitle: 'text-sm font-semibold text-foreground',
      columnCount: 'rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground',
      cardList: 'flex flex-col gap-2',
      card: 'cursor-grab rounded-lg border bg-card p-3 shadow-sm transition-all hover:shadow-md active:cursor-grabbing',
      cardTitle: 'text-sm font-medium text-foreground',
      cardDescription: 'mt-1 text-xs text-muted-foreground',
      cardMeta: 'mt-2 flex items-center gap-2',
      priorityBadge: 'rounded-md px-1.5 py-0.5 text-[10px] font-medium',
      avatar:
        'h-5 w-5 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[8px] font-medium text-muted-foreground',
    },
    a11y: {
      roles: ['region', 'article'],
      ariaAttributes: ['aria-label on board and avatars', 'aria-grabbed for drag state'],
      keyboardNav: 'Tab to cards, Space/Enter to select, Arrow keys to move',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h3' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'cursor-grab/cursor-grabbing for drag affordance',
        'min-w-[280px] prevents column collapse',
        'overflow-x-auto for horizontal scroll on mobile',
        'opacity-70 + line-through for completed tasks',
        'priority badges with semantic color tokens',
      ],
      inspirationSource: 'Linear roadmap view / Tremor Kanban',
      craftDetails: [
        'fixed 280px column width for consistency',
        'gap-2 between cards, gap-4 between columns',
        'bg-muted/50 for subtle column background',
        'shadow-sm → shadow-md on hover for depth',
      ],
    },
  },
  {
    id: 'kanban-swimlanes',
    name: 'Kanban with Swimlanes',
    category: 'organism',
    type: 'kanban',
    variant: 'swimlanes',
    tags: ['kanban', 'swimlanes', 'grouped', 'team', 'saas'],
    mood: ['professional', 'corporate'],
    industry: ['saas', 'devtools', 'agency'],
    visualStyles: ['soft-depth', 'corporate-trust', 'linear-modern'],
    jsx: `<section className="flex flex-col gap-4 p-4" aria-label="Kanban board with swimlanes">
  <div className="rounded-lg border bg-card">
    <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-2">
      <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">FE</div>
      <h3 className="text-sm font-semibold text-foreground">Frontend Team</h3>
    </div>
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">To Do</h4>
        <article className="cursor-grab rounded-lg border bg-background p-2.5 shadow-sm transition-all hover:shadow-md active:cursor-grabbing">
          <p className="text-xs font-medium text-foreground">Redesign dashboard UI</p>
          <div className="mt-1.5 flex items-center gap-1">
            <span className="rounded bg-primary/10 px-1 py-0.5 text-[9px] font-medium text-primary">High</span>
          </div>
        </article>
      </div>
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">In Progress</h4>
        <article className="cursor-grab rounded-lg border bg-background p-2.5 shadow-sm transition-all hover:shadow-md active:cursor-grabbing">
          <p className="text-xs font-medium text-foreground">Mobile responsive fixes</p>
          <div className="mt-1.5 flex items-center gap-1">
            <span className="rounded bg-warning/10 px-1 py-0.5 text-[9px] font-medium text-warning">Med</span>
          </div>
        </article>
      </div>
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Done</h4>
        <article className="rounded-lg border bg-background p-2.5 opacity-60 shadow-sm">
          <p className="text-xs font-medium text-foreground line-through">Component library v2</p>
        </article>
      </div>
    </div>
  </div>
  <div className="rounded-lg border bg-card">
    <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-2">
      <div className="h-6 w-6 rounded bg-accent/10 flex items-center justify-center text-xs font-medium text-accent-foreground">BE</div>
      <h3 className="text-sm font-semibold text-foreground">Backend Team</h3>
    </div>
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">To Do</h4>
        <article className="cursor-grab rounded-lg border bg-background p-2.5 shadow-sm transition-all hover:shadow-md active:cursor-grabbing">
          <p className="text-xs font-medium text-foreground">Database migration script</p>
          <div className="mt-1.5 flex items-center gap-1">
            <span className="rounded bg-destructive/10 px-1 py-0.5 text-[9px] font-medium text-destructive">Urgent</span>
          </div>
        </article>
      </div>
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">In Progress</h4>
        <article className="cursor-grab rounded-lg border bg-background p-2.5 shadow-sm transition-all hover:shadow-md active:cursor-grabbing">
          <p className="text-xs font-medium text-foreground">API rate limiting</p>
          <div className="mt-1.5 flex items-center gap-1">
            <span className="rounded bg-warning/10 px-1 py-0.5 text-[9px] font-medium text-warning">Med</span>
          </div>
        </article>
      </div>
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Done</h4>
        <article className="rounded-lg border bg-background p-2.5 opacity-60 shadow-sm">
          <p className="text-xs font-medium text-foreground line-through">Auth service upgrade</p>
        </article>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      container: 'flex flex-col gap-4 p-4',
      swimlane: 'rounded-lg border bg-card',
      swimlaneHeader: 'flex items-center gap-2 border-b bg-muted/30 px-4 py-2',
      swimlaneIcon: 'h-6 w-6 rounded flex items-center justify-center text-xs font-medium',
      swimlaneTitle: 'text-sm font-semibold text-foreground',
      columnsGrid: 'grid grid-cols-3 gap-4 p-4',
      column: 'space-y-2',
      columnTitle: 'text-xs font-medium text-muted-foreground uppercase tracking-wide',
      card: 'cursor-grab rounded-lg border bg-background p-2.5 shadow-sm transition-all hover:shadow-md active:cursor-grabbing',
      cardTitle: 'text-xs font-medium text-foreground',
    },
    a11y: {
      roles: ['region', 'article'],
      ariaAttributes: ['aria-label on board'],
      keyboardNav: 'Tab to cards, Arrow keys to navigate swimlanes',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h3' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'grid-cols-3 for consistent horizontal layout',
        'swimlane headers with team icons and bg-muted/30',
        'uppercase tracking-wide column titles',
        'compact card design (p-2.5) for dense view',
      ],
      inspirationSource: 'Jira swimlane view',
      craftDetails: [
        'border-b on swimlane headers for separation',
        'space-y-2 for vertical card spacing',
        'bg-background cards stand out from bg-card swimlanes',
        'team icon badges with semantic color backgrounds',
      ],
    },
  },
  {
    id: 'kanban-minimal',
    name: 'Minimal Kanban',
    category: 'organism',
    type: 'kanban',
    variant: 'minimal-editorial',
    tags: ['kanban', 'minimal-editorial', 'lightweight', 'simple'],
    mood: ['minimal', 'calm'],
    industry: ['general', 'startup', 'devtools'],
    visualStyles: ['minimal-editorial', 'linear-modern'],
    jsx: `<section className="flex gap-6 overflow-x-auto p-6" aria-label="Minimal kanban board">
  <div className="flex min-w-[240px] flex-col">
    <h3 className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Backlog</h3>
    <div className="space-y-1.5">
      <article className="group cursor-grab rounded border-l-2 border-l-border bg-card px-3 py-2 transition-colors hover:border-l-primary hover:bg-accent/50 active:cursor-grabbing">
        <p className="text-sm text-foreground">Refactor authentication flow</p>
      </article>
      <article className="group cursor-grab rounded border-l-2 border-l-border bg-card px-3 py-2 transition-colors hover:border-l-primary hover:bg-accent/50 active:cursor-grabbing">
        <p className="text-sm text-foreground">Add email notifications</p>
      </article>
      <article className="group cursor-grab rounded border-l-2 border-l-border bg-card px-3 py-2 transition-colors hover:border-l-primary hover:bg-accent/50 active:cursor-grabbing">
        <p className="text-sm text-foreground">Update dependencies</p>
      </article>
    </div>
  </div>
  <div className="flex min-w-[240px] flex-col">
    <h3 className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Active</h3>
    <div className="space-y-1.5">
      <article className="group cursor-grab rounded border-l-2 border-l-primary bg-card px-3 py-2 transition-colors hover:bg-accent/50 active:cursor-grabbing">
        <p className="text-sm text-foreground">Database migration</p>
        <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-2/3 bg-primary" role="progressbar" aria-valuenow={67} aria-valuemin={0} aria-valuemax={100} aria-label="Progress" />
        </div>
      </article>
      <article className="group cursor-grab rounded border-l-2 border-l-primary bg-card px-3 py-2 transition-colors hover:bg-accent/50 active:cursor-grabbing">
        <p className="text-sm text-foreground">API documentation</p>
        <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/3 bg-primary" role="progressbar" aria-valuenow={33} aria-valuemin={0} aria-valuemax={100} aria-label="Progress" />
        </div>
      </article>
    </div>
  </div>
  <div className="flex min-w-[240px] flex-col">
    <h3 className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Completed</h3>
    <div className="space-y-1.5">
      <article className="rounded border-l-2 border-l-success bg-card px-3 py-2 opacity-50">
        <p className="text-sm text-foreground line-through">Deploy to production</p>
      </article>
      <article className="rounded border-l-2 border-l-success bg-card px-3 py-2 opacity-50">
        <p className="text-sm text-foreground line-through">User testing round 2</p>
      </article>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      container: 'flex gap-6 overflow-x-auto p-6',
      column: 'flex min-w-[240px] flex-col',
      columnTitle: 'mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider',
      cardList: 'space-y-1.5',
      card: 'group cursor-grab rounded border-l-2 border-l-border bg-card px-3 py-2 transition-colors hover:border-l-primary hover:bg-accent/50 active:cursor-grabbing',
      cardActive:
        'group cursor-grab rounded border-l-2 border-l-primary bg-card px-3 py-2 transition-colors hover:bg-accent/50 active:cursor-grabbing',
      cardCompleted: 'rounded border-l-2 border-l-success bg-card px-3 py-2 opacity-50',
      cardTitle: 'text-sm text-foreground',
      progressBar: 'mt-1 h-1 w-full overflow-hidden rounded-full bg-muted',
      progressFill: 'h-full bg-primary',
    },
    a11y: {
      roles: ['region', 'article', 'progressbar'],
      ariaAttributes: ['aria-label on board', 'aria-valuenow/min/max on progress'],
      keyboardNav: 'Tab to cards, Arrow keys to move between columns',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'section', headingLevel: 'h3' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'border-l-2 for status indicator (not full border)',
        'hover:border-l-primary for interactive feedback',
        'progress bars on active tasks',
        'uppercase tracking-wider column titles',
        'space-y-1.5 for tight card spacing',
      ],
      inspirationSource: 'Linear issues view / Height app',
      craftDetails: [
        'minimal card design — no shadows or heavy borders',
        'left accent border changes color per state',
        'gap-6 between columns for breathing room',
        'opacity-50 for completed items without removal',
      ],
    },
  },
];
