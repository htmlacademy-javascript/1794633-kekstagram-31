import {getTemplate} from './utils/dom.js';

const pictureTemplate = getTemplate('#picture');

function renderSinglePicture({id, url, description, comments, likes}) {
  const picture = pictureTemplate.cloneNode(true);
  const image = picture.querySelector('.picture__img');

  picture.dataset.id = id;
  picture.href = url;
  image.src = url;
  image.alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes.length;

  return picture;
}

export default function renderPictures(photosData) {
  document.querySelector('.pictures').append(...photosData.map(renderSinglePicture));
}
