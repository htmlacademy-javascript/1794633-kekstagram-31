import photoDataset from './createMockedPhotos.js';
import renderThumbnails from './renderThumbnails.js';
import setupBigPicturePopup from './bigPicturePopup.js';
import setupPictureUploadForm from './pictureUploadForm.js';

renderThumbnails(photoDataset);
setupBigPicturePopup(photoDataset);
setupPictureUploadForm();
