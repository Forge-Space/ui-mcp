type DkFn = (cls: string) => string;

export function getAiChatBody(dk: DkFn, appName: string): string {
  return `    <div className="flex h-screen${dk('dark:bg-gray-950 dark:text-gray-100')}">
      <aside className="hidden md:flex w-72 flex-col border-r bg-muted/30${dk('dark:border-gray-800 dark:bg-gray-900')}">
        <div className="flex items-center justify-between p-4 border-b${dk('dark:border-gray-800')}">
          <span className="text-lg font-bold">${appName}</span>
          <button type="button" className="rounded-md p-1.5 hover:bg-accent" aria-label="New chat">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-2 space-y-1" aria-label="Chat history">
          {['Project architecture review', 'API design feedback', 'Debug auth flow'].map((chat, i) => (
            <button key={i} type="button" className="w-full text-left rounded-lg px-3 py-2 text-sm hover:bg-accent transition-colors truncate">{chat}</button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="flex gap-3 max-w-3xl mx-auto">
            <div className="h-8 w-8 shrink-0 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground" aria-hidden="true">AI</div>
            <div className="flex-1 rounded-2xl bg-muted/50 px-4 py-3 text-sm leading-relaxed${dk('dark:bg-gray-800')}">
              <p>Welcome to ${appName}! I can help you with code reviews, architecture decisions, debugging, and more.</p>
            </div>
          </div>
          <div className="flex gap-3 max-w-3xl mx-auto justify-end">
            <div className="flex-1 max-w-[80%] rounded-2xl bg-primary px-4 py-3 text-sm text-primary-foreground leading-relaxed">
              <p>Can you review the authentication flow in our Next.js app?</p>
            </div>
          </div>
        </div>
        <div className="border-t p-4${dk('dark:border-gray-800')}">
          <div className="max-w-3xl mx-auto flex items-end gap-2">
            <div className="flex-1 min-h-[44px] rounded-xl border bg-background px-4 py-3 text-sm focus-within:ring-2 focus-within:ring-ring${dk('dark:border-gray-700 dark:bg-gray-900')}">
              <textarea rows={1} className="w-full resize-none bg-transparent outline-none" placeholder="Message ${appName}..." aria-label="Message input" />
            </div>
            <button type="submit" className="rounded-xl bg-primary p-3 text-primary-foreground hover:bg-primary/90 transition-colors" aria-label="Send message">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
            </button>
          </div>
        </div>
      </main>
    </div>`;
}

export function getChangelogBody(dk: DkFn, appName: string): string {
  return `    <div className="min-h-screen bg-background text-foreground${dk('dark:bg-gray-950 dark:text-gray-100')}">
      <header className="border-b px-4 sm:px-6 lg:px-8 py-4${dk('dark:border-gray-800')}">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/" className="text-lg font-bold">${appName}</a>
          <nav className="flex gap-4 text-sm text-muted-foreground" aria-label="Main">
            <a href="/docs" className="hover:text-foreground transition-colors">Docs</a>
            <a href="/changelog" className="text-foreground font-medium" aria-current="page">Changelog</a>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight">Changelog</h1>
        <p className="mt-2 text-muted-foreground">Latest updates and improvements to ${appName}.</p>
        <div className="mt-12 space-y-12">
          {[
            { version: 'v2.4.0', date: 'February 20, 2026', items: [
              { type: 'New', text: 'AI-powered code review with inline suggestions' },
              { type: 'New', text: 'Team workspace with real-time collaboration' },
              { type: 'Improved', text: 'Dashboard load time reduced by 40%' },
              { type: 'Fixed', text: 'OAuth callback handling for enterprise SSO' },
            ]},
            { version: 'v2.3.0', date: 'February 5, 2026', items: [
              { type: 'New', text: 'Custom webhook integrations' },
              { type: 'Improved', text: 'Search now supports regex patterns' },
              { type: 'Fixed', text: 'Memory leak in WebSocket connections' },
            ]},
          ].map((release, i) => (
            <article key={i} className="relative pl-8 border-l-2 border-border${dk('dark:border-gray-800')}">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-primary bg-background" aria-hidden="true" />
              <div className="flex items-baseline gap-3">
                <h2 className="text-xl font-semibold">{release.version}</h2>
                <time className="text-sm text-muted-foreground">{release.date}</time>
              </div>
              <ul className="mt-4 space-y-3" role="list">
                {release.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <span className={\`inline-flex shrink-0 rounded-full px-2 py-0.5 text-xs font-medium \${item.type === 'New' ? 'bg-primary/10 text-primary' : item.type === 'Improved' ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}\`}>{item.type}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </main>
    </div>`;
}

export function getTeamMembersBody(dk: DkFn, appName: string): string {
  return `    <div className="flex min-h-screen${dk('dark:bg-gray-950 dark:text-gray-100')}">
      <aside className="hidden lg:flex w-64 flex-col border-r bg-background${dk('dark:border-gray-800 dark:bg-gray-900')}">
        <div className="p-6 border-b${dk('dark:border-gray-800')}"><span className="text-lg font-bold">${appName}</span></div>
        <nav className="flex-1 p-4 space-y-1" aria-label="Settings">
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent transition-colors">General</a>
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-accent text-accent-foreground" aria-current="page">Team</a>
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent transition-colors">Billing</a>
        </nav>
      </aside>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Team Members</h1>
              <p className="mt-1 text-sm text-muted-foreground">Manage who has access to this workspace.</p>
            </div>
            <button type="button" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Invite Member</button>
          </div>
          <div className="mt-8 rounded-lg border${dk('dark:border-gray-800')}">
            {[
              { name: 'Sarah Chen', email: 'sarah@company.com', role: 'Owner', avatar: 'SC' },
              { name: 'Marcus Johnson', email: 'marcus@company.com', role: 'Admin', avatar: 'MJ' },
              { name: 'Aisha Patel', email: 'aisha@company.com', role: 'Member', avatar: 'AP' },
              { name: 'David Kim', email: 'david@company.com', role: 'Member', avatar: 'DK' },
            ].map((member, i) => (
              <div key={i} className={\`flex items-center justify-between px-4 py-3 \${i > 0 ? 'border-t' : ''}${dk(' dark:border-gray-800')}\`}>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">{member.avatar}</div>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{member.role}</span>
                  <button type="button" className="rounded-md p-1 hover:bg-accent" aria-label={\`Options for \${member.name}\`}>
                    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>`;
}

export function getSettingsBillingBody(dk: DkFn, appName: string): string {
  return `    <div className="flex min-h-screen${dk('dark:bg-gray-950 dark:text-gray-100')}">
      <aside className="hidden lg:flex w-64 flex-col border-r bg-background${dk('dark:border-gray-800 dark:bg-gray-900')}">
        <div className="p-6 border-b${dk('dark:border-gray-800')}"><span className="text-lg font-bold">${appName}</span></div>
        <nav className="flex-1 p-4 space-y-1" aria-label="Settings">
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent transition-colors">General</a>
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent transition-colors">Team</a>
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-accent text-accent-foreground" aria-current="page">Billing</a>
        </nav>
      </aside>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Billing &amp; Plans</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage your subscription and payment methods.</p>
          </div>
          <div className="rounded-lg border p-6${dk('dark:border-gray-800')}">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Pro Plan</h2>
                <p className="text-sm text-muted-foreground">$29/month — Renews March 1, 2026</p>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Active</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[
                { label: 'API Calls', value: '42,847', max: '100,000' },
                { label: 'Storage', value: '2.4 GB', max: '10 GB' },
                { label: 'Team Seats', value: '4', max: '10' },
              ].map((u, i) => (
                <div key={i} className="rounded-md bg-muted/50 p-3${dk('dark:bg-gray-800/50')}">
                  <p className="text-xs text-muted-foreground">{u.label}</p>
                  <p className="text-lg font-bold">{u.value} <span className="text-xs font-normal text-muted-foreground">/ {u.max}</span></p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <button type="button" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Upgrade Plan</button>
              <button type="button" className="rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent">Cancel</button>
            </div>
          </div>
          <div className="rounded-lg border p-6${dk('dark:border-gray-800')}">
            <h2 className="font-semibold">Payment Method</h2>
            <div className="mt-4 flex items-center gap-3">
              <div className="rounded-md border px-3 py-2 text-sm${dk('dark:border-gray-700')}">Visa ending in 4242</div>
              <button type="button" className="text-sm text-primary hover:underline">Update</button>
            </div>
          </div>
        </div>
      </main>
    </div>`;
}

export function getApiKeysBody(dk: DkFn, appName: string): string {
  return `    <div className="flex min-h-screen${dk('dark:bg-gray-950 dark:text-gray-100')}">
      <aside className="hidden lg:flex w-64 flex-col border-r bg-background${dk('dark:border-gray-800 dark:bg-gray-900')}">
        <div className="p-6 border-b${dk('dark:border-gray-800')}"><span className="text-lg font-bold">${appName}</span></div>
        <nav className="flex-1 p-4 space-y-1" aria-label="Settings">
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent transition-colors">General</a>
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-accent text-accent-foreground" aria-current="page">API Keys</a>
        </nav>
      </aside>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">API Keys</h1>
              <p className="mt-1 text-sm text-muted-foreground">Manage programmatic access to your account.</p>
            </div>
            <button type="button" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Create New Key</button>
          </div>
          <div className="mt-4 rounded-md bg-muted/50 p-3 text-sm text-muted-foreground${dk('dark:bg-gray-800/50')}">Keep your API keys secure and never share them publicly.</div>
          <div className="mt-6 rounded-lg border${dk('dark:border-gray-800')}">
            <table className="w-full text-sm">
              <thead className="bg-muted/50${dk('dark:bg-gray-800/50')}">
                <tr>
                  <th scope="col" className="h-10 px-4 text-left font-medium text-muted-foreground">Name</th>
                  <th scope="col" className="h-10 px-4 text-left font-medium text-muted-foreground hidden sm:table-cell">Key</th>
                  <th scope="col" className="h-10 px-4 text-left font-medium text-muted-foreground">Last Used</th>
                  <th scope="col" className="h-10 px-4 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Production', key: 'sk_live_...a4f2', lastUsed: '2 hours ago' },
                  { name: 'Development', key: 'sk_test_...b7e1', lastUsed: '5 min ago' },
                  { name: 'CI/CD Pipeline', key: 'sk_live_...c9d3', lastUsed: '1 day ago' },
                ].map((k, i) => (
                  <tr key={i} className="border-t hover:bg-muted/50 transition-colors${dk('dark:border-gray-800')}">
                    <td className="p-4 font-medium">{k.name}</td>
                    <td className="p-4 hidden sm:table-cell font-mono text-muted-foreground">{k.key}</td>
                    <td className="p-4 text-muted-foreground">{k.lastUsed}</td>
                    <td className="p-4 text-right"><button type="button" className="text-sm text-destructive hover:underline">Revoke</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>`;
}

export function getAnalyticsBody(dk: DkFn, appName: string): string {
  return `    <div className="flex min-h-screen${dk('dark:bg-gray-950 dark:text-gray-100')}">
      <aside className="hidden lg:flex w-64 flex-col border-r bg-background${dk('dark:border-gray-800 dark:bg-gray-900')}">
        <div className="p-6 border-b${dk('dark:border-gray-800')}"><span className="text-lg font-bold">${appName}</span></div>
        <nav className="flex-1 p-4 space-y-1" aria-label="Nav">
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent transition-colors">Dashboard</a>
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-accent text-accent-foreground" aria-current="page">Analytics</a>
        </nav>
      </aside>
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <div className="flex items-center gap-2">
            {['7d', '30d', '90d'].map((p) => (
              <button key={p} type="button" className={\`rounded-md px-3 py-1.5 text-sm \${p === '30d' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}\`}>{p}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Page Views', value: '128,490', change: '+14.2%', up: true },
            { label: 'Unique Visitors', value: '34,721', change: '+8.7%', up: true },
            { label: 'Bounce Rate', value: '32.4%', change: '-2.1%', up: false },
            { label: 'Avg. Session', value: '4m 32s', change: '+18s', up: true },
          ].map((s, i) => (
            <div key={i} className="rounded-lg border bg-card p-4${dk('dark:border-gray-800 dark:bg-gray-900')}">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-2xl font-bold">{s.value}</p>
              <p className={\`mt-1 text-xs \${s.up ? 'text-green-600' : 'text-primary'}\`}>{s.change}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border p-6${dk('dark:border-gray-800')}">
          <h2 className="font-semibold">Traffic Over Time</h2>
          <div className="mt-4 h-48 flex items-end justify-between gap-1">
            {[40, 65, 55, 78, 62, 90, 85, 72, 95, 88, 70, 82].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-primary/80 transition-all hover:bg-primary" style={{ height: \`\${h}%\` }} />
            ))}
          </div>
        </div>
      </main>
    </div>`;
}

export function getProfileBody(dk: DkFn): string {
  return `    <div className="min-h-screen bg-background${dk('dark:bg-gray-950 dark:text-gray-100')}">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your personal information.</p>
        <div className="mt-8 space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">SC</div>
            <div>
              <button type="button" className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">Change avatar</button>
              <p className="mt-1 text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>
          <form className="space-y-6" aria-label="Profile form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="profFirst" className="block text-sm font-medium mb-1">First name</label>
                <input id="profFirst" type="text" defaultValue="Sarah" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring${dk('dark:border-gray-700 dark:bg-gray-900')}" />
              </div>
              <div>
                <label htmlFor="profLast" className="block text-sm font-medium mb-1">Last name</label>
                <input id="profLast" type="text" defaultValue="Chen" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring${dk('dark:border-gray-700 dark:bg-gray-900')}" />
              </div>
            </div>
            <div>
              <label htmlFor="profEmail" className="block text-sm font-medium mb-1">Email</label>
              <input id="profEmail" type="email" defaultValue="sarah@company.com" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring${dk('dark:border-gray-700 dark:bg-gray-900')}" />
            </div>
            <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Save changes</button>
          </form>
        </div>
      </main>
    </div>`;
}

export function getFileManagerBody(dk: DkFn, appName: string): string {
  return `    <div className="flex min-h-screen${dk('dark:bg-gray-950 dark:text-gray-100')}">
      <aside className="hidden lg:flex w-64 flex-col border-r bg-background${dk('dark:border-gray-800 dark:bg-gray-900')}">
        <div className="p-6 border-b${dk('dark:border-gray-800')}"><span className="text-lg font-bold">${appName}</span></div>
        <nav className="flex-1 p-4 space-y-1" aria-label="Files">
          <button type="button" className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-accent text-accent-foreground">All Files</button>
          <button type="button" className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent transition-colors">Recent</button>
          <button type="button" className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent transition-colors">Starred</button>
        </nav>
      </aside>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Files</h1>
          <button type="button" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Upload</button>
        </div>
        <div className="mt-6 rounded-lg border${dk('dark:border-gray-800')}">
          {[
            { name: 'Design Assets', type: 'folder', size: '—', modified: 'Feb 20' },
            { name: 'Brand Guidelines.pdf', type: 'pdf', size: '4.2 MB', modified: 'Feb 18' },
            { name: 'Homepage Mockup.fig', type: 'file', size: '12.8 MB', modified: 'Feb 15' },
            { name: 'API Documentation.md', type: 'file', size: '156 KB', modified: 'Feb 12' },
          ].map((f, i) => (
            <div key={i} className={\`flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer \${i > 0 ? 'border-t' : ''}${dk(' dark:border-gray-800')}\`}>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-xs${dk('dark:bg-gray-800')}">{f.type === 'folder' ? '📁' : '📄'}</div>
                <span className="text-sm font-medium">{f.name}</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="hidden sm:inline w-20 text-right">{f.size}</span>
                <span className="hidden md:inline w-16">{f.modified}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>`;
}

export function getKanbanBody(dk: DkFn): string {
  return `    <div className="min-h-screen bg-background${dk('dark:bg-gray-950 dark:text-gray-100')}">
      <header className="border-b px-4 sm:px-6 py-4${dk('dark:border-gray-800')}">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Project Board</h1>
          <button type="button" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Add Task</button>
        </div>
      </header>
      <main className="p-4 sm:p-6 overflow-x-auto">
        <div className="flex gap-4 min-w-[800px]">
          {[
            { title: 'Backlog', cards: [
              { id: 'TASK-101', title: 'Set up CI/CD pipeline', priority: 'Medium', assignee: 'MJ' },
              { id: 'TASK-102', title: 'Write API documentation', priority: 'Low', assignee: 'AP' },
            ]},
            { title: 'In Progress', cards: [
              { id: 'TASK-098', title: 'Implement OAuth2 flow', priority: 'High', assignee: 'DK' },
              { id: 'TASK-099', title: 'Add rate limiting middleware', priority: 'High', assignee: 'MJ' },
            ]},
            { title: 'Review', cards: [
              { id: 'TASK-095', title: 'Database migration scripts', priority: 'Medium', assignee: 'AP' },
            ]},
            { title: 'Done', cards: [
              { id: 'TASK-090', title: 'User authentication', priority: 'High', assignee: 'SC' },
            ]},
          ].map((col, ci) => (
            <div key={ci} className="flex-1 min-w-[220px]">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold">{col.title}</h2>
                <span className="text-xs text-muted-foreground">{col.cards.length}</span>
              </div>
              <div className="space-y-2">
                {col.cards.map((card, i) => (
                  <div key={i} className="rounded-lg border bg-card p-3 hover:shadow-sm transition-shadow cursor-pointer${dk('dark:border-gray-800 dark:bg-gray-900')}">
                    <p className="text-xs text-muted-foreground font-mono">{card.id}</p>
                    <p className="mt-1 text-sm font-medium">{card.title}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className={\`rounded-full px-2 py-0.5 text-[10px] font-medium \${card.priority === 'High' ? 'bg-destructive/10 text-destructive' : card.priority === 'Medium' ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}\`}>{card.priority}</span>
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary">{card.assignee}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>`;
}

export function getCalendarBody(dk: DkFn): string {
  return `    <div className="min-h-screen bg-background${dk('dark:bg-gray-950 dark:text-gray-100')}">
      <header className="border-b px-4 sm:px-6 py-4${dk('dark:border-gray-800')}">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">February 2026</h1>
            <div className="flex gap-1">
              <button type="button" className="rounded-md p-1.5 hover:bg-accent" aria-label="Previous month">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
              </button>
              <button type="button" className="rounded-md p-1.5 hover:bg-accent" aria-label="Next month">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
              </button>
            </div>
          </div>
          <button type="button" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">New Event</button>
        </div>
      </header>
      <main className="p-4 sm:p-6">
        <div className="grid grid-cols-7 gap-px rounded-lg border overflow-hidden bg-border${dk('dark:border-gray-800')}">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <div key={d} className="bg-muted/50 px-2 py-2 text-center text-xs font-medium text-muted-foreground${dk('dark:bg-gray-800/50')}">{d}</div>
          ))}
          {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
            <div key={day} className={\`min-h-[80px] sm:min-h-[100px] bg-background p-1.5 \${day === 24 ? 'ring-2 ring-inset ring-primary' : ''}${dk(' dark:bg-gray-950')}\`}>
              <span className={\`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs \${day === 24 ? 'bg-primary text-primary-foreground font-bold' : ''}\`}>{day}</span>
              {day === 10 && <div className="mt-1 rounded bg-primary/10 px-1 py-0.5 text-[10px] text-primary truncate">Team standup</div>}
              {day === 15 && <div className="mt-1 rounded bg-accent px-1 py-0.5 text-[10px] text-accent-foreground truncate">Sprint review</div>}
              {day === 24 && <div className="mt-1 rounded bg-primary/10 px-1 py-0.5 text-[10px] text-primary truncate">Release v2.5</div>}
            </div>
          ))}
        </div>
      </main>
    </div>`;
}

export function getDocsBody(dk: DkFn, appName: string): string {
  return `    <div className="min-h-screen bg-background${dk('dark:bg-gray-950 dark:text-gray-100')}">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur${dk('dark:border-gray-800')}">
        <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          <a href="/" className="text-lg font-bold">${appName} Docs</a>
          <div className="hidden sm:flex h-9 w-64 items-center gap-2 rounded-md border bg-muted/50 px-3 text-sm text-muted-foreground${dk('dark:border-gray-700 dark:bg-gray-800/50')}">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            <span>Search docs...</span>
            <kbd className="ml-auto rounded border bg-background px-1.5 py-0.5 text-[10px] font-mono${dk('dark:border-gray-700')}">⌘K</kbd>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden lg:block w-64 shrink-0 border-r px-4 py-8${dk('dark:border-gray-800')}">
          <nav className="space-y-6" aria-label="Docs nav">
            {[
              { section: 'Getting Started', items: ['Introduction', 'Installation', 'Quick Start'] },
              { section: 'Core Concepts', items: ['Authentication', 'API Reference', 'Webhooks'] },
              { section: 'Guides', items: ['Deployment', 'Monitoring', 'Scaling'] },
            ].map((g, gi) => (
              <div key={gi}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{g.section}</h3>
                <ul className="mt-2 space-y-1" role="list">
                  {g.items.map((item, ii) => (
                    <li key={ii}><a href="#" className={\`block rounded-md px-2 py-1.5 text-sm \${gi === 0 && ii === 0 ? 'bg-accent font-medium text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors'}\`}>{item}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight">Introduction</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">${appName} is a modern API platform for building production-ready applications.</p>
          <h2 className="mt-10 text-xl font-semibold">Prerequisites</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-start gap-2"><span className="text-primary" aria-hidden="true">▸</span> Node.js 20 or later</li>
            <li className="flex items-start gap-2"><span className="text-primary" aria-hidden="true">▸</span> npm, pnpm, or yarn</li>
            <li className="flex items-start gap-2"><span className="text-primary" aria-hidden="true">▸</span> A ${appName} account (free tier available)</li>
          </ul>
          <h2 className="mt-10 text-xl font-semibold">Quick Install</h2>
          <div className="mt-4 rounded-lg border bg-muted/30 p-4 font-mono text-sm${dk('dark:border-gray-800 dark:bg-gray-900')}">
            <code>npm install @${appName.toLowerCase()}/sdk</code>
          </div>
        </main>
      </div>
    </div>`;
}

export function getFaqBody(dk: DkFn, appName: string): string {
  return `    <div className="min-h-screen bg-background text-foreground${dk('dark:bg-gray-950 dark:text-gray-100')}">
      <header className="border-b px-4 sm:px-6 lg:px-8 py-4${dk('dark:border-gray-800')}">
        <div className="max-w-3xl mx-auto"><a href="/" className="text-lg font-bold">${appName}</a></div>
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-muted-foreground">Everything you need to know about ${appName}.</p>
        </div>
        <div className="mt-12 divide-y${dk('dark:divide-gray-800')}">
          {[
            { q: 'What is included in the free plan?', a: 'The free plan includes 1 project, 1,000 API calls per month, community support, and basic analytics.' },
            { q: 'Can I upgrade or downgrade at any time?', a: 'Yes. Upgrades take effect immediately, downgrades at the end of your billing cycle.' },
            { q: 'Do you offer a self-hosted option?', a: 'Yes! Our Enterprise plan includes Docker and Kubernetes deployment. Contact sales for details.' },
            { q: 'Is my data encrypted?', a: 'All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are SOC2 Type II certified.' },
            { q: 'How do I cancel?', a: 'Cancel anytime from Settings > Billing. Access continues until the end of your billing period.' },
          ].map((faq, i) => (
            <details key={i} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium hover:text-primary transition-colors">
                {faq.q}
                <svg className="h-4 w-4 shrink-0 text-muted-foreground group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </main>
    </div>`;
}

export function getBlogPostBody(dk: DkFn, appName: string): string {
  return `    <div className="min-h-screen bg-background text-foreground${dk('dark:bg-gray-950 dark:text-gray-100')}">
      <header className="border-b px-4 sm:px-6 lg:px-8 py-4${dk('dark:border-gray-800')}">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/" className="text-lg font-bold">${appName}</a>
          <a href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to blog</a>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <article>
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <time dateTime="2026-02-20">February 20, 2026</time>
              <span aria-hidden="true">·</span>
              <span>8 min read</span>
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-tight">Building a Production-Ready AI Pipeline in Under 30 Minutes</h1>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">SC</div>
              <div>
                <p className="text-sm font-medium">Sarah Chen</p>
                <p className="text-xs text-muted-foreground">Engineering Lead</p>
              </div>
            </div>
          </header>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">When we first started building AI features, the biggest challenge was not the models — it was the infrastructure. Here is how we built a pipeline handling 50M+ requests per month.</p>
            <h2 className="text-xl font-semibold mt-10">The Challenge</h2>
            <p className="text-sm leading-relaxed">Most teams spend 80% of their time on infrastructure and only 20% on AI logic. We wanted to flip that ratio with reusable abstractions.</p>
            <div className="rounded-lg border bg-muted/30 p-4 font-mono text-sm${dk('dark:border-gray-800 dark:bg-gray-900')}">
              <code>const pipeline = createPipeline({'{'}<br />  model: 'claude-opus-4-6',<br />  cache: {'{'} ttl: '1h' {'}'},<br />{'}'})</code>
            </div>
            <h2 className="text-xl font-semibold mt-10">Key Takeaways</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-primary font-bold" aria-hidden="true">1.</span> Start with caching — reduces costs by 60%</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold" aria-hidden="true">2.</span> Build fallback chains for availability</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold" aria-hidden="true">3.</span> Instrument everything from day one</li>
            </ul>
          </div>
        </article>
      </main>
    </div>`;
}
