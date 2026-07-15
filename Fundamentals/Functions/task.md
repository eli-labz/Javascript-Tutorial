# Functions

**Functions** are essential in JavaScript, as classes are central to Java. 
They are the building blocks of any program.

Functions in JavaScript are objects, and as a consequence they can, for example,
be assigned to variables, passed to other functions, you can assign values to
their properties and call their methods. 

### **Function declaration**

The first way of defining a function is through a function declaration, which
comprises:

* The `function` keyword
* An optional name - when the name is omitted, the function is said to be
  anonymous.
* A comma-separated list of parameter names enclosed in parentheses.
* The function body, as a series of JavaScript statements enclosed in braces.

An example of function declaration is given in the companion program.

An important point about function is that a variable declared inside a 
function is only visible inside that function. Also, inside a function, 
JavaScript statements can access or modify an outer variable, as shown in 
the `logMessage2` function with the use of the `tag` variable.

>
> **Note:** In this example, the variable `tag` is a global variable. Global
> variables are visible from any function, over the entire program. In 
> JavaScript, it is a good practice to minimize their use, like in other 
> programming languages. Since ECMAScript 6, classes can be defined in 
> JavaScript and it is also a way for preventing the use of global variables.

### **Function expression**

Functions can also be created using function expressions as illustrated in 
the program with the `functionExpression` function.

Functions defined using function declarations and function expressions are
different in their scope: a function defined using a function expression can
only be used after the statement defining it is executed, whereas a function
defined using a function declaration can be invoked prior to its definition. For
instance, a function defined in the global scope using a function declaration
can be used anywhere in the whole JavaScript program. Note however that, in
strict mode, a function declaration made within a code block is only visible
inside that block and not outside it.

