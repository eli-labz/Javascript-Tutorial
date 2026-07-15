'use strict';

function taskA() {
    console.log('taskA executed at :' + Date.now().toString());
}
function taskB() {
    console.log('taskB executed at :' + Date.now().toString());
}
const startTime = Date.now();
taskA();
let endTime = startTime;
const timeout = 5000;
while (endTime < startTime + timeout) {
    endTime = Date.now();
}
taskB();
