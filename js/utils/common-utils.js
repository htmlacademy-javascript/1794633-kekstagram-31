const DEBOUNCE_DELAY = 500;
export function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

// Устранение дребезга
export function debounce (callback, timeoutDelay = DEBOUNCE_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
