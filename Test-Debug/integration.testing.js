//! ===================================== Integration Testing in Node.js =====================================

// Integration testing involves testing multiple components or modules of an application together to ensure they
// work as expected when combined. Unlike unit testing, which focuses on individual functions, integration testing
// ensures that the different parts of the system interact correctly. In Node.js, integration testing is particularly
// useful for verifying the interaction between routes, controllers, databases, and external services.

// Subtopics:
//? What is Integration Testing?
//? Difference Between Unit and Integration Testing
//? Setting Up Integration Tests in Node.js
//? Testing Frameworks for Integration Testing
//? Database Integration Testing
//? API Integration Testing
//? Testing Asynchronous Code
//? Mocking in Integration Tests
//? Best Practices for Integration Testing
//? Example: Integration Testing a REST API

//? 1. What is Integration Testing?
// Integration testing verifies that different modules or components of an application work together as expected.
// It checks how well these parts communicate, ensuring that the combined functionality of multiple units operates
// as designed.

//? 2. Difference Between Unit and Integration Testing
//* - Unit Testing: Tests individual functions, methods, or classes. It ensures that a specific, isolated part
//* of the code works as expected.

//* - Integration Testing: Tests how various components work together. It focuses on the communication between modules,
//* typically covering routes, database operations, and APIs.

```
| Aspect              | Unit Testing                          | Integration Testing                   |
|---------------------|---------------------------------------|---------------------------------------|
| Scope               | Individual functions/modules          | Multiple components combined          |
| Focus               | Functionality in isolation            | Interactions between components       |
| Dependencies        | Mocks and stubs for dependencies      | Real or mock databases/APIs           |
| Speed               | Fast                                  | Slower due to external dependencies   |
| Complexity          | Low                                   | Higher due to integration complexities|
```;

//? 3. Setting Up Integration Tests in Node.js
// Before writing integration tests, you need a proper setup for your testing environment. This typically
// involves using a testing framework like **Mocha**, **Jest**, or **Supertest**, along with a test runner
// and an assertion library like Chai.

// Steps:
//! 1. Install necessary packages:
```bash
npm install --save-dev mocha chai supertest
```;

//! 2. Create a test file (e.g., `test/integration.test.js`):
```bash
mkdir test
touch test/integration.test.js
```;

//! 3. Write integration tests using your chosen framework and libraries.

//? 4. Testing Frameworks for Integration Testing
// Some common frameworks and tools for integration testing in Node.js include:

//* - Mocha: A flexible test framework for asynchronous testing.
//* - Jest: A zero-config testing framework with built-in assertion and mocking capabilities.
//* - Chai: An assertion library often used with Mocha.
//* - Supertest: A library for testing HTTP endpoints.
//* - Sinon: For stubs, spies, and mocks in integration tests.

//? 5. Database Integration Testing
// In database integration tests, you need to test how your application interacts with the database,
// ensuring that queries, inserts, updates, and deletes work as expected.

//* - Use in-memory databases like SQLite or MongoDB in-memory server to avoid modifying real data.
//* - Alternatively, you can set up a test database specifically for integration testing.

{
  // Example:
  const mongoose = require("mongoose");
  const User = require("../models/User");

  describe("Database Integration Tests", () => {
    before(async () => {
      await mongoose.connect("mongodb://localhost/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });

    after(async () => {
      await mongoose.disconnect();
    });

    it("should create a new user", async () => {
      const newUser = new User({ name: "John", email: "john@example.com" });
      const savedUser = await newUser.save();
      chai.expect(savedUser.name).to.equal("John");
    });
  });
}

//? 6. API Integration Testing
// API integration testing ensures that your API endpoints work correctly and return the expected results.
// Supertest is commonly used for this purpose.

{
  // Example:
  const request = require("supertest");
  const app = require("../app"); // Your Express app

  describe("GET /api/users", () => {
    it("should return all users", async () => {
      const res = await request(app).get("/api/users");
      chai.expect(res.status).to.equal(200);
      chai.expect(res.body).to.be.an("array");
    });
  });
}

//? 7. Testing Asynchronous Code
// Many Node.js applications involve asynchronous operations (e.g., database calls, API requests).
// When writing integration tests for asynchronous code, ensure that the test framework supports
// async/await or promise-based tests.

{
  // Example (using async/await):
  it("should fetch a user asynchronously", async () => {
    const res = await request(app).get("/api/users/123");
    chai.expect(res.status).to.equal(200);
    chai.expect(res.body).to.have.property("name");
  });
}

//? 8. Mocking in Integration Tests
// In some cases, you may need to mock external dependencies (e.g., third-party APIs) to isolate the part
// of the system you’re testing. **Sinon** is a popular library for creating mocks, stubs, and spies.
{
  // Example (using Sinon to mock an external API):
  const sinon = require("sinon");
  const externalApi = require("../services/externalApi");

  describe("API Integration Test with Mocks", () => {
    let apiStub;

    before(() => {
      apiStub = sinon
        .stub(externalApi, "fetchData")
        .resolves({ data: "mocked data" });
    });

    after(() => {
      apiStub.restore();
    });

    it("should fetch mocked data from the external API", async () => {
      const res = await request(app).get("/api/data");
      chai.expect(res.body.data).to.equal("mocked data");
    });
  });
}

//? 9. Best Practices for Integration Testing
//* - Use a test database: Always run integration tests against a separate test database to avoid altering production data.
//* - Clear database between tests: Ensure that each test starts with a clean state by resetting or clearing the database between tests.
//* - Test real-world scenarios: Focus on real-life use cases, such as user registration, login, and complex database queries.
//* - Mock external services: When testing components that rely on third-party services (e.g., payment gateways), use mocks to simulate their behavior.
//* - Automate tests: Run integration tests automatically during the CI/CD pipeline to detect issues early.

//? 10. Example: Integration Testing a REST API
// Here's an example of a full integration test for a REST API that interacts with a MongoDB database.
{
  // App setup (`app.js`):
  const express = require("express");
  const mongoose = require("mongoose");
  const app = express();

  mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });

  app.use(express.json());

  app.get("/api/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
  });

  module.exports = app;
}

{
  // Test file (`test/integration.test.js`):
  const mongoose = require("mongoose");
  const request = require("supertest");
  const chai = require("chai");
  const app = require("../app");

  describe("User API Integration Tests", () => {
    before(async () => {
      await mongoose.connect("mongodb://localhost/test", {
        useNewUrlParser: true,
      });
    });

    after(async () => {
      await mongoose.disconnect();
    });

    it("should fetch all users", async () => {
      const res = await request(app).get("/api/users");
      chai.expect(res.status).to.equal(200);
      chai.expect(res.body).to.be.an("array");
    });
  });
}

//? Summary
// Integration testing in Node.js ensures that the different components of your application work together
// as expected. It typically involves testing routes, databases, and external services, often using tools
// like Mocha, Chai, and Supertest. By following best practices—such as using a separate test database,
// mocking external dependencies, and automating tests in CI/CD pipelines—you can ensure that your system
// is thoroughly tested in real-world conditions.
