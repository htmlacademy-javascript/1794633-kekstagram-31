const SCALING_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scalingValueNode = document.querySelector('.scale__control--value');

let currentPictureScale = DEFAULT_SCALE;

function updatePreviewTransformStyle (value) {
  const picturePreviewNode = document.querySelector('.img-upload__preview img');
  picturePreviewNode.style.transform = `scale(${value / 100})`;
}

function decreaseScale () {
  if (currentPictureScale > MIN_SCALE) {
    currentPictureScale -= SCALING_STEP;
    scalingValueNode.value = `${currentPictureScale}%`;
    updatePreviewTransformStyle(currentPictureScale);
  }
}

function increaseScale () {
  if (currentPictureScale < MAX_SCALE) {
    currentPictureScale += SCALING_STEP;
    scalingValueNode.value = `${currentPictureScale}%`;
    updatePreviewTransformStyle(currentPictureScale);
  }
}

function resetScalingForUploadedPicture () {
  scalingValueNode.value = `${DEFAULT_SCALE}%`;
  updatePreviewTransformStyle(DEFAULT_SCALE);
}

function setupScalingForUploadedPicture (){
  const pictureUploadScalingNode = document.querySelector('.scale');
  pictureUploadScalingNode.addEventListener('click', (evt) => {
    if (evt.target.closest('.scale__control--smaller')) {
      decreaseScale();
    } else if (evt.target.closest('.scale__control--bigger')) {
      increaseScale();
    }
  });
}

export {setupScalingForUploadedPicture, resetScalingForUploadedPicture};
