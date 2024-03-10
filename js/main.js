import generatePhotos from './createPhotos.js';
import renderPictures from './renderPictures.js';

const generatedPhotos = generatePhotos();
renderPictures(generatedPhotos);
