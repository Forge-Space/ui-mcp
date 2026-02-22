/**
 * Analyze Component Library Tool
 *
 * Analyzes existing component code to detect which component library is being used,
 * identifies patterns, and provides migration recommendations.
 */

import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createLogger } from '../lib/logger.js';
import { getAvailableComponentLibraries, type ComponentLibraryId } from '../lib/component-libraries/index.js';

const logger = createLogger('analyze-component-library');

const inputSchema = {
  code: z.string().describe('Component source code to analyze'),
  filePath: z.string().optional().describe('File path for context (e.g., src/components/Button.tsx)'),
  detectLibrary: z.boolean().default(true).describe('Detect which component library is being used'),
  analyzePatterns: z.boolean().default(true).describe('Analyze component patterns and structure'),
  suggestMigration: z.boolean().default(false).describe('Suggest migration path to a target library'),
  targetLibrary: z
    .enum(['shadcn', 'radix', 'headlessui', 'material', 'primevue', 'none'])
    .optional()
    .describe('Target library for migration suggestions'),
};

export type AnalyzeComponentLibraryInput = {
  code: string;
  filePath?: string;
  detectLibrary: boolean;
  analyzePatterns: boolean;
  suggestMigration: boolean;
  targetLibrary?: 'shadcn' | 'radix' | 'headlessui' | 'material' | 'primevue' | 'none';
};

const _outputSchema = z.object({
  detectedLibrary: z.string().optional().describe('Detected component library'),
  confidence: z.number().describe('Detection confidence (0-1)'),
  patterns: z.array(
    z.object({
      type: z.string(),
      description: z.string(),
      occurrences: z.number(),
    })
  ),
  imports: z.array(z.string()).describe('Detected library imports'),
  components: z.array(z.string()).describe('Detected component names'),
  migrationSuggestions: z
    .array(
      z.object({
        from: z.string(),
        to: z.string(),
        description: z.string(),
        effort: z.enum(['low', 'medium', 'high']),
      })
    )
    .optional(),
  summary: z.string().describe('Analysis summary'),
});

export type AnalyzeComponentLibraryOutput = z.infer<typeof _outputSchema>;

/**
 * Detect which component library is used in the code
 */
function detectLibrary(code: string): { library: ComponentLibraryId | null; confidence: number; imports: string[] } {
  const importLines = code.match(/^import\s+.*from\s+['"][^'"]+['"]/gm) ?? [];
  const imports = importLines.map((l) => l.trim());

  const signatures: Array<{ library: ComponentLibraryId; patterns: RegExp[]; weight: number }> = [
    {
      library: 'shadcn',
      patterns: [/@\/components\/ui/, /@\/lib\/utils/, /shadcn/, /cn\(/],
      weight: 1,
    },
    {
      library: 'radix',
      patterns: [/@radix-ui\//, /Radix/],
      weight: 1,
    },
    {
      library: 'headlessui',
      patterns: [/@headlessui\/react/, /headlessui/],
      weight: 1,
    },
    {
      library: 'material',
      patterns: [/@mui\/material/, /@material-ui\//, /MuiButton/, /ThemeProvider/],
      weight: 1,
    },
    {
      library: 'primevue',
      patterns: [/primevue\//, /PrimeVue/],
      weight: 1,
    },
  ];

  let bestMatch: ComponentLibraryId | null = null;
  let bestScore = 0;

  for (const sig of signatures) {
    const score = sig.patterns.reduce((acc, pattern) => {
      return acc + (pattern.test(code) ? sig.weight : 0);
    }, 0);
    const confidence = score / sig.patterns.length;
    if (confidence > bestScore) {
      bestScore = confidence;
      bestMatch = sig.library;
    }
  }

  return {
    library: bestScore > 0.2 ? bestMatch : null,
    confidence: bestScore,
    imports,
  };
}

/**
 * Analyze component patterns in the code
 */
function analyzePatterns(code: string): Array<{ type: string; description: string; occurrences: number }> {
  const patterns: Array<{ type: string; description: string; regex: RegExp }> = [
    { type: 'forwardRef', description: 'Uses React.forwardRef for ref forwarding', regex: /forwardRef/g },
    { type: 'variants', description: 'Uses variant-based styling (cva/variants)', regex: /cva\(|variants\s*:/g },
    { type: 'composition', description: 'Uses component composition pattern', regex: /\.\w+\s*=/g },
    { type: 'accessibility', description: 'Includes ARIA attributes', regex: /aria-\w+/g },
    { type: 'theming', description: 'Uses theme/design tokens', regex: /theme\.|useTheme|ThemeProvider/g },
    { type: 'animation', description: 'Includes animation/transition', regex: /transition|animate|motion/g },
    { type: 'polymorphic', description: 'Polymorphic component (asChild/as prop)', regex: /asChild|as\s*=/g },
    { type: 'controlled', description: 'Controlled component pattern', regex: /onChange|onValueChange/g },
    { type: 'compound', description: 'Compound component pattern (Context)', regex: /createContext|useContext/g },
  ];

  return patterns
    .map((p) => {
      const matches = code.match(p.regex);
      return { type: p.type, description: p.description, occurrences: matches?.length ?? 0 };
    })
    .filter((p) => p.occurrences > 0);
}

/**
 * Extract component names from code
 */
function extractComponents(code: string): string[] {
  const componentMatches =
    code.match(/(?:export\s+(?:default\s+)?(?:function|const|class)\s+)([A-Z][A-Za-z0-9]*)/g) ?? [];
  return componentMatches.map((m) => m.match(/([A-Z][A-Za-z0-9]*)$/)?.[1] ?? '').filter(Boolean);
}

/**
 * Generate migration suggestions from detected library to target
 */
function generateMigrationSuggestions(
  fromLibrary: ComponentLibraryId | null,
  toLibrary: ComponentLibraryId,
  code: string
): Array<{ from: string; to: string; description: string; effort: 'low' | 'medium' | 'high' }> {
  const suggestions: Array<{ from: string; to: string; description: string; effort: 'low' | 'medium' | 'high' }> = [];

  if (!fromLibrary || fromLibrary === toLibrary) return suggestions;

  // Generic migration suggestions based on target library
  if (toLibrary === 'shadcn') {
    suggestions.push({
      from: 'Custom button styles',
      to: 'shadcn/ui Button with variants',
      description: 'Replace custom button with shadcn/ui Button component using cva variants',
      effort: 'low',
    });
    if (code.includes('className=')) {
      suggestions.push({
        from: 'Manual className concatenation',
        to: 'cn() utility from @/lib/utils',
        description: 'Use the cn() utility for conditional className merging',
        effort: 'low',
      });
    }
    if (fromLibrary === 'material') {
      suggestions.push({
        from: '@mui/material imports',
        to: '@/components/ui imports',
        description: 'Replace MUI imports with shadcn/ui equivalents',
        effort: 'medium',
      });
      suggestions.push({
        from: 'MUI ThemeProvider',
        to: 'CSS variables in globals.css',
        description: 'Replace MUI theme with CSS custom properties',
        effort: 'high',
      });
    }
  }

  if (toLibrary === 'radix') {
    suggestions.push({
      from: 'Custom dialog/modal',
      to: '@radix-ui/react-dialog',
      description: 'Replace custom dialog with Radix UI Dialog for accessibility',
      effort: 'medium',
    });
    suggestions.push({
      from: 'Custom dropdown',
      to: '@radix-ui/react-dropdown-menu',
      description: 'Replace custom dropdown with Radix UI DropdownMenu',
      effort: 'medium',
    });
  }

  if (toLibrary === 'headlessui') {
    suggestions.push({
      from: 'Custom combobox/select',
      to: '@headlessui/react Combobox',
      description: 'Replace custom combobox with Headless UI Combobox',
      effort: 'medium',
    });
    suggestions.push({
      from: 'Custom tabs',
      to: '@headlessui/react Tab',
      description: 'Replace custom tabs with Headless UI Tab components',
      effort: 'low',
    });
  }

  if (toLibrary === 'material') {
    suggestions.push({
      from: 'Custom theme',
      to: 'MUI createTheme',
      description: 'Migrate design tokens to MUI theme configuration',
      effort: 'high',
    });
  }

  return suggestions;
}

export function analyzeComponentLibraryHandler(
  input: AnalyzeComponentLibraryInput
): Promise<AnalyzeComponentLibraryOutput> {
  logger.info(`Analyzing component library usage${input.filePath ? ` in ${input.filePath}` : ''}`);

  const { library: detectedLibrary, confidence, imports } = detectLibrary(input.code);
  const patterns = input.analyzePatterns ? analyzePatterns(input.code) : [];
  const components = extractComponents(input.code);

  let migrationSuggestions: AnalyzeComponentLibraryOutput['migrationSuggestions'];
  if (input.suggestMigration && input.targetLibrary) {
    migrationSuggestions = generateMigrationSuggestions(detectedLibrary, input.targetLibrary, input.code);
  }

  const libraryName = detectedLibrary
    ? (getAvailableComponentLibraries().find((l) => l.id === detectedLibrary)?.name ?? detectedLibrary)
    : 'None detected';

  const summary = [
    detectedLibrary
      ? `Detected ${libraryName} (${Math.round(confidence * 100)}% confidence)`
      : 'No specific component library detected',
    components.length > 0
      ? `Found ${components.length} component(s): ${components.slice(0, 3).join(', ')}${components.length > 3 ? '...' : ''}`
      : '',
    patterns.length > 0 ? `Patterns: ${patterns.map((p) => p.type).join(', ')}` : '',
    migrationSuggestions?.length
      ? `${migrationSuggestions.length} migration suggestion(s) to ${input.targetLibrary}`
      : '',
  ]
    .filter(Boolean)
    .join('. ');

  logger.info(`Analysis complete: ${summary}`);

  return Promise.resolve({
    detectedLibrary: detectedLibrary ?? undefined,
    confidence,
    patterns,
    imports,
    components,
    migrationSuggestions,
    summary,
  });
}

export function registerAnalyzeComponentLibrary(server: McpServer): void {
  server.tool(
    'analyze_component_library',
    'Analyze component source code to detect which library is used, identify patterns, and get migration suggestions.',
    inputSchema,
    async (input) => {
      try {
        const result = await analyzeComponentLibraryHandler(input);
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        logger.error(`analyze_component_library failed: ${msg}`);
        return {
          content: [{ type: 'text' as const, text: `Error: ${msg}` }],
          isError: true,
        };
      }
    }
  );
}
