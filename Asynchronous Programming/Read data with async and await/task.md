# Read data using the `async/await` mechanism

## `getFirstUserData` function
Given the "users.json" file, you must implement the `getFirstUserData` function 
that return the information about the first user.

The following operations must be accomplished in the promise chain:
1. The data is read from the file using `fs.promises.readFile`
2. The data read from the file is parsed using `JSON.parse()`
3. The first user is picked from the list of users
4. The function returns a `Promise` that is resolved with the user info.
5. In case of error, the function returns a `Promise` that is rejected with 
   the error info. All possible errors must also be handled using a single 
   `catch` statement. 

## `getFirstUserDataAsync` function
Once you have written the `getFirstUserData` function using promises, write 
the equivalent function using the `async/await` construction.

The use of the `await`/`async` syntax makes the code look like more synchronous
code. It thus makes it easier to debug since breakpoints can be positioned on
each line of code in an easier way than with promises.

## Error handling
Note that in both cases (promises or `await`/`async`), one should use
the `reject()` mechanism rather than the `throw new Error(`) mechanism for
generating errors. 
