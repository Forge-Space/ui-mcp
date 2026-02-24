import { registerSnippets } from '../index.js';
import { cardSnippets } from './cards.js';
import { navigationSnippets } from './navigation.js';
import { formSnippets } from './forms.js';
import { feedbackSnippets } from './feedback.js';
import { ecommerceMoleculeSnippets } from './ecommerce.js';
import { dataTableSnippets } from './data-tables.js';
import { modalSnippets } from './modals.js';
import { listSnippets } from './lists.js';
import { searchSnippets } from './search.js';
import { statSnippets } from './stats.js';
import { emptyStateSnippets } from './empty-states.js';

export function registerMolecules(): void {
  registerSnippets(cardSnippets);
  registerSnippets(navigationSnippets);
  registerSnippets(formSnippets);
  registerSnippets(feedbackSnippets);
  registerSnippets(ecommerceMoleculeSnippets);
  registerSnippets(dataTableSnippets);
  registerSnippets(modalSnippets);
  registerSnippets(listSnippets);
  registerSnippets(searchSnippets);
  registerSnippets(statSnippets);
  registerSnippets(emptyStateSnippets);
}

export {
  cardSnippets,
  navigationSnippets,
  formSnippets,
  feedbackSnippets,
  ecommerceMoleculeSnippets,
  dataTableSnippets,
  modalSnippets,
  listSnippets,
  searchSnippets,
  statSnippets,
  emptyStateSnippets,
};
