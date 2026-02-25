import type { IBackendSnippet } from '../types.js';

export const webhookRouteSnippets: IBackendSnippet[] = [
  {
    id: 'api-webhook-stripe',
    name: 'Stripe Webhook Handler',
    category: 'api-route',
    type: 'webhook',
    variant: 'stripe',
    tags: ['webhook', 'stripe', 'payment', 'billing'],
    framework: ['nextjs-api', 'express'],
    patterns: ['event-driven', 'strategy'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { handleCheckoutCompleted } from '@/services/billing/checkout';
import { handleSubscriptionUpdated } from '@/services/billing/subscription';
import { handleInvoicePaid } from '@/services/billing/invoice';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const handlers: Record<string, (event: Stripe.Event) => Promise<void>> = {
  'checkout.session.completed': handleCheckoutCompleted,
  'customer.subscription.updated': handleSubscriptionUpdated,
  'customer.subscription.deleted': handleSubscriptionUpdated,
  'invoice.paid': handleInvoicePaid,
};

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }
  const handler = handlers[event.type];
  if (handler) {
    await handler(event);
  }
  return NextResponse.json({ received: true });
}`,
    dependencies: ['stripe', 'next'],
    envVars: ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'],
    quality: {
      securityChecks: [
        'signature verification before processing',
        'raw body parsing for signature',
        'strategy pattern for handlers',
      ],
      performanceConsiderations: ['only handle known event types', 'idempotent handlers recommended'],
      antiPatterns: ['never parse JSON before signature verification', 'never skip signature check in production'],
      inspirationSource: 'Stripe webhook best practices documentation',
    },
    testHint: 'Test valid signature, invalid signature, unknown event type, each handler type',
  },
  {
    id: 'api-webhook-github',
    name: 'GitHub Webhook Handler',
    category: 'api-route',
    type: 'webhook',
    variant: 'github',
    tags: ['webhook', 'github', 'ci', 'automation'],
    framework: ['nextjs-api', 'express'],
    patterns: ['event-driven', 'strategy'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';

const secret = process.env.GITHUB_WEBHOOK_SECRET!;

function verifySignature(payload: string, signature: string): boolean {
  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('x-hub-signature-256');
  if (!sig || !verifySignature(body, sig)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }
  const event = req.headers.get('x-github-event');
  const payload = JSON.parse(body);
  switch (event) {
    case 'push':
      await handlePush(payload);
      break;
    case 'pull_request':
      await handlePullRequest(payload);
      break;
    case 'issues':
      await handleIssue(payload);
      break;
  }
  return NextResponse.json({ received: true });
}

async function handlePush(payload: Record<string, unknown>) {
  // Process push event
}
async function handlePullRequest(payload: Record<string, unknown>) {
  // Process PR event
}
async function handleIssue(payload: Record<string, unknown>) {
  // Process issue event
}`,
    dependencies: ['next'],
    envVars: ['GITHUB_WEBHOOK_SECRET'],
    quality: {
      securityChecks: [
        'HMAC SHA-256 signature verification',
        'timingSafeEqual prevents timing attacks',
        'raw body for signature',
      ],
      performanceConsiderations: [
        'event type routing avoids unnecessary processing',
        'async handlers for non-blocking',
      ],
      antiPatterns: ['never use simple string comparison for signatures', 'never skip signature verification'],
      inspirationSource: 'GitHub webhook documentation + OWASP',
    },
    testHint: 'Test valid signature, invalid signature, each event type, unknown event',
  },
  {
    id: 'api-webhook-generic',
    name: 'Generic Webhook Receiver',
    category: 'api-route',
    type: 'webhook',
    variant: 'generic',
    tags: ['webhook', 'generic', 'receiver', 'idempotent'],
    framework: ['nextjs-api', 'express'],
    patterns: ['event-driven'],
    typescript: `import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyWebhookSignature } from '@/lib/webhook-verify';
import { processWebhookEvent, isEventProcessed } from '@/services/webhook-service';

const webhookSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  timestamp: z.coerce.date(),
  data: z.record(z.unknown()),
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('x-webhook-signature') ?? '';
  if (!verifyWebhookSignature(body, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }
  const event = webhookSchema.parse(JSON.parse(body));
  if (await isEventProcessed(event.id)) {
    return NextResponse.json({ received: true, deduplicated: true });
  }
  await processWebhookEvent(event);
  return NextResponse.json({ received: true });
}`,
    dependencies: ['zod', 'next'],
    quality: {
      securityChecks: ['signature verification', 'schema validation on payload', 'idempotency check prevents replay'],
      performanceConsiderations: ['deduplication via event ID index', 'early return for processed events'],
      antiPatterns: ['never process webhooks without idempotency', 'never trust unverified payloads'],
      inspirationSource: 'Svix webhook best practices',
    },
    testHint: 'Test valid event, duplicate event (idempotency), invalid signature, malformed payload',
  },
];
