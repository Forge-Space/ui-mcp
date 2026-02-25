import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { getAllSnippets } from '../lib/design-references/component-registry/index.js';
import { registerAtoms } from '../lib/design-references/component-registry/atoms/index.js';
import { registerMolecules } from '../lib/design-references/component-registry/molecules/index.js';
import { registerOrganisms } from '../lib/design-references/component-registry/organisms/index.js';

const OUTPUT_PATH = 'dist/training-data.json';

async function main() {
  console.log('Initializing registries...');
  registerAtoms();
  registerMolecules();
  registerOrganisms();

  const snippets = getAllSnippets();

  const trainingData = snippets.map((snippet) => ({
    id: snippet.id,
    name: snippet.name,
    category: snippet.category,
    type: snippet.type,
    variant: snippet.variant,
    tags: snippet.tags,
    mood: snippet.mood,
    industry: snippet.industry,
    quality: snippet.quality,
    jsx: snippet.jsx,
    tailwindClasses: snippet.tailwindClasses,
    visualStyles: snippet.visualStyles,
    animations: snippet.animations,
    dependencies: snippet.dependencies,
  }));

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(trainingData, null, 2), 'utf-8');

  console.log(`✅ Exported ${trainingData.length} snippets to ${OUTPUT_PATH}`);
  console.log(`   File size: ${(JSON.stringify(trainingData).length / 1024).toFixed(2)} KB`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
