//! ===================================== Unit Testing in Node.js =====================================

// Unit Testing is the process of testing individual units or components of an application in isolation. 
// In Node.js, unit tests are typically written to verify that a single function, method, or module behaves 
// as expected, without any external dependencies or side effects.

// Subtopics:
//? What is Unit Testing?
//? Benefits of Unit Testing
//? Setting Up Unit Testing in Node.js
//? Testing Frameworks for Unit Testing in Node.js
//? Writing Your First Unit Test
//? Unit Testing Asynchronous Code
//? Unit Testing with Mocks and Stubs
//? Unit Testing API Endpoints
//? Best Practices for Unit Testing
//? Example: Unit Testing a Simple Function

//? 1. What is Unit Testing?
// Unit testing focuses on validating the functionality of small units of code, such as a single function 
// or method. The goal is to test each part of the code separately to ensure that it behaves as expected in isolation.

// In Node.js, unit tests are written to verify that individual functions, modules, or classes work correctly, 
// without any interaction with external systems like databases, files, or APIs.

//? 2. Benefits of Unit Testing
//* - Code Quality: Ensures that each individual unit of code functions as intended, catching bugs early in the development cycle.
//* - Easier Debugging: By isolating the unit under test, debugging becomes simpler when a test fails.
//* - Faster Development: With tests in place, code can be refactored or extended with confidence that existing functionality won't break.
//* - Regression Prevention: Unit tests act as a safety net, ensuring that new changes don't break existing features.

//? 3. Setting Up Unit Testing in Node.js
// To begin unit testing in Node.js, you need to install a testing framework. **Mocha**, **Jest**, and **Jasmine** 
// are popular choices.

// Install Mocha and Chai for unit testing:
```bash
npm init -y
npm install --save-dev mocha chai
```;

//* - Mocha: A testing framework that provides structure for writing and running tests.
//* - Chai: An assertion library that makes your tests more readable and expressive.

//? 4. Testing Frameworks for Unit Testing in Node.js
//* - Mocha: A flexible testing framework that can be paired with any assertion library.
//* - Jest: A popular all-in-one testing framework with built-in support for mocking, coverage reports, and more.
//* - Chai: An assertion library often used with Mocha to write readable tests.
//* - Sinon: A library for creating mocks, spies, and stubs to simulate external dependencies in unit tests.

//? 5. Writing Your First Unit Test
// Let’s write a simple unit test for a Node.js function.

// Example: Testing a function that adds two numbers.
//! 1. Create a function to test:
```javascript
// math.js
exports.add = (a, b) => a + b;
```;

{
//! 2. Write a unit test using Mocha and Chai:
// test/math.test.js
const chai = require('chai');
const expect = chai.expect;
const math = require('../math'); // Importing the module to test

describe('Math functions', () => {
  it('should add two numbers correctly', () => {
    const result = math.add(2, 3);
    expect(result).to.equal(5);
  });
});
}

//! 3. Run the test:
```bash
npx mocha
```;

// You should see a success message if the test passes.

//? 6. Unit Testing Asynchronous Code
// Many Node.js functions are asynchronous, so unit testing asynchronous code is a common requirement.
{
// Example: Testing a function that returns a Promise.
// asyncFunction.js
exports.getData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('data'), 1000);
  });
};

// test/asyncFunction.test.js
const chai = require('chai');
const expect = chai.expect;
const asyncFunction = require('../asyncFunction');

describe('Async function tests', () => {
  it('should return data asynchronously', async () => {
    const data = await asyncFunction.getData();
    expect(data).to.equal('data');
  });
});
}

//? 7. Unit Testing with Mocks and Stubs
// Mocks and stubs are used to simulate external dependencies during unit tests, ensuring the 
// unit under test can be isolated.

//* - Mocks: Simulate the behavior of external components by checking interactions.
//* - Stubs: Replace real methods with pre-defined behavior, making it easier to test units independently.

// Example: Testing a function that relies on external services (using Sinon):
```bash
npm install --save-dev sinon
```;

{
// userService.js
const axios = require('axios');

exports.getUser = async (userId) => {
  const response = await axios.get(`/users/${userId}`);
  return response.data;
};

// test/userService.test.js
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const axios = require('axios');
const userService = require('../userService');

describe('User service tests', () => {
  it('should get user data from the API', async () => {
    const stub = sinon.stub(axios, 'get').resolves({ data: { id: 1, name: 'John' } });
    
    const user = await userService.getUser(1);
    expect(user).to.deep.equal({ id: 1, name: 'John' });
    
    stub.restore();
  });
});
}

//? 8. Unit Testing API Endpoints
// Unit testing API endpoints involves testing individual route handlers. You can use a library like 
// Supertest to test API endpoints.

// Example: Unit testing a simple API route.
```bash
npm install --save-dev supertest
```;

{
// app.js
const express = require('express');
const app = express();

app.get('/api/items', (req, res) => {
  res.json([{ id: 1, name: 'Item 1' }]);
});

module.exports = app;

// test/api.test.js
const request = require('supertest');
const app = require('../app');
const chai = require('chai');
const expect = chai.expect;

describe('API Tests', () => {
  it('should return a list of items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
}

//? 9. Best Practices for Unit Testing
//* - Isolate tests: Ensure each test is independent from external dependencies like databases or APIs.
//* - Use mocks and stubs: Simulate dependencies so that tests run quickly and reliably.
//* - Test edge cases: Write tests for both expected and unexpected inputs, ensuring your code handles all scenarios.
//* - Keep tests small: Each unit test should focus on testing a single function or piece of functionality.
//* - Run tests frequently: Automate the process of running tests to catch issues early.
//* - Use coverage tools: Measure how much of your code is being tested with tools like **nyc** (Istanbul) to ensure comprehensive coverage.

//? 10. Example: Unit Testing a Simple Function
// Here’s a full example demonstrating a unit test for a simple function.

//! 1. Create a function to test:
```javascript
// calculator.js
exports.multiply = (a, b) => a * b;
```
{
//! 2. Write a test:
// test/calculator.test.js
const chai = require('chai');
const expect = chai.expect;
const calculator = require('../calculator');

describe('Calculator Tests', () => {
  it('should multiply two numbers correctly', () => {
    const result = calculator.multiply(4, 5);
    expect(result).to.equal(20);
  });
});
}

//! 3. Run the test:
```bash
npx mocha
```;

// If the test passes, it confirms the `multiply` function works as expected.

//? Summary
// Unit Testing in Node.js ensures that each unit of the application is tested independently. 
// With tools like **Mocha**, **Chai**, and **Sinon**, you can write robust unit tests that verify 
// individual functions or methods without external dependencies. Unit testing asynchronous code, APIs, 
// and using mocks/stubs are essential to ensure code quality, minimize bugs, and promote confident refactoring.