# Callback functions

JavaScript asynchronous programming makes a heavy use of **callback functions**.
Callback functions allow to the scheduling of asynchronous actions. Those
actions are initiated at the time they are called, but they finish later - 
after returning from the call.

A common JavaScript example for callback function is the `setTimeout` 
JavaScript function, that takes a callback function as parameter. An example 
of the use of `setTimeOut` is given in the task program. If you run the 
program, you will observe the difference between the immediate console log 
and the console log occurring after the timeout is reached.

The syntax of the `setTimeout` function is `setTimeout(function,
milliseconds)`. In this expression, `function` is a callback function, that
will be executed after the timeout expressed in milliseconds.

The use of callback functions in JavaScript is very common and every
JavaScript programmer should be very familiar with this concept.
