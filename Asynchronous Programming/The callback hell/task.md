# The callback hell

At this point, it should be clear that Node.js applications are by nature 
asynchronous and that any I/O operation in a Node.js application should be 
asynchronous. This means that callback functions need to be provided for any 
call to an asynchronous I/O function.

## A simple example: reading files in cascade 

From the previous example, say that we want to read a file "input1.txt" and, 
when successfully done, load another file "input2.txt". Say also that if the 
first file "input1.txt" cannot be read, then the second file should not be 
loaded. 

You must add code in the task program for reading "input2.txt" upon 
successful reading of "input1.txt". Modify the file paths for testing how 
errors are handled.

## Cascading calls make the code difficult to read
As you can observe, nesting calls using callback functions gets us very soon to 
unreadable code that is very difficult to manage.

This is the pyramid of doom... or callback hell.
