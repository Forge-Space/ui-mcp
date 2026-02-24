/**
 * Initialize the full component registry with all atoms, molecules, organisms,
 * visual styles, and micro-interactions.
 *
 * Call this once at startup before using any registry search/retrieval functions.
 */

import { clearRegistry, registerSnippets, getAllSnippets } from './index.js';
import { registerAtoms } from './atoms/index.js';
import { registerMolecules } from './molecules/index.js';
import { registerOrganisms } from './organisms/index.js';
import { initializeInteractions } from '../micro-interactions/index.js';
import { initializeStyles } from '../visual-styles/index.js';
import { getDatabase, isSeeded, seedComponents, getAllComponents } from '../database/store.js';
import { initializeCompositions } from '../template-compositions/init.js';
import { initializePacks } from '../template-packs/init.js';
import pino from 'pino';

const logger = pino({ name: 'registry-init' });

let initialized = false;

export function initializeRegistry(): void {
  if (initialized) return;

  clearRegistry();
  initializeInteractions();
  initializeStyles();

  try {
    const db = getDatabase();

    if (!isSeeded(db)) {
      registerAtoms();
      registerMolecules();
      registerOrganisms();
      const staticSnippets = getAllSnippets();
      seedComponents(staticSnippets, db);
      logger.info({ count: staticSnippets.length }, 'Seeded DB from static files');
    }

    clearRegistry();
    const dbSnippets = getAllComponents(db);
    registerSnippets(dbSnippets);
    logger.info({ count: dbSnippets.length }, 'Loaded in-memory registry from DB');
  } catch (err) {
    logger.warn({ err }, 'DB unavailable, falling back to static files');
    clearRegistry();
    registerAtoms();
    registerMolecules();
    registerOrganisms();
  }

  try {
    initializeCompositions();
  } catch (err) {
    logger.warn({ err }, 'Compositions init failed; page templates still work');
  }

  try {
    initializePacks();
  } catch (err) {
    logger.warn({ err }, 'Packs init failed; template packs still available');
  }

  initialized = true;
}

export function refreshRegistryFromDb(): void {
  try {
    const db = getDatabase();
    clearRegistry();
    const dbSnippets = getAllComponents(db);
    registerSnippets(dbSnippets);
    logger.info({ count: dbSnippets.length }, 'Refreshed in-memory registry from DB');
  } catch (err) {
    logger.warn({ err }, 'Failed to refresh from DB');
  }
}

export function isRegistryInitialized(): boolean {
  return initialized;
}

/**
 * Reset the initialization flag and clear the registry (useful for testing).
 */
export function resetInitialization(): void {
  initialized = false;
  clearRegistry();
}
