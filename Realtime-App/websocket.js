//! ===================================== Websocket in Node.js =====================================

// WebSocket is a communication protocol that provides full-duplex communication channels over a single
// TCP connection. It allows for real-time, bidirectional communication between a client (such as a web browser)
// and a server, which is particularly useful for applications where data is frequently exchanged
// (e.g., chat apps, real-time dashboards, online gaming).

// Unlike HTTP, WebSocket connections remain open and allow for continuous communication without the need
// for repeated requests and responses.

//? What is WebSocket?
//? WebSocket vs HTTP
//? WebSocket in Node.js: Installation
//? Creating a WebSocket Server
//? Establishing WebSocket Client Connections
//? Sending and Receiving Messages
//? Handling Connection and Disconnection Events
//? Broadcasting Messages
//? WebSocket Ping/Pong Heartbeat
//? Security Considerations
//? Error Handling
//? Integrating WebSocket with Express.js
//? WebSocket Example Applications

//? 1. What is WebSocket?
// WebSocket is a communication protocol that allows a persistent, two-way channel between a client and
// a server. It is based on a standard TCP socket connection but is designed specifically for web applications.
// Once established, the WebSocket connection remains open, allowing both the client and server to send messages
// to each other at any time.

// Key Features:
//* - Full-duplex communication: Both the client and server can send messages independently.
//* - Persistent connection: The connection stays open as long as needed.
//* - Low latency: Ideal for real-time applications like chat apps, live updates, and online games.

//? 2. WebSocket vs HTTP
Subtopics: ```
| Aspect       | WebSocket                                                    | HTTP                                                    |
|--------------|--------------------------------------------------------------|---------------------------------------------------------|
| Communication| Full-duplex, both client and server can send messages anytime| Request-response model, client requests, server responds|
| Connection   | Persistent, stays open until explicitly closed               | Stateless, closes after every request-response cycle    |
| Latency      | Low latency, real-time data exchange                         | Higher latency due to the overhead of multiple requests |
| Use Cases    | Real-time apps, gaming, live updates, chat apps              | Static websites, RESTful APIs                           |
```;

// WebSocket is preferred for real-time applications where continuous communication is needed.

//? 3. WebSocket in Node.js: Installation
// In Node.js, the `ws` package is commonly used to work with WebSocket connections. It provides an efficient
// API to create WebSocket servers and clients.

// To install the `ws` package:
//! npm install ws

//? 4. Creating a WebSocket Server
// Once you install the `ws` package, you can create a WebSocket server in Node.js.
{
  // Example of a WebSocket Server:
  const WebSocket = require("ws");

  const wss = new WebSocket.Server({ port: 8080 });

  wss.on("connection", (ws) => {
    console.log("New client connected");

    // Send a message to the client
    ws.send("Welcome to the WebSocket server!");

    // Listen for messages from the client
    ws.on("message", (message) => {
      console.log(`Received: ${message}`);
    });

    // Handle connection close
    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
}

// This creates a WebSocket server on port 8080. It listens for client connections and handles incoming messages,
// sending responses as needed.

//? 5. Establishing WebSocket Client Connections
// To establish a WebSocket connection from the client side, you use the WebSocket API that is built into modern browsers.

// Client-Side Example:
// ```html
// <script>
//   const ws = new WebSocket('ws://localhost:8080');

//   ws.onopen = () => {
//     console.log('Connected to WebSocket server');
//     ws.send('Hello, Server!');
//   };

//   ws.onmessage = (event) => {
//     console.log(`Message from server: ${event.data}`);
//   };

//   ws.onclose = () => {
//     console.log('Connection closed');
//   };
// </script>
// ```

// The client establishes a connection with the WebSocket server at `ws://localhost:8080` and can send and receive messages.

//? 6. Sending and Receiving Messages
// Once a WebSocket connection is established, both the client and server can send and receive messages
// without the need for additional requests.

// Server-Side Example:
```javascript
ws.send('Hello from the server!');
```;

// Client-Side Example:
```javascript
ws.send('Hello from the client!');
```;

// Receiving Messages is done through the `onmessage` event on both sides:
// ```javascript
// ws.on('message', (message) => {
//   console.log(`Received: ${message}`);
// });
// ```

//? 7. Handling Connection and Disconnection Events
// WebSocket servers need to handle clients connecting and disconnecting.

// Server-Side Example:
```javascript
wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
```;

// Client-Side Example:
```javascript
ws.onclose = () => {
  console.log('Connection closed by the server');
};
```;

//? 8. Broadcasting Messages
// WebSocket servers often need to send messages to all connected clients. This can be done by iterating
// over all WebSocket connections.

// Server Broadcasting Example:
```javascript
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);  // Broadcast the message to all clients
      }
    });
  });
});
```;

// This broadcasts messages received from one client to all connected clients.

//? 9. WebSocket Ping/Pong Heartbeat
// WebSocket connections can sometimes be interrupted without proper disconnection, so a ping/pong
// mechanism is often used to detect and handle broken connections.

// Server-Side Example:
```javascript
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('pong', () => {
  ws.isAlive = true;
});
```;

// This sends a ping to each client every 30 seconds and expects a pong response. If no pong is received,
// the connection is terminated.

//? 10. Security Considerations
// WebSocket communications, like any other, are vulnerable to various attacks:
//* - Cross-Site WebSocket Hijacking: Use proper CORS configuration and token-based authentication.
//* - Data Encryption: Always use wss:// (WebSocket over TLS) for encrypted communication.

//? 11. Error Handling
// WebSocket connections can fail for several reasons (network issues, protocol errors, etc.),
// so it's important to handle errors properly.

// Server-Side Example:
```javascript
ws.on('error', (err) => {
  console.error('WebSocket error:', err);
});
```;

// Client-Side Example:
```javascript
ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};
```;

//? 12. Integrating WebSocket with Express.js
// You can integrate WebSocket into an existing Express.js application by sharing the same server instance.
{
  const express = require("express");
  const http = require("http");
  const WebSocket = require("ws");

  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("WebSocket connected");
  });

  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

// This allows you to run both your Express server and WebSocket server on the same port.

//? 13. WebSocket Example Applications

//* - Chat applications: Allow users to communicate in real-time.
//* - Stock market updates: Provide live price changes.
//* - Collaborative tools: Real-time collaboration like Google Docs.
//* - Multiplayer gaming: Synchronizing game states between players in real-time.
//* - Live dashboards: Displaying real-time analytics or sensor data.

//? Summary of WebSocket in Node.js
// WebSocket in Node.js enables real-time, bidirectional communication between clients and servers,
// making it ideal for applications that require real-time updates or interaction. Unlike the traditional
// HTTP request-response cycle, WebSocket opens a persistent connection, allowing both parties to send
// and receive messages with low latency. The `ws` package makes it easy to implement WebSocket servers
// in Node.js, and it is commonly used in chat apps, live updates, collaborative platforms, and more.
