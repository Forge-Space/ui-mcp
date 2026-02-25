import type { IBackendSnippet } from '../types.js';

export const apiVersioningSnippets: IBackendSnippet[] = [
  {
    id: 'doc-versioning-url',
    name: 'URL-Based API Versioning',
    category: 'documentation',
    type: 'versioning',
    variant: 'url',
    tags: ['versioning', 'api', 'migration', 'backwards-compatible'],
    framework: ['nextjs-api'],
    patterns: ['strategy'],
    typescript: `// File structure:
// app/api/v1/items/route.ts
// app/api/v2/items/route.ts

// app/api/v1/items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getItemsV1 } from '@/services/items/v1';

export async function GET(req: NextRequest) {
  const items = await getItemsV1(req);
  return NextResponse.json({ data: items, version: 'v1' });
}

// app/api/v2/items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getItemsV2 } from '@/services/items/v2';

export async function GET(req: NextRequest) {
  const items = await getItemsV2(req);
  return NextResponse.json({ data: items, version: 'v2' });
}

// middleware.ts — redirect latest to current version
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CURRENT_VERSION = 'v2';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/api/') && !pathname.match(/\\/api\\/v\\d+\\//)) {
    const newUrl = req.nextUrl.clone();
    newUrl.pathname = pathname.replace('/api/', \`/api/\${CURRENT_VERSION}/\`);
    return NextResponse.rewrite(newUrl);
  }
}`,
    dependencies: ['next'],
    quality: {
      securityChecks: ['version isolation prevents cross-contamination', 'middleware rewrite is transparent to client'],
      performanceConsiderations: [
        'file-system routing for version isolation',
        'middleware rewrite avoids redirect overhead',
      ],
      antiPatterns: ['never break existing API versions without deprecation', 'never mix versions in same handler'],
      inspirationSource: 'Stripe API versioning strategy',
    },
    testHint: 'Test v1 and v2 endpoints separately, unversioned URL redirects to current, response version field',
  },
];
