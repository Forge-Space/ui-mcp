import type { IMetaConfig, IJsonLdSchema, IPerformancePattern } from '../component-registry/types.js';

// --- Utility Functions ---

/**
 * Escape HTML special characters to prevent XSS.
 * Handles all five XML entities for robust HTML escaping.
 */
function escapeHtml(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// --- SEO Meta Generation ---

export function generateMetaTags(config: IMetaConfig): string {
  const tags: string[] = [];

  tags.push(`<title>${escapeHtml(config.title)}</title>`);
  tags.push(`<meta name="description" content="${escapeHtml(config.description)}" />`);

  if (config.keywords && config.keywords.length > 0) {
    tags.push(`<meta name="keywords" content="${escapeHtml(config.keywords.join(', '))}" />`);
  }

  if (config.canonical) {
    tags.push(`<link rel="canonical" href="${escapeHtml(config.canonical)}" />`);
  }

  // Open Graph
  if (config.openGraph) {
    const og = config.openGraph;
    tags.push(`<meta property="og:title" content="${escapeHtml(og.title ?? config.title)}" />`);
    tags.push(`<meta property="og:description" content="${escapeHtml(og.description ?? config.description)}" />`);
    tags.push(`<meta property="og:type" content="${escapeHtml(og.type ?? 'website')}" />`);
    if (og.image) tags.push(`<meta property="og:image" content="${escapeHtml(og.image)}" />`);
    if (og.url) tags.push(`<meta property="og:url" content="${escapeHtml(og.url)}" />`);
    if (og.siteName) tags.push(`<meta property="og:site_name" content="${escapeHtml(og.siteName)}" />`);
  }

  // Twitter Card
  if (config.twitter) {
    const tw = config.twitter;
    tags.push(`<meta name="twitter:card" content="${escapeHtml(tw.card ?? 'summary_large_image')}" />`);
    if (tw.site) tags.push(`<meta name="twitter:site" content="${escapeHtml(tw.site)}" />`);
    if (tw.creator) tags.push(`<meta name="twitter:creator" content="${escapeHtml(tw.creator)}" />`);
    tags.push(`<meta name="twitter:title" content="${escapeHtml(tw.title ?? config.title)}" />`);
    tags.push(`<meta name="twitter:description" content="${escapeHtml(tw.description ?? config.description)}" />`);
    if (tw.image) tags.push(`<meta name="twitter:image" content="${escapeHtml(tw.image)}" />`);
  }

  // Robots
  if (config.robots) {
    tags.push(`<meta name="robots" content="${escapeHtml(config.robots)}" />`);
  }

  return tags.join('\n  ');
}

/**
 * Generate Next.js Metadata API export for app router.
 */
export function generateNextMetadata(config: IMetaConfig): string {
  const lines: string[] = [];
  lines.push(`import type { Metadata } from 'next';`);
  lines.push('');
  lines.push('export const metadata: Metadata = {');
  lines.push(`  title: ${JSON.stringify(config.title)},`);
  lines.push(`  description: ${JSON.stringify(config.description)},`);

  if (config.keywords && config.keywords.length > 0) {
    lines.push(`  keywords: ${JSON.stringify(config.keywords)},`);
  }

  if (config.openGraph) {
    const og = config.openGraph;
    lines.push('  openGraph: {');
    lines.push(`    title: ${JSON.stringify(og.title ?? config.title)},`);
    lines.push(`    description: ${JSON.stringify(og.description ?? config.description)},`);
    lines.push(`    type: ${JSON.stringify(og.type ?? 'website')},`);
    if (og.image) lines.push(`    images: [${JSON.stringify(og.image)}],`);
    if (og.url) lines.push(`    url: ${JSON.stringify(og.url)},`);
    if (og.siteName) lines.push(`    siteName: ${JSON.stringify(og.siteName)},`);
    lines.push('  },');
  }

  if (config.twitter) {
    const tw = config.twitter;
    lines.push('  twitter: {');
    lines.push(`    card: ${JSON.stringify(tw.card ?? 'summary_large_image')},`);
    if (tw.site) lines.push(`    site: ${JSON.stringify(tw.site)},`);
    if (tw.creator) lines.push(`    creator: ${JSON.stringify(tw.creator)},`);
    lines.push(`    title: ${JSON.stringify(tw.title ?? config.title)},`);
    lines.push(`    description: ${JSON.stringify(tw.description ?? config.description)},`);
    if (tw.image) lines.push(`    images: [${JSON.stringify(tw.image)}],`);
    lines.push('  },');
  }

  if (config.robots) {
    lines.push(`  robots: ${JSON.stringify(config.robots)},`);
  }

  if (config.canonical) {
    lines.push('  alternates: {');
    lines.push(`    canonical: ${JSON.stringify(config.canonical)},`);
    lines.push('  },');
  }

  lines.push('};');

  return lines.join('\n');
}

// --- JSON-LD Structured Data ---

export function generateJsonLd(schema: IJsonLdSchema): string {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': schema.type,
    ...schema.properties,
  };

  // Escape closing script tags to prevent XSS injection
  const jsonString = JSON.stringify(jsonLd, null, 2).replace(/<\/script>/gi, '<\\/script>');
  return `<script type="application/ld+json">\n${jsonString}\n</script>`;
}

export function generateNextJsonLd(schema: IJsonLdSchema): string {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': schema.type,
    ...schema.properties,
  };

  const serialized = JSON.stringify(jsonLd, null, 2);

  const lines: string[] = [];
  lines.push(`export default function JsonLd() {`);
  lines.push(`  return (`);
  lines.push(`    <script`);
  lines.push(`      type="application/ld+json"`);
  lines.push(`      dangerouslySetInnerHTML={{ __html: ${JSON.stringify(serialized)} }}`);
  lines.push(`    />`);
  lines.push(`  );`);
  lines.push(`}`);

  return lines.join('\n');
}

// --- Common JSON-LD Templates ---

export function createOrganizationSchema(opts: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
}): IJsonLdSchema {
  return {
    type: 'Organization',
    properties: {
      name: opts.name,
      url: opts.url,
      ...(opts.logo ? { logo: opts.logo } : {}),
      ...(opts.description ? { description: opts.description } : {}),
    },
  };
}

export function createWebPageSchema(opts: { name: string; description: string; url: string }): IJsonLdSchema {
  return {
    type: 'WebPage',
    properties: {
      name: opts.name,
      description: opts.description,
      url: opts.url,
    },
  };
}

export function createProductSchema(opts: {
  name: string;
  description: string;
  image?: string;
  brand?: string;
  price?: string;
  currency?: string;
}): IJsonLdSchema {
  const properties: Record<string, unknown> = {
    name: opts.name,
    description: opts.description,
  };
  if (opts.image) properties.image = opts.image;
  if (opts.brand) properties.brand = { '@type': 'Brand', name: opts.brand };
  if (opts.price && opts.currency) {
    properties.offers = {
      '@type': 'Offer',
      price: opts.price,
      priceCurrency: opts.currency,
    };
  }
  return { type: 'Product', properties };
}

// --- Performance Patterns ---

export const performancePatterns: IPerformancePattern[] = [
  {
    id: 'lazy-image',
    name: 'Lazy-Loaded Image',
    description: 'Native lazy loading with aspect ratio placeholder to prevent CLS',
    code: `<img
  src="/image.webp"
  alt="Descriptive alt text"
  width={800}
  height={600}
  loading="lazy"
  decoding="async"
  className="aspect-[4/3] w-full rounded-lg object-cover"
/>`,
    impact: 'LCP/CLS',
    category: 'images',
  },
  {
    id: 'next-image',
    name: 'Next.js Optimized Image',
    description: 'Automatic format conversion, responsive sizes, blur placeholder',
    code: `import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={630}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
  className="aspect-[1200/630] w-full rounded-lg object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
/>`,
    impact: 'LCP/CLS',
    category: 'images',
  },
  {
    id: 'font-optimization',
    name: 'Font Loading Strategy',
    description: 'Preload critical fonts, use font-display: swap, subset fonts',
    code: `// Next.js (app router)
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

// In layout: <body className={\`\${inter.variable} \${mono.variable}\`}>

// HTML fallback:
// <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin />
// body { font-family: 'Inter', system-ui, -apple-system, sans-serif; font-display: swap; }`,
    impact: 'CLS/FCP',
    category: 'fonts',
  },
  {
    id: 'code-splitting',
    name: 'Dynamic Import / Code Splitting',
    description: 'Lazy-load heavy components to reduce initial bundle size',
    code: `// React lazy loading
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./components/HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-muted" />}>
      <HeavyChart />
    </Suspense>
  );
}

// Next.js dynamic import
import dynamic from 'next/dynamic';

const DynamicEditor = dynamic(() => import('./components/Editor'), {
  loading: () => <div className="h-96 animate-pulse rounded-lg bg-muted" />,
  ssr: false,
});`,
    impact: 'TBT/INP',
    category: 'bundling',
  },
  {
    id: 'skeleton-loading',
    name: 'Skeleton Loading Pattern',
    description: 'Match component dimensions to prevent layout shift during loading',
    code: `function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm" aria-busy="true" aria-label="Loading">
      <div className="space-y-4">
        <div className="h-5 w-1/3 animate-pulse rounded-md bg-muted" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-4/5 animate-pulse rounded-md bg-muted" />
        </div>
      </div>
    </div>
  );
}`,
    impact: 'CLS',
    category: 'loading',
  },
  {
    id: 'reduced-motion',
    name: 'Reduced Motion Support',
    description: 'Respect user preferences for reduced motion via prefers-reduced-motion',
    code: `// Tailwind CSS approach
<div className="animate-bounce motion-reduce:animate-none" />
<div className="transition-transform motion-reduce:transition-none" />

// CSS approach
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

// JS detection
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;`,
    impact: 'accessibility',
    category: 'a11y',
  },
  {
    id: 'semantic-html',
    name: 'Semantic HTML Structure',
    description: 'Proper landmark elements and heading hierarchy for SEO and accessibility',
    code: `<body>
  <header>
    <nav aria-label="Main navigation">...</nav>
  </header>
  <main>
    <section aria-labelledby="hero-heading">
      <h1 id="hero-heading">Page Title</h1>
    </section>
    <section aria-labelledby="features-heading">
      <h2 id="features-heading">Features</h2>
    </section>
  </main>
  <aside aria-label="Sidebar">...</aside>
  <footer aria-label="Site footer">...</footer>
</body>`,
    impact: 'SEO/a11y',
    category: 'structure',
  },
];

export function getPerformancePattern(id: string): IPerformancePattern | undefined {
  return performancePatterns.find((p) => p.id === id);
}

export function getPerformancePatternsByCategory(category: string): IPerformancePattern[] {
  return performancePatterns.filter((p) => p.category === category);
}

export type { IMetaConfig, IJsonLdSchema, IPerformancePattern } from '../component-registry/types.js';
