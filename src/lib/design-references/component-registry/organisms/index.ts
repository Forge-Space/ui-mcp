import { registerSnippets } from '../index.js';
import { heroSnippets } from './heroes.js';
import { featureSnippets } from './features.js';
import { ctaFooterSnippets } from './cta-footer.js';
import { ecommerceOrganismSnippets } from './ecommerce.js';

export function registerOrganisms(): void {
  registerSnippets(heroSnippets);
  registerSnippets(featureSnippets);
  registerSnippets(ctaFooterSnippets);
  registerSnippets(ecommerceOrganismSnippets);
}

export { heroSnippets, featureSnippets, ctaFooterSnippets, ecommerceOrganismSnippets };
