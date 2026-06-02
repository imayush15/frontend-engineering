// const arr = [1, 2, 3, 4, 5, 6];
// const evens = arr.myFilter(x => x % 2 === 0);
// console.log(evens); // [2, 4, 6]

Array.prototype.myFilter = function (fn) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
