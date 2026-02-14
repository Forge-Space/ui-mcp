const FETCH_TIMEOUT_MS = 10_000;

// Private IP address range constants (RFC 1918 and special-use addresses)
const PRIVATE_IP_CLASS_A = 10; // 10.0.0.0/8
const PRIVATE_IP_CLASS_B_START = 172; // 172.16.0.0/12
const PRIVATE_IP_CLASS_B_SECOND_OCTET_MIN = 16;
const PRIVATE_IP_CLASS_B_SECOND_OCTET_MAX = 31;
const PRIVATE_IP_CLASS_C_FIRST = 192; // 192.168.0.0/16
const PRIVATE_IP_CLASS_C_SECOND = 168;
const LINK_LOCAL_FIRST = 169; // 169.254.0.0/16
const LINK_LOCAL_SECOND = 254;
const LOOPBACK_IP = 127; // 127.0.0.0/8

// Extraction limits
const MAX_COLORS_TO_EXTRACT = 30;
const MAX_FONTS_TO_EXTRACT = 10;
const MAX_FONT_SIZES_TO_EXTRACT = 15;
const MAX_HTML_SIZE = 5_000_000; // 5MB limit to prevent regex performance issues

export interface DesignExtractionResult {
  colors: string[];
  typography: {
    fonts: string[];
    sizes: string[];
  };
  layoutHints: string[];
}

function isPrivateOrLocalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();

    // Block localhost and loopback
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
      return true;
    }

    // Block private IPv4 ranges
    const ipv4Match = hostname.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
    if (ipv4Match) {
      const [, firstOctet, secondOctet] = ipv4Match.map(Number);

      // Validate parsed values are valid numbers
      if (isNaN(firstOctet) || isNaN(secondOctet)) {
        return true; // Block invalid IPs
      }

      // Check against private IP ranges
      if (
        firstOctet === PRIVATE_IP_CLASS_A ||
        firstOctet === LOOPBACK_IP ||
        (firstOctet === PRIVATE_IP_CLASS_B_START &&
          secondOctet >= PRIVATE_IP_CLASS_B_SECOND_OCTET_MIN &&
          secondOctet <= PRIVATE_IP_CLASS_B_SECOND_OCTET_MAX) ||
        (firstOctet === PRIVATE_IP_CLASS_C_FIRST && secondOctet === PRIVATE_IP_CLASS_C_SECOND) ||
        (firstOctet === LINK_LOCAL_FIRST && secondOctet === LINK_LOCAL_SECOND)
      ) {
        return true;
      }
    }

    // Block private IPv6 ranges
    const ipv6Lower = hostname.toLowerCase();
    if (ipv6Lower.includes(':')) {
      // fc00::/7 - Unique Local Addresses (ULA)
      if (/^fc[0-9a-f]{2}:/i.test(ipv6Lower) || /^fd[0-9a-f]{2}:/i.test(ipv6Lower)) {
        return true;
      }
      // fe80::/10 - Link-Local
      if (/^fe[89ab][0-9a-f]:/i.test(ipv6Lower)) {
        return true;
      }
      // ::ffff:0:0/96 - IPv4-mapped IPv6 addresses
      // Extract and validate the IPv4 portion
      if (/^::ffff:/i.test(ipv6Lower)) {
        const ipv4Part = hostname.substring(7); // Remove "::ffff:"
        const ipv4Match = ipv4Part.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
        if (!ipv4Match) {
          // Invalid format after ::ffff: - block it
          return true;
        }
        const [, firstOctet, secondOctet] = ipv4Match.map(Number);

        // Validate parsed values are valid numbers
        if (isNaN(firstOctet) || isNaN(secondOctet)) {
          return true; // Block invalid IPs
        }

        // Block if the IPv4 part is private or loopback
        if (
          firstOctet === PRIVATE_IP_CLASS_A ||
          firstOctet === LOOPBACK_IP ||
          (firstOctet === PRIVATE_IP_CLASS_B_START &&
            secondOctet >= PRIVATE_IP_CLASS_B_SECOND_OCTET_MIN &&
            secondOctet <= PRIVATE_IP_CLASS_B_SECOND_OCTET_MAX) ||
          (firstOctet === PRIVATE_IP_CLASS_C_FIRST && secondOctet === PRIVATE_IP_CLASS_C_SECOND) ||
          (firstOctet === LINK_LOCAL_FIRST && secondOctet === LINK_LOCAL_SECOND)
        ) {
          return true;
        }
        // Public IPv4 in IPv6 format is allowed
        return false;
      }
    }

    // Block non-HTTP(S) protocols
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return true;
    }

    return false;
  } catch {
    return true; // Block invalid URLs
  }
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

  // Validate URL to prevent SSRF
  if (isPrivateOrLocalUrl(url)) {
    throw new Error('Access to private or local URLs is not allowed');
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'UIForge-MCP/0.1.0 (design-extractor)',
        Accept: 'text/html',
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    let html = await response.text();

    // Truncate HTML to prevent regex performance issues with extremely large documents
    if (html.length > MAX_HTML_SIZE) {
      html = html.substring(0, MAX_HTML_SIZE);
    }

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

  return [...colors].slice(0, MAX_COLORS_TO_EXTRACT);
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
    fonts: [...fonts].slice(0, MAX_FONTS_TO_EXTRACT),
    sizes: [...sizes].slice(0, MAX_FONT_SIZES_TO_EXTRACT),
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
