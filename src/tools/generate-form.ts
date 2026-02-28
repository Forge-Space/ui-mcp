import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  createLogger,
  designContextStore,
  getDatabase,
  getRegistrySize,
  initializeRegistry,
  recordGeneration,
  type IDesignContext,
  type IGeneratedFile,
  type IGeneration,
} from '@forgespace/siza-gen';
import { withBrandContext } from '../lib/brand-context.js';

const logger = createLogger('generate-form');

interface FormField {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  validation?: string;
}

const FORM_PRESETS: Record<string, FormField[]> = {
  login: [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      placeholder: 'you@example.com',
      validation: 'email',
    },
    { name: 'password', type: 'password', label: 'Password', required: true, validation: 'min:8' },
    { name: 'remember_me', type: 'checkbox', label: 'Remember me' },
  ],
  signup: [
    { name: 'name', type: 'text', label: 'Full name', required: true, placeholder: 'Jane Doe', validation: 'min:2' },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      placeholder: 'you@example.com',
      validation: 'email',
    },
    { name: 'password', type: 'password', label: 'Password', required: true, validation: 'min:8' },
    {
      name: 'confirm_password',
      type: 'password',
      label: 'Confirm password',
      required: true,
      validation: 'match:password',
    },
    { name: 'terms', type: 'checkbox', label: 'I agree to the Terms of Service', required: true },
  ],
  contact: [
    { name: 'name', type: 'text', label: 'Name', required: true, placeholder: 'Your name' },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      placeholder: 'you@example.com',
      validation: 'email',
    },
    { name: 'subject', type: 'text', label: 'Subject', required: true, placeholder: 'How can we help?' },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
      required: true,
      placeholder: 'Your message...',
      validation: 'min:10',
    },
  ],
  checkout: [
    { name: 'email', type: 'email', label: 'Email', required: true, validation: 'email' },
    { name: 'card_name', type: 'text', label: 'Name on card', required: true },
    { name: 'card_number', type: 'text', label: 'Card number', required: true, placeholder: '4242 4242 4242 4242' },
    { name: 'expiry', type: 'text', label: 'Expiry', required: true, placeholder: 'MM/YY' },
    { name: 'cvv', type: 'text', label: 'CVV', required: true, placeholder: '123' },
    { name: 'address', type: 'text', label: 'Billing address', required: true },
    { name: 'city', type: 'text', label: 'City', required: true },
    { name: 'zip', type: 'text', label: 'ZIP code', required: true },
    {
      name: 'country',
      type: 'select',
      label: 'Country',
      required: true,
      options: ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'Brazil'],
    },
  ],
  settings: [
    { name: 'display_name', type: 'text', label: 'Display name', required: true, placeholder: 'Your display name' },
    { name: 'email', type: 'email', label: 'Email', required: true, validation: 'email' },
    { name: 'bio', type: 'textarea', label: 'Bio', placeholder: 'Tell us about yourself...', validation: 'max:500' },
    {
      name: 'timezone',
      type: 'select',
      label: 'Timezone',
      options: [
        'UTC',
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles',
        'Europe/London',
        'Europe/Berlin',
        'Asia/Tokyo',
        'Asia/Shanghai',
      ],
    },
    { name: 'notifications', type: 'checkbox', label: 'Email notifications' },
  ],
  search: [
    { name: 'query', type: 'text', label: 'Search', required: true, placeholder: 'Search...' },
    { name: 'category', type: 'select', label: 'Category', options: ['All', 'Products', 'Articles', 'Users'] },
    { name: 'sort', type: 'radio', label: 'Sort by', options: ['Relevance', 'Newest', 'Popular'] },
  ],
  newsletter: [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      placeholder: 'you@example.com',
      validation: 'email',
    },
    { name: 'name', type: 'text', label: 'Name', placeholder: 'Your name (optional)' },
  ],
};

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function zodTypeForField(f: FormField): string {
  const base =
    f.type === 'email'
      ? 'z.string().email()'
      : f.type === 'number'
        ? 'z.coerce.number()'
        : f.type === 'checkbox'
          ? 'z.boolean()'
          : 'z.string()';

  let chain = base;
  if (f.validation) {
    for (const rule of f.validation.split(',')) {
      const trimmed = rule.trim();
      if (trimmed.startsWith('min:')) {
        const val = trimmed.slice(4);
        chain += f.type === 'number' ? `.min(${val})` : `.min(${val})`;
      } else if (trimmed.startsWith('max:')) {
        chain += `.max(${trimmed.slice(4)})`;
      }
    }
  }
  if (f.required && f.type !== 'checkbox') {
    if (!chain.includes('.email()') && !chain.includes('.min(')) {
      chain += '.min(1, { message: "Required" })';
    }
  }
  if (!f.required && f.type !== 'checkbox') {
    chain += '.optional()';
  }
  if (f.type === 'checkbox' && f.required) {
    chain = 'z.literal(true, { errorMap: () =>' + ' ({ message: "You must accept" }) })';
  }
  return chain;
}

function yupTypeForField(f: FormField): string {
  const base =
    f.type === 'email'
      ? 'yup.string().email()'
      : f.type === 'number'
        ? 'yup.number()'
        : f.type === 'checkbox'
          ? 'yup.boolean()'
          : 'yup.string()';

  let chain = base;
  if (f.validation) {
    for (const rule of f.validation.split(',')) {
      const trimmed = rule.trim();
      if (trimmed.startsWith('min:')) {
        chain += `.min(${trimmed.slice(4)})`;
      } else if (trimmed.startsWith('max:')) {
        chain += `.max(${trimmed.slice(4)})`;
      }
    }
  }
  if (f.required) {
    chain += '.required()';
  }
  return chain;
}

function generateZodSchema(fields: FormField[], formName: string): string {
  const lines = fields.map((f) => `  ${toCamelCase(f.name)}: ${zodTypeForField(f)},`);
  const name = `${toPascalCase(formName)}Schema`;
  return [
    "import { z } from 'zod';",
    '',
    `export const ${name} = z.object({`,
    ...lines,
    '});',
    '',
    `export type ${toPascalCase(formName)}Data` + ` = z.infer<typeof ${name}>;`,
    '',
  ].join('\n');
}

function generateYupSchema(fields: FormField[], formName: string): string {
  const lines = fields.map((f) => `  ${toCamelCase(f.name)}: ${yupTypeForField(f)},`);
  const name = `${toPascalCase(formName)}Schema`;
  return [
    "import * as yup from 'yup';",
    '',
    `export const ${name} = yup.object({`,
    ...lines,
    '});',
    '',
    `export type ${toPascalCase(formName)}Data` + ` = yup.InferType<typeof ${name}>;`,
    '',
  ].join('\n');
}

function generateTypeFile(fields: FormField[], formName: string): string {
  const props = fields.map((f) => {
    const tsType = f.type === 'number' ? 'number' : f.type === 'checkbox' ? 'boolean' : 'string';
    const opt = f.required ? '' : '?';
    return `  ${toCamelCase(f.name)}${opt}: ${tsType};`;
  });
  return [`export interface ${toPascalCase(formName)}Data {`, ...props, '}', ''].join('\n');
}

function fieldInputJsx(f: FormField, dk: (cls: string) => string, compLib: string): string {
  const id = `field-${f.name}`;
  const errId = `${id}-error`;
  const inputCls =
    compLib === 'shadcn'
      ? `flex h-10 w-full rounded-md border border-input` +
        ` bg-background px-3 py-2 text-sm` +
        ` focus-visible:outline-none focus-visible:ring-2` +
        ` focus-visible:ring-ring${dk(' dark:border-gray-700 dark:bg-gray-900')}`
      : `w-full rounded-md border border-gray-300 px-3 py-2` +
        ` text-sm focus:outline-none focus:ring-2` +
        ` focus:ring-blue-500${dk(' dark:border-gray-700 dark:bg-gray-800' + ' dark:text-gray-100')}`;

  if (f.type === 'textarea') {
    return (
      `<textarea id="${id}" name="${f.name}"${f.placeholder ? ` placeholder="${f.placeholder}"` : ''}${
        f.required ? ' required' : ''
      } aria-describedby="${errId}"` + ` className="${inputCls} min-h-[100px]" />`
    );
  }
  if (f.type === 'select') {
    const opts = (f.options ?? []).map((o) => `          <option value="${o}">${o}</option>`).join('\n');
    return (
      `<select id="${id}" name="${f.name}"${f.required ? ' required' : ''} aria-describedby="${errId}"` +
      ` className="${inputCls}">\n` +
      `          <option value="">Select...</option>\n${opts}\n        </select>`
    );
  }
  if (f.type === 'checkbox') {
    return (
      `<input id="${id}" name="${f.name}" type="checkbox"` +
      ` className="h-4 w-4 rounded border-gray-300${dk(' dark:border-gray-600')}" />`
    );
  }
  if (f.type === 'radio') {
    return (f.options ?? [])
      .map((o, i) => {
        const rid = `${id}-${i}`;
        return (
          `<label htmlFor="${rid}"` +
          ` className="flex items-center gap-2 text-sm">` +
          `<input id="${rid}" name="${f.name}" type="radio"` +
          ` value="${o}"` +
          ` className="h-4 w-4 border-gray-300${dk(' dark:border-gray-600')}" />${o}</label>`
        );
      })
      .join('\n        ');
  }
  return (
    `<input id="${id}" name="${f.name}" type="${f.type}"${f.placeholder ? ` placeholder="${f.placeholder}"` : ''}${
      f.required ? ' required' : ''
    } aria-describedby="${errId}"` + ` className="${inputCls}" />`
  );
}

function buildFormBody(
  fields: FormField[],
  formName: string,
  darkMode: boolean,
  compLib: string,
  multiStep: boolean
): string {
  const dk = (cls: string) => (darkMode ? cls : '');
  const btnCls =
    compLib === 'shadcn'
      ? 'rounded-md bg-primary px-4 py-2 text-sm font-medium' + ' text-primary-foreground hover:bg-primary/90'
      : `rounded-md bg-blue-600 px-4 py-2 text-sm font-medium` +
        ` text-white hover:bg-blue-700${dk(' dark:bg-blue-500 dark:hover:bg-blue-600')}`;

  const title = toPascalCase(formName)
    .replace(/([A-Z])/g, ' $1')
    .trim();

  if (multiStep && fields.length > 3) {
    const stepSize = Math.ceil(fields.length / Math.ceil(fields.length / 3));
    const steps: FormField[][] = [];
    for (let i = 0; i < fields.length; i += stepSize) {
      steps.push(fields.slice(i, i + stepSize));
    }
    const stepBodies = steps
      .map((stepFields, si) => {
        const fieldJsx = stepFields
          .map((f) => {
            const isInline = f.type === 'checkbox';
            if (isInline) {
              return (
                `      <div className="flex items-center gap-2">\n` +
                `        ${fieldInputJsx(f, dk, compLib)}\n` +
                `        <label htmlFor="field-${f.name}"` +
                ` className="text-sm font-medium">` +
                `${f.label}</label>\n` +
                `      </div>`
              );
            }
            return (
              `      <div>\n` +
              `        <label htmlFor="field-${f.name}"` +
              ` className="block text-sm font-medium mb-1">` +
              `${f.label}${f.required ? ' *' : ''}</label>\n` +
              `        ${fieldInputJsx(f, dk, compLib)}\n` +
              `        <p id="field-${f.name}-error" role="alert"` +
              ` className="mt-1 text-xs text-red-500${dk(' dark:text-red-400')} hidden" />\n` +
              `      </div>`
            );
          })
          .join('\n');
        return (
          `    {step === ${si} && (\n` +
          `      <div className="space-y-4">\n` +
          `        <h3 className="text-sm font-medium` +
          ` text-muted-foreground">Step ${si + 1}` +
          ` of ${steps.length}</h3>\n${fieldJsx}\n` +
          `      </div>\n    )}`
        );
      })
      .join('\n');

    return (
      `    <div className="min-h-screen bg-background${dk(' dark:bg-gray-950 dark:text-gray-100')}">\n` +
      `      <div className="mx-auto max-w-md px-4 py-12">\n` +
      `        <h2 className="text-2xl font-bold mb-6">` +
      `${title}</h2>\n` +
      `        <div className="mb-6 flex gap-1">\n` +
      `          {Array.from({ length: ${steps.length} })` +
      `.map((_, i) => (\n` +
      `            <div key={i} className={\`flex-1 h-1` +
      ` rounded-full \${i <= step` +
      ` ? 'bg-primary' : 'bg-muted'}\`} />\n` +
      `          ))}\n` +
      `        </div>\n` +
      `        <form onSubmit={handleSubmit}` +
      ` className="space-y-4"` +
      ` aria-label="${title} form">\n${stepBodies}\n` +
      `          <div className="flex justify-between pt-4">\n` +
      `            {step > 0 && (\n` +
      `              <button type="button"` +
      ` onClick={() => setStep(step - 1)}` +
      ` className="rounded-md border px-4 py-2 text-sm${dk(' dark:border-gray-700')}">Back</button>\n` +
      `            )}\n` +
      `            {step < ${steps.length - 1} ? (\n` +
      `              <button type="button"` +
      ` onClick={() => setStep(step + 1)}` +
      ` className="${btnCls} ml-auto">Next</button>\n` +
      `            ) : (\n` +
      `              <button type="submit"` +
      ` className="${btnCls} ml-auto">Submit</button>\n` +
      `            )}\n` +
      `          </div>\n` +
      `        </form>\n` +
      `      </div>\n` +
      `    </div>`
    );
  }

  const fieldJsx = fields
    .map((f) => {
      const isInline = f.type === 'checkbox';
      if (isInline) {
        return (
          `        <div className="flex items-center gap-2">\n` +
          `          ${fieldInputJsx(f, dk, compLib)}\n` +
          `          <label htmlFor="field-${f.name}"` +
          ` className="text-sm font-medium">` +
          `${f.label}</label>\n` +
          `        </div>`
        );
      }
      return (
        `        <div>\n` +
        `          <label htmlFor="field-${f.name}"` +
        ` className="block text-sm font-medium mb-1">` +
        `${f.label}${f.required ? ' *' : ''}</label>\n` +
        `          ${fieldInputJsx(f, dk, compLib)}\n` +
        `          <p id="field-${f.name}-error" role="alert"` +
        ` className="mt-1 text-xs text-red-500${dk(' dark:text-red-400')} hidden" />\n` +
        `        </div>`
      );
    })
    .join('\n');

  return (
    `    <div className="min-h-screen bg-background${dk(' dark:bg-gray-950 dark:text-gray-100')}">\n` +
    `      <div className="mx-auto max-w-md px-4 py-12">\n` +
    `        <h2 className="text-2xl font-bold mb-6">` +
    `${title}</h2>\n` +
    `        <form onSubmit={handleSubmit}` +
    ` className="space-y-4"` +
    ` aria-label="${title} form">\n${fieldJsx}\n` +
    `          <button type="submit"` +
    ` className="${btnCls} w-full">Submit</button>\n` +
    `        </form>\n` +
    `      </div>\n` +
    `    </div>`
  );
}

export function generateFormFiles(
  formType: string,
  formName: string,
  framework: string,
  fields: FormField[],
  validationLib: string,
  compLib: string,
  darkMode: boolean,
  multiStep: boolean,
  _ctx: IDesignContext
): IGeneratedFile[] {
  const resolved = fields.length > 0 ? fields : (FORM_PRESETS[formType] ?? []);
  const kebab = toKebabCase(formName);
  const pascal = toPascalCase(formName);
  const files: IGeneratedFile[] = [];
  const body = buildFormBody(resolved, formName, darkMode, compLib, multiStep);
  const needsStep = multiStep && resolved.length > 3;

  switch (framework) {
    case 'react':
    case 'nextjs': {
      const directive = framework === 'nextjs' ? "'use client'\n\n" : '';
      const stateImport = needsStep ? "import { useState } from 'react';\n" : '';
      const stateDecl = needsStep ? '  const [step, setStep] = useState(0);\n' : '';
      files.push({
        path: `forms/${kebab}.tsx`,
        content:
          `${directive}${stateImport}\n` +
          `export default function ${pascal}Form() {\n${stateDecl}  const handleSubmit = ` +
          `(e: React.FormEvent) => {\n` +
          `    e.preventDefault();\n  };\n\n` +
          `  return (\n${body}\n  )\n}\n`,
      });
      break;
    }
    case 'vue': {
      const stepScript = needsStep
        ? '\nconst step = ref(0);\n' + 'const setStep = (s: number) => { step.value = s; };'
        : '';
      const vueBody = body
        .replace(/className=/g, 'class=')
        .replace(/htmlFor=/g, 'for=')
        .replace(/onSubmit=\{handleSubmit\}/g, '@submit.prevent="handleSubmit"')
        .replace(/onClick=\{[^}]+\}/g, (m) => {
          if (m.includes('step - 1')) return '@click="setStep(step - 1)"';
          if (m.includes('step + 1')) return '@click="setStep(step + 1)"';
          return m;
        });
      files.push({
        path: `forms/${kebab}.vue`,
        content:
          `<script setup lang="ts">\n` +
          `import { ref } from 'vue';\n${stepScript}\nconst handleSubmit = () => {\n};\n` +
          `</script>\n\n` +
          `<template>\n${vueBody}\n</template>\n`,
      });
      break;
    }
    case 'angular': {
      const angBody = body
        .replace(/className=/g, 'class=')
        .replace(/htmlFor=/g, 'for=')
        .replace(/onSubmit=\{handleSubmit\}/g, '(ngSubmit)="handleSubmit()"');
      files.push({
        path: `forms/${kebab}.component.ts`,
        content:
          `import { Component } from '@angular/core';\n` +
          `import { FormsModule } from '@angular/forms';\n\n` +
          `@Component({\n` +
          `  selector: 'app-${kebab}-form',\n` +
          `  standalone: true,\n` +
          `  imports: [FormsModule],\n` +
          `  template: \`\n${angBody}\n  \`,\n` +
          `})\n` +
          `export class ${pascal}FormComponent {\n${
            needsStep ? '  step = 0;\n\n' + '  setStep(s: number) { this.step = s; }\n\n' : ''
          }  handleSubmit() {}\n}\n`,
      });
      break;
    }
    case 'svelte': {
      const svelteBody = body
        .replace(/className=/g, 'class=')
        .replace(/htmlFor=/g, 'for=')
        .replace(/onSubmit=\{handleSubmit\}/g, 'on:submit|preventDefault={handleSubmit}');
      files.push({
        path: `forms/${kebab}.svelte`,
        content:
          `<script lang="ts">\n${
            needsStep ? '  let step = 0;\n' + '  const setStep = (s: number) => { step = s; };\n' : ''
          }  const handleSubmit = () => {};\n` + `</script>\n\n${svelteBody}\n`,
      });
      break;
    }
    case 'html':
    default: {
      const htmlBody = body
        .replace(/className=/g, 'class=')
        .replace(/htmlFor=/g, 'for=')
        .replace(/onSubmit=\{handleSubmit\}/g, '')
        .replace(/{\/\*[^*]*\*\/}/g, '');
      files.push({
        path: `forms/${kebab}.html`,
        content:
          `<!DOCTYPE html>\n<html lang="en">\n<head>\n` +
          `  <meta charset="UTF-8" />\n` +
          `  <meta name="viewport"` +
          ` content="width=device-width, initial-scale=1.0" />\n` +
          `  <title>${pascal} Form</title>\n` +
          `  <script src="https://cdn.tailwindcss.com"></script>\n` +
          `</head>\n<body>\n${htmlBody}\n</body>\n</html>\n`,
      });
      break;
    }
  }

  if (validationLib === 'zod') {
    files.push({
      path: `forms/${kebab}.schema.ts`,
      content: generateZodSchema(resolved, formName),
    });
  } else if (validationLib === 'yup') {
    files.push({
      path: `forms/${kebab}.schema.ts`,
      content: generateYupSchema(resolved, formName),
    });
  }

  files.push({
    path: `forms/${kebab}.types.ts`,
    content: generateTypeFile(resolved, formName),
  });

  return files;
}

export function registerGenerateForm(server: McpServer): void {
  server.tool(
    'generate_form',
    'Generate production-ready forms with validation schemas,' +
      ' accessible markup, error handling, and multi-step support.' +
      ' Includes preset form types (login, signup, contact,' +
      ' checkout) or fully custom field definitions.',
    {
      form_type: z
        .enum(['login', 'signup', 'contact', 'checkout', 'settings', 'search', 'newsletter', 'custom'])
        .describe('Type of form to generate'),
      framework: z.enum(['react', 'nextjs', 'vue', 'angular', 'svelte', 'html']).describe('Target framework'),
      fields: z
        .array(
          z.object({
            name: z.string(),
            type: z.enum([
              'text',
              'email',
              'password',
              'number',
              'tel',
              'url',
              'textarea',
              'select',
              'checkbox',
              'radio',
              'date',
              'file',
            ]),
            label: z.string(),
            required: z.boolean().optional(),
            placeholder: z.string().optional(),
            options: z.array(z.string()).optional(),
            validation: z.string().optional(),
          })
        )
        .optional()
        .describe('Custom field definitions. Required for "custom" type,' + ' optional override for presets.'),
      validation_library: z
        .enum(['zod', 'yup', 'none'])
        .default('zod')
        .describe('Validation library for schema generation'),
      component_library: z
        .enum(['shadcn', 'radix', 'headlessui', 'material', 'none'])
        .default('none')
        .describe('Component library styling'),
      multi_step: z.boolean().default(false).describe('Split into multi-step form with progress'),
      dark_mode: z.boolean().default(false).describe('Include dark mode classes'),
      brand_identity: z
        .string()
        .optional()
        .describe('JSON from branding-mcp generate_brand_identity.' + ' Overrides design context with brand tokens.'),
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
        .describe('Design mood'),
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
        .describe('Target industry'),
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
        .describe('Visual style'),
    },
    async ({
      form_type,
      framework,
      fields: customFields,
      validation_library,
      component_library,
      multi_step,
      dark_mode,
      brand_identity,
      mood: _mood,
      industry: _industry,
      visual_style: _visualStyle,
    }) => {
      return withBrandContext(brand_identity, async () => {
        try {
          initializeRegistry();
          const ctx = designContextStore.get();

          const resolvedFields = customFields ?? FORM_PRESETS[form_type] ?? [];

          if (resolvedFields.length === 0) {
            return {
              content: [
                {
                  type: 'text' as const,
                  text: 'Error: "custom" form_type requires' + ' a "fields" array.',
                },
              ],
              isError: true,
            };
          }

          const files = generateFormFiles(
            form_type,
            form_type === 'custom' ? 'custom-form' : form_type,
            framework,
            resolvedFields,
            validation_library,
            component_library,
            dark_mode,
            multi_step,
            ctx
          );

          try {
            const db = getDatabase();
            const gen: IGeneration = {
              id: `gen-${Date.now()}` + `-${randomUUID().slice(0, 8)}`,
              tool: 'generate_ui_component',
              params: {
                form_type,
                framework,
                validation_library,
                multi_step: String(multi_step),
              },
              componentType: `form-${form_type}`,
              framework,
              outputHash: '',
              timestamp: Date.now(),
              sessionId: `session-${Date.now()}` + `-${randomUUID().slice(0, 8)}`,
            };
            recordGeneration(gen, files[0]?.content || '', db, `form-${form_type}`);
          } catch (err) {
            logger.warn({ error: err }, 'Generation recording failed');
          }

          const registrySize = getRegistrySize();
          const summary = [
            `\u{1F4DD} Generated "${form_type}" form` + ` for ${framework}`,
            `Validation: ${validation_library}`,
            `Component library: ${component_library === 'none' ? 'Tailwind CSS (raw)' : component_library}`,
            `Multi-step: ${multi_step ? 'yes' : 'no'}`,
            `Dark mode: ${dark_mode ? 'enabled' : 'disabled'}`,
            `Fields: ${resolvedFields.length}`,
            `Files: ${files.length}`,
            registrySize > 0 ? `\n\u{1F4DA} RAG Registry:` + ` ${registrySize} snippets loaded` : '',
            '',
            'Files:',
            ...files.map((f) => `  ${f.path}`),
          ].join('\n');

          return {
            content: [
              { type: 'text' as const, text: summary },
              {
                type: 'text' as const,
                text: JSON.stringify({ files, designContext: ctx }, null, 2),
              },
            ],
          };
        } catch (error) {
          const msg = error instanceof Error ? error.message : String(error);
          logger.error({ form_type, framework, error: msg }, 'Error in generate_form');
          return {
            content: [
              {
                type: 'text' as const,
                text: `Error generating form: ${msg}`,
              },
            ],
            isError: true,
          };
        }
      });
    }
  );
}
