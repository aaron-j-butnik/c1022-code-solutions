const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const languages = [
  'Hypertext Markup Language',
  'Cascading Style Sheets',
  'ECMAScript',
  'PHP Hypertext Preprocessor',
  'Structured Query Language'
];

// All numbers multiplied by 2.
const doubled = numbers => numbers.map(element => element * 2);
console.log(doubled(numbers));

// All numbers formatted into "$0.00" strings.
const prices = numbers => numbers.map(element => '$' + element.toFixed(2));
console.log(prices(numbers));

// All langueages converted to uppercase.
const upperCased = languages => languages.map(element => element.toUpperCase());
console.log(upperCased(languages));

// First letter of each language.
const firstLetters = languages => languages.map(element => element[0]);
console.log(firstLetters(languages));
