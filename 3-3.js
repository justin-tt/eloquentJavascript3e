let countBs = function countBs(string) {
  count = 0;
  for (let charIndex = 0; charIndex < string.length; charIndex++) {
    if (string[charIndex] === "B") {
      count++;
    }
  }
  return count;
}

const countChar = function countChar(string, character) {
  count = 0;
  for (let charIndex = 0; charIndex < string.length; charIndex++) {
    if (string[charIndex] === character) {
      count++;
    }
  }
  return count;
}

// using closures
countBs = function countBs(string) {
  // return the other function's return value!
  return countChar(string, "B");
}

console.log(countBs("BBC"));
console.log(countChar("kakkerlak", "k"));
