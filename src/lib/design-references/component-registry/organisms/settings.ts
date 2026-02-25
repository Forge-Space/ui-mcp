import type { IComponentSnippet } from '../types.js';

export const settingsSnippets: IComponentSnippet[] = [
  {
    id: 'settings-profile',
    name: 'Profile Settings',
    category: 'organism',
    type: 'settings',
    variant: 'profile',
    tags: ['settings', 'profile', 'account', 'form'],
    mood: ['professional', 'calm'],
    industry: ['saas', 'devtools', 'general'],
    visualStyles: ['linear-modern', 'minimal-editorial'],
    jsx: `<div className="max-w-2xl mx-auto space-y-8">
  <div className="flex items-center gap-6">
    <div className="relative">
      <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold text-muted-foreground">JS</div>
      <button className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs" aria-label="Change avatar">Edit</button>
    </div>
    <div>
      <h2 className="text-lg font-semibold text-foreground">Profile Settings</h2>
      <p className="text-sm text-muted-foreground">Manage your account information</p>
    </div>
  </div>
  <form className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">First Name</label>
        <input type="text" defaultValue="John" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Last Name</label>
        <input type="text" defaultValue="Smith" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>
    </div>
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Email</label>
      <input type="email" defaultValue="john@company.com" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Bio</label>
      <textarea rows={3} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Tell us about yourself" />
    </div>
    <div className="flex justify-end gap-3">
      <button type="button" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
      <button type="submit" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Save Changes</button>
    </div>
  </form>
</div>`,
    tailwindClasses: {
      'max-w-2xl': 'max-w-2xl',
      'mx-auto': 'mx-auto',
      'space-y-8': 'space-y-8',
      'rounded-lg': 'rounded-lg',
      'border-border': 'border-border',
    },
    a11y: {
      roles: ['form'],
      ariaAttributes: ['aria-label="Profile settings form"'],
      keyboardNav: 'Sequential form navigation',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    seo: { semanticElement: 'section', headingLevel: 'h2' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: ['Avatar with edit overlay button', 'Semantic form layout with grid breakpoints'],
      craftDetails: ['Focus ring on inputs using ring-ring token', 'Hover state transitions on buttons'],
      inspirationSource: 'Linear settings panel',
    },
  },
  {
    id: 'settings-notifications',
    name: 'Notification Settings',
    category: 'organism',
    type: 'settings',
    variant: 'notifications',
    tags: ['settings', 'notifications', 'preferences', 'toggles'],
    mood: ['professional', 'calm'],
    industry: ['saas', 'devtools', 'general'],
    visualStyles: ['linear-modern', 'minimal-editorial'],
    jsx: `<div className="max-w-2xl mx-auto space-y-6">
  <div>
    <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
    <p className="text-sm text-muted-foreground">Choose what you want to be notified about</p>
  </div>
  <div className="space-y-1">
    {[
      { title: 'Email Notifications', desc: 'Receive email updates about your account', defaultChecked: true },
      { title: 'Push Notifications', desc: 'Receive push notifications on your devices', defaultChecked: true },
      { title: 'Weekly Digest', desc: 'Get a weekly summary of your activity', defaultChecked: false },
      { title: 'Marketing Emails', desc: 'Receive news about new features and updates', defaultChecked: false },
      { title: 'Security Alerts', desc: 'Get notified about security events', defaultChecked: true },
    ].map((item) => (
      <div key={item.title} className="flex items-center justify-between py-4 border-b border-border last:border-0">
        <div>
          <p className="text-sm font-medium text-foreground">{item.title}</p>
          <p className="text-xs text-muted-foreground">{item.desc}</p>
        </div>
        <button role="switch" aria-checked={item.defaultChecked} className={\`relative inline-flex h-6 w-11 items-center rounded-full transition-colors \${item.defaultChecked ? 'bg-primary' : 'bg-muted'}\`}>
          <span className={\`inline-block h-4 w-4 transform rounded-full bg-background transition-transform \${item.defaultChecked ? 'translate-x-6' : 'translate-x-1'}\`} />
        </button>
      </div>
    ))}
  </div>
</div>`,
    tailwindClasses: {
      'max-w-2xl': 'max-w-2xl',
      'mx-auto': 'mx-auto',
      'space-y-6': 'space-y-6',
      'border-border': 'border-border',
      'rounded-full': 'rounded-full',
    },
    a11y: {
      roles: ['form'],
      ariaAttributes: ['aria-label="Notification preferences"'],
      keyboardNav: 'Toggle switches with aria-checked',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: [
        'Custom toggle switches with semantic state colors',
        'Grouped notification categories with descriptions',
      ],
      craftDetails: ['Smooth transition on toggle state', 'Last item removes bottom border'],
      inspirationSource: 'GitHub notification settings',
    },
  },
  {
    id: 'settings-api-keys',
    name: 'API Key Settings',
    category: 'organism',
    type: 'settings',
    variant: 'api-keys',
    tags: ['settings', 'api', 'keys', 'developer', 'security'],
    mood: ['professional', 'corporate'],
    industry: ['saas', 'devtools'],
    visualStyles: ['linear-modern', 'dark-premium'],
    jsx: `<div className="max-w-2xl mx-auto space-y-6">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-lg font-semibold text-foreground">API Keys</h2>
      <p className="text-sm text-muted-foreground">Manage your API keys for programmatic access</p>
    </div>
    <button className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Create Key</button>
  </div>
  <div className="rounded-lg border border-border overflow-hidden">
    <table className="w-full">
      <thead>
        <tr className="border-b border-border bg-muted/50">
          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Name</th>
          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Key</th>
          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Created</th>
          <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {[
          { name: 'Production', key: 'sk-prod-****8f2a', created: '2 weeks ago' },
          { name: 'Development', key: 'sk-dev-****3b1c', created: '1 month ago' },
          { name: 'CI/CD Pipeline', key: 'sk-ci-****9e4d', created: '3 months ago' },
        ].map((item) => (
          <tr key={item.name} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
            <td className="px-4 py-3 text-sm font-medium text-foreground">{item.name}</td>
            <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{item.key}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{item.created}</td>
            <td className="px-4 py-3 text-right">
              <button className="text-sm text-destructive hover:text-destructive/80 transition-colors">Revoke</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>`,
    tailwindClasses: {
      'max-w-2xl': 'max-w-2xl',
      'rounded-lg': 'rounded-lg',
      'border-border': 'border-border',
      'bg-muted/50': 'bg-muted/50',
      'font-mono': 'font-mono',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-label="API key management"'],
      keyboardNav: 'Table navigation with revoke actions',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: ['Masked API keys with monospace font', 'Destructive action color for revoke buttons'],
      craftDetails: ['Hover row highlight with muted transition', 'Semantic table structure with proper headers'],
      inspirationSource: 'Stripe dashboard API keys',
    },
  },
  {
    id: 'settings-team',
    name: 'Team Settings',
    category: 'organism',
    type: 'settings',
    variant: 'team',
    tags: ['settings', 'team', 'members', 'roles', 'management'],
    mood: ['professional', 'corporate'],
    industry: ['saas', 'startup', 'devtools'],
    visualStyles: ['linear-modern', 'corporate-trust'],
    jsx: `<div className="max-w-2xl mx-auto space-y-6">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-lg font-semibold text-foreground">Team Members</h2>
      <p className="text-sm text-muted-foreground">Manage your team and their permissions</p>
    </div>
    <button className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Invite Member</button>
  </div>
  <div className="space-y-3">
    {[
      { name: 'John Smith', email: 'john@team.com', role: 'Owner', initials: 'JS' },
      { name: 'Sarah Chen', email: 'sarah@team.com', role: 'Admin', initials: 'SC' },
      { name: 'Mike Johnson', email: 'mike@team.com', role: 'Member', initials: 'MJ' },
    ].map((member) => (
      <div key={member.email} className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-ring/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-sm font-medium text-accent-foreground">{member.initials}</div>
          <div>
            <p className="text-sm font-medium text-foreground">{member.name}</p>
            <p className="text-xs text-muted-foreground">{member.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground px-2 py-1 rounded-md bg-muted">{member.role}</span>
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors" aria-label={\`Manage \${member.name}\`}>Manage</button>
        </div>
      </div>
    ))}
  </div>
</div>`,
    tailwindClasses: {
      'max-w-2xl': 'max-w-2xl',
      'rounded-lg': 'rounded-lg',
      'border-border': 'border-border',
      'bg-accent': 'bg-accent',
      'text-accent-foreground': 'text-accent-foreground',
    },
    a11y: {
      roles: ['list'],
      ariaAttributes: ['aria-label="Team member management"'],
      keyboardNav: 'Interactive member cards with manage actions',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: ['Avatar initials with accent background', 'Role badges in muted pill style'],
      craftDetails: ['Border hover transition to ring color', 'Accessible manage buttons with member name'],
      inspirationSource: 'Vercel team settings',
    },
  },
  {
    id: 'settings-billing',
    name: 'Billing Settings',
    category: 'organism',
    type: 'settings',
    variant: 'billing',
    tags: ['settings', 'billing', 'subscription', 'payment', 'plan'],
    mood: ['professional', 'premium'],
    industry: ['saas', 'fintech'],
    visualStyles: ['linear-modern', 'corporate-trust'],
    jsx: `<div className="max-w-2xl mx-auto space-y-8">
  <div>
    <h2 className="text-lg font-semibold text-foreground">Billing & Plan</h2>
    <p className="text-sm text-muted-foreground">Manage your subscription and payment method</p>
  </div>
  <div className="rounded-lg border border-border p-6 space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-foreground">Current Plan</p>
        <p className="text-2xl font-bold text-foreground">Pro</p>
      </div>
      <span className="px-3 py-1 text-xs font-medium rounded-full bg-success/10 text-success">Active</span>
    </div>
    <div className="flex items-center gap-6 text-sm text-muted-foreground">
      <span>$29/month</span>
      <span>Next billing: Mar 1, 2026</span>
    </div>
    <div className="flex gap-3">
      <button className="px-3 py-1.5 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors text-foreground">Change Plan</button>
      <button className="px-3 py-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors">Cancel</button>
    </div>
  </div>
  <div className="rounded-lg border border-border p-6 space-y-4">
    <p className="text-sm font-medium text-foreground">Payment Method</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-8 w-12 rounded bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">VISA</div>
        <span className="text-sm text-foreground">**** **** **** 4242</span>
      </div>
      <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">Update</button>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      'max-w-2xl': 'max-w-2xl',
      'rounded-lg': 'rounded-lg',
      'border-border': 'border-border',
      'bg-success/10': 'bg-success/10',
      'text-success': 'text-success',
    },
    a11y: {
      roles: ['region'],
      ariaAttributes: ['aria-label="Billing and subscription management"'],
      keyboardNav: 'Standard focus management',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: false,
    },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: ['Active status badge with success token', 'Masked card number with brand indicator'],
      craftDetails: ['Success opacity background for status badge', 'Destructive color hint on cancel button hover'],
      inspirationSource: 'Stripe billing portal',
    },
  },
];
