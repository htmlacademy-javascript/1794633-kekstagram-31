import photoDataset from './createPhotos.js';
import renderPictures from './renderPictures.js';
import openBigPicture from './renderBigPicture.js';

const picturesContainerNode = document.querySelector('.pictures');

renderPictures(photoDataset);

picturesContainerNode.addEventListener('click', (evt) => {
  evt.preventDefault();
  const currentPictureNode = evt.target.closest('.picture');

  if (currentPictureNode) {
    const photoData = photoDataset.find(
      (photo) => Number(photo.id) === Number(currentPictureNode.dataset.id),
    );
    openBigPicture(photoData);
  }
});
