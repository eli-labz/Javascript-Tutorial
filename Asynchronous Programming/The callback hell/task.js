// for testing purposes, these two lines need to be commented
// const fs = require('fs');
// 'use strict';

// for testing purposes, fs must be passed as parameter to the function
function readFiles(fs, filePath1, filePath2, onDone, onError) {
    let content;

    fs.readFile(filePath1, function(err, buf) {
        if (err) {
            // reading filePath1 was unsuccessful
            onError(err);
        }
        else {
            // reading filePath1 was successful
            content = buf;
            /* Add code for reading filePath2 (handling success and error) */
        }
    });
};
