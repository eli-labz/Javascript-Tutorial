// for testing purposes, these two lines need to be commented
// const fs = require('fs');
// 'use strict';

function readWithPromise(fs, path) {
    return new Promise( (resolve, reject) => {
        fs.readFile(path, (err, buf) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(buf);
            }
        });
    });
}

// for testing purposes, fs must be passed as parameter to the function
function readFiles(fs, filePath1, filePath2, onDone, onError) {
    // add chained calls to readWithPromise for reading filePath1 then filePath2
    // call onDone with the content when successful
    // call onError with the error if an error occurs
    /* Add promise chaining calls (2 x then + 1 x catch) for reading
      the content of the two files */
}

