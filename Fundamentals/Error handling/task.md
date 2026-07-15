# Error handling

JavaScript programs are like any other programs, they contain or produce errors.
The errors may occur because of mistakes in programming, but also because of
unexpected user inputs or server responses, or for many other reasons.

Handling errors in JavaScript can also be implemented with the `try...catch`
construct similarly to Java. By using this construct, the programmer can handle
errors and do something reasonable in case of a specific error, thus preventing
the script from dying. The `try...catch` syntax is demonstrated below. Its
behavior is similar to Java's one:

1. The code within the `try` block is executed.
2. If there was no error, then the `catch` block is ignored and the execution
   continues with the statement following the `catch` block.
3. If an error occurs, then the execution in the `try` block is stopped and the
   execution continues with the `catch` block.

```
try {
  // code...
} catch (err) {
  // error handling
}
```

The example in the task program illustrates how error handling 
should be implemented for synchronous I/O calls in a _Node.js_ application. In 
this example, the first call to `fs.readFileSync()` is successful because 
the "input.txt" file exists. The second call to `fs.readFileSync()` fails 
because the file does not exist.

## Syntax errors are detected at **runtime**

It is important to note that since JavaScript is interpreted, syntax errors are
detected at run time. If your code is not runnable because it is not a valid 
JavaScript code, the `try...catch` construct won't handle this error. If 
the JavaScript engine cannot understand the code, it will stop. The `try...
catch` construct can only detect errors that occur in runtime in valid code. 
An example of invalid code is shown below: 

```
try {
  {{{ // this is invalid code
} catch (err) {
  // no err will be caught here and the engine will stop running
}
```

Error handling for asynchronous calls will be explained in the _Asynchronous 
Programming_ section. 