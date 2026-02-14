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

export type Framework = 'react' | 'nextjs' | 'vue' | 'angular';
export type Styling = 'tailwindcss';
export type Architecture = 'flat' | 'feature-based' | 'atomic';
export type StateManagement = 'useState' | 'zustand' | 'pinia' | 'signals' | 'none';
export type ImageOutputFormat = 'svg' | 'png';
export type ImageType = 'wireframe' | 'mockup' | 'component_preview';
export type PrototypeOutputFormat = 'html' | 'html_bundle';
