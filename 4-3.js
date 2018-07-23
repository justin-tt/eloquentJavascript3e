const assert = require('assert');

const arrayToList = function arrayToList(arr) {
  // recursive definition
  // base case (empty list) returns null
  if (arr.length == 0) {
    return null;
  } else {
    let list  = {};
    list.value = arr[0];
    list.rest = arrayToList(arr.slice(1));
    return list;
  }
}

const listToArray = function listToArray(list) {
  const arr = [];
  while (list !== null) {
    arr.push(list.value);
    list = list.rest;
  }
  return arr;
}

const prepend = function prepend(element, list) {
  return {value: element, rest: list};
}

const nth = function nth(list, n) {
  for (let i = 0; i < n; i++) {
    list = list.rest;
  }
  return list.value;
}

const nthRecursive = function nth(list, n) {
  if (n == 0) {
    return list.value;
  } else {
    return nthRecursive(list.rest, n-1);
  }
}

assert.deepEqual(arrayToList([]), null);
assert.deepEqual(arrayToList([1]), { value: 1, rest: null });
assert.deepEqual(arrayToList([10,20]), {value: 10, rest: {value: 20, rest: null}});
assert.deepEqual(listToArray(arrayToList([10,20,30])), [10, 20, 30]);
assert.deepEqual(prepend(10, prepend(20, null)), {value: 10, rest: {value: 20, rest: null}});
assert.deepEqual(nth(arrayToList([10, 20, 30]), 1), 20);
assert.deepEqual(nthRecursive(arrayToList([10, 20, 30]), 2), 30);
