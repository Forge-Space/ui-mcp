import { registerSnippets } from '../index.js';
import { heroSnippets } from './heroes.js';
import { featureSnippets } from './features.js';
import { ctaFooterSnippets } from './cta-footer.js';
import { ecommerceOrganismSnippets } from './ecommerce.js';
import { navbarSnippets } from './navbars.js';
import { pricingSnippets } from './pricing.js';
import { testimonialSnippets } from './testimonials.js';
import { authSnippets } from './auth.js';
import { dashboardSnippets } from './dashboards.js';
import { footerSnippets } from './footers.js';
import { chatSnippets } from './chat.js';
import { contentSnippets } from './content.js';
import { kanbanSnippets } from './kanban.js';
import { commandPaletteSnippets } from './command-palettes.js';

export function registerOrganisms(): void {
  registerSnippets(heroSnippets);
  registerSnippets(featureSnippets);
  registerSnippets(ctaFooterSnippets);
  registerSnippets(ecommerceOrganismSnippets);
  registerSnippets(navbarSnippets);
  registerSnippets(pricingSnippets);
  registerSnippets(testimonialSnippets);
  registerSnippets(authSnippets);
  registerSnippets(dashboardSnippets);
  registerSnippets(footerSnippets);
  registerSnippets(chatSnippets);
  registerSnippets(contentSnippets);
  registerSnippets(kanbanSnippets);
  registerSnippets(commandPaletteSnippets);
}

export {
  heroSnippets,
  featureSnippets,
  ctaFooterSnippets,
  ecommerceOrganismSnippets,
  navbarSnippets,
  pricingSnippets,
  testimonialSnippets,
  authSnippets,
  dashboardSnippets,
  footerSnippets,
  chatSnippets,
  contentSnippets,
  kanbanSnippets,
  commandPaletteSnippets,
};
