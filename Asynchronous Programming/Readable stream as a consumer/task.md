# Readable streams 

**Readable streams** can operate in one of two modes:
- flowing: data is read automatically and provided to the application as 
  soon as it enters this mode and continuously.
- paused: the `stream.read()` method must be called explicitly for reading 
  chunks of data from the source and delivering it to the application.

## Register for events
Events will be generated when manipulating a `ReadableStream` object. One 
may register callback function for different types of events. This can be 
done by using the `stream.on()` method, for instance for:
- `data` event: is emitted whenever a chunk of data is read.
- `end` event: is emitted when all data has been read.
- `readable` event: is emitted when the stream is in paused mode and when it 
  is ready for reading.
- `pipe` event: is emitted when the stream is in flowing mode and has started 
  to pipe data.

This list is not exhaustive and one should look at the documentation 
[Readable Stream] (https://nodejs.org/api/stream.html#readable-streams) for 
a complete description. 

## Flowing mode
Flowing mode is started automatically, when: 
- a `'data'` event handler is added to the readable stream.
- the `stream.pipe()` method is called for sending the data to a writable 
  stream.
- the `stream.resume()` method is called.

## Paused mode
For switching back to the paused mode, one can:
- call the `stream.pause()` method, if there is no pipe destination.
- calling the `stream.unpipe()` method, for stopping piping to a destination.

In any case, a mechanism for consuming data must be provided to the readable 
stream, otherwise it will not generate any data. Also, usually one mode of 
consuming data should be chosen and mixing between the two modes is not very 
common.

## Exercise
In the task program, examples of using readable streams in different ways 
are given.