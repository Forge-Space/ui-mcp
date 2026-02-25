import type { IComponentSnippet } from '../types.js';

export const dataTableSnippets: IComponentSnippet[] = [
  {
    id: 'data-table-sortable',
    name: 'Sortable Data Table',
    category: 'molecule',
    type: 'data-table',
    variant: 'sortable',
    tags: ['table', 'sort', 'data', 'columns'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'devtools', 'fintech'],
    visualStyles: ['linear-modern', 'corporate-trust', 'soft-depth'],
    jsx: `<div className="w-full overflow-hidden rounded-xl border bg-card">
  <table className="w-full caption-bottom text-sm">
    <thead className="border-b bg-muted/50">
      <tr>
        <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          <button type="button" className="inline-flex items-center gap-1 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm" aria-label="Sort by name">
            Name
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </button>
        </th>
        <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          <button type="button" className="inline-flex items-center gap-1 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm" aria-label="Sort by status">
            Status
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </button>
        </th>
        <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          <button type="button" className="inline-flex items-center gap-1 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm" aria-label="Sort by date">
            Created
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </button>
        </th>
        <th scope="col" className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y">
      <tr className="hover:bg-muted/50 transition-colors">
        <td className="px-4 py-3 font-medium text-foreground">Project Alpha</td>
        <td className="px-4 py-3">
          <span className="inline-flex items-center rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">Active</span>
        </td>
        <td className="px-4 py-3 text-muted-foreground">Jan 15, 2025</td>
        <td className="px-4 py-3 text-right">
          <button type="button" className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Edit Project Alpha">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
          </button>
        </td>
      </tr>
      <tr className="hover:bg-muted/50 transition-colors">
        <td className="px-4 py-3 font-medium text-foreground">Beta Testing</td>
        <td className="px-4 py-3">
          <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-700 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">Pending</span>
        </td>
        <td className="px-4 py-3 text-muted-foreground">Jan 20, 2025</td>
        <td className="px-4 py-3 text-right">
          <button type="button" className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Edit Beta Testing">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>`,
    tailwindClasses: {
      wrapper: 'w-full overflow-hidden rounded-xl border bg-card',
      table: 'w-full caption-bottom text-sm',
      thead: 'border-b bg-muted/50',
      th: 'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
      sortButton:
        'inline-flex items-center gap-1 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm',
      tbody: 'divide-y',
      tr: 'hover:bg-muted/50 transition-colors',
      td: 'px-4 py-3',
      badge:
        'inline-flex items-center rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20',
    },
    a11y: {
      roles: ['table'],
      ariaAttributes: ['aria-label on sort buttons', 'aria-hidden on icons', 'scope on th'],
      keyboardNav: 'Tab through sortable headers and action buttons, Enter/Space to activate',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'table' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'sortable column headers with button + icon',
        'hover:bg-muted/50 on rows for interactivity cue',
        'status badges with ring-inset for depth',
        'aria-label on action buttons with row context',
      ],
      inspirationSource: 'Airtable data grids',
      craftDetails: [
        'bg-muted/50 on thead for subtle differentiation',
        'divide-y on tbody for row separation',
        'h-12 consistent header height',
      ],
    },
  },
  {
    id: 'data-table-paginated',
    name: 'Paginated Data Table',
    category: 'molecule',
    type: 'data-table',
    variant: 'paginated',
    tags: ['table', 'pagination', 'navigation', 'data'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'devtools', 'general'],
    visualStyles: ['linear-modern', 'corporate-trust', 'soft-depth'],
    jsx: `<div className="w-full space-y-4">
  <div className="overflow-hidden rounded-xl border bg-card">
    <table className="w-full caption-bottom text-sm">
      <thead className="border-b bg-muted/50">
        <tr>
          <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Issue</th>
          <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Author</th>
          <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Labels</th>
          <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Updated</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        <tr className="hover:bg-muted/50 transition-colors">
          <td className="px-4 py-3">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-foreground">Fix navigation rendering issue</span>
              <span className="text-xs text-muted-foreground">#1234 opened by user</span>
            </div>
          </td>
          <td className="px-4 py-3 text-muted-foreground">johndoe</td>
          <td className="px-4 py-3">
            <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">bug</span>
          </td>
          <td className="px-4 py-3 text-muted-foreground">2 hours ago</td>
        </tr>
        <tr className="hover:bg-muted/50 transition-colors">
          <td className="px-4 py-3">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-foreground">Add dark mode support</span>
              <span className="text-xs text-muted-foreground">#1235 opened by contributor</span>
            </div>
          </td>
          <td className="px-4 py-3 text-muted-foreground">janedoe</td>
          <td className="px-4 py-3">
            <span className="inline-flex items-center rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground ring-1 ring-inset ring-accent/20">enhancement</span>
          </td>
          <td className="px-4 py-3 text-muted-foreground">5 hours ago</td>
        </tr>
      </tbody>
    </table>
  </div>
  <nav aria-label="Table pagination" className="flex items-center justify-between">
    <p className="text-sm text-muted-foreground">Showing 1-10 of 47 results</p>
    <div className="flex items-center gap-2">
      <button type="button" className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" disabled aria-label="Previous page">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        Previous
      </button>
      <button type="button" className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Next page">
        Next
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
      </button>
    </div>
  </nav>
</div>`,
    tailwindClasses: {
      container: 'w-full space-y-4',
      tableWrapper: 'overflow-hidden rounded-xl border bg-card',
      table: 'w-full caption-bottom text-sm',
      thead: 'border-b bg-muted/50',
      th: 'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
      tbody: 'divide-y',
      tr: 'hover:bg-muted/50 transition-colors',
      paginationNav: 'flex items-center justify-between',
      pageButton:
        'inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    },
    a11y: {
      roles: ['table', 'navigation'],
      ariaAttributes: [
        'aria-label="Table pagination"',
        'aria-label on prev/next buttons',
        'disabled on unavailable nav',
      ],
      keyboardNav: 'Tab through pagination buttons, Enter/Space to navigate',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'table' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'result count text for context',
        'disabled state on prev button',
        'multi-line cell content with flex-col',
        'relative time indicators',
      ],
      inspirationSource: 'GitHub issues table',
      craftDetails: [
        'pagination separate from table for reusability',
        'gap-2 button spacing',
        'text-xs for secondary info in cells',
      ],
    },
  },
  {
    id: 'data-table-expandable',
    name: 'Expandable Row Data Table',
    category: 'molecule',
    type: 'data-table',
    variant: 'expandable',
    tags: ['table', 'expand', 'collapse', 'detail'],
    mood: ['professional', 'minimal'],
    industry: ['fintech', 'saas', 'devtools'],
    visualStyles: ['linear-modern', 'dark-premium', 'soft-depth'],
    jsx: `<div className="w-full overflow-hidden rounded-xl border bg-card">
  <table className="w-full caption-bottom text-sm">
    <thead className="border-b bg-muted/50">
      <tr>
        <th scope="col" className="h-12 w-12 px-4 text-left align-middle"><span className="sr-only">Expand row</span></th>
        <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Transaction</th>
        <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
        <th scope="col" className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Amount</th>
      </tr>
    </thead>
    <tbody className="divide-y">
      <tr className="hover:bg-muted/50 transition-colors">
        <td className="px-4 py-3">
          <button type="button" className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Expand transaction details" aria-expanded="true">
            <svg className="h-4 w-4 transition-transform rotate-90" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          </button>
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-foreground">Payment from Acme Corp</span>
            <span className="text-xs text-muted-foreground">Jan 24, 2025 at 14:32</span>
          </div>
        </td>
        <td className="px-4 py-3">
          <span className="inline-flex items-center rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">Completed</span>
        </td>
        <td className="px-4 py-3 text-right font-medium text-foreground">$1,299.00</td>
      </tr>
      <tr className="bg-muted/30">
        <td colSpan={4} className="px-16 py-4">
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Transaction ID</p>
                <p className="mt-1 text-foreground">txn_1234567890</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Payment Method</p>
                <p className="mt-1 text-foreground">Visa ending in 4242</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Fee</p>
                <p className="mt-1 text-foreground">$37.97</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Net Amount</p>
                <p className="mt-1 text-foreground">$1,261.03</p>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr className="hover:bg-muted/50 transition-colors">
        <td className="px-4 py-3">
          <button type="button" className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Expand transaction details" aria-expanded="false">
            <svg className="h-4 w-4 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          </button>
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-foreground">Refund to customer</span>
            <span className="text-xs text-muted-foreground">Jan 23, 2025 at 09:15</span>
          </div>
        </td>
        <td className="px-4 py-3">
          <span className="inline-flex items-center rounded-full bg-zinc-500/10 px-2 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-400 ring-1 ring-inset ring-zinc-500/20">Processing</span>
        </td>
        <td className="px-4 py-3 text-right font-medium text-foreground">-$450.00</td>
      </tr>
    </tbody>
  </table>
</div>`,
    tailwindClasses: {
      wrapper: 'w-full overflow-hidden rounded-xl border bg-card',
      table: 'w-full caption-bottom text-sm',
      thead: 'border-b bg-muted/50',
      expandButton:
        'rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      expandIcon: 'h-4 w-4 transition-transform rotate-90',
      expandedRow: 'bg-muted/30',
      expandedContent: 'px-16 py-4',
      detailGrid: 'grid grid-cols-2 gap-4',
    },
    a11y: {
      roles: ['table'],
      ariaAttributes: ['aria-expanded on toggle buttons', 'aria-label on expand buttons', 'colSpan for details'],
      keyboardNav: 'Tab to expand buttons, Enter/Space to toggle',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'table' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'rotate-90 on expanded icon for visual feedback',
        'bg-muted/30 on expanded row for differentiation',
        'grid layout in expanded content for structured data',
        'aria-expanded for screen reader state',
      ],
      inspirationSource: 'Stripe dashboard transaction details',
      craftDetails: [
        'colSpan={4} for full-width expanded content',
        'px-16 indent for hierarchical relationship',
        'transition-transform on chevron icon',
      ],
    },
  },
  {
    id: 'data-table-selectable',
    name: 'Selectable Data Table',
    category: 'molecule',
    type: 'data-table',
    variant: 'selectable',
    tags: ['table', 'checkbox', 'selection', 'bulk'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'devtools', 'general'],
    visualStyles: ['linear-modern', 'corporate-trust', 'soft-depth'],
    jsx: `<div className="w-full space-y-4">
  <div className="overflow-hidden rounded-xl border bg-card">
    <table className="w-full caption-bottom text-sm">
      <thead className="border-b bg-muted/50">
        <tr>
          <th scope="col" className="h-12 w-12 px-4 text-left align-middle">
            <input type="checkbox" className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" aria-label="Select all rows" />
          </th>
          <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Task</th>
          <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Assignee</th>
          <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Priority</th>
          <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Due Date</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        <tr className="hover:bg-muted/50 transition-colors">
          <td className="px-4 py-3">
            <input type="checkbox" className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" aria-label="Select task" />
          </td>
          <td className="px-4 py-3 font-medium text-foreground">Implement authentication flow</td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground" aria-hidden="true">JD</div>
              <span className="text-muted-foreground">John Doe</span>
            </div>
          </td>
          <td className="px-4 py-3">
            <span className="inline-flex items-center rounded-md bg-destructive/10 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-400 ring-1 ring-inset ring-red-500/20">High</span>
          </td>
          <td className="px-4 py-3 text-muted-foreground">Jan 28, 2025</td>
        </tr>
        <tr className="hover:bg-muted/50 transition-colors">
          <td className="px-4 py-3">
            <input type="checkbox" className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" aria-label="Select task" checked />
          </td>
          <td className="px-4 py-3 font-medium text-foreground">Update documentation</td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground" aria-hidden="true">JS</div>
              <span className="text-muted-foreground">Jane Smith</span>
            </div>
          </td>
          <td className="px-4 py-3">
            <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">Medium</span>
          </td>
          <td className="px-4 py-3 text-muted-foreground">Feb 2, 2025</td>
        </tr>
        <tr className="hover:bg-muted/50 transition-colors">
          <td className="px-4 py-3">
            <input type="checkbox" className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" aria-label="Select task" checked />
          </td>
          <td className="px-4 py-3 font-medium text-foreground">Fix responsive layout</td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground" aria-hidden="true">AB</div>
              <span className="text-muted-foreground">Alex Brown</span>
            </div>
          </td>
          <td className="px-4 py-3">
            <span className="inline-flex items-center rounded-md bg-zinc-500/10 px-2 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-400 ring-1 ring-inset ring-zinc-500/20">Low</span>
          </td>
          <td className="px-4 py-3 text-muted-foreground">Feb 5, 2025</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="flex items-center justify-between rounded-lg border bg-card px-4 py-3">
    <p className="text-sm text-muted-foreground">2 of 3 rows selected</p>
    <div className="flex items-center gap-2">
      <button type="button" className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" /></svg>
        Bulk Actions
      </button>
      <button type="button" className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-destructive px-3 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
        Delete Selected
      </button>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'w-full space-y-4',
      tableWrapper: 'overflow-hidden rounded-xl border bg-card',
      table: 'w-full caption-bottom text-sm',
      checkbox:
        'h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
      avatar:
        'h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground',
      bulkBar: 'flex items-center justify-between rounded-lg border bg-card px-4 py-3',
      bulkButton:
        'inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    },
    a11y: {
      roles: ['table'],
      ariaAttributes: ['aria-label on checkboxes', 'checked state'],
      keyboardNav: 'Tab to checkboxes, Space to toggle selection',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'table' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'bulk action bar appears with selection count',
        'select-all checkbox in header',
        'avatar initials for assignees',
        'destructive button styling for delete action',
      ],
      inspirationSource: 'Linear issue list',
      craftDetails: [
        'separate bulk action bar for context',
        'w-12 fixed width for checkbox column',
        'focus:ring-offset-2 for checkbox visibility',
      ],
    },
  },
  {
    id: 'data-table-inline-edit',
    name: 'Inline Edit Data Table',
    category: 'molecule',
    type: 'data-table',
    variant: 'inline-edit',
    tags: ['table', 'edit', 'inline', 'editable'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'devtools', 'saas'],
    visualStyles: ['linear-modern', 'minimal-editorial', 'soft-depth'],
    jsx: `<div className="w-full overflow-hidden rounded-xl border bg-card">
  <table className="w-full caption-bottom text-sm">
    <thead className="border-b bg-muted/50">
      <tr>
        <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Property</th>
        <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Value</th>
        <th scope="col" className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
        <th scope="col" className="h-12 w-12 px-4 text-left align-middle"><span className="sr-only">Actions</span></th>
      </tr>
    </thead>
    <tbody className="divide-y">
      <tr className="group hover:bg-muted/50 transition-colors">
        <td className="px-4 py-2">
          <input type="text" className="w-full bg-transparent px-2 py-1.5 text-sm font-medium text-foreground outline-none focus:bg-accent focus:rounded-md" value="API Endpoint" />
        </td>
        <td className="px-4 py-2">
          <input type="text" className="w-full bg-transparent px-2 py-1.5 text-sm text-foreground outline-none focus:bg-accent focus:rounded-md" value="https://api.acme.co/v1" />
        </td>
        <td className="px-4 py-2">
          <select className="w-full bg-transparent px-2 py-1.5 text-sm text-muted-foreground outline-none focus:bg-accent focus:rounded-md cursor-pointer">
            <option>URL</option>
            <option>Text</option>
            <option>Number</option>
          </select>
        </td>
        <td className="px-4 py-2">
          <button type="button" className="opacity-0 group-hover:opacity-100 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:opacity-100 transition-opacity" aria-label="Delete property">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
          </button>
        </td>
      </tr>
      <tr className="group hover:bg-muted/50 transition-colors">
        <td className="px-4 py-2">
          <input type="text" className="w-full bg-transparent px-2 py-1.5 text-sm font-medium text-foreground outline-none focus:bg-accent focus:rounded-md" value="Max Retries" />
        </td>
        <td className="px-4 py-2">
          <input type="text" className="w-full bg-transparent px-2 py-1.5 text-sm text-foreground outline-none focus:bg-accent focus:rounded-md" value="3" />
        </td>
        <td className="px-4 py-2">
          <select className="w-full bg-transparent px-2 py-1.5 text-sm text-muted-foreground outline-none focus:bg-accent focus:rounded-md cursor-pointer">
            <option>URL</option>
            <option>Text</option>
            <option selected>Number</option>
          </select>
        </td>
        <td className="px-4 py-2">
          <button type="button" className="opacity-0 group-hover:opacity-100 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:opacity-100 transition-opacity" aria-label="Delete property">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
          </button>
        </td>
      </tr>
      <tr className="group hover:bg-muted/50 transition-colors">
        <td className="px-4 py-2">
          <input type="text" className="w-full bg-transparent px-2 py-1.5 text-sm font-medium text-foreground outline-none focus:bg-accent focus:rounded-md" value="Timeout" />
        </td>
        <td className="px-4 py-2">
          <input type="text" className="w-full bg-transparent px-2 py-1.5 text-sm text-foreground outline-none focus:bg-accent focus:rounded-md" value="30s" />
        </td>
        <td className="px-4 py-2">
          <select className="w-full bg-transparent px-2 py-1.5 text-sm text-muted-foreground outline-none focus:bg-accent focus:rounded-md cursor-pointer">
            <option>URL</option>
            <option selected>Text</option>
            <option>Number</option>
          </select>
        </td>
        <td className="px-4 py-2">
          <button type="button" className="opacity-0 group-hover:opacity-100 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:opacity-100 transition-opacity" aria-label="Delete property">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div className="border-t p-2">
    <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
      Add row
    </button>
  </div>
</div>`,
    tailwindClasses: {
      wrapper: 'w-full overflow-hidden rounded-xl border bg-card',
      table: 'w-full caption-bottom text-sm',
      thead: 'border-b bg-muted/50',
      editableInput:
        'w-full bg-transparent px-2 py-1.5 text-sm text-foreground outline-none focus:bg-accent focus:rounded-md',
      editableSelect:
        'w-full bg-transparent px-2 py-1.5 text-sm text-muted-foreground outline-none focus:bg-accent focus:rounded-md cursor-pointer',
      deleteButton:
        'opacity-0 group-hover:opacity-100 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:opacity-100 transition-opacity',
      addRowButton:
        'inline-flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    },
    a11y: {
      roles: ['table'],
      ariaAttributes: ['aria-label on delete buttons', 'value on inputs'],
      keyboardNav: 'Tab through editable fields, Enter to confirm, Escape to cancel',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'table' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md'] },
    quality: {
      antiGeneric: [
        'inline inputs with bg-transparent for seamless editing',
        'focus:bg-accent highlight on active cell',
        'opacity-0 delete buttons reveal on row hover',
        'add row button in footer for discoverability',
      ],
      inspirationSource: 'Notion database tables',
      craftDetails: [
        'group utility for row hover revealing delete',
        'outline-none + focus:bg-accent for custom focus',
        'py-2 reduced row padding for density',
      ],
    },
  },
  {
    id: 'data-table-compact',
    name: 'Compact Data Table',
    category: 'molecule',
    type: 'data-table',
    variant: 'minimal-editorial',
    tags: ['table', 'dense', 'minimal-editorial', 'data'],
    mood: ['professional', 'minimal'],
    industry: ['devtools', 'fintech', 'saas'],
    visualStyles: ['linear-modern', 'dark-premium', 'minimal-editorial'],
    jsx: `<div className="w-full overflow-hidden rounded-xl border bg-card">
  <table className="w-full caption-bottom text-xs">
    <thead className="border-b bg-muted/50">
      <tr>
        <th scope="col" className="h-8 px-2 text-left align-middle font-medium text-muted-foreground">Name</th>
        <th scope="col" className="h-8 px-2 text-left align-middle font-medium text-muted-foreground">Size</th>
        <th scope="col" className="h-8 px-2 text-left align-middle font-medium text-muted-foreground">Type</th>
        <th scope="col" className="h-8 px-2 text-left align-middle font-medium text-muted-foreground">Modified</th>
      </tr>
    </thead>
    <tbody className="divide-y">
      <tr className="hover:bg-muted/50 transition-colors">
        <td className="px-2 py-1.5">
          <div className="flex items-center gap-2">
            <svg className="h-3.5 w-3.5 shrink-0 text-primary dark:text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /></svg>
            <span className="font-medium text-foreground truncate">components</span>
          </div>
        </td>
        <td className="px-2 py-1.5 text-muted-foreground">—</td>
        <td className="px-2 py-1.5 text-muted-foreground">Folder</td>
        <td className="px-2 py-1.5 text-muted-foreground">2 hours ago</td>
      </tr>
      <tr className="hover:bg-muted/50 transition-colors">
        <td className="px-2 py-1.5">
          <div className="flex items-center gap-2">
            <svg className="h-3.5 w-3.5 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
            <span className="font-medium text-foreground truncate">index.tsx</span>
          </div>
        </td>
        <td className="px-2 py-1.5 text-muted-foreground">2.4 KB</td>
        <td className="px-2 py-1.5 text-muted-foreground">TypeScript</td>
        <td className="px-2 py-1.5 text-muted-foreground">5 hours ago</td>
      </tr>
      <tr className="hover:bg-muted/50 transition-colors">
        <td className="px-2 py-1.5">
          <div className="flex items-center gap-2">
            <svg className="h-3.5 w-3.5 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
            <span className="font-medium text-foreground truncate">utils.ts</span>
          </div>
        </td>
        <td className="px-2 py-1.5 text-muted-foreground">1.1 KB</td>
        <td className="px-2 py-1.5 text-muted-foreground">TypeScript</td>
        <td className="px-2 py-1.5 text-muted-foreground">1 day ago</td>
      </tr>
      <tr className="hover:bg-muted/50 transition-colors">
        <td className="px-2 py-1.5">
          <div className="flex items-center gap-2">
            <svg className="h-3.5 w-3.5 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
            <span className="font-medium text-foreground truncate">config.json</span>
          </div>
        </td>
        <td className="px-2 py-1.5 text-muted-foreground">512 B</td>
        <td className="px-2 py-1.5 text-muted-foreground">JSON</td>
        <td className="px-2 py-1.5 text-muted-foreground">3 days ago</td>
      </tr>
      <tr className="hover:bg-muted/50 transition-colors">
        <td className="px-2 py-1.5">
          <div className="flex items-center gap-2">
            <svg className="h-3.5 w-3.5 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
            <span className="font-medium text-foreground truncate">README.md</span>
          </div>
        </td>
        <td className="px-2 py-1.5 text-muted-foreground">3.8 KB</td>
        <td className="px-2 py-1.5 text-muted-foreground">Markdown</td>
        <td className="px-2 py-1.5 text-muted-foreground">1 week ago</td>
      </tr>
    </tbody>
  </table>
</div>`,
    tailwindClasses: {
      wrapper: 'w-full overflow-hidden rounded-xl border bg-card',
      table: 'w-full caption-bottom text-xs',
      thead: 'border-b bg-muted/50',
      th: 'h-8 px-2 text-left align-middle font-medium text-muted-foreground',
      tbody: 'divide-y',
      tr: 'hover:bg-muted/50 transition-colors',
      td: 'px-2 py-1.5',
      fileIcon: 'h-3.5 w-3.5 shrink-0',
    },
    a11y: {
      roles: ['table'],
      ariaAttributes: ['scope on th', 'aria-hidden on icons'],
      keyboardNav: 'Tab through interactive elements',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'table' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'text-xs for compact density',
        'h-8 header height vs h-12 default',
        'contextual file/folder icons',
        'truncate on filename for overflow handling',
      ],
      inspirationSource: 'VS Code file explorer',
      craftDetails: ['py-1.5 compact row padding', 'px-2 reduced horizontal padding', 'icon + text layout with gap-2'],
    },
  },
];
