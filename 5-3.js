const assert = require('assert');

const every = function every(array, test) {
  // loop method
  for (let item of array) {
    if (!test(item)) {
      return false;
    }
  }
  return true;
}

const every2 = function every2(array, test) {

  const notTest = function notTest(item) {
    return !test(item);
  }
  // some() method
  // the inverse of every item passing the test
  // is the same as any item failing the test
  if (!array.some(notTest)) {
    return true;
  }
  return false;
}


assert.equal(every([1,3,5], n => n < 10), true);
assert.equal(every([2,4,16], n => n < 10), false);
assert.equal(every([], n => n < 10), true);
assert.equal(every2([1,3,5], n => n < 10), true);
assert.equal(every2([2,4,16], n => n < 10), false);
assert.equal(every2([], n => n < 10), true);
