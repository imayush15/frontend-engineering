/**
 * Throttle: * Throttle is a technique that limits the number of times a function can be called over a certain period of time. It ensures that a function is not called more than once in a specified time frame, even if it is triggered multiple times. This is particularly useful for optimizing performance and preventing excessive function calls in scenarios like scrolling, resizing, or button clicks.
 */

function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = new Date().getTime();

    if (now - lastCall > delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

// Leading and Trailing Edge Throttle:

// Leading Throttle: run immediately on the first call, then block calls for the delay window.

// this is already a leadning throttle, as it runs immediately on the first call and then blocks subsequent calls until the delay has passed.
function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = new Date().getTime();

    if (now - lastCall > delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

// Trailing Throttle: run after the delay window has passed since the last call, ensuring the last call is executed.
