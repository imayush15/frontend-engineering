- Hoisting in JS is an ability by which we can access variables, even before we’ve initialized it.

- `let` and `const` variables are hoisted in javascript, but they are in the Temporal Dead Zone.
- `let` and `const` variables are assigned memory similar to `var` variables but are in separate memory space.

## Temporal Dead Zone

It is the time from when a variable is allocated memory till it is initialized is known as Temporal Dead Zone

Variables in TDZ are not accessible, you would get `ReferenceError`
