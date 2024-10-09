//! ============================= Error Handling in Asynchronous Code in Node.js =============================

// Error handling is crucial in any application, especially in asynchronous environments like Node.js,
// where operations are non-blocking and callback-based. In asynchronous code, errors do not propagate the
// same way they do in synchronous code, making it essential to use specific strategies for handling them.

// Subtopics and Details:
//? Error Handling in Callbacks
//? Error Handling with Promises
//? Error Handling with `async/await`
//? Catching Uncaught Exceptions
//? Handling Unhandled Promise Rejections
//? Graceful Shutdown on Errors
//? Custom Error Objects
//? Best Practices for Error Handling

//? 1. Error Handling in Callbacks
// In Node.js, asynchronous operations were originally managed with callbacks. To handle errors in callback-based
// functions, the **error-first callback** convention is used, where the first argument of the callback is reserved
// for the error object, if an error occurs.
{
  const fs = require("fs");

  // Using error-first callback
  fs.readFile("file.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    console.log("File content:", data);
  });
}

// - `err` is checked first to see if an error occurred.
// - If `err` is `null`, it proceeds to handle the data; otherwise, it logs the error and returns early.

// Pitfall: Using callbacks can lead to deeply nested code, often called **callback hell**.
// This can make the code harder to read and maintain.

//? 2. Error Handling with Promises
// Promises offer a cleaner way to manage asynchronous operations and handle errors. Instead of passing
// an error-first callback, promises use `.catch()` to handle errors.
{
  const fs = require("fs").promises;

  fs.readFile("file.txt", "utf8")
    .then((data) => {
      console.log("File content:", data);
    })
    .catch((err) => {
      console.error("Error reading the file:", err);
    });
}

// - Errors in promises are caught in the `.catch()` block.
// - Chaining Promises: Errors that occur in any part of the promise chain can be caught at the end of the chain.
{
  // Chained Example:
  fetchUserData()
    .then(processData)
    .then(saveData)
    .catch((error) => {
      console.error("Error during the process:", error);
    });
}

// If an error occurs in `fetchUserData`, `processData`, or `saveData`, it will be caught by the `.catch()`
// block at the end of the chain.

//? 3. Error Handling with `async/await`
// `async/await` is syntactic sugar over promises, making asynchronous code look and behave more like
// synchronous code. Errors in `async/await` functions can be handled using `try/catch` blocks, which
// makes error handling more readable compared to chaining `.catch()`.
{
  const fs = require("fs").promises;

  async function readFile() {
    try {
      const data = await fs.readFile("file.txt", "utf8");
      console.log("File content:", data);
    } catch (err) {
      console.error("Error reading the file:", err);
    }
  }

  readFile();
}

// - `try/catch` block is used to catch errors in the `await`ed asynchronous operations.
// - Synchronous-like flow makes the code easier to read and maintain.
{
  // Multiple `await` calls:
  async function processFiles() {
    try {
      const file1 = await fs.readFile("file1.txt", "utf8");
      const file2 = await fs.readFile("file2.txt", "utf8");
      console.log("Files:", file1, file2);
    } catch (err) {
      console.error("Error processing files:", err);
    }
  }

  processFiles();
}

// Here, errors in either `await`ed operation will be caught by the same `catch` block.

//? 4. Catching Uncaught Exceptions
// Sometimes errors slip through and are not caught by the application, causing the Node.js process
// to terminate. Node.js provides an event handler for uncaught exceptions:
{
  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1); // Exit process to avoid inconsistent state
  });
}

// - Important: Handling uncaught exceptions should be a last resort because the application might
// be in an unknown state. Always try to catch and handle errors earlier in the code.

//? 5. Handling Unhandled Promise Rejections
// In Node.js, unhandled promise rejections can cause issues. As of Node.js v15, unhandled rejections
// cause the process to terminate by default. You can handle them globally like this:
{
  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Promise Rejection:", reason);
    // Optionally, you could shut down the application gracefully
  });
}

// - Always ensure that all promises are handled by either a `.catch()` or `try/catch` block in `async/await`.

//? 6. Graceful Shutdown on Errors
// For production environments, it is good practice to gracefully shut down the application on errors
// rather than exiting abruptly. This ensures all ongoing requests are completed before shutting down.
{
  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    server.close(() => {
      process.exit(1); // Close the server and then exit
    });
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection:", reason);
    server.close(() => {
      process.exit(1);
    });
  });
}

// This ensures that the server stops accepting new connections while completing the existing ones before shutting down.

//? 7. Custom Error Objects
// You can create custom error objects to represent specific errors in your application, making it easier
// to differentiate between different error types.
{
  class DatabaseError extends Error {
    constructor(message) {
      super(message);
      this.name = "DatabaseError";
    }
  }

  function connectToDatabase() {
    throw new DatabaseError("Failed to connect to the database");
  }

  try {
    connectToDatabase();
  } catch (err) {
    if (err instanceof DatabaseError) {
      console.error("Custom Error:", err.message);
    }
  }
}

// Custom errors help to encapsulate error details and make error handling more structured and readable.

//? 8. Best Practices for Error Handling

//* Always handle errors: Always use `.catch()` for promises or `try/catch` for `async/await`.
//* Log errors: Log all errors to help with debugging and auditing.
//* Fail fast: If the application is in an unknown state after an error, exit the process to prevent further damage.
//* Graceful shutdown: Ensure the server can close properly before exiting on errors.
//* Use custom errors: Use custom error types to differentiate between different types of errors.
//* Monitor unhandled errors: Use `process.on('uncaughtException')` and `process.on('unhandledRejection')`
//* to catch and log uncaught or unhandled errors.

//? Summary of Error Handling in Asynchronous Node.js Code
// Handling errors in asynchronous Node.js code requires extra care since errors do not propagate in the same
// way as synchronous code. Whether using callbacks, promises, or `async/await`, it is essential to always catch
// and handle errors effectively.

//* Callbacks: Use error-first callback patterns to handle errors.
//* Promises: Chain `.catch()` to handle promise rejections.
//* `async/await`: Use `try/catch` blocks around `await`ed operations.
//* Unhandled Errors: Use `process.on('unhandledRejection')` and `process.on('uncaughtException')`
//* to handle errors that escape your application's regular error handling.
