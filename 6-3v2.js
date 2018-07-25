const assert = require('assert');

class Group {

  constructor() {
    this._elements = [];
    this._iterableIndex = 0;
  }

  static from(iterable) {
    const group = new Group();
    for (let item of iterable) {
      group.add(item);
    }
    return group;
  }

  has(item) {
    return (this._elements.indexOf(item) !== -1);
  }

  add(item) {
    if (this._elements.indexOf(item) === -1) {
      this._elements.push(item);
    }
  }

  delete(item) {
    const itemIndex = this._elements.indexOf(item);
    if (itemIndex !== -1) {
      return this._elements.splice(itemIndex, 1)
    }
  }

  [Symbol.iterator]() {
    // Tried Symbol.iterator() and got error (unexpected token .), need square brackets around it.
    // don't need to mutate the prototype outside, like the text suggests with the matrix example
    // followed the documentation on MDN
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
    return {
      next: () => {
        if (this._iterableIndex == this._elements.length) {
          this._iterableIndex = 0; // if we want to iterate over again without forcing a manual update
          return {done: true};
        } else {
          // postfix iterableIndex++ arithmetic operator increments AFTER returning the index value
          return {value: this._elements[this._iterableIndex++], done: false};
        }
      }
    }
  }

}


let group = Group.from([10, 20]);
assert.equal(group.has(10), true);
assert.equal(group.has(30), false);

group.add(10);
group.delete(10);
assert.equal(group.has(10), false);

for (let value of Group.from(["a", "b", "c", "d"])) {
  console.log(value);
}

for (let value of Group.from(["a", "b", "c", "d"])) {
  console.log(value);
}
