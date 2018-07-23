const assert = require('assert');

const deepEqual = function deepEqual(a, b) {
  // recursively go over keys of each nested object
  // object traversal
  
  // if at any time the keys do not match; or keys are missing, return false
  
  // base case a and b are not objects (no keys)
  if (typeof a !== "object" && typeof b !== "object") {
    if (a == b) {
      return true;
    } else {
      return false;
    }
  } else {
    // for each key, run deepEqual
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b)
    // check that they have same number of keys
    if (aKeys.length !== bKeys.length) {
      return false;
    } else {
      // check that the keys are the same
      for (let key of aKeys) {
        // if key in a can't be found in b, return false
        if (bKeys.indexOf(key) === -1) {
          return false
        } else {
          return deepEqual(a[key], b[key]);
        }
      }
    }
  }
}

assert.deepEqual(deepEqual(1,1), true);
assert.deepEqual(deepEqual(1,2), false);

let obj = {here: {is: "an"}, object: 2};
assert.deepEqual(deepEqual(obj,obj), true);
assert.deepEqual(deepEqual(obj, {here: 1, object: 2}), false);
assert.deepEqual(deepEqual(obj, {here: {is: "an"}, object: 2}), true);
