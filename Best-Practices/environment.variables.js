//! ===================================== Environment Variables in Node.js =====================================

// Environment variables are an essential part of modern application development, particularly for configuring
// sensitive information and environment-specific settings. Node.js applications can utilize environment variables
// to handle different configurations for development, testing, staging, and production environments.

// Subtopics and Details:
//? Why Use Environment Variables
//? Setting Environment Variables
//? Accessing Environment Variables in Node.js
//? Storing Environment Variables Securely
//? Managing Environment Variables with `.env` Files
//? Using the `dotenv` Package
//? Environment-Specific Configurations
//? Best Practices for Using Environment Variables
//? Securing Environment Variables in Production
//? Example Project Setup with Environment Variables

//? 1. Why Use Environment Variables
// Environment variables provide a mechanism to externalize application configuration and sensitive information
// like API keys, database credentials, and other secrets. This ensures:
//* - Separation of code and configuration: The same codebase can be used across different environments by simply changing the configuration.
//* - Security: Sensitive data like API keys and database credentials are not hardcoded into the source code.
//* - Flexibility: Developers can easily switch between configurations for development, staging, and production.

//? 2. Setting Environment Variables
// Environment variables can be set in different ways depending on the platform and environment
// (e.g., local development, cloud environments, CI/CD pipelines).

// - Unix/Linux/Mac: Set environment variables in the terminal.
//! export PORT=3000
//! export NODE_ENV=development

// - Windows: Use `set` command.
//! set PORT=3000
//! set NODE_ENV=development

// Alternatively, you can pass environment variables inline when starting a Node.js application:
//! PORT=3000 NODE_ENV=development node app.js

// For Windows PowerShell:
//! $env:PORT="3000"
//! $env:NODE_ENV="development"
//! node app.js

//? 3. Accessing Environment Variables in Node.js
// In Node.js, environment variables are accessed through `process.env`, which is an object containing
// all the environment variables available to the Node.js process.
{
  const port = process.env.PORT || 3000;
  const nodeEnv = process.env.NODE_ENV || "development";

  console.log(`Server running on port ${port} in ${nodeEnv} mode`);
}

// - `process.env.PORT: Accesses the `PORT` environment variable. If it is not defined, it falls back to the default value (3000).
// - `process.env.NODE_ENV: Defines the environment the application is running in (`development`, `production`, etc.).

//? 4. Storing Environment Variables Securely
// Storing sensitive environment variables (e.g., API keys, database credentials) securely is important to
// avoid exposing them to unauthorized users.

// - Avoid hardcoding secrets: Never hardcode sensitive information like API keys or credentials directly into your codebase.
// - Do not commit environment variables to version control: Use a `.gitignore` file to exclude `.env` files or other
// files containing environment variables from being committed to Git.

//? 5. Managing Environment Variables with `.env` Files
// The best practice for managing environment variables in local development is to use `.env` files.
// A `.env` file contains key-value pairs representing environment variables and can be used to
// manage different environment-specific configurations.

// Example `.env` file:
```
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password123
```
// - `.env` files: Typically located in the root directory of your project and should be ignored in
// version control by adding `.env` to `.gitignore`.
// - Avoid committing `.env` to Git: The `.env` file should contain sensitive information and should
// not be committed to version control.

//? 6. Using the `dotenv` Package
// The `dotenv` package allows you to load environment variables from a `.env` file into `process.env` in Node.js applications.

// Steps to use `dotenv`:
//! 1. Install the package:
```bash
npm install dotenv
```;

//! 2. Create a `.env` file in the root of your project with your environment variables.
//! 3. Load the environment variables in your code by requiring and configuring `dotenv`:
{
  require("dotenv").config();

  const port = process.env.PORT || 3000;
  const dbHost = process.env.DB_HOST;
  console.log(`Server running on port ${port}`);
  console.log(`Connected to database at ${dbHost}`);
}

//? 7. Environment-Specific Configurations
// Applications often have different configurations for different environments like `development`,
// `testing`, and `production`. You can use environment variables to differentiate between these environments.

// - `NODE_ENV`: This environment variable is commonly used to define the current environment (e.g., `development`, `production`).
{
  if (process.env.NODE_ENV === "production") {
    console.log("Running in production mode");
  } else {
    console.log("Running in development mode");
  }
}

// You can also create multiple `.env` files for each environment, such as `.env.development`, `.env.production`,
// etc., and load them based on the environment.

//? 8. Best Practices for Using Environment Variables

//* 1. Avoid Hardcoding Values: Never hardcode sensitive information like API keys, database URLs, or other credentials.
//* 2. Use `.env` files in Development: Store environment variables in `.env` files for development and testing purposes.
//* 3. Do Not Commit `.env` Files: Add `.env` to your `.gitignore` file to prevent sensitive information from being committed to version control.
//* 4. Use `NODE_ENV: Use `NODE_ENV` to specify the environment (e.g., `development`, `production`).
//* 5. Validate Required Environment Variables: Ensure that required environment variables are defined by checking them at the application startup.
{
  if (!process.env.DB_HOST) {
    throw new Error("Missing required environment variable: DB_HOST");
  }
}

//* 6. Centralize Configuration: Use a configuration management strategy where all environment variables are loaded at the start and accessed through a central configuration file or object.

//? 9. Securing Environment Variables in Production
// In production environments, it's important to secure environment variables properly. Some best practices include:
//* - Use platform-specific secrets managers**: Cloud providers like AWS, Azure, and Google Cloud offer secret
//* management services (e.g., AWS Secrets Manager, Azure Key Vault) to store environment variables securely.
//* - Use encrypted environment variables**: If environment variables must be stored in a file or database, ensure they are encrypted.
//* - Restrict access**: Limit access to sensitive environment variables to only those systems or users that require them.

//? 10. Example Project Setup with Environment Variables
// Here’s a sample project setup using environment variables in a Node.js app:

// Project structure:
```
my-app/
  ├── .env
  ├── .gitignore
  ├── app.js
  └── package.json
```

// `.env` file:
```
PORT=4000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=secretpassword
```

// `.gitignore` file:
```bash
# Ignore the .env file
.env
```;
{
  // `app.js` file:
  require("dotenv").config();

  const express = require("express");
  const app = express();

  const port = process.env.PORT || 3000;
  const dbHost = process.env.DB_HOST;
  const dbUser = process.env.DB_USER;

  app.get("/", (req, res) => {
    res.send(`Connected to database at ${dbHost} as ${dbUser}`);
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// - Running the app: The app loads environment variables from the `.env` file using `dotenv` and runs an Express server on the specified port.

//? Summary of Best Practices for Environment Variables in Node.js
//* - Use environment variables to manage sensitive data and environment-specific settings.
//* - Access environment variables in Node.js through `process.env`.
//* - Use `.env` files and the `dotenv` package for managing local environment variables.
//* - Never commit `.env` files to version control.
//* - In production, use cloud secret managers or encryption for storing environment variables.
//* - Validate and centralize environment variable configuration for better maintainability and security.
