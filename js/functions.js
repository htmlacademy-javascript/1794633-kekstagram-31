const isStringShorterThanLimit = (checkingString, limit) => checkingString.length <= limit;
let test = isStringShorterThanLimit('тестовая строка', 50);
// console.log(test);

function isThatPalindrome(checkingString) {
  const normalizedString = checkingString.replaceAll(' ', '').toUpperCase();
  let result = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    result += normalizedString.at(i);
  }
  return result === normalizedString;
}

test = isThatPalindrome('тестовая строка');

function extractNumbers(checkingValue) {

  const checkingString = String(checkingValue);

  let result = '';
  let convertedSymbol = 0;

  for (let i = 0; i < checkingString.length; i++) {
    convertedSymbol = parseInt(checkingString.at(i), 10);
    result += isNaN(convertedSymbol) ? '' : convertedSymbol;
  }

  return parseInt(result, 10);
}

test = extractNumbers('t1d3');

// module 5 task 2
function convertTimeToNumber (timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

function isMeetingInWorkTime (workStart, workEnd, meetingStart, meetingMinutes) {

  workStart = convertTimeToNumber(workStart);
  workEnd = convertTimeToNumber(workEnd);
  meetingStart = convertTimeToNumber(meetingStart);

  return meetingStart + meetingMinutes <= workEnd && meetingStart >= workStart;
}

test = isMeetingInWorkTime('08:00', '17:30', '14:00', 90);

window.console.log(test);
