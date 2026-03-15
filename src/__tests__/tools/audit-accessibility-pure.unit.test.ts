import { describe, it, expect } from '@jest/globals';
import { auditAccessibility } from '../../tools/audit-accessibility.js';

// All tests exercise auditAccessibility() which drives all the private check functions.
// This covers the previously-uncovered pure functions:
//   checkImageAlt, checkFormLabels, checkButtonNames, checkLandmarks,
//   checkHeadingHierarchy, checkLinks, checkColorContrast, checkFocusManagement,
//   checkAriaUsage, checkKeyboardAccess, checkLangAttribute, checkAutoPlay, checkStrictMode

describe('auditAccessibility pure functions', () => {
  // ── checkImageAlt ──────────────────────────────────────────────────────────
  describe('checkImageAlt', () => {
    it('reports error for img without alt', () => {
      const r = auditAccessibility('<img src="photo.jpg">', 'html', false);
      expect(r.issues.some((i) => i.rule === 'img-alt')).toBe(true);
    });

    it('passes when all imgs have alt', () => {
      const r = auditAccessibility('<img src="photo.jpg" alt="A cat">', 'html', false);
      expect(r.issues.some((i) => i.rule === 'img-alt')).toBe(false);
      expect(r.passed.some((p) => p.toLowerCase().includes('alt'))).toBe(true);
    });

    it('reports error for decorative img with empty alt and role=img', () => {
      const r = auditAccessibility('<img src="x.png" alt="" role="img">', 'html', false);
      expect(r.issues.some((i) => i.rule === 'img-alt')).toBe(true);
    });
  });

  // ── checkFormLabels ────────────────────────────────────────────────────────
  describe('checkFormLabels', () => {
    it('reports error for unlabeled input (html)', () => {
      const r = auditAccessibility('<input type="text" id="name">', 'html', false);
      expect(r.issues.some((i) => i.rule === 'input-label')).toBe(true);
    });

    it('passes for input with matching label htmlFor (react)', () => {
      const code = '<label htmlFor="email">Email</label><input id="email" type="email">';
      const r = auditAccessibility(code, 'react', false);
      expect(r.issues.some((i) => i.rule === 'input-label')).toBe(false);
    });

    it('passes for input with aria-label', () => {
      const r = auditAccessibility('<input type="text" aria-label="Search">', 'html', false);
      expect(r.issues.some((i) => i.rule === 'input-label')).toBe(false);
    });

    it('reports orphaned label with htmlFor pointing to missing id', () => {
      const code = '<label htmlFor="ghost">Name</label>';
      const r = auditAccessibility(code, 'react', false);
      expect(r.issues.some((i) => i.rule === 'label-orphan')).toBe(true);
    });
  });

  // ── checkButtonNames ───────────────────────────────────────────────────────
  describe('checkButtonNames', () => {
    it('reports error for empty button', () => {
      const r = auditAccessibility('<button></button>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'button-name')).toBe(true);
    });

    it('passes for button with text content', () => {
      const r = auditAccessibility('<button>Submit</button>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'button-name')).toBe(false);
      expect(r.passed.some((p) => p.includes('button'))).toBe(true);
    });

    it('passes for button with aria-label', () => {
      const r = auditAccessibility('<button aria-label="Close dialog"></button>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'button-name')).toBe(false);
    });
  });

  // ── checkLandmarks ─────────────────────────────────────────────────────────
  describe('checkLandmarks', () => {
    it('warns about missing main on long code', () => {
      const code = `<div>${'<p>content</p>'.repeat(40)}</div>`;
      const r = auditAccessibility(code, 'html', false);
      expect(r.issues.some((i) => i.rule === 'landmark-main')).toBe(true);
    });

    it('passes when main element is present', () => {
      const r = auditAccessibility('<main><p>Content</p></main>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'landmark-main')).toBe(false);
    });

    it('warns about multiple unlabeled nav elements', () => {
      const code = '<nav><a href="/">Home</a></nav><nav><a href="/about">About</a></nav>';
      const r = auditAccessibility(code, 'html', false);
      expect(r.issues.some((i) => i.rule === 'nav-label')).toBe(true);
    });

    it('passes for single nav without aria-label', () => {
      const r = auditAccessibility('<nav><a href="/">Home</a></nav>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'nav-label')).toBe(false);
      expect(r.passed.some((p) => p.includes('landmark'))).toBe(true);
    });
  });

  // ── checkHeadingHierarchy ──────────────────────────────────────────────────
  describe('checkHeadingHierarchy', () => {
    it('warns about missing heading in long code', () => {
      const code = `<div>${'<p>paragraph</p>'.repeat(25)}</div>`;
      const r = auditAccessibility(code, 'html', false);
      expect(r.issues.some((i) => i.rule === 'heading-present')).toBe(true);
    });

    it('warns about skipped heading level', () => {
      const r = auditAccessibility('<h1>Title</h1><h3>Subtitle</h3>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'heading-order')).toBe(true);
    });

    it('warns about multiple h1', () => {
      const r = auditAccessibility('<h1>First</h1><h2>Sub</h2><h1>Second</h1>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'heading-one-h1')).toBe(true);
    });

    it('passes for sequential headings', () => {
      const r = auditAccessibility('<h1>Title</h1><h2>Section</h2><h3>Sub</h3>', 'html', false);
      expect(r.issues.some((i) => ['heading-order', 'heading-one-h1', 'heading-present'].includes(i.rule))).toBe(false);
      expect(r.passed.some((p) => p.includes('heading'))).toBe(true);
    });
  });

  // ── checkLinks ─────────────────────────────────────────────────────────────
  describe('checkLinks', () => {
    it('flags hash-only href links as info', () => {
      const r = auditAccessibility('<a href="#">Click</a>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'link-valid-href')).toBe(true);
      expect(r.issues.find((i) => i.rule === 'link-valid-href')?.severity).toBe('info');
    });

    it('flags generic link text', () => {
      const r = auditAccessibility('<a href="/about">click here</a>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'link-text')).toBe(true);
    });

    it('passes for descriptive link text', () => {
      const r = auditAccessibility('<a href="/about">Learn about our company</a>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'link-text')).toBe(false);
      expect(r.passed.some((p) => p.includes('ink'))).toBe(true);
    });
  });

  // ── checkColorContrast ─────────────────────────────────────────────────────
  describe('checkColorContrast', () => {
    it('flags text-gray-300 as low contrast', () => {
      const r = auditAccessibility('<p className="text-gray-300">Light text</p>', 'react', false);
      expect(r.issues.some((i) => i.rule === 'color-contrast')).toBe(true);
    });

    it('does not flag dark mode overrides', () => {
      const code = '<p className="text-gray-400 dark:text-white">Content</p>';
      const r = auditAccessibility(code, 'react', false);
      expect(r.issues.some((i) => i.rule === 'color-contrast')).toBe(false);
    });
  });

  // ── checkFocusManagement ───────────────────────────────────────────────────
  describe('checkFocusManagement', () => {
    it('flags positive tabindex', () => {
      const r = auditAccessibility('<div tabindex="1">Item</div>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'tabindex-positive')).toBe(true);
    });

    it('does not flag tabindex=0', () => {
      const r = auditAccessibility('<div tabindex="0" role="button">Item</div>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'tabindex-positive')).toBe(false);
    });

    it('flags missing focus styles on interactive elements', () => {
      const code = '<button class="bg-blue-500 text-white">Click</button>'.repeat(3);
      const r = auditAccessibility(code, 'html', false);
      expect(r.issues.some((i) => i.rule === 'focus-visible')).toBe(true);
    });

    it('passes when focus-visible styles present', () => {
      const code = '<button class="focus-visible:ring-2 bg-blue-500">Click</button>';
      const r = auditAccessibility(code, 'html', false);
      expect(r.issues.some((i) => i.rule === 'focus-visible')).toBe(false);
    });
  });

  // ── checkAriaUsage ─────────────────────────────────────────────────────────
  describe('checkAriaUsage', () => {
    it('flags aria-labelledby referencing missing id', () => {
      const r = auditAccessibility('<div aria-labelledby="ghost-title">Content</div>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'aria-valid-ref')).toBe(true);
    });

    it('passes aria-labelledby with matching id', () => {
      const code = '<h2 id="modal-title">Modal</h2><div aria-labelledby="modal-title">Content</div>';
      const r = auditAccessibility(code, 'html', false);
      expect(r.issues.some((i) => i.rule === 'aria-valid-ref')).toBe(false);
    });

    it('flags dialog without aria-modal', () => {
      const r = auditAccessibility('<div role="dialog" aria-label="Settings">Content</div>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'dialog-aria')).toBe(true);
    });

    it('flags dialog without accessible name', () => {
      const r = auditAccessibility('<div role="dialog" aria-modal="true">Content</div>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'dialog-label')).toBe(true);
    });

    it('passes fully accessible dialog', () => {
      const code = '<div role="dialog" aria-modal="true" aria-labelledby="t"><h2 id="t">Title</h2></div>';
      const r = auditAccessibility(code, 'html', false);
      expect(r.issues.some((i) => ['dialog-aria', 'dialog-label'].includes(i.rule))).toBe(false);
      expect(r.passed.some((p) => p.includes('Dialog'))).toBe(true);
    });
  });

  // ── checkKeyboardAccess ────────────────────────────────────────────────────
  describe('checkKeyboardAccess', () => {
    it('flags div with onClick but no keyboard handler', () => {
      const r = auditAccessibility('<div onClick={handleClick}>Item</div>', 'react', false);
      expect(r.issues.some((i) => i.rule === 'click-keyboard')).toBe(true);
    });

    it('passes div with onClick and role=button', () => {
      const code = '<div onClick={handleClick} role="button" onKeyDown={handleKey}>Item</div>';
      const r = auditAccessibility(code, 'react', false);
      expect(r.issues.some((i) => i.rule === 'click-keyboard')).toBe(false);
    });

    it('passes when no onClick at all', () => {
      const r = auditAccessibility('<div class="container">Content</div>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'click-keyboard')).toBe(false);
      expect(r.passed.some((p) => p.includes('keyboard'))).toBe(true);
    });
  });

  // ── checkAutoPlay ──────────────────────────────────────────────────────────
  describe('checkAutoPlay', () => {
    it('flags autoplay attribute', () => {
      const r = auditAccessibility('<video autoplay src="vid.mp4"></video>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'no-autoplay')).toBe(true);
    });

    it('passes without autoplay', () => {
      const r = auditAccessibility('<video controls src="vid.mp4"></video>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'no-autoplay')).toBe(false);
    });
  });

  // ── strict mode ───────────────────────────────────────────────────────────
  describe('strict mode (WCAG AAA)', () => {
    it('adds AAA checks when strict=true', () => {
      const r = auditAccessibility('<div>Some content</div>', 'html', true);
      expect(r.issues.some((i) => i.rule === 'text-spacing')).toBe(true);
    });

    it('flags muted text colors in strict mode', () => {
      const code = '<p class="text-muted-foreground">Hint text</p>';
      const r = auditAccessibility(code, 'html', true);
      expect(r.issues.some((i) => i.rule === 'contrast-enhanced')).toBe(true);
    });

    it('flags small padding targets in strict mode', () => {
      const code = '<button class="p-1">X</button>';
      const r = auditAccessibility(code, 'html', true);
      expect(r.issues.some((i) => i.rule === 'target-size')).toBe(true);
    });

    it('does not add AAA checks when strict=false', () => {
      const r = auditAccessibility('<div>Some content</div>', 'html', false);
      expect(r.issues.some((i) => i.rule === 'text-spacing')).toBe(false);
    });
  });

  // ── score and summary ──────────────────────────────────────────────────────
  describe('score calculation', () => {
    it('returns 100 score for fully accessible component', () => {
      const code = `
        <main>
          <h1>Title</h1>
          <img src="photo.jpg" alt="A descriptive alt text">
          <button class="focus-visible:ring-2">Submit</button>
          <a href="/about">Learn about us</a>
        </main>`;
      const r = auditAccessibility(code, 'html', false);
      expect(r.score).toBe(100);
    });

    it('returns score < 100 for inaccessible component', () => {
      const r = auditAccessibility('<img src="x.png"><button></button>', 'html', false);
      expect(r.score).toBeLessThan(100);
    });

    it('summary counts errors and warnings correctly', () => {
      const code = '<img src="x.png"><button></button>';
      const r = auditAccessibility(code, 'html', false);
      const errorCount = r.issues.filter((i) => i.severity === 'error').length;
      const warnCount = r.issues.filter((i) => i.severity === 'warning').length;
      expect(r.summary.errors).toBe(errorCount);
      expect(r.summary.warnings).toBe(warnCount);
    });

    it('framework nextjs uses className and htmlFor', () => {
      const code = '<label htmlFor="name">Name</label><input id="name" className="input">';
      const r = auditAccessibility(code, 'nextjs', false);
      expect(r.issues.some((i) => i.rule === 'input-label')).toBe(false);
    });
  });
});
