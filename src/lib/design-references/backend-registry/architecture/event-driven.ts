import type { IBackendSnippet } from '../types.js';

export const eventDrivenSnippets: IBackendSnippet[] = [
  {
    id: 'arch-event-bus-typed',
    name: 'Typed Event Bus',
    category: 'architecture',
    type: 'event-driven',
    variant: 'typed-bus',
    tags: ['events', 'typed', 'pub-sub', 'bus'],
    framework: ['framework-agnostic'],
    patterns: ['event-driven', 'observer'],
    typescript: `interface EventMap {
  'user.created': { userId: string; email: string };
  'user.updated': { userId: string; changes: Record<string, unknown> };
  'order.placed': { orderId: string; total: number };
  'order.completed': { orderId: string };
}

type EventName = keyof EventMap;
type Handler<E extends EventName> = (data: EventMap[E]) => Promise<void>;

class TypedEventBus {
  private handlers = new Map<string, Handler<EventName>[]>();

  on<E extends EventName>(event: E, handler: Handler<E>): () => void {
    const list = this.handlers.get(event) ?? [];
    list.push(handler as Handler<EventName>);
    this.handlers.set(event, list);
    return () => {
      const idx = list.indexOf(handler as Handler<EventName>);
      if (idx >= 0) list.splice(idx, 1);
    };
  }

  async emit<E extends EventName>(event: E, data: EventMap[E]): Promise<void> {
    const list = this.handlers.get(event) ?? [];
    const results = await Promise.allSettled(
      list.map((h) => h(data))
    );
    for (const result of results) {
      if (result.status === 'rejected') {
        console.error(\`Event handler failed for \${event}:\`, result.reason);
      }
    }
  }
}

export const events = new TypedEventBus();`,
    dependencies: [],
    quality: {
      securityChecks: [
        'typed event map prevents typos',
        'unsubscribe function prevents memory leaks',
        'failed handlers logged',
      ],
      performanceConsiderations: ['Promise.allSettled for independent handlers', 'Map for O(1) event lookup'],
      antiPatterns: ['never use string literals without type map', 'never swallow handler errors silently'],
      inspirationSource: 'mitt event emitter + TypeScript generics',
    },
    testHint: 'Test type-safe emission, handler registration, unsubscribe, error isolation',
  },
  {
    id: 'arch-cqrs-lite',
    name: 'Lightweight CQRS Pattern',
    category: 'architecture',
    type: 'event-driven',
    variant: 'cqrs-lite',
    tags: ['cqrs', 'command', 'query', 'separation'],
    framework: ['framework-agnostic'],
    patterns: ['cqrs', 'service-layer'],
    typescript: `interface Command<T = void> {
  execute(): Promise<T>;
}

interface Query<T> {
  execute(): Promise<T>;
}

export class CreateOrderCommand implements Command<{ orderId: string }> {
  constructor(
    private readonly userId: string,
    private readonly items: Array<{ productId: string; qty: number }>
  ) {}

  async execute() {
    // Write to primary DB
    const orderId = crypto.randomUUID();
    // ... insert order
    return { orderId };
  }
}

export class GetOrdersQuery implements Query<Order[]> {
  constructor(
    private readonly userId: string,
    private readonly page: number
  ) {}

  async execute(): Promise<Order[]> {
    // Read from read replica / cache
    return [];
  }
}

interface Order {
  id: string;
  status: string;
  total: number;
}

export class CommandBus {
  async dispatch<T>(command: Command<T>): Promise<T> {
    return command.execute();
  }
}

export class QueryBus {
  async dispatch<T>(query: Query<T>): Promise<T> {
    return query.execute();
  }
}`,
    dependencies: [],
    quality: {
      securityChecks: ['commands and queries separated', 'each command/query is a single responsibility'],
      performanceConsiderations: ['queries can hit read replicas', 'commands hit primary DB', 'bus enables middleware'],
      antiPatterns: ['never mix read and write in same operation', 'never skip command validation'],
      inspirationSource: 'CQRS pattern simplified for Node.js',
    },
    testHint: 'Test command execution, query execution, bus dispatch, separation of concerns',
  },
];
