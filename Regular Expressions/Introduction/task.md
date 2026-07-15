# Regular expressions

**Regular expressions** are very important when programming in JavaScript, in 
particular for Node.js applications.

Regular expressions are patterns that allows to search and replace text. In 
_Node.js_, they are for instance used when formulating mounting points for 
routes or middlewares.

## Creating Regular Expressions

In JavaScript, regular expressions are `RegExp` objects. They can be 
created using two different syntax, as shown below for an expression 
representing a "two digit" number:

```
// construct as a string with a format
const twoDigitRegExp = /[0–9]{2}/;
```
or 
```
// Construct as a new RegExp object
var twoDigitRegExp = new RegExp('[0–9]{2}');
```

With the first syntax, using the slahes `'/.../'` tells JavaScript that it 
needs to create a regular expression object.

## Range and quantifier

The regular expressions above use a range `[0-9]` and a quantifier `{2}`. 
The range specifies that we are looking for a character between `0` and `9` 
and the quantifier specifies that we are looking for two such characters. 
More details will be given in a next task on ranges and quantifiers.

## Regular Expression and Strings

Regular expression can be used with string methods for matching and 
replacing expressions.

### `String.match()`
Matching an expression is done with the String `String.match()` method that 
finds all matches of the regular expression in a string. When no match is found, 
the method returns `null`. Matching can be made using different flags in the 
regular expression.

### `String.replace()`
Replacing matches found in a string with a regular expression with a 
replacement string can be made with the `String.replace()` method.

### `RegExp.test()`
Testing that there is at least one match with a regular expression can be
made with the `RegExp.test()` method.

The use of all methods is demonstrated in the task program.

## Regular Expression Flags

Regular expressions can also include flags, using:
```
// construct as a string with a format
const twoDigitRegExp = /[0–9]{2}/g;
```
or
```
// Construct as a new RegExp object
var twoDigitRegExp = new RegExp('[0–9]{2}', 'g');
```
There are six different flags, among which:

-`'i'`: the search/match is case-insensitive.

-`'g'`: the search/match is made on the entire string, otherwise only the 
first match is returned.






