//! ===================================== Building RESTful APIs in Node.js =====================================

// Building a RESTful API in Node.js involves creating stateless services that allow clients to perform CRUD
// (Create, Read, Update, Delete) operations on resources. Node.js, with its non-blocking I/O and scalability,
// is ideal for building RESTful services. Express.js, a web framework for Node.js, is commonly used for
// creating APIs due to its simplicity and flexibility.

// Subtopics:
//? What is a RESTful API?
//? Principles of RESTful API Design
//? Setting Up a Node.js Project
//? Routing in Express.js
//? HTTP Methods for CRUD Operations
//? Handling HTTP Status Codes
//? Working with Middleware
//? Connecting to a Database
//? Implementing Pagination, Sorting, and Filtering
//? Error Handling in APIs
//? API Versioning
//? Best Practices for Building RESTful APIs
//? Full Example of RESTful API in Node.js

//? 1. What is a RESTful API?
// A RESTful API (Representational State Transfer) is an architectural style for building APIs that follow a
// set of constraints, such as statelessness, uniform interface, and resource-based interactions. Resources
// are identified by URLs, and operations are performed using standard HTTP methods.

//? 2. Principles of RESTful API Design
//* - Statelessness: Each request from a client to the server must contain all the information needed to
//* process the request. The server does not store any session state about the client.
//* - Resource-based: Resources (e.g., users, products) are identified by URLs.
//* - HTTP Methods: Standard HTTP methods like GET, POST, PUT, DELETE, PATCH are used to perform operations on resources.
//* - Uniform Interface: APIs must be consistent in how they are accessed and used.
//* - Representation: Resources can be represented in different formats (e.g., JSON, XML), though JSON is the most common.

//? 3. Setting Up a Node.js Project
// To start building a RESTful API, you need to set up a basic Node.js project:

// 1. Initialize a Node.js Project:
```bash
   mkdir rest-api
   cd rest-api
   npm init -y
   ```;

// 2. Install Express.js:
```bash
   npm install express
   ```;

// 3. Create the Main Application File:
```bash
   touch app.js
   ```;

//? 4. Routing in Express.js
// Routing in Express.js is used to define the various endpoints of your API and associate them with HTTP
// methods and handlers.
{
  // Example: Creating a basic route to handle a GET request:
  const express = require("express");
  const app = express();

  app.get("/api/users", (req, res) => {
    res.json([
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ]);
  });

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

//? 5. HTTP Methods for CRUD Operations
// In a RESTful API, you map HTTP methods to CRUD operations:

//* - GET: Retrieve data (Read)
//* - POST: Create new data (Create)
//* - PUT: Update existing data (Update/Replace)
//* - PATCH: Update part of the data (Partial Update)
//* - DELETE: Remove data (Delete)

{
  // Example of basic CRUD operations:
  // Get all users
  app.get("/api/users", (req, res) => {
    res.json(users);
  });

  // Get a single user by ID
  app.get("/api/users/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  });

  // Create a new user
  app.post("/api/users", (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.status(201).json(newUser);
  });

  // Update a user
  app.put("/api/users/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send("User not found");
    user.name = req.body.name;
    res.json(user);
  });

  // Delete a user
  app.delete("/api/users/:id", (req, res) => {
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send("User not found");
    users.splice(userIndex, 1);
    res.status(204).send();
  });
}

//? 6. Handling HTTP Status Codes
// Using the correct HTTP status codes is important for providing meaningful responses:
//* - 200 OK: Successful GET, PUT, DELETE request.
//* - 201 Created: Resource successfully created via POST.
//* - 204 No Content: Successful DELETE request.
//* - 400 Bad Request: Invalid input from the client.
//* - 401 Unauthorized: Authentication required.
//* - 404 Not Found: Resource not found.
//* - 500 Internal Server Error: Server error.

// Example:
```javascript
if (!user) return res.status(404).send('User not found');
```;

//? 7. Working with Middleware
// Middleware functions are executed during the lifecycle of a request. You can use middleware to handle tasks
// like parsing request bodies, logging, authentication, etc.

// Example of using middleware to parse JSON request bodies:
```javascript
app.use(express.json());
```;

{
  // Custom middleware for logging:
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

//? 8. Connecting to a Database
// You can connect your API to a database like MongoDB or SQL to store and retrieve resources.

// Example of connecting to a MongoDB database using Mongoose:
//! 1. Install Mongoose:
```bash
   npm install mongoose
   ```;

//! 2. Connect to MongoDB:
```javascript
   const mongoose = require('mongoose');
   mongoose.connect('mongodb://localhost/rest-api', { useNewUrlParser: true, useUnifiedTopology: true });

   const userSchema = new mongoose.Schema({
     name: String,
     email: String,
   });

   const User = mongoose.model('User', userSchema);
   ```;

//? 9. Implementing Pagination, Sorting, and Filtering
// For large datasets, implement pagination, sorting, and filtering to improve performance and user experience.

// Example of pagination using query parameters:
```javascript
app.get('/api/users', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = users.slice(startIndex, endIndex);
  res.json(results);
});
```;

//? 10. Error Handling in APIs
// Error handling is important for providing clear feedback to API users. Use try-catch blocks or Express's
// built-in error-handling middleware to handle errors.

// Error handling middleware:
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
```;

//? 11. API Versioning
// API versioning allows you to manage changes in your API without breaking existing client applications.

// Example of versioning using URL:
```javascript
app.get('/api/v1/users', (req, res) => {
  res.json({ version: 'v1', users });
});

app.get('/api/v2/users', (req, res) => {
  res.json({ version: 'v2', users: newUserList });
});
```;

//? 12. Best Practices for Building RESTful APIs
//* - Use appropriate HTTP status codes.
//* - Use nouns in URLs to represent resources.
//* - Handle errors properly and return meaningful messages.
//* - Implement pagination, sorting, and filtering.
//* - Secure your API by using HTTPS and authentication.
//* - Validate user input to avoid SQL injection or malicious data.
//* - Document your API using tools like Swagger or Postman.

//? 13. Full Example of RESTful API in Node.js
// Here's an example of a simple RESTful API in Node.js using Express and connected to MongoDB:
{
  const express = require("express");
  const mongoose = require("mongoose");

  const app = express();
  app.use(express.json());

  mongoose.connect("mongodb://localhost/rest-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
  });

  const User = mongoose.model("User", userSchema);

  // Get all users
  app.get("/api/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
  });

  // Get a user by ID
  app.get("/api/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  });

  // Create a new user
  app.post("/api/users", async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  });

  // Update a user
  app.put("/api/users/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  });

  // Delete a user
  app.delete("/api/users/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.status(204).send();
  });

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

//? Summary
// Building a RESTful API in Node.js involves understanding core REST principles, handling HTTP methods,
// and creating routes. Express.js simplifies API creation with its flexible routing system, middleware support,
// and integration with databases like MongoDB. Following best practices in error handling, versioning,
// and security ensures robust and scalable API design.
