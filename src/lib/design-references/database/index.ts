/**
 * Database module for the RAG component graph store.
 * Re-exports the public API from store and schema.
 */

export { SCHEMA_VERSION } from './schema.js';
export {
  getDatabase,
  getMemoryDatabase,
  closeDatabase,
  isSeeded,
  seedComponents,
  queryComponents,
  getComponentById,
  getComponentsByCategory,
  getRelatedComponents,
  getComponentCount,
  getAllComponents,
  upsertComponent,
  deleteComponent,
} from './store.js';
