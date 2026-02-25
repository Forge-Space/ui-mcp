import { registerSnippets } from '../index.js';
import { buttonSnippets } from './buttons.js';
import { inputSnippets } from './inputs.js';
import { badgeSnippets } from './badges.js';
import { typographySnippets } from './typography.js';
import { toggleSnippets } from './toggles.js';
import { progressSnippets } from './progress.js';
import { ecommerceAtomSnippets } from './ecommerce.js';
import { avatarSnippets } from './avatars.js';
import { statusSnippets } from './status.js';
import { dividerSnippets } from './dividers.js';
import { skeletonSnippets } from './skeletons.js';
import { alertSnippets } from './alerts.js';
import { breadcrumbSnippets } from './breadcrumbs.js';
import { sliderSnippets } from './sliders.js';
import { codeBlockSnippets } from './code-blocks.js';
import { spinnerSnippets } from './spinners.js';
import { separatorSnippets } from './separators.js';
import { kbdSnippets } from './kbd.js';
import { tagSnippets } from './tags.js';
import { switchSnippets } from './switches.js';

export function registerAtoms(): void {
  registerSnippets(buttonSnippets);
  registerSnippets(inputSnippets);
  registerSnippets(badgeSnippets);
  registerSnippets(typographySnippets);
  registerSnippets(toggleSnippets);
  registerSnippets(progressSnippets);
  registerSnippets(ecommerceAtomSnippets);
  registerSnippets(avatarSnippets);
  registerSnippets(statusSnippets);
  registerSnippets(dividerSnippets);
  registerSnippets(skeletonSnippets);
  registerSnippets(alertSnippets);
  registerSnippets(breadcrumbSnippets);
  registerSnippets(sliderSnippets);
  registerSnippets(codeBlockSnippets);
  registerSnippets(spinnerSnippets);
  registerSnippets(separatorSnippets);
  registerSnippets(kbdSnippets);
  registerSnippets(tagSnippets);
  registerSnippets(switchSnippets);
}

export {
  buttonSnippets,
  inputSnippets,
  badgeSnippets,
  typographySnippets,
  toggleSnippets,
  progressSnippets,
  ecommerceAtomSnippets,
  avatarSnippets,
  statusSnippets,
  dividerSnippets,
  skeletonSnippets,
  alertSnippets,
  breadcrumbSnippets,
  sliderSnippets,
  codeBlockSnippets,
  spinnerSnippets,
  separatorSnippets,
  kbdSnippets,
  tagSnippets,
  switchSnippets,
};
