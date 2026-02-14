export interface DesignExtractionResult {
  colors: string[];
  typography: {
    fonts: string[];
    sizes: string[];
  };
  layoutHints: string[];
}

export async function extractDesignFromUrl(
  url: string,
  options: { extractColors?: boolean; extractTypography?: boolean } = {}
): Promise<DesignExtractionResult> {
  const { extractColors = true, extractTypography = true } = options;
  const result: DesignExtractionResult = {
    colors: [],
    typography: { fonts: [], sizes: [] },
    layoutHints: [],
  };

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'UIForge-MCP/0.1.0 (design-extractor)',
        Accept: 'text/html',
      },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();

    if (extractColors) {
      result.colors = extractColorsFromHtml(html);
    }

    if (extractTypography) {
      result.typography = extractTypographyFromHtml(html);
    }

    result.layoutHints = extractLayoutHints(html);
  } catch (e) {
    result.layoutHints.push(`Extraction error: ${String(e)}`);
  }

  return result;
}

function extractColorsFromHtml(html: string): string[] {
  const colors = new Set<string>();

  // Hex colors (3, 4, 6, 8 digit)
  const hexMatches = html.matchAll(/#(?:[0-9a-fA-F]{3,4}){1,2}\b/g);
  for (const m of hexMatches) {
    colors.add(m[0].toLowerCase());
  }

  // rgb/rgba
  const rgbMatches = html.matchAll(/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*[\d.]+)?\s*\)/g);
  for (const m of rgbMatches) {
    colors.add(m[0]);
  }

  // hsl/hsla
  const hslMatches = html.matchAll(/hsla?\(\s*\d+\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?(?:\s*,\s*[\d.]+)?\s*\)/g);
  for (const m of hslMatches) {
    colors.add(m[0]);
  }

  // Meta theme-color
  const themeColorMatch = html.match(/<meta[^>]*name=["']theme-color["'][^>]*content=["']([^"']+)["']/i);
  if (themeColorMatch) {
    colors.add(themeColorMatch[1].toLowerCase());
  }

  return [...colors].slice(0, 30);
}

function extractTypographyFromHtml(html: string): { fonts: string[]; sizes: string[] } {
  const fonts = new Set<string>();
  const sizes = new Set<string>();

  // Google Fonts links
  const gfMatches = html.matchAll(/fonts\.googleapis\.com\/css2?\?family=([^"&]+)/g);
  for (const m of gfMatches) {
    const familyStr = decodeURIComponent(m[1]);
    const families = familyStr.split('|').map((f) => f.split(':')[0].replace(/\+/g, ' '));
    families.forEach((f) => fonts.add(f));
  }

  // font-family declarations
  const ffMatches = html.matchAll(/font-family\s*:\s*['"]?([^;'"}\n]+)/g);
  for (const m of ffMatches) {
    const firstFont = m[1].split(',')[0].trim().replace(/['"]/g, '');
    if (firstFont && !firstFont.startsWith('var(')) {
      fonts.add(firstFont);
    }
  }

  // font-size declarations
  const fsMatches = html.matchAll(/font-size\s*:\s*([\d.]+(?:px|rem|em|pt|vw))/g);
  for (const m of fsMatches) {
    sizes.add(m[1]);
  }

  return {
    fonts: [...fonts].slice(0, 10),
    sizes: [...sizes].slice(0, 15),
  };
}

function extractLayoutHints(html: string): string[] {
  const hints: string[] = [];

  const viewportMatch = html.match(/<meta[^>]*name=["']viewport["'][^>]*content=["']([^"']+)["']/i);
  if (viewportMatch) {
    hints.push(`Viewport: ${viewportMatch[1]}`);
  }

  if (/display\s*:\s*grid/i.test(html)) hints.push('Uses CSS Grid');
  if (/display\s*:\s*flex/i.test(html)) hints.push('Uses Flexbox');
  if (/tailwindcss|tailwind\.css/i.test(html)) hints.push('Uses Tailwind CSS');
  if (/bootstrap/i.test(html)) hints.push('Uses Bootstrap');

  // OG image
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  if (ogImageMatch) {
    hints.push(`OG Image: ${ogImageMatch[1]}`);
  }

  return hints;
}
