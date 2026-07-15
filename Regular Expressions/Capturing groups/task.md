# Capturing groups

A part of a pattern can be enclosed in parentheses `(...)`. This is called a 
capturing group. 

Capturing groups have two effects:
-  They allow to get a part of the match as a separate item in the result 
   array of the `match()` call.
- If we apply to a quantifier to a capturing group (after the parentheses), it 
  applies to the capturing group as a whole.

Applying quantifiers to a capturing group can be demonstrated as follows. If 
we write a regular expression as `/ah+`, then it matches the letter `'a'` 
following by one or more `'h'`. If we apply the same quantifier to the 
capturing group `(ah)` with `(ah)+`, then it matches `ah`, `ahah`, `ahahah` 
and so on.

## Example: Capturing groups for simple paths

The need for matching paths names is very common. In application, very 
often the different parts of a path name needs to be captured. Let us 
start with a simplified version of path parts, that do contain only wordly 
characters, like `/users/name/orderid`. Identifying the different 
parts of the paths as `name` or `oderid` is very useful.

This can be easily accomplished using a regular expression with capturing 
groups:
```
const regExp = /users\/([\w]+)\/([\w]+)/g;
```
Each part of the path is made of repeated word characters, 
followed by a `'/'`. Each part is captured in a separate group, that can 
thus be captured separately. So `"users/john/order2 users/mary/order3".match
(regExp)` returns `[ 'users/john/order2', 'users/mary/order3' ]`.

## Getting more information on matches

As you can see from the example above, the `match()` method does not return 
the content for the capturing groups. It only returns the array of matches, 
but without any details about each match. However, we often need the content 
of the capturing groups, like in the path example.

For this purpose, we need to use the `matchAll()` method, rather than the 
`match()` method. The `matchAll()` differs from the `match()` method as 
follows: 
- it does not return an array of matches but rather an iterable object.
- when the `g` flag is present, it returns every match as an array with groups.
- if no match is found, it returns an empty iterable object rather than `null`.

The use of the `matchAll()` method is demonstrated below for the domain example:
```
const str = "users/john/order2 users/mary/order3";
let results = str.matchAll(regExp);
for (const result of results) {
  console.log(result);
}
```
Running the following example would produce the following results:
```
[                                              
  'users/john/order2',                         
  'john',                                      
  'order2',                                    
  index: 0,                                    
  input: 'users/john/order2 users/mary/order3',
  groups: undefined                            
]                                              
[                                              
  'users/mary/order3',                         
  'mary',                                      
  'order3',                                    
  index: 18,                                   
  input: 'users/john/order2 users/mary/order3',
  groups: undefined                            
]         
```

From this output, you can observe that:
- there are two matches.
- the first match is at index `0` and the second at index `18` of the input.
- both matches capture the different parts of the path, e.g. `'john'` and 
  `'order2'`.

## Named groups

Remembering groups by their name would be much easier than by their 
number/index in the regular expression. It is in fact possible by giving 
names to parentheses/capturing groups. This can be done by adding a `?
<name>` immediately after the opening parenthesis, like in 
```
const regExp = /users\/(?<user>[\w]+)\/(?<orderid>[\w]+)/g;
```
If you do so, you may then get the capturing groups as properties in the 
results returned by the `matchAll()` method
```
[                                                                     
'users/john/order2',                                                
'john',                                                             
'order2',                                                           
index: 0,                                                           
input: 'users/john/order2 users/mary/order3',                       
groups: [Object: null prototype] { user: 'john', orderid: 'order2' }
]                                                                     
[                                                                     
'users/mary/order3',                                                
'mary',                                                             
'order3',                                                           
index: 18,                                                          
input: 'users/john/order2 users/mary/order3',                       
groups: [Object: null prototype] { user: 'mary', orderid: 'order3' }
]  
```
This means that you may for instance use `groups.user` for each result 
obtained from `matchAll()`.

In the task program, you are asked to develop regular expressions using 
capturing groups for different use cases.

