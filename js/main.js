import { cacheLoadedPhotos } from './persistence/cachePhotos.js';
import renderThumbnails from './renderThumbnails.js';
import setupBigPicturePopup from './bigPicturePopup.js';
import setupPictureUploadForm from './pictureUpload/setupUploadForm.js';
import { getData } from './persistence/fetchApi.js';
import notifyAboutGettingDataError from './persistence/notifications/processGetError.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
    cacheLoadedPhotos(photos);
  })
  .catch(() => {
    notifyAboutGettingDataError();
  });

setupBigPicturePopup();
setupPictureUploadForm();
