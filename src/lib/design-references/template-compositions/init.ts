import { registerComposition } from './index.js';
import { saasCentered, productLaunch, waitlistMinimal, agencyPortfolio } from './landing/index.js';
import { analytics, crmPipeline, projectBoard } from './dashboard/index.js';
import { login, signup, onboarding } from './auth/index.js';
import { storefront, productDetail, cart, checkout } from './ecommerce/index.js';
import { blogListing, blogPost } from './content/index.js';

export function initializeCompositions(): void {
  registerComposition(saasCentered);
  registerComposition(productLaunch);
  registerComposition(waitlistMinimal);
  registerComposition(agencyPortfolio);

  registerComposition(analytics);
  registerComposition(crmPipeline);
  registerComposition(projectBoard);

  registerComposition(login);
  registerComposition(signup);
  registerComposition(onboarding);

  registerComposition(storefront);
  registerComposition(productDetail);
  registerComposition(cart);
  registerComposition(checkout);

  registerComposition(blogListing);
  registerComposition(blogPost);
}
