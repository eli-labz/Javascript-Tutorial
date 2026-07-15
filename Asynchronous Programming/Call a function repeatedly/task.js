function repeat_function(fn, interval) {
    // First, execute the function immediately
    fn();
    // Use setInterval to execute the function repeatedly
    /* Implement the call to setInterval */
    // Return a function to stop the execution
    /* return a function that allows to stop the repeated execution (using clearInterval) */
}

// Usage example:

const intervalMs = 1000; // 1 second
// Define the function to be repeated
function printMessage() {
    console.log('Executing the function...');
}

// Code demonstrating how to use the function
// You may uncomment this code for testing your implementation

// Start the repeated execution
// const stopExecution = repeat_function(printMessage, intervalMs);

// Stop the execution after 4 seconds
// const timeOutMs = 4000;
// setTimeout(() => {
//    stopExecution();
//    console.log('Execution stopped');
//}, timeOutMs);