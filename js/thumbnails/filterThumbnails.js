import renderThumbnails from './renderThumbnails.js';
import { debounce } from '../utils/commonUtils.js';

const filtersContainerNode = document.querySelector('.img-filters ');
const filtersFormNode = filtersContainerNode.querySelector('.img-filters__form');
const filtersButtons = filtersFormNode.querySelectorAll('.img-filters__button');

const FILTER_DEFAULT = 'filter-default';
const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';
const RANDOM_LIMIT = 10;
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const debounceRenderThumbnails = debounce(renderThumbnails);

function applyFilter(photos, target) {
  let filteredPhotos = [];

  switch (target.id) {
    case FILTER_DEFAULT:
      filteredPhotos = photos;
      break;
    case FILTER_RANDOM:
      filteredPhotos = photos.toSorted(() => 0.5 - Math.random()).slice(0, RANDOM_LIMIT);
      break;
    case FILTER_DISCUSSED:
      filteredPhotos = photos.toSorted((a, b) => b.comments.length - a.comments.length);
      break;
  }
  debounceRenderThumbnails(filteredPhotos);
}

function updateButtonsAppearance(buttonNode) {
  filtersButtons.forEach((button) => button.classList.remove(ACTIVE_BUTTON_CLASS));
  buttonNode.classList.add(ACTIVE_BUTTON_CLASS);
}

function setupThumbnailsFilters(photos) {
  filtersContainerNode.classList.remove('img-filters--inactive');

  filtersFormNode.addEventListener('click', (evt) => {
    const activeButtonNode = filtersFormNode.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
    const target = evt.target;

    if (!target.closest('.img-filters__button')) {
      return;
    }
    if (target === activeButtonNode && !target.closest(`#${FILTER_RANDOM}`)) {
      return;
    }

    updateButtonsAppearance(target);
    applyFilter(photos, target);
  });
}

export { setupThumbnailsFilters };

