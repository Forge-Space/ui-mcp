export type ProjectType = 'next-saas' | 'next-app' | 'express-api' | 'fullstack-mono' | 'react-spa';

export type AppType = 'saas' | 'ecommerce' | 'dashboard' | 'landing' | 'api';

export type Scale = 'solo' | 'team' | 'enterprise';

export type DeployTarget = 'vercel' | 'cloudflare' | 'docker' | 'aws';

export type StateManagement = 'zustand' | 'redux-toolkit' | 'tanstack-query' | 'jotai';

export interface IProjectTemplate {
  id: ProjectType;
  name: string;
  description: string;
  appTypes: AppType[];
  scales: Scale[];
  structure: IDirectoryStructure;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  configFiles: IConfigFile[];
  features: string[];
}

export interface IDirectoryStructure {
  [path: string]: 'file' | 'directory' | IDirectoryStructure;
}

export interface IConfigFile {
  path: string;
  content: string;
}

export interface IScaffoldOptions {
  projectName: string;
  projectType: ProjectType;
  appType?: AppType;
  scale?: Scale;
  deployTarget?: DeployTarget;
  stateManagement?: StateManagement;
  features?: string[];
}
