#!/usr/bin/env npx tsx
import { getDatabase, closeDatabase } from '../lib/design-references/database/store.js';
import { initVectorIndex, rebuildIndex, isVssAvailable } from '../lib/ml/vector-index.js';

const db = getDatabase();

if (!isVssAvailable()) {
  const loaded = initVectorIndex(db);
  if (!loaded) {
    console.error('sqlite-vss extension not available on this platform');
    process.exit(1);
  }
}

const start = performance.now();
const count = rebuildIndex(db);
const elapsed = (performance.now() - start).toFixed(1);

console.log(`Rebuilt vector index: ${count} embeddings indexed in ${elapsed}ms`);
closeDatabase();
