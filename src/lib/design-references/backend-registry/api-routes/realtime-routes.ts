import type { IBackendSnippet } from '../types.js';

export const realtimeRouteSnippets: IBackendSnippet[] = [
  {
    id: 'api-realtime-sse',
    name: 'Server-Sent Events Stream',
    category: 'api-route',
    type: 'realtime',
    variant: 'sse',
    tags: ['realtime', 'sse', 'stream', 'events'],
    framework: ['nextjs-api', 'express'],
    patterns: ['observer'],
    typescript: `import { NextRequest } from 'next/server';
import { withAuth } from '@/middleware/auth';
import { subscribe } from '@/services/event-bus';

export const GET = withAuth(async (req: NextRequest) => {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const unsubscribe = subscribe(
        req.auth.userId,
        (event: { type: string; data: unknown }) => {
          const message = \`event: \${event.type}\\ndata: \${JSON.stringify(event.data)}\\n\\n\`;
          controller.enqueue(encoder.encode(message));
        }
      );
      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(': heartbeat\\n\\n'));
      }, 30_000);
      req.signal.addEventListener('abort', () => {
        unsubscribe();
        clearInterval(heartbeat);
        controller.close();
      });
    },
  });
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
});`,
    dependencies: ['next'],
    quality: {
      securityChecks: ['auth required for stream', 'user-scoped events only', 'cleanup on disconnect'],
      performanceConsiderations: [
        'heartbeat keeps connection alive',
        'cleanup prevents memory leaks',
        'X-Accel-Buffering disables nginx buffering',
      ],
      antiPatterns: [
        'never skip heartbeat for SSE',
        'never forget to cleanup on disconnect',
        'never buffer SSE responses',
      ],
      inspirationSource: 'Vercel AI SDK streaming patterns',
    },
    testHint: 'Test connection establishment, event delivery, heartbeat, client disconnect cleanup',
  },
  {
    id: 'api-realtime-ai-stream',
    name: 'AI Response Streaming',
    category: 'api-route',
    type: 'realtime',
    variant: 'ai-stream',
    tags: ['ai', 'llm', 'stream', 'chat', 'openai'],
    framework: ['nextjs-api', 'express'],
    patterns: ['service-layer'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { withAuth } from '@/middleware/auth';
import { rateLimit } from '@/middleware/rate-limit';
import { checkUsageQuota } from '@/services/usage-service';

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().max(4000),
  })).min(1).max(50),
  model: z.enum(['gpt-4o', 'gpt-4o-mini']).default('gpt-4o-mini'),
});

export const POST = withAuth(
  rateLimit({ max: 20, windowMs: 60_000 })(
    async (req: NextRequest) => {
      const { messages, model } = chatSchema.parse(await req.json());
      const hasQuota = await checkUsageQuota(req.auth.userId);
      if (!hasQuota) {
        return NextResponse.json(
          { error: 'Usage quota exceeded' },
          { status: 429 }
        );
      }
      const result = streamText({
        model: openai(model),
        messages,
        maxTokens: 2000,
      });
      return result.toDataStreamResponse();
    }
  )
);`,
    dependencies: ['zod', 'next', 'ai', '@ai-sdk/openai'],
    envVars: ['OPENAI_API_KEY'],
    quality: {
      securityChecks: [
        'message content length capped',
        'conversation history limited',
        'usage quota check',
        'model allowlist',
      ],
      performanceConsiderations: [
        'streaming response for real-time UX',
        'maxTokens prevents runaway costs',
        'rate limited',
      ],
      antiPatterns: [
        'never expose API keys to client',
        'never allow unlimited token generation',
        'never skip usage tracking',
      ],
      inspirationSource: 'Vercel AI SDK chat API patterns',
    },
    testHint: 'Test valid chat, quota exceeded, invalid model, max message limit, streaming format',
  },
];
