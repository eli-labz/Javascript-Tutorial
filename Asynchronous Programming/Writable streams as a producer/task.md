# Writable streams

**Writable streams** act as destinations to which data is sent. The basic 
concept behind all writable streams is illustrated below:

```
const fs = require('fs');
const file = fs.createWriteStream('example.txt');
myStream.write('some data');
myStream.write('some more data');
myStream.end('done writing data');
```

All writable streams implement the `stream.Writable` class, for which many 
event data handlers may be added with the `stream.on()`. Among existing events, 
it is important to point out: 

- `close`: emitted when the stream and all of its underlying resources has 
  been closed. After `'close'`, no more event will be emitted by the stream.
- `error`: emitted in case of error.
- `finish`: emitted after the `stream.end()` method has been called.

## An example
A very common use of writable streams is to act as a pipe destination as 
shown in the task program. You may run/debug this example by choosing 
"Run/Debug example.js" (Right-click on the file itself).

## Exercise
Based on the previous examples, you must write a function that reads a file 
and writes the uppercase version to another file. 