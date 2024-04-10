import { cacheLoadedPhotos } from './persistence/cache-photos.js';
import renderThumbnails from './thumbnails/render-thumbnails.js';
import setupBigPicturePopup from './big-picture-popup.js';
import setupPictureUploadForm from './picture-upload/setup-upload-form.js';
import { getData } from './persistence/fetch-api.js';
import notifyAboutLoadingDataError from './persistence/notifications/notify-about-loading-results.js';
import { setupThumbnailsFilters } from './thumbnails/filter-thumbnails.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
    cacheLoadedPhotos(photos);
    setupThumbnailsFilters(photos);
  })
  .catch(() => {
    notifyAboutLoadingDataError();
  });

setupBigPicturePopup();
setupPictureUploadForm();
