import { isEscapeKey } from '../../utils/commonUtils.js';

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

function onBodyClick(evt, isSuccess) {
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

  document.body.addEventListener('keydown', onBodyEscKeydown);
  document.body.addEventListener('click', (evt) => onBodyClick(evt, isSuccess));

  document.body.append(messageNode);
}

function removeMessageNode() {
  document.body.removeEventListener('keydown', onBodyEscKeydown);
  document.removeEventListener('click', onBodyClick);
  messageNode.remove();
}

const notifyAboutSendingDataSuccess = () => notifyAboutSending(true);
const notifyAboutSendingDataError = () => notifyAboutSending(false);

export { notifyAboutSendingDataSuccess, notifyAboutSendingDataError };
