import { describe, it, expect, beforeEach } from 'vitest';
import { buildPrototype } from '../lib/prototype-builder.js';
import { designContextStore } from '../lib/design-context.js';
import type { IScreenElement, ITransition } from '../lib/types.js';

describe('generate_prototype', () => {
  beforeEach(() => {
    designContextStore.reset();
  });

  const basicScreens = [
    {
      name: 'Home',
      description: 'Landing page',
      elements: [
        { id: 'heading-1', type: 'heading' as const, label: 'Welcome' },
        { id: 'btn-1', type: 'button' as const, label: 'Go to About' },
      ],
    },
    {
      name: 'About',
      description: 'About page',
      elements: [
        { id: 'heading-2', type: 'heading' as const, label: 'About Us' },
        { id: 'text-1', type: 'text' as const, label: 'Description here' },
      ],
    },
  ];

  const basicFlow: ITransition[] = [
    { from: 'Home', to: 'About', trigger: 'click', targetElement: 'btn-1', animation: 'fade' },
  ];

  it('generates valid HTML document', () => {
    const html = buildPrototype({
      screens: basicScreens,
      navigationFlow: basicFlow,
    });

    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<html');
    expect(html).toContain('</html>');
    expect(html).toContain('<meta name="viewport"');
  });

  it('includes all screens as sections', () => {
    const html = buildPrototype({
      screens: basicScreens,
      navigationFlow: basicFlow,
    });

    expect(html).toContain('id="screen-home"');
    expect(html).toContain('id="screen-about"');
  });

  it('first screen is visible, others hidden', () => {
    const html = buildPrototype({
      screens: basicScreens,
      navigationFlow: basicFlow,
    });

    // First screen should have display: flex
    const homeMatch = html.match(/id="screen-home"[^>]*style="display: flex/);
    expect(homeMatch).not.toBeNull();

    // Second screen should have display: none
    const aboutMatch = html.match(/id="screen-about"[^>]*style="display: none/);
    expect(aboutMatch).not.toBeNull();
  });

  it('includes navigation script', () => {
    const html = buildPrototype({
      screens: basicScreens,
      navigationFlow: basicFlow,
    });

    expect(html).toContain('navigateTo');
    expect(html).toContain('data-nav-to');
  });

  it('renders elements by type', () => {
    const screens = [
      {
        name: 'Test',
        elements: [
          { id: 'h1', type: 'heading' as const, label: 'Title' },
          { id: 'p1', type: 'text' as const, label: 'Paragraph' },
          { id: 'b1', type: 'button' as const, label: 'Click' },
          { id: 'i1', type: 'input' as const, placeholder: 'Type here' },
          { id: 'd1', type: 'divider' as const },
        ] satisfies IScreenElement[],
      },
    ];

    const html = buildPrototype({ screens, navigationFlow: [] });

    expect(html).toContain('<h3 id="h1"');
    expect(html).toContain('<p id="p1"');
    expect(html).toContain('<button id="b1"');
    expect(html).toContain('<input id="i1"');
    expect(html).toContain('proto-divider');
  });

  it('applies design context CSS variables', () => {
    const html = buildPrototype({
      screens: basicScreens,
      navigationFlow: basicFlow,
    });

    expect(html).toContain('--primary: #2563eb');
    expect(html).toContain('--background: #ffffff');
    expect(html).toContain('--foreground: #0f172a');
  });

  it('uses custom design context when provided', () => {
    const ctx = designContextStore.get();
    ctx.colorPalette.primary = '#e11d48';

    const html = buildPrototype({
      screens: basicScreens,
      navigationFlow: basicFlow,
      designContext: ctx,
    });

    expect(html).toContain('--primary: #e11d48');
  });

  it('includes Tailwind CDN by default', () => {
    const html = buildPrototype({
      screens: basicScreens,
      navigationFlow: basicFlow,
    });

    expect(html).toContain('cdn.tailwindcss.com');
  });

  it('handles nested card elements', () => {
    const screens = [
      {
        name: 'Cards',
        elements: [
          {
            id: 'card-1',
            type: 'card' as const,
            label: 'My Card',
            children: [
              { id: 'card-text', type: 'text' as const, label: 'Card body' },
              { id: 'card-btn', type: 'button' as const, label: 'Action' },
            ],
          },
        ] satisfies IScreenElement[],
      },
    ];

    const html = buildPrototype({ screens, navigationFlow: [] });

    expect(html).toContain('id="card-1"');
    expect(html).toContain('proto-card');
    expect(html).toContain('id="card-text"');
    expect(html).toContain('id="card-btn"');
  });

  it('includes animation keyframes', () => {
    const html = buildPrototype({
      screens: basicScreens,
      navigationFlow: basicFlow,
    });

    expect(html).toContain('@keyframes fadeIn');
    expect(html).toContain('@keyframes slideLeft');
    expect(html).toContain('@keyframes slideUp');
  });
});
