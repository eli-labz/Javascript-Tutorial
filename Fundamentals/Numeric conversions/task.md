# Converting a variable to a Number

**Numeric conversions** happen automatically when using expressions or functions
that require numbers. One needs to consider the following cases:

- When converting a `undefined` variable, the number becomes `NaN`. 
- When converting a `null` variable, the number becomes `0`. 
- When converting a `Boolean` variable with a `true` or `false` value, the number
  becomes `1` or `0`. 
- When converting a `String` variable, the leading and trailing spaces are first
  removed. If the resulting string is empty, then the number becomes `0`.
  Otherwise, the number is built from the `String` value if feasible. If it is not
  feasible, then the number becomes `NaN`.

Observe the output of the example program.