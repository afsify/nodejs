// Import the built-in 'events' module to create an EventEmitter instance
const EventEmitter = require("events");

// Create a new EventEmitter instance
const eventEmitter = new EventEmitter();

// Register an event listener for the 'greet' event
// This function will be executed whenever the 'greet' event is emitted
eventEmitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

// Register an event listener for the 'farewell' event
// This function will be executed whenever the 'farewell' event is emitted
eventEmitter.on("farewell", (name) => {
  console.log(`Goodbye, ${name}!`);
});

// Emit the 'greet' event and pass a parameter to the listener
// The 'greet' event triggers the 'Hello, name!' message
eventEmitter.emit("greet", "Alice");

// Emit the 'farewell' event and pass a parameter to the listener
// The 'farewell' event triggers the 'Goodbye, name!' message
eventEmitter.emit("farewell", "Bob");

// Register an event listener for 'dataReceived' to handle multiple pieces of data
eventEmitter.on("dataReceived", (data) => {
  console.log(`Data received: ${data}`);
});

// Emit 'dataReceived' event multiple times to show it can be triggered repeatedly
eventEmitter.emit("dataReceived", "Hello World");
eventEmitter.emit("dataReceived", 42);
eventEmitter.emit("dataReceived", { id: 1, message: "Test data" });

// Register a one-time listener for 'onceEvent' that will only run once
eventEmitter.once("onceEvent", () => {
  console.log("This will only run once");
});

// Emit 'onceEvent' twice, but the listener runs only the first time
eventEmitter.emit("onceEvent");
eventEmitter.emit("onceEvent");

// Remove a specific listener from an event
const farewellListener = (name) => {
  console.log(`Farewell listener for ${name}`);
};
eventEmitter.on("farewell", farewellListener); // Add the listener
eventEmitter.off("farewell", farewellListener); // Remove the listener
eventEmitter.emit("farewell", "Charlie"); // No output because listener was removed
