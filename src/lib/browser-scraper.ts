import { chromium, type Browser, type Page } from 'playwright';
import type { IScrapedPage } from './types.js';
import { createLogger } from './logger.js';

const logger = createLogger('browser-scraper');

// Browser configuration constants
const DEFAULT_VIEWPORT_WIDTH = 1440;
const DEFAULT_VIEWPORT_HEIGHT = 900;
const DEFAULT_WAIT_MS = 2000; // Wait time after page load
const DEFAULT_TIMEOUT_MS = 30_000; // 30 seconds
const ELEMENT_SAMPLE_LIMIT = 500; // Maximum elements to analyze
const MAX_COLORS_TO_EXTRACT = 30;
const MAX_FONTS_TO_EXTRACT = 10;
const MAX_FONT_SIZES_TO_EXTRACT = 15;
const MAX_SPACING_VALUES_TO_EXTRACT = 20;
const MAX_LAYOUT_PATTERNS_TO_EXTRACT = 6;
const MAX_COMPONENT_TYPES_TO_EXTRACT = 15;

// RGB to hex conversion - using base 10 for parseInt
const RADIX_DECIMAL = 10;

let browserInstance: Browser | null = null;
let launchingPromise: Promise<Browser> | null = null;

function getBrowser(): Promise<Browser> {
  if (browserInstance?.isConnected()) return Promise.resolve(browserInstance);

  // If already launching, wait for that promise
  if (launchingPromise) return launchingPromise;

  // Start launching and store the promise
  launchingPromise = (async () => {
    try {
      const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      });
      browserInstance = browser;
      return browser;
    } catch (error) {
      logger.error({ err: error }, 'Failed to launch Chromium');
      browserInstance = null;
      throw error;
    }
  })();

  // Clear launchingPromise after it settles (success or failure) to prevent race conditions
  // This ensures all callers receive the result before we clear the promise
  void launchingPromise.finally(() => {
    launchingPromise = null;
  });

  return launchingPromise;
}

export async function closeBrowser(): Promise<void> {
  if (browserInstance?.isConnected()) {
    await browserInstance.close();
    browserInstance = null;
  }
}

interface ScrapeOptions {
  viewport?: { width: number; height: number };
  waitMs?: number;
  takeScreenshot?: boolean;
  timeout?: number;
}

const DEFAULT_VIEWPORT = { width: DEFAULT_VIEWPORT_WIDTH, height: DEFAULT_VIEWPORT_HEIGHT };
const DEFAULT_TIMEOUT = DEFAULT_TIMEOUT_MS;

export async function scrapePage(url: string, options: ScrapeOptions = {}): Promise<IScrapedPage> {
  const {
    viewport = DEFAULT_VIEWPORT,
    waitMs = DEFAULT_WAIT_MS,
    takeScreenshot = true,
    timeout = DEFAULT_TIMEOUT,
  } = options;

  const browser = await getBrowser();
  let context;

  try {
    context = await browser.newContext({
      viewport,
      userAgent: 'UIForge-MCP/0.1.0 (design-analyzer)',
    });
    const page = await context.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout });
      await page.waitForTimeout(waitMs);

      const title = await page.title();

      const extracted = await extractPageStyles(page);

      let screenshot: Buffer | undefined;
      if (takeScreenshot) {
        screenshot = await page.screenshot({ fullPage: true, type: 'png' });
      }

      const meta = await extractMeta(page);

      return {
        url,
        title,
        screenshot,
        colors: extracted.colors,
        fonts: extracted.fonts,
        fontSizes: extracted.fontSizes,
        spacing: extracted.spacing,
        layoutPatterns: extracted.layoutPatterns,
        componentTypes: extracted.componentTypes,
        meta,
      };
    } finally {
      await page.close().catch((err) => {
        logger.warn({ err }, 'Page close error (non-critical)');
      });
    }
  } finally {
    if (context) {
      await context.close().catch((err) => {
        logger.warn({ err }, 'Context close error (non-critical)');
      });
    }
  }
}

interface ExtractedStyles {
  colors: string[];
  fonts: string[];
  fontSizes: string[];
  spacing: string[];
  layoutPatterns: string[];
  componentTypes: string[];
}

function extractPageStyles(page: Page): Promise<ExtractedStyles> {
  return page.evaluate(
    ({
      maxColors,
      maxFonts,
      maxFontSizes,
      maxSpacing,
      maxLayoutPatterns,
      maxComponentTypes,
      sampleLimit,
    }: {
      maxColors: number;
      maxFonts: number;
      maxFontSizes: number;
      maxSpacing: number;
      maxLayoutPatterns: number;
      maxComponentTypes: number;
      sampleLimit: number;
    }) => {
      const colors = new Set<string>();
      const fonts = new Set<string>();
      const fontSizes = new Set<string>();
      const spacingValues = new Set<string>();
      const layoutPatterns = new Set<string>();
      const componentTypes = new Set<string>();

      const elements = Array.from(document.querySelectorAll('*'));
      let count = 0;

      for (const element of elements) {
        if (count++ >= sampleLimit) break;
        const style = window.getComputedStyle(element);

        // Colors
        const bgColor = style.backgroundColor;
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          colors.add(bgColor);
        }
        const textColor = style.color;
        if (textColor) colors.add(textColor);

        const borderColor = style.borderColor;
        if (borderColor && borderColor !== 'rgb(0, 0, 0)') colors.add(borderColor);

        // Fonts
        const fontFamily = style.fontFamily.split(',')[0]?.trim().replace(/['"]/g, '');
        if (fontFamily) fonts.add(fontFamily);

        // Font sizes
        const fontSize = style.fontSize;
        if (fontSize && fontSize !== '0px') fontSizes.add(fontSize);

        // Spacing (padding, margin, gap)
        for (const property of ['padding', 'margin', 'gap'] as const) {
          const value = style.getPropertyValue(property);
          if (value && value !== '0px' && value !== 'normal') spacingValues.add(value);
        }

        // Layout patterns
        const display = style.display;
        if (display === 'flex') layoutPatterns.add('flexbox');
        if (display === 'grid') layoutPatterns.add('css-grid');

        // Component detection by tag + role
        const tag = element.tagName.toLowerCase();
        const role = element.getAttribute('role');

        if (tag === 'nav' || role === 'navigation') componentTypes.add('navigation');
        if (tag === 'header' || role === 'banner') componentTypes.add('header');
        if (tag === 'footer' || role === 'contentinfo') componentTypes.add('footer');
        if (tag === 'aside' || role === 'complementary') componentTypes.add('sidebar');
        if (tag === 'form' || role === 'form') componentTypes.add('form');
        if (tag === 'button' || role === 'button') componentTypes.add('button');
        if (tag === 'input' || tag === 'textarea' || tag === 'select') componentTypes.add('form-input');
        if (tag === 'img' || role === 'img') componentTypes.add('image');
        if (tag === 'table' || role === 'table') componentTypes.add('table');
        if (tag === 'ul' || tag === 'ol') componentTypes.add('list');
        if (element.classList.contains('card') || element.getAttribute('data-component') === 'card')
          componentTypes.add('card');
        if (element.classList.contains('modal') || role === 'dialog') componentTypes.add('modal');
        if (element.classList.contains('hero') || element.classList.contains('banner')) componentTypes.add('hero');
        if (element.classList.contains('tabs') || role === 'tablist') componentTypes.add('tabs');
        if (element.classList.contains('accordion')) componentTypes.add('accordion');
      }

      // Check for CSS frameworks
      const links = Array.from(document.querySelectorAll('link[href], script[src]'));
      for (const link of links) {
        const href = link.getAttribute('href') ?? link.getAttribute('src') ?? '';
        if (/tailwind/i.test(href)) layoutPatterns.add('tailwindcss');
        if (/bootstrap/i.test(href)) layoutPatterns.add('bootstrap');
        if (/material/i.test(href)) layoutPatterns.add('material-ui');
        if (/chakra/i.test(href)) layoutPatterns.add('chakra-ui');
      }

      return {
        colors: [...colors].slice(0, maxColors),
        fonts: [...fonts].slice(0, maxFonts),
        fontSizes: [...fontSizes].slice(0, maxFontSizes),
        spacing: [...spacingValues].slice(0, maxSpacing),
        layoutPatterns: [...layoutPatterns].slice(0, maxLayoutPatterns),
        componentTypes: [...componentTypes].slice(0, maxComponentTypes),
      };
    },
    {
      maxColors: MAX_COLORS_TO_EXTRACT,
      maxFonts: MAX_FONTS_TO_EXTRACT,
      maxFontSizes: MAX_FONT_SIZES_TO_EXTRACT,
      maxSpacing: MAX_SPACING_VALUES_TO_EXTRACT,
      maxLayoutPatterns: MAX_LAYOUT_PATTERNS_TO_EXTRACT,
      maxComponentTypes: MAX_COMPONENT_TYPES_TO_EXTRACT,
      sampleLimit: ELEMENT_SAMPLE_LIMIT,
    }
  );
}

function extractMeta(page: Page): Promise<Record<string, string>> {
  return page.evaluate(() => {
    const meta: Record<string, string> = {};

    const titleEl = document.querySelector('title');
    if (titleEl?.textContent) meta['title'] = titleEl.textContent;

    const metaTags = Array.from(document.querySelectorAll('meta[name], meta[property]'));
    for (const tag of metaTags) {
      const name = tag.getAttribute('name') ?? tag.getAttribute('property') ?? '';
      const content = tag.getAttribute('content') ?? '';
      if (name && content) {
        const key = name.toLowerCase();
        if (['description', 'og:title', 'og:description', 'og:image', 'theme-color', 'viewport'].includes(key)) {
          meta[key] = content;
        }
      }
    }

    return meta;
  });
}

function componentToHex(component: number): string {
  const hex = component.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export function rgbToHex(rgb: string): string | null {
  const match = rgb.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (!match) return null;
  const r = parseInt(match[1], RADIX_DECIMAL);
  const g = parseInt(match[2], RADIX_DECIMAL);
  const b = parseInt(match[3], RADIX_DECIMAL);

  // Validate RGB values are in valid range (0-255)
  // Note: parseInt with \d+ regex cannot produce negative numbers, so only check upper bound and NaN
  if (r > 255 || g > 255 || b > 255 || isNaN(r) || isNaN(g) || isNaN(b)) {
    logger.warn({ rgb, r, g, b }, 'Invalid RGB values, returning null');
    return null;
  }

  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

export function normalizeColors(rawColors: string[]): string[] {
  const hexColors = new Set<string>();
  for (const color of rawColors) {
    if (color.startsWith('#')) {
      hexColors.add(color.toLowerCase());
    } else {
      const hex = rgbToHex(color);
      if (hex) hexColors.add(hex.toLowerCase());
    }
  }
  return [...hexColors];
}
