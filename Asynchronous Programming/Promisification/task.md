# Promisification

When developing a JavaScript application and using Promises, it is also
interesting to do some **"Promisification"**, which is the conversion of a 
function that accepts a callback into a function that returns a `Promise`. 
"Promisification" thus allows to write programs without mixing Promising and 
callback functions, which makes a program more difficult to read and maintain. 

## An example of Promisification
A useful example is the one that allows to promisifying the `fs` Node.js API.
The promisification of the `readFile` function is demonstrated in the task 
program. 

As you can see, the `readWithPromises` function wraps the `fs.readFile()` call
into a `Promise` that is returned to the caller. The caller can thus use the
returns `Promise` object for handling data and errors. 

## Support for Promisification
In recent versions of Node.js, you can also use the `util.promisify()` 
function to make a promisified version of any function. There exists also a 
built-in version of the `fs` library that supports promises (in `fs.promises`).
