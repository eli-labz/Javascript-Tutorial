// greedy regular expression for finding words in "..."
const greedyRegExp = /".+"/g;

const str = '"greedy" and "lazy" are different';

// We expect "greedy" and "lazy" to be matched, but it is not the case.
// Instead, the entire string  '"greedy" and "lazy"' is matched.
// The reason is that after matching the starting ", all following characters
// are matched against `.+`, until the last character. Since the string has
// finished, the matching algorithm then starts to backtrack until it finds
// another ". It finds a " as the one closing "lazy" and the match is thus
// complete.
// This mechanism is called greedy mode because the repeating `+` is
// repeated as many times as possible.
console.log(str.match(greedyRegExp));

// lazy regular expression for finding words in "..."
// When added after another quantifier, `?` switches the matching mode to lazy.
// In lazy mode, the engine tries to apply the quantifiers for as few
// characters as possible, by trying to match the rest of the pattern (e.g.
// the closing " in this case).
const lazyRegExp = /".+?"/g;
// In this case, we get "greedy" and "lazy" as expected.
console.log(str.match(lazyRegExp));

// Regular expression using anchors.
// This expression matches texts that starts with "John" and ends with "snow".
const anchorRegExp = /^John(.)+snow$/g;
console.log("John doesn't like snow: " + anchorRegExp.test("John doesn't like" +
  " snow"));
console.log("John doesn't like snow and rain: " + anchorRegExp.test("John" +
  " doesn't like snow and rain"));

// Alternation
// Regular expression for matching hours between 00:00 and 23:59
// Since RegExp objects are stateful when they contain the /g flag and since
// we do want to match each string separately, do not use the /g flag in
// this example.
const orRegExp = /([01]\d|2[0-3]):[0-5]\d/;
console.log("23:59: " + orRegExp.test("23:59"));
console.log("12:45: " + orRegExp.test("12:45"));
console.log("25:12: " + orRegExp.test("25:12"));
console.log("23:65: " + orRegExp.test("23:65"));
