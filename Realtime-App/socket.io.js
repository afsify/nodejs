//! ===================================== Socket.IO in Node.js =====================================

// Socket.IO is a library that enables real-time, bidirectional, and event-based communication between
// web clients and servers. It is built on top of WebSockets and provides additional features like
// fallback to HTTP long-polling and automatic reconnections. Socket.IO is commonly used for building
// chat applications, real-time dashboards, collaborative platforms, and multiplayer games.

// Subtopics:
//? What is Socket.IO?
//? Socket.IO vs WebSocket
//? Installing Socket.IO
//? Basic Setup for Server and Client
//? Socket.IO Events and Listeners
//? Emitting and Receiving Messages
//? Namespaces
//? Rooms
//? Broadcasting Messages
//? Handling Disconnections
//? Authentication with Socket.IO
//? Error Handling in Socket.IO
//? Scaling Socket.IO with Redis Adapter
//? Example Applications Using Socket.IO

//? 1. What is Socket.IO?
// Socket.IO is a library that allows real-time communication between a client (typically a web browser)
// and a server. It supports real-time, bi-directional, and event-based communication and can seamlessly
// switch between WebSocket, polling, and other transport mechanisms if necessary.

// Socket.IO consists of two parts:
// - Client-side library: Runs in the browser and establishes the connection to the server.
// - Server-side library: Runs in Node.js and manages connections with multiple clients.

//? 2. Socket.IO vs WebSocket
// WebSocket is a protocol that allows for full-duplex communication over a single TCP connection.
// However, WebSocket is low-level and doesn't handle many common tasks needed for production apps
// (e.g., reconnections, fallback mechanisms).

// Socket.IO builds on WebSocket and adds features like:
//* - Automatic reconnections: If the connection drops, Socket.IO automatically tries to reconnect.
//* - Fallback to HTTP long-polling: If WebSocket isn’t supported, Socket.IO can fall back to long-polling.
//* - Multiplexing: Allows you to divide connections into different namespaces and rooms.
//* - Event-driven architecture: Allows emitting and handling custom events, making the interaction flexible.

//? 3. Installing Socket.IO
// Socket.IO requires two components: a server-side library and a client-side library.

// Install the server-side Socket.IO package in your Node.js app:
//! npm install socket.io

// Install the client-side library (usually done via CDN or npm):
//! npm install socket.io-client

//? 4. Basic Setup for Server and Client
{
  // Server Setup (Node.js):
  const express = require("express");
  const http = require("http");
  const { Server } = require("socket.io");

  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

// Client Setup (HTML + JS):
```html
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
</script>
```;

// This establishes a basic connection between a client and the server, and logs connection and disconnection events.

//? 5. Socket.IO Events and Listeners
// Socket.IO is event-driven, which means it operates based on events emitted by the server or client.
{
  // Server-side Example:
  io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
      console.log("message: " + msg);
    });
  });
}

{
  // Client-side Example:
  socket.emit("chat message", "Hello, World!");
}

// Here, the server listens for a `'chat message'` event, and the client emits this event with a message.

//? 6. Emitting and Receiving Messages
// In Socket.IO, you can emit and listen for custom events.
{
  // Server emitting to all clients:
  io.emit("message", "Hello, clients!");
}

{
  // Client-side receiving:
  socket.on("message", (data) => {
    console.log(data); // 'Hello, clients!'
  });
}

{
  // Emitting to a specific client:
  socket.emit("private message", "Hello, this is private!");
}

//? 7. Namespaces
// Namespaces are a way to separate the communication logic on the server. Different clients can connect to
// different namespaces to handle different functionality.
{
  // Server Setup:
  const chatNamespace = io.of("/chat");
  chatNamespace.on("connection", (socket) => {
    console.log("User connected to chat");
  });
}

{
  // Client Setup:
  const chatSocket = io("/chat");
  chatSocket.on("connect", () => {
    console.log("Connected to chat namespace");
  });
}

//? 8. Rooms
// Rooms allow clients to join specific groups for more granular control over message broadcasting.
{
  // Server Setup:
  io.on("connection", (socket) => {
    socket.join("room1");

    socket.to("room1").emit("message", "Welcome to room 1");
  });
}

{
  // Client:
  socket.on("message", (msg) => {
    console.log(msg); // 'Welcome to room 1'
  });
}

//? 9. Broadcasting Messages
// Broadcasting sends a message to all connected clients except the one who sent the message.
{
  // Server:
  io.on("connection", (socket) => {
    socket.broadcast.emit("message", "A new user has joined");
  });
}

//? 10. Handling Disconnections
// Socket.IO provides the **`disconnect`** event to handle client disconnections.
{
  // Server:
  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}

//? 11. Authentication with Socket.IO
// Authentication can be done by sending a token when the client connects.
{
  // Server:
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (isValidToken(token)) {
      return next();
    }
    return next(new Error("authentication error"));
  });
}

{
  // Client:
  const socket = io({
    auth: {
      token: "myAuthToken",
    },
  });
}

//? 12. Error Handling in Socket.IO
// Socket.IO allows you to handle connection errors or emit errors manually.
{
  Server: socket.on("error", (err) => {
    console.error(err);
  });
}

{
  // Client:
  socket.on("connect_error", (err) => {
    console.log("Connection Error:", err.message);
  });
}

//? 13. Scaling Socket.IO with Redis Adapter
// When deploying Socket.IO with multiple servers, you can use Redis to sync the state across all the servers.

// Setup:
//! npm install socket.io-redis
{
  // Server:
  const redisAdapter = require("socket.io-redis");
  io.adapter(redisAdapter({ host: "localhost", port: 6379 }));
}

//? 14. Example Applications Using Socket.IO
//* - Real-time chat apps: Allow users to chat in real-time, like in Slack or Discord.
//* - Live notifications: Real-time push notifications for web applications.
//* - Collaborative tools: Collaborative editing tools (like Google Docs).
//* - Live dashboards: Real-time analytics and dashboards.

//? Summary of Socket.IO in Node.js
// Socket.IO is a powerful library for building real-time applications in Node.js. It abstracts
// WebSocket communication, adding useful features such as automatic reconnections, namespaces,
// rooms, and event-driven messaging. From chat apps to real-time dashboards, Socket.IO can be
// applied to a wide range of use cases, enabling seamless two-way communication between clients and servers.
