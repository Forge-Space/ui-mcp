import sharp from 'sharp';
import type { IImageAnalysis } from './types.js';

// Color quantization constants
const COLOR_QUANTIZATION_STEP = 32; // RGB bucket size for initial quantization
const COLOR_SIMILARITY_THRESHOLD = 50; // RGB Euclidean distance threshold for merging similar colors
const DEFAULT_MAX_COLORS = 8; // Default number of dominant colors to extract

// Layout detection constants
const LAYOUT_BAND_COUNT = 10; // Number of horizontal bands to analyze
const LAYOUT_ANALYSIS_WIDTH = 300; // Width in pixels for layout analysis sampling
const BRIGHTNESS_DIFFERENCE_THRESHOLD = 30; // Brightness difference to detect distinct regions
const DEFAULT_IMAGE_WIDTH = 1440; // Default width if metadata unavailable
const DEFAULT_IMAGE_HEIGHT = 900; // Default height if metadata unavailable
const DEFAULT_BRIGHTNESS = 128; // Default brightness for failed band analysis
const MIN_BANDS_FOR_DETECTION = 3; // Minimum bands needed for region detection

// Image processing constants
const COLOR_ANALYSIS_SIZE = 150; // Resize dimension for color analysis
const BRIGHTNESS_SAMPLE_WIDTH = 50; // Width for brightness sampling
const BRIGHTNESS_SAMPLE_HEIGHT = 10; // Height for brightness sampling
const BRIGHTNESS_RED_WEIGHT = 299; // Red component weight in brightness calculation
const BRIGHTNESS_GREEN_WEIGHT = 587; // Green component weight in brightness calculation
const BRIGHTNESS_BLUE_WEIGHT = 114; // Blue component weight in brightness calculation
const BRIGHTNESS_DIVISOR = 1000; // Divisor for brightness calculation

interface ColorBucket {
  r: number;
  g: number;
  b: number;
  count: number;
}

function componentToHex(component: number): string {
  const hex = component.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function rgbToHex(red: number, green: number, blue: number): string {
  return `#${componentToHex(red)}${componentToHex(green)}${componentToHex(blue)}`;
}

function colorDistance(bucketA: ColorBucket, bucketB: ColorBucket): number {
  return Math.sqrt((bucketA.r - bucketB.r) ** 2 + (bucketA.g - bucketB.g) ** 2 + (bucketA.b - bucketB.b) ** 2);
}

function quantizeColors(pixels: Buffer, pixelCount: number, maxColors: number): ColorBucket[] {
  // Validate buffer size
  const expectedSize = pixelCount * 3;
  if (pixels.length < expectedSize) {
    throw new Error(`Invalid pixel buffer: expected ${expectedSize} bytes, got ${pixels.length}`);
  }

  // Simple median-cut-like quantization: bucket by rounding to nearest COLOR_QUANTIZATION_STEP
  const bucketMap = new Map<string, ColorBucket>();

  for (let pixelIndex = 0; pixelIndex < expectedSize; pixelIndex += 3) {
    // Quantize RGB values with clamping to prevent overflow (e.g., 255/32*32 = 256)
    const red = Math.min(255, Math.round(pixels[pixelIndex] / COLOR_QUANTIZATION_STEP) * COLOR_QUANTIZATION_STEP);
    const green = Math.min(255, Math.round(pixels[pixelIndex + 1] / COLOR_QUANTIZATION_STEP) * COLOR_QUANTIZATION_STEP);
    const blue = Math.min(255, Math.round(pixels[pixelIndex + 2] / COLOR_QUANTIZATION_STEP) * COLOR_QUANTIZATION_STEP);
    const key = `${red},${green},${blue}`;

    const existing = bucketMap.get(key);
    if (existing) {
      const oldCount = existing.count;
      existing.count++;
      // Accumulate actual values for averaging (fixed off-by-one error)
      existing.r = Math.round((existing.r * oldCount + pixels[pixelIndex]) / existing.count);
      existing.g = Math.round((existing.g * oldCount + pixels[pixelIndex + 1]) / existing.count);
      existing.b = Math.round((existing.b * oldCount + pixels[pixelIndex + 2]) / existing.count);
    } else {
      bucketMap.set(key, { r: pixels[pixelIndex], g: pixels[pixelIndex + 1], b: pixels[pixelIndex + 2], count: 1 });
    }
  }

  const sorted = [...bucketMap.values()].sort((a, b) => b.count - a.count);

  // Merge similar colors with weighted averaging
  const merged: ColorBucket[] = [];
  for (const bucket of sorted) {
    const similarBucket = merged.find(
      (mergedBucket) => colorDistance(mergedBucket, bucket) < COLOR_SIMILARITY_THRESHOLD
    );
    if (similarBucket) {
      const totalCount = similarBucket.count + bucket.count;

      // Weighted average of RGB values
      // Note: totalCount is always >= 2 (both buckets start with count >= 1)
      similarBucket.r = Math.round((similarBucket.r * similarBucket.count + bucket.r * bucket.count) / totalCount);
      similarBucket.g = Math.round((similarBucket.g * similarBucket.count + bucket.g * bucket.count) / totalCount);
      similarBucket.b = Math.round((similarBucket.b * similarBucket.count + bucket.b * bucket.count) / totalCount);
      similarBucket.count = totalCount;
    } else if (merged.length < maxColors) {
      merged.push({ ...bucket });
    }
  }

  return merged.sort((a, b) => b.count - a.count);
}

export async function extractDominantColors(
  imageBuffer: Buffer,
  maxColors: number = DEFAULT_MAX_COLORS
): Promise<Array<{ hex: string; percentage: number }>> {
  // Resize to small image for fast processing
  const { data, info } = await sharp(imageBuffer)
    .resize(COLOR_ANALYSIS_SIZE, COLOR_ANALYSIS_SIZE, { fit: 'cover' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixelCount = info.width * info.height;
  const buckets = quantizeColors(data, pixelCount, maxColors);
  const totalPixels = buckets.reduce((sum, bucket) => sum + bucket.count, 0);

  // Guard against division by zero
  if (totalPixels === 0) {
    return [];
  }

  return buckets.map((bucket) => ({
    hex: rgbToHex(bucket.r, bucket.g, bucket.b),
    percentage: Math.round((bucket.count / totalPixels) * 100),
  }));
}

interface RegionInfo {
  role: string;
  bounds: { x: number; y: number; width: number; height: number };
}

export async function detectLayoutRegions(imageBuffer: Buffer): Promise<RegionInfo[]> {
  const metadata = await sharp(imageBuffer).metadata();
  const width = metadata.width ?? DEFAULT_IMAGE_WIDTH;
  const height = metadata.height ?? DEFAULT_IMAGE_HEIGHT;

  // Analyze horizontal bands for layout structure
  const regions: RegionInfo[] = [];
  const bandHeight = Math.floor(height / LAYOUT_BAND_COUNT);
  const analysisWidth = Math.min(width, LAYOUT_ANALYSIS_WIDTH);

  // Sample brightness per band to detect distinct regions
  const bandBrightness: number[] = [];

  for (let band = 0; band < LAYOUT_BAND_COUNT; band++) {
    const top = band * bandHeight;
    const extractHeight = Math.min(bandHeight, height - top);
    if (extractHeight <= 0) break;

    try {
      const { data } = await sharp(imageBuffer)
        .extract({ left: 0, top, width: Math.min(analysisWidth, width), height: extractHeight })
        .resize(BRIGHTNESS_SAMPLE_WIDTH, BRIGHTNESS_SAMPLE_HEIGHT, { fit: 'fill' })
        .removeAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      let totalBrightness = 0;

      // Guard against invalid buffer size (need at least 3 bytes for one RGB pixel)
      if (data.length < 3) {
        bandBrightness.push(DEFAULT_BRIGHTNESS);
        continue;
      }

      const pixelCount = data.length / 3;

      for (let pixelIndex = 0; pixelIndex < data.length; pixelIndex += 3) {
        totalBrightness +=
          (data[pixelIndex] * BRIGHTNESS_RED_WEIGHT +
            data[pixelIndex + 1] * BRIGHTNESS_GREEN_WEIGHT +
            data[pixelIndex + 2] * BRIGHTNESS_BLUE_WEIGHT) /
          BRIGHTNESS_DIVISOR;
      }
      bandBrightness.push(totalBrightness / pixelCount);
    } catch {
      bandBrightness.push(DEFAULT_BRIGHTNESS);
    }
  }

  // Heuristic region detection based on position and brightness
  if (bandBrightness.length >= MIN_BANDS_FOR_DETECTION) {
    // Top region — likely header/nav
    regions.push({ role: 'header', bounds: { x: 0, y: 0, width, height: bandHeight } });

    // Middle region — main content
    const mainTop = bandHeight;
    const mainHeight = height - bandHeight * 2;
    regions.push({ role: 'main-content', bounds: { x: 0, y: mainTop, width, height: mainHeight } });

    // Check if top band is significantly different from middle (nav bar detection)
    const topBrightness = bandBrightness[0];
    const midBrightness = bandBrightness[Math.floor(bandBrightness.length / 2)];
    if (Math.abs(topBrightness - midBrightness) > BRIGHTNESS_DIFFERENCE_THRESHOLD) {
      regions.push({ role: 'navigation', bounds: { x: 0, y: 0, width, height: bandHeight } });
    }

    // Bottom region — likely footer
    const footerTop = height - bandHeight;
    regions.push({ role: 'footer', bounds: { x: 0, y: footerTop, width, height: bandHeight } });
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
