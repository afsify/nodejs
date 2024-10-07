//! ===================================== Event Loop in Node.js =====================================

// The Event Loop is a key component of Node.js, allowing it to perform non-blocking I/O operations
// despite being single-threaded. The event loop handles asynchronous callbacks, coordinating the
// execution of code, events, and I/O operations. It works by pushing tasks to different phases,
// processing them, and then passing control back to the event loop, ensuring the program runs
// efficiently without blocking.

// Subtopics and Details:

//? What is the Event Loop?
//? Call Stack vs Event Loop
//? Phases of the Event Loop
//? Timers (setTimeout, setInterval)
//? I/O Callbacks
//? Idle, Poll, and Check Phases
//? Microtasks (process.nextTick and Promises)
//? How the Event Loop Works with Asynchronous Code
//? Event Loop Example
//? Event Loop and Performance Considerations

//? 1. What is the Event Loop?
// In Node.js, the **event loop** is responsible for managing all asynchronous operations.
// It is part of the runtime environment that allows Node.js to perform non-blocking operations like file I/O,
// network requests, and timers. The event loop is continuously running in the background, waiting for events
// to occur (such as the completion of a file read), and it handles them by executing corresponding callback functions.

// Key Characteristics:
//! Single-threaded: Even though Node.js can handle many operations concurrently,
//! it uses a single main thread to execute JavaScript code.
//! Non-blocking: The event loop allows the program to continue running even when waiting for I/O operations to complete.
//! Asynchronous: It processes tasks asynchronously by placing callbacks in an event queue,
//! which are then executed when the appropriate event occurs.

// Basic Diagram of Event Loop:
```
 ┌───────────────────────────────┐
 │           Call Stack          │
 └─────────────┬─────────────────┘
               │
     ┌─────────▼───────────┐
     │    Event Loop       │
     └─────────┬───────────┘
               │
 ┌─────────────▼─────────────┐
 │     Callback Queue        │
 └───────────────────────────┘
```;

//? 2. Call Stack vs Event Loop
// Call Stack: A stack that tracks the function executions in your program. When a function is called,
// it gets pushed onto the stack, and when it finishes, it gets popped off. If the stack is empty,
// the event loop picks up a callback from the queue and executes it.
// Event Loop: It continuously checks if the call stack is empty and if there are callbacks waiting
// in the callback queue. If the stack is empty, the event loop moves the callbacks from the queue
// to the stack to be executed.
{
  console.log("Start");

  setTimeout(() => {
    console.log("Timeout callback");
  }, 1000);

  console.log("End");

  // Output:

  // Start
  // End
  // Timeout callback (after 1 second)
}

// The `setTimeout` callback is placed in the **callback queue** and is only executed once the call stack is empty.

//? 3. Phases of the Event Loop
// The event loop has multiple phases, and each phase has a specific purpose. Here’s a breakdown:

//! Timers Phase: This phase executes callbacks for `setTimeout()` and `setInterval()`.
//! Pending Callbacks Phase: Executes I/O callbacks that are deferred, such as errors from I/O operations.
//! Idle, Prepare Phase: Internal use only.
//! Poll Phase: Retrieves new I/O events and executes I/O-related callbacks (except for timers and close events).
//! Check Phase: Executes `setImmediate()` callbacks.
//! Close Callbacks Phase: Executes callbacks for closed connections, like `socket.on('close', ...)`.

// Each phase processes its own type of callbacks, and then the event loop moves on to the next phase.

//? 4. Timers (setTimeout, setInterval)
// `setTimeout()` and `setInterval()` are used to schedule callbacks after a certain period of time.
// These timers are processed in the **timers phase** of the event loop.
{
  console.log("Start");

  setTimeout(() => {
    console.log("Timer callback");
  }, 2000);

  console.log("End");
}

// The callback is executed after the specified time interval (2000 milliseconds), during the timers phase.

//? 5. I/O Callbacks
// Asynchronous I/O operations, such as reading files or making network requests,
// rely on the event loop to execute their callbacks once the operation completes.
// These are handled in the poll phase.
{
  // Example (Asynchronous File Read):
  const fs = require("fs");

  fs.readFile("example.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log("File read complete:", data);
  });

  console.log("Reading file...");
}

// The I/O operation (`readFile`) is asynchronous and its callback is executed once the file reading is complete.

//? 6. Idle, Poll, and Check Phases
// Idle Phase: Reserved for internal operations.
// Poll Phase: The poll phase is where the event loop checks for new I/O events.
// If no timer is scheduled and no I/O is pending, the event loop will stay in this phase.
// Check Phase: This phase is responsible for processing `setImmediate()` callbacks,
// which are executed after the poll phase is complete.

//? 7. Microtasks (process.nextTick and Promises)
// Microtasks are a separate queue of tasks that must be executed before the next event loop iteration.
// The two main ways to queue microtasks are `process.nextTick()` and Promises.
// `process.nextTick()`: It places a callback in the next iteration of the event loop, even before I/O callbacks.
// Promise resolution/rejection: When a Promise is resolved or rejected, its `.then()` or `.catch()`
// handlers are added to the microtask queue.
{
  // Example (process.nextTick):
  console.log("Start");

  process.nextTick(() => {
    console.log("Next tick callback");
  });

  console.log("End");

  // Output:

  // Start
  // End
  // Next tick callback
}
// The `nextTick` callback runs after the current operation, but before any I/O events.
{
  // Example (Promise):
  console.log("Start");

  Promise.resolve().then(() => {
    console.log("Promise callback");
  });

  console.log("End");

  // Output:

  // Start
  // End
  // Promise callback
}

// Promise callbacks are queued in the microtask queue and executed before the next iteration of the event loop.

//? 8. How the Event Loop Works with Asynchronous Code
// The event loop’s ability to handle multiple asynchronous operations without blocking the main thread is
// what makes Node.js efficient for I/O-heavy tasks like file reading, database querying, and network requests.
{
  console.log("Start");

  setTimeout(() => {
    console.log("Timeout callback");
  }, 0);

  Promise.resolve().then(() => {
    console.log("Promise callback");
  });

  console.log("End");

  // Output:

  // Start
  // End
  // Promise callback
  // Timeout callback
}

// In this example, even though `setTimeout` is set to 0 milliseconds, the Promise callback is
// executed first because it is added to the microtask queue, while `setTimeout` is added to the callback queue.

//? 9. Event Loop Example
// Let’s break down an example where multiple asynchronous operations are handled by the event loop:
{
  console.log("Start");

  setTimeout(() => {
    console.log("Timer callback");
  }, 100);

  Promise.resolve().then(() => {
    console.log("Promise callback");
  });

  setImmediate(() => {
    console.log("Immediate callback");
  });

  console.log("End");

  // Expected Output:

  // Start
  // End
  // Promise callback
  // Immediate callback
  // Timer callback
}

// Explanation:
// `console.log('Start')` and `console.log('End')` are synchronous, so they are executed immediately.
// The Promise callback is placed in the microtask queue, so it is executed after the synchronous code.
// `setImmediate` runs after the poll phase, so it is executed before the `setTimeout` callback,
// which is placed in the timers queue and delayed for 100ms.

//? 10. Event Loop and Performance Considerations
// While the event loop is efficient for I/O-bound tasks, it can struggle with CPU-bound tasks,
// like complex calculations. Long-running operations can block the event loop, preventing it
// from processing I/O events, which can degrade performance.
{
  // Example (Blocking the Event Loop):
  console.log("Start");

  setTimeout(() => {
    console.log("Timeout callback");
  }, 0);

  for (let i = 0; i < 1e9; i++); // This loop blocks the event loop

  console.log("End");

  // Output:

  // Start
  // End
  // Timeout callback
}

// Here, the large `for` loop blocks the event loop, causing the `setTimeout` callback to be delayed.
