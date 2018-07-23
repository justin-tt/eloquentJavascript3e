const assert = require('assert');

const range = function range(start, end, step=(start > end ? -1 : 1)) {
  let arr = [];
  if (step > 0) {
    for (let i = start; i <= end; i += step) {
      arr.push(i);
    }
  } else if (step < 0) {
    for (let i = start; i >= end; i += step) {
      arr.push(i);
    }
  } else {
    return arr;
  }
  return arr;
}

assert.deepEqual(range(1,10), [1,2,3,4,5,6,7,8,9,10]);
assert.deepEqual(range(1,10,2), [1,3,5,7,9]);
assert.deepEqual(range(5,2,-1), [5,4,3,2]);
assert.deepEqual(range(5,2), [5,4,3,2]);
assert.deepEqual(range(2,5), [2,3,4,5]);

const sum = function sum(arr) {
  return arr.reduce((acc, curr) => acc + curr);

}

assert.deepEqual(sum([1,2,3,4,5]), 15);
console.log(sum(range(1,10)));

