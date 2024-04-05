import photoDataset from './createMockedPhotos.js';
import renderThumbnails from './renderThumbnails.js';
import setupBigPicturePopup from './bigPicturePopup.js';
import setupPictureUploadForm from './pictureUpload/setupUploadForm.js';

renderThumbnails(photoDataset);
setupBigPicturePopup(photoDataset);
setupPictureUploadForm();
