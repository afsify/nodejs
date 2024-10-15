//! ===================================== Optimization in Node.js =====================================

// Optimization in Node.js refers to improving the performance and efficiency of applications to ensure
// they run faster, consume fewer resources, and scale effectively. Due to Node.js’s non-blocking I/O model,
// it is crucial to implement optimizations to handle high loads and improve response times.

// Subtopics:
//? Understanding Performance Metrics
//? Asynchronous Programming
//? Event Loop Optimization
//? Using Caching Strategies
//? Memory Management
//? Optimizing Database Queries
//? Load Balancing
//? Cluster Module for Multi-Core Systems
//? Minification and Compression
//? Monitoring and Profiling
//? Best Practices for Optimization
//? Real-World Use Cases

//? 1. Understanding Performance Metrics
// Before optimizing an application, it’s essential to establish performance metrics to measure improvements
// effectively. Common metrics include:

//* - Response Time: Time taken to process a request.
//* - Throughput: Number of requests processed per second.
//* - Error Rate: Percentage of failed requests.
//* - Memory Usage: Amount of memory consumed by the application.

// Using tools like **Apache Benchmark (ab)** or **wrk** can help in benchmarking your Node.js application.

//? 2. Asynchronous Programming
// Node.js is built on an asynchronous, event-driven architecture. Leveraging asynchronous programming
// allows applications to handle multiple requests without blocking the execution thread.

// - Use Promises: Replace callbacks with Promises for cleaner, more manageable asynchronous code.
{
  function fetchData() {
    return new Promise((resolve, reject) => {
      // Fetch data logic
      if (success) {
        resolve(data);
      } else {
        reject(error);
      }
    });
  }
}

// - Async/Await: Simplifies working with Promises, making the code more readable.
{
  async function getData() {
    try {
      const data = await fetchData();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}

//? 3. Event Loop Optimization
// The Node.js event loop handles all asynchronous operations. Optimizing how the event loop works can
// significantly improve performance.

// - Avoid Long-Running Tasks: Long computations can block the event loop. Offload these tasks using Worker
// Threads or offload to a separate service.
{
  const { Worker } = require("worker_threads");

  const worker = new Worker("./worker.js");
  worker.on("message", (result) => {
    console.log(`Result from worker: ${result}`);
  });
}

// - Use `setImmediate` and `process.nextTick` Wisely: These functions can help break long tasks into smaller chunks,
// preventing blocking.

//? 4. Using Caching Strategies
// Implementing caching can drastically reduce response times and database load. Use different caching mechanisms such as:

// - In-Memory Caching: Tools like **Redis** or **Memcached** store frequently accessed data in memory.
{
  const redis = require("redis");
  const client = redis.createClient();

  client.get("key", (err, result) => {
    if (result) {
      console.log(`Cache hit: ${result}`);
    } else {
      // Fetch data from database
      client.set("key", data);
    }
  });
}

// - HTTP Caching: Leverage caching headers (e.g., `Cache-Control`, `ETag`) to enable browser caching.

//? 5. Memory Management
// Managing memory effectively helps prevent leaks and optimizes performance:

//* - Avoid Global Variables: Reduce memory usage by minimizing the use of global variables.
//* - Use `Buffer` Efficiently: Optimize how you handle binary data to save memory.
//* - Use Profiling Tools: Tools like **Node.js built-in profiler** or **clinic.js** can help identify memory leaks.

//? 6. Optimizing Database Queries
// Database queries can often become bottlenecks in applications. To optimize:

// - Use Indexing: Proper indexing can speed up query performance.
// - Limit Data Retrieval: Use pagination or select only the necessary fields instead of retrieving entire datasets.

```javascript
const results = await db.collection('users').find({}, { projection: { name: 1, age: 1 } }).toArray();
```;

// - Use Connection Pooling: Maintain a pool of database connections to reuse instead of creating new connections for every request.

//? 7. Load Balancing
// Distributing incoming requests across multiple instances can improve performance and reliability.
// Use load balancers like **Nginx** or **HAProxy** to manage traffic.

// - Sticky Sessions: Ensure that a user session is always routed to the same server if needed.

//? 8. Cluster Module for Multi-Core Systems
// Node.js runs in a single-threaded environment, but you can take advantage of multi-core systems using
// the **Cluster module**.

// - Clustering: Fork multiple Node.js processes, each handling requests independently. This can increase
// throughput by utilizing available CPU cores.
{
  const cluster = require("cluster");
  const http = require("http");

  if (cluster.isMaster) {
    const numCPUs = require("os").cpus().length;
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else {
    http
      .createServer((req, res) => {
        res.writeHead(200);
        res.end("Hello World\n");
      })
      .listen(8000);
  }
}

//? 9. Minification and Compression
// Reducing the size of your JavaScript files and compressing HTTP responses can lead to faster load times.

//* - Minification: Tools like **UglifyJS** or **Terser** can minimize your JavaScript files.
//* - Compression: Use middleware like **compression** in Express to compress HTTP responses.
{
  const compression = require("compression");
  const express = require("express");
  const app = express();

  app.use(compression());
}

//? 10. Monitoring and Profiling
// Continuously monitoring and profiling your application can help identify performance issues.

//* - Monitoring Tools: Tools like **New Relic**, **Datadog**, or **Prometheus** can monitor application performance and provide insights.
//* - Profiling: Use Node.js's built-in profiler or tools like **clinic.js** for performance analysis.

//? 11. Best Practices for Optimization
//* - Keep Dependencies Updated: Regularly update your dependencies to leverage performance improvements and security fixes.
//* - Optimize Assets: Serve static assets efficiently using CDNs.
//* - Use Environment Variables: Different configurations for development, testing, and production can lead to optimized performance.
//* - Code Review and Refactoring: Regularly review and refactor code to eliminate inefficiencies.

//? 12. Real-World Use Cases
// Optimizations can significantly enhance application performance:
//* - Streaming Services: Services like Netflix or Spotify rely on optimizations to deliver seamless streaming experiences to millions of users.
//* - E-commerce Platforms: Websites like Amazon optimize their applications to handle high traffic during sales and promotions.
//* - Real-Time Applications: Applications like Slack or Discord utilize optimizations to provide instant messaging and notifications without delays.

// Conclusion
// Optimization in Node.js is crucial for building high-performance, scalable applications. By understanding
// the various aspects of optimization, including asynchronous programming, memory management, caching strategies,
// and more, developers can ensure their Node.js applications run efficiently and effectively handle high traffic
// loads. Implementing best practices and utilizing appropriate tools can lead to significant performance
// improvements in real-world applications.
