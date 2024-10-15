//! ===================================== Express.js in Node.js =====================================

// Express.js is a minimal and flexible web application framework for Node.js. It provides a robust set
// of features to build single-page, multi-page, and hybrid web applications. It’s widely used for
// building APIs, handling HTTP requests, and managing middleware functions.

// Subtopics:
//? What is Express.js?
//? Why Use Express.js?
//? Setting Up Express.js
//? Creating a Simple Express Server
//? Routing in Express.js
//? Middleware in Express.js
//? Serving Static Files
//? Handling Requests and Responses
//? Error Handling in Express.js
//? Express.js with Databases
//? Express.js and Template Engines
//? Express.js Security Best Practices
//? Express.js with RESTful APIs
//? Deployment of Express.js Applications
//? Example: Full Express.js Application

//? 1. What is Express.js?
// Express.js is a lightweight, unopinionated framework for Node.js that provides tools and utilities
// to easily build web servers and APIs. It is built on top of Node.js's native HTTP module and simplifies
// handling routing, requests, and responses.

//? 2. Why Use Express.js?
//* - Minimalistic: Express.js is minimal, allowing developers to structure their application as they see fit.
//* - Middleware Support: It has robust middleware support, allowing you to add functions to process requests.
//* - Routing: Simplifies routing with intuitive syntax.
//* - Scalability: Enables scalable and efficient API building for both small and large projects.
//* - Community & Ecosystem: It has a large ecosystem of plugins and middleware for almost any functionality you need.

//? 3. Setting Up Express.js
// To get started with Express.js, you need to install it via npm.

```bash
npm init -y
npm install express
```;

// Once installed, you can require it in your Node.js files and start building a server.

//? 4. Creating a Simple Express Server
// Creating a simple HTTP server with Express.js involves just a few lines of code.
{
  // app.js
  const express = require("express");
  const app = express();

  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

// Here’s what happens:
//* - `app.get()` defines a route for handling GET requests.
//* - `res.send()` sends a response to the client.
//* - `app.listen()` starts the server on port 3000.

//? 5. Routing in Express.js
// Routing refers to how an application’s endpoints (URLs) respond to client requests.
// Express.js provides an intuitive syntax for routing.
{
  // Define a route for GET requests to `/about`
  app.get("/about", (req, res) => {
    res.send("About Page");
  });

  // Define a route for POST requests to `/contact`
  app.post("/contact", (req, res) => {
    res.send("Contact Form Submitted");
  });
}

// Express allows you to define routes for various HTTP methods:
//* - `app.get()` for GET requests.
//* - `app.post()` for POST requests.
//* - `app.put()` for PUT requests.
//* - `app.delete()` for DELETE requests.

{
  // You can also create route parameters:
  app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
  });
}

//? 6. Middleware in Express.js
// Middleware functions are functions that have access to the request (`req`), response (`res`),
// and the next middleware in the application’s request-response cycle. They are used to modify
// requests and responses or add additional logic.
{
  // Example: Logging middleware:
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Pass control to the next handler
  });
}

// Built-in Middleware:
//* - `express.static()`: Serves static assets.
//* - `express.json()`: Parses incoming JSON requests.
//* - `express.urlencoded()`: Parses URL-encoded bodies.

//? 7. Serving Static Files
// Express.js can serve static files like HTML, CSS, JavaScript, and images using the `express.static` middleware.

```javascript
app.use(express.static('public'));
```;

// Now, files in the `public` directory will be accessible via the URL.

//? 8. Handling Requests and Responses
// Handling incoming requests and sending appropriate responses is core to building an Express.js app.

// Request Object (`req`): Contains information about the HTTP request (query parameters, body, headers).
//* - `req.query`: Query parameters in the URL.
//* - `req.body`: Data from the request body (requires middleware).

// Response Object (`res`): Used to send data back to the client.
//* - `res.send()`: Sends a response.
//* - `res.json()`: Sends a JSON response.
//* - `res.status()`: Sets the HTTP status code.

{
  app.post("/data", (req, res) => {
    const data = req.body;
    res.status(200).json({ message: "Data received", data });
  });
}

//? 9. Error Handling in Express.js
// To handle errors, you can define an error-handling middleware function with 4 arguments:
// `err`, `req`, `res`, and `next`.
{
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  });
}

//? 10. Express.js with Databases
// You can use databases like MongoDB, MySQL, or PostgreSQL with Express.js. Typically, you would
// integrate them through ORM (Object-Relational Mapping) tools like **Mongoose** for MongoDB or
// Sequelize for SQL databases.

// Example with Mongoose:
```bash
npm install mongoose
```;

{
  const mongoose = require("mongoose");
  mongoose.connect("mongodb://localhost/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const User = mongoose.model("User", { name: String, age: Number });

  app.post("/user", (req, res) => {
    const newUser = new User(req.body);
    newUser.save().then(() => res.send("User saved"));
  });
}

//? 11. Express.js and Template Engines
// Express supports rendering HTML templates using template engines such as **Pug**, **EJS**, or **Handlebars**.

// Example with EJS:
```bash
npm install ejs
```;

```javascript
app.set('view engine', 'ejs');

app.get('/home', (req, res) => {
  res.render('home', { title: 'Home Page' });
});
```;

//? 12. Express.js Security Best Practices
// - Helmet.js: Use Helmet middleware to set various HTTP headers for security.
```bash
npm install helmet
```;

```javascript
const helmet = require('helmet');
app.use(helmet());
```;

//! - Rate Limiting: Prevent excessive requests to your server using `express-rate-limit`.

//! - CORS: Control which domains can make requests to your API using the `cors` middleware.

```bash
npm install cors
```;

//? 13. Express.js with RESTful APIs
// Express is widely used for building RESTful APIs, which follow standard HTTP methods for resource
// operations (GET, POST, PUT, DELETE).
{
  app.get("/users", (req, res) => {
    // Get all users
  });

  app.post("/users", (req, res) => {
    // Create a new user
  });

  app.put("/users/:id", (req, res) => {
    // Update a user
  });

  app.delete("/users/:id", (req, res) => {
    // Delete a user
  });
}

//? 14. Deployment of Express.js Applications
// You can deploy Express.js applications using platforms like **Heroku**, **DigitalOcean**, or **AWS EC2**.
// Make sure to configure **environment variables**, enable **process management** with tools like **PM2**,
// and optimize performance with **clustering** and **load balancing**.

//? 15. Example: Full Express.js Application
// Below is an example of a more comprehensive Express.js application that handles routing, middleware,
// and database integration.
{
  const express = require("express");
  const mongoose = require("mongoose");
  const bodyParser = require("body-parser");

  const app = express();
  app.use(bodyParser.json());

  // Connect to MongoDB
  mongoose.connect("mongodb://localhost/testdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // User model
  const User = mongoose.model("User", { name: String, age: Number });

  // GET all users
  app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
  });

  // POST create a new user
  app.post("/users", async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  });

  // Start the server
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

//? Summary
// Express.js simplifies web development in Node.js by providing a minimalistic framework for handling routing,
// requests, and middleware. Its flexibility makes it ideal for building scalable APIs, integrating with databases,
// and rendering dynamic views. With robust middleware, template engines, security practices, and deployment
// strategies, Express.js is a powerful choice for modern web development.
