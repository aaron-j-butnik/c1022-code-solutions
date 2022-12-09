const takeAChance = require('./take-a-chance');

const promiseReturn = takeAChance('Aaron');

promiseReturn.then(message => {
  console.log(message);
});

promiseReturn.catch(error => {
  console.log(error.message);
});
