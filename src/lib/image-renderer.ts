import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import type { IDesignContext, ImageType } from './types.js';

interface RenderOptions {
  description: string;
  type: ImageType;
  width: number;
  height: number;
  designContext?: IDesignContext;
}

let cachedFont: ArrayBuffer | null = null;

async function loadDefaultFont(): Promise<ArrayBuffer> {
  if (cachedFont) return cachedFont;

  try {
    const response = await fetch(
      'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2',
      { signal: AbortSignal.timeout(10_000) }
    );
    cachedFont = await response.arrayBuffer();
  } catch {
    // Fallback: create a minimal font-like buffer (satori requires at least one font)
    // In production, bundle a .ttf file instead
    throw new Error(
      'Failed to fetch default font. Provide a font or ensure internet access.'
    );
  }

  return cachedFont;
}

function buildWireframeJsx(
  description: string,
  width: number,
  height: number
): React.ReactNode {
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

function buildMockupJsx(
  description: string,
  width: number,
  height: number,
  ctx?: IDesignContext
): React.ReactNode {
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
  const fontData = await loadDefaultFont();

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
    fonts: [
      {
        name: 'Inter',
        data: fontData,
        weight: 400,
        style: 'normal',
      },
    ],
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
