import { registerSnippets } from '../index.js';
import { cardSnippets } from './cards.js';
import { navigationSnippets } from './navigation.js';
import { formSnippets } from './forms.js';
import { feedbackSnippets } from './feedback.js';
import { ecommerceMoleculeSnippets } from './ecommerce.js';

export function registerMolecules(): void {
  registerSnippets(cardSnippets);
  registerSnippets(navigationSnippets);
  registerSnippets(formSnippets);
  registerSnippets(feedbackSnippets);
  registerSnippets(ecommerceMoleculeSnippets);
}

export { cardSnippets, navigationSnippets, formSnippets, feedbackSnippets, ecommerceMoleculeSnippets };
