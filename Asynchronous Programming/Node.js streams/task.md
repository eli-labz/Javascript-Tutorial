# Node.js streams

As we have experimented in the previous sections, Node.js provides ways to
perform I/O operations in synchronous and asynchronous modes. One of the
limitations of the solutions demonstrated in these sections is that data is 
entirely read from file to memory before it can be processed. Of course, it 
is possible to perform read operations in loops and to process the data in 
chunks. However, Node.js also supports the concept of streams, as other
languages like Java do.

## The concept

**Streams** is a concept that was introduced in the Unix operating system, in 
which programs can interact with each other passing data through the pipe
operator ( `|` ). Using Streams, rather than read a file entirely into memory
and then process it, you read it piece by piece and process it without keeping
the entire file content in memory. In Node.js, the [Stream](https://nodejs.
org/api/stream.html) module provides this functionality and, based on this 
module, Node.js provides ways of handling reading/writing files, 
communication over networks and other information exchanges using streams in 
an efficient way.

## A simple example

For demonstrating the concept of streams, we may start from a simple example
where the content of a file is read. Using the concept of `Promises` and
`async/await,` an function that reads the content of a file is shown in the
task program.

What happens when executing this code is that the entire file content is loaded
into memory (on line 9), before it is delivered to the HTTP client (on line 10).
This way of reading and processing data has two major drawbacks:

* It is not memory efficient, since large amounts of data must be loaded in
  memory before the data can be processed.
* It is not time efficient, since processing cannot start before the whole data
  is loaded into memory, eventhough the I/O operation is performed 
  asynchronously.

## Using streams and pipes as an alternative

An alternative to this concept is to use JavaScript streams. Rewriting the
example above using streams is quite straightforward and is also shown in
the task program. In this example, instead of waiting until the file content 
is entirely read, we start streaming it to the console as soon as a 
chunk of data is ready to be sent. This is done using the pipe mechanism, 
similarly as what one would do using the pipe mechanism of the Unix 
operating system. In this example, the `pipe()` method is called on the 
file stream. It is important to point out that the return value of the `pipe
()` method is the destination stream, which is very convenient since it lets 
developers chain multiple pipe() calls like

```
src.pipe(dest1).pipe(dest2);
```



