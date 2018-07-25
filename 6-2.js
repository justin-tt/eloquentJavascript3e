const assert = require('assert');

class Group {

  constructor() {
    this._elements = [];
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

}

let group = Group.from([10, 20]);
assert.equal(group.has(10), true);
assert.equal(group.has(30), false);

group.add(10);
group.delete(10);
assert.equal(group.has(10), false);
