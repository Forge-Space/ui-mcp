import type { IBackendSnippet } from '../types.js';

export const fileRouteSnippets: IBackendSnippet[] = [
  {
    id: 'api-file-upload',
    name: 'File Upload Endpoint',
    category: 'api-route',
    type: 'file',
    variant: 'upload',
    tags: ['file', 'upload', 'multipart', 'storage'],
    framework: ['nextjs-api', 'express'],
    patterns: ['service-layer'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import { uploadFile } from '@/services/storage-service';

const ALLOWED_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'application/pdf',
]);
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export const POST = withAuth(async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: 'File type not allowed' }, { status: 415 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 413 });
  }
  const result = await uploadFile({
    buffer: Buffer.from(await file.arrayBuffer()),
    filename: file.name,
    contentType: file.type,
    uploadedBy: req.auth.userId,
  });
  return NextResponse.json({ data: result }, { status: 201 });
});`,
    dependencies: ['next'],
    envVars: ['STORAGE_BUCKET', 'STORAGE_REGION'],
    quality: {
      securityChecks: ['allowlist for file types', 'size limit enforced', 'auth required', 'content-type validated'],
      performanceConsiderations: ['stream to storage for large files', 'consider presigned URLs for direct upload'],
      antiPatterns: [
        'never trust client filename',
        'never store uploads in application directory',
        'never skip file type validation',
      ],
      inspirationSource: 'AWS S3 upload best practices',
    },
    testHint: 'Test valid upload, oversized file, invalid type, missing file, unauthorized',
  },
  {
    id: 'api-file-presigned-url',
    name: 'Presigned Upload URL',
    category: 'api-route',
    type: 'file',
    variant: 'presigned-url',
    tags: ['file', 'upload', 'presigned', 's3', 'direct'],
    framework: ['nextjs-api', 'express'],
    patterns: ['service-layer'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withAuth } from '@/middleware/auth';
import { generatePresignedUrl } from '@/services/storage-service';

const requestSchema = z.object({
  filename: z.string().min(1).max(255),
  contentType: z.string().regex(/^(image|application)\\/[\\w.+-]+$/),
  size: z.number().int().positive().max(50 * 1024 * 1024),
});

export const POST = withAuth(async (req: NextRequest) => {
  const body = requestSchema.parse(await req.json());
  const { uploadUrl, fileKey } = await generatePresignedUrl({
    ...body,
    userId: req.auth.userId,
    expiresIn: 300,
  });
  return NextResponse.json({ data: { uploadUrl, fileKey } });
});`,
    dependencies: ['zod', 'next', '@aws-sdk/s3-request-presigner'],
    envVars: ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'STORAGE_BUCKET'],
    quality: {
      securityChecks: [
        'content-type regex validation',
        'size limit pre-check',
        'short expiry (5min)',
        'user-scoped key',
      ],
      performanceConsiderations: ['direct client→S3 upload bypasses server', 'presigned URL expires quickly'],
      antiPatterns: ['never generate URLs with long expiry', 'never allow arbitrary content types'],
      inspirationSource: 'Vercel Blob upload patterns',
    },
    testHint: 'Test valid request, invalid content-type, oversized file, URL expiry',
  },
];
