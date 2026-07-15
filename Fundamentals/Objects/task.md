# Objects in JavaScript

Recall that everything that is not primitive is an object in JavaScript.
**Objects** are used for representing complex collections of data. To the 
contrary of primitive data types, objects can store more than a "single" 
thing. Objects are central to the JavaScript language.

## Object Properties
Objects in JavaScript are collection of key/value pairs. An object can be 
created with the use of brackets `{...}`, with an optional list of 
_properties_. A _property_ is a key/value pair with the `key: value` form, 
where `key` is a string (the property name) and `value` can be anything.

There are many kinds of built-in objects in JavaScript. Among those, it is 
worth mentioning:

- `Array`: used to store ordered data collections
- `Date`: used to store information about date and time
- `Error`: used to store information about an error

## Object Methods

For performing actions on an object, methods can be added to this object. A 
method is simply a property that stores a function definition. This allows 
to implement Object-Oriented programming mechanisms in JavaScript.

In a object method, the keyword `this` may be used to access the object 
properties. When calling a method `m()` on an object `o`, then `this` used 
in the method `m()` refers to `o`.

## Creating and Using Objects

The sample program demonstrates how to create and manipulate objects. You 
can run or debug this program for a better understanding.

