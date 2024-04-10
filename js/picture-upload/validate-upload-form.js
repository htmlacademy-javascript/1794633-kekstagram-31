const pictureUploadFormNode = document.querySelector('#upload-select-image');
const hashtagsFieldNode = pictureUploadFormNode.querySelector('.text__hashtags');
const descriptionFieldNode =
  pictureUploadFormNode.querySelector('.text__description');
const HASHTAGS_QUANTITY_LIMIT = 5;
const DESCRIPTION_LENGTH_LIMIT = 140;

const pristine = new Pristine(pictureUploadFormNode, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Допустимое кол-во #
function isHashtagsQuantityUnderLimit() {
  const hashtags = hashtagsFieldNode.value.trim().split(/[\s,\t,\n]+/);
  return hashtags.length <= HASHTAGS_QUANTITY_LIMIT;
}

pristine.addValidator(
  hashtagsFieldNode,
  isHashtagsQuantityUnderLimit,
  'Превышено допустимое количество хэштегов',
  1,
);

// Валидность #
let invalidHashtags = [];

function isHashtagsMatchedToMask() {
  const hashtagsFieldValue = hashtagsFieldNode.value.trim();
  if (!hashtagsFieldValue) {
    return true;
  }
  const validHashtagMask = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtags = hashtagsFieldValue.split(/[\s,\t,\n]+/);

  invalidHashtags = [];

  hashtags.forEach((hashtag) => {
    if (!validHashtagMask.test(hashtag)) {
      invalidHashtags.push(hashtag);
    }
  });

  return invalidHashtags.length === 0;
}

function hashtagsDoNotMatchedToMaskErrorMessage() {
  if (invalidHashtags.length === 1) {
    return `Введен невалидный хэштег: ${invalidHashtags[0]}`;
  }
  return `Введены невалидные хэштеги: ${invalidHashtags.join(', ')}`;
}

pristine.addValidator(
  hashtagsFieldNode,
  isHashtagsMatchedToMask,
  hashtagsDoNotMatchedToMaskErrorMessage,
  2,
);

// Повторение #
function isAbsentRepeatedHashtag() {
  const hashtags = hashtagsFieldNode.value.trim().toUpperCase().split(/[\s,\t,\n]+/);
  const alreadyMentionedHashtags = [];

  hashtags.forEach((hashtag) => {
    if (!alreadyMentionedHashtags.includes(hashtag)) {
      alreadyMentionedHashtags.push(hashtag);
    }
  });
  return hashtags.length === alreadyMentionedHashtags.length;
}

pristine.addValidator(
  hashtagsFieldNode,
  isAbsentRepeatedHashtag,
  'Xэштеги повторяются',
  3,
);

// Длина комментария
const isDescriptionLengthUnderLimit = () =>
  descriptionFieldNode.value.length <= DESCRIPTION_LENGTH_LIMIT;

pristine.addValidator(
  descriptionFieldNode,
  isDescriptionLengthUnderLimit,
  `Длина комментария не может быть больше ${DESCRIPTION_LENGTH_LIMIT} символов`,
);

const isValidByPristine = () => pristine.validate();
const resetPristineValidation = () => pristine.reset();

export { isValidByPristine, resetPristineValidation };
