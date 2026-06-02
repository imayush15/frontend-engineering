# this

There are 4 binding rules of this.

## Rule 1 - Default Binding

When a function is called standalone, `this` is picked from global object

- Does not work in strict mode, might throw `TypeError`

```js
var name = "Ayush";
function greet() {
  console.log(this.name);
}

greet(); // Ayush
```

- The above code only works with `var`, it gives undefined for `let` and `const` as both these variable types live in a different memory scope.

## Rule 2 - Implicit Binding

When a method is called inside a object, `this` is that object

```js
const obj = {
    name: 'Ayush'
    greet: function() {
        console.log(this.name)
    }
}

obj.greet() // Ayush
```

### Gotcha

It would not work if we detach the method from the object, as the context of `this` is lost then

```js
const fn = obj.greet;
fn(); // undefined or blank
```

## Rule 3 - Explicit Binding

We can explicitly bind `this` to methods, using `call`, `apply` and `bind`

```js
function greet() {
  console.log(this.name);
}

const person = { name: "Ayush" };

greet.call(person); //Ayush
greet.apply(person); //Ayush
greet.bind(person)(); //Ayush
```

## Rule 4 - new Binding

When a function is called using `new` keyword, `this` is the newly created object

```js
function Person(name) {
    this.name = name

    greet: function() {
        console.log(this.name)
    }
}

const firstPerson = new Person('Ayush')

firstPerson.greet() // Ayush
```

---

# Priority Order when Multiple Rules apply

new > explicit call > implicit call > default
