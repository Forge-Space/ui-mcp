import { loadConfig } from '../lib/config.js';
import { generateTemplate } from '../tools/generate-page-template.js';
import { designContextStore } from '../lib/design-context.js';
import { initializeRegistry, resetInitialization } from '../lib/design-references/component-registry/init.js';
import { getComposition, clearCompositions } from '../lib/design-references/template-compositions/index.js';
import type { PageTemplateType } from '../lib/types.js';

const ECOMMERCE_TYPES: PageTemplateType[] = ['ecommerce_plp', 'ecommerce_pdp', 'ecommerce_cart', 'ecommerce_checkout'];

describe('ecommerce compositions', () => {
  let ctx: ReturnType<typeof designContextStore.get>;

  beforeAll(() => {
    loadConfig();
  });

  beforeEach(() => {
    resetInitialization();
    initializeRegistry();
    ctx = designContextStore.get();
  });

  afterEach(() => {
    clearCompositions();
  });

  describe('registration', () => {
    it('registers all 4 ecommerce compositions', () => {
      expect(getComposition('ecommerce-storefront')).toBeDefined();
      expect(getComposition('ecommerce-product-detail')).toBeDefined();
      expect(getComposition('ecommerce-cart')).toBeDefined();
      expect(getComposition('ecommerce-checkout')).toBeDefined();
    });

    it('checkout composition has correct metadata', () => {
      const checkout = getComposition('ecommerce-checkout');
      expect(checkout).toBeDefined();
      expect(checkout!.templateType).toBe('ecommerce_checkout');
      expect(checkout!.layout).toBe('split');
      expect(checkout!.mood).toContain('professional');
      expect(checkout!.industry).toContain('ecommerce');
      expect(checkout!.sections).toHaveLength(5);
    });
  });

  describe('ML-powered generation', () => {
    it.each(ECOMMERCE_TYPES)('%s generates files with ML options', async (templateType) => {
      const files = await generateTemplate(templateType, 'react', 'none', false, 'TestShop', ctx, {
        mood: 'professional',
        industry: 'ecommerce',
      });

      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].content).toBeTruthy();
    });
  });

  describe('hardcoded fallback', () => {
    it.each(ECOMMERCE_TYPES)('%s generates files without ML options', async (templateType) => {
      const files = await generateTemplate(templateType, 'react', 'none', false, 'TestShop', ctx);

      expect(files).toBeDefined();
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].content).toBeTruthy();
    });
  });

  describe('cross-framework', () => {
    const FRAMEWORKS = ['react', 'vue', 'angular', 'html'] as const;

    it.each(ECOMMERCE_TYPES)('%s works across all frameworks', async (templateType) => {
      for (const fw of FRAMEWORKS) {
        const files = await generateTemplate(templateType, fw, 'none', false, 'TestShop', ctx, {
          mood: 'professional',
          industry: 'ecommerce',
        });
        expect(files.length).toBeGreaterThan(0);
        expect(files[0].path).toBeTruthy();
      }
    });
  });
});
