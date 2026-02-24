import type { ITemplatePack } from './types.js';

const packs = new Map<string, ITemplatePack>();

export function registerPack(pack: ITemplatePack): void {
  packs.set(pack.id, pack);
}

export function getPack(id: string): ITemplatePack | undefined {
  return packs.get(id);
}

export function getAllPacks(): ITemplatePack[] {
  return Array.from(packs.values());
}

export function searchPacks(appType?: string): ITemplatePack[] {
  if (!appType) {
    return getAllPacks();
  }
  return getAllPacks().filter((pack) => pack.appType.toLowerCase() === appType.toLowerCase());
}
