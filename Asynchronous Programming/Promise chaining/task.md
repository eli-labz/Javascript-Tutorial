# Promise chaining

As explained in the previous tasks, the advantages of Promises over the 
traditional callback functions are multiple:

- Do things naturally in order - execute the function then handles the result
- `then` can be called as many times as we want (chaining calls).
- It improves code readability and flexibility.

## What is chaining?
**Chaining** is a very interesting and powerful feature of promises. 
Chaining is possible because the `then/catch/finally` all return a **new** 
Promise object. The Promise object returned by these functions follow some 
rules that are not explained here, but it is important to understand that 
they do return a Promise object. So it is for instance possible to chain the 
`readWithPromise` calls and to make the code much more readable than the one 
using callback functions.

## Understand chaining with a simple example
You need to complete the code in the task program and run it. Your code 
should reproduce the same behavior as the code in the [callback hell task 
program](course://Asynchronous Programming/The callback hell). 

## Chaining for JavaScript in the browser
Chaining promises is very useful for frontend programming as well, e.g. when 
using the `fetch` API and handling network request and responses.