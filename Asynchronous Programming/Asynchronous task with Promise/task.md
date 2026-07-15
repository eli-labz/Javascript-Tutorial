# Practice Promise

In this exercise, you must implement an asynchronous task using the 
`Promise` mechanism.

You must modify the `job` function based on the following rules:
- The `job` function always returns a `Promise`
- If `data` is not a number, then the function returns a `Promise` object 
  that is instantly **rejected** with the data `"bad data"` (string).
- If `data` is an odd number, then the function returns a `Promise` object 
  that is **resolved** after 1 second with the data `"odd"` (string).
- If `data` is an even number, then the function returns a `Promise` object
  that is **rejected** after 2 seconds with the data `"even"` (string).