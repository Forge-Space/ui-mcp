import type { IBackendSnippet } from '../types.js';

export const bundleOptimizationSnippets: IBackendSnippet[] = [
  {
    id: 'perf-dynamic-import',
    name: 'Dynamic Import Code Splitting',
    category: 'performance',
    type: 'bundle',
    variant: 'dynamic-import',
    tags: ['performance', 'code-splitting', 'dynamic-import', 'lazy'],
    framework: ['nextjs-api', 'nextjs-server-actions'],
    patterns: ['factory'],
    typescript: `import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const HeavyChart = dynamic(() => import('@/components/charts/analytics-chart'), {
  loading: () => <div className="h-64 animate-pulse rounded-lg bg-muted" />,
  ssr: false,
});

const MarkdownEditor = dynamic(
  () => import('@/components/editor/markdown-editor'),
  { ssr: false }
);

export function DashboardPage() {
  return (
    <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-muted" />}>
      <HeavyChart />
    </Suspense>
  );
}`,
    dependencies: ['next', 'react'],
    quality: {
      securityChecks: ['ssr: false prevents server-side rendering of client-only libs'],
      performanceConsiderations: [
        'reduces initial bundle by deferring heavy components',
        'loading skeleton prevents CLS',
        'Suspense boundary for streaming',
      ],
      antiPatterns: ['never dynamically import small components', 'never skip loading states'],
      inspirationSource: 'Next.js dynamic imports documentation',
    },
    testHint: 'Test loading state renders, component loads after hydration, SSR disabled',
  },
  {
    id: 'perf-image-optimization',
    name: 'Image Optimization Pattern',
    category: 'performance',
    type: 'bundle',
    variant: 'image-optimization',
    tags: ['performance', 'image', 'optimization', 'lazy-loading'],
    framework: ['nextjs-api'],
    patterns: ['factory'],
    typescript: `import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

export function OptimizedImage({
  src, alt, width, height, priority = false, className,
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={className}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4="
    />
  );
}`,
    dependencies: ['next'],
    quality: {
      securityChecks: ['alt text required for accessibility', 'explicit dimensions prevent CLS'],
      performanceConsiderations: [
        'responsive sizes attribute',
        'blur placeholder prevents CLS',
        'priority for above-fold images only',
      ],
      antiPatterns: ['never skip width/height (causes CLS)', 'never use priority on below-fold images'],
      inspirationSource: 'Next.js Image optimization documentation',
    },
    testHint: 'Test priority rendering, lazy loading default, sizes attribute, blur placeholder',
  },
];
