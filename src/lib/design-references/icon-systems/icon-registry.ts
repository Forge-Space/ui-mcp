import type { IconLibrary, IIconSystem } from './types.js';

export const iconSystems: Record<IconLibrary, IIconSystem> = {
  lucide: {
    library: 'lucide',
    packageName: 'lucide-react',
    importPattern: "import { {icon} } from 'lucide-react'",
  },
  heroicons: {
    library: 'heroicons',
    packageName: '@heroicons/react/24/outline',
    importPattern: "import { {icon} } from '@heroicons/react/24/outline'",
  },
  phosphor: {
    library: 'phosphor',
    packageName: '@phosphor-icons/react',
    importPattern: "import { {icon} } from '@phosphor-icons/react'",
  },
  tabler: {
    library: 'tabler',
    packageName: '@tabler/icons-react',
    importPattern: "import { {icon} } from '@tabler/icons-react'",
    iconPrefix: 'Icon',
  },
  'font-awesome': {
    library: 'font-awesome',
    packageName: '@fortawesome/react-fontawesome',
    importPattern: "import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'",
  },
  radix: {
    library: 'radix',
    packageName: '@radix-ui/react-icons',
    importPattern: "import { {icon} } from '@radix-ui/react-icons'",
  },
};

export function getIconSystem(library: IconLibrary): IIconSystem {
  return iconSystems[library];
}
