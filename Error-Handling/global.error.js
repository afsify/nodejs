//! =================================== Global Error Handling in Node.js ===================================

// Global error handling is a critical aspect of building resilient and stable applications in Node.js.
// Errors can occur at various stages, and effectively handling them ensures the application remains robust.
// Node.js offers mechanisms to catch and handle both synchronous and asynchronous errors globally.

// Subtopics and Details:
//? Synchronous Error Handling
//? Asynchronous Error Handling
//? `process.on('uncaughtException')`
//? `process.on('unhandledRejection')`
//? Express Error Middleware (for Express apps)
//? Global Error Handlers in Asynchronous Code
//? Best Practices for Global Error Handling
//? Error Logging and Reporting

//? 1. Synchronous Error Handling
// In synchronous code, errors can be caught using the `try-catch` block. This is the most straightforward
// method of error handling in JavaScript.
{
  try {
    throw new Error("Something went wrong!");
  } catch (error) {
    console.error("Caught error:", error.message);
  }
}

// In this example, the error is caught and logged. This ensures that the application doesn’t crash due to
// unhandled exceptions in synchronous code.

//? 2. Asynchronous Error Handling
// Handling errors in asynchronous code is more complex due to the non-blocking nature of Node.js.
// In callbacks, errors are usually passed as the first argument (`err`), while in promises or `async/await`,
// special handling is needed.
{
  // Example (Callbacks):
  const fs = require("fs");

  fs.readFile("nonexistent-file.txt", (err, data) => {
    if (err) {
      console.error("Error reading file:", err.message);
      return;
    }
    console.log(data.toString());
  });
}

// Here, `fs.readFile` expects an error-first callback. If the file doesn't exist, the error is passed to `err`,
// and it’s handled in the callback.
{
  // Example (Promises):
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      reject(new Error("Failed to fetch data"));
    });
  };

  fetchData()
    .then((data) => console.log(data))
    .catch((err) => console.error("Caught error:", err.message));
}

// In promises, `.catch()` is used to handle errors, ensuring the error is not unhandled.

{
  // Example (Async/Await):
  async function fetchData() {
    try {
      let data = await someAsyncFunction();
      console.log(data);
    } catch (err) {
      console.error("Caught error:", err.message);
    }
  }

  fetchData();
}

// With `async/await`, the `try-catch` block is used to handle errors in asynchronous code.

//? 3. `process.on('uncaughtException')`
// The `uncaughtException` event is a global mechanism that handles uncaught exceptions in synchronous code.
// When an exception occurs but is not caught by any `try-catch` block, Node.js triggers this event.
{
  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err.message);
    process.exit(1); // Exit the process after handling the error
  });

  throw new Error("This error is uncaught!");
}

// - Usage: This is a last-resort mechanism to prevent the app from crashing unexpectedly. However,
// it's recommended to avoid using `uncaughtException` for regular error handling because the application
// state may be compromised.

// - Best Practice: Log the error and restart the application, or handle critical cleanup tasks before exiting.

//? 4. `process.on('unhandledRejection')`
// In asynchronous code, if a promise is rejected and no `.catch()` handler is provided, Node.js emits
// the `unhandledRejection` event. This is the asynchronous equivalent of `uncaughtException`.
{
  process.on("unhandledRejection", (reason, promise) => {
    console.error(
      "Unhandled Rejection at:",
      promise,
      "reason:",
      reason.message
    );
    process.exit(1); // Exit the process after logging the error
  });

  Promise.reject(new Error("Promise rejected but not caught!"));
}

// - Usage: Like `uncaughtException`, `unhandledRejection` should be used to handle uncaught promise rejections.
// It’s advisable to log these rejections and take necessary actions, like shutting down the app or cleaning up resources.

// - Best Practice: Always provide `.catch()` for all promises, or use proper error handling in `async/await` functions.

//? 5. Express Error Middleware (for Express Apps)
// In Express applications, global error handling is often managed via custom error-handling middleware.
// This middleware catches errors and sends appropriate responses to the client.
{
  const express = require("express");
  const app = express();

  // Sample route
  app.get("/", (req, res) => {
    throw new Error("An error occurred");
  });

  // Global Error Middleware
  app.use((err, req, res, next) => {
    console.error("Error occurred:", err.message);
    res.status(500).send("Internal Server Error");
  });

  app.listen(3000, () => console.log("Server running on port 3000"));
}

// - Usage: This middleware catches errors thrown in any route or middleware in the Express app.
// The error is passed as the first argument (`err`), allowing centralized error handling for the entire app.

// - Best Practice: Structure the error middleware to log errors and send user-friendly messages,
// without exposing sensitive information.

//? 6. Global Error Handlers in Asynchronous Code
// In asynchronous code, uncaught exceptions are often a result of missed promise rejections or
// unhandled async errors. Node.js provides hooks for globally handling these exceptions,
// like `unhandledRejection` and `uncaughtException`.

// However, beyond these events, frameworks like Express and libraries like **domain** and **async_hooks**
// can also help with handling errors in more complex asynchronous workflows.

//? 7. Best Practices for Global Error Handling
// Graceful Shutdown: When using global error handlers (`uncaughtException` and `unhandledRejection`),
// it's critical to perform a graceful shutdown of your application. This involves closing connections,
// cleaning up resources, and logging errors before exiting.
{
  process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    // Clean up resources and close connections
    process.exit(1); // Exit with a failure code
  });
}

//* Avoid Silent Failures: Always handle promise rejections with `.catch()` and use `try-catch` blocks
//* around asynchronous code to avoid silent failures.

//* Error Monitoring: Use error monitoring tools like **Sentry**, **Winston**, or **Loggly** to
//* track global errors in production. These tools provide real-time error logging and reporting.

//* Error Boundaries: In larger applications, implement error boundaries to segment error
//* handling for different components or services.

//? 8. Error Logging and Reporting
// A key part of global error handling is logging errors for later analysis.
// Use structured logging libraries such as **Winston** or **Bunyan** to log errors with important metadata
// (timestamp, error stack, request info, etc.).
{
  // Example (Winston):
  //! npm install winston

  const winston = require("winston");

  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "errors.log" }),
    ],
  });

  process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception:", err);
    process.exit(1);
  });
}

// This logs all uncaught exceptions to both the console and a file.

//? Summary of Global Error Handling in Node.js

//* Synchronous code: Use `try-catch` blocks to handle synchronous errors.
//* Asynchronous code: Handle errors using callbacks, `.catch()` in promises, or `try-catch` in `async/await`.
//* Global error events:
//*  - `uncaughtException` handles uncaught exceptions in synchronous code.
//*  - `unhandledRejection` handles unhandled promise rejections in asynchronous code.
//* Express error middleware: Centralized error handling for Express applications.
//* Error logging: Use tools like **Winston** for structured error logging and error monitoring tools like **Sentry** for tracking errors in production.
//* Best practices: Always handle errors gracefully, avoid silent failures, and restart the application if necessary after handling critical errors.
