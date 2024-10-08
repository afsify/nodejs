//! ================================= Deployment Load Balancing in Node.js =================================

// Load balancing is the process of distributing incoming traffic across multiple servers or instances to
// ensure no single server is overwhelmed. This increases the scalability, availability, and reliability of
// your application. Load balancing is a critical deployment strategy, especially for high-traffic applications
// in Node.js.

// Subtopics and Details:
//? What is Load Balancing?
//? Why Use Load Balancing?
//? Types of Load Balancing
//? Reverse Proxy Load Balancing
//? Using NGINX as a Load Balancer
//? Using a Cloud Load Balancer (AWS, GCP, Azure)
//? Load Balancing with Clusters in Node.js
//? Session Persistence
//? Health Checks for Load Balancers
//? Sticky Sessions
//? Horizontal vs Vertical Scaling
//? Best Practices for Load Balancing

//? 1. What is Load Balancing?
// Load balancing is the process of distributing client requests or network traffic across multiple servers
// or instances. In Node.js, this is important because the runtime is single-threaded. Load balancing ensures
// that no single instance is overwhelmed by all the traffic, improving performance and reliability.

// Load Balancer: A server or service that forwards client requests to multiple backend servers.

//? 2. Why Use Load Balancing?
// The main reasons to implement load balancing in a Node.js application include:

//* Scalability: As your application grows, load balancing allows you to add more servers to handle the increased traffic.

//* High Availability: By distributing traffic across multiple servers, if one server fails, the load balancer redirects
//* requests to other servers, ensuring minimal downtime.

//* Performance: With traffic spread across multiple instances, your servers won’t become overwhelmed, resulting
//* in improved application responsiveness.

//? 3. Types of Load Balancing
// There are several types of load balancing techniques:

//* Round Robin: Requests are forwarded to servers sequentially.

//* Least Connections: Directs traffic to the server with the fewest active connections.

//* IP Hash: Distributes requests based on the client's IP address, ensuring requests from the same client
//* go to the same server.

//* Weighted Round Robin: Some servers are given more weight (priority), allowing them to handle more
//* traffic based on their capacity.

//? 4. Reverse Proxy Load Balancing
// A reverse proxy is a server that sits between client requests and backend servers, forwarding requests
// and distributing traffic. NGINX and HAProxy are popular tools used for reverse proxy load balancing
// in Node.js deployments.

//* Advantages: Simplifies routing, caching, and SSL termination.
//* Tools: NGINX, HAProxy, Traefik.

// Example of Reverse Proxy with NGINX:
```nginx
upstream node_app {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}

server {
    listen 80;
    
    location / {
        proxy_pass http://node_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```// In this example:
// - The upstream block defines multiple Node.js instances (3000, 3001, 3002).
// - Requests are forwarded to the available instances by NGINX.

//? 5. Using NGINX as a Load Balancer
// NGINX is one of the most commonly used load balancers in Node.js environments due to its simplicity,
// performance, and reliability. It can act as a reverse proxy to distribute requests across multiple Node.js instances.

// Steps for Setting Up NGINX:
//* 1. Install NGINX on your server.
//* 2. Configure an upstream block defining the Node.js instances.
//* 3. Forward traffic from NGINX to Node.js instances.

```nginx
upstream node_backend {
    server localhost:4000;
    server localhost:4001;
    server localhost:4002;
}

server {
    listen 80;
    location / {
        proxy_pass http://node_backend;
        proxy_set_header Host $host;
    }
}
```;

//? 6. Using a Cloud Load Balancer (AWS, GCP, Azure)
// Cloud providers like AWS, GCP, and Azure offer managed load balancing services that distribute incoming
// traffic to multiple instances of your Node.js application.

//* AWS Elastic Load Balancer (ELB): A highly scalable load balancer that automatically distributes traffic.
//* Google Cloud Load Balancer: GCP's fully managed load balancing solution.
//* Azure Load Balancer: Microsoft's load balancer service for distributing traffic.

// Example: Setting Up AWS ELB
//* 1. Create a load balancer from the AWS Management Console.
//* 2. Add your Node.js instances to the load balancer.
//* 3. ELB will automatically distribute traffic between the instances based on the health and capacity of each.

//? 7. Load Balancing with Clusters in Node.js
// Node.js has a built-in `cluster` module, which can spawn multiple worker processes to handle multiple
// requests concurrently. Each worker can handle requests independently, allowing for more efficient utilization
// of CPU cores.
{
  // Example (Clustering with Built-In Module):
  const cluster = require("cluster");
  const http = require("http");
  const numCPUs = require("os").cpus().length;

  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    http
      .createServer((req, res) => {
        res.writeHead(200);
        res.end("Hello, World!\n");
      })
      .listen(8000);
  }
}

// Here, multiple worker processes are spawned, and each worker listens for incoming HTTP requests.

//? 8. Session Persistence
// When load balancing, session persistence (also known as "sticky sessions") ensures that requests from the
// same user are always routed to the same server. This is essential when user session data is stored in memory
// on the server rather than in a shared database or cache.

// How to Implement: Use IP hash-based load balancing or a session store like Redis to share sessions across instances.

//? 9. Health Checks for Load Balancers
// A load balancer should perform regular health checks on backend servers to ensure they are available
// and functioning. If a server becomes unresponsive, the load balancer will stop sending traffic to it.

//* Health Check Methods: HTTP ping or TCP health checks.
//* Cloud Providers: AWS ELB, GCP, and Azure provide built-in health check mechanisms.

//? 10. Sticky Sessions
// Sticky sessions (or session affinity) ensure that a client is always routed to the same backend server for
// the duration of their session. This is useful when server-side session data is stored in memory.

// How to Implement Sticky Sessions:
//* NGINX: Can be configured to use sticky sessions with cookies.
//* AWS ELB: Supports sticky sessions using an application-controlled cookie.

// Example (NGINX Sticky Session):
```nginx
upstream node_servers {
    ip_hash;
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}
```;

//? 11. Horizontal vs Vertical Scaling

//* Horizontal Scaling: Involves adding more servers or instances to handle increased traffic.
//* Vertical Scaling: Involves increasing the resources (CPU, RAM) of a single server to handle more traffic.

// Load balancing is typically used with **horizontal scaling**, where additional instances or servers are
// added as traffic grows.

//? 12. Best Practices for Load Balancing
//* Use Reverse Proxy Load Balancers: Like NGINX or HAProxy for simple, high-performance load balancing.
//* Implement Health Checks: Ensure that the load balancer can detect and route traffic away from unhealthy instances.
//* Enable Session Persistence: Use sticky sessions if necessary, or store session data in a shared database like Redis.
//* Distribute Load Evenly: Use round-robin or least-connections strategies to distribute traffic evenly.
//* Monitor Server Health: Continuously monitor your load-balanced servers for performance and resource usage.
//* Use a Content Delivery Network (CDN: Offload static content to a CDN, reducing load on your servers.

//? Summary of Deployment Load Balancing in Node.js

//* Load Balancing is essential for distributing traffic across multiple servers or instances in Node.js applications.
//* NGINX and **HAProxy** are popular reverse proxy load balancers that can be easily configured to distribute traffic across multiple Node.js instances.
//* Cloud services like **AWS ELB**, **Google Cloud Load Balancer**, and **Azure Load Balancer** provide managed solutions for balancing traffic in Node.js applications.
//* Clustering in Node.js allows multiple worker processes to handle requests simultaneously.
//* Health checks, **session persistence**, and **sticky sessions** are essential features to ensure the proper functioning of load balancers.
//* Load balancing is a critical part of horizontal scaling and is essential for high-traffic, high-availability applications.
