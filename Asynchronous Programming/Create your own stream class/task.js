// for testing purposes, these two lines need to be commented
// const Vigenere = require('./vigenere');
// 'use strict';

// encode data and print it to the console
// for testing purposes, vigenere must be passed as parameter to the
// function
// cypher is created by the test function using const cipher = new Vigenere(key);

function encrypt(cipher, str, writableStream) {
  cipher.pipe(writableStream);
  cipher.write(str);
  cipher.end();
}
