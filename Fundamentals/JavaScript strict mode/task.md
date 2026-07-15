# Strict mode

JavaScript's **strict mode** was introduced in ECMAScript 5, as a way to use a
restricted variant of JavaScript. Today, most major browsers implement strict
mode and Node.js also does.

Strict mode introduces several changes to non strict JavaScript semantics:

* It does transform some JavaScript silent errors to fatal throw errors.
* It does fix mistakes that make optimizations by JavaScript engines difficult.
* It does prohibit some syntax likely to be defined in future versions of
  ECMAScript.

Transforming an existing code written without strict mode into strict mode
requires careful transitioning as documented
on  [Transitioning to strict mode - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode)
. If you start a new application, you should rather choose to use strict mode.
Strict mode can be applied to entire scripts or to individual functions, by
adding the `'use strict';` statement before any other statements in your 
script or in your function's body.

One important change is that the use of strict mode changes some previously 
mistakes into errors. Mistakes won't stop the JavaScript program execution, 
while errors will. The reason for this is that JavaScript engines accept 
some errors for an immediate problem fix, which may be a bad idea in the 
long term. The most common error turned into a mistake is the accidental 
creation of global variables, for instance by mistyping. An example is given 
in the program. Try to run the program with and without the `'use strict';` 
statement. 

Going into a more detailed description of differences between strict and 
non-strict modes is beyond the scope of this exercise. Further details are given
on  [Strict mode - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
. Simply recall to use strict mode when writing new JavaScript code and you will
learn the differences !
