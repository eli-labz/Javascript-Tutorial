# Asynchronous error handling

The `try...catch` construct works only synchronously. If the error occurs in
asynchronous code, then the error won't be caught with a synchronous `try...
catch` The reason is that the function is executed later, when the engine 
has already left the `try...catch` construct. For a proper error handling, 
the `try...catch` construct must be placed inside the function called 
asynchronously.

## Exercise: Correct Asynchronous Error Handling

Given the incorrect code below

```
try {
  setTimeout(function() {
    noSuchVariable; // an error is generated here 
  }, 0);
} catch (err) {
  // the error will not be caught here because it happens later
  return err;
}
```
modify it in the task program for proper error handling. With a correct 
implementation, when the `asynchronousErrorHandling()` function is called, 
both the `onDone` and `onError` callback functions must be called.