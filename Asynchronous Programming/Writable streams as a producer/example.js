'use strict';

const fs = require('fs');

// stream a readable stream to a writable stream using pipe
const reader = fs.createReadStream('./data.txt');
const writer = fs.createWriteStream('./data_copy1.txt')

// add an event handler for pipe
writer.on('pipe', (src) => {
  console.log('Something is piping into the writer.');
});

// pipe the file content to the writer
reader.pipe(writer);
reader.on('end', () => writer.close());
