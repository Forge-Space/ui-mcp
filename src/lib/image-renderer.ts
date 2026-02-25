import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import type { IDesignContext, ImageType } from '@forgespace/siza-gen';

interface RenderOptions {
  description: string;
  type: ImageType;
  width: number;
  height: number;
  designContext?: IDesignContext;
}

interface FontEntry {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: 'normal';
}

const fontCache = new Map<string, ArrayBuffer>();

const BUNDLED_FONTS: Record<string, { local: string; family: string; weight: number }> = {
  'Inter-400': { local: 'Inter-Regular.woff2', family: 'Inter', weight: 400 },
  'Inter-700': { local: 'Inter-Bold.woff2', family: 'Inter', weight: 700 },
  'Manrope-400': { local: 'Manrope-Regular.woff2', family: 'Manrope', weight: 400 },
  'Manrope-700': { local: 'Manrope-Bold.woff2', family: 'Manrope', weight: 700 },
};

async function fetchTtfFromGoogleFonts(family: string, weight: number): Promise<ArrayBuffer> {
  // Request CSS from Google Fonts with a user-agent that triggers TTF delivery
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
  const cssRes = await fetch(cssUrl, {
    signal: AbortSignal.timeout(10_000),
    headers: {
      // Old Safari UA triggers TTF/OTF format instead of woff2
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.59.8',
    },
  });
  const css = await cssRes.text();
  // Extract the font URL from the CSS @font-face src
  const urlMatch = css.match(/src:\s*url\(([^)]+)\)/);
  if (!urlMatch) throw new Error(`No font URL found in Google Fonts CSS for ${family}:${weight}`);
  const fontUrl = urlMatch[1];
  const fontRes = await fetch(fontUrl, { signal: AbortSignal.timeout(15_000) });
  return fontRes.arrayBuffer();
}

async function loadFont(key: string): Promise<ArrayBuffer> {
  const cached = fontCache.get(key);
  if (cached) return cached;

  const entry = BUNDLED_FONTS[key];
  if (entry) {
    // Local-first: try bundled font file (TTF)
    try {
      const localPath = new URL(`../assets/fonts/${entry.local}`, import.meta.url);
      const buffer = await readFile(localPath);
      const ab = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      fontCache.set(key, ab);
      return ab;
    } catch {
      // Fall through to CDN
    }

    // CDN fallback: fetch TTF from Google Fonts
    try {
      const ab = await fetchTtfFromGoogleFonts(entry.family, entry.weight);
      fontCache.set(key, ab);
      return ab;
    } catch {
      // Fall through to error
    }
  }

  throw new Error(`Failed to load font "${key}". Ensure bundled fonts exist or internet is available.`);
}

async function loadFontsForContext(ctx?: IDesignContext): Promise<FontEntry[]> {
  const bodyFamily = ctx?.typography?.fontFamily?.split(',')[0]?.trim() ?? 'Inter';
  const headingFamily = ctx?.typography?.headingFont ?? bodyFamily;

  const fonts: FontEntry[] = [];

  // Try to load body font (regular + bold)
  const bodyRegKey = `${bodyFamily}-400`;
  const bodyBoldKey = `${bodyFamily}-700`;

  let bodyFontLoaded = false;
  try {
    fonts.push({ name: bodyFamily, data: await loadFont(bodyRegKey), weight: 400, style: 'normal' });
    bodyFontLoaded = true;
  } catch {
    // Body font failed, will try Inter fallback
  }

  if (bodyFontLoaded) {
    try {
      fonts.push({ name: bodyFamily, data: await loadFont(bodyBoldKey), weight: 700, style: 'normal' });
    } catch {
      // Bold is optional — skip silently
    }
  }

  // Load heading font if different from body
  if (headingFamily !== bodyFamily) {
    const headBoldKey = `${headingFamily}-700`;
    const headRegKey = `${headingFamily}-400`;

    let headingFontLoaded = false;
    try {
      fonts.push({ name: headingFamily, data: await loadFont(headBoldKey), weight: 700, style: 'normal' });
      headingFontLoaded = true;
    } catch {
      // Heading font not found — will use primary font family
    }
    try {
      fonts.push({ name: headingFamily, data: await loadFont(headRegKey), weight: 400, style: 'normal' });
      headingFontLoaded = true;
    } catch {
      // Heading font not found — will use primary font family
    }

    // If heading font failed but body succeeded, use body font for headings
    if (!headingFontLoaded && bodyFontLoaded) {
      // Already loaded body fonts, they'll be used for headings
    }
  }

  // Fallback to Inter if no fonts loaded
  if (fonts.length === 0) {
    try {
      fonts.push({ name: 'Inter', data: await loadFont('Inter-400'), weight: 400, style: 'normal' });
      try {
        fonts.push({ name: 'Inter', data: await loadFont('Inter-700'), weight: 700, style: 'normal' });
      } catch {
        // Inter bold optional
      }
    } catch (error) {
      throw new Error(
        'Failed to load any fonts. Ensure bundled fonts exist in src/assets/fonts/ or internet connection is available for Google Fonts CDN.',
        { cause: error }
      );
    }
  }

  return fonts;
}

function buildWireframeJsx(description: string, width: number, height: number): React.ReactNode {
  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f9fa',
        padding: '24px',
        fontFamily: 'Inter',
        color: '#495057',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #dee2e6',
              paddingBottom: '12px',
              marginBottom: '16px',
            },
            children: [
              { type: 'div', props: { style: { fontSize: '18px', fontWeight: 700 }, children: 'Wireframe' } },
              {
                type: 'div',
                props: {
                  style: { fontSize: '12px', color: '#868e96' },
                  children: `${width}×${height}`,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed #ced4da',
              borderRadius: '8px',
              padding: '24px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { fontSize: '14px', textAlign: 'center', maxWidth: '80%' },
                  children: description,
                },
              },
            ],
          },
        },
      ],
    },
  } as unknown as React.ReactNode;
}

function buildMockupJsx(description: string, width: number, height: number, ctx?: IDesignContext): React.ReactNode {
  const primary = ctx?.colorPalette?.primary ?? '#2563eb';
  const bg = ctx?.colorPalette?.background ?? '#ffffff';
  const fg = ctx?.colorPalette?.foreground ?? '#0f172a';
  const muted = ctx?.colorPalette?.muted ?? '#f1f5f9';
  const font = ctx?.typography?.fontFamily?.split(',')[0]?.trim() ?? 'Inter';

  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: bg,
        fontFamily: font,
        color: fg,
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 24px',
              backgroundColor: primary,
              color: '#ffffff',
            },
            children: [
              { type: 'div', props: { style: { fontSize: '18px', fontWeight: 700 }, children: 'UIForge' } },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', gap: '16px', fontSize: '14px' },
                  children: [
                    { type: 'div', props: { children: 'Home' } },
                    { type: 'div', props: { children: 'About' } },
                    { type: 'div', props: { children: 'Contact' } },
                  ],
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { fontSize: '24px', fontWeight: 700, marginBottom: '16px', textAlign: 'center' },
                  children: description,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    padding: '12px 32px',
                    backgroundColor: primary,
                    color: '#ffffff',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 600,
                  },
                  children: 'Get Started',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              padding: '16px 24px',
              backgroundColor: muted,
              fontSize: '12px',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
            },
            children: `Generated by UIForge • ${width}×${height}`,
          },
        },
      ],
    },
  } as unknown as React.ReactNode;
}

function buildComponentPreviewJsx(
  description: string,
  _width: number,
  _height: number,
  ctx?: IDesignContext
): React.ReactNode {
  const primary = ctx?.colorPalette?.primary ?? '#2563eb';
  const bg = ctx?.colorPalette?.background ?? '#ffffff';
  const fg = ctx?.colorPalette?.foreground ?? '#0f172a';
  const border = ctx?.colorPalette?.border ?? '#e2e8f0';
  const radius = ctx?.borderRadius?.lg ?? '0.5rem';

  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        padding: '32px',
        fontFamily: 'Inter',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: bg,
              border: `1px solid ${border}`,
              borderRadius: radius,
              padding: '24px',
              maxWidth: '360px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { fontSize: '18px', fontWeight: 700, color: fg, marginBottom: '8px' },
                  children: description,
                },
              },
              {
                type: 'div',
                props: {
                  style: { fontSize: '14px', color: '#64748b', marginBottom: '16px' },
                  children: 'Component preview generated by UIForge',
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    gap: '8px',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          padding: '8px 16px',
                          backgroundColor: primary,
                          color: '#ffffff',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: 600,
                        },
                        children: 'Primary',
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          padding: '8px 16px',
                          backgroundColor: 'transparent',
                          color: fg,
                          border: `1px solid ${border}`,
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: 600,
                        },
                        children: 'Secondary',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  } as unknown as React.ReactNode;
}

export async function renderSvg(options: RenderOptions): Promise<string> {
  const { description, type, width, height, designContext } = options;
  const fonts = await loadFontsForContext(designContext);

  let jsx: React.ReactNode;
  switch (type) {
    case 'wireframe':
      jsx = buildWireframeJsx(description, width, height);
      break;
    case 'mockup':
      jsx = buildMockupJsx(description, width, height, designContext);
      break;
    case 'component_preview':
      jsx = buildComponentPreviewJsx(description, width, height, designContext);
      break;
  }

  const svg = await satori(jsx, {
    width,
    height,
    fonts,
  });

  return svg;
}

export async function renderPng(options: RenderOptions): Promise<Buffer> {
  const svg = await renderSvg(options);
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: options.width },
  });
  const pngData = resvg.render();
  return Buffer.from(pngData.asPng());
}
