const assert = require('assert');

const flatten = function flatten(arrOfArrs) {
  return arrOfArrs.reduce((acc, current) => acc.concat(current));
}

let arrays = [[1,2,3], [4,5], [6]];
assert.deepEqual(flatten(arrays), [1,2,3,4,5,6]);
