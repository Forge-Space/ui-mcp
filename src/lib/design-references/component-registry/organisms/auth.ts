import type { IComponentSnippet } from '../types.js';

export const authSnippets: IComponentSnippet[] = [
  {
    id: 'auth-login-card',
    name: 'Login Card',
    category: 'organism',
    type: 'auth',
    variant: 'login-card',
    tags: ['auth', 'login', 'form', 'card'],
    mood: ['professional', 'minimal', 'corporate'],
    industry: ['saas', 'general'],
    visualStyles: ['minimal-editorial', 'soft-depth', 'corporate-trust'],
    jsx: `<div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">A</div>
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">Welcome back</h2>
      <p className="mt-2 text-sm text-muted-foreground">Sign in to your account to continue</p>
    </div>
    <form className="mt-8 space-y-6" action="#" method="POST">
      <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" required aria-required="true" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="you@acme.co" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
            <a href="/forgot-password" className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Forgot?</a>
          </div>
          <input id="password" name="password" type="password" autoComplete="current-password" required aria-required="true" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="••••••••" />
        </div>
        <div className="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring" />
          <label htmlFor="remember-me" className="ml-2 text-sm text-muted-foreground">Remember me</label>
        </div>
      </div>
      <button type="submit" className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Sign in</button>
    </form>
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t"></div>
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-input px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Google
      </button>
      <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-input px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        GitHub
      </button>
    </div>
    <p className="text-center text-sm text-muted-foreground">Don't have an account? <a href="/signup" className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Sign up</a></p>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex min-h-screen items-center justify-center px-4 py-12',
      card: 'w-full max-w-md space-y-8',
      form: 'mt-8 space-y-6',
      inputGroup: 'space-y-4 rounded-xl border bg-card p-6 shadow-sm',
      input: 'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm',
      button: 'w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground',
      divider: 'relative flex justify-center text-xs',
      socialButton:
        'inline-flex items-center justify-center gap-2 rounded-lg border border-input px-4 py-2.5 text-sm font-medium',
    },
    a11y: {
      roles: ['form'],
      ariaAttributes: ['aria-required', 'aria-hidden'],
      htmlAttributes: ['autocomplete', 'required'],
      keyboardNav: 'Tab through form fields, Enter to submit',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'lg'] },
    quality: {
      antiGeneric: [
        'logo avatar in header',
        'forgot password link inline with password label',
        'social login buttons with brand colors',
        'divider with background cutout text',
      ],
      inspirationSource: 'Clerk auth screens',
      craftDetails: [
        'max-w-md for readable form width',
        'space-y-8 for generous vertical rhythm',
        'grid grid-cols-2 for social buttons',
      ],
    },
  },
  {
    id: 'auth-signup-card',
    name: 'Signup Card',
    category: 'organism',
    type: 'auth',
    variant: 'signup-card',
    tags: ['auth', 'signup', 'registration', 'form'],
    mood: ['professional', 'minimal'],
    industry: ['saas', 'startup'],
    visualStyles: ['minimal-editorial', 'soft-depth'],
    jsx: `<div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div className="text-center">
      <h2 className="text-3xl font-bold tracking-tight text-foreground">Create your account</h2>
      <p className="mt-2 text-sm text-muted-foreground">Start your free trial. No credit card required.</p>
    </div>
    <form className="mt-8 space-y-6" action="#" method="POST">
      <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium text-foreground">First name</label>
            <input id="firstName" name="firstName" type="text" autoComplete="given-name" required aria-required="true" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium text-foreground">Last name</label>
            <input id="lastName" name="lastName" type="text" autoComplete="family-name" required aria-required="true" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" required aria-required="true" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="you@acme.co" />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
          <input id="password" name="password" type="password" autoComplete="new-password" required aria-required="true" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
        </div>
        <div className="flex items-start">
          <input id="terms" name="terms" type="checkbox" required aria-required="true" className="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring" />
          <label htmlFor="terms" className="ml-2 text-sm text-muted-foreground">I agree to the <a href="/terms" className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Terms of Service</a> and <a href="/privacy" className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Privacy Policy</a></label>
        </div>
      </div>
      <button type="submit" className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Create account</button>
    </form>
    <p className="text-center text-sm text-muted-foreground">Already have an account? <a href="/login" className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Sign in</a></p>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex min-h-screen items-center justify-center px-4 py-12',
      form: 'mt-8 space-y-6',
      inputGroup: 'space-y-4 rounded-xl border bg-card p-6 shadow-sm',
      nameGrid: 'grid gap-4 sm:grid-cols-2',
      hint: 'text-xs text-muted-foreground',
    },
    a11y: {
      roles: ['form'],
      ariaAttributes: ['aria-required'],
      htmlAttributes: ['autocomplete', 'required'],
      keyboardNav: 'Tab through form fields',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'first/last name split on desktop',
        'password requirements hint',
        'terms checkbox with inline links',
        'no credit card required callout',
      ],
      inspirationSource: 'Stripe signup',
      craftDetails: [
        'grid gap-4 sm:grid-cols-2 for name fields',
        'mt-0.5 on checkbox for optical alignment',
        'text-xs for password hint',
      ],
    },
  },
  {
    id: 'auth-forgot-password',
    name: 'Forgot Password',
    category: 'organism',
    type: 'auth',
    variant: 'forgot-password',
    tags: ['auth', 'password-reset', 'recovery'],
    mood: ['minimal', 'professional'],
    industry: ['saas', 'general'],
    visualStyles: ['minimal-editorial', 'soft-depth'],
    jsx: `<div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" /></svg>
      </div>
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">Forgot your password?</h2>
      <p className="mt-2 text-sm text-muted-foreground">No worries, we'll send you reset instructions.</p>
    </div>
    <form className="mt-8 space-y-6" action="#" method="POST">
      <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" required aria-required="true" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="you@acme.co" />
        </div>
      </div>
      <button type="submit" className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Send reset link</button>
    </form>
    <div className="text-center">
      <a href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
        Back to sign in
      </a>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex min-h-screen items-center justify-center px-4 py-12',
      iconWrapper: 'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted',
      form: 'mt-8 space-y-6',
      backLink: 'inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground',
    },
    a11y: {
      roles: ['form'],
      ariaAttributes: ['aria-required', 'aria-hidden'],
      htmlAttributes: ['autocomplete', 'required'],
      keyboardNav: 'Tab to email input and submit button',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'key icon in circular background',
        'friendly microcopy',
        'back to sign in link with arrow',
        'single input for simplicity',
      ],
      inspirationSource: 'Auth0 password reset',
      craftDetails: [
        'h-12 w-12 icon wrapper for visual hierarchy',
        'rounded-full bg-muted for soft icon container',
        'inline-flex items-center gap-2 for back link',
      ],
    },
  },
  {
    id: 'auth-email-verify',
    name: 'Email Verification',
    category: 'organism',
    type: 'auth',
    variant: 'email-verify',
    tags: ['auth', 'email', 'verification', 'otp'],
    mood: ['minimal', 'professional'],
    industry: ['saas', 'fintech'],
    visualStyles: ['minimal-editorial', 'soft-depth'],
    jsx: `<div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
      </div>
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">Check your email</h2>
      <p className="mt-2 text-sm text-muted-foreground">We sent a verification code to <span className="font-medium text-foreground">you@acme.co</span></p>
    </div>
    <form className="mt-8 space-y-6" action="#" method="POST">
      <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-2">
          <label htmlFor="code" className="text-sm font-medium text-foreground">Verification code</label>
          <input id="code" name="code" type="text" inputMode="numeric" pattern="[0-9]*" maxLength={6} autoComplete="one-time-code" required aria-required="true" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-center text-2xl font-mono tracking-widest transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="000000" />
          <p className="text-xs text-muted-foreground">Enter the 6-digit code from your email</p>
        </div>
      </div>
      <button type="submit" className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Verify email</button>
    </form>
    <div className="text-center">
      <p className="text-sm text-muted-foreground">Didn't receive the email? <button type="button" className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Resend code</button></p>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex min-h-screen items-center justify-center px-4 py-12',
      iconWrapper: 'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10',
      codeInput:
        'w-full rounded-lg border border-input bg-background px-3 py-2 text-center text-2xl font-mono tracking-widest',
    },
    a11y: {
      roles: ['form'],
      ariaAttributes: ['aria-required', 'aria-hidden'],
      htmlAttributes: ['autocomplete="one-time-code"', 'inputMode', 'maxLength'],
      keyboardNav: 'Tab to code input',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'email icon in primary accent circle',
        'code input with monospace font',
        'text-center for code input',
        'resend code button inline',
      ],
      inspirationSource: 'Resend verification',
      craftDetails: [
        'text-2xl font-mono tracking-widest for code',
        'inputMode="numeric" for mobile keyboards',
        'autocomplete="one-time-code" for iOS autofill',
      ],
    },
  },
  {
    id: 'auth-social',
    name: 'Social Auth Buttons',
    category: 'organism',
    type: 'auth',
    variant: 'media',
    tags: ['auth', 'media', 'oauth', 'sso'],
    mood: ['minimal', 'professional'],
    industry: ['saas', 'startup'],
    visualStyles: ['minimal-editorial', 'soft-depth'],
    jsx: `<div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div className="text-center">
      <h2 className="text-3xl font-bold tracking-tight text-foreground">Sign in to continue</h2>
      <p className="mt-2 text-sm text-muted-foreground">Choose your preferred sign in method</p>
    </div>
    <div className="space-y-3">
      <button type="button" className="group relative flex w-full items-center justify-center gap-3 rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Continue with Google
      </button>
      <button type="button" className="group relative flex w-full items-center justify-center gap-3 rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        Continue with GitHub
      </button>
      <button type="button" className="group relative flex w-full items-center justify-center gap-3 rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>
        Continue with Apple
      </button>
      <button type="button" className="group relative flex w-full items-center justify-center gap-3 rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <svg className="h-5 w-5 shrink-0" fill="#0A66C2" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        Continue with LinkedIn
      </button>
    </div>
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t"></div>
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="bg-background px-2 text-muted-foreground">Or</span>
      </div>
    </div>
    <a href="/login/email" className="block w-full rounded-lg border border-input px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Continue with email</a>
    <p className="text-center text-xs text-muted-foreground">By continuing, you agree to our <a href="/terms" className="font-medium text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="font-medium text-primary hover:underline">Privacy Policy</a></p>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex min-h-screen items-center justify-center px-4 py-12',
      socialButton:
        'group relative flex w-full items-center justify-center gap-3 rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium',
      divider: 'relative flex justify-center text-xs',
    },
    a11y: {
      roles: [],
      ariaAttributes: ['aria-hidden'],
      keyboardNav: 'Tab through auth buttons',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'brand-colored logos for each provider',
        'consistent button layout',
        'email fallback option',
        'terms inline at bottom',
      ],
      inspirationSource: 'NextAuth sign in page',
      craftDetails: [
        'space-y-3 for tight button stacking',
        'shrink-0 on icons to prevent squishing',
        'py-3 for larger touch targets',
      ],
    },
  },
  {
    id: 'auth-mfa',
    name: 'Two-Factor Authentication',
    category: 'organism',
    type: 'auth',
    variant: 'mfa',
    tags: ['auth', 'mfa', '2fa', 'security', 'otp'],
    mood: ['professional', 'corporate'],
    industry: ['fintech', 'saas', 'general'],
    visualStyles: ['minimal-editorial', 'corporate-trust'],
    jsx: `<div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
      </div>
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">Two-factor authentication</h2>
      <p className="mt-2 text-sm text-muted-foreground">Open your authenticator app and enter the 6-digit code</p>
    </div>
    <form className="mt-8 space-y-6" action="#" method="POST">
      <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-2">
          <label htmlFor="otp" className="text-sm font-medium text-foreground">Authentication code</label>
          <input id="otp" name="otp" type="text" inputMode="numeric" pattern="[0-9]*" maxLength={6} autoComplete="one-time-code" required aria-required="true" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-center text-2xl font-mono tracking-widest transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="000000" />
        </div>
        <div className="rounded-lg bg-muted p-3">
          <div className="flex items-start gap-2">
            <svg className="h-5 w-5 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
            <p className="text-xs text-muted-foreground">Use your authenticator app (Google Authenticator, Authy, 1Password, etc.) to get your code.</p>
          </div>
        </div>
      </div>
      <button type="submit" className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Verify and continue</button>
    </form>
    <div className="space-y-3 text-center text-sm">
      <p className="text-muted-foreground">Lost access to your authenticator? <button type="button" className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Use recovery code</button></p>
      <a href="/login" className="inline-flex items-center gap-2 font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
        Back to sign in
      </a>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      container: 'flex min-h-screen items-center justify-center px-4 py-12',
      iconWrapper: 'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10',
      codeInput:
        'w-full rounded-lg border border-input bg-background px-3 py-2 text-center text-2xl font-mono tracking-widest',
      infoBox: 'rounded-lg bg-muted p-3',
    },
    a11y: {
      roles: ['form'],
      ariaAttributes: ['aria-required', 'aria-hidden'],
      htmlAttributes: ['autocomplete="one-time-code"', 'inputMode', 'maxLength'],
      keyboardNav: 'Tab to code input',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'shield check icon for security context',
        'info box with authenticator app examples',
        'recovery code fallback option',
        'monospace code input',
      ],
      inspirationSource: '1Password 2FA flow',
      craftDetails: [
        'text-2xl font-mono tracking-widest for code',
        'rounded-lg bg-muted for info box',
        'space-y-3 for fallback options',
      ],
    },
  },
];
