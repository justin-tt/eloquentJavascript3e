let map = {one: true, two: true, hasOwnProperty: true};

// mdn documentation has a section "Using hasOwnProperty as a property name"
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty

// use the original hasOwnProperty from Object.prototype, and apply it to map using call()
// which binds a different "this"

console.log(Object.prototype.hasOwnProperty.call(map, "one"));

