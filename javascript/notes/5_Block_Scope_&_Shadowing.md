# Block

- A block is a compound statement that is used to combine multiple statements and used in a place where Javascript expects just a single statement

```
{
    // This is a block
}
```

# Block Scope

- Scope that is limited to a block is known as block scope
- `let` and `const` variables are block scoped in Javascript, this means that they are reserved a different memory space other than the global memory space which is limited to a block

# Shadowing

The ability to declare variables of same name in different scopes is called shadowing

```js
let a = 100;
{
  let a = 10;
  var b = 20;
  const c = 30;
  console.log(a); // 10
}
console.log(a); // 100
```
