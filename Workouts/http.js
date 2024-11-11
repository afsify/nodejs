// Import the built-in 'http' module to create an HTTP server
const http = require("http");

// Import the built-in 'url' module to parse the URL of incoming requests
const url = require("url");

// Create a server instance using http.createServer
// The server will listen for incoming requests and send appropriate responses based on the URL path
const helloServer = http
  .createServer((req, res) => {
    // Parse the request URL and get the pathname
    const rUrl = url.parse(req.url, true).pathname;

    // Check if the requested URL path is the root ("/")
    if (rUrl == "/") {
      // 'req' represents the request object, 'res' represents the response object
      res.write("Hello from HTTP Module"); // Send a response message to the client for the root path
      res.end(); // End the response so the client knows the message is complete

      // Check if the requested URL path is "/about"
    } else if (rUrl == "/about") {
      res.write("About Page"); // Send a response message to the client for the "/about" path
      res.end(); // End the response for the "/about" page

      // Check if the requested URL path is "/contact"
    } else if (rUrl == "/contact") {
      res.write("Contact Page"); // Send a response message to the client for the "/contact" path
      res.end(); // End the response for the "/contact" page
    }
  })
  .listen("8080"); // Make the server listen for incoming requests on port 8080

// Export the helloServer instance for use in other modules/files
module.exports = helloServer;
