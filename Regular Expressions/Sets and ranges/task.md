# Sets

Several characters or character classes inside square brackets `[...]` mean 
that matching of the regular expression is dones for any character among 
those given within `[...]`. For instance, `[abc]` means that a match is true 
for any of the `'a'`, `'b'` or `'c'` characters, with exactly one character 
in the match. This is usually called a _set_. 

Sets can be used in regular expression along with any regular character or 
character class.

# Ranges

Square brackets `[...]` may also contain character ranges, like in `[a-z]` 
(any character from `'a'` to `'z'`) or `[0-5]` (any digit from `0` to `5`). 
Ranges can also be combined like in `[a-z0-5]`.

From this perspective, some character classes are shorthands for some 
character sets:
- `\d` is the same as `[0-9]`.
- `\w` is the same as `[a-zA-Z0-9]`.
- `\s` is the same as `[\t\n\v\f\r]`.

## Excluding Ranges

It is also possible to define excluding ranges with the `[^...]` notation. 
Excluding ranges match any character _except_ the given ones. For instance,
- `[^helo]` means any character except `'h'`, `'e'`, `'l'` or `'o'`.
- `[^\s]` means any non-space character, identical to `[\S]`.

## Escaping in `[...]`

Usually for finding exactly a special character, it is required to escape it.
For instance, for finding a `'.'`, it must be escaped in the regular 
expression with `\.`. The same applies with backslash for instance, with `\\`.

Within square brackets, however, most special characters can be matched 
without escaping them, e.g. `.`, `+`, `(` or `)` do not need to be escaped.

In the task program, you need to develop a function that matches time values 
that can be expressed in the format `hours:minutes` or `hours-minutes`. Both hours 
and minutes have 2 digits, like in `09:00` or `21-30`.