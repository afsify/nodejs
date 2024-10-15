//! ===================================== Callback in Node.js =====================================

// A callback is a function passed into another function as an argument, which is then invoked
// inside the outer function to complete some kind of routine or action. In Node.js,
// callbacks are a common way to handle asynchronous operations. Before Promises and `async/await`became popular,
// callbacks were the primary method of managing asynchronous code in JavaScript.

// Subtopics and Details:
//? What is a Callback?
//? Synchronous vs Asynchronous Callbacks
//? Error-First Callbacks
//? Callback Hell
//? Callback in File System Operations
//? Using Callbacks in Networking
//? Handling Multiple Callbacks
//? Improving Callback Code
//? Callback Alternatives (Promises and Async/Await)

//? 1. What is a Callback?
// A callback function is a function that is passed as an argument to another function,
// and is called (or executed) after some operation has been completed. In Node.js,
// callbacks are often used to handle asynchronous operations.
{
  function fetchData(callback) {
    setTimeout(() => {
      callback("Data fetched");
    }, 1000);
  }

  fetchData((data) => {
    console.log(data); // Outputs: Data fetched after 1 second
  });
}

//? 2. Synchronous vs Asynchronous Callbacks
// Synchronous Callback:A callback that is executed immediately after the operation is complete.
// Asynchronous Callback: A callback that is executed at a later time when an asynchronous operation has completed.
{
  // Synchronous Callback Example:
  function greet(name, callback) {
    console.log("Hello, " + name);
    callback();
  }

  greet("John", () => {
    console.log("Callback executed");
  });
}

{
  // Asynchronous Callback Example:
  function delayedGreet(name, callback) {
    setTimeout(() => {
      console.log("Hello, " + name);
      callback();
    }, 1000);
  }

  delayedGreet("John", () => {
    console.log("Callback executed after delay");
  });
}

//? 3. Error-First Callbacks
// In Node.js, it's a common pattern to use **error-first callbacks**. This means that the first argument
// of the callback is an error object, and the subsequent arguments contain the data. This pattern allows
// developers to handle errors and results in a single callback.
{
  function fetchData(callback) {
    const success = true; // Simulating success or failure

    if (success) {
      callback(null, "Data fetched successfully");
    } else {
      callback(new Error("Failed to fetch data"), null);
    }
  }

  fetchData((err, data) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(data); // Outputs: Data fetched successfully
    }
  });
}

//? 4. Callback Hell
// Callback hell (also known as the pyramid of doom) occurs when there are multiple nested callbacks,
// making the code difficult to read and maintain.
{
  asyncOperation1((err, result1) => {
    if (err) return console.error(err);
    asyncOperation2(result1, (err, result2) => {
      if (err) return console.error(err);
      asyncOperation3(result2, (err, result3) => {
        if (err) return console.error(err);
        console.log(result3);
      });
    });
  });
}

// Callback hell can make it hard to debug and maintain code. There are several ways to mitigate this,
// such as breaking callbacks into separate functions, using Promises, or `async/await`.

//? 5. Callback in File System Operations
// Node.js uses callbacks extensively in its asynchronous APIs, especially in modules like `fs` (File System).
{
  // Example (Reading a file with a callback):
  const fs = require("fs");

  fs.readFile("example.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    console.log("File content:", data);
  });
}

// In this example, the `readFile` method takes a callback that receives an error (if one occurs)
// and the file data once the read operation is complete.

//? 6. Using Callbacks in Networking
// Callbacks are also used in networking and HTTP operations, like sending HTTP requests or handling incoming requests.
{
  // Example (HTTP server with a callback):
  const http = require("http");

  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!");
  });

  server.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
}

// In this example, the `createServer` method takes a callback that gets invoked whenever an incoming request is received.

//? 7. Handling Multiple Callbacks
// In complex applications, managing multiple callbacks becomes tricky. Developers must ensure that
// callbacks are properly chained and that the application logic flows correctly.
{
  function fetchData1(callback) {
    setTimeout(() => {
      callback(null, "Data 1");
    }, 1000);
  }

  function fetchData2(callback) {
    setTimeout(() => {
      callback(null, "Data 2");
    }, 500);
  }

  function processData() {
    fetchData1((err, result1) => {
      if (err) return console.error(err);

      fetchData2((err, result2) => {
        if (err) return console.error(err);

        console.log("Both results:", result1, result2); // Outputs after both are fetched
      });
    });
  }

  processData();
}

//? 8. Improving Callback Code
// Named Functions: Instead of using anonymous callback functions, you can name them to make the code more readable.
// Modularize Code: Split callback logic into separate modules or functions to avoid nested code.
// Promises and `async/await`: Refactor callback-based code to use Promises or `async/await` for better readability
// and structure.
{
  // Example (Named Function):
  function onFetchData(err, data) {
    if (err) return console.error("Error:", err);
    console.log("Data fetched:", data);
  }

  fetchData(onFetchData);
}

//? 9. Callback Alternatives (Promises and Async/Await)
// Modern JavaScript uses **Promises** and `async/await` to simplify asynchronous code.
// These alternatives make asynchronous code more readable and prevent callback hell.
{
  // Example (Using Promises):
  function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = true;
        if (success) {
          resolve("Data fetched");
        } else {
          reject(new Error("Fetch failed"));
        }
      }, 1000);
    });
  }

  fetchData()
    .then((data) => console.log(data)) // Outputs: Data fetched
    .catch((err) => console.error(err));
}

{
  // Example (Using Async/Await):
  async function getData() {
    try {
      const data = await fetchData();
      console.log(data); // Outputs: Data fetched
    } catch (error) {
      console.error("Error:", error);
    }
  }

  getData();
}
