import type { IBackendSnippet } from '../types.js';

export const metricsSnippets: IBackendSnippet[] = [
  {
    id: 'obs-metrics-custom',
    name: 'Custom Application Metrics',
    category: 'observability',
    type: 'metrics',
    variant: 'custom',
    tags: ['metrics', 'monitoring', 'prometheus', 'counter'],
    framework: ['framework-agnostic'],
    patterns: ['singleton'],
    typescript: `interface MetricValue {
  value: number;
  labels: Record<string, string>;
  timestamp: number;
}

class MetricsCollector {
  private counters = new Map<string, MetricValue[]>();
  private gauges = new Map<string, MetricValue>();

  incrementCounter(name: string, labels: Record<string, string> = {}, value = 1): void {
    const entries = this.counters.get(name) ?? [];
    entries.push({ value, labels, timestamp: Date.now() });
    this.counters.set(name, entries);
  }

  setGauge(name: string, value: number, labels: Record<string, string> = {}): void {
    this.gauges.set(name, { value, labels, timestamp: Date.now() });
  }

  getMetrics(): { counters: Record<string, number>; gauges: Record<string, number> } {
    const counters: Record<string, number> = {};
    for (const [name, entries] of this.counters) {
      counters[name] = entries.reduce((sum, e) => sum + e.value, 0);
    }
    const gauges: Record<string, number> = {};
    for (const [name, entry] of this.gauges) {
      gauges[name] = entry.value;
    }
    return { counters, gauges };
  }
}

export const metrics = new MetricsCollector();

metrics.incrementCounter('http_requests_total', { method: 'GET', path: '/api/items' });
metrics.setGauge('active_connections', 42);`,
    dependencies: [],
    quality: {
      securityChecks: ['no PII in metric labels', 'metrics endpoint should be auth-protected'],
      performanceConsiderations: ['in-memory storage for low latency', 'consider periodic flush to external service'],
      antiPatterns: ['never use high-cardinality labels', 'never store metrics without cleanup'],
      inspirationSource: 'Prometheus metric patterns for Node.js',
    },
    testHint: 'Test counter increment, gauge set, getMetrics aggregation, label support',
  },
];
