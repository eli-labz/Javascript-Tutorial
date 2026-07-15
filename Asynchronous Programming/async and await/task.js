'use strict';

const doSomethingAsync = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve('I did something'), 3000);
    })
}

const doSomething = /* Add the definition of the doSomething async function using await when calling doSomethingAsync */
}

console.log('Before');
doSomething();
console.log('After');