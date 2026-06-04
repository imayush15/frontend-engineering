/**
 * Polyfill for Promise.all
 * The Promise.all() method takes an iterable of promises as input and returns a single Promise that resolves to an array of the results of the input promises. The returned promise resolves when all of the input promises have resolved, or rejects if any of the input promises reject.
 */

Promise.myAll = function (args) {
  // args is an array of promises
  // Return a new promise that resolves when all input promises resolve,
  // or rejects as soon as any promise rejects.
  return new Promise((resolve, reject) => {
    let results = [];
    let count = 0;

    // If no promises are provided, resolve immediately with an empty array.
    if (args.length === 0) {
      resolve(results);
      return;
    }

    for (let i = 0; i < args.length; i++) {
      Promise.resolve(args[i])
        .then((res) => {
          // Preserve the order of results matching the original input order.
          results[i] = res;
          count += 1;

          if (count === args.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          // Reject immediately if any promise rejects.
          reject(err);
        });
    }
  });
};
