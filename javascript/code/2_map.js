// const arr = [1, 2, 3, 4];
// const doubled = arr.myMap((x) => x * 2);
// console.log(doubled); // [2, 4, 6, 8]

Array.prototype.myMap = function (fn) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    result.push(fn(this[i], i, this));
  }
  return result;
};
