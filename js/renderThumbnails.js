import { getTemplate } from './utils/dom.js';

const thumbnailTemplate = getTemplate('#picture');

function renderSingleThumbnail({ id, url, description, comments, likes }) {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  thumbnail.dataset.id = id;
  thumbnail.href = url;
  image.src = url;
  image.alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes.length;

  return thumbnail;
}

export default function renderThumbnails(photosData) {
  document
    .querySelector('.pictures')
    .append(...photosData.map(renderSingleThumbnail));
}
