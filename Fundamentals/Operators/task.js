// no conversion, prints true
console.log(2 < 12);
// compares 2 strings, prints false
console.log("2" < "12");
// compares 2 strings, prints false
console.log("2" == "12");
// does convert "2" to Number, prints true
console.log("2" == 2);
// no conversion, prints false
console.log("2" === 2);
// 2 is not NaN, prints false
console.log(isNaN(2));
// "2" is converted to Number, prints false
console.log(isNaN("2"));

let user;
// Anonymous (user not defined)
console.log(user ?? "Anonymous");
user = "John";
// John (user defined)
console.log(user ?? "Anonymous");
// difference between || and ??
user = "";
console.log(user ?? "Anonymous");
console.log(user || "Anonymous");
