//! ===================================== Securing Express in Node.js =====================================

// Validation and sanitization are essential to ensure data integrity, prevent injection attacks,
// and improve application security. In Node.js, these processes help verify that user inputs conform
// to expected formats, and sanitize input data by removing malicious or inappropriate content.

// Subtopics:
//? Why Validation and Sanitization are Important
//? Common Attacks Prevented by Validation and Sanitization
//? Difference Between Validation and Sanitization
//? Using the `validator` and `express-validator` Libraries
//? Custom Validation Functions
//? Using Built-in Validation in ORMs (e.g., Mongoose)
//? Sanitizing User Inputs
//? Validating HTTP Request Parameters, Query, and Body
//? Combining Validation and Sanitization in Middleware
//? Real-World Example of Validation and Sanitization
//? Best Practices for Validation and Sanitization
//? Error Handling in Validation

//? 1. Why Validation and Sanitization are Important
// - Validation: Ensures that the input data meets the required format, type, and rules (e.g., correct email format).
// - Sanitization: Cleans the input by removing or escaping potentially dangerous characters to prevent malicious
// inputs such as SQL injection or XSS attacks.

// Both validation and sanitization are essential for:
//* - Maintaining data integrity and consistency.
//* - Preventing security vulnerabilities like XSS, SQL injection, and other malicious attacks.
//* - Improving user experience by catching input errors early.

//? 2. Common Attacks Prevented by Validation and Sanitization
//* - SQL Injection: Unvalidated input can lead to attackers inserting malicious SQL queries.
//* - Cross-Site Scripting (XSS: If user input isn't sanitized, attackers can inject scripts into web pages.
//* - NoSQL Injection: Similar to SQL injection, unvalidated input can compromise NoSQL databases (like MongoDB).
//* - Command Injection: Unsanitized inputs can be used to execute unintended system commands.

//? 3. Difference Between Validation and Sanitization
// - Validation: Confirms that the data inputted by the user is correct, like ensuring an email
// is valid or a password meets strength requirements.

// Example: Validate that an email follows proper formatting.
{
  const isValid = validator.isEmail("test@example.com"); // true
}

// - Sanitization: Cleans up the data to remove unwanted or malicious content.

// Example: Sanitizing input to escape special characters.
{
  const sanitized = validator.escape('<script>alert("XSS")</script>'); // &lt;script&gt;alert("XSS")&lt;/script&gt;
}

//? 4. Using the `validator` and `express-validator` Libraries
// Node.js provides various libraries for handling validation and sanitization, such as:
//* - validator: A library for string validation and sanitization.
//* - express-validator: An Express middleware for handling validation and sanitization in requests.

// Installation:
//! npm install validator express-validator
{
  // Example Usage with `validator`:
  const validator = require("validator");

  const email = "test@example.com";
  if (validator.isEmail(email)) {
    console.log("Valid email");
  } else {
    console.log("Invalid email");
  }
}

{
  // Example Usage with `express-validator` in Express.js:
  const { body, validationResult } = require("express-validator");

  app.post(
    "/signup",
    [
      body("email").isEmail().withMessage("Enter a valid email"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // Proceed with the signup
    }
  );
}

//? 5. Custom Validation Functions
// You can create custom validation logic based on the application's needs. For instance,
// you might need to validate usernames or specific string formats.
{
  const { body } = require("express-validator");

  app.post(
    "/register",
    [
      body("username").custom((value) => {
        if (value === "admin") {
          throw new Error('Username "admin" is not allowed');
        }
        return true;
      }),
    ],
    (req, res) => {
      // Validation and registration logic
    }
  );
}

//? 6. Using Built-in Validation in ORMs (e.g., Mongoose)
// When using an ORM like Mongoose (for MongoDB), you can define validation rules directly in the schema.
{
  const mongoose = require("mongoose");

  const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (email) {
          return validator.isEmail(email);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      minlength: 6,
    },
  });

  const User = mongoose.model("User", userSchema);
}

// Mongoose's built-in validation can handle data type checking, required fields, and more.

//? 7. Sanitizing User Inputs
// Sanitization involves cleaning up user input to prevent harmful characters from causing security issues.
{
  // Example using `validator` to sanitize input:
  const sanitizedComment = validator.escape(req.body.comment);
}

{
  // Example using `express-validator`:
  app.post("/comment", [body("comment").trim().escape()], (req, res) => {
    // Now the comment is safe from XSS attacks
  });
}

//? 8. Validating HTTP Request Parameters, Query, and Body
// Using `express-validator`, you can validate different parts of the request, including parameters, queries, and body.
{
  app.get(
    "/user/:id",
    [
      param("id").isInt().withMessage("User ID must be an integer"),
      query("sort")
        .optional()
        .isIn(["asc", "desc"])
        .withMessage('Sort must be "asc" or "desc"'),
    ],
    (req, res) => {
      // Validation logic
    }
  );
}

//? 9. Combining Validation and Sanitization in Middleware
// You can combine validation and sanitization into the same middleware function to streamline the process.
{
  app.post(
    "/submit",
    [
      body("username").trim().isLength({ min: 3 }).escape(),
      body("email").normalizeEmail().isEmail(),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // Process the input
    }
  );
}

//? 10. Real-World Example of Validation and Sanitization
// Consider a user registration form that collects a username, email, and password.
// Here's how you can validate and sanitize the inputs:
{
  app.post(
    "/register",
    [
      body("username").trim().isLength({ min: 3 }).escape(),
      body("email").isEmail().normalizeEmail(),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // Proceed with the registration process
    }
  );
}

//* - Username: Trimmed of extra spaces and any harmful characters escaped.
//* - Email: Normalized to a lower-case version and validated for format.
//* - Password: Checked for a minimum length of 6 characters.

//? 11. Best Practices for Validation and Sanitization

//* - Always validate and sanitize user inputs: This applies to form inputs, query strings, and any other data coming from users.
//* - Use libraries: Leverage libraries like `validator` and `express-validator` for robust validation and sanitization.
//* - Perform validation on both client and server: Though you should never rely on client-side validation alone, it helps catch errors early.
//* - Normalize data: Normalizing data (like converting emails to lowercase) ensures consistency in your application.
//* - Sanitize untrusted data: Always escape user-generated content before displaying it in the browser to prevent XSS.

//? 12. Error Handling in Validation
// When validation or sanitization fails, it's essential to handle these errors properly to provide feedback
// to users and ensure security.
{
  app.post(
    "/login",
    [body("email").isEmail(), body("password").isLength({ min: 6 })],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // Proceed with login
    }
  );
}

// Use meaningful error messages to help users correct their mistakes and prevent security vulnerabilities.

//? Summary of Validation and Sanitization in Node.js
//* - Validation checks if user inputs conform to expected rules, while sanitization ensures the data is safe by removing harmful elements.
//* - Use libraries like `validator` and `express-validator` to simplify the process.
//* - Always validate and sanitize both on the client and server sides.
//* - Proper error handling during validation helps enhance security and improve user experience.
