import type { IPageComposition } from './types.js';
import type { PageTemplateType } from '../../types.js';
import type { MoodTag, IndustryTag, VisualStyleId } from '../component-registry/types.js';
import { searchComponents } from '../component-registry/index.js';

const compositions: IPageComposition[] = [];

export function registerComposition(comp: IPageComposition): void {
  compositions.push(comp);
}

export function getComposition(id: string): IPageComposition | undefined {
  return compositions.find((c) => c.id === id);
}

interface IFindOptions {
  mood?: MoodTag[];
  industry?: IndustryTag[];
  visualStyle?: VisualStyleId;
}

export function findBestComposition(
  templateType: PageTemplateType,
  options?: IFindOptions
): IPageComposition | undefined {
  let candidates = compositions.filter((c) => c.templateType === templateType);

  if (options?.mood && options.mood.length > 0) {
    candidates = candidates.filter((c) => options.mood.some((m) => c.mood.includes(m)));
  }

  if (options?.industry && options.industry.length > 0) {
    candidates = candidates.filter((c) => options.industry.some((i) => c.industry.includes(i)));
  }

  if (options?.visualStyle) {
    candidates = candidates.filter((c) => c.visualStyles.includes(options.visualStyle));
  }

  return candidates[0];
}

interface IComposeOptions {
  mood?: MoodTag[];
  industry?: IndustryTag[];
  visualStyle?: VisualStyleId;
}

interface IComposedSection {
  id: string;
  name: string;
  jsx: string;
  snippetId?: string;
}

interface IComposedPage {
  jsx: string;
  sections: IComposedSection[];
  metadata: {
    compositionId: string;
    compositionName: string;
    layout: string;
    mood: MoodTag[];
    industry: IndustryTag[];
    visualStyles: VisualStyleId[];
  };
}

export function composePageFromTemplate(compositionId: string, options?: IComposeOptions): IComposedPage | null {
  const composition = getComposition(compositionId);
  if (!composition) {
    return null;
  }

  const composedSections: IComposedSection[] = [];

  for (const section of composition.sections) {
    const query = {
      ...section.query,
      ...(options?.mood?.length && { mood: options.mood[0] }),
      ...(options?.industry?.length && { industry: options.industry[0] }),
      ...(options?.visualStyle && { style: options.visualStyle }),
    };

    const results = searchComponents(query);
    const snippet = results[0];

    let jsx = '';
    let snippetId: string | undefined;

    if (snippet) {
      jsx = snippet.snippet.jsx;
      snippetId = snippet.snippet.id;
    } else if (section.fallbackSnippetId) {
      jsx = `<!-- Fallback: ${section.fallbackSnippetId} -->`;
      snippetId = section.fallbackSnippetId;
    } else {
      jsx = `<!-- Section: ${section.name} - No snippet found -->`;
    }

    const wrappedJsx = wrapSection(jsx, section.containerClasses, section.darkModeClasses);

    composedSections.push({
      id: section.id,
      name: section.name,
      jsx: wrappedJsx,
      snippetId,
    });
  }

  const pageJsx = wrapLayout(composedSections.map((s) => s.jsx).join('\n'), composition.layoutClasses);

  return {
    jsx: pageJsx,
    sections: composedSections,
    metadata: {
      compositionId: composition.id,
      compositionName: composition.name,
      layout: composition.layout,
      mood: composition.mood,
      industry: composition.industry,
      visualStyles: composition.visualStyles,
    },
  };
}

function wrapSection(jsx: string, containerClasses: string, darkModeClasses?: string): string {
  const classes = darkModeClasses ? `${containerClasses} ${darkModeClasses}` : containerClasses;
  return `<section className="${classes}">\n${jsx}\n</section>`;
}

function wrapLayout(content: string, layoutClasses: string): string {
  return `<div className="${layoutClasses}">\n${content}\n</div>`;
}

export { compositions };
export type { IPageComposition, IPageSection } from './types.js';
