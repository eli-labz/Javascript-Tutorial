# Converting a variable to a String

**String conversions** happen when an operation needs a string value. In this
case, the variable passed to the function is implicitly converted to a string
value by calling the `toString()` method of the given data type. It is 
useful to note the following : 

- An explicit conversion to a string value is also possible with `String
  (value)`.
- When a string is converted to a Number, space characters are trimmed off 
  the string start and end. For example the string `"  123   "` is converted 
  to the number `123`. 
- When converted to a Number, an empty string `""` is converted to `0`.

Observe the output of the example program.