const loop = function loop(startVal, predicate, update, body) {
  let val = startVal;
  while (predicate(val)) {
    body(val);
    val = update(val);
  }
}

loop(3, n => n > 0, n => n - 1, console.log);
