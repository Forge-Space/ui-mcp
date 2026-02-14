import sharp from 'sharp';
import type { IImageAnalysis } from './types.js';

interface ColorBucket {
  r: number;
  g: number;
  b: number;
  count: number;
}

function componentToHex(c: number): string {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function colorDistance(a: ColorBucket, b: ColorBucket): number {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

function quantizeColors(pixels: Buffer, pixelCount: number, maxColors: number): ColorBucket[] {
  // Simple median-cut-like quantization: bucket by rounding to nearest 32
  const bucketMap = new Map<string, ColorBucket>();
  const step = 32;

  for (let i = 0; i < pixelCount * 3; i += 3) {
    const r = Math.round(pixels[i] / step) * step;
    const g = Math.round(pixels[i + 1] / step) * step;
    const b = Math.round(pixels[i + 2] / step) * step;
    const key = `${r},${g},${b}`;

    const existing = bucketMap.get(key);
    if (existing) {
      existing.count++;
      // Accumulate actual values for averaging
      existing.r = Math.round((existing.r * (existing.count - 1) + pixels[i]) / existing.count);
      existing.g = Math.round((existing.g * (existing.count - 1) + pixels[i + 1]) / existing.count);
      existing.b = Math.round((existing.b * (existing.count - 1) + pixels[i + 2]) / existing.count);
    } else {
      bucketMap.set(key, { r: pixels[i], g: pixels[i + 1], b: pixels[i + 2], count: 1 });
    }
  }

  const sorted = [...bucketMap.values()].sort((a, b) => b.count - a.count);

  // Merge similar colors
  const merged: ColorBucket[] = [];
  for (const bucket of sorted) {
    const similar = merged.find((m) => colorDistance(m, bucket) < 50);
    if (similar) {
      similar.count += bucket.count;
    } else if (merged.length < maxColors) {
      merged.push({ ...bucket });
    }
  }

  return merged.sort((a, b) => b.count - a.count);
}

export async function extractDominantColors(
  imageBuffer: Buffer,
  maxColors: number = 8
): Promise<Array<{ hex: string; percentage: number }>> {
  // Resize to small image for fast processing
  const { data, info } = await sharp(imageBuffer)
    .resize(150, 150, { fit: 'cover' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixelCount = info.width * info.height;
  const buckets = quantizeColors(data, pixelCount, maxColors);
  const totalPixels = buckets.reduce((sum, b) => sum + b.count, 0);

  return buckets.map((b) => ({
    hex: rgbToHex(b.r, b.g, b.b),
    percentage: Math.round((b.count / totalPixels) * 100),
  }));
}

interface RegionInfo {
  role: string;
  bounds: { x: number; y: number; w: number; h: number };
}

export async function detectLayoutRegions(imageBuffer: Buffer): Promise<RegionInfo[]> {
  const metadata = await sharp(imageBuffer).metadata();
  const width = metadata.width ?? 1440;
  const height = metadata.height ?? 900;

  // Analyze horizontal bands for layout structure
  const regions: RegionInfo[] = [];
  const bandHeight = Math.floor(height / 10);
  const analysisWidth = Math.min(width, 300);

  // Sample brightness per band to detect distinct regions
  const bandBrightness: number[] = [];

  for (let band = 0; band < 10; band++) {
    const top = band * bandHeight;
    const extractHeight = Math.min(bandHeight, height - top);
    if (extractHeight <= 0) break;

    try {
      const { data } = await sharp(imageBuffer)
        .extract({ left: 0, top, width: Math.min(analysisWidth, width), height: extractHeight })
        .resize(50, 10, { fit: 'fill' })
        .removeAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      let totalBrightness = 0;
      const pixelCount = data.length / 3;
      for (let i = 0; i < data.length; i += 3) {
        totalBrightness += (data[i] * 299 + data[i + 1] * 587 + data[i + 2] * 114) / 1000;
      }
      bandBrightness.push(totalBrightness / pixelCount);
    } catch {
      bandBrightness.push(128);
    }
  }

  // Heuristic region detection based on position and brightness
  if (bandBrightness.length >= 3) {
    // Top region — likely header/nav
    regions.push({ role: 'header', bounds: { x: 0, y: 0, w: width, h: bandHeight * 1 } });

    // Middle region — main content
    const mainTop = bandHeight;
    const mainHeight = height - bandHeight * 2;
    regions.push({ role: 'main-content', bounds: { x: 0, y: mainTop, w: width, h: mainHeight } });

    // Check if top band is significantly different from middle (nav bar detection)
    const topBrightness = bandBrightness[0];
    const midBrightness = bandBrightness[Math.floor(bandBrightness.length / 2)];
    if (Math.abs(topBrightness - midBrightness) > 30) {
      regions.push({ role: 'navigation', bounds: { x: 0, y: 0, w: width, h: bandHeight } });
    }

    // Bottom region — likely footer
    const footerTop = height - bandHeight;
    regions.push({ role: 'footer', bounds: { x: 0, y: footerTop, w: width, h: bandHeight } });

    // Check bottom brightness for footer detection
    const bottomBrightness = bandBrightness[bandBrightness.length - 1];
    if (Math.abs(bottomBrightness - midBrightness) > 30) {
      // Distinct footer area confirmed
    }
  }

  return regions;
}

export function detectComponentsFromRegions(regions: RegionInfo[]): string[] {
  const components = new Set<string>();
  for (const region of regions) {
    switch (region.role) {
      case 'header':
      case 'navigation':
        components.add('navigation');
        components.add('header');
        break;
      case 'footer':
        components.add('footer');
        break;
      case 'main-content':
        components.add('content-section');
        break;
      case 'sidebar':
        components.add('sidebar');
        break;
    }
  }
  return [...components];
}

export async function analyzeImage(imageBuffer: Buffer, label: string): Promise<IImageAnalysis> {
  const metadata = await sharp(imageBuffer).metadata();
  const dimensions = {
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
  };

  const dominantColors = await extractDominantColors(imageBuffer);
  const layoutRegions = await detectLayoutRegions(imageBuffer);
  const detectedComponents = detectComponentsFromRegions(layoutRegions);

  return {
    label,
    dominantColors,
    layoutRegions,
    detectedComponents,
    dimensions,
  };
}
