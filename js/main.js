import { cacheLoadedPhotos } from './persistence/cachePhotos.js';
import renderThumbnails from './thumbnails/renderThumbnails.js';
import setupBigPicturePopup from './bigPicturePopup.js';
import setupPictureUploadForm from './pictureUpload/setupUploadForm.js';
import { getData } from './persistence/fetchApi.js';
import notifyAboutLoadingDataError from './persistence/notifications/notifyAboutLoadingResults.js';
import { setupThumbnailsFilters } from './thumbnails/filterThumbnails.js';

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
