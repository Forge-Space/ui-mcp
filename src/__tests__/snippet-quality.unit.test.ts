import { getAllSnippets } from '../lib/design-references/component-registry/index.js';
import { initializeRegistry, resetInitialization } from '../lib/design-references/component-registry/init.js';
import { validateSnippet } from '../lib/quality/anti-generic-rules.js';

const KNOWN_PREEXISTING = new Set([
  'auth-login-card',
  'auth-signup-card',
  'auth-forgot-password',
  'auth-email-verify',
  'dashboard-data-table',
  'data-table-inline-edit',
  'data-table-sortable',
  'form-login',
  'list-checkbox',
  'list-timeline',
  'list-tree',
  'modal-dialog',
  'pricing-toggle-annual',
  'sidebar-default',
  'stat-card',
  'stat-comparison',
  'stat-sparkline',
  'stat-trend',
  'testimonial-carousel',
  'testimonial-grid',
]);

describe('all registered snippets pass quality validation', () => {
  beforeAll(() => {
    resetInitialization();
    initializeRegistry();
  });

  it('registry is populated', () => {
    const snippets = getAllSnippets();
    expect(snippets.length).toBeGreaterThan(0);
  });

  it('no new snippet has validation errors (excluding known pre-existing)', () => {
    const snippets = getAllSnippets();
    const failures: { id: string; errors: string[] }[] = [];

    for (const snippet of snippets) {
      if (KNOWN_PREEXISTING.has(snippet.id)) continue;
      const result = validateSnippet(snippet);
      if (!result.valid) {
        failures.push({ id: snippet.id, errors: result.errors });
      }
    }

    if (failures.length > 0) {
      const report = failures.map((f) => `  ${f.id}: ${f.errors.join('; ')}`).join('
');
      throw new Error(`${failures.length} snippet(s) failed quality validation:
${report}`);
    }

    expect(failures).toHaveLength(0);
  });

  it('fixed snippets specifically pass validation', () => {
    const fixedIds = [
      'avatar-with-status',
      'badge-success',
      'badge-warning',
      'badge-error',
      'badge-dot',
      'badge-outline',
      'inventory-badge',
      'status-dot',
      'status-pill',
      'status-notification-count',
      'status-online-offline',
      'card-stats',
      'alert-info',
      'alert-destructive',
      'hero-split',
      'heading-h2',
      'heading-h3',
    ];
    const snippets = getAllSnippets();
    const failures: { id: string; errors: string[] }[] = [];

    for (const id of fixedIds) {
      const snippet = snippets.find((s) => s.id === id);
      if (!snippet) continue;
      const result = validateSnippet(snippet);
      if (!result.valid) {
        failures.push({ id, errors: result.errors });
      }
    }

    if (failures.length > 0) {
      const report = failures.map((f) => `  ${f.id}: ${f.errors.join('; ')}`).join('
');
      throw new Error(`${failures.length} fixed snippet(s) regressed:
${report}`);
    }

    expect(failures).toHaveLength(0);
  });
});
