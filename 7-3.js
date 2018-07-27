const assert = require('assert');

class PGroup {

  constructor(array = []) {
    this._elements = array;
    this._iterableIndex = 0;
  }

  static from(iterable) {
    let pGroup = PGroup.empty;
    for (let item of iterable) {
      pGroup = pGroup.add(item);
    }
    return pGroup;
  }

  has(item) {
    return (this._elements.indexOf(item) !== -1);
  }

  add(item) {
    let newElements = this._elements.slice();
    if (newElements.indexOf(item) === -1) {
      newElements.push(item);
    }
    return new PGroup(newElements);
  }

  delete(item) {
    let newElements = this._elements.slice();
    const itemIndex = newElements.indexOf(item);
    if (itemIndex !== -1) {
      // splice is a mutator! don't do newElements = newElements.splice(itemIndex, 1)
      newElements.splice(itemIndex, 1)
    }
    return new PGroup(newElements);
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        if (this._iterableIndex == this._elements.length) {
          this._iterableIndex = 0;
          return {done: true};
        } else {
          return {value: this._elements[this._iterableIndex++], done: false};
        }
      }
    }
  }

}
PGroup.empty = new PGroup();

let a = PGroup.empty.add("a");
let ab = a.add('b');
let b = ab.delete("a");
console.log(a, ab, b);
console.log(b.has("b"));
console.log(a.has("b"));
console.log(b.has("a"));

for (let value of ab) {
  console.log(value);
}

let group = PGroup.from([10, 20]);
console.log(group);
let group2 = group.add(10);
console.log(group2);
let group3 = group.add(30);
console.log(group3);
let group4 = group3.delete(10);
console.log(group,group2,group3,group4)
