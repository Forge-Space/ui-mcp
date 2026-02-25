import type { IProjectTemplate, IScaffoldOptions, ProjectType, AppType, Scale } from './types.js';
import { nextSaasTemplate } from './templates/next-saas.js';
import { nextAppTemplate } from './templates/next-app.js';
import { expressApiTemplate } from './templates/express-api.js';
import { fullstackMonoTemplate } from './templates/fullstack-mono.js';
import { reactSpaTemplate } from './templates/react-spa.js';

const templates: IProjectTemplate[] = [
  nextSaasTemplate,
  nextAppTemplate,
  expressApiTemplate,
  fullstackMonoTemplate,
  reactSpaTemplate,
];

export function getTemplate(projectType: ProjectType): IProjectTemplate {
  const template = templates.find((t) => t.id === projectType);
  if (!template) {
    throw new Error(`Template not found for project type: ${projectType}`);
  }
  return template;
}

export function getAllTemplates(): IProjectTemplate[] {
  return templates;
}

export interface ITemplateSelectionCriteria {
  appType?: AppType;
  scale?: Scale;
  features?: string[];
  needsMonorepo?: boolean;
  needsBackend?: boolean;
}

export function selectTemplate(criteria: ITemplateSelectionCriteria): ProjectType {
  const { appType, scale, features, needsMonorepo, needsBackend } = criteria;

  // API-only projects
  if (appType === 'api' || needsBackend === true) {
    return 'express-api';
  }

  // Monorepo requirements
  if (needsMonorepo === true) {
    if (appType === 'saas' || scale === 'enterprise') {
      return 'next-saas';
    }
    return 'fullstack-mono';
  }

  // SaaS with enterprise scale
  if (appType === 'saas' && scale === 'enterprise') {
    return 'next-saas';
  }

  // SaaS with team scale or specific features
  if (appType === 'saas') {
    const requiresMonorepo =
      features?.some((f) => ['authentication', 'payments', 'billing', 'multi-tenant'].includes(f.toLowerCase())) ??
      false;

    if (requiresMonorepo || scale === 'team') {
      return 'next-saas';
    }
    return 'next-app';
  }

  // Ecommerce typically needs monorepo structure
  if (appType === 'ecommerce') {
    return scale === 'enterprise' || scale === 'team' ? 'next-saas' : 'fullstack-mono';
  }

  // Dashboard applications
  if (appType === 'dashboard') {
    if (scale === 'enterprise') {
      return 'next-saas';
    }
    if (scale === 'team') {
      return 'fullstack-mono';
    }
    // Solo developer dashboards - could be SPA or Next.js
    const prefersSPA = features?.some((f) => ['client-only', 'static', 'spa'].includes(f.toLowerCase())) ?? false;
    return prefersSPA ? 'react-spa' : 'next-app';
  }

  // Landing pages
  if (appType === 'landing') {
    // Static landing pages work well as SPAs
    const needsSSR = features?.some((f) => ['ssr', 'seo', 'dynamic-content'].includes(f.toLowerCase())) ?? false;
    return needsSSR ? 'next-app' : 'react-spa';
  }

  // Default fallback based on scale
  if (scale === 'enterprise') {
    return 'next-saas';
  }
  if (scale === 'team') {
    return 'fullstack-mono';
  }

  // Solo developer default
  return 'next-app';
}

export function customizeTemplate(template: IProjectTemplate, options: IScaffoldOptions): IProjectTemplate {
  const customized: IProjectTemplate = {
    ...template,
    name: options.projectName,
  };

  // Remove features not requested
  if (options.features && options.features.length > 0) {
    customized.features = template.features.filter((feature) =>
      options.features?.some((f) => feature.toLowerCase().includes(f.toLowerCase()))
    );
  }

  // Customize dependencies based on state management choice
  if (options.stateManagement) {
    switch (options.stateManagement) {
      case 'zustand':
        customized.dependencies['zustand'] = '^5.0.3';
        break;
      case 'redux-toolkit':
        customized.dependencies['@reduxjs/toolkit'] = '^2.5.0';
        customized.dependencies['react-redux'] = '^9.2.0';
        break;
      case 'tanstack-query':
        customized.dependencies['@tanstack/react-query'] = '^5.62.14';
        break;
      case 'jotai':
        customized.dependencies['jotai'] = '^2.10.4';
        break;
    }
  }

  // Add deployment-specific configurations
  if (options.deployTarget) {
    switch (options.deployTarget) {
      case 'vercel':
        customized.configFiles.push({
          path: 'vercel.json',
          content: JSON.stringify(
            {
              buildCommand: 'pnpm build',
              outputDirectory: '.next',
              installCommand: 'pnpm install',
            },
            null,
            2
          ),
        });
        break;
      case 'cloudflare':
        customized.dependencies['@opennextjs/cloudflare'] = '^1.17.0';
        customized.configFiles.push({
          path: 'wrangler.jsonc',
          content: JSON.stringify(
            {
              name: options.projectName,
              compatibility_date: '2024-12-01',
              pages_build_output_dir: '.vercel/output/static',
            },
            null,
            2
          ),
        });
        break;
      case 'docker':
        // Dockerfile already included in some templates
        if (!customized.configFiles.some((f) => f.path === 'Dockerfile')) {
          customized.configFiles.push({
            path: 'Dockerfile',
            content: `FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]`,
          });
        }
        break;
    }
  }

  return customized;
}

export function getRecommendations(criteria: ITemplateSelectionCriteria): {
  primary: ProjectType;
  alternatives: ProjectType[];
  reasoning: string;
} {
  const primary = selectTemplate(criteria);
  const all = templates.map((t) => t.id);
  const alternatives = all.filter((t) => t !== primary);

  let reasoning = `Selected ${primary} because: `;

  if (criteria.appType === 'api') {
    reasoning += 'Project requires API-only architecture with clean separation of concerns.';
  } else if (criteria.needsMonorepo) {
    reasoning += 'Project requires monorepo structure for code sharing and parallel development.';
  } else if (criteria.scale === 'enterprise') {
    reasoning += 'Enterprise scale requires robust architecture with scalability in mind.';
  } else if (criteria.scale === 'solo') {
    reasoning += 'Solo developer workflow benefits from simpler setup with full features.';
  } else {
    reasoning += 'Best fit based on app type and scale requirements.';
  }

  return {
    primary,
    alternatives: alternatives.slice(0, 2),
    reasoning,
  };
}
