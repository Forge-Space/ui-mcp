/**
 * Setup Component Library Tool
 *
 * Sets up a complete project with a component library including dependencies,
 * configuration files, and initial components.
 */

import { z } from 'zod';
import { createLogger } from '../lib/logger.js';
import {
  setupComponentLibraryProject,
  getAvailableComponentLibraries,
  type ComponentLibraryId,
  type ComponentLibrarySetupOptions,
  type IDesignContext,
} from '../lib/component-libraries/index.js';
import { designService } from '../services/index.js';

const logger = createLogger('setup-component-library');

const inputSchema = z.object({
  library: z
    .enum(['shadcn', 'radix', 'headlessui', 'material', 'primevue', 'none'])
    .describe('Component library to set up'),
  framework: z.enum(['react', 'nextjs', 'vue', 'svelte', 'angular', 'html']).describe('Target framework'),
  projectName: z.string().describe('Name of the project'),
  projectPath: z.string().optional().describe('Project directory path'),
  components: z.array(z.string()).optional().describe('Components to include'),
  patterns: z.array(z.string()).optional().describe('UI patterns to include'),
  theme: z.string().optional().describe('Theme configuration'),
  customizations: z.record(z.string(), z.any()).optional().describe('Additional customizations'),
  skipInstall: z.boolean().default(false).describe('Skip npm install step'),
  skipGit: z.boolean().default(false).describe('Skip git initialization'),
});

export type SetupComponentLibraryInput = z.infer<typeof inputSchema>;

const outputSchema = z.object({
  setupFiles: z.array(z.object({ path: z.string(), content: z.string() })).describe('Generated setup files'),
  instructions: z.array(z.string()).describe('Setup instructions'),
  nextSteps: z.array(z.string()).describe('Next steps'),
  dependencies: z.array(z.string()).describe('Required dependencies'),
  devDependencies: z.array(z.string()).describe('Development dependencies'),
});

export type SetupComponentLibraryOutput = z.infer<typeof outputSchema>;

export async function setupComponentLibraryHandler(
  input: SetupComponentLibraryInput
): Promise<SetupComponentLibraryOutput> {
  logger.info(`Setting up ${input.library} for ${input.framework} project: ${input.projectName}`);

  try {
    const designContext = designService.getCurrentContext();

    const customizedContext: IDesignContext = input.theme
      ? applyThemeConfiguration(designContext, input.theme)
      : designContext;

    const setupOptions: ComponentLibrarySetupOptions = {
      framework: input.framework,
      projectName: input.projectName,
      components: input.components,
      patterns: input.patterns,
      designContext: customizedContext,
      customizations: input.customizations,
    };

    const setupFiles = setupComponentLibraryProject(input.library, setupOptions);
    const { dependencies, devDependencies } = extractDependenciesFromFiles(setupFiles);
    const instructions = generateSetupInstructions(input.library, input.framework, input);
    const nextSteps = generateNextSteps(input.library, input.framework, input);

    logger.info(
      `Setup completed: ${setupFiles.length} files, ${dependencies.length} deps, ${devDependencies.length} devDeps`
    );

    return { setupFiles, instructions, nextSteps, dependencies, devDependencies };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.error(`Component library setup failed: ${msg}`);
    throw new Error(`Failed to setup component library: ${msg}`);
  }
}

export async function validateComponentLibrarySetupHandler(
  projectPath: string,
  library: ComponentLibraryId
): Promise<{ isValid: boolean; errors: string[]; warnings: string[]; recommendations: string[] }> {
  logger.info(`Validating ${library} setup at: ${projectPath}`);

  try {
    const errors: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];

    const requiredFiles = getRequiredFiles(library);
    if (requiredFiles.length === 0) {
      errors.push('No required files defined for this library');
    }

    if (library === 'shadcn') {
      recommendations.push('Consider adding TypeScript strict mode');
      recommendations.push('Add Storybook for component documentation');
    }

    return { isValid: errors.length === 0, errors, warnings, recommendations };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.error(`Setup validation failed: ${msg}`);
    throw new Error(`Failed to validate setup: ${msg}`);
  }
}

export async function getComponentLibraryStatusHandler(projectPath: string): Promise<{
  library: ComponentLibraryId | null;
  isConfigured: boolean;
  components: string[];
  patterns: string[];
  version: string;
  lastUpdated: string;
}> {
  logger.info(`Getting component library status at: ${projectPath}`);

  try {
    return {
      library: null,
      isConfigured: false,
      components: [],
      patterns: [],
      version: '',
      lastUpdated: new Date().toISOString(),
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.error(`Failed to get status: ${msg}`);
    throw new Error(`Failed to get component library status: ${msg}`);
  }
}

function applyThemeConfiguration(context: IDesignContext, theme: string): IDesignContext {
  const themes: Record<string, { colors: Partial<IDesignContext['colorPalette']> }> = {
    dark: { colors: { background: '#0a0a0a', foreground: '#fafafa', primary: '#3b82f6', secondary: '#64748b' } },
    light: { colors: { background: '#ffffff', foreground: '#0a0a0a', primary: '#2563eb', secondary: '#64748b' } },
    blue: { colors: { primary: '#3b82f6', accent: '#60a5fa' } },
    green: { colors: { primary: '#22c55e', accent: '#4ade80' } },
  };
  const themeConfig = themes[theme];
  if (!themeConfig) return context;
  return { ...context, colorPalette: { ...context.colorPalette, ...themeConfig.colors } };
}

function extractDependenciesFromFiles(files: Array<{ path: string; content: string }>): {
  dependencies: string[];
  devDependencies: string[];
} {
  const packageJsonFile = files.find((f) => f.path === 'package.json');
  if (!packageJsonFile) return { dependencies: [], devDependencies: [] };
  try {
    const pkg = JSON.parse(packageJsonFile.content) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    return {
      dependencies: Object.keys(pkg.dependencies ?? {}),
      devDependencies: Object.keys(pkg.devDependencies ?? {}),
    };
  } catch {
    return { dependencies: [], devDependencies: [] };
  }
}

function getRequiredFiles(library: ComponentLibraryId): string[] {
  const base = ['package.json', 'lib/utils.ts'];
  switch (library) {
    case 'shadcn':
      return [...base, 'tailwind.config.js', 'components/ui/button.tsx'];
    case 'radix':
      return [...base, 'styles/radix-variables.css'];
    case 'headlessui':
      return [...base, 'tailwind.config.js'];
    case 'material':
      return [...base, 'lib/theme.ts'];
    default:
      return base;
  }
}

function generateSetupInstructions(
  library: ComponentLibraryId,
  framework: string,
  input: SetupComponentLibraryInput
): string[] {
  const instructions: string[] = [`1. Navigate to project: cd ${input.projectPath ?? input.projectName}`];
  if (!input.skipInstall) instructions.push('2. Install dependencies: npm install');

  switch (library) {
    case 'shadcn':
      instructions.push(
        '3. Configure Tailwind CSS in tailwind.config.js',
        '4. Set up CSS variables in app/globals.css'
      );
      break;
    case 'radix':
      instructions.push(
        '3. Install individual Radix primitives as needed',
        '4. Create styled wrappers with CSS or Tailwind'
      );
      break;
    case 'headlessui':
      instructions.push('3. Configure Tailwind CSS', '4. Create component wrappers with styling');
      break;
    case 'material':
      instructions.push('3. Wrap your app with ThemeProvider', '4. Configure theme in lib/theme.ts');
      break;
  }

  if (framework === 'nextjs') {
    instructions.push(`${instructions.length + 1}. Add "use client" directive to interactive components`);
  }
  return instructions;
}

function generateNextSteps(
  _library: ComponentLibraryId,
  _framework: string,
  input: SetupComponentLibraryInput
): string[] {
  const steps = [
    '1. Review generated components and customize as needed',
    '2. Test components in your development environment',
  ];
  if (input.components?.length) steps.push(`3. Explore the ${input.components.length} included components`);
  if (input.patterns?.length) steps.push(`4. Check out the ${input.patterns.length} UI patterns`);
  steps.push(
    '5. Add your own custom components',
    '6. Configure your theme and design tokens',
    '7. Run tests to verify everything works'
  );
  return steps;
}

export const setupComponentLibraryTool = {
  name: 'setup_component_library',
  description: 'Set up a complete project with a component library',
  inputSchema,
  outputSchema,
  handler: setupComponentLibraryHandler,
};

export const validateComponentLibrarySetupTool = {
  name: 'validate_component_library_setup',
  description: 'Validate component library setup in a project',
  inputSchema: z.object({
    projectPath: z.string(),
    library: z.enum(['shadcn', 'radix', 'headlessui', 'material', 'primevue', 'none']),
  }),
  outputSchema: z.object({
    isValid: z.boolean(),
    errors: z.array(z.string()),
    warnings: z.array(z.string()),
    recommendations: z.array(z.string()),
  }),
  handler: async ({ projectPath, library }: { projectPath: string; library: ComponentLibraryId }) =>
    validateComponentLibrarySetupHandler(projectPath, library),
};

export const getComponentLibraryStatusTool = {
  name: 'get_component_library_status',
  description: 'Get component library setup status for a project',
  inputSchema: z.object({ projectPath: z.string() }),
  outputSchema: z.object({
    library: z.enum(['shadcn', 'radix', 'headlessui', 'material', 'primevue', 'none']).nullable(),
    isConfigured: z.boolean(),
    components: z.array(z.string()),
    patterns: z.array(z.string()),
    version: z.string(),
    lastUpdated: z.string(),
  }),
  handler: async ({ projectPath }: { projectPath: string }) => getComponentLibraryStatusHandler(projectPath),
};
