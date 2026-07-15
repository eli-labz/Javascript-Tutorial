# Promises

The problem with callback functions is that they are great for simple cases but
get very complicated when levels of nesting are added. This is the reason 
why the **`Promise`** and **`async/await`** mechanisms were introduced in 
JavaScript. `Promise` and `async/await` are also widely used for Node.js 
applications.

## The Promise principle

The principle behind `Promise` in JavaScript is based on:

- a producing code: does something that takes time, asynchronously.
- a consuming code: wants the result of the producing code, waiting for the
  result.
- a `Promise` object that links the producing and the consuming code.

The syntax for a promise object in JavaScript is:

```
let simple_promise = new Promise(function(resolve, reject) {
  // executor (the producing code)
  alert(`Cool, the executor of promise1 runs`);
});
```

Please note the following:

- The function passed to the Promise is the producing code.
- When a new promise is created, the executor runs automatically and
  immediately.
- The `resolve` and `reject` callbacks are provided by JavaScript itself.
- The `resolve` callback is called upon successful completion of the executor
  code.
- The `reject` callback is called upon error in the executor code.

## Why is it useful?

Given the simple `Promise` definition above, how should we use this `Promise`
object then ?

The answer is rather simple. One must:

1. first create the promise object with its executor
2. then consume the result (resolve or reject) using then, catch, finally.

This is illustrated with two examples in the task program, one example that 
always succeeds and one that always fails.