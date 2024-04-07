import { getTemplate } from '../utils/dom.js';

const picturesContainerNode = document.querySelector('.pictures');
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

const removeThumbnails = () => {
  const thumbnails = picturesContainerNode.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail) => thumbnail.remove());
};

export default function renderThumbnails(photosData) {
  removeThumbnails();
  picturesContainerNode.append(...photosData.map(renderSingleThumbnail));
}
