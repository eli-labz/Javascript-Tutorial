In JavaScript, a function can be invoked with a number of arguments that is not
the same as the number of arguments in the function declaration. In this case,
it is important to understand that:

- If more arguments are supplied than the ones in the function declaration, the
  excess arguments are simply discarded and there will be no execution error.
- If less arguments are supplied than the ones in the function declaration, the
  parameters that have no corresponding argument are set to `undefined`.

Also, it is important to mention that the argument `arguments` is passed 
implicitly whenever a function is invoked: `arguments` contains the 
collection of all the arguments passed to the function.

Solve the programming exercise for applying this concept.