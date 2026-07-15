# Node.js programming style

In the previous tasks, we illustrated how a blocking operation can influence
the overall execution of a program with a simple wait. Usually, blocking
operations in Node.js are not about waiting for other JavaScript operations to
finish, but rather about waiting on non-JavaScript operations, such as I/O or
network, to finish. I/O operations are very common for Node.js applications 
and this is why asynchronous programming is at the heart of Node.js.

## Asynchronous I/O operations

A good illustration of the asynchronous. vs synchronous programming styles
is the use of I/O functions. Say that your program needs to read data from
an input file. This operation can be accomplished in both a synchronous and
asynchronous way. The task program demonstrate both cases.

The synchronous call is self-explanatory. In the asynchronous case, we need to
pass a callback function as an argument to the `readFile()` function. The
callback function takes two arguments, an error object and the data that is the
content of the file. 

Note also that the way errors are handled is not the same for the 
synchronous and asynchronous calls.

If you modify the file path, you may experiment that errors are handled 
properly in both cases.

Again, the reason why asynchronous programming is required for Node.js
applications is that the Node.js JavaScript engine is single threaded and 
uses an event loop mechanism, like the JavaScript engine of any browser. Any 
synchronous call will block the Node.js thread and prevent it to serve other 
requests.

