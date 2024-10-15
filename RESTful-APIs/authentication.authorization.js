//! ================================ RESTful API Authentication and Authorization ================================

// In RESTful API design, authentication and authorization are crucial to ensuring that users can only access
// resources they're allowed to. Authentication verifies the identity of a user, while authorization determines
// what a user is permitted to do once authenticated.

// Subtopics:
//? What is Authentication?
//? What is Authorization?
//? Types of Authentication
//? Token-Based Authentication
//? OAuth Authentication
//? Session-Based Authentication
//? JSON Web Tokens (JWT)
//? Role-Based Access Control (RBAC)
//? Implementing JWT Authentication in Node.js
//? Protecting Routes in Express.js
//? Best Practices for API Authentication
//? Error Handling in Authentication and Authorization
//? Example of RESTful API with Authentication in Node.js

//? 1. What is Authentication?
// Authentication is the process of verifying a user's identity. In a RESTful API context, this is usually
// done by requiring the user to provide credentials, such as a username and password. Once authenticated,
// the server issues an authentication token that the client must use for all future requests to access
// protected resources.

//? 2. What is Authorization?
// Authorization happens after authentication. It determines whether an authenticated user has permission
// to perform certain actions or access certain resources. For example, an admin user might be authorized
// to access administrative routes, while a regular user would be restricted to user-specific routes.

//? 3. Types of Authentication
//* 1. Token-based Authentication: Commonly implemented using JWT (JSON Web Tokens). The client sends a token with each request, and the server validates it.
//* 2. Session-based Authentication: The server stores session information, and a session ID is passed to the client, typically using cookies.
//* 3. OAuth: A widely-used open standard for access delegation, often used for third-party login (e.g., Google, Facebook).
//* 4. Basic Authentication: Involves sending the username and password in the Authorization header with each request. This is generally not secure unless used over HTTPS.

//? 4. Token-Based Authentication
// Token-based authentication is widely used in RESTful APIs. A token is a string (typically a JWT) issued by
// the server when the user successfully authenticates. This token is then passed along with each request in
// the Authorization header.

// Authorization Header Format:
//! Authorization: Bearer <token>

//? 5. OAuth Authentication
// OAuth is an open standard used for access delegation, allowing third-party services (like Google, Facebook, GitHub)
// to authenticate users. OAuth provides a more secure method for users to authorize applications to access their data
// without sharing their credentials.

//? 6. Session-Based Authentication
// In session-based authentication, the server creates a session for the user upon authentication and stores
// it in memory or a database. A session ID is returned to the client, usually stored in a cookie.
// The client sends this session ID with every request, and the server verifies it.

//? 7. JSON Web Tokens (JWT)
// JWT is a widely-used standard for token-based authentication. JWT tokens are self-contained and consist of three parts:
//* 1. Header: Contains the token type and the signing algorithm.
//* 2. Payload: Contains user information and claims (e.g., user ID, roles).
//* 3. Signature: Ensures that the token hasn’t been tampered with, generated using the server’s secret key.

// Example of JWT structure:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE2MTU2NTIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```;

// JWT tokens are passed in the Authorization header with the `Bearer` schema, like so:
```
Authorization: Bearer <JWT_TOKEN>
```;

//? 8. Role-Based Access Control (RBAC)
// Role-Based Access Control (RBAC) is a method of restricting access to resources based on the roles of
// individual users. For example, an API can allow admin users to create or delete resources, while regular
// users can only read them.

// RBAC Example:
//! - Admin Role: Full access (read, create, update, delete).
//! - User Role: Read-only access.

//? 9. Implementing JWT Authentication in Node.js
// To implement JWT authentication in a Node.js RESTful API, you will typically use the following steps:

// 1. Install JWT Libraries:
//! npm install jsonwebtoken

// 2. Generate a Token after successful login:
{
  const jwt = require("jsonwebtoken");

  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Validate username and password
    const user = { id: 1, username: username }; // Example user

    // Sign JWT with user data and secret key
    const token = jwt.sign(user, "your_jwt_secret_key", { expiresIn: "1h" });

    res.json({ token });
  });
}

// 3. Protect Routes Using JWT Middleware:
{
  const jwt = require("jsonwebtoken");

  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401); // If no token, unauthorized

    jwt.verify(token, "your_jwt_secret_key", (err, user) => {
      if (err) return res.sendStatus(403); // Invalid token
      req.user = user;
      next(); // Pass to next middleware
    });
  };

  // Protect this route with JWT authentication
  app.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
  });
}

//? 10. Protecting Routes in Express.js
// You can protect routes by implementing middleware functions that check whether the user is authenticated
// and authorized. These middleware functions can be applied globally or per route.
{
  // Example of a Protected Route:
  app.get("/admin", authenticateToken, (req, res) => {
    if (req.user.role === "admin") {
      res.json({ message: "Welcome, Admin" });
    } else {
      res.status(403).json({ error: "Access Denied" });
    }
  });
}

//? 11. Best Practices for API Authentication
//* - Use HTTPS: Always use HTTPS to encrypt sensitive data, such as tokens and credentials.
//* - Use Short Expiration Times for Tokens: JWT tokens should have a short lifespan (e.g., 1 hour), and allow users to refresh them with a refresh token.
//* - Rotate Secret Keys: Regularly rotate your secret keys and invalidate old tokens.
//* - Store Tokens Securely: Do not store tokens in local storage in web browsers; use httpOnly cookies to reduce the risk of token theft via XSS.
//* - Use Strong Encryption for Passwords: Always hash passwords using libraries like bcrypt.

//? 12. Error Handling in Authentication and Authorization
// Error handling is crucial to improving security and providing users with helpful feedback.
{
  // Example of Authentication Error Handling:
  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Validate user credentials
    if (username !== "admin" || password !== "password") {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Proceed with token generation...
  });
}

// Common Error Codes:
//* - 401 Unauthorized: The user is not authenticated.
//* - 403 Forbidden: The user is authenticated but not authorized to access the resource.
//* - 400 Bad Request: Incorrect or missing credentials.

//? 13. Example of RESTful API with Authentication in Node.js
// Here’s a full example of how JWT authentication can be implemented in a RESTful API:
{
  const express = require("express");
  const jwt = require("jsonwebtoken");
  const app = express();

  app.use(express.json());

  const users = [
    { id: 1, username: "admin", password: "password", role: "admin" },
    { id: 2, username: "user", password: "password", role: "user" },
  ];

  // Login route (generates a JWT)
  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, "secret_key", {
      expiresIn: "1h",
    });
    res.json({ token });
  });

  // Middleware to authenticate JWT token
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, "secret_key", (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  // Protected route (admin only)
  app.get("/admin", authenticateToken, (req, res) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }
    res.json({ message: "Welcome Admin!" });
  });

  // Protected route (user)
  app.get("/user", authenticateToken, (req, res) => {
    res.json({ message: `Welcome User ${req.user.userId}` });
  });

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

//? Summary of RESTful API Authentication & Authorization in Node.js
// Authentication and authorization in RESTful APIs are fundamental for securing resources. Node.js,
// with the help of libraries like jsonwebtoken, makes implementing JWT authentication simple.
// Whether you're using token-based, session-based, or third-party authentication (OAuth),
// ensuring secure and proper role-based access control (RBAC) is key to building robust and safe APIs.
