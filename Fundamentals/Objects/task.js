// Object creation

// "object constructor" syntax
let user1 = new Object();
// "object literal" syntax
let user2 = {};

// Properties can be added at creation time
let user3 = {
    // property with name "name" and value "Joe" (string)
    name: "Joe",
    // property with name "age" and value 30 (Number)
    age: 30
}

// access properties
// prints undefined
console.log("User name is " + user2.name);
// prints "Joe"
console.log("User name is " + user3.name);
// properties can also be accessed using the [] operator
// in this case the key value must be expressed as a string value
console.log("User name is " + user3["name"]);

// properties can be added after object creation
user2.name = "Jane";
console.log("User name is " + user2.name);

// properties can also be removed
delete user2.name;
console.log("User name is " + user2.name);

// it is possible to iterate over properties of an object
for (let key in user3) {
    console.log("property " + key + " has value " + user3[key]);
}

// create a method for object user3
user3.print = function() {
    // this refers to the object on which print is called
    console.log("User " + this.name + " is " + this.age + " years old");
}
// when calling print(), this refers to the object user3
user3.print();