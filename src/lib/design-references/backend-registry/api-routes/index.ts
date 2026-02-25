import { registerBackendSnippets } from '../index.js';
import { restCrudSnippets } from './rest-crud.js';
import { restAdvancedSnippets } from './rest-advanced.js';
import { authRouteSnippets } from './auth-routes.js';
import { webhookRouteSnippets } from './webhook-routes.js';
import { fileRouteSnippets } from './file-routes.js';
import { realtimeRouteSnippets } from './realtime-routes.js';

export function registerApiRoutes(): void {
  registerBackendSnippets(restCrudSnippets);
  registerBackendSnippets(restAdvancedSnippets);
  registerBackendSnippets(authRouteSnippets);
  registerBackendSnippets(webhookRouteSnippets);
  registerBackendSnippets(fileRouteSnippets);
  registerBackendSnippets(realtimeRouteSnippets);
}

export {
  restCrudSnippets,
  restAdvancedSnippets,
  authRouteSnippets,
  webhookRouteSnippets,
  fileRouteSnippets,
  realtimeRouteSnippets,
};
