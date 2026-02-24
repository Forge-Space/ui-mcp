import { loadConfig, getConfig, safeJSONParse, type Config } from '../../lib/config.js';
import { ConfigNotInitializedError } from '../../lib/errors/config.error.js';

describe('config', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('loadConfig', () => {
    it('loads configuration from environment', () => {
      process.env.NODE_ENV = 'test';
      process.env.LOG_LEVEL = 'info';
      const config = loadConfig();

      expect(config).toBeDefined();
      expect(config.NODE_ENV).toBe('test');
      expect(config.LOG_LEVEL).toBe('info');
    });

    it('uses default values', () => {
      const config = loadConfig();

      expect(config.NODE_ENV).toBeDefined();
      expect(config.LOG_LEVEL).toBeDefined();
    });

    it('caches loaded configuration', () => {
      const config1 = loadConfig();
      const config2 = loadConfig();

      expect(config1).toBe(config2);
    });

    it('validates NODE_ENV enum', () => {
      process.env.NODE_ENV = 'development';
      expect(() => loadConfig()).not.toThrow();

      process.env.NODE_ENV = 'production';
      expect(() => loadConfig()).not.toThrow();

      process.env.NODE_ENV = 'test';
      expect(() => loadConfig()).not.toThrow();
    });

    it('validates LOG_LEVEL enum', () => {
      process.env.LOG_LEVEL = 'debug';
      expect(() => loadConfig()).not.toThrow();

      process.env.LOG_LEVEL = 'info';
      expect(() => loadConfig()).not.toThrow();

      process.env.LOG_LEVEL = 'warn';
      expect(() => loadConfig()).not.toThrow();

      process.env.LOG_LEVEL = 'error';
      expect(() => loadConfig()).not.toThrow();
    });
  });

  describe('getConfig', () => {
    it('returns loaded config', () => {
      loadConfig();
      const config = getConfig();

      expect(config).toBeDefined();
      expect(config).toHaveProperty('NODE_ENV');
      expect(config).toHaveProperty('LOG_LEVEL');
    });

    it('returns config after load', () => {
      loadConfig();
      expect(() => getConfig()).not.toThrow();
    });
  });

  describe('safeJSONParse', () => {
    it('parses valid JSON', () => {
      const json = '{"name": "test", "value": 123}';
      const result = safeJSONParse(json);

      expect(result).toEqual({ name: 'test', value: 123 });
    });

    it('returns default value for invalid JSON', () => {
      const json = '{invalid}';
      const defaultValue = { fallback: true };
      const result = safeJSONParse(json, defaultValue);

      expect(result).toEqual(defaultValue);
    });

    it('returns default for null input', () => {
      const defaultValue = { fallback: true };
      const result = safeJSONParse(null, defaultValue);

      expect(result).toEqual(defaultValue);
    });

    it('returns default for undefined input', () => {
      const defaultValue = { fallback: true };
      const result = safeJSONParse(undefined, defaultValue);

      expect(result).toEqual(defaultValue);
    });

    it('returns empty object when no default provided', () => {
      const result = safeJSONParse(null);

      expect(result).toEqual({});
    });

    it('handles complex nested objects', () => {
      const json = '{"user": {"name": "John", "age": 30, "tags": ["a", "b"]}}';
      const result = safeJSONParse(json);

      expect(result).toEqual({
        user: {
          name: 'John',
          age: 30,
          tags: ['a', 'b'],
        },
      });
    });

    it('handles arrays', () => {
      const json = '[1, 2, 3, 4]';
      const result = safeJSONParse(json, []);

      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('handles empty string', () => {
      const result = safeJSONParse('', { default: 'value' });

      expect(result).toEqual({ default: 'value' });
    });
  });
});
