import { effectsSettings, applyEffectOnPreviewNode } from './applySettings.js';

const sliderContainerNode = document.querySelector('.img-upload__effect-level');
const sliderNode = sliderContainerNode.querySelector('.effect-level__slider');
const effectLevelNode = sliderContainerNode.querySelector('.effect-level__value');
const effectsNode = document.querySelector('.img-upload__effects');

function getCurrentEffect() {
  return effectsNode.querySelector('.effects__radio:checked').value;
}

noUiSlider.create(sliderNode, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

function updateSliderVisibility() {
  const effect = getCurrentEffect();

  if (effectsSettings[effect].hidden) {
    sliderContainerNode.classList.add('hidden');
  } else {
    sliderContainerNode.classList.remove('hidden');
  }
}

sliderNode.noUiSlider.on('update', () => {
  effectLevelNode.value = sliderNode.noUiSlider.get();
  applyEffectOnPreviewNode(getCurrentEffect(), effectLevelNode.value);
});

function updateSliderOptions (evt) {
  const effect = effectsSettings[evt.target.value];

  sliderNode.noUiSlider.updateOptions({
    range: {
      min: effect.range.min,
      max: effect.range.max,
    },
    start: effect.start,
    step: effect.step,
  });
}

function setupEffectsForUploadedPicture() {
  effectsNode.addEventListener('change', (evt) => {
    updateSliderVisibility();
    updateSliderOptions(evt);
  });
}

export {setupEffectsForUploadedPicture};
