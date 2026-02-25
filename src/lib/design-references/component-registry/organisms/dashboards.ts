import type { IComponentSnippet } from '../types.js';

export const dashboardSnippets: IComponentSnippet[] = [
  {
    id: 'dashboard-stats-overview',
    name: 'Stats Overview Dashboard',
    category: 'organism',
    type: 'saas',
    variant: 'stats-overview',
    tags: ['saas', 'stats', 'kpi', 'saas'],
    mood: ['professional', 'minimal'] as const,
    industry: ['saas', 'general'] as const,
    visualStyles: ['soft-depth'] as const,
    jsx: `<section className="py-8">
  <div className="container">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-foreground">Overview</h2>
      <p className="text-sm text-muted-foreground">Your key metrics at a glance</p>
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg border border-input bg-card p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
          <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold text-foreground">$45,231</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-success font-medium">+20.1%</span> from last month
          </p>
        </div>
      </div>
      <div className="rounded-lg border border-input bg-card p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Active Users</p>
          <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold text-foreground">2,350</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-success font-medium">+180</span> from last month
          </p>
        </div>
      </div>
      <div className="rounded-lg border border-input bg-card p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
          <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold text-foreground">24.8%</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-success font-medium">+4.2%</span> from last month
          </p>
        </div>
      </div>
      <div className="rounded-lg border border-input bg-card p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">API Calls</p>
          <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold text-foreground">1.2M</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-muted-foreground font-medium">+12.3%</span> from last month
          </p>
        </div>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      root: 'py-8',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab through interactive elements',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['md', 'lg'] },
    quality: {
      antiGeneric: ['Icon indicators', 'Percentage changes', 'Grid layout with responsive columns'],
      inspirationSource: 'Vercel Analytics',
      craftDetails: ['Semantic metric cards', 'Color-coded trends', 'Clear visual hierarchy'],
    },
  },
  {
    id: 'dashboard-activity-feed',
    name: 'Activity Feed Dashboard',
    category: 'organism',
    type: 'saas',
    variant: 'activity-feed',
    tags: ['saas', 'saas', 'general', 'media'],
    mood: ['professional', 'minimal'] as const,
    industry: ['saas', 'devtools'] as const,
    visualStyles: ['soft-depth'] as const,
    jsx: `<section className="py-8">
  <div className="container max-w-3xl">
    <div className="mb-6">
      <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
    </div>
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="w-px flex-1 bg-input mt-2" />
        </div>
        <div className="flex-1 pb-8">
          <div className="rounded-lg border border-input bg-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Deployment successful</p>
                <p className="text-xs text-muted-foreground mt-1">Production environment updated to v2.4.0</p>
              </div>
              <span className="text-xs text-muted-foreground">2m ago</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
            <svg className="h-4 w-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="w-px flex-1 bg-input mt-2" />
        </div>
        <div className="flex-1 pb-8">
          <div className="rounded-lg border border-input bg-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">New team member added</p>
                <p className="text-xs text-muted-foreground mt-1">sarah@company.com joined the workspace</p>
              </div>
              <span className="text-xs text-muted-foreground">1h ago</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
            <svg className="h-4 w-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          <div className="w-px flex-1 bg-input mt-2" />
        </div>
        <div className="flex-1 pb-8">
          <div className="rounded-lg border border-input bg-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">New comment on issue #234</p>
                <p className="text-xs text-muted-foreground mt-1">john@company.com: "Fixed in latest commit"</p>
              </div>
              <span className="text-xs text-muted-foreground">3h ago</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
          <svg className="h-4 w-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="rounded-lg border border-input bg-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Documentation updated</p>
                <p className="text-xs text-muted-foreground mt-1">API reference guide v3.0 published</p>
              </div>
              <span className="text-xs text-muted-foreground">5h ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      root: 'py-8',
    },
    a11y: {
      roles: ['region', 'media'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab through activity items',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['sm'] },
    quality: {
      antiGeneric: ['Timeline connector', 'Icon indicators', 'Relative timestamps'],
      inspirationSource: 'GitHub',
      craftDetails: ['Vertical timeline design', 'Icon-based event types', 'Card-based activity items'],
    },
  },
  {
    id: 'dashboard-data-table',
    name: 'Data Table Dashboard',
    category: 'organism',
    type: 'saas',
    variant: 'data-table',
    tags: ['saas', 'table', 'data', 'grid'],
    mood: ['professional', 'minimal'] as const,
    industry: ['saas', 'general'] as const,
    visualStyles: ['soft-depth'] as const,
    jsx: `<section className="py-8">
  <div className="container">
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-foreground">Recent Orders</h2>
        <p className="text-sm text-muted-foreground">Manage and track your orders</p>
      </div>
      <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        New Order
      </button>
    </div>
    <div className="rounded-lg border border-input bg-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-input bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-input">
            <tr className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-foreground">#3210</td>
              <td className="px-6 py-4 text-sm text-muted-foreground">john@company.com</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full bg-green-600/10 px-2 py-1 text-xs font-medium text-success">Completed</span>
              </td>
              <td className="px-6 py-4 text-sm text-foreground">$1,234.00</td>
              <td className="px-6 py-4 text-sm text-muted-foreground">Jan 15, 2024</td>
            </tr>
            <tr className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-foreground">#3209</td>
              <td className="px-6 py-4 text-sm text-muted-foreground">sarah@acme.co</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Processing</span>
              </td>
              <td className="px-6 py-4 text-sm text-foreground">$542.00</td>
              <td className="px-6 py-4 text-sm text-muted-foreground">Jan 14, 2024</td>
            </tr>
            <tr className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-foreground">#3208</td>
              <td className="px-6 py-4 text-sm text-muted-foreground">mike@test.com</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">Pending</span>
              </td>
              <td className="px-6 py-4 text-sm text-foreground">$899.00</td>
              <td className="px-6 py-4 text-sm text-muted-foreground">Jan 13, 2024</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>`,
    tailwindClasses: {
      root: 'py-8',
    },
    a11y: {
      roles: ['region', 'table'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab through table rows',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: ['Status badges', 'Hover states on rows', 'Scrollable table container'],
      inspirationSource: 'Airtable',
      craftDetails: ['Semantic table structure', 'Alternating row hover', 'Color-coded status indicators'],
    },
  },
];
