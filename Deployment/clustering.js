//! ================================= Deployment Clustering in Node.js =================================

// Node.js is single-threaded by default, meaning it can handle one request at a time. However,
// clustering allows you to take advantage of multi-core systems by spawning multiple instances of the
// application, distributing the load, and improving performance and reliability. Clustering can be achieved
// using the built-in `cluster` module in Node.js.

// Subtopics and Details:
//? Understanding Node.js Clustering
//? Creating a Cluster
//? Managing Worker Processes
//? Load Balancing
//? Handling Events in a Cluster
//? Graceful Shutdown
//? Using PM2 for Clustering
//? Monitoring Cluster Performance
//? Example Application
//? Best Practices for Clustering

//? 1. Understanding Node.js Clustering
// Clustering in Node.js allows you to create multiple worker processes that can share the same server port.
// This means that you can utilize the full power of a multi-core processor and enhance the scalability of
// your application.

//* Master Process: The primary process that manages the worker processes.
//* Worker Processes: Child processes spawned by the master process to handle requests.

// Each worker runs in its own context, allowing them to execute JavaScript code independently.

//? 2. Creating a Cluster
// To create a cluster, you use the built-in `cluster` module. Here's how you can set up a simple clustering application:
{
  // Example (Basic Cluster Setup):
  const cluster = require("cluster");
  const http = require("http");
  const numCPUs = require("os").cpus().length; // Get the number of CPU cores

  if (cluster.isMaster) {
    // Fork workers for each CPU core
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    // Workers can share the same port
    http
      .createServer((req, res) => {
        res.writeHead(200);
        res.end("Hello, World!\n");
      })
      .listen(8000);

    console.log(`Worker ${process.pid} started`);
  }
}

// In this example:
//* `cluster.isMaster`** checks if the current process is the master.
//* `cluster.fork()`** creates a new worker process.
//* The server listens on port `8000`, and each worker can handle incoming requests.

//? 3. Managing Worker Processes

// You can manage workers in various ways, including monitoring their status, restarting them on exit,
// or performing specific tasks based on the worker's status.
{
  // Example (Monitoring Worker Processes):
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork(); // Restart a new worker
  });
}

// This code listens for worker exit events and automatically forks a new worker to replace the one that died.

//? 4. Load Balancing
// Node.js uses a round-robin load-balancing algorithm to distribute incoming connections across workers.
// This ensures that all workers share the load evenly.

// Each incoming request is assigned to the next available worker in the pool. This way, if one worker is busy,
// the request is handed off to another worker.

//? 5. Handling Events in a Cluster
// Workers can communicate with the master process using IPC (Inter-Process Communication).
// This allows you to send messages between workers and the master.
{
  // Example (Inter-Process Communication):
  if (cluster.isWorker) {
    process.on("message", (msg) => {
      console.log(`Worker ${process.pid} received message:`, msg);
    });

    // Send a message to the master
    process.send(`Hello from worker ${process.pid}`);
  }
}

// In this example:
// Workers listen for messages from the master process.
// Each worker sends a message to the master when it starts.

//? 6. Graceful Shutdown
// To ensure a smooth shutdown of your application, you can implement a graceful shutdown process that
// allows workers to finish processing requests before exiting.
{
  // Example (Graceful Shutdown):
  const shutdown = () => {
    console.log("Shutting down gracefully...");
    for (const id in cluster.workers) {
      cluster.workers[id].kill();
    }
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

// This code listens for termination signals (`SIGTERM`, `SIGINT`) and triggers a shutdown procedure
// that kills all worker processes.

//? 7. Using PM2 for Clustering
// [PM2](https://pm2.keymetrics.io/) is a popular process manager for Node.js applications that simplifies
//   clustering and monitoring. It provides a user-friendly command-line interface and a web dashboard for
//   managing your applications.

// Example (Starting an Application with PM2):
//! pm2 start app.js -i max  # Start the app with the maximum number of instances

// This command starts your Node.js application in clustered mode, automatically determining the
// number of instances based on available CPU cores.

//? 8. Monitoring Cluster Performance
// You can monitor the performance of your cluster to ensure it's running optimally.
// PM2 provides built-in monitoring tools to track CPU usage, memory consumption, and more.

// Example (Monitoring with PM2):
//! pm2 monit  # Start monitoring your applications

// This command opens a monitoring interface that displays real-time metrics for all your processes.

//? 9. Example Application
// Here’s a complete example of a clustered HTTP server using the `cluster` module:
{
  const cluster = require("cluster");
  const http = require("http");
  const numCPUs = require("os").cpus().length;

  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {
      console.log(`Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork();
    });
  } else {
    http
      .createServer((req, res) => {
        res.writeHead(200);
        res.end("Hello, World from worker " + process.pid + "\n");
      })
      .listen(8000);

    console.log(`Worker ${process.pid} started`);
  }
}

// In this example:
// The master process forks worker processes equal to the number of CPU cores.
// Each worker handles HTTP requests independently.

//? 10. Best Practices for Clustering
//* Monitor Performance: Regularly monitor the performance of your clustered application to identify bottlenecks.

//* Implement Logging: Use logging to track errors and performance metrics.

//* Use a Process Manager: Tools like PM2 simplify the management of clustered applications and provide valuable
//* features like auto-restart and monitoring.

//* Graceful Shutdown: Always implement a graceful shutdown to handle ongoing requests during server restarts
//* or application updates.

//* Optimize Resources: Tune the number of workers based on your application's specific resource needs and
//* the capabilities of your server.

//? Summary of Deployment Clustering in Node.js

//* Clustering enhances the performance of Node.js applications by utilizing multiple CPU cores.
//* The `cluster` module facilitates the creation and management of worker processes.
//* Load balancing ensures that incoming requests are evenly distributed across workers.
//* Inter-process communication (IPC) allows workers to communicate with the master process.
//* Graceful shutdown procedures are essential for maintaining data integrity during restarts or updates.
//* PM2 is a powerful tool for managing clustered applications, providing monitoring and process management features.
