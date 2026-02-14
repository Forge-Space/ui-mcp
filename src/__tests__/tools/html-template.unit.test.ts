import { generateHtmlProject } from '../../lib/templates/html.js';
import { designContextStore } from '../../lib/design-context.js';

describe('HTML template generation', () => {
  beforeEach(() => {
    designContextStore.reset();
  });

  it('generates HTML project with all required files', () => {
    const ctx = designContextStore.get();
    const files = generateHtmlProject('test-html', 'flat', 'none', ctx);

    expect(files.length).toBeGreaterThan(0);
    expect(files.some((f) => f.path.includes('index.html'))).toBe(true);
    expect(files.some((f) => f.path.includes('style.css'))).toBe(true);
    expect(files.some((f) => f.path.includes('main.js'))).toBe(true);
    expect(files.some((f) => f.path.includes('README.md'))).toBe(true);
  });

  it('includes design context CSS custom properties', () => {
    const ctx = designContextStore.get();
    const files = generateHtmlProject('test', 'flat', 'none', ctx);

    const css = files.find((f) => f.path.includes('style.css'));
    expect(css).toBeDefined();
    expect(css!.content).toContain('--color-primary');
    expect(css!.content).toContain('--color-background');
    expect(css!.content).toContain('--color-foreground');
  });

  it('generates accessible HTML with ARIA landmarks', () => {
    const ctx = designContextStore.get();
    const files = generateHtmlProject('test', 'flat', 'none', ctx);

    const html = files.find((f) => f.path.includes('index.html'));
    expect(html).toBeDefined();
    expect(html!.content).toContain('role="banner"');
    expect(html!.content).toContain('role="main"');
    expect(html!.content).toContain('role="contentinfo"');
    expect(html!.content).toContain('aria-label');
    expect(html!.content).toContain('lang="en"');
    expect(html!.content).toContain('skip-link');
  });

  it('includes dark mode support via prefers-color-scheme', () => {
    const ctx = designContextStore.get();
    const files = generateHtmlProject('test', 'flat', 'none', ctx);

    const css = files.find((f) => f.path.includes('style.css'));
    expect(css).toBeDefined();
    expect(css!.content).toContain('prefers-color-scheme: dark');
  });

  it('uses project name in HTML title and content', () => {
    const ctx = designContextStore.get();
    const files = generateHtmlProject('my-awesome-site', 'flat', 'none', ctx);

    const html = files.find((f) => f.path.includes('index.html'));
    expect(html).toBeDefined();
    expect(html!.content).toContain('<title>my-awesome-site</title>');
    expect(html!.content).toContain('my-awesome-site');
  });

  it('includes vanilla JS with no dependencies', () => {
    const ctx = designContextStore.get();
    const files = generateHtmlProject('test', 'flat', 'none', ctx);

    const js = files.find((f) => f.path.includes('main.js'));
    expect(js).toBeDefined();
    expect(js!.content).toContain('use strict');
    expect(js!.content).not.toContain('import ');
    expect(js!.content).not.toContain('require(');
  });
});
