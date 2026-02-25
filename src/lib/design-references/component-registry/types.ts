// --- Component Registry Types ---

export type ComponentCategory = 'atom' | 'molecule' | 'organism';

export type MoodTag =
  | 'bold'
  | 'calm'
  | 'playful'
  | 'professional'
  | 'premium'
  | 'energetic'
  | 'minimal'
  | 'editorial'
  | 'futuristic'
  | 'warm'
  | 'corporate'
  | 'creative';

export type IndustryTag =
  | 'saas'
  | 'fintech'
  | 'ecommerce'
  | 'healthcare'
  | 'education'
  | 'startup'
  | 'agency'
  | 'media'
  | 'devtools'
  | 'general';

export type VisualStyleId =
  | 'glassmorphism'
  | 'neubrutalism'
  | 'soft-depth'
  | 'bento-grid'
  | 'gradient-mesh'
  | 'dark-premium'
  | 'minimal-editorial'
  | 'linear-modern'
  | 'retro-playful'
  | 'corporate-trust';

export interface IComponentA11y {
  roles: string[];
  ariaAttributes: string[];
  htmlAttributes?: string[];
  keyboardNav: string;
  contrastRatio: string;
  focusVisible: boolean;
  reducedMotion: boolean;
}

export interface IComponentSeo {
  semanticElement: string;
  headingLevel?: string;
  landmark?: string;
}

export interface IComponentResponsive {
  strategy: 'mobile-first' | 'container-query';
  breakpoints: string[];
}

export interface IComponentQuality {
  antiGeneric: string[];
  inspirationSource: string;
  craftDetails: string[];
}

export interface IComponentSnippet {
  id: string;
  name: string;
  category: ComponentCategory;
  type: string;
  variant: string;
  tags: string[];
  mood: MoodTag[];
  industry: IndustryTag[];
  visualStyles: VisualStyleId[];
  jsx: string;
  tailwindClasses: Record<string, string>;
  css?: string;
  animations?: string[];
  dependencies?: string[];
  a11y: IComponentA11y;
  seo?: IComponentSeo;
  responsive: IComponentResponsive;
  quality: IComponentQuality;
}

// --- Visual Style Types ---

export interface IVisualStyle {
  id: VisualStyleId;
  name: string;
  description: string;
  classModifiers: Record<string, string>;
  cssVariables?: Record<string, string>;
  keyframes?: Record<string, string>;
  mood: MoodTag[];
  compatibleWith: string[];
}

// --- Micro-Interaction Types ---

export type AnimationCategory =
  | 'entrance'
  | 'hover'
  | 'scroll'
  | 'loading'
  | 'text'
  | 'transition'
  | 'feedback'
  | 'background'
  | 'button'
  | 'card'
  | 'list'
  | 'modal'
  | 'navigation'
  | 'chart';

export type AnimationPurpose = 'user-feedback' | 'attention' | 'delight' | 'confirmation' | 'orientation' | 'progress';

export interface IMicroInteraction {
  id: string;
  name: string;
  category: AnimationCategory;
  purpose: AnimationPurpose[];
  tailwindClasses: string;
  css?: string;
  keyframes?: string;
  reducedMotionFallback: string;
  duration: string;
  description: string;
}

// --- Search & Query Types ---

export interface IComponentQuery {
  type?: string;
  variant?: string;
  mood?: MoodTag;
  industry?: IndustryTag;
  style?: VisualStyleId;
  category?: ComponentCategory;
  tags?: string[];
}

export interface ISearchResult {
  snippet: IComponentSnippet;
  score: number;
}

// --- SEO Meta Types ---

export interface IMetaConfig {
  title: string;
  description: string;
  pageType?: string;
  siteName?: string;
  siteUrl?: string;
  locale?: string;
  keywords?: string[];
  canonical?: string;
  robots?: string;
  openGraph?: {
    title?: string;
    description?: string;
    type?: string;
    image?: string;
    url?: string;
    siteName?: string;
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
  };
}

export interface IJsonLdSchema {
  type: string;
  properties: Record<string, unknown>;
}

// --- Performance Pattern Types ---

export interface IPerformancePattern {
  id: string;
  name: string;
  category: string;
  code: string;
  description: string;
  impact: string;
}
