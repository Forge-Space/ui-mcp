export type IconLibrary = 'lucide' | 'heroicons' | 'phosphor' | 'tabler' | 'font-awesome' | 'radix';

export interface IIconMapping {
  generic: string;
  lucide: string;
  heroicons: string;
  phosphor: string;
  tabler: string;
  fontAwesome: string;
  radix: string;
}

export interface IIconSystem {
  library: IconLibrary;
  packageName: string;
  importPattern: string;
  iconPrefix?: string;
}
