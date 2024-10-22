//! ===================================== Worker Threads in Node.js =====================================

// Worker Threads in Node.js allow for parallel execution of JavaScript code in a multi-threaded environment.
// This is particularly useful for CPU-intensive tasks, as Node.js operates on a single-threaded event loop,
// which can lead to performance bottlenecks when executing blocking operations. Worker Threads help overcome
// these limitations by enabling parallel processing.

// Subtopics:
//? Introduction to Worker Threads
//? Creating Worker Threads
//? Communicating Between Threads
//? Handling Worker Lifecycle
//? Error Handling in Worker Threads
//? Performance Considerations
//? Real-World Use Cases
//? Best Practices

//? 1. Introduction to Worker Threads
// Worker Threads provide an API to create threads in Node.js, allowing you to perform JavaScript operations
// in parallel. Each worker thread has its own V8 instance, meaning it operates independently of the main thread.

//* - Module: The `worker_threads` module is used to work with worker threads.
//* - Use Cases: Ideal for CPU-bound tasks like data processing, image manipulation,
//* or any operation that requires significant computation.

//? 2. Creating Worker Threads
// To create a worker thread, you need to import the `Worker` class from the `worker_threads` module
// and instantiate it with the desired JavaScript file or a function to run.

```javascript
const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js'); // worker.js contains the code to be executed
```;

// In the worker file (`worker.js`), you can perform the desired computations.

// worker.js:
```javascript
const { parentPort } = require('worker_threads');

let count = 0;
for (let i = 0; i < 1e9; i++) {
  count++;
}

parentPort.postMessage(count); // Send the result back to the main thread
```;

//? 3. Communicating Between Threads
// Communication between the main thread and worker threads can be achieved through messages.
// You can send data using the `postMessage` method and listen for messages using the `message` event.
{
  // main.js
  const { Worker } = require("worker_threads");

  const worker = new Worker("./worker.js");
  worker.on("message", (result) => {
    console.log(`Result from worker: ${result}`);
  });
}

// In the worker file, you can send messages back to the main thread using `parentPort.postMessage()`.

//? 4. Handling Worker Lifecycle
// Managing the lifecycle of worker threads involves starting, terminating, and ensuring they clean up resources properly.

// - Terminating Workers: You can terminate a worker using the `terminate()` method.

```javascript
worker.terminate().then(() => {
  console.log('Worker terminated.');
});
```;

// - Exiting Workers: Workers can exit by calling `process.exit()`, or they will exit automatically when the script finishes executing.

//? 5. Error Handling in Worker Threads
// Handling errors in worker threads is crucial to ensure the stability of your application.
// You can listen for the `error` event on the worker instance.

```javascript
worker.on('error', (err) => {
  console.error('Worker error:', err);
});
```;

// Additionally, you can handle unhandled exceptions in the worker by using a `try...catch` block.

// worker.js:
```javascript
try {
  // Some code that may throw
} catch (err) {
  parentPort.postMessage({ error: err.message });
}
```;

//? 6. Performance Considerations
// While worker threads can significantly improve performance for CPU-bound tasks, there are some
// considerations to keep in mind:

//* - Overhead: Creating and managing threads incurs overhead. For lightweight tasks, the overhead might outweigh
//* the benefits.
//* - Data Transfer: Data sent between threads must be serialized, which can add latency. Use `SharedArrayBuffer`
//* for more efficient data sharing when appropriate.

//? 7. Real-World Use Cases
// Worker threads are particularly useful in scenarios where you need to perform intensive computations
// or handle large datasets without blocking the main event loop. Some examples include:

//* - Image Processing: Resizing or filtering images in parallel to improve performance.
//* - Data Analysis: Running complex calculations or aggregations on large datasets.
//* - Web Scraping: Fetching and processing data from multiple web sources simultaneously.

//? 8. Best Practices
//* - Use Worker Threads for CPU-bound Tasks: Offload CPU-intensive operations to worker threads to maintain
//* responsiveness in your application.
//* - Limit the Number of Workers: Too many concurrent workers can lead to resource exhaustion.
//* Use a reasonable number of workers based on available CPU cores.
//* - Graceful Shutdown: Ensure workers are properly terminated when they are no longer needed to prevent memory leaks.
//* - Error Handling: Implement robust error handling to capture and manage errors in worker threads.

//? Conclusion
// Worker Threads in Node.js provide a powerful mechanism for parallel processing, enabling developers
// to optimize performance for CPU-bound tasks. By understanding how to create and manage worker threads,
// communicate between threads, and handle errors effectively, you can build more efficient and responsive
// Node.js applications. Following best practices and considering performance implications will help ensure
// that your applications run smoothly even under heavy loads.
