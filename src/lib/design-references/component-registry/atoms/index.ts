import { registerSnippets } from '../index.js';
import { buttonSnippets } from './buttons.js';
import { inputSnippets } from './inputs.js';
import { badgeSnippets } from './badges.js';
import { typographySnippets } from './typography.js';
import { toggleSnippets } from './toggles.js';
import { progressSnippets } from './progress.js';
import { ecommerceAtomSnippets } from './ecommerce.js';

export function registerAtoms(): void {
  registerSnippets(buttonSnippets);
  registerSnippets(inputSnippets);
  registerSnippets(badgeSnippets);
  registerSnippets(typographySnippets);
  registerSnippets(toggleSnippets);
  registerSnippets(progressSnippets);
  registerSnippets(ecommerceAtomSnippets);
}

export {
  buttonSnippets,
  inputSnippets,
  badgeSnippets,
  typographySnippets,
  toggleSnippets,
  progressSnippets,
  ecommerceAtomSnippets,
};
