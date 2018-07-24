const assert = require('assert');
const SCRIPTS = require('./scripts');

const characterScript = function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

const countBy = function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

const dominantDirection = function dominantDirection(text) {
  // for each char in text, get characterScript.direction
  // for each characterScript.direction, create and update counter
  // return characterScript.direction that has the largest counter
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : "none";
  }).filter(({name}) => name != "none");
  // reduce the scripts array
  let dominantScript = scripts.reduce((n, curr) => curr.count > n.count ? curr : n)
  return dominantScript.name;
}

assert.equal(dominantDirection("hello"), "ltr");
