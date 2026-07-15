'use strict';

const fs = require('fs');
const util = require('util');

const filePath = './input.txt';

function readWithPromise(path) {
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

readWithPromise(filePath).
    then((buf) => console.log("readWithPromise: " + buf.toString())).
    catch((err) => console.log(err));

const readFileWithPromiseUtil = util.promisify(fs.readFile);
readFileWithPromiseUtil(filePath).
    then((buf) => console.log("readFileWithPromiseUtil: " + buf.toString())).
    catch((err) => console.log(err));

fs.promises.readFile(filePath).
    then((buf) => console.log("fs.promises: " + buf.toString())).
    catch((err) => console.log(err));