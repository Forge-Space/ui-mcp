import type { MoodTag, IndustryTag, VisualStyleId, IComponentQuery } from '../component-registry/types.js';
import type { PageTemplateType } from '../../types.js';

export interface IPageSection {
  id: string;
  name: string;
  query: IComponentQuery;
  fallbackSnippetId?: string;
  containerClasses: string;
  darkModeClasses?: string;
}

export interface IPageComposition {
  id: string;
  name: string;
  description: string;
  templateType: PageTemplateType;
  sections: IPageSection[];
  layout: 'single-column' | 'sidebar-left' | 'sidebar-right' | 'split';
  layoutClasses: string;
  mood: MoodTag[];
  industry: IndustryTag[];
  visualStyles: VisualStyleId[];
  quality: {
    antiGeneric: string[];
    inspirationSource: string;
    designPhilosophy: string;
  };
}
