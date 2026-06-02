# Closures

Functions along with its lexical environment is known as _Closure_

```js
function x() {
  const a = 15;
  function y() {
    console.log(a);
  }
  y();
}
```

In the above example, the `function y` creates a closure with `function x`

It maintains its origin reference even when the function is returned

```js
function x() {
  const a = 15;
  function y() {
    console.log(a);
  }
  return y;
}

const z = x();
console.log(z); // function y

z(); // 7
```

In the above example, even when the function was returned it maintained its memory for the references of the variables that enclosed in it. While ideally it should have been deleted once the code is executed.
