import { registerPack } from './index.js';
import { saasDashboardPack } from './saas-dashboard/pack.js';
import { startupLandingPack } from './startup-landing/pack.js';
import { aiChatAppPack } from './ai-chat-app/pack.js';

export function initializePacks(): void {
  registerPack(saasDashboardPack);
  registerPack(startupLandingPack);
  registerPack(aiChatAppPack);
}
