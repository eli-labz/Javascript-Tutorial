// is evaluated as "52" (string) because 2 is converted to "2" (operator + for
// strings means concatenation)
let a = "5" + 2;
console.log(a);

// is evaluated as 3 (number) because "5" is converted to 5 (no - operator for
// strings)
let b = "5" - 2;
console.log(b);

// is evaluated as 10 (number) because "5" and "2" are converted to 5 and 2
// (no * operator for strings)
let c = "5" * "2";
console.log(c);

// is evaluated as "5null" (string) because null is converted to "null"
let d = "5" + null;
console.log(d);

// is evaluated as "4undefined" (string) because undefined is converted to
// "undefined"
let e = "4" + undefined;
console.log(e);

// is evaluated as "3true" (string) because true is converted to "true"
let f = "3" + Boolean(true);
console.log(f);

// is evaluated as 5 (number) because null is converted to 0
let g = 5 + null;
console.log(g);

// is evaluated as NaN because Number(undefined) is NaN
let h = 4 + undefined;
console.log(h);

// is evaluated as 4 (because true is converted to 1)
let i = 3 + true;
console.log(i);