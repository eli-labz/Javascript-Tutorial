# Character classes

A character class is a special notation that allows to match any symbol from 
a certain set.

There are several character classes supported for regular expressions:
- the "digit" class: written as `\d` and corresponding to any single digit.
- the "space" class: written as `\s` and corresponding to any space symbol 
  including spaces, tabs `\t`, newlines `\n` and few other rare 
  characters, such as `\v`, `\f` and `\r`.
- the "word" class: written as `\w` and corresponding to any “wordly” 
  character: either a letter of Latin alphabet or a digit or an underscore `'_'`. 
  Non-Latin letters (like cyrillic or hindi) do not belong to `\w`.
- For every character class there exists an “inverse class”, denoted with 
  the same letter, but uppercased. For instance `\D` denotes all "non-digit" 
  characters (all characters except any "digit").
- A dot `'.'` is a special character class that matches “any character except 
  a newline”.

For instance `\d\s\w` means one “digit” followed by one “space character” 
followed by one “wordly character”, such as `'a'`. Or `\D\w` means one 
"non-digit" followed by one "wordly" character.

In the task program, you must develop a function that returns true when its 
argument matches a Swiss phone number, written as `'079 999 99 99'`.

## **Important**

When using the constructor function, the normal string escape rules
(preceding special characters with \'\\' when included in a string) are 
necessary. This means that `const regExp = /\w/;` must be written as `const 
regExp = new RegExp('\\w');` for instance.  
