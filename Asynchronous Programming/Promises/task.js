'use strict';

let promiseSuccess = new Promise(function(resolve, reject) {
    // the function is executed automatically when the promise is constructed

    // after 1 second signal that the job is done with the result "done"
    setTimeout(() => resolve("done"), 1000);
});

let promiseError = new Promise(function(resolve, reject) {
    // after 1 second signal that the job is finished with an error
    setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// Examples for using the promises defined above are given below
promiseSuccess.then(
  // handle a successful result
  result => console.log(`Cool, promiseSuccess was successful: ${result}`),
  // handle an error
  error => console.log(`Bad, promiseSuccess failed: ${error}`)
);

promiseError.then(
  // handle a successful result
  result => console.log(`Cool, promiseError was successful: ${result}`),
  // handle an error
  error => console.log(`Bad, promiseError failed: ${error}`)
);

// other possible ways of using the promise objects

// one can also use the .then(null, f) or equivalent catch(f) syntax
promiseError.catch(error => console.log(`Bad, promiseError failed: ${error}`));

// one can also use the finally syntax, by passing through
// results and errors to the next handler
promiseSuccess.
    finally(() => console.log('promiseSuccess done')).
    then(result => console.log(`Cool, promise was successful: ${result}`));

promiseError.
    finally(() => console.log('promiseError done')).
    catch(error => console.log(`Bad, promise failed: ${error}`));

