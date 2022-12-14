/* exported getKeys */

/* Pseudo Code

1. Define function named getKeys with one parameter (object);
2. Assign an empty array literal to a variable named objKeysArr.
3. Use 'for...in' loop with variable key in parameter object.
4. Use push method of objKeysArr variable with one argument, variable key.
5. Return variable objKeysArr.
*/

function getKeys(object) {
  var objKeysArr = [];
  for (var key in object) {
    objKeysArr.push(key);
  }
  return objKeysArr;
}
