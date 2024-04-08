import { isEscapeKey } from '../utils/commonUtils.js';
import {
  isValidByPristine,
  resetPristineValidation,
} from './validateUploadForm.js';
import {
  setupScalingForUploadedPicture,
  resetScalingForUploadedPicture,
} from './previewScaling.js';
import { setupEffectsForUploadedPicture, resetEffects } from './effects/setupSlider.js';
import { sendData } from '../persistence/fetchApi.js';
import {
  notifyAboutSendingDataError,
  notifyAboutSendingDataSuccess,
} from '../persistence/notifications/notifyAboutSendingResults.js';

const pictureUploadFormNode = document.querySelector('#upload-select-image');
const fileUploadInputNode = pictureUploadFormNode.querySelector('#upload-file');
const pictureEditContainerNode = pictureUploadFormNode.querySelector(
  '.img-upload__overlay',
);
const pictureEditCancelButtonNode = pictureEditContainerNode.querySelector(
  '.img-upload__cancel',
);
const submitButtonNode =
  pictureEditContainerNode.querySelector('#upload-submit');

const imageUploadTextNode =
  pictureEditContainerNode.querySelector('.img-upload__text');
const hashtagInputNode = imageUploadTextNode.querySelector('.text__hashtags');
const descriptionInputNode =
  imageUploadTextNode.querySelector('.text__description');

const onDocumentEscKeydown = (evt) => {
  console.log('esc on setupPictureUploadForm', evt);
  if (isEscapeKey(evt)) {
    if (
      evt.target === hashtagInputNode ||
      evt.target === descriptionInputNode
    ) {
      return;
    }
    evt.preventDefault();
    closePictureEditForm();
  }
};

function onSubmitUploadForm(evt) {
  evt.preventDefault();

  if (isValidByPristine()) {
    submitButtonNode.disabled = true;
    sendData(new FormData(evt.target))
      .then(() => {
        closePictureEditForm();
        notifyAboutSendingDataSuccess();
      })
      .catch(() => notifyAboutSendingDataError())
      .finally(() => (submitButtonNode.disabled = false));
  }
}

function showPicturePreview() {
  const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];
  const picturePreview = document.querySelector('.img-upload__preview img');
  const effectsPreview = document.querySelectorAll('.effects__preview');

  const file = fileUploadInputNode.files[0];
  const fileName = file.name.toLowerCase();
  const isAllowedFileType = FILE_TYPES.some((elem) => fileName.endsWith(elem));

  if (isAllowedFileType) {
    picturePreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((elem) => {
      elem.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
    resetEffects();
  }
}

function closePictureEditForm() {
  pictureEditContainerNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);

  pictureUploadFormNode.reset();
  resetEffects();
  resetScalingForUploadedPicture();
  resetPristineValidation();
}

function openEditPictureForm() {
  pictureEditContainerNode.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);

  showPicturePreview();
}

export default function setupPictureUploadForm() {
  fileUploadInputNode.addEventListener('change', () => openEditPictureForm());

  pictureEditCancelButtonNode.addEventListener('click', (evt) => {
    evt.preventDefault();
    closePictureEditForm();
  });

  setupScalingForUploadedPicture();
  setupEffectsForUploadedPicture();

  pictureUploadFormNode.addEventListener('submit', onSubmitUploadForm);
}
