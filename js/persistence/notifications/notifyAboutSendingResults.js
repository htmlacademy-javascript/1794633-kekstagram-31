import { isEscapeKey } from '../../utils/commonUtils.js';

const successTemplateContent = document.querySelector('#success').content;
const successTemplateNode = successTemplateContent.querySelector('.success');

const errorTemplateContent = document.querySelector('#error').content;
const errorTemplateNode = errorTemplateContent.querySelector('.error');

let messageNode;

function onDocumentEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    removeMessageNode();
  }
}

function onDocumentClick(evt, isSuccess) {
  const innerContainerClassName = isSuccess
    ? '.success__inner'
    : '.error__inner';

  if (!evt.target.closest(innerContainerClassName)) {
    removeMessageNode();
  }
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

  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', (evt) => onDocumentClick(evt, isSuccess));

  document.body.append(messageNode);
}

function removeMessageNode() {
  document.removeEventListener('keydown', onDocumentEscKeydown);
  document.removeEventListener('click', onDocumentClick);
  messageNode.remove();
}

const notifyAboutSendingDataSuccess = () => notifyAboutSending(true);
const notifyAboutSendingDataError = () => notifyAboutSending(false);

export { notifyAboutSendingDataSuccess, notifyAboutSendingDataError };
