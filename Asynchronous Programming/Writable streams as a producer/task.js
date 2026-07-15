// for testing purposes, these two lines need to be commented
// const fs = require('fs');
//'use strict';

// toUpperCase writes the content of the file specified as inputPath
// to the writableStream in its uppercase version
// for testing purposes, fs must be passed as parameter to the function

function toUpperCase(fs, inputPath, writableStream) {
    // use the read/write mechanism for copying the file content
    const streamRead = fs.createReadStream(inputPath);

    // add a 'data' event handler and make the content uppercase
    /* write the 'data' event handler */

    // end the writable stream when done
    /* write the 'end' event handler (must call end() on the writableStream */

    streamRead.on('error', (err) =>
      writableStream.emit('error', err));
}
