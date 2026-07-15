'use strict';

function taskA() {
    console.log('taskA executed at :' + Date.now().toString());
}
function taskB() {
    console.log('taskB executed at :' + Date.now().toString());
}
taskA();
const timeout = 5000;
setTimeout(taskB, timeout);