//  curry implementation for multi-argument functions that is used below.
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}

// define the format function
function format(importance, date, message) {
  return `[${importance}] [${date.getHours()}:${date.getMinutes()}] ${message}`;
}

// use it
const msg1 = format("DEBUG", new Date(), "some info");
// curry the format function with the lodash library
format = curry(format);
// use it again as normal
const msg2 = format("DEBUG", new Date(), "some info");
// use the curried form
const msg3 = format("DEBUG")(new Date())("some info");

// formatDebug will be the partial function of format with fixed first argument
// this allows to define a partially applied function used
// for formatting all debug messages
var formatDebug = format("DEBUG");

// use it
const msg4 = formatDebug(new Date(), "message"); // DEBUG [HH:mm] message