export * from './types.js';
export * from './decision-engine.js';
export * from './state-patterns/index.js';

export { nextSaasTemplate } from './templates/next-saas.js';
export { nextAppTemplate } from './templates/next-app.js';
export { expressApiTemplate } from './templates/express-api.js';
export { fullstackMonoTemplate } from './templates/fullstack-mono.js';
export { reactSpaTemplate } from './templates/react-spa.js';

import type { IProjectTemplate, ProjectType } from './types.js';
import { nextSaasTemplate } from './templates/next-saas.js';
import { nextAppTemplate } from './templates/next-app.js';
import { expressApiTemplate } from './templates/express-api.js';
import { fullstackMonoTemplate } from './templates/fullstack-mono.js';
import { reactSpaTemplate } from './templates/react-spa.js';

export const templates: Record<ProjectType, IProjectTemplate> = {
  'next-saas': nextSaasTemplate,
  'next-app': nextAppTemplate,
  'express-api': expressApiTemplate,
  'fullstack-mono': fullstackMonoTemplate,
  'react-spa': reactSpaTemplate,
};

export const templateList: IProjectTemplate[] = [
  nextSaasTemplate,
  nextAppTemplate,
  expressApiTemplate,
  fullstackMonoTemplate,
  reactSpaTemplate,
];
