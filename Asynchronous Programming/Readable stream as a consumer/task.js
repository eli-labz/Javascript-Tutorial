'use strict';

const fs = require('fs');

// stream a readable stream (reading from a file in flowing mode)
const streamFlowing = fs.createReadStream('./data.txt');

// start flowing mode by adding a 'data` event handler
// add a `data` event handler simply logging the stream content to the console
streamFlowing.on('data', chunk => console.log('Flowing: ' + chunk.toString()));
// add a 'end' event handler
streamFlowing.on('end', () => console.log('Flowing: done'));

// stream a readable stream (reading from a file in paused mode)
const streamRead = fs.createReadStream('./data.txt');

// add a 'readable' event handler and start reading when the stream is readable
streamRead.on('readable', () => {
    let data;
    // read() will return null when all data has been read
    while ((data = streamRead.read()) !== null) {
        console.log('Paused: ' + data.toString());
    }
})

// stream a readable stream (reading from a file in flowing mode by piping)
const streamPipe = fs.createReadStream('./data.txt');

// doing the same by piping
streamPipe.pipe(process.stdout);
