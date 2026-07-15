# Async/Await

There is another syntax that makes the use of Promises even simpler. This syntax
is the **`async`/`await`** syntax.

## `async`
Let us start with the `async` keyword. This keyword can be placed before
the `function` keyword, like in

```
async function f() {
 return 1;
}

f().then(console.log(‘the promise resolved');
```

What `async` means here is that the function `f()` always returns a `Promise`
object. Even when the function code itself does not return a `Promise` object -
like in the example above -, the returned value is wrapped into a `Promise`
object automatically. So it is always possible to use the Promise object
returned by a function with the `async` keyword.

## `await`
The other related keyword is the `await` keyword. This keyword can be used in
`async` functions (and **only** in `async` functions) for making sure 
that a promise resolves before moving to the next statement. 

Here is an example of the use of `await`:

```
async function f() {

  let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done"), 1000);
  });

  let result = await promise; // wait until the promise resolves

  alert(result); // "done!"
}

f();
```

In this example, the execution pauses at the `await promise` line and resumes
only when the promise settles. In this example, the promise settles after one
second when `resolve()` is called. The execution is truly **suspended** in this
case, so that the JavaScript engine can deal with other tasks while the
promise is not settled.

## `await` use
It is important to emphasize that `await` cannot be used in standard functions
that are not annotated with the `async` keyword. It can also not be used in
top-level code (code outside any function).

In the task program, you must complete the code for a simple `async/await`
use to run a function asynchronously, while waiting for the function to
complete at some point. Your program should print

```
Before
After
I did something
```

on the console and execute calls in the following order:

In this example, the calls are executed in the following order:

1. `console.log('Before');`
2. `doSomething()`
3. `console.log(await doSomethingAsync());`
4. `new Promise();`
5. `setTimeout();`
6. `console.log('After');`
7. After the timeout expires, the `Promise` is resolved and 'I did 
   something' is printed to the console

So `() => resolve('I did something')` is executed asynchronously while the
log waits for its completion before printing to the console. Observe what is
printed on the console if you execute the code shown above and also if you
remove the `await` keyword.

## Conclusion
As a conclusion, we may say that using the `async`/`await` syntax makes the 
code much simpler to read as compared to promises with chaining and callback 
functions. This is demonstrated further in the next task.
