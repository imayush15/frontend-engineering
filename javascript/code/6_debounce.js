/**
 * Debounce function: limits the rate at which a function can fire. The function will only execute after a certain amount of time has passed since the last time it was invoked.
 */

function debounce(fn, delay) {
  let timeout = null;

  return function (...args) {
    clearTimeout(timeout); // Clear the previous timeout if the function is called again within the delay period
    timeout = setTimeout(() => {
      fn.apply(this, args); // Call the original function with the correct context and arguments after the delay
    }, delay);
  };
}
