const assert = require('assert');

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    let newX = this.x + vector.x;
    let newY = this.y + vector.y;
    return new Vec(newX, newY);
  }
  
  minus(vector) {
    let newX = this.x - vector.x;
    let newY = this.y - vector.y;
    return new Vec(newX, newY);
  }
  
  get length() {
    return (Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)))
  }
}

assert.deepEqual(new Vec(1, 2).plus(new Vec(2, 3)), new Vec(3, 5));
assert.deepEqual(new Vec(1, 2).minus(new Vec(2, 3)), new Vec(-1, -1));
assert.equal(new Vec(3, 4).length, 5);
