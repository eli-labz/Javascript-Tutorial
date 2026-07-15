# Function passed as argument to another function

In JavaScript, it is very common to pass a function as argument to another 
function. This mechanism is used for different purposes, for instance for 
defining a _callback_ function that must be called when a particular event 
occurs.

In this exercise, we use this mechanism for customizing the behavior of 
another functions, similarly to the use of _interface_ in _Java_.

The function `filter` allows to filter the elements of an array based on a 
`test` function passed as parameter. The `test` function receives an element 
of the array and it returns `true` if the element must be kept when 
filtering the array, `false` otherwise.

You must implement two functions that use the `filter` function:
- the function `filter_positive` that filters an array (or another iterable 
  object) containing numbers for keeping only positive numbers.
- the function `filter_a` that filters an array containing strings for 
  keeping only strings starting with `a`.
