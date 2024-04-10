const MESSAGE_SHOW_TIME = 5000;
const dataErrorTemplateContent = document.querySelector('#data-error').content;
const dataErrorTemplateNode =
  dataErrorTemplateContent.querySelector('.data-error');

export default function notifyAboutLoadingDataError() {
  const messageNode = dataErrorTemplateNode.cloneNode(true);
  document.body.append(messageNode);

  setTimeout(() => {
    messageNode.remove();
  }, MESSAGE_SHOW_TIME);
}
