import {getTemplate} from './utils/dom.js';

const pictureTemplate = getTemplate('#picture');

function renderSinglePicture(photoData) {
  const picture = pictureTemplate.cloneNode(true);
  const image = picture.querySelector('.picture__img');

  picture.dataset.id = photoData.id;
  picture.href = photoData.url;
  image.src = photoData.url;
  image.alt = photoData.description;
  picture.querySelector('.picture__comments').textContent = photoData.comments.length;
  picture.querySelector('.picture__likes').textContent = photoData.likes.length;

  return picture;
}

export default function renderPictures(photosData) {
  const thumbnailsContainer = document.querySelector('.pictures');
  thumbnailsContainer.append(...photosData.map(renderSinglePicture));
}
