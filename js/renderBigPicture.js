import { isEscapeKey } from './utils/commonUtils.js';

const bodyNode = document.querySelector('body');
const bigPictureNode = bodyNode.querySelector('.big-picture');
const bigPictureImageNode = bigPictureNode.querySelector(
  '.big-picture__img img',
);
const bigPictureSocialNode = bigPictureNode.querySelector(
  '.big-picture__social',
);
const socialCaptionNode =
  bigPictureSocialNode.querySelector('.social__caption');
const likesCountNode = bigPictureNode.querySelector('.likes-count');
const socialCommentCountNode = bigPictureSocialNode.querySelector(
  '.social__comment-count',
);
const socialCommentShownCountNode = socialCommentCountNode.querySelector(
  '.social__comment-shown-count',
);
const socialCommentTotalCountNode = socialCommentCountNode.querySelector(
  '.social__comment-total-count',
);
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
const socialCommentNode = socialCommentsNode.querySelector('.social__comment');
const bigPictureCloseNode = bigPictureNode.querySelector(
  '.big-picture__cancel',
);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture({ url, description, likes, comments }) {
  bodyNode.classList.add('.modal-open');
  bigPictureNode.classList.remove('hidden');

  bigPictureImageNode.src = url;
  bigPictureImageNode.alt = description;
  socialCaptionNode.textContent = description;
  likesCountNode.textContent = likes;
  socialCommentShownCountNode.textContent = comments.length;
  socialCommentTotalCountNode.textContent = comments.length;

  renderCommments(comments);

  bigPictureCloseNode.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture() {
  bodyNode.classList.remove('.modal-open');
  bigPictureNode.classList.add('hidden');

  bigPictureCloseNode.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onDocumentKeydown);
}

function renderCommments(comments) {
  socialCommentsNode.innerHTML = '';
  const fragment = new DocumentFragment();
  comments.map((comment) => {
    const renderedCommentNode = renderComment(comment);
    fragment.appendChild(renderedCommentNode);
  });
  socialCommentsNode.appendChild(fragment);
}

function renderComment({ avatar, message, name }) {
  const renderedCommentNode = socialCommentNode.cloneNode(true);
  const imageNode = renderedCommentNode.querySelector('img');
  imageNode.src = avatar;
  imageNode.alt = name;
  renderedCommentNode.querySelector('p').textContent = message;
  return renderedCommentNode;
}

export default openBigPicture;
