const dataErrorTemplateContent = document.querySelector('#data-error').content;
const dataErrorTemplateNode = dataErrorTemplateContent.querySelector('.data-error');
const MESSAGE_SHOW_TIME = 5000;

export default function notifyAboutGettingDataError() {
  const messageNode = dataErrorTemplateNode.cloneNode(true);
  document.body.append(messageNode);

  setTimeout(() => {
    messageNode.remove();
  }, MESSAGE_SHOW_TIME);
}
