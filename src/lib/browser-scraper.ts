import { chromium, type Browser, type Page } from 'playwright';
import type { IScrapedPage } from './types.js';

let browserInstance: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (browserInstance?.isConnected()) return browserInstance;
  browserInstance = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  return browserInstance;
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

const DEFAULT_VIEWPORT = { width: 1440, height: 900 };
const DEFAULT_TIMEOUT = 30_000;

export async function scrapePage(url: string, options: ScrapeOptions = {}): Promise<IScrapedPage> {
  const { viewport = DEFAULT_VIEWPORT, waitMs = 2000, takeScreenshot = true, timeout = DEFAULT_TIMEOUT } = options;

  const browser = await getBrowser();
  const context = await browser.newContext({
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
    await context.close();
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

async function extractPageStyles(page: Page): Promise<ExtractedStyles> {
  return page.evaluate(() => {
    const colors = new Set<string>();
    const fonts = new Set<string>();
    const fontSizes = new Set<string>();
    const spacingValues = new Set<string>();
    const layoutPatterns = new Set<string>();
    const componentTypes = new Set<string>();

    const elements = document.querySelectorAll('*');
    const sampleLimit = 500;
    let count = 0;

    for (const el of elements) {
      if (count++ > sampleLimit) break;
      const style = window.getComputedStyle(el);

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
      for (const prop of ['padding', 'margin', 'gap'] as const) {
        const val = style.getPropertyValue(prop);
        if (val && val !== '0px' && val !== 'normal') spacingValues.add(val);
      }

      // Layout patterns
      const display = style.display;
      if (display === 'flex') layoutPatterns.add('flexbox');
      if (display === 'grid') layoutPatterns.add('css-grid');

      // Component detection by tag + role
      const tag = el.tagName.toLowerCase();
      const role = el.getAttribute('role');

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
      if (el.classList.contains('card') || el.getAttribute('data-component') === 'card') componentTypes.add('card');
      if (el.classList.contains('modal') || role === 'dialog') componentTypes.add('modal');
      if (el.classList.contains('hero') || el.classList.contains('banner')) componentTypes.add('hero');
      if (el.classList.contains('tabs') || role === 'tablist') componentTypes.add('tabs');
      if (el.classList.contains('accordion')) componentTypes.add('accordion');
    }

    // Check for CSS frameworks
    const links = document.querySelectorAll('link[href], script[src]');
    for (const link of links) {
      const href = link.getAttribute('href') ?? link.getAttribute('src') ?? '';
      if (/tailwind/i.test(href)) layoutPatterns.add('tailwindcss');
      if (/bootstrap/i.test(href)) layoutPatterns.add('bootstrap');
      if (/material/i.test(href)) layoutPatterns.add('material-ui');
      if (/chakra/i.test(href)) layoutPatterns.add('chakra-ui');
    }

    return {
      colors: [...colors].slice(0, 30),
      fonts: [...fonts].slice(0, 10),
      fontSizes: [...fontSizes].slice(0, 15),
      spacing: [...spacingValues].slice(0, 20),
      layoutPatterns: [...layoutPatterns],
      componentTypes: [...componentTypes],
    };
  });
}

async function extractMeta(page: Page): Promise<Record<string, string>> {
  return page.evaluate(() => {
    const meta: Record<string, string> = {};

    const titleEl = document.querySelector('title');
    if (titleEl?.textContent) meta['title'] = titleEl.textContent;

    const metaTags = document.querySelectorAll('meta[name], meta[property]');
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

export function rgbToHex(rgb: string): string | null {
  const match = rgb.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (!match) return null;
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function normalizeColors(rawColors: string[]): string[] {
  const hexColors = new Set<string>();
  for (const c of rawColors) {
    if (c.startsWith('#')) {
      hexColors.add(c.toLowerCase());
    } else {
      const hex = rgbToHex(c);
      if (hex) hexColors.add(hex.toLowerCase());
    }
  }
  return [...hexColors];
}
