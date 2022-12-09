const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const names = [
  'Ada',
  'Hedy',
  'Jean',
  'Grace',
  'Evelyn',
  'Joan',
  'Elizabeth',
  'Janese',
  'Donna'
];

// Filter even numbers.
const evenNumbers = numbers => numbers.filter(number => number % 2 === 0);
console.log(evenNumbers(numbers));

//  Filter numbers greater than five.
const overFive = numbers => numbers.filter(number => number > 5);
console.log(overFive(numbers));

// Filter names that start with an 'E'.
const startWithE = names => names.filter(element => element[0] === 'E');
console.log(startWithE(names));

// Filter names that include a 'D' or a
const haveD = names => names.filter((element, i) => element.includes('D') || element.includes('d'));
console.log(haveD(names));
