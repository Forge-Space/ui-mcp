import type { MoodTag, VisualStyleId } from '../component-registry/types.js';

export interface ITemplatePack {
  id: string;
  name: string;
  description: string;
  appType: string;
  pages: {
    path: string;
    compositionId: string;
    title: string;
    isIndex: boolean;
  }[];
  theme: {
    colorSystemId: string;
    fontPairingId: string;
    visualStyle: VisualStyleId;
    mood: MoodTag;
  };
  sharedComponents: string[];
  quality: {
    antiGeneric: string[];
    designPhilosophy: string;
    inspirationSources: string[];
  };
}
