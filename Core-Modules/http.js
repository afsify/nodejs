//! ======================================== HTTP Module ========================================

// The http module in Node.js is used to create HTTP servers and clients, enabling communication over the web.
// It provides a simple API for creating web servers and making HTTP requests.

// Subtopics and Details:
//? Creating an HTTP Server
//? Handling Requests and Responses
//? Routing
//? Serving Static Files
//? Handling Different HTTP Methods
//? Parsing Request Body
//? Setting Response Headers
//? Error Handling
//? Making HTTP Requests

//? 1. Creating an HTTP Server
// To create an HTTP server, you need to import the http module and use the createServer method.
{
  const http = require("http");

  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!\n");
  });

  server.listen(3000, "127.0.0.1", () => {
    console.log("Server running at http://127.0.0.1:3000/");
  });
}

//? 2. Handling Requests and Responses
// In the callback function of createServer, req represents the request object and res represents the response object.
{
  const http = require("http");

  const server = http.createServer((req, res) => {
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!\n");
  });

  server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  });
}

//? 3. Routing
// Routing is determining how an application responds to a client request to a particular endpoint.
{
  const http = require("http");

  const server = http.createServer((req, res) => {
    if (req.url === "/") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Home Page");
    } else if (req.url === "/about") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("About Page");
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Page Not Found");
    }
  });

  server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  });
}

//? 4. Serving Static Files
// To serve static files, you'll need the fs module to read files and serve their contents.
{
  const http = require("http");
  const fs = require("fs");
  const path = require("path");

  const server = http.createServer((req, res) => {
    let filePath = path.join(
      __dirname,
      req.url === "/" ? "index.html" : req.url
    );

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.statusCode = 404;
          res.end("Page Not Found");
        } else {
          res.statusCode = 500;
          res.end("Server Error");
        }
      } else {
        res.statusCode = 200;
        res.end(content, "utf8");
      }
    });
  });

  server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  });
}

//? 5. Handling Different HTTP Methods
// Different HTTP methods (GET, POST, PUT, DELETE) can be handled using conditional checks on req.method.
{
  const http = require("http");

  const server = http.createServer((req, res) => {
    if (req.method === "GET") {
      res.statusCode = 200;
      res.end("GET request received");
    } else if (req.method === "POST") {
      res.statusCode = 200;
      res.end("POST request received");
    } else {
      res.statusCode = 405;
      res.end(`${req.method} not allowed`);
    }
  });

  server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  });
}

//? 6. Parsing Request Body
// To parse the request body, you need to collect the data chunks and concatenate them.
{
  const http = require("http");

  const server = http.createServer((req, res) => {
    if (req.method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        console.log("Body:", body);
        res.statusCode = 200;
        res.end("Received POST data");
      });
    } else {
      res.statusCode = 200;
      res.end("Send a POST request to see the body parsing");
    }
  });

  server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  });
}

//? 7. Setting Response Headers
// You can set response headers using res.setHeader.
{
  const http = require("http");

  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Hello, World!" }));
  });

  server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  });
}

//? 8. Error Handling
// Error handling ensures your server responds gracefully to errors.
{
  const http = require("http");

  const server = http.createServer((req, res) => {
    try {
      if (req.url === "/error") {
        throw new Error("Something went wrong!");
      }
      res.statusCode = 200;
      res.end("Hello, World!");
    } catch (err) {
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  });

  server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  });
}

//? 9. Making HTTP Requests
// The http module can also make HTTP requests using the request method.
{
  const http = require("http");

  const options = {
    hostname: "jsonplaceholder.typicode.com",
    port: 80,
    path: "/todos/1",
    method: "GET",
  };

  const req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log(JSON.parse(data));
    });
  });

  req.on("error", (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.end();
}
