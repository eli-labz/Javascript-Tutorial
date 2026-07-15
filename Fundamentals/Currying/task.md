# Currying
Currying is a transformation of functions that translates a function from 
being callable as `f(a, b, c)` into being callable as `f(a)(b)(c)`.

In the example program, we demonstrate the principle with a helper function 
`curry(f)` that performs currying for a two-argument function `f`. In other 
words, `curry(f)` for a two-argument function `f(a, b)` translates it into a 
function that can be called as `f(a)(b)`. The `curry` function thus does not 
invoke `f`, but rather transform it.

The curry mechanism can also be implemented with arrow functions, as 
demonstrated in the "task.js" program.

## Benefits
The benefit of the currying mechanism is the one of partially applied 
functions. With this mechanism, we can define a function that is partially 
applied and assign it to a variable so that it can be reused. 

This is demonstrated with a real-life example, such as logging, in the "log.
js" program.

## Exercice
In summary, currying is the process of taking a function with multiple 
arguments and turning it into a sequence of functions each with only a 
single argument. 

In the exercise to be realized in the "substring.js" file, you must use the 
principle of partially executed functions for defining different versions of 
the `getSubstring()` function.

