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
const socialCommentsLoadButtonNode = bigPictureSocialNode.querySelector(
  '.social__comments-loader',
);
const bigPictureCloseNode = bigPictureNode.querySelector(
  '.big-picture__cancel',
);
const COMMENTS_PORTION_SIZE = 5;
let nextCommentsPortionGetter;

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
  socialCommentTotalCountNode.textContent = comments.length;

  beginRenderCommments(comments);

  bigPictureCloseNode.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture() {
  bodyNode.classList.remove('.modal-open');
  bigPictureNode.classList.add('hidden');

  bigPictureCloseNode.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onLoadCommentsButtonClick = (evt) => {
  evt.preventDefault();
  renderNextCommentsPortion();
};

function beginRenderCommments(comments) {
  socialCommentsNode.innerHTML = '';
  nextCommentsPortionGetter = initNextCommentsPortionGetter(comments);
  renderNextCommentsPortion();
  socialCommentsLoadButtonNode.addEventListener(
    'click',
    onLoadCommentsButtonClick,
  );
}

function initNextCommentsPortionGetter(comments) {
  const maxPosition = comments.length;
  let startPosition = 0;
  let endPosition = COMMENTS_PORTION_SIZE;

  return function () {
    endPosition = Math.min(endPosition, maxPosition);
    const result = {
      commentsPortion: comments.slice(startPosition, endPosition),
      finalPortion: endPosition === maxPosition,
      shownCount: endPosition,
    };
    startPosition = endPosition;
    endPosition += COMMENTS_PORTION_SIZE;
    return result;
  };
}

function renderNextCommentsPortion() {
  const { commentsPortion, finalPortion, shownCount } =
    nextCommentsPortionGetter();

  const fragment = new DocumentFragment();
  commentsPortion.map((comment) => {
    const renderedCommentNode = renderComment(comment);
    fragment.appendChild(renderedCommentNode);
  });
  socialCommentsNode.appendChild(fragment);

  socialCommentShownCountNode.textContent = shownCount;

  if (finalPortion) {
    socialCommentsLoadButtonNode.removeEventListener(
      'click',
      onLoadCommentsButtonClick,
    );
  }
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
