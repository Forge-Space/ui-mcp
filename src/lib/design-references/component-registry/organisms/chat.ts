import type { IComponentSnippet } from '../types.js';

export const chatSnippets: IComponentSnippet[] = [
  {
    id: 'chat-thread',
    name: 'Chat Thread',
    category: 'organism',
    type: 'chat',
    variant: 'thread',
    tags: ['chat', 'messages', 'conversation', 'thread'],
    mood: ['professional', 'minimal'] as const,
    industry: ['saas', 'general'] as const,
    visualStyles: ['soft-depth'] as const,
    jsx: `<div className="flex flex-col h-full">
  <div className="flex-1 overflow-y-auto p-4 space-y-4">
    <div className="flex gap-3">
      <div className="h-8 w-8 rounded-full bg-primary shrink-0" />
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-foreground">Assistant</span>
          <span className="text-xs text-muted-foreground">10:23 AM</span>
        </div>
        <div className="mt-1 rounded-lg bg-muted p-3 text-sm text-foreground">
          <p>How can I help you today? I can assist with code generation, debugging, or answering questions.</p>
        </div>
      </div>
    </div>
    <div className="flex gap-3 justify-end">
      <div className="flex-1 flex flex-col items-end">
        <div className="flex items-baseline gap-2">
          <span className="text-xs text-muted-foreground">10:24 AM</span>
          <span className="text-sm font-medium text-foreground">You</span>
        </div>
        <div className="mt-1 rounded-lg bg-primary p-3 text-sm text-primary-foreground max-w-md">
          <p>I need help building a React component for user authentication.</p>
        </div>
      </div>
      <div className="h-8 w-8 rounded-full bg-accent shrink-0" />
    </div>
    <div className="flex gap-3">
      <div className="h-8 w-8 rounded-full bg-primary shrink-0" />
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-foreground">Assistant</span>
          <span className="text-xs text-muted-foreground">10:24 AM</span>
        </div>
        <div className="mt-1 rounded-lg bg-muted p-3 text-sm text-foreground">
          <p>I can help you with that! Let's create a sign-in component. Would you like to use email/password authentication or social auth providers?</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      root: 'flex flex-col h-full',
    },
    a11y: {
      roles: ['log'],
      ariaAttributes: ['aria-label', 'aria-live'],
      keyboardNav: 'Scroll through messages',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['sm'] },
    quality: {
      antiGeneric: ['Avatar indicators', 'Timestamp display', 'Different colors for user/assistant'],
      inspirationSource: 'ChatGPT',
      craftDetails: ['Message bubbles', 'Scrollable container', 'Clear sender identification'],
    },
  },
  {
    id: 'chat-composer',
    name: 'Chat Composer',
    category: 'organism',
    type: 'chat',
    variant: 'composer',
    tags: ['chat', 'input', 'composer', 'message'],
    mood: ['professional', 'minimal'] as const,
    industry: ['saas', 'devtools'] as const,
    visualStyles: ['soft-depth'] as const,
    jsx: `<div className="border-t border-input bg-card p-4">
  <form className="relative">
    <div className="flex gap-2">
      <div className="flex-1 relative">
        <textarea
          placeholder="Type your message..."
          rows={3}
          className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary pr-24"
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Attach file"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Add emoji"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="self-end rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </div>
    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-3">
        <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">⌘ + Enter</kbd>
        <span>to send</span>
      </div>
      <span>0 / 2000</span>
    </div>
  </form>
</div>`,
    tailwindClasses: {
      root: 'border-t bg-card p-4',
    },
    a11y: {
      roles: ['form'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Cmd+Enter to send, Tab through buttons',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['sm'] },
    quality: {
      antiGeneric: ['Keyboard shortcut hint', 'Character counter', 'Inline action buttons'],
      inspirationSource: 'Claude',
      craftDetails: ['Auto-expanding textarea', 'Icon buttons overlay', 'Clear affordances'],
    },
  },
  {
    id: 'chat-sidebar',
    name: 'Chat Sidebar',
    category: 'organism',
    type: 'chat',
    variant: 'sidebar',
    tags: ['chat', 'sidebar', 'conversations', 'minimal-editorial'],
    mood: ['professional', 'minimal'] as const,
    industry: ['saas', 'general'] as const,
    visualStyles: ['soft-depth'] as const,
    jsx: `<aside className="flex h-full w-80 flex-col border-r border-input bg-card">
  <div className="flex items-center justify-between border-b border-input p-4">
    <h2 className="text-lg font-semibold text-foreground">Conversations</h2>
    <button className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent">
      <svg className="h-5 w-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>
  <div className="flex-1 overflow-y-auto">
    <div className="p-2 space-y-1">
      <button className="flex w-full items-start gap-3 rounded-lg bg-accent p-3 text-left hover:bg-accent/80">
        <div className="h-10 w-10 rounded-full bg-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-foreground truncate">Technical Support</span>
            <span className="text-xs text-muted-foreground shrink-0">2m</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground truncate">Thanks for your help with...</p>
        </div>
      </button>
      <button className="flex w-full items-start gap-3 rounded-lg p-3 text-left hover:bg-accent">
        <div className="h-10 w-10 rounded-full bg-muted shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-foreground truncate">Product Feedback</span>
            <span className="text-xs text-muted-foreground shrink-0">1h</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground truncate">The new dashboard looks...</p>
        </div>
      </button>
      <button className="flex w-full items-start gap-3 rounded-lg p-3 text-left hover:bg-accent">
        <div className="h-10 w-10 rounded-full bg-muted shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-foreground truncate">Billing Question</span>
            <span className="text-xs text-muted-foreground shrink-0">3h</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground truncate">Can you help me understand...</p>
        </div>
      </button>
      <button className="flex w-full items-start gap-3 rounded-lg p-3 text-left hover:bg-accent">
        <div className="h-10 w-10 rounded-full bg-muted shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-foreground truncate">Feature Request</span>
            <span className="text-xs text-muted-foreground shrink-0">1d</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground truncate">Would it be possible to add...</p>
        </div>
      </button>
    </div>
  </div>
</aside>`,
    tailwindClasses: {
      root: 'flex h-full w-80 flex-col border-r bg-card',
    },
    a11y: {
      roles: ['complementary'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab through conversations',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['lg'] },
    quality: {
      antiGeneric: ['Active conversation highlight', 'Relative timestamps', 'Message preview'],
      inspirationSource: 'ChatGPT',
      craftDetails: ['Scrollable list', 'New conversation button', 'Truncated text'],
    },
  },
];
