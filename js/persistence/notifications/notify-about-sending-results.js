import { isEscapeKey } from '../../utils/common-utils.js';

const successTemplateContent = document.querySelector('#success').content;
const successTemplateNode = successTemplateContent.querySelector('.success');

const errorTemplateContent = document.querySelector('#error').content;
const errorTemplateNode = errorTemplateContent.querySelector('.error');

let messageNode;

function onBodyEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    removeMessageNode();
  }
}

function onBodyClick({ target }) {
  console.log('onBodyClick', target);

  const result = target.closest('.success__inner') || target.closest('.error__inner');
  if (result) {
    return;
  }

  removeMessageNode();
}

function notifyAboutSending(isSuccess) {
  const templateNode = isSuccess ? successTemplateNode : errorTemplateNode;
  messageNode = templateNode.cloneNode(true);

  const closeButtonClassName = isSuccess
    ? '.success__button'
    : '.error__button';
  const closeButtonNode = messageNode.querySelector(closeButtonClassName);

  closeButtonNode.addEventListener('click', () => {
    removeMessageNode();
  });

  document.body.addEventListener('keydown', onBodyEscKeydown);
  document.body.addEventListener('click', onBodyClick);

  document.body.append(messageNode);
}

function removeMessageNode() {
  document.body.removeEventListener('keydown', onBodyEscKeydown);
  document.body.removeEventListener('click', onBodyClick);
  messageNode.remove();
}

const notifyAboutSendingDataSuccess = () => notifyAboutSending(true);
const notifyAboutSendingDataError = () => notifyAboutSending(false);

export { notifyAboutSendingDataSuccess, notifyAboutSendingDataError };
