const add = (a, b = undefined) => {
  if (b) {
    return a + b;
  } else {
    return a;
  }
};

console.log(add(1));
console.log(add(5, 2));
