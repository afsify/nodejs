//! ===================================== Routing in Node.js =====================================

// Routing in Node.js, particularly when using **Express.js**, refers to determining how an application
// responds to a client request at a particular **endpoint** (a specific URL) and **HTTP method**
// (GET, POST, PUT, DELETE, etc.). It is a core feature in web frameworks and is essential for
// handling different requests from clients and responding with the appropriate resources.

// Subtopics:
//? What is Routing?
//? Basic Routing
//? Route Methods
//? Route Paths
//? Route Parameters
//? Query Strings in Routes
//? Chained Route Handlers
//? Route Groups
//? Handling 404 Errors
//? Router-Level Middleware
//? Express Router
//? Route Redirection
//? Example: Full Routing Setup

//? 1. What is Routing?
// Routing refers to how web servers map URLs to specific functions in the application. When a user
// visits a specific URL (like `/home` or `/about`), the routing system directs that request to the
// appropriate controller or handler.

// Routing is important for building RESTful APIs, dynamic web pages, and microservices.

//? 2. Basic Routing
// In Express.js, the `app.get()`, `app.post()`, and similar methods define routes for specific HTTP methods.
// Each route requires:
//* 1. HTTP Method: Defines the type of request (GET, POST, etc.).
//* 2. URL Path: The path or endpoint being accessed (e.g., `/about`, `/users`).
//* 3. Callback Function: Code executed when the route is accessed.
{
  const express = require("express");
  const app = express();

  // Basic GET route
  app.get("/", (req, res) => {
    res.send("Welcome to Home Page");
  });

  // Basic POST route
  app.post("/submit", (req, res) => {
    res.send("Form submitted");
  });

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
}

//? 3. Route Methods
// Express provides methods that correspond to HTTP methods, such as **GET**, **POST**, **PUT**, **DELETE**, etc.
//* - GET: Retrieve data.
//* - POST: Submit data to the server.
//* - PUT: Update existing data.
//* - DELETE: Remove data.
{
  app.get("/users", (req, res) => {
    res.send("Retrieve users");
  });

  app.post("/users", (req, res) => {
    res.send("Create a user");
  });

  app.put("/users/:id", (req, res) => {
    res.send(`Update user with ID ${req.params.id}`);
  });

  app.delete("/users/:id", (req, res) => {
    res.send(`Delete user with ID ${req.params.id}`);
  });
}

//? 4. Route Paths
// Route paths define the structure of the URL for which the handler will be invoked.
// Paths can include fixed strings and dynamic values.

// - Static Paths: Fixed routes like `/home`, `/about`.
// - Dynamic Paths: Use parameters or wildcards, such as `/users/:id`.
{
  // Static path
  app.get("/about", (req, res) => {
    res.send("About Page");
  });

  // Dynamic path with parameter
  app.get("/users/:id", (req, res) => {
    res.send(`User ID: ${req.params.id}`);
  });
}

//? 5. Route Parameters
// Route parameters allow you to capture values embedded in the URL, which can be accessed using **req.params**.
// These parameters can be used to build dynamic routes.
{
  app.get("/products/:productId", (req, res) => {
    const productId = req.params.productId;
    res.send(`Product ID: ${productId}`);
  });
}

{
  // You can also define multiple parameters:
  app.get("/categories/:categoryId/products/:productId", (req, res) => {
    const { categoryId, productId } = req.params;
    res.send(`Category: ${categoryId}, Product: ${productId}`);
  });
}

//? 6. Query Strings in Routes
// Query strings are part of the URL that comes after a question mark `?` and are typically used for filters,
// pagination, and searches. These values are accessed using **req.query**.
{
  app.get("/search", (req, res) => {
    const query = req.query.q; // Accessing query string `q`
    res.send(`Search query: ${query}`);
  });
}

// If you visit `/search?q=nodejs`, it will output `Search query: nodejs`.

//? 7. Chained Route Handlers
// Multiple callback functions can handle a single route. These functions are executed in sequence using
// the **next()** function.
{
  app.get(
    "/middleware",
    (req, res, next) => {
      console.log("First middleware");
      next(); // Pass to next handler
    },
    (req, res) => {
      res.send("Second middleware");
    }
  );
}

//? 8. Route Groups
// You can group routes with a common path by using **router** or **express.Router()** to create route modules.
{
  const express = require("express");
  const app = express();
  const router = express.Router();

  // Define routes
  router.get("/login", (req, res) => {
    res.send("Login Page");
  });

  router.get("/register", (req, res) => {
    res.send("Register Page");
  });

  // Use the router in the main app
  app.use("/auth", router);

  app.listen(3000);
}

// This creates the routes `/auth/login` and `/auth/register`.

//? 9. Handling 404 Errors
// To handle cases where no route matches, you can use a "catch-all" route or middleware to send a 404 response.
{
  app.use((req, res) => {
    res.status(404).send("Page Not Found");
  });
}

//? 10. Router-Level Middleware
// Express allows router-level middleware to handle logic specific to groups of routes. This enables cleaner, modular code.
{
  const express = require("express");
  const app = express();
  const router = express.Router();

  // Middleware for specific routes
  router.use((req, res, next) => {
    console.log("Middleware for /admin routes");
    next();
  });

  router.get("/dashboard", (req, res) => {
    res.send("Admin Dashboard");
  });

  app.use("/admin", router);

  app.listen(3000);
}

//? 11. Express Router
// Express Router allows you to create modular route handlers that can be mounted as middleware.
// It is useful for creating sub-applications with their own set of routes.
{
  const express = require("express");
  const router = express.Router();

  // Define a set of routes for the 'users' endpoint
  router.get("/", (req, res) => {
    res.send("List of users");
  });

  router.get("/:id", (req, res) => {
    res.send(`User with ID: ${req.params.id}`);
  });

  // Mount the router on the app
  app.use("/users", router);
}

//? 12. Route Redirection
// You can redirect routes to another URL or path using **res.redirect()**.
{
  app.get("/old-page", (req, res) => {
    res.redirect("/new-page");
  });
}

//? 13. Example: Full Routing Setup
// Here’s a complete example of how to set up routes in an Express.js application:
{
  const express = require("express");
  const app = express();

  // Static route
  app.get("/", (req, res) => {
    res.send("Home Page");
  });

  // Dynamic route
  app.get("/users/:id", (req, res) => {
    res.send(`User ID: ${req.params.id}`);
  });

  // Query string
  app.get("/search", (req, res) => {
    res.send(`Search query: ${req.query.q}`);
  });

  // Handle 404 errors
  app.use((req, res) => {
    res.status(404).send("Page Not Found");
  });

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
}

//? Conclusion
// Routing in Node.js with Express.js enables you to handle various HTTP methods, define dynamic paths,
// work with query strings, and create modular route handling. Understanding how to organize routes properly
// leads to more scalable, maintainable web applications and APIs. With powerful tools like **Express Router**
// and **middleware**, Node.js routing is highly flexible and customizable to fit different use cases.
