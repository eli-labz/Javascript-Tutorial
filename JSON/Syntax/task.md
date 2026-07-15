# The JSON syntax

## The reference document
The JSON syntax is specified in 
[JSON
specifications](https://www.ecma-international.org/publications-and-standards/standards/ecma-404/)

## Basics
**JSON** stands for JavaScript Object Notation and it is a 
data-interchange format that humans can easily read and that computers can 
easily parse. For programmers, the JSON format can be easily handled, 
especially when using the JavaScript programming language - although it is 
fully language independent.

JSON is built on two universal data structures:
* A collection of name/value pairs, called an **Object**. An object begins
  with `{` and ends with `}`. Each name is followed by `:` and the
  name/value pairs are separated by `,`.
* An ordered list of values, called an **Array**. An array is an ordered
  collection of values that starts `[` and ends with `]`. Values are
  separated by `,`.

Values in an object or in an array can be another object or array, but it can
also be an instance of a primitive type (i.e. a string, a number, a boolean
(true or false), or the value null).

In the [JSON specifications](https://www.ecma-international.org/publications-and-standards/standards/ecma-404/), 
the syntax definition of the different JSON components are given in 
graphical form, which helps in the understanding of the syntax of each 
single component.

## Use of JSON
JSON objects exist as strings, which is very useful when transmitting data 
across a network. Since JavaScript provides tools for converting from and to 
JSON objects representations, it is thus used very often when a JavaScript 
object needs to be transmitted or stored.

## A simple example
In the first example, we demonstrate how one can represent students in JSON. 
Each student has a name and an email, so each student is an **Object** with 
two name/value pairs. The entire set of students is represented with a 
name/value pair, where the name is "students" and the value is an array of 
objects representing each student in the set.

```JSON
{
  "students": [
    {
      "name": "Bob",
      "email": "Bob.Marley@edu.hefr.ch"
    },
    {
      "name": "John",
      "email": "John.Lennon@edu.hefr.ch"
    },
    {
      "name": "Steve",
      "email": "Steve.McQueen@edu.hefr.ch"
    }
  ]
}
```  

Note that the set of students can also be represented directly as an array 
as in 
```JSON
[
  {
    "name": "Bob",
    "email": "Bob.Marley@edu.hefr.ch"
  },
  {
    "name": "John",
    "email": "John.Lennon@edu.hefr.ch"
  },
  {
    "name": "Steve",
    "email": "Steve.McQueen@edu.hefr.ch"
  }
]
```  
