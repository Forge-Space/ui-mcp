import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import pino from 'pino';
import { designContextStore } from '../lib/design-context.js';
import { auditStyles } from '../lib/style-audit.js';
import { extractDesignFromUrl } from '../lib/design-extractor.js';
import { jsxToHtmlAttributes, jsxToSvelte } from '../lib/utils/jsx.utils.js';
import { toPascalCase, toKebabCase } from '../lib/utils/string.utils.js';
import type { IGeneratedFile, IDesignContext, Framework } from '../lib/types.js';
import { generateComponent as generateComponentWithFactory } from '../lib/generators/generator-factory.js';
import { ComponentLibrary } from '../lib/generators/base-generator.js';
import { initializeRegistry } from '../lib/design-references/component-registry/init.js';
import {
  getBestMatch,
  getBestMatchWithFeedback,
  triggerPatternPromotion,
} from '../lib/design-references/component-registry/index.js';
import type { MoodTag, IndustryTag, VisualStyleId } from '../lib/design-references/component-registry/types.js';
import { enhancePrompt, scoreQuality } from '../lib/ml/index.js';
import { recordGeneration } from '../lib/feedback/index.js';
import { getDatabase } from '../lib/design-references/database/store.js';

// Track generation count for pattern promotion
// Note: This is incremented after successful generation to avoid race conditions
let generationCount = 0;

const logger = pino({ name: 'generate-ui-component' });

/**
 * Options for RAG-based component matching from the design references registry.
 * All fields are optional and used to filter/score component snippets.
 *
 * @interface IRagOptions
 * @property {string} [variant] - Component variant (e.g., 'primary', 'secondary', 'outline')
 * @property {MoodTag} [mood] - Design mood/aesthetic (see MoodTag type for allowed values)
 * @property {IndustryTag} [industry] - Target industry context (see IndustryTag type for allowed values)
 * @property {VisualStyleId} [style] - Visual style identifier (see VisualStyleId type for allowed values)
 */
interface IRagOptions {
  variant?: string;
  mood?: MoodTag;
  industry?: IndustryTag;
  style?: VisualStyleId;
}

const inputSchema = {
  component_type: z
    .string()
    .describe(
      'Type of component to generate (e.g., "button", "card", "form", "navbar", "sidebar", "modal", "table", "hero")'
    ),
  framework: z.enum(['react', 'nextjs', 'vue', 'angular', 'svelte', 'html']).describe('Target framework'),
  props: z.record(z.string(), z.string()).optional().describe('Component props as key-value pairs'),
  component_library: z
    .enum(['shadcn', 'radix', 'headlessui', 'primevue', 'material', 'none'])
    .default('none')
    .describe('Component library to use in generated code'),
  design_reference_url: z.string().url().optional().describe('URL to extract design inspiration from'),
  existing_tailwind_config: z.string().optional().describe('Existing tailwind.config.js content for style audit'),
  existing_css_variables: z.string().optional().describe('Existing CSS variables for style audit'),
  variant: z
    .string()
    .optional()
    .describe('Component variant (e.g., "outline", "ghost", "gradient", "glass", "destructive", "loading", "icon")'),
  mood: z
    .enum([
      'bold',
      'calm',
      'playful',
      'professional',
      'premium',
      'energetic',
      'minimal',
      'editorial',
      'futuristic',
      'warm',
      'corporate',
      'creative',
    ])
    .optional()
    .describe('Design mood/personality'),
  industry: z
    .enum([
      'saas',
      'fintech',
      'ecommerce',
      'healthcare',
      'education',
      'startup',
      'agency',
      'media',
      'devtools',
      'general',
    ])
    .optional()
    .describe('Target industry for tailored design'),
  visual_style: z
    .enum([
      'glassmorphism',
      'neubrutalism',
      'soft-depth',
      'bento-grid',
      'gradient-mesh',
      'dark-premium',
      'minimal-editorial',
      'linear-modern',
      'retro-playful',
      'corporate-trust',
    ])
    .optional()
    .describe('Visual style layer to apply'),
  skip_ml: z.boolean().optional().default(false).describe('Skip ML enhancement and scoring for pure generation'),
};

export function generateComponent(
  componentType: string,
  framework: string,
  designContext: IDesignContext,
  props?: Record<string, string>,
  ragOptions?: IRagOptions,
  registryMatch?: ReturnType<typeof getBestMatch>,
  componentLibrary?: string
): IGeneratedFile[] {
  const componentName = toPascalCase(componentType);

  // Convert props to Record<string, any> for the generator
  const generatorProps = props || {};

  // Use the GeneratorFactory with component library support
  try {
    return generateComponentWithFactory(
      framework as Framework,
      componentType,
      generatorProps,
      designContext,
      componentLibrary as ComponentLibrary
    );
  } catch (error) {
    logger.error({ error, componentType, framework, componentLibrary }, 'Failed to generate component with factory');

    // Fallback to simple component generation
    const componentName = toPascalCase(componentType);

    // Simple fallback component
    return [{
      path: `src/components/${componentName}.tsx`,
      content: `// Fallback component for ${framework}
export function ${componentName}() {
  return <div>${componentName} - ${componentType}</div>;
}`
    }];
  }
}

export function registerGenerateUiComponent(server: McpServer): void {
  server.tool(
    'generate_ui_component',
    'Create or iterate UI components with style audit and design context awareness. Supports React, Next.js, Vue, Angular, Svelte, and HTML. Component library integration available: shadcn/ui, Radix UI, Headless UI, PrimeVue, Material UI.',
    inputSchema,
    async ({
      component_type,
      framework,
      props,
      component_library,
      design_reference_url,
      existing_tailwind_config,
      existing_css_variables,
      variant,
      mood,
      industry,
      visual_style,
      skip_ml,
    }) => {
      // Initialize the component registry on first use
      initializeRegistry();

      const warnings: string[] = [];
      const skipML = skip_ml ?? false;

      // ML: Prompt enhancement (always-on unless skip_ml)
      let enhancedPromptText = component_type;
      let promptEnhancement = null;

      if (!skipML) {
        try {
          promptEnhancement = await enhancePrompt(component_type, {
            componentType: component_type,
            framework,
            style: visual_style || undefined,
            mood: mood || undefined,
            industry: industry || undefined,
          });
          enhancedPromptText = promptEnhancement.enhanced;
        } catch (err) {
          logger.warn({ error: err }, 'Prompt enhancement failed, using original');
        }
      }

      // Component library is now supported, no warning needed

      // Style audit
      if (existing_tailwind_config || existing_css_variables) {
        const auditResult = auditStyles(existing_tailwind_config, existing_css_variables);
        designContextStore.update(auditResult.context);
        warnings.push(...auditResult.warnings);
      }

      // Design URL extraction
      if (design_reference_url) {
        try {
          const designData = await extractDesignFromUrl(design_reference_url);
          if (designData.colors.length > 0) {
            // designContextStore.get() returns a deep clone, safe to mutate
            const context = designContextStore.get();
            context.colorPalette.primary = designData.colors[0] ?? context.colorPalette.primary;
            if (designData.colors[1]) context.colorPalette.secondary = designData.colors[1];
            if (designData.colors[2]) context.colorPalette.accent = designData.colors[2];
            designContextStore.set(context);
          }
          if (designData.typography.fonts.length > 0) {
            // designContextStore.get() returns a deep clone, safe to mutate
            const context = designContextStore.get();
            context.typography.fontFamily = `${designData.typography.fonts[0]}, system-ui, sans-serif`;
            designContextStore.set(context);
          }
        } catch (error) {
          warnings.push(`Design extraction failed: ${String(error)}`);
        }
      }

      const designContext = designContextStore.get();
      const ragOptions = {
        variant,
        mood: mood as MoodTag | undefined,
        industry: industry as IndustryTag | undefined,
        style: visual_style as VisualStyleId | undefined,
      };

      // Get registry match with feedback boosting (unless skip_ml)
      let registryMatch;
      if (!skipML) {
        try {
          const db = getDatabase();
          registryMatch = getBestMatchWithFeedback(component_type, ragOptions, db);
        } catch (err) {
          logger.warn({ error: err }, 'Feedback-boosted search failed, using standard search');
          registryMatch = getBestMatch(component_type, ragOptions);
        }
      } else {
        registryMatch = getBestMatch(component_type, ragOptions);
      }

      const files = generateComponent(
        component_type,
        framework,
        designContext,
        props,
        ragOptions || undefined,
        registryMatch,
        component_library
      );

      // ML: Quality scoring (unless skip_ml)
      let qualityScore = null;
      if (!skipML && files.length > 0) {
        try {
          const mainFile = files[0];
          if (mainFile?.content) {
            qualityScore = await scoreQuality(enhancedPromptText, mainFile.content, {
              componentType: component_type,
              framework,
              style: visual_style || undefined,
            });
          }
        } catch (err) {
          logger.warn({ error: err }, 'Quality scoring failed');
        }
      }

      // Record generation for ML training (unless skip_ml)
      if (!skipML && files.length > 0) {
        try {
          const db = getDatabase();
          const generationRecord = {
            id: `gen-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            tool: 'generate_ui_component' as const,
            params: {
              component_type,
              framework,
              props: props ? JSON.stringify(props) : '',
              component_library,
              design_reference_url: design_reference_url || '',
              existing_tailwind_config: existing_tailwind_config || '',
              existing_css_variables: existing_css_variables || '',
              variant: variant || '',
              mood: mood || '',
              industry: industry || '',
              visual_style: visual_style || '',
              skip_ml: skip_ml.toString(),
            },
            componentType: component_type,
            framework,
            outputHash: '',
            timestamp: Date.now(),
            sessionId: `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          };
          recordGeneration(generationRecord, files[0]?.content || '', db, component_type);
        } catch (err) {
          logger.warn({ error: err }, 'Generation recording failed');
        }
      }

      // ML: Record generation event (unless skip_ml)
      if (!skipML && files.length > 0) {
        try {
          const db = getDatabase();
          const sessionId = `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
          const params: Record<string, string> = { component_type, framework };
          if (variant) params.variant = variant;
          if (mood) params.mood = mood;
          if (industry) params.industry = industry;
          if (visual_style) params.visual_style = visual_style;

          const generation = {
            id: `gen-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            tool: 'generate_ui_component' as const,
            params,
            componentType: component_type,
            framework,
            outputHash: '',
            timestamp: Date.now(),
            sessionId,
          };
          recordGeneration(generation, files[0]?.content || '', db, component_type);

          // Auto-trigger pattern promotion every 10 generations
          generationCount++;
          if (generationCount % 10 === 0) {
            try {
              const promoted = triggerPatternPromotion(db);
              if (promoted > 0) {
                logger.info({ promoted, generationCount }, 'Auto-promoted patterns to registry');
              }
            } catch (err) {
              logger.warn({ error: err }, 'Pattern promotion failed');
            }
          }
        } catch (err) {
          logger.warn({ error: err }, 'Feedback recording failed');
        }
      }

      // Build metadata about registry match
      const ragInfo = registryMatch
        ? `\n📚 RAG Match: "${registryMatch.name}" (${registryMatch.id})` +
          `\n   Quality: ${registryMatch.quality.inspirationSource}` +
          `\n   A11y: ${registryMatch.a11y.keyboardNav}${
            registryMatch.quality.antiGeneric.length > 0
              ? `\n   Anti-generic: ${registryMatch.quality.antiGeneric.join(', ')}`
              : ''
          }`
        : '\n📚 RAG: No registry match — using fallback template';

      const summary = [
        `Generated ${component_type} component for ${framework}`,
        `Files: ${files.length}`,
        ragInfo,
        ...(warnings.length > 0 ? ['Warnings:', ...warnings.map((w) => `  ⚠ ${w}`)] : []),
      ].join('\n');

      return {
        content: [
          { type: 'text', text: summary },
          {
            type: 'text',
            text: JSON.stringify({ files, designContext }, null, 2),
          },
        ],
        _meta: {
          ml: skipML
            ? null
            : {
                promptEnhanced: !!promptEnhancement,
                enhancements: promptEnhancement?.additions ?? [],
                qualityScore: qualityScore?.score ?? null,
                qualitySource: qualityScore?.source ?? null,
                qualityFactors: qualityScore?.factors ?? null,
                isLikelyAccepted: qualityScore ? qualityScore.score >= 7.0 : null,
              },
        },
      };
    }
  );
}

/**
 * Transform component JSX to use specific component library patterns
 */
function transformComponentForLibrary(
  jsxBody: string,
  library: string,
  componentType: string,
  designContext: IDesignContext
): string {
  switch (library) {
    case 'shadcn':
      return transformForShadcnUI(jsxBody, componentType, designContext);
    case 'radix':
      return transformForRadixUI(jsxBody, componentType, designContext);
    case 'headlessui':
      return transformForHeadlessUI(jsxBody, componentType, designContext);
    case 'primevue':
      return transformForPrimeVue(jsxBody, componentType, designContext);
    case 'material':
      return transformForMaterialUI(jsxBody, componentType, designContext);
    default:
      return jsxBody;
  }
}

/**
 * Transform JSX for shadcn/ui components
 */
function transformForShadcnUI(jsxBody: string, componentType: string, _designContext: IDesignContext): string {
  // Add shadcn/ui imports and cn utility
  const imports = `import { cn } from "@/lib/utils"
${getShadcnImports(componentType)}`;

  // Transform common patterns to shadcn/ui components
  let transformed = jsxBody;

  // Button transformations - handle both opening and closing tags consistently
  transformed = transformed.replace(/<button([^>]*?)>/g, '<Button$1>');
  transformed = transformed.replace(/<\/button>/g, '</Button>');

  // Input transformations - handle self-closing tags
  transformed = transformed.replace(/<input([^>]*?)\/>/g, '<Input$1 />');

  // Card transformations - more specific pattern for card containers
  transformed = transformed.replace(/<div([^>]*?)class="[^"]*border[^"]*rounded[^"]*p-4[^"]*"([^>]*?)>/g, '<Card$2>');
  transformed = transformed.replace(/<\/div>(?!\s*<\/Card>)/g, '</Card>');

  // Badge transformations - more specific pattern for badge elements
  transformed = transformed.replace(
    /<span([^>]*?)class="[^"]*inline-flex[^"]*items-center[^"]*px-2[^"]*py-1[^"]*rounded-full[^"]*text-xs[^"]*font-medium[^"]*"([^>]*?)>/g,
    '<Badge variant="secondary"$2>'
  );
  transformed = transformed.replace(/<\/span>(?!\s*<\/Badge>)/g, '</Badge>');

  return `${imports}

${transformed}`;
}

/**
 * Get shadcn/ui imports based on component type
 */
function getShadcnImports(componentType: string): string {
  const imports = new Set<string>();

  switch (componentType) {
    case 'button':
      imports.add('Button');
      break;
    case 'input':
      imports.add('Input');
      break;
    case 'card':
      imports.add('Card');
      imports.add('CardHeader');
      imports.add('CardContent');
      imports.add('CardFooter');
      break;
    case 'dialog':
    case 'modal':
      imports.add('Dialog');
      imports.add('DialogContent');
      imports.add('DialogHeader');
      imports.add('DialogFooter');
      imports.add('DialogTitle');
      imports.add('DialogDescription');
      break;
    case 'dropdown':
    case 'select':
      imports.add('DropdownMenu');
      imports.add('DropdownMenuContent');
      imports.add('DropdownMenuItem');
      imports.add('DropdownMenuTrigger');
      break;
    case 'tabs':
      imports.add('Tabs');
      imports.add('TabsList');
      imports.add('TabsTrigger');
      imports.add('TabsContent');
      break;
    case 'table':
      imports.add('Table');
      imports.add('TableHeader');
      imports.add('TableBody');
      imports.add('TableRow');
      imports.add('TableCell');
      imports.add('TableHead');
      break;
    case 'toast':
      imports.add('Toast');
      break;
    case 'tooltip':
      imports.add('Tooltip');
      imports.add('TooltipContent');
      imports.add('TooltipProvider');
      break;
    case 'badge':
      imports.add('Badge');
      break;
    case 'avatar':
      imports.add('Avatar');
      imports.add('AvatarImage');
      imports.add('AvatarFallback');
      break;
  }

  return Array.from(imports)
    .map((imp) => `import { ${imp} } from "@/components/ui/${imp}"`)
    .join('\n');
}

/**
 * Transform JSX for Radix UI components
 */
function transformForRadixUI(jsxBody: string, componentType: string, _designContext: IDesignContext): string {
  // Add Radix UI imports
  const imports = getRadixImports(componentType);

  let transformed = jsxBody;

  // Button transformations
  transformed = transformed.replace(/<button([^>]*?)className="([^"]*?)"/g, '<Button$1className="$2"');
  transformed = transformed.replace(/<\/button>/g, '</Button>');

  // Dialog transformations
  transformed = transformed.replace(
    /<div[^>]*?className="[^"]*?fixed[^"]*?inset-0[^"]*?bg-black[^"]*?bg-opacity-50[^"]*?flex[^"]*?items-center[^"]*?justify-center"/g,
    '<DialogOverlay>'
  );

  return `${imports}

${transformed}`;
}

/**
 * Get Radix UI imports based on component type
 */
function getRadixImports(componentType: string): string {
  const imports = new Set<string>();

  switch (componentType) {
    case 'button':
      imports.add('Button');
      break;
    case 'dialog':
    case 'modal':
      imports.add('Dialog');
      imports.add('DialogOverlay');
      imports.add('DialogContent');
      imports.add('DialogHeader');
      imports.add('DialogFooter');
      imports.add('DialogTitle');
      imports.add('DialogTrigger');
      break;
    case 'dropdown':
    case 'select':
      imports.add('DropdownMenu');
      imports.add('DropdownMenuTrigger');
      imports.add('DropdownMenuContent');
      imports.add('DropdownMenuItem');
      imports.add('DropdownMenuSeparator');
      imports.add('DropdownMenuLabel');
      break;
    case 'tabs':
      imports.add('Tabs');
      imports.add('TabsList');
      imports.add('TabsTrigger');
      imports.add('TabsContent');
      break;
    case 'tooltip':
      imports.add('Tooltip');
      imports.add('TooltipProvider');
      imports.add('TooltipContent');
      imports.add('TooltipTrigger');
      break;
  }

  return Array.from(imports)
    .map((imp) => {
      // Create safe namespace alias from import name
      const alias = `Radix${imp.replace(/[^a-zA-Z0-9]/g, '').replace(/^[a-z]/, (c) => c.toUpperCase())}`;
      return `import * as ${alias} from "@radix-ui/react-${imp}"`;
    })
    .join('\n');
}

/**
 * Transform JSX for Headless UI components
 */
function transformForHeadlessUI(jsxBody: string, componentType: string, _designContext: IDesignContext): string {
  // Add Headless UI imports
  const imports = getHeadlessUIImports(componentType);

  let transformed = jsxBody;

  // Button transformations
  transformed = transformed.replace(/<button([^>]*?)className="([^"]*?)"/g, '<Button$1className="$2"');
  transformed = transformed.replace(/<\/button>/g, '</Button>');

  return `${imports}

${transformed}`;
}

/**
 * Get Headless UI imports based on component type
 */
function getHeadlessUIImports(componentType: string): string {
  const imports = new Set<string>();

  switch (componentType) {
    case 'button':
      imports.add('Button');
      break;
    case 'dialog':
    case 'modal':
      imports.add('Dialog');
      imports.add('DialogPanel');
      imports.add('DialogTitle');
      imports.add('DialogOverlay');
      break;
    case 'dropdown':
    case 'select':
      imports.add('Menu');
      imports.add('MenuButton');
      imports.add('MenuItem');
      imports.add('MenuItems');
      imports.add('MenuDivider');
      break;
  }

  return Array.from(imports)
    .map((imp) => `import { ${imp} } from "@headlessui/react"`)
    .join('\n');
}

/**
 * Transform JSX for PrimeVue components (Vue-specific)
 */
function transformForPrimeVue(jsxBody: string, _componentType: string, _designContext: IDesignContext): string {
  // PrimeVue component mappings
  const componentMappings: Record<string, string> = {
    button: 'Button',
    input: 'InputText',
    select: 'Dropdown',
    dropdown: 'Dropdown',
    textarea: 'Textarea',
    checkbox: 'Checkbox',
    radio: 'RadioButton',
    card: 'Card',
    dialog: 'Dialog',
    modal: 'Dialog',
    badge: 'Badge',
    avatar: 'Avatar',
    table: 'DataTable',
    tabs: 'Tabs',
    tooltip: 'Tooltip',
  };

  // PrimeVue prop mappings
  const propMappings: Record<string, string> = {
    label: ':label',
    value: ':modelValue',
    onChange: '@update:modelValue',
    onClick: '@click',
    onSubmit: '@submit',
    className: 'class',
    style: ':style',
    disabled: ':disabled',
    placeholder: 'placeholder',
    type: 'type',
    name: 'name',
    id: 'id',
  };

  let transformed = jsxBody;

  // Convert component tags
  for (const [htmlTag, primeTag] of Object.entries(componentMappings)) {
    const regex = new RegExp(`<${htmlTag}([^>]*?)>`, 'gi');
    transformed = transformed.replace(regex, `<${primeTag}$1>`);

    const closingRegex = new RegExp(`</${htmlTag}>`, 'gi');
    transformed = transformed.replace(closingRegex, `</${primeTag}>`);
  }

  // Convert props
  for (const [htmlProp, vueProp] of Object.entries(propMappings)) {
    const regex = new RegExp(`\\s+${htmlProp}="([^"]*?)"`, 'gi');
    transformed = transformed.replace(regex, ` ${vueProp}="$1"`);
  }

  // Handle self-closing tags
  transformed = transformed.replace(/<input([^>]*)\/>/g, '<InputText$1 />');
  transformed = transformed.replace(/<br([^>]*)\/>/g, '<br$1 />');

  // Convert class attributes to PrimeVue format if needed
  transformed = transformed.replace(/className="/g, 'class=');

  return transformed;
}

/**
 * Transform JSX for Material UI components
 */
function transformForMaterialUI(jsxBody: string, componentType: string, _designContext: IDesignContext): string {
  // Add Material UI imports
  const imports = getMaterialUIImports(componentType);

  let transformed = jsxBody;

  // Button transformations
  transformed = transformed.replace(/<button([^>]*?)className="([^"]*?)"/g, '<Button$1className="$2"');
  transformed = transformed.replace(/<\/button>/g, '</Button>');

  return `${imports}

${transformed}`;
}

/**
 * Get Material UI imports based on component type
 */
function getMaterialUIImports(componentType: string): string {
  const imports = new Set<string>();

  switch (componentType) {
    case 'button':
      imports.add('Button');
      break;
    case 'card':
      imports.add('Card');
      imports.add('CardContent');
      imports.add('CardActions');
      break;
    case 'textfield':
    case 'input':
      imports.add('TextField');
      break;
    case 'chip':
      imports.add('Chip');
      break;
    case 'dialog':
    case 'modal':
      imports.add('Dialog');
      imports.add('DialogTitle');
      imports.add('DialogContent');
      imports.add('DialogActions');
      break;
  }

  return Array.from(imports)
    .map((imp) => `import { ${imp} } from "@mui/material"`)
    .join('\n');
}

function generateReactComponent(
  name: string,
  type: string,
  _ctx: IDesignContext,
  propsInterfaceBody: string,
  props?: Record<string, string>,
  ragOptions?: IRagOptions,
  registryMatch?: ReturnType<typeof getBestMatch>,
  _componentLibrary?: string
): IGeneratedFile[] {
  const propsType = propsInterfaceBody ? `interface ${name}Props {\n${propsInterfaceBody}\n}\n\n` : '';
  const propsArg = propsInterfaceBody ? `{ ${Object.keys(props ?? {}).join(', ')} }: ${name}Props` : '';

  // Generate component body with component library integration
  let body = getComponentBody(type, _ctx, 'react', ragOptions, registryMatch);
  let libraryImports = '';

  // Apply component library transformations
  if (_componentLibrary && _componentLibrary !== 'none') {
    const transformed = transformComponentForLibrary(body, _componentLibrary, type, _ctx);
    // Extract imports from the transformed content
    const importMatch = transformed.match(/^(import [^\n]+(?:\nimport [^\n]+)*)\n\n/);
    if (importMatch) {
      libraryImports = `${importMatch[1]}\n\n`;
      body = transformed.replace(`${importMatch[1]}\n\n`, '');
    } else {
      body = transformed;
    }
  }

  return [
    {
      path: `components/${toKebabCase(name)}.tsx`,
      content: `${libraryImports}${propsType}export function ${name}(${propsArg}) {
  return (
${body}
  )
}
`,
    },
  ];
}

function generateVueComponent(
  name: string,
  type: string,
  _designContext: IDesignContext,
  props?: Record<string, string>,
  ragOptions?: IRagOptions,
  registryMatch?: ReturnType<typeof getBestMatch>,
  _componentLibrary?: string
): IGeneratedFile[] {
  const propsBlock = props
    ? Object.entries(props)
        .map(([key, pType]) => `  ${key}: { type: ${vueType(pType)}, required: true },`)
        .join('\n')
    : '';
  const body = getComponentBody(type, _designContext, 'vue', ragOptions, registryMatch);

  return [
    {
      path: `components/${toKebabCase(name)}.vue`,
      content: `<script setup lang="ts">
${propsBlock ? `defineProps({\n${propsBlock}\n})` : ''}
</script>

<template>
${body}
</template>
`,
    },
  ];
}

function generateAngularComponent(
  name: string,
  type: string,
  _designContext: IDesignContext,
  props?: Record<string, string>,
  ragOptions?: IRagOptions,
  registryMatch?: ReturnType<typeof getBestMatch>,
  _componentLibrary?: string
): IGeneratedFile[] {
  const inputDecls = props
    ? Object.entries(props)
        .map(([key, pType]) => `  @Input() ${key}!: ${pType};`)
        .join('\n')
    : '';
  const body = getComponentBody(type, _designContext, 'angular', ragOptions, registryMatch);

  return [
    {
      path: `components/${toKebabCase(name)}.component.ts`,
      content: `import { Component${props ? ', Input' : ''} } from '@angular/core';

@Component({
  selector: 'app-${toKebabCase(name)}',
  standalone: true,
  template: \`
${body}
  \`,
})
export class ${name}Component {
${inputDecls}
}
`,
    },
  ];
}

function generateSvelteComponent(
  name: string,
  type: string,
  _designContext: IDesignContext,
  props?: Record<string, string>,
  ragOptions?: IRagOptions,
  registryMatch?: ReturnType<typeof getBestMatch>,
  _componentLibrary?: string
): IGeneratedFile[] {
  const propsDecl = props
    ? Object.entries(props)
        .map(([key, pType]) => `  export let ${key}: ${pType};`)
        .join('\n')
    : '';
  const body = jsxToSvelte(getComponentBody(type, _designContext, 'svelte', ragOptions, registryMatch));

  return [
    {
      path: `components/${toKebabCase(name)}.svelte`,
      content: `<script lang="ts">
${propsDecl}
</script>

${body}
`,
    },
  ];
}

function generateHtmlComponent(
  name: string,
  type: string,
  ctx: IDesignContext,
  ragOptions?: IRagOptions,
  registryMatch?: ReturnType<typeof getBestMatch>,
  _componentLibrary?: string
): IGeneratedFile[] {
  const body = jsxToHtmlAttributes(getComponentBody(type, ctx, 'html', ragOptions, registryMatch));

  return [
    {
      path: `components/${toKebabCase(name)}.html`,
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${name}</title>
  <!-- CDN approach for quick prototyping. Trade-offs: no tree-shaking, runtime network dependency.
       For production: use build-time Tailwind compilation (npm install tailwindcss) or prebuilt CSS. -->
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --primary: ${ctx.colorPalette.primary};
      --background: ${ctx.colorPalette.background};
      --foreground: ${ctx.colorPalette.foreground};
      --font-family: ${ctx.typography.fontFamily};
    }
    body { font-family: var(--font-family); }
  </style>
</head>
<body>
${body}
</body>
</html>
`,
    },
  ];
}

function getComponentBody(
  type: string,
  _ctx: IDesignContext,
  _fw: string,
  ragOptions?: IRagOptions,
  registryMatch?: ReturnType<typeof getBestMatch>
): string {
  // Use provided registry match or fetch if not provided
  const match = registryMatch ?? getBestMatch(type, ragOptions);
  if (match) {
    return `    ${match.jsx}`;
  }

  // Fallback to hardcoded templates
  switch (type.toLowerCase()) {
    case 'button':
      return `    <button
      type="button"
      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      aria-label="Action button"
    >
      Click me
    </button>`;

    case 'card':
      return `    <article className="rounded-lg border bg-card p-4 sm:p-6 text-card-foreground shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-base sm:text-lg font-semibold text-foreground">Card Title</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Card description goes here.</p>
    </article>`;

    case 'form':
      return `    <form className="space-y-4 rounded-lg border bg-card p-4 sm:p-6" aria-label="Login form" noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required aria-required="true" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" placeholder="Enter your email" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required aria-required="true" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" placeholder="Enter your password" />
      </div>
      <button type="submit" className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
        Submit
      </button>
    </form>`;

    case 'navbar':
    case 'nav':
      return `    <nav aria-label="Main navigation" className="sticky top-0 z-40 flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
      <a href="/" className="text-lg font-bold text-foreground">Logo</a>
      <div className="hidden sm:flex gap-4 md:gap-6" role="menubar">
        <a href="#" role="menuitem" className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Home</a>
        <a href="#" role="menuitem" className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">About</a>
        <a href="#" role="menuitem" className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Contact</a>
      </div>
      <button type="button" className="sm:hidden p-2 rounded-md hover:bg-accent" aria-label="Toggle menu" aria-expanded="false">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
      </button>
    </nav>`;

    case 'hero':
      return `    <section aria-labelledby="hero-heading" className="flex min-h-[60vh] flex-col items-center justify-center bg-background text-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 id="hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
        Welcome to Your App
      </h1>
      <p className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
        Build something amazing with modern tools and best practices.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button type="button" className="rounded-md bg-primary px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          Get Started
        </button>
        <button type="button" className="rounded-md border border-input bg-background px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          Learn More
        </button>
      </div>
    </section>`;

    case 'modal':
      return `    <div role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-desc" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm sm:max-w-md rounded-lg bg-background p-4 sm:p-6 shadow-lg">
        <h2 id="modal-title" className="text-lg font-semibold text-foreground">Modal Title</h2>
        <p id="modal-desc" className="mt-2 text-sm text-muted-foreground leading-relaxed">Modal content goes here.</p>
        <div className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button type="button" className="rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Cancel</button>
          <button type="button" className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Confirm</button>
        </div>
      </div>
    </div>`;

    case 'table':
      return `    <div className="w-full overflow-x-auto rounded-lg border">
      <table className="w-full caption-bottom text-sm" role="table">
        <caption className="mt-4 text-sm text-muted-foreground">A list of items.</caption>
        <thead className="border-b bg-muted/50">
          <tr>
            <th scope="col" className="h-10 px-3 sm:px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
            <th scope="col" className="h-10 px-3 sm:px-4 text-left align-middle font-medium text-muted-foreground hidden sm:table-cell">Status</th>
            <th scope="col" className="h-10 px-3 sm:px-4 text-right align-middle font-medium text-muted-foreground">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b transition-colors hover:bg-muted/50">
            <td className="p-3 sm:p-4 align-middle font-medium">Item 1</td>
            <td className="p-3 sm:p-4 align-middle hidden sm:table-cell"><span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Active</span></td>
            <td className="p-3 sm:p-4 align-middle text-right"><button type="button" className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Edit</button></td>
          </tr>
        </tbody>
      </table>
    </div>`;

    case 'sidebar':
      return `    <aside aria-label="Sidebar navigation" className="flex h-full w-56 sm:w-64 flex-col border-r bg-background">
      <div className="p-4 sm:p-6 border-b">
        <span className="text-lg font-semibold text-foreground">App Name</span>
      </div>
      <nav aria-label="Sidebar links" className="flex-1 space-y-1 p-2 sm:p-4">
        <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-accent text-accent-foreground">Dashboard</a>
        <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">Settings</a>
        <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">Profile</a>
      </nav>
    </aside>`;

    default:
      return `    <div className="rounded-lg border bg-card p-4 sm:p-6 text-card-foreground shadow-sm">
      <p className="text-foreground">${type} component</p>
    </div>`;
  }
}

function vueType(tsType: string): string {
  switch (tsType.toLowerCase()) {
    case 'string':
      return 'String';
    case 'number':
      return 'Number';
    case 'boolean':
      return 'Boolean';
    default:
      return 'Object';
  }
}
