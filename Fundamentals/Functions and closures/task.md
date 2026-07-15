# Access to "outer" variables

In JavaScript, every function can access variables declared outside of it. 
Thus, a function declared in the global scope can access any variable 
declared in the global scope. This is demonstrated by the function `incCounter()`
(), which uses the `counter` variable declared in the global scope.  

# Nested functions

In JavaScript, functions can be nested, which means that a function can be 
declared in another function. This is demonstrated in the `greetings()` 
function. In this function, two inner functions `sayHello()` and 
`sayGoodbye()` are defined. Both make use of the outer variable `lastName`, of 
the parameter `firstName` and of the local variable `separator`. `separator` 
is also an outer variable for the two `sayHello()` and `sayGoodbye()` 
functions. 

## How does the JavaScript access variables

Each time a function is called, a new scope is created. This means for 
instance that when the function `greetings` is called, a new scope is 
created. The variable `separator` is created in this new scope. When the 
function `sayHello()` is called, another new scope is created. When this 
function wants to access any variable, the engine first looks for this 
variable in the innermost scope. If it finds it, it then uses this one. If 
it does not find it, it then looks in the next outer scope. The engine 
continues to search for the variable until it reaches the global scope. If it 
does not find it in the global scope, then an error is generated. 

---
**&#9432;**
Note that the behavior is different when strict mode is not applied. In 
this case, a variable that is not found induces the creation of a new 
property on the global object, without producing an error.
---

In our particular example, `firstName` and `separator` are found in the 
closest outer scope, while `lastName` is found in the global scope. You may 
experience this by debugging the program and observe the different variable 
scopes in the debugger.

# Closure
In the example above, the inner `sayHello()` and `sayGoodbye()` are created 
for convenience. Such uses are common in JavaScript.

Another use of nested functions in JavaScript is the one of a nested 
function returned by the outer function. The function returned can thus be 
used somewhere else. In this case, the question is of course: how does the 
function access the variables when it is called at another time? The answer 
is: a so-called _closure_ is created by the JavaScript engine. A closure is 
a combination of a function with references to its outer state. A closure 
thus gives access to all outer variables from an inner function and it is 
created every time a function is created - at function creation time.

The closure principle is illustrated with the `makeGreetings` function. You 
may again better understand the program and observe the different scopes 
using the debugger. 