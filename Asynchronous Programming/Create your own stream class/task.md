# Create your own Stream class

The Node.js API makes it possible for developers to implement their own 
stream classes, by extending one of the four basic stream classes:
- `stream.Writable`
- `stream.Readable`
- `stream.Duplex`
- `stream.Transform`

## Extending existing classes

When extending these classes, the developer must then implement specific 
methods, depending on each classe, as shown in the table below:

| Use-case                                      | Class     | Method(s) to implement                  |
|:----------------------------------------------|:----------|:----------------------------------------|
| Reading only                                  | Readable  | _read()                                 |
| Writing only                                  | Writable  | _write(), _writev(), _final()           |
| Reading and writing                           | Duplex    | 	_read(), _write(), _writev(), _final() |
| Operate on written data, then read the result | Transform | _transform(),                           |
| _flush(), _final()                            |           |                                         |

Explaining how each specific class may be extended is beyond the scope of 
this task. The task program demonstrates the implementation of a `Transform` 
stream, which are of particular interest in the scope of this lecture. 

## Transform streams
`Transform` streams are `Duplex` streams, so they can both read and write 
data by implementing both the `Readable` and `Writable` classes. In addition,
with `Transform` streams the stream output is computed (in the `_transform` 
method) from the stream input. Examples of `Transform` streams are streams 
that compress or encrypt the input.

When implementing a custom `Transform` stream class, one must implement the 
`Transform._transform()` method and may also implement the `Transform._flush
()` method. This is demonstrated in the task program for a custom 
`Transform` class that implements a very basic encoding.

## Exercice

In this exercice, you must complete the `_transform` method of the 
`Vigenere` class.

## Object mode
it is important to point out that all streams created by the Node.js APIs 
operate exclusively on strings and `Buffer` (or `Uint8Array`) objects. It is 
possible, however, for stream implementations to work with other types of 
JavaScript values (with the exception of `null`, which serves a special 
purpose within streams). Such streams are considered to operate in "object mode".

Stream instances are switched into object mode using the `objectMode` option 
when the stream is created. Attempting to switch an existing stream into 
object mode is not safe.
