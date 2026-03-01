import { designContextStore, loadConfig } from '@forgespace/siza-gen';
import { generateFormFiles } from '../../tools/generate-form.js';

describe('generate_form tool — extended coverage', () => {
  beforeAll(() => {
    loadConfig();
  });

  const ctx = () => designContextStore.get();

  // ── Field type rendering ────────────────────────────────────────────

  describe('field type rendering', () => {
    it('renders textarea with min-height', () => {
      const fields = [{ name: 'bio', type: 'textarea', label: 'Bio', required: true }];
      const files = generateFormFiles('custom', 'bio-form', 'react', fields, 'none', 'none', false, false, ctx());
      const form = files[0].content;
      expect(form).toContain('<textarea');
      expect(form).toContain('min-h-[100px]');
      expect(form).toContain('id="field-bio"');
    });

    it('renders select with placeholder option', () => {
      const fields = [{ name: 'color', type: 'select', label: 'Color', options: ['Red', 'Blue', 'Green'] }];
      const files = generateFormFiles('custom', 'color-form', 'react', fields, 'none', 'none', false, false, ctx());
      const form = files[0].content;
      expect(form).toContain('<select');
      expect(form).toContain('Select...');
      expect(form).toContain('Red');
      expect(form).toContain('Blue');
      expect(form).toContain('Green');
    });

    it('renders checkbox inline with label', () => {
      const fields = [{ name: 'agree', type: 'checkbox', label: 'I agree' }];
      const files = generateFormFiles('custom', 'agree-form', 'react', fields, 'none', 'none', false, false, ctx());
      const form = files[0].content;
      expect(form).toContain('type="checkbox"');
      expect(form).toContain('flex items-center gap-2');
    });

    it('renders radio buttons with individual labels', () => {
      const fields = [{ name: 'priority', type: 'radio', label: 'Priority', options: ['Low', 'Medium', 'High'] }];
      const files = generateFormFiles('custom', 'priority-form', 'react', fields, 'none', 'none', false, false, ctx());
      const form = files[0].content;
      expect(form).toContain('type="radio"');
      expect(form).toContain('field-priority-0');
      expect(form).toContain('field-priority-1');
      expect(form).toContain('field-priority-2');
      expect(form).toContain('Low');
      expect(form).toContain('High');
    });

    it.each(['date', 'file', 'tel', 'url'] as const)('renders %s input type', (type) => {
      const fields = [{ name: `test_${type}`, type, label: `Test ${type}`, required: true }];
      const files = generateFormFiles('custom', 'type-test', 'react', fields, 'none', 'none', false, false, ctx());
      const form = files[0].content;
      expect(form).toContain(`type="${type}"`);
      expect(form).toContain(`id="field-test_${type}"`);
    });

    it('renders placeholder text when provided', () => {
      const fields = [{ name: 'email', type: 'email', label: 'Email', placeholder: 'you@example.com' }];
      const files = generateFormFiles('custom', 'ph-form', 'react', fields, 'none', 'none', false, false, ctx());
      expect(files[0].content).toContain('placeholder="you@example.com"');
    });

    it('adds required attribute for required fields', () => {
      const fields = [
        { name: 'name', type: 'text', label: 'Name', required: true },
        { name: 'notes', type: 'text', label: 'Notes', required: false },
      ];
      const files = generateFormFiles('custom', 'req-form', 'react', fields, 'none', 'none', false, false, ctx());
      const form = files[0].content;
      // Required field gets required attribute and asterisk label
      expect(form).toContain('Name *');
      // Non-required field doesn't
      expect(form).not.toContain('Notes *');
    });
  });

  // ── Validation schema details ───────────────────────────────────────

  describe('Zod schema details', () => {
    it('generates z.coerce.number() for number fields', () => {
      const fields = [{ name: 'age', type: 'number', label: 'Age', required: true }];
      const files = generateFormFiles('custom', 'num-form', 'react', fields, 'zod', 'none', false, false, ctx());
      const schema = files.find((f) => f.path.endsWith('.schema.ts'));
      expect(schema!.content).toContain('z.coerce.number()');
    });

    it('generates z.boolean() for checkbox fields', () => {
      const fields = [{ name: 'notify', type: 'checkbox', label: 'Notify me' }];
      const files = generateFormFiles('custom', 'cb-form', 'react', fields, 'zod', 'none', false, false, ctx());
      const schema = files.find((f) => f.path.endsWith('.schema.ts'));
      expect(schema!.content).toContain('z.boolean()');
    });

    it('generates z.literal(true) for required checkbox', () => {
      const fields = [{ name: 'terms', type: 'checkbox', label: 'Accept terms', required: true }];
      const files = generateFormFiles('custom', 'terms-form', 'react', fields, 'zod', 'none', false, false, ctx());
      const schema = files.find((f) => f.path.endsWith('.schema.ts'));
      expect(schema!.content).toContain('z.literal(true');
    });

    it('adds .optional() for non-required string fields', () => {
      const fields = [{ name: 'nickname', type: 'text', label: 'Nickname', required: false }];
      const files = generateFormFiles('custom', 'opt-form', 'react', fields, 'zod', 'none', false, false, ctx());
      const schema = files.find((f) => f.path.endsWith('.schema.ts'));
      expect(schema!.content).toContain('.optional()');
    });

    it('adds .min(1) for required fields without other min/email validation', () => {
      const fields = [{ name: 'title', type: 'text', label: 'Title', required: true }];
      const files = generateFormFiles('custom', 'min-form', 'react', fields, 'zod', 'none', false, false, ctx());
      const schema = files.find((f) => f.path.endsWith('.schema.ts'));
      expect(schema!.content).toContain('.min(1, { message: "Required" })');
    });

    it('handles combined min + max validation', () => {
      const fields = [{ name: 'bio', type: 'text', label: 'Bio', required: true, validation: 'min:10,max:500' }];
      const files = generateFormFiles('custom', 'mm-form', 'react', fields, 'zod', 'none', false, false, ctx());
      const schema = files.find((f) => f.path.endsWith('.schema.ts'));
      expect(schema!.content).toContain('.min(10)');
      expect(schema!.content).toContain('.max(500)');
    });

    it('exports schema name and inferred type', () => {
      const fields = [{ name: 'email', type: 'email', label: 'Email', required: true }];
      const files = generateFormFiles('custom', 'my-form', 'react', fields, 'zod', 'none', false, false, ctx());
      const schema = files.find((f) => f.path.endsWith('.schema.ts'));
      expect(schema!.content).toContain('export const MyFormSchema');
      expect(schema!.content).toContain('export type MyFormData');
      expect(schema!.content).toContain('z.infer<typeof MyFormSchema>');
    });
  });

  describe('Yup schema details', () => {
    it('generates yup.number() for number fields', () => {
      const fields = [{ name: 'count', type: 'number', label: 'Count', required: true }];
      const files = generateFormFiles('custom', 'ynum-form', 'react', fields, 'yup', 'none', false, false, ctx());
      const schema = files.find((f) => f.path.endsWith('.schema.ts'));
      expect(schema!.content).toContain('yup.number()');
      expect(schema!.content).toContain('.required()');
    });

    it('generates yup.boolean() for checkbox', () => {
      const fields = [{ name: 'ok', type: 'checkbox', label: 'OK' }];
      const files = generateFormFiles('custom', 'ycb-form', 'react', fields, 'yup', 'none', false, false, ctx());
      const schema = files.find((f) => f.path.endsWith('.schema.ts'));
      expect(schema!.content).toContain('yup.boolean()');
    });

    it('exports InferType for Yup', () => {
      const fields = [{ name: 'email', type: 'email', label: 'Email', required: true }];
      const files = generateFormFiles('custom', 'yup-form', 'react', fields, 'yup', 'none', false, false, ctx());
      const schema = files.find((f) => f.path.endsWith('.schema.ts'));
      expect(schema!.content).toContain('yup.InferType<typeof YupFormSchema>');
    });
  });

  // ── File path and naming ────────────────────────────────────────────

  describe('naming conventions', () => {
    it('converts camelCase name to kebab-case file path', () => {
      const files = generateFormFiles('login', 'userLogin', 'react', [], 'none', 'none', false, false, ctx());
      expect(files[0].path).toBe('forms/user-login.tsx');
    });

    it('converts name to PascalCase for component export', () => {
      const files = generateFormFiles('login', 'user-login', 'react', [], 'none', 'none', false, false, ctx());
      expect(files[0].content).toContain('export default function UserLoginForm');
    });

    it('uses kebab-case for types file path', () => {
      const files = generateFormFiles('login', 'my-login', 'react', [], 'none', 'none', false, false, ctx());
      const types = files.find((f) => f.path.endsWith('.types.ts'));
      expect(types!.path).toBe('forms/my-login.types.ts');
    });
  });

  // ── Preset-specific content ─────────────────────────────────────────

  describe('preset content details', () => {
    it('checkout preset includes all 9 fields', () => {
      const files = generateFormFiles('checkout', 'checkout', 'react', [], 'none', 'none', false, false, ctx());
      const form = files[0].content;
      expect(form).toContain('field-email');
      expect(form).toContain('field-card_name');
      expect(form).toContain('field-card_number');
      expect(form).toContain('field-expiry');
      expect(form).toContain('field-cvv');
      expect(form).toContain('field-address');
      expect(form).toContain('field-city');
      expect(form).toContain('field-zip');
      expect(form).toContain('field-country');
    });

    it('checkout preset includes country options', () => {
      const files = generateFormFiles('checkout', 'checkout', 'react', [], 'none', 'none', false, false, ctx());
      const form = files[0].content;
      expect(form).toContain('United States');
      expect(form).toContain('Japan');
    });

    it('settings preset has textarea for bio', () => {
      const files = generateFormFiles('settings', 'settings', 'react', [], 'none', 'none', false, false, ctx());
      const form = files[0].content;
      expect(form).toContain('<textarea');
      expect(form).toContain('field-bio');
    });

    it('search preset has radio buttons for sort', () => {
      const files = generateFormFiles('search', 'search', 'react', [], 'none', 'none', false, false, ctx());
      const form = files[0].content;
      expect(form).toContain('type="radio"');
      expect(form).toContain('Relevance');
      expect(form).toContain('Newest');
      expect(form).toContain('Popular');
    });

    it('contact preset has message textarea with placeholder', () => {
      const files = generateFormFiles('contact', 'contact', 'react', [], 'none', 'none', false, false, ctx());
      const form = files[0].content;
      expect(form).toContain('<textarea');
      expect(form).toContain('placeholder="Your message..."');
    });
  });

  // ── Multi-step edge cases ───────────────────────────────────────────

  describe('multi-step edge cases', () => {
    it('generates multi-step for custom form with 4+ fields', () => {
      const fields = [
        { name: 'a', type: 'text', label: 'A' },
        { name: 'b', type: 'text', label: 'B' },
        { name: 'c', type: 'text', label: 'C' },
        { name: 'd', type: 'text', label: 'D' },
      ];
      const files = generateFormFiles('custom', 'multi', 'react', fields, 'none', 'none', false, true, ctx());
      const form = files[0].content;
      expect(form).toContain('useState');
      expect(form).toContain('Step');
    });

    it('does not generate multi-step for exactly 3 fields', () => {
      const fields = [
        { name: 'a', type: 'text', label: 'A' },
        { name: 'b', type: 'text', label: 'B' },
        { name: 'c', type: 'text', label: 'C' },
      ];
      const files = generateFormFiles('custom', 'three', 'react', fields, 'none', 'none', false, true, ctx());
      const form = files[0].content;
      expect(form).not.toContain('useState');
    });

    it('generates step counter text', () => {
      const files = generateFormFiles('checkout', 'checkout', 'react', [], 'zod', 'none', false, true, ctx());
      const form = files[0].content;
      // Checkout has 9 fields → 3 steps
      expect(form).toContain('Step');
      expect(form).toContain('of');
    });

    it('multi-step uses Submit on last step', () => {
      const files = generateFormFiles('checkout', 'checkout', 'react', [], 'none', 'none', false, true, ctx());
      const form = files[0].content;
      expect(form).toContain('Submit');
      expect(form).toContain('Next');
    });
  });

  // ── Types file details ──────────────────────────────────────────────

  describe('types file details', () => {
    it('maps number field to number type', () => {
      const fields = [{ name: 'count', type: 'number', label: 'Count', required: true }];
      const files = generateFormFiles('custom', 'typed', 'react', fields, 'none', 'none', false, false, ctx());
      const types = files.find((f) => f.path.endsWith('.types.ts'));
      expect(types!.content).toContain('count: number');
    });

    it('maps checkbox field to boolean type', () => {
      const fields = [{ name: 'agree', type: 'checkbox', label: 'Agree', required: true }];
      const files = generateFormFiles('custom', 'typed', 'react', fields, 'none', 'none', false, false, ctx());
      const types = files.find((f) => f.path.endsWith('.types.ts'));
      expect(types!.content).toContain('agree: boolean');
    });

    it('makes optional fields optional in interface', () => {
      const fields = [{ name: 'notes', type: 'text', label: 'Notes', required: false }];
      const files = generateFormFiles('custom', 'typed', 'react', fields, 'none', 'none', false, false, ctx());
      const types = files.find((f) => f.path.endsWith('.types.ts'));
      expect(types!.content).toContain('notes?: string');
    });

    it('uses PascalCase for interface name', () => {
      const files = generateFormFiles(
        'custom',
        'user-profile',
        'react',
        [{ name: 'name', type: 'text', label: 'Name' }],
        'none',
        'none',
        false,
        false,
        ctx()
      );
      const types = files.find((f) => f.path.endsWith('.types.ts'));
      expect(types!.content).toContain('export interface UserProfileData');
    });
  });

  // ── Framework-specific details ──────────────────────────────────────

  describe('framework-specific details', () => {
    it('Vue replaces className with class and htmlFor with for', () => {
      const files = generateFormFiles('login', 'login', 'vue', [], 'none', 'none', false, false, ctx());
      const form = files[0].content;
      expect(form).not.toContain('className=');
      expect(form).not.toContain('htmlFor=');
      expect(form).toContain('class=');
      expect(form).toContain('for=');
    });

    it('Vue uses @submit.prevent', () => {
      const files = generateFormFiles('login', 'login', 'vue', [], 'none', 'none', false, false, ctx());
      expect(files[0].content).toContain('@submit.prevent="handleSubmit"');
    });

    it('Angular uses (ngSubmit)', () => {
      const files = generateFormFiles('login', 'login', 'angular', [], 'none', 'none', false, false, ctx());
      expect(files[0].content).toContain('(ngSubmit)="handleSubmit()"');
    });

    it('Angular uses standalone component', () => {
      const files = generateFormFiles('login', 'login', 'angular', [], 'none', 'none', false, false, ctx());
      expect(files[0].content).toContain('standalone: true');
    });

    it('Svelte uses on:submit|preventDefault', () => {
      const files = generateFormFiles('login', 'login', 'svelte', [], 'none', 'none', false, false, ctx());
      expect(files[0].content).toContain('on:submit|preventDefault={handleSubmit}');
    });

    it('HTML includes meta viewport', () => {
      const files = generateFormFiles('login', 'login', 'html', [], 'none', 'none', false, false, ctx());
      expect(files[0].content).toContain('width=device-width, initial-scale=1.0');
    });

    it('HTML includes lang attribute', () => {
      const files = generateFormFiles('login', 'login', 'html', [], 'none', 'none', false, false, ctx());
      expect(files[0].content).toContain('<html lang="en">');
    });
  });

  // ── Dark mode with shadcn ───────────────────────────────────────────

  describe('dark mode + shadcn interaction', () => {
    it('shadcn with dark mode includes dark: classes', () => {
      const files = generateFormFiles('login', 'login', 'react', [], 'zod', 'shadcn', true, false, ctx());
      const form = files[0].content;
      expect(form).toContain('dark:');
      expect(form).toContain('border-input');
    });

    it('uses dark mode classes on outer container', () => {
      const files = generateFormFiles('login', 'login', 'react', [], 'none', 'none', true, false, ctx());
      const form = files[0].content;
      expect(form).toContain('dark:bg-gray-950');
      expect(form).toContain('dark:text-gray-100');
    });
  });

  // ── Output file count ───────────────────────────────────────────────

  describe('output file count', () => {
    it('generates 3 files with validation (component + schema + types)', () => {
      const files = generateFormFiles('login', 'login', 'react', [], 'zod', 'none', false, false, ctx());
      expect(files).toHaveLength(3);
      expect(files[0].path).toMatch(/\.tsx$/);
      expect(files[1].path).toMatch(/\.schema\.ts$/);
      expect(files[2].path).toMatch(/\.types\.ts$/);
    });

    it('generates 2 files without validation (component + types)', () => {
      const files = generateFormFiles('login', 'login', 'react', [], 'none', 'none', false, false, ctx());
      expect(files).toHaveLength(2);
      expect(files[0].path).toMatch(/\.tsx$/);
      expect(files[1].path).toMatch(/\.types\.ts$/);
    });
  });

  // ── Accessibility extended ──────────────────────────────────────────

  describe('accessibility extended', () => {
    it('checkbox fields have associated label', () => {
      const files = generateFormFiles('login', 'login', 'react', [], 'none', 'none', false, false, ctx());
      const form = files[0].content;
      expect(form).toContain('htmlFor="field-remember_me"');
    });

    it('textarea has aria-describedby for error', () => {
      const files = generateFormFiles('contact', 'contact', 'react', [], 'none', 'none', false, false, ctx());
      const form = files[0].content;
      expect(form).toContain('aria-describedby="field-message-error"');
    });

    it('select has aria-describedby for error', () => {
      const files = generateFormFiles('checkout', 'checkout', 'react', [], 'none', 'none', false, false, ctx());
      const form = files[0].content;
      expect(form).toContain('aria-describedby="field-country-error"');
    });
  });
});
