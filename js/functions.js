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
// console.log(test);
test = isThatPalindrome('до вод ');
// console.log(test);

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
test = extractNumbers('ECMAScript 2022');
// console.log(test);
test = extractNumbers('1 кефир, 0.5 батона');
// console.log(test);
test = extractNumbers(-1);
// console.log(test);
test = extractNumbers(1.5);
// console.log(test);
