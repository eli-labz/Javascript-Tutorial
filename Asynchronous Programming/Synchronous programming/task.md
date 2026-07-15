# Synchronous programming

For a better understanding of what synchronous and asynchronous programming 
means, we may illustrate the difference with a simple example. 

Say that we simply want to execute `taskA` and wait for a given amount of 
time before accomplishing `taskB`. Implementing the wait can be done in 
either **_synchronous_** or **_asynchronous_** mode. The synchronous mode is 
illustrated in the task program. 

## This way of doing is bad

Essentially, what this code does is a busy wait between the execution of the two
tasks. The wait is implemented by constantly checking the system time and
exiting the `while()` loop as soon as the required time has elapsed. Waiting 
may not hurt in this particular case, but of course the wait is preventing 
other tasks from being executed. 

Doing such blocking calls has a strong impact on the overall performance of 
Node.js applications, and it is a very bad practice in such cases.
