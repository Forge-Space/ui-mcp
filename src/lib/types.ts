export interface IDesignContext {
  typography: {
    fontFamily: string;
    headingFont?: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    fontWeight: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    lineHeight: {
      tight: string;
      normal: string;
      relaxed: string;
    };
  };
  colorPalette: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    destructive: string;
    destructiveForeground: string;
  };
  spacing: {
    unit: number;
    scale: number[];
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  iconSet?: string;
  animationLib?: string;
  buttonVariants?: IButtonVariant[];
}

export interface IButtonVariant {
  name: string;
  className: string;
  styles: Record<string, string>;
}

export interface IGeneratedFile {
  path: string;
  content: string;
  encoding?: 'utf-8' | 'base64';
}

export interface IScreenElement {
  id: string;
  type: 'heading' | 'text' | 'button' | 'input' | 'image' | 'card' | 'nav' | 'list' | 'container' | 'icon' | 'divider';
  label?: string;
  placeholder?: string;
  children?: IScreenElement[];
  styles?: Record<string, string>;
  action?: string;
}

export interface ITransition {
  from: string;
  to: string;
  trigger: 'click' | 'tap' | 'hover' | 'auto';
  animation?: 'fade' | 'slide-left' | 'slide-right' | 'slide-up' | 'none';
  targetElement?: string;
}

export interface IPrototypeScreen {
  id: string;
  name: string;
  description?: string;
  elements: IScreenElement[];
  transitions: ITransition[];
}

export interface IFigmaVariable {
  name: string;
  type: 'COLOR' | 'FLOAT' | 'STRING';
  value: string | number;
  collection?: string;
}

export interface IFigmaDesignToken {
  name: string;
  type: string;
  value: string | number;
  category: 'color' | 'spacing' | 'typography' | 'borderRadius' | 'shadow';
}

export interface ITailwindMapping {
  className: string;
  cssProperty: string;
  value: string;
}

export type Framework = 'react' | 'nextjs' | 'vue' | 'angular' | 'svelte' | 'html';
export type Styling = 'tailwindcss';
export type Architecture = 'flat' | 'feature-based' | 'atomic';
export type StateManagement = 'useState' | 'zustand' | 'pinia' | 'signals' | 'none';
export type ImageOutputFormat = 'svg' | 'png';
export type ImageType = 'wireframe' | 'mockup' | 'component_preview';
export type PrototypeOutputFormat = 'html' | 'html_bundle';

// --- Component Library Integration ---
export type ComponentLibraryId = 'shadcn' | 'radix' | 'headlessui' | 'primevue' | 'material' | 'none';

// --- Page Template Types ---
export type PageTemplateType =
  | 'landing'
  | 'dashboard'
  | 'auth_login'
  | 'auth_signup'
  | 'pricing'
  | 'settings'
  | 'crud_table'
  | 'blog_list'
  | 'onboarding'
  | 'error_404';

// --- Accessibility Audit ---
export type AccessibilitySeverity = 'error' | 'warning' | 'info';

export interface IAccessibilityIssue {
  rule: string;
  severity: AccessibilitySeverity;
  message: string;
  element?: string;
  suggestion: string;
  wcagCriteria?: string;
}

export interface IAccessibilityReport {
  score: number;
  issues: IAccessibilityIssue[];
  summary: { errors: number; warnings: number; info: number };
  passed: string[];
}

// --- Design References ---

export interface IFontPairing {
  name: string;
  heading: { family: string; weights: number[]; googleFontsUrl: string };
  body: { family: string; weights: number[]; googleFontsUrl: string };
  accent?: { family: string; weights: number[]; googleFontsUrl: string };
  mood: string[];
  bestFor: string[];
  cssImport: string;
}

export interface IColorSystem {
  name: string;
  description: string;
  mood: string[];
  light: Record<string, string>;
  dark: Record<string, string>;
  tailwindExtend: Record<string, Record<string, string>>;
}

export interface ISpacingSystem {
  baseUnit: number;
  scale: Record<string, string>;
  breakpoints: Record<string, string>;
  containers: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
}

export interface IIconLibrary {
  name: string;
  style: string;
  count: string;
  importPackage: Record<string, string>;
  cdnUrl?: string;
  recommended: string[];
}

export interface IAnimationPreset {
  name: string;
  category: 'transition' | 'micro-interaction' | 'loading' | 'scroll';
  css: string;
  tailwindClass?: string;
  duration: string;
}

export interface ILayoutPattern {
  name: string;
  description: string;
  components: string[];
  useCase: string[];
  responsiveBehavior: string;
  tailwindClasses: Record<string, string>;
}

export interface IComponentLibrary {
  name: string;
  description: string;
  frameworks: string[];
  installPackage: Record<string, string>;
  docsUrl: string;
  features: string[];
  recommended: boolean;
}

export interface IInspirationSource {
  name: string;
  url: string;
  category: 'gallery' | 'design-system' | 'typography' | 'color' | 'icons';
  description: string;
  priority: number;
}

// --- Design Reference Analysis ---

export interface IDesignReferenceInput {
  urls?: string[];
  images?: Array<{ data: string; mimeType: string; label?: string }>;
}

export interface IScrapedPage {
  url: string;
  title: string;
  screenshot?: Buffer;
  colors: string[];
  fonts: string[];
  fontSizes: string[];
  spacing: string[];
  layoutPatterns: string[];
  componentTypes: string[];
  meta: Record<string, string>;
}

export interface IImageAnalysis {
  label: string;
  dominantColors: Array<{ hex: string; percentage: number }>;
  layoutRegions: Array<{ role: string; bounds: { x: number; y: number; width: number; height: number } }>;
  detectedComponents: string[];
  dimensions: { width: number; height: number };
}

export interface IPatternMatch {
  category: 'color' | 'typography' | 'layout' | 'component' | 'spacing';
  pattern: string;
  confidence: number;
  sources: string[];
}

export interface IDesignAnalysisResult {
  references: Array<{ source: string; colors: string[]; fonts: string[]; layouts: string[]; components: string[] }>;
  commonPatterns: IPatternMatch[];
  suggestedContext: Partial<IDesignContext>;
  screenshots: Array<{ source: string; data: string }>;
}
