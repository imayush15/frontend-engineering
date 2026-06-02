// Problem: once(fn)

//   Implement a function once(fn) that takes a function as input and returns a new function. The returned
//    function, when called:

//   - Executes fn with the provided arguments on the first call only
//   - Returns the result of that first call
//   - On all subsequent calls, returns the same cached result without re-executing fn

//  Example:
//   const init = once((x) => {
//     console.log("running!");
//     return x * 2;
//   });

function once(fn) {
  let count = 0;
  let result;

  return function (...args) {
    if (count === 0) {
      result = fn(...args);
    }

    count++;
    return result;
  };
}
