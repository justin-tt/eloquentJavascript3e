const assert = require('assert');

const reverseArray = function reverseArray(arr) {
  const reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}

assert.deepEqual(reverseArray(["A", "B", "C"]), ["C", "B", "A"]);

const reverseArrayInPlace = function reverseArrayInPlace(arr) {
  // swap first and last indexes, i, arr.length - i
  // and walk i to the middle
  // if arr.length is odd, e.g. 5, just need to walk i to the first 2, i.e.
  // we walk floor(arr.length / 2)
  const midIndex = Math.floor(arr.length / 2);
  for (let i = 0; i < midIndex; i++) {
    // es6 destructuring so we don't need "temp" variables
    [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length -1 - i], arr[i]];
  }
}

let arrayValue = [1,2,3,4,5];
reverseArrayInPlace(arrayValue);
assert.deepEqual(arrayValue, [5,4,3,2,1]);
