# Data types in JavaScript

There exist eight data types in JavaScript:

* **Number**: the number data type represents both integer and floating point
  numbers. The operators for numbers are the
  same as in Java and there exist also special values for `Infinity`
  , `-Infinity` and `NaN`. Unlike Java where some
  operations may generate arithmetic exceptions, all operations with numbers are
  safe in JavaScript. This means that
  your program will never stop and that at worst you will get a `NaN` result.
* **BigInt**: the BigInt data type is used for representing integer values that
  are larger than `2^53 - 1` or smaller
  than `-(2^53 - 1).` BigInt value can be created by adding `n` to the end of an
  integer literal value.
* **String:** as in Java, literal values in JavaScript are surrounded by quotes,
  for example `"Hello"`. In JavaScript, there are 3 types of quotes, 
  namely double quotes (`"Hello"`), single quotes (`'Hello'`) and
  backsticks (\``Hello`\`). While double and single quotes are almost 
  identical in their use, backsticks offer extended
  functionalities as demonstrated in the example program.
* **Boolean:** like in Java, the boolean type has only two possible
  values: `true` and `false`. Boolean values can be
  initialized to one of these values or can be the result of comparisons.
* "**null**": variables can have the special `null` value, that does not
  correspond to any of the types above. Unlike in
  Java, in JavaScript, `null` does not represent a null reference to an object
  of a given type. It is just a special
  value for representing an unknown value. When the `null` value is assigned to
  a variable, the type of this variable
  becomes `Object`.
* **"undefined":** `undefined` is another special value that represents a
  variable that has no value assigned. If a
  variable is declared but is not assigned, then its value is `undefined`
  . `null` should be used for an unknown value to
  a variable, while `undefined` means the default initialized value for
  unassigned variables. When the `undefined` value
  is assigned to a variable, the type of this variable
  becomes `undefined`.
* **Object:** everything that is not primitive is an object in JavaScript.
  Objects are used for representing complex
  collections of data. Objects are central to JavaScript and they will deserve a
  lot of attention in the following
  sections.
* **Symbol**: the symbol data type is used to create unique identifiers for
  objects.

Important remarks:

* JavaScript, unlike Java, does not provide a type for characters. A character
  is a `string` with a single character.
* For checking the type of a variable, JavaScript also provides the `typeof`
  operator, like Java. However, the
  `typeof` operator in JavaScript has two forms: as an operator `typeof x` or as
  a function `typeof(x).` In both cases,
  it returns a string with the type name (and not a `boolean` value).

For a better understanding of the different data types, run the code example and
understand the console output
carefully.