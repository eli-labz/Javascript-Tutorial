//  curry implementation for functions with two arguments
function curry(f) {
    return function(a) {
        return function(b) {
            return f(a, b);
        };
    };
}

// usage example
function sum(a, b) {
    return a + b;
}

// curry the function sum and use it with 1 argument at a time
const curriedSum = curry(sum);
let value = curriedSum(1)(2); // value = 3

// Another example with arrow functions.

// Define the function add with two arguments
const add = (a, b) => {
    return a + b;
};
add(1, 2); // 3

// Define the curried function that accepts 1 argument at a time
const addCurried = (a) => (b) => {
    return a + b;
};

addCurried(1)(2); // 3
