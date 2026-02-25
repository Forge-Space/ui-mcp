import { getAllSnippets } from '../lib/design-references/component-registry/index.js';
import { registerAtoms } from '../lib/design-references/component-registry/atoms/index.js';
import { registerMolecules } from '../lib/design-references/component-registry/molecules/index.js';
import { registerOrganisms } from '../lib/design-references/component-registry/organisms/index.js';

const RAW_COLOR_PATTERN =
  /(bg|text|border|ring|shadow)-(red|blue|green|yellow|purple|pink|indigo|violet|cyan|teal|orange|amber|lime|emerald|fuchsia|rose|sky)-\d{2,3}/g;

const ALLOWED_GRADIENT_PATTERNS = [
  /from-(red|blue|green|yellow|purple|pink|indigo|violet|cyan|teal|orange|amber|lime|emerald|fuchsia|rose|sky)-\d{2,3}/,
  /via-(red|blue|green|yellow|purple|pink|indigo|violet|cyan|teal|orange|amber|lime|emerald|fuchsia|rose|sky)-\d{2,3}/,
  /to-(red|blue|green|yellow|purple|pink|indigo|violet|cyan|teal|orange|amber|lime|emerald|fuchsia|rose|sky)-\d{2,3}/,
];

function isAllowedGradient(match: string): boolean {
  return ALLOWED_GRADIENT_PATTERNS.some((pattern) => pattern.test(match));
}

async function main() {
  console.log('Initializing registries...\n');
  registerAtoms();
  registerMolecules();
  registerOrganisms();

  const snippets = getAllSnippets();
  const violations: Array<{ id: string; classes: string[] }> = [];

  for (const snippet of snippets) {
    const foundClasses = new Set<string>();

    const checkContent = (content: string | Record<string, string> | undefined) => {
      if (!content) return;

      const textContent = typeof content === 'string' ? content : Object.values(content).join(' ');

      const matches = textContent.match(RAW_COLOR_PATTERN);
      if (matches) {
        matches.forEach((match) => {
          if (!isAllowedGradient(match)) {
            foundClasses.add(match);
          }
        });
      }
    };

    checkContent(snippet.tailwindClasses);
    checkContent(snippet.jsx);

    if (foundClasses.size > 0) {
      violations.push({
        id: snippet.id,
        classes: Array.from(foundClasses),
      });
    }
  }

  if (violations.length > 0) {
    console.log('❌ Raw Tailwind color violations found:\n');
    violations.forEach(({ id, classes }) => {
      console.log(`  ${id}`);
      classes.forEach((cls) => console.log(`    - ${cls}`));
      console.log('');
    });
    console.log('─'.repeat(60));
    console.log(`Total violations: ${violations.length} snippets`);
    console.log('─'.repeat(60));
    process.exit(1);
  } else {
    console.log('✅ All snippets use semantic tokens');
    console.log(`Checked ${snippets.length} snippets`);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
