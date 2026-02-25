import type { IComponentSnippet } from '../types.js';

export const onboardingSnippets: IComponentSnippet[] = [
  {
    id: 'onboarding-wizard',
    name: 'Onboarding Wizard',
    category: 'organism',
    type: 'onboarding',
    variant: 'wizard',
    tags: ['onboarding', 'wizard', 'steps', 'welcome', 'multi-step'],
    mood: ['professional', 'warm'],
    industry: ['general', 'saas', 'startup'],
    visualStyles: ['soft-depth', 'linear-modern', 'minimal-editorial'],
    jsx: `<div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center p-6">
  <div className="w-full rounded-2xl border bg-card p-8 shadow-lg">
    <div className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">1</div>
        <div className="h-0.5 w-12 bg-primary"></div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">2</div>
        <div className="h-0.5 w-12 bg-muted"></div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">3</div>
        <div className="h-0.5 w-12 bg-muted"></div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">4</div>
      </div>
      <button type="button" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Skip</button>
    </div>
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Tell us about your team</h2>
        <p className="text-sm text-muted-foreground">Help us personalize your experience by sharing a few details</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="teamName" className="text-sm font-medium text-foreground">Team name</label>
          <input type="text" id="teamName" placeholder="Acme Corp" className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
        <div className="space-y-2">
          <label htmlFor="teamSize" className="text-sm font-medium text-foreground">Team size</label>
          <select id="teamSize" className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option value="">Select team size</option>
            <option value="1-10">1-10 people</option>
            <option value="11-50">11-50 people</option>
            <option value="51-200">51-200 people</option>
            <option value="201+">201+ people</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">What will you use this for?</label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button type="button" className="flex items-start gap-3 rounded-lg border border-input bg-background p-4 text-left transition-all hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-selected:border-primary aria-selected:bg-primary/5" aria-selected="true">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary">
                <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Project management</p>
                <p className="text-xs text-muted-foreground">Track tasks and collaborate with your team</p>
              </div>
            </button>
            <button type="button" className="flex items-start gap-3 rounded-lg border border-input bg-background p-4 text-left transition-all hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-selected:border-primary aria-selected:bg-primary/5" aria-selected="false">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-input"></div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Design collaboration</p>
                <p className="text-xs text-muted-foreground">Share and review design work</p>
              </div>
            </button>
            <button type="button" className="flex items-start gap-3 rounded-lg border border-input bg-background p-4 text-left transition-all hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-selected:border-primary aria-selected:bg-primary/5" aria-selected="false">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-input"></div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Content creation</p>
                <p className="text-xs text-muted-foreground">Plan and produce content</p>
              </div>
            </button>
            <button type="button" className="flex items-start gap-3 rounded-lg border border-input bg-background p-4 text-left transition-all hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-selected:border-primary aria-selected:bg-primary/5" aria-selected="false">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-input"></div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Something else</p>
                <p className="text-xs text-muted-foreground">I'll figure it out as I go</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-8 flex items-center justify-between">
      <button type="button" className="inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Back</button>
      <button type="button" className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Continue</button>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'mx-auto flex min-h-screen max-w-5xl items-center justify-center p-6',
      card: 'w-full rounded-2xl border bg-card p-8 shadow-lg',
      stepper: 'mb-8 flex items-center justify-between',
      stepActive:
        'flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground',
      stepInactive:
        'flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground',
      connector: 'h-0.5 w-12',
      option:
        'flex items-start gap-3 rounded-lg border border-input bg-background p-4 text-left transition-all hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      radio: 'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
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
        'horizontal step indicator',
        'radio card UI pattern',
        'skip option in header',
        'aria-selected state management',
      ],
      inspirationSource: 'Linear onboarding',
      craftDetails: ['h-0.5 w-12 connectors', 'rounded-2xl card', 'grid-cols-2 on sm'],
    },
  },
  {
    id: 'onboarding-tour',
    name: 'Feature Tour',
    category: 'organism',
    type: 'onboarding',
    variant: 'tour',
    tags: ['onboarding', 'tour', 'tooltip', 'spotlight', 'guide'],
    mood: ['playful', 'professional'],
    industry: ['general', 'saas'],
    visualStyles: ['soft-depth', 'linear-modern', 'dark-premium'],
    jsx: `<div className="relative">
  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-40"></div>
  <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
    <div className="relative w-96 rounded-xl border bg-card p-6 shadow-2xl ring-1 ring-border">
      <div className="absolute -top-2 right-6 flex items-center gap-1">
        <div className="h-1.5 w-1.5 rounded-full bg-muted"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-muted"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-muted"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-muted"></div>
      </div>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" /></svg>
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">Create your first project</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Click the + button in the sidebar to create a new project. Projects help you organize your work and collaborate with teammates.</p>
        </div>
        <div className="rounded-lg border bg-muted/50 p-3">
          <p className="text-xs font-medium text-muted-foreground">💡 Tip: Use keyboard shortcut <kbd className="rounded bg-background px-1.5 py-0.5 font-mono text-foreground">⌘N</kbd> for quick access</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <button type="button" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Skip tour</button>
        <div className="flex gap-2">
          <button type="button" className="inline-flex h-9 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Previous</button>
          <button type="button" className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Next</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      overlay: 'absolute inset-0 bg-background/80 backdrop-blur-sm z-40',
      tooltip: 'absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
      card: 'relative w-96 rounded-xl border bg-card p-6 shadow-2xl ring-1 ring-border',
      progressDots: 'absolute -top-2 right-6 flex items-center gap-1',
      dot: 'h-1.5 w-1.5 rounded-full',
      iconWrapper: 'mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10',
      icon: 'h-6 w-6 text-primary',
      tipBox: 'rounded-lg border bg-muted/50 p-3',
      kbd: 'rounded bg-background px-1.5 py-0.5 font-mono text-foreground',
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
        'backdrop-blur-sm overlay',
        'progress dots above card',
        'keyboard shortcut in tip box',
        'icon in colored circle',
      ],
      inspirationSource: 'Loom product tour',
      craftDetails: ['shadow-2xl for elevation', 'ring-1 ring-border subtle outline', 'h-1.5 w-1.5 progress dots'],
    },
  },
  {
    id: 'onboarding-checklist',
    name: 'Onboarding Checklist',
    category: 'organism',
    type: 'onboarding',
    variant: 'checklist',
    tags: ['onboarding', 'checklist', 'progress', 'tasks', 'getting-started'],
    mood: ['professional', 'warm'],
    industry: ['general', 'saas', 'startup'],
    visualStyles: ['soft-depth', 'linear-modern', 'minimal-editorial'],
    jsx: `<div className="mx-auto max-w-2xl p-6">
  <div className="rounded-xl border bg-card p-6">
    <div className="mb-6 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Getting started</h2>
        <button type="button" className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Dismiss checklist">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">3 of 5 completed</span>
          <span className="font-medium text-foreground">60%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-3/5 rounded-full bg-primary transition-all duration-500"></div>
        </div>
      </div>
    </div>
    <div className="space-y-3">
      <button type="button" className="flex w-full items-start gap-4 rounded-lg border border-success/20 bg-success/5 p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" disabled>
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success">
          <svg className="h-3.5 w-3.5 text-success-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium text-foreground line-through opacity-60">Create your account</p>
          <p className="text-xs text-muted-foreground">Welcome! Your account is all set up.</p>
        </div>
      </button>
      <button type="button" className="flex w-full items-start gap-4 rounded-lg border border-success/20 bg-success/5 p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" disabled>
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success">
          <svg className="h-3.5 w-3.5 text-success-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium text-foreground line-through opacity-60">Verify your email</p>
          <p className="text-xs text-muted-foreground">Email confirmed successfully.</p>
        </div>
      </button>
      <button type="button" className="flex w-full items-start gap-4 rounded-lg border border-success/20 bg-success/5 p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" disabled>
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success">
          <svg className="h-3.5 w-3.5 text-success-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium text-foreground line-through opacity-60">Complete your profile</p>
          <p className="text-xs text-muted-foreground">Profile information updated.</p>
        </div>
      </button>
      <button type="button" className="flex w-full items-start gap-4 rounded-lg border bg-background p-4 text-left transition-all hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-primary">
          <div className="h-2 w-2 rounded-full bg-primary"></div>
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium text-foreground">Create your first project</p>
          <p className="text-xs text-muted-foreground">Start organizing your work in projects.</p>
        </div>
        <svg className="h-5 w-5 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
      </button>
      <button type="button" className="flex w-full items-start gap-4 rounded-lg border bg-background p-4 text-left transition-all hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-input"></div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium text-foreground">Invite team members</p>
          <p className="text-xs text-muted-foreground">Collaborate with your team.</p>
        </div>
        <svg className="h-5 w-5 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
      </button>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'mx-auto max-w-2xl p-6',
      card: 'rounded-xl border bg-card p-6',
      header: 'mb-6 space-y-3',
      title: 'text-xl font-semibold text-foreground',
      progressBar: 'h-2 overflow-hidden rounded-full bg-muted',
      progressFill: 'h-full rounded-full bg-primary transition-all duration-500',
      itemComplete: 'flex w-full items-start gap-4 rounded-lg border border-success/20 bg-success/5 p-4',
      itemActive:
        'flex w-full items-start gap-4 rounded-lg border bg-background p-4 transition-all hover:border-primary hover:bg-accent',
      checkComplete: 'flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success',
      checkActive: 'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-primary',
      checkInactive: 'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-input',
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
        'progress bar with percentage',
        'success/5 completed state background',
        'line-through on completed text',
        'chevron on actionable items',
      ],
      inspirationSource: 'Notion getting started',
      craftDetails: [
        'w-3/5 dynamic progress width',
        'transition-all duration-500 smooth animation',
        'border-2 radio circles',
      ],
    },
  },
  {
    id: 'onboarding-role-select',
    name: 'Role Selection',
    category: 'organism',
    type: 'onboarding',
    variant: 'role-select',
    tags: ['onboarding', 'role', 'persona', 'selection', 'cards'],
    mood: ['professional', 'playful'],
    industry: ['general', 'saas', 'startup'],
    visualStyles: ['soft-depth', 'linear-modern', 'bento-grid'],
    jsx: `<div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center p-6">
  <div className="w-full space-y-8">
    <div className="text-center space-y-3">
      <h1 className="text-3xl font-bold text-foreground">What describes you best?</h1>
      <p className="text-base text-muted-foreground">We'll personalize your experience based on your role</p>
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <button type="button" className="group relative overflow-hidden rounded-xl border bg-card p-6 text-left transition-all hover:border-primary hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-selected:border-primary aria-selected:shadow-lg" aria-selected="false">
        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-input group-aria-selected:border-primary group-aria-selected:bg-primary">
          <svg className="h-3.5 w-3.5 text-primary-foreground opacity-0 group-aria-selected:opacity-100" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
        </div>
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
          <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" /></svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Designer</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Create beautiful interfaces and collaborate with developers</p>
        </div>
      </button>
      <button type="button" className="group relative overflow-hidden rounded-xl border bg-card p-6 text-left transition-all hover:border-primary hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-selected:border-primary aria-selected:shadow-lg" aria-selected="true">
        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-primary">
          <svg className="h-3.5 w-3.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
        </div>
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
          <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Developer</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Build and ship features with your team</p>
        </div>
      </button>
      <button type="button" className="group relative overflow-hidden rounded-xl border bg-card p-6 text-left transition-all hover:border-primary hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-selected:border-primary aria-selected:shadow-lg" aria-selected="false">
        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-input group-aria-selected:border-primary group-aria-selected:bg-primary">
          <svg className="h-3.5 w-3.5 text-primary-foreground opacity-0 group-aria-selected:opacity-100" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
        </div>
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
          <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" /></svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Product Manager</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Plan features and coordinate across teams</p>
        </div>
      </button>
      <button type="button" className="group relative overflow-hidden rounded-xl border bg-card p-6 text-left transition-all hover:border-primary hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-selected:border-primary aria-selected:shadow-lg" aria-selected="false">
        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-input group-aria-selected:border-primary group-aria-selected:bg-primary">
          <svg className="h-3.5 w-3.5 text-primary-foreground opacity-0 group-aria-selected:opacity-100" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
        </div>
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
          <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" /></svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Marketing</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Create campaigns and track performance</p>
        </div>
      </button>
      <button type="button" className="group relative overflow-hidden rounded-xl border bg-card p-6 text-left transition-all hover:border-primary hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-selected:border-primary aria-selected:shadow-lg" aria-selected="false">
        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-input group-aria-selected:border-primary group-aria-selected:bg-primary">
          <svg className="h-3.5 w-3.5 text-primary-foreground opacity-0 group-aria-selected:opacity-100" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
        </div>
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
          <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Sales</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Manage deals and customer relationships</p>
        </div>
      </button>
      <button type="button" className="group relative overflow-hidden rounded-xl border bg-card p-6 text-left transition-all hover:border-primary hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-selected:border-primary aria-selected:shadow-lg" aria-selected="false">
        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-input group-aria-selected:border-primary group-aria-selected:bg-primary">
          <svg className="h-3.5 w-3.5 text-primary-foreground opacity-0 group-aria-selected:opacity-100" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
        </div>
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-gray-500 to-gray-700">
          <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" /></svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Other</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Explore and find your own workflow</p>
        </div>
      </button>
    </div>
    <div className="flex justify-center">
      <button type="button" className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">Continue</button>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'mx-auto flex min-h-screen max-w-6xl items-center justify-center p-6',
      header: 'text-center space-y-3',
      title: 'text-3xl font-bold text-foreground',
      grid: 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3',
      card: 'group relative overflow-hidden rounded-xl border bg-card p-6 text-left transition-all hover:border-primary hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      checkbox: 'absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2',
      iconWrapper: 'mb-4 flex h-14 w-14 items-center justify-center rounded-lg',
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
        'gradient icon backgrounds',
        'aria-selected state management',
        'group-aria-selected for checkbox',
        'hover:shadow-lg elevation',
      ],
      inspirationSource: 'Slack workspace setup',
      craftDetails: [
        'h-14 w-14 icon wrapper',
        'lg:grid-cols-3 responsive grid',
        'opacity-0 group-aria-selected:opacity-100 checkbox',
      ],
    },
  },
];
