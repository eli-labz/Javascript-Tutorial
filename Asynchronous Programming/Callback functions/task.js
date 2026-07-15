'use strict';

const myTimeout = setTimeout(sayHello, 5000);

console.log("Hello World now!");

function sayHello() {
    console.log("Hello World after timeout!");
}