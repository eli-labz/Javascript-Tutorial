# Function invocation

A function can be **invoked** in four different ways: 

- as a function,
- as a method, 
- as a constructor or
- using apply() or call() methods.

Whenever a function is invoked, the JavaScript engine create a new execution
context, for evaluating the code within the function. This means that every
function is executed with it own execution context. The main difference between
the different ways of invoking a function is the
context that is created is different. This creates important differences in
the meaning of the `this` keyword that can be used within functions:

- As a function: `this` refers to the global context (note that in this case, 
`this` gets the value `undefined` when `use strict` is used).
- As a method: `this` refers to the object (as in OO programming).
- As a constructor: a new object is created and passed to the constructor as 
  `this` parameter.
- Using `apply()` or `call()`: the context is specified at invocation. 



