//! ===================================== Middleware in Node.js =====================================

// Middleware in Node.js is a crucial concept for building scalable and modular applications,
// particularly when working with **Express.js** or any web framework that handles HTTP requests.
// Middleware functions are functions that have access to the **request object (req)**,
// the **response object (res)**, and the **next middleware function** in the application’s request-response cycle.

// Subtopics:
//? What is Middleware?
//? Types of Middleware
//? How Middleware Works
//? Built-in Middleware in Express.js
//? Third-Party Middleware
//? Custom Middleware
//? Error-Handling Middleware
//? Order of Middleware Execution
//? Middleware Chaining
//? Use Case: Authentication and Authorization Middleware
//? Middleware for Static Files
//? Logging Middleware
//? Performance Considerations
//? Example: Complete Express Middleware Setup

//? 1. What is Middleware?
// Middleware is a function or a series of functions that handle specific tasks during the lifecycle of an
// HTTP request. It sits between the request and the response, performing actions such as:

//* - Parsing incoming request data (e.g., JSON, URL-encoded forms).
//* - Logging requests.
//* - Authenticating users.
//* - Handling errors.

// In Express.js, middleware can be applied globally to every route or to specific routes.

// Basic Middleware Signature:
```javascript
function middlewareFunction(req, res, next) {
  // Perform action
  next(); // Proceed to the next middleware or route handler
}
```;

//? 2. Types of Middleware
//* 1. Application-Level Middleware: Applied at the app level and affects all routes or specific routes in an app.
//* 2. Router-Level Middleware: Attached to Express routers for handling route-specific logic.
//* 3. Error-Handling Middleware: Specialized middleware for catching and handling errors.
//* 4. Built-In Middleware: Middleware that comes with frameworks like Express (e.g., body-parser).
//* 5. Third-Party Middleware: External middleware provided by npm packages (e.g., `morgan`, `cors`).
//* 6. Custom Middleware: User-defined middleware for handling custom logic.

//? 3. How Middleware Works
// Middleware functions take three arguments: **req**, **res**, and **next**. When a request is made,
// it passes through each middleware function in the order they are registered. The **`next()`**
// function is crucial because it allows the request to proceed to the next middleware or the final route handler.
{
  const express = require("express");
  const app = express();

  app.use((req, res, next) => {
    console.log("Request Type:", req.method);
    next(); // Pass control to the next middleware
  });

  app.get("/", (req, res) => {
    res.send("Home Page");
  });

  app.listen(3000);
}

//? 4. Built-in Middleware in Express.js
// Express provides built-in middleware to handle common tasks:

//* 1. express.json(): Parses incoming requests with JSON payloads.
//* 2. express.urlencoded(): Parses incoming requests with URL-encoded payloads.
//* 3. express.static(): Serves static files (like HTML, CSS, images).
{
  const express = require("express");
  const app = express();

  // Built-in middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));

  app.listen(3000);
}

//? 5. Third-Party Middleware
// Third-party middleware is available from npm packages and can be used for specific functionalities
// such as logging, handling CORS, or rate-limiting.
//* 1. morgan: HTTP request logger middleware.
//* 2. cors: Enables Cross-Origin Resource Sharing.
//* 3. helmet: Helps secure Express apps by setting various HTTP headers.
{
  const express = require("express");
  const morgan = require("morgan");
  const app = express();

  // Third-party middleware
  app.use(morgan("dev"));

  app.listen(3000);
}

//? 6. Custom Middleware
// Custom middleware is user-defined middleware created to handle specific application logic.
// It’s useful for tasks like validating user inputs, managing sessions, or custom authentication.
{
  const express = require("express");
  const app = express();

  // Custom middleware
  app.use((req, res, next) => {
    console.log("Request URL:", req.url);
    next();
  });

  app.get("/", (req, res) => {
    res.send("Custom Middleware Example");
  });

  app.listen(3000);
}

//? 7. Error-Handling Middleware
// Error-handling middleware is a specialized middleware that catches errors and provides appropriate
// responses. It has four arguments: **(err, req, res, next)**.
{
  const express = require("express");
  const app = express();

  // Error-handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  });

  app.get("/", (req, res) => {
    throw new Error("Oops!"); // Triggers the error handler
  });

  app.listen(3000);
}

// - `err`: Captures the error.
// - `res.status(500)`: Sends a 500 status code for server errors.

//? 8. Order of Middleware Execution
// The order in which middleware functions are defined in the application is critical because middleware
// executes in a top-to-bottom manner. If one middleware function doesn't call `next()`, the request cycle stops.
{
  app.use((req, res, next) => {
    console.log("First middleware");
    next();
  });

  app.use((req, res, next) => {
    console.log("Second middleware");
    res.send("Request handled");
  });
}

//? 9. Middleware Chaining
// Middleware chaining refers to multiple middleware functions being executed in sequence.
// One middleware function can call the next middleware using `next()`.
{
  const middleware1 = (req, res, next) => {
    console.log("Middleware 1");
    next();
  };

  const middleware2 = (req, res, next) => {
    console.log("Middleware 2");
    next();
  };

  app.use(middleware1);
  app.use(middleware2);

  app.get("/", (req, res) => {
    res.send("Middleware Chaining");
  });
}

//? 10. Use Case: Authentication and Authorization Middleware
// Authentication middleware checks if a user is authenticated before allowing access to certain routes,
// while authorization middleware checks user permissions.
{
  const isAuthenticated = (req, res, next) => {
    if (req.user) {
      next(); // User is authenticated, proceed to the next middleware
    } else {
      res.status(401).send("Not Authenticated");
    }
  };

  const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      next(); // User is authorized, proceed to the next middleware
    } else {
      res.status(403).send("Not Authorized");
    }
  };

  app.use(isAuthenticated);
  app.use(isAdmin);
}

//? 11. Middleware for Static Files
// Express provides a built-in middleware, **`express.static()`**, to serve static files like images,
// CSS, JavaScript, and HTML files.

```javascript
app.use(express.static('public'));

// Access static file via http://localhost:3000/file.html
```;

//? 12. Logging Middleware
// Logging middleware can be used to log details about incoming requests for monitoring and debugging
// purposes. **`morgan`** is a popular logging middleware.

```javascript
const morgan = require('morgan');
app.use(morgan('combined'));
```;

//? 13. Performance Considerations
//* - Avoid Blocking Operations: Middleware should be non-blocking to prevent performance issues.
//* - Use Third-Party Middleware Sparingly: Too much third-party middleware can slow down your app.

//? 14. Example: Complete Express Middleware Setup
// Here’s a complete example of an Express app with built-in, third-party, custom, and error-handling middleware.
{
  const express = require("express");
  const morgan = require("morgan");
  const app = express();

  // Built-in middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Third-party middleware
  app.use(morgan("dev"));

  // Custom middleware
  app.use((req, res, next) => {
    console.log("Custom middleware");
    next();
  });

  // Error-handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  });

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

//? Conclusion
// Middleware in Node.js, particularly when using Express, allows you to modularize and manage the
// complexity of handling HTTP requests. It can handle tasks like request parsing, logging, authentication,
// error handling, and more. Middleware enables scalable and maintainable applications by providing a way
// to execute code before the final route handler.
