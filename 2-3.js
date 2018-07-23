const assert = require('assert');

let size = 8;

// building XAND gate using AND and OR gates

const XAND = function XAND(a, b) {
  let input1 = a || b;
  let input2 = !(a && b);
  return !(input1 && input2);
}
assert.equal(XAND(true,true), true);
assert.equal(XAND(true,false), false);
assert.equal(XAND(false,true), false);
assert.equal(XAND(false,false), true);


let rowStr = "";
for (let col = 0; col < size; col++) {
  for (let row = 0; row < size; row++) {
    // using XAND to use row/col to make the checkered pattern
    if (XAND(row % 2 == 0, col % 2 == 0)) {
      rowStr += " ";
    } else {
      rowStr += "#";
    }
  }
  rowStr += "\n";
}
console.log(rowStr);
