import type { IComponentSnippet } from '../types.js';

export const formSnippets: IComponentSnippet[] = [
  {
    id: 'form-login',
    name: 'Login Form',
    category: 'molecule',
    type: 'form',
    variant: 'login',
    tags: ['auth', 'sign-in', 'authentication', 'credentials'],
    mood: ['professional', 'minimal'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['soft-depth', 'corporate-trust', 'minimal-editorial'],
    jsx: `<form className="mx-auto w-full max-w-sm space-y-6" aria-label="Sign in" noValidate>
  <div className="space-y-2 text-center">
    <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
    <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
  </div>
  <div className="space-y-4">
    <div className="space-y-2">
      <label htmlFor="login-email" className="text-sm font-medium text-foreground">Email</label>
      <input id="login-email" type="email" placeholder="name@acme.co" autoComplete="email" className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" aria-required="true" />
    </div>
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor="login-password" className="text-sm font-medium text-foreground">Password</label>
        <a href="/forgot-password" className="text-xs text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Forgot password?</a>
      </div>
      <input id="login-password" type="password" autoComplete="current-password" className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" aria-required="true" />
    </div>
    <button type="submit" className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50">Sign in</button>
  </div>
  <div className="relative">
    <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
    <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
  </div>
  <div className="grid grid-cols-2 gap-3">
    <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
      Google
    </button>
    <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>
      GitHub
    </button>
  </div>
  <p className="text-center text-sm text-muted-foreground">Don&apos;t have an account? <a href="/signup" className="font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Sign up</a></p>
</form>`,
    tailwindClasses: {
      form: 'mx-auto w-full max-w-sm space-y-6',
      title: 'text-2xl font-bold tracking-tight text-foreground',
      subtitle: 'text-sm text-muted-foreground',
      label: 'text-sm font-medium text-foreground',
      input:
        'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      submit:
        'inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]',
      socialButton:
        'inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    },
    a11y: {
      roles: ['form'],
      ariaAttributes: ['aria-label', 'aria-required'],
      htmlAttributes: ['autoComplete', 'noValidate'],
      keyboardNav: 'Tab through fields, Enter to submit',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'form' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'autoComplete attributes for browser autofill',
        'visual divider for social login section',
        'forgot password positioned inline with label',
        'noValidate for custom validation',
      ],
      inspirationSource: 'shadcn/ui login form + Clerk auth pages',
      craftDetails: [
        'max-w-sm for focused form',
        'space-y-6 section spacing',
        'consistent h-10 for all interactive elements',
      ],
    },
  },
  {
    id: 'form-contact',
    name: 'Contact Form',
    category: 'molecule',
    type: 'form',
    variant: 'contact',
    tags: ['contact', 'feedback', 'saas', 'communication'],
    mood: ['professional', 'warm'],
    industry: ['general', 'agency', 'saas'],
    visualStyles: ['soft-depth', 'corporate-trust', 'minimal-editorial'],
    jsx: `<form className="mx-auto w-full max-w-lg space-y-6" aria-label="Contact us" noValidate>
  <div className="space-y-2">
    <h2 className="text-2xl font-bold tracking-tight text-foreground">Get in touch</h2>
    <p className="text-sm text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
  </div>
  <div className="grid gap-4 sm:grid-cols-2">
    <div className="space-y-2">
      <label htmlFor="contact-first" className="text-sm font-medium text-foreground">First name</label>
      <input id="contact-first" type="text" autoComplete="given-name" className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-required="true" />
    </div>
    <div className="space-y-2">
      <label htmlFor="contact-last" className="text-sm font-medium text-foreground">Last name</label>
      <input id="contact-last" type="text" autoComplete="family-name" className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-required="true" />
    </div>
  </div>
  <div className="space-y-2">
    <label htmlFor="contact-email" className="text-sm font-medium text-foreground">Email</label>
    <input id="contact-email" type="email" autoComplete="email" className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-required="true" />
  </div>
  <div className="space-y-2">
    <label htmlFor="contact-message" className="text-sm font-medium text-foreground">Message</label>
    <textarea id="contact-message" rows={4} className="flex min-h-[120px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y" placeholder="How can we help?" aria-required="true" />
  </div>
  <button type="submit" className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] sm:w-auto sm:px-8">Send message</button>
</form>`,
    tailwindClasses: {
      form: 'mx-auto w-full max-w-lg space-y-6',
      nameGrid: 'grid gap-4 sm:grid-cols-2',
      label: 'text-sm font-medium text-foreground',
      input:
        'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      textarea:
        'flex min-h-[120px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y',
      submit:
        'inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] sm:w-auto sm:px-8',
    },
    a11y: {
      roles: ['form'],
      ariaAttributes: ['aria-label', 'aria-required'],
      htmlAttributes: ['autoComplete', 'noValidate'],
      keyboardNav: 'Tab through fields, Enter to submit',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'form' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        '2-column name grid on sm+',
        'autoComplete for autofill',
        'button full-width on mobile, auto on desktop',
      ],
      inspirationSource: 'Tailwind UI contact forms',
      craftDetails: ['responsive grid for first/last name', 'min-h-[120px] textarea', 'sm:w-auto button sizing'],
    },
  },
];
