import { getAllSnippets } from '../lib/design-references/component-registry/index.js';
import { registerAtoms } from '../lib/design-references/component-registry/atoms/index.js';
import { registerMolecules } from '../lib/design-references/component-registry/molecules/index.js';
import { registerOrganisms } from '../lib/design-references/component-registry/organisms/index.js';

async function main() {
  console.log('Initializing registries...\n');
  registerAtoms();
  registerMolecules();
  registerOrganisms();

  const snippets = getAllSnippets();

  const byCategory: Record<string, number> = {};
  const byType: Record<string, number> = {};

  for (const snippet of snippets) {
    byCategory[snippet.category] = (byCategory[snippet.category] || 0) + 1;
    byType[snippet.type] = (byType[snippet.type] || 0) + 1;
  }

  console.log('Registry Statistics');
  console.log('═'.repeat(60));
  console.log('');

  console.log('By Category:');
  console.log('─'.repeat(60));
  Object.entries(byCategory)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([category, count]) => {
      console.log(`  ${category.padEnd(20)} ${count.toString().padStart(5)}`);
    });
  console.log('');

  console.log('By Type:');
  console.log('─'.repeat(60));
  Object.entries(byType)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([type, count]) => {
      console.log(`  ${type.padEnd(20)} ${count.toString().padStart(5)}`);
    });
  console.log('');

  console.log('═'.repeat(60));
  console.log(`Total Snippets: ${snippets.length}`);
  console.log('═'.repeat(60));
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
