# Greedy and lazy quantifiers

It is important to understand that when a regular expression is matched with 
quantifiers, there are essentially two ways of matching the expression:
- _greedy_: match as many characters as possible.
- _lazy_: match as few characters as possible.

An example showing the difference between the two modes is given in the task 
program.

# Anchors: string start and end

The caret `^` and dollar `$` characters have a special meaning in a regular 
expression and act as anchors. 

The caret `^` matches at the beginning of the text, while the dollar `$` 
matches at the end of the text.

An example using anchors is given in the task program.

# Alternation (OR)

In regular expression, it is also possible to use `|` that acts as an "OR" 
for regular expressions.

An example using `|` is given in the task program.