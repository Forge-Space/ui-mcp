import type { IComponentSnippet } from '../types.js';

export const datePickerSnippets: IComponentSnippet[] = [
  {
    id: 'date-picker-single',
    name: 'Single Date Picker',
    category: 'molecule',
    type: 'date-picker',
    variant: 'single',
    tags: ['calendar', 'date', 'input', 'form'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'general'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="inline-block w-80 rounded-lg border border-border bg-card p-4 shadow-lg">
  <div className="mb-4 flex items-center justify-between">
    <button className="rounded-sm p-1 transition-colors hover:bg-accent hover:text-accent-foreground">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
    </button>
    <span className="text-sm font-semibold text-card-foreground">March 2024</span>
    <button className="rounded-sm p-1 transition-colors hover:bg-accent hover:text-accent-foreground">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
    </button>
  </div>
  <div className="grid grid-cols-7 gap-1 text-center">
    <div className="p-2 text-xs font-medium text-muted-foreground">Su</div>
    <div className="p-2 text-xs font-medium text-muted-foreground">Mo</div>
    <div className="p-2 text-xs font-medium text-muted-foreground">Tu</div>
    <div className="p-2 text-xs font-medium text-muted-foreground">We</div>
    <div className="p-2 text-xs font-medium text-muted-foreground">Th</div>
    <div className="p-2 text-xs font-medium text-muted-foreground">Fr</div>
    <div className="p-2 text-xs font-medium text-muted-foreground">Sa</div>
    <button className="rounded-md p-2 text-xs text-muted-foreground">25</button>
    <button className="rounded-md p-2 text-xs text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">1</button>
    <button className="rounded-md bg-primary p-2 text-xs font-medium text-primary-foreground">15</button>
    <button className="rounded-md p-2 text-xs text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">16</button>
    <button className="rounded-md p-2 text-xs text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">17</button>
    <button className="rounded-md p-2 text-xs text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">18</button>
    <button className="rounded-md p-2 text-xs text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">19</button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'inline-block w-80 rounded-lg border border-border bg-card p-4 shadow-lg',
      header: 'mb-4 flex items-center justify-between',
      navButton: 'rounded-sm p-1 transition-colors hover:bg-accent hover:text-accent-foreground',
      monthYear: 'text-sm font-semibold text-card-foreground',
      grid: 'grid grid-cols-7 gap-1 text-center',
      dayHeader: 'p-2 text-xs font-medium text-muted-foreground',
      dayButton:
        'rounded-md p-2 text-xs text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      daySelected: 'rounded-md bg-primary p-2 text-xs font-medium text-primary-foreground',
      dayDisabled: 'rounded-md p-2 text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['role=dialog', 'aria-label=Choose date'],
      keyboardNav: 'Arrow keys navigate dates, Enter selects, Escape closes',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=date]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-80 for calendar grid'] },
    quality: {
      antiGeneric: ['grid-cols-7 for week layout', 'gap-1 tight cell spacing'],
      inspirationSource: 'HeroUI DatePicker component',
      craftDetails: ['font-medium for selected date emphasis', 'text-xs compact date cells'],
    },
  },
  {
    id: 'date-picker-range',
    name: 'Date Range Picker',
    category: 'molecule',
    type: 'date-picker',
    variant: 'range',
    tags: ['calendar', 'range', 'general', 'form'],
    mood: ['professional', 'professional'],
    industry: ['general', 'general', 'saas'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="inline-block w-80 rounded-lg border border-border bg-card p-4 shadow-lg">
  <div className="mb-4 flex items-center justify-between">
    <button className="rounded-sm p-1 transition-colors hover:bg-accent hover:text-accent-foreground">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
    </button>
    <span className="text-sm font-semibold text-card-foreground">March 2024</span>
    <button className="rounded-sm p-1 transition-colors hover:bg-accent hover:text-accent-foreground">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
    </button>
  </div>
  <div className="grid grid-cols-7 gap-1 text-center">
    <div className="p-2 text-xs font-medium text-muted-foreground">Su</div>
    <div className="p-2 text-xs font-medium text-muted-foreground">Mo</div>
    <div className="p-2 text-xs font-medium text-muted-foreground">Tu</div>
    <div className="p-2 text-xs font-medium text-muted-foreground">We</div>
    <div className="p-2 text-xs font-medium text-muted-foreground">Th</div>
    <div className="p-2 text-xs font-medium text-muted-foreground">Fr</div>
    <div className="p-2 text-xs font-medium text-muted-foreground">Sa</div>
    <button className="rounded-md p-2 text-xs text-card-foreground transition-colors hover:bg-accent">10</button>
    <button className="rounded-md bg-primary p-2 text-xs font-medium text-primary-foreground">11</button>
    <button className="bg-primary/20 p-2 text-xs font-medium text-primary">12</button>
    <button className="bg-primary/20 p-2 text-xs font-medium text-primary">13</button>
    <button className="bg-primary/20 p-2 text-xs font-medium text-primary">14</button>
    <button className="rounded-md bg-primary p-2 text-xs font-medium text-primary-foreground">15</button>
    <button className="rounded-md p-2 text-xs text-card-foreground transition-colors hover:bg-accent">16</button>
  </div>
  <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
    <div className="flex justify-between">
      <span>Start: Mar 11, 2024</span>
      <span>End: Mar 15, 2024</span>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'inline-block w-80 rounded-lg border border-border bg-card p-4 shadow-lg',
      grid: 'grid grid-cols-7 gap-1 text-center',
      dayButton: 'rounded-md p-2 text-xs text-card-foreground transition-colors hover:bg-accent',
      dayRangeStart: 'rounded-md bg-primary p-2 text-xs font-medium text-primary-foreground',
      dayRangeEnd: 'rounded-md bg-primary p-2 text-xs font-medium text-primary-foreground',
      dayInRange: 'bg-primary/20 p-2 text-xs font-medium text-primary',
      footer: 'mt-4 border-t border-border pt-3 text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['role=dialog', 'aria-label=Choose date range'],
      keyboardNav: 'Arrow keys navigate, Shift+Arrow extends selection, Enter confirms',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=date]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-80 for calendar'] },
    quality: {
      antiGeneric: ['bg-primary/20 for in-range dates', 'border-t for footer separation'],
      inspirationSource: 'Airbnb date range picker',
      craftDetails: ['rounded-md only on start/end dates', 'flex justify-between for range display'],
    },
  },
  {
    id: 'date-picker-month',
    name: 'Month Picker',
    category: 'molecule',
    type: 'date-picker',
    variant: 'month',
    tags: ['calendar', 'month', 'year', 'form'],
    mood: ['minimal', 'minimal'],
    industry: ['saas', 'saas', 'saas'],
    visualStyles: ['soft-depth', 'minimal-editorial'],
    jsx: `<div className="inline-block w-64 rounded-lg border border-border bg-card p-4 shadow-lg">
  <div className="mb-4 flex items-center justify-between">
    <button className="rounded-sm p-1 transition-colors hover:bg-accent hover:text-accent-foreground">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
    </button>
    <span className="text-sm font-semibold text-card-foreground">2024</span>
    <button className="rounded-sm p-1 transition-colors hover:bg-accent hover:text-accent-foreground">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
    </button>
  </div>
  <div className="grid grid-cols-3 gap-2">
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">Jan</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">Feb</button>
    <button className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">Mar</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">Apr</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">May</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">Jun</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">Jul</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">Aug</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">Sep</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">Oct</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">Nov</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">Dec</button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'inline-block w-64 rounded-lg border border-border bg-card p-4 shadow-lg',
      header: 'mb-4 flex items-center justify-between',
      grid: 'grid grid-cols-3 gap-2',
      monthButton:
        'rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      monthSelected: 'rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground',
    },
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['role=dialog', 'aria-label=Choose month'],
      keyboardNav: 'Arrow keys navigate months, Enter selects',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=month]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-64 for month grid'] },
    quality: {
      antiGeneric: ['grid-cols-3 for quarterly layout', 'gap-2 for month spacing'],
      inspirationSource: 'Mantine MonthPicker component',
      craftDetails: ['text-sm for compact month labels', 'px-3 py-2 for touch targets'],
    },
  },
  {
    id: 'date-picker-year',
    name: 'Year Picker',
    category: 'molecule',
    type: 'date-picker',
    variant: 'year',
    tags: ['calendar', 'year', 'decade', 'form'],
    mood: ['minimal', 'professional'],
    industry: ['saas', 'saas', 'general'],
    visualStyles: ['soft-depth', 'minimal-editorial'],
    jsx: `<div className="inline-block w-64 rounded-lg border border-border bg-card p-4 shadow-lg">
  <div className="mb-4 flex items-center justify-between">
    <button className="rounded-sm p-1 transition-colors hover:bg-accent hover:text-accent-foreground">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
    </button>
    <span className="text-sm font-semibold text-card-foreground">2020 - 2029</span>
    <button className="rounded-sm p-1 transition-colors hover:bg-accent hover:text-accent-foreground">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
    </button>
  </div>
  <div className="grid grid-cols-4 gap-2">
    <button className="rounded-md px-3 py-2 text-sm text-muted-foreground">2019</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">2020</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">2021</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">2022</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">2023</button>
    <button className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">2024</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">2025</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">2026</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">2027</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">2028</button>
    <button className="rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">2029</button>
    <button className="rounded-md px-3 py-2 text-sm text-muted-foreground">2030</button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'inline-block w-64 rounded-lg border border-border bg-card p-4 shadow-lg',
      header: 'mb-4 flex items-center justify-between',
      grid: 'grid grid-cols-4 gap-2',
      yearButton:
        'rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      yearSelected: 'rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground',
      yearOutOfRange: 'rounded-md px-3 py-2 text-sm text-muted-foreground',
    },
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['role=dialog', 'aria-label=Choose year'],
      keyboardNav: 'Arrow keys navigate years, Enter selects',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=number]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-64 for year grid'] },
    quality: {
      antiGeneric: ['grid-cols-4 for decade layout', 'text-muted-foreground for out-of-range years'],
      inspirationSource: 'Mantine YearPicker component',
      craftDetails: ['gap-2 for year spacing', 'font-medium for current year emphasis'],
    },
  },
  {
    id: 'date-picker-time',
    name: 'Time Picker',
    category: 'molecule',
    type: 'date-picker',
    variant: 'time',
    tags: ['time', 'clock', 'hours', 'minutes'],
    mood: ['professional', 'professional'],
    industry: ['general', 'saas', 'saas'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="inline-block w-56 rounded-lg border border-border bg-card p-4 shadow-lg">
  <div className="mb-4 text-center">
    <div className="text-3xl font-semibold text-card-foreground">14:30</div>
    <div className="mt-1 text-xs text-muted-foreground">Select time</div>
  </div>
  <div className="flex gap-2">
    <div className="flex-1">
      <div className="mb-2 text-xs font-medium text-card-foreground">Hours</div>
      <div className="max-h-32 space-y-1 overflow-y-auto rounded-md border border-border bg-muted/30 p-1">
        <button className="w-full rounded px-2 py-1 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">12</button>
        <button className="w-full rounded px-2 py-1 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">13</button>
        <button className="w-full rounded bg-primary px-2 py-1 text-sm font-medium text-primary-foreground">14</button>
        <button className="w-full rounded px-2 py-1 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">15</button>
        <button className="w-full rounded px-2 py-1 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">16</button>
      </div>
    </div>
    <div className="flex-1">
      <div className="mb-2 text-xs font-medium text-card-foreground">Minutes</div>
      <div className="max-h-32 space-y-1 overflow-y-auto rounded-md border border-border bg-muted/30 p-1">
        <button className="w-full rounded px-2 py-1 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">15</button>
        <button className="w-full rounded bg-primary px-2 py-1 text-sm font-medium text-primary-foreground">30</button>
        <button className="w-full rounded px-2 py-1 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">45</button>
        <button className="w-full rounded px-2 py-1 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">00</button>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'inline-block w-56 rounded-lg border border-border bg-card p-4 shadow-lg',
      display: 'mb-4 text-center',
      time: 'text-3xl font-semibold text-card-foreground',
      columns: 'flex gap-2',
      column: 'flex-1',
      columnLabel: 'mb-2 text-xs font-medium text-card-foreground',
      scrollArea: 'max-h-32 space-y-1 overflow-y-auto rounded-md border border-border bg-muted/30 p-1',
      timeButton:
        'w-full rounded px-2 py-1 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      timeSelected: 'w-full rounded bg-primary px-2 py-1 text-sm font-medium text-primary-foreground',
    },
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['role=dialog', 'aria-label=Choose time'],
      keyboardNav: 'Arrow keys navigate, Enter selects, Tab switches hour/minute',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=time]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-56 for dual columns'] },
    quality: {
      antiGeneric: ['max-h-32 overflow-y-auto for scrollable lists', 'text-3xl for large time display'],
      inspirationSource: 'iOS native time picker',
      craftDetails: ['space-y-1 for list spacing', 'bg-muted/30 for subtle column background'],
    },
  },
  {
    id: 'date-picker-datetime',
    name: 'DateTime Picker',
    category: 'molecule',
    type: 'date-picker',
    variant: 'datetime',
    tags: ['datetime', 'calendar', 'time', 'soft-depth'],
    mood: ['professional', 'professional'],
    industry: ['saas', 'general', 'saas'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="inline-block w-96 rounded-lg border border-border bg-card shadow-lg">
  <div className="flex border-b border-border">
    <div className="flex-1 border-r border-border p-4">
      <div className="mb-3 text-center text-xs font-medium text-card-foreground">Select Date</div>
      <div className="grid grid-cols-7 gap-1 text-center">
        <div className="p-1 text-xs text-muted-foreground">Su</div>
        <div className="p-1 text-xs text-muted-foreground">Mo</div>
        <div className="p-1 text-xs text-muted-foreground">Tu</div>
        <div className="p-1 text-xs text-muted-foreground">We</div>
        <div className="p-1 text-xs text-muted-foreground">Th</div>
        <div className="p-1 text-xs text-muted-foreground">Fr</div>
        <div className="p-1 text-xs text-muted-foreground">Sa</div>
        <button className="rounded p-1 text-xs text-card-foreground transition-colors hover:bg-accent">10</button>
        <button className="rounded p-1 text-xs text-card-foreground transition-colors hover:bg-accent">11</button>
        <button className="rounded p-1 text-xs text-card-foreground transition-colors hover:bg-accent">12</button>
        <button className="rounded p-1 text-xs text-card-foreground transition-colors hover:bg-accent">13</button>
        <button className="rounded p-1 text-xs text-card-foreground transition-colors hover:bg-accent">14</button>
        <button className="rounded bg-primary p-1 text-xs font-medium text-primary-foreground">15</button>
        <button className="rounded p-1 text-xs text-card-foreground transition-colors hover:bg-accent">16</button>
      </div>
    </div>
    <div className="w-32 p-4">
      <div className="mb-3 text-center text-xs font-medium text-card-foreground">Time</div>
      <div className="mb-3 text-center text-2xl font-semibold text-card-foreground">14:30</div>
      <div className="space-y-2">
        <div>
          <div className="mb-1 text-xs text-muted-foreground">Hour</div>
          <input type="number" min="0" max="23" value="14" className="w-full rounded border border-border bg-background px-2 py-1 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <div className="mb-1 text-xs text-muted-foreground">Min</div>
          <input type="number" min="0" max="59" value="30" className="w-full rounded border border-border bg-background px-2 py-1 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
        </div>
      </div>
    </div>
  </div>
  <div className="flex justify-end gap-2 p-3">
    <button className="rounded-md bg-secondary px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80">Cancel</button>
    <button className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground transition-colors hover:bg-primary/90">Confirm</button>
  </div>
</div>`,
    tailwindClasses: {
      container: 'inline-block w-96 rounded-lg border border-border bg-card shadow-lg',
      split: 'flex border-b border-border',
      dateSection: 'flex-1 border-r border-border p-4',
      timeSection: 'w-32 p-4',
      grid: 'grid grid-cols-7 gap-1 text-center',
      timeDisplay: 'mb-3 text-center text-2xl font-semibold text-card-foreground',
      input:
        'w-full rounded border border-border bg-background px-2 py-1 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary',
      footer: 'flex justify-end gap-2 p-3',
    },
    a11y: {
      roles: ['dialog'],
      ariaAttributes: ['role=dialog', 'aria-label=Choose date and time'],
      keyboardNav: 'Arrow keys for date, Tab for time inputs, Enter confirms',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=datetime-local]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-96 for split layout'] },
    quality: {
      antiGeneric: ['border-r border-border for section split', 'w-32 fixed time section width'],
      inspirationSource: 'HeroUI DateTimePicker combined view',
      craftDetails: ['text-2xl for time display', 'type=number with min/max for time inputs'],
    },
  },
];
