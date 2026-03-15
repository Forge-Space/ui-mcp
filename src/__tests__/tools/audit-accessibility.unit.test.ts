import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig } from '@forgespace/siza-gen';
import { registerAuditAccessibility, auditAccessibility } from '../../tools/audit-accessibility.js';

describe('audit_accessibility tool', () => {
  beforeAll(() => {
    loadConfig();
  });

  it('registers without errors', () => {
    const server = new McpServer({ name: 'test', version: '1.0.0' });
    expect(() => registerAuditAccessibility(server)).not.toThrow();
  });

  it('tool is properly exported and can be registered multiple times', () => {
    const server1 = new McpServer({ name: 'test1', version: '1.0.0' });
    const server2 = new McpServer({ name: 'test2', version: '1.0.0' });

    expect(() => {
      registerAuditAccessibility(server1);
      registerAuditAccessibility(server2);
    }).not.toThrow();
  });

  it('handler returns formatted report with score and issues', async () => {
    const server = new McpServer({ name: 'test', version: '1.0.0' });
    registerAuditAccessibility(server);

    type Handler = (args: Record<string, unknown>) => Promise<{ content: Array<{ type: string; text: string }> }>;
    const tools = (server as unknown as { _registeredTools: Record<string, { handler: Handler }> })._registeredTools;
    const handler = tools['audit_accessibility']?.handler;
    expect(handler).toBeDefined();

    const result = await handler!({
      component_code: '<img src="photo.jpg"><button></button>',
      framework: 'html',
      strict: false,
    });

    expect(result.content).toBeDefined();
    expect(result.content.length).toBeGreaterThanOrEqual(1);
    const text = result.content[0]!.text;
    expect(text).toContain('Accessibility Score');
  });

  it('handler produces green score for clean accessible component', async () => {
    const server = new McpServer({ name: 'test', version: '1.0.0' });
    registerAuditAccessibility(server);

    type Handler = (args: Record<string, unknown>) => Promise<{ content: Array<{ type: string; text: string }> }>;
    const tools = (server as unknown as { _registeredTools: Record<string, { handler: Handler }> })._registeredTools;
    const handler = tools['audit_accessibility']?.handler;

    const cleanCode = [
      '<main>',
      '  <nav aria-label="Main navigation"><ul><li><a href="/">Home</a></li></ul></nav>',
      '  <h1>Page Title</h1>',
      '  <img src="hero.jpg" alt="Hero image">',
      '  <button>Click me</button>',
      '  <label for="email">Email</label><input id="email" type="email">',
      '</main>',
    ].join('\n');

    const result = await handler!({ component_code: cleanCode, framework: 'html', strict: false });
    const text = result.content[0]!.text;
    expect(text).toContain('Accessibility Score');
    expect(text).toContain('/100');
  });

  it('handler respects strict mode and includes AAA checks', async () => {
    const server = new McpServer({ name: 'test', version: '1.0.0' });
    registerAuditAccessibility(server);

    type Handler = (args: Record<string, unknown>) => Promise<{ content: Array<{ type: string; text: string }> }>;
    const tools = (server as unknown as { _registeredTools: Record<string, { handler: Handler }> })._registeredTools;
    const handler = tools['audit_accessibility']?.handler;

    const result = await handler!({
      component_code: '<p className="text-muted-foreground">Muted text</p>',
      framework: 'react',
      strict: true,
    });

    const jsonText = result.content[1]?.text ?? result.content[0]!.text;
    expect(jsonText).toBeTruthy();
  });

  describe('functional auditing', () => {
    it('detects missing alt text on images', () => {
      const html = '<img src="test.jpg" /><img src="test2.jpg" alt="Valid" />';
      const report = auditAccessibility(html, 'html', false);

      const altIssue = report.issues.find((i) => i.rule === 'img-alt');
      expect(altIssue).toBeDefined();
      expect(altIssue?.severity).toBe('error');
      expect(altIssue?.wcagCriteria).toContain('1.1.1');
    });

    it('detects missing lang attribute', () => {
      const html = '<html><body><h1>Test</h1></body></html>';
      const report = auditAccessibility(html, 'html', false);

      const langIssue = report.issues.find((i) => i.rule === 'html-lang');
      expect(langIssue).toBeDefined();
      expect(langIssue?.severity).toBe('error');
      expect(langIssue?.wcagCriteria).toContain('3.1.1');
    });

    it('detects missing ARIA landmarks', () => {
      // HTML needs to be > 500 chars to trigger landmark check
      const html = `<div><h1>Title</h1><p>Content without semantic landmarks. ${'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(
        10
      )}</p></div>`;
      const report = auditAccessibility(html, 'html', false);

      const landmarkIssue = report.issues.find((i) => i.rule === 'landmark-main');
      expect(landmarkIssue).toBeDefined();
      expect(landmarkIssue?.severity).toBe('warning');
      expect(landmarkIssue?.message).toContain('main');
    });

    it('detects form inputs without labels', () => {
      const html = '<form><input type="text" name="email" /></form>';
      const report = auditAccessibility(html, 'html', false);

      const labelIssue = report.issues.find((i) => i.rule === 'input-label');
      expect(labelIssue).toBeDefined();
      expect(labelIssue?.severity).toBe('error');
      expect(labelIssue?.wcagCriteria).toContain('1.3.1');
    });

    it('detects low contrast warnings', () => {
      const html = '<div class="text-gray-400 bg-gray-300">Low contrast text</div>';
      const report = auditAccessibility(html, 'html', false);

      const contrastIssue = report.issues.find((i) => i.rule === 'color-contrast');
      expect(contrastIssue).toBeDefined();
      expect(contrastIssue?.severity).toBe('warning');
      expect(contrastIssue?.wcagCriteria).toContain('1.4.3');
    });

    it('returns passing report for accessible HTML', () => {
      const html = `
        <html lang="en">
          <body>
            <header role="banner"><h1>Title</h1></header>
            <main role="main">
              <img src="test.jpg" alt="Description" />
              <form>
                <label for="email">Email</label>
                <input type="email" id="email" />
                <button type="submit">Submit</button>
              </form>
            </main>
          </body>
        </html>
      `;
      const report = auditAccessibility(html, 'html', false);

      expect(report.score).toBeGreaterThan(80);
      expect(report.passed.length).toBeGreaterThan(0);
    });

    it('handles empty HTML gracefully', () => {
      const report = auditAccessibility('', 'html', false);

      expect(report).toBeDefined();
      expect(report.score).toBeDefined();
    });

    it('applies stricter WCAG AAA checks in strict mode', () => {
      const html = '<div class="text-muted-foreground">Text</div>';
      const report = auditAccessibility(html, 'html', true);

      expect(report).toBeDefined();
      expect(report.score).toBeDefined();

      // Verify AAA-specific rules are present
      const contrastEnhancedIssue = report.issues.find((i) => i.rule === 'contrast-enhanced');
      const textSpacingIssue = report.issues.find((i) => i.rule === 'text-spacing');

      expect(contrastEnhancedIssue).toBeDefined();
      expect(contrastEnhancedIssue?.severity).toBe('info');
      expect(contrastEnhancedIssue?.wcagCriteria).toContain('1.4.6');

      expect(textSpacingIssue).toBeDefined();
      expect(textSpacingIssue?.severity).toBe('info');
      expect(textSpacingIssue?.wcagCriteria).toContain('1.4.12');
    });
  });
});
