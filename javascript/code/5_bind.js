/**
 * Problem: Implement Function.prototype.bind from scratch

  Implement myBind on Function.prototype that replicates the native bind behavior.

  Signature:
  Function.prototype.myBind = function(thisContext, ...args) {}

  Requirements:
  - Returns a new function — does not call the original function immediately
  - The returned function, when called, executes the original function with thisContext permanently set
   as this
  - Arguments passed to myBind after thisContext are pre-filled (partial application)
  - Arguments passed when calling the returned function are appended after pre-filled args

  Example:
  const person = { name: 'Ayush' };

  function greet(greeting, punctuation) {
    console.log(greeting + ' ' + this.name + punctuation);
  }

  const boundGreet = greet.myBind(person, 'Hello');
  boundGreet('!');   // Hello Ayush!
  boundGreet('???'); // Hello Ayush???

  const boundGreet2 = greet.myBind(person);
  boundGreet2('Hi', '.');  // Hi Ayush.

  Constraints:
  - Do not use native bind
  - You may use call or apply internally

  Follow-up questions an interviewer might ask:
  - Why does bind return a new function instead of calling immediately? How is that different from call
   and apply?
  - What happens if you bind an already bound function?
  - Why can't you use an arrow function for the returned function if you need to support new?
 */

Function.prototype.myBind = function (...args) {
  const [thisContext, ...restArgs] = args;
  const fn = this;
  return function (...callArgs) {
    fn.call(thisContext, ...restArgs, ...callArgs);
  };
};
