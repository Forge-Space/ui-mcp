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
import { tooltipSnippets } from './tooltips.js';
import { dropdownSnippets } from './dropdowns.js';
import { tabSnippets } from './tabs.js';
import { accordionSnippets } from './accordions.js';
import { paginationSnippets } from './pagination.js';
import { popoverSnippets } from './popovers.js';
import { drawerSnippets } from './drawers.js';
import { stepperSnippets } from './steppers.js';
import { datePickerSnippets } from './date-pickers.js';
import { fileUploadSnippets } from './file-upload.js';
import { carouselSnippets } from './carousels.js';
import { timelineSnippets } from './timelines.js';

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
  registerSnippets(tooltipSnippets);
  registerSnippets(dropdownSnippets);
  registerSnippets(tabSnippets);
  registerSnippets(accordionSnippets);
  registerSnippets(paginationSnippets);
  registerSnippets(popoverSnippets);
  registerSnippets(drawerSnippets);
  registerSnippets(stepperSnippets);
  registerSnippets(datePickerSnippets);
  registerSnippets(fileUploadSnippets);
  registerSnippets(carouselSnippets);
  registerSnippets(timelineSnippets);
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
  tooltipSnippets,
  dropdownSnippets,
  tabSnippets,
  accordionSnippets,
  paginationSnippets,
  popoverSnippets,
  drawerSnippets,
  stepperSnippets,
  datePickerSnippets,
  fileUploadSnippets,
  carouselSnippets,
  timelineSnippets,
};
