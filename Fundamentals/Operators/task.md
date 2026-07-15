# Operators

**Operators** in JavaScript are very similar to operators in Java or c 
languages. They can be unary, binary or tertiary (using the conditional 
operator `?`). The following points are worth mentioning:

- In JavaScript, it is possible to compare values of different types. In this
  case, JavaScript converts the values to numbers.
- For comparing two values and preventing any conversion, JavaScript has
  introduced the strict equality operator `===`. When using this operator, no
  conversion happens. The same applies for the `!==` operator.
- The `null` and `undefined` values are considered as equal with the `==`
  operator, while they are not equal with the `===` operator.
- In general, any comparison with the `null` or `undefined` values should be
  avoided or using the `===` operator. One should not use `>=`, `>`, `<` or `<=`
  comparison operators with the `null` or `undefined` values.

### The `??` operator

In recent years, JavaScript has introduced the nullish coalescing
operator `??`. `??` returns the first argument if it's not `null` or `undefined`
. For example, the result of `a ?? b` is `a` if `a` is defined, `b` otherwise`.`
The common use case for the `??` operator is to provide a default value for a
potentially undefined variable.

### The `??` operator vs. the `||` operator

The `??` operator was added recently to the JavaScript language, while the 
`||` operator exists since the beginning of JavaScript. Since both operators 
are similar, why was `??` added to the language ?

The reasons for this is that both operators differentiate themselves as 
follows :

- `||` returns the first _truthy_ value and does not distinguish between 
  `false`, `0`, `""`, `null` or `undefined` which are all _falsy_ values.
    ?? returns the first _defined_ value, and it allows to differentiate 
  between `null` or `undefined` and other values - when the value is really 
  unknown or not set. 

Examples of comparison operators are given in the example program.