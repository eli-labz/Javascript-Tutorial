'use strict';
let mistypeVariable;

// Assuming no global variable mistypeVarible exists,
// this line throws a ReferenceError due to the
// misspelling of "mistypeVariable" (lack of an "a").
// Without the 'use strict'; statemenet, another global variable
// named mistypeVarible is created.
mistypeVarible = 17;
