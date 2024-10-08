//! ================================= Deployment with PM2 in Node.js =================================

// PM2 is a popular process manager for Node.js applications, designed to keep applications running
// smoothly in production. PM2 handles application monitoring, automatic restarts, log management,
// clustering, and more. It’s a key tool for deploying Node.js applications effectively,
// ensuring they run reliably and efficiently in any environment.

// Subtopics and Details:
//? What is PM2?
//? Why Use PM2 for Deployment?
//? Installing PM2
//? Running a Node.js Application with PM2
//? Process Management with PM2
//? Auto-Restarting Applications
//? PM2 Clustering Mode
//? Monitoring Applications with PM2
//? Managing Logs with PM2
//? Process Scaling and Load Balancing with PM2
//? PM2 Ecosystem File
//? Zero Downtime Deployments with PM2
//? PM2 and Deployment with Git
//? PM2 and Load Balancing
//? Best Practices for PM2 Deployment

//? 1. What is PM2?
// PM2 is a production-ready process manager for Node.js that simplifies running and managing applications
// by providing features like process monitoring, automatic restarts, load balancing, and clustering.
// It also supports managing multiple applications and offers deep insights into resource usage, errors, and logs.

// Key Features: Auto-restart, monitoring, clustering, log management, and zero-downtime deployments.

//? 2. Why Use PM2 for Deployment?
// PM2 simplifies the deployment process in Node.js by offering the following benefits:

//* Auto-restart: Automatically restarts applications if they crash.
//* Clustering: Utilizes all CPU cores to improve performance.
//* Monitoring: Real-time performance monitoring of applications.
//* Log Management: Handles log aggregation for easier debugging.
//* Zero Downtime: Ensures no downtime during updates or deployments.

//? 3. Installing PM2
// You can install PM2 globally using npm:

```bash
npm install -g pm2
```// After installation, you can manage your Node.js applications using simple PM2 commands.

//? 4. Running a Node.js Application with PM2
// Running an application with PM2 is straightforward. To start your Node.js app:

```bash
pm2 start app.js
```// This will start `app.js` in the background as a managed process. PM2 will monitor the app and
// automatically restart it if it crashes.

//* Start App: `pm2 start <app.js>` starts the Node.js application.
//* Stop App: `pm2 stop <id>` stops the application by its ID.
//* Restart App: `pm2 restart <id>` restarts the application.

//? 5. Process Management with PM2
// PM2 provides robust process management, allowing you to control multiple Node.js applications
// and processes efficiently. Some useful commands include:

//* List All Processes: `pm2 list`
//* Stop a Process: `pm2 stop <app_name/id>`
//* Restart a Process: `pm2 restart <app_name/id>`
//* Delete a Process: `pm2 delete <app_name/id>`

// These commands allow for comprehensive process management, ensuring you can easily stop, start,
// and restart your applications when needed.

//? 6. Auto-Restarting Applications
// One of the critical features of PM2 is its ability to automatically restart your application if it crashes,
// making it highly resilient in production environments.

// PM2 ensures your application is always up by:
// - Restarting the process if it fails.
// - Rebooting after system reboots using `pm2 startup` commands.

```bash
pm2 startup
```// This will generate the command to run PM2 as a service, ensuring your app starts on boot.

//? 7. PM2 Clustering Mode
// PM2 supports clustering, which allows you to run multiple instances of your Node.js application across
// all available CPU cores. This enables Node.js to fully utilize the system’s resources for increased performance.

// Example of Clustering with PM2:
```bash
pm2 start app.js -i max
```// - `-i max` tells PM2 to start one instance of the application per CPU core.
// - This is particularly useful for maximizing throughput in CPU-bound Node.js applications.

//? 8. Monitoring Applications with PM2
// PM2 includes built-in monitoring tools that allow you to track the performance of your Node.js applications.
// The `pm2 monit` command displays a live dashboard with real-time information on CPU usage, memory consumption, and more.
```bash
pm2 monit
```// This command provides a dashboard with:

//* CPU and memory usage.
//* Uptime.
//* Process information (PID, status, etc.).

//? 9. Managing Logs with PM2
// PM2 provides robust log management tools, making it easy to track errors, warnings, and output from
// your Node.js application. All logs are centralized, allowing for easy debugging and error resolution.

//* View Logs: `pm2 logs`
//* Log Rotation: PM2 can automatically rotate logs, ensuring they don’t grow indefinitely. Set up log rotation with:

```bash
pm2 install pm2-logrotate
```// This command installs the log rotation module for managing your logs automatically.

//? 10. Process Scaling and Load Balancing with PM2
// PM2 allows you to horizontally scale your application by creating multiple instances of the Node.js
// app across CPU cores. This spreads the traffic load evenly across all instances, enabling load balancing.
```bash
pm2 start app.js -i max
```;

// This will spawn as many instances as there are CPU cores, ensuring maximum throughput.

//? 11. PM2 Ecosystem File
// The PM2 ecosystem file (`ecosystem.config.js`) is a configuration file that allows you to define all
// your application settings and run multiple applications from a single file. This makes managing and
// deploying multiple Node.js applications easier.
{
  // Example `ecosystem.config.js`:
  module.exports = {
    apps: [
      {
        name: "app1",
        script: "./app.js",
        instances: 4,
        exec_mode: "cluster",
        watch: true,
        env: {
          NODE_ENV: "development",
        },
        env_production: {
          NODE_ENV: "production",
        },
      },
    ],
  };
}

// You can start the application using this file:

```bash
pm2 start ecosystem.config.js --env production
```//? 12. Zero Downtime Deployments with PM2
// PM2 provides zero-downtime reloads using its graceful reload feature. This ensures that your
// application can be updated without interrupting service.

// Example of Zero Downtime Reload:
```bash
pm2 reload all
```;

// This command reloads all running applications without downtime.

//? 13. PM2 and Deployment with Git
// You can automate deployments using PM2 and Git by utilizing PM2's deployment feature (`pm2 deploy`).
// This tool allows you to pull code from a Git repository and automatically deploy it to a remote server.

// Example Deployment Process:

//* 1. Create a `ecosystem.config.js` file with deployment settings.
//* 2. Use `pm2 deploy` to deploy your application from the Git repository.

//? 14. PM2 and Load Balancing
// In clustered mode, PM2 automatically handles load balancing across Node.js instances.
// PM2 will distribute incoming requests among all instances (workers), ensuring efficient usage of system resources.

// Load Balancing with PM2:
//* - PM2’s clustering mode inherently balances the load between instances.
//* - For more complex setups, PM2 can be combined with external load balancers like NGINX or AWS ELB.

//? 15. Best Practices for PM2 Deployment
//* Use PM2 in Clustering Mode: For high-performance applications, ensure PM2 runs in cluster mode to fully utilize all CPU cores.
//* Set Up Log Rotation: Install PM2 log rotation to manage log files and avoid disk space issues.
//* Monitor Performance: Regularly monitor your applications using `pm2 monit` and adjust instances accordingly.
//* Ensure Auto-Start on Reboot: Use `pm2 startup` to ensure your applications automatically start when the server reboots.
//* Use Environment Variables: Define environments in `ecosystem.config.js` to manage production and development configurations easily.

//? Summary of Deployment with PM2 in Node.js
//* PM2 is a powerful tool for managing Node.js applications in production, offering features like automatic restarts, clustering, and log management.
//* PM2’s clustering mode maximizes CPU utilization by running multiple instances of the application across available cores.
//* With PM2, you can perform **zero-downtime deployments**, allowing your application to be updated without service interruptions.
//* Log management** and **performance monitoring** in PM2 are critical for tracking errors and optimizing application performance.
//* PM2’s ecosystem file simplifies managing multiple applications and environments, making deployment more straightforward and maintainable.
