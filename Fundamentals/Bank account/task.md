# Implement a bank account using closure

In JavaScript, closures can also be used to implement object-oriented 
mechanisms, for encapsulating private data and providing methods.

In this task, you must implement a bank account based on the provided code 
skeleton. Your `bankAccount` implementation must define a function that takes 
the initial balance as argument. The `bankAccount()` function must return three 
functions named `balance`, `withdraw` and `deposit`. All functions return 
the balance after the operation. 

For implementing access to specific methods, one possible construction is 
the following
```
const myClass = function(value) {
   const value = initialValue;
   return {
     getValue: function() {
       return value;
     },
     setValue: function(newValue) {
       value = newValue;
     }
   };
}
```
One can then create an instance and use it as:
```
const instance = myClass(10);
instance.getValue();
```

Arrow functions can also be used for implementing this behavior.