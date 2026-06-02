// ['a', 'b', 'a', 'c', 'b', 'a'].reduce((acc, val) => {
//     acc[val] = (acc[val] || 0) + 1;
//     return acc;
//   }, {})

Array.prototype.myReduce = function (...arguments) {
  const [fn, initialValue] = arguments;
  let result;
  let index;
  if (arguments.length > 1) {
    result = initialValue;
    index = 0;
  } else {
    result = this[0];
    index = 1;
  }

  for (let i = index; i < this.length; i++) {
    result = fn(result, this[i], i, this);
  }

  return result;
};
