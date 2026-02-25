import type { IBackendSnippet } from '../types.js';

export const serviceLayerSnippets: IBackendSnippet[] = [
  {
    id: 'arch-service-with-di',
    name: 'Service with Dependency Injection',
    category: 'architecture',
    type: 'service-layer',
    variant: 'with-di',
    tags: ['service', 'di', 'dependency-injection', 'testable'],
    framework: ['framework-agnostic'],
    patterns: ['service-layer', 'repository'],
    typescript: `interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, data: Partial<User>): Promise<User>;
}

interface IEmailService {
  send(to: string, template: string, data: Record<string, unknown>): Promise<void>;
}

interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
}

export class UserService {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly emailService: IEmailService
  ) {}

  async upgradePlan(userId: string, newPlan: User['plan']): Promise<User> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');
    if (user.plan === newPlan) throw new Error('Already on this plan');
    const updated = await this.userRepo.update(userId, { plan: newPlan });
    await this.emailService.send(user.email, 'plan-upgraded', {
      name: user.name,
      plan: newPlan,
    });
    return updated;
  }
}`,
    dependencies: [],
    quality: {
      securityChecks: ['interface-based dependencies', 'business validation in service', 'no direct DB access'],
      performanceConsiderations: ['email sent after DB update', 'consider event bus for side effects'],
      antiPatterns: ['never inject concrete classes', 'never skip business validation'],
      inspirationSource: 'bulletproof-react service layer patterns',
    },
    testHint: 'Test with mock repo and email service: upgrade, same plan error, user not found',
  },
  {
    id: 'arch-service-event-driven',
    name: 'Event-Driven Service',
    category: 'architecture',
    type: 'service-layer',
    variant: 'event-driven',
    tags: ['service', 'events', 'pub-sub', 'decoupled'],
    framework: ['framework-agnostic'],
    patterns: ['event-driven', 'observer', 'service-layer'],
    typescript: `type EventHandler<T = unknown> = (data: T) => Promise<void>;

class EventBus {
  private handlers = new Map<string, EventHandler[]>();

  on<T>(event: string, handler: EventHandler<T>): void {
    const list = this.handlers.get(event) ?? [];
    list.push(handler as EventHandler);
    this.handlers.set(event, list);
  }

  async emit<T>(event: string, data: T): Promise<void> {
    const list = this.handlers.get(event) ?? [];
    await Promise.allSettled(
      list.map((handler) => handler(data))
    );
  }
}

export const eventBus = new EventBus();

export class OrderService {
  constructor(private readonly bus: EventBus) {}

  async createOrder(input: {
    userId: string;
    items: Array<{ productId: string; quantity: number }>;
  }) {
    const order = await saveOrder(input);
    await this.bus.emit('order.created', {
      orderId: order.id,
      userId: input.userId,
      total: order.total,
    });
    return order;
  }
}

async function saveOrder(input: unknown) {
  return { id: 'ord_1', total: 0, ...input as Record<string, unknown> };
}

eventBus.on('order.created', async (data: { userId: string }) => {
  // Send confirmation email
});

eventBus.on('order.created', async (data: { orderId: string }) => {
  // Update inventory
});`,
    dependencies: [],
    quality: {
      securityChecks: ['Promise.allSettled prevents one handler from blocking others', 'typed event data'],
      performanceConsiderations: [
        'async handlers run concurrently',
        'decoupled side effects',
        'consider queue for long-running handlers',
      ],
      antiPatterns: ['never use Promise.all for event handlers', 'never couple side effects to main logic'],
      inspirationSource: 'Node.js EventEmitter pattern + microservice patterns',
    },
    testHint: 'Test event emission, handler execution order, handler failure isolation',
  },
];
