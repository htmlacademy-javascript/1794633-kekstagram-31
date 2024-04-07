function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length >= max - min + 1) {
      //console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function getRandomTextRow(text) {
  const rows = text.split('\n');
  const randomIndex = Math.floor(Math.random() * rows.length);
  return rows[randomIndex];
}

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

// Устранение дребезга
function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  getRandomNumber,
  createRandomIdFromRangeGenerator,
  getRandomTextRow,
  isEscapeKey,
  debounce,
};
