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
  {
    id: 'chat-message-bubble',
    name: 'Chat Message Bubble',
    category: 'organism',
    type: 'chat',
    variant: 'message-bubble',
    tags: ['chat', 'message', 'bubble', 'conversation'],
    mood: ['professional', 'minimal'] as const,
    industry: ['saas', 'general'] as const,
    visualStyles: ['soft-depth'] as const,
    jsx: `<div className="flex gap-3 max-w-2xl">
  <div className="h-8 w-8 rounded-full bg-primary shrink-0" aria-hidden="true" />
  <div className="flex-1 space-y-1">
    <div className="flex items-baseline gap-2">
      <span className="text-sm font-medium text-foreground">Sarah Chen</span>
      <span className="text-xs text-muted-foreground">2:34 PM</span>
    </div>
    <div className="rounded-lg bg-muted p-3 text-sm text-foreground">
      <p>Just finished reviewing the latest designs. They look great! I have a few suggestions for the checkout flow.</p>
    </div>
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <button type="button" className="inline-flex items-center gap-1 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375z" /></svg>
        React
      </button>
      <button type="button" className="inline-flex items-center gap-1 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" /></svg>
        Reply
      </button>
      <button type="button" className="inline-flex items-center gap-1 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
        More
      </button>
    </div>
  </div>
</div>`,
    tailwindClasses: {
      root: 'flex gap-3 max-w-2xl',
      avatar: 'h-8 w-8 rounded-full bg-primary shrink-0',
      content: 'flex-1 space-y-1',
      header: 'flex items-baseline gap-2',
      name: 'text-sm font-medium text-foreground',
      timestamp: 'text-xs text-muted-foreground',
      bubble: 'rounded-lg bg-muted p-3 text-sm text-foreground',
      actions: 'flex items-center gap-3 text-xs text-muted-foreground',
      actionButton:
        'inline-flex items-center gap-1 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm',
    },
    a11y: {
      roles: ['article'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Tab through action buttons',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'inline message actions (react, reply, more)',
        'avatar + name + timestamp header',
        'max-w-2xl prevents overly wide bubbles',
        'space-y-1 tight vertical spacing',
      ],
      inspirationSource: 'Slack message',
      craftDetails: [
        'shrink-0 on avatar prevents squishing',
        'text-xs on actions for subtle presence',
        'hover:text-foreground on actions for feedback',
        'gap-3 between action buttons',
      ],
    },
  },
  {
    id: 'chat-typing-indicator',
    name: 'Typing Indicator',
    category: 'organism',
    type: 'chat',
    variant: 'typing-indicator',
    tags: ['chat', 'typing', 'indicator', 'loading'],
    mood: ['professional', 'minimal'] as const,
    industry: ['saas', 'general'] as const,
    visualStyles: ['soft-depth'] as const,
    jsx: `<div className="flex gap-3">
  <div className="h-8 w-8 rounded-full bg-primary shrink-0" aria-hidden="true" />
  <div className="flex-1">
    <div className="flex items-baseline gap-2 mb-1">
      <span className="text-sm font-medium text-foreground">Assistant</span>
      <span className="text-xs text-muted-foreground">typing...</span>
    </div>
    <div className="inline-flex items-center gap-1 rounded-lg bg-muted px-3 py-2" role="status" aria-live="polite" aria-label="Typing indicator">
      <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
</div>`,
    tailwindClasses: {
      root: 'flex gap-3',
      avatar: 'h-8 w-8 rounded-full bg-primary shrink-0',
      content: 'flex-1',
      header: 'flex items-baseline gap-2 mb-1',
      name: 'text-sm font-medium text-foreground',
      status: 'text-xs text-muted-foreground',
      indicator: 'inline-flex items-center gap-1 rounded-lg bg-muted px-3 py-2',
      dot: 'h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce',
    },
    a11y: {
      roles: ['status'],
      ariaAttributes: ['aria-live="polite"', 'aria-label'],
      keyboardNav: 'Not interactive',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'staggered animation delays (0ms, 150ms, 300ms)',
        'aria-live="polite" for screen readers',
        'inline-flex for compact indicator',
        'bg-muted-foreground/40 for subtle dots',
      ],
      inspirationSource: 'iMessage typing indicator',
      craftDetails: [
        'animate-bounce with staggered delays',
        'role="status" for semantic meaning',
        'h-2 w-2 perfectly round dots',
        'gap-1 tight dot spacing',
      ],
    },
  },
  {
    id: 'chat-input-box',
    name: 'Chat Input Box',
    category: 'organism',
    type: 'chat',
    variant: 'input-box',
    tags: ['chat', 'input', 'message', 'composer'],
    mood: ['professional', 'minimal'] as const,
    industry: ['saas', 'general'] as const,
    visualStyles: ['soft-depth'] as const,
    jsx: `<div className="border-t border-input bg-card">
  <form className="p-4">
    <div className="flex items-end gap-2">
      <button type="button" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Attach file">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" /></svg>
      </button>
      <div className="flex-1 relative">
        <textarea
          placeholder="Type a message..."
          rows={1}
          className="w-full resize-none rounded-lg border border-input bg-background px-4 py-2.5 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors max-h-32"
        />
        <button type="button" className="absolute bottom-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Add emoji">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" /></svg>
        </button>
      </div>
      <button type="submit" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Send message">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
      </button>
    </div>
    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-2">
        <kbd className="inline-flex items-center gap-0.5 rounded bg-muted px-1.5 py-0.5 font-mono">
          <span>⌘</span>Enter
        </kbd>
        <span>to send</span>
      </div>
      <span>0 / 2000</span>
    </div>
  </form>
</div>`,
    tailwindClasses: {
      root: 'border-t border-input bg-card',
      form: 'p-4',
      inputRow: 'flex items-end gap-2',
      attachButton:
        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      inputWrapper: 'flex-1 relative',
      textarea:
        'w-full resize-none rounded-lg border border-input bg-background px-4 py-2.5 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors max-h-32',
      emojiButton:
        'absolute bottom-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      sendButton:
        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed',
      footer: 'mt-2 flex items-center justify-between text-xs text-muted-foreground',
      shortcut: 'inline-flex items-center gap-0.5 rounded bg-muted px-1.5 py-0.5 font-mono',
    },
    a11y: {
      roles: ['form', 'textbox'],
      ariaAttributes: ['aria-label', 'placeholder'],
      keyboardNav: 'Cmd+Enter to send, Tab through buttons',
      contrastRatio: '4.5:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first' as const, breakpoints: ['sm'] },
    quality: {
      antiGeneric: [
        'emoji button overlaid on textarea (absolute positioning)',
        'attach button + send button flanking input',
        'keyboard shortcut hint below input',
        'character counter (0 / 2000)',
      ],
      inspirationSource: 'Discord message input',
      craftDetails: [
        'pr-12 on textarea accounts for emoji button',
        'max-h-32 prevents infinite growth',
        'items-end aligns buttons to textarea bottom',
        'shrink-0 on buttons prevents squishing',
      ],
    },
  },
];
