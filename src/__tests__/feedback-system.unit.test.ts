import { getMemoryDatabase } from '../lib/design-references/database/store.js';
import {
  classifyPromptPair,
  classifyPromptText,
} from '../lib/feedback/prompt-classifier.js';
import {
  extractSkeleton,
  hashSkeleton,
  fingerprint,
  isPromotable,
} from '../lib/feedback/pattern-detector.js';
import {
  recordGeneration,
  recordExplicitFeedback,
  getFeedbackCount,
  getFeedbackStats,
  clearSessionCache,
} from '../lib/feedback/feedback-tracker.js';
import type { IGeneration, ICodePattern } from '../lib/feedback/types.js';
import type Database from 'better-sqlite3';

// ── Helpers ────────────────────────────────────────────────

function makeGeneration(overrides: Partial<IGeneration> = {}): IGeneration {
  return {
    id: overrides.id ?? 'gen-fixed-0001',
    tool: overrides.tool ?? 'generate_ui_component',
    params: overrides.params ?? {},
    componentType: overrides.componentType ?? 'button',
    framework: overrides.framework ?? 'react',
    outputHash: overrides.outputHash ?? '',
    timestamp: overrides.timestamp ?? 1672531200000,
    sessionId: overrides.sessionId ?? 'test-session',
  };
}

// ── Prompt Classifier ──────────────────────────────────────

describe('prompt-classifier', () => {
  describe('classifyPromptPair', () => {
    it('detects new task (different component type)', () => {
      const prev = makeGeneration({ componentType: 'button', timestamp: Date.now() - 60000 });
      const curr = makeGeneration({ componentType: 'card', timestamp: Date.now() });

      const result = classifyPromptPair(prev, curr);
      expect(result.signals.length).toBeGreaterThanOrEqual(1);

      const newTask = result.signals.find((s) => s.type === 'new_task');
      expect(newTask).toBeDefined();
      expect(newTask!.score).toBe(1.0);
      expect(result.combinedScore).toBeGreaterThan(0);
    });

    it('detects positive keywords', () => {
      const prev = makeGeneration({ timestamp: Date.now() - 60000 });
      const curr = makeGeneration({ componentType: 'hero', timestamp: Date.now() });

      const result = classifyPromptPair(prev, curr, 'perfect, that looks great!');
      const praise = result.signals.find((s) => s.type === 'praise');
      expect(praise).toBeDefined();
      expect(praise!.score).toBe(2.0);
    });

    it('detects negative keywords', () => {
      const prev = makeGeneration({ timestamp: Date.now() - 60000 });
      const curr = makeGeneration({ componentType: 'hero', timestamp: Date.now() });

      const result = classifyPromptPair(prev, curr, 'redo this completely, wrong style');
      const redo = result.signals.find((s) => s.type === 'major_redo');
      expect(redo).toBeDefined();
      expect(redo!.score).toBe(-1.0);
    });

    it('detects tweak keywords', () => {
      const prev = makeGeneration({ timestamp: Date.now() - 60000 });
      const curr = makeGeneration({ timestamp: Date.now() });

      const result = classifyPromptPair(prev, curr, 'make it slightly darker');
      const tweak = result.signals.find((s) => s.type === 'minor_tweak');
      expect(tweak).toBeDefined();
      expect(tweak!.score).toBe(0.5);
    });

    it('detects rapid follow-up', () => {
      const now = Date.now();
      const prev = makeGeneration({ timestamp: now - 10000 }); // 10s ago
      const curr = makeGeneration({ timestamp: now });

      const result = classifyPromptPair(prev, curr);
      const rapid = result.signals.find((s) => s.type === 'rapid_followup');
      expect(rapid).toBeDefined();
      expect(rapid!.score).toBe(-0.3);
    });

    it('detects long time gap (accepted)', () => {
      const now = Date.now();
      const prev = makeGeneration({ timestamp: now - 600000 }); // 10 min ago
      const curr = makeGeneration({ componentType: 'card', timestamp: now });

      const result = classifyPromptPair(prev, curr);
      const gap = result.signals.find((s) => s.type === 'time_gap');
      expect(gap).toBeDefined();
      expect(gap!.score).toBe(0.8);
    });

    it('returns empty signals for normal workflow', () => {
      const now = Date.now();
      const prev = makeGeneration({ timestamp: now - 60000 }); // 1 min ago
      const curr = makeGeneration({ timestamp: now }); // same type, no keywords

      const result = classifyPromptPair(prev, curr);
      // May have same-params iteration signal, but should be neutral
      expect(result.combinedScore).toBeLessThanOrEqual(0.5);
    });
  });

  describe('classifyPromptText', () => {
    it('detects positive text', () => {
      const result = classifyPromptText('looks good, ship it');
      expect(result.combinedScore).toBeGreaterThan(0);
    });

    it('detects negative text', () => {
      const result = classifyPromptText('this is wrong, try again');
      expect(result.combinedScore).toBeLessThan(0);
    });

    it('returns zero for neutral text', () => {
      const result = classifyPromptText('generate a button component');
      expect(result.combinedScore).toBe(0);
      expect(result.signals.length).toBe(0);
    });
  });
});

// ── Pattern Detector ───────────────────────────────────────

describe('pattern-detector', () => {
  describe('extractSkeleton', () => {
    it('extracts tag hierarchy', () => {
      const code = '<div><h2>Title</h2><p>Body</p><button>CTA</button></div>';
      const skeleton = extractSkeleton(code);
      expect(skeleton).toContain('div');
      expect(skeleton).toContain('h2[heading]');
      expect(skeleton).toContain('p[body]');
      expect(skeleton).toContain('button[button]');
    });

    it('handles self-closing tags', () => {
      const code = '<div><img src="test.png" /><br/></div>';
      const skeleton = extractSkeleton(code);
      expect(skeleton).toContain('img[media]');
    });

    it('handles semantic HTML elements', () => {
      const code = '<section><header><nav>Nav</nav></header><main>Content</main><footer>Foot</footer></section>';
      const skeleton = extractSkeleton(code);
      expect(skeleton).toContain('section[section]');
      expect(skeleton).toContain('header[header]');
      expect(skeleton).toContain('nav[navigation]');
    });

    it('returns "empty" for empty code', () => {
      expect(extractSkeleton('')).toBe('empty');
    });

    it('strips comments', () => {
      const code = '<!-- comment --><div><!-- another --><p>text</p></div>';
      const skeleton = extractSkeleton(code);
      expect(skeleton).not.toContain('comment');
      expect(skeleton).toContain('p[body]');
    });
  });

  describe('hashSkeleton', () => {
    it('produces consistent hashes', () => {
      expect(hashSkeleton('div>h2+p+button')).toBe(hashSkeleton('div>h2+p+button'));
    });

    it('produces different hashes for different skeletons', () => {
      expect(hashSkeleton('div>h2+p')).not.toBe(hashSkeleton('div>h2+button'));
    });

    it('returns 16-char hex string', () => {
      const hash = hashSkeleton('test');
      expect(hash.length).toBe(16);
      expect(/^[a-f0-9]+$/.test(hash)).toBe(true);
    });
  });

  describe('fingerprint', () => {
    it('returns both skeleton and hash', () => {
      const result = fingerprint('<div><h2>Hello</h2></div>');
      expect(result.skeleton).toBeTruthy();
      expect(result.hash).toBeTruthy();
      expect(result.hash.length).toBe(16);
    });
  });

  describe('isPromotable', () => {
    it('returns true for high-quality, frequent patterns', () => {
      const pattern: ICodePattern = {
        id: 'p1',
        skeletonHash: 'abc123',
        skeleton: 'div>h2+p',
        snippet: '<div>...</div>',
        frequency: 5,
        avgScore: 0.8,
        promoted: false,
      };
      expect(isPromotable(pattern)).toBe(true);
    });

    it('returns false for low frequency', () => {
      const pattern: ICodePattern = {
        id: 'p2',
        skeletonHash: 'abc123',
        skeleton: 'div>h2+p',
        snippet: '<div>...</div>',
        frequency: 1,
        avgScore: 0.8,
        promoted: false,
      };
      expect(isPromotable(pattern)).toBe(false);
    });

    it('returns false for low score', () => {
      const pattern: ICodePattern = {
        id: 'p3',
        skeletonHash: 'abc123',
        skeleton: 'div>h2+p',
        snippet: '<div>...</div>',
        frequency: 5,
        avgScore: 0.2,
        promoted: false,
      };
      expect(isPromotable(pattern)).toBe(false);
    });

    it('returns false for already promoted', () => {
      const pattern: ICodePattern = {
        id: 'p4',
        skeletonHash: 'abc123',
        skeleton: 'div>h2+p',
        snippet: '<div>...</div>',
        frequency: 5,
        avgScore: 0.8,
        promoted: true,
      };
      expect(isPromotable(pattern)).toBe(false);
    });
  });
});

// ── Feedback Tracker ───────────────────────────────────────

describe('feedback-tracker', () => {
  let db: Database.Database;

  beforeEach(() => {
    db = getMemoryDatabase();
    clearSessionCache();
  });

  afterEach(() => {
    if (db) {
      db.close();
    }
  });

  it('recordGeneration stores without error', () => {
    const gen = makeGeneration();
    expect(() => recordGeneration(gen, '<button>Click</button>', db)).not.toThrow();
  });

  it('recordGeneration derives implicit feedback on second call', () => {
    const gen1 = makeGeneration({ id: 'gen-1', componentType: 'button', timestamp: Date.now() - 60000 });
    recordGeneration(gen1, '<button>Click</button>', db);

    const gen2 = makeGeneration({ id: 'gen-2', componentType: 'card', timestamp: Date.now() });
    const { implicitFeedback } = recordGeneration(gen2, '<div>Card</div>', db);

    expect(implicitFeedback).toBeDefined();
    expect(implicitFeedback!.generationId).toBe('gen-1');
    expect(implicitFeedback!.source).toBe('implicit');
    expect(implicitFeedback!.score).toBeGreaterThan(0); // New task = positive
  });

  it('recordGeneration does not derive feedback on first call', () => {
    const gen = makeGeneration();
    const { implicitFeedback } = recordGeneration(gen, '<button>Click</button>', db);
    expect(implicitFeedback).toBeUndefined();
  });

  it('recordExplicitFeedback stores positive feedback', () => {
    const feedback = recordExplicitFeedback('gen-1', 'positive', db, 'Looks great');
    expect(feedback.rating).toBe('positive');
    expect(feedback.score).toBe(1.5);
    expect(feedback.confidence).toBe(1.0);
    expect(getFeedbackCount(db)).toBe(1);
  });

  it('recordExplicitFeedback stores negative feedback', () => {
    const feedback = recordExplicitFeedback('gen-1', 'negative', db);
    expect(feedback.rating).toBe('negative');
    expect(feedback.score).toBe(-1.0);
    expect(getFeedbackCount(db)).toBe(1);
  });

  it('getFeedbackStats returns correct counts', () => {
    recordExplicitFeedback('gen-1', 'positive', db);
    recordExplicitFeedback('gen-2', 'negative', db);
    recordExplicitFeedback('gen-3', 'positive', db);

    const stats = getFeedbackStats(db);
    expect(stats.total).toBe(3);
    expect(stats.explicit).toBe(3);
    expect(stats.implicit).toBe(0);
    expect(stats.positive).toBe(2);
    expect(stats.negative).toBe(1);
  });

  it('implicit feedback from prompt context keywords', () => {
    const gen1 = makeGeneration({ id: 'gen-kw-1', timestamp: Date.now() - 60000 });
    recordGeneration(gen1, '<button>Click</button>', db);

    const gen2 = makeGeneration({ id: 'gen-kw-2', componentType: 'hero', timestamp: Date.now() });
    const { implicitFeedback } = recordGeneration(gen2, '<section>Hero</section>', db, 'perfect, that looks great!');

    expect(implicitFeedback).toBeDefined();
    expect(implicitFeedback!.score).toBeGreaterThan(0);
  });
});
