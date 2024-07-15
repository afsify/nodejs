//! ========================================= Events in Node.js =========================================

// Node.js is built on an asynchronous, event-driven architecture.
// The events module in Node.js allows you to work with events in a powerful way.
// It's a core module, meaning you don't need to install it separately.
// Event-driven programming is central to Node.js applications, especially for handling asynchronous operations.

// Subtopics and Details:
//? EventEmitter Class
//? Emitting Events
//? Listening to Events
//? Event Parameters
//? Once Listeners
//? Removing Listeners
//? Handling Errors
//? Inheriting from EventEmitter
//? Asynchronous vs Synchronous Events

//? 1. EventEmitter Class
// The EventEmitter class lies at the heart of the event system in Node.js.
// It allows objects to emit events and register listeners for those events.
{
  const EventEmitter = require("events");
  const myEmitter = new EventEmitter();
}

//? 2. Emitting Events
// To emit an event, use the emit method. This method triggers the event and calls all the listeners attached to it.
{
  const EventEmitter = require("events");
  const myEmitter = new EventEmitter();

  myEmitter.emit("event"); // Emitting 'event' without listeners
}

//? 3. Listening to Events
// To listen to an event, use the on method. You pass the event name and a callback function
// that gets called whenever the event is emitted.
{
  const EventEmitter = require("events");
  const myEmitter = new EventEmitter();

  myEmitter.on("event", () => {
    console.log("An event occurred!");
  });

  myEmitter.emit("event");
}

//? 4. Event Parameters
// When emitting an event, you can pass arguments that will be received by the listeners.
{
  const EventEmitter = require("events");
  const myEmitter = new EventEmitter();

  myEmitter.on("event", (arg1, arg2) => {
    console.log(`Event with args: ${arg1}, ${arg2}`);
  });

  myEmitter.emit("event", "arg1Value", "arg2Value");
}

//? 5. Once Listeners
// To listen to an event only once, use the once method. The listener will be called at most once for a given event.
{
  const EventEmitter = require("events");
  const myEmitter = new EventEmitter();

  myEmitter.once("event", () => {
    console.log("This will be logged only once");
  });

  myEmitter.emit("event");
  myEmitter.emit("event"); // This will not trigger the listener
}

//? 6. Removing Listeners
// You can remove listeners using the removeListener or removeAllListeners methods.

// Removing a Specific Listener:
{
  const EventEmitter = require("events");
  const myEmitter = new EventEmitter();

  function listener() {
    console.log("This listener will be removed");
  }

  myEmitter.on("event", listener);
  myEmitter.removeListener("event", listener);

  myEmitter.emit("event"); // No output, listener removed
}

// Removing All Listeners:
{
  const EventEmitter = require("events");
  const myEmitter = new EventEmitter();

  myEmitter.on("event", () => {
    console.log("Listener 1");
  });

  myEmitter.on("event", () => {
    console.log("Listener 2");
  });

  myEmitter.removeAllListeners("event");

  myEmitter.emit("event"); // No output, all listeners removed
}

//? 7. Handling Errors
// By default, if an error event is emitted and there are no listeners for it,
// Node.js will print a stack trace and exit. You should always handle error events.
{
  const EventEmitter = require("events");
  const myEmitter = new EventEmitter();

  myEmitter.on("error", (err) => {
    console.error("An error occurred:", err.message);
  });

  myEmitter.emit("error", new Error("Something went wrong"));
}

//? 8. Inheriting from EventEmitter
// Many objects in Node.js, such as streams, inherit from EventEmitter.
// You can also create your own classes that inherit from EventEmitter.
{
  const EventEmitter = require("events");

  class MyEmitter extends EventEmitter {}

  const myEmitter = new MyEmitter();

  myEmitter.on("event", () => {
    console.log("An event occurred!");
  });

  myEmitter.emit("event");
}

//? 9. Asynchronous vs Synchronous Events
// Event listeners in Node.js are synchronous by default. However, you can execute asynchronous code inside listeners.

// Synchronous Event:
{
  const EventEmitter = require("events");
  const myEmitter = new EventEmitter();

  myEmitter.on("event", () => {
    console.log("Synchronous event listener");
  });

  myEmitter.emit("event");
  console.log("This will run after the event listener");
}

// Asynchronous Event:
{
  const EventEmitter = require("events");
  const myEmitter = new EventEmitter();

  myEmitter.on("event", () => {
    setImmediate(() => {
      console.log("Asynchronous event listener");
    });
  });

  myEmitter.emit("event");
  console.log("This will run before the asynchronous event listener");
}
