import type { IconLibrary, IIconMapping } from './types.js';
import { iconSystems } from './icon-registry.js';
import {
  lucideMappings,
  heroinconsMappings,
  phosphorMappings,
  tablerMappings,
  fontAwesomeMappings,
  radixMappings,
} from './mappings/index.js';

const iconMappingsRegistry: Record<IconLibrary, IIconMapping[]> = {
  lucide: lucideMappings,
  heroicons: heroinconsMappings,
  phosphor: phosphorMappings,
  tabler: tablerMappings,
  'font-awesome': fontAwesomeMappings,
  radix: radixMappings,
};

function getLibrarySpecificIcon(genericName: string, library: IconLibrary): string | null {
  const mappings = iconMappingsRegistry[library];
  const mapping = mappings.find((m) => m.generic === genericName);

  if (!mapping) {
    return null;
  }

  switch (library) {
    case 'lucide':
      return mapping.lucide;
    case 'heroicons':
      return mapping.heroicons;
    case 'phosphor':
      return mapping.phosphor;
    case 'tabler':
      return mapping.tabler;
    case 'font-awesome':
      return mapping.fontAwesome;
    case 'radix':
      return mapping.radix;
    default:
      return null;
  }
}

export function resolveIcon(
  genericName: string,
  library: IconLibrary
): { importStatement: string; componentJsx: string } | null {
  const iconSystem = iconSystems[library];
  const libraryIcon = getLibrarySpecificIcon(genericName, library);

  if (!libraryIcon) {
    return null;
  }

  if (library === 'font-awesome') {
    return {
      importStatement: `import { ${libraryIcon} } from '@fortawesome/free-solid-svg-icons'`,
      componentJsx: `<FontAwesomeIcon icon={${libraryIcon}} />`,
    };
  }

  const importStatement = iconSystem.importPattern.replace('{icon}', libraryIcon);
  const componentJsx = `<${libraryIcon} />`;

  return { importStatement, componentJsx };
}

export function replaceIconPlaceholders(jsx: string, library: IconLibrary): { jsx: string; imports: string[] } {
  const iconPlaceholderRegex = /\{icon:([a-z-]+)\}/g;
  const imports = new Set<string>();
  let modifiedJsx = jsx;

  const matches = [...jsx.matchAll(iconPlaceholderRegex)];

  for (const match of matches) {
    const genericName = match[1];
    const resolved = resolveIcon(genericName, library);

    if (resolved) {
      imports.add(resolved.importStatement);
      modifiedJsx = modifiedJsx.replace(match[0], resolved.componentJsx);
    }
  }

  if (library === 'font-awesome' && imports.size > 0) {
    imports.add(iconSystems['font-awesome'].importPattern);
  }

  return {
    jsx: modifiedJsx,
    imports: Array.from(imports),
  };
}

export function getAllGenericIcons(): string[] {
  return lucideMappings.map((m) => m.generic);
}

export function getIconMapping(genericName: string): IIconMapping | null {
  return lucideMappings.find((m) => m.generic === genericName) ?? null;
}
