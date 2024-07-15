//! ======================================== Getting Started ========================================

// Once you have downloaded and installed Node.js on your computer,
// let's try to display "Hello World" in a web browser.

// Create a Node.js file named "myfirst.js", and add the following code:

var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);