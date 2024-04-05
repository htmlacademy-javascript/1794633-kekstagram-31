const picturePreviewNode = document.querySelector('.img-upload__preview img');

const effectsSettings = {
  none: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    style: 'none',
    hidden: true,
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    style: 'grayscale',
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    style: 'sepia',
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    style: 'invert',
    unit: '%',
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    style: 'blur',
    unit: 'px',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    style: 'brightness',
  },
};

function composeFilterStyle(effect, level) {
  const filter = effectsSettings[effect];
  if (effect === 'none') {
    return `${filter.style}`;
  }
  return `${filter.style}(${level}${filter.unit || ''})`;
}

function applyEffectOnPreviewNode(effect, effectLevelValue = 1) {
  picturePreviewNode.style.filter = composeFilterStyle(effect, effectLevelValue);
}

function resetEffectOnPrevewNode() {
  applyEffectOnPreviewNode('none');
}

export { effectsSettings, applyEffectOnPreviewNode, resetEffectOnPrevewNode };
