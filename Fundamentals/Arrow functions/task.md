# Arrow functions
In JavaScript, there is a way for creating functions with a simpler and more
concise syntax. This is called **_arrow_ functions**. Arrow functions are 
somehow
similar to the use of lambda expressions for implementing interfaces in Java.

Consider the following function declaration:
```
let func = function(arg1, arg2) {
  return expression;
};
```

It is possible to define the same function using the arrow function syntax:

```
let func = (arg1, arg2) => expression;
```

For transforming the standard function declaration to an arrow function, we
removed everything that can be inferred automatically, similarly to what is done
for lambda expressions in Java.

This way of expressing functions is very useful when defining callback
functions. So given the function `ask`: 
```
function ask(question, yes, no) {
  if (confirm(question)) {
    yes();
  }
  else {
    no();
  }
}
```
rather than writing
```
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
```
one can write 
```
ask("Do you agree?", 
    () => alert("You agreed.)", 
    () => alert("You canceled the execution."));
```

## Exercice

In the exercice, you must define a few functions using the arrow function 
mechanism.
