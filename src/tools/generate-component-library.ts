/**
 * Generate Component Library Tool
 *
 * Generates components from various component libraries with full customization
 * and theme integration support.
 */

import { z } from 'zod';
import { createLogger } from '../lib/logger.js';
import {
  generateComponentFromLibrary,
  getAvailableComponentsForLibrary,
  getAvailableComponentLibraries,
  type ComponentLibraryId,
  type IDesignContext,
} from '../lib/component-libraries/index.js';
import { designService } from '../services/index.js';

const logger = createLogger('generate-component-library');

// Input schema
const inputSchema = z.object({
  componentType: z.string().describe('Type of component to generate (e.g., button, card, input)'),
  library: z
    .enum(['shadcn', 'radix', 'headlessui', 'material', 'primevue', 'none'])
    .describe('Component library to use'),
  framework: z.enum(['react', 'nextjs', 'vue', 'svelte', 'angular', 'html']).describe('Target framework'),
  customizations: z.record(z.string(), z.any()).optional().describe('Custom component properties and styling'),
  outputPath: z.string().optional().describe('Output directory for generated files'),
  includeTests: z.boolean().default(true).describe('Generate test files'),
  includeStories: z.boolean().default(true).describe('Generate Storybook stories'),
  theme: z.string().optional().describe('Theme configuration'),
});

export type GenerateComponentLibraryInput = z.infer<typeof inputSchema>;

// Output schema
const outputSchema = z.object({
  component: z
    .array(
      z.object({
        path: z.string(),
        content: z.string(),
      })
    )
    .describe('Generated component files'),
  dependencies: z.array(z.string()).describe('Required dependencies'),
  examples: z.array(z.string()).describe('Usage examples'),
  setupInstructions: z.array(z.string()).describe('Setup instructions'),
});

export type GenerateComponentLibraryOutput = z.infer<typeof outputSchema>;

/**
 * Generate component from specified library
 */
export function generateComponentLibraryHandler(
  input: GenerateComponentLibraryInput
): Promise<GenerateComponentLibraryOutput> {
  logger.info(`Generating ${input.library} component: ${input.componentType} for ${input.framework}`);

  try {
    // Get current design context
    const designContext = designService.getCurrentContext();

    // Apply theme customizations if provided
    let customizedContext = { ...designContext };
    if (input.theme) {
      customizedContext = applyThemeConfiguration(customizedContext, input.theme);
    }

    // Generate component files
    const componentFiles = generateComponentFromLibrary(
      input.library,
      input.componentType,
      customizedContext,
      input.customizations
    );

    // Filter files based on options
    let filteredFiles = componentFiles;
    if (!input.includeTests) {
      filteredFiles = filteredFiles.filter((file) => !file.path.includes('.test.'));
    }
    if (!input.includeStories) {
      filteredFiles = filteredFiles.filter((file) => !file.path.includes('.stories.'));
    }

    // Apply output path if provided
    if (input.outputPath) {
      filteredFiles = filteredFiles.map((file) => ({
        ...file,
        path: input.outputPath ? `${input.outputPath}/${file.path}` : file.path,
      }));
    }

    // Get dependencies and examples
    const dependencies = extractDependencies(input.library, input.componentType);
    const examples = generateUsageExamples(input.componentType, input.library, input.framework);
    const setupInstructions = generateSetupInstructions(input.library, input.framework);

    logger.info(`Component generation completed: ${filteredFiles.length} files, ${dependencies.length} deps`);

    return Promise.resolve({
      component: filteredFiles,
      dependencies,
      examples,
      setupInstructions,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.error(`Component generation failed: ${msg}`);
    return Promise.reject(new Error(`Failed to generate component: ${msg}`));
  }
}

/**
 * Get available components for a library
 */
export function getAvailableComponentsHandler(
  library: ComponentLibraryId
): Promise<{ components: string[]; library: string; description: string }> {
  try {
    const components = getAvailableComponentsForLibrary(library);
    const libraryInfo = getAvailableComponentLibraries().find((lib) => lib.id === library);

    return Promise.resolve({
      components,
      library: libraryInfo?.name || library,
      description: libraryInfo?.description || '',
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.error(`Failed to get available components: ${msg}`);
    return Promise.reject(new Error(`Failed to get components for ${library}: ${msg}`));
  }
}

/**
 * Get all available component libraries
 */
export function getAvailableLibrariesHandler(): Promise<{
  libraries: Array<{
    id: string;
    name: string;
    description: string;
    componentCount: number;
    patternCount: number;
  }>;
}> {
  try {
    const libraries = getAvailableComponentLibraries();

    return Promise.resolve({
      libraries: libraries.map((lib) => ({
        id: lib.id,
        name: lib.name,
        description: lib.description,
        componentCount: lib.getAvailableComponents().length,
        patternCount: lib.getAvailablePatterns().length,
      })),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.error(`Failed to get available libraries: ${msg}`);
    return Promise.reject(new Error(`Failed to get libraries: ${msg}`));
  }
}

/**
 * Apply theme configuration to design context
 */
function applyThemeConfiguration(context: IDesignContext, theme: string): IDesignContext {
  const themeConfig = parseThemeString(theme);

  return {
    ...context,
    colorPalette: {
      ...context.colorPalette,
      ...themeConfig.colors,
    },
    ...themeConfig.other,
  };
}

/**
 * Parse theme string into configuration
 */
function parseThemeString(theme: string): {
  colors: Partial<IDesignContext['colorPalette']>;
  other?: Partial<IDesignContext>;
} {
  type ThemeConfig = {
    colors: Partial<IDesignContext['colorPalette']>;
    other?: Partial<IDesignContext>;
  };
  // Simple theme parsing - could be expanded
  const themes: Record<string, ThemeConfig> = {
    dark: {
      colors: {
        background: '#0a0a0a',
        foreground: '#fafafa',
        primary: '#3b82f6',
        secondary: '#64748b',
      },
    },
    light: {
      colors: {
        background: '#ffffff',
        foreground: '#0a0a0a',
        primary: '#2563eb',
        secondary: '#64748b',
      },
    },
    blue: {
      colors: {
        primary: '#3b82f6',
        accent: '#60a5fa',
      },
    },
    green: {
      colors: {
        primary: '#22c55e',
        accent: '#4ade80',
      },
    },
  };

  return themes[theme] || { colors: {}, other: {} };
}

/**
 * Extract dependencies for component
 */
function extractDependencies(library: ComponentLibraryId, componentType: string): string[] {
  const dependencyMap: Record<ComponentLibraryId, Record<string, string[]>> = {
    shadcn: {
      button: ['@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge'],
      card: ['clsx', 'tailwind-merge'],
      input: ['clsx', 'tailwind-merge'],
      dialog: ['@radix-ui/react-dialog'],
      dropdown: ['@radix-ui/react-dropdown-menu'],
      toast: ['@radix-ui/react-toast'],
    },
    radix: {
      button: ['@radix-ui/react-slot'],
      dialog: ['@radix-ui/react-dialog'],
      dropdown: ['@radix-ui/react-dropdown-menu'],
      tooltip: ['@radix-ui/react-tooltip'],
    },
    headlessui: {
      button: ['@headlessui/react'],
      dialog: ['@headlessui/react'],
      dropdown: ['@headlessui/react'],
    },
    material: {
      button: ['@mui/material'],
      dialog: ['@mui/material'],
      dropdown: ['@mui/material'],
    },
    primevue: {
      button: ['primevue'],
      dialog: ['primevue'],
      dropdown: ['primevue'],
    },
    none: {},
  };

  return dependencyMap[library]?.[componentType.toLowerCase()] || [];
}

/**
 * Generate usage examples
 */
function generateUsageExamples(componentType: string, library: ComponentLibraryId, _framework: string): string[] {
  const examples: string[] = [];

  // Basic usage example
  switch (componentType.toLowerCase()) {
    case 'button':
      examples.push(`// Basic usage
<${componentType}>Click me</${componentType}>`);

      if (library === 'shadcn') {
        examples.push(`// With variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button size="lg">Large Button</Button>`);
      }
      break;

    case 'card':
      examples.push(`// Basic usage
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>`);
      break;

    case 'input':
      examples.push(`// Basic usage
<Input placeholder="Enter text" />
<Input type="email" placeholder="Email" />
<Input disabled value="Disabled input" />`);
      break;
  }

  return examples;
}

/**
 * Generate setup instructions
 */
function generateSetupInstructions(library: ComponentLibraryId, framework: string): string[] {
  const instructions: string[] = [];

  // Installation instructions
  switch (library) {
    case 'shadcn':
      instructions.push(
        '1. Install dependencies: npm install class-variance-authority clsx tailwind-merge',
        '2. Configure Tailwind CSS',
        '3. Set up CSS variables in globals.css',
        '4. Create lib/utils.ts with cn() function'
      );
      break;

    case 'radix':
      instructions.push(
        '1. Install Radix UI: npm install @radix-ui/react-*',
        '2. Import required primitives',
        '3. Style with CSS or Tailwind classes'
      );
      break;

    case 'headlessui':
      instructions.push(
        '1. Install Headless UI: npm install @headlessui/react',
        '2. Import required components',
        '3. Style with Tailwind CSS classes'
      );
      break;

    case 'material':
      instructions.push(
        '1. Install Material-UI: npm install @mui/material @emotion/react @emotion/styled',
        '2. Set up theme provider',
        '3. Import and use components'
      );
      break;
  }

  // Framework-specific instructions
  if (framework === 'nextjs') {
    instructions.push('5. Configure Next.js for client components: use "use client" directive');
  }

  return instructions;
}

// Tool registration
export const generateComponentLibraryTool = {
  name: 'generate_component_library',
  description: 'Generate components from various component libraries with full customization',
  inputSchema,
  outputSchema,
  handler: generateComponentLibraryHandler,
};

export const getAvailableComponentsTool = {
  name: 'get_available_components',
  description: 'Get available components for a specific component library',
  inputSchema: z.object({
    library: z.enum(['shadcn', 'radix', 'headlessui', 'material', 'primevue', 'none']),
  }),
  outputSchema: z.object({
    components: z.array(z.string()),
    library: z.string(),
    description: z.string(),
  }),
  handler: ({ library }: { library: ComponentLibraryId }) => {
    return getAvailableComponentsHandler(library);
  },
};

export const getAvailableLibrariesTool = {
  name: 'get_available_libraries',
  description: 'Get all available component libraries',
  inputSchema: z.object({}),
  outputSchema: z.object({
    libraries: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        componentCount: z.number(),
        patternCount: z.number(),
      })
    ),
  }),
  handler: () => getAvailableLibrariesHandler(),
};
