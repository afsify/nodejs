//! ===================================== HTTP Server in Node.js =====================================

// The HTTP Server in Node.js allows you to create a web server that listens for requests and responds to them.
// Node.js’s built-in `http` module provides essential functionality to build and handle requests and
// responses over HTTP and HTTPS protocols.

// Subtopics:
//? What is the HTTP module in Node.js?
//? Creating a Simple HTTP Server
//? Handling Requests and Responses
//? Routing in HTTP Server
//? Serving Static Files
//? Handling POST Requests
//? Custom Headers
//? Working with HTTPS
//? Streaming Data in HTTP
//? Error Handling in HTTP Server
//? Middleware Pattern in HTTP Server
//? Performance Considerations
//? Example: Complete HTTP Server

//? 1. What is the HTTP Module in Node.js?
// Node.js provides a built-in `http` module for building web servers and handling HTTP requests.
// The HTTP module enables Node.js to interact with web clients, sending and receiving data over the HTTP protocol.

// - Features:
//* - Can handle GET, POST, PUT, DELETE requests.
//* - It provides a low-level API, which means more control over the request and response.
//* - Can be used to create both **HTTP** and **HTTPS** servers.

//? 2. Creating a Simple HTTP Server
// To create a basic HTTP server in Node.js, you need to import the `http` module and use its `createServer`
// method to define how requests are handled.
{
  const http = require("http");

  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!");
  });

  server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  });
}

//* - `createServer()`: Creates a new HTTP server.
//* - `req`: Represents the request object.
//* - `res`: Represents the response object.
//* - `res.end()`: Ends the response and sends it to the client.

//? 3. Handling Requests and Responses
// Handling requests and responses involves interacting with the **request (req)** and **response (res)** objects.
// The request object provides information like the request method, URL, and headers, while the response object
// is used to send data back to the client.

//* - `req.method`: HTTP method (GET, POST, etc.).
//* - `req.url`: The URL of the request.
//* - `req.headers`: The headers sent by the client.
{
  const server = http.createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Home Page</h1>");
    } else if (req.url === "/about") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>About Page</h1>");
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Not Found</h1>");
    }
  });

  server.listen(3000);
}

// Here, different responses are sent based on the request URL.

//? 4. Routing in HTTP Server
// Routing is essential in directing users to different parts of a website or API. Basic routing
// can be done by checking the URL and method of the incoming request.
{
  const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/users" && method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify([{ name: "John" }, { name: "Jane" }]));
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  });

  server.listen(3000);
}

//? 5. Serving Static Files
// To serve static files such as HTML, CSS, or images, you need to read the files from the file system
// and return them in the response. Node.js's **`fs`** module is commonly used for this.
{
  const fs = require("fs");
  const http = require("http");

  const server = http.createServer((req, res) => {
    if (req.url === "/") {
      fs.readFile("index.html", (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end("Error loading file");
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    }
  });

  server.listen(3000);
}

//? 6. Handling POST Requests
// POST requests typically contain data in the body that needs to be processed. Node.js does not
// automatically parse incoming data, so you need to handle it manually.
{
  const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/submit") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        console.log("Data received:", body);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("Data received");
      });
    }
  });

  server.listen(3000);
}

// - `req.on('data')`: Collects incoming data chunks.
// - `req.on('end')`: Fires when all data has been received.

//? 7. Custom Headers
// You can set custom headers for your HTTP responses using the **`res.setHeader()`** or **`res.writeHead()`** methods.
{
  const server = http.createServer((req, res) => {
    res.setHeader("X-Custom-Header", "MyHeaderValue");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Custom header added");
  });

  server.listen(3000);
}

//? 8. Working with HTTPS
// To create a secure server, you need to use the **`https`** module and provide SSL/TLS certificates.
{
  const https = require("https");
  const fs = require("fs");

  const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  };

  const server = https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end("Secure connection");
  });

  server.listen(3000);
}

//? 9. Streaming Data in HTTP
// Node.js supports streaming data, which is beneficial for large files or real-time applications.
{
  // Example: Streaming a large file:
  const fs = require("fs");
  const server = http.createServer((req, res) => {
    const stream = fs.createReadStream("largefile.txt");
    stream.pipe(res);
  });

  server.listen(3000);
}

// Here, `pipe()` method sends data to the response as it’s being read from the file system.

//? 10. Error Handling in HTTP Server
// It's essential to handle errors in your server to ensure it runs smoothly. Errors can occur when
// reading files, during network issues, etc.
{
  const server = http.createServer((req, res) => {
    try {
      // Application logic here
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  });

  server.listen(3000);
}

//? 11. Middleware Pattern in HTTP Server
// Node.js allows you to implement middleware-like patterns by chaining multiple functions that handle requests.
{
  const middleware = (req, res, next) => {
    console.log("Middleware called");
    next();
  };

  const server = http.createServer((req, res) => {
    middleware(req, res, () => {
      res.writeHead(200);
      res.end("Request handled");
    });
  });

  server.listen(3000);
}

//? 12. Performance Considerations
//* - Use of Clustering: Use Node.js’s **cluster** module to run multiple processes on multiple CPU cores.
//* - Load Balancing: Implement load balancing strategies for scalability.
//* - Compression: Enable **gzip** compression for responses to reduce data transfer size.

//? 13. Example: Complete HTTP Server
// Here's a more comprehensive example, demonstrating routing, serving static files, handling POST requests,
// and custom headers.
{
  const http = require("http");
  const fs = require("fs");

  const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
      fs.readFile("index.html", (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end("Internal Server Error");
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    } else if (req.method === "POST" && req.url === "/submit") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Data received");
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  });

  server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
}

//? Conclusion
// The HTTP Server in Node.js is the core for building web applications. It provides flexibility and
// control over request/response handling, routing, and other HTTP features. Node.js’s event-driven,
// non-blocking nature makes it highly performant and scalable for web services.
