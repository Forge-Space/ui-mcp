import type { ITemplatePack } from '../types.js';

export const aiChatAppPack: ITemplatePack = {
  id: 'ai-chat-app',
  name: 'AI Chat Application',
  description:
    'Conversational AI interface inspired by ChatGPT, Claude, and ' + 'Perplexity with chat, settings, and history',
  appType: 'ai-chat',
  pages: [
    {
      path: '/',
      compositionId: 'chat-interface',
      title: 'Chat',
      isIndex: true,
    },
    {
      path: '/settings',
      compositionId: 'settings-page',
      title: 'Settings',
      isIndex: false,
    },
    {
      path: '/history',
      compositionId: 'conversation-history',
      title: 'History',
      isIndex: false,
    },
  ],
  theme: {
    colorSystemId: 'slate-inter',
    fontPairingId: 'inter-mono',
    visualStyle: 'linear-modern',
    mood: 'minimal',
  },
  sharedComponents: ['nav-sidebar-conversations', 'chat-message-composer'],
  quality: {
    antiGeneric: [
      'Avoid generic "How can I help you today?" without personality',
      'Skip placeholder messages or fake conversation history',
      'No overwhelming sidebar of every past conversation at once',
      'Avoid generic loading states like "Thinking..."',
      'Skip feature bloat like voice input without clear use case',
    ],
    designPhilosophy:
      'Inspired by ChatGPT, Claude, and Perplexity: conversation-first ' +
      'layout, clean message bubbles with markdown support, unobtrusive ' +
      'sidebar, keyboard shortcuts for power users, focus on readability',
    inspirationSources: [
      'ChatGPT (chat.openai.com) - Clean message layout, sidebar nav',
      'Claude (claude.ai) - Markdown rendering, minimal UI',
      'Perplexity (perplexity.ai) - Source citations, inline references',
    ],
  },
};
