const mockBuffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]);

// Configurable overrides for per-test scenarios
export interface SharpMockConfig {
  toBufferData?: Buffer;
  toBufferInfo?: { width: number; height: number; channels: number; size: number };
  toBufferThrow?: boolean;
  /** Per-call response queue. Each call pops the next entry. Falls back to toBufferData after queue exhausted. */
  toBufferQueue?: Array<{
    data?: Buffer;
    info?: { width: number; height: number; channels: number; size: number };
    throw?: boolean;
  }>;
}

let _config: SharpMockConfig = {};
let _callCount = 0;

export function setSharpMockConfig(config: SharpMockConfig): void {
  _config = config;
  _callCount = 0;
}

export function resetSharpMockConfig(): void {
  _config = {};
  _callCount = 0;
}

const mockInstance = (): Record<string, unknown> => {
  const self: Record<string, unknown> = {};
  const chain = () => self;
  self.metadata = async () => ({
    width: 100,
    height: 100,
    channels: 3,
    format: 'png',
  });
  self.raw = chain;
  self.png = chain;
  self.jpeg = chain;
  self.webp = chain;
  self.resize = chain;
  self.extract = chain;
  self.flatten = chain;
  self.negate = chain;
  self.normalise = chain;
  self.normalize = chain;
  self.removeAlpha = chain;
  self.ensureAlpha = chain;
  self.toBuffer = async (opts?: { resolveWithObject?: boolean }) => {
    const callIdx = _callCount++;

    // Check per-call queue first
    if (_config.toBufferQueue && callIdx < _config.toBufferQueue.length) {
      const entry = _config.toBufferQueue[callIdx]!;
      if (entry.throw) {
        throw new Error('sharp processing failed');
      }
      if (opts?.resolveWithObject) {
        return {
          data: entry.data ?? Buffer.alloc(100 * 100 * 3, 128),
          info: entry.info ?? { width: 100, height: 100, channels: 3, size: 30000 },
        };
      }
      return entry.data ?? mockBuffer;
    }

    // Fall back to global config
    if (_config.toBufferThrow) {
      throw new Error('sharp processing failed');
    }
    if (opts?.resolveWithObject) {
      return {
        data: _config.toBufferData ?? Buffer.alloc(100 * 100 * 3, 128),
        info: _config.toBufferInfo ?? { width: 100, height: 100, channels: 3, size: 30000 },
      };
    }
    return _config.toBufferData ?? mockBuffer;
  };
  self.toFile = async () => ({ width: 100, height: 100, channels: 3, size: 9 });
  self.stats = async () => ({
    channels: [
      { min: 0, max: 255, sum: 12750, squaresSum: 650250, mean: 128, stdev: 50 },
      { min: 0, max: 255, sum: 12750, squaresSum: 650250, mean: 128, stdev: 50 },
      { min: 0, max: 255, sum: 12750, squaresSum: 650250, mean: 128, stdev: 50 },
    ],
  });
  return self;
};

const mockSharp = Object.assign((_input?: unknown, _options?: unknown) => mockInstance(), {
  cache: () => {},
  concurrency: () => 0,
  simd: () => false,
});

export default mockSharp;
