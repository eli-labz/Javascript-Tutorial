'use strict';

const fs = require('fs');

const filePath = './input.txt';

// synchronous I/O
try {
  console.log("Synchronous call:");
  const buf = fs.readFileSync(filePath);
  console.log(buf.toString());
}
catch (err) {
  console.log(err);
}

// asynchronous I/O
// In this asynchronous case, we need to pass a callback function as an
// argument to the `readFile()` function. The callback function takes
// two arguments, an error object and a buffer that holds the content of the
// file. Note also that error handling is different since the `try...catch`
// construct would not work for the asynchronous call
fs.readFile(filePath, function(err, buf) {
  console.log("Asynchronous call:");
  if (err) {
    console.log(err);
  }
  else {
    console.log(buf.toString());
  }
});