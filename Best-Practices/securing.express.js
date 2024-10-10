//! ===================================== Securing Express in Node.js =====================================

// Securing an Express.js application is crucial to protect it from common security vulnerabilities and
// attacks like Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), SQL Injection, and others.
// There are several best practices, middleware, and strategies to enhance the security of your Express applications.

// Subtopics:
//? Why is Security Important in Express.js?
//? Common Security Threats in Express.js Applications
//? Using HTTPS for Secure Communication
//? Helmet.js for Setting Security Headers
//? Sanitizing and Validating User Input
//? Preventing Cross-Site Scripting (XSS)
//? Cross-Site Request Forgery (CSRF) Protection
//? Securing Cookies and Sessions
//? Authentication and Authorization Best Practices
//? Rate Limiting for Protection Against Brute Force Attacks
//? SQL Injection and NoSQL Injection Protection
//? Best Practices for API Security
//? Using Environment Variables Securely
//? Preventing Denial of Service (DoS) Attacks
//? Logging and Monitoring Security Events
//? Regularly Updating Dependencies
//? Other Express.js Security Best Practices

//? 1. Why is Security Important in Express.js?
// Security is critical to prevent malicious attacks, data breaches, and unauthorized access.
// With the rise of web-based services, securing Express.js applications ensures:
//* - Protection of sensitive data (e.g., user credentials, payment details).
//* - Prevention of attacks like XSS, CSRF, and DoS.
//* - Compliance with security standards and regulations (e.g., GDPR, HIPAA).

//? 2. Common Security Threats in Express.js Applications
//* - Cross-Site Scripting (XSS): Injecting malicious scripts into web pages viewed by other users.
//* - Cross-Site Request Forgery (CSRF): Attacks that trick users into submitting unauthorized actions.
//* - SQL Injection: Inserting malicious SQL queries through user input to manipulate the database.
//* - Denial of Service (DoS): Overloading the server with excessive requests to make it unavailable.

//? 3. Using HTTPS for Secure Communication
// One of the foundational steps in securing any Express app is to use **HTTPS** to encrypt the communication
// between the server and the client. This ensures that sensitive data (like passwords) isn't intercepted by attackers.

// Steps to Enable HTTPS:
//! 1. Generate an SSL certificate (using Let's Encrypt or similar services).
//! 2. Modify your Express server to use `https`.
{
  const https = require("https");
  const fs = require("fs");
  const express = require("express");
  const app = express();

  const options = {
    key: fs.readFileSync("path/to/private.key"),
    cert: fs.readFileSync("path/to/certificate.crt"),
  };

  https.createServer(options, app).listen(3000, () => {
    console.log("Server running on https://localhost:3000");
  });
}

//? 4. Helmet.js for Setting Security Headers
// `Helmet.js` is an Express middleware that automatically sets security-related HTTP headers to prevent
// attacks like XSS, clickjacking, and others.

// Install and use Helmet.js:
//! npm install helmet
{
  const helmet = require("helmet");
  app.use(helmet());
}

// Example Headers Set by Helmet:
//* - X-Frame-Options: Protects against clickjacking by not allowing your site to be embedded in iframes.
//* - Content-Security-Policy: Prevents XSS by specifying which scripts are allowed to run.
//* - Strict-Transport-Security: Forces browsers to only use HTTPS.

//? 5. Sanitizing and Validating User Input
// Unvalidated user input can lead to SQL injection, NoSQL injection, and other types of attacks.
// Always sanitize and validate any user input.

// Example using `validator` library:
//! npm install validator
{
  const validator = require("validator");

  // Validate email input
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).send("Invalid email address");
  }
}

// Input sanitization prevents malicious characters from being injected:
{
  req.body.name = validator.escape(req.body.name); // Escape input to prevent XSS
}

//? 6. Preventing Cross-Site Scripting (XSS)
// To prevent XSS, you should escape all user inputs and set a Content Security Policy (CSP).

// Preventing XSS with `helmet`:
{
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'trusted-cdn.com'"],
      },
    })
  );
}

// This limits where scripts can be loaded from, reducing the chance of XSS.

//? 7. Cross-Site Request Forgery (CSRF) Protection
// CSRF attacks trick users into performing actions without their knowledge. Using **CSRF tokens**
// ensures that forms are submitted intentionally by the user.

// Install and use `csurf` middleware:
//! npm install csurf
{
  const csurf = require("csurf");
  const csrfProtection = csurf({ cookie: true });

  app.use(csrfProtection);

  app.get("/form", (req, res) => {
    // Send CSRF token in the form
    res.render("form", { csrfToken: req.csrfToken() });
  });
}

// Each form submission must include the CSRF token, which is validated by the server.

//? 8. Securing Cookies and Sessions
// Make sure cookies and session data are secured to prevent attacks like session hijacking.
{
  // Example cookie security options:
  app.use(
    require("cookie-session")({
      name: "session",
      keys: ["secretKey1", "secretKey2"],
      secure: true, // Ensures cookies are sent only over HTTPS
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration
    })
  );
}

// Use **signed cookies** and avoid storing sensitive data in them.

//? 9. Authentication and Authorization Best Practices
// - Use **OAuth** or **JWT (JSON Web Tokens)** for authentication instead of custom authentication mechanisms.
// - Secure sensitive routes by verifying user roles and permissions.
{
  const jwt = require("jsonwebtoken");

  // JWT verification middleware
  app.use((req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).send("Access denied");

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send("Invalid token");
    }
  });
}

//? 10. Rate Limiting for Protection Against Brute Force Attacks
// Rate limiting helps protect against brute force attacks by restricting the number of requests an IP
// can make to your server.

//! npm install express-rate-limit
{
  const rateLimit = require("express-rate-limit");

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  });

  app.use(limiter);
}

//? 11. SQL Injection and NoSQL Injection Protection
// To protect against SQL Injection, always use parameterized queries:

const sql = "SELECT * FROM users WHERE id = ?";
db.query(sql, [userId], (err, results) => {
  //...
});

// For MongoDB (NoSQL), use object validation to prevent injections:
{
  User.find({ _id: mongoose.Types.ObjectId(id) }); // Use mongoose objectId validation
}

//? 12. Best Practices for API Security
//! 1. Use API keys: For public APIs, require clients to authenticate with an API key.
//! 2. Rate limit APIs: Apply rate limiting to protect against misuse.
//! 3. Use HTTPS: Ensure all API requests use HTTPS.
//! 4. Validate and sanitize inputs: Protect API endpoints by validating incoming requests.

//? 13. Using Environment Variables Securely
// Use environment variables to store sensitive data like API keys, database credentials, and JWT secrets.
// Never hardcode sensitive information in your codebase.

//! # In .env file
//! JWT_SECRET=mySecretKey
{
  require("dotenv").config();
  const jwtSecret = process.env.JWT_SECRET;
}

// Ensure `.env` files are not pushed to version control.

//? 14. Preventing Denial of Service (DoS) Attacks
// To protect against DoS attacks:
// - Use **rate limiting**.
// - Deploy **firewalls**.
// - Handle large payloads carefully by setting maximum request size:
{
  app.use(express.json({ limit: "10kb" })); // Limits the size of JSON payloads
}

//? 15. Logging and Monitoring Security Events
// Regularly log and monitor events like failed login attempts, suspicious activity, and server errors.
// Tools like **Winston** or services like **Datadog** can be used for logging and monitoring.
{
  const winston = require("winston");

  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.File({ filename: "combined.log" }),
    ],
  });

  app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send("Something went wrong");
  });
}

//? 16. Regularly Updating Dependencies
// Keep your dependencies up-to-date to patch security vulnerabilities. Use tools like **npm audit**
// to identify and fix security issues:

//! npm audit
//! npm audit fix

//? 17. Other Express.js Security Best Practices
// - Disable **X-Powered-By** header to prevent revealing Express usage:
{
  app.disable("x-powered-by");
}

// - Enable **CORS** (Cross-Origin Resource Sharing) correctly to control access from other domains:
{
  const cors = require("cors");
  app.use(
    cors({
      origin: "https://trustedwebsite.com",
      methods: "GET,POST",
    })
  );
}

//? Summary of Securing Express in Node.js
//* - Implement HTTPS, use `Helmet` for security headers, and protect against XSS, CSRF, and SQL Injection.
//* - Secure cookies and sessions, apply rate limiting, and use JWT for authentication.
//* - Sanitize inputs, log security events, and update dependencies regularly.
//* - Follow best practices for API security and ensure proper configuration of CORS and environment variables.
