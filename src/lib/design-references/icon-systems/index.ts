export type { IconLibrary, IIconMapping, IIconSystem } from './types.js';
export { iconSystems, getIconSystem } from './icon-registry.js';
export { resolveIcon, replaceIconPlaceholders, getAllGenericIcons, getIconMapping } from './icon-adapter.js';
export {
  lucideMappings,
  heroinconsMappings,
  phosphorMappings,
  tablerMappings,
  fontAwesomeMappings,
  radixMappings,
} from './mappings/index.js';
