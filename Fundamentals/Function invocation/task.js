// invoking a function as a function
function example1() {};
example1();
let example2 = function() {};
example2();

// invoking a function as a method
let example3 = {};
example3.test = function() {};
example3.test();

// invoking a function as a constructor
// function constructor
function example4(name) {
  this.name = name;
}
// create a new object
const myObject = new example4("John");
// myObject.name will return "John"
console.log(myObject.name);

// invoking a function via apply() or call() methods
const personFunction = {
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};
const person = {
  firstName: "John",
  lastName: "Doe"
};
// this will print "John Doe"
console.log(personFunction.fullName.apply(person));