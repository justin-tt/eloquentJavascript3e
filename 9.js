let name = "dea+h\\/4R[]o*rd.";
let text = "This dea+h\\/4R[]o*rd. guy is super annoying. This dea+h\\/4R[]o*rd guy is super annoying.";
let escaped = name.replace(/.*?$/g, "\\$&"); // every single thing is a match.. for some reason . and ] bug out
let escaped2 = name.replace(/[\[\\\].+*?(){}|^&]/g, "\\$&"); // is the one that i'm expecting, which is cleaner, but don't fully understand
// let escaped2 = name.replace(/[\[\\\].+*?(){}|^&]/g, "\\$1"); // $1 doesn't work here 

// "\\$&" means add a \ then the match that was found
console.log(name, escaped, escaped2);

let regexp = new RegExp("\\b" + escaped + "\\b", "gi");
console.log("\\b" + escaped + "\\b");
// let regexp = new RegExp("\\b" + escaped2 "\\b", "gi");
console.log(text.replace(regexp, "__$&__"));
// console.log(text2.replace(regexp, "__$1__"));
let regexp2 = new RegExp(escaped2, "gi");
console.log(text.replace(regexp2, "__$&__"));
