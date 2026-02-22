import type { IIconLibrary } from '../types.js';

export const ICON_LIBRARIES: readonly IIconLibrary[] = [
  {
    name: 'Lucide',
    style: 'outlined, clean, 24×24',
    count: '1500+',
    importPackage: {
      react: 'lucide-react',
      vue: 'lucide-vue-next',
      angular: 'lucide-angular',
      svelte: 'lucide-svelte',
    },
    cdnUrl: 'https://unpkg.com/lucide@latest',
    recommended: ['react', 'vue', 'angular', 'nextjs'],
  },
  {
    name: 'Heroicons',
    style: 'outlined + solid, 24×24',
    count: '300+',
    importPackage: {
      react: '@heroicons/react',
      vue: '@heroicons/vue',
    },
    cdnUrl: 'https://unpkg.com/heroicons@latest',
    recommended: ['react', 'vue'],
  },
  {
    name: 'Phosphor',
    style: '6 weights, duotone, 16–32',
    count: '7000+',
    importPackage: {
      react: '@phosphor-icons/react',
      vue: '@phosphor-icons/vue',
    },
    cdnUrl: 'https://unpkg.com/@phosphor-icons/web@latest',
    recommended: ['react', 'vue', 'nextjs'],
  },
  {
    name: 'react-icons',
    style: 'aggregated, multiple icon sets (FA, MD, etc.)',
    count: '40000+',
    importPackage: {
      react: 'react-icons',
    },
    recommended: ['react', 'nextjs'],
  },
  {
    name: 'Tabler Icons',
    style: 'outlined, consistent, 24×24',
    count: '5000+',
    importPackage: {
      react: '@tabler/icons-react',
      vue: '@tabler/icons-vue',
    },
    recommended: [],
  },
  {
    name: 'Radix Icons',
    style: 'minimal, 15×15',
    count: '300+',
    importPackage: {
      react: '@radix-ui/react-icons',
    },
    recommended: [],
  },
] as const;

export function getDefaultIconLibrary(framework: string): IIconLibrary {
  const match = ICON_LIBRARIES.find((lib) => lib.recommended.includes(framework));
  return match ?? ICON_LIBRARIES[0];
}
