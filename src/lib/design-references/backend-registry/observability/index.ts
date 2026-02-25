import { registerBackendSnippets } from '../index.js';
import { structuredLoggingSnippets } from './structured-logging.js';
import { healthCheckSnippets } from './health-checks.js';
import { metricsSnippets } from './metrics.js';

export function registerObservability(): void {
  registerBackendSnippets(structuredLoggingSnippets);
  registerBackendSnippets(healthCheckSnippets);
  registerBackendSnippets(metricsSnippets);
}

export { structuredLoggingSnippets, healthCheckSnippets, metricsSnippets };
