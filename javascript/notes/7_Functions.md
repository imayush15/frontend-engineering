# Functions

## Function Statement / Function Declaration

This method of declaring functions is known as function statement.

This type of function declarations are hoisted, where the entire body of the function is assinged to variable during the memory allocation phase

```js
function a() {
  console.log("a called");
}
```

## Function Expression

This type of function declaration are not hoisted, i.e, if this function is called even before we've initialized it, it will throw a type error that `TypeError: b is not a function`

```js
var b = function () {
  console.log("a called");
};
```

## Annonymus Functions

A function without a name is called annonymus function. These are used at places where function is used as value

```js
var fn = function () {
  // function body
};
```

## Named Function Expression

When we add name to the function in function expression, that is called named function expression

```js
var b = function xyz() {
  // function body
};
```

# First Class Functions

The ability of the function to be used as values, to be returned from functions, etc is known as First Class Functions

Also called, First Class Citizens
