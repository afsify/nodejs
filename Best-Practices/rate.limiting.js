//! ===================================== Rate Limiting in Node.js =====================================

// Rate limiting is a technique used to control the amount of incoming requests to a server or API within a
// specific time period. It helps prevent abuse, overloading, and denial-of-service (DoS) attacks by capping
// the number of requests a user, client, or IP can make in a given time frame.

// In Node.js, implementing rate limiting is a crucial part of API security and scalability,
// especially for public-facing services. Rate limiting can be enforced using middleware or libraries that
// help to define thresholds for request counts.

// Subtopics and Details:
//? What is Rate Limiting?
//? Why Implement Rate Limiting?
//? Types of Rate Limiting
//? Basic Rate Limiting Implementation in Node.js
//? Using `express-rate-limit` Library
//? Advanced Rate Limiting with Redis
//? Rate Limiting for API Endpoints
//? Customizing Rate Limiting for Different Users
//? Handling Rate Limit Exceeded Responses
//? Best Practices for Rate Limiting

//? 1. What is Rate Limiting?
// Rate limiting refers to controlling the frequency of requests to a server or API from a client or IP address.
// It restricts the number of requests that can be made within a defined time period (e.g., 100 requests per minute).

// Example:
// If you set a rate limit of 100 requests per minute, a client that sends more than 100 requests within one minute
// will start receiving an error response (e.g., HTTP 429: Too Many Requests).

//? 2. Why Implement Rate Limiting?
// Rate limiting is essential for:
//* - Preventing abuse: It prevents users from spamming endpoints with excessive requests.
//* - Security: It mitigates the risk of DoS (Denial-of-Service) attacks and brute-force login attempts.
//* - Performance: It helps maintain consistent server performance by avoiding overloading.
//* - Cost management: For cloud-based services, rate limiting can help control API consumption costs.

//? 3. Types of Rate Limiting
// There are several strategies to implement rate limiting:
//* - Fixed Window Rate Limiting: A set number of requests are allowed within a fixed time window (e.g., 100 requests per minute).
//* - Sliding Window Rate Limiting: Requests are allowed within a rolling window of time.
//* - Leaky Bucket Algorithm: Requests are processed at a steady rate, with excess requests being queued or dropped.
//* - Token Bucket Algorithm: Tokens are added to a bucket at a regular interval, and each request consumes a token.

//? 4. Basic Rate Limiting Implementation in Node.js
// In its simplest form, rate limiting can be implemented using basic in-memory counters. However,
// this method doesn't scale well for distributed systems because each instance of the application
// would have its own in-memory counter.
{
  const express = require("express");
  const app = express();

  let requestCount = 0;
  const rateLimit = 100;
  const windowTime = 60 * 1000; // 1 minute

  app.use((req, res, next) => {
    requestCount++;
    if (requestCount > rateLimit) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }
    setTimeout(() => requestCount--, windowTime);
    next();
  });

  app.get("/", (req, res) => {
    res.send("Welcome to the rate-limited API");
  });

  app.listen(3000, () => console.log("Server running on port 3000"));
}

// In this simple example, the application tracks the number of requests within a one-minute window.
// If the limit is exceeded, it returns a 429 status code.

//? 5. Using `express-rate-limit` Library
// The `express-rate-limit` package simplifies rate limiting in Express.js applications.
// It allows you to define request limits per user, per IP address, or globally.

// Steps to implement rate limiting using `express-rate-limit`:

// 1. Install the package:
//! npm install express-rate-limit

// 2. Use the middleware in your Express app:
{
  const rateLimit = require("express-rate-limit");

  const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later",
  });

  app.use(limiter);

  app.get("/", (req, res) => {
    res.send("Welcome to the rate-limited API");
  });

  app.listen(3000, () => console.log("Server running on port 3000"));
}

// Here, the middleware limits each IP to 100 requests per minute. If the limit is exceeded, it sends a 429 response.

//? 6. Advanced Rate Limiting with Redis
// In a distributed or load-balanced environment, using in-memory counters for rate limiting can
// lead to inconsistencies. To solve this issue, Redis is often used as a central store for request counts.

// - Redis: A fast, in-memory key-value store that can be used to maintain rate limit
// counters across multiple Node.js instances.

// Example using Redis for rate limiting:

// 1. Install Redis and the `redis` package:

//! npm install redis
//! npm install express-rate-limit redis

// 2. Use Redis to store rate limit counters:
{
  const redis = require("redis");
  const { RateLimiterRedis } = require("rate-limiter-flexible");
  const redisClient = redis.createClient();

  const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 100, // 100 requests
    duration: 60, // Per 1 minute
  });

  app.use(async (req, res, next) => {
    try {
      await rateLimiter.consume(req.ip); // Consume 1 point per request
      next();
    } catch (err) {
      res.status(429).send("Too many requests, please try again later");
    }
  });
}

// This example uses Redis to store the request counts, allowing the rate limit to be applied consistently
// across multiple Node.js instances.

//? 7. Rate Limiting for API Endpoints
// Rate limiting can be applied to specific API routes rather than globally across the application.
// This is useful for protecting expensive or sensitive API endpoints.
{
  app.get("/api/resource", limiter, (req, res) => {
    res.send("This is a rate-limited API endpoint");
  });
}

// In this case, the rate limiter is applied only to the `/api/resource` route, while other routes remain unrestricted.

//? 8. Customizing Rate Limiting for Different Users
// You can apply different rate limits based on the type of user or client. For example,
// you may want to give higher request limits to authenticated or premium users.
{
  app.use((req, res, next) => {
    const user = req.user;
    const limiter = user.isPremium ? premiumLimiter : regularLimiter;
    limiter(req, res, next);
  });

  const regularLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
  });

  const premiumLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 500,
  });
}

// Here, premium users are allowed more requests per minute than regular users.

//? 9. Handling Rate Limit Exceeded Responses
// When the rate limit is exceeded, the server typically responds with HTTP status code **429 (Too Many Requests)**.
// Along with this response, a message explaining the reason and a `Retry-After` header (if applicable) can be sent.
{
  const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
    headers: true, // Send 'X-RateLimit-*' headers with limit information
  });

  app.use(limiter);
}

//? 10. Best Practices for Rate Limiting
//* 1. Set realistic limits: Define rate limits based on your server capacity and expected user behavior. Don't set the limits too low or too high.
//* 2. Use a central store: In distributed environments, use a central store like Redis to keep track of request counts across instances.
//* 3. Provide informative error messages: Let users know when they have exceeded the rate limit and when they can retry.
//* 4. Protect sensitive endpoints: Apply stricter rate limits to sensitive endpoints, such as login and signup routes.
//* 5. Allow higher limits for trusted clients: Give trusted clients or authenticated users higher limits to improve their experience.
//* 6. Combine with other security measures: Rate limiting should be used in conjunction with other security measures like API keys, authentication,
//* and request validation.

//? Summary of Rate Limiting in Node.js
//* - Rate limiting controls the frequency of requests to protect the server from being overwhelmed.
//* - You can implement basic rate limiting with in-memory counters, but for production-grade systems,
//* using libraries like `express-rate-limit` or Redis-based solutions is recommended.
//* - Rate limiting can be applied globally, to specific endpoints, or based on user roles.
//* - Use appropriate error handling when the rate limit is exceeded (HTTP 429).
//* - Rate limiting helps improve security, performance, and user experience in API-based systems.
