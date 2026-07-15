// Develop a function matchFP that matches floating point numbers written
// as 12.456 or 12,456. The general form is x.y or x,y, where x and y
// contain one or more digits.
// matchFP("0 2 12.456 12,456 3"): returns ["12.456", "12,456"]
function matchFP(s) {
/* Write the function for matching floating point values as specified */}

// HTML colors may be specified as #ABCDEF:
// first # and then 6 hexadecimal characters.
// Example: "color:#123456" or "background-color:#AABBCC"
// Colors are specified as html attributes, separated by ;
// matchColor("color:#123456; background-color:#AABBCC") returns ["#123456",
// "#AABBCC"]
// The function must be case-insensitive.
function matchColor(s) {
    const regExp = /#[0-9A-F]{6}/gi;
    return s.match(regExp);
}