# Why Asynchronous Programming?

Normally, programming languages are synchronous, in the sense that they are
waiting for a task to be completed before executing the next task. JavaScript is
also synchronous from this perspective. However, since JavaScript in the browser
or in Node.js is single threaded, waiting for a long running task to complete
before executing the next one is not possible. For instance, while reading data
from a file or a network, waiting for the response from the file system or the
network would halt the application for long periods of time. 

In the browser, it is an issue because an application running inside it wants to
respond to user actions smoothly, which is not possible with synchronous calls
that may wait for network responses for instance. For Node.js applications,
the problem is similar: it is not possible to serve multiple simultaneous 
requests smoothly with synchronous calls to I/O. This is the reason why 
Node.js introduced a **non-blocking asynchronous** I/0 environment.


