function getTemplate(id) {
  const template = document.querySelector(id);

  if (!template) {
    throw new Error(`Template ${id} not found`);
  }

  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Found element is not ${id} template`);
  }

  return template.content.firstElementChild;
}

export {getTemplate};
