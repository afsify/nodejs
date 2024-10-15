//! ================================== Test-Driven Development (TDD) in Node.js ==================================

// Test-Driven Development (TDD) is a software development methodology where you write tests before writing the actual
// code. In TDD, development is guided by the tests, which define how the code should behave. This approach helps
// ensure that code meets the requirements from the outset and reduces the likelihood of bugs.

// Subtopics:
//? What is TDD?
//? TDD Workflow
//? Benefits of TDD
//? Setting Up TDD in Node.js
//? Testing Frameworks for TDD in Node.js
//? Writing Your First TDD Test
//? Red-Green-Refactor Cycle
//? TDD in Asynchronous Code
//? TDD in API Development
//? Best Practices for TDD
//? Example: TDD for a REST API

//? 1. What is TDD?
// Test-Driven Development (TDD) is an approach where you:
//! 1. Write a failing test (define how the code should behave).
//! 2. Write the minimum code necessary to make the test pass.
//! 3. Refactor the code to improve its structure while ensuring the test still passes.

// In Node.js, TDD is used to build applications by focusing on creating small, manageable pieces of functionality
// that are verified by automated tests.

//? 2. TDD Workflow
// The TDD process follows a simple loop known as the Red-Green-Refactor cycle:
//* 1. Red: Write a test that defines a new functionality or feature. Run it, and watch it fail because the functionality doesn’t exist yet.
//* 2. Green: Write the minimal code necessary to make the test pass.
//* 3. Refactor: Clean up the code by removing duplication, improving design, and optimizing performance without altering the behavior of the code.

//? 3. Benefits of TDD
//* - Code Quality: Writing tests first ensures that code meets requirements and behaves correctly.
//* - Refactoring Confidence: With tests in place, developers can refactor code safely, knowing tests will catch any issues.
//* - Fewer Bugs: TDD reduces the risk of introducing bugs and makes it easier to catch them early.
//* - Better Design: Forces developers to think about design and edge cases before writing the code.
//* - Faster Debugging: When code fails, tests help pinpoint the failure point.

//? 4. Setting Up TDD in Node.js
// To use TDD in Node.js, you need a testing framework. **Mocha**, **Jest**, and **Jasmine** are popular
// choices, along with **Chai** for assertions.

// Install the required tools:
```bash
npm init -y
npm install --save-dev mocha chai
```;

//? 5. Testing Frameworks for TDD in Node.js
//* - Mocha: A feature-rich JavaScript test framework for asynchronous testing.
//* - Jest: An all-in-one testing framework with built-in mocking and assertion libraries.
//* - Chai: An assertion library often used with Mocha to write more expressive tests.
//* - Sinon: A library for creating mocks, spies, and stubs to simulate dependencies in tests.

//? 6. Writing Your First TDD Test
// A TDD cycle begins with writing a failing test. Here’s an example using **Mocha** and **Chai**.
{
  // Example: Testing a simple function that adds two numbers.
  //! 1. Write a test:
  const chai = require("chai");
  const expect = chai.expect;
  const math = require("../math"); // Assuming this file will contain our add function.

  describe("Math operations", () => {
    it("should add two numbers", () => {
      const result = math.add(2, 3);
      expect(result).to.equal(5);
    });
  });
}

//! 2. Run the test: At this point, the test should fail because the `add` function hasn’t been defined yet.
```bash
npx mocha
```;

//! 3. Write the minimal code:
```javascript
// math.js
exports.add = (a, b) => a + b;
```;

//! 4. Run the test again: The test should pass now.

//! 5. Refactor: In this case, there may not be much to refactor. If the logic was more complex,
//! you would clean it up at this stage.

//? 7. Red-Green-Refactor Cycle
//* - Red: Write the test before implementing the function, ensuring that it starts as a failing test.
//* - Green: Write just enough code to make the test pass.
//* - Refactor: Improve the code's quality while keeping the tests passing.

// This process ensures you are always working on small, well-tested pieces of functionality.

//? 8. TDD in Asynchronous Code
// Node.js is highly asynchronous, so TDD in Node.js often involves testing asynchronous functions.
// Use **async/await** or return **Promises** to handle asynchronous code in tests.
{
  // Example: Testing a function that returns a Promise.
  // asyncFunction.js
  exports.getData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve("data"), 1000);
    });
  };

  // test file
  const chai = require("chai");
  const expect = chai.expect;
  const asyncFunction = require("../asyncFunction");

  describe("Async operations", () => {
    it("should return data", async () => {
      const data = await asyncFunction.getData();
      expect(data).to.equal("data");
    });
  });
}

//? 9. TDD in API Development
// TDD is especially useful in building REST APIs, where you can write tests for each endpoint before
// implementing the actual code.
{
  // Example: Testing an API endpoint using Supertest.
  //! 1. Test for a new API endpoint:
  const request = require("supertest");
  const app = require("../app"); // Express app
  const chai = require("chai");
  const expect = chai.expect;

  describe("GET /api/users", () => {
    it("should return all users", async () => {
      const res = await request(app).get("/api/users");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });
}

//! 2. Run the test: The test will fail initially because the endpoint doesn't exist.
{
  //! 3. Write the code to pass the test:
  app.get("/api/users", (req, res) => {
    res.status(200).json([{ id: 1, name: "John Doe" }]);
  });
}

//! 4. Refactor as needed after passing the test.

//? 10. Best Practices for TDD
//* - Test small units of functionality: Keep your tests focused on small, manageable pieces of functionality.
//* - Write meaningful tests: Your tests should describe the behavior of the code clearly and concisely.
//* - Don’t over-test: Avoid testing implementation details or internal workings; focus on the outcome.
//* - Automate tests: Run tests automatically during development using **npm scripts** or tools like **nodemon**.
//* - Keep tests fast: Slow tests hinder productivity. Use mocks and stubs to simulate external dependencies.

//? 11. Example: TDD for a REST API
// Here's a practical example using TDD to build a simple `GET` API endpoint.
{
  //! 1. Test first:
  const request = require("supertest");
  const app = require("../app");
  const chai = require("chai");
  const expect = chai.expect;

  describe("GET /api/items", () => {
    it("should return a list of items", async () => {
      const res = await request(app).get("/api/items");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });
}

//! 2. Run the test: It will fail because the `/api/items` endpoint does not exist.
{
  //! 3. Write the code to pass the test:
  app.get("/api/items", (req, res) => {
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    res.status(200).json(items);
  });
}
//! 4. Refactor: Clean up the code if necessary, while ensuring the test passes.

//? Summary
// Test-Driven Development (TDD) in Node.js ensures that code is built with tests in mind from the outset.
// By following the Red-Green-Refactor cycle, developers write tests that define the functionality first,
// then write code that fulfills those tests. Using tools like Mocha, Jest, Chai, and Supertest,
// TDD helps maintain high code quality, minimize bugs, and create robust applications.
