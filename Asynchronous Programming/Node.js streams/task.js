'use strict';

const fs = require('fs');

// read data content
let readFunction = async () => {
  try {
    // read file content
    const data = await fs.promises.readFile('./data.txt');
    console.log(data.toString());
  }
  catch (err) {
    console.log(err);
  }
};

readFunction();

// stream data content
const stream = fs.createReadStream('./data.txt');
stream.pipe(process.stdout);