import type { IComponentSnippet } from '../types.js';

export const dividerSnippets: IComponentSnippet[] = [
  {
    id: 'divider-horizontal',
    name: 'Horizontal Divider',
    category: 'atom',
    type: 'divider',
    variant: 'horizontal',
    tags: ['separator', 'line', 'section', 'spacer'],
    mood: ['minimal', 'professional'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'minimal-editorial'],
    jsx: `<hr className="border-0 border-t border-border" role="separator" />`,
    tailwindClasses: {
      divider: 'border-0 border-t border-border',
    },
    a11y: {
      roles: ['separator'],
      ariaAttributes: [],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '3:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'hr' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'border-0 resets default hr styles',
        'border-border uses theme token',
        'semantic hr element not div',
      ],
      inspirationSource: 'shadcn/ui Separator',
      craftDetails: [
        'border-0 removes default hr border',
        'border-t adds single top border',
        'role="separator" for semantic clarity',
      ],
    },
  },
  {
    id: 'divider-vertical',
    name: 'Vertical Divider',
    category: 'atom',
    type: 'divider',
    variant: 'soft-depth',
    tags: ['separator', 'line', 'toolbar', 'spacer'],
    mood: ['minimal', 'professional'],
    industry: ['general', 'saas', 'devtools'],
    visualStyles: ['soft-depth', 'linear-modern', 'minimal-editorial'],
    jsx: `<div className="h-6 w-px bg-border" role="separator" aria-orientation="vertical" />`,
    tailwindClasses: {
      divider: 'h-6 w-px bg-border',
    },
    a11y: {
      roles: ['separator'],
      ariaAttributes: ['aria-orientation'],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '3:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'w-px (1px) for hairline thickness',
        'aria-orientation="vertical" for screen readers',
        'h-6 matches common toolbar height',
      ],
      inspirationSource: 'VS Code activity bar separators',
      craftDetails: [
        'w-px creates 1px wide line',
        'bg-border uses theme-aware color',
        'h-6 flexible height, adjust per use case',
      ],
    },
  },
  {
    id: 'divider-with-label',
    name: 'Divider with Label',
    category: 'atom',
    type: 'divider',
    variant: 'with-label',
    tags: ['separator', 'text', 'section', 'spacer'],
    mood: ['minimal', 'professional'],
    industry: ['general', 'saas', 'fintech'],
    visualStyles: ['soft-depth', 'linear-modern', 'corporate-trust'],
    jsx: `<div className="flex items-center gap-4" role="separator">
  <hr className="flex-1 border-0 border-t border-border" />
  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">or</span>
  <hr className="flex-1 border-0 border-t border-border" />
</div>`,
    tailwindClasses: {
      wrapper: 'flex items-center gap-4',
      divider: 'flex-1 border-0 border-t border-border',
      label: 'text-xs font-medium uppercase tracking-wider text-muted-foreground',
    },
    a11y: {
      roles: ['separator'],
      ariaAttributes: [],
      keyboardNav: 'N/A — decorative',
      contrastRatio: '4.5:1',
      focusVisible: false,
      reducedMotion: true,
    },
    seo: { semanticElement: 'div' },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: [
        'flex-1 on hr elements ensures equal width',
        'uppercase + tracking-wider for label emphasis',
        'gap-4 provides breathing room',
      ],
      inspirationSource: 'Clerk "or continue with" dividers',
      craftDetails: [
        'flex layout centers label between lines',
        'flex-1 divides remaining space equally',
        'text-xs + uppercase for hierarchy subordination',
      ],
    },
  },
];
