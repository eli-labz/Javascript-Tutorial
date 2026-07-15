function logMessage1(msg) {
    console.log(msg);
}
logMessage1("this is a test");

let tag = "Message tag: ";

logMessage2("test 1");
function logMessage2(msg) {
    console.log(tag + msg);
    tag = "New tag: ";
}
logMessage2("test 2");

// declare and define the function
// at this point, the function is not executed!
let functionExpression = function() {
    console.log("this is a function expression");
};

// invoke the function
functionExpression();