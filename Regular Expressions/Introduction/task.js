// two digit number, with 'g' flag
const twoDigitRegExp = /[0-9]{2}/g;

const str1 = "12e34_56m789";
const str2 = "There_is_no_number";

// match returns an array with all matches

// should log [ '12', '34', '56', '78' ]
console.log(str1.match(twoDigitRegExp));

// should log null
console.log(str2.match(twoDigitRegExp));

// replace replaces the matches with a replacement string
// should log '11e11_11m119'
console.log(str1.replace(twoDigitRegExp, '11'));

// should leave str2 unchanged
console.log(str2.replace(twoDigitRegExp, '11'));

// should log true and false
console.log(twoDigitRegExp.test(str1));
console.log(twoDigitRegExp.test(str2));
