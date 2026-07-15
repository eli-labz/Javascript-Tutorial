'use strict';

const fs = require('fs');

try {
  const buf = fs.readFileSync('./input.txt');
  console.log(buf.toString());
  buf = fs.readFileSync('./inputt.txt');
}
catch (err) {
  console.log(err);
}