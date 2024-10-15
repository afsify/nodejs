//! ===================================== RESTful API Design in Node.js =====================================

// A RESTful API (Representational State Transfer) is an architectural style that provides guidelines for
// designing networked applications. It uses HTTP requests to perform CRUD (Create, Read, Update, Delete)
// operations. In a Node.js context, RESTful APIs are typically built using the **Express.js** framework,
// which simplifies handling HTTP requests and responses.

// Subtopics:
//? What is a RESTful API?
//? Key Concepts in RESTful API Design
//? Principles of RESTful API Design
//? Setting Up a RESTful API in Node.js
//? Route Handling in RESTful APIs
//? CRUD Operations in RESTful APIs
//? Middleware in RESTful APIs
//? Handling Errors in RESTful APIs
//? Authentication and Authorization
//? Versioning RESTful APIs
//? Response Formats (JSON/XML)
//? Pagination and Filtering
//? REST API Best Practices
//? RESTful API Example in Node.js

//? 1. What is a RESTful API?
// REST (Representational State Transfer) is an architectural style used for web services. It is based on
// stateless communication and leverages standard HTTP methods to perform operations on resources.
// Each resource in REST is represented by a unique URL (Uniform Resource Locator), and resources
// are typically represented in JSON format.

// Key HTTP Methods:
//* - GET: Retrieve data from the server.
//* - POST: Create new data on the server.
//* - PUT: Update existing data on the server.
//* - DELETE: Delete data from the server.

//? 2. Key Concepts in RESTful API Design
//* - Resources: Each entity (such as a user, product, or order) is represented as a resource and is accessed using a URL (e.g., `/users`, `/products`).
//* - Stateless: Every request is independent. The server does not retain session information between requests.
//* - Representation: Resources are typically represented in **JSON** or **XML** format.
//* - Idempotency: Certain methods (e.g., GET, PUT, DELETE) should always result in the same server state, no matter how many times they are invoked.

//? 3. Principles of RESTful API Design
// - Resource-based URL: Each resource should have its own unique URL, which follows a simple, predictable, and hierarchical structure. For example:
//   - `/users` → Returns all users
//   - `/users/1` → Returns the user with ID 1
// - Stateless communication: Each HTTP request from a client to the server must contain all the information needed to process the request. No session data is stored on the server.
// - HTTP Methods: Utilize the correct HTTP method for each type of operation (GET, POST, PUT, DELETE).
// - Uniform Interface: Ensure that the API is consistent in terms of naming conventions, request/response formats, and usage patterns.

//? 4. Setting Up a RESTful API in Node.js
// To create a RESTful API in Node.js, you'll commonly use Express.js, a web framework that simplifies building web servers.

// Installation of Express.js:
//! npm install express
{
  // Basic Express Setup:
  const express = require("express");
  const app = express();

  app.use(express.json()); // Middleware to parse JSON request bodies

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// This sets up a basic Express server that listens on port 3000.

//? 5. Route Handling in RESTful APIs
// Routes in Express.js define how HTTP requests are handled. Routes typically map to specific HTTP methods and resource URLs.
{
  // Example Route:
  app.get("/users", (req, res) => {
    res.json({ message: "Fetching all users" });
  });

  app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    res.json({ message: `Fetching user with ID: ${userId}` });
  });
}

// Here, `/users` fetches all users, and `/users/:id` fetches a user by their ID.

//? 6. CRUD Operations in RESTful APIs
// RESTful APIs revolve around performing CRUD operations on resources. Each operation is mapped to a specific HTTP method:

// | Operation     | HTTP Method     | Example URL      | Action                         |
// |---------------|-----------------|------------------|--------------------------------|
// | Create        | POST            | `/users`         | Add a new user                 |
// | Read (All)    | GET             | `/users`         | Retrieve all users             |
// | Read (One)    | GET             | `/users/:id`     | Retrieve a specific user by ID |
// | Update        | PUT             | `/users/:id`     | Update user data               |
// | Delete        | DELETE          | `/users/:id`     | Delete a user                  |

{
  // Example (Create a new user):
  app.post("/users", (req, res) => {
    const newUser = req.body;
    // Code to save newUser to database
    res.status(201).json({ message: "User created", user: newUser });
  });
}

//? 7. Middleware in RESTful APIs
// Middleware functions are used to process requests before they reach the route handler. They can be used
// for tasks such as logging, authentication, or data validation.
{
  // Example Middleware for Logging:
  app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next(); // Passes control to the next middleware or route handler
  });
}

//? 8. Handling Errors in RESTful APIs
// Error handling in RESTful APIs is essential for providing useful feedback to the client when something goes wrong.
{
  // Basic Error Handling Example:
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  });
}

{
  // Handling 404 Errors:
  app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
}

//? 9. Authentication and Authorization
// For securing APIs, it's important to implement authentication (verifying the identity of the user) and
// authorization (ensuring the user has the correct permissions).

// - Token-based authentication: Typically done using JWT (JSON Web Tokens).
// - OAuth: Used for third-party authentication (Google, Facebook, etc.).
{
  // Example of JWT Authentication:
  const jwt = require("jsonwebtoken");

  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Validate username/password, then generate JWT token
    const token = jwt.sign({ username }, "your_secret_key", {
      expiresIn: "1h",
    });
    res.json({ token });
  });
}

//? 10. Versioning RESTful APIs
// API versioning ensures backward compatibility for your users while you continue to make improvements to the API.

// Example URL for API Versioning:
//! - `/api/v1/users`: Version 1 of the API
//! - `/api/v2/users`: Version 2 of the API

//? 11. Response Formats (JSON/XML)
// RESTful APIs typically use **JSON** as the default response format due to its lightweight nature
// and ease of use with JavaScript. However, XML is also an option.

// Example JSON Response:
```json
{
  "id": 1,
  "name": "John Doe"
}
```;

// Example XML Response:
```xml
<user>
  <id>1</id>
  <name>John Doe</name>
</user>
```;

//? 12. Pagination and Filtering
// To handle large datasets efficiently, APIs often implement pagination and filtering. This can be done
// using query parameters.

// Example URL:
//! GET /users?page=1&limit=10

// This would return the first 10 users.

//? 13. REST API Best Practices
//* - Use nouns in URLs, not verbs (e.g., `/users` instead of `/getUsers`).
//* - Make URLs resource-based (e.g., `/users/:id`).
//* - Use plural nouns (e.g., `/products`, `/orders`).
//* - Use proper status codes (e.g., `200 OK`, `201 Created`, `404 Not Found`, `500 Internal Server Error`).
//* - Implement rate limiting to prevent abuse.
//* - Document the API using tools like Swagger or Postman.

//? 14. RESTful API Example in Node.js
// Here’s a simple example of a RESTful API in Node.js using Express.js:
{
  const express = require("express");
  const app = express();

  app.use(express.json()); // Parse JSON bodies

  // Get all users
  app.get("/users", (req, res) => {
    res.json([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ]);
  });

  // Get a specific user by ID
  app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    res.json({ id: userId, name: `User ${userId}` });
  });

  // Create a new user
  app.post("/users", (req, res) => {
    const newUser = req.body;
    // Code to save

    //  newUser to the database
    res.status(201).json({ message: "User created", user: newUser });
  });

  // Update a user
  app.put("/users/:id", (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    // Code to update user in the database
    res.json({ message: "User updated", user: updatedUser });
  });

  // Delete a user
  app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;
    // Code to delete user from the database
    res.json({ message: `User ${userId} deleted` });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    res.status(500).json({ error: "Something went wrong" });
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

//? Summary of RESTful API Design in Node.js
// RESTful API design in Node.js revolves around creating stateless, resource-based services that leverage
// standard HTTP methods for performing CRUD operations. Express.js simplifies the process by providing a
// straightforward way to define routes, handle requests, manage middleware, and implement error handling.
// RESTful APIs are widely used for building scalable, maintainable, and secure web services, with best
// practices like versioning, proper status codes, and pagination enhancing their functionality and usability.
