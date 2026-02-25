import type { IComponentSnippet } from '../types.js';

export const dropdownSnippets: IComponentSnippet[] = [
  {
    id: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'molecule',
    type: 'dropdown',
    variant: 'menu',
    tags: ['navigation', 'actions', 'menu', 'popover'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'saas'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="relative inline-block">
  <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
    Options
  </button>
  <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-md border border-border bg-popover p-1 shadow-lg">
    <button className="w-full rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
      Edit
    </button>
    <button className="w-full rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
      Duplicate
    </button>
    <div className="my-1 h-px bg-border"></div>
    <button className="w-full rounded-sm px-3 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10">
      Delete
    </button>
  </div>
</div>`,
    tailwindClasses: {
      trigger: 'rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground',
      menu: 'absolute right-0 top-full z-50 mt-2 w-48 rounded-md border border-border bg-popover p-1 shadow-lg',
      item: 'w-full rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      separator: 'my-1 h-px bg-border',
      destructive:
        'w-full rounded-sm px-3 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10',
    },
    a11y: {
      roles: ['menu', 'menuitem'],
      ariaAttributes: ['role=menu', 'role=menuitem'],
      keyboardNav: 'Arrow keys navigate, Enter selects, Escape closes',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'menu' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-48 for comfortable tap targets'] },
    quality: {
      antiGeneric: ['p-1 container padding for item borders', 'text-destructive for dangerous actions'],
      inspirationSource: 'shadcn/ui DropdownMenu with Radix primitives',
      craftDetails: ['h-px separator for visual grouping', 'hover:bg-destructive/10 for danger zone feedback'],
    },
  },
  {
    id: 'dropdown-select',
    name: 'Select Dropdown',
    category: 'molecule',
    type: 'dropdown',
    variant: 'select',
    tags: ['form', 'input', 'choice', 'picker'],
    mood: ['professional', 'professional'],
    industry: ['general', 'saas', 'ecommerce'],
    visualStyles: ['soft-depth', 'linear-modern'],
    jsx: `<div className="relative inline-block w-64">
  <button className="flex w-full items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground">
    <span>Select option</span>
    <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
  </button>
  <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-lg">
    <div className="max-h-60 overflow-auto p-1">
      <button className="w-full rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        Option 1
      </button>
      <button className="w-full rounded-sm bg-accent px-3 py-2 text-left text-sm text-accent-foreground">
        Option 2 (selected)
      </button>
      <button className="w-full rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        Option 3
      </button>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      trigger:
        'flex w-full items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground',
      dropdown: 'absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-lg',
      container: 'max-h-60 overflow-auto p-1',
      option:
        'w-full rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      selected: 'w-full rounded-sm bg-accent px-3 py-2 text-left text-sm text-accent-foreground',
    },
    a11y: {
      roles: ['listbox', 'option'],
      ariaAttributes: ['role=listbox', 'role=option', 'aria-selected=true'],
      keyboardNav: 'Arrow keys navigate, Enter selects, Escape closes',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'select' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-64 for form field', 'w-full dropdown'] },
    quality: {
      antiGeneric: ['max-h-60 overflow-auto for long lists', 'bg-accent for selected state'],
      inspirationSource: 'Headless UI Listbox component',
      craftDetails: ['justify-between for trigger icon alignment', 'mt-1 minimal gap between trigger and dropdown'],
    },
  },
  {
    id: 'dropdown-nested',
    name: 'Nested Dropdown',
    category: 'molecule',
    type: 'dropdown',
    variant: 'nested',
    tags: ['submenu', 'corporate', 'navigation', 'corporate-trust'],
    mood: ['professional', 'professional'],
    industry: ['saas', 'saas', 'media'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="relative inline-block">
  <button className="rounded-md bg-secondary px-4 py-2 text-sm text-secondary-foreground">
    Menu
  </button>
  <div className="absolute left-0 top-full z-50 mt-2 w-48 rounded-md border border-border bg-popover p-1 shadow-lg">
    <button className="w-full rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
      Home
    </button>
    <div className="relative">
      <button className="flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        <span>Products</span>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
      <div className="absolute left-full top-0 z-50 ml-1 w-48 rounded-md border border-border bg-popover p-1 shadow-lg">
        <button className="w-full rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          Category 1
        </button>
        <button className="w-full rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          Category 2
        </button>
      </div>
    </div>
    <button className="w-full rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
      About
    </button>
  </div>
</div>`,
    tailwindClasses: {
      trigger: 'rounded-md bg-secondary px-4 py-2 text-sm text-secondary-foreground',
      menu: 'absolute left-0 top-full z-50 mt-2 w-48 rounded-md border border-border bg-popover p-1 shadow-lg',
      submenu: 'absolute left-full top-0 z-50 ml-1 w-48 rounded-md border border-border bg-popover p-1 shadow-lg',
      item: 'flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
    },
    a11y: {
      roles: ['menu', 'menuitem'],
      ariaAttributes: ['role=menu', 'role=menuitem', 'aria-haspopup=true'],
      keyboardNav: 'Arrow keys navigate, Right arrow opens submenu, Left arrow closes submenu',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'menu' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-48 consistent width'] },
    quality: {
      antiGeneric: ['left-full top-0 for horizontal submenu placement', 'ml-1 minimal gap between menus'],
      inspirationSource: 'Radix DropdownMenu with submenu support',
      craftDetails: ['Right arrow icon for submenu indicator', 'z-50 on both levels for proper stacking'],
    },
  },
  {
    id: 'dropdown-searchable',
    name: 'Searchable Dropdown',
    category: 'molecule',
    type: 'dropdown',
    variant: 'searchable',
    tags: ['filter', 'autocomplete', 'search', 'combobox'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'saas', 'ecommerce'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="relative inline-block w-64">
  <div className="rounded-md border border-border bg-card">
    <input type="text" placeholder="Search..." className="w-full rounded-t-md bg-transparent px-3 py-2 text-sm text-card-foreground outline-none placeholder:text-muted-foreground" />
  </div>
  <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-lg">
    <div className="max-h-60 overflow-auto p-1">
      <button className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <span>React Component</span>
      </button>
      <button className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <span>Redux Store</span>
      </button>
      <div className="px-3 py-2 text-xs text-muted-foreground">2 results</div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'rounded-md border border-border bg-card',
      input:
        'w-full rounded-t-md bg-transparent px-3 py-2 text-sm text-card-foreground outline-none placeholder:text-muted-foreground',
      dropdown: 'absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-lg',
      results: 'max-h-60 overflow-auto p-1',
      item: 'flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      footer: 'px-3 py-2 text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['combobox', 'listbox', 'option'],
      ariaAttributes: ['role=combobox', 'aria-expanded=true', 'aria-autocomplete=list'],
      keyboardNav: 'Type to filter, Arrow keys navigate results, Enter selects',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=text]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-64 for form integration'] },
    quality: {
      antiGeneric: ['gap-2 for icon-text spacing', 'text-xs footer for result count'],
      inspirationSource: 'shadcn/ui Command component',
      craftDetails: [
        'outline-none with border-border for clean focus',
        'bg-transparent input for seamless integration',
      ],
    },
  },
  {
    id: 'dropdown-multi',
    name: 'Multi-Select Dropdown',
    category: 'molecule',
    type: 'dropdown',
    variant: 'multi',
    tags: ['checkbox', 'multiple', 'filter', 'selection'],
    mood: ['professional', 'professional'],
    industry: ['saas', 'saas', 'ecommerce'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="relative inline-block w-64">
  <button className="flex w-full items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground">
    <span className="text-muted-foreground">2 selected</span>
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
  </button>
  <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-border bg-popover p-1 shadow-lg">
    <label className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
      <input type="checkbox" checked className="h-4 w-4 rounded border-border bg-background text-primary" />
      <span>Option 1</span>
    </label>
    <label className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
      <input type="checkbox" checked className="h-4 w-4 rounded border-border bg-background text-primary" />
      <span>Option 2</span>
    </label>
    <label className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
      <input type="checkbox" className="h-4 w-4 rounded border-border bg-background text-primary" />
      <span>Option 3</span>
    </label>
    <div className="mt-1 flex gap-2 border-t border-border pt-2">
      <button className="flex-1 rounded-sm bg-secondary px-2 py-1.5 text-xs text-secondary-foreground">Clear</button>
      <button className="flex-1 rounded-sm bg-primary px-2 py-1.5 text-xs text-primary-foreground">Apply</button>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      trigger:
        'flex w-full items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground',
      dropdown: 'absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-border bg-popover p-1 shadow-lg',
      option:
        'flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      checkbox: 'h-4 w-4 rounded border-border bg-background text-primary',
      footer: 'mt-1 flex gap-2 border-t border-border pt-2',
    },
    a11y: {
      roles: ['group'],
      ariaAttributes: ['role=group', 'aria-multiselectable=true'],
      keyboardNav: 'Tab to checkboxes, Space toggles, Enter applies',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=checkbox]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-64 for filter UI'] },
    quality: {
      antiGeneric: ['cursor-pointer on label for UX', 'border-t border-border for footer separation'],
      inspirationSource: 'Mantine MultiSelect component',
      craftDetails: ['flex-1 on footer buttons for equal width', 'text-xs for compact footer actions'],
    },
  },
  {
    id: 'dropdown-grouped',
    name: 'Grouped Dropdown',
    category: 'molecule',
    type: 'dropdown',
    variant: 'grouped',
    tags: ['professional', 'categorized', 'sections', 'navigation'],
    mood: ['professional', 'professional'],
    industry: ['saas', 'saas', 'media'],
    visualStyles: ['soft-depth', 'soft-depth'],
    jsx: `<div className="relative inline-block w-64">
  <button className="flex w-full items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground">
    <span>Select item</span>
    <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
  </button>
  <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-lg">
    <div className="max-h-80 overflow-auto">
      <div className="p-1">
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Recent</div>
        <button className="w-full rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          Dashboard
        </button>
        <button className="w-full rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          Analytics
        </button>
      </div>
      <div className="my-1 h-px bg-border"></div>
      <div className="p-1">
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Projects</div>
        <button className="w-full rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          Website Redesign
        </button>
        <button className="w-full rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          Mobile App
        </button>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      trigger:
        'flex w-full items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground',
      dropdown: 'absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-lg',
      container: 'max-h-80 overflow-auto',
      group: 'p-1',
      heading: 'px-2 py-1.5 text-xs font-semibold text-muted-foreground',
      item: 'w-full rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      separator: 'my-1 h-px bg-border',
    },
    a11y: {
      roles: ['listbox', 'group', 'option'],
      ariaAttributes: ['role=listbox', 'role=group', 'aria-label'],
      keyboardNav: 'Arrow keys navigate across groups, Enter selects',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'optgroup' },
    responsive: { strategy: 'mobile-first', breakpoints: ['max-h-80 for multiple groups'] },
    quality: {
      antiGeneric: ['font-semibold text-muted-foreground for group headings', 'h-px separator between groups'],
      inspirationSource: 'Ant Design Select with option groups',
      craftDetails: ['px-2 py-1.5 compact heading spacing', 'max-h-80 accommodates multiple categories'],
    },
  },
  {
    id: 'dropdown-command',
    name: 'Command Dropdown',
    category: 'molecule',
    type: 'dropdown',
    variant: 'command',
    tags: ['search', 'keyboard', 'power-user', 'command-palette'],
    mood: ['minimal', 'futuristic'],
    industry: ['devtools', 'saas', 'saas'],
    visualStyles: ['linear-modern', 'soft-depth'],
    jsx: `<div className="relative inline-block w-96">
  <div className="rounded-md border border-border bg-card">
    <div className="flex items-center gap-2 border-b border-border px-3 py-2">
      <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      <input type="text" placeholder="Type a command..." className="flex-1 bg-transparent text-sm text-card-foreground outline-none placeholder:text-muted-foreground" />
      <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">⌘K</kbd>
    </div>
  </div>
  <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-xl">
    <div className="max-h-96 overflow-auto p-1">
      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Suggestions</div>
      <button className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
        <div className="flex-1">
          <div>Open Project</div>
          <div className="text-xs text-muted-foreground">Navigate to project</div>
        </div>
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">⌘P</kbd>
      </button>
      <button className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        <div className="flex-1">
          <div>Settings</div>
          <div className="text-xs text-muted-foreground">Configure application</div>
        </div>
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">⌘,</kbd>
      </button>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'rounded-md border border-border bg-card',
      inputWrapper: 'flex items-center gap-2 border-b border-border px-3 py-2',
      input: 'flex-1 bg-transparent text-sm text-card-foreground outline-none placeholder:text-muted-foreground',
      dropdown: 'absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-xl',
      results: 'max-h-96 overflow-auto p-1',
      item: 'flex w-full items-center gap-3 rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      kbd: 'rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground',
    },
    a11y: {
      roles: ['combobox', 'listbox'],
      ariaAttributes: ['role=combobox', 'aria-expanded=true'],
      keyboardNav: 'Cmd+K opens, type to filter, arrow keys navigate, Enter executes',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'input[type=text]' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-96 for command palette width'] },
    quality: {
      antiGeneric: ['gap-3 for icon-content-kbd spacing', 'text-xs text-muted-foreground for descriptions'],
      inspirationSource: 'Vercel Command Menu / Linear Command K',
      craftDetails: ['shadow-xl for elevated command palette feel', 'flex-1 on content for kbd right-alignment'],
    },
  },
  {
    id: 'dropdown-context',
    name: 'Context Menu Dropdown',
    category: 'molecule',
    type: 'dropdown',
    variant: 'context',
    tags: ['right-click', 'contextual', 'actions', 'menu'],
    mood: ['minimal', 'professional'],
    industry: ['devtools', 'saas', 'media'],
    visualStyles: ['soft-depth', 'minimal-editorial'],
    jsx: `<div className="relative inline-block">
  <div className="rounded-md border border-border bg-card p-4 text-sm text-card-foreground">
    Right-click this area
  </div>
  <div className="absolute left-0 top-0 z-50 w-48 rounded-md border border-border bg-popover p-1 shadow-lg">
    <button className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
      <span>Copy</span>
      <kbd className="ml-auto rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">⌘C</kbd>
    </button>
    <button className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
      <span>Edit</span>
      <kbd className="ml-auto rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">⌘E</kbd>
    </button>
    <div className="my-1 h-px bg-border"></div>
    <button className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
      <span>Delete</span>
      <kbd className="ml-auto rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">⌫</kbd>
    </button>
  </div>
</div>`,
    tailwindClasses: {
      trigger: 'rounded-md border border-border bg-card p-4 text-sm text-card-foreground',
      menu: 'absolute left-0 top-0 z-50 w-48 rounded-md border border-border bg-popover p-1 shadow-lg',
      item: 'flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
      kbd: 'ml-auto rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground',
      destructive:
        'flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10',
    },
    a11y: {
      roles: ['menu', 'menuitem'],
      ariaAttributes: ['role=menu', 'role=menuitem'],
      keyboardNav: 'Arrow keys navigate, Enter selects, Escape closes',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'menu' },
    responsive: { strategy: 'mobile-first', breakpoints: ['w-48 for context menu'] },
    quality: {
      antiGeneric: ['ml-auto for kbd right-alignment', 'gap-2 for icon-text spacing'],
      inspirationSource: 'Radix ContextMenu primitive',
      craftDetails: ['font-mono for keyboard shortcuts', 'left-0 top-0 for context positioning'],
    },
  },
];
