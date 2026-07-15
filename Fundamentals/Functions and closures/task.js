// Demonstrating access to outer variables
let counter = 0;
function incCounter() {
    counter++;
}
incCounter();
incCounter();
console.log(counter); // should log "2"

// Demonstrating inner functions and access to outer variables
let lastName = "Doe";
function greetings(firstName) {
    const separator = " ";
    function sayHello() {
        console.log("Hello " + firstName + separator + lastName);
    };
    function sayGoodbye() {
        console.log("Goodbye " + firstName + separator + lastName);
    }
    sayHello();
    sayGoodbye();
}
greetings("John");

// demonstrating closures
function makeGreetings(firstName) {
    const separator = " ";
    return function(lastName) {
        console.log("Greetings " + firstName + separator + lastName);
    }
}
const greetingsFunc = makeGreetings("John");
greetingsFunc("Doe");
