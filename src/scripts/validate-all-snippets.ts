import { getAllSnippets } from '../lib/design-references/component-registry/index.js';
import { validateSnippet } from '../lib/quality/anti-generic-rules.js';
import { registerAtoms } from '../lib/design-references/component-registry/atoms/index.js';
import { registerMolecules } from '../lib/design-references/component-registry/molecules/index.js';
import { registerOrganisms } from '../lib/design-references/component-registry/organisms/index.js';

async function main() {
  console.log('Initializing registries...');
  registerAtoms();
  registerMolecules();
  registerOrganisms();

  console.log('Validating all snippets...\n');

  const snippets = getAllSnippets();
  let passed = 0;
  let failed = 0;
  let totalWarnings = 0;

  for (const snippet of snippets) {
    const result = validateSnippet(snippet);

    if (result.errors.length > 0) {
      failed++;
      console.log(`❌ ${snippet.id}`);
      result.errors.forEach((err) => console.log(`   ERROR: ${err}`));
    } else {
      passed++;
    }

    if (result.warnings.length > 0) {
      totalWarnings += result.warnings.length;
      if (result.errors.length === 0) {
        console.log(`⚠️  ${snippet.id}`);
      }
      result.warnings.forEach((warn) => console.log(`   WARN: ${warn}`));
    }

    if (result.errors.length > 0 || result.warnings.length > 0) {
      console.log('');
    }
  }

  console.log('─'.repeat(60));
  console.log(`Total snippets: ${snippets.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Warnings: ${totalWarnings}`);
  console.log('─'.repeat(60));

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
