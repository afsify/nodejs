//! ===================================== Promise in Node.js =====================================

// A **Promise** is a modern JavaScript feature used to handle asynchronous operations.
// In Node.js, Promises provide a cleaner and more structured way to deal with asynchronous tasks
// compared to callbacks, helping avoid "callback hell." A Promise represents an operation that
// hasn't completed yet but is expected to complete in the future. It can either be fulfilled
// (operation successful) or rejected (operation failed).

// Subtopics and Details:

//? What is a Promise?
//? States of a Promise
//? Creating a Promise
//? Chaining Promises
//? Promise Methods: `then()`, `catch()`, `finally()`
//? Error Handling in Promises
//? Promise.all
//? Promise.race()
//? Promise.any() and Promise.allSettled()
//? Converting Callback-Based Functions to Promises
//? Promise vs Callback
//? Promise Example in Node.js

//? 1. What is a Promise?
// A Promise in Node.js is an object that represents the eventual completion (or failure) of an
// asynchronous operation and its resulting value. It provides a cleaner alternative to callbacks
// by chaining methods and handling both success and failure in an organized manner.

// Promises have three primary components:
//* Pending: The initial state, neither fulfilled nor rejected.
//* Fulfilled: The operation completed successfully, and the promise has a result.
//* Rejected: The operation failed, and the promise has an error.
{
  const myPromise = new Promise((resolve, reject) => {
    let success = true;

    if (success) {
      resolve("Operation Successful!");
    } else {
      reject("Operation Failed!");
    }
  });

  myPromise
    .then((result) => {
      console.log(result); // Outputs: Operation Successful!
    })
    .catch((error) => {
      console.error(error);
    });
}

//? 2. States of a Promise
// A Promise has three states:
//* Pending: The promise is still waiting for the operation to finish.
//* Fulfilled: The promise has successfully completed its operation.
//* Rejected: The promise failed and returned an error.

// Once a Promise is either fulfilled or rejected, its state becomes settled, and it cannot change states again.
{
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Success");
    }, 1000);
  });

  console.log(promise); // Initially: Promise { <pending> }
  promise.then((data) => console.log(data)); // After 1 sec: Success
}

//? 3. Creating a Promise
// To create a Promise, use the `new Promise()` constructor, passing a function with two arguments:
// `resolve` and `reject`. These are callbacks used to indicate whether the operation was successful or failed.
{
  const myPromise = new Promise((resolve, reject) => {
    const dataFetched = true;

    if (dataFetched) {
      resolve("Data fetched successfully");
    } else {
      reject("Failed to fetch data");
    }
  });
}

//? 4. Chaining Promises
// Promises allow chaining of `then()` methods to handle sequences of asynchronous tasks.
// The return value of one `.then()` can be passed as input to the next one.
{
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(10), 1000);
  });

  promise
    .then((result) => {
      console.log(result); // Outputs: 10
      return result * 2;
    })
    .then((result) => {
      console.log(result); // Outputs: 20
      return result * 3;
    })
    .then((result) => {
      console.log(result); // Outputs: 60
    });
}

//? 5. Promise Methods: `then()`, `catch()`, `finally()`
//* then(): Used to handle the resolved value of a Promise. It accepts two callbacks, one for success and one for failure.
//* catch(): Used to handle errors in the Promise chain.
//* finally(): Executes code after the Promise has been settled, regardless of whether it was fulfilled or rejected.
{
  myPromise
    .then((result) => console.log(result)) // Handles success
    .catch((error) => console.error(error)) // Handles failure
    .finally(() => console.log("Operation complete")); // Always runs
}

//? 6. Error Handling in Promises
// Promises offer a more structured way of handling errors compared to callbacks.
// The `catch()` method is used to handle errors, and it will catch errors occurring anywhere in the promise chain.
{
  const faultyPromise = new Promise((resolve, reject) => {
    reject("Something went wrong!");
  });

  faultyPromise
    .then((data) => console.log(data))
    .catch((error) => console.error("Caught an error:", error)); // Outputs: Caught an error: Something went wrong!
}

// Errors in a `.then()` block can also be caught in a `.catch()` block later in the chain.
{
  const myPromise = new Promise((resolve) => {
    resolve("Success");
  });

  myPromise
    .then((data) => {
      console.log(data);
      throw new Error("An unexpected error!");
    })
    .catch((error) => console.error("Error:", error.message)); // Outputs: Error: An unexpected error!
}

//? 7. `Promise.all()`
// `Promise.all()` accepts an array of promises and resolves when all the promises are fulfilled.
// If any promise is rejected, it immediately rejects.
{
  const promise1 = Promise.resolve(3);
  const promise2 = new Promise((resolve) => setTimeout(resolve, 1000, "foo"));
  const promise3 = Promise.resolve(42);

  Promise.all([promise1, promise2, promise3])
    .then((values) => {
      console.log(values); // Outputs: [3, 'foo', 42]
    })
    .catch((error) => console.error("Error:", error));
}

//? 8. `Promise.race()`
// `Promise.race()` returns a Promise that resolves or rejects as soon as one of the promises in the array settles.
{
  const promise1 = new Promise((resolve) => setTimeout(resolve, 100, "First"));
  const promise2 = new Promise((resolve) => setTimeout(resolve, 500, "Second"));

  Promise.race([promise1, promise2]).then((value) => console.log(value)); // Outputs: 'First'
}

//? 9. `Promise.any()` and `Promise.allSettled()`
//* Promise.any(): Resolves as soon as any of the input promises is fulfilled. If all promises are rejected, it rejects.
//* Promise.allSettled(): Resolves once all promises have either fulfilled or rejected, and returns an array of their results.
{
  // Example (`Promise.allSettled()`):
  const promises = [
    Promise.resolve("Success"),
    Promise.reject("Error"),
    Promise.resolve("Another success"),
  ];

  Promise.allSettled(promises).then((results) => console.log(results));
  /* 
Outputs: 
[ { status: 'fulfilled', value: 'Success' },
  { status: 'rejected', reason: 'Error' },
  { status: 'fulfilled', value: 'Another success' } ]
*/
}

//? 10. Converting Callback-Based Functions to Promises
// In Node.js, many older APIs use callbacks. You can convert these callback-based functions to promises
// using the `Promise` constructor or the `util.promisify()` method.
{
  // Example (Manual Conversion):
  function fetchData(callback) {
    setTimeout(() => {
      callback(null, "Data fetched");
    }, 1000);
  }

  function fetchDataPromise() {
    return new Promise((resolve, reject) => {
      fetchData((err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  fetchDataPromise()
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

//? 11. Promise vs Callback
// Promises provide a more elegant way to handle asynchronous operations compared to callbacks.
// Promises help avoid "callback hell" by flattening the structure and allowing chaining.
// Promises also support better error handling using `catch()`, whereas in callbacks,
// you need to check for errors manually in each callback.
{
  // Callback Version:
  function fetchData(callback) {
    setTimeout(() => callback(null, "Data fetched"), 1000);
  }

  fetchData((err, data) => {
    if (err) return console.error(err);
    console.log(data);
  });

  // Promise Version:
  function fetchDataPromise() {
    return new Promise((resolve) => {
      setTimeout(() => resolve("Data fetched"), 1000);
    });
  }

  fetchDataPromise()
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
}

//? 12. Promise Example in Node.js
// A common use case for Promises in Node.js is handling asynchronous operations like file reading,
// HTTP requests, or database queries.
{
  //? Example (Using Promises with `fs.promises`):
  const fs = require("fs").promises;

  fs.readFile("example.txt", "utf8")
    .then((data) => console.log("File content:", data))
    .catch((err) => console.error("Error reading file:", err));
}
