# Quantifiers

In the introduction, we demonstrated the use of a simple quantifier `{2}` for 
matching two-digit numbers:

```
const twoDigitRegExp = /[0–9]{2}/;
```

In general, when we need to specify how many times a character needs to be 
matched, we can append a _quantifier_ to a character, character class or 
character set. 

The simplest quantifier is a number in curly braces `{n}`, which specifies 
the exact count. There are also more advanced forms, like: 
- a range, specified as `{n1, n2}` that matches between `n1` and `n2` times.
- `+`, that means one or more, identical to `{1,}`.
- `?`, that means zero or one, identical to `{0,1}`.
- `*`, that means zero or more, identical to `{0,}`

In the task program, you must develop a few functions that use quantifiers.
